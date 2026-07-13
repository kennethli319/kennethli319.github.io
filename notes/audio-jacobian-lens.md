---
layout: default
title: "Inception into J-Space"
description: "A layer-by-layer descent through a speech model: from readable words to nonliteral acoustic representations, and from inspection to steering."
image: https://kennethli319.github.io/assets/img/audio-jacobian-lens/inception-into-j-space-hand-drawn.jpg
permalink: /notes/audio-jacobian-lens/
---

[Back to Notes]({{ '/notes.html' | relative_url }})

# Inception into J-Space

<p class="note-deck">A descent through a speech model—from readable words at the surface to distributed acoustic patterns below, and what happened when I tried planting an anchor · July 2026 · about 7 minutes</p>

<hr class="note-deck-separator">

I have been using the [Audio Jacobian Lens](https://github.com/kennethli319/audio-jacobian-lens), adapted from [Anthropic's Jacobian Lens](https://www.anthropic.com/research/global-workspace), to inspect Whisper layer by layer.

The more I use it, the more I keep thinking about *Inception*.

In the movie, you enter one dream, then another inside it, and then another. Near the surface, things still look familiar. Deeper down, an object can become a projection, several objects can express something none means alone, and one small anchor can reorganize the levels above it.

Three things keep pulling me deeper: a word association that appears before the answer settles, a phonetic pattern that only becomes readable as a constellation, and an anchor that changes what returns to the surface.

<figure class="note-figure note-figure--illustration">
  <a href="{{ '/assets/img/audio-jacobian-lens/inception-into-j-space-hand-drawn.jpg' | relative_url }}">
    <img src="{{ '/assets/img/audio-jacobian-lens/inception-into-j-space-hand-drawn.jpg' | relative_url }}" alt="Editorial illustration of four computational levels: readable speech tiles at the surface, projected objects below, distributed acoustic constellations deeper down, and a glowing anchor in the lowest level sending a signal upward." loading="lazy" decoding="async">
  </a>
  <figcaption><strong>Metaphorical illustration.</strong> Near the surface, language is readable. Deeper down, familiar labels may be projections of distributed patterns. An anchor placed below can change what returns to the surface.</figcaption>
</figure>

In plain terms, the lens asks: **which output-vocabulary directions become readable from an intermediate state?** It turns an unnamed activation into clues that I can compare across layers, time, and interventions.

This brings me back to psycholinguistics. We used reaction time, priming, ambiguity, and mistakes to infer language processes we could not inspect directly. Models give us the opposite puzzle: nearly every activation is accessible, but there are too many, and most have no name. The challenge is finding a readable experiment inside all that access.

## At the surface, `now`. One layer down, `who`.

I played Whisper an audio recording in which the speaker asks:

> Where is my brother now?

The final word is `now`, but its full-vocabulary rank moves through the decoder like this:

```text
#6,319 → #7,237 → #3 → #1
```

At the first plotted decoder layer, `who` is already the Explorer's top displayed candidate—#4 across the full vocabulary, then #1 at the next layer—while `now` is still thousands of places down the list.

<figure class="note-figure note-explorer">
  <iframe class="note-explorer__frame" src="{{ '/audio-jacobian-lens/' | relative_url }}?sample=asr-question&amp;embed=article&amp;panel=decoder&amp;kind=decoder&amp;layer=0&amp;position=4" title="Interactive cached Whisper Explorer focused on decoder layer 0 at the token now" aria-describedby="decoder-now-caption" loading="lazy" referrerpolicy="strict-origin-when-cross-origin"></iframe>
  <figcaption id="decoder-now-caption"><strong>Figure 1 — The answer takes layers to settle.</strong> The large L0 label is the top displayed candidate; the smaller line tracks the realized token <code>now</code>. Select another cell to inspect its saved candidates, or <a href="https://kennethli319.github.io/audio-jacobian-lens/?sample=asr-question">open the full example</a>.</figcaption>
</figure>

To me, `brother → who` looks like the decoder using a familiar word association as a hint before the answer settles. The resemblance to psycholinguistic association is what makes it interesting—and sends me farther from the language-model head, into the encoder.

## Deeper down, words stop behaving like words

The encoder works with short acoustic states. One position does not have to map neatly onto a complete word, so reading only its highest-ranked token may be the wrong approach.

The lens still shows vocabulary-aligned directions because vocabulary is a coordinate system humans can read. But perhaps the better question is not, “Which word does this token mean?” It is: **how do familiar directions combine across rank, layer, and time to preserve acoustic information that no single word can express?**

I imagine a spy using an ordinary Bible as a codebook. The words are familiar, but their combination carries another meaning. Rank 1 is one printed word; the distributed pattern is closer to the coded sentence. The fitted lens supplies this vocabulary alphabet—I am not claiming that Whisper literally stores secret token sentences—but it gives us a way to test the pattern.

That is why I built the **Phone Signature view**. Instead of trusting only the brightest coordinate, it compares the distributed top-100 J-space pattern with fitted ARPAbet phone prototypes.

At encoder L2, the difference is substantial. I fitted two maps on non-overlapping examples and evaluated both on the same speaker-held-out development set:

| L2 phone readout | Map A | Map B |
| --- | ---: | ---: |
| Brightest coordinate only | 63.5% | 63.6% |
| Distributed top 100 | 81.1% | 80.5% |
| Top 100, strict unseen words | 79.8% | 79.6% |

The constellation carries much more recoverable phone information than its brightest human-readable label.

<figure class="note-figure note-explorer">
  <iframe class="note-explorer__frame" src="{{ '/audio-jacobian-lens/' | relative_url }}?sample=asr-question&amp;embed=article&amp;panel=encoder&amp;phone=1&amp;kind=encoder&amp;layer=2&amp;position=18" title="Interactive cached Phone Signature Explorer focused on the N then AW region of Where is my brother now" aria-describedby="phone-signature-caption" loading="lazy" referrerpolicy="strict-origin-when-cross-origin"></iframe>
  <figcaption id="phone-signature-caption"><strong>Figure 2 — An N-like cell followed by AW-like cells.</strong> The view pools native 20 ms states into overlapping 100 ms cells. The selected L2 window is nearest to <code>N</code>; the following windows are nearest to <code>AW</code>. These similarities are not probabilities or phone boundaries. <a href="https://kennethli319.github.io/audio-jacobian-lens/?sample=asr-question&amp;phone=1&amp;kind=encoder&amp;layer=2&amp;position=18">Open the full Phone Signature sequence</a>.</figcaption>
</figure>

In the same question, encoder L2 shows an `N → AW`-like run shortly before Whisper's model-derived interval for `now`. Put beside `brother → who`, this suggests a useful experiment: cross clear versus ambiguous audio with supportive versus conflicting context, then watch where the balance between acoustic evidence and language association changes.

This is the model's limbo in my metaphor: familiar language is still visible, but it may be a projection doing a different job at that depth.

## Planting an anchor

At this point, Phone Signature starts to feel like functional imaging for a speech model. Present a linguistic event and observe the distributed pattern associated with it. The difference is that the model is open to intervention: a fitted signature can become a candidate target, pulled back into residual space and placed at a chosen layer and time.

**Functional imaging shows me the pattern. *Inception* asks what happens if I plant it at the right depth.**

I tested this on exact **Audio S7** from Hans Rutger Bosker's [Laurel/Yanny demo](https://hrbosker.github.io/demos/laurel-yanny/), republished unchanged under the page's [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) notice. [Bosker (2018)](https://doi.org/10.1121/1.5070144) traces the underlying viral clip to Vocabulary.com; the J-lens overlays, model outputs, and controls are my additions. The complete recorded experiment is in the [full Laurel/Yanny ASR replay]({{ '/audio-jacobian-lens/?sample=asr-laurel-yanny' | relative_url }}).

Without intervention, Whisper transcribed the clip as `Lily!`. My first coarse anchor pushed early encoder states toward a broad Y-prefix family and produced `Yay!`: the intervention propagated, but the target was too vague.

Then I used the fitted Phone Signature itself. I pulled the target sequence `Y → AE → N → IY` back into Whisper's encoder residual space, placed it across the active part of the recording at encoder L0–L3, and let the untouched remainder of the model recompute.

At a **3.5% aggregate edited-residual norm**, ordinary greedy generation returned `Yanny!`. I did not force a token, edit a decoder state or final logit, or change a model weight. Both real tokenizer pieces—` Y` and conditional `anny`—became rank #1.

The recipe also produced `Yanny!` with a second phone map fitted on disjoint examples, and a fresh CPU run matched the Apple-silicon run. None of ten exact-norm random residual schedules produced Yanny: nine stayed `Lily!`, and one became `Yelly!`.

A separately optimized anchor also produced `Laurel`, but it required a much larger edit and did not transfer cleanly to the second fitted map. I treat Yanny as the stronger result and Laurel as a clip-specific route.

<figure class="note-figure" aria-labelledby="phone-steering-caption">
  <table>
    <thead>
      <tr><th scope="col">Recorded condition</th><th scope="col">Free output</th><th scope="col">Target readout</th><th scope="col">Evidence status</th></tr>
    </thead>
    <tbody>
      <tr><td>Baseline</td><td><code>Lily!</code></td><td><code>Y</code> #3; <code>anny | Y</code> #42; <code>Laurel</code> #2,463</td><td>No intervention</td></tr>
      <tr><td>Equal Y / AE / N / IY · 3.5%</td><td><code>Yanny!</code></td><td><code>Y</code> #1; <code>anny | Y</code> #1</td><td>Transferred across fits; 0/10 random controls succeeded</td></tr>
      <tr><td>Optimized L / AO / R / AH / L · 14.53%</td><td><code>Laurel</code></td><td><code>Laurel</code> #1</td><td>Target-conditioned; exact result did not transfer</td></tr>
    </tbody>
  </table>
  <figcaption id="phone-steering-caption"><strong>Figure 3 — Two anchors, two evidence levels.</strong> The controls replay complete recorded model runs. <a href="{{ '/audio-jacobian-lens/?sample=asr-laurel-yanny' | relative_url }}">Open the full layer-by-layer ASR replay</a>.</figcaption>
</figure>

This is a one-recording causal pilot: the phone order and timing were developed on this clip. But it establishes something concrete—a distributed fitted phonetic direction can cross a real decoding boundary without changing weights or forcing output tokens. The next tests are wrong-time and wrong-order anchors, opposite signs, and held-out recordings and models.

## What the lens shows

The Audio Jacobian Lens is a fitted first-order readout; the underlying model remains frozen. Phone Signatures are also fitted from aligned speech, not native phone labels, and the decoder rows come from a teacher-forced trace. The phone scores above are development-set measurements, while Yanny remains a one-clip steering result.

Those boundaries matter, but they do not weaken the main observation. Inspection gives me a candidate pattern; intervention tests whether that pattern can participate in changing the model's behavior. The detailed methods and controls live in the [repository](https://github.com/kennethli319/audio-jacobian-lens).

## Beyond phonemes

The implication may be larger than phonemes.

Speech-to-speech models have to support hesitation, backchanneling, affirmation, turn-taking, and other conversational events even when we do not have clean labels for them. Their representations may already exist as distributed patterns across earlier layers and time, much like Phone Signature.

If we can locate those patterns and validate them causally, perhaps they can become controls for conversational behavior without retraining the entire model on a newly labeled dataset every time. This would not make data disappear—we would still need examples and calibration—but it could shift some adaptation from full retraining toward discovering and testing structure the model already has.

The same question extends to reasoning models. The lens is not a literal transcript of thought, but it lets us inspect which concepts become readable internally and test what happens when we intervene. Concepts related to human interaction may already be present before we know how to name them.

That is why I keep descending. Every pattern that becomes partly readable gives us another experiment—and perhaps another place to plant an anchor before the model returns to the surface.

## Enter the project

**Explore:** [Laurel/Yanny ASR replay](https://kennethli319.github.io/audio-jacobian-lens/?sample=asr-laurel-yanny) · [Whisper / ASR](https://kennethli319.github.io/audio-jacobian-lens/?sample=asr-question) · [Phone Signature](https://kennethli319.github.io/audio-jacobian-lens/?sample=asr-question&phone=1&kind=encoder&layer=2&position=18) · [LFM2.5 Audio](https://kennethli319.github.io/audio-jacobian-lens/speech/?sample=speech-question)

**Build it:** [Audio Jacobian Lens code and local Apple-silicon MLX setup](https://github.com/kennethli319/audio-jacobian-lens) · **Starting point:** [Anthropic's Global Workspace research](https://www.anthropic.com/research/global-workspace)

If you work in speech, interpretability, phonetics, or cognitive science: **which human-interaction concepts are already inside these models—and to what extent can J-space turn them into reliable controls?**
