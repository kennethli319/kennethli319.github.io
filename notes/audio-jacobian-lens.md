---
layout: default
title: "Inception into J-Space"
description: "A layer-by-layer descent through a speech model: from readable words to nonliteral acoustic representations, and from inspection to steering."
image: https://kennethli319.github.io/assets/img/audio-jacobian-lens/inception-into-j-space-hand-drawn.jpg
permalink: /notes/audio-jacobian-lens/
---

[Back to Notes]({{ '/notes.html' | relative_url }})

# Inception into J-Space

<p class="note-deck">A metaphorical descent through a speech model—from readable language at the surface to distributed acoustic patterns below, and the possibility of planting an anchor · July 2026 · about 11 minutes</p>

<figure class="note-figure note-figure--illustration">
  <a href="{{ '/assets/img/audio-jacobian-lens/inception-into-j-space-hand-drawn.jpg' | relative_url }}">
    <img src="{{ '/assets/img/audio-jacobian-lens/inception-into-j-space-hand-drawn.jpg' | relative_url }}" alt="Editorial illustration of four computational levels: readable speech tiles at the surface, projected objects below, distributed acoustic constellations deeper down, and a glowing anchor in the lowest level sending a signal upward." loading="lazy" decoding="async">
  </a>
  <figcaption><strong>Metaphorical illustration.</strong> At the surface, language is readable. Deeper down, familiar objects become projections and distributed patterns. One anchor planted at a particular depth sends an effect through the levels above. This is explanatory artwork, not experimental evidence.</figcaption>
</figure>

