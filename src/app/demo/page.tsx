"use client";

import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/animations";
import Button from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface UploadedFile {
  name: string;
  size: number;
  type: string;
}

export default function Demo() {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    artistName: "",
    email: "",
    title: "",
    description: "",
    links: "",
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    processFiles(droppedFiles);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      processFiles(selectedFiles);
    }
  };

  const processFiles = (newFiles: File[]) => {
    const validTypes = [
      "audio/wav",
      "audio/x-wav",
      "audio/aiff",
      "audio/x-aiff",
      "audio/flac",
      "audio/mpeg",
      "audio/mp3",
    ];

    const validFiles = newFiles
      .filter((file) => validTypes.includes(file.type))
      .map((file) => ({
        name: file.name,
        size: file.size,
        type: file.type,
      }));

    setFiles((prev) => [...prev, ...validFiles].slice(0, 5));
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate upload
    await new Promise((resolve) => setTimeout(resolve, 2000));
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
              Demo Submissions
            </p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-8">
              Share Your <span className="text-cyan-400">Sound</span>
            </h1>
            <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
              We're always looking for fresh talent. Submit your demo and join
              the Nordic electronic underground.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Submission Form */}
      <section className="py-24 px-4 bg-zinc-900/30">
        <div className="max-w-3xl mx-auto">
          {submitted ? (
            <FadeIn>
              <div className="text-center p-12 bg-zinc-900/50 rounded-lg border border-zinc-800">
                <div className="w-16 h-16 mx-auto mb-6 bg-green-900/30 rounded-full flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-green-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold mb-2">Demo Received!</h2>
                <p className="text-zinc-400 mb-6">
                  Thank you for submitting. We'll listen to your tracks and get
                  back to you within 2-4 weeks.
                </p>
                <Button
                  onClick={() => {
                    setSubmitted(false);
                    setFiles([]);
                    setFormData({
                      artistName: "",
                      email: "",
                      title: "",
                      description: "",
                      links: "",
                    });
                  }}
                >
                  Submit Another Demo
                </Button>
              </div>
            </FadeIn>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* File Upload */}
              <FadeIn>
                <div>
                  <h2 className="text-xl font-semibold mb-4">Upload Your Tracks</h2>
                  <p className="text-sm text-zinc-500 mb-4">
                    Accepted formats: WAV, AIFF, FLAC, MP3 (max 5 files, 100MB each)
                  </p>
                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer ${
                      isDragging
                        ? "border-cyan-400 bg-cyan-400/10"
                        : "border-zinc-700 hover:border-zinc-600"
                    }`}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".wav,.aiff,.aif,.flac,.mp3"
                      multiple
                      onChange={handleFileSelect}
                      className="hidden"
                    />
                    <div className="space-y-2">
                      <div className="w-12 h-12 mx-auto bg-zinc-800 rounded-full flex items-center justify-center">
                        <svg
                          className="w-6 h-6 text-zinc-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                          />
                        </svg>
                      </div>
                      <p className="text-zinc-400">
                        Drag & drop your tracks here, or click to browse
                      </p>
                    </div>
                  </div>

                  {/* File List */}
                  <AnimatePresence>
                    {files.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-4 space-y-2"
                      >
                        {files.map((file, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-3 bg-zinc-900 rounded-lg border border-zinc-800"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-zinc-800 rounded flex items-center justify-center">
                                <svg
                                  className="w-4 h-4 text-zinc-400"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
                                  />
                                </svg>
                              </div>
                              <div>
                                <p className="text-sm text-white">{file.name}</p>
                                <p className="text-xs text-zinc-500">
                                  {formatFileSize(file.size)}
                                </p>
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={() => removeFile(index)}
                              className="p-2 text-zinc-500 hover:text-red-400 transition-colors"
                            >
                              <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M6 18L18 6M6 6l12 12"
                                />
                              </svg>
                            </button>
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </FadeIn>

              {/* Artist Info */}
              <FadeIn delay={0.1}>
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold">Artist Information</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <Input
                      label="Artist / Project Name"
                      type="text"
                      placeholder="Your artist name"
                      value={formData.artistName}
                      onChange={(e) =>
                        setFormData({ ...formData, artistName: e.target.value })
                      }
                      required
                    />
                    <Input
                      label="Email"
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      required
                    />
                  </div>
                  <Input
                    label="Release Title"
                    type="text"
                    placeholder="Proposed title for the release"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    required
                  />
                  <Textarea
                    label="Description"
                    placeholder="Tell us about your music, influences, and any relevant background..."
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    rows={4}
                  />
                  <Input
                    label="Links (optional)"
                    type="text"
                    placeholder="SoundCloud, Bandcamp, Instagram, etc."
                    value={formData.links}
                    onChange={(e) =>
                      setFormData({ ...formData, links: e.target.value })
                    }
                  />
                </div>
              </FadeIn>

              {/* Submit */}
              <FadeIn delay={0.2}>
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between pt-4">
                  <p className="text-sm text-zinc-500">
                    By submitting, you agree to our terms and confirm you own the
                    rights to the submitted material.
                  </p>
                  <Button
                    type="submit"
                    size="lg"
                    disabled={isSubmitting || files.length === 0}
                  >
                    {isSubmitting ? "Uploading..." : "Submit Demo"}
                  </Button>
                </div>
              </FadeIn>
            </form>
          )}
        </div>
      </section>

      {/* Tips Section */}
      <section className="py-24 px-4">
        <div className="max-w-3xl mx-auto">
          <FadeIn>
            <h2 className="text-2xl font-semibold mb-8 text-center">
              Tips for a Great Demo
            </h2>
          </FadeIn>
          <StaggerContainer className="space-y-4">
            {[
              "Include 2-3 of your best tracks - quality over quantity",
              "Send unfinished or work-in-progress tracks are fine by us",
              "Don't over-compress your audio - leave some headroom",
              "Include a brief description of your influences and vision",
              "Check that your files aren't corrupted before uploading",
            ].map((tip, i) => (
              <StaggerItem key={i}>
                <div className="flex items-start gap-4 p-4 bg-zinc-900/30 rounded-lg">
                  <div className="w-8 h-8 bg-zinc-800 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-medium text-zinc-400">
                      {i + 1}
                    </span>
                  </div>
                  <p className="text-zinc-400">{tip}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>
    </div>
  );
}