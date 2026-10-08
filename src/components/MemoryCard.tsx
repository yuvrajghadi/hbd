'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, Variants } from 'framer-motion';
import { Heart, Sparkles, MapPin, Maximize2, Star, Play, Film } from 'lucide-react';
import { Memory } from '@/types';

interface MemoryCardProps {
  memory: Memory;
  onSelect: (memory: Memory) => void;
  index: number;
}

// Handcrafted distinct animation variants for each photo/video
const getCardVariants = (animationType: Memory['animation']): Variants => {
  switch (animationType) {
    case 'fade':
      return {
        hidden: { opacity: 0, scale: 0.88 },
        visible: {
          opacity: 1,
          scale: 1,
          transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
        },
      };

    case 'slide-left':
      return {
        hidden: { opacity: 0, x: -70 },
        visible: {
          opacity: 1,
          x: 0,
          transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
        },
      };

    case 'slide-right':
      return {
        hidden: { opacity: 0, x: 70 },
        visible: {
          opacity: 1,
          x: 0,
          transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
        },
      };

    case 'rotate':
      return {
        hidden: { opacity: 0, rotate: -8, scale: 0.9 },
        visible: {
          opacity: 1,
          rotate: 0,
          scale: 1,
          transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] },
        },
      };

    case 'flip-3d':
      return {
        hidden: { opacity: 0, rotateY: 80, scale: 0.92 },
        visible: {
          opacity: 1,
          rotateY: 0,
          scale: 1,
          transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
        },
      };

    case 'blur-zoom':
      return {
        hidden: { opacity: 0, scale: 0.75, filter: 'blur(14px)' },
        visible: {
          opacity: 1,
          scale: 1,
          filter: 'blur(0px)',
          transition: { duration: 0.85, ease: 'easeOut' },
        },
      };

    case 'polaroid':
      return {
        hidden: { opacity: 0, y: -50, rotate: -4 },
        visible: {
          opacity: 1,
          y: 0,
          rotate: [-4, 2, -1],
          transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] },
        },
      };

    case 'floating':
      return {
        hidden: { opacity: 0, y: 50 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
        },
      };

    default:
      return {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
      };
  }
};

