---
layout: default
title: "Listening Inside a Speech Model with the Audio Jacobian Lens"
description: "One speech-interpretability project in two forms: a metaphorical story and a scientific report on J-lens readouts, phone signatures, and steering."
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
      <small>Story version · about 6 minutes</small>
    </a>
    <a class="version-choice version-choice--technical" href="#technical-version">
      <strong>Read the technical report →</strong>
      <span>Methods, measurements, screenshots, controls, limitations, and the experiments I want to run next.</span>
      <small>Scientific version · about 15 minutes</small>
    </a>
  </nav>
</section>

<article class="version-panel version-panel--metaphorical" id="metaphorical-version" tabindex="-1" aria-labelledby="metaphorical-title" markdown="1">

<a class="version-back" href="#choose-version">← Back to the two maps</a>

## The City Beneath the Transcript {#metaphorical-title}

<p class="version-deck">A metaphorical map of the same Audio Jacobian Lens experiments · July 2026</p>

Imagine that a speech model is a city at night.

A sound enters through the outer gates. At first, it is not a sentence. It is pressure changing over time: fragments of frequency, rhythm, silence, and voice. The signal travels through several neighborhoods, changing form at every stop, until it eventually reaches a brightly lit departure board where words appear.

We can see the words on that board. What we usually cannot see is how the city arrived at them.

Did it recognize the destination immediately and spend the remaining time confirming the route? Did several possible words compete along the way? What information did the acoustic districts preserve before anything looked like language?

During my linguistics degree, psycholinguistics taught me to study questions like these indirectly. Researchers could not inspect every neuron involved in human language processing, so they designed experiments around reaction time, priming, ambiguity, and mistakes. It was like watching traffic enter and leave a hidden city, then inferring its streets from the timing and pattern of the vehicles.

Modern neural models seem to offer the opposite situation. Every activation is available. We can inspect every layer and matrix. Yet the city is now so large---and so many signals move through it simultaneously---that access does not automatically give us understanding.

In that sense, model interpretation can still resemble EEG or MEG. We see patterns of activation, but their meaning does not arrive with them. We need comparisons, controls, and interventions before we can say what a pattern represents.

