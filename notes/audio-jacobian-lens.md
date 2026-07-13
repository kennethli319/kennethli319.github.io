---
layout: default
title: "Inception into J-Space"
description: "A layer-by-layer descent through a speech model: from readable words to nonliteral acoustic representations, and from inspection to steering."
image: https://kennethli319.github.io/assets/img/audio-jacobian-lens/inception-into-j-space-hand-drawn.jpg
permalink: /notes/audio-jacobian-lens/
---

[Back to Notes]({{ '/notes.html' | relative_url }})

<section class="version-gate" id="choose-version" aria-labelledby="note-title">
  <p class="version-eyebrow">One investigation · two ways down</p>
  <h1 id="note-title">Inception into J-Space</h1>
  <p class="version-intro">I use <em>Inception</em> as a way to think about descending through a speech model: readable language at the surface, stranger projections below, and the possibility that one well-placed anchor can change what later layers build.</p>
  <nav class="version-chooser" aria-label="Choose a version of this note">
    <a class="version-choice version-choice--metaphor" href="#metaphorical-version">
      <strong>Enter through the metaphor →</strong>
      <span>A shorter descent through the surface, the dream layers, encoder limbo, and the idea of planting an anchor.</span>
      <small>Story version · about 4 minutes</small>
    </a>
    <a class="version-choice version-choice--technical" href="#technical-version">
      <strong>Take the technical descent →</strong>
      <span>The same journey with measurements, screenshots, controls, limitations, and the experiments I want to run next.</span>
      <small>Technical version · about 9 minutes</small>
    </a>
  </nav>
</section>

<article class="version-panel version-panel--metaphorical" id="metaphorical-version" tabindex="-1" aria-labelledby="metaphorical-title" markdown="1">

<a class="version-back" href="#choose-version">← Back to the two descents</a>

## A Descent into J-Space {#metaphorical-title}

<p class="version-deck">A metaphorical version of the Audio Jacobian Lens experiments · July 2026</p>

<figure class="note-figure note-figure--illustration">
  <a href="{{ '/assets/img/audio-jacobian-lens/inception-into-j-space-hand-drawn.jpg' | relative_url }}">
    <img src="{{ '/assets/img/audio-jacobian-lens/inception-into-j-space-hand-drawn.jpg' | relative_url }}" alt="Hand-drawn editorial illustration of four computational levels: readable speech tiles at the surface, projected objects below, distributed acoustic constellations deeper down, and a glowing anchor in the lowest level sending a signal upward." loading="lazy" decoding="async">
  </a>
  <figcaption><strong>Hand-drawn metaphorical illustration.</strong> At the surface, language is readable. Deeper down, familiar objects become projections and distributed patterns. One anchor planted at a particular depth sends an effect through the levels above. This is explanatory artwork, not experimental evidence.</figcaption>
</figure>

I keep thinking about *Inception*.

In the movie, you enter one dream, then another inside it, and then another. The surface still looks familiar. As you descend, however, things become less literal. An object can be a projection. Several objects can combine to express something that none of them means alone. And something small, placed deep enough, can reorganize what happens in every level above it.

