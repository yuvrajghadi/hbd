'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface SectionHeadingProps {
  badge?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
}

export default function SectionHeading({
  badge,
  title,
  subtitle,
  centered = true,
}: SectionHeadingProps) {
  return (
    <div className={`mb-12 md:mb-16 ${centered ? 'text-center' : 'text-left'}`}>
      {badge && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/85 border border-[#A0E9FF] text-[#116AF8] text-xs md:text-sm font-semibold shadow-xs mb-3.5 backdrop-blur-md"
        >
          <span className="inline-block animate-pulse text-[#20BCED]">✨</span>
          <span>{badge}</span>
          <span className="inline-block animate-pulse text-[#20BCED]">✨</span>
        </motion.div>
      )}

      <motion.h2
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="text-3xl sm:text-4xl md:text-5xl font-serif font-extrabold text-[#020D33] tracking-tight drop-shadow-xs"
      >
        {title}
      </motion.h2>

      {/* Romantic Blue Ornamental Divider */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className={`flex items-center gap-3 my-4 ${centered ? 'justify-center' : 'justify-start'}`}
      >
        <span className="h-[1.5px] w-14 bg-gradient-to-r from-transparent to-[#20BCED]" />
        <span className="text-[#116AF8] text-sm animate-pulse">💙</span>
        <span className="h-[1.5px] w-14 bg-gradient-to-l from-transparent to-[#20BCED]" />
      </motion.div>

      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="max-w-2xl mx-auto text-base sm:text-lg text-[#2C4875] font-sans leading-relaxed px-4"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
