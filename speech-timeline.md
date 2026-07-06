---
layout: default
title: Speech Timeline
---

# Speech Recognition & Synthesis Timeline

<style>
.speech-timeline {
  margin-top: 1.5rem;
}
.speech-intro {
  color: #666;
  font-size: 0.98rem;
  line-height: 1.65;
}
.speech-nav {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
  margin: 1.25rem 0 1.75rem;
}
.speech-nav a,
.speech-impact,
.speech-tag {
  border: 1px solid #e1e1e1;
  border-radius: 999px;
  color: #555;
  font-size: 0.78rem;
  line-height: 1;
  padding: 0.35rem 0.55rem;
  text-decoration: none;
  white-space: nowrap;
}
.speech-nav a:hover {
  border-color: #aaa;
  color: #222;
}
.speech-era {
  margin: 2.2rem 0 0.7rem;
  color: #777;
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}
.speech-row {
  display: grid;
  grid-template-columns: 8rem minmax(0, 1fr);
  gap: 1.25rem;
  padding: 1.25rem 0;
  border-top: 1px solid #e6e6e6;
}
.speech-year {
  color: #444;
  font-weight: 700;
  line-height: 1.25;
}
.speech-kicker {
  margin-top: 0.35rem;
  color: #888;
  font-size: 0.82rem;
  font-weight: 400;
}
.speech-body h2 {
  margin: 0 0 0.25rem;
  font-size: 1.1rem;
  line-height: 1.35;
}
.speech-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
  margin: 0.35rem 0 0.65rem;
}
.speech-tag {
  border-color: #ddd;
  color: #777;
}
.speech-impact {
  border-color: #bdbdbd;
  color: #333;
  font-weight: 700;
}
.speech-legend {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
  margin: 1rem 0 0;
}
.speech-tag-note {
  color: #777;
  font-size: 0.9rem;
  line-height: 1.55;
  margin: 0.65rem 0 0;
}
.speech-body p {
  margin: 0.45rem 0;
}
.speech-body p strong {
  color: #555;
}
.speech-source {
  font-size: 0.9rem;
}
.speech-source a {
  margin-right: 0.55rem;
}
.speech-reflection {
  border-left: 2px solid #e2e2e2;
  color: #666;
  line-height: 1.55;
  margin: 0.45rem 0;
  padding-left: 0.75rem;
}
.back-link {
  margin-top: 2rem;
}
@media (max-width: 640px) {
  .speech-row {
    grid-template-columns: 1fr;
    gap: 0.35rem;
  }
}
</style>

<p class="speech-intro">
  A compact timeline of milestones and key concepts that shaped automatic
  speech recognition, text-to-speech, and modern speech-to-speech systems.
  Each entry highlights the proposed idea, the practical achievement, and why
  it still matters.
</p>

<p class="speech-legend" aria-label="Milestone groups">
  <span class="speech-impact">new capability</span>
  <span class="speech-impact">optimize existing component</span>
  <span class="speech-impact">efficiency</span>
</p>

<p class="speech-tag-note">
  The first tag groups each milestone by the kind of progress it represents:
  a new capability, an improvement to an existing component, or better
  efficiency. The smaller tags name the speech area, architecture, or concept.
</p>

<nav class="speech-nav" aria-label="Timeline eras">
  <a href="#mechanical">Mechanical & Early Electronic</a>
  <a href="#statistical">Statistical Speech</a>
  <a href="#neural">Neural Turn</a>
  <a href="#foundation">Foundation Models</a>
  <a href="#speech-foundation">Speech Foundation Models</a>
</nav>

<div class="speech-timeline">

<h2 id="mechanical" class="speech-era">Mechanical & Early Electronic</h2>

<section class="speech-row">
  <aside class="speech-year">
    1937
    <div class="speech-kicker">Perceptual frequency</div>
  </aside>
  <div class="speech-body">
    <h2>Mel Scale For Pitch Perception</h2>
    <div class="speech-meta"><span class="speech-impact">optimize existing component</span><span class="speech-tag">ASR</span><span class="speech-tag">TTS</span><span class="speech-tag">Key Concept</span><span class="speech-tag">Features</span></div>
    <p><strong>Proposed:</strong> A psychophysical pitch scale that maps physical frequency to perceived pitch magnitude rather than treating Hertz as perceptually uniform.</p>
    <p><strong>Achievement:</strong> The mel scale gave speech engineers a practical way to weight spectral analysis toward human auditory resolution.</p>
    <p><strong>Why it matters:</strong> Mel-spaced filterbanks became the bridge from raw spectra to MFCCs, log-mel ASR inputs, mel-spectrogram TTS targets, and neural vocoder conditioning.</p>
    <p class="speech-reflection"><strong>Why this emerged:</strong> Researchers needed a way to describe pitch as people actually hear it, not only as raw frequency. Looking back, the mel scale is an early example of speech engineering becoming stronger when signal processing is shaped by human perception.</p>
    <p class="speech-source"><a href="https://doi.org/10.1121/1.1901999">paper</a></p>
  </div>
</section>

<section class="speech-row">
  <aside class="speech-year">
    1939
    <div class="speech-kicker">Manual synthesis</div>
  </aside>
  <div class="speech-body">
    <h2>Bell Labs Voder</h2>
    <div class="speech-meta"><span class="speech-impact">new capability</span><span class="speech-tag">TTS</span><span class="speech-tag">Vocoder</span></div>
    <p><strong>Proposed:</strong> A human-operated speech synthesizer that controlled voicing, noise, pitch, and filter settings with keys and pedals.</p>
    <p><strong>Achievement:</strong> It showed that intelligible speech could be generated by controlling a compact acoustic representation instead of replaying recordings.</p>
    <p><strong>Why it matters:</strong> Modern neural vocoders still inherit the central idea that speech can be represented, controlled, and regenerated through a lower-dimensional acoustic code.</p>
    <p class="speech-reflection"><strong>Why this emerged:</strong> The Voder came from asking whether speech could be controlled by its components instead of replayed as recordings. Its operator-driven design now looks like a manual version of the control problem later solved with signal models, vocoders, and neural generators.</p>
    <p class="speech-source"><a href="https://www.historyofinformation.com/detail.php?id=3685">source</a></p>
  </div>
</section>

<section class="speech-row">
  <aside class="speech-year">
    1946
    <div class="speech-kicker">Time-frequency analysis</div>
  </aside>
  <div class="speech-body">
    <h2>Sound Spectrograph And Spectrogram Features</h2>
    <div class="speech-meta"><span class="speech-impact">new capability</span><span class="speech-tag">ASR</span><span class="speech-tag">TTS</span><span class="speech-tag">Key Concept</span><span class="speech-tag">Features</span></div>
    <p><strong>Proposed:</strong> Analyze speech as a changing distribution of frequency energy over time, producing a visible spectrogram rather than a single waveform trace.</p>
    <p><strong>Achievement:</strong> The sound spectrograph made formants, transitions, voicing, bursts, and noise patterns inspectable for speech science and engineering.</p>
    <p><strong>Why it matters:</strong> Spectrogram thinking became the foundation for filterbanks, MFCCs, mel-spectrogram TTS targets, neural vocoder conditioning, and modern audio model inputs.</p>
    <p class="speech-reflection"><strong>Why this emerged:</strong> Once speech could be seen as changing energy over time and frequency, researchers had a practical bridge between acoustics and linguistic structure. Many later features and neural inputs still inherit this idea: make speech visible to the model before asking it to recognize or generate it.</p>
    <p class="speech-source"><a href="https://doi.org/10.1121/1.1916342">paper</a> <a href="https://books.google.com/books/about/Visible_Speech.html?id=j3Q0AAAAIAAJ">related</a></p>
  </div>
</section>

<section class="speech-row">
  <aside class="speech-year">
    1952
    <div class="speech-kicker">Digit recognition</div>
  </aside>
  <div class="speech-body">
    <h2>Bell Labs Audrey</h2>
    <div class="speech-meta"><span class="speech-impact">new capability</span><span class="speech-tag">ASR</span><span class="speech-tag">Template Matching</span></div>
    <p><strong>Proposed:</strong> A hardware recognizer for spoken digits using formant-like acoustic measurements and speaker-dependent matching.</p>
    <p><strong>Achievement:</strong> It recognized digits from a known speaker with high accuracy, making automatic recognition concrete rather than speculative.</p>
    <p><strong>Why it matters:</strong> The system framed early ASR as pattern matching under tight vocabulary, speaker, and channel constraints.</p>
    <p class="speech-reflection"><strong>Why this emerged:</strong> Audrey focused on digits because the first practical goal was not open conversation, but proving that machines could map stable acoustic patterns to symbols. The insight was to narrow the problem until a recognizer could work, then expand vocabulary, speakers, and conditions over time.</p>
    <p class="speech-source"><a href="https://pubs.aip.org/asa/jasa/article-abstract/24/6/637/718873/Automatic-Recognition-of-Spoken-Digits">paper</a></p>
  </div>
</section>

<section class="speech-row">
  <aside class="speech-year">
    1961-1962
    <div class="speech-kicker">Public ASR demo</div>
  </aside>
  <div class="speech-body">
    <h2>IBM Shoebox</h2>
    <div class="speech-meta"><span class="speech-impact">new capability</span><span class="speech-tag">ASR</span><span class="speech-tag">Command Recognition</span></div>
    <p><strong>Proposed:</strong> A small-vocabulary speech recognizer for digits and arithmetic commands.</p>
    <p><strong>Achievement:</strong> It demonstrated spoken command input at the 1962 Seattle World's Fair.</p>
    <p><strong>Why it matters:</strong> Shoebox made the product dream of voice control visible: limited vocabulary, clear commands, and immediate machine action.</p>
    <p class="speech-reflection"><strong>Why this emerged:</strong> Shoebox turned recognition into interaction: speech was not just analyzed, it triggered machine behavior. That product framing explains why command recognition, even with tiny vocabularies, mattered so much in the path toward voice assistants.</p>
    <p class="speech-source"><a href="https://www.ibm.com/history/speech-recognition">source</a></p>
  </div>
</section>

