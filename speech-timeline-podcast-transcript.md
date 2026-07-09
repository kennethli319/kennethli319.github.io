---
layout: default
title: "From Foot Pedals to Omni Models: Podcast Transcript"
description: "An accessible transcript of the 22-minute audio companion to the Speech Recognition & Synthesis Timeline."
---

# From Foot Pedals to Omni Models: Podcast Transcript

[Back to the speech timeline]({{ '/speech-timeline.html' | relative_url }})

[Listen to or download the podcast]({{ '/assets/audio/from-foot-pedals-to-omni-models.m4a' | relative_url }}) (22 minutes, M4A)

*This transcript was prepared from automated speech recognition and edited for punctuation, readability, names, and technical terminology. Speaker labels are inferred because the audio does not identify the speakers. Section headings were added for navigation.*

## Introduction: From Sound to Mathematics

**Speaker 1:** Welcome to the deep dive. I want you to think about the last time you spoke to an AI on your phone.

**Speaker 2:** Oh, yeah. We all do it, right?

**Speaker 1:** Right. Maybe you paused, or you said “um,” or you even gave this little sarcastic laugh. The wild part is that the machine actually caught that sarcasm in your voice.

**Speaker 2:** It’s crazy. It wasn’t just transcribing your words like it used to; it was actually listening to your humanity.

**Speaker 1:** Exactly. Today, we are unpacking an incredibly comprehensive timeline compiled by Wang Yau Li. He is an applied AI and speech engineer, and this timeline shows exactly how we got here. It is a monumental journey.

**Speaker 2:** We are charting the entire history of speech recognition and synthesis, starting all the way back in 1937.

**Speaker 1:** 1937. Wow.

**Speaker 2:** Yeah, and bringing us right up to the cutting-edge omnimodal models of 2026. But what is really crucial to understand as we go through Li’s timeline is that this is not just a simple list of software updates.

**Speaker 1:** Right. It is bigger than that.

**Speaker 2:** Much bigger. This is the story of how engineers literally had to deconstruct human perception.

**Speaker 1:** So they had to figure out the mechanics of biology first?

**Speaker 2:** Precisely. They had to understand how your ears actually process sound and how your vocal cords physically produce speech.

**Speaker 1:** Which is super messy.

**Speaker 2:** Oh, incredibly messy. Wet biology, right? Then they had to translate all of that into pure mathematics, because until they did that, they could not even begin to teach a machine to communicate. That is our mission today: to follow that mathematical translation.

**Speaker 1:** We are going to explore how we went from machines that required a human operator pumping foot pedals just to produce a single robotic vowel—

**Speaker 2:** Sounds exhausting.

**Speaker 1:** Right? From that to fluid, real-time conversational agents that can interrupt you, sense your hesitation, and match your emotional tone. It is a huge leap.

**Speaker 2:** It really is.

## The Mechanical and Early Electronic Era

**Speaker 1:** Okay, so let’s unpack this. We have to jump back almost 90 years to what Wang Yau Li categorizes as the mechanical and early electronic era, which starts with a fundamental problem in the 1930s. Engineers realized that physical sound waves, measured in raw hertz—

**Speaker 2:** Right, the physics of it.

**Speaker 1:** Yeah. They do not actually match how human ears work.

**Speaker 2:** Meaning our ears are not just objective microphones.

**Speaker 1:** Right, exactly. At lower pitches, humans are incredibly sensitive to tiny changes in frequency. But at higher pitches, those frequencies all sort of bunch together in our ears.

**Speaker 2:** Oh, I see.

**Speaker 1:** Yeah, and we cannot tell them apart as easily. So, in 1937, researchers created the mel scale.

**Speaker 2:** The mel scale?

**Speaker 1:** Yeah. It was a mathematical formula that mapped physical frequency to how humans actually perceive pitch. It was really the first bridge between raw acoustic physics and human auditory resolution.

