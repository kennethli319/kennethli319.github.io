"use strict";

(() => {
  const familyKey = document.body.dataset.family;
  const dataPath = document.body.dataset.dataUrl;
  const listNode = document.querySelector("#example-list");
  const detailNode = document.querySelector("#report-detail");
  let family = null;
  let examples = [];

  const escapeHtml = (value) => String(value ?? "").replace(/[&<>"']/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  })[character]);

  const asText = (value) => {
    if (value == null) return "";
    if (typeof value === "string" || typeof value === "number") return String(value);
    return value.label || value.text || value.name || value.id || value.detail || "";
  };

  const first = (object, keys, fallback = "") => {
    for (const key of keys) {
      const parts = key.split(".");
      let value = object;
      for (const part of parts) value = value?.[part];
      if (value !== undefined && value !== null && value !== "") return value;
    }
    return fallback;
  };

  const humanize = (value) => String(value ?? "")
    .replace(/[_-]+/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());

  const formatRank = (rank) => {
    const numeric = Number(rank);
    return Number.isFinite(numeric) ? `#${numeric.toLocaleString()}` : "—";
  };

  const formatProbability = (value) => {
    if (value === null || value === undefined || value === "") return "";
    if (typeof value === "string") return value.includes("%") ? value : value;
    const numeric = Number(value);
    if (!Number.isFinite(numeric)) return "";
    const percent = numeric <= 1 ? numeric * 100 : numeric;
    if (percent >= 10) return `${percent.toFixed(1)}%`;
    if (percent >= 1) return `${percent.toFixed(2)}%`;
    if (percent >= .01) return `${percent.toFixed(3)}%`;
    return `${percent.toFixed(4)}%`;
  };

  const statusInfo = (example) => {
    const raw = first(example, ["status", "publication_status", "rights_status", "input.rights_status", "evidence_status"], "Recorded report");
    const label = asText(raw) || "Recorded report";
    const normalized = label.toLowerCase();
    let tone = first(example, ["status_tone", "status.tone"], "");
    if (!tone) {
      if (/review|diagnostic|provisional/.test(normalized)) tone = "review";
      else if (/failure|blocked|screen|negative|withheld/.test(normalized)) tone = "caution";
      else tone = "ready";
    }
    return { label: humanize(label), tone };
  };

  const sourceText = (example) => {
    const source = first(example, ["source", "source_label", "input.source", "input.utterance_id", "input.prompt", "prompt"], "Recorded sample");
    if (typeof source === "object") return source.label || source.name || source.path || source.id || "Recorded sample";
    return String(source);
  };

  const inputText = (example) => asText(first(example, [
    "input_text", "transcript", "prompt", "input.transcript", "input.prompt", "input.text", "reference",
  ], ""));

  const outputText = (example) => asText(first(example, [
    "output_text", "generated.text", "generated_text", "generated", "output.text", "model_output", "focus.label",
  ], ""));

  const rankDenominator = (example) => Number(first(example, [
    "rank_denominator", "rank_semantics.rank_denominator", "provenance.rank_semantics.rank_denominator",
  ], first(family, ["rank_denominator", "rank_semantics.rank_denominator", "provenance.rank_semantics.rank_denominator"], 10000))) || 10000;

  function toRankArray(value, layers) {
    if (Array.isArray(value)) return value.map((item) => typeof item === "object" ? first(item, ["rank", "value"], null) : item);
    if (value && typeof value === "object") return layers.map((layer) => value[layer] ?? value[layer.toLowerCase()] ?? null);
    return [];
  }

  function toProbabilityArray(value, layers) {
    if (Array.isArray(value)) return value.map((item) => typeof item === "object" ? first(item, ["probability", "prob", "value"], null) : item);
    if (value && typeof value === "object") return layers.map((layer) => value[layer] ?? value[layer.toLowerCase()] ?? null);
    return [];
  }

  function layerLabels(example, rawTrack) {
    let layers = first(example, ["layers", "layer_labels"], first(family, ["layers", "layer_labels"], []));
    if (!Array.isArray(layers)) layers = [];
    layers = layers.map((layer) => typeof layer === "number" ? `L${layer}` : String(layer).toUpperCase());
    if (!layers.length && Array.isArray(rawTrack?.trajectory)) {
      layers = rawTrack.trajectory.map((point) => String(point.layer ?? point.label ?? ""));
    }
    if (!layers.length) {
      const sourceLayers = first(example, ["provenance.lens.source_layers"], first(family, ["provenance.lens.source_layers"], []));
      if (Array.isArray(sourceLayers)) layers = sourceLayers.map((layer) => `L${layer}`);
    }
    return layers;
  }

  function normalizeTracks(example) {
    let rawTracks = first(example, ["tracks", "tracked_tokens", "tracked_outputs", "tokens", "rank_tracks"], []);
    if (!Array.isArray(rawTracks)) rawTracks = [];
    if (!rawTracks.length && first(example, ["trajectory", "ranks"], null)) rawTracks = [example];

    return rawTracks.map((raw, index) => {
      let layers = layerLabels(example, raw);
      let ranks = toRankArray(first(raw, ["ranks", "rank_by_layer", "trajectory"], []), layers);
      const percentValues = first(raw, ["probability_percent"], null);
      let probabilities = toProbabilityArray(first(raw, ["probabilities", "probability_by_layer", "probs"], []), layers);
      if (Array.isArray(percentValues)) probabilities = percentValues.map((value) => value == null ? null : `${value}%`);

      if (Array.isArray(raw.trajectory) && raw.trajectory.some((point) => typeof point === "object")) {
        if (!layers.length) layers = raw.trajectory.map((point) => String(point.layer ?? point.label ?? ""));
        ranks = raw.trajectory.map((point) => first(point, ["rank", "value"], null));
        probabilities = raw.trajectory.map((point) => first(point, ["probability", "prob"], null));
      }

      const headRank = first(raw, ["head_rank", "actual_head_rank"], null);
      if (headRank !== null && !layers.some((layer) => layer === "HEAD")) {
        layers.push("HEAD");
        ranks.push(headRank);
        probabilities.push(first(raw, ["head_probability", "actual_head_probability"], null));
      }

      const headIndex = layers.findIndex((layer) => String(layer).toUpperCase() === "HEAD");
      const rawHeadProbability = first(raw, ["head_probability", "actual_head_probability"], null);
      if (headIndex >= 0 && rawHeadProbability !== null) {
        while (probabilities.length < ranks.length) probabilities.push(null);
        probabilities[headIndex] = rawHeadProbability;
      }

      const fittedLogits = first(raw, ["fitted_target_logits"], null);
      if (Array.isArray(fittedLogits)) {
        while (probabilities.length < ranks.length) probabilities.push(null);
        fittedLogits.forEach((value, metricIndex) => {
          if (value != null) probabilities[metricIndex] = `logit ${Number(value).toFixed(3)}`;
        });
        if (headIndex >= 0 && rawHeadProbability !== null) probabilities[headIndex] = rawHeadProbability;
      }

      while (layers.length < ranks.length) layers.push(`L${layers.length}`);
      let denominators = Array.isArray(raw.rank_denominators) ? raw.rank_denominators.slice(0, ranks.length) : [];
      while (denominators.length < ranks.length) denominators.push(rankDenominator(example));
      let rankSpaces = Array.isArray(raw.rank_spaces) ? raw.rank_spaces.slice(0, ranks.length) : [];
      while (rankSpaces.length < ranks.length) rankSpaces.push("");
      const timeWindow = first(raw, ["time_window_seconds"], null);
      return {
        token: asText(first(raw, ["token", "text", "label", "candidate", "token_id", "code_id"], `Candidate ${index + 1}`)),
        note: asText(first(raw, ["note", "role", "description"], "")),
        layers: layers.slice(0, ranks.length),
        ranks,
        probabilities,
        denominators,
        rankSpaces,
        timeWindow,
      };
    }).filter((track) => track.ranks.length);
  }

  function evidenceStrength(rank, denominator) {
    const numeric = Math.max(1, Number(rank) || denominator);
    return Math.max(.04, Math.min(1, 1 - Math.log10(numeric) / Math.log10(Math.max(10, denominator))));
  }

  function rankCell(layer, rank, probability, denominator, rankSpace, trackLabel, timeWindow) {
    const isHead = String(layer).toUpperCase() === "HEAD";
    const formattedRank = formatRank(rank);
    const formattedProbability = formatProbability(probability);
    const kind = isHead ? "actual output head" : "fitted intermediate readout";
    const time = timeWindow && Number.isFinite(Number(timeWindow.start)) && Number.isFinite(Number(timeWindow.end))
      ? ` · ${Number(timeWindow.start).toFixed(2)}–${Number(timeWindow.end).toFixed(2)} s (model-derived)` : "";
    const space = rankSpace ? ` · ${humanize(rankSpace)}` : "";
    const tooltip = `${trackLabel} · ${layer} · global rank ${formattedRank} of ${Number(denominator).toLocaleString()}${formattedProbability ? ` · ${formattedProbability}` : ""}${space}${time} · ${kind}`;
    return `<button type="button" class="rank-cell${isHead ? " head" : ""}" style="--strength:${evidenceStrength(rank, denominator).toFixed(3)}" data-tooltip="${escapeHtml(tooltip)}" aria-label="${escapeHtml(tooltip)}"><span>${escapeHtml(layer)}</span><strong>${escapeHtml(formattedRank)}</strong>${formattedProbability ? `<small>${escapeHtml(formattedProbability)}</small>` : ""}</button>`;
  }

  function trajectoryMarkup(example) {
    const tracks = normalizeTracks(example);
    if (!tracks.length) return `<section class="trajectory-panel"><div class="panel-heading"><div><p class="overline">RECORDED TRAJECTORY</p><h4>No token trajectory is included in this report.</h4></div></div></section>`;
    const denominators = [...new Set(tracks.flatMap((track) => track.denominators).filter(Boolean).map(Number))];
    let denominatorLabel = "Exact denominator is shown for every slice";
    if (familyKey === "tts" && denominators.length === 1) denominatorLabel = `Global rank of ${denominators[0].toLocaleString()} raw head entries`;
    else if (denominators.length === 1) denominatorLabel = `Global rank of ${denominators[0].toLocaleString()} vocabulary entries`;
    else if (denominators.length === 2) denominatorLabel = `Fitted: ${denominators[0].toLocaleString()} entries · HEAD: ${denominators[1].toLocaleString()} entries`;
    const rows = tracks.map((track) => `<section class="rank-track"><div class="track-label"><strong>${escapeHtml(track.token)}</strong>${track.note ? `<span>${escapeHtml(track.note)}</span>` : ""}</div><div class="rank-grid" style="--layer-count:${track.layers.length}">${track.ranks.map((rank, index) => rankCell(track.layers[index], rank, track.probabilities[index], track.denominators[index], track.rankSpaces[index], track.token, track.timeWindow)).join("")}</div></section>`).join("");
    return `<section class="trajectory-panel"><div class="panel-heading"><div><p class="overline">REALIZED-CANDIDATE RANK</p><h4>How the selected output resolves through depth</h4></div><p>${escapeHtml(denominatorLabel)} · hover or focus a slice</p></div><div class="legend" aria-label="Trajectory legend"><span><i></i>Fitted readout</span><span><i class="head"></i>Actual HEAD</span><span><i class="strong"></i>Darker = stronger rank</span></div>${rows}<p class="selection-detail" aria-live="polite">Focus a layer slice to pin its exact value here.</p></section>`;
  }

  function normalizeDiagnostics(example) {
    const raw = first(example, ["diagnostics", "trace", "text_diagnostics", "local_text_diagnostics", "local_text_trace"], []);
    if (Array.isArray(raw)) return raw;
    if (raw && typeof raw === "object") {
      return Object.entries(raw).flatMap(([kind, values]) => Array.isArray(values)
        ? values.map((item) => ({ ...item, kind: item.kind || humanize(kind) }))
        : [{ kind: humanize(kind), value: values }]);
    }
    return [];
  }

  function diagnosticsMarkup(example) {
    const diagnostics = normalizeDiagnostics(example);
    if (!diagnostics.length) return "";
    return `<section class="diagnostics-panel"><div class="panel-heading"><div><p class="overline">LOCAL TEXT DIAGNOSTICS</p><h4>Association and sensitivity around this speech position</h4></div><p>These values are not word alignment or percent causation.</p></div><div class="diagnostic-grid">${diagnostics.map((item) => {
      const kind = asText(first(item, ["kind", "type", "metric", "metric_kind"], "Diagnostic"));
      const layer = asText(first(item, ["layer"], ""));
      const token = asText(first(item, ["token", "text", "label", "text_token"], "Selected text"));
      const rawPercent = first(item, ["value_percent"], null);
      const value = rawPercent !== null ? `${rawPercent}%` : formatProbability(first(item, ["value", "share", "probability"], ""));
      const note = asText(first(item, ["note", "description", "detail", "interpretation"], ""));
      return `<article class="diagnostic"><span>${escapeHtml(kind)}${layer ? ` · ${escapeHtml(layer)}` : ""}</span><strong>${escapeHtml(token)}${value ? ` <em>${escapeHtml(value)}</em>` : ""}</strong>${note ? `<p>${escapeHtml(note)}</p>` : ""}</article>`;
    }).join("")}</div><p class="boundary-note">Gradient share measures local sensitivity. Attention share measures routing association. Only a replayed edit is an intervention.</p></section>`;
  }

  function normalizeIntervention(example) {
    return first(example, ["intervention", "residual_intervention", "cached_intervention", "steering"], null);
  }

  function candidateInfo(value, fallbackLabel) {
    if (!value || typeof value !== "object") return { id: asText(value) || fallbackLabel, rank: "", probability: "" };
    return {
      id: asText(first(value, ["id", "code_id", "token_id", "label"], fallbackLabel)),
      rank: first(value, ["rank", "head_rank"], ""),
      probability: first(value, ["probability_percent", "probability", "head_probability", "prob"], ""),
      probabilityIsPercent: value.probability_percent !== undefined,
    };
  }

  function interventionMarkup(example) {
    const intervention = normalizeIntervention(example);
    if (!intervention) return "";
    const baseline = candidateInfo(first(intervention, ["baseline", "winner", "baseline_winner"], null), "Baseline");
    const candidate = candidateInfo(first(intervention, ["candidate", "runner_up", "baseline_runner_up", "alternative"], null), "Candidate");
    const steered = candidateInfo(first(intervention, ["steered", "result", "after", "steered_output"], null), candidate.id);
    const editedLayers = first(intervention, ["edited_layers"], []);
    const relativeNorm = first(intervention, ["relative_residual_norm_per_edited_coordinate"], null);
    const budget = asText(first(intervention, ["budget", "steering_budget", "relative_norm"], relativeNorm !== null ? `${relativeNorm} relative residual norm at ${Array.isArray(editedLayers) ? editedLayers.join(" + ") : editedLayers}` : "Recorded residual edit"));
    const suffix = first(intervention, ["suffix_effect"], null);
    let summary = asText(first(intervention, ["propagation", "summary", "result_summary", "effect"], ""));
    if (!summary && suffix) summary = `${suffix.same_index_codes_changed} of ${suffix.total_same_index_codes_compared} same-index codes changed; ${suffix.downstream_codes_changed} were downstream. Sequence length ${suffix.baseline_sequence_length} → ${suffix.steered_sequence_length}.`;
    const branchCheck = asText(first(intervention, ["branch_check"], ""));
    if (branchCheck) summary = `${summary}${summary ? " " : ""}${branchCheck}`;
    const step = (label, item, tone = "") => `<article class="intervention-step ${tone}"><span>${escapeHtml(label)}</span><strong>ID ${escapeHtml(item.id)}</strong><p>${item.rank !== "" ? `${escapeHtml(formatRank(item.rank))}` : ""}${item.probability !== "" ? ` · ${escapeHtml(item.probabilityIsPercent ? `${item.probability}%` : formatProbability(item.probability))}` : ""}</p></article>`;
    return `<section class="intervention-panel"><div class="panel-heading"><div><p class="overline">CACHED RESIDUAL INTERVENTION</p><h4>A recorded edit changes the emitted candidate</h4></div><p>${escapeHtml(budget)} · replay only, no model runs here</p></div><div class="intervention-flow">${step("Baseline winner", baseline)}<i class="flow-arrow" aria-hidden="true">→</i>${step("Baseline alternative", candidate)}<i class="flow-arrow" aria-hidden="true">→</i>${step("After residual edit", steered, "steered")}</div>${summary ? `<p class="intervention-summary">${escapeHtml(summary)}</p>` : ""}</section>`;
  }

  function resolveAudioUrl(rawUrl) {
    if (!rawUrl) return "";
    try {
      if (/^(https?:)?\/\//.test(rawUrl) || rawUrl.startsWith("/")) return rawUrl;
      const dataUrl = new URL(dataPath, window.location.href);
      const siteRoot = new URL("../", dataUrl);
      return new URL(rawUrl, siteRoot).href;
    } catch { return ""; }
  }

  function audioMarkup(example) {
    const rawUrl = asText(first(example, ["input_audio_url", "audio_url", "input.audio_url", "input.audio", "input.asset_path"], ""));
    const url = resolveAudioUrl(rawUrl);
    if (!url) return "";
    return `<div class="audio-wrap"><label>Rights-cleared source audio</label><audio controls preload="metadata" src="${escapeHtml(url)}">Your browser cannot play this audio file.</audio></div>`;
  }

  function metaEntries(example) {
    const model = first(example, ["model", "provenance.model", "model_id"], first(family, ["model", "provenance.model"], ""));
    const lens = first(example, ["lens", "provenance.lens"], first(family, ["lens", "provenance.lens"], ""));
    const license = first(example, ["license", "input.license", "rights.license"], "");
    const relation = first(example, ["fit_relationship", "evaluation_relationship"], "");
    const entries = [
      ["Report ID", first(example, ["id", "report_id"], "")],
      ["Model", typeof model === "object" ? first(model, ["id", "name"], "") : model],
      ["Lens", typeof lens === "object" ? first(lens, ["label", "id", "method", "projection_method"], "Recorded fitted readout") : lens],
      ["Fit relationship", typeof relation === "object" ? first(relation, ["kind", "detail"], "") : relation],
      ["Rank space", first(example, ["rank_space", "rank_semantics.rank_space", "provenance.rank_semantics.rank_space"], first(family, ["rank_semantics.rank_space", "provenance.rank_semantics.rank_space"], "Full eligible vocabulary"))],
      ["Rank denominator", rankDenominator(example).toLocaleString()],
      ["License", typeof license === "object" ? asText(license) : license],
      ["Source hash", first(example, ["input.sha256", "audio_sha256", "sha256"], "")],
    ];
    return entries.filter(([, value]) => value !== "" && value != null);
  }

  function provenanceMarkup(example) {
    const entries = metaEntries(example);
    let caveats = first(example, ["caveats", "limitations", "boundary"], []);
    if (!Array.isArray(caveats)) caveats = caveats ? [caveats] : [];
    return `<section class="provenance-panel"><details><summary>Provenance, rank semantics, and limitations</summary>${entries.length ? `<dl class="meta-list">${entries.map(([label, value]) => `<div class="meta-item"><dt>${escapeHtml(label)}</dt><dd>${escapeHtml(asText(value))}</dd></div>`).join("")}</dl>` : ""}${caveats.length ? `<ul class="caveat-list">${caveats.map((item) => `<li>${escapeHtml(asText(item))}</li>`).join("")}</ul>` : ""}</details></section>`;
  }

  function populationText(value) {
    if (!value) return "";
    if (typeof value !== "object") return asText(value);
    const parts = [];
    if (value.screened_positions != null) parts.push(`${Number(value.screened_positions).toLocaleString()} screened positions`);
    if (value.screened_prompt_count != null) parts.push(`${Number(value.screened_prompt_count).toLocaleString()} prompts`);
    if (value.median_rank_L0 != null) parts.push(`median L0 rank ${Number(value.median_rank_L0).toLocaleString()}`);
    if (value.median_rank_L22 != null) parts.push(`median L22 rank ${Number(value.median_rank_L22).toLocaleString()}`);
    if (value.top1_rate_L22_percent != null) parts.push(`${value.top1_rate_L22_percent}% rank 1 at L22`);
    return parts.join(" · ");
  }

  function reportMarkup(example) {
    const status = statusInfo(example);
    const title = asText(first(example, ["title", "headline", "label"], humanize(first(example, ["id"], "Recorded report"))));
    const eyebrow = humanize(asText(first(example, ["eyebrow", "teaching_role", "category"], "Recorded report")));
    const input = inputText(example);
    const output = outputText(example);
    const purpose = asText(first(example, ["teaching_purpose", "purpose", "description", "summary"], "This cached report preserves the selected model run and its layer-by-layer readout."));
    const boundary = asText(first(example, ["boundary", "evidence_boundary", "what_it_does_not_prove"], "This selected run is inspectable evidence, not a population-level or causal claim."));
    const population = populationText(first(example, ["population", "population_context", "pooled_context"], ""));
    const outputDetail = asText(first(example, ["model_output.difference_from_reference", "generated.termination.termination_reason", "output.detail"], ""));
    return `<header class="report-header"><div><p class="overline">${escapeHtml(eyebrow)}</p><h3>${escapeHtml(title)}</h3></div><span class="status-badge ${escapeHtml(status.tone)}">${escapeHtml(status.label)}</span></header><div class="context-grid"><div class="context-block"><span>Source / prompt</span><strong>${escapeHtml(sourceText(example))}</strong>${input ? `<p>${escapeHtml(input)}</p>` : ""}</div><div class="context-block"><span>Recorded model path</span><strong>${escapeHtml(output || "Saved report output")}</strong>${outputDetail ? `<p>${escapeHtml(outputDetail)}</p>` : ""}</div></div><p class="purpose">${escapeHtml(purpose)}</p>${audioMarkup(example)}${trajectoryMarkup(example)}${diagnosticsMarkup(example)}${interventionMarkup(example)}${population ? `<aside class="population-note"><strong>Pooled context</strong><p>${escapeHtml(population)}</p></aside>` : ""}<aside class="evidence-boundary"><strong>What this report does not prove</strong><p>${escapeHtml(boundary)}</p></aside>${provenanceMarkup(example)}`;
  }

  function render(selectedId) {
    const selected = examples.find((example) => String(first(example, ["id", "report_id"], "")) === String(selectedId)) || examples[0];
    const selectedKey = String(first(selected, ["id", "report_id"], ""));
    listNode.innerHTML = examples.map((example, index) => {
      const key = String(first(example, ["id", "report_id"], index));
      const title = asText(first(example, ["short_title", "title", "headline", "label"], humanize(key)));
      const role = humanize(asText(first(example, ["teaching_role", "category"], "Recorded report")));
      return `<button type="button" class="example-button" data-report-id="${escapeHtml(key)}" aria-pressed="${key === selectedKey}"><span>${String(index + 1).padStart(2, "0")}</span><div><strong>${escapeHtml(title)}</strong><small>${escapeHtml(role)}</small></div></button>`;
    }).join("");
    detailNode.innerHTML = reportMarkup(selected);
    detailNode.setAttribute("aria-busy", "false");
    listNode.querySelectorAll("button").forEach((button) => button.addEventListener("click", () => render(button.dataset.reportId)));
  }

  function showError(message) {
    listNode.innerHTML = "";
    detailNode.setAttribute("aria-busy", "false");
    detailNode.innerHTML = `<div class="error-state" role="alert"><h3>Recorded reports are unavailable.</h3><p>${escapeHtml(message)} No live inference was attempted. Refresh after the static report bundle is restored.</p></div>`;
  }

  async function loadReports() {
    try {
      const response = await fetch(dataPath, { credentials: "same-origin", cache: "no-cache" });
      if (!response.ok) throw new Error(`The static report file returned HTTP ${response.status}.`);
      const data = await response.json();
      family = data.families?.[familyKey] ?? data[familyKey];
      if (!family) throw new Error(`The report file does not include the ${familyKey.toUpperCase()} family.`);
      examples = Array.isArray(family) ? family : (family.examples || family.reports || []);
      if (examples.length !== 3) throw new Error(`Expected exactly 3 ${familyKey.toUpperCase()} reports, but found ${examples.length}.`);
      render(first(examples[0], ["id", "report_id"], ""));
    } catch (error) {
      showError(error instanceof Error ? error.message : "The static report file could not be read.");
    }
  }

  const tooltip = document.createElement("div");
  tooltip.className = "tooltip";
  tooltip.setAttribute("role", "tooltip");
  tooltip.hidden = true;
  document.body.append(tooltip);

  function placeTooltip(target, x, y) {
    const text = target.dataset.tooltip || "";
    const [title, ...rest] = text.split(" · ");
    tooltip.innerHTML = `<strong>${escapeHtml(title)}</strong><span>${escapeHtml(rest.join(" · "))}</span>`;
    tooltip.hidden = false;
    const width = tooltip.offsetWidth;
    const height = tooltip.offsetHeight;
    tooltip.style.left = `${Math.max(10, Math.min(window.innerWidth - width - 10, x + 13))}px`;
    tooltip.style.top = `${Math.max(10, Math.min(window.innerHeight - height - 10, y + 13))}px`;
    const selection = target.closest(".trajectory-panel")?.querySelector(".selection-detail");
    if (selection) selection.innerHTML = `<strong>${escapeHtml(title)}</strong> · ${escapeHtml(rest.join(" · "))}`;
  }

  document.addEventListener("pointermove", (event) => {
    const target = event.target.closest?.("[data-tooltip]");
    if (target) placeTooltip(target, event.clientX, event.clientY);
    else tooltip.hidden = true;
  });
  document.addEventListener("pointerleave", () => { tooltip.hidden = true; });
  document.addEventListener("focusin", (event) => {
    const target = event.target.closest?.("[data-tooltip]");
    if (!target) return;
    const rect = target.getBoundingClientRect();
    placeTooltip(target, rect.left + rect.width / 2, rect.top + rect.height / 2);
  });
  document.addEventListener("focusout", () => { tooltip.hidden = true; });

  loadReports();
})();