<section class="speech-row">
  <aside class="speech-year">
    1968
    <div class="speech-kicker">Speech coding</div>
  </aside>
  <div class="speech-body">
    <h2>Linear Predictive Coding</h2>
    <div class="speech-meta"><span class="speech-impact">optimize existing component</span><span class="speech-tag">TTS</span><span class="speech-tag">Signal Processing</span></div>
    <p><strong>Proposed:</strong> A source-filter model that predicts each speech sample from previous samples and compactly represents the vocal tract filter.</p>
    <p><strong>Achievement:</strong> LPC made low-bitrate speech coding and controllable parametric synthesis practical.</p>
    <p><strong>Why it matters:</strong> It became a bridge between speech science and engineering: a compact representation useful for coding, synthesis, and later feature extraction.</p>
    <p class="speech-reflection"><strong>Why this emerged:</strong> LPC emerged from the need to transmit and synthesize speech compactly by modeling the vocal tract rather than every waveform detail. It reflects a recurring speech insight: preserve the structure that matters perceptually and linguistically, then throw away redundancy.</p>
    <p class="speech-source"><a href="https://ieeexplore.ieee.org/document/1162030">paper</a></p>
  </div>
</section>

<h2 id="statistical" class="speech-era">Statistical Speech</h2>

<section class="speech-row">
  <aside class="speech-year">
    1978
    <div class="speech-kicker">Time alignment</div>
  </aside>
  <div class="speech-body">
    <h2>Dynamic Time Warping For Word Recognition</h2>
    <div class="speech-meta"><span class="speech-impact">optimize existing component</span><span class="speech-tag">ASR</span><span class="speech-tag">Alignment</span></div>
    <p><strong>Proposed:</strong> A dynamic programming method for matching utterances that differ in speaking rate.</p>
    <p><strong>Achievement:</strong> DTW made isolated-word recognition more robust by aligning acoustic sequences rather than comparing them frame by frame.</p>
    <p><strong>Why it matters:</strong> The alignment problem never disappeared; CTC, attention, transducers, and forced alignment all solve descendants of the same issue.</p>
    <p class="speech-reflection"><strong>Why this emerged:</strong> Early recognizers struggled because people say the same word at different speeds. DTW made the timing elastic, turning speech matching from a rigid comparison into an alignment problem that later sequence models would keep revisiting in more powerful forms.</p>
    <p class="speech-source"><a href="https://ieeexplore.ieee.org/document/1163055">paper</a></p>
  </div>
</section>

<section class="speech-row">
  <aside class="speech-year">
    1980
    <div class="speech-kicker">Feature representation</div>
  </aside>
  <div class="speech-body">
    <h2>Mel-Frequency Cepstral Coefficients</h2>
    <div class="speech-meta"><span class="speech-impact">optimize existing component</span><span class="speech-tag">ASR</span><span class="speech-tag">Key Concept</span><span class="speech-tag">Features</span></div>
    <p><strong>Proposed:</strong> Represent short speech frames with cepstral coefficients on a mel-spaced frequency scale, approximating human perceptual frequency resolution.</p>
    <p><strong>Achievement:</strong> MFCCs became a standard front-end for template, HMM/GMM, and early neural ASR systems because they compactly captured phonetic information while reducing raw waveform variability.</p>
    <p><strong>Why it matters:</strong> Even when modern models learn features directly from waveforms or spectrograms, MFCCs remain the reference point for speech feature engineering, diagnostics, and lightweight baselines.</p>
    <p class="speech-reflection"><strong>Why this emerged:</strong> MFCCs came from combining perceptual frequency scaling with cepstral analysis to make speech frames compact and stable. The deeper idea was that recognizers did not need raw waveforms; they needed a representation that preserved phonetic cues while suppressing nuisance variation.</p>
    <p class="speech-source"><a href="https://ieeexplore.ieee.org/document/1163420">paper</a></p>
  </div>
</section>

<section class="speech-row">
  <aside class="speech-year">
    1982
    <div class="speech-kicker">Rule-based TTS</div>
  </aside>
  <div class="speech-body">
    <h2>Klattalk Text-To-Speech</h2>
    <div class="speech-meta"><span class="speech-impact">new capability</span><span class="speech-tag">TTS</span><span class="speech-tag">Formant Synthesis</span></div>
    <p><strong>Proposed:</strong> A real-time English text-to-speech system that converted ordinary spelling into linguistic controls for a formant synthesizer.</p>
    <p><strong>Achievement:</strong> Klattalk connected text analysis, pronunciation rules, prosody, and acoustic generation in an integrated system that later influenced DECtalk.</p>
    <p><strong>Why it matters:</strong> It made TTS an end-to-end engineering pipeline, not only a speech-synthesis problem, and set expectations for intelligible machine voices before large recorded databases.</p>
    <p class="speech-reflection"><strong>Why this emerged:</strong> Klattalk grew from the practical need to connect text analysis, pronunciation, prosody, and acoustic synthesis into one working voice. Looking back, it shows that TTS was always a pipeline problem before it became a neural modeling problem.</p>
    <p class="speech-source"><a href="https://ieeexplore.ieee.org/document/1171431/">paper</a></p>
  </div>
</section>

<section class="speech-row">
  <aside class="speech-year">
    1984
    <div class="speech-kicker">Phase reconstruction</div>
  </aside>
  <div class="speech-body">
    <h2>Griffin-Lim Spectrogram Inversion</h2>
    <div class="speech-meta"><span class="speech-impact">optimize existing component</span><span class="speech-tag">TTS</span><span class="speech-tag">Key Concept</span><span class="speech-tag">Vocoder</span></div>
    <p><strong>Proposed:</strong> Reconstruct a time-domain signal from a modified short-time Fourier transform by iteratively estimating phase consistent with the target magnitude spectrogram.</p>
    <p><strong>Achievement:</strong> Griffin-Lim gave speech and audio systems a practical baseline for turning magnitude spectrograms back into waveforms when phase was missing or altered.</p>
    <p><strong>Why it matters:</strong> Neural TTS systems later used spectrograms as intermediate targets, and Griffin-Lim remained the simple reference point that neural vocoders had to surpass in quality and speed.</p>
    <p class="speech-reflection"><strong>Why this emerged:</strong> Spectrogram features were useful because they made speech easier to analyze and model, but synthesis needed a path back to sound. Griffin-Lim exposed the missing-phase problem directly, showing why waveform generation would become a distinct component rather than a trivial inverse transform.</p>
    <p class="speech-source"><a href="https://ieeexplore.ieee.org/document/1164317/">paper</a> <a href="https://doi.org/10.1109/TASSP.1984.1164317">doi</a></p>
  </div>
</section>

<section class="speech-row">
  <aside class="speech-year">
    1988
    <div class="speech-kicker">Large-vocabulary ASR</div>
  </aside>
  <div class="speech-body">
    <h2>CMU SPHINX</h2>
    <div class="speech-meta"><span class="speech-impact">new capability</span><span class="speech-tag">ASR</span><span class="speech-tag">HMM</span><span class="speech-tag">Language Model</span></div>
    <p><strong>Proposed:</strong> A speaker-independent continuous speech recognizer that combined HMM acoustic modeling with statistical language modeling for a roughly thousand-word task.</p>
    <p><strong>Achievement:</strong> SPHINX demonstrated that large-vocabulary continuous speech recognition by previously unseen speakers was practical, not only a laboratory aspiration.</p>
    <p><strong>Why it matters:</strong> It helped turn ASR into an integrated systems problem: acoustic models, pronunciation dictionaries, language models, search, and training data had to improve together.</p>
    <p class="speech-reflection"><strong>Why this emerged:</strong> After isolated-word recognizers and small command systems, the field needed proof that statistical methods could handle ordinary continuous speech without per-speaker enrollment. SPHINX made the scaling target concrete, and later ASR stacks kept its lesson that recognition quality comes from coordinating many probabilistic components rather than optimizing one model in isolation.</p>
    <p class="speech-source"><a href="https://publications.ri.cmu.edu/storage/publications/pub_files/pub2/lee_k_f_1989_1/lee_k_f_1989_1.pdf">paper</a> <a href="https://aclanthology.org/H89-1014.pdf">context</a></p>
  </div>
</section>

<section class="speech-row">
  <aside class="speech-year">
    1989
    <div class="speech-kicker">Probabilistic decoding</div>
  </aside>
  <div class="speech-body">
    <h2>Hidden Markov Models Become The ASR Workhorse</h2>
    <div class="speech-meta"><span class="speech-impact">optimize existing component</span><span class="speech-tag">ASR</span><span class="speech-tag">HMM</span></div>
    <p><strong>Proposed:</strong> A probabilistic framework that combines hidden state sequences, acoustic likelihoods, pronunciation lexicons, and language models.</p>
    <p><strong>Achievement:</strong> HMM systems scaled recognition from isolated words toward continuous speech and large vocabularies.</p>
    <p><strong>Why it matters:</strong> The hybrid ASR stack established the separation of acoustics, lexicons, and language priors that still appears in contextual biasing, rescoring, and production debugging.</p>
    <p class="speech-reflection"><strong>Why this emerged:</strong> HMMs fit speech because they offered a clean way to model hidden linguistic states unfolding over noisy acoustic observations. They also let teams separate acoustics, pronunciations, and language priors, which made large-vocabulary ASR engineerable.</p>
    <p class="speech-source"><a href="https://ieeexplore.ieee.org/document/18626">paper</a></p>
  </div>
</section>

<section class="speech-row">
  <aside class="speech-year">
    1989
    <div class="speech-kicker">Temporal neural features</div>
  </aside>
  <div class="speech-body">
    <h2>Time-Delay Neural Networks</h2>
    <div class="speech-meta"><span class="speech-impact">optimize existing component</span><span class="speech-tag">ASR</span><span class="speech-tag">Neural Network</span><span class="speech-tag">Temporal Context</span></div>
    <p><strong>Proposed:</strong> Use shifted local time windows and shared neural weights so a recognizer could learn acoustic-phonetic patterns and their temporal relationships.</p>
    <p><strong>Achievement:</strong> TDNNs improved phoneme recognition by making early neural acoustic models less sensitive to small timing shifts.</p>
    <p><strong>Why it matters:</strong> They foreshadowed convolutional and context-splicing ideas that later reappeared in hybrid DNN-HMM systems, Kaldi recipes, and modern streaming encoders.</p>
    <p class="speech-reflection"><strong>Why this emerged:</strong> HMMs handled sequence structure, but acoustic features still needed stronger local pattern learning. TDNNs showed that neural networks could discover time-shift-tolerant speech cues, a lesson that later models generalized through convolution, subsampling, and learned front ends.</p>
    <p class="speech-source"><a href="https://ieeexplore.ieee.org/document/21701/">paper</a></p>
  </div>
