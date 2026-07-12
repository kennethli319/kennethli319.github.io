---
layout: default
title: Why ASR Encoder and Decoder Counts Differ
---

# Why ASR Encoder and Decoder Counts Differ

In the [Audio Jacobian Lens ASR explorer](./audio-jacobian-lens/), the encoder and decoder timelines usually contain different numbers of columns. That is expected: they measure two different axes.

| Explorer view | One column represents | The count mainly depends on |
| --- | --- | --- |
| **Encoder** | A pooled window of the audio representation | Audio duration and display-window settings |
| **Decoder** | One generated Whisper BPE token | The transcript and how Whisper tokenizes it |

## Encoder: fixed positions in audio time

Whisper Tiny first turns the log-Mel input into encoder states spaced every 20 ms. The explorer pools those states into 200 ms display windows with 20 ms overlap, so adjacent windows start 180 ms apart. Longer audio therefore produces more encoder columns, regardless of how many words it contains.

These windows are **audio locations**, not instants when Whisper made a decision. Whisper's encoder attends bidirectionally, and each late state can contain context from a much wider region than its displayed slice.

## Decoder: generated token positions

The decoder generates text autoregressively. Each visible column corresponds to one emitted BPE token. A written word may be one token or several pieces, and punctuation may have its own token, so the number of decoder columns is determined by tokenization rather than audio duration.

## How the two timelines stay synchronized

For navigation, each pooled encoder window is paired with the generated-token interval that has the greatest temporal overlap under Whisper's cross-attention/DTW timing. This is approximate and many-to-many: several audio windows can point to one token, while a word can span several decoder token pieces.

The pairing helps you inspect the two views together. It is not an independent word boundary, causal attribution, or evidence that the encoder emitted that token.

## What the labels mean

- The large label in an intermediate cell is the highest-scoring token under that layer's fitted J-lens readout.
- `realized #N` is the rank, at that layer and position, of the token Whisper eventually emitted.
- An encoder token label is a decoder-vocabulary readout of an audio state. It is **not** a token directly produced by the encoder.
- `HEAD` is the actual final decoder output-head distribution. Intermediate readouts are diagnostics, not calibrated confidence.

[Inspect the cached ASR explorer](./audio-jacobian-lens/) · [Read the project methodology](https://github.com/kennethli319/audio-jacobian-lens/blob/main/docs/METHODOLOGY.md)

[Back to the homepage](./)
