'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import SectionHeading from './SectionHeading';
import { myYeduQuotes, siteConfig } from '@/data/memories';

export default function MyYeduSection() {
  return (
    <section className="relative py-20 md:py-28 px-4 max-w-5xl mx-auto">
      {/* Background Starlight Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#A0E9FF]/30 rounded-full blur-3xl pointer-events-none" />

      {/* Heading */}
      <SectionHeading
        badge="Pure Joy & Cuteness"
        title={siteConfig.myYeduTitle}
        subtitle={siteConfig.myYeduSubtitle}
      />

      {/* Quote Display Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7">
        {myYeduQuotes.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.7, delay: index * 0.15 }}
            whileHover={{ y: -6, scale: 1.02 }}
            className="relative p-7 sm:p-8 rounded-3xl glass-panel-dreamy border border-white/95 shadow-xl shadow-[#116AF8]/5 flex flex-col justify-between text-center overflow-hidden group hover:border-[#A0E9FF]"
          >
            {/* Top Emoji & Badge */}
            <div className="flex items-center justify-between mb-6">
              <span className="text-3xl sm:text-4xl">{item.emoji}</span>
              <span className="px-3.5 py-1 rounded-full bg-[#CDF5FD] border border-[#A0E9FF] text-[#116AF8] text-xs font-bold">
                {item.highlight}
              </span>
            </div>

            {/* Quote Body */}
            <div className="my-auto py-2">
              <p className="font-cursive text-2xl sm:text-3xl text-[#020D33] leading-snug font-bold">
                “{item.text}”
              </p>
            </div>

            {/* Bottom Heart Tag */}
            <div className="mt-6 pt-4 border-t border-[#CDF5FD] flex items-center justify-center gap-1.5 text-xs text-[#116AF8] font-semibold">
              <Heart className="w-3.5 h-3.5 fill-[#116AF8] text-[#116AF8] group-hover:scale-125 transition-transform" />
              <span>Only My Yedu 💙</span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