</section>

<section class="speech-row">
  <aside class="speech-year">
    1990
    <div class="speech-kicker">Auditory features</div>
  </aside>
  <div class="speech-body">
    <h2>Perceptual Linear Prediction</h2>
    <div class="speech-meta"><span class="speech-impact">optimize existing component</span><span class="speech-tag">ASR</span><span class="speech-tag">Key Concept</span><span class="speech-tag">Features</span></div>
    <p><strong>Proposed:</strong> Analyze speech with critical-band resolution, equal-loudness weighting, and intensity-loudness compression before fitting a compact all-pole spectral model.</p>
    <p><strong>Achievement:</strong> PLP gave ASR systems a low-dimensional auditory feature representation that blended perceptual modeling with linear-predictive analysis.</p>
    <p><strong>Why it matters:</strong> It reinforced the idea that robust speech features should suppress speaker and channel detail while preserving perceptually meaningful phonetic structure.</p>
    <p class="speech-reflection"><strong>Why this emerged:</strong> PLP followed the same pressure that produced MFCCs: recognizers needed compact features shaped by hearing rather than raw signal geometry. Later learned front ends changed the implementation, but the historical lesson remained that useful speech representations often build in invariances before the model sees the data.</p>
    <p class="speech-source"><a href="https://doi.org/10.1121/1.399423">paper</a></p>
  </div>
</section>

<section class="speech-row">
  <aside class="speech-year">
    1993
    <div class="speech-kicker">Phonetic benchmark data</div>
  </aside>
  <div class="speech-body">
    <h2>TIMIT Acoustic-Phonetic Corpus</h2>
    <div class="speech-meta"><span class="speech-impact">efficiency</span><span class="speech-tag">ASR</span><span class="speech-tag">Key Concept</span><span class="speech-tag">Dataset</span><span class="speech-tag">Evaluation</span></div>
    <p><strong>Proposed:</strong> Release a carefully transcribed corpus of phonetically rich American English speech with time-aligned word and phone labels.</p>
    <p><strong>Achievement:</strong> TIMIT gave researchers a shared small-scale benchmark for acoustic-phonetic modeling, phone recognition, feature analysis, and early neural ASR experiments.</p>
    <p><strong>Why it matters:</strong> It made detailed phonetic evaluation easier before web-scale corpora existed, and it remained a diagnostic dataset for comparing features, acoustic models, and low-resource recipes.</p>
    <p class="speech-reflection"><strong>Why this emerged:</strong> ASR needed common speech data with labels detailed enough to study sounds, not only words. TIMIT shows why benchmarks shape research: its scale was modest, but its careful phonetic annotation made it a durable test bed for feature engineering, HMMs, neural acoustic models, and later low-resource comparisons.</p>
    <p class="speech-source"><a href="https://catalog.ldc.upenn.edu/LDC93S1">dataset</a> <a href="https://nvlpubs.nist.gov/nistpubs/Legacy/IR/nistir4930.pdf">report</a></p>
  </div>
</section>

<section class="speech-row">
  <aside class="speech-year">
    1993
    <div class="speech-kicker">Conversational ASR data</div>
  </aside>
  <div class="speech-body">
    <h2>Switchboard Telephone Speech Corpus</h2>
    <div class="speech-meta"><span class="speech-impact">efficiency</span><span class="speech-tag">ASR</span><span class="speech-tag">Key Concept</span><span class="speech-tag">Dataset</span><span class="speech-tag">Evaluation</span></div>
    <p><strong>Proposed:</strong> Collect large-scale spontaneous telephone conversations with transcripts so speech systems could be trained and tested on natural conversational speech rather than read prompts alone.</p>
    <p><strong>Achievement:</strong> Switchboard provided roughly 260 hours of two-sided telephone conversations from hundreds of speakers, becoming a durable benchmark for conversational ASR, speaker recognition, and dialogue research.</p>
    <p><strong>Why it matters:</strong> It moved ASR evaluation toward disfluencies, overlap, channel limits, topic shifts, and real conversation timing, setting up later NIST Hub5 tests and the long-running Switchboard WER comparisons.</p>
    <p class="speech-reflection"><strong>Why this emerged:</strong> After TIMIT and read-speech tasks, ASR needed data that exposed how people actually talk when they are not reading scripts. Switchboard shows why corpora can redirect a field: conversational errors became measurable, and models had to handle hesitation, turn-taking, and telephone acoustics instead of only clean phonetic coverage.</p>
    <p class="speech-source"><a href="https://catalog.ldc.upenn.edu/LDC97S62">dataset</a> <a href="https://ieeexplore.ieee.org/document/225858">paper</a></p>
  </div>
</section>

<section class="speech-row">
  <aside class="speech-year">
    1994
    <div class="speech-kicker">TTS evaluation</div>
  </aside>
  <div class="speech-body">
    <h2>Mean Opinion Score For Synthetic Speech</h2>
    <div class="speech-meta"><span class="speech-impact">optimize existing component</span><span class="speech-tag">TTS</span><span class="speech-tag">Key Concept</span><span class="speech-tag">Evaluation</span></div>
    <p><strong>Proposed:</strong> Rate speech output with listener panels and average their judgments across quality scales such as naturalness, intelligibility, effort, and pleasantness.</p>
    <p><strong>Achievement:</strong> ITU-T P.85 gave voice-output systems a shared subjective evaluation procedure, complementing broader speech-quality methods such as P.800.</p>
    <p><strong>Why it matters:</strong> MOS remains the default human-facing TTS metric because synthetic speech quality depends on perception, not only waveform loss or text accuracy.</p>
    <p class="speech-reflection"><strong>Why this emerged:</strong> As TTS systems became more intelligible, the question shifted from whether speech could be understood to whether it sounded acceptable to people. MOS formalized that subjective layer, reminding the field that speech quality is partly perceptual and social, not only signal-level.</p>
    <p class="speech-source"><a href="https://www.itu.int/rec/T-REC-P.85/en">standard</a> <a href="https://www.itu.int/rec/T-REC-P.800-199608-I/en">related</a></p>
  </div>
</section>

<section class="speech-row">
  <aside class="speech-year">
    1996
    <div class="speech-kicker">Data-driven voices</div>
  </aside>
  <div class="speech-body">
    <h2>Unit Selection And CHATR</h2>
    <div class="speech-meta"><span class="speech-impact">optimize existing component</span><span class="speech-tag">TTS</span><span class="speech-tag">Concatenative</span></div>
    <p><strong>Proposed:</strong> Select and concatenate recorded speech units from a large database, optimizing target match and join quality.</p>
    <p><strong>Achievement:</strong> Unit selection greatly improved naturalness compared with heavily rule-based synthesis in constrained domains.</p>
    <p><strong>Why it matters:</strong> It shifted TTS toward data-driven voice building and exposed a lasting tradeoff between naturalness, coverage, and controllability.</p>
    <p class="speech-reflection"><strong>Why this emerged:</strong> Concatenative TTS became attractive because recorded human speech already had natural prosody and timbre that rules could not easily synthesize. The insight was to search a large database for good pieces rather than generate every detail from first principles.</p>
    <p class="speech-source"><a href="https://www.cstr.ed.ac.uk/projects/festival/manual/festival_16.html">source</a></p>
  </div>
</section>

<section class="speech-row">
  <aside class="speech-year">
    1997
    <div class="speech-kicker">Recurrent memory</div>
  </aside>
  <div class="speech-body">
    <h2>Long Short-Term Memory</h2>
    <div class="speech-meta"><span class="speech-impact">optimize existing component</span><span class="speech-tag">ASR</span><span class="speech-tag">TTS</span><span class="speech-tag">Key Concept</span><span class="speech-tag">Sequence Modeling</span></div>
    <p><strong>Proposed:</strong> Add gated memory cells to recurrent neural networks so sequence models could preserve information over longer spans without unstable gradients.</p>
    <p><strong>Achievement:</strong> LSTM made recurrent modeling more practical for long temporal dependencies, later becoming a standard building block in acoustic models, CTC systems, RNN-T, attention ASR, and neural TTS.</p>
    <p><strong>Why it matters:</strong> Before Transformers dominated, LSTMs gave speech systems a trainable way to connect local acoustic frames with wider phonetic, lexical, and prosodic context.</p>
    <p class="speech-reflection"><strong>Why this emerged:</strong> Speech is sequential, but early recurrent networks could not reliably learn dependencies across many frames. LSTM solved a training bottleneck, and later speech systems revealed why memory mattered: recognition and synthesis both depend on context that extends beyond the current sound.</p>
    <p class="speech-source"><a href="https://doi.org/10.1162/neco.1997.9.8.1735">paper</a></p>
  </div>
</section>

<section class="speech-row">
  <aside class="speech-year">
    2000
    <div class="speech-kicker">ASR evaluation</div>
  </aside>
  <div class="speech-body">
    <h2>Word Error Rate And NIST Scoring</h2>
    <div class="speech-meta"><span class="speech-impact">optimize existing component</span><span class="speech-tag">ASR</span><span class="speech-tag">Key Concept</span><span class="speech-tag">Evaluation</span></div>
    <p><strong>Proposed:</strong> Score ASR output by aligning a hypothesis transcript to a human reference and counting substitutions, deletions, and insertions.</p>
    <p><strong>Achievement:</strong> NIST evaluation campaigns and the SCTK/SCLITE tooling made WER a shared benchmark language across conversational, broadcast, and later multilingual ASR tasks.</p>
    <p><strong>Why it matters:</strong> WER is imperfect for meaning, fairness, and downstream utility, but it remains the default regression metric that lets ASR teams compare systems, slices, and releases.</p>
    <p class="speech-reflection"><strong>Why this emerged:</strong> WER emerged because ASR needed a shared, repeatable way to compare systems. It simplified recognition quality into edit distance, which was imperfect but powerful enough to coordinate research, benchmarks, and production regressions.</p>
    <p class="speech-source"><a href="https://github.com/usnistgov/SCTK/blob/master/doc/sclite.htm">tool</a> <a href="https://www.nist.gov/itl/iad/mltg/tools">source</a></p>
  </div>
