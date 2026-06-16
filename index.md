---
layout: default
---

[Toolbox: [[TTS]](https://huggingface.co/spaces/kennethli319/TTS-toolbox) [[TTS-VC]](https://huggingface.co/spaces/kennethli319/xtts) [[ASR]](https://huggingface.co/spaces/kennethli319/ASR-toolbox) [[LLM]](https://huggingface.co/spaces/kennethli319/mpt-7b-instruct-rust) [[RAG]](https://huggingface.co/spaces/kennethli319/RAGArchcd) [[Multimodal-LLM]](https://huggingface.co/spaces/kennethli319/LLaVA-1.6)]

[Notes: [[TTS]](./notes_tts.md) [[ASR]](./notes_asr.md) [[ML]](./notes_ml.md) [[Audio ML Course]](./audio-text-ml-course/) [[Others]](./notes.md)]

# About

> Not until we are lost do we begin to understand ourselves.

Speech-focused ML engineer in the San Francisco Bay Area, open to Forward-Deployed Engineering, Applied AI, and Speech/Audio ML roles on TN Visa. I work on production-oriented ML systems, evaluation pipelines, and automated workflows across ASR, TTS, streaming and full-duplex speech systems, keyword boosting, LLM-as-judge evaluation, RAG, and neural speech interfaces.

I enjoy turning ambiguous product and research problems into usable systems: customer-facing technical discovery, rapid prototyping, product integration, debugging, deployment-minded iteration, and evaluation design.

---

# Role Targets

- **Speech / Audio ML:** ASR and TTS data preparation and analysis; evaluation for task success rate, naturalness, conversationality, WER, CMOS, keyword boosting, streaming performance, speech-to-speech workflows, and neural speech interface research.
- **Forward-Deployed / Applied AI:** customer-facing problem solving, rapid prototyping, product integration, agentic and LLM-as-judge workflows, evaluation design, debugging, and iteration from unclear requirements to usable systems.

---

# Experience

#### Linguistic Engineer @ Meta, Reality Labs Wearables (Jan 2025 - Jun 2026)

- Improved on-device and server-side ASR/TTS for voice assistants across wearable devices, Meta glasses, and Meta AI through data preparation, evaluation, and model-development workflows for expressive speech and Llama 4 full-duplex speech LLMs.
- Designed metrics and evaluated multi-turn, full-duplex speech LLM across 31 locales, improving cost efficiency, quality, iteration speed, and production readiness. Metrics included task success rate, naturalness, and conversationality.
- Built and led the shift from manual human evaluation to semi- and fully automated LLM-as-judge and agent evaluation workflows, cutting evaluation costs by 5-10x and reducing turnaround time by roughly 100x.
- Benchmarked internal models and leading external LLMs across multiple dimensions of audio modality performance.
- Early adopter of internal agentic and auto-research workflows at Meta; hosted coworker Claw agents on g-chat to automate routine tasks, reduce repeated support requests, and let colleagues interact directly with common research and engineering workflows.
- Explored frameworks for efficient autonomous agent self-improvement through evaluation-driven feedback loops.

#### Founder & CEO @ [InnerSpeech](https://www.innerspeech.ai/) (Sep 2023 - Jan 2025)

- Founded a non-invasive BCI speech startup focused on imagined and inner speech decoding using EEG and multimodal biosignals, with assistive communication as the initial target use case.
- Owned product framing, technical roadmap, partnership conversations, grant and startup programs, and prototype development.
- Built and open-sourced the InnerSpeech biosignal speech recognition and synthesis toolkit covering EEG, EMG, HD-EEG, MEG, fNIRS, and invasive neural speech datasets.
- Developed Brain-to-Text Benchmark 2024 systems using RNN-Transformer modeling with language-model rescoring; achieved a 10.08 WER benchmark entry.
- Secured founder and startup support including HKSTP Ideation, HK Tech 300 seed approval, NVIDIA Inception, AWS Activate, Google for Startups, Microsoft Founder Hub, and Communitech Founder Program.

#### Machine Learning Engineer / Consultant @ Kea Cloud Inc. (Apr 2024 - Jul 2024)

- Improved speech recognition models for restaurant ordering through fine-tuning, contextual biasing, and internal evaluation.
- Built LLM-augmented ordering agents with RAG in an ASR-NLU pipeline.
- Worked on restaurant voice AI and ASR quality for automated ordering, including Deepgram and OpenAI API integrations, keyword boosting, and evaluation.
- Evaluated ASR boosting and keyword strategies for restaurant-specific entities, menu items, and conversational order flows.

#### Speech Recognition Engineer III @ Dialpad (Feb 2020 - Aug 2023)

- Built and improved production ASR systems using Kaldi, NVIDIA NeMo, and K2 across hybrid and end-to-end speech recognition stacks.
- Led ASR model updates and evaluation cycles, including analysis, data preparation, and deployment-oriented model comparisons.
- Developed and shipped keyword and n-gram boosting methods for business-call ASR, improving recognition of customer-critical terms and recovering failing call scenarios.
- Improved keyword adaptation for customer-specific vocabulary with contextual biasing, including n-gram boosting, lattice boosting, and in-house multi-speaker TTS-augmented data.
- Published and presented work on ASR boosting and G2P modeling through SANE 2022 and SIGMORPHON 2021.
- Co-supervised Master's thesis projects at the University of Edinburgh and The University of British Columbia.

#### NLP Consultant @ The Hong Kong Polytechnic University (Sep 2020 - May 2023, part-time)

- Advised on grammar error correction and RAG-style workflows, including retrieval-augmented model design and evaluation.
- Integrated rule-based and neural network-based methodologies to enhance system efficiency and performance.
- Investigated and implemented quantization, data augmentation, and model optimization to improve system capabilities.

#### Research Assistant @ City University of Hong Kong (Jul 2018 - Sep 2018)

- Analysed Chinese word segmentation under the research project "Develop a large-scale Chinese reading corpus for machine learning of unconscious word segmentation from eye movements."

---

# Selected Projects

#### InnerSpeech biosignal speech recognition and synthesis toolkit

- Open-source toolkit for neural speech interface research across EEG, EMG, HD-EEG, MEG, fNIRS, and invasive neural speech datasets.
- Explored biosignal-to-text and biosignal-to-speech modeling with EEG-Conformer, GPT, Wav2Vec2, VQ-VAE, and RNN-Transformer systems.

#### Brain-to-Text Benchmark 2024

- Developed systems using RNN-Transformer modeling with language-model rescoring for inner speech and neural speech decoding.
- Achieved a 10.08 WER benchmark entry in the [Brain-to-Text Benchmark 2024](https://eval.ai/web/challenges/challenge-page/2099/overview).

#### ASR contextual biasing and keyword boosting

- Built and shipped n-gram and lattice boosting approaches for customer-specific business-call vocabulary.
- Evaluated keyword strategies for restaurant ordering, menu items, customer-critical terms, and conversational order flows.

#### ASR, TTS, RAG, and multimodal tooling

- Maintained demos and prototypes for [ASR](https://huggingface.co/spaces/kennethli319/ASR-toolbox), [TTS](https://huggingface.co/spaces/kennethli319/TTS-toolbox), [TTS voice conversion](https://huggingface.co/spaces/kennethli319/xtts), [RAG](https://huggingface.co/spaces/kennethli319/RAGArchcd), and [multimodal LLMs](https://huggingface.co/spaces/kennethli319/LLaVA-1.6).

#### MUCS 2021 multilingual and code-switching ASR

- Third Prize in [MUCS 2021](https://navana-tech.github.io/MUCS2021/assets/img/winners/subtask1/3.PNG) for multilingual and low-resource ASR for Indian languages.
- Contributed to benchmarking and [open-sourcing end-to-end ASR methods](https://github.com/dialpad/mucs_2021_dialpad).

#### UsherGPT

- Guided development of UsherGPT for public health and medical data applications using Retrieval-Augmented Generation techniques with the University of Edinburgh Usher Institute.

---

# Publications

- [N-gram Boosting: Improving Contextual Biasing with Normalized N-gram Targets](https://arxiv.org/abs/2308.02092). Poster at SANE 2022.
- [Avengers, Ensemble! Benefits of ensembling in grapheme-to-phoneme prediction](https://aclanthology.org/2021.sigmorphon-1.16/). Paper at the 18th SIGMORPHON Workshop, 2021.
- Can linguistics help neural machine translation? Evidence from a case study of interlingual vs. neural machine translation of numerical expressions. Presentation at AI and Linguistics Conference 2018.

---

# Education

#### Master of Science in Speech & Language Processing @ University of Edinburgh (2018 - 2019)

**Thesis:** Robust Word Recognition and Alignment of Child Speech Therapy Sessions using Audio and Ultrasound Imaging (PyTorch and Kaldi).

**Coursework:** Speech Synthesis, Automatic Speech Recognition, Natural Language Understanding, Generation and Machine Translation, Reinforcement Learning, and Neural Information Processing.

- The Edinburgh Award (Enterprise)
- First place winner of the Business Ideas Competition by The University of Edinburgh
- Winner of Scottish Institute for Enterprise's Fresh Ideas Competition

#### Bachelor of Arts in Linguistics and Language Applications, First Class Honours @ City University of Hong Kong (2014 - 2018)

**Thesis:** A Comparative Study of Interlingual vs. Neural Approach to Machine Translation of Numerical Expressions (TensorFlow and Java).

---

# Core Skills

- **Applied AI & systems:** Python, PyTorch, Docker, AWS, Redis, PostgreSQL, data pipelines, production debugging, evaluation automation, internal tooling, LLM/RAG workflows, agentic development tooling.
- **Speech ML:** ASR, TTS, speech data preparation, ASR/TTS evaluation, hotword and keyword boosting, WER analysis, streaming ASR, speech-to-speech workflows.
- **Modeling & frameworks:** Kaldi, NVIDIA NeMo, K2, CTC, Transducer/RNN-T, Conformer, RNN-Transformer, n-gram rescoring.
- **Research areas:** speech recognition, speech synthesis, NLP, grammatical error correction, non-invasive BCI, EEG/fNIRS speech decoding, and multimodal speech interfaces.
