---
layout: default
title: "I Tried to Make Whisper Hear ‘Yanny.’ It Said ‘Yay.’"
description: "What a failed steering experiment taught me about reading representations, retraining models, and finding real internal controls."
image: https://kennethli319.github.io/assets/img/audio-jacobian-lens/city-beneath-transcript.jpg
permalink: /notes/audio-jacobian-lens/
---

[Back to Notes]({{ '/notes.html' | relative_url }})

<section class="version-gate" id="choose-version" aria-labelledby="note-title">
  <p class="version-eyebrow">One investigation · two ways in</p>
  <h1 id="note-title">I Tried to Make Whisper Hear “Yanny.” It Said “Yay.”</h1>
  <p class="version-intro">The failure became a more interesting question: can we distinguish a readable internal <strong>gauge</strong> from a reliable causal <strong>knob</strong>? Read the investigation as a shorter story or as the full methods-and-evidence report.</p>
  <nav class="version-chooser" aria-label="Choose a version of this note">
    <a class="version-choice version-choice--metaphor" href="#metaphorical-version">
      <strong>Enter the city beneath the transcript →</strong>
      <span>Follow the sound through acoustic neighborhoods, distributed constellations, fitted gauges, and one switch that did not behave as cleanly as I hoped.</span>
      <small>Story version · about 7 minutes</small>
    </a>
    <a class="version-choice version-choice--technical" href="#technical-version">
      <strong>Read the methods and evidence →</strong>
      <span>Frozen-model methodology, exact measurements, controls, fine-tuning comparison, limitations, and falsifiable next experiments.</span>
      <small>Scientific version · about 16 minutes</small>
    </a>
  </nav>
</section>

<article class="version-panel version-panel--metaphorical" id="metaphorical-version" tabindex="-1" aria-labelledby="metaphorical-title" markdown="1">

<a class="version-back" href="#choose-version">← Back to the two versions</a>

## The City Beneath the Transcript {#metaphorical-title}

<p class="version-deck">What a failed steering experiment taught me about reading a representation and controlling it · July 2026</p>

The unedited model heard the famous Laurel/Yanny recording and produced `Lily!`

I changed neither the audio nor the model's weights. Instead, I used a 20%-relative total residual-norm budget across an L1–L3 schedule in the recording's first half. At each site, I nudged the encoder toward the equal-weight mean of vocabulary tokens whose decoded strings begin with Y and away from the corresponding La-prefix family, then let the rest of Whisper recompute normally.

The result was `Yay!`

It never became `Yanny`.

The near-miss exposed the more useful question. Something I touched early in the model changed what appeared at the end—but I had not found a reliable semantic control. I had found a signal that propagated.

Was it merely a gauge, or was it the beginning of a knob?

