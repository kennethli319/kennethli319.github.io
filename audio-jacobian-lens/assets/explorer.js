(() => {
  "use strict";

  const body = document.body;
  const family = body.dataset.family;
  const manifestUrl = body.dataset.manifestUrl;
  const sampleList = document.querySelector("#sample-list");
  const workspace = document.querySelector("#explorer-workspace");
  const errorBox = document.querySelector("#explorer-error");
  const expectedReportCount = 10;

  const state = {
    manifest: null,
    reportEntry: null,
    report: null,
    reportIndex: 0,
    sampleQuery: "",
    reportController: null,
    filterController: null,
    filterEnabled: false,
    filterLimit: 2,
    filterCache: null,
    filterStatus: "idle",
    filterError: "",
    selectedToken: 0,
    selectedEncoder: 0,
    selection: { kind: "head", layerIndex: 0, position: 0 },
    audioTime: 0,
    tooltipTarget: null,
  };

  const tooltip = document.createElement("div");
  tooltip.className = "explorer-tooltip";
  tooltip.hidden = true;
  tooltip.setAttribute("role", "tooltip");
  document.body.append(tooltip);

  const escapeHTML = (value) => String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

  const clamp = (value, lower, upper) => Math.min(upper, Math.max(lower, value));
  const finite = (value) => {
    if (value === null || value === undefined || value === "") return null;
    return Number.isFinite(Number(value)) ? Number(value) : null;
  };
  const formatInteger = (value) => finite(value) === null ? "—" : Math.round(Number(value)).toLocaleString();
  const formatSeconds = (value) => finite(value) === null ? "—" : `${Number(value).toFixed(2)} s`;
  const formatScore = (value) => {
    const number = finite(value);
    if (number === null) return "—";
    const absolute = Math.abs(number);
    if (absolute !== 0 && absolute < 0.001) return number.toExponential(2);
    return number.toFixed(3);
  };
  const formatProbability = (value, digits = 2) => {
    const number = finite(value);
    return number === null ? "—" : `${(number * 100).toFixed(digits)}%`;
  };
  const compactText = (value, fallback = "∅") => {
    const text = String(value ?? "").replaceAll("\n", " ");
    return text.trim() ? text : fallback;
  };
  const hasExactRank = (value, { requireScore = false } = {}) => Boolean(
    value
    && value.id !== null
    && value.id !== undefined
    && finite(value.rank) !== null
    && finite(value.rank_denominator) !== null
    && Number(value.rank) >= 1
    && Number(value.rank_denominator) >= Number(value.rank)
    && String(value.rank_space || "").trim()
    && value.rank_tie_policy === "1_plus_count_strictly_greater"
    && (!requireScore || finite(value.score) !== null),
  );

  function validSpeechGenerationDiagnostics(value) {
    if (!value || typeof value !== "object") return false;
    const generatedSteps = finite(value.generated_steps);
    const maxNewTokens = finite(value.max_new_tokens);
    const textTokens = finite(value.text_tokens);
    const audioFrames = finite(value.audio_frames);
    if (
      !Number.isInteger(generatedSteps)
      || !Number.isInteger(maxNewTokens)
      || !Number.isInteger(textTokens)
      || !Number.isInteger(audioFrames)
      || generatedSteps < 1
      || maxNewTokens < generatedSteps
      || textTokens < 0
      || audioFrames < 0
      || generatedSteps !== textTokens + audioFrames + (value.audio_eos_seen ? 1 : 0)
    ) return false;
    const natural = value.termination_reason === "audio_eos"
      && value.audio_eos_seen === true
      && value.budget_exhausted === false;
    const capped = value.termination_reason === "budget_exhausted"
      && value.audio_eos_seen === false
      && value.budget_exhausted === true
      && generatedSteps === maxNewTokens;
    return natural || capped;
  }

  function nearestTokenIndexForWindow(tokens, window) {
    const start = finite(window?.start_seconds);
    const end = finite(window?.end_seconds);
    if (start === null || end === null) return -1;
    const midpoint = (start + end) / 2;
    let best = -1;
    let bestKey = null;
    tokens.forEach((token, position) => {
      const tokenStart = finite(token?.start_seconds);
      const tokenEnd = finite(token?.end_seconds);
      if (tokenStart === null || tokenEnd === null || tokenEnd < tokenStart) return;
      const overlap = Math.max(0, Math.min(end, tokenEnd) - Math.max(start, tokenStart));
      const midpointDistance = Math.abs(midpoint - (tokenStart + tokenEnd) / 2);
      const key = [-overlap, midpointDistance, position];
      if (!bestKey || key.some((value, index) => value < bestKey[index] && key.slice(0, index).every((prefix, prefixIndex) => prefix === bestKey[prefixIndex]))) {
        best = position;
        bestKey = key;
      }
    });
    return best;
  }

  async function fetchJSON(url, options = {}) {
    const response = await fetch(url, {
      credentials: "same-origin",
      cache: "no-cache",
      ...options,
    });
    if (!response.ok) throw new Error(`Static report request returned ${response.status}.`);
    return response.json();
  }

  function validateManifest(payload) {
    if (!payload || payload.schema_id !== "audio-jacobian-lens.cached-explorer-manifest") {
      throw new Error("The cached family manifest has an unsupported schema.");
    }
    if (
      payload.family !== family
      || payload.report_count !== expectedReportCount
      || !Array.isArray(payload.reports)
      || payload.reports.length !== expectedReportCount
    ) {
      throw new Error("The cached family manifest does not match this explorer.");
    }
    const ids = payload.reports.map((entry) => String(entry?.id || ""));
    const urls = payload.reports.map((entry) => String(entry?.report_url || ""));
    if (
      ids.some((id) => !id)
      || urls.some((url) => !url)
      || new Set(ids).size !== expectedReportCount
      || new Set(urls).size !== expectedReportCount
    ) {
      throw new Error("The cached family manifest has duplicate or incomplete report entries.");
    }
    return payload;
  }

  function validateReport(payload, entry) {
    if (!payload || payload.schema_id !== "audio-jacobian-lens.cached-explorer-report") {
      throw new Error("The cached report has an unsupported schema.");
    }
    if (payload.family !== family || payload.example_id !== entry.id || !payload.payload) {
      throw new Error("The cached report does not match its manifest entry.");
    }
    if (family === "tts") {
      const output = payload.payload.output;
      const fitted = payload.payload.fitted_speech_code_jlens;
      if (!Array.isArray(output?.speech_codes) || !Array.isArray(fitted?.rows)) {
        throw new Error("The TTS report is missing its speech-code matrix.");
      }
    } else {
      if (!Array.isArray(payload.payload.transcription?.tokens) || !payload.payload.decoder) {
        throw new Error("The speech report is missing its token matrix.");
      }
      if (family === "speech" || family === "asr") {
        const tokens = payload.payload.transcription.tokens;
        const rows = payload.payload.decoder?.cells || [];
        const headRanksAreExact = tokens.every((token) => hasExactRank(token));
        const layerRanksAreExact = rows.every((row) => row.length === tokens.length && row.every((cell, position) => (
          hasExactRank(cell?.realized_token, { requireScore: true })
          && Number(cell.realized_token.id) === Number(tokens[position]?.id)
        )));
        const encoderAlignmentIsExplicit = family !== "asr" || payload.payload.encoder?.realized_token_alignment?.method === "maximum_token_interval_overlap";
        const encoderRanksAreExact = family !== "asr" || (payload.payload.encoder?.cells || []).every((row) => row.every((cell) => {
          const tokenPosition = nearestTokenIndexForWindow(tokens, cell?.time_window);
          return tokenPosition >= 0
            && Number(cell.realized_token_position) === tokenPosition
            && cell.realized_token_alignment && typeof cell.realized_token_alignment === "object"
            && hasExactRank(cell?.realized_token, { requireScore: true })
            && Number(cell.realized_token.id) === Number(tokens[tokenPosition]?.id);
        }));
        if (!headRanksAreExact || !layerRanksAreExact || !encoderAlignmentIsExplicit || !encoderRanksAreExact) {
          throw new Error(`The ${family === "asr" ? "ASR" : "speech"} report is missing exact realized-token ranks.`);
        }
      }
      if (family === "speech" && !validSpeechGenerationDiagnostics(payload.payload.metadata?.generation_diagnostics)) {
        throw new Error("The speech report has invalid or missing generation-termination diagnostics.");
      }
    }
    return payload;
  }

  function validateFilterCache(payload) {
    if (payload.schema_id !== "audio-jacobian-lens.cached-explorer-filter-cache" || payload.example_id !== state.report.example_id) {
      throw new Error("The cached character-length buckets do not match this report.");
    }
    ["encoder", "decoder"].forEach((streamName) => {
      const filtered = payload.streams?.[streamName];
      const base = state.report.payload[streamName];
      (filtered?.layers || []).forEach((layer, filterLayerIndex) => {
        const baseLayerIndex = base.layers?.findIndex((value) => Number(value) === Number(layer)) ?? -1;
        if (baseLayerIndex < 0) throw new Error(`The ${streamName} filter cache has an unknown layer.`);
        (filtered.cells?.[filterLayerIndex] || []).forEach((cell, position) => {
          const ranks = cell?.realized_rank_by_max_length;
          if (!ranks || typeof ranks !== "object" || !Object.keys(ranks).length) {
            throw new Error(`The ${streamName} filter cache is missing exact realized-token ranks.`);
          }
          const denominators = state.report.payload.metadata?.display_vocabulary?.maximum_decoded_character_length_counts || {};
          if (Object.keys(ranks).length !== Object.keys(denominators).length || Object.keys(ranks).some((limit) => !(limit in denominators))) {
            throw new Error(`The ${streamName} filter cache does not cover every saved filter limit.`);
          }
          Object.entries(ranks).forEach(([limit, rank]) => {
            const denominator = finite(denominators[limit]);
            if (denominator === null || (rank !== null && (!Number.isInteger(Number(rank)) || Number(rank) < 1 || Number(rank) > denominator))) {
              throw new Error(`The ${streamName} filter cache has invalid realized-token provenance.`);
            }
          });
        });
      });
    });
    return payload;
  }

  function showError(error) {
    errorBox.hidden = false;
    errorBox.textContent = error instanceof Error ? error.message : String(error);
    workspace.setAttribute("aria-busy", "false");
    workspace.innerHTML = "";
  }

  function clearError() {
    errorBox.hidden = true;
    errorBox.textContent = "";
  }

  function ensureSamplePicker() {
    if (sampleList.querySelector("[data-sample-grid]")) return;
    sampleList.innerHTML = `
      <div class="sample-picker-tools">
        <label class="sample-search">
          <span class="visually-hidden">Filter cached examples</span>
          <input id="sample-search" type="search" autocomplete="off" placeholder="Filter examples" aria-controls="sample-button-grid">
        </label>
        <span id="sample-results-count" class="sample-results-count" aria-live="polite"></span>
      </div>
      <div id="sample-button-grid" class="sample-button-grid" data-sample-grid></div>
    `;
  }

  function sampleSearchText(entry) {
    return [
      entry?.id,
      entry?.title,
      entry?.summary,
      entry?.reference_transcript,
      entry?.prompt,
      entry?.teaching_role,
    ].filter(Boolean).join(" ").toLocaleLowerCase();
  }

  function renderSampleButtons() {
    ensureSamplePicker();
    const reports = state.manifest?.reports || [];
    const query = state.sampleQuery.trim().toLocaleLowerCase();
    const visible = reports
      .map((entry, index) => ({ entry, index }))
      .filter(({ entry }) => !query || sampleSearchText(entry).includes(query));
    const focusedIndex = sampleList.contains(document.activeElement)
      ? finite(document.activeElement?.dataset?.sampleIndex)
      : null;
    const grid = sampleList.querySelector("[data-sample-grid]");
    grid.innerHTML = visible.length ? visible.map(({ entry, index }) => {
      const detail = entry.summary || entry.reference_transcript || entry.prompt || entry.teaching_role || entry.id;
      return `
        <button class="sample-button" type="button" data-sample-index="${index}" aria-pressed="${index === state.reportIndex}">
          <span>${escapeHTML(`${family === "tts" ? "Prompt" : "Audio"} ${String(index + 1).padStart(2, "0")}`)}</span>
          <strong>${escapeHTML(entry.title)}</strong>
          <small>${escapeHTML(detail)}</small>
        </button>
      `;
    }).join("") : '<p class="sample-empty">No cached examples match this filter.</p>';
    const count = sampleList.querySelector("#sample-results-count");
    if (count) count.textContent = `${visible.length} of ${reports.length}`;
    if (focusedIndex !== null) {
      grid.querySelector(`[data-sample-index="${focusedIndex}"]`)?.focus();
    }
  }

  function fittedRows() {
    return state.report?.payload?.fitted_speech_code_jlens?.rows || [];
  }

  function defaultTTSPosition() {
    if (state.report?.example_id === "tts-bridge-s9") return 8;
    const rows = fittedRows();
    if (!rows.length) return 0;
    const last = rows.at(-1)?.positions || [];
    const first = rows[0]?.positions || [];
    let bestIndex = 0;
    let bestEarlyRank = -1;
    last.forEach((position, index) => {
      const finalRank = finite(position.realized_rank);
      const earlyRank = finite(first[index]?.realized_rank) ?? -1;
      if (finalRank === 1 && earlyRank > bestEarlyRank) {
        bestIndex = index;
        bestEarlyRank = earlyRank;
      }
    });
    return bestIndex;
  }

  async function loadReport(index) {
    const entry = state.manifest.reports[index];
    if (!entry) return;
    state.reportController?.abort();
    state.filterController?.abort();
    const controller = new AbortController();
    state.reportController = controller;
    state.reportIndex = index;
    state.reportEntry = entry;
    state.report = null;
    state.filterEnabled = false;
    state.filterLimit = 2;
    state.filterCache = null;
    state.filterStatus = "idle";
    state.filterError = "";
    state.audioTime = 0;
    renderSampleButtons();
    clearError();
    workspace.setAttribute("aria-busy", "true");
    workspace.innerHTML = '<div class="loading-state"><span aria-hidden="true"></span><p>Loading cached layer matrices…</p></div>';
    try {
      const report = validateReport(await fetchJSON(entry.report_url, { signal: controller.signal }), entry);
      if (controller.signal.aborted) return;
      state.report = report;
      if (family === "tts") {
        state.selectedToken = defaultTTSPosition();
        state.selectedEncoder = 0;
        state.selection = { kind: "tts-head", layerIndex: 0, position: state.selectedToken };
      } else {
        state.selectedToken = 0;
        state.selectedEncoder = nearestEncoderForToken(0);
        state.selection = { kind: "head", layerIndex: 0, position: 0 };
      }
      const url = new URL(window.location.href);
      url.searchParams.set("sample", entry.id);
      window.history.replaceState(null, "", url);
      renderWorkspace();
    } catch (error) {
      if (error?.name !== "AbortError") showError(error);
    } finally {
      if (state.reportController === controller) state.reportController = null;
    }
  }

  function tokenList() {
    if (family === "tts") return state.report?.payload?.output?.speech_codes || [];
    return state.report?.payload?.transcription?.tokens || [];
  }

  function encoderCells() {
    return state.report?.payload?.encoder?.cells || [];
  }

  function tokenMidpoint(position) {
    const token = tokenList()[position];
    const start = finite(token?.start_seconds);
    const end = finite(token?.end_seconds);
    if (start === null && end === null) return null;
    if (start === null) return end;
    if (end === null) return start;
    return (start + end) / 2;
  }

  function encoderWindow(position) {
    const cell = encoderCells()[0]?.[position];
    const time = cell?.time_window || state.report?.payload?.encoder?.time_bins?.[position];
    if (!time) return null;
    const start = finite(time.start_seconds);
    const end = finite(time.end_seconds);
    return start === null || end === null ? null : { start, end };
  }

  function nearestEncoderForTime(time) {
    if (finite(time) === null || !encoderCells().length) return 0;
    let best = 0;
    let bestDistance = Number.POSITIVE_INFINITY;
    (encoderCells()[0] || []).forEach((_, position) => {
      const window = encoderWindow(position);
      if (!window) return;
      const distance = time >= window.start && time <= window.end
        ? 0
        : Math.min(Math.abs(time - window.start), Math.abs(time - window.end));
      if (distance < bestDistance) {
        best = position;
        bestDistance = distance;
      }
    });
    return best;
  }

  function nearestEncoderForToken(position) {
    return nearestEncoderForTime(tokenMidpoint(position));
  }

  function nearestTokenForTime(time) {
    const tokens = tokenList();
    let best = -1;
    let bestDistance = Number.POSITIVE_INFINITY;
    tokens.forEach((token, position) => {
      const start = finite(token.start_seconds);
      const end = finite(token.end_seconds);
      if (start === null && end === null) return;
      const left = start ?? end;
      const right = end ?? start;
      const distance = time >= left && time <= right
        ? 0
        : Math.min(Math.abs(time - left), Math.abs(time - right));
      if (distance < bestDistance) {
        best = position;
        bestDistance = distance;
      }
    });
    return best < 0 ? state.selectedToken || 0 : best;
  }

  function selectCoordinate(kind, layerIndex, position, { seek = false } = {}) {
    const count = kind === "encoder" ? (encoderCells()[0]?.length || 0) : tokenList().length;
    const bounded = clamp(Number(position) || 0, 0, Math.max(0, count - 1));
    state.selection = { kind, layerIndex: Number(layerIndex) || 0, position: bounded };
    if (kind === "encoder") {
      state.selectedEncoder = bounded;
      const window = encoderWindow(bounded);
      if (window) {
        const midpoint = (window.start + window.end) / 2;
        const recordedTokenPosition = finite(encoderCells()[0]?.[bounded]?.realized_token_position);
        state.selectedToken = recordedTokenPosition === null
          ? nearestTokenForTime(midpoint)
          : clamp(Math.round(recordedTokenPosition), 0, Math.max(0, tokenList().length - 1));
        if (seek) seekAudio(midpoint);
      }
    } else {
      state.selectedToken = bounded;
      if (family === "asr") state.selectedEncoder = nearestEncoderForToken(bounded);
      if (seek) {
        const time = tokenMidpoint(bounded);
        if (time !== null) seekAudio(time);
      }
    }
    syncSelectionDOM();
  }

  function seekAudio(time) {
    const audio = workspace.querySelector("#cached-input-audio");
    if (!audio || finite(time) === null) return;
    state.audioTime = Math.max(0, Number(time));
    try { audio.currentTime = state.audioTime; } catch (_) { /* Metadata may not be ready yet. */ }
    syncPlayheadDOM();
  }

  function mergeLengthBuckets(streamName, layer, position, fallback) {
    if (!state.filterEnabled || !state.filterCache) return fallback;
    const stream = state.filterCache.streams?.[streamName];
    const rowIndex = stream?.layers?.findIndex((value) => Number(value) === Number(layer)) ?? -1;
    if (rowIndex < 0) return fallback;
    const buckets = stream.cells?.[rowIndex]?.[position]?.top_tokens_by_length;
    if (!buckets || typeof buckets !== "object") return fallback;
    const byId = new Map();
    Object.entries(buckets).forEach(([length, candidates]) => {
      if (Number(length) > state.filterLimit || !Array.isArray(candidates)) return;
      candidates.forEach((candidate) => {
        const previous = byId.get(candidate.id);
        if (!previous || Number(candidate.score) > Number(previous.score)) byId.set(candidate.id, candidate);
      });
    });
    const merged = [...byId.values()].sort((left, right) => Number(right.score) - Number(left.score));
    const denominator = state.report.payload.metadata?.display_vocabulary
      ?.maximum_decoded_character_length_counts?.[String(state.filterLimit)]
      ?? merged.length;
    return merged.slice(0, 5).map((candidate) => ({
      ...candidate,
      rank: 1 + merged.filter((other) => Number(other.score) > Number(candidate.score)).length,
      rank_denominator: denominator,
      rank_space: `lexical tokens ≤ ${state.filterLimit} characters`,
      vocabulary_filter: {
        ...(candidate.vocabulary_filter || {}),
        character_length_filter_applied: true,
        character_length_constraint: { operator: "less_than_or_equal", value: state.filterLimit },
      },
    }));
  }

  function ttsPosition(kind, layerIndex, position) {
    if (kind === "tts-head") {
      return state.report.payload.output.speech_head_candidates.positions[position];
    }
    return state.report.payload.fitted_speech_code_jlens.rows[layerIndex]?.positions?.[position];
  }

  function candidatesFor(kind, layerIndex, position) {
    if (kind === "encoder" || kind === "decoder") {
      const stream = state.report.payload[kind];
      const cell = stream.cells?.[layerIndex]?.[position];
      return mergeLengthBuckets(kind, stream.layers?.[layerIndex], position, cell?.top_tokens || []);
    }
    if (kind === "head") return state.report.payload.transcription.tokens?.[position]?.top_tokens || [];
    if (kind === "tts-layer" || kind === "tts-head") {
      const selected = ttsPosition(kind, layerIndex, position);
      const candidates = (selected?.candidates || []).map((candidate, index) => ({
        ...candidate,
        rank: index + 1,
        rank_denominator: 6563,
        rank_space: "full raw speech-head vocabulary",
      }));
      if (selected && !candidates.some((candidate) => Number(candidate.id) === Number(selected.realized_code_id))) {
        candidates.push({
          id: selected.realized_code_id,
          probability: selected.realized_probability,
          log_probability: selected.realized_log_probability,
          rank: selected.realized_rank,
          rank_denominator: 6563,
          rank_space: "full raw speech-head vocabulary",
          realized: true,
        });
      }
      return candidates;
    }
    return [];
  }

  function realizedFor(kind, layerIndex, position) {
    if (kind === "tts-layer" || kind === "tts-head") {
      const selected = ttsPosition(kind, layerIndex, position);
      return selected ? {
        id: selected.realized_code_id,
        probability: selected.realized_probability,
        log_probability: selected.realized_log_probability,
        rank: selected.realized_rank,
        rankDenominator: 6563,
        label: `ID ${selected.realized_code_id}`,
      } : null;
    }
    if (family === "asr" && (kind === "encoder" || kind === "decoder")) {
      const stream = state.report.payload[kind];
      const cell = stream.cells?.[layerIndex]?.[position];
      const recorded = cell?.realized_token;
      if (!recorded) return null;
      let active = recorded;
      let excludedByFilter = false;
      let filterApplied = false;
      if (state.filterEnabled && state.filterCache) {
        const layer = stream.layers?.[layerIndex];
        const filterStream = state.filterCache.streams?.[kind];
        const filterLayerIndex = filterStream?.layers?.findIndex((value) => Number(value) === Number(layer)) ?? -1;
        if (filterLayerIndex >= 0) {
          filterApplied = true;
          const ranks = filterStream.cells?.[filterLayerIndex]?.[position]?.realized_rank_by_max_length;
          const availableLimits = Object.keys(ranks || {})
            .map(Number)
            .filter((limit) => Number.isFinite(limit) && limit <= state.filterLimit)
            .sort((left, right) => right - left);
          const selectedLimit = availableLimits[0];
          const filteredRank = selectedLimit === undefined ? null : ranks[String(selectedLimit)];
          if (filteredRank !== null && filteredRank !== undefined) {
            active = {
              ...recorded,
              rank: filteredRank,
              rank_denominator: state.report.payload.metadata?.display_vocabulary?.maximum_decoded_character_length_counts?.[String(selectedLimit)],
              rank_space: "maximum_decoded_character_length_vocabulary",
            };
          } else excludedByFilter = true;
        }
      }
      return {
        ...active,
        rank: excludedByFilter ? null : active.rank,
        rankDenominator: excludedByFilter ? null : active.rank_denominator,
        available: !excludedByFilter,
        excludedByFilter,
        filterApplied,
        unfilteredRank: recorded.rank,
        unfilteredRankDenominator: recorded.rank_denominator,
        label: compactText(recorded.text),
      };
    }
    const tokenPosition = kind === "encoder" ? state.selectedToken : position;
    const token = state.report.payload.transcription.tokens?.[tokenPosition];
    if (!token) return null;
    if (family === "speech" && kind === "decoder") {
      const realized = state.report.payload.decoder.cells?.[layerIndex]?.[position]?.realized_token;
      return realized ? {
        ...realized,
        rankDenominator: realized.rank_denominator,
        available: true,
        label: compactText(realized.text),
      } : null;
    }
    if (kind === "encoder" || kind === "decoder") {
      const match = candidatesFor(kind, layerIndex, position).find((candidate) => Number(candidate.id) === Number(token.id));
      return {
        id: token.id,
        text: token.text,
        score: match?.score,
        rank: match?.rank,
        rankDenominator: match?.rank_denominator,
        available: Boolean(match),
        label: compactText(token.text),
      };
    }
    return {
      id: token.id,
      text: token.text,
      probability: token.probability,
      log_probability: token.log_probability,
      rank: token.rank,
      rankDenominator: token.rank_denominator,
      label: compactText(token.text),
      available: true,
    };
  }

  function candidateLabel(candidate, code = false) {
    if (code) return `ID ${candidate.id}`;
    return `${compactText(candidate.text)} · ID ${candidate.id}`;
  }

  function candidateScore(candidate, kind = null) {
    if (finite(candidate.probability) !== null) return `${formatProbability(candidate.probability, 3)} · log p ${formatScore(candidate.log_probability)}`;
    const unit = kind === "encoder" && candidate.score_kind === "target_mean_relative_logit_delta"
      ? "logit delta"
      : "logit";
    return `${formatScore(candidate.score)} ${unit}`;
  }

  function rowStrengths(values, probability = false) {
    if (probability) return values.map((value) => Math.sqrt(clamp(finite(value) ?? 0, 0, 1)));
    const numeric = values.map((value) => finite(value) ?? 0);
    const minimum = Math.min(...numeric);
    const maximum = Math.max(...numeric);
    if (maximum === minimum) return numeric.map(() => 0.55);
    return numeric.map((value) => clamp((value - minimum) / (maximum - minimum), 0, 1));
  }

  function matrixCellHTML({ kind, layerIndex, layerLabel, position, strength, label }) {
    const descriptor = descriptorFor(kind, layerIndex, position);
    const head = kind === "head" || kind === "tts-head";
    const asrDecoderCell = family === "asr" && kind === "decoder";
    const showSpeechRealizedRank = family === "speech" && (kind === "decoder" || kind === "head");
    const showASRRealizedRank = family === "asr" && ["encoder", "decoder", "head"].includes(kind);
    const realizedRank = showSpeechRealizedRank || showASRRealizedRank ? finite(descriptor.realized?.rank) : null;
    const mainLabel = asrDecoderCell
      ? compactText(descriptor.top?.text, `ID ${descriptor.top?.id ?? "—"}`)
      : label;
    let realizedBadge = "";
    if (descriptor.realized?.excludedByFilter) {
      realizedBadge = asrDecoderCell ? "realized out" : "out";
    } else if (realizedRank !== null) {
      realizedBadge = asrDecoderCell || (family === "asr" && kind === "head")
        ? `realized #${formatInteger(realizedRank)}`
        : showASRRealizedRank
          ? `#${formatInteger(realizedRank)}`
          : `realized #${formatInteger(realizedRank)}`;
    }
    return `
      <button class="matrix-cell${head ? " head" : ""}${asrDecoderCell ? " asr-decoder-cell" : ""}" type="button"
        data-kind="${escapeHTML(kind)}" data-layer-index="${layerIndex}" data-position="${position}"
        style="--strength:${clamp(strength, 0, 1).toFixed(4)}"
        aria-label="${escapeHTML(`${layerLabel}, ${descriptor.coordinate}. ${descriptor.detail}`)}">
        <span class="matrix-cell-label"${asrDecoderCell ? ' data-value-role="top-candidate"' : ""}>${escapeHTML(mainLabel)}</span>
        ${realizedBadge ? `<small class="realized-rank-badge">${escapeHTML(realizedBadge)}</small>` : ""}
      </button>
    `;
  }

  function renderStandardRows(streamName, startPosition = 0, endPosition = null) {
    const stream = state.report.payload[streamName];
    const rows = stream.cells || [];
    return rows.map((cells, layerIndex) => {
      const boundedEnd = endPosition === null ? cells.length : Math.min(endPosition, cells.length);
      const positions = cells.slice(startPosition, boundedEnd).map((_, offset) => startPosition + offset);
      const strengths = rowStrengths(cells.map((_, position) => finite(candidatesFor(streamName, layerIndex, position)[0]?.score) ?? 0), false);
      const layer = stream.layers?.[layerIndex] ?? layerIndex;
      const cellHTML = positions.map((position) => {
        const top = candidatesFor(streamName, layerIndex, position)[0];
        return matrixCellHTML({
          kind: streamName,
          layerIndex,
          layerLabel: `${streamName === "encoder" ? "Encoder" : "Decoder"} L${layer}`,
          position,
          strength: strengths[position],
          label: compactText(top?.text, `ID ${top?.id ?? "—"}`),
        });
      }).join("");
      return `<div class="matrix-row" style="--position-count:${positions.length}"><div class="matrix-layer-label">L${escapeHTML(layer)}</div>${cellHTML}</div>`;
    }).join("");
  }

  function renderHeadRow(startPosition = 0, endPosition = null) {
    const tokens = state.report.payload.transcription.tokens || [];
    const boundedEnd = endPosition === null ? tokens.length : Math.min(endPosition, tokens.length);
    const positions = tokens.slice(startPosition, boundedEnd).map((token, offset) => ({ token, position: startPosition + offset }));
    const strengths = rowStrengths(tokens.map((token) => token.probability), true);
    const cells = positions.map(({ token, position }) => matrixCellHTML({
      kind: "head",
      layerIndex: 0,
      layerLabel: "Actual output head",
      position,
      strength: strengths[position],
      label: compactText(token.text),
    })).join("");
    return `<div class="matrix-row" style="--position-count:${positions.length}"><div class="matrix-layer-label">HEAD</div>${cells}</div>`;
  }

  function renderSpeechRows() {
    const tokens = state.report.payload.transcription.tokens || [];
    const windowSize = 8;
    const windows = [];
    for (let start = 0; start < tokens.length; start += windowSize) {
      const end = Math.min(start + windowSize, tokens.length);
      const count = end - start;
      const cellWidth = family === "asr" ? 92 : 82;
      const tokenHeaders = tokens.slice(start, end).map((token, offset) => {
        const position = start + offset;
        return `<button class="speech-position-token" type="button" data-token-position="${position}" aria-label="Select token ${position + 1}, ${escapeHTML(compactText(token.text))}"><span>T${position + 1}</span><strong>${escapeHTML(compactText(token.text))}</strong></button>`;
      }).join("");
      windows.push(`
        <section class="speech-matrix-window" aria-label="Generated token positions ${start + 1} through ${end}">
          <header><strong>Tokens ${start + 1}–${end}</strong><span>${family === "asr" ? "Decoder large: top candidate · HEAD large: output · small: realized rank" : "Large: top candidate · small: realized rank"}</span></header>
          <div class="speech-matrix-scroll" tabindex="0" aria-label="Layer readouts for token positions ${start + 1} through ${end}">
            <div class="speech-matrix-grid" style="--position-count:${count};--speech-window-min:${58 + count * cellWidth}px">
              <div class="matrix-row speech-position-row" style="--position-count:${count}"><div class="matrix-layer-label">OUTPUT</div>${tokenHeaders}</div>
              ${renderStandardRows("decoder", start, end)}
              ${renderHeadRow(start, end)}
            </div>
          </div>
        </section>
      `);
    }
    return windows.join("");
  }

  function renderTTSRows() {
    const fitted = state.report.payload.fitted_speech_code_jlens;
    const rows = (fitted.rows || []).map((row, layerIndex) => {
      const strengths = rowStrengths(row.positions.map((position) => position.realized_probability), true);
      const cells = row.positions.map((position, index) => matrixCellHTML({
        kind: "tts-layer",
        layerIndex,
        layerLabel: `Fitted T3 L${row.layer}`,
        position: index,
        strength: strengths[index],
        label: `#${position.realized_rank}`,
      })).join("");
      return `<div class="matrix-row" style="--position-count:${row.positions.length}"><div class="matrix-layer-label">L${escapeHTML(row.layer)}</div>${cells}</div>`;
    }).join("");
    const head = state.report.payload.output.speech_head_candidates.positions || [];
    const strengths = rowStrengths(head.map((position) => position.realized_probability), true);
    const cells = head.map((position, index) => matrixCellHTML({
      kind: "tts-head",
      layerIndex: 0,
      layerLabel: "Actual speech head",
      position: index,
      strength: strengths[index],
      label: `#${position.realized_rank}`,
    })).join("");
    return `${rows}<div class="matrix-row" style="--position-count:${head.length}"><div class="matrix-layer-label">HEAD</div>${cells}</div>`;
  }

  function renderMatrixPanel(title, description, rows, { headLegend = false, windowed = false } = {}) {
    return `
      <section class="matrix-panel">
        <header class="explorer-panel-heading">
          <div><p class="section-label">LAYER × POSITION</p><h3>${escapeHTML(title)}</h3></div>
          <p>${escapeHTML(description)}</p>
        </header>
        <div class="matrix-legend"><span><i></i> Fitted/readout intensity</span>${headLegend ? "<span><i class=\"head\"></i> Actual output probability</span>" : ""}</div>
        <div class="layer-matrix${windowed ? " windowed" : ""}">${rows}</div>
      </section>
    `;
  }

  function waveformBars() {
    const values = state.report.payload.audio?.waveform_preview?.values || [];
    if (!values.length) return "";
    const target = Math.min(256, values.length);
    const chunk = Math.max(1, Math.ceil(values.length / target));
    const peaks = [];
    for (let index = 0; index < values.length; index += chunk) {
      peaks.push(Math.max(...values.slice(index, index + chunk).map((value) => Math.abs(Number(value) || 0))));
    }
    const maximum = Math.max(...peaks, 0.000001);
    return peaks.map((peak) => `<i style="--amp:${clamp(peak / maximum, 0, 1).toFixed(3)}"></i>`).join("");
  }

  function waveformRegions() {
    if (family !== "asr") return "";
    const duration = finite(state.report.payload.audio?.duration_seconds) || 1;
    return (encoderCells()[0] || []).map((_, position) => {
      const window = encoderWindow(position);
      if (!window) return "";
      const left = clamp(window.start / duration * 100, 0, 100);
      const width = clamp((window.end - window.start) / duration * 100, 0, 100 - left);
      return `<button class="wave-region" type="button" data-encoder-position="${position}" style="--left:${left.toFixed(4)}%;--width:${width.toFixed(4)}%" aria-label="Select encoder window ${position + 1}, ${formatSeconds(window.start)} to ${formatSeconds(window.end)}"></button>`;
    }).join("");
  }

  function renderTimeline() {
    const positions = tokenList();
    const readableSpeech = family === "speech";
    const dense = positions.length > 24 && !readableSpeech;
    const buttons = positions.map((item, position) => {
      const label = family === "tts" ? `S${position + 1}` : `T${position + 1}`;
      const value = family === "tts" ? `ID ${item.id}` : compactText(item.text);
      return `<button class="position-button" type="button" data-token-position="${position}" aria-pressed="false" aria-label="Select ${label}, ${escapeHTML(value)}"><span>${label}</span><strong>${escapeHTML(value)}</strong></button>`;
    }).join("");
    const audio = family === "tts" ? `
      <div class="code-timeline-message"><strong>No generated audio is distributed in this review.</strong> Each saved code position is a nominal 40 ms coordinate; downstream S3Gen and vocoder context means it is not an exact waveform or word boundary.</div>
    ` : `
      <div class="timeline-audio">
        <audio id="cached-input-audio" controls preload="metadata" src="${escapeHTML(state.reportEntry.audio_url)}"></audio>
        <span>Rights-cleared input · ${escapeHTML(formatSeconds(state.report.payload.audio?.duration_seconds))}</span>
      </div>
      <div class="cached-waveform" aria-label="Cached input waveform preview">
        <div class="wave-bars" aria-hidden="true">${waveformBars()}</div>
        <div class="wave-selection" aria-hidden="true"></div>
        <div class="wave-playhead" aria-hidden="true"></div>
        <div class="wave-regions">${waveformRegions()}</div>
      </div>
      <div class="wave-time"><span>0.00 s</span><span>${escapeHTML(formatSeconds(state.report.payload.audio?.duration_seconds))}</span></div>
    `;
    return `
      <section class="timeline-panel">
        <header class="explorer-panel-heading">
          <div><p class="section-label">02 · POSITION</p><h3>${family === "tts" ? "Speech-code timeline" : "Input waveform and output pieces"}</h3></div>
          <p>${family === "asr" ? "Waveform windows, decoder pieces, and layer cells share one pinned time coordinate." : family === "speech" ? "Input audio and generated text are separate streams; no word-to-input alignment is claimed." : "Click any saved output position to update all fitted layers, HEAD candidates, and text diagnostics."}</p>
        </header>
        ${audio}
        <div class="position-heading"><strong>${family === "tts" ? "Realized acoustic-code IDs" : "Generated output pieces"}</strong><span>${positions.length} saved positions</span></div>
        <div class="position-timeline${dense ? " dense" : ""}${readableSpeech ? " speech-readable" : ""}" style="--position-count:${positions.length}">${buttons}</div>
        <p id="selected-position-line" class="selected-position-line"></p>
        ${renderFilterControl()}
      </section>
    `;
  }

  function renderFilterControl() {
    if (family !== "asr") {
      if (family === "speech") return '<div class="static-filter"><p>Character-length reranking is unavailable for this projected LFM pilot; every displayed rank uses its recorded lexical vocabulary.</p></div>';
      return "";
    }
    const message = state.filterStatus === "loading"
      ? '<p class="loading">Loading the cached exact-length vocabulary buckets…</p>'
      : state.filterStatus === "error"
        ? `<p class="error">${escapeHTML(state.filterError)}</p>`
        : '<p>Applies to all encoder rows and decoder L0–L1 only. L2 and HEAD remain unfiltered controls. This is a vocabulary display aid—not a phoneme classifier or a model intervention.</p>';
    return `
      <div class="static-filter">
        <label class="static-filter-toggle"><input id="static-filter-toggle" type="checkbox" ${state.filterEnabled ? "checked" : ""}> Token-length filter</label>
        <label class="static-filter-number">Maximum decoded characters <input id="static-filter-limit" type="number" min="1" max="64" step="1" value="${state.filterLimit}" ${state.filterEnabled ? "" : "disabled"}></label>
        ${message}
      </div>
    `;
  }

  function overviewPurpose() {
    if (family === "tts") return state.report.teaching_purpose;
    if (family === "speech") return "Compare a provisional projected language-backbone readout with the actual generated-text head. The generated response audio is intentionally excluded.";
    return "Inspect every saved encoder time window and decoder token position, including cases where lexical information appears only in later layers.";
  }

  function overviewText() {
    if (family === "tts") return state.report.source?.prompt || state.report.payload.input?.raw_text;
    return state.report.payload.transcription?.text;
  }

  function renderSpeechTerminationStatus() {
    if (family !== "speech") return "";
    const diagnostics = state.report.payload.metadata.generation_diagnostics;
    const capped = diagnostics.termination_reason === "budget_exhausted";
    const steps = `${formatInteger(diagnostics.generated_steps)} / ${formatInteger(diagnostics.max_new_tokens)} generation steps`;
    return capped ? `
      <section class="generation-status capped" data-speech-termination="budget-exhausted" role="status">
        <span class="generation-status-mark" aria-hidden="true">!</span>
        <div><strong>Safety cap reached · ${escapeHTML(steps)}</strong><p>Audio EOS was not observed. The displayed generated response may be truncated, so its last text piece is not evidence of natural completion.</p></div>
      </section>
    ` : `
      <section class="generation-status natural" data-speech-termination="audio-eos" role="status">
        <span class="generation-status-mark" aria-hidden="true">✓</span>
        <div><strong>Natural audio EOS · ${escapeHTML(steps)}</strong><p>The model emitted its audio end-of-sequence marker before the ${escapeHTML(formatInteger(diagnostics.max_new_tokens))}-step safety cap.</p></div>
      </section>
    `;
  }

  function renderOverview() {
    const provenance = state.manifest.provenance || state.report.provenance || {};
    const model = provenance.model || {};
    const lens = provenance.lens || {};
    const source = state.report.source || {};
    const fit = lens.fit_examples ?? state.report.payload.metadata?.lens_examples ?? "—";
    const relation = family === "speech" && state.report.example_id === "speech-question" ? "in-sample integration" : family === "speech" ? "held-out from one-clip fit" : family === "tts" ? state.report.teaching_role : "cached Whisper run";
    return `
      <section class="report-overview">
        <div>
          <p class="section-label">RECORDED MODEL RUN</p>
          <h2>${escapeHTML(state.report.title || state.reportEntry.title)}</h2>
          <p class="purpose">${escapeHTML(overviewPurpose())}</p>
        </div>
        <div class="overview-meta">
          <p><span>${family === "tts" ? "Prompt" : "Output"}</span><strong>${escapeHTML(overviewText())}</strong></p>
          ${source.reference_transcript ? `<p><span>Reference</span><strong>${escapeHTML(source.reference_transcript)}</strong></p>` : ""}
          <p><span>Model</span><strong>${escapeHTML(model.id || state.report.payload.metadata?.model_id)}</strong></p>
          <p><span>Fit</span><strong>${escapeHTML(`${fit} examples · ${relation}`)}</strong></p>
        </div>
      </section>
      ${renderSpeechTerminationStatus()}
      <div class="cached-banner"><strong>Static replay</strong><span>These values were inferred before publication. This page performs no model request, upload, recording, synthesis, or intervention.</span></div>
    `;
  }

  function renderMatrices() {
    if (family === "tts") {
      return renderMatrixPanel(
        "Fitted readout probability through T3",
        "Each cell shows the exact global rank of the realized code. Blue intensity uses a square-root display scale of its fitted probability; hover for the unrounded value.",
        renderTTSRows(),
        { headLegend: true },
      );
    }
    const panels = [];
    if (state.report.payload.encoder?.layers?.length) {
      panels.push(renderMatrixPanel(
        "Across the audio representation",
        family === "asr"
          ? "Large text is the layer's top candidate. The small # is the exact rank of the realized output token aligned by greatest time overlap; blue tint is normalized within each row."
          : "Each row is one encoder layer and each column is an overlapping time window. Blue tint is normalized within each row; exact readout logits stay in the tooltip and inspector.",
        renderStandardRows("encoder"),
      ));
    }
    panels.push(renderMatrixPanel(
      "As each token resolves",
      family === "speech"
        ? "Projected LFM readout rows are followed by the actual tied text head. They describe generated-language positions, not acoustic frames."
        : "Decoder boxes show each layer's top candidate in large text and the realized output token's exact rank below it. HEAD keeps the actual output token and probability semantics.",
      renderSpeechRows(),
      { headLegend: true, windowed: true },
    ));
    return panels.join("");
  }

  function provenanceValue(value) {
    if (value === null || value === undefined) return "Not recorded";
    if (Array.isArray(value)) return value.join(", ");
    if (typeof value === "object") return JSON.stringify(value);
    return String(value);
  }

  function reportWarnings() {
    const payload = state.report.payload;
    const warnings = payload.warnings || payload.metadata?.warnings || payload.fitted_speech_code_jlens?.warnings || [];
    return Array.isArray(warnings) ? warnings.slice(0, 6) : [];
  }

  function renderProvenance() {
    const provenance = state.manifest.provenance || state.report.provenance || {};
    const model = provenance.model || {};
    const lens = provenance.lens || {};
    const values = [
      ["Model", `${model.id || "—"}${model.revision ? ` @ ${model.revision}` : ""}`],
      ["Model fingerprint", model.model_fingerprint || model.weights_fingerprint || "—"],
      ["Lens artifact", lens.source_path || lens.capture_convention || "—"],
      ["Lens SHA-256", lens.sha256 || "—"],
      ...(family === "asr" ? [
        ["Encoder source layers", lens.encoder_source_layers || state.report.payload.encoder?.layers || []],
        ["Decoder source layers", lens.decoder_source_layers || state.report.payload.decoder?.layers || []],
      ] : [["Source layers", lens.source_layers || state.report.payload.fitted_speech_code_jlens?.layers || state.report.payload.decoder?.layers || []]]),
      ["Target layer", lens.target_layer ?? state.report.payload.decoder?.target_layer ?? "—"],
      ["Projection", lens.projection_method || state.report.payload.metadata?.projection || "dense / recorded"],
      ["Rank semantics", provenance.rank_semantics?.tie_policy || state.report.payload.metadata?.candidate_rank_semantics?.method || "recorded exact ranks"],
    ];
    return `
      <details class="report-provenance">
        <summary>Model, lens, rights, and interpretation details</summary>
        <div class="provenance-grid">${values.map(([label, value]) => `<div><span>${escapeHTML(label)}</span><strong>${escapeHTML(provenanceValue(value))}</strong></div>`).join("")}</div>
        <ul class="provenance-caveats">${reportWarnings().map((warning) => `<li>${escapeHTML(warning)}</li>`).join("")}</ul>
      </details>
    `;
  }

  function renderIntervention() {
    if (family !== "tts") return "";
    const comparison = state.report.payload.intervention_comparison;
    if (!comparison) return "";
    const intervention = comparison.residual_steered?.intervention || {};
    const effect = comparison.suffix_effect || {};
    return `
      <section class="cached-intervention">
        <p class="section-label">RECORDED CAUSAL REPLAY · BRIDGE S9</p>
        <h3>A small L20 + L22 residual edit changed the actual speech-head winner</h3>
        <div class="intervention-compact">
          <span>ID ${escapeHTML(comparison.baseline?.realized_code_id)} <i>baseline</i></span>
          <i aria-hidden="true">→</i>
          <span>ID ${escapeHTML(comparison.candidate?.code_id)} <i>target</i></span>
          <span>${escapeHTML(formatScore(intervention.chosen_relative_residual_norm))}× <i>relative norm</i></span>
          <span>${escapeHTML(effect.downstream_codes_changed)} <i>downstream codes changed</i></span>
        </div>
        <p>The residual-steered sequence ${comparison.direct_forced_sequence_exact_match ? "exactly matched" : "did not exactly match"} the direct forced-code branch. This cached comparison is not rerun when you click other candidates.</p>
      </section>
    `;
  }

  function renderWorkspace() {
    const audioTime = state.audioTime;
    workspace.innerHTML = `
      ${renderOverview()}
      ${renderTimeline()}
      <div class="matrix-layout">
        <div class="matrix-stack">${renderMatrices()}</div>
        <aside id="detail-inspector" class="detail-inspector"></aside>
      </div>
      <div id="trace-panel"></div>
      ${renderIntervention()}
      ${renderProvenance()}
    `;
    workspace.setAttribute("aria-busy", "false");
    state.audioTime = audioTime;
    const audio = workspace.querySelector("#cached-input-audio");
    if (audio) {
      const restoreTime = () => {
        if (state.audioTime > 0 && Number.isFinite(audio.duration)) audio.currentTime = Math.min(state.audioTime, audio.duration);
      };
      audio.addEventListener("loadedmetadata", restoreTime, { once: true });
      audio.addEventListener("timeupdate", () => {
        state.audioTime = audio.currentTime;
        syncPlayheadDOM();
      });
      audio.addEventListener("seeked", syncPlayheadDOM);
    }
    syncSelectionDOM();
  }

  function coordinateText(kind, layerIndex, position) {
    if (kind === "encoder") {
      const layer = state.report.payload.encoder.layers?.[layerIndex] ?? layerIndex;
      const window = encoderWindow(position);
      return `Encoder L${layer} · window ${position + 1}${window ? ` · ${formatSeconds(window.start)}–${formatSeconds(window.end)}` : ""}`;
    }
    if (kind === "decoder") {
      const layer = state.report.payload.decoder.layers?.[layerIndex] ?? layerIndex;
      return `Decoder L${layer} · token ${position + 1}`;
    }
    if (kind === "head") return `Actual output head · token ${position + 1}`;
    if (kind === "tts-layer") {
      const layer = state.report.payload.fitted_speech_code_jlens.rows?.[layerIndex]?.layer ?? layerIndex;
      return `Fitted T3 L${layer} · S${position + 1}`;
    }
    return `Actual speech head · S${position + 1}`;
  }

  function selectionCoordinateText() {
    const { kind, layerIndex, position } = state.selection;
    return coordinateText(kind, layerIndex, position);
  }

  function descriptorFor(kind, layerIndex, position) {
    const candidates = candidatesFor(kind, layerIndex, position);
    const realized = realizedFor(kind, layerIndex, position);
    const top = candidates[0];
    const code = kind.startsWith("tts");
    const coordinate = coordinateText(kind, layerIndex, position);
    const topDetail = top
      ? `Top candidate ${candidateLabel(top, code)}, rank #${formatInteger(top.rank)} of ${formatInteger(top.rank_denominator)}, ${candidateScore(top, kind)}.`
      : "No bounded candidates were retained.";
    let realizedDetail = "";
    if (family === "speech" && (kind === "decoder" || kind === "head") && realized) {
      realizedDetail = `Realized target ${realized.label}, rank #${formatInteger(realized.rank)} of ${formatInteger(realized.rankDenominator)}, ${finite(realized.probability) !== null ? formatProbability(realized.probability, 3) : `${formatScore(realized.score)} logit`}.`;
    }
    if (family === "asr" && realized) {
      realizedDetail = realized.excludedByFilter
        ? `Realized target ${realized.label} is excluded by the active ≤${state.filterLimit}-character vocabulary; its unfiltered rank is #${formatInteger(realized.unfilteredRank)} of ${formatInteger(realized.unfilteredRankDenominator)}.`
        : `Realized target ${realized.label}, exact ${realized.filterApplied ? `≤${state.filterLimit}-character` : "unfiltered"} rank #${formatInteger(realized.rank)} of ${formatInteger(realized.rankDenominator)}, ${finite(realized.probability) !== null ? formatProbability(realized.probability, 3) : `${formatScore(realized.score)} ${kind === "encoder" ? "logit delta" : "logit"}`}.`;
    }
    const detail = realizedDetail ? `${topDetail} ${realizedDetail}` : topDetail;
    return { candidates, realized, top, code, coordinate, detail, realizedDetail, kind };
  }

  function renderCandidateRows(descriptor) {
    const realizedId = descriptor.realized?.id;
    return descriptor.candidates.map((candidate) => {
      const realized = Number(candidate.id) === Number(realizedId);
      return `
        <div class="candidate-row${realized ? " realized" : ""}">
          <span class="candidate-rank">#${escapeHTML(formatInteger(candidate.rank))}</span>
          <span class="candidate-label">${escapeHTML(candidateLabel(candidate, descriptor.code))}</span>
          <span class="candidate-score">${escapeHTML(candidateScore(candidate, descriptor.kind))}</span>
        </div>
      `;
    }).join("");
  }

  function renderInspector() {
    const inspector = workspace.querySelector("#detail-inspector");
    if (!inspector) return;
    const { kind, layerIndex, position } = state.selection;
    const descriptor = descriptorFor(kind, layerIndex, position);
    const realized = descriptor.realized;
    const head = kind === "head" || kind === "tts-head";
    const top = descriptor.top;
    const scoreLabel = head ? "Actual probability" : descriptor.code ? "Fitted probability" : kind === "encoder" ? "Readout-logit delta" : "Readout logit";
    const realizedScore = realized?.excludedByFilter
      ? `Excluded by ≤${state.filterLimit} filter`
      : finite(realized?.probability) !== null
      ? formatProbability(realized.probability, 3)
      : finite(realized?.score) !== null
        ? `${formatScore(realized.score)} logit`
        : "Not in saved top 5";
    const realizedRank = realized?.excludedByFilter
      ? `Excluded · unfiltered #${formatInteger(realized?.unfilteredRank)}`
      : realized?.available === false
      ? "Not in saved top 5"
      : `#${formatInteger(realized?.rank)} / ${formatInteger(realized?.rankDenominator)}`;
    inspector.innerHTML = `
      <div class="inspector-top">
        <div><p class="section-label">PINNED CELL</p><h3>${escapeHTML(descriptor.coordinate)}</h3></div>
        <span class="inspector-kind${head ? " head" : ""}">${head ? "actual head" : "fitted/readout"}</span>
      </div>
      <div class="inspector-metrics">
        <div class="inspector-metric"><span>Realized target</span><strong>${escapeHTML(realized?.label || "—")}</strong></div>
        <div class="inspector-metric"><span>Realized rank</span><strong>${escapeHTML(realizedRank)}</strong></div>
        <div class="inspector-metric"><span>${escapeHTML(scoreLabel)}</span><strong>${escapeHTML(realizedScore)}</strong></div>
        <div class="inspector-metric"><span>Top candidate</span><strong>${escapeHTML(top ? candidateLabel(top, descriptor.code) : "—")}</strong></div>
      </div>
      <div class="candidate-heading"><strong>Cached candidates</strong><span>exact saved values</span></div>
      <div class="candidate-list">${renderCandidateRows(descriptor)}</div>
      <p class="inspector-note">${descriptor.code ? "Acoustic-code IDs are learned contextual symbols, not words or phonemes. Probabilities are softmax readouts; log values are log-probabilities, not absolute raw logits." : head ? "HEAD values are the base model's raw teacher-forced distribution before generation-time processors; they are not calibrated confidence." : "A fitted/readout score and rank measure output-space readability. They are not a calibrated emission probability or proof that the model causally used this candidate."}</p>
    `;
  }

  function traceMatrix(trace, key, title) {
    const rows = trace[key] || [];
    const layers = trace.layers || [];
    const tokens = trace.text_tokens || state.report.payload.input?.tokens || [];
    if (!rows.length || !tokens.length) return "";
    const header = `<div class="trace-row trace-header" style="--trace-count:${tokens.length}"><span></span>${tokens.map((token) => `<strong title="${escapeHTML(token.text)}">${escapeHTML(compactText(token.text))}</strong>`).join("")}</div>`;
    const bodyRows = rows.map((values, rowIndex) => `
      <div class="trace-row" style="--trace-count:${tokens.length}">
        <span>L${escapeHTML(layers[rowIndex] ?? rowIndex)}</span>
        ${values.map((value, tokenIndex) => `<div class="trace-cell" style="--trace-strength:${clamp(Number(value) || 0, 0, 1).toFixed(4)}" title="${escapeHTML(`${title}, L${layers[rowIndex] ?? rowIndex}, ${compactText(tokens[tokenIndex]?.text)}: ${formatProbability(value, 2)}`)}"><b>${escapeHTML(formatProbability(value, 0))}</b></div>`).join("")}
      </div>
    `).join("");
    return `<section class="trace-subpanel"><h4>${escapeHTML(title)}</h4><div class="trace-matrix">${header}${bodyRows}</div></section>`;
  }

  function renderTrace() {
    const target = workspace.querySelector("#trace-panel");
    if (!target) return;
    if (family !== "tts") {
      target.innerHTML = "";
      return;
    }
    const trace = state.report.payload.traces_by_position?.[String(state.selectedToken)];
    if (!trace) {
      target.innerHTML = "";
      return;
    }
    target.innerHTML = `
      <section class="trace-panel">
        <header class="explorer-panel-heading">
          <div><p class="section-label">LOCAL TEXT DIAGNOSTICS · S${state.selectedToken + 1}</p><h3>Locate this saved speech position back to the prompt</h3></div>
          <p>Gradient share and self-attention are separate per-run diagnostics. Neither is the fitted J-lens, a word alignment, or an explanation of the final waveform.</p>
        </header>
        <div class="trace-pair">
          ${traceMatrix(trace, "gradient_share", "Cross-Jacobian gradient share")}
          ${traceMatrix(trace, "attention_share", "Text-prefix self-attention share")}
        </div>
      </section>
    `;
  }

  function syncSelectionDOM() {
    if (!state.report) return;
    workspace.querySelectorAll(".position-button, .speech-position-token").forEach((button) => {
      const selected = Number(button.dataset.tokenPosition) === state.selectedToken;
      button.setAttribute("aria-pressed", String(selected));
    });
    workspace.querySelectorAll(".wave-region").forEach((button) => {
      const selected = Number(button.dataset.encoderPosition) === state.selectedEncoder;
      button.setAttribute("aria-pressed", String(selected));
    });
    workspace.querySelectorAll(".matrix-cell").forEach((cell) => {
      const kind = cell.dataset.kind;
      const position = Number(cell.dataset.position);
      const layerIndex = Number(cell.dataset.layerIndex);
      const exact = kind === state.selection.kind && position === state.selection.position && layerIndex === state.selection.layerIndex;
      const shared = kind === "encoder" ? position === state.selectedEncoder : position === state.selectedToken;
      cell.classList.toggle("selected", exact);
      cell.classList.toggle("same-position", shared);
      cell.setAttribute("aria-pressed", String(exact));
    });
    const line = workspace.querySelector("#selected-position-line");
    if (line) {
      const selected = tokenList()[state.selectedToken];
      const value = family === "tts" ? `ID ${selected?.id}` : compactText(selected?.text);
      line.innerHTML = `<strong>${escapeHTML(family === "tts" ? `S${state.selectedToken + 1}` : `Token ${state.selectedToken + 1}`)} · ${escapeHTML(value)}</strong> · ${escapeHTML(selectionCoordinateText())}`;
    }
    const selection = workspace.querySelector(".wave-selection");
    if (selection) {
      const duration = finite(state.report.payload.audio?.duration_seconds) || 1;
      const window = family === "asr" ? encoderWindow(state.selectedEncoder) : null;
      const token = tokenList()[state.selectedToken];
      const start = window?.start ?? finite(token?.start_seconds);
      const end = window?.end ?? finite(token?.end_seconds);
      if (start === null || start === undefined || end === null || end === undefined) {
        selection.hidden = true;
      } else {
        selection.hidden = false;
        selection.style.setProperty("--left", `${clamp(start / duration * 100, 0, 100).toFixed(4)}%`);
        selection.style.setProperty("--width", `${clamp((end - start) / duration * 100, 0, 100).toFixed(4)}%`);
      }
    }
    renderInspector();
    renderTrace();
    syncPlayheadDOM();
  }

  function syncPlayheadDOM() {
    const duration = finite(state.report?.payload?.audio?.duration_seconds);
    const playhead = workspace.querySelector(".wave-playhead");
    if (playhead && duration) playhead.style.left = `${clamp(state.audioTime / duration * 100, 0, 100).toFixed(4)}%`;
    const hasTimedTokens = family !== "tts" && tokenList().some((token) => finite(token.start_seconds) !== null || finite(token.end_seconds) !== null);
    const playingToken = hasTimedTokens ? nearestTokenForTime(state.audioTime) : -1;
    const playingEncoder = family === "asr" ? nearestEncoderForTime(state.audioTime) : -1;
    workspace.querySelectorAll(".position-button").forEach((button) => button.classList.toggle("playing", Number(button.dataset.tokenPosition) === playingToken));
    workspace.querySelectorAll(".wave-region").forEach((button) => button.classList.toggle("playing", Number(button.dataset.encoderPosition) === playingEncoder));
  }

  async function toggleFilter(enabled) {
    state.filterEnabled = enabled;
    if (!enabled) {
      state.filterStatus = "idle";
      renderWorkspace();
      return;
    }
    if (state.filterCache) {
      renderWorkspace();
      return;
    }
    const cache = state.report.cache_policy?.character_length_filter_cache || state.reportEntry.character_length_filter_cache;
    if (!cache?.url) {
      state.filterStatus = "error";
      state.filterError = "This report did not publish a character-length cache.";
      renderWorkspace();
      return;
    }
    state.filterController?.abort();
    const controller = new AbortController();
    state.filterController = controller;
    state.filterStatus = "loading";
    renderWorkspace();
    try {
      const payload = validateFilterCache(await fetchJSON(cache.url, { signal: controller.signal }));
      state.filterCache = payload;
      state.filterStatus = "ready";
      state.filterError = "";
      renderWorkspace();
    } catch (error) {
      if (error?.name === "AbortError") return;
      state.filterStatus = "error";
      state.filterError = error instanceof Error ? error.message : String(error);
      renderWorkspace();
    } finally {
      if (state.filterController === controller) state.filterController = null;
    }
  }

  function renderTooltipFor(cell) {
    const kind = cell.dataset.kind;
    const layerIndex = Number(cell.dataset.layerIndex);
    const position = Number(cell.dataset.position);
    const descriptor = descriptorFor(kind, layerIndex, position);
    tooltip.innerHTML = `
      <strong>${escapeHTML(descriptor.coordinate)}</strong>
      <span>${escapeHTML(descriptor.detail)}</span>
      ${descriptor.candidates.slice(0, 3).map((candidate) => `<span>#${escapeHTML(formatInteger(candidate.rank))} · ${escapeHTML(candidateLabel(candidate, descriptor.code))} · ${escapeHTML(candidateScore(candidate, descriptor.kind))}</span>`).join("")}
    `;
    tooltip.hidden = false;
  }

  function positionTooltip(clientX, clientY, cell) {
    if (tooltip.hidden) return;
    const rect = tooltip.getBoundingClientRect();
    const cellRect = cell?.getBoundingClientRect();
    const sourceX = finite(clientX) ?? (cellRect ? cellRect.left + cellRect.width / 2 : 10);
    const sourceY = finite(clientY) ?? (cellRect ? cellRect.bottom : 10);
    const left = clamp(sourceX + 12, 10, window.innerWidth - rect.width - 10);
    let top = sourceY + 12;
    if (top + rect.height > window.innerHeight - 10) top = Math.max(10, sourceY - rect.height - 12);
    tooltip.style.left = `${left}px`;
    tooltip.style.top = `${top}px`;
  }

  function hideTooltip() {
    state.tooltipTarget = null;
    tooltip.hidden = true;
  }

  sampleList.addEventListener("click", (event) => {
    const button = event.target.closest("[data-sample-index]");
    if (!button) return;
    loadReport(Number(button.dataset.sampleIndex));
  });

  sampleList.addEventListener("input", (event) => {
    if (event.target.id !== "sample-search") return;
    state.sampleQuery = event.target.value;
    renderSampleButtons();
  });

  sampleList.addEventListener("keydown", (event) => {
    if (event.target.id === "sample-search" && event.key === "Escape" && state.sampleQuery) {
      event.preventDefault();
      state.sampleQuery = "";
      event.target.value = "";
      renderSampleButtons();
      return;
    }
    const button = event.target.closest("[data-sample-index]");
    if (!button || !["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Home", "End"].includes(event.key)) return;
    const buttons = [...sampleList.querySelectorAll("[data-sample-index]")];
    const current = buttons.indexOf(button);
    if (current < 0 || !buttons.length) return;
    event.preventDefault();
    let next = current;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = buttons.length - 1;
    if (event.key === "ArrowLeft" || event.key === "ArrowUp") next = Math.max(0, current - 1);
    if (event.key === "ArrowRight" || event.key === "ArrowDown") next = Math.min(buttons.length - 1, current + 1);
    buttons[next].focus();
  });

  workspace.addEventListener("click", (event) => {
    const token = event.target.closest("[data-token-position]");
    if (token) {
      selectCoordinate(family === "tts" ? "tts-head" : "head", 0, Number(token.dataset.tokenPosition), { seek: family === "asr" });
      return;
    }
    const region = event.target.closest("[data-encoder-position]");
    if (region) {
      selectCoordinate("encoder", 0, Number(region.dataset.encoderPosition), { seek: true });
      return;
    }
    const cell = event.target.closest(".matrix-cell");
    if (cell) selectCoordinate(cell.dataset.kind, Number(cell.dataset.layerIndex), Number(cell.dataset.position));
  });

  workspace.addEventListener("change", (event) => {
    if (event.target.id === "static-filter-toggle") toggleFilter(event.target.checked);
    if (event.target.id === "static-filter-limit") {
      state.filterLimit = clamp(Math.round(Number(event.target.value) || 2), 1, 64);
      if (state.filterEnabled && state.filterCache) renderWorkspace();
    }
  });

  workspace.addEventListener("keydown", (event) => {
    const cell = event.target.closest(".matrix-cell");
    if (!cell || !["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(event.key)) return;
    event.preventDefault();
    const kind = cell.dataset.kind;
    let layerIndex = Number(cell.dataset.layerIndex);
    let position = Number(cell.dataset.position);
    if (event.key === "ArrowLeft") position -= 1;
    if (event.key === "ArrowRight") position += 1;
    if (event.key === "ArrowUp") layerIndex -= 1;
    if (event.key === "ArrowDown") layerIndex += 1;
    const sameKind = [...workspace.querySelectorAll(`.matrix-cell[data-kind="${kind}"]`)];
    const target = sameKind.find((candidate) => Number(candidate.dataset.layerIndex) === layerIndex && Number(candidate.dataset.position) === position);
    if (target) {
      target.focus();
      selectCoordinate(kind, layerIndex, position);
    }
  });

  workspace.addEventListener("mouseover", (event) => {
    const cell = event.target.closest(".matrix-cell");
    if (!cell || cell === state.tooltipTarget) return;
    state.tooltipTarget = cell;
    renderTooltipFor(cell);
    positionTooltip(event.clientX, event.clientY, cell);
  });
  workspace.addEventListener("mousemove", (event) => {
    if (state.tooltipTarget) positionTooltip(event.clientX, event.clientY, state.tooltipTarget);
  });
  workspace.addEventListener("mouseout", (event) => {
    const cell = event.target.closest(".matrix-cell");
    if (cell && !cell.contains(event.relatedTarget)) hideTooltip();
  });
  workspace.addEventListener("focusin", (event) => {
    const cell = event.target.closest(".matrix-cell");
    if (!cell) return;
    state.tooltipTarget = cell;
    renderTooltipFor(cell);
    positionTooltip(null, null, cell);
  });
  workspace.addEventListener("focusout", (event) => {
    if (event.target.closest(".matrix-cell")) hideTooltip();
  });
  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") hideTooltip();
  });
  window.addEventListener("scroll", hideTooltip, { passive: true });
  window.addEventListener("resize", hideTooltip);

  async function init() {
    try {
      if (!family || !manifestUrl) throw new Error("This static explorer is missing its family configuration.");
      state.manifest = validateManifest(await fetchJSON(manifestUrl));
      const requested = new URLSearchParams(window.location.search).get("sample");
      const requestedIndex = state.manifest.reports.findIndex((entry) => entry.id === requested);
      state.reportIndex = requestedIndex >= 0 ? requestedIndex : 0;
      renderSampleButtons();
      await loadReport(state.reportIndex);
    } catch (error) {
      showError(error);
    }
  }

  init();
})();
