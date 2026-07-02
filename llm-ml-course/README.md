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
- Research reading map: primary papers and official docs for Transformer,
  RoPE, FlashAttention, PyTorch SDPA, PagedAttention/vLLM, LoRA, DPO, and RAG.
- Production serving lesson: scheduler budgets, prefill/decode disaggregation,
  KV cache policy, prefix caching, chunked prefill, admission control, launch
  gates, metrics, and rollback checks.

## Suggested Use

1. Read one lesson.
2. Rebuild the smallest working code path from memory.
3. Add a short note in `notes/`.
4. Put benchmark outputs under `experiments/`.
5. Revisit the same concept through theory, PyTorch, and systems lenses.

## Privacy

Do not commit private prompts, documents, API keys, chat logs, model weights, or
proprietary eval data. Keep local-only work under ignored private folders.

## Research Sources

- Attention Is All You Need: https://arxiv.org/abs/1706.03762
- RoFormer / RoPE: https://arxiv.org/abs/2104.09864
- FlashAttention: https://arxiv.org/abs/2205.14135
- PyTorch scaled dot-product attention docs: https://docs.pytorch.org/docs/stable/generated/torch.nn.functional.scaled_dot_product_attention.html
- vLLM / PagedAttention paper: https://arxiv.org/abs/2309.06180
- vLLM documentation: https://docs.vllm.ai/
- vLLM paged attention design: https://docs.vllm.ai/en/latest/design/paged_attention/
- vLLM optimization and chunked prefill: https://docs.vllm.ai/en/stable/configuration/optimization/
- vLLM prefix caching design: https://docs.vllm.ai/en/stable/design/prefix_caching/
- vLLM disaggregated prefilling: https://docs.vllm.ai/en/latest/features/disagg_prefill/
- Ray Serve prefill/decode disaggregation: https://docs.ray.io/en/latest/serve/llm/user-guides/prefill-decode.html
- TensorRT-LLM documentation: https://nvidia.github.io/TensorRT-LLM/
- TensorRT-LLM disaggregated serving: https://nvidia.github.io/TensorRT-LLM/blogs/tech_blog/blog5_Disaggregated_Serving_in_TensorRT-LLM.html
- TensorRT-LLM paged KV cache notes: https://github.com/NVIDIA/TensorRT-LLM/blob/main/docs/source/legacy/advanced/gpt-attention.md
- Hugging Face cache strategies: https://huggingface.co/docs/transformers/en/kv_cache
- LoRA: https://arxiv.org/abs/2106.09685
- Direct Preference Optimization: https://arxiv.org/abs/2305.18290
- Retrieval-Augmented Generation: https://arxiv.org/abs/2005.11401
