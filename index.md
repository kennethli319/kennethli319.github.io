---
layout: default
---

[Toolbox: [[TTS]](https://huggingface.co/spaces/kennethli319/TTS-toolbox) [[TTS-VC]](https://huggingface.co/spaces/kennethli319/xtts) [[ASR]](https://huggingface.co/spaces/kennethli319/ASR-toolbox) [[LLM]](https://huggingface.co/spaces/kennethli319/mpt-7b-instruct-rust) [[RAG]](https://huggingface.co/spaces/kennethli319/RAGArchcd) [[Multimodal-LLM]](https://huggingface.co/spaces/kennethli319/LLaVA-1.6)] 

[Notes: [[TTS]](./notes_tts.md) [[ASR]](./notes_asr.md) [[ML]](./notes_ml.md) [[Others]](./notes.md)]
# About

I am deeply passionate about leveraging my expertise in Linguistics and Machine Learning to revolutionize Human-Computer Interaction. Aspiring to contribute significantly to the AI industry, I focus on automatic speech recognition (ASR), test-to-speech (TTS), natural language understanding (NLU), and neurotechnology. My commitment lies in enhancing user experiences by developing innovative solutions in these cutting-edge fields.

---

# Experience

#### Machine Learning Engineer / Consultant @ kea (Apr 2024 - Present)

- Improving speech recognition models for restaurant ordering through fine-tuning and contextual biasing

#### Founder @ [InnerSpeech](https://www.innerspeech.ai/) (Sep 2023 - present)

- Supported by Nvidia Inception, AWS Activate, HKSTP Ideation, HK Tech 300, Microsoft Founder Hub, Communitech Founder Program, Google for Startups, OVHcloud Startup Program
- Explored the synergy of ASR, NLP, and Neuroscience to effectively translate biosignal (invasive and non-invasive) into textual representations.
- Built biosignal foundation models with EEG-Conformer, GPT, Wav2Vec2 and VQ-VAE on multi-node multi-GPU cluster (H100, A100, V100S)
- Replicated 'A high-performance speech neuroprosthesis', and participated in the[Brain-to-Text Benchmark 2024 contest](https://eval.ai/web/challenges/challenge-page/2099/leaderboard/4944) (10% WER on leaderboard and 9% WER pending)
- Conducted explorations with multimodal (image, audio, and text) foundational models for contextual information augmentation with Parameter-Efficient Fine-Tuning (e.g. LoRA)
- Our major work will be released as [open-source projects](https://github.com/innerspeech), contributing to the wider community and technological advancement

#### Speech Recognition Engineer @ Dialpad (Feb 2020 - Aug 2023)

- Drove research and development to develop better models for speech recognition with Kaldi, NeMo and K2
- Enhanced transcript accuracy through data augmentation (GPT-2) and model optimization
- Improved keyword adaptation that suits customers' unique vocabulary with contextual biasing (n-gram boosting and lattice boosting) and TTS-augmented data
- Improved offline performance (3% relative) by lattice rescoring with LLMs (GPT, FLAN)
- Collaborated closely with the NLP team to monitor and optimize downstream performance (ASR impacts on NLP)
- Onboarding and mentoring junior team members
- Co-supervised Master’s thesis projects at University of Edinburgh and The University of British Columbia
- [N-gram Boosting: Improving Contextual Biasing with Normalized N-gram Targets](https://arxiv.org/abs/2308.02092)
- [Avengers, Ensemble! Benefits of ensembling in grapheme-to-phoneme prediction](https://aclanthology.org/2021.sigmorphon-1.16v2.pdf)

#### NLP Consultant @ The Hong Kong Polytechnic University (Sep 2020 – May 2023)

- Led the creation of a grammatical error correction system, adopting the Grammarly Gector model (with BERT, RoBERTa) as the core structure
- Provided pivotal technical leadership in refining the grammatical error correction (GEC) system, orchestrating the seamless integration of rule-based and neural network-based methodologies to enhance system efficiency and performance
- Investigated and implemented advanced techniques in quantization, data augmentation, and model optimization to further elevate the system’s capabilities.
- Explored providing reference material with LLM (MPT-7B) and Retrieval-Augmented Generation (RAG)
- Optimize model with in-domain-data and model architecture (e.g. additional tags, vocabulary size)

#### Research Assistant @ City University of Hong Kong (Jul 2018 - Sep 2018)

- Research project: "Develop a large scale Chinese reading corpus for machine learning of unconscious word segmentation from eye movements"
- Analysed Chinese word segmentation tasks with eye tracking data

---

# Education

#### Master's degree, Speech & Language Processing @ The University of Edinburgh (2018 - 2019)

**Thesis**: Robust Word Recognition and Alignment of Child Speech Therapy Sessions using Audio and Ultrasound Imaging (with Kaldi and PyTorch)

#### Bachelor of Arts - BA, Linguistics and Language Applications @ City University of Hong Kong (2014 - 2018)

**Thesis**: A Comparative Study of Interlingual vs. Neural Approach to Machine Translation of Numerical Expressions (with Java and Tensorflow)

**Conference**: AI and Linguistics Conference - East China Normal University - Oct. 26-28 2018

---

# Projects

## ASR

#### Data augmentation with GPT-2 and out-of-domain data

- (**Data augmentation**) Finetune GPT-2 on in-house data and generate augmented data for LM training
- Explore data augmentation with public out-of-domain data for LM training

#### Lattice rescoring with LLM

- (**LLM rescoring**) Rescore ASR lattice / n-best output with various LLMs (GPT, FLAN), improving offline performance by 3% relative

#### Keyword contextual biasing

- (**TTS Data augmentation**) Improved keyword adaptation that suits customers' unique vocabulary with contextual biasing (n-gram boosting and lattice boosting) and TTS-augmented data

#### Multilingual ASR

- [Third Prize in MUCS 2021](https://navana-tech.github.io/MUCS2021/assets/img/winners/subtask1/3.PNG): MUltilingual and Code-Switching ASR Challenges for Low Resource Indian LanguagesThird Prize in MUCS 2021: MUltilingual and Code-Switching ASR Challenges for Low Resource Indian Languages
- Team contributions to multilingual and low-resource ASR for Indian Languages. Benchmarking and [open-sourcing various end-to-end methods](https://github.com/dialpad/mucs_2021_dialpad) and studying effects of channel distortions on language identification.

#### ASR with wav2vec2 / whisper / Nemo [(Demo)](https://huggingface.co/spaces/kennethli319/ASR-toolbox)

## TTS / Music generation

#### TTS on CPU [(Demo)](https://huggingface.co/spaces/kennethli319/TTS-toolbox)

## NLP

#### RAG-Transcript: Essence of Presentations [(Project)](https://innerspeech.notion.site/BCI-NEUROTECHNOLOGY-SPRING-SCHOOL-2023-2d3bfeb0718c4f21b6da83a789a35b69)
- AI-augmented learning experience: RAG-Transcript harnesses Whisper to transcribe presentations and Retrieval-Augmented Generation (RAG) to distill their key ideas into concise summaries. Ideal for professionals and students, it offers a quick, accurate way to grasp essential points from lengthy spoken content.

#### Grammatical Error Correction with Gector [(Demo)]()

- Led the creation of a grammatical error correction system, adopting the Grammarly [Gector](https://github.com/grammarly/gector) model as the core structure.
- Provided pivotal technical leadership in refining the grammatical error correction (GEC) system, orchestrating the seamless integration of rule-based and neural network-based methodologies to enhance system efficiency and performance.
- (**Model quantization**) Investigated and implemented advanced techniques in quantization, data augmentation, and model optimization to further elevate the system's capabilities.
- (**LLM with RAG**) Explored providing reference material with LLM (MPT-7B) and Retrieval-Augmented Generation (RAG)
- Optimize model with in-domain-data and model architecture (e.g. additional tags, vocabulary size)

## Neuroscience

#### Brain-to-Text

- Replicated 'A high-performance speech neuroprosthesis', and participated in the [Brain-to-Text Benchmark 2024](https://eval.ai/web/challenges/challenge-page/2099/overview) contest. 

#### Biosignal foundation model with EEG-Conformer, GPT, Wav2Vec2 and VQ-VAE [(EEG-foundation)](https://github.com/kennethli319/EEG-foundation)

- (**Foundation model**) Replicate a foundation model architecturee for EEG analysis and processing as studied in [Neuro-GPT: Developing A Foundation Model for EEG](https://arxiv.org/abs/2311.03764), [DeWave: Discrete EEG Waves Encoding for Brain Dynamics to Text Translation](https://openreview.net/pdf?id=WaLI8slhLw), [LARGE BRAIN MODEL FOR LEARNING GENERIC REPRESENTATIONS WITH TREMENDOUS EEG DATA IN BCI](https://openreview.net/pdf?id=QzTpTRVtrP) and [BIOT: Biosignal Transformer for Cross-data Learning in the Wild](https://openreview.net/pdf?id=c2LZyTyddi).

---

# Research

- [N-gram Boosting: Improving Contextual Biasing with Normalized N-gram Targets](https://arxiv.org/abs/2308.02092)
- [Avengers, Ensemble! Benefits of ensembling in grapheme-to-phoneme prediction](https://aclanthology.org/2021.sigmorphon-1.16v2.pdf)

