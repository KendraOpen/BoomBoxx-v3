'use client';

import { motion } from 'framer-motion';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xl font-bold tracking-tighter text-white"
          >
            BOOMBOXX
          </motion.div>

          {/* Social Links Placeholder */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex items-center gap-6"
          >
            {['Instagram', 'Twitter', 'SoundCloud', 'Bandcamp'].map((social) => (
              <a
                key={social}
                href="#"
                className="text-xs uppercase tracking-wider text-white/50 hover:text-white transition-colors duration-200"
              >
                {social}
              </a>
            ))}
          </motion.div>

          {/* Copyright */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xs text-white/30"
          >
            © {currentYear} BoomBoxx. All rights reserved.
          </motion.p>
        </div>
      </div>
    </footer>
  );
}