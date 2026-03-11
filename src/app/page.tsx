"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/animations";
import Button from "@/components/ui/button";

const featuredReleases = [
  {
    id: "BBX012",
    artist: "NORDIC DRIFT",
    title: "Frost Patterns",
    format: "12\" Vinyl / Digital",
    color: "from-cyan-500 to-blue-600",
  },
  {
    id: "BBX011",
    artist: "VOID STRUCTURES",
    title: "Subterranean",
    format: "Digital EP",
    color: "from-purple-500 to-pink-600",
  },
  {
    id: "BBX010",
    artist: "GLACIAL PULSE",
    title: "Ice Age Signals",
    format: "12\" Vinyl",
    color: "from-blue-500 to-indigo-600",
  },
  {
    id: "BBX009",
    artist: "COLD MATTER",
    title: "Frozen State",
    format: "Cassette / Digital",
    color: "from-slate-500 to-zinc-600",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-black to-black" />
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/30 rounded-full blur-[128px]" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/30 rounded-full blur-[128px]" />
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <FadeIn>
            <p className="text-sm tracking-[0.3em] text-zinc-500 uppercase mb-6">
              Stockholm • Copenhagen • Oslo
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="text-5xl sm:text-7xl md:text-8xl font-bold tracking-tight mb-6">
              <span className="bg-gradient-to-r from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent">
                BOOMBOXX
              </span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-lg sm:text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed">
              Nordic electronic label curating dark soundscapes, minimalist beats,
              and ambient textures from the cold north.
            </p>
          </FadeIn>
          <FadeIn delay={0.3}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/demo">
                <Button size="lg">Submit Demo</Button>
              </Link>
              <Link href="/about">
                <Button variant="outline" size="lg">
                  Our Story
                </Button>
              </Link>
            </div>
          </FadeIn>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-6 h-10 border-2 border-zinc-700 rounded-full flex justify-center"
          >
            <div className="w-1 h-2 bg-zinc-500 rounded-full mt-2" />
          </motion.div>
        </motion.div>
      </section>

      {/* Featured Releases */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <div className="flex items-end justify-between mb-12">
              <div>
                <p className="text-sm tracking-[0.2em] text-zinc-500 uppercase mb-2">
                  Latest Releases
                </p>
                <h2 className="text-3xl sm:text-4xl font-bold">Featured</h2>
              </div>
              <Link
                href="/info"
                className="hidden sm:block text-sm text-zinc-500 hover:text-white transition-colors"
              >
                View all releases →
              </Link>
            </div>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredReleases.map((release) => (
              <StaggerItem key={release.id}>
                <Link href={`/info`} className="group block">
                  <div className="relative aspect-square rounded-lg overflow-hidden mb-4">
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${release.color} opacity-80 group-hover:opacity-100 transition-opacity`}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-6xl font-bold text-white/20">
                        {release.id.slice(-3)}
                      </span>
                    </div>
                    <div className="absolute top-3 left-3 px-2 py-1 bg-black/50 backdrop-blur-sm rounded text-xs text-white">
                      {release.id}
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-white group-hover:text-cyan-400 transition-colors">
                    {release.artist}
                  </h3>
                  <p className="text-sm text-zinc-400">{release.title}</p>
                  <p className="text-xs text-zinc-600 mt-1">{release.format}</p>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <div className="mt-8 text-center sm:hidden">
            <Link
              href="/info"
              className="text-sm text-zinc-500 hover:text-white transition-colors"
            >
              View all releases →
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-24 px-4 bg-zinc-900/50">
        <div className="max-w-2xl mx-auto text-center">
          <FadeIn>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Stay in the Loop
            </h2>
            <p className="text-zinc-400 mb-8">
              Get notified about new releases, artist features, and exclusive content.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-full text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-600"
              />
              <Button type="submit">Subscribe</Button>
            </form>
            <p className="text-xs text-zinc-600 mt-4">
              No spam. Unsubscribe anytime.
            </p>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}