That question became the organizing idea for this [Audio Jacobian Lens](https://github.com/kennethli319/audio-jacobian-lens) investigation.

<figure class="note-figure note-figure--illustration">
  <a href="{{ '/assets/img/audio-jacobian-lens/city-beneath-transcript.jpg' | relative_url }}">
    <img src="{{ '/assets/img/audio-jacobian-lens/city-beneath-transcript.jpg' | relative_url }}" alt="Editorial illustration of a glowing sound wave entering a city at night, branching through layered neighborhoods, forming a constellation, and emerging as illuminated tiles." loading="lazy" decoding="async">
  </a>
  <figcaption><strong>Metaphorical illustration.</strong> Sound enters the city, travels through many possible routes, forms a distributed constellation, and reaches the output board. This is explanatory artwork, not model output or experimental evidence.</figcaption>
</figure>

### A city at night

Imagine that a speech model is a city after dark.

Sound enters through the outer gates. At first it is not a sentence—only pressure changing over time. The signal moves through acoustic neighborhoods, crosses bridges into language, and eventually reaches a brightly lit departure board where words appear.

We can read the board. What we usually cannot see is how the city arrived there.

Did it recognize the destination early and spend the remaining time confirming the route? Did several destinations compete? What did the acoustic districts preserve before anything looked like a word?

During my linguistics degree, psycholinguistics taught me to approach hidden processes indirectly. Researchers used reaction time, priming, ambiguity, and mistakes to infer how language might be processed inside the brain.

With a local, instrumented open model, every activation can be recorded. Yet there are so many layers, positions, and interacting representations that access still does not become understanding. The activity does not arrive with its meaning attached. We still need comparisons, controls, and interventions.

The [Jacobian Lens](https://www.anthropic.com/research/global-workspace) offers one kind of map. It fits an approximate route from an intermediate state toward a later state that can be read through the model's vocabulary head. In rough terms, it asks:

> Under this fitted map, which vocabulary directions become readable from here?

Those vocabulary directions are not transcripts of thought. They are more like street names printed on a map. The traffic below them may represent acoustics, fragments of words, uncertainty, or combinations for which no single human label exists.

### Words arrive on different schedules

Whisper's decoder is the part of the city closest to the departure board. Here, some final words become readable surprisingly early.

In one example, `door` was already ranked fourth within the explorer's display vocabulary in the first decoder layer I inspected. One layer later, it was first.

Other words take a longer route. In “Where is my brother now?”, `now` did not become clearly readable until late. Earlier at the same output position, `who` appeared near the top.

It is tempting to say the model was “thinking of who.” The evidence does not support that claim. What the map shows is more modest and still interesting: lexical directions become readable on different schedules. Some later layers sharpen a direction that was already visible. In other cases, a different direction becomes readable only much closer to the output.

A displayed token is therefore a clue about geometry, not a quotation from an internal monologue.

### The acoustic districts use constellations, not street signs

The encoder was much harder to read.

Its states correspond to positions in an audio representation, before the decoder has committed to a sequence of words. Looking only at the highest vocabulary-aligned coordinate often produced strange lexical labels. That may be because asking for one token is like trying to identify an entire neighborhood from its nearest street sign.

My hypothesis became that the useful unit was not the brightest coordinate, but the pattern across many coordinates—a constellation.

The Phone Signature view keeps a distributed pattern across the top 100 vocabulary-aligned J-lens coordinates and compares it with 34 supervised, frozen ARPAbet phone prototypes. No single star supplies the label. The arrangement carries the evidence.

At Whisper encoder layer 2, a phone-prototype classifier using only the highest-ranked coordinate as a sparse signature produced about **63.5% phone macro-F1**. Using the distributed signature raised the result to roughly **80% across two transports fitted on non-overlapping examples and evaluated on the same speaker-held-out development set**.

The precise conclusion matters: more phone identity is *recoverable from the constellation* than from its brightest coordinate. That does not mean the encoder literally stores phone symbols.

Whisper itself remained frozen, but the instrument did not appear without supervision: the phone prototypes were fitted from **3,400 automatically aligned phone states in a prototype-training partition of LibriSpeech dev-clean** and frozen before evaluation. The reported measurements use aligned native 20 ms states; the public explorer pools them into overlapping 100 ms display cells for readability. Its labels are prototype similarities, not phoneme probabilities or validated phone boundaries.

That is why I call the result a Phone Signature rather than a phoneme prediction.

### Reading a model is different from retraining it

This distinction becomes clearer when comparing the project with [`ipa-whisper-base`](https://huggingface.co/neurlang/ipa-whisper-base).

That checkpoint was produced by fine-tuning Whisper Base on 15,000 Common Voice recordings paired with synthetic IPA transcriptions. It asks an engineering question:

> Can Whisper be trained to produce IPA?

Audio Jacobian Lens asks a different question:

> Is phone-related structure already recoverable inside the original frozen model, where does it become readable, and can an intervention show that the structure matters?

IPA Whisper does not necessarily replace the architecture or install a special phoneme head. It reuses Whisper's byte-level vocabulary to spell IPA. Its output loss could update whichever encoder, decoder, and output-projection parameters were left unfrozen; the published checkpoint does not document a head-only or frozen-encoder experiment.

In the city metaphor, fine-tuning remodels the city so its departure board prints a new kind of answer. J-lens leaves the city intact and installs measurement equipment along its existing roads.

Successful fine-tuning demonstrates **adaptability**: the model can learn the new behavior.

A successful fitted readout demonstrates **decodability**: information associated with the target can be recovered from a frozen state.

Neither result alone demonstrates that the original model naturally uses that representation in the way we imagine. For that, the map must predict what happens when we touch the system.

### A gauge is not automatically a knob

The Phone Signature view is a gauge. It measures a relationship between an internal state and fitted phone prototypes.

The Laurel/Yanny edit was a first propagation test, not yet a causal intervention on the fitted phone prototypes. It used a broad Y-prefix vocabulary direction as a candidate knob.

Applying that L1–L3 Y*-versus-La* schedule changed `Lily!` into `Yay!`, so the intervention propagated through the unchanged remainder of the model. But it did not produce `Yanny`, and the direction was not selective enough to deserve a semantic label.

A real knob would need to work repeatedly across speakers and contexts. It would need to outperform matched-norm random directions, avoid unrelated damage, and change the intended behavior more than off-target behaviors. Its effect should be predicted before the intervention—not explained after seeing the result.

The same boundary appears in one recorded Chatterbox TTS replay. A small late-layer edit changed one winning acoustic code and 43 codes that followed it. In that replay, the edit propagated downstream. It does not prove that the selected code has a particular word or phone meaning or that the effect generalizes.

This is the difference between drawing a beautiful map and building an instrument that can guide an experiment.

### Why finding the city's controls might matter

Fine-tuning remains the stronger engineering approach when the goal is reliable production of a new output such as IPA. Audio Jacobian Lens is aimed at another possibility.

A broadly trained model may already contain representations associated with phonetic distinctions, ambiguity, lexical competition, speaking style, or pronunciation—even when its normal output does not expose them directly.

If we can locate those representations, test them across contexts, and intervene without changing the weights, we may sometimes adapt behavior with much less task supervision than end-to-end retraining.

That is still a hypothesis. It will work only when the relevant information already exists, when the readout generalizes, and when moving the state does not push the model into an unnatural region.

Psycholinguistics may offer useful experimental templates here. Priming, ambiguity, adaptation, and phonetic competition were designed to turn hidden processes into falsifiable predictions. In an artificial model, we can go one step further: rerun the same process, perturb a suspected representation, and see whether the rest of the computation responds as predicted.

<div class="metaphor-key"><strong>Where the metaphor stops:</strong> this is not mind-reading, and the city has no claim to consciousness. A token is not a thought. A prototype match is not a phoneme probability. A readable direction is a gauge, not yet a knob. The interpretation becomes stronger only when it generalizes and survives controlled causal tests.</div>

Fine-tuning asks what we can teach a model to say.

The Audio Jacobian Lens asks what the original computation already makes recoverable about sound, where that information becomes readable, and what would count as proof that touching it matters.

A map that merely labels the city is interesting. A map that predicts how one small intervention will change the final route is the beginning of an instrument.

This is still map-making under uncertainty. But unlike the hidden city of the human brain, this is a city we can rerun, compare, and—carefully—touch.

<div class="version-panel-nav">
  <a href="#technical-version">Continue with the methods and evidence →</a>
  <a href="https://kennethli319.github.io/audio-jacobian-lens/?sample=asr-question">Explore the live ASR map</a>
  <a href="#choose-version">Back to the two versions</a>
</div>

</article>

<article class="version-panel version-panel--technical" id="technical-version" tabindex="-1" aria-labelledby="technical-title" markdown="1">

<a class="version-back" href="#choose-version">← Back to the two versions</a>

## Methods and evidence: from readable gauges to tested knobs {#technical-title}

*July 2026 · Psycholinguistics, mechanistic interpretability, and speech models*

I tried to make Whisper hear `Yanny`.

The unedited model transcribed the ambiguous recording as `Lily!` After I edited a schedule of encoder residual sites across L1–L3 and allowed the unchanged remainder of the model to recompute, it produced `Yay!`

It never said `Yanny`.

That near-miss captures the central problem of this project. Finding an internal signal that correlates with a concept is not the same as finding a reliable control for that concept. A readable signal is a **gauge**. Only a selective, repeatable intervention that survives controls begins to establish that it is a **knob**.

The [Audio Jacobian Lens](https://github.com/kennethli319/audio-jacobian-lens) is an attempt to build those gauges, test candidate knobs, and keep the difference between them visible.

It grew from a question I learned to ask through psycholinguistics: when the process itself is difficult to interpret, what combination of contrasts, errors, timing effects, and interventions would make one explanation more credible than another?

With a local, instrumented model we can record internal states, but access is still not understanding. The volume of activation across layers, positions, and interacting representations exceeds what a person can interpret directly. An activation map does not arrive with its meaning attached.

Unlike human neuroimaging, however, we can rerun the exact computation and perturb one internal state.

That makes a progression of claims possible:

1. **Readable:** information is statistically recoverable from an internal state.
2. **Transportable:** it remains readable through a fitted approximation of the model's downstream geometry.
3. **Causally relevant:** perturbing the state changes later computation in a predicted direction.
4. **Controllable:** the intervention is selective, repeatable, robust across contexts, and does not broadly damage the model.

The current project has preliminary controlled evidence for the first two levels, early propagation evidence for the third, and no claim yet to the fourth.

## The model is frozen; the instrument is fitted

Anthropic's [Jacobian Lens, or J-lens](https://www.anthropic.com/research/global-workspace), uses a context-averaged first-order transport from an intermediate residual state toward a later residual space. The transported state can then be read through the model's existing vocabulary head.

The decoder view in this project is the closest paper-style, same-stream adaptation. The phone results use a separately fitted, generally rectangular **encoder-to-decoder cross-modal transport**: an extension developed in this repository, not a configuration validated by the source paper. That distinction matters because the encoder and decoder do not share positions or a natural residual-space origin.

In simplified terms, it asks:

> Under this fitted first-order approximation, which vocabulary directions become readable from an intermediate state?

The resulting values are not calibrated next-token probabilities, literal transcripts of thought, or direct proof of downstream causation. They are readout scores under a fitted, context-averaged Jacobian transport.

I adapted the method to speech systems, beginning with a frozen `openai/whisper-tiny.en` and later adding experimental paths for LFM2.5 Audio on Apple-silicon MLX and Chatterbox TTS.

An important distinction runs through every result:

- Whisper's original encoder, decoder, tokenizer, and output head remain frozen.
- The J-lens transport is a fitted external measurement instrument.
- The Phone Signature prototypes are fitted externally using aligned speech supervision.
- Residual steering changes an activation during one inference run, not the model's stored weights.

The instrument therefore did not emerge without data. It was fitted so that I could test what is recoverable from the original frozen model. That differs from retraining the model to perform a new output task.

### How the phone instrument was constructed

Two encoder transports were fitted separately on disjoint 20-clip, five-speaker sets. They share the same Whisper model and are evaluated on the same development rows, so this is replication across disjoint lens fits—not independent-corpus replication.

For each aligned encoder state, the fitted transport produces target-mean-relative readout scores across Whisper Tiny's full **51,864-token vocabulary**. The signature keeps the top 100 coordinates, thresholds them relative to the next rank, and normalizes the remaining distributed pattern.

Phone prototypes were then fitted from **3,400 non-silence midpoint states in a prototype-training partition of LibriSpeech dev-clean** covering 34 stress-collapsed ARPAbet classes. A separate 3,400-state development partition uses disjoint speakers. The boundaries come from automatic MFA alignment rather than hand-corrected phonetic annotation, and the locked test speakers remain untouched.

The public explorer uses the A2 transport because its ten cached clips share speaker 1272, who was excluded from that lens fit. The public examples demonstrate the instrument; they are not population-level evaluation.

## Evidence I: decoder decisions form on different schedules

Some realized words become readable surprisingly early.

In one held-out Whisper example, the realized token `door` moved from rank **#4** within the explorer's display vocabulary in the first decoder layer I inspected to **#1** one layer later.

But that is not the story for every word. In the utterance “Where is my brother now?”, the realized token `now` moved through the full vocabulary as follows:

```text
#6,319 → #7,237 → #3 → output-head #1
```

At the early decoder position after `my brother`, the word `who` appeared near the top, although Whisper ultimately emitted `now`.

<figure class="note-figure">
  <a href="{{ '/assets/img/audio-jacobian-lens/decoder-timing-now.png' | relative_url }}">
    <img src="{{ '/assets/img/audio-jacobian-lens/decoder-timing-now.png' | relative_url }}" alt="Whisper decoder layer-by-position matrix for Where is my brother now, with now selected. Who is the top early-layer candidate before now becomes top-ranked later." loading="lazy" decoding="async">
  </a>
  <figcaption><strong>Figure 1.</strong> The public explorer makes the schedule visible: at the position where Whisper eventually emits <code>now</code>, <code>who</code> is the early top candidate before <code>now</code> resolves in later layers. The screenshot uses the explorer's display vocabulary; the full-vocabulary ranks reported above are #6,319 → #7,237 → #3 → #1. <a href="https://kennethli319.github.io/audio-jacobian-lens/?sample=asr-question">Open the interactive report</a>.</figcaption>
</figure>

**Observed:** lexical readability varies sharply by token and depth.

**Suggests:** some output directions are sharpened from an early candidate, while others become readable only in later decoder layers.

**Would establish more:** replication across a larger held-out corpus, controls for token frequency and position, and interventions that selectively alter the predicted lexical competition.

The resemblance to psycholinguistic word-association experiments is useful for generating hypotheses. It is not evidence that Whisper and humans implement the same mechanism, or that the model was literally “thinking of who.”

## Evidence II: encoder information is distributed

The ordinary encoder-to-decoder view initially looked disappointing. A single emitted word was often ranked poorly, and silence could sometimes appear spuriously readable.

That failure suggested that one BPE token might be the wrong unit of analysis.

Whisper's encoder is not yet selecting the next written word. It is building a continuous acoustic representation. A vocabulary coordinate can still provide a human-readable axis, but the meaningful structure may live in a combination of coordinates rather than in the highest-ranked token.

The experimental **Phone Signature view** therefore takes the distributed pattern across the top 100 vocabulary-aligned J-lens coordinates and compares it with 34 frozen ARPAbet phone prototypes.

The preliminary speaker-disjoint development results separate two related measurements:

- A supervised residual-state readout rises from **31.9% macro-F1 for central log-Mel features** to **91.0% at encoder L3**.
- At L2, a frozen phone-prototype classifier applied to a rank-1-only sparse J-signature gives **63.5% and 63.6% phone macro-F1** across the two lens fits.
- The distributed top-100 J-signature raises this to **81.1% and 80.5%**.
- On 1,155 strict unseen-word occurrences, the result remains **79.8% and 79.6%**.
- In 330 matched cross-speaker, cross-word ABX triplets, L2 reaches **91.5% and 91.4%**, versus **76.2% and 76.6%** means from five spectrum-matched random transports. L3 reaches **90.8% and 90.2%**, versus **67.1% and 68.3%**.

The random transports are not chance baselines: high-dimensional linear maps can preserve substantial information. The relevant comparison is the fitted transport's advantage over alternatives with matched singular spectra.

Even coordinates ranked 51–100 retain substantial phone information. More phone identity is therefore recoverable from the distributed constellation than from its brightest coordinate alone.

The residual-state result and the J-signature result should not be conflated. The first asks whether phone identity is decodable from the encoder at all. The second asks how much of that structure remains readable after expressing the state through the fitted downstream vocabulary geometry.

The public explorer uses phoneme-scale **100 ms display cells**. Each cell mean-pools five native 20 ms encoder states, and the 80 ms hop means adjacent cells share one state. A cell may contain multiple phones, and Whisper's bidirectional receptive field is not restricted to those 100 ms.

The reported validation metrics come from aligned **native 20 ms midpoint states**, not the pooled public cells. The ten public examples use one speaker held out from the A2 lens fit; they are not a broad evaluation set or a separately validated 100 ms phone classifier.

<figure class="note-figure">
  <a href="{{ '/assets/img/audio-jacobian-lens/phone-signature-view.png' | relative_url }}">
    <img src="{{ '/assets/img/audio-jacobian-lens/phone-signature-view.png' | relative_url }}" alt="Audio Jacobian Lens Phone Signature view for the buzzer example using 100 millisecond display cells. Encoder L3 from 0.56 to 0.66 seconds is selected, with B as the nearest prototype at cosine similarity 0.565." loading="lazy" decoding="async">
  </a>
  <figcaption><strong>Figure 2.</strong> A time-ordered Phone Signature using 100 ms display cells with an 80 ms hop. In the selected encoder-L3 window (0.56–0.66 s), <code>B</code> is the nearest frozen ARPAbet prototype (cosine 0.565; margin 0.479 over <code>AW</code>). Each cell comes from a distributed top-100 J-signature. These are similarities—not probabilities, framewise votes, phone boundaries, local-only receptive fields, or causal labels. <a href="https://kennethli319.github.io/audio-jacobian-lens/?sample=asr-buzzer">Open the interactive report and switch on Phone Signature view</a>.</figcaption>
</figure>

**Observed:** distributed J-signatures classify aligned phones substantially better than rank-1-only sparse signatures, generalize to unseen words, and outperform matched-spectrum random transports.

**Suggests:** phonetic structure is recoverable through a distributed pattern in the frozen model's vocabulary-aligned readout geometry.

**Does not establish:** that Whisper stores literal phone symbols, that the displayed label is a probability, that one public cell marks a phone boundary, or that Whisper's decoder naturally uses exactly the fitted prototype representation.

**Would establish more:** replication on the locked test, additional speakers and languages, phone-contrast interventions, and controls showing that the effect cannot be explained by speaker, word, timing, or phonotactic regularities.

## Evidence III: intervention changes what follows

A fitted readout is a gauge, not automatically a knob. To test whether it identifies a causally relevant direction, I performed residual steering on the ambiguous Laurel/Yanny recording.

Instead of increasing `Yanny` at the final output head, I used a separate vocabulary-direction intervention—not the fitted phone prototypes. The canonical encoder run applied a coordinated edit across L1–L3 over the first half of the recording. Its 20%-relative total residual-norm budget was normalized across those layers; at each site, the direction contrasted the equal-weight mean of the Y-prefix vocabulary family against the La-prefix family. The unchanged later layers then recomputed normally.

The free decode moved from `Lily!` to `Yay!`, and Y-related downstream scores increased. The model never produced `Yanny`.

**Observed:** this early multi-site residual schedule propagated into a related final output.

**Suggests:** the selected sites and vocabulary-family direction can influence downstream computation.

**Does not establish:** a clean internal `Yanny` representation, phone-specific control, or reliable semantic steering. The displayed conditions include only one matched random seed each, and a broad Y-prefix direction can affect many lexical possibilities or push the activation off its learned distribution.

**Would establish a knob:** consistent target changes across recordings and contexts, dose-response behavior, reversibility, specificity against nearby alternatives, and superiority over random-direction, matched-norm, off-time, off-layer, and unrelated-prefix controls.

A useful map should predict interventions. But one propagated edit—even an interesting one—is not yet a stable control surface.

## Evidence IV: the framework extends beyond text transcription

In one recorded Chatterbox TTS replay, the realized acoustic-code direction becomes progressively more readable through depth. A small late-layer residual intervention flipped a selected acoustic-code winner and regenerated a different autoregressive suffix.

<figure class="note-figure">
  <a href="{{ '/assets/img/audio-jacobian-lens/tts-residual-steering.png' | relative_url }}">
    <img src="{{ '/assets/img/audio-jacobian-lens/tts-residual-steering.png' | relative_url }}" alt="Recorded Chatterbox TTS causal replay showing a small L20 plus L22 residual edit changing the actual speech-head winner from acoustic code 4106 to 4358 and changing 43 downstream codes." loading="lazy" decoding="async">
  </a>
  <figcaption><strong>Figure 3.</strong> A recorded Chatterbox causal replay. A 0.002×-relative-norm edit at L20 + L22 changes the speech-head winner from acoustic code 4106 to 4358, followed by 43 changed downstream codes. This demonstrates propagation through the autoregressive suffix; it does not give acoustic-code IDs word or phone meaning, or establish waveform attribution. <a href="https://kennethli319.github.io/audio-jacobian-lens/tts/?sample=tts-bridge-s9">Open the interactive TTS report</a>.</figcaption>
</figure>

An acoustic-code ID is not a word or phone, and changing later codes does not by itself provide end-to-end waveform attribution.

The Apple-silicon MLX path for LFM2.5 Audio also runs end to end across its language backbone. Its current lens remains a one-clip integration pilot, however, rather than a validated scientific result. It does not yet explain the audio encoder, adapter, acoustic codebooks, or generated waveform.

These boundaries are part of the result. A common interface can expose related measurements across ASR, speech-to-speech, and TTS, while the scientific meaning of each measurement remains model-specific.

## Reading a model is different from retraining it

A checkpoint such as [`ipa-whisper-base`](https://huggingface.co/neurlang/ipa-whisper-base) asks a different question: can Whisper be fine-tuned to emit a phonetic transcription?

Its model card describes a Whisper Base checkpoint fine-tuned using synthetic IPA targets derived from 15,000 Common Voice 21 recordings spanning more than 70 languages. Whisper's existing byte-level vocabulary can spell IPA, so this does not require a clean one-phone-per-token output head.

The published material does not document a head-only or frozen-encoder ablation. We should therefore not assume that only the LM head changed. Output supervision could update whichever encoder, decoder, and output-projection parameters were left unfrozen.

The contrast is:

- **IPA fine-tuning:** change model weights so phonetic spelling becomes an observable behavior.
- **Audio J-Lens:** keep the original model weights frozen, fit an external instrument, and test whether phone-related structure is already recoverable from the existing computation.
- **Residual intervention:** temporarily alter one or more activations and test whether the unchanged remainder of the model responds as predicted.

Fine-tuning demonstrates **adaptability**: the model can be taught the task.

A fitted readout demonstrates **decodability**: information associated with the task can be recovered from a frozen state.

A controlled intervention begins to test **functional use**: changing that state changes behavior in a specific predicted way.

These are complementary experiments, not competitors. An IPA-fine-tuned model could serve as a useful positive control. Comparing ordinary Whisper, an encoder-frozen IPA fine-tune, and an end-to-end IPA fine-tune could help separate information already present in the original encoder from information made more explicit or newly organized through training.

The comparison is conceptual rather than an accuracy benchmark. The IPA model card does not report a usable phonetic error rate, and its displayed WER entries are placeholders, so I do not treat the checkpoint as phonetic ground truth.

## The next reconstruction test

The experiment I most want to run next is deliberately behavioral:

1. Hide the audio and transcript.
2. Provide only the time-ordered Phone Signature candidates and similarity scores from encoder L2 or L3.
3. Run two separate reconstruction arms: one with phoneticians and one with a language model, then compare their characteristically different priors.

Success would show that the visualization preserves temporally organized information another system can integrate into lexical hypotheses. It would not prove that Whisper's own decoder uses the same route: a human or language model could exploit English phonotactics and prior knowledge.

The experiment therefore needs controls:

- top-1 phone labels versus the full similarity vector derived from the distributed top-100 J-signature;
- L2 versus L3;
- real temporal order versus shuffled windows;
- phone-frequency-matched but sequence-disrupted controls;
- the fitted J-lens versus spectrum-matched random transports;
- a human-corrected phonetic transcription as an upper bound, if available, or an automatic alignment clearly labeled as a noisy reference;
- a text-only phonotactic baseline with no acoustic evidence;
- unseen speakers, words, and recording conditions; and
- both phone-error and word-error recovery.

**If real ordered signatures beat all matched controls:** the display preserves useful temporal phonetic structure.

**If only the independent phone upper bound reconstructs well:** the fitted view is losing important sequence information.

**If shuffled or text-only controls perform similarly:** reconstruction is driven largely by language priors rather than by the encoder measurement.

This is the kind of experiment that can turn an attractive visualization into a falsifiable instrument.

## What would change my mind

My current hypothesis is that Whisper's vocabulary can serve as a borrowed coordinate system: individual coordinates inherit human-readable token labels, while combinations of coordinates may describe acoustic or subword states with no single token name.

The Phone Signature results support the possibility that distributed patterns carry more stable phonetic structure than the highest coordinate alone.

I would weaken or reject that interpretation if:

- performance collapses on the untouched test or on broader speaker and language populations;
- matched random or shuffled controls recover the same information;
- the effect is explained primarily by speaker, word identity, timing, or dataset leakage;
- independently fitted lenses do not reproduce the geometry;
- phone-directed interventions fail to produce contrast-specific downstream effects; or
- matched-norm random interventions work equally well.

I would strengthen it if frozen-model measurements replicate across datasets, predict selective causal interventions, and remain stable across speakers, contexts, and independently fitted instruments.

## What I am—and am not—claiming

This is not mind-reading.

I am not claiming that speech models are conscious, that they contain literal phone symbols, that every displayed token is an internal concept, or that the current steering system has found dependable semantic controls.

The strongest current claim is narrower:

> In this speaker-disjoint LibriSpeech dev-clean development experiment, phone identity is recoverable from frozen Whisper encoder states, and substantially more of it remains readable through a distributed fitted J-signature than through a rank-1-only sparse signature.

The steering results add evidence that some early interventions propagate. They do not yet show that the fitted phone prototypes identify the model's own causal code.

A token on a screen is not a thought. A prototype match is not a phoneme, and a readable direction is not yet a knob. But a map that predicts where an intervention will selectively change behavior would be more than a picture: it would be the beginning of an instrument.

Fine-tuning asks what we can teach a model to say. The Audio Jacobian Lens asks what the original computation already makes recoverable about sound, where that information becomes readable, and what would count as proof that touching it matters.

## Explore the project

- [ASR / Whisper explorer](https://kennethli319.github.io/audio-jacobian-lens/?sample=asr-question)
- [Speech-to-speech / LFM2.5 Audio explorer](https://kennethli319.github.io/audio-jacobian-lens/speech/?sample=speech-question)
- [TTS / Chatterbox explorer](https://kennethli319.github.io/audio-jacobian-lens/tts/?sample=tts-bridge-s9)
- [Audio Jacobian Lens code and local Apple-silicon MLX setup](https://github.com/kennethli319/audio-jacobian-lens)
- [Anthropic's original Global Workspace research](https://www.anthropic.com/research/global-workspace)
- [`ipa-whisper-base` model card](https://huggingface.co/neurlang/ipa-whisper-base)

If you work in speech, interpretability, phonetics, or cognitive science: **what experiment would convince you that an internal direction reflects real acoustic structure, rather than merely a readable projection?**

<div class="version-panel-nav">
  <a href="#metaphorical-version">Read the metaphorical map</a>
  <a href="#choose-version">Back to the two versions</a>
</div>

</article>
