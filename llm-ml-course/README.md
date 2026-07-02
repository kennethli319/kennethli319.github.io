# LLM ML Course

A public, self-paced course for learning large language model theory,
PyTorch implementation, and practical LLM systems. It is inspired by the
attached LLM interview and coding drill PDFs, but rewritten as original
course material with implementation checkpoints and hidden-answer prompts.

Hosted page target:

```text
https://kennethli319.github.io/llm-ml-course/
```

Open `index.html` locally to read the course without a build step.

## Course Shape

- Theory: probability, cross entropy, optimization, scaling laws, tokenization,
  transformer internals, attention variants, positional encodings, and RoPE.
- PyTorch: tensor shape discipline, stable softmax, losses, normalization,
  training loops, AdamW, gradient clipping, warmup cosine schedules, attention,
  MHA, GQA, MQA, SwiGLU, LoRA, and BPE-style tokenization.
- Decoding: greedy, beam search, temperature, top-k, top-p, repetition penalty,
  no-repeat n-gram checks, KV cache, and serving-time tradeoffs.
- Systems: batching, continuous batching, memory/cost math, fine-tuning,
  RAG, agents, evaluation, monitoring, and launch gates.
- Interview practice: explain-first coding prompts with complexity, edge cases,
  and common implementation bugs.

## Suggested Use

1. Read one lesson.
2. Rebuild the smallest working code path from memory.
3. Add a short note in `notes/`.
4. Put benchmark outputs under `experiments/`.
5. Revisit the same concept through theory, PyTorch, and systems lenses.

## Privacy

Do not commit private prompts, documents, API keys, chat logs, model weights, or
proprietary eval data. Keep local-only work under ignored private folders.