The [Audio Jacobian Lens](https://github.com/kennethli319/audio-jacobian-lens) is my attempt to draw a more useful map.

It adapts [Anthropic's Jacobian Lens](https://www.anthropic.com/research/global-workspace) to speech models. The lens asks, approximately: if an intermediate state were allowed to continue through the model, which vocabulary directions is it currently positioned to influence?

That does not make it a window into the model's thoughts. It is closer to laying a familiar coordinate grid over an unfamiliar city. The street names come from the model's vocabulary, but the underlying activity may represent acoustics, fragments of words, uncertainty, or combinations for which no single human label is correct.

Still, the map reveals some interesting traffic.

### Some destinations appear early

In Whisper's decoder, certain final words become visible surprisingly early. In one example, `door` was already ranked fourth in the first decoder layer I inspected and moved to first in the next.

Other words take a much longer route.

For the sentence "Where is my brother now?", the final word `now` moved from rank 6,319 to 7,237, then suddenly to third before becoming the output-head winner. Early in that journey, `who` appeared near the top instead.

It is tempting to tell a psychological story about that---to say the model was "thinking of who" before choosing "now." The evidence does not justify that claim. But the pattern does show that different lexical decisions form on different schedules. Sometimes later layers appear to confirm an early destination; sometimes the useful direction only emerges near the end.

The intermediate candidates remind me of word-association and lexical-competition experiments in psycholinguistics. The resemblance gives us hypotheses to test, not proof that a model and a human use the same mechanism.

### The acoustic city has constellations, not street signs

The encoder was harder to read.

Looking for one word or one highest-ranked token often produced a poor map. That may be because an acoustic encoder is not yet choosing vocabulary items. Asking it for a word is like asking someone to identify a whole neighborhood from the nearest street sign.

The Phone Signature view instead looks at a distributed pattern across the top 100 vocabulary-aligned coordinates and compares that pattern with 34 frozen ARPAbet phone prototypes.

The result is closer to a constellation than a label. No individual star gives the answer, but the arrangement carries information.

At Whisper encoder layer 2, using only the highest coordinate produced about 63.5% phone macro-F1. Reading the distributed top-100 pattern raised this to roughly 80% across independently fitted lenses, including strict unseen-word examples. Cross-speaker, cross-word comparisons reached approximately 90–92%, above matched random transports.

This does not mean the encoder literally contains phone symbols. The displayed phones are prototype similarities---not probabilities, native phoneme predictions, or causal labels. The underlying representation remains continuous.

But the distributed map appears to preserve substantially more phonetic structure than the single most visible token.

That leads to a simple test. Hide the audio and transcript. Give a phonetician---or a capable language model---only the time-ordered Phone Signature sequence. Could they reconstruct most of the spoken words?

If they can, the map may preserve a larger linguistic route, not merely isolated landmarks. If they cannot, then the signatures may be locally readable projections that fail to capture the journey as a whole.

### What happens if we touch a switch?

A map becomes more informative when it can guide an intervention.

Using the ambiguous Laurel/Yanny recording, I edited an early residual state toward vocabulary directions beginning with Y. I did not boost `Yanny` at the final output. I moved an earlier internal state and allowed the rest of the model to recompute.

The free decode changed from `Lily!` to `Yay!`

It never became `Yanny`.

That near-miss matters. The experiment shows that moving an early switch can propagate to the final output, but it does not show clean or semantically precise control. This is not "convincing" or manipulating a mind. It is a causal perturbation inside a computational system, followed by downstream recomputation.

The same idea extends to speech generation. In Chatterbox TTS, a small late-layer residual edit changed one selected acoustic-code winner and altered 43 later codes in the generated suffix. That demonstrates propagation through the autoregressive sequence. It does not tell us that an acoustic-code ID means a particular word or phone, nor does it yet establish end-to-end waveform attribution.

The city's switches are real. Their labels are still being written.

### Could old experiments help us find new controls?

Psycholinguistics has spent decades developing experiments for priming, ambiguity resolution, phonetic competition, expectation, and adaptation.

If we can find where related patterns appear inside a speech model---and then test them through controlled intervention---those old experimental designs might become guides for navigating a new kind of city.

The longer-term possibility is not that data or training become unnecessary. It is that, when a useful representation already exists, we may be able to train a broad model once, locate a stable internal control afterward, and adapt some behaviors without retraining the entire system for every deployment.

That remains a hypothesis. It would require the representation to be stable across speakers and contexts, causally connected to the behavior, and steerable without damaging the rest of the model.

But it changes the question.

Instead of always asking, "What more must we teach the model?", we can also ask, "What has the model already learned, where is it, and which switch lets us test that interpretation?"

<div class="metaphor-key"><strong>Where the metaphor stops:</strong> this is not mind-reading, and the city has no claim to consciousness. The map is a measurement instrument. Its street signs are vocabulary-aligned coordinates; its constellations are fitted phone-prototype similarities; and its switches are residual interventions whose meaning must survive controls.</div>

This is map-making under uncertainty.

And unlike the hidden city of the human brain, this is a city we can rerun, compare, and---carefully---touch.

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

We wanted to understand how human language processing worked somewhere inside the brain, but we could not dissect a living brain or inspect the activation of every neuron. Researchers instead designed experiments around reaction time, priming, ambiguity, errors, and carefully controlled contrasts. We observed behavior and worked backward toward a possible processing mechanism.

The evidence was often indirect and sometimes underdetermined. But those constraints trained a particular kind of experimental and theoretical thinking: how do we extract the maximum information from limited observations without pretending that a promising hypothesis is already a fact?

I miss that kind of puzzle-solving.

At first, studying neural language models seems completely different. We can inspect the architecture, activations, logits, attention patterns, and query/key/value matrices directly.

**Yet access is not understanding.**

Modern models produce so much information across layers, positions, attention heads, and interacting representations that following everything back to a human-language explanation quickly exceeds what any researcher can hold in working memory.

Paradoxically, this can feel less like reading ordinary software and more like doing EEG or MEG on an artificial language system. We can see activation patterns changing, but activation does not arrive with its meaning attached. We still need contrasts, decoding analyses, controls, and interventions to infer what a pattern represents.

The important difference is that, with a model, we can rerun the exact system and directly perturb an internal state.

That is where the Jacobian Lens became useful.

## A vocabulary-indexed measurement instrument

Anthropic's [Jacobian Lens, or J-lens](https://www.anthropic.com/research/global-workspace), learns a context-averaged first-order transport from an intermediate residual state into a later residual space. The transported state can then be read through the model's vocabulary head.

In simplified terms, it asks:

> Which vocabulary directions is this intermediate state positioned to influence later in the model?

It is not a literal transcript of thought, and its rankings are not calibrated next-token probabilities. It is a measurement of downstream influence expressed through the model's vocabulary coordinates.

I adapted Anthropic's open-source implementation to speech systems in [Audio Jacobian Lens](https://github.com/kennethli319/audio-jacobian-lens). The project now contains experimental workspaces for Whisper ASR, LFM2.5 Audio on Apple-silicon MLX, and Chatterbox TTS.

The results below fall into two categories. The first section covers what the current experiments actually show. The second puts my psycholinguistics and cognitive-science hat back on and asks what those observations might allow us to test next.

## Part I: What the project shows today

### Decoder decisions form on different schedules

Some realized words become readable surprisingly early.

In one held-out Whisper example, the realized token `door` moved from rank **#4** in the first decoder layer I inspected to **#1** one layer later.

But that is not the story for every word. In the utterance "Where is my brother now?", the realized token `now` moved:

```text
#6,319 -> #7,237 -> #3 -> output-head #1
```

At the early decoder position after `my brother`, the word `who` appeared near the top, although Whisper ultimately emitted `now`.

That reminded me of psycholinguistic word-association experiments: related lexical possibilities can become visible before the final choice. But this is an analogy, not evidence that Whisper and humans use the same mechanism.

The safer conclusion is that lexical readability varies sharply by token. Sometimes later layers sharpen an early candidate. Sometimes the decisive lexical direction only appears late.

<figure class="note-figure">
  <a href="{{ '/assets/img/audio-jacobian-lens/decoder-timing-now.png' | relative_url }}">
    <img src="{{ '/assets/img/audio-jacobian-lens/decoder-timing-now.png' | relative_url }}" alt="Whisper decoder layer-by-position matrix for Where is my brother now, with now selected. Who is the top early-layer candidate before now becomes top-ranked later." loading="lazy" decoding="async">
  </a>
  <figcaption><strong>Figure 1.</strong> The public explorer makes the schedule visible: at the position where Whisper eventually emits <code>now</code>, <code>who</code> is the early top candidate before <code>now</code> resolves in later layers. The screenshot uses the explorer's display vocabulary; the full-vocabulary ranks reported above are #6,319 → #7,237 → #3 → #1. <a href="https://kennethli319.github.io/audio-jacobian-lens/?sample=asr-question">Open the interactive report</a>.</figcaption>
</figure>

### The Phone Signature view gets closer to encoder-native information

The ordinary encoder-to-decoder view initially looked disappointing. A single emitted word was usually ranked poorly, and even silence could sometimes look spuriously readable.

But perhaps one BPE token was the wrong unit of analysis.

Whisper's encoder is not choosing a word. It is building a continuous representation from acoustic frames. The new experimental **Phone Signature view** therefore looks at a distributed pattern across the top 100 vocabulary-aligned J-lens coordinates and compares that pattern with 34 frozen ARPAbet phone prototypes.

The preliminary speaker-disjoint development results are much stronger:

- Phone information decoded directly from the encoder residual states rises to about **91% macro-F1 at L3**.
- At L2, using only the highest J-lens coordinate gives about **63.5% phone macro-F1**.
- Using the distributed top-100 signature raises this to **81.1% and 80.5%** across two independently fitted lenses.
- On strict unseen-word examples, the result remains around **79.8% and 79.6%**.
- In matched cross-speaker, cross-word ABX tests, L2 and L3 signatures reach approximately **90–92%**, clearly above spectrum-matched random transports.

Even coordinates ranked 51–100 retain substantial phone information. That is important: the highest token coordinate does not tell the whole story. Much of the stable phonetic information appears to live in the combined pattern.

This view is closer to the kind of information we would expect an acoustic encoder to preserve. It does **not** mean that Whisper literally stores phone labels or token IDs. The encoder remains a continuous representation, and the displayed phones are prototype similarities---not probabilities, a native phoneme head, or causal proof.

<figure class="note-figure">
  <a href="{{ '/assets/img/audio-jacobian-lens/phone-signature-view.png' | relative_url }}">
    <img src="{{ '/assets/img/audio-jacobian-lens/phone-signature-view.png' | relative_url }}" alt="Audio Jacobian Lens Phone Signature view for the buzzer example. Four encoder layers show time-ordered ARPAbet phone prototypes, with an L3 B cell selected and its nearest alternatives shown in the inspector." loading="lazy" decoding="async">
  </a>
  <figcaption><strong>Figure 2.</strong> A time-ordered Phone Signature for the buzzer example. Each cell is the nearest frozen ARPAbet prototype derived from a distributed top-100 J-signature; the right-hand inspector shows the alternatives for one selected L3 window. These are similarities, not phone probabilities or causal labels. <a href="https://kennethli319.github.io/audio-jacobian-lens/?sample=asr-buzzer">Open the interactive report and switch on Phone Signature view</a>.</figcaption>
</figure>

The Phone Signature result is still exploratory. The public cached explorer now exposes it as an opt-in diagnostic, while the locked test split and causal intervention gates remain open.

### Inspection can become intervention

I also tried residual steering on the ambiguous Laurel/Yanny audio.

Instead of increasing `Yanny` at the final output head, I edited an earlier residual state toward Y-prefix vocabulary directions and then allowed the rest of the model to recompute normally.

The free decode moved from `Lily!` to `Yay!`, and Y-related downstream scores increased---but the model never produced `Yanny`.

That near-miss is useful. It shows that an earlier edit can propagate into final behavior, while also showing that the current steering is neither clean nor semantically specific.

This is not "convincing the model." It is a causal perturbation followed by downstream recomputation. More controls are required before claiming direction-specific semantic control.

### The framework extends beyond ASR, with different evidence boundaries

In Chatterbox TTS, the realized acoustic-code direction becomes progressively more readable through depth. A small late-layer residual intervention can flip a selected acoustic code and regenerate a different autoregressive suffix.

But an acoustic-code ID is not a word or phone, and this is not yet end-to-end waveform attribution.

The Apple-silicon MLX path for LFM2.5 Audio also works end to end across its language backbone. However, its current lens is a one-clip integration pilot rather than a validated scientific result. It does not yet explain the audio encoder, adapter, acoustic codebooks, or generated waveform.

<figure class="note-figure">
  <a href="{{ '/assets/img/audio-jacobian-lens/tts-residual-steering.png' | relative_url }}">
    <img src="{{ '/assets/img/audio-jacobian-lens/tts-residual-steering.png' | relative_url }}" alt="Recorded Chatterbox TTS causal replay showing a small L20 plus L22 residual edit changing the actual speech-head winner from acoustic code 4106 to 4358 and changing 43 downstream codes." loading="lazy" decoding="async">
  </a>
  <figcaption><strong>Figure 3.</strong> A recorded Chatterbox causal replay. A 0.002×-relative-norm edit at L20 + L22 changes the speech-head winner from acoustic code 4106 to 4358, followed by 43 changed downstream codes. This demonstrates propagation through the autoregressive suffix; it does not give acoustic-code IDs word or phone meaning, or establish waveform attribution. <a href="https://kennethli319.github.io/audio-jacobian-lens/tts/?sample=tts-bridge-s9">Open the interactive TTS report</a>.</figcaption>
</figure>

Failures and evidence boundaries are part of the project rather than details to hide.

## Part II: Putting my psycholinguistics and cognitive-science hat back on

### A concrete reconstruction prediction

Here is the experiment I now most want to run:

1. Hide the original audio and transcript.
2. Give only the time-ordered sequence of Phone Signature candidates and scores from encoder L2 or L3 to a phonetician---or perhaps a sufficiently capable language model.
3. Ask them to reconstruct the spoken word sequence.

My prediction is that they should recover substantially more than chance and more than they could recover from a shuffled or random-transport sequence.

That would mean the Phone Signature view contains more than isolated, locally classifiable phones. It would preserve temporally organized phonetic information that another system can integrate into lexical hypotheses.

In a sense, that is what a human listener does---and what Whisper's decoder eventually does: accumulate uncertain acoustic and subword evidence across time, then resolve it into words.

A proper test should compare:

- the top-1 phone sequence with the distributed top-100 signature;
- L2 with L3;
- the real temporal order with shuffled windows;
- the fitted J-lens with spectrum-matched random transports; and
- phone-error and word-error recovery on completely unseen speakers and words.

If reconstruction succeeds, that would be evidence that the view is genuinely closer to information encoded by the encoder. If it fails, the signatures may only be locally readable projections that do not preserve the larger linguistic sequence.

### Vocabulary may be a coordinate system, not an internal sentence

My current hypothesis is not that the encoder "thinks in words."

Instead, the model's roughly 52K BPE vocabulary may provide a borrowed, human-readable coordinate system. A single coordinate comes from the human linguistic world, but combinations of coordinates and their rankings may describe acoustic states, subword evidence, or attributes that have no single human word.

The Phone Signature result makes this hypothesis more concrete: the informative unit may be the distributed signature rather than the top token label.

This is almost a translation problem. We are translating a machine-readable continuous pattern into a representation that a human researcher can inspect, while trying not to mistake the translation for the original code.

### From thousands of internal switches to useful controls

Early computers exposed many low-level switches. Useful interfaces eventually combined thousands of underlying operations into one understandable button.

Modern speech systems already offer high-level controls such as emotion, speaking style, or expressiveness. Each simple control may correspond to many hidden changes inside the model.

J-lens-style analysis may help us work in the reverse direction: start with a human-facing concept, identify candidate internal patterns associated with it, perturb the earlier "knobs," and test which changes actually propagate.

That is the *Inception*-like part. Instead of hacking the final output probability, make a small edit earlier in the computation and let later layers recompute around it.

If those directions become stable and specific, they could become useful for:

- debugging why an ASR or speech model chose one interpretation;
- testing whether a suspected internal representation is causal;
- building safer and more interpretable steering controls;
- adapting behavior for a particular deployment without blindly changing the entire model; and
- giving product teams more precise control over speech behavior.

The same tool can move from observation toward control, which is both exciting and something to treat carefully.

### Train once, find the knobs later?

One further possibility is that we may not need a new training dataset for every behavior we want to study or customize.

Psycholinguistics and psychology have spent decades developing controlled paradigms for lexical association, priming, ambiguity resolution, phonetic competition, expectation, and adaptation. If we can identify where similar sequences or association patterns appear inside a model---and demonstrate that they are causal---those paradigms could become templates for finding useful internal controls.

Instead of collecting another large dataset and fine-tuning the entire model, we might:

1. train a general model once on broad data;
2. use controlled experiments to locate the internal pattern associated with a behavior;
3. validate that pattern with counterfactual interventions; and
4. adjust a small number of internal directions during inference or through lightweight calibration.

In other words, the representation may already exist. The problem may be less about teaching the model something new and more about finding the right knob after training.

That could make some forms of customization more data-efficient. A team might adapt ambiguity resolution, pronunciation bias, speaking style, or domain-specific behavior without retraining the full system for every deployment.

This is still a hypothesis, not a replacement for training or data. It would only work when the relevant representation already exists, remains stable across contexts, and can be steered without pushing the model off its learned distribution.

But if those conditions hold, decades of experimental work on human language processing may become useful not only for evaluating models, but for locating and testing their internal control surfaces.

## What I am, and am not, claiming

This is not mind-reading.

I am not claiming that speech models are conscious, that they have a proven audio "global workspace," or that every displayed token is a faithful internal concept.

A J-lens readout is a measurement instrument. Like EEG or MEG analysis, its meaning comes from experimental design, replication, controls, and the predictions it survives.

But unlike human neuroimaging, we can intervene directly, rerun the same internal computation, and observe how the rest of the system responds.

That combination brings me back to what I enjoyed about psycholinguistics: designing experiments that turn an inaccessible process into a testable hypothesis.

Only now, we have more instruments---and we can sometimes reach inside the system and move one of the knobs.

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
