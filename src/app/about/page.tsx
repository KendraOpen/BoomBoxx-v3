"use client";

import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/animations";

const team = [
  {
    name: "Foad",
    role: "Founder / A&R",
    bio: "Curating electronic sounds since 2015. Obsessed with modular synthesis and cold climates.",
  },
  {
    name: "Maya Lindberg",
    role: "Art Director",
    bio: "Visual artist based in Stockholm. Creating visual identities for Nordic underground artists.",
  },
  {
    name: "Erik Nordström",
    role: "Distribution",
    bio: "Handles logistics across Europe. Deep knowledge of vinyl pressing and export regulations.",
  },
];

export default function About() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <FadeIn>
            <p className="text-sm tracking-[0.3em] text-zinc-500 uppercase mb-6">
              Our Story
            </p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-8">
              From the <span className="text-cyan-400">Cold</span> Comes{' '}
              <span className="text-purple-400">Sound</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="text-lg text-zinc-400 leading-relaxed max-w-2xl mx-auto">
              Born in Stockholm in 2019, BoomBoxx emerged from a shared obsession
              with the aesthetics of Nordic winter - the stark beauty, the long
              nights, the silence between sounds.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Vision */}
      <section className="py-24 px-4 bg-zinc-900/30">
        <div className="max-w-6xl mx-auto">
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <StaggerItem>
              <div className="space-y-6">
                <p className="text-sm tracking-[0.2em] text-zinc-500 uppercase">
                  Our Vision
                </p>
                <h2 className="text-3xl sm:text-4xl font-bold">
                  Music for the <br />
                  <span className="text-zinc-500">In-Between</span> Moments
                </h2>
                <p className="text-zinc-400 leading-relaxed">
                  We believe in music that exists in the spaces between - the
                  transitional moments, the liminal states, the quiet hours.
                  Our catalog spans ambient, minimal techno, experimental
                  electronics, and everything that fits our aesthetic of
                  "dark minimalism."
                </p>
                <p className="text-zinc-400 leading-relaxed">
                  Every release is carefully curated to maintain a cohesive
                  vision while allowing artists the freedom to explore their
                  unique sonic interpretations of the Nordic experience.
                </p>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="relative aspect-[4/5] rounded-lg overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/50 to-purple-900/50" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-6xl font-bold text-white/10">2019</p>
                    <p className="text-sm tracking-widest text-white/30 mt-2">
                      EST. STOCKHOLM
                    </p>
                  </div>
                </div>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <p className="text-sm tracking-[0.2em] text-zinc-500 uppercase mb-12 text-center">
              What We Stand For
            </p>
          </FadeIn>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Quality Over Quantity",
                description:
                  "We release 8-12 carefully selected titles per year, ensuring each one meets our exacting standards.",
              },
              {
                title: "Artist First",
                description:
                  "Fair splits, creative freedom, and genuine support for our artists' visions and careers.",
              },
              {
                title: "Sustainable Physical",
                description:
                  "Eco-friendly vinyl pressing, recycled packaging, and minimal plastic usage.",
              },
            ].map((value, i) => (
              <StaggerItem key={i}>
                <div className="p-6 bg-zinc-900/50 rounded-lg border border-zinc-800">
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-lg mb-4 flex items-center justify-center">
                    <span className="text-xl font-bold text-white">{i + 1}</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                  <p className="text-zinc-400 text-sm">{value.description}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 px-4 bg-zinc-900/30">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <p className="text-sm tracking-[0.2em] text-zinc-500 uppercase mb-12 text-center">
              The Team
            </p>
          </FadeIn>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, i) => (
              <StaggerItem key={i}>
                <div className="text-center">
                  <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center">
                    <span className="text-4xl font-bold text-zinc-700">
                      {member.name.charAt(0)}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                  <p className="text-sm text-cyan-400 mb-3">{member.role}</p>
                  <p className="text-sm text-zinc-500">{member.bio}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Join Us CTA */}
      <section className="py-24 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <FadeIn>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Want to Work With Us?
            </h2>
            <p className="text-zinc-400 mb-8">
              We're always looking for new artists pushing the boundaries
              of Nordic electronic music.
            </p>
            <a
              href="/demo"
              className="inline-block px-8 py-4 bg-white text-black font-medium rounded-full hover:bg-zinc-200 transition-colors"
            >
              Submit Your Demo
            </a>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}