**Speaker 2:** That makes a lot of sense. But if we want to talk about actually generating speech, things get wonderfully tactile just a couple of years later, in 1939.

**Speaker 1:** At Bell Labs.

**Speaker 2:** Yes, Bell Labs, with a machine called the Voder. I was reading the notes on this in the source material, and it completely blew my mind.

**Speaker 1:** It is a wild machine. It was a manual speech synthesizer. I am picturing an operator sitting at this massive, complex console, using a keyboard and foot pedals to control all the different elements of a voice.

**Speaker 2:** Yeah. It is like someone trying to play a pipe organ, but instead of musical notes, the music coming out of the pipes is human speech.

**Speaker 1:** The pipe-organ comparison is the perfect analogy. The operator was literally performing the speech in real time.

**Speaker 2:** Wow.

**Speaker 1:** One panel might control the fundamental pitch, while keys would simulate the hissing of breath or the hard clicks of consonants.

**Speaker 2:** That sounds impossibly hard.

**Speaker 1:** It was. It took operators months of intense practice just to make the Voder say “hello” in a way that did not sound completely terrifying.

**Speaker 2:** Months just to say hello?

**Speaker 1:** Yeah, exactly. But what is really fascinating is the core concept that it proved, which carried over into the Dudley vocoder the very next year, in 1940.

**Speaker 2:** Okay, 1940.

**Speaker 1:** It introduced a concept called analysis-synthesis.

**Speaker 2:** Wait. So instead of sending the actual physical sound of a voice over a wire, like a standard telephone—

**Speaker 1:** Right.

**Speaker 2:** —the Dudley vocoder just sent the mathematical instructions for how to rebuild the voice on the other side?

**Speaker 1:** Yeah. It is like mailing someone a recipe instead of trying to mail them a fully baked cake.

**Speaker 2:** That is exactly what they were doing. The realization was that a raw audio waveform is massive. It takes up too much bandwidth.

**Speaker 1:** Right. Way too much data.

**Speaker 2:** But if you analyze the speech and separate out the essential ingredients—like the raw buzz of the vocal cords and the shape of the mouth—you can send just that tiny, compact set of instructions.

**Speaker 1:** The recipe.

**Speaker 2:** Right. Then, on the receiving end, a synthesizer reconstructs the speech using those instructions.

**Speaker 1:** You are sending the blueprint, not the building. This abstraction survived for decades.

**Speaker 2:** But to send a blueprint, you have to be able to draw it.

**Speaker 1:** Exactly. That brings us to this massive “aha” moment for the field—and honestly for me, reading this timeline. In 1946, they invented the sound spectrograph.

**Speaker 2:** A huge milestone.

**Speaker 1:** It took speech and finally made it visible. It mapped out a changing distribution of energy over time and frequency. Up until this point, sound was invisible. To teach a machine to hear, researchers first had to teach it to see sound.

**Speaker 2:** Right, to visualize it.

**Speaker 1:** Yeah. Once you can look at a spectrogram, this visual graph of audio, you can spot something called a formant, which is basically the acoustic fingerprint of a specific vowel.

**Speaker 2:** Right. Like a dark band of energy shaped by resonance in your vocal tract.

**Speaker 1:** Yes, exactly. When you make an “ee” sound versus an “ah” sound, your throat and mouth change shape, and those dark bands of energy actually shift on the graph.

**Speaker 2:** Oh, wow. So, once researchers could visually measure those formants, they finally had a practical bridge between raw acoustics and linguistic structure.

**Speaker 1:** Which naturally leads to early recognition systems like Bell Labs’ AUDREY in 1952.

**Speaker 2:** Right. AUDREY could recognize spoken digits from zero through nine. But looking at the timeline, it feels like recognizing a few numbers, spoken under perfect conditions by a specific person whose voice the machine was tuned to, was very constrained.

