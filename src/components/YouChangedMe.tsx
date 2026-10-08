'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, Eye } from 'lucide-react';
import SectionHeading from './SectionHeading';
import { loveReasons, siteConfig } from '@/data/memories';

export default function YouChangedMe() {
  const [flippedIds, setFlippedIds] = useState<number[]>([]);

  const toggleFlip = (id: number) => {
    setFlippedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleRevealAll = () => {
    if (flippedIds.length === loveReasons.length) {
      setFlippedIds([]);
    } else {
      setFlippedIds(loveReasons.map((r) => r.id));
    }
  };

  return (
    <section className="relative py-20 md:py-28 px-4 max-w-6xl mx-auto">
      {/* Background Soft Sky Orbs */}
      <div className="absolute top-1/3 -left-20 w-80 h-80 bg-[#A0E9FF]/35 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-[#20BCED]/20 rounded-full blur-3xl pointer-events-none" />

      {/* Heading */}
      <SectionHeading
        badge="How You Touched My Soul"
        title={siteConfig.reasonsTitle}
        subtitle={siteConfig.reasonsSubtitle}
      />

      {/* Quick Action Toggle */}
      <div className="flex justify-center mb-10">
        <button
          onClick={handleRevealAll}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/90 hover:bg-white text-[#116AF8] text-xs sm:text-sm font-bold border border-[#A0E9FF] shadow-md shadow-[#116AF8]/10 transition-all cursor-pointer backdrop-blur-md"
        >
          <Sparkles className="w-4 h-4 text-[#20BCED]" />
          <span>
            {flippedIds.length === loveReasons.length
              ? 'Flip All Cards Back'
              : 'Reveal All Thoughts ✨'}
          </span>
        </button>
      </div>

      {/* Interactive Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        {loveReasons.map((item, index) => {
          const isFlipped = flippedIds.includes(item.id);

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: index * 0.07 }}
              className="h-64 sm:h-72 perspective-1000 cursor-pointer select-none"
              onClick={() => toggleFlip(item.id)}
            >
              <motion.div
                className="relative w-full h-full rounded-3xl transition-transform duration-500 preserve-3d"
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* FRONT OF CARD (Light Frosted Glass) */}
                <div className="absolute inset-0 backface-hidden rounded-3xl p-6 flex flex-col items-center justify-between text-center glass-panel-dreamy border border-white/95 shadow-xl shadow-[#116AF8]/5 hover:border-[#A0E9FF] transition-all group">
                  {/* Top Badge */}
                  <div className="w-full flex items-center justify-between text-[#2C4875] text-xs font-semibold">
                    <span>Thought #{item.id}</span>
                    <Heart className="w-3.5 h-3.5 fill-[#116AF8] text-[#116AF8] group-hover:scale-125 transition-transform" />
                  </div>

                  {/* Main Front Content */}
                  <div className="flex flex-col items-center my-auto">
                    <span className="text-4xl sm:text-5xl mb-3 block group-hover:scale-115 transition-transform duration-300">
                      {item.emoji}
                    </span>
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#020D33] group-hover:text-[#116AF8] transition-colors">
                      {item.title}
                    </h3>
                  </div>

                  {/* Bottom Prompt */}
                  <div className="w-full flex items-center justify-center gap-1.5 text-xs text-[#116AF8] font-semibold">
                    <Eye className="w-3.5 h-3.5 text-[#20BCED]" />
                    <span>Tap to reveal my words</span>
                  </div>
                </div>

                {/* BACK OF CARD (Vivid Royal Blue & Cyan) */}
                <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-3xl p-6 flex flex-col items-center justify-between text-center bg-gradient-to-tr from-[#116AF8] via-[#1B7AF9] to-[#20BCED] text-white shadow-xl shadow-[#116AF8]/30 border border-white/60 blue-glow-sm">
                  {/* Top Back Details */}
                  <div className="w-full flex items-center justify-between text-[#CDF5FD] text-xs font-semibold">
                    <span>{item.title}</span>
                    <span>💙</span>
                  </div>

                  {/* Revealed Message */}
                  <div className="flex flex-col items-center justify-center my-auto px-2">
                    <p className="font-cursive text-2xl sm:text-3xl leading-relaxed text-white font-bold drop-shadow-xs">
                      “{item.message}”
                    </p>
                  </div>

                  {/* Bottom Back Button */}
                  <div className="w-full flex items-center justify-center gap-1 text-[11px] text-[#CDF5FD] font-semibold">
                    <span>Tap again to flip</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
