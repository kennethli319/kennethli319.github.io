---
layout: default
title: "Listening Inside a Speech Model with the Audio Jacobian Lens"
description: "One speech-interpretability project in two forms: a metaphorical story and a scientific report on J-lens readouts, phone signatures, and steering."
image: https://kennethli319.github.io/assets/img/audio-jacobian-lens/city-beneath-transcript.jpg
permalink: /notes/audio-jacobian-lens/
---

[Back to Notes]({{ '/notes.html' | relative_url }})

<section class="version-gate" id="choose-version" aria-labelledby="note-title">
  <p class="version-eyebrow">One investigation · two ways in</p>
  <h1 id="note-title">Listening Inside a Speech Model with the Audio Jacobian Lens</h1>
  <p class="version-intro">Read the same project as a shorter metaphorical story or as the complete scientific and technical report. The evidence and boundaries are the same; only the map changes.</p>
  <nav class="version-chooser" aria-label="Choose a version of this note">
    <a class="version-choice version-choice--metaphor" href="#metaphorical-version">
      <strong>Follow the metaphorical map →</strong>
      <span>Enter a city beneath the transcript, where acoustic constellations become words and internal switches can be tested.</span>
      <small>Story version · about 5 minutes</small>
    </a>
    <a class="version-choice version-choice--technical" href="#technical-version">
      <strong>Read the technical report →</strong>
      <span>Methods, measurements, screenshots, controls, limitations, and the experiments I want to run next.</span>
      <small>Scientific version · about 14 minutes</small>
    </a>
  </nav>
</section>

<article class="version-panel version-panel--metaphorical" id="metaphorical-version" tabindex="-1" aria-labelledby="metaphorical-title" markdown="1">

<a class="version-back" href="#choose-version">← Back to the two maps</a>

## The City Beneath the Transcript {#metaphorical-title}

<p class="version-deck">A metaphorical map of the same Audio Jacobian Lens experiments · July 2026</p>

<figure class="note-figure note-figure--illustration">
  <a href="{{ '/assets/img/audio-jacobian-lens/city-beneath-transcript.jpg' | relative_url }}">
    <img src="{{ '/assets/img/audio-jacobian-lens/city-beneath-transcript.jpg' | relative_url }}" alt="Editorial illustration of a glowing sound wave entering a city at night, branching through layered neighborhoods, forming a constellation, and emerging as illuminated tiles." loading="lazy" decoding="async">
  </a>
  <figcaption><strong>Metaphorical illustration.</strong> Sound enters the city, travels through many possible routes, forms a distributed constellation, and reaches the output board. This is explanatory artwork, not model output or experimental evidence.</figcaption>
</figure>

Imagine that a speech model is a city at night.

A sound enters through the outer gates. At first, it is not a sentence---only pressure changing over time. The signal travels through several neighborhoods, changing form at every stop, until words appear on a brightly lit departure board.

We can see the words on that board. What we usually cannot see is how the city arrived at them.

Did it recognize the destination early and spend the remaining time confirming the route? Did several words compete? What did the acoustic districts preserve before anything looked like language?

During my linguistics degree, psycholinguistics taught me to study questions like these indirectly. Researchers could not inspect every neuron involved in language processing, so they used reaction time, priming, ambiguity, and mistakes to infer the hidden route.

Modern neural models seem to give us the opposite problem. Every activation is available, but the city is so large that access still does not automatically become understanding.

It can still feel like EEG or MEG: we see activation, but its meaning does not arrive with it. We need comparisons, controls, and interventions.

