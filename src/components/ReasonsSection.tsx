'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, Eye } from 'lucide-react';
import SectionHeading from './SectionHeading';
import { loveReasons, siteConfig } from '@/data/memories';

export default function ReasonsSection() {
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
      {/* Background soft ambient accents */}
      <div className="absolute top-1/3 -left-20 w-80 h-80 bg-rose-200/25 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-pink-200/25 rounded-full blur-3xl pointer-events-none" />

      {/* Heading */}
      <SectionHeading
        badge="From The Bottom Of My Heart"
        title={siteConfig.reasonsTitle}
        subtitle={siteConfig.reasonsSubtitle}
      />

      {/* Quick Action Toggle */}
      <div className="flex justify-center mb-10">
        <button
          onClick={handleRevealAll}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 hover:bg-white text-rose-700 text-xs sm:text-sm font-semibold border border-rose-200/80 shadow-xs hover:shadow-md transition-all cursor-pointer backdrop-blur-sm"
        >
          <Sparkles className="w-4 h-4 text-rose-500" />
          <span>
            {flippedIds.length === loveReasons.length
              ? 'Hide All Reasons'
              : 'Reveal All Reasons ✨'}
          </span>
        </button>
      </div>

      {/* Interactive Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
        {loveReasons.map((item, index) => {
          const isFlipped = flippedIds.includes(item.id);

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
              className="h-64 sm:h-72 perspective-1000 cursor-pointer select-none"
              onClick={() => toggleFlip(item.id)}
            >
              <motion.div
                className="relative w-full h-full rounded-3xl transition-transform duration-500 preserve-3d"
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* FRONT OF CARD */}
                <div className="absolute inset-0 backface-hidden rounded-3xl p-6 flex flex-col items-center justify-between text-center bg-white/80 backdrop-blur-md border border-rose-200/90 shadow-lg shadow-rose-950/5 hover:shadow-xl hover:shadow-rose-400/20 hover:border-rose-300 transition-all group">
                  {/* Top Badge */}
                  <div className="w-full flex items-center justify-between text-rose-400 text-xs font-semibold">
                    <span>Reason #{item.id}</span>
                    <Heart className="w-3.5 h-3.5 fill-rose-300 text-rose-400 group-hover:scale-125 transition-transform" />
                  </div>

                  {/* Main Front Content */}
                  <div className="flex flex-col items-center my-auto">
                    <span className="text-4xl sm:text-5xl mb-3 block group-hover:scale-115 transition-transform duration-300">
                      {item.emoji}
                    </span>
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-rose-950 group-hover:text-rose-600 transition-colors">
                      {item.title}
                    </h3>
                  </div>

                  {/* Bottom Prompt */}
                  <div className="w-full flex items-center justify-center gap-1.5 text-xs text-rose-600/70 group-hover:text-rose-700 font-medium">
                    <Eye className="w-3.5 h-3.5" />
                    <span>Tap to reveal secret</span>
                  </div>
                </div>

                {/* BACK OF CARD (REVEALED MESSAGE) */}
                <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-3xl p-6 flex flex-col items-center justify-between text-center bg-gradient-to-tr from-rose-500 via-rose-400 to-pink-500 text-white shadow-xl shadow-rose-500/25 border border-rose-300">
                  {/* Top Back Details */}
                  <div className="w-full flex items-center justify-between text-pink-100 text-xs font-semibold">
                    <span>{item.title}</span>
                    <span>❤️</span>
                  </div>

                  {/* Revealed Message */}
                  <div className="flex flex-col items-center justify-center my-auto px-1">
                    <p className="font-cursive text-2xl sm:text-2xl leading-relaxed text-white drop-shadow-xs">
                      “{item.message}”
                    </p>
                  </div>

                  {/* Bottom Back Button */}
                  <div className="w-full flex items-center justify-center gap-1 text-[11px] text-pink-200/90 font-medium">
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