</section>

<section class="speech-row">
  <aside class="speech-year">
    2002
    <div class="speech-kicker">Parametric synthesis</div>
  </aside>
  <div class="speech-body">
    <h2>HMM-Based Speech Synthesis</h2>
    <div class="speech-meta"><span class="speech-impact">efficiency</span><span class="speech-tag">TTS</span><span class="speech-tag">HMM</span></div>
    <p><strong>Proposed:</strong> Generate acoustic parameters from statistical models, then synthesize speech with a vocoder.</p>
    <p><strong>Achievement:</strong> Statistical parametric TTS made voices smaller, more adaptable, and easier to control than large unit-selection databases.</p>
    <p><strong>Why it matters:</strong> It introduced a model-based generation mindset that later neural acoustic models and vocoders would dramatically improve.</p>
    <p class="speech-reflection"><strong>Why this emerged:</strong> Statistical parametric TTS answered the scaling problems of unit selection: large databases were natural but bulky and hard to adapt. Modeling acoustic parameters made voices smaller and more controllable, even if early systems sounded over-smoothed.</p>
    <p class="speech-source"><a href="https://www.isca-speech.org/archive/icslp_2002/tokuda02_icslp.html">paper</a></p>
  </div>
</section>

<section class="speech-row">
  <aside class="speech-year">
    2006
    <div class="speech-kicker">Sequence learning</div>
  </aside>
  <div class="speech-body">
    <h2>Connectionist Temporal Classification</h2>
    <div class="speech-meta"><span class="speech-impact">new capability</span><span class="speech-tag">ASR</span><span class="speech-tag">End-to-End</span></div>
    <p><strong>Proposed:</strong> Train sequence models without frame-level alignments by summing over possible label-to-frame paths.</p>
    <p><strong>Achievement:</strong> CTC made direct acoustic-to-label learning practical for tasks where exact alignments are expensive or unknown.</p>
    <p><strong>Why it matters:</strong> CTC became one of the core losses behind end-to-end ASR and remains common in production-grade recognizers.</p>
    <p class="speech-reflection"><strong>Why this emerged:</strong> CTC came from a bottleneck in supervised sequence learning: frame-level labels were expensive and often ambiguous. It let models learn alignments implicitly, which opened a path from handcrafted alignment pipelines toward end-to-end recognition.</p>
    <p class="speech-source"><a href="https://www.cs.toronto.edu/~graves/icml_2006.pdf">paper</a></p>
  </div>
</section>

<h2 id="neural" class="speech-era">Neural Turn</h2>

<section class="speech-row">
  <aside class="speech-year">
    2011
    <div class="speech-kicker">Open ASR recipes</div>
  </aside>
  <div class="speech-body">
    <h2>Kaldi Speech Recognition Toolkit</h2>
    <div class="speech-meta"><span class="speech-impact">efficiency</span><span class="speech-tag">ASR</span><span class="speech-tag">Toolkit</span><span class="speech-tag">WFST</span></div>
    <p><strong>Proposed:</strong> A flexible open-source ASR toolkit built around finite-state decoding, modular recipes, and extensible acoustic modeling.</p>
    <p><strong>Achievement:</strong> Kaldi made strong HMM/GMM, DNN-HMM, speaker adaptation, lattice, and language-model workflows reproducible across research labs and production teams.</p>
    <p><strong>Why it matters:</strong> It became the common engineering language for a decade of ASR work, and many modern neural, streaming, and contextual-biasing systems still inherit its decoding and evaluation habits.</p>
    <p class="speech-reflection"><strong>Why this emerged:</strong> Kaldi appeared when ASR research needed a shared, reproducible engineering base for feature pipelines, lattices, WFST decoding, and acoustic modeling. Its importance is not one architecture, but the way it made serious speech experiments easier to build, compare, and ship.</p>
    <p class="speech-source"><a href="https://www.isca-speech.org/archive/asru_2011/povey11_asru.html">paper</a></p>
  </div>
</section>

<section class="speech-row">
  <aside class="speech-year">
    2012
    <div class="speech-kicker">Deep acoustic models</div>
  </aside>
  <div class="speech-body">
    <h2>DNN-HMM Acoustic Modeling</h2>
    <div class="speech-meta"><span class="speech-impact">optimize existing component</span><span class="speech-tag">ASR</span><span class="speech-tag">Hybrid</span></div>
    <p><strong>Proposed:</strong> Replace GMM acoustic likelihood models with deep neural networks while keeping HMM decoding and language-model infrastructure.</p>
    <p><strong>Achievement:</strong> DNN-HMM systems delivered large WER reductions on established ASR benchmarks.</p>
    <p><strong>Why it matters:</strong> This was the practical deep-learning breakthrough for ASR: neural models entered production without throwing away decoding graphs and lexicons.</p>
    <p class="speech-reflection"><strong>Why this emerged:</strong> The DNN-HMM shift happened because neural networks became strong enough to model acoustic states better than GMMs while the HMM decoder stack still worked. It was a pragmatic transition: replace the weakest component first instead of rebuilding the whole recognizer.</p>
    <p class="speech-source"><a href="https://ieeexplore.ieee.org/document/6296526">paper</a></p>
  </div>
</section>

<section class="speech-row">
  <aside class="speech-year">
    2012
    <div class="speech-kicker">Alignment-free transduction</div>
  </aside>
  <div class="speech-body">
    <h2>Recurrent Neural Network Transducer</h2>
    <div class="speech-meta"><span class="speech-impact">new capability</span><span class="speech-tag">ASR</span><span class="speech-tag">Key Concept</span><span class="speech-tag">Transducer</span></div>
    <p><strong>Proposed:</strong> Learn a probabilistic mapping from an input sequence to an output sequence without requiring a predefined frame-level alignment.</p>
    <p><strong>Achievement:</strong> RNN-T extended the CTC idea with a prediction network, letting recognition depend on both acoustic history and emitted label history.</p>
    <p><strong>Why it matters:</strong> The transducer objective became a core foundation for streaming end-to-end ASR, where low latency and incremental decoding matter as much as accuracy.</p>
    <p class="speech-reflection"><strong>Why this emerged:</strong> RNN-T extended alignment-free learning toward streaming recognition, where outputs must appear before the whole utterance is heard. The insight was to jointly model acoustics, history, and alignment so real-time ASR could be trained end to end.</p>
    <p class="speech-source"><a href="https://arxiv.org/abs/1211.3711">paper</a></p>
  </div>
</section>

<section class="speech-row">
  <aside class="speech-year">
    2014
    <div class="speech-kicker">End-to-end scale</div>
  </aside>
  <div class="speech-body">
    <h2>Deep Speech</h2>
    <div class="speech-meta"><span class="speech-impact">new capability</span><span class="speech-tag">ASR</span><span class="speech-tag">CTC</span></div>
    <p><strong>Proposed:</strong> Train a large neural recognizer with CTC on substantial speech data and pair it with decoding and language-model support.</p>
    <p><strong>Achievement:</strong> It showed that a simpler end-to-end acoustic pipeline could compete with heavily engineered systems when trained at scale.</p>
    <p><strong>Why it matters:</strong> Deep Speech made data, compute, and neural sequence modeling the center of modern ASR progress.</p>
    <p class="speech-reflection"><strong>Why this emerged:</strong> Deep Speech pushed the idea that scale could substitute for much of the hand-built ASR pipeline. It did not remove every engineering choice, but it made data, compute, and simple neural sequence objectives feel like the main path forward.</p>
    <p class="speech-source"><a href="https://arxiv.org/abs/1412.5567">paper</a></p>
  </div>
</section>

<section class="speech-row">
  <aside class="speech-year">
    2015
    <div class="speech-kicker">Open benchmark data</div>
  </aside>
  <div class="speech-body">
    <h2>LibriSpeech</h2>
    <div class="speech-meta"><span class="speech-impact">efficiency</span><span class="speech-tag">ASR</span><span class="speech-tag">Key Concept</span><span class="speech-tag">Dataset</span></div>
    <p><strong>Proposed:</strong> Build a large, freely available corpus of read English speech derived from public-domain audiobooks, with standardized train, development, and test splits.</p>
    <p><strong>Achievement:</strong> LibriSpeech gave ASR researchers about 1,000 hours of labeled speech and became a shared benchmark for conventional, end-to-end, and self-supervised recognizers.</p>
    <p><strong>Why it matters:</strong> It made strong public ASR comparison easier, helping labs measure progress without relying only on proprietary speech collections.</p>
    <p class="speech-reflection"><strong>Why this emerged:</strong> Modern ASR needed more than clever models; it needed accessible data large enough to expose scaling behavior. LibriSpeech turned public audiobook recordings into a durable benchmark, and later systems revealed its importance by using it to compare CTC, attention, transducer, and self-supervised pretraining recipes.</p>
    <p class="speech-source"><a href="https://arxiv.org/abs/1512.04467">paper</a> <a href="https://www.openslr.org/12/">dataset</a></p>
  </div>
</section>

<section class="speech-row">
  <aside class="speech-year">
    2015
    <div class="speech-kicker">Attention-based ASR</div>
  </aside>
  <div class="speech-body">
    <h2>Listen, Attend and Spell</h2>
    <div class="speech-meta"><span class="speech-impact">new capability</span><span class="speech-tag">ASR</span><span class="speech-tag">Attention</span><span class="speech-tag">Seq2seq</span></div>
    <p><strong>Proposed:</strong> A pyramidal recurrent encoder and attention decoder that transcribes speech into characters without a pronunciation lexicon.</p>
    <p><strong>Achievement:</strong> LAS showed that attention-based sequence-to-sequence modeling could learn acoustic modeling, alignment, and character prediction jointly.</p>
    <p><strong>Why it matters:</strong> It made attention a serious ASR architecture, complementing CTC and influencing later contextual, multilingual, and encoder-decoder recognizers.</p>
    <p class="speech-reflection"><strong>Why this emerged:</strong> LAS grew from the success of sequence-to-sequence learning in machine translation and asked whether speech could be transcribed by attention over acoustic frames. Its insight was to treat ASR as direct sequence generation rather than decoding through a fixed lexicon.</p>
    <p class="speech-source"><a href="https://arxiv.org/abs/1508.01211">paper</a></p>
  </div>
</section>

