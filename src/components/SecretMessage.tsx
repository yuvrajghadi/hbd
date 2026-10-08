'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Lock, Unlock, Feather, Sparkles } from 'lucide-react';
import SectionHeading from './SectionHeading';
import { secretLetter, siteConfig } from '@/data/memories';

export default function SecretMessage() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenSecret = () => {
    setIsOpen(true);

    // Warm blue & starlight celebration confetti
    confetti({
      particleCount: 140,
      spread: 75,
      origin: { y: 0.6 },
      colors: ['#CDF5FD', '#A0E9FF', '#20BCED', '#116AF8', '#020D33', '#ffffff'],
    });
  };

  return (
    <section className="relative py-20 md:py-28 px-4 max-w-4xl mx-auto">
      {/* Background glowing rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-[#CDF5FD]/60 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] rounded-full border border-[#A0E9FF]/40 pointer-events-none" />

      {/* Heading */}
      <SectionHeading
        badge="Just For You, Yedu"
        title={siteConfig.secretTeaser}
        subtitle="Some thoughts are sealed with pure love and care."
      />

      <div className="relative max-w-2xl mx-auto">
        <AnimatePresence mode="wait">
          {!isOpen ? (
            /* LOCKED ENVELOPE / CARD */
            <motion.div
              key="locked"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.5 }}
              className="relative p-8 sm:p-12 rounded-3xl sm:rounded-4xl text-center glass-panel-dreamy border border-white/80 shadow-2xl overflow-hidden"
            >
              {/* Wax Seal Graphic in Royal Blue & Cyan */}
              <motion.div
                animate={{ scale: [1, 1.06, 1] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                className="relative w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-tr from-[#116AF8] via-[#20BCED] to-[#A0E9FF] flex items-center justify-center text-white shadow-xl shadow-[#116AF8]/30 border-2 border-white"
              >
                <Lock className="w-10 h-10 drop-shadow-md text-white" />
                {/* Sparkle badge */}
                <div className="absolute -top-1 -right-1 text-xl animate-bounce">
                  ✨
                </div>
              </motion.div>

              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#020D33] mb-3">
                {secretLetter.teaser}
              </h3>

              <p className="font-cursive text-xl sm:text-2xl text-[#116AF8] mb-8 max-w-md mx-auto">
                A personal letter sealed with all my love for my baby.
              </p>

              {/* Unlock Button */}
              <motion.button
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.96 }}
                onClick={handleOpenSecret}
                className="group relative px-9 py-4 rounded-full bg-gradient-to-r from-[#116AF8] via-[#20BCED] to-[#116AF8] text-white font-serif font-bold text-lg sm:text-xl shadow-lg shadow-[#116AF8]/30 hover:shadow-xl hover:shadow-[#20BCED]/40 transition-all cursor-pointer inline-flex items-center gap-3 border border-white/60"
              >
                <span>{siteConfig.secretButton}</span>
                <Sparkles className="w-5 h-5 text-white group-hover:rotate-12 transition-transform" />
              </motion.button>
            </motion.div>
          ) : (
            /* UNLOCKED ROMANTIC LETTER */
            <motion.div
              key="unlocked"
              initial={{ opacity: 0, scale: 0.85, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ type: 'spring', damping: 22, stiffness: 220 }}
              className="relative p-8 sm:p-14 rounded-3xl sm:rounded-4xl glass-panel-dreamy border border-white/90 shadow-2xl overflow-hidden text-[#020D33]"
            >
              {/* Subtle Blue Ribbon line */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#116AF8] via-[#20BCED] to-[#A0E9FF]" />

              {/* Watermark Heart */}
              <div className="absolute right-4 bottom-4 text-[#CDF5FD]/40 text-9xl pointer-events-none select-none font-serif">
                💙
              </div>

              {/* Header with Feather Icon */}
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#A0E9FF]/40">
                <div className="flex items-center gap-2 text-[#116AF8]">
                  <Feather className="w-5 h-5 text-[#116AF8]" />
                  <span className="font-serif italic text-sm tracking-wide">
                    A Birthday Letter For Yedu
                  </span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 border border-[#A0E9FF] text-[#116AF8] text-xs font-semibold shadow-sm">
                  <Unlock className="w-3.5 h-3.5" />
                  <span>Unlocked with Love</span>
                </div>
              </div>

              {/* Heading */}
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#020D33] mb-6 italic">
                {secretLetter.heading}
              </h3>

              {/* Letter Paragraphs */}
              <div className="space-y-4 mb-8 text-[#020D33] font-sans text-base sm:text-lg leading-relaxed">
                {secretLetter.paragraphs.map((p, i) => (
                  <p key={i} className="leading-relaxed text-[#020D33]/90">
                    {p}
                  </p>
                ))}
              </div>

              {/* Emotional Climax Signoff */}
              <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-[#CDF5FD]/60 to-[#D8F4FD]/60 border border-[#A0E9FF]/60 mb-8 text-center shadow-sm">
                <p className="font-cursive text-2xl sm:text-3xl md:text-4xl text-[#116AF8] leading-snug font-bold">
                  “{secretLetter.signOff}”
                </p>
              </div>

              {/* Signature */}
              <div className="text-right pt-2 border-t border-[#A0E9FF]/40">
                <p className="font-cursive text-3xl sm:text-4xl text-[#020D33] tracking-wider">
                  {secretLetter.signature}
                </p>
              </div>

              {/* Re-seal option */}
              <div className="mt-8 text-center">
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-xs text-[#116AF8]/80 hover:text-[#116AF8] underline cursor-pointer"
                >
                  Close & seal the letter again
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
