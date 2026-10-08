'use client';

import React, { useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Heart, Sparkles, MapPin, Calendar, Star, Film, Volume2, Play } from 'lucide-react';
import { Memory } from '@/types';

interface PhotoModalProps {
  memory: Memory | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export default function PhotoModal({
  memory,
  onClose,
  onPrev,
  onNext,
}: PhotoModalProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    },
    [onClose, onPrev, onNext]
  );

  useEffect(() => {
    if (memory) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [memory, handleKeyDown]);

  if (!memory) return null;

  const isVideo = memory.mediaType === 'video' || Boolean(memory.videoUrl);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6">
        {/* Soft Darkened Navy Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#020D33]/80 backdrop-blur-md cursor-pointer"
        />

        {/* Floating Sparkles inside Modal */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{
                opacity: 0,
                scale: 0.4,
                x: `${10 + i * 11}%`,
                y: `${20 + ((i * 15) % 60)}%`,
              }}
              animate={{
                opacity: [0.3, 0.9, 0.3],
                scale: [0.6, 1.2, 0.6],
                y: ['-10px', '15px', '-10px'],
              }}
              transition={{
                duration: 3 + (i % 3),
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.2,
              }}
              className="absolute text-[#20BCED] text-xl"
            >
              {i % 2 === 0 ? '✨' : '💙'}
            </motion.div>
          ))}
        </div>

        {/* Modal Window Container */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 30 }}
          transition={{ type: 'spring', damping: 25, stiffness: 280 }}
          onClick={(e) => e.stopPropagation()}
          className="relative z-10 w-full max-w-5xl max-h-[94vh] flex flex-col md:flex-row bg-white/95 backdrop-blur-2xl rounded-3xl sm:rounded-4xl overflow-hidden shadow-2xl border border-white"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-30 w-11 h-11 rounded-full bg-white/90 hover:bg-white text-[#020D33] border border-[#CDF5FD] flex items-center justify-center shadow-lg backdrop-blur-sm transition-all duration-200 hover:scale-110 cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5 text-[#020D33]" />
          </button>

          {/* Left / Top: High-Res Image OR Cinematic Video Player */}
          <div className="relative w-full md:w-3/5 bg-slate-950 min-h-[300px] sm:min-h-[420px] md:min-h-[550px] flex items-center justify-center overflow-hidden">
            {isVideo && memory.videoUrl ? (
              <div className="relative w-full h-full flex items-center justify-center bg-black">
                <video
                  ref={videoRef}
                  src={memory.videoUrl}
                  controls
                  autoPlay
                  playsInline
                  loop
                  className="w-full h-full max-h-[85vh] object-contain"
                />
              </div>
            ) : (
              <Image
                src={memory.image}
                alt={memory.title}
                fill
                sizes="(max-width: 768px) 100vw, 60vw"
                className="object-contain"
                priority
              />
            )}

            {/* Previous Navigation Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onPrev();
              }}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/90 hover:bg-white text-[#116AF8] border border-white flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-110 cursor-pointer z-20"
              aria-label="Previous media"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Next Navigation Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onNext();
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/90 hover:bg-white text-[#116AF8] border border-white flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-110 cursor-pointer z-20"
              aria-label="Next media"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Right / Bottom: Story & Caption Details */}
          <div className="w-full md:w-2/5 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto bg-gradient-to-b from-white via-[#F4FBFE] to-[#EAF7FD] text-[#020D33]">
            <div>
              {/* Meta tags */}
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#CDF5FD] border border-[#A0E9FF] text-[#116AF8] text-xs font-bold">
                  {isVideo ? (
                    <>
                      <Film className="w-3.5 h-3.5 text-[#116AF8]" />
                      <span>Video Memory #{memory.id}</span>
                    </>
                  ) : (
                    <>
                      <Heart className="w-3.5 h-3.5 fill-[#116AF8] text-[#116AF8]" />
                      <span>Memory #{memory.id}</span>
                    </>
                  )}
                </span>
                {memory.highlight && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#116AF8]/10 border border-[#116AF8]/30 text-[#116AF8] text-xs font-bold">
                    <Star className="w-3 h-3 fill-[#116AF8] text-[#116AF8]" />
                    <span>Special</span>
                  </span>
                )}
                {memory.date && (
                  <span className="inline-flex items-center gap-1 text-xs text-[#2C4875] font-semibold">
                    <Calendar className="w-3.5 h-3.5 text-[#20BCED]" />
                    <span>{memory.date}</span>
                  </span>
                )}
              </div>

              {/* Title */}
              <h2 className="text-2xl sm:text-3xl font-serif font-extrabold text-[#020D33] mb-2 leading-tight">
                {memory.title}
              </h2>

              {/* Location / Mood Tag */}
              {memory.location && (
                <div className="flex items-center gap-1.5 text-xs text-[#2C4875] mb-5 font-medium">
                  <MapPin className="w-3.5 h-3.5 text-[#116AF8]" />
                  <span>{memory.location}</span>
                </div>
              )}

              {/* Romantic Highlight Caption */}
              <div className="p-4 rounded-2xl bg-[#CDF5FD]/85 border border-[#A0E9FF] mb-4 shadow-xs">
                <p className="font-cursive text-2xl sm:text-3xl text-[#116AF8] leading-snug font-bold">
                  “{memory.caption}”
                </p>
              </div>

              {/* Emotional Description / Story Snippet */}
              {memory.description && (
                <div className="text-[#2C4875] text-sm sm:text-base leading-relaxed font-sans mb-3">
                  <p>{memory.description}</p>
                </div>
              )}

              {memory.storySnippet && memory.storySnippet !== memory.description && (
                <div className="text-[#183669] text-xs sm:text-sm leading-relaxed font-sans italic border-l-2 border-[#116AF8] pl-3 mt-3">
                  <p>“{memory.storySnippet}”</p>
                </div>
              )}
            </div>

            {/* Bottom Footer Info */}
            <div className="pt-6 mt-6 border-t border-[#CDF5FD] flex items-center justify-between text-xs text-[#2C4875]">
              <span className="flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-[#20BCED]" />
                <span>Use ← and → arrow keys</span>
              </span>
              <span className="font-bold text-[#116AF8]">My Yedu 💙</span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