<section class="speech-row">
  <aside class="speech-year">
    2016
    <div class="speech-kicker">Real-time vocoding</div>
  </aside>
  <div class="speech-body">
    <h2>WORLD Vocoder</h2>
    <div class="speech-meta"><span class="speech-impact">efficiency</span><span class="speech-tag">TTS</span><span class="speech-tag">Key Concept</span><span class="speech-tag">Vocoder</span></div>
    <p><strong>Proposed:</strong> A high-quality speech analysis-synthesis system that estimates F0, spectral envelope, and aperiodicity, then resynthesizes speech quickly enough for real-time use.</p>
    <p><strong>Achievement:</strong> WORLD made controllable vocoder-based synthesis practical for statistical parametric TTS, singing synthesis, voice conversion, and speech research tooling.</p>
    <p><strong>Why it matters:</strong> Even after neural vocoders improved naturalness, WORLD remained a common reference and preprocessing tool because its interpretable parameters expose pitch, timbre, and noise structure explicitly.</p>
    <p class="speech-reflection"><strong>Why this emerged:</strong> Statistical and conversion-based speech systems needed a vocoder that was both high quality and fast, without hiding every acoustic factor inside a waveform model. WORLD shows why interpretable signal parameters stayed useful: later neural systems could outperform classical resynthesis, but still benefited from pitch, spectral, and aperiodicity concepts that WORLD made easy to manipulate.</p>
    <p class="speech-source"><a href="https://www.jstage.jst.go.jp/article/transinf/E99.D/7/E99.D_2015EDP7457/_article">paper</a> <a href="https://github.com/mmorise/World">source</a></p>
  </div>
</section>

<section class="speech-row">
  <aside class="speech-year">
    2016
    <div class="speech-kicker">Neural waveform generation</div>
  </aside>
  <div class="speech-body">
    <h2>WaveNet</h2>
    <div class="speech-meta"><span class="speech-impact">new capability</span><span class="speech-tag">TTS</span><span class="speech-tag">Neural Vocoder</span></div>
    <p><strong>Proposed:</strong> Autoregressive neural waveform modeling with dilated convolutions.</p>
    <p><strong>Achievement:</strong> WaveNet produced much more natural speech than conventional vocoders and became a reference point for neural audio generation.</p>
    <p><strong>Why it matters:</strong> It separated high-quality waveform generation from older hand-engineered vocoders, enabling the neural TTS wave that followed.</p>
    <p class="speech-reflection"><strong>Why this emerged:</strong> WaveNet appeared because neural models were becoming good enough to model raw audio itself, not only acoustic features. It showed that a learned waveform generator could capture fine speech texture that traditional vocoders struggled to reproduce.</p>
    <p class="speech-source"><a href="https://arxiv.org/abs/1609.03499">paper</a></p>
  </div>
</section>

<section class="speech-row">
  <aside class="speech-year">
    2017
    <div class="speech-kicker">Seq2seq synthesis</div>
  </aside>
  <div class="speech-body">
    <h2>Tacotron</h2>
    <div class="speech-meta"><span class="speech-impact">new capability</span><span class="speech-tag">TTS</span><span class="speech-tag">Attention</span></div>
    <p><strong>Proposed:</strong> An encoder-decoder model that maps characters to spectrogram-like acoustic features with attention.</p>
    <p><strong>Achievement:</strong> It reduced the need for complex front-end feature engineering and made end-to-end neural TTS feel practical.</p>
    <p><strong>Why it matters:</strong> Tacotron turned TTS into a sequence-to-sequence modeling problem and influenced nearly every neural TTS architecture after it.</p>
    <p class="speech-reflection"><strong>Why this emerged:</strong> Tacotron came from asking whether the many hand-built parts of TTS front ends could be learned as one sequence-to-sequence mapping. It kept a spectrogram target for practicality, but moved the field toward end-to-end text-to-speech modeling.</p>
    <p class="speech-source"><a href="https://arxiv.org/abs/1703.10135">paper</a></p>
  </div>
</section>

<section class="speech-row">
  <aside class="speech-year">
    2017
    <div class="speech-kicker">Attention backbone</div>
  </aside>
  <div class="speech-body">
    <h2>Transformer Sequence Modeling</h2>
    <div class="speech-meta"><span class="speech-impact">optimize existing component</span><span class="speech-tag">ASR</span><span class="speech-tag">TTS</span><span class="speech-tag">Key Concept</span><span class="speech-tag">Attention</span></div>
    <p><strong>Proposed:</strong> Replace recurrent sequence modeling with stacked self-attention and feed-forward layers, making long-context token interactions easier to learn in parallel.</p>
    <p><strong>Achievement:</strong> Although introduced for machine translation, the Transformer quickly became the backbone pattern behind Conformer ASR, Whisper-style encoder-decoders, speech LMs, and codec-token generators.</p>
    <p><strong>Why it matters:</strong> It gave speech systems a scalable architecture for combining acoustic context, text context, and token generation, which later foundation models adapted across recognition, synthesis, and speech-to-speech dialogue.</p>
    <p class="speech-reflection"><strong>Why this emerged:</strong> Speech models had long balanced sequence order, alignment, and context with recurrent networks and convolutional shortcuts. The Transformer showed that attention itself could carry much of that burden, and later speech systems revealed why that mattered: audio is sequential, but strong models also need flexible access to distant context and parallel training.</p>
    <p class="speech-source"><a href="https://arxiv.org/abs/1706.03762">paper</a></p>
  </div>
</section>

<section class="speech-row">
  <aside class="speech-year">
    2017
    <div class="speech-kicker">Neural TTS stack</div>
  </aside>
  <div class="speech-body">
    <h2>Tacotron 2</h2>
    <div class="speech-meta"><span class="speech-impact">optimize existing component</span><span class="speech-tag">TTS</span><span class="speech-tag">Attention</span><span class="speech-tag">Neural Vocoder</span></div>
    <p><strong>Proposed:</strong> Pair an attention-based spectrogram predictor with a modified WaveNet vocoder to synthesize waveform audio from characters.</p>
    <p><strong>Achievement:</strong> Tacotron 2 produced highly natural single-speaker TTS and made the acoustic-model-plus-neural-vocoder recipe a dominant neural synthesis pattern.</p>
    <p><strong>Why it matters:</strong> It connected sequence-to-sequence text modeling with high-fidelity waveform generation, setting the baseline that later non-autoregressive, diffusion, and codec-token TTS systems tried to improve.</p>
    <p class="speech-reflection"><strong>Why this emerged:</strong> Tacotron 2 connected a strong sequence-to-spectrogram model with a neural vocoder, showing how naturalness improved when acoustic modeling and waveform generation advanced together. It helped define the modern neural TTS stack: predict a rich intermediate representation, then render it well.</p>
    <p class="speech-source"><a href="https://arxiv.org/abs/1712.05884">paper</a></p>
  </div>
</section>

<section class="speech-row">
  <aside class="speech-year">
    2018
    <div class="speech-kicker">Parallel vocoding</div>
  </aside>
  <div class="speech-body">
    <h2>Parallel WaveNet</h2>
    <div class="speech-meta"><span class="speech-impact">efficiency</span><span class="speech-tag">TTS</span><span class="speech-tag">Neural Vocoder</span><span class="speech-tag">Distillation</span></div>
    <p><strong>Proposed:</strong> Distill an autoregressive WaveNet teacher into a parallel feed-forward student using probability density distillation.</p>
    <p><strong>Achievement:</strong> It preserved high-fidelity neural waveform quality while generating speech more than 20 times faster than real time and serving production voices.</p>
    <p><strong>Why it matters:</strong> Parallel WaveNet turned neural vocoding from an impressive but slow research result into a deployable TTS component, setting up later fast flow, GAN, and diffusion vocoders.</p>
    <p class="speech-reflection"><strong>Why this emerged:</strong> WaveNet proved that neural waveform models could sound natural, but sample-by-sample generation was too slow for real assistants. Parallel WaveNet shows a recurring deployment pattern in speech: first prove quality with a costly model, then redesign the generator so the same idea fits latency and serving constraints.</p>
    <p class="speech-source"><a href="https://proceedings.mlr.press/v80/oord18a.html">paper</a> <a href="https://arxiv.org/abs/1711.10433">arXiv</a></p>
  </div>
</section>

<section class="speech-row">
  <aside class="speech-year">
    2018
    <div class="speech-kicker">Speaker embeddings</div>
  </aside>
  <div class="speech-body">
    <h2>X-Vectors For Speaker Representation</h2>
    <div class="speech-meta"><span class="speech-impact">optimize existing component</span><span class="speech-tag">ASR</span><span class="speech-tag">TTS</span><span class="speech-tag">Key Concept</span><span class="speech-tag">Speaker Modeling</span></div>
    <p><strong>Proposed:</strong> Train a deep neural network to map variable-length utterances into fixed-dimensional speaker embeddings, with augmentation to improve robustness.</p>
    <p><strong>Achievement:</strong> X-vectors became a practical speaker representation for verification, diarization, adaptation, and downstream speech-system conditioning.</p>
    <p><strong>Why it matters:</strong> Modern voice cloning, speaker-aware ASR, diarization, and personalized TTS all rely on the same idea: separate who is speaking from what is being said well enough to condition another model.</p>
    <p class="speech-reflection"><strong>Why this emerged:</strong> Speech systems needed compact speaker identity signals that were easier to reuse than whole enrollment recordings or hand-built adaptation statistics. X-vectors showed that neural embeddings could carry speaker information across variable speech segments, and later voice-generation systems revealed how central that representation layer would become for controllable personalized speech.</p>
    <p class="speech-source"><a href="https://ieeexplore.ieee.org/document/8461375/">paper</a></p>
  </div>
</section>

<section class="speech-row">
  <aside class="speech-year">
    2018
    <div class="speech-kicker">Transducer revival</div>
  </aside>
  <div class="speech-body">
    <h2>Streaming RNN-Transducer ASR</h2>
    <div class="speech-meta"><span class="speech-impact">efficiency</span><span class="speech-tag">ASR</span><span class="speech-tag">Streaming</span></div>
    <p><strong>Proposed:</strong> Use transducer models to jointly learn acoustic encoding, prediction, and alignment for streaming recognition.</p>
    <p><strong>Achievement:</strong> RNN-T became a dominant production architecture for low-latency ASR on phones, assistants, and meetings.</p>
    <p><strong>Why it matters:</strong> It balanced end-to-end modeling with streaming constraints, making it central to real-time speech products.</p>
    <p class="speech-reflection"><strong>Why this emerged:</strong> Production ASR needed partial results with low latency, not only accurate transcripts after the utterance ended. Streaming RNN-T made the end-to-end approach fit real devices and assistants by making timing part of the model design.</p>
    <p class="speech-source"><a href="https://arxiv.org/abs/1811.06621">paper</a></p>
  </div>
