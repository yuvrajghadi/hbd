'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Feather, Heart, Sparkles } from 'lucide-react';
import SectionHeading from './SectionHeading';
import { birthdayLetter } from '@/data/memories';

export default function BirthdayLetter() {
  return (
    <section className="relative py-20 md:py-28 px-4 max-w-4xl mx-auto">
      {/* Background Soft Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#A0E9FF]/25 rounded-full blur-3xl pointer-events-none" />

      {/* Heading */}
      <SectionHeading
        badge="From My Heart To Yours"
        title={birthdayLetter.heading}
        subtitle="Every word here is pure truth, just for you..."
      />

      {/* Emotional Letter Container */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.8 }}
        className="relative max-w-2xl mx-auto rounded-3xl sm:rounded-4xl p-8 sm:p-12 md:p-14 glass-panel-dreamy border border-white/95 shadow-2xl shadow-sky-950/8 overflow-hidden"
      >
        {/* Subtle Starlight Accent line at top */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#116AF8] via-[#20BCED] to-[#A0E9FF]" />

        {/* Ambient Watermark Heart */}
        <div className="absolute -right-6 -bottom-6 text-[#CDF5FD]/50 text-9xl pointer-events-none select-none font-serif">
          💙
        </div>

        {/* Letter Header */}
        <div className="flex items-center justify-between pb-6 mb-8 border-b border-[#CDF5FD]">
          <div className="flex items-center gap-2 text-[#116AF8]">
            <Feather className="w-5 h-5 text-[#116AF8]" />
            <span className="font-serif italic text-sm tracking-wider font-semibold">A Letter for the Birthday Girl</span>
          </div>
          <div className="flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#CDF5FD] border border-[#A0E9FF] text-[#116AF8] text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5 text-[#20BCED]" />
            <span>Special Words</span>
          </div>
        </div>

        {/* Paragraph-by-Paragraph Scroll Reveal */}
        <div className="space-y-6 sm:space-y-7 font-sans text-base sm:text-lg md:text-xl text-[#020D33] leading-relaxed">
          {birthdayLetter.paragraphs.map((paragraph, index) => (
            <motion.p
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.7, delay: index * 0.15 }}
              className={`leading-relaxed ${
                index === 0
                  ? 'font-bold text-[#020D33] text-lg sm:text-xl'
                  : ''
              } ${
                index === 1
                  ? 'p-4 rounded-2xl bg-[#CDF5FD]/75 border border-[#A0E9FF] font-medium text-[#020D33]'
                  : ''
              } ${
                index === 3 || index === 4
                  ? 'font-cursive text-2xl sm:text-3xl text-[#116AF8] font-bold'
                  : ''
              }`}
            >
              {paragraph}
            </motion.p>
          ))}
        </div>

        {/* Signoff & Signature */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-10 pt-6 border-t border-[#CDF5FD] flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <div className="flex items-center gap-2 text-[#116AF8] text-sm font-semibold">
            <Heart className="w-4 h-4 fill-[#116AF8] text-[#116AF8]" />
            <span>Forever by your side</span>
          </div>

          <div className="text-center sm:text-right">
            <p className="font-cursive text-2xl sm:text-3xl text-[#020D33] font-bold tracking-wider">
              {birthdayLetter.closing[0]}
            </p>
            <p className="text-xs text-[#116AF8] font-semibold mt-1">
              {birthdayLetter.closing[1]}
            </p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