That is almost how I now imagine looking through a speech model with the [Audio Jacobian Lens](https://github.com/kennethli319/audio-jacobian-lens), which I adapted from [Anthropic's Jacobian Lens](https://www.anthropic.com/research/global-workspace).

I am borrowing *Inception* as a map. I am not saying that Whisper dreams or has a human subconscious. The metaphor is useful because it gives me two questions: **what changes as we descend, and what can an intervention placed at one level change after it?**

During my linguistics degree, psycholinguistics taught me to study language processes that we could not inspect directly. Researchers designed experiments around reaction time, priming, ambiguity, and mistakes, then tried to infer the hidden sequence underneath. I miss that kind of puzzle-solving.

Neural models give us the opposite problem. We can record almost every activation, but there are too many of them and most do not come with names. It still feels a little like functional EEG or MEG: we see something light up, and then we have to guess what the pattern means.

### The surface world

At the surface is the transcript. Here, a word mostly means what we expect: it is the token the model is about to say.

But move one level down through Whisper's decoder and the schedule becomes interesting. In “Where is my brother now?”, the final token `now` moved through the full vocabulary like this:

```text
#6,319 → #7,237 → #3 → #1
```

Before `now` resolved, `who` appeared near the top at that output position.

To me, this looks surprisingly language-model-like. After `brother`, the decoder surfaces `who`, almost as if one level is leaving a hint for the next: *brother—identity—who*. Then the later levels settle on `now`.

It reminds me of word association in psycholinguistics. I am not saying the mechanisms are exactly the same, but the shape is surprisingly similar, and that resemblance gives us an experiment rather than a conclusion.

The encoder gives another part of the puzzle. Near the end of the same clip, its Phone Signature shows an earlier, suggestive `N → AW`-like sequence. The timing is not clean enough to call this direct proof for `now`: the displayed 100 ms windows overlap, the encoder is nonlocal, and the token timing is model-derived.

Still, it makes me wonder if two streams are meeting. One comes from language association in the decoder. The other comes from acoustic evidence in the encoder. If the sound is unclear, perhaps the association stream pulls harder; if the acoustic cue is clear, perhaps it constrains the answer more strongly. A clear-versus-ambiguous audio × supportive-versus-conflicting context experiment could test that.

### Encoder limbo

The further I descend from the output, the less useful it becomes to ask, “Which word is the model thinking about?” The lens still shows vocabulary directions because vocabulary is a human coordinate system we can read. But a token direction deep in the encoder does not have to carry that token's surface meaning.

It may be more like a familiar object projected into a dream. We recognize its form, but it is doing another job at that level. One token may be an acoustic attribute or one piece of a subword state. Multiple tokens, their rankings, and the way they move across time may have to combine before the pattern means anything.

That is why the Phone Signature view looks at a constellation rather than only its brightest star. At encoder layer 2, the top coordinate alone recovered phone identity at about **63.5% macro-F1**. The distributed pattern across the top 100 coordinates reached roughly **80–81%**, including strict unseen-word examples.

To me, the important observation is that the combination carries much more recoverable phone information than the top label. Maybe human vocabulary directions are being borrowed to describe something more acoustic and less literal. Maybe the fitted map contributes part of that structure. The point is to design an experiment that separates those possibilities.

If I keep descending toward the first encoder layer, that is the model's limbo in this metaphor: furthest from the transcript, hardest to name in human terms, but still part of everything that will be built above it.

One experiment I especially want to try is to hide the original audio and transcript, then give only the ordered Phone Signature sequence to a phonetician or a capable language model. Could they reconstruct most of the words that appeared in the audio without listening to it? What survives if I shuffle the sequence, swap in a random map, or use unseen speakers and words?

### Planting an anchor

Going down is only half of *Inception*. The more interesting question is whether the right object, planted at the right depth, changes what the higher levels build around it.

With the ambiguous Laurel/Yanny recording, the unedited model produced `Lily!` I nudged early encoder states toward a broad Y-prefix direction and away from a La-prefix direction, then let all the remaining layers recompute.

The result became `Yay!`, not `Yanny`.

That is not precise semantic control, but it is also not nothing. Something placed early changed the surface transcript, while the model still decided what surface object to construct from it. The anchor caught somewhere, but the model interpreted it in its own way.

The temporal side appears in one Chatterbox TTS replay. A small residual edit changed one acoustic-code winner from `4106` to `4358`, followed by 43 changed downstream codes. This does not tell us what those codes mean. It shows why I want to test both **layer and time**: a local edit can alter the autoregressive future built after it.

So the experiment I want is not simply “can I make the output change?” It is: **which anchor, at which layer, at which time, and at which strength produces a repeatable and selective change?** Then test the opposite direction, an orthogonal direction, a random direction with the same norm, and the same anchor at the wrong time.

This is where the old psycholinguistic puzzles become useful again. We can borrow paradigms for priming, ambiguity, phonetic competition, and adaptation, but now we can locate an association, touch it, and see whether the rest of the computation reorganizes in the way we predicted.

The question is no longer only, “What does this activation mean?”

It is also: **how deep do we need to go, what should we place there, and what survives when the model returns to the surface?**

<div class="version-panel-nav">
  <a href="#technical-version">Continue with the technical descent →</a>
  <a href="https://kennethli319.github.io/audio-jacobian-lens/?sample=asr-question">Explore the live ASR layers</a>
  <a href="#choose-version">Back to the two descents</a>
</div>

</article>

<article class="version-panel version-panel--technical" id="technical-version" tabindex="-1" aria-labelledby="technical-title" markdown="1">

<a class="version-back" href="#choose-version">← Back to the two descents</a>

## A Technical Descent Through the Audio Jacobian Lens {#technical-title}

*July 2026 · Psycholinguistics, mechanistic interpretability, and speech models*

During my linguistics degree, psycholinguistics taught me to study a system we could not open. Researchers used reaction time, priming, ambiguity, and mistakes to infer the hidden sequence of language processing. I miss that kind of puzzle-solving.

With neural models, we have the opposite problem. We can record almost every activation, but there are too many of them and most do not come with names. It is almost like functional EEG or MEG: we can see something light up, but we still have to work out what the pattern means.

The metaphor I keep returning to is *Inception*. At the surface is the transcript: ordinary words, close to the model's final decision. Descend one level and the same vocabulary begins to look more like associations, hints, and competing possibilities. Go deeper toward the encoder and human words may still appear in the projection, but I no longer think they should always be read literally. A token direction can be a borrowed coordinate. Several directions and their rankings may need to combine before the pattern means an acoustic state, a subword fragment, or an attribute for which we do not have one clean human label.

Metaphorically, the earliest encoder layer is limbo: furthest from the output, hardest to name, and still capable of shaping everything built above it. The [Audio Jacobian Lens](https://github.com/kennethli319/audio-jacobian-lens) is the instrument I am using to descend through those levels. It also lets me ask the causal question I find more interesting: if I find the right anchor and place it at the right layer and time step, will later layers—and later time steps—reorganize around it?

## The instrument

Anthropic's [Jacobian Lens](https://www.anthropic.com/research/global-workspace) fits a first-order map from an intermediate residual state toward a later space that can be read through the vocabulary head. In practical terms, it asks:

> Under this fitted map, which vocabulary directions become readable from here?

I adapted it for Whisper ASR, Chatterbox TTS, and an experimental Apple-silicon MLX path for LFM2.5 Audio. The encoder-to-decoder transport used for Phone Signature is my extension, not a configuration validated by Anthropic's paper.

The original model remains frozen, but the lens and phone prototypes are fitted from data, including automatically aligned speech supervision. This does not make the lens a transcript of hidden thought. It makes it a fitted instrument: the map gives us human-readable coordinates from which we can form and test hypotheses.

Two encoder maps were fitted on non-overlapping examples and evaluated on the same speaker-held-out development set. Their agreement is a consistency check, not an independent-corpus replication.

## The descent

### At the surface: the transcript

The output head is the surface world. Here a vocabulary item means almost exactly what we expect it to mean: the token the model is about to emit. The interesting questions are how early that final object becomes readable and what occupies its place before it does.

### One level down: associations before decisions

In “Where is my brother now?”, the realized token `now` moved through the full vocabulary as follows:

```text
#6,319 → #7,237 → #3 → output-head #1
```

At that output position, `who` appeared near the top early, although Whisper ultimately emitted `now`.

<figure class="note-figure">
  <a href="{{ '/assets/img/audio-jacobian-lens/decoder-timing-now.png' | relative_url }}">
    <img src="{{ '/assets/img/audio-jacobian-lens/decoder-timing-now.png' | relative_url }}" alt="Whisper decoder layer-by-position matrix for Where is my brother now, with now selected. Who is the top early-layer candidate before now becomes top-ranked later." loading="lazy" decoding="async">
  </a>
  <figcaption><strong>Figure 1.</strong> At the position where Whisper eventually emits <code>now</code>, <code>who</code> is the early top candidate before <code>now</code> resolves in later layers. The screenshot uses the explorer's display vocabulary; the full-vocabulary ranks are #6,319 → #7,237 → #3 → #1. <a href="https://kennethli319.github.io/audio-jacobian-lens/?sample=asr-question">Open the interactive report</a>.</figcaption>
</figure>

This makes the decoder look surprisingly language-model-like to me. After `brother`, it surfaces `who`, almost as if the model is following an association—*brother, identity, who*—before the acoustic and linguistic evidence settles on `now`. It is not exactly the same as a psycholinguistic word-association experiment, but the sequence is surprisingly similar, and that similarity gives us experiments to run.

The encoder offers a different kind of clue. Near the end of the same clip, L2 contains an earlier, suggestive `N → AW`-like prototype run, while the decoder eventually resolves to `now`. I would not call this a clean token alignment: the displayed 100 ms cells overlap, the encoder receptive field is nonlocal, and the token timing is model-derived.

But taken together, the two views make me think about two streams meeting at the prediction: language association in the decoder and acoustic evidence in the encoder. A 2×2 experiment can vary acoustic clarity—clear versus ambiguous—and context—supportive versus conflicting—independently. If the acoustic cue is weak, I expect the decoder's language associations to pull harder; if the cue is clear, I expect the encoder evidence to constrain the answer more strongly.

### Deeper down: vocabulary becomes a borrowed coordinate system

The further I descend from the output, the less useful it becomes to ask, “Which word is the model thinking about?” The lens still reports vocabulary directions because vocabulary is the human coordinate system available to it. But at encoder depth, a direction named by a word does not have to carry that word's surface meaning.

It may be one projection of an acoustic or subword state. Several directions, their relative strengths, and their order across time may have to be read together—more like a constellation than a label. In the *Inception* framing, recognizable objects still appear in the lower levels, but the rules connecting object and meaning have changed.

### Encoder limbo: the Phone Signature

The **Phone Signature view** is my first attempt to read that deeper space without pretending its brightest human label is the whole answer. It compares the distributed pattern across the top 100 vocabulary-aligned coordinates with frozen phone prototypes.

The preliminary speaker-held-out results are:

- Phone information decoded directly from the encoder residual states rises to about **91% macro-F1 at L3**.
- At L2, using only the highest J-lens coordinate gives about **63.5% phone macro-F1**.
- Using the distributed top-100 signature raises this to about **81% across two separately fitted maps**.
- The distributed result stays near **80% on strict unseen-word examples** and reaches roughly **90–92% in matched cross-speaker, cross-word ABX tests**, above spectrum-matched random transports.

To me, the important observation is compositional: the distributed pattern carries much more recoverable phone information than its brightest coordinate. One interpretation is that human vocabulary directions are being borrowed to describe something more acoustic and less literal. Other interpretations remain possible—the supervised alignment and prototypes may contribute structure—which is why the next experiments should test reconstruction, transfer, and controlled contrasts rather than settle the meaning by description alone.

These measurements use automatically aligned **native 20 ms states**. The public explorer pools five states into overlapping **100 ms display cells with an 80 ms hop**. Those cells aid visualization but are not phone boundaries, probabilities, or a separately validated classifier.

<figure class="note-figure">
  <a href="{{ '/assets/img/audio-jacobian-lens/phone-signature-view.png' | relative_url }}">
    <img src="{{ '/assets/img/audio-jacobian-lens/phone-signature-view.png' | relative_url }}" alt="Audio Jacobian Lens Phone Signature view for the buzzer example using 100 millisecond display cells. Encoder L3 from 0.56 to 0.66 seconds is selected, with B as the nearest prototype at cosine similarity 0.565." loading="lazy" decoding="async">
  </a>
  <figcaption><strong>Figure 2.</strong> A time-ordered Phone Signature using 100 ms display cells with an 80 ms hop. In the selected encoder-L3 window (0.56–0.66 s), <code>B</code> is the nearest frozen ARPAbet prototype (cosine 0.565; margin 0.479 over <code>AW</code>). The scores are similarities, and a window may contain multiple phones; it is not a predicted phone boundary. <a href="https://kennethli319.github.io/audio-jacobian-lens/?sample=asr-buzzer">Open the interactive report and switch on Phone Signature view</a>.</figcaption>
</figure>

I use “limbo” conceptually for the furthest descent toward the first encoder layer, not as a claim that these L2/L3 measurements fully explain L1. It names the problem: the further we move from the output, the more the information may be present without having a direct human name.

### Planting an anchor

In *Inception*, reaching a deeper level is not only about observing it. A small object planted there can change what the higher levels build around it. That is also the steering question here: can I place an anchor at one layer and one time step, then let the untouched part of the model carry it forward?

With the ambiguous Laurel/Yanny clip, the unedited model decoded `Lily!` I nudged early encoder states toward a broad Y-prefix direction and away from a La-prefix direction, then allowed the remaining layers to recompute. The output changed to `Yay!`, but never to `Yanny`.

The near miss is useful. It shows that an early edit can propagate into the surface transcript, but it does not yet tell us whether I found a phonetic anchor, shifted a language prior, or simply disturbed the computation. The steering direction was separate from the Phone Signature prototypes. The experiment now is to find which anchors are stable: at what layer, at what time, at what dose, and against which controlled alternatives.

### Propagation beyond ASR

The same layer-and-time question appears in TTS. In one recorded Chatterbox replay, a **0.002×-relative-norm** residual edit at L20 + L22 changed the speech-head winner from code `4106` to `4358`, followed by **43 changed downstream codes**.

<figure class="note-figure">
  <a href="{{ '/assets/img/audio-jacobian-lens/tts-residual-steering.png' | relative_url }}">
    <img src="{{ '/assets/img/audio-jacobian-lens/tts-residual-steering.png' | relative_url }}" alt="Recorded Chatterbox TTS causal replay showing a small L20 plus L22 residual edit changing the actual speech-head winner from acoustic code 4106 to 4358 and changing 43 downstream codes." loading="lazy" decoding="async">
  </a>
  <figcaption><strong>Figure 3.</strong> A recorded Chatterbox causal replay. A 0.002×-relative-norm edit at L20 + L22 changes the speech-head winner from acoustic code 4106 to 4358, followed by 43 changed downstream codes. This demonstrates propagation through the autoregressive suffix; it does not give acoustic-code IDs word or phone meaning, or establish waveform attribution. <a href="https://kennethli319.github.io/audio-jacobian-lens/tts/?sample=tts-bridge-s9">Open the interactive TTS report</a>.</figcaption>
</figure>

The edit reached the future, but the code IDs do not yet tell us what acoustic object changed. Repeated clips, matched perturbations, and waveform-level evaluation are needed to tell meaningful control from ordinary autoregressive sensitivity. The MLX path for LFM2.5 Audio also runs end to end, but it remains a one-clip integration pilot.

## Experiments that could test the metaphor

### 1. Acoustics × context

Cross clear versus ambiguous audio with supportive versus conflicting linguistic context. This would test whether the relative influence of encoder acoustic evidence and decoder language association changes as the cue becomes easier or harder to hear.

### 2. Reconstruct the surface from limbo

Hide the audio and transcript, show only the ordered Phone Signature sequence, and ask a phonetician or capable language model to reconstruct the words. Compare with shuffled sequences, matched random maps, unseen speakers and words, and a text-only baseline that measures how much reconstruction comes from language priors.

If people can mostly guess the word sequence from late encoder Phone Signatures without hearing the audio, that would be a practical test of how close the view comes to the acoustic-linguistic information used by the decoder.

### 3. Find the anchor by depth and time

Run interventions across a grid of layer × time × dose. Compare the intended direction with opposite, orthogonal, norm-matched random, and off-time controls. Measure not only whether the target changes, but also downstream damage and how long the effect persists into later time steps.

### 4. Test whether the combination has meaning

Hold the top coordinate fixed while perturbing the rest of the signature, then preserve the distributed neighborhood while changing rank 1. If the constellation matters, behavior should follow the combination more than the brightest label.

### 5. Reuse psycholinguistic paradigms inside the model

Priming, ambiguity, phonetic competition, and adaptation already give us controlled ways to separate possible explanations of human language behavior. Here we can use similar designs to locate the association sequence, perturb it, and see whether the later computation changes as predicted.

## How I am reading it now

I do not think the most useful question is whether a token at an early layer is secretly a word. The useful question is what combination it participates in, when that combination becomes stable, and what changes if we touch it.

That is why the *Inception* metaphor works for me. Later computation depends on what earlier layers pass forward, although the encoder and decoder are not one simple stack. The objects also do not keep the same meaning as we descend. If we can learn where a linguistic association or acoustic sequence appears—and find the right anchor at the right layer and time—we may be able to debug or adapt a trained model without asking for a new dataset and retraining the whole system each time.

That is still a hypothesis. But unlike the human brain, this descent can be replayed, perturbed, and tested.

## Explore the project

- [ASR / Whisper explorer](https://kennethli319.github.io/audio-jacobian-lens/?sample=asr-question)
- [Speech-to-speech / LFM2.5 Audio explorer](https://kennethli319.github.io/audio-jacobian-lens/speech/?sample=speech-question)
- [TTS / Chatterbox explorer](https://kennethli319.github.io/audio-jacobian-lens/tts/?sample=tts-bridge-s9)
- [Audio Jacobian Lens code and local Apple-silicon MLX setup](https://github.com/kennethli319/audio-jacobian-lens)
- [Anthropic's original Global Workspace research](https://www.anthropic.com/research/global-workspace)

If you work in speech, interpretability, phonetics, or cognitive science: **what experiment would convince you that an internal direction is more than a readable projection—and is instead a useful anchor for the model's own computation?**

<div class="version-panel-nav">
  <a href="#metaphorical-version">Read the metaphorical descent</a>
  <a href="#choose-version">Back to the two descents</a>
</div>

</article>