</section>

<section class="speech-row">
  <aside class="speech-year">
    2018
    <div class="speech-kicker">Contrastive pretraining</div>
  </aside>
  <div class="speech-body">
    <h2>Contrastive Predictive Coding</h2>
    <div class="speech-meta"><span class="speech-impact">efficiency</span><span class="speech-tag">ASR</span><span class="speech-tag">Key Concept</span><span class="speech-tag">Pretraining</span></div>
    <p><strong>Proposed:</strong> Learn useful representations by predicting future latent observations with a contrastive objective, including experiments on raw speech.</p>
    <p><strong>Achievement:</strong> CPC showed that unlabeled audio could train speech features that transfer to phoneme recognition and other downstream tasks.</p>
    <p><strong>Why it matters:</strong> It helped define the contrastive self-supervised recipe that influenced wav2vec, wav2vec 2.0, and later speech foundation-model pretraining.</p>
    <p class="speech-reflection"><strong>Why this emerged:</strong> Speech had far more raw audio than labels, so the field needed training signals that came from the signal itself. CPC made future prediction and contrastive negatives feel like a practical substitute for annotation, revealing why pretraining could become a data-efficiency engine for ASR.</p>
    <p class="speech-source"><a href="https://arxiv.org/abs/1807.03748">paper</a></p>
  </div>
</section>

<section class="speech-row">
  <aside class="speech-year">
    2019
    <div class="speech-kicker">Acoustic augmentation</div>
  </aside>
  <div class="speech-body">
    <h2>SpecAugment</h2>
    <div class="speech-meta"><span class="speech-impact">efficiency</span><span class="speech-tag">ASR</span><span class="speech-tag">Key Concept</span><span class="speech-tag">Regularization</span></div>
    <p><strong>Proposed:</strong> Improve ASR training by masking blocks of time and frequency directly on log-mel spectrogram inputs, plus simple time warping.</p>
    <p><strong>Achievement:</strong> SpecAugment gave end-to-end recognizers a strong, architecture-independent regularizer without requiring extra labeled speech.</p>
    <p><strong>Why it matters:</strong> It made acoustic data augmentation a default part of modern ASR recipes, especially for CTC, attention, transducer, and self-supervised fine-tuning pipelines.</p>
    <p class="speech-reflection"><strong>Why this emerged:</strong> SpecAugment came from a simple observation: speech models overfit to narrow acoustic patterns, and spectrograms can be augmented like images. Masking time and frequency forced models to rely on broader context, improving robustness without collecting new labeled audio.</p>
    <p class="speech-source"><a href="https://arxiv.org/abs/1904.08779">paper</a></p>
  </div>
</section>

<section class="speech-row">
  <aside class="speech-year">
    2019
    <div class="speech-kicker">Fast synthesis</div>
  </aside>
  <div class="speech-body">
    <h2>FastSpeech</h2>
    <div class="speech-meta"><span class="speech-impact">efficiency</span><span class="speech-tag">TTS</span><span class="speech-tag">Non-Autoregressive</span></div>
    <p><strong>Proposed:</strong> A feed-forward Transformer TTS model with duration prediction to generate speech features in parallel.</p>
    <p><strong>Achievement:</strong> It improved inference speed and controllability compared with autoregressive attention models.</p>
    <p><strong>Why it matters:</strong> FastSpeech made latency and stability first-class TTS architecture goals, not just deployment optimizations.</p>
    <p class="speech-reflection"><strong>Why this emerged:</strong> FastSpeech emerged because autoregressive TTS models could sound good but were slow and sometimes unstable. By predicting durations and generating frames in parallel, it made speed, controllability, and reliable alignment central parts of TTS architecture.</p>
    <p class="speech-source"><a href="https://arxiv.org/abs/1905.09263">paper</a></p>
  </div>
</section>

<h2 id="foundation" class="speech-era">Foundation Models</h2>

<section class="speech-row">
  <aside class="speech-year">
    2020
    <div class="speech-kicker">Convolution + attention</div>
  </aside>
  <div class="speech-body">
    <h2>Conformer</h2>
    <div class="speech-meta"><span class="speech-impact">optimize existing component</span><span class="speech-tag">ASR</span><span class="speech-tag">Transformer</span></div>
    <p><strong>Proposed:</strong> Combine convolution modules with self-attention to capture local acoustic patterns and global context.</p>
    <p><strong>Achievement:</strong> Conformer became a high-performing backbone for hybrid, CTC, attention, and transducer ASR systems.</p>
    <p><strong>Why it matters:</strong> It showed that speech architectures benefit from both local signal structure and long-range sequence modeling.</p>
    <p class="speech-reflection"><strong>Why this emerged:</strong> Conformer reflected the realization that speech needs both local pattern modeling and long-range context. Convolutions capture nearby acoustic structure while attention captures broader dependencies, so the architecture combined both instead of choosing one.</p>
    <p class="speech-source"><a href="https://arxiv.org/abs/2005.08100">paper</a></p>
  </div>
</section>

<section class="speech-row">
  <aside class="speech-year">
    2020
    <div class="speech-kicker">Fast neural vocoding</div>
  </aside>
  <div class="speech-body">
    <h2>HiFi-GAN</h2>
    <div class="speech-meta"><span class="speech-impact">efficiency</span><span class="speech-tag">TTS</span><span class="speech-tag">Neural Vocoder</span><span class="speech-tag">GAN</span></div>
    <p><strong>Proposed:</strong> Generate high-fidelity speech waveforms from mel-spectrograms with a generative adversarial network designed for fast inference.</p>
    <p><strong>Achievement:</strong> HiFi-GAN delivered strong perceptual quality while running far faster than autoregressive neural vocoders.</p>
    <p><strong>Why it matters:</strong> It made neural vocoding a practical default in open-source and production TTS pipelines, bridging Tacotron-style acoustic models, VITS, and later codec-token systems.</p>
    <p class="speech-reflection"><strong>Why this emerged:</strong> HiFi-GAN responded to the cost and latency of high-quality neural waveform generation. The insight was that adversarial training could produce convincing audio much faster than autoregressive vocoders, making neural TTS more practical.</p>
    <p class="speech-source"><a href="https://arxiv.org/abs/2010.05646">paper</a></p>
  </div>
</section>

<section class="speech-row">
  <aside class="speech-year">
    2020
    <div class="speech-kicker">Diffusion vocoding</div>
  </aside>
  <div class="speech-body">
    <h2>DiffWave And Diffusion Speech Generation</h2>
    <div class="speech-meta"><span class="speech-impact">optimize existing component</span><span class="speech-tag">TTS</span><span class="speech-tag">Neural Vocoder</span><span class="speech-tag">Diffusion</span></div>
    <p><strong>Proposed:</strong> Generate speech waveforms by reversing a gradual noise process, conditioning the denoising model on acoustic features such as mel-spectrograms.</p>
    <p><strong>Achievement:</strong> DiffWave showed that diffusion models could synthesize high-quality speech with a non-autoregressive generative process.</p>
    <p><strong>Why it matters:</strong> Diffusion became a major alternative to autoregressive and adversarial vocoders, later influencing controllable TTS, zero-shot voice generation, and speech editing systems.</p>
    <p class="speech-reflection"><strong>Why this emerged:</strong> Diffusion vocoding followed the search for generators that were stable to train, high quality, and less sequential than autoregressive waveform models. Later TTS systems show why this mattered: denoising models give speech generation a flexible way to trade speed, quality, and control.</p>
    <p class="speech-source"><a href="https://arxiv.org/abs/2009.09761">paper</a></p>
  </div>
</section>

<section class="speech-row">
  <aside class="speech-year">
    2020
    <div class="speech-kicker">Self-supervision</div>
  </aside>
  <div class="speech-body">
    <h2>wav2vec 2.0</h2>
    <div class="speech-meta"><span class="speech-impact">efficiency</span><span class="speech-tag">ASR</span><span class="speech-tag">Pretraining</span></div>
    <p><strong>Proposed:</strong> Learn speech representations from raw audio with masked prediction over quantized latent targets, then fine-tune with limited labels.</p>
    <p><strong>Achievement:</strong> It sharply reduced labeled-data requirements and improved low-resource ASR performance.</p>
    <p><strong>Why it matters:</strong> Self-supervised pretraining moved speech toward the foundation-model pattern: pretrain broadly, adapt narrowly, evaluate by slice.</p>
    <p class="speech-reflection"><strong>Why this emerged:</strong> wav2vec 2.0 came from the recognition that unlabeled audio is abundant while transcribed speech is expensive. Masked self-supervision let models learn useful speech structure first, then use labeled data more efficiently.</p>
    <p class="speech-source"><a href="https://arxiv.org/abs/2006.11477">paper</a></p>
  </div>
</section>

<section class="speech-row">
  <aside class="speech-year">
    2021
    <div class="speech-kicker">End-to-end neural TTS</div>
  </aside>
  <div class="speech-body">
    <h2>VITS</h2>
    <div class="speech-meta"><span class="speech-impact">efficiency</span><span class="speech-tag">TTS</span><span class="speech-tag">Flow</span><span class="speech-tag">VAE</span></div>
    <p><strong>Proposed:</strong> An end-to-end TTS model combining variational inference, normalizing flows, adversarial training, and a neural vocoder.</p>
    <p><strong>Achievement:</strong> It produced strong naturalness without a separate acoustic model and vocoder training pipeline.</p>
    <p><strong>Why it matters:</strong> VITS made compact end-to-end voice models practical for many open-source and production-adjacent TTS systems.</p>
    <p class="speech-reflection"><strong>Why this emerged:</strong> VITS pushed against the multi-stage TTS pipeline by training alignment, acoustic modeling, and waveform generation together. It reflects the field's move from handoff-based systems toward integrated generative speech models.</p>
    <p class="speech-source"><a href="https://arxiv.org/abs/2106.06103">paper</a></p>
  </div>