**Speaker 1:** Yeah. It was essentially a parlor trick. It was basic pattern matching. If we wanted a machine to recognize natural, continuous, everyday talking, the math needed to get significantly more sophisticated—which ushers in the era of statistical search.

## Statistical Search and Real-World Speech

**Speaker 2:** Moving into the 1960s through the 2000s, speech engineering transitioned from those acoustic parlor tricks into a massive exercise in probability. You see this starting with the Viterbi algorithm in 1967.

**Speaker 1:** And that directly paves the way for hidden Markov models, or HMMs.

**Speaker 2:** Right. The timeline points out that HMMs became the absolute workhorse of the field by 1989. They dominated everything. The way I understand HMMs, they essentially treat human speech like a game of probability. The machine cannot perfectly see the exact word being spoken because it is hidden in all this messy audio.

**Speaker 1:** Right, hence the “hidden” part.

**Speaker 2:** Ah, right. So the model looks at the current sound and uses statistics to guess the most probable next sound, chaining them together to form words.

**Speaker 1:** That is a really great way to visualize it. If the model hears a strong “s” sound, the statistics tell it that an “h” sound or a “t” sound is highly probable next.

**Speaker 2:** Right, like “shoe” or “stop.”

**Speaker 1:** Exactly, while an “x” sound is extremely unlikely. By chaining these probabilities together through thousands of potential paths, the hidden Markov model guesses the most likely sequence of words. This scaled beautifully. By 1988, you had the CMU SPHINX system, which used these probability models to finally handle large-vocabulary, continuous speech—even from people it had never heard before.

**Speaker 2:** Right. But hold on a second. These statistical models sound incredibly elegant on paper, but let’s be real for a minute. You and I constantly interrupt each other. We mumble. We use slang. We talk over bad cell service. We say “uh” while we are thinking all the time. How on earth did these pristine lab algorithms handle the absolute chaos of a real human conversation?

**Speaker 1:** The short answer is: they did not.

**Speaker 2:** They did not?

**Speaker 1:** No. That is exactly the wall the industry hit in the early 1990s. The algorithms worked beautifully when someone was reading a clean script from *The Wall Street Journal* into a high-end microphone.

**Speaker 2:** Right. Perfectly enunciated.

**Speaker 1:** But in the real world, they completely fell apart. This raises an important question, though: How do you force an entire field of research to stop optimizing for the laboratory and start optimizing for reality?

**Speaker 2:** You give them messier data. You give them the Switchboard telephone-speech corpus in 1993.

**Speaker 1:** The Switchboard corpus.

**Speaker 2:** Yes. It was a massive, unprecedented collection of spontaneous, unscripted, two-sided telephone conversations—the ultimate reality check the field desperately needed. Switchboard forced everyone to abandon clean, read speech and deal with hesitations, overlapping voices, and people laughing while talking.

**Speaker 1:** Oh, that must mess up the audio so much.

**Speaker 2:** Completely. You also had to deal with the terrible, limited bandwidth of 1990s telephone lines. If a recognition system crashes the second someone clears their throat, it is pretty much useless in a real product.

**Speaker 1:** Exactly. Because the data was now so chaotic, researchers needed standardized metrics just to track honestly whether they were making progress—to see whether the systems were getting better.

**Speaker 2:** Yeah. So, in 2000, the field widely adopted word error rate, or WER. It was a brutally simple math equation: count all the substituted words, deleted words, and wrongly inserted words, and divide by the total number of words a human actually said.

**Speaker 1:** That is brutal.

**Speaker 2:** Then, in 2003, they added diarization error rate, or DER.

**Speaker 1:** Yes. Diarization basically means figuring out who spoke when, right?

**Speaker 2:** Yes—speaker clustering and timing. If you are transcribing a busy boardroom meeting, a perfect stream of words is completely useless if you do not know who is talking.

