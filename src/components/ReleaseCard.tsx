'use client';

import { motion } from 'framer-motion';

interface ReleaseCardProps {
  title: string;
  artist: string;
  catalogNumber: string;
  artwork?: string;
  href?: string;
}

export function ReleaseCard({ 
  title, 
  artist, 
  catalogNumber, 
  artwork,
  href = '#' 
}: ReleaseCardProps) {
  return (
    <motion.a
      href={href}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -4 }}
      className="group block"
    >
      {/* Artwork */}
      <div className="aspect-square bg-neutral-900 border border-white/5 relative overflow-hidden mb-4">
        {artwork ? (
          <img 
            src={artwork} 
            alt={`${title} artwork`}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 border border-white/10 rounded-full flex items-center justify-center">
              <div className="w-8 h-8 bg-white/5 rounded-full" />
            </div>
          </div>
        )}
        
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300" />
      </div>

      {/* Info */}
      <div className="space-y-1">
        <p className="text-[10px] uppercase tracking-wider text-white/40">
          {catalogNumber}
        </p>
        <h3 className="text-white font-medium text-lg leading-tight group-hover:text-white/80 transition-colors">
          {title}
        </h3>
        <p className="text-sm text-white/50">
          {artist}
        </p>
      </div>
    </motion.a>
  );
}