'use client';

import React from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Calendar, Sparkles, Heart } from 'lucide-react';
import SectionHeading from './SectionHeading';
import { octoberData } from '@/data/memories';

export default function OctoberSection() {
  const daysInOctober = Array.from({ length: 31 }, (_, i) => i + 1);

  const triggerDateConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#116AF8', '#20BCED', '#A0E9FF', '#CDF5FD', '#ffffff'],
    });
  };

  return (
    <section id="october-section" className="relative py-20 md:py-28 px-4 max-w-6xl mx-auto overflow-hidden">
      {/* Background Soft Blue, Concentric Rings & Starlight Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#CDF5FD]/60 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[540px] h-[540px] rounded-full border border-[#A0E9FF]/40 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[720px] rounded-full border border-white/70 pointer-events-none" />

      {/* Decorative Autumn Leaves, Moonlight & Stars in Blue Atmosphere */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{
            y: [-15, 15, -15],
            rotate: [0, 15, 0],
            opacity: [0.4, 0.9, 0.4],
          }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-12 left-8 text-[#116AF8] text-4xl drop-shadow-sm"
        >
          🌙
        </motion.div>
        <motion.div
          animate={{
            y: [10, -10, 10],
            rotate: [0, -20, 0],
            opacity: [0.35, 0.85, 0.35],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute bottom-12 right-10 text-[#20BCED] text-3xl"
        >
          🍂
        </motion.div>
        <motion.div
          animate={{
            y: [-8, 8, -8],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute top-1/3 right-12 text-[#116AF8] text-2xl"
        >
          ✨
        </motion.div>
      </div>

      {/* Section Heading */}
      <SectionHeading
        badge="A Sacred Date For Us"
        title={octoberData.heading}
        subtitle="Before you, October was just another month. Now October will always remind me of you."
      />

      {/* 1. SPECTACULAR 9 OCTOBER BIRTHDAY HERO CARD */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto -mt-4 mb-16"
      >
        <div className="relative p-8 sm:p-12 md:p-14 rounded-4xl glass-panel-dreamy border border-white/95 shadow-2xl shadow-[#116AF8]/5 text-center overflow-hidden">
          {/* Subtle Starlight Accent Ribbon */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#116AF8] via-[#20BCED] to-[#A0E9FF]" />

          {/* Watermark 9 */}
          <div className="absolute right-6 -bottom-8 text-[#CDF5FD]/70 text-[180px] sm:text-[220px] font-serif font-black pointer-events-none select-none leading-none opacity-40">
            9
          </div>

          {/* Date Header Pill */}
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#CDF5FD] border border-[#A0E9FF] text-[#116AF8] text-sm sm:text-base font-bold shadow-xs mb-6">
            <Sparkles className="w-4 h-4 text-[#20BCED]" />
            <span>09 • 10 • OCTOBER 9</span>
            <Sparkles className="w-4 h-4 text-[#20BCED]" />
          </div>

          {/* Glowing Big Date Display: "9 October 💙" */}
          <motion.div
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            onClick={triggerDateConfetti}
            className="cursor-pointer group select-none"
            title="Click to celebrate 9 October!"
          >
            <h3 className="text-4xl sm:text-6xl md:text-7xl font-serif font-black text-[#020D33] tracking-tight mb-2 drop-shadow-xs group-hover:text-[#116AF8] transition-colors">
              9 October <span className="inline-block text-[#116AF8]">💙</span>
            </h3>
            <p className="font-cursive text-2xl sm:text-3xl md:text-4xl text-[#116AF8] font-bold mb-6 tracking-wide">
              The day my favorite person came into this world.
            </p>
          </motion.div>

          {/* Deep Emotional Quotes */}
          <div className="max-w-2xl mx-auto space-y-3 font-sans text-base sm:text-lg md:text-xl text-[#020D33] font-medium leading-relaxed">
            <p className="p-4 rounded-2xl bg-[#CDF5FD]/60 border border-[#A0E9FF] text-[#020D33]">
              “Before you, October was just another month.”
            </p>
            <p className="p-4 rounded-2xl bg-white/80 border border-white text-[#020D33]">
              “Now October will always remind me of you.”
            </p>
          </div>

          {/* Highlight Badge: "Born on 9 October" */}
          <div className="mt-8 pt-6 border-t border-[#CDF5FD] flex flex-wrap items-center justify-center gap-3">
            <div className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#116AF8] to-[#20BCED] text-white text-sm sm:text-base font-bold shadow-md shadow-[#116AF8]/25 flex items-center gap-2">
              <Heart className="w-4 h-4 fill-white" />
              <span>Born on 9 October • My favorite date in my favorite month 🫶🏻</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* 2. ELEGANT OCTOBER CALENDAR WITH HIGHLIGHTED DAY 9 */}
      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.75, delay: 0.15 }}
        className="max-w-xl mx-auto rounded-4xl p-6 sm:p-9 glass-panel-dreamy border border-white/95 shadow-xl shadow-[#116AF8]/5 relative overflow-hidden"
      >
        {/* Calendar Header */}
        <div className="flex items-center justify-between pb-5 border-b border-[#CDF5FD] mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#116AF8] to-[#20BCED] flex items-center justify-center text-white shadow-md shadow-[#116AF8]/25">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif text-2xl font-black text-[#020D33] tracking-wider">
                OCTOBER
              </h4>
              <p className="text-xs text-[#2C4875] font-sans font-semibold">The month my blessing was born</p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-[#116AF8] font-bold px-3.5 py-1.5 rounded-full bg-[#CDF5FD] border border-[#A0E9FF]">
            <Sparkles className="w-3.5 h-3.5 text-[#20BCED] animate-pulse" />
            <span>09 • 10 Birthday 🎂</span>
          </div>
        </div>

        {/* Days of Week */}
        <div className="grid grid-cols-7 gap-2 text-center text-xs font-bold text-[#2C4875] mb-3">
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, idx) => (
            <span key={idx} className="py-1">
              {day}
            </span>
          ))}
        </div>

        {/* Calendar Grid of 31 Days */}
        <div className="grid grid-cols-7 gap-2 text-center text-sm font-sans font-medium text-[#020D33]">
          <span className="py-2 opacity-30 text-slate-400">29</span>
          <span className="py-2 opacity-30 text-slate-400">30</span>
          {daysInOctober.map((day) => {
            const isBirthday = day === 9;

            if (isBirthday) {
              return (
                <motion.div
                  key={day}
                  whileHover={{ scale: 1.25 }}
                  onClick={triggerDateConfetti}
                  className="py-2 rounded-2xl bg-gradient-to-tr from-[#116AF8] via-[#20BCED] to-[#116AF8] text-white shadow-lg shadow-[#116AF8]/40 flex flex-col items-center justify-center relative cursor-pointer font-bold border-2 border-white animate-pulse"
                  title="9 October — Happy Birthday My Yedu! 🎂"
                >
                  <span className="text-base leading-none">9</span>
                  <span className="text-[10px] leading-none mt-0.5">👑</span>
                  {/* Glowing ring badge */}
                  <div className="absolute -inset-1 rounded-2xl border-2 border-[#20BCED] animate-ping opacity-30 pointer-events-none" />
                </motion.div>
              );
            }

            return (
              <motion.div
                key={day}
                whileHover={{ scale: 1.15 }}
                className="py-2 rounded-xl hover:bg-[#CDF5FD] transition-all cursor-pointer flex flex-col items-center justify-center relative group"
              >
                <span>{day}</span>
                <span className="w-1 h-1 rounded-full bg-[#A0E9FF] group-hover:bg-[#116AF8]" />
              </motion.div>
            );
          })}
        </div>

        {/* Calendar Footer Note */}
        <div className="mt-7 pt-5 border-t border-[#CDF5FD] text-center">
          <p className="font-cursive text-xl sm:text-2xl text-[#116AF8] leading-relaxed font-bold">
            “9 October — my favorite date in the entire world.”
          </p>
        </div>
      </motion.div>
    </section>
  );
}
