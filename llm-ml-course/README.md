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
  transformer internals, attention variants, positional encodings, RoPE, ALiBi,
  and context-extension risks.
- PyTorch: tensor shape discipline, stable softmax, losses, normalization,
  training loops, AMP, torch.compile, AdamW, gradient clipping, warmup cosine
  schedules, attention, MHA, GQA, MQA, SwiGLU, LoRA, and BPE-style tokenization.
- Decoding: greedy, beam search, temperature, top-k, top-p, repetition penalty,
  no-repeat n-gram checks, KV cache, and serving-time tradeoffs.
- Systems: batching, continuous batching, memory/cost math, fine-tuning,
  RAG, agents, evaluation, monitoring, and launch gates.
- Interview practice: explain-first coding prompts with complexity, edge cases,
  and common implementation bugs.
- Research reading map: primary papers and official docs for Transformer,
  RoPE, FlashAttention, PyTorch SDPA, PagedAttention/vLLM, speculative
  decoding, LoRA, DPO, and RAG.
- Production serving lesson: scheduler budgets, prefill/decode disaggregation,
  KV cache policy, prefix caching, chunked prefill, admission control,
  speculative decoding gates, launch gates, metrics, and rollback checks.
- Evaluation lesson: eval case schemas, rubrics, LLM judge calibration,
  regression gates, operational metrics, and rollback evidence.

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
- ALiBi: https://arxiv.org/abs/2108.12409
- YaRN: https://arxiv.org/abs/2309.00071
- LongRoPE: https://arxiv.org/abs/2402.13753
- Hugging Face RoPE utilities: https://huggingface.co/docs/transformers/en/internal/rope_utils
- Hugging Face TGI RoPE scaling notes: https://huggingface.co/docs/text-generation-inference/en/basic_tutorials/preparing_model
- vLLM context extension: https://docs.vllm.ai/en/latest/features/context_extension/
- FlashAttention: https://arxiv.org/abs/2205.14135
- FlashAttention-3: https://arxiv.org/abs/2407.08608
- FlashAttention-3 implementation notes: https://github.com/togethercomputer/flash-attention-3
- PyTorch scaled dot-product attention docs: https://docs.pytorch.org/docs/stable/generated/torch.nn.functional.scaled_dot_product_attention.html
- PyTorch FlexAttention docs: https://docs.pytorch.org/docs/2.12/nn.attention.flex_attention.html
- PyTorch FlexAttention inference note: https://pytorch.org/blog/flexattention-for-inference/
- FlexAttention paper: https://arxiv.org/abs/2412.05496
- PyTorch torch.multinomial: https://docs.pytorch.org/docs/stable/generated/torch.multinomial.html
- Multi-Query Attention: https://arxiv.org/abs/1911.02150
- Grouped-Query Attention: https://arxiv.org/abs/2305.13245
- ORCA iteration-level scheduling: https://www.usenix.org/conference/osdi22/presentation/yu
- vLLM / PagedAttention paper: https://arxiv.org/abs/2309.06180
- vLLM documentation: https://docs.vllm.ai/
- vLLM paged attention design: https://docs.vllm.ai/en/latest/design/paged_attention/
- vLLM optimization and chunked prefill: https://docs.vllm.ai/en/stable/configuration/optimization/
- vLLM LoRA adapters: https://docs.vllm.ai/en/stable/features/lora/
- Hugging Face Text Generation Inference overview: https://huggingface.co/docs/text-generation-inference/en/index
- Hugging Face TGI LoRA: https://huggingface.co/docs/text-generation-inference/en/conceptual/lora
- Hugging Face TGI serving engine notes: https://huggingface.co/docs/inference-endpoints/en/engines/tgi
- vLLM prefix caching design: https://docs.vllm.ai/en/stable/design/prefix_caching/
- SGLang documentation: https://docs.sglang.io/
- SGLang hyperparameter tuning: https://docs.sglang.io/docs/advanced_features/hyperparameter_tuning
- LMSYS SGLang and RadixAttention blog: https://www.lmsys.org/blog/2024-01-17-sglang/
- SGLang / RadixAttention paper: https://arxiv.org/abs/2312.07104
- OpenAI prompt caching: https://developers.openai.com/api/docs/guides/prompt-caching
- OpenAI structured outputs: https://developers.openai.com/api/docs/guides/structured-outputs
- vLLM metrics: https://docs.vllm.ai/en/stable/design/metrics/
- vLLM disaggregated prefilling: https://docs.vllm.ai/en/latest/features/disagg_prefill/
- vLLM structured outputs: https://docs.vllm.ai/en/latest/features/structured_outputs/
- Hugging Face TGI guidance: https://huggingface.co/docs/text-generation-inference/en/basic_tutorials/using_guidance
- Ray Serve prefill/decode disaggregation: https://docs.ray.io/en/latest/serve/llm/user-guides/prefill-decode.html
- Ray Serve multi-LoRA deployment: https://docs.ray.io/en/latest/serve/llm/user-guides/multi-lora.html
- TensorRT-LLM documentation: https://nvidia.github.io/TensorRT-LLM/
- TensorRT-LLM in-flight batching overview: https://nvidia.github.io/TensorRT-LLM/overview.html
- TensorRT-LLM quantization: https://nvidia.github.io/TensorRT-LLM/latest/features/quantization.html
- TensorRT-LLM KV cache system: https://nvidia.github.io/TensorRT-LLM/latest/features/kvcache.html
- TensorRT-LLM KV cache reuse: https://nvidia.github.io/TensorRT-LLM/advanced/kv-cache-reuse.html
- TensorRT-LLM metrics collector: https://github.com/NVIDIA/TensorRT-LLM/blob/main/tensorrt_llm/metrics/collector.py
- TensorRT-LLM disaggregated serving: https://nvidia.github.io/TensorRT-LLM/blogs/tech_blog/blog5_Disaggregated_Serving_in_TensorRT-LLM.html
- TensorRT-LLM paged KV cache notes: https://github.com/NVIDIA/TensorRT-LLM/blob/main/docs/source/legacy/advanced/gpt-attention.md
- Hugging Face cache strategies: https://huggingface.co/docs/transformers/en/kv_cache
- Hugging Face cache explanation: https://huggingface.co/docs/transformers/en/cache_explanation
- Hugging Face bitsandbytes quantization: https://huggingface.co/docs/transformers/en/quantization/bitsandbytes
- vLLM quantized KV cache: https://docs.vllm.ai/en/latest/features/quantization/quantized_kvcache/
- vLLM llm-compressor KV cache quantization example: https://github.com/vllm-project/llm-compressor/blob/main/examples/quantization_kv_cache/README.md
- PyTorch torch.compile: https://docs.pytorch.org/docs/2.12/generated/torch.compile.html
- PyTorch AMP reference: https://docs.pytorch.org/docs/2.12/amp.html
- PyTorch AMP examples: https://docs.pytorch.org/docs/2.12/notes/amp_examples.html
- OpenTelemetry GenAI semantic conventions: https://opentelemetry.io/docs/specs/semconv/registry/attributes/gen-ai/
- PyTorch autograd grad modes: https://docs.pytorch.org/docs/stable/notes/autograd.html#locally-disable-grad-doc
- PyTorch inference_mode: https://docs.pytorch.org/docs/stable/generated/torch.autograd.grad_mode.inference_mode.html
- Accelerating Large Language Model Decoding with Speculative Sampling: https://arxiv.org/abs/2302.01318
- Speculative decoding: https://arxiv.org/abs/2211.17192
- The Curious Case of Neural Text Degeneration: https://arxiv.org/abs/1904.09751
- Hugging Face generation strategies: https://huggingface.co/docs/transformers/en/generation_strategies
- vLLM speculative decoding: https://docs.vllm.ai/en/latest/features/speculative_decoding/
- vLLM EAGLE speculative decoding example: https://docs.vllm.ai/en/latest/features/speculative_decoding/eagle/
- Hugging Face assisted decoding: https://huggingface.co/docs/transformers/en/assisted_decoding
- Hugging Face universal assisted generation: https://huggingface.co/blog/universal_assisted_generation
- Decoding Speculative Decoding: https://arxiv.org/abs/2402.01528
- LoRA: https://arxiv.org/abs/2106.09685
- QLoRA: https://arxiv.org/abs/2305.14314
- Hugging Face PEFT LoRA docs: https://huggingface.co/docs/peft/package_reference/lora
- Hugging Face bitsandbytes optimizer docs: https://huggingface.co/docs/bitsandbytes/en/optimizers
- Direct Preference Optimization: https://arxiv.org/abs/2305.18290
- Hugging Face TRL DPOTrainer: https://huggingface.co/docs/trl/en/dpo_trainer
- Retrieval-Augmented Generation: https://arxiv.org/abs/2005.11401
- Lost in the Middle: https://arxiv.org/abs/2307.03172
- Qdrant hybrid queries and RRF: https://qdrant.tech/documentation/search/hybrid-queries/
- Sentence Transformers retrieve and rerank: https://sbert.net/examples/sparse_encoder/applications/retrieve_rerank/README.html
- Hypothetical Document Embeddings (HyDE): https://arxiv.org/abs/2212.10496
- LlamaIndex retrieval evaluation: https://developers.llamaindex.ai/python/examples/evaluation/retrieval/retriever_eval/
- OpenAI function calling: https://developers.openai.com/api/docs/guides/function-calling
- OpenAI Structured Outputs: https://developers.openai.com/api/docs/guides/structured-outputs
- Model Context Protocol tools: https://modelcontextprotocol.io/specification/2025-11-25/server/tools
- LangGraph interrupts: https://docs.langchain.com/oss/python/langgraph/interrupts
- OpenAI Evals: https://github.com/openai/evals
- OpenAI Evals API guide: https://developers.openai.com/api/docs/guides/evals
- OpenAI evaluation best practices: https://developers.openai.com/api/docs/guides/evaluation-best-practices
- NIST AI 600-1 Generative AI Profile: https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf
- Stanford HELM: https://crfm.stanford.edu/helm/
- Holistic Evaluation of Language Models: https://arxiv.org/abs/2211.09110
- RAGAS: https://arxiv.org/abs/2309.15217
- Judging LLM-as-a-Judge with MT-Bench and Chatbot Arena: https://arxiv.org/abs/2306.05685
- Judging the Judges, position bias in LLM-as-a-Judge: https://arxiv.org/abs/2406.07791
- OWASP LLM01 prompt injection: https://genai.owasp.org/llmrisk/llm01-prompt-injection/