</section>

<section class="speech-row">
  <aside class="speech-year">
    2021
    <div class="speech-kicker">Discrete speech units</div>
  </aside>
  <div class="speech-body">
    <h2>HuBERT</h2>
    <div class="speech-meta"><span class="speech-impact">efficiency</span><span class="speech-tag">ASR</span><span class="speech-tag">Representation Learning</span></div>
    <p><strong>Proposed:</strong> Predict masked speech-unit clusters to learn robust hidden-unit representations from unlabeled audio.</p>
    <p><strong>Achievement:</strong> HuBERT strengthened self-supervised speech representation learning and helped popularize discrete unit modeling.</p>
    <p><strong>Why it matters:</strong> Discrete speech units later became important for speech language models, codec-based generation, and speech-to-speech systems.</p>
    <p class="speech-reflection"><strong>Why this emerged:</strong> HuBERT used hidden unit prediction because raw speech has structure that can be discovered before labels are available. Its clustered targets also foreshadowed the discrete speech units later used by audio language models and codec-based generation.</p>
    <p class="speech-source"><a href="https://arxiv.org/abs/2106.07447">paper</a></p>
  </div>
</section>

<section class="speech-row">
  <aside class="speech-year">
    2021
    <div class="speech-kicker">Neural audio codecs</div>
  </aside>
  <div class="speech-body">
    <h2>SoundStream And Codec Tokens</h2>
    <div class="speech-meta"><span class="speech-impact">efficiency</span><span class="speech-tag">TTS</span><span class="speech-tag">Key Concept</span><span class="speech-tag">Codec</span></div>
    <p><strong>Proposed:</strong> Compress speech and general audio with an end-to-end neural encoder, residual vector quantizer, and decoder that can stream at low bitrate.</p>
    <p><strong>Achievement:</strong> SoundStream made high-quality neural audio compression practical with learned quantized representations that could run at low bitrate.</p>
    <p><strong>Why it matters:</strong> It helped establish neural codecs as a reusable interface between waveforms, compression, synthesis, and later audio-token language models.</p>
    <p class="speech-reflection"><strong>Why this emerged:</strong> Neural codecs emerged from the need to compress audio into tokens that preserve perceptual quality while remaining model-friendly. Once speech could be represented as discrete codes, language-model ideas could move much more directly into speech generation.</p>
    <p class="speech-source"><a href="https://arxiv.org/abs/2107.03312">paper</a> <a href="https://arxiv.org/abs/2210.13438">related</a></p>
  </div>
</section>

<section class="speech-row">
  <aside class="speech-year">
    2022
    <div class="speech-kicker">Audio token compression</div>
  </aside>
  <div class="speech-body">
    <h2>EnCodec</h2>
    <div class="speech-meta"><span class="speech-impact">efficiency</span><span class="speech-tag">TTS</span><span class="speech-tag">Key Concept</span><span class="speech-tag">Codec</span></div>
    <p><strong>Proposed:</strong> A neural audio codec with residual vector quantization, adversarial reconstruction, and an optional language model over discrete audio codes.</p>
    <p><strong>Achievement:</strong> EnCodec produced high-quality audio compression at low bitrates and made codec streams easy to reuse as model tokens.</p>
    <p><strong>Why it matters:</strong> Its token interface became a practical foundation for codec-language-model TTS, including VALL-E-style voice cloning and later speech-to-speech systems.</p>
    <p class="speech-reflection"><strong>Why this emerged:</strong> EnCodec came from the same compression pressure as SoundStream, but its impact widened when discrete audio codes became convenient training targets. Later speech LMs showed that a good codec is not just a storage format; it can define the vocabulary that generative speech models learn to speak.</p>
    <p class="speech-source"><a href="https://arxiv.org/abs/2210.13438">paper</a></p>
  </div>
</section>

<section class="speech-row">
  <aside class="speech-year">
    2022
    <div class="speech-kicker">Web-scale robustness</div>
  </aside>
  <div class="speech-body">
    <h2>Whisper</h2>
    <div class="speech-meta"><span class="speech-impact">new capability</span><span class="speech-tag">ASR</span><span class="speech-tag">Weak Supervision</span></div>
    <p><strong>Proposed:</strong> Train a sequence-to-sequence speech recognizer on a very large weakly supervised multilingual audio corpus.</p>
    <p><strong>Achievement:</strong> Whisper delivered unusually robust zero-shot ASR and translation behavior across languages, accents, and noisy audio.</p>
    <p><strong>Why it matters:</strong> It changed expectations for open ASR baselines and made robustness through scale a default comparison point.</p>
    <p class="speech-reflection"><strong>Why this emerged:</strong> Whisper showed what happens when weak supervision and scale are applied aggressively to multilingual speech. Instead of optimizing only narrow benchmarks, it made robustness across messy real-world audio a defining objective.</p>
    <p class="speech-source"><a href="https://arxiv.org/abs/2212.04356">paper</a></p>
  </div>
</section>

<section class="speech-row">
  <aside class="speech-year">
    2022
    <div class="speech-kicker">Audio language modeling</div>
  </aside>
  <div class="speech-body">
    <h2>AudioLM</h2>
    <div class="speech-meta"><span class="speech-impact">new capability</span><span class="speech-tag">TTS</span><span class="speech-tag">Speech LM</span></div>
    <p><strong>Proposed:</strong> Model speech as a hierarchy of semantic and acoustic tokens for long-range coherent audio generation.</p>
    <p><strong>Achievement:</strong> It generated realistic speech continuations while preserving speaker identity and acoustic consistency.</p>
    <p><strong>Why it matters:</strong> AudioLM helped reframe speech synthesis as language modeling over audio tokens, a path toward modern speech-to-speech models.</p>
    <p class="speech-reflection"><strong>Why this emerged:</strong> AudioLM came from applying language modeling to audio tokens rather than text tokens. The key insight was that speech has semantic structure and acoustic detail at different time scales, so a hierarchy of tokens could model both.</p>
    <p class="speech-source"><a href="https://arxiv.org/abs/2209.03143">paper</a></p>
  </div>
</section>

<section class="speech-row">
  <aside class="speech-year">
    2023
    <div class="speech-kicker">In-context voice cloning</div>
  </aside>
  <div class="speech-body">
    <h2>VALL-E</h2>
    <div class="speech-meta"><span class="speech-impact">new capability</span><span class="speech-tag">TTS</span><span class="speech-tag">Codec LM</span></div>
    <p><strong>Proposed:</strong> Treat TTS as conditional language modeling over discrete codec codes using a short acoustic prompt.</p>
    <p><strong>Achievement:</strong> It demonstrated convincing zero-shot voice cloning from a few seconds of speech.</p>
    <p><strong>Why it matters:</strong> VALL-E made codec-token modeling central to modern voice generation and raised the importance of safety, consent, and speaker verification.</p>
    <p class="speech-reflection"><strong>Why this emerged:</strong> VALL-E built on codec tokens and in-context learning: if a short prompt captures voice identity, a language model can continue speech in that voice. It made voice cloning feel like prompting, which also made consent and misuse harder to ignore.</p>
    <p class="speech-source"><a href="https://arxiv.org/abs/2301.02111">paper</a></p>
  </div>
</section>

<section class="speech-row">
  <aside class="speech-year">
    2023
    <div class="speech-kicker">Low-resource scale</div>
  </aside>
  <div class="speech-body">
    <h2>Massively Multilingual Speech</h2>
    <div class="speech-meta"><span class="speech-impact">new capability</span><span class="speech-tag">ASR</span><span class="speech-tag">TTS</span><span class="speech-tag">Multilingual</span></div>
    <p><strong>Proposed:</strong> Scale speech recognition, synthesis, and language identification across far more languages by combining self-supervised wav2vec 2.0 pretraining with broad public speech data.</p>
    <p><strong>Achievement:</strong> MMS reported ASR and TTS models for 1,107 languages, pretrained representations across 1,406 languages, and language identification for 4,017 languages.</p>
    <p><strong>Why it matters:</strong> It made language coverage itself a major speech milestone, showing that foundation-style pretraining could reach communities far outside the usual high-resource benchmark set.</p>
    <p class="speech-reflection"><strong>Why this emerged:</strong> Multilingual speech systems had improved, but most still served only a small fraction of spoken languages. MMS arose from the mismatch between abundant unlabeled speech, scarce transcriptions, and the social value of supporting low-resource languages; later speech foundation models keep returning to this lesson that coverage is a capability, not just a dataset statistic.</p>
    <p class="speech-source"><a href="https://arxiv.org/abs/2305.13516">paper</a> <a href="https://ai.meta.com/blog/multilingual-model-speech-recognition/">project</a></p>
  </div>
</section>

<section class="speech-row">
  <aside class="speech-year">
    2023
    <div class="speech-kicker">Speech infilling</div>
  </aside>
  <div class="speech-body">
    <h2>Voicebox</h2>
    <div class="speech-meta"><span class="speech-impact">new capability</span><span class="speech-tag">TTS</span><span class="speech-tag">Speech Editing</span><span class="speech-tag">Flow Matching</span></div>
    <p><strong>Proposed:</strong> Train a non-autoregressive flow-matching model to infill masked speech from surrounding audio context and text guidance.</p>
    <p><strong>Achievement:</strong> It generalized one speech generation model across zero-shot TTS, cross-lingual style transfer, denoising, content editing, and diverse sample generation.</p>
    <p><strong>Why it matters:</strong> Voicebox made speech generation look less like a single-purpose synthesizer and more like a general text-guided audio editing and creation model.</p>
    <p class="speech-reflection"><strong>Why this emerged:</strong> Codec-token models showed that prompting could clone voices, but many speech tasks also need local editing, future context, and fast non-autoregressive generation. Voicebox turned infilling into the training problem, revealing why a generative speech model could become useful across synthesis, repair, and style transfer rather than only text-to-speech.</p>
    <p class="speech-source"><a href="https://arxiv.org/abs/2306.15687">paper</a> <a href="https://voicebox.metademolab.com/">project</a></p>
  </div>
</section>