**Speaker 1:** Obviously. So DER gave the field a shared target for solving that “who said what” problem. They had the messy, real-world data, and they had the brutal metrics to keep themselves honest. But as I read through this section of Wang Yau Li’s timeline, it struck me that these statistical HMM systems were essentially Frankenstein’s monsters.

**Speaker 2:** In what sense?

**Speaker 1:** Engineers were piecing together totally separate systems to make them work. They had a separate acoustic model to try to identify the raw sounds. Then they bolted that onto a separate pronunciation dictionary, like CMUdict, to map those sounds to words.

**Speaker 2:** Yeah, that is true.

**Speaker 1:** Then they bolted that onto a separate language model to try to guess the grammar. It was this heavily handcrafted pipeline, micromanaged by humans at every single step. To get machines to sound truly human, it seems like the field eventually had to stop micromanaging the rules and just let the machines figure things out themselves.

**Speaker 2:** That transition is exactly what triggered the neural turn in the 2010s.

## The Neural Turn

**Speaker 1:** It was the moment we replaced those handcrafted, stitched-together pipelines with deep learning. Here is where it gets really interesting for me. Looking at this shift, it is like engineers spent 50 years meticulously drawing a map of a city, noting every single stop sign, one-way street, and alleyway to teach a car how to navigate.

**Speaker 2:** I love this analogy.

**Speaker 1:** Then deep learning comes along and says, “I do not need your map. I will just drive around the city millions of times until I intuitively memorize the streets myself.”

**Speaker 2:** That maps perfectly to what happened. Deep neural networks started absorbing massive amounts of data and replacing those individual handcrafted components. You see an early signal of this with RNN transducers in 2012, which allowed for streaming recognition.

**Speaker 1:** Right.

**Speaker 2:** Instead of waiting for you to finish an entire sentence so it could rigidly align the sounds to a dictionary, the model could fluidly output text as the audio rolled in, in real time. But the real shockwaves hit around 2014 with systems like Deep Speech, then exploded in 2016 with DeepMind’s WaveNet.

**Speaker 1:** WaveNet fundamentally changed speech synthesis because researchers finally ditched those old analysis-synthesis vocoders—the recipes we talked about earlier—that always sounded a little buzzy and robotic.

**Speaker 2:** Yes. Researchers realized that, if you have enough data and immense computing power, you do not need human phonetic rules.

**Speaker 1:** Wow. A neural network can model the raw physical audio waveform directly.

**Speaker 2:** WaveNet was generating audio by predicting the sound wave one tiny sample at a time, often 16,000 times a second.

**Speaker 1:** Sixteen thousand times a second? That is insane.

**Speaker 2:** Right. Because it built the sound from the microscopic level up, it generated speech with incredibly fine texture. It sounded natural and fluid in a way that previous systems just could not touch. Researchers were applying similar brute-force neural networks to the recognition side, too, but the timeline highlights a massive bottleneck they hit right around here.

**Speaker 1:** Ah, yes—the data bottleneck. Training these deep neural networks required millions of hours of audio. Finding the audio is not hard, but it required millions of hours of *labeled* audio.

**Speaker 2:** That is the catch. A human being had to sit there, listen to millions of hours of tape, and physically type out every single word being said so the AI had an answer key.

**Speaker 1:** Which is incredibly expensive, slow, and ultimately limits how smart the model can get. You just cannot hire enough humans to transcribe the internet.

**Speaker 2:** No, definitely not. This limitation forced what is arguably one of the most important leaps in modern AI: self-supervised learning.

## Self-Supervised Learning

**Speaker 1:** In 2019, a paper introduced a system called wav2vec. This is where the models start teaching themselves. The way the wav2vec family bypassed that human-labeling bottleneck is brilliant. It effectively played a fill-in-the-blank game.

**Speaker 2:** Right.

**Speaker 1:** Imagine I take a recording of human speech, chop out a random half-second of the audio, and force the AI to guess the missing sound based on the context of what came before and after it.