I have been using the [Audio Jacobian Lens](https://github.com/kennethli319/audio-jacobian-lens), which I adapted from [Anthropic's Jacobian Lens](https://www.anthropic.com/research/global-workspace), to look through the layers of speech models. And the more I descend through them—from readable output toward earlier representations—the more I keep thinking about *Inception*.

In the movie, you enter one dream, then another inside it, and then another. The surface still looks familiar. But as you descend, things become less literal. An object can be a projection. Several objects can combine to express something that none of them means alone. And something small, placed deep enough, can reorganize what happens in every level above it.

Under the metaphor, the instrument is not mystical. The Jacobian Lens fits a first-order map from an intermediate residual state toward a later space that can be read through the vocabulary head. In practical terms, I use it to ask: **which vocabulary directions become readable from here?** I adapted it for Whisper ASR, Chatterbox TTS, and an experimental Apple-silicon MLX path for LFM2.5 Audio. The encoder-to-decoder transport used for Phone Signature is my speech-specific extension, not a setup validated in Anthropic's paper.

The model stays frozen, but the lens and phone prototypes are fitted from data, including automatically aligned speech supervision. I also fitted two encoder maps on non-overlapping examples and evaluated them on the same speaker-held-out development set. Their agreement is a consistency check, not an independent-corpus replication. This is a fitted instrument for forming hypotheses, not a transcript of hidden thought.

I think I may be a little addicted to descending through different models. What keeps surprising me is how often I find shapes that resemble phenomena people have spent decades describing in psychology, linguistics, phonetics, or cognitive science. They do not have to be the same mechanism. But sometimes the resemblance is close enough to suggest the next experiment.

I am borrowing *Inception* as a map. I am not saying that Whisper dreams or has a human subconscious. The metaphor gives me two questions: **what changes as I descend into earlier layers, further away from the easily interpretable LM head? And what can an intervention placed there change afterward—not only in later layers, but also at later time steps, perhaps even in much longer events?**

During my linguistics degree, psycholinguistics taught me to investigate language processes that we could not inspect directly. I mean, we simply did not have a way to scan every human neuron at once while someone was processing language. Researchers were forced to design experiments around reaction time, priming, ambiguity, and mistakes, then infer the hidden sequence underneath.

It was almost like being a detective inside the brain. I miss that kind of puzzle-solving.

Neural models give us the opposite problem. We can record almost every activation, but there are too many of them, and most do not come with names. No researcher can hold hundreds of possible links in working memory at once. It actually feels a little like functional EEG or MEG: we see something light up, and then we still have to guess what the pattern means.

### The surface: behavioral observation

At the surface is the transcript. Here, a word mostly means what we expect: it is the token the model is about to say.

This is like behavioral observation. It is real and useful—we know what the model finally did—but it does not tell us how that answer was built. To learn more, we have to descend.

In “Where is my brother now?”, the final token `now` moved through the full vocabulary like this:

```text
#6,319 → #7,237 → #3 → #1
```

That is the surface story: eventually, the model says `now`.

But one level down, something more interesting appears.

### One level down: `brother → who`, then `now`

After `brother` has been decoded, we arrive at the next output position—the one that eventually emits `now`. In the first plotted decoder layer (L0), `who` is ranked first, while `now` is still #6,319. `Now` falls to #7,237 at the next layer, then jumps to #3, and finally reaches #1 at the output head.

<figure class="note-figure note-explorer">
  <iframe class="note-explorer__frame" src="{{ '/audio-jacobian-lens/' | relative_url }}?sample=asr-question&amp;embed=article&amp;panel=decoder&amp;kind=decoder&amp;layer=0&amp;position=4" title="Interactive cached Whisper Explorer focused on decoder layer 0 at the token now" aria-describedby="decoder-now-caption" loading="lazy" referrerpolicy="strict-origin-when-cross-origin"></iframe>
  <figcaption id="decoder-now-caption"><strong>Figure 1 — The answer takes time to settle.</strong> At the position that eventually becomes <code>now</code>, <code>who</code> is the early leader. Across the full vocabulary, <code>now</code> moves #6,319 → #7,237 → #3 → #1. Select other cells to inspect their saved candidates, or <a href="https://kennethli319.github.io/audio-jacobian-lens/?sample=asr-question">open the full example</a>.</figcaption>
</figure>

I read this as a word-association-shaped detour: *brother—identity—who*. It feels very much like the decoder is using an association as a hint before later computation resolves the answer to `now`.

It reminds me of word association in psycholinguistics. I am not saying that the mechanisms are exactly the same, but the shape is surprisingly similar.

The encoder gives us another part of the puzzle. Its second-to-last layer contains a suggestive `N → AW`-like run shortly before Whisper's model-derived window for `now`. I read this as possible acoustic evidence relevant to the final word—not a neatly aligned spelling-out of it. The 100 ms display cells overlap, encoder states are nonlocal, and the timing comes from Whisper's own alignment.

Put beside `brother → who` in the decoder, it suggests an experiment with two streams: language association pulling from context and acoustic evidence constraining it from the encoder. My guess is that when the sound becomes ambiguous, the association stream will pull harder; when the cue is clear, the acoustic stream will win more often.

I do not want to settle that from one example. I want to cross clear versus ambiguous audio with supportive versus conflicting linguistic context and watch how the balance changes.

### Encoder limbo: a codebook, not a dictionary

The deeper I go, the less useful it is to ask, “Which word is the model thinking about?” We cannot simply take the largest token exposed by the fitted LM-head readout at an early encoder layer as a translation. These states need to carry acoustic detail, subword structure, timing, and competing possibilities—things that may not have one human word.

It feels like intercepting a spy who has chosen an ordinary Bible as a codebook. Familiar words still appear, but a word being pointed to may stand for a location, an attribute, or one fragment of a message. Several references may need to combine before the message becomes readable. Not because the model is trying to hide anything: the available codebook is simply being used to mark information that its surface meanings alone cannot express.

There is one important difference. The lens—not necessarily Whisper itself—is choosing this human-readable codebook by projecting encoder states into vocabulary-aligned coordinates. So I use the analogy to describe our interpretation problem, not to claim that the encoder literally stores secret sentences in tokens. Whether those vocabulary-aligned directions reflect the model's own reusable structure or a convenient coordinate system supplied by the fitted lens is itself an experiment.

For a speech model, phonetics gives us an intermediate system to test against. I added the **Phone Signature view** because taking only the brightest vocabulary coordinate was not enough. The J-lens gives me a distributed vocabulary-aligned pattern, and a separately fitted ARPAbet prototype map—built from automatically aligned speech—lets me compare that pattern with phone signatures.

In the preliminary speaker-held-out tests, phone information decoded directly from the encoder residual reaches about **91% macro-F1 at L3**. At L2, the brightest J-lens coordinate alone gives about **63.5%**, while reading the constellation across the top 100 coordinates reaches about **81% across two separately fitted maps**. It stays near **80% on strict unseen-word examples** and reaches roughly **90–92% in matched cross-speaker, cross-word ABX tests**, above spectrum-matched random transports.

The measurements operate on automatically aligned native **20 ms states**. The public explorer pools five states into overlapping **100 ms display cells with an 80 ms hop**. Those cells are for reading the map; they are not phone boundaries, probabilities, or a separately validated phone classifier.

<figure class="note-figure note-explorer">
  <iframe class="note-explorer__frame" src="{{ '/audio-jacobian-lens/' | relative_url }}?sample=asr-buzzer&amp;embed=article&amp;panel=encoder&amp;phone=1&amp;kind=encoder&amp;layer=3&amp;position=7" title="Interactive cached Phone Signature Explorer focused on encoder layer 3 from 0.56 to 0.66 seconds" aria-describedby="phone-signature-caption" loading="lazy" referrerpolicy="strict-origin-when-cross-origin"></iframe>
  <figcaption id="phone-signature-caption"><strong>Figure 2 — A constellation, not a single label.</strong> In this selected encoder-L3 window (0.56–0.66 s), <code>B</code> is the nearest fixed ARPAbet prototype (cosine 0.565; margin 0.479 over <code>AW</code>). The display pools native 20 ms states into overlapping 100 ms cells with an 80 ms hop, so these are similarities rather than phone boundaries or probabilities. Explore neighboring windows, or <a href="https://kennethli319.github.io/audio-jacobian-lens/?sample=asr-buzzer">open the full Phone Signature view</a>.</figcaption>
</figure>

That gap is the observation I care about: the combination carries information that its brightest human label misses. Maybe vocabulary directions are being borrowed, through the fitted projection, to describe something more acoustic and less literal. Maybe part of the structure comes from the supervised phone map. Or maybe there is another explanation I have not thought of yet. The point is to design experiments that separate them.

If I keep descending toward the first encoder layer, that is the model's limbo in this metaphor: furthest from the transcript, hardest to name in human terms, but still part of everything that will eventually be built above it. The measurements above are from L2 and L3; they do not mean that L1 has already been explained.

One experiment I especially want to try is to hide the original audio and transcript, then give only the ordered Phone Signature sequence to a phonetician or a capable language model. Could they reconstruct most of the words in the audio without listening to it? What survives if I shuffle the sequence, replace the map with a matched random one, or test unseen speakers and words? A text-only baseline would tell me how much reconstruction comes from language priors rather than the acoustic signature.

I also want to hold the brightest coordinate fixed while changing the rest of the constellation, then preserve the distributed neighborhood while changing rank 1. If the combination carries the message, behavior should follow the constellation more than its brightest label.

For a deeper model with more layers, I suspect we may find patterns more complex than phones—patterns that cannot be named by one word from the LM head at all. But that is exactly what still needs to be tested.

### Planting an anchor

Going down is only half of *Inception*. The more interesting question is whether the right object, planted at the right depth, changes what the higher levels build around it.

I tried planting an anchor in the ambiguous Laurel/Yanny recording. Without intervention, the model produced `Lily!` I nudged early encoder states toward a broad Y-prefix direction and away from a La-prefix direction, then let the remaining model recompute.

The output became `Yay!`, not `Yanny`.

That is not precise semantic control, and I still need many more experiments before I know the right way to implant this kind of idea. The edit might have caught a phonetic direction, shifted a language prior, or simply disturbed the computation. The steering direction was also built separately from the Phone Signature prototypes, so this experiment does not show that the Phone Signature phone directions caused the change.

But it is also not nothing: something placed early changed the surface transcript, while the model still decided what surface object to construct from it. The anchor caught somewhere, but the model interpreted it in its own way.

A separate recorded Chatterbox TTS replay showed the temporal side of the same question. A **0.002×-relative-norm residual edit at L20 + L22** changed the actual speech-head winner from acoustic code `4106` to `4358`, followed by **43 changed downstream codes**.

<figure class="note-figure note-explorer">
  <iframe class="note-explorer__frame" src="{{ '/audio-jacobian-lens/tts/' | relative_url }}?sample=tts-bridge-s9&amp;embed=article&amp;panel=tts&amp;kind=tts-head&amp;layer=0&amp;position=8" title="Interactive cached Chatterbox TTS Explorer focused on the residual intervention at speech-code position S9" aria-describedby="tts-steering-caption" loading="lazy" referrerpolicy="strict-origin-when-cross-origin"></iframe>
  <figcaption id="tts-steering-caption"><strong>Figure 3 — An anchor reaching later time steps.</strong> A 0.002×-relative-norm edit at L20 + L22 changes the winning acoustic code from 4106 to 4358, followed by 43 changed downstream codes. It shows propagation through the future autoregressive sequence, not yet semantic control or waveform attribution. Select a position or layer cell to inspect its saved replay, or <a href="https://kennethli319.github.io/audio-jacobian-lens/tts/?sample=tts-bridge-s9">open the full TTS example</a>.</figcaption>
</figure>

This shows propagation through an autoregressive suffix, but it does not give those code IDs word or phone meaning or establish waveform attribution. Repeated clips, matched perturbations, and waveform-level evaluation are still needed to separate useful control from ordinary autoregressive sensitivity.

The experimental MLX path for LFM2.5 Audio also runs end to end on Apple silicon, but it remains a one-clip integration pilot rather than broader validation.

So the experiment I want is not simply, “Can I make the output change?”

It is: **which anchor, at which layer, at which time, and at which strength produces a repeatable and selective change?**

Then test the opposite direction, an orthogonal direction, a random direction with the same norm, and the same anchor at the wrong time. I also want to measure downstream damage and persistence, not only whether the intended token changes. If the effect survives the right controls and follows the predicted layer and timing, then we may have found a real knob rather than ordinary model sensitivity.

This is where the old psycholinguistic puzzles become useful again. We can borrow paradigms for priming, ambiguity, phonetic competition, and adaptation. But now, instead of observing only the executed behavior and working backward, we can try to locate the association, touch it, and see whether the rest of the computation reorganizes in the way we predicted.

### Returning to the surface

The question is no longer only, “What does this activation mean?”

It is also: **how deep do we need to go, what should we place there, and what survives when the model returns to the surface?**

If stable anchors can be found, perhaps we can eventually use them to debug, adapt, or customize a trained model without collecting another dataset and retraining the whole system every time. But first we have to learn whether these knobs are real, what they control, and what else they disturb.

I think that is why I keep descending.

The deeper layers are harder to name, but they give us something that experiments on the human brain rarely do: a place where we can touch the hidden sequence, replay it, and ask whether the surface changes in the way we expected.

## Enter the project

**Explore:** [Whisper / ASR](https://kennethli319.github.io/audio-jacobian-lens/?sample=asr-question) · [Phone Signature](https://kennethli319.github.io/audio-jacobian-lens/?sample=asr-buzzer) · [LFM2.5 Audio](https://kennethli319.github.io/audio-jacobian-lens/speech/?sample=speech-question) · [Chatterbox TTS](https://kennethli319.github.io/audio-jacobian-lens/tts/?sample=tts-bridge-s9)

**Build it:** [Audio Jacobian Lens code and local Apple-silicon MLX setup](https://github.com/kennethli319/audio-jacobian-lens) · **Starting point:** [Anthropic's Global Workspace research](https://www.anthropic.com/research/global-workspace)

If you work in speech, interpretability, phonetics, or cognitive science: **what experiment would convince you that an internal direction is more than a readable projection—and is instead a useful anchor for the model's own computation?**