<section class="speech-row">
  <aside class="speech-year">
    2023
    <div class="speech-kicker">Multilingual speech translation</div>
  </aside>
  <div class="speech-body">
    <h2>SeamlessM4T</h2>
    <div class="speech-meta"><span class="speech-impact">new capability</span><span class="speech-tag">ASR</span><span class="speech-tag">TTS</span><span class="speech-tag">Speech-to-Speech</span></div>
    <p><strong>Proposed:</strong> A unified multilingual and multimodal translation system covering speech and text inputs and outputs.</p>
    <p><strong>Achievement:</strong> It connected ASR, speech translation, text translation, and TTS in one research system across many languages.</p>
    <p><strong>Why it matters:</strong> It marks the field's shift from isolated ASR/TTS modules toward integrated speech-to-speech communication systems.</p>
    <p class="speech-reflection"><strong>Why this emerged:</strong> SeamlessM4T reflects the pressure to stop treating ASR, translation, and TTS as separate products. Multilingual communication needs speech and text to move across modalities together, so the system design became unified.</p>
    <p class="speech-source"><a href="https://arxiv.org/abs/2308.11596">paper</a></p>
  </div>
</section>

<h2 id="speech-foundation" class="speech-era">Speech Foundation Models</h2>

<section class="speech-row">
  <aside class="speech-year">
    2024
    <div class="speech-kicker">Factorized zero-shot TTS</div>
  </aside>
  <div class="speech-body">
    <h2>NaturalSpeech 3</h2>
    <div class="speech-meta"><span class="speech-impact">optimize existing component</span><span class="speech-tag">TTS</span><span class="speech-tag">Diffusion</span><span class="speech-tag">Codec</span></div>
    <p><strong>Proposed:</strong> Factorize speech into content, prosody, timbre, and acoustic-detail subspaces, then generate them with diffusion models conditioned on a prompt.</p>
    <p><strong>Achievement:</strong> It pushed zero-shot TTS quality, similarity, prosody, and intelligibility by combining factorized codec representations with diffusion generation.</p>
    <p><strong>Why it matters:</strong> NaturalSpeech 3 is a clear example of modern TTS moving from monolithic acoustic prediction toward disentangled, controllable speech generation.</p>
    <p class="speech-reflection"><strong>Why this emerged:</strong> NaturalSpeech 3 reflects a modern TTS insight: quality and control improve when content, speaker, prosody, and acoustic detail are not tangled together. Its factorized design makes voice generation look less like one black box and more like coordinated controllable subspaces.</p>
    <p class="speech-source"><a href="https://arxiv.org/abs/2403.03100">paper</a></p>
  </div>
</section>

<section class="speech-row">
  <aside class="speech-year">
    2024
    <div class="speech-kicker">Audio instruction following</div>
  </aside>
  <div class="speech-body">
    <h2>Qwen2-Audio</h2>
    <div class="speech-meta"><span class="speech-impact">new capability</span><span class="speech-tag">ASR</span><span class="speech-tag">Audio LLM</span><span class="speech-tag">Instruction Following</span></div>
    <p><strong>Proposed:</strong> A large audio-language model that accepts audio inputs and follows natural language or voice instructions for analysis and conversation.</p>
    <p><strong>Achievement:</strong> It unified voice chat and audio analysis modes without relying on explicit mode-switching prompts.</p>
    <p><strong>Why it matters:</strong> Qwen2-Audio marks the shift from ASR as transcription alone toward models that directly understand and act on audio instructions.</p>
    <p class="speech-reflection"><strong>Why this emerged:</strong> Qwen2-Audio came from the realization that audio systems should not only transcribe, but also reason over sounds and spoken instructions. It moves ASR from a front-end conversion step toward direct audio understanding inside a general assistant.</p>
    <p class="speech-source"><a href="https://arxiv.org/abs/2407.10759">paper</a></p>
  </div>
</section>

<section class="speech-row">
  <aside class="speech-year">
    2024
    <div class="speech-kicker">Supervised speech tokens</div>
  </aside>
  <div class="speech-body">
    <h2>CosyVoice</h2>
    <div class="speech-meta"><span class="speech-impact">optimize existing component</span><span class="speech-tag">TTS</span><span class="speech-tag">Codec LM</span><span class="speech-tag">Zero-Shot</span></div>
    <p><strong>Proposed:</strong> Use supervised semantic speech tokens from a multilingual ASR encoder as the intermediate representation for large-language-model-based zero-shot TTS.</p>
    <p><strong>Achievement:</strong> CosyVoice combined a text-to-token language model with conditional flow matching for token-to-speech synthesis, improving content consistency and speaker similarity in multilingual voice cloning.</p>
    <p><strong>Why it matters:</strong> It made token quality a central design choice for codec-LM TTS, showing that speech tokens can carry explicit text-aligned semantics rather than only unsupervised acoustic structure.</p>
    <p class="speech-reflection"><strong>Why this emerged:</strong> Early codec-language-model TTS proved that discrete audio tokens could generate convincing speech, but content errors and weak text alignment remained painful. CosyVoice reflects the next step: make the token vocabulary itself more semantic so the generator has an easier path from text intent to speaker-conditioned audio.</p>
    <p class="speech-source"><a href="https://arxiv.org/abs/2407.05407">paper</a> <a href="https://funaudiollm.github.io/cosyvoice/">project</a></p>
  </div>
</section>

<section class="speech-row">
  <aside class="speech-year">
    2024
    <div class="speech-kicker">Full-duplex dialogue</div>
  </aside>
  <div class="speech-body">
    <h2>Moshi</h2>
    <div class="speech-meta"><span class="speech-impact">new capability</span><span class="speech-tag">Speech-to-Speech</span><span class="speech-tag">Full Duplex</span><span class="speech-tag">Codec LM</span></div>
    <p><strong>Proposed:</strong> A real-time speech-text foundation model that generates speech-to-speech dialogue with parallel streams for the user and the model.</p>
    <p><strong>Achievement:</strong> Moshi demonstrated low-latency full-duplex spoken interaction, including interruptions and overlapping conversational dynamics.</p>
    <p><strong>Why it matters:</strong> It made turn-taking, latency, and paralinguistic information central architecture questions rather than pipeline afterthoughts.</p>
    <p class="speech-reflection"><strong>Why this emerged:</strong> Moshi was motivated by the limits of cascaded voice assistants, where ASR, LLM, and TTS boundaries add latency and lose conversational timing. Full-duplex modeling treats overlap, interruption, and response timing as first-class speech behavior.</p>
    <p class="speech-source"><a href="https://arxiv.org/abs/2410.00037">paper</a></p>
  </div>
</section>

<section class="speech-row">
  <aside class="speech-year">
    2025
    <div class="speech-kicker">Streaming omni model</div>
  </aside>
  <div class="speech-body">
    <h2>Qwen2.5-Omni</h2>
    <div class="speech-meta"><span class="speech-impact">efficiency</span><span class="speech-tag">ASR</span><span class="speech-tag">TTS</span><span class="speech-tag">Thinker-Talker</span></div>
    <p><strong>Proposed:</strong> An end-to-end multimodal model that perceives text, images, audio, and video while generating text and natural speech responses in a streaming manner.</p>
    <p><strong>Achievement:</strong> It introduced the Thinker-Talker split, using a language model for text reasoning and a speech generator for audio-token output.</p>
    <p><strong>Why it matters:</strong> The architecture captures a practical pattern for speech agents: keep text reasoning inspectable while generating speech directly and incrementally.</p>
    <p class="speech-reflection"><strong>Why this emerged:</strong> Qwen2.5-Omni reflects a practical compromise for speech agents: keep a text reasoning core while adding a speech generator that can stream audio. That split makes multimodal conversation more efficient without abandoning inspectable language reasoning.</p>
    <p class="speech-source"><a href="https://arxiv.org/abs/2503.20215">paper</a></p>
  </div>
</section>

<section class="speech-row">
  <aside class="speech-year">
    2025
    <div class="speech-kicker">Open audio foundation model</div>
  </aside>
  <div class="speech-body">
    <h2>Kimi-Audio</h2>
    <div class="speech-meta"><span class="speech-impact">new capability</span><span class="speech-tag">Audio LLM</span><span class="speech-tag">Streaming</span><span class="speech-tag">Tokenizer</span></div>
    <p><strong>Proposed:</strong> An open-source audio foundation model for understanding, generation, and conversation, using a 12.5 Hz audio tokenizer and streaming detokenizer.</p>
    <p><strong>Achievement:</strong> It combined audio understanding, ASR, audio question answering, and speech conversation in one released model family.</p>
    <p><strong>Why it matters:</strong> Kimi-Audio shows the modern convergence of speech recognition, audio understanding, and speech generation around shared audio-token interfaces.</p>
    <p class="speech-reflection"><strong>Why this emerged:</strong> Kimi-Audio follows the trend of using shared audio tokens for recognition, understanding, and generation. Looking back, it is part of the move from specialized speech models toward audio foundation models with one interface for many tasks.</p>
    <p class="speech-source"><a href="https://arxiv.org/abs/2504.18425">paper</a></p>
  </div>
</section>

<section class="speech-row">
  <aside class="speech-year">
    2026
    <div class="speech-kicker">Long-context omni speech</div>
  </aside>
  <div class="speech-body">
    <h2>Qwen3.5-Omni</h2>
    <div class="speech-meta"><span class="speech-impact">new capability</span><span class="speech-tag">ASR</span><span class="speech-tag">TTS</span><span class="speech-tag">Omnimodal</span></div>
    <p><strong>Proposed:</strong> A large omnimodal model with long-context audio-visual understanding, multilingual speech generation, and a Thinker/Talker mixture-of-experts design.</p>
    <p><strong>Achievement:</strong> It reports broad audio and audio-visual benchmark coverage, long audio understanding, and improved streaming speech stability through dynamic text-speech unit alignment.</p>
    <p><strong>Why it matters:</strong> It represents the 2026 direction: speech is no longer a side channel, but one modality inside long-context, real-time, multimodal agents.</p>
    <p class="speech-reflection"><strong>Why this emerged:</strong> Qwen3.5-Omni points to speech as part of long-context multimodal agents rather than a separate add-on. The motivation is no longer only transcription or synthesis, but sustained audio-visual interaction with stable streaming speech output.</p>
    <p class="speech-source"><a href="https://arxiv.org/abs/2604.15804">paper</a></p>
  </div>
</section>

</div>

<p class="back-link"><a href="./">back</a></p>
