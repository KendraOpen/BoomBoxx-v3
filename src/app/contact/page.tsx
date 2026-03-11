"use client";

import { FadeIn } from "@/components/ui/animations";
import { Input, Textarea } from "@/components/ui/input";
import Button from "@/components/ui/button";
import { useState } from "react";

export default function Contact() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <FadeIn>
            <p className="text-sm tracking-[0.3em] text-zinc-500 uppercase mb-6">
              Get in Touch
            </p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-8">
              Let's <span className="text-purple-400">Connect</span>
            </h1>
            <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
              Have a question, proposal, or just want to say hello? We'd love to hear from you.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-24 px-4 bg-zinc-900/30">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <FadeIn>
              <div>
                <h2 className="text-2xl font-semibold mb-6">Send a Message</h2>
                {submitted ? (
                  <div className="p-6 bg-green-900/20 border border-green-800 rounded-lg">
                    <p className="text-green-400 font-medium mb-2">
                      Message sent successfully!
                    </p>
                    <p className="text-zinc-400 text-sm">
                      We'll get back to you as soon as possible.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="mt-4 text-sm text-zinc-400 hover:text-white transition-colors"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <Input
                      label="Name"
                      type="text"
                      placeholder="Your name"
                      value={formState.name}
                      onChange={(e) =>
                        setFormState({ ...formState, name: e.target.value })
                      }
                      required
                    />
                    <Input
                      label="Email"
                      type="email"
                      placeholder="your@email.com"
                      value={formState.email}
                      onChange={(e) =>
                        setFormState({ ...formState, email: e.target.value })
                      }
                      required
                    />
                    <Textarea
                      label="Message"
                      placeholder="Tell us what's on your mind..."
                      value={formState.message}
                      onChange={(e) =>
                        setFormState({ ...formState, message: e.target.value })
                      }
                      rows={6}
                      required
                    />
                    <Button
                      type="submit"
                      size="lg"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto"
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                )}
              </div>
            </FadeIn>

            {/* Contact Info */}
            <FadeIn delay={0.1}>
              <div className="space-y-12">
                <div>
                  <h2 className="text-2xl font-semibold mb-6">Contact Info</h2>
                  <div className="space-y-6">
                    <div>
                      <p className="text-sm text-zinc-500 mb-1">Email</p>
                      <a
                        href="mailto:info@boomboxx.se"
                        className="text-lg text-white hover:text-cyan-400 transition-colors"
                      >
                        info@boomboxx.se
                      </a>
                    </div>
                    <div>
                      <p className="text-sm text-zinc-500 mb-1">Demo Submissions</p>
                      <a
                        href="mailto:demos@boomboxx.se"
                        className="text-lg text-white hover:text-cyan-400 transition-colors"
                      >
                        demos@boomboxx.se
                      </a>
                    </div>
                    <div>
                      <p className="text-sm text-zinc-500 mb-1">Press & Media</p>
                      <a
                        href="mailto:press@boomboxx.se"
                        className="text-lg text-white hover:text-cyan-400 transition-colors"
                      >
                        press@boomboxx.se
                      </a>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4">Office</h3>
                  <p className="text-zinc-400 leading-relaxed">
                    BoomBoxx Records AB<br />
                    Södermalm<br />
                    Denmark<br />
                    116 XX
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
                  <div className="flex gap-4">
                    {[
                      { name: "Instagram", href: "#" },
                      { name: "SoundCloud", href: "#" },
                      { name: "Bandcamp", href: "#" },
                      { name: "Twitter", href: "#" },
                    ].map((social) => (
                      <a
                        key={social.name}
                        href={social.href}
                        className="px-4 py-2 bg-zinc-800 rounded-full text-sm text-zinc-400 hover:bg-zinc-700 hover:text-white transition-colors"
                      >
                        {social.name}
                      </a>
                    ))}
                  </div>
                </div>

                <div className="p-6 bg-zinc-900/50 rounded-lg border border-zinc-800">
                  <p className="text-sm text-zinc-400">
                    <strong className="text-white">Note:</strong> For demo submissions,
                    please use our dedicated{" "}
                    <a href="/demo" className="text-cyan-400 hover:underline">
                      demo upload page
                    </a>
                    . We can't guarantee that demo emails will be listened to.
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </div>
  );
}