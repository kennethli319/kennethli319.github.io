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
  <p class="version-intro">Read the same project as a short metaphorical story or a concise technical report. The evidence and boundaries are the same; only the map changes.</p>
  <nav class="version-chooser" aria-label="Choose a version of this note">
    <a class="version-choice version-choice--metaphor" href="#metaphorical-version">
      <strong>Follow the metaphorical map →</strong>
      <span>Enter a city beneath the transcript, where acoustic constellations become words and internal switches can be tested.</span>
      <small>Story version · about 3 minutes</small>
    </a>
    <a class="version-choice version-choice--technical" href="#technical-version">
      <strong>Read the technical report →</strong>
      <span>Methods, measurements, screenshots, controls, limitations, and the experiments I want to run next.</span>
      <small>Scientific version · about 8 minutes</small>
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

Sound enters through the outer gates—not yet as words, only pressure changing over time. It travels through layered neighborhoods until a sentence appears on a brightly lit departure board. We can read the board. What we usually cannot see is the route beneath it.

During my linguistics degree, psycholinguistics taught me to study hidden language processes indirectly. Researchers used reaction time, priming, ambiguity, and mistakes because they could not inspect every neuron. I miss that kind of puzzle-solving.

Neural models give us the opposite problem: almost every activation is available, but there are too many to interpret. It can still feel like EEG or MEG. We see activity, but meaning does not arrive with it.

The [Audio Jacobian Lens](https://github.com/kennethli319/audio-jacobian-lens), adapted from [Anthropic's Jacobian Lens](https://www.anthropic.com/research/global-workspace), is my attempt to draw a more useful map of that city.

It does not reveal the model's thoughts. It places human-readable vocabulary coordinates over unfamiliar internal terrain, where the activity may represent acoustics, fragments of words, uncertainty, or mixtures without a single human name.

### Words appear on different schedules

In Whisper's decoder, some destinations become readable early. In one example, `door` moved from fourth to first in the explorer's display vocabulary between two layers.

Other words take longer. In “Where is my brother now?”, `now` became readable only near the end, while `who` appeared near the top earlier.

This resembles a word-association experiment, but it does not show that Whisper was “thinking of who.” What we can observe is that different lexical directions become readable at different depths; what that schedule represents is still open to interpretation.

### The encoder looks more like a constellation

The acoustic encoder was harder to read. Looking only for its highest-ranked word was like identifying a neighborhood from its nearest street sign.

The Phone Signature view instead compares a distributed pattern across 100 vocabulary-aligned coordinates with frozen phone prototypes. No single star gives the answer; the constellation carries the information.

On held-out speakers, the brightest coordinate reached about **63.5% phone macro-F1**, while the distributed signature reached roughly **80%**, including on strict unseen-word examples. In these tests, the overall pattern carried more recoverable phone information than its top label. Whether that pattern is best understood as phonetic structure, an acoustic correlate, or something else needs further experiments.

The model stayed frozen, but the map and prototypes were fitted with supervised examples. The measurements use native 20 ms states; the public map groups them into overlapping 100 ms windows for readability. Those windows are not phone boundaries, and their labels are similarities, not probabilities.

One experiment I want to try next is to hide the audio and transcript, then ask a phonetician or language model to reconstruct the words from the Phone Signature sequence alone.

### What happens if we touch a switch?

With the ambiguous Laurel/Yanny recording, the unedited model produced `Lily!` I nudged earlier encoder states toward a broad Y-prefix direction, then let the remaining layers recompute.

The result changed to `Yay!`—but never to `Yanny`.

The near-miss gives us an observation: the intervention changed what followed, but not to the intended word. That could reflect weak directional control, a broad phonetic bias, or an unstable perturbation. The steering direction was also separate from the Phone Signature prototypes, so it does not validate that map.

The next experiment is to treat a readable direction as a gauge, then test whether moving it changes behavior repeatedly, selectively, and more than controlled alternatives. Only then could we ask whether it also works as a knob.

### Experiments the map makes possible

Psycholinguistics already gives us experiments for priming, ambiguity, phonetic competition, and adaptation. We can look for related patterns inside a model, perturb them, and compare the results with competing predictions about what the model has learned.

A longer-term experiment would ask whether a broadly trained model contains stable internal representations that can support debugging or adaptation without full retraining for every deployment. That remains a hypothesis, not a result of the current work.

<div class="metaphor-key"><strong>Where the metaphor stops:</strong> A token is not a thought. A prototype match is not a phoneme probability. A model that can be steered is not necessarily a model we understand.</div>

Unlike the hidden city of the human brain, this one can be rerun, compared, and—carefully—touched. The point is not to settle on one story, but to design the next experiment that can distinguish among several.

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

During my linguistics degree, psycholinguistics taught me how to study a system we could not inspect directly. Researchers used reaction time, priming, ambiguity, and errors to infer how language might be processed inside the brain.

Neural models present the opposite problem: almost every activation is available, but there is too much to interpret directly. It can still resemble EEG or MEG—we see patterns changing, but their meaning does not arrive with them.

The important difference is that a model can be rerun exactly and perturbed internally. The Audio Jacobian Lens is my attempt to turn that access into a useful measurement instrument.

## What the lens measures

Anthropic's [Jacobian Lens](https://www.anthropic.com/research/global-workspace) fits a first-order map from an intermediate residual state toward a later space that can be read through the vocabulary head. In practical terms, it asks:

> Under this fitted map, which vocabulary directions become readable from here?

I adapted it in [Audio Jacobian Lens](https://github.com/kennethli319/audio-jacobian-lens) for Whisper ASR, Chatterbox TTS, and an experimental Apple-silicon MLX path for LFM2.5 Audio. The encoder-to-decoder transport used for Phone Signature is my extension, not a configuration validated by Anthropic's paper.

The original model remains frozen, but the lens and phone prototypes are fitted from data, including automatically aligned speech supervision. This is a learned instrument applied to a frozen model—not a transcript of the model's thoughts or direct proof of causation.

Two encoder maps were fitted on non-overlapping examples and evaluated on the same speaker-held-out development set. Their agreement is a consistency check, not an independent-corpus replication.

## What I observed—and what might explain it

### Words become readable at different depths

In “Where is my brother now?”, the realized token `now` moved through the full vocabulary as follows:

```text
#6,319 → #7,237 → #3 → output-head #1
```

At that output position, `who` appeared near the top early, although Whisper ultimately emitted `now`.

<figure class="note-figure">
  <a href="{{ '/assets/img/audio-jacobian-lens/decoder-timing-now.png' | relative_url }}">
    <img src="{{ '/assets/img/audio-jacobian-lens/decoder-timing-now.png' | relative_url }}" alt="Whisper decoder layer-by-position matrix for Where is my brother now, with now selected. Who is the top early-layer candidate before now becomes top-ranked later." loading="lazy" decoding="async">
  </a>
  <figcaption><strong>Figure 1.</strong> The public explorer makes the schedule visible: at the position where Whisper eventually emits <code>now</code>, <code>who</code> is the early top candidate before <code>now</code> resolves in later layers. The screenshot uses the explorer's display vocabulary; the full-vocabulary ranks reported above are #6,319 → #7,237 → #3 → #1. <a href="https://kennethli319.github.io/audio-jacobian-lens/?sample=asr-question">Open the interactive report</a>.</figcaption>
</figure>

One interpretation is lexical competition; another is simply that the fitted readout exposes different vocabulary directions at different depths. Repeating this across controlled minimal pairs—and testing whether early competitors predict later errors or priming—could separate those readings.

### A distributed signature predicts phones better than its brightest coordinate

A single vocabulary coordinate was a poor description of Whisper's acoustic encoder, so the **Phone Signature view** compares the distributed pattern across its top 100 vocabulary-aligned coordinates with frozen phone prototypes.

The preliminary speaker-held-out results are:

- Phone information decoded directly from the encoder residual states rises to about **91% macro-F1 at L3**.
- At L2, using only the highest J-lens coordinate gives about **63.5% phone macro-F1**.
- Using the distributed top-100 signature raises this to about **81% across two separately fitted maps**.
- The distributed result stays near **80% on strict unseen-word examples** and reaches roughly **90–92% in matched cross-speaker, cross-word ABX tests**, above spectrum-matched random transports.

On these held-out evaluations, the fitted maps expose more phone-predictive structure than spectrum-matched random transports, and the top-100 signature predicts phones better than rank 1 alone. That pattern could reflect distributed phone coding, correlated acoustic cues, or structure introduced by the supervised alignment and prototypes.

These measurements use automatically aligned **native 20 ms states**. The explorer pools five states into overlapping **100 ms display cells**. Those cells aid visualization but are not phone boundaries, probabilities, or a separately validated classifier.

<figure class="note-figure">
  <a href="{{ '/assets/img/audio-jacobian-lens/phone-signature-view.png' | relative_url }}">
    <img src="{{ '/assets/img/audio-jacobian-lens/phone-signature-view.png' | relative_url }}" alt="Audio Jacobian Lens Phone Signature view for the buzzer example using 100 millisecond display cells. Encoder L3 from 0.56 to 0.66 seconds is selected, with B as the nearest prototype at cosine similarity 0.565." loading="lazy" decoding="async">
  </a>
  <figcaption><strong>Figure 2.</strong> A time-ordered Phone Signature using 100 ms display cells with an 80 ms hop. In the selected encoder-L3 window (0.56–0.66 s), <code>B</code> is the nearest frozen ARPAbet prototype (cosine 0.565; margin 0.479 over <code>AW</code>). The scores are similarities, and a window may contain multiple phones; it is not a predicted phone boundary. <a href="https://kennethli319.github.io/audio-jacobian-lens/?sample=asr-buzzer">Open the interactive report and switch on Phone Signature view</a>.</figcaption>
</figure>

For now, I treat this as an observation about recoverability, not a conclusion about how Whisper represents phones. Cross-corpus transfer and controlled single-phone contrasts could help separate phone-like structure from speaker, context, or alignment cues.

### Steering changes what follows

With the ambiguous Laurel/Yanny recording, I nudged early encoder states toward a broad Y-prefix direction and away from a La-prefix direction, then let the frozen model recompute. The free decode changed from `Lily!` to `Yay!`, but never to `Yanny`.

In this clip, an early edit was followed by a different final decode. That could be targeted phonetic influence, a shift in language priors, or generic disruption. The steering direction was separate from the Phone Signature prototypes. Dose-response sweeps with opposite, orthogonal, and norm-matched random directions across many ambiguous clips could tell these possibilities apart.

### Beyond ASR

In one recorded Chatterbox TTS replay, a small late-layer residual edit flipped an acoustic-code winner and regenerated a different autoregressive suffix.

<figure class="note-figure">
  <a href="{{ '/assets/img/audio-jacobian-lens/tts-residual-steering.png' | relative_url }}">
    <img src="{{ '/assets/img/audio-jacobian-lens/tts-residual-steering.png' | relative_url }}" alt="Recorded Chatterbox TTS causal replay showing a small L20 plus L22 residual edit changing the actual speech-head winner from acoustic code 4106 to 4358 and changing 43 downstream codes." loading="lazy" decoding="async">
  </a>
  <figcaption><strong>Figure 3.</strong> A recorded Chatterbox causal replay. A 0.002×-relative-norm edit at L20 + L22 changes the speech-head winner from acoustic code 4106 to 4358, followed by 43 changed downstream codes. This demonstrates propagation through the autoregressive suffix; it does not give acoustic-code IDs word or phone meaning, or establish waveform attribution. <a href="https://kennethli319.github.io/audio-jacobian-lens/tts/?sample=tts-bridge-s9">Open the interactive TTS report</a>.</figcaption>
</figure>

In this replay, the edit changed a code winner and the downstream suffix. The open question is whether this reflects meaningful acoustic control or ordinary autoregressive sensitivity; repeated clips, matched perturbations, and waveform-level evaluation are the next test. The MLX path for LFM2.5 Audio also runs end to end, but it remains a one-clip integration pilot.

## What I want to test next

### Reconstructing words from Phone Signatures

My next test is behavioral: hide the audio and transcript, show only the ordered Phone Signature sequence, and ask a phonetician or language model to reconstruct the words.

Success against shuffled sequences, matched random maps, and unseen speakers and words would suggest that the view preserves an organized phonetic route rather than isolated labels. A text-only baseline would show how much reconstruction comes from language priors instead of acoustic evidence.

Failure would also be informative: the signatures might be locally readable without preserving a larger linguistic sequence.

### From readable directions to useful controls

One possibility is that vocabulary acts as a borrowed coordinate system: combinations of token directions may describe acoustic or subword states without carrying a single word-level meaning. Another is that the lens mainly supplies a convenient supervised readout.

Psycholinguistics offers controlled paradigms for priming, ambiguity, phonetic competition, and adaptation. In a model, we can use those paradigms to locate a pattern, perturb it, and test whether the rest of the computation changes as predicted.

If stable directions can be found and tested causally, some behaviors might eventually be adjusted after training without retraining the entire model. That could support more efficient debugging or adaptation.

This is a possibility, not a current result. It depends on the representation already existing, generalizing across contexts, and tolerating intervention without damaging the system.

## How I am reading the results for now

The most stable observation is descriptive: in this speaker-disjoint LibriSpeech development experiment, phone identity is more recoverable from the distributed fitted J-signature than from rank 1 alone.

What that means internally is still open. It may reflect a distributed phone-like code, correlated acoustic evidence, or a useful coordinate system imposed by the fitted instrument. The steering result is similarly an observation about propagation, not evidence that the readable phone directions are the model's causal code.

Like EEG or MEG, the J-lens is a measurement instrument whose interpretation depends on the predictions it survives. The advantage here is that we can rerun the same computation, perturb it, and design the next experiment to separate competing explanations.

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
