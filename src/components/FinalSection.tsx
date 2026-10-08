'use client';

import React from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, ArrowUp } from 'lucide-react';
import { finalClosingLines } from '@/data/memories';

export default function FinalSection() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const triggerCelebration = () => {
    const end = Date.now() + 3.5 * 1000;
    const colors = ['#CDF5FD', '#A0E9FF', '#20BCED', '#116AF8', '#020D33', '#ffffff', '#ffd166'];

    (function frame() {
      // Side fireworks burst
      confetti({
        particleCount: 6,
        angle: 60,
        spread: 70,
        origin: { x: 0, y: 0.7 },
        colors: colors,
      });
      confetti({
        particleCount: 6,
        angle: 120,
        spread: 70,
        origin: { x: 1, y: 0.7 },
        colors: colors,
      });

      // Center starlight burst
      confetti({
        particleCount: 4,
        angle: 90,
        spread: 100,
        origin: { x: 0.5, y: 0.5 },
        colors: colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  };

  return (
    <footer className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 py-24 bg-gradient-to-b from-[#EBF7FD] via-[#D8F4FD] to-[#BFE8FC] overflow-hidden">
      {/* Background Animated Dreamy Orbs & Rings */}
      <div className="absolute top-1/4 -right-20 w-96 h-96 bg-[#A0E9FF]/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -left-20 w-96 h-96 bg-[#CDF5FD]/60 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-[#20BCED]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] rounded-full border border-[#A0E9FF]/30 pointer-events-none" />

      {/* Floating Constellation Stars */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 16 }).map((_, i) => (
          <motion.div
            key={i}
            animate={{
              opacity: [0.3, 0.95, 0.3],
              scale: [0.7, 1.35, 0.7],
            }}
            transition={{
              duration: 3 + (i % 4),
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.25,
            }}
            style={{
              top: `${8 + ((i * 17) % 82)}%`,
              left: `${5 + ((i * 23) % 90)}%`,
            }}
            className="absolute text-[#20BCED] text-lg drop-shadow-[0_0_8px_rgba(32,188,237,0.5)]"
          >
            ✦
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
        {/* Pulsing Animated Big Blue Heart */}
        <motion.div
          animate={{ scale: [1, 1.15, 1, 1.18, 1] }}
          transition={{
            duration: 2.2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="relative mb-8 cursor-pointer"
          onClick={triggerCelebration}
          title="Click to celebrate Yedu's 9 October birthday!"
        >
          <div className="absolute inset-0 bg-[#A0E9FF] rounded-full blur-xl opacity-60 animate-ping" />
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-tr from-[#116AF8] via-[#20BCED] to-[#A0E9FF] flex items-center justify-center text-white shadow-2xl shadow-[#116AF8]/40 border-2 border-white">
            <Heart className="w-12 h-12 sm:w-14 sm:h-14 fill-white text-white drop-shadow-md" />
          </div>
        </motion.div>

        {/* Large Climax Heading: "Happy Birthday, My Yedu 💙" */}
        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-3xl sm:text-5xl md:text-6xl font-serif font-extrabold text-[#020D33] tracking-tight leading-tight mb-3 drop-shadow-sm"
        >
          {finalClosingLines[0]}
        </motion.h2>

        {/* Cursive Subtitle: "9 October — my favorite date. • Thank you for coming into my life." */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-cursive text-2xl sm:text-3xl md:text-4xl text-[#116AF8] leading-snug max-w-2xl mb-8 font-bold"
        >
          {finalClosingLines[1]} • {finalClosingLines[2]}
        </motion.p>

        {/* Staggered Thank You List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="my-6 p-6 sm:p-8 rounded-4xl glass-panel-dreamy border border-white/95 shadow-xl shadow-[#116AF8]/5 max-w-xl w-full text-center space-y-3.5"
        >
          {finalClosingLines.slice(3, 8).map((line, idx) => (
            <p key={idx} className="font-sans text-base sm:text-lg text-[#020D33] font-semibold flex items-center justify-center gap-2">
              <span className="text-[#116AF8]">💙</span>
              <span>{line}</span>
            </p>
          ))}
        </motion.div>

        {/* Final Birthday Date Callout */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="my-8"
        >
          <span className="font-serif text-2xl sm:text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#116AF8] via-[#20BCED] to-[#116AF8] drop-shadow-sm">
            {finalClosingLines[8]}
          </span>
        </motion.div>

        {/* Interactive Birthday Shower Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={triggerCelebration}
          className="mb-14 px-9 py-4 rounded-full bg-gradient-to-r from-[#116AF8] via-[#20BCED] to-[#116AF8] hover:opacity-95 text-white text-base sm:text-lg font-bold shadow-xl shadow-[#116AF8]/30 border border-white/60 inline-flex items-center gap-2.5 cursor-pointer transition-all"
        >
          <Sparkles className="w-5 h-5 text-white" />
          <span>Celebrate My Yedu (09 • 10) ✨ 🎂</span>
        </motion.button>

        {/* Back to top button */}
        <button
          onClick={scrollToTop}
          className="group flex flex-col items-center gap-2 text-[#2C4875] hover:text-[#020D33] transition-colors cursor-pointer mb-12"
        >
          <div className="w-11 h-11 rounded-full bg-white/90 border border-[#A0E9FF] flex items-center justify-center shadow-md group-hover:-translate-y-1 transition-transform text-[#116AF8]">
            <ArrowUp className="w-5 h-5 text-[#116AF8]" />
          </div>
          <span className="text-xs font-semibold">Back to top</span>
        </button>

        {/* Bottom Footer Note */}
        <div className="pt-6 border-t border-[#A0E9FF]/40 w-full max-w-md text-center">
          <p className="font-serif italic text-base sm:text-lg text-[#020D33] flex items-center justify-center gap-1.5 font-medium">
            <span>Made with</span>
            <Heart className="w-4 h-4 fill-[#116AF8] text-[#116AF8] inline-block animate-pulse" />
            <span>just for my Yedu.</span>
          </p>
          <p className="text-xs text-[#2C4875] mt-1 font-semibold">
            09 • 10 — Forever & Always Your Person 💙
          </p>
        </div>
      </div>
    </footer>
  );
}