export default function MemoryCard({ memory, onSelect, index }: MemoryCardProps) {
  const [imageError, setImageError] = useState(false);
  const variants = getCardVariants(memory.animation);

  const isVideo = memory.mediaType === 'video' || Boolean(memory.videoUrl);
  const isPolaroid = memory.animation === 'polaroid';
  const isFloating = memory.animation === 'floating';

  // Dynamic layout span classes
  const spanClass =
    memory.layoutSpan === 'featured'
      ? 'col-span-1 sm:col-span-2'
      : memory.layoutSpan === 'wide'
      ? 'col-span-1 sm:col-span-2'
      : 'col-span-1';

  // Aspect ratio based on layout span
  const aspectClass =
    memory.layoutSpan === 'tall'
      ? 'aspect-[3/4]'
      : memory.layoutSpan === 'wide'
      ? 'aspect-[16/9]'
      : memory.layoutSpan === 'featured'
      ? 'aspect-[16/10]'
      : 'aspect-4/3';

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      whileHover={{
        y: -8,
        scale: 1.02,
        transition: { duration: 0.3, ease: 'easeOut' },
      }}
      onClick={() => onSelect(memory)}
      className={`group relative cursor-pointer select-none rounded-3xl p-4 transition-all duration-300 ${spanClass} ${
        isPolaroid
          ? 'polaroid-frame-blue rotate-[-1deg] hover:rotate-0'
          : 'glass-panel-dreamy border border-white/95 hover:border-[#A0E9FF] shadow-lg shadow-[#116AF8]/5 hover:shadow-2xl hover:shadow-[#20BCED]/20'
      } ${isFloating ? 'animate-float-slow' : ''}`}
    >
      {/* 1. MEDIA CONTAINER (PHOTO OR VIDEO PREVIEW) */}
      <div className={`relative ${aspectClass} w-full overflow-hidden rounded-2xl bg-[#CDF5FD]/60`}>
        {isVideo && memory.videoUrl ? (
          <div className="relative w-full h-full bg-slate-900 overflow-hidden">
            <video
              src={memory.videoUrl}
              muted
              loop
              autoPlay
              playsInline
              preload="metadata"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            {/* Play Badge Overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/25 group-hover:bg-black/10 transition-colors">
              <div className="w-12 h-12 rounded-full bg-white/90 text-[#116AF8] flex items-center justify-center shadow-xl group-hover:scale-115 transition-transform duration-300 border border-white">
                <Play className="w-6 h-6 fill-[#116AF8] text-[#116AF8] ml-0.5" />
              </div>
            </div>
          </div>
        ) : !imageError ? (
          <Image
            src={memory.image}
            alt={memory.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
            onError={() => setImageError(true)}
            priority={index < 3}
          />
        ) : (
          /* Graceful Fallback */
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-gradient-to-tr from-[#CDF5FD] to-[#A0E9FF] text-[#020D33]">
            <Heart className="w-12 h-12 text-[#116AF8] fill-[#116AF8] animate-pulse mb-3" />
            <p className="font-serif font-bold text-lg text-[#020D33]">{memory.title}</p>
            <p className="text-xs text-[#116AF8] mt-1">Memory ({memory.image})</p>
          </div>
        )}

        {/* Soft Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/15 opacity-60 group-hover:opacity-35 transition-opacity duration-300 pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-xs font-semibold text-[#020D33] shadow-sm border border-white/80">
          {isVideo ? (
            <>
              <Film className="w-3.5 h-3.5 text-[#116AF8]" />
              <span className="font-bold text-[#116AF8]">Video Memory</span>
            </>
          ) : memory.highlight ? (
            <>
              <Star className="w-3.5 h-3.5 fill-[#116AF8] text-[#116AF8]" />
              <span className="font-bold text-[#116AF8]">Special Moment</span>
            </>
          ) : (
            <>
              <Heart className="w-3.5 h-3.5 fill-[#20BCED] text-[#20BCED]" />
              <span>Moment #{memory.id}</span>
            </>
          )}
        </div>

        {/* Spotlight Zoom Icon on Hover */}
        <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/85 backdrop-blur-md text-[#116AF8] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-90 group-hover:scale-100 border border-white shadow-md">
          <Maximize2 className="w-4 h-4" />
        </div>

        {/* Date / Location on Bottom of Image */}
        {memory.location && (
          <div className="absolute bottom-3 left-3 flex items-center gap-1 text-[11px] text-white font-medium drop-shadow-md">
            <MapPin className="w-3 h-3 text-[#A0E9FF]" />
            <span>{memory.location}</span>
          </div>
        )}
      </div>

      {/* 2. STAGGERED TEXT REVEAL: TITLE -> CAPTION -> DESCRIPTION */}
      <div className="pt-4 pb-1 px-1">
        {/* Title */}
        <motion.h3
          initial={{ opacity: 0, y: 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="font-serif text-lg sm:text-xl font-extrabold text-[#020D33] group-hover:text-[#116AF8] transition-colors line-clamp-1"
        >
          {memory.title}
        </motion.h3>

        {/* Heartfelt Caption */}
        <motion.p
          initial={{ opacity: 0, y: 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="font-cursive text-xl sm:text-2xl font-bold text-[#116AF8] tracking-wide mt-1 line-clamp-1"
        >
          “{memory.caption}”
        </motion.p>

        {/* Short memory description */}
        {memory.description && (
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-xs sm:text-sm font-sans text-[#2C4875] mt-2 line-clamp-2 leading-relaxed"
          >
            {memory.description}
          </motion.p>
        )}

        {/* Micro Interaction Hint */}
        <div className="flex items-center justify-between mt-3.5 pt-2.5 border-t border-[#CDF5FD] text-xs text-[#116AF8]">
          <span className="flex items-center gap-1 font-medium">
            <Sparkles className="w-3 h-3 text-[#20BCED]" />
            <span>{isVideo ? 'Tap to watch video' : 'Tap to open full view'}</span>
          </span>
          <span className="font-bold group-hover:translate-x-1 transition-transform">
            View Story →
          </span>
        </div>
      </div>
    </motion.div>
  );
}