The [Audio Jacobian Lens](https://github.com/kennethli319/audio-jacobian-lens) is my attempt to draw a more useful map.

It adapts [Anthropic's Jacobian Lens](https://www.anthropic.com/research/global-workspace) to speech models. It asks, approximately: which vocabulary directions become readable from an intermediate state under a fitted map?

This is not a window into the model's thoughts. It is a familiar coordinate grid laid over unfamiliar terrain. The street names come from the model's vocabulary, but the activity beneath them may represent acoustics, fragments of words, uncertainty, or combinations with no single human label.

### Different destinations form on different schedules

In Whisper's decoder, some final words become visible surprisingly early. In one example, `door` was already ranked fourth within the explorer's display vocabulary in the first decoder layer I inspected and moved to first in the next. Other words take a longer route. In “Where is my brother now?”, `now` appeared late; earlier, `who` was near the top.

It is tempting to say the model was “thinking of who.” The evidence does not justify that. What it shows is simpler: lexical directions become readable on different schedules. The resemblance to word-association experiments gives us a hypothesis to test, not proof of a human-like mechanism.

### The acoustic city has constellations, not street signs

The encoder was harder to read. Looking for one highest-ranked word often produced a poor map, perhaps because an acoustic encoder is not yet choosing words. That is like identifying a whole neighborhood from its nearest street sign.

The Phone Signature view instead compares a distributed pattern across 100 vocabulary-aligned coordinates with frozen phone prototypes. The result is closer to a constellation than a label: no single star gives the answer, but the arrangement carries information.

On held-out speakers, the single brightest coordinate carried some phone information, but the distributed constellation carried much more: about **63.5% versus roughly 80% phone macro-F1**. The result held across two separately fitted maps and remained near 80% on strict unseen-word examples.

The model itself stayed frozen, although the map and phone prototypes were fitted with supervised examples. The public explorer groups native 20 ms states into overlapping, phoneme-scale 100 ms windows so the route is easier to see. Those windows are not predicted phone boundaries, and their labels are similarities rather than probabilities.

The conclusion is modest but useful: more phone identity is recoverable from the constellation than from its brightest coordinate. It does not mean that the encoder literally stores phone symbols.

That suggests a simple next test: hide the audio and transcript, show only the time-ordered Phone Signature sequence, and ask a phonetician or language model to reconstruct the words. Success would suggest that the map preserves a route, not just isolated landmarks.

### What happens if we touch a switch?

A map becomes more informative when it guides an intervention. With the ambiguous Laurel/Yanny recording, the unedited model produced `Lily!` I nudged earlier encoder states toward a broad Y-prefix vocabulary direction and then let the rest of the model recompute.

The free decode changed to `Yay!`

It never became `Yanny`.

That near-miss is the point. The edit propagated, but propagation is not the same as semantic control. A gauge tells us where a pattern is readable; a reliable knob must change the intended behavior repeatedly and selectively. This steering direction was separate from the fitted Phone Signature prototypes, so the result does not validate the phone map.

In one recorded Chatterbox TTS replay, a small late-layer edit also changed an acoustic-code winner and what followed it. Again, that shows propagation, not that a code has a proven word or phone meaning.

### Why this map might matter

Psycholinguistics already gives us experiments for priming, ambiguity, phonetic competition, and adaptation. If we can locate related patterns inside a model and test them causally, those experiments may help us find useful internal controls.

Fine-tuning remodels the city to produce a new behavior. This lens instead leaves the original city frozen and asks what its existing roads already make readable—and whether a small intervention changes the route as predicted.

The longer-term possibility is not to eliminate data or training. It is to train a broad model, then locate a stable representation and adapt some behaviors without retraining the whole system for every deployment. That will work only when the representation already exists, stays stable across contexts, and can be moved without damaging the model.

It changes the question from “What more must we teach?” to “What has the model already learned, where is it, and which switch lets us test that interpretation?”

<div class="metaphor-key"><strong>Where the metaphor stops:</strong> this is not mind-reading, and the city has no claim to consciousness. A token is not a thought. A prototype match is not a phoneme probability. A readable direction is a gauge, not yet a knob. The interpretation becomes stronger only when it generalizes and survives controlled causal tests.</div>

This is map-making under uncertainty. Unlike the hidden city of the human brain, this is a city we can rerun, compare, and---carefully---touch.

<div class="version-panel-nav">
  <a href="#technical-version">Continue with the technical report →</a>
  <a href="https://kennethli319.github.io/audio-jacobian-lens/?sample=asr-question">Explore the live ASR map</a>
  <a href="#choose-version">Back to the two maps</a>
</div>

</article>

<article class="version-panel version-panel--technical" id="technical-version" tabindex="-1" aria-labelledby="technical-title" markdown="1">

<a class="version-back" href="#choose-version">← Back to the two maps</a>

## Scientific and technical report {#technical-title}

*July 2026 · Psycholinguistics, mechanistic interpretability, and speech models*

I often think back to the psycholinguistic experiments I learned to design during my linguistics degree.

We wanted to understand how human language processing worked somewhere inside the brain, but we could not inspect the activation of every neuron. Researchers instead designed experiments around reaction time, priming, ambiguity, errors, and carefully controlled contrasts. We observed behavior and worked backward toward a possible processing mechanism.

The evidence was often indirect and sometimes underdetermined. But those constraints trained a particular kind of thinking: how do we extract the maximum information from limited observations without pretending that a promising hypothesis is already a fact?

I miss that kind of puzzle-solving.

At first, studying neural language models seems completely different. We can inspect their architecture, activations, logits, attention patterns, and query/key/value matrices directly.

**Yet access is not understanding.**

Modern models produce so much information across layers, positions, and interacting representations that following everything back to a human-language explanation quickly exceeds what any researcher can hold in working memory.

Paradoxically, this can feel less like reading ordinary software and more like doing EEG or MEG on an artificial language system. We can see activation patterns changing, but activation does not arrive with its meaning attached. We still need contrasts, decoding analyses, controls, and interventions to infer what a pattern represents.

The important difference is that, with a model, we can rerun the exact system and directly perturb an internal state.

That is where the Jacobian Lens became useful.

## A vocabulary-indexed measurement instrument

Anthropic's [Jacobian Lens, or J-lens](https://www.anthropic.com/research/global-workspace), fits a context-averaged first-order transport from an intermediate residual state toward a later residual space. The transported state can then be read through the model's vocabulary head.

In simplified terms, it asks:

> Under this fitted map, which vocabulary directions become readable from here?

It is not a literal transcript of thought, and its scores are not calibrated next-token probabilities or direct proof of causation. They are measurements made through a fitted approximation.

I adapted the method to speech systems in [Audio Jacobian Lens](https://github.com/kennethli319/audio-jacobian-lens), beginning with Whisper ASR and later adding experimental paths for LFM2.5 Audio on Apple-silicon MLX and Chatterbox TTS. The encoder-to-decoder transport used for the Phone Signature is an extension developed in this repository, not a configuration validated by Anthropic's source paper.

Throughout these experiments, Whisper's original weights stay frozen. The J-lens map is fitted externally, the phone prototypes are fitted from automatically aligned speech supervision, and residual steering changes an activation during one inference run rather than changing the stored weights. In other words, the model is frozen, but the instrument is learned.

Two encoder transports were fitted separately on non-overlapping examples and evaluated on the same speaker-held-out development set. This is a useful consistency check across separately fitted maps, not an independent-corpus replication.

The results below first cover what the experiments show, then return to the hypotheses they make possible.

## Part I: What the project shows today

### Decoder decisions form on different schedules

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

The resemblance to psycholinguistic word-association experiments is useful for generating hypotheses. It is not evidence that Whisper and humans implement the same mechanism, or that the model was literally “thinking of who.” The safer conclusion is that lexical readability varies sharply by token and depth: some output directions are sharpened from an early candidate, while others become readable only later.

### The Phone Signature view gets closer to encoder-native information

The ordinary encoder-to-decoder view initially looked disappointing. A single emitted word was often ranked poorly, and silence could sometimes appear spuriously readable.

That failure suggested that one BPE token might be the wrong unit of analysis.

Whisper's encoder is not yet selecting the next written word. It is building a continuous acoustic representation. A vocabulary coordinate can still provide a human-readable axis, but the meaningful structure may live in a combination of coordinates rather than in the highest-ranked token.

The experimental **Phone Signature view** therefore takes the distributed pattern across the top 100 vocabulary-aligned J-lens coordinates and compares it with 34 frozen ARPAbet phone prototypes.

The preliminary speaker-held-out development results tell a consistent story:

- Phone information decoded directly from the encoder residual states rises to about **91% macro-F1 at L3**.
- At L2, using only the highest J-lens coordinate gives about **63.5% phone macro-F1**.
- Using the distributed top-100 signature raises this to about **81% across two separately fitted maps**.
- The distributed result stays near **80% on strict unseen-word examples** and reaches roughly **90–92% in matched cross-speaker, cross-word ABX tests**, above spectrum-matched random transports.

The random transports are strong structured baselines rather than chance: a high-dimensional linear map can preserve substantial information. The relevant result is that the fitted maps preserve more of the phone structure.

The direct residual-state result and the J-signature result answer different questions. The first asks whether phone identity is decodable from the encoder at all. The second asks how much of that structure remains readable after the state is expressed through the fitted vocabulary geometry. Even coordinates ranked 51–100 retain useful phone information, so the brightest coordinate does not tell the whole story.

The reported validation metrics come from automatically aligned **native 20 ms midpoint states**. The public explorer instead mean-pools five native states into overlapping, phoneme-scale **100 ms display cells** with an 80 ms hop. A cell can contain more than one phone, and Whisper's receptive field is not confined to that window. The public labels are therefore similarities for visualization—not probabilities, predicted phone boundaries, or a separately validated 100 ms phone classifier.

<figure class="note-figure">
  <a href="{{ '/assets/img/audio-jacobian-lens/phone-signature-view.png' | relative_url }}">
    <img src="{{ '/assets/img/audio-jacobian-lens/phone-signature-view.png' | relative_url }}" alt="Audio Jacobian Lens Phone Signature view for the buzzer example using 100 millisecond display cells. Encoder L3 from 0.56 to 0.66 seconds is selected, with B as the nearest prototype at cosine similarity 0.565." loading="lazy" decoding="async">
  </a>
  <figcaption><strong>Figure 2.</strong> A time-ordered Phone Signature using 100 ms display cells with an 80 ms hop. In the selected encoder-L3 window (0.56–0.66 s), <code>B</code> is the nearest frozen ARPAbet prototype (cosine 0.565; margin 0.479 over <code>AW</code>). The scores are similarities, and a window may contain multiple phones; it is not a predicted phone boundary. <a href="https://kennethli319.github.io/audio-jacobian-lens/?sample=asr-buzzer">Open the interactive report and switch on Phone Signature view</a>.</figcaption>
</figure>

The strongest conclusion is that substantial phonetic structure is recoverable from the frozen encoder under a supervised, fitted instrument, and that more of it survives in the distributed constellation than in the brightest coordinate. This does not show that Whisper stores literal phone symbols or that its decoder naturally uses exactly these fitted prototypes. The locked test split, broader languages and speakers, and phone-directed causal tests remain open.

### Inspection can become intervention

A fitted readout is a gauge, not automatically a knob. I tested a candidate direction with the ambiguous Laurel/Yanny recording, but this intervention was separate from the fitted Phone Signature prototypes.

Instead of increasing `Yanny` at the final output head, I nudged earlier encoder states toward a broad Y-prefix vocabulary direction, away from a La-prefix direction, and let the unchanged later layers recompute normally.

The free decode moved from `Lily!` to `Yay!`, and Y-related downstream scores increased—but the model never produced `Yanny`.

That near-miss is useful. It shows that an early edit can propagate into final behavior while also showing that the current steering is neither clean nor semantically specific. It does not validate the Phone Signature, establish a `Yanny` representation, or demonstrate phone-level control.

A reliable knob would need repeatable, selective effects across recordings and contexts, dose-response behavior, and advantages over matched-norm random, off-time, and off-layer controls. One propagated edit is not yet a stable control surface.

### The framework extends beyond ASR, with different evidence boundaries

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

Failures and evidence boundaries are part of the project rather than details to hide.

## Part II: Putting my psycholinguistics and cognitive-science hat back on

### A concrete reconstruction prediction

The experiment I most want to run next is deliberately behavioral:

1. Hide the original audio and transcript.
2. Give only the time-ordered Phone Signature candidates and similarity scores from encoder L2 or L3 to a phonetician or language model.
3. Ask them to reconstruct the spoken word sequence.

My prediction is that they should recover substantially more than chance and more than they could recover from a shuffled sequence or a matched random transport.

That would mean the Phone Signature view contains more than isolated, locally classifiable phones. It would preserve temporally organized phonetic information that another system can integrate into lexical hypotheses. It would not prove that Whisper's own decoder uses the same route, because a human or language model could also exploit English phonotactics and prior knowledge.

A proper test should compare the top-1 phone sequence with the full distributed signature, real temporal order with shuffled order, and the fitted map with matched random maps. It should also use unseen speakers and words, and include a text-only baseline to measure how much reconstruction comes from language priors rather than acoustic evidence.

If reconstruction succeeds under those controls, that would support the view as a useful measurement of encoder information. If it fails, the signatures may be locally readable projections that do not preserve the larger linguistic sequence.

### Vocabulary may be a coordinate system, not an internal sentence

My current hypothesis is not that the encoder “thinks in words.”

Instead, the model's roughly 52K BPE vocabulary may provide a borrowed, human-readable coordinate system. A single coordinate comes from the human linguistic world, but combinations of coordinates and their rankings may describe acoustic states, subword evidence, or attributes that have no single human word.

The Phone Signature result makes this hypothesis more concrete: the informative unit may be the distributed signature rather than the top token label.

This is almost a translation problem. We are translating a machine-readable continuous pattern into a representation that a human researcher can inspect, while trying not to mistake the translation for the original code.

### From readable gauges to useful controls

Early computers exposed many low-level switches. Useful interfaces eventually combined thousands of underlying operations into one understandable button.

Modern speech systems already offer high-level controls such as emotion, speaking style, or expressiveness. Each simple control may correspond to many hidden changes inside the model.

J-lens-style analysis may help us work in the reverse direction: start with a human-facing concept, identify candidate internal patterns associated with it, perturb the earlier “knobs,” and test which changes actually propagate.

That is the *Inception*-like part. Instead of changing the final output probability, make a small edit earlier in the computation and let later layers recompute around it.

But readability and control are different standards. A fitted readout is a **gauge**. It becomes a plausible **knob** only when an intervention changes the intended behavior selectively, repeatedly, and better than matched controls.

If stable directions can be found, they could help debug why a speech model chose one interpretation, test whether a suspected representation is causal, and provide more precise controls for a deployment.

### Train once, find the knobs later?

One further possibility is that we may not need a new training dataset for every behavior we want to study or customize.

Psycholinguistics and psychology have spent decades developing controlled paradigms for lexical association, priming, ambiguity resolution, phonetic competition, expectation, and adaptation. If we can identify where similar patterns appear inside a model—and demonstrate that they are causal—those paradigms could become templates for finding useful internal controls.

The representation may already exist. The problem may be less about teaching the model something new and more about finding the right knob after training.

That could make some forms of customization more data-efficient. A team might adapt ambiguity resolution, pronunciation bias, speaking style, or domain-specific behavior without retraining the full system for every deployment.

This remains a hypothesis, not a replacement for training or data. It would work only when the relevant representation already exists, remains stable across contexts, and can be steered without pushing the model off its learned distribution. The current results do not yet establish those conditions.

## What I am, and am not, claiming

This is not mind-reading.

I am not claiming that speech models are conscious, that they contain literal phone symbols, that every displayed token is a faithful internal concept, or that the current steering system has found dependable semantic controls.

The strongest current claim is narrower:

> In this speaker-disjoint LibriSpeech dev-clean development experiment, phone identity is recoverable from frozen Whisper encoder states, and substantially more of it remains readable through a distributed fitted J-signature than through a rank-1-only sparse signature.

The steering results add evidence that some early interventions propagate. They do not show that the fitted phone prototypes identify the model's own causal code; the two experiments use different directions.

A J-lens readout is a measurement instrument. Like EEG or MEG analysis, its meaning comes from experimental design, replication, controls, and the predictions it survives. Unlike human neuroimaging, we can also intervene directly, rerun the same computation, and observe how the rest of the system responds.

A token on a screen is not a thought. A prototype match is not a phoneme, and a readable direction is not yet a knob. But a map that predicts where an intervention will selectively change behavior would be more than a picture: it would be the beginning of an instrument.

That combination brings me back to what I enjoyed about psycholinguistics: designing experiments that turn an inaccessible process into a testable hypothesis. Only now, we have more instruments—and we can sometimes reach inside the system and move one of the knobs.

## Explore the project

- [ASR / Whisper explorer](https://kennethli319.github.io/audio-jacobian-lens/?sample=asr-question)
- [Speech-to-speech / LFM2.5 Audio explorer](https://kennethli319.github.io/audio-jacobian-lens/speech/?sample=speech-question)
- [TTS / Chatterbox explorer](https://kennethli319.github.io/audio-jacobian-lens/tts/?sample=tts-bridge-s9)
- [Audio Jacobian Lens code and local Apple-silicon MLX setup](https://github.com/kennethli319/audio-jacobian-lens)
- [Anthropic's original Global Workspace research](https://www.anthropic.com/research/global-workspace)

If you work in speech, interpretability, phonetics, or cognitive science: **what experiment would convince you that an internal direction reflects real acoustic structure, rather than merely a readable projection?**

<div class="version-panel-nav">
  <a href="#metaphorical-version">Read the metaphorical map</a>
  <a href="#choose-version">Back to the two maps</a>
</div>

</article>
