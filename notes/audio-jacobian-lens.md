---
layout: default
title: "Inception into J-Space"
description: "A layer-by-layer descent through a speech model: from readable words to nonliteral acoustic representations, and from inspection to steering."
image: https://kennethli319.github.io/assets/img/audio-jacobian-lens/inception-into-j-space-hand-drawn.jpg
permalink: /notes/audio-jacobian-lens/
---

[Back to Notes]({{ '/notes.html' | relative_url }})

# Inception into J-Space

<p class="note-deck">What I saw while descending through a speech model—from readable words at the surface to distributed acoustic patterns below, and what happened when I tried planting an anchor · July 2026 · about 9 minutes</p>

I have been using the [Audio Jacobian Lens](https://github.com/kennethli319/audio-jacobian-lens), adapted from [Anthropic's Jacobian Lens](https://www.anthropic.com/research/global-workspace), to look through layer after layer of speech models.

The more I use it, the more I keep thinking about *Inception*.

In the movie, you enter one dream, then another inside it, and then another. The surface still looks familiar. But as you descend, things become less literal. An object can be a projection. Several objects can combine to express something that none of them means alone. And something small, placed deep enough, can reorganize what happens in every level above it.

Three observations keep pulling me back into the model. After `brother`, an early decoder layer surfaces `who` before the final word resolves to `now`. Deeper in the encoder, a distributed pattern carries much more recoverable phone information than its brightest human-readable label. And when I place a small intervention below the surface, its effect can travel through later layers and later time steps.

I do not take these as three conclusions. I take them as three places where the model gives us a better experiment.

<figure class="note-figure note-figure--illustration">
  <a href="{{ '/assets/img/audio-jacobian-lens/inception-into-j-space-hand-drawn.jpg' | relative_url }}">
    <img src="{{ '/assets/img/audio-jacobian-lens/inception-into-j-space-hand-drawn.jpg' | relative_url }}" alt="Editorial illustration of four computational levels: readable speech tiles at the surface, projected objects below, distributed acoustic constellations deeper down, and a glowing anchor in the lowest level sending a signal upward." loading="lazy" decoding="async">
  </a>
  <figcaption><strong>Metaphorical illustration.</strong> Near the surface, language is readable. Deeper down, familiar labels may be projections of distributed patterns. An anchor placed below can change what returns to the surface. This is a map for the questions, not experimental evidence.</figcaption>
</figure>

In plain terms, the lens asks: **which output-vocabulary directions become readable from this intermediate state?** It does not hand me a transcript of hidden thought. It turns an otherwise unnamed activation into clues that I can compare across layers, time, and interventions.

This feels familiar from my linguistics degree. Psycholinguistics taught me to investigate language processes that we could not inspect directly. Researchers used reaction time, priming, ambiguity, and mistakes to infer the hidden sequence underneath. I miss that kind of puzzle-solving.

Models give us almost the opposite problem. We can record nearly every activation, but there are too many of them, and most do not come with names. The challenge is no longer getting access. It is finding a readable experiment inside all that access.

## At the surface, `now`. One layer down, `who`.

I gave Whisper the question:

> Where is my brother now?

At the surface, the result is unsurprising. The final word is `now`.

But when I followed that word through the full vocabulary, its rank moved like this:

```text
#6,319 → #7,237 → #3 → #1
```

At the first plotted decoder layer, the top candidate in the Explorer's lexical display is `who`; across Whisper's full vocabulary it is #4 there, then #1 at the next layer. Meanwhile, `now` is still #6,319, falls to #7,237, then suddenly rises to #3 and finally #1 at the output head.

<figure class="note-figure note-explorer">
  <iframe class="note-explorer__frame" src="{{ '/audio-jacobian-lens/' | relative_url }}?sample=asr-question&amp;embed=article&amp;panel=decoder&amp;kind=decoder&amp;layer=0&amp;position=4" title="Interactive cached Whisper Explorer focused on decoder layer 0 at the token now" aria-describedby="decoder-now-caption" loading="lazy" referrerpolicy="strict-origin-when-cross-origin"></iframe>
  <figcaption id="decoder-now-caption"><strong>Figure 1 — The answer takes layers to settle.</strong> The large L0 label is the top displayed candidate; the smaller line tracks the realized token <code>now</code>. Select another cell to inspect its saved candidate details, or <a href="https://kennethli319.github.io/audio-jacobian-lens/?sample=asr-question">open the full example</a>.</figcaption>
</figure>

My current reading is that the decoder is acting very much like a language model. After `brother`, it follows an association toward identity: *brother → who*. It is almost as if that association gives the model a hint about what kind of information might come next.

This reminds me of word association in psycholinguistics. I am not saying that the mechanism is exactly the same, but the shape is surprisingly similar.

Then the encoder supplies another part of the puzzle. In the same clip, encoder L2 contains a suggestive `N → AW`-like run: an N-like cell at 1.44–1.54 seconds, followed by AW-like cells from roughly 1.52–1.78 seconds. This comes shortly before Whisper's model-derived interval for `now`, around 1.88–2.02 seconds.

I do not read that as a neatly aligned phonetic spelling of the word. The encoder is bidirectional, its states are nonlocal, the display windows overlap, and the timing comes from Whisper's own alignment. I read it as possible acoustic evidence relevant to the answer.

Put beside `brother → who`, it suggests a two-stream experiment: language association pulling from context and acoustic evidence constraining it from the encoder. One clip does not establish two independent streams or tell us their weights. But it tells us what to manipulate next.

My guess is that when the sound is ambiguous, context will pull harder; when the cue is clear, acoustic evidence will constrain the answer more strongly. The experiment is to cross clear versus ambiguous audio with supportive versus conflicting linguistic context, then watch where and when the balance changes.

## Deeper down, words stop behaving like words

The decoder is already close to language output. The encoder is still working with sound.

As I descend into its earlier layers, it becomes less useful to ask, “Which word is the model thinking about?” The lens still gives me vocabulary-aligned directions because vocabulary is a coordinate system that humans can read. But a token direction deep in the encoder does not have to carry that token's ordinary surface meaning.

One direction might mark an acoustic attribute. Another might be one piece of a subword state. Several directions, their rankings, and the way they move across time may need to combine before the representation becomes useful.

That is why I added the **Phone Signature view**. Instead of trusting only the brightest vocabulary coordinate, it compares the distributed top-100 J-space pattern with separately fitted ARPAbet phone prototypes.

The result I keep returning to is the gap between the brightest coordinate and the constellation around it. At encoder L2, I fitted two maps on non-overlapping examples and evaluated both on the same speaker-held-out development set:

| L2 phone readout | Map A | Map B |
| --- | ---: | ---: |
| Brightest coordinate only | 63.5% | 63.6% |
| Distributed top 100 | 81.1% | 80.5% |
| Top 100, strict unseen words | 79.8% | 79.6% |

A direct residual probe reaches **91.0% macro-F1 at L3**. In matched cross-speaker, cross-word ABX tests, the fitted J-signatures reach about **91.5% at L2 and 90–91% at L3**. They organize the sparse top tail better than five singular-spectrum-matched random transports, especially at L2 and L3—but those random maps remain quite decodable, so they are not chance baselines.

<figure class="note-figure note-explorer">
  <iframe class="note-explorer__frame" src="{{ '/audio-jacobian-lens/' | relative_url }}?sample=asr-question&amp;embed=article&amp;panel=encoder&amp;phone=1&amp;kind=encoder&amp;layer=2&amp;position=18" title="Interactive cached Phone Signature Explorer focused on the N then AW region of Where is my brother now" aria-describedby="phone-signature-caption" loading="lazy" referrerpolicy="strict-origin-when-cross-origin"></iframe>
  <figcaption id="phone-signature-caption"><strong>Figure 2 — An N-like cell followed by AW-like cells.</strong> The selected L2 window (1.44–1.54 s) is nearest to <code>N</code>; its following windows are nearest to <code>AW</code>. These overlapping similarities are not probabilities or phone boundaries. <a href="https://kennethli319.github.io/audio-jacobian-lens/?sample=asr-question&amp;phone=1&amp;kind=encoder&amp;layer=2&amp;position=18">Open the full Phone Signature sequence</a>.</figcaption>
</figure>

The observation I care about is not simply that phone identity can be decoded. It is that the combination carries substantially more recoverable phone information than its single brightest human-readable label.

Maybe these vocabulary directions, through the fitted projection, are being borrowed to describe something more acoustic and less literal. Maybe the supervised phone map contributes part of that structure. Maybe another explanation fits better. Instead of choosing one interpretation now, I want experiments that force them apart.

One experiment is to hide the original audio and transcript, then give only the ordered Phone Signature sequence to a phonetician or a capable language model. Could they reconstruct most of the words without hearing the audio? What survives if I shuffle the sequence, replace the map with a matched random one, or use unseen speakers and words? A text-only baseline could show how much reconstruction comes from language priors rather than the acoustic pattern.

Another experiment is to hold the brightest coordinate fixed while changing the rest of the constellation, then do the reverse. If the combination carries the useful information, behavior should follow that pattern more than rank 1 alone.

This is the model's limbo in my metaphor: familiar language is still visible, but it may be a projection doing a different job at that depth.

## Planting an anchor

Descending is only half of *Inception*. The more interesting question is whether something placed at one depth can change what the higher levels eventually construct.

I tried this with the ambiguous Laurel/Yanny recording.

Without intervention, Whisper transcribed it as `Lily!` I then nudged early encoder states toward a broad Y-prefix direction and away from a La-prefix direction, and let the rest of the frozen model recompute.

The output became `Yay!`

Not `Yanny`. `Yay`.

I did not boost `Yanny` at the final language-model head. The intervention happened earlier, and the model chose the surface word that followed from it.

My current interpretation is modest: the anchor caught somewhere, but the model interpreted it in its own way. The edit may have shifted a phonetic direction, changed a language prior, or simply disturbed the computation. The direction used broad token-prefix groups, not phoneme classes; `Yanny` itself splits into ` Y` + `anny`. Only one matched random seed is archived per condition, and some random controls also move the candidate contrast, so this is not yet direction-specific semantic control.

But it is also not nothing. A small edit placed below the surface changed what appeared at the surface.

A separate recorded Chatterbox TTS replay showed the temporal side of the same question. For “A bright red train crossed the narrow bridge,” a roughly **0.002×-relative-norm residual edit at L20 + L22** changed the actual speech-head winner at S9 from acoustic code `4106` to the previous #2 candidate, `4358`. After that first change, **43 downstream codes** also changed.

<figure class="note-figure note-explorer">
  <iframe class="note-explorer__frame" src="{{ '/audio-jacobian-lens/tts/' | relative_url }}?sample=tts-bridge-s9&amp;embed=article&amp;panel=tts&amp;kind=tts-head&amp;layer=0&amp;position=8" title="Interactive cached Chatterbox TTS Explorer focused on the residual intervention at speech-code position S9" aria-describedby="tts-steering-caption" loading="lazy" referrerpolicy="strict-origin-when-cross-origin"></iframe>
  <figcaption id="tts-steering-caption"><strong>Figure 3 — An anchor reaching later time steps.</strong> The recorded edit changes S9 from code <code>4106</code> to <code>4358</code>, followed by 43 changed downstream codes. Select another saved position or <a href="https://kennethli319.github.io/audio-jacobian-lens/tts/?sample=tts-bridge-s9">open the full TTS replay</a>.</figcaption>
</figure>

This tells me that an intervention can propagate through an autoregressive suffix. It does not tell me what those code IDs mean, whether the change survives at the waveform level, or whether the effect is useful rather than ordinary autoregressive sensitivity. The edit used a context-specific gradient-proposed direction, not a direction learned by the fitted J-lens; the code IDs are learned acoustic symbols, not published words or phonemes.

So the next question is not simply, “Can I make the output change?”

It is: **Which anchor, at which layer, at which time, and at which strength produces a repeatable and selective change?**

Then I want the matched controls: the opposite direction, an orthogonal direction, a random direction with the same norm, and the same anchor at the wrong layer or time. I want repeated clips, waveform-level evaluation, and measurements of what persists, what breaks, and how much downstream behavior changes along with the intended effect.

If the intervention follows the predicted layer, timing, and direction while surviving those controls, then we may have found a real knob rather than ordinary model sensitivity.

## How to read the evidence

The Audio Jacobian Lens is a fitted instrument. It uses a first-order map from an intermediate residual state toward a later space that can be read through the vocabulary head. The underlying model stays frozen, but the lens and the 34-phone ARPAbet prototypes are fitted from data, including automatically aligned speech supervision.

The encoder-to-decoder transport behind Phone Signature is my speech-specific extension, not a setup already validated in Anthropic's paper. The two encoder maps above were fitted on disjoint examples but evaluated on the same development set. Their agreement is a fit-sensitivity check, not an independent-corpus replication. The locked test split has not been evaluated.

The phone measurements use native **20 ms encoder states**. The public Explorer pools five states into overlapping **100 ms display cells with an 80 ms hop** so that a human can read the sequence. Neighboring cells share one state. The alignments are automatic, the cells are not phone boundaries, and similarity or decodability does not establish causal use. Only five matched random transports were tested, and the fitted-over-random advantage is not reliable at every encoder layer.

The decoder rows are fitted readouts from a teacher-forced trace. The HEAD row is the model's raw teacher-forced distribution before Whisper's generation-time suppression and timestamp rules. A readable vocabulary direction is evidence about the fitted projection, not proof that the model stored or consciously selected that word.

The experimental MLX path for LFM2.5 Audio runs end to end on Apple silicon, but it remains a one-clip integration pilot. It does not yet explain the model's FastConformer, audio adapter, codebooks, or played waveform.

In other words, the lens gives me a place to observe patterns, form hypotheses, and design interventions that can prove those hypotheses wrong.

## Returning to the surface

Right now, I think the work gives us three observations:

1. At the step after `brother`, the decoder surfaces a `who`-shaped association before the output resolves to `now`, while an N → AW-like acoustic pattern is also readable in the encoder.
2. Distributed vocabulary-aligned patterns in the encoder carry considerably more recoverable phone information than the brightest coordinate alone.
3. Small edits at intermediate states can change later layers and later time steps, although repeatable, selective semantic control has not been established.

Each observation allows more than one interpretation. That is the interesting part.

The old psycholinguistic experiments—priming, ambiguity, phonetic competition, adaptation—may give us a library of questions to bring into the model. The difference is that now we can do more than observe the final behavior and work backward. We can try to locate an association, touch it, and see whether the remaining computation reorganizes in the way we predicted.

If stable anchors exist, perhaps they could eventually help us debug, adapt, or customize a trained model without collecting another dataset and retraining the whole system for every deployment.

But first we need to learn which knobs are real, what they control, and what else they disturb.

I think that is why I keep descending.

The deeper layers are harder to name. But every time a pattern becomes partly readable, it gives us another experiment—and perhaps another place to plant an anchor before the model returns to the surface.

## Enter the project

**Explore:** [Whisper / ASR](https://kennethli319.github.io/audio-jacobian-lens/?sample=asr-question) · [Phone Signature](https://kennethli319.github.io/audio-jacobian-lens/?sample=asr-question&phone=1&kind=encoder&layer=2&position=18) · [LFM2.5 Audio](https://kennethli319.github.io/audio-jacobian-lens/speech/?sample=speech-question) · [Chatterbox TTS](https://kennethli319.github.io/audio-jacobian-lens/tts/?sample=tts-bridge-s9)

**Build it:** [Audio Jacobian Lens code and local Apple-silicon MLX setup](https://github.com/kennethli319/audio-jacobian-lens) · **Starting point:** [Anthropic's Global Workspace research](https://www.anthropic.com/research/global-workspace)

If you work in speech, interpretability, phonetics, or cognitive science: **what experiment would convince you that an internal direction is more than a readable projection—and is instead a useful anchor for the model's own computation?**
