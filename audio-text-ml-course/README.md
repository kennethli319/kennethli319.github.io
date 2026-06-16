# Audio-Text Multimodal ML Course

A self-paced study guide for learning machine learning from the
fundamentals through audio/text multimodality, ASR, TTS, speech-to-speech
systems, efficient transformers, and efficient inference hosting.

Open `index.html` in a browser to read the website locally.

## Course Shape

- Foundation: math, Python, tensors, optimization, evaluation.
- Audio basics: waveform, STFT, mel features, tokenization, datasets.
- Text and sequence modeling: language modeling, attention, transformers.
- ASR: HMM/GMM history, CTC, encoder-decoder, RNN-T, Conformer, wav2vec 2.0,
  Whisper-style weak supervision.
- TTS: concatenative and parametric systems, Tacotron/WaveNet era,
  non-autoregressive TTS, VITS, neural codecs.
- Speech-to-speech: cascaded systems, shared state, streaming, barge-in,
  full-duplex constraints, direct speech models.
- Full-duplex speech-to-speech: native listen-while-speaking SpeechLMs,
  VAD-free micro-turn cascades, role-conditioned duplex agents, action streams,
  asynchronous retrieval, interactivity alignment, interruption handling,
  backchannel metrics, privacy checks, and benchmark gaps.
- System design: service decomposition, launch gates, latency budgets,
  privacy-safe telemetry, rollback, cost controls, and production incidents.
- Evaluation and RAG: WER/CER/entity metrics, retrieval recall, grounded answer
  evaluation, LLM judges, human review, monitoring, and rollout gates.
- Voice-agent benchmarks: task success, spoken RAG, multi-turn safety, speech
  repair, launch gates, slice regressions, cost-quality tradeoffs, and rollback
  decisions.
- Senior interview sprint: timed speech AI system design, R&D tradeoff,
  production debugging, MLOps, serving platform, and coding follow-up prompts.
- Evaluation and incident exams: senior prompts for ASR/TTS/RAG release gates,
  slice-aware launch decisions, privacy-safe debugging, drift, cost spikes, and
  rollback ranking utilities.
- Data and evaluation operations: dataset contracts, labeling rubrics, lineage,
  slice regressions, CI gates, drift monitoring, and privacy boundaries.
- Data flywheels and active learning: consent-aware sampling, labeling audits,
  data release diffs, privacy-safe review queues, slice quotas, and first-hour
  data incident debugging.
- Observability and SLOs: burn-rate alerts, dashboard design, drift slices,
  rollback recommendations, cost monitoring, and speech incident postmortems.
- Inference platform readiness: real-time versus batch isolation, launch gates,
  queue SLOs, cost regressions, shared serving platforms, and incident drills.
- Speech AI debugging casebook: hypothesis-driven incident response,
  slice-aware rollback decisions, spoken RAG failures, safety regressions, and
  privacy-safe incident packets.
- Model serving on-call: queue saturation, tail-latency triage, cost per
  successful voice turn, graceful degradation, rollback selection, and
  privacy-safe debugging for ASR, TTS, LLM, retrieval, and speech-to-speech
  serving.
- Load testing and chaos readiness: end-to-end speech load tests, dependency
  failure drills, retry-storm detection, capacity gates, graceful degradation,
  rollback triggers, and cost-aware launch decisions.
- Efficiency: quantization, distillation, adapters, LoRA, FlashAttention,
  KV-cache management, batching, llama.cpp/MLX/vLLM-style serving.
- Coding interviews: Blind 75 pattern practice, hidden-answer checkpoints,
  arrays, intervals, heaps, matrices, linked lists, graph/tree/DP invariants,
  strings, palindromes, tries, backtracking, bit manipulation, math, common
  mistakes, edge cases, and worked Python solutions.

## Suggested Use

Use this as a living study guide:

1. Read one module.
2. Implement the lab.
3. Write a short note in `notes/`.
4. Add benchmark results under `experiments/` without committing private audio.
5. Update the course when a concept becomes clear.

## Privacy

Do not commit private recordings, transcripts, voiceprints, or API tokens.
Use `data/private/` and `outputs/private/` for local-only material.
