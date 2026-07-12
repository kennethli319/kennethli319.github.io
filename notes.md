---
layout: default
title: Notes
---

# Notes

<style>
.notes-timeline {
  margin-top: 1.5rem;
}
.timeline-row {
  display: grid;
  grid-template-columns: 9.5rem minmax(0, 1fr);
  gap: 1.25rem;
  padding: 1.35rem 0;
  border-top: 1px solid #e5e5e5;
}
.timeline-row:first-of-type {
  border-top: 0;
  padding-top: 0.5rem;
}
.timeline-date {
  font-weight: 700;
  color: #444;
  line-height: 1.25;
}
.timeline-kicker {
  margin-top: 0.35rem;
  font-size: 0.88rem;
  color: #888;
  font-weight: 400;
}
.timeline-body h2 {
  margin: 0 0 0.35rem;
  font-size: 1.15rem;
  scroll-margin-top: 1rem;
}
.timeline-title-link {
  color: inherit;
  text-decoration: none;
}
.timeline-permalink {
  margin-left: 0.2rem;
  color: #267cb9;
  font-weight: 400;
  opacity: 0.45;
}
.timeline-title-link:hover,
.timeline-title-link:focus,
.timeline-body h2:target .timeline-title-link {
  color: #069;
  font-weight: inherit;
  text-decoration: underline;
  text-underline-offset: 0.15em;
}
.timeline-title-link:hover .timeline-permalink,
.timeline-title-link:focus .timeline-permalink,
.timeline-body h2:target .timeline-permalink {
  opacity: 1;
}
.timeline-title-link:focus-visible {
  border-radius: 2px;
  outline: 2px solid #267cb9;
  outline-offset: 3px;
}
.timeline-summary {
  margin: 0 0 0.85rem;
  color: #777;
  font-style: italic;
}
.timeline-body ol {
  margin-top: 0;
  padding-left: 1.35rem;
}
.timeline-body li {
  margin: 0.45rem 0;
}
@media (max-width: 640px) {
  .timeline-row {
    grid-template-columns: 1fr;
    gap: 0.35rem;
  }
  .timeline-date {
    padding-bottom: 0.2rem;
  }
}
</style>

<div class="notes-timeline">

<section class="timeline-row">
  <aside class="timeline-date">
    July 2026
    <div class="timeline-kicker">Speech interpretability & psycholinguistics</div>
  </aside>
  <div class="timeline-body">
    <h2 id="listening-inside-a-speech-model"><a class="timeline-title-link" href="{{ '/notes/audio-jacobian-lens/' | relative_url }}">Listening inside a speech model <span class="timeline-permalink" aria-hidden="true">&rarr;</span></a></h2>
    <p class="timeline-summary">A long-form note on J-lens readouts, decoder timing, distributed phone signatures, causal steering, and what psycholinguistic experiments might let us test next.</p>
    <p><a href="{{ '/notes/audio-jacobian-lens/' | relative_url }}">Read the full note &rarr;</a></p>
  </div>
</section>

<section class="timeline-row">
  <aside class="timeline-date">
    July 2026
    <div class="timeline-kicker">Thoughts from eval-focused roles</div>
  </aside>
  <div class="timeline-body">
    <h2 id="evaluation-memory-and-agent-loops"><a class="timeline-title-link" href="#evaluation-memory-and-agent-loops">Evaluation, memory, and agent loops <span class="timeline-permalink" aria-hidden="true">#</span></a></h2>
    <p class="timeline-summary">Notes on evaluation speed, portable memory, shared skills, interaction latency, automation harnesses, capital, infrastructure, and talent pools.</p>
    <ol>
      <li>Fast, valid evaluation is the outer-loop gradient descent of AI systems: the quicker we measure behavior, the quicker the system improves.</li>
      <li>A model instance is only the executor; continuity comes from shared memory. Different hosts can feel like one agent if they inherit the same history, constraints, and feedback loop.</li>
      <li>Shared skills are a knowledge layer, not a model layer: they let different models reuse useful behaviors without retraining.</li>
      <li>Interaction speed shapes adoption. The easier and faster a tool feels, the wider its influence can spread.</li>
      <li>Audio agents make evaluation perceptual: timing, hesitation, interruption, tone, and repair expose quality before the transcript does.</li>
      <li>Automation lowers the cost of intention by turning a goal into an environment: scenario, loop, constraints, and score. Harnesses are gradient descent at workflow scale.</li>
      <li>Capital > infrastructure > talent pool: in order of impact.</li>
      <li>Big tech is closer to the surface representation of problems under the hood; proximity gives signal, not necessarily solutions.</li>
    </ol>
  </div>
</section>

<section class="timeline-row">
  <aside class="timeline-date">
    July 2024
    <div class="timeline-kicker">Experience & progress</div>
  </aside>
  <div class="timeline-body">
    <h2 id="beings-as-cumulative-projections"><a class="timeline-title-link" href="#beings-as-cumulative-projections">Beings as cumulative projections <span class="timeline-permalink" aria-hidden="true">#</span></a></h2>
    <p class="timeline-summary">A note cluster on experience, environmental shaping, technology as information transfer, and the unknowable scale of reality.</p>
    <ol>
      <li>We are the projection of our experience, both mental and physical.</li>
      <li>To understand an animal or plant is to grasp its neural connections, shaped by environmental influences over time, even before the existence of that specific being. This applies to humans as well. It's a continuous process along the time dimension, where a being is essentially a projection of cumulative experiences.</li>
      <li>Technological progression can be measured by the speed at which information is conveyed, transformed, or transferred between individuals, including the cost and time required to train or equip individuals to comprehend technological concepts.</li>
      <li>"As humans we experience only a tiny slice of the full scale of reality."</li>
      <li>"We're never gonna know the impact of discovering any single building block of reality."</li>
    </ol>
  </div>
</section>

<section class="timeline-row">
  <aside class="timeline-date">
    May 2024
    <div class="timeline-kicker">Language & representation</div>
  </aside>
  <div class="timeline-body">
    <h2 id="compression-perspective-and-information-density"><a class="timeline-title-link" href="#compression-perspective-and-information-density">Compression, perspective, and information density <span class="timeline-permalink" aria-hidden="true">#</span></a></h2>
    <p class="timeline-summary">Early notes on language as world compression, model weights as language, and meaning as a non-linear structure.</p>
    <ol>
      <li>Language is a condensed representation of the world.</li>
      <li>Weights in language models are their own form of language.</li>
      <li>Training a model is designing a language capable of efficiently capturing important aspects of the world.</li>
      <li>Prediction is compression. And, high velocity of information communication (between neurons, models, beings, organizations) fosters intelligence.</li>
      <li>Language evolution is driven by its users (not necessarily human); the importance of aspects is always a design choice, even if made unconsciously.</li>
      <li>Life is a search for the neural connections that best intersect our personal experiences with internal world representations.</li>
      <li>Inherent truths and information are contained within efficient structures, both tangible and intangible.</li>
      <li>All representations are simplified projections of a perfect form, differing in perspective.</li>
      <li>Human languages are a compromised form tailored to our biological capacity for interpersonal communication.</li>
      <li>Follow the eyes of other beings; they reveal perspectives you might have missed.</li>
      <li>Meaning is not inherently linear, though its surface form may appear to be.</li>
      <li>The beauty of art lies in its information density.</li>
    </ol>
  </div>
</section>

</div>