**Speaker 2:** Okay.

**Speaker 1:** wav2vec-style self-supervision allowed models to learn the deep structure of speech directly from raw, untranscribed audio. By playing this kind of prediction game millions and millions of times, the model essentially internalized the physics, phonetics, and rhythm of human speech without needing a human transcript for every recording.

**Speaker 2:** Exactly. Once it understands the underlying language of sound, you need only a fraction of the labeled data to fine-tune it to transcribe words.

**Speaker 1:** Precisely. This is a monumental shift. By understanding the raw structure of audio at such a deep level, speech models stopped being only single-purpose tools, like dictation software or a robotic GPS voice.

**Speaker 2:** Right. They were evolving into foundation models, which sends us rocketing into the 2020s.

## Codec Tokens and Foundation Models

**Speaker 1:** We enter the era of foundation models and what Wang Yau Li calls the “omni future.” This is where the speed of innovation on the timeline goes completely vertical.

**Speaker 2:** It really accelerates.

**Speaker 1:** I want to zero in on something that appears in 2021 and 2022 with technologies like SoundStream and EnCodec. The timeline talks heavily about codec tokens.

**Speaker 2:** Yes. Codec tokens are key.

**Speaker 1:** If we compress audio into these discrete digital tokens, are we basically inventing a new alphabet that a language model can read and write? If so, is it just text underneath?

**Speaker 2:** What is fascinating is that, no, it is absolutely not just text. Think about this: if I say the word “great” with cheerful enthusiasm, and you say the word “great” with heavy sarcasm, a text transcript just writes the word “great” for both of us.

**Speaker 1:** Right. All the nuance is gone.

**Speaker 2:** Exactly. All the emotion, the sarcasm—the meaning is lost. A codec token belongs to a vocabulary of sound, so it can preserve acoustic identity.

**Speaker 1:** Yes. It can carry information about the word while preserving intonation, breathiness, the pitch of the voice, and emotion. It is an alphabet of acoustics, not letters. This changed everything because language models, like the ones behind ChatGPT, are already incredibly good at predicting the next token in a sequence.

**Speaker 2:** Right. So, once you turn complex audio into these acoustic tokens, the language model can speak by predicting the next acoustic token instead of the next text token.

**Speaker 1:** That breakthrough led directly to models like VALL-E in 2023. VALL-E demonstrated zero-shot voice cloning.

**Speaker 2:** Zero-shot?

**Speaker 1:** Yeah. You feed it just a three-second acoustic prompt of someone’s voice. Because it understands these acoustic tokens so deeply, the language model can continue generating speech in that voice, carrying over the emotion and acoustic identity, without being explicitly trained on that person’s specific data.

**Speaker 2:** Three seconds. That is just—wow. It brings us right to the threshold of where we are today, from 2024 to 2026: the omni era. We see models like GPT-4o, Moshi, and the Qwen Omni series. This represents the final destruction of the Frankenstein pipeline.

## Native Speech and the Omni Era

**Speaker 1:** Right—the stitched-together pieces. For years, even until recently, if you used a smart speaker or a voice assistant on your phone, you were using a cascaded pipeline. You spoke, and an automatic speech recognition model transcribed your speech into text: step one. Then that text was fed into a large language model, which produced a text reply: step two. Then a text-to-speech model read that reply back to you. Speech to text, text to text, text to speech.

**Speaker 2:** It is the ultimate game of telephone.

**Speaker 1:** Exactly. Every time you translate between those steps, you lose critical information. The language model in the middle does not hear you sigh. It does not hear your voice shake if you are sad. It just reads a sterile transcript. It loses all the context. Because it has to wait for that whole clunky pipeline to finish, it also introduces a delay.

**Speaker 2:** It feels like you are talking over a walkie-talkie. It creates a lot of human friction.

