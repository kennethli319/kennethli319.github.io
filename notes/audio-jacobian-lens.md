---
layout: default
title: "Inception into J-Space"
description: "A layer-by-layer descent through a speech model: from readable words to nonliteral acoustic representations, and from inspection to steering."
image: https://kennethli319.github.io/assets/img/audio-jacobian-lens/inception-into-j-space-hand-drawn.jpg
permalink: /notes/audio-jacobian-lens/
---

[Back to Notes]({{ '/notes.html' | relative_url }})

# Inception into J-Space

<p class="note-deck">What I saw while descending through a speech model—from readable words at the surface to distributed acoustic patterns below, and what happened when I tried planting an anchor · July 2026 · about 11 minutes</p>

<hr class="note-deck-separator">

I have been using the [Audio Jacobian Lens](https://github.com/kennethli319/audio-jacobian-lens), adapted from [Anthropic's Jacobian Lens](https://www.anthropic.com/research/global-workspace), to look through layer after layer of speech models.

The more I use it, the more I keep thinking about *Inception*.

In the movie, you enter one dream, then another inside it, and then another. The surface still looks familiar. But as you descend, things become less literal. An object can be a projection. Several objects can combine to express something that none of them means alone. And something small, placed deep enough, can reorganize what happens in every level above it.

Three observations keep pulling me back into the model. Near the output, an early decoder layer surfaces `who` after `brother`, before the final word resolves to `now`. Deeper down—away from the language-model head and into the encoder—a distributed pattern carries much more recoverable phone information than its brightest human-readable label. And when I place a small intervention below the surface, its effect can travel through later layers and later time steps.

I do not treat these as conclusions. I treat each as a clue for designing the next, sharper experiment.

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

I played Whisper an audio recording in which the speaker asks:

> Where is my brother now?

At the surface, the result is unsurprising. The final word is `now`.

But when I followed that word through the full vocabulary, its rank moved like this:

```text
#6,319 → #7,237 → #3 → #1
```

At the first plotted decoder layer, the Explorer's top displayed candidate is `who`; across Whisper's full vocabulary it is #4 there, then #1 at the next layer. While `now` is still thousands of places down the list, `who` has already surfaced.

<figure class="note-figure note-explorer">
  <iframe class="note-explorer__frame" src="{{ '/audio-jacobian-lens/' | relative_url }}?sample=asr-question&amp;embed=article&amp;panel=decoder&amp;kind=decoder&amp;layer=0&amp;position=4" title="Interactive cached Whisper Explorer focused on decoder layer 0 at the token now" aria-describedby="decoder-now-caption" loading="lazy" referrerpolicy="strict-origin-when-cross-origin"></iframe>
  <figcaption id="decoder-now-caption"><strong>Figure 1 — The answer takes layers to settle.</strong> The large L0 label is the top displayed candidate; the smaller line tracks the realized token <code>now</code>. Select another cell to inspect its saved candidate details, or <a href="https://kennethli319.github.io/audio-jacobian-lens/?sample=asr-question">open the full example</a>.</figcaption>
</figure>

My current reading is that the decoder is behaving much like a language model following a word association. After `brother`, it searches in the direction of identity: *brother → who*. That association may act as a hint about what kind of information should come next.

This reminds me of word-association experiments in psycholinguistics. I am not claiming that the underlying mechanisms are identical, but the shape is surprisingly similar: an association appears before the final answer settles.

This is what I can see near the language-model head, where the directions still look like ordinary words. To ask what the sound itself contributes, I have to descend farther—away from the output head and into the encoder.

## Deeper down, words stop behaving like words

Here, “deeper” does not only mean an earlier decoder layer. It means moving away from the language-model head and eventually into the encoder, where the model is organizing sound before the decoder turns it into words.

The deeper I go, the less useful it becomes to ask, “Which word is the model thinking about?” The lens still gives me vocabulary-aligned directions because vocabulary is a coordinate system that humans can read. But a token direction deep in the encoder does not have to carry that token's ordinary surface meaning.

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

It reminds me of a spy forced to use an ordinary Bible as a codebook. The words are familiar, but the message is not their surface story. One word can stand for an acoustic attribute; several references together can encode something that none of them says alone. In this metaphor, rank 1 is only one printed word; the full Phone Signature is closer to the coded sentence.

The model is not trying to hide anything. It can only build with the representational tools available to it. Through the fitted lens, familiar vocabulary directions become one such alphabet: their identities, rankings, and movement across time can combine to mark information for which no single human token exists.

The fitted lens is also what places the encoder into these vocabulary-aligned coordinates. So I cannot conclude that Whisper literally stores a secret sentence in tokens. The experiment is to separate structure the model actually reuses from structure the fitted map merely makes readable.

The same spoken question gives one concrete place to look. In encoder L2, the Phone Signature contains a suggestive `N → AW`-like run: an N-like cell at 1.44–1.54 seconds, followed by AW-like cells from roughly 1.52–1.78 seconds. This comes shortly before Whisper's model-derived interval for `now`, around 1.88–2.02 seconds.

I do not read that as a neatly aligned phonetic spelling of the word. The encoder is bidirectional, its states are nonlocal, the display windows overlap, and the timing comes from Whisper's own alignment. I read it as possible acoustic evidence relevant to the answer.

Put beside the decoder's `brother → who` association, it suggests a two-stream experiment: language context pulling toward one continuation while acoustic evidence constrains it from the encoder. One recording does not establish two independent streams or tell us their weights. But it tells us what to manipulate next.

My guess is that when the sound is ambiguous, context will pull harder; when the cue is clear, acoustic evidence will constrain the answer more strongly. The experiment is to cross clear versus ambiguous audio with supportive versus conflicting linguistic context, then watch where and when the balance changes.

One experiment is to hide the original audio and transcript, then give only the ordered Phone Signature sequence to a phonetician or a capable language model. Could they reconstruct most of the words without hearing the audio? What survives if I shuffle the sequence, replace the map with a matched random one, or use unseen speakers and words? A text-only baseline could show how much reconstruction comes from language priors rather than the acoustic pattern.

Another experiment is to hold the brightest coordinate fixed while changing the rest of the constellation, then do the reverse. If the combination carries the useful information, behavior should follow that pattern more than rank 1 alone.

This is the model's limbo in my metaphor: familiar language is still visible, but it may be a projection doing a different job at that depth.

## Planting an anchor

Descending is only half of *Inception*. At this point, the Phone Signature starts to feel like functional imaging for a speech model. I present a linguistic event—a phone, word, ambiguity, or acoustic cue—and look for the distributed activation pattern that repeatedly appears with it. Like an fMRI map, the pattern does not interpret itself: a repeatable signature tells me that information is readable there, not yet that the model uses that pattern to produce its behavior.

The steering experiment is closer to stimulation. If examples of another event produce a reliable fitted signature, that signature gives me a candidate target. I can pull it back through the fitted lens into the model's residual space, nudge the current state toward it, and let later layers and later time steps recompute. I am not forcing the final word. I am testing what the model builds around an anchor placed below the surface.

So inspection and intervention become two halves of the same experiment. **Functional imaging shows me the pattern. *Inception* asks what happens if I plant it at the right depth.** A selective edit that survives matched controls begins to tell me whether that pattern participates in causing what returns to the surface.

I tried this with exact **Audio S7** from Hans Rutger Bosker's [Laurel or Yanny?
demo](https://hrbosker.github.io/demos/laurel-yanny/), republished here unchanged
using the demo page's [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)
notice. See [Bosker
(2018)](https://doi.org/10.1121/1.5070144) for the experiment behind the demo.
Bosker describes the underlying viral clip as originating from Vocabulary.com;
that is source history reported by Bosker, not a separate permission claim. The
J-lens overlays, cached model outputs, and controls below are my additions.

The primary hands-on view is the [full Laurel/Yanny ASR
Explorer]({{ '/audio-jacobian-lens/?sample=asr-laurel-yanny' | relative_url }}).
Its Original, Yanny, and Laurel buttons swap complete recorded encoder, decoder,
and HEAD matrices while keeping the selected audio/token coordinate synchronized.
The [checkpoint replay]({{ '/audio-jacobian-lens/steering/' | relative_url }})
is the more detailed view of timing, edit budgets, target ranks, and controls.

Without intervention, Whisper transcribed it as `Lily!`. My first anchor nudged early encoder states toward a broad Y-prefix direction and away from a La-prefix direction. The result became `Yay!`, not `Yanny`.

That first attempt showed propagation, but not precise control. A vocabulary-prefix family contains many possible words, and Whisper represents `Yanny` as two real tokenizer pieces: ` Y` followed by `anny`. Winning the first decision does not guarantee the second.

Then I changed what the anchor was made of.

Instead of steering through text-token families, I used the fitted Phone Signature itself. I differentiated each complete target-versus-other phone-prototype readout through the matching centered encoder lens, Whisper's final decoder normalization, and output head. That pullback gives a proposed direction in the model's 384-dimensional encoder residual space. I then placed the sequence `Y → AE → N → IY` across the active 0.08–0.68 seconds of the recording, applied the same strength at encoder L0–L3, and let the untouched remainder of the encoder, decoder, and output head recompute normally.

At a **3.5% aggregate edited-residual norm**, ordinary greedy generation returned `Yanny!`. No token was forced, no decoder state or language-model-head logit was edited, and no model weights changed.

The two real tokenizer decisions show what changed. At baseline, ` Y` was rank #3 at 12.33%, while conditional `anny` was rank #42 at 0.266%. After steering, both were rank #1, at 51.60% and 7.37%. Their joint two-piece path rose from 0.0328% to 3.803%: about **116 times larger**.

The boundary was sharp. A 3.18842% run still produced `Yelly!`; a 3.18848% run produced `Yanny!` I use 3.5% for the demonstration because it gives the second piece a clearer margin.

I froze that equal-strength recipe before checking it again. Replacing the fitted phone map with a second map trained on disjoint examples—without retuning the timing, layers, or strength—still produced `Yanny!` A fresh CPU run matched the Apple-silicon run. None of ten random residual schedules at the same coordinates and exact norm produced Yanny: nine remained `Lily!`, one became `Yelly!`, and conditional `anny` remained between ranks #38 and #55 across all ten.

The opposite route exists too, but the evidence is not symmetrical. A `L → AO → R → AH → L` phone-basis schedule can make ordinary generation return `Laurel`. At the recommended recorded point, ` Laurel` moves from rank #2,463 at 0.00109% to rank #1 at 10.60%, using a 14.53% aggregate edit.

For Laurel, however, I optimized 20 nonnegative phone-basis coefficients directly against the desired final token. Three separately optimized random bases failed to generate Laurel even with much larger edits, but the frozen Laurel coefficients did not preserve the exact result when I swapped in the second fitted phone map: the output became `Lori`, with ` Laurel` at rank #10. I therefore read Laurel as a clip-specific existence result. The equal-strength, cross-fit Yanny result is the cleaner causal pilot.

<figure class="note-figure" aria-labelledby="phone-steering-caption">
  <table>
    <thead>
      <tr><th scope="col">Recorded condition</th><th scope="col">Free output</th><th scope="col">Target readout</th><th scope="col">Evidence status</th></tr>
    </thead>
    <tbody>
      <tr><td>Baseline</td><td><code>Lily!</code></td><td><code>Y</code> #3; <code>anny | Y</code> #42; <code>Laurel</code> #2,463</td><td>No intervention</td></tr>
      <tr><td>Equal Y / AE / N / IY · 3.5%</td><td><code>Yanny!</code></td><td><code>Y</code> #1; <code>anny | Y</code> #1</td><td>Frozen cross-fit recipe; 0/10 random controls succeeded</td></tr>
      <tr><td>Optimized L / AO / R / AH / L · 14.53%</td><td><code>Laurel</code></td><td><code>Laurel</code> #1</td><td>Target-conditioned; exact result did not transfer across fits</td></tr>
    </tbody>
  </table>
  <figcaption id="phone-steering-caption"><strong>Figure 3 — Two anchors, two evidence levels.</strong> The Yanny and Laurel controls replay recorded model runs; they do not run Whisper in your browser or interpolate unmeasured strengths. <a href="{{ '/audio-jacobian-lens/?sample=asr-laurel-yanny' | relative_url }}">Open the full layer-by-layer ASR replay</a>, or inspect the <a href="{{ '/audio-jacobian-lens/steering/' | relative_url }}">detailed recorded checkpoints</a>.</figcaption>
</figure>

This is stronger than the old `Yay!` near-miss, but it is still one recording explored after seeing the target. The phone order and timing were developed on this clip. A fitted phone prototype is not a native phone symbol, and differentiating its readout back into the encoder does not by itself prove that Whisper uses that direction as a clean internal control. The result establishes that this fitted phonetic subspace contains a route that can cross the model's real output boundary under these conditions.

I also ran a local Chatterbox TTS pilot, but its learned acoustic-code IDs do not
yet support a clear word-, phone-, or waveform-level interpretation. I am
keeping that explorer out of the public site until the readout and intervention
results survive stronger controls and can tell a useful scientific story.

So the next question is not simply, “Can I make the output change?”

It is: **Which anchor, at which layer, at which time, and at which strength produces a repeatable and selective change?**

The frozen-map transfer, CPU reproduction, and exact-norm random schedules answer part of that question for Yanny. I still want the opposite sign, unrelated phone orders, the same anchor at the wrong time, many more random directions, spectral variants of the recording, and held-out audio and models. I also want complete output-distribution and transcript-damage measurements, not only success on the requested word.

One anchor has crossed one real decision boundary. A reusable knob must survive the rest of those controls and work beyond the clip on which it was found.

So far, though, I am asking phoneme-scale questions of Whisper. What happens when the same experiment moves into an LLM capable of extended reasoning? If a stable higher-level signature can be found and implanted, perhaps its effect will travel farther—across more layers, more tokens, and a longer sequence of later decisions. That is a hypothesis I want to test, not a result I have yet.

## How to read the evidence

The Audio Jacobian Lens is a fitted instrument. It uses a first-order map from an intermediate residual state toward a later space that can be read through the vocabulary head. The underlying model stays frozen, but the lens and the 34-phone public ARPAbet prototypes are fitted from data, including automatically aligned speech supervision. The Yanny steering pilot uses a separate development-only extension for ARPAbet `Y`; it does not modify Whisper or turn the public prototype bank into a phone recognizer.

The encoder-to-decoder transport behind Phone Signature is my speech-specific extension, not a setup already validated in Anthropic's paper. The two encoder maps above were fitted on disjoint examples but evaluated on the same development set. Their agreement is a fit-sensitivity check, not an independent-corpus replication. The locked test split has not been evaluated.

The phone measurements use native **20 ms encoder states**. The public Explorer pools five states into overlapping **100 ms display cells with an 80 ms hop** so that a human can read the sequence. Neighboring cells share one state. The alignments are automatic, the cells are not phone boundaries, and similarity or decodability does not establish causal use. Only five matched random transports were tested, and the fitted-over-random advantage is not reliable at every encoder layer.

The decoder rows are fitted readouts from a teacher-forced trace. The HEAD row is the model's raw teacher-forced distribution before Whisper's generation-time suppression and timestamp rules. A readable vocabulary direction is evidence about the fitted projection, not proof that the model stored or consciously selected that word.

The experimental MLX path for LFM2.5 Audio runs end to end on Apple silicon, but it remains a one-clip integration pilot. It does not yet explain the model's FastConformer, audio adapter, codebooks, or played waveform.

These qualifications are why I separate a readable signature from a causal knob: the first tells me what the fitted instrument can recover; only a controlled intervention can test whether the model relies on it.

## Returning to the surface

Right now, I think the work gives us three observations:

1. At the step after `brother`, the decoder surfaces a `who`-shaped association before the output resolves to `now`, while an N → AW-like acoustic pattern is also readable in the encoder.
2. Distributed vocabulary-aligned patterns in the encoder carry considerably more recoverable phone information than the brightest coordinate alone.
3. On one ambiguous recording, a timed equal-strength phone-direction edit can cross Whisper's real output boundary to `Yanny!` and survive a second fitted map and initial random controls; a target-optimized Laurel route also exists, but does not transfer as cleanly.

Each observation allows more than one interpretation. That is the interesting part.

The old psycholinguistic experiments—priming, ambiguity, phonetic competition, adaptation—may give us a library of questions to bring into the model. The difference is that now we can do more than observe the final behavior and work backward. We can try to locate an association, touch it, and see whether the remaining computation reorganizes in the way we predicted.

If stable anchors exist beyond this clip, perhaps they could eventually help us debug, adapt, or customize a trained model without collecting another dataset and retraining the whole system for every deployment.

But first we need to learn which knobs are real, what they control, and what else they disturb.

I think that is why I keep descending.

The deeper layers are harder to name. But every time a pattern becomes partly readable, it gives us another experiment—and perhaps another place to plant an anchor before the model returns to the surface.

## Enter the project

**Explore:** [Laurel/Yanny full ASR replay](https://kennethli319.github.io/audio-jacobian-lens/?sample=asr-laurel-yanny) · [Whisper / ASR](https://kennethli319.github.io/audio-jacobian-lens/?sample=asr-question) · [Phone Signature](https://kennethli319.github.io/audio-jacobian-lens/?sample=asr-question&phone=1&kind=encoder&layer=2&position=18) · [Detailed steering checkpoints](https://kennethli319.github.io/audio-jacobian-lens/steering/) · [LFM2.5 Audio](https://kennethli319.github.io/audio-jacobian-lens/speech/?sample=speech-question)

**Build it:** [Audio Jacobian Lens code and local Apple-silicon MLX setup](https://github.com/kennethli319/audio-jacobian-lens) · **Starting point:** [Anthropic's Global Workspace research](https://www.anthropic.com/research/global-workspace)

If you work in speech, interpretability, phonetics, or cognitive science: **what experiment would convince you that an internal direction is more than a readable projection—and is instead a useful anchor for the model's own computation?**
