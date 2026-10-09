'use client';

import React from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, ChevronDown } from 'lucide-react';
import { siteConfig } from '@/data/memories';

interface HeroProps {
  onUnlock: () => void;
  isUnlocked: boolean;
}

export default function Hero({ onUnlock }: HeroProps) {
  const triggerBirthdayCelebration = () => {
    // Elegant blue confetti, stars, and sparkles based on user's exact palette
    const count = 180;
    const defaults = {
      origin: { y: 0.65 },
      colors: ['#116AF8', '#20BCED', '#A0E9FF', '#CDF5FD', '#ffffff', '#020D33'],
    };

    confetti({
      ...defaults,
      particleCount: count * 0.45,
      spread: 70,
    });
    confetti({
      ...defaults,
      particleCount: count * 0.35,
      spread: 110,
    });
    confetti({
      ...defaults,
      particleCount: count * 0.2,
      spread: 130,
      startVelocity: 45,
    });
  };

  const handleOpenClick = () => {
    triggerBirthdayCelebration();
    onUnlock();

    // Smoothly scroll down to the October / Story section
    setTimeout(() => {
      const target = document.getElementById('october-section') || document.getElementById('story-section');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }, 400);
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden bg-gradient-to-b from-[#D8F4FD] via-[#CDF5FD] to-[#EBF7FD]">
      {/* Background Animated Dreamy Sky Blobs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#A0E9FF]/50 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-[#20BCED]/25 rounded-full blur-3xl pointer-events-none animate-pulse delay-1000" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#A0E9FF]/30 rounded-full blur-3xl pointer-events-none" />

      {/* Concentric Decorative Rings inspired by reference palette */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] rounded-full border border-[#20BCED]/20 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] rounded-full border border-[#A0E9FF]/30 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[880px] h-[880px] rounded-full border border-white/60 pointer-events-none" />

      {/* Decorative Floating Sparkles & Light Blue Hearts */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{
            y: [-10, 10, -10],
            rotate: [0, 15, 0],
            opacity: [0.5, 0.9, 0.5],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-20 left-[15%] text-[#116AF8] text-2xl drop-shadow-sm"
        >
          ✨
        </motion.div>
        <motion.div
          animate={{
            y: [10, -10, 10],
            rotate: [0, -15, 0],
            opacity: [0.4, 0.9, 0.4],
          }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute top-32 right-[18%] text-[#20BCED] text-3xl drop-shadow-sm"
        >
          💙
        </motion.div>
        <motion.div
          animate={{
            y: [-8, 8, -8],
            opacity: [0.4, 0.8, 0.4],
          }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          className="absolute bottom-32 left-[18%] text-[#116AF8] text-2xl"
        >
          🌟
        </motion.div>
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center pt-8 pb-12">
        {/* Sweet 9 October Birthday Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/90 backdrop-blur-md border border-[#A0E9FF] text-[#116AF8] text-xs sm:text-sm font-bold shadow-md shadow-[#116AF8]/10 mb-4"
        >
          <motion.span
            animate={{ scale: [1, 1.25, 1] }}
            transition={{ duration: 1.8, repeat: Infinity }}
          >
            🎂
          </motion.span>
          <span>09 • 10 — 9 October will always be special to me 💙</span>
          <motion.span
            animate={{ scale: [1, 1.25, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, delay: 0.3 }}
          >
            ✨
          </motion.span>
        </motion.div>

        {/* Big Romantic Birthday Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-extrabold text-[#020D33] tracking-tight leading-tight mb-3 drop-shadow-xs"
        >
          Happy Birthday, My Yedu 💙
        </motion.h1>

        {/* Cursive Romantic Subtitle: "My Baby. My Favorite Girl. My Happiness." */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="font-cursive text-2xl sm:text-3xl md:text-4xl text-[#116AF8] font-bold mb-3 tracking-wide drop-shadow-xs"
        >
          My Baby. My Favorite Girl. My Happiness.
        </motion.p>

        {/* Small Emotional Date Line */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="font-sans text-sm sm:text-base text-[#2C4875] mb-5 max-w-lg font-medium"
        >
          “Born on 9 October. My favorite date in my favorite month. 🫶🏻”
        </motion.p>

        {/* Romantic Glowing Blue Heart Icon Animation */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.5 }}
          className="relative mb-5"
        >
          <div className="absolute inset-0 bg-[#20BCED] rounded-full blur-xl opacity-40 animate-ping" />
          <motion.div
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-[#116AF8] via-[#20BCED] to-[#A0E9FF] flex items-center justify-center text-white shadow-xl shadow-[#116AF8]/35 border-2 border-white blue-glow-sm"
          >
            <Heart className="w-8 h-8 sm:w-10 sm:h-10 fill-white text-white drop-shadow-md" />
          </motion.div>
        </motion.div>

        {/* CTA Button: "Open Your Birthday Surprise 🎂" */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="flex flex-col items-center"
        >
          <motion.button
            onClick={handleOpenClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            className="group relative px-8 sm:px-10 py-3.5 sm:py-4 rounded-full bg-gradient-to-r from-[#116AF8] via-[#20BCED] to-[#116AF8] text-white font-medium text-lg sm:text-xl shadow-lg shadow-[#116AF8]/30 hover:shadow-xl hover:shadow-[#116AF8]/45 transition-all duration-300 border border-white/60 cursor-pointer overflow-hidden blue-glow-sm"
          >
            {/* Shimmer sweep effect */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/35 to-transparent" />

            <span className="relative flex items-center gap-3">
              <span>{siteConfig.ctaButtonText}</span>
              <Sparkles className="w-5 h-5 text-[#CDF5FD] group-hover:rotate-12 transition-transform" />
            </span>
          </motion.button>

          {/* Gentle indicator helper */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="mt-4 flex items-center gap-1.5 text-xs sm:text-sm text-[#116AF8]/80 font-medium"
          >
            <span>Click to enter your birthday world</span>
            <ChevronDown className="w-4 h-4 animate-bounce text-[#116AF8]" />
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom wave transition into page */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#EBF7FD] to-transparent pointer-events-none" />
    </section>
  );
}