**Speaker 1:** But starting in 2024 with models like Moshi and GPT-4o, and continuing with the Qwen2.5-Omni and Qwen3.5-Omni models in 2025 and 2026—

**Speaker 2:** They are really new systems.

**Speaker 1:** Yeah. The industry moved toward native, real-time audio. The model processes acoustic representations directly; there is no required text-only middleman.

**Speaker 2:** So the model is actually hearing the audio, which enables what the timeline calls full-duplex interaction.

**Speaker 1:** Right. Full duplex means the model can listen and speak in overlapping time, closer to how humans talk. We do not always wait for polite silence.

**Speaker 2:** No, we definitely do not. We nod. We say, “Yeah.” We interrupt. If an omni model is talking and you interrupt it, it can hear you talking over it and stop dynamically, more like a person would. That completely changes the relationship you have with the machine.

**Speaker 1:** Think about the voice assistant on your phone just five years ago. It was not really listening to you; it was reading a transcript of your words.

**Speaker 2:** Exactly. The omnimodal models of 2026 can hear timing and vocal expression. They can sense hesitation, pick up on a sarcastic tone, and reply with native, emotionally expressive audio. They can dynamically include an “um” or an “ah” to pace the conversation naturally because the model is not just generating words.

**Speaker 1:** It is generating what we call paralinguistic cues: sighs, tone, and the rhythm of human interaction.

**Speaker 2:** Wow. Wang Yau Li’s timeline highlights how the Qwen models introduce this Thinker-Talker split architecture.

**Speaker 1:** Yeah. They maintain the deep, complex, text-based reasoning capabilities that language models are known for—that is the Thinker—but pair them with an independent audio-token generator, the Talker, that can stream expressive speech in real time.

**Speaker 2:** That is so smart. By 2026, with Qwen3.5-Omni, speech is no longer an afterthought or a side channel. It is a first-class modality inside long-context, real-time AI agents.

## Closing Reflection

**Speaker 1:** It is staggering when we look back at the entire arc of this timeline. We started in 1939 with a person sitting at the Bell Labs Voder, physically pumping foot pedals and pressing keys, sweating just to force a machine to squeak out a single robotic word.

**Speaker 2:** A very stressful job.

**Speaker 1:** Right. In less than 90 years, we arrived at seamless, zero-shot, long-context omnimodal AI agents that can hold a natural, full-duplex conversation with you in real time and pick up on emotion. Engineers drew the map. They made the rules. They threw the rules out to let machines learn the physics of sound themselves. Now the machines natively speak our language.

**Speaker 2:** It truly is one of the most remarkable engineering trajectories in human history. But if we connect this evolution to the bigger picture, it leaves us with something profound to consider about our own future.

**Speaker 1:** Like what?

**Speaker 2:** Think about the threshold we have just crossed. We now have machines that can natively understand and generate speech with precise intonation, hesitation, and emotional expression. An AI companion today can be perfectly articulate. It is infinitely patient, never gets tired, and is highly responsive to subtle shifts in your tone of voice.

**Speaker 1:** It is essentially the perfect conversational partner.

**Speaker 2:** It is. But how will that change human-to-human communication?

**Speaker 1:** Oh, I see where you are going. If you get used to spending hours a day interacting with an AI companion that flawlessly adapts to your every mood, anticipates your needs, and never misunderstands you, will you start expecting the real, messy, distracted, tired humans in your life to communicate with that same flawless efficiency?

**Speaker 2:** That is a heavy thought. As these machines become perfect communicators, do we lose our patience for human friction?

**Speaker 1:** Wow. When the machine becomes a better listener than your best friend, what happens to the friendship?

**Speaker 2:** That is a brilliant—and slightly terrifying—question to leave off on. Thank you all for joining us on this deep dive into the evolution of speech technology. It has been an incredible journey through Wang Yau Li’s timeline, from foot pedals to omni models, and we hope you found it as mind-bending as we did. Until next time, keep listening and keep questioning.
