'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Heart, Award, RotateCcw } from 'lucide-react';
import SectionHeading from './SectionHeading';
import { siteConfig } from '@/data/memories';

const TEASING_MESSAGES = [
  "Nice try! You can't click me 💨",
  "Error 404: 'No' was not found! 😜",
  "Oops, too fast for you, Baby! 🏃‍♂️💨",
  "Are you sure? Try again! 🙈",
  "There is literally no other choice! 💙",
  "Computer says: ONLY YES ALLOWED FOR YEDU! 🥰",
  "Hey! Don't even think about it! 😂",
];

export default function LoveQuestion() {
  const [hasWon, setHasWon] = useState(false);
  const [noAttempts, setNoAttempts] = useState(0);
  const [noPosition, setNoPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [currentTease, setCurrentTease] = useState<string>('');

  const triggerBlueHeartConfetti = () => {
    // Canvas confetti burst with blues, cyans, and golds
    const count = 220;
    const defaults = {
      origin: { y: 0.7 },
      colors: ['#116AF8', '#20BCED', '#A0E9FF', '#CDF5FD', '#ffd166', '#ffffff'],
    };

    confetti({
      ...defaults,
      particleCount: count * 0.5,
      spread: 60,
    });
    confetti({
      ...defaults,
      particleCount: count * 0.3,
      spread: 100,
    });
    confetti({
      ...defaults,
      particleCount: count * 0.2,
      spread: 120,
      startVelocity: 45,
    });
  };

  const handleYesClick = () => {
    setHasWon(true);
    triggerBlueHeartConfetti();
  };

  const handleNoEvade = () => {
    const nextAttempts = noAttempts + 1;
    setNoAttempts(nextAttempts);

    // Random teasing message
    const msg = TEASING_MESSAGES[(nextAttempts - 1) % TEASING_MESSAGES.length];
    setCurrentTease(msg);

    // Move button randomly within a bounded range
    const randomX = (Math.random() - 0.5) * 220;
    const randomY = (Math.random() - 0.5) * 160;
    setNoPosition({ x: randomX, y: randomY });
  };

  const handleReset = () => {
    setHasWon(false);
    setNoAttempts(0);
    setNoPosition({ x: 0, y: 0 });
    setCurrentTease('');
  };

  return (
    <section className="relative py-20 md:py-28 px-4 max-w-4xl mx-auto">
      {/* Background soft blue orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#A0E9FF]/30 rounded-full blur-3xl pointer-events-none" />

      {/* Heading */}
      <SectionHeading
        badge="Pop Quiz For The Birthday Girl"
        title={siteConfig.gameTitle}
        subtitle="Be completely honest... the truth will be rewarded!"
      />

      {/* Game Card Container */}
      <div className="relative max-w-2xl mx-auto rounded-3xl sm:rounded-4xl p-8 sm:p-12 text-center glass-panel-dreamy border border-white/95 shadow-2xl">
        <AnimatePresence mode="wait">
          {!hasWon ? (
            /* QUESTION STATE */
            <motion.div
              key="question"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center"
            >
              {/* Question Icon */}
              <motion.div
                animate={{ rotate: [0, -10, 10, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                className="w-20 h-20 rounded-full bg-[#CDF5FD] border border-[#A0E9FF] flex items-center justify-center text-4xl mb-6 shadow-inner"
              >
                👀
              </motion.div>

              {/* Question Text */}
              <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#020D33] mb-4 leading-snug">
                {siteConfig.gameQuestion}
              </h3>

              <p className="font-cursive text-xl sm:text-2xl text-[#116AF8] mb-8 font-bold">
                Think carefully before choosing your answer... 😉
              </p>

              {/* Teasing feedback bubble when user tries to click No */}
              {currentTease && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  key={currentTease + noAttempts}
                  className="mb-6 px-4 py-2 rounded-2xl bg-[#CDF5FD] border border-[#20BCED] text-[#020D33] text-sm font-bold shadow-xs inline-flex items-center gap-2"
                >
                  <span>⚠️</span>
                  <span>{currentTease}</span>
                </motion.div>
              )}

              {/* Buttons Row with Evading "No" */}
              <div className="relative w-full min-h-[140px] flex items-center justify-center gap-6 sm:gap-8">
                {/* YES BUTTON */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleYesClick}
                  className="relative z-10 px-8 sm:px-10 py-3.5 sm:py-4 rounded-full bg-gradient-to-r from-[#116AF8] via-[#20BCED] to-[#116AF8] hover:from-[#116AF8] hover:to-[#20BCED] text-white font-serif font-bold text-lg sm:text-xl shadow-lg shadow-[#116AF8]/30 border border-white/60 cursor-pointer flex items-center gap-2 blue-glow-sm"
                >
                  <span>{siteConfig.gameYesText}</span>
                  <Heart className="w-5 h-5 fill-white" />
                </motion.button>

                {/* NO BUTTON (EVASIVE) */}
                <motion.button
                  animate={{
                    x: noPosition.x,
                    y: noPosition.y,
                  }}
                  transition={{ type: 'spring', stiffness: 350, damping: 20 }}
                  onMouseEnter={handleNoEvade}
                  onClick={handleNoEvade}
                  onTouchStart={handleNoEvade}
                  className="px-8 sm:px-10 py-3.5 sm:py-4 rounded-full bg-[#CDF5FD] hover:bg-[#A0E9FF] text-[#020D33] font-serif font-bold text-lg sm:text-xl border border-[#A0E9FF] shadow-xs cursor-pointer select-none transition-colors"
                >
                  <span>{siteConfig.gameNoText}</span>
                </motion.button>
              </div>

              {noAttempts > 0 && (
                <p className="text-xs text-[#116AF8] font-semibold mt-4">
                  Attempts to say &quot;No&quot;: {noAttempts} (Mission Failed 🚀)
                </p>
              )}
            </motion.div>
          ) : (
            /* SUCCESS STATE */
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
              className="flex flex-col items-center"
            >
              {/* Animated Beating Blue Heart Badge */}
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
                className="w-24 h-24 rounded-full bg-gradient-to-tr from-[#116AF8] via-[#20BCED] to-[#A0E9FF] flex items-center justify-center text-white shadow-xl shadow-[#116AF8]/35 mb-6 blue-glow-sm border-2 border-white"
              >
                <Heart className="w-12 h-12 fill-white text-white drop-shadow-md" />
              </motion.div>

              <span className="text-sm uppercase tracking-wider font-extrabold text-[#116AF8] mb-1">
                {siteConfig.gameSuccessTitle}
              </span>

              <h3 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#020D33] mb-3">
                {siteConfig.gameSuccessMessage}
              </h3>

              {/* Romantic Voucher Card in Light Blue Palette */}
              <div className="w-full max-w-md my-6 p-6 rounded-2xl bg-gradient-to-r from-[#CDF5FD] to-[#E5F7FD] border-2 border-dashed border-[#20BCED] shadow-sm text-left relative overflow-hidden">
                <div className="absolute top-2 right-2 text-[#20BCED]/30 text-4xl">
                  🎁
                </div>
                <div className="flex items-center gap-2 text-[#116AF8] font-bold text-sm mb-1">
                  <Award className="w-4 h-4 text-[#116AF8]" />
                  <span>OFFICIAL BIRTHDAY HUG PASS FOR YEDU</span>
                </div>
                <p className="font-serif text-lg font-bold text-[#020D33]">
                  Unlimited Hugs, Forehead Kisses & Love
                </p>
                <p className="text-xs text-[#2C4875] mt-1 font-medium">
                  Valid for: A lifetime • Non-transferable • Exclusively for My Baby
                </p>
              </div>

              {/* Reset or Play Again Button */}
              <button
                onClick={handleReset}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white hover:bg-[#CDF5FD] text-[#116AF8] text-sm font-bold transition-all cursor-pointer mt-2 border border-[#A0E9FF] shadow-xs"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Play again</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
