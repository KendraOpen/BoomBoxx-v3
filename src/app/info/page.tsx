"use client";

import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/animations";
import Accordion from "@/components/ui/accordion";

const faqItems = [
  {
    question: "How do I submit a demo?",
    answer:
      "Use our demo submission page to upload your tracks. We accept WAV, AIFF, or FLAC files. Include a short bio and any relevant press photos. We listen to every submission but can't guarantee a response for unreleased tracks.",
  },
  {
    question: "What genres do you accept?",
    answer:
      "We focus on Nordic-influenced electronic music: ambient, minimal techno, experimental, IDM, drone, and related styles. If it fits our 'dark minimalism' aesthetic, we'll consider it.",
  },
  {
    question: "What are your release terms?",
    answer:
      "We offer 50/50 splits on net revenues for digital releases. Vinyl releases include pressing costs deducted before split. All contracts are transparent and discussed upfront.",
  },
  {
    question: "Do you handle distribution?",
    answer:
      "Yes, we distribute globally through major digital platforms (Spotify, Apple Music, Beatport) and have partnerships with vinyl pressing plants in Europe.",
  },
  {
    question: "How long does the review process take?",
    answer:
      "We review demos on a rolling basis. Expect 2-4 weeks for initial feedback. If we're interested, we'll reach out for more details.",
  },
  {
    question: "Can I release music on BoomBoxx and other labels?",
    answer:
      "Yes, artists retain full ownership of their music. We request exclusivity for 6 months for the specific release, after which you're free to do what you wish.",
  },
];

const genres = [
  {
    name: "Ambient",
    description:
      "Atmospheric soundscapes, drone textures, and immersive sonic environments that evoke the vast Nordic landscapes.",
    characteristics: ["Slow evolving pads", "Field recordings", "Minimal melodic content"],
  },
  {
    name: "Minimal Techno",
    description:
      "Reduced, hypnotic rhythms focused on space, texture, and subtle variations that build over extended periods.",
    characteristics: ["Repetitive patterns", "Space between elements", "Functional aesthetics"],
  },
  {
    name: "Experimental",
    description:
      "Leftfield electronic music that pushes boundaries of sound design and structure.",
    characteristics: ["Unconventional structures", "Sound exploration", "Abstract rhythms"],
  },
  {
    name: "Dark Ambient",
    description:
      "Eerie, cinematic soundscapes that explore the darker side of the sonic spectrum.",
    characteristics: ["Cinematic tension", "Industrial textures", "Dissonance"],
  },
];

const releaseSchedule = [
  { month: "January", release: "BBX015 - ANTI MORNING 'Winter Solstice'", type: "Digital EP" },
  { month: "February", release: "BBX016 - COLD CAVERN 'Submerged'", type: "12\" Vinyl + Digital" },
  { month: "March", release: "Various Artists - 'Nordic Frost Vol. 2'", type: "Compilation" },
  { month: "April", release: "BBX017 - SILENT STRUCTURES 'Void Protocol'", type: "Digital EP" },
  { month: "May", release: "BBX018 - NORDIC DRIFT 'Midnight Sun'", type: "12\" Vinyl" },
  { month: "June", release: "BBX019 - GLACIAL ECHOES 'Arctic Drift'", type: "Cassette + Digital" },
];

export default function Info() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <FadeIn>
            <p className="text-sm tracking-[0.3em] text-zinc-500 uppercase mb-6">
              Information
            </p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-8">
              Everything You Need to <span className="text-cyan-400">Know</span>
            </h1>
          </FadeIn>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 px-4 bg-zinc-900/30">
        <div className="max-w-3xl mx-auto">
          <FadeIn>
            <p className="text-sm tracking-[0.2em] text-zinc-500 uppercase mb-12 text-center">
              Frequently Asked Questions
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <Accordion items={faqItems} />
          </FadeIn>
        </div>
      </section>

      {/* Genre Guide */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <p className="text-sm tracking-[0.2em] text-zinc-500 uppercase mb-12 text-center">
              Our Sound
            </p>
          </FadeIn>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {genres.map((genre, i) => (
              <StaggerItem key={i}>
                <div className="p-6 bg-zinc-900/50 rounded-lg border border-zinc-800">
                  <h3 className="text-xl font-semibold mb-2">{genre.name}</h3>
                  <p className="text-zinc-400 text-sm mb-4">{genre.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {genre.characteristics.map((char, j) => (
                      <span
                        key={j}
                        className="px-2 py-1 text-xs bg-zinc-800 text-zinc-400 rounded"
                      >
                        {char}
                      </span>
                    ))}
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Release Schedule */}
      <section className="py-24 px-4 bg-zinc-900/30">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <p className="text-sm tracking-[0.2em] text-zinc-500 uppercase mb-12 text-center">
              2026 Release Schedule
            </p>
          </FadeIn>
          <div className="space-y-4">
            {releaseSchedule.map((item, i) => (
              <FadeIn key={i} delay={i * 0.05}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-zinc-900/50 rounded-lg border border-zinc-800">
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-medium text-cyan-400 w-24">
                      {item.month}
                    </span>
                    <span className="text-white">{item.release}</span>
                  </div>
                  <span className="text-sm text-zinc-500 mt-2 sm:mt-0">
                    {item.type}
                  </span>
                </div>
              </FadeIn>
            ))}
          </div>
          <FadeIn delay={0.3}>
            <p className="text-center text-sm text-zinc-500 mt-8">
              * Schedule subject to change. All releases available on major streaming platforms.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Catalog Highlights */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <p className="text-sm tracking-[0.2em] text-zinc-500 uppercase mb-12 text-center">
              Full Catalog
            </p>
          </FadeIn>
          <StaggerContainer className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {[
              { id: "BBX001", artist: "VOID STRUCTURES", title: "First Contact" },
              { id: "BBX002", artist: "NORDIC DRIFT", title: "Polar Night" },
              { id: "BBX003", artist: "COLD MATTER", title: "Absolute Zero" },
              { id: "BBX004", artist: "SILENT SIGNALS", title: "Transmission" },
              { id: "BBX005", artist: "GLACIAL PULSE", title: "Ice Fields" },
              { id: "BBX006", artist: "FROST BITE", title: "Numb" },
              { id: "BBX007", artist: "DARK HORIZON", title: "Northern Lights" },
              { id: "BBX008", artist: "BERGS", title: "High Altitude" },
              { id: "BBX009", artist: "COLD MATTER", title: "Frozen State" },
              { id: "BBX010", artist: "GLACIAL PULSE", title: "Ice Age Signals" },
              { id: "BBX011", artist: "VOID STRUCTURES", title: "Subterranean" },
              { id: "BBX012", artist: "NORDIC DRIFT", title: "Frost Patterns" },
            ].map((release, i) => (
              <StaggerItem key={i}>
                <div className="p-4 bg-zinc-900/30 rounded-lg border border-zinc-800 hover:border-zinc-600 transition-colors">
                  <p className="text-xs text-zinc-600 mb-1">{release.id}</p>
                  <p className="text-sm font-medium text-white">{release.artist}</p>
                  <p className="text-xs text-zinc-500">{release.title}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>
    </div>
  );
}