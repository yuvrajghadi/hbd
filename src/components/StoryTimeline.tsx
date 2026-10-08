'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Coffee, HeartHandshake, Heart, Calendar } from 'lucide-react';
import SectionHeading from './SectionHeading';
import { storyTimeline, siteConfig } from '@/data/memories';

export default function StoryTimeline() {
  const getIcon = (iconName?: string) => {
    switch (iconName) {
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-[#116AF8]" />;
      case 'Coffee':
        return <Coffee className="w-5 h-5 text-[#116AF8]" />;
      case 'HeartHandshake':
        return <HeartHandshake className="w-5 h-5 text-[#116AF8]" />;
      case 'Heart':
      default:
        return <Heart className="w-5 h-5 text-[#116AF8] fill-[#116AF8]" />;
    }
  };

  return (
    <section id="story-section" className="relative py-20 md:py-28 px-4 max-w-5xl mx-auto">
      {/* Background Subtle Accent */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#A0E9FF]/25 rounded-full blur-3xl pointer-events-none" />

      {/* Section Header */}
      <SectionHeading
        badge="Chapter By Chapter"
        title={siteConfig.storyTitle}
      />

      {/* Romantic Quote Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.8 }}
        className="max-w-2xl mx-auto -mt-6 mb-16 sm:mb-20 text-center"
      >
        <div className="relative p-6 sm:p-8 rounded-3xl glass-panel-dreamy border border-white/95 shadow-xl shadow-[#116AF8]/5">
          <span className="text-3xl text-[#20BCED] font-serif leading-none block mb-1">“</span>
          <p className="font-cursive text-2xl sm:text-3xl text-[#020D33] leading-snug font-bold">
            {siteConfig.storyQuote}
          </p>
          <span className="text-3xl text-[#20BCED] font-serif leading-none block mt-1 text-right">”</span>
        </div>
      </motion.div>

      {/* Timeline Container */}
      <div className="relative">
        {/* Center Connecting Glowing Line */}
        <div className="absolute left-6 md:left-1/2 top-4 bottom-4 w-1 -translate-x-1/2 bg-gradient-to-b from-[#A0E9FF] via-[#116AF8] to-[#20BCED] rounded-full opacity-70 shadow-sm" />

        {/* Timeline Items */}
        <div className="space-y-12 md:space-y-16">
          {storyTimeline.map((item, index) => {
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.7, delay: index * 0.15 }}
                className={`relative flex flex-col md:flex-row items-start md:items-center ${
                  isEven ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Content Card Side */}
                <div className="w-full md:w-1/2 pl-16 md:pl-0 md:px-8">
                  <div
                    className={`relative p-6 sm:p-7 rounded-3xl glass-panel-dreamy border border-white/95 shadow-xl shadow-sky-950/5 hover:border-[#A0E9FF] transition-all duration-300 group hover:-translate-y-1 ${
                      isEven ? 'md:text-left' : 'md:text-right'
                    }`}
                  >
                    {/* Chapter Badge */}
                    <div
                      className={`flex items-center gap-2 mb-2 ${
                        isEven ? 'md:justify-start' : 'md:justify-end'
                      }`}
                    >
                      <span className="text-xs uppercase tracking-wider font-bold px-2.5 py-0.5 rounded-full bg-[#CDF5FD] border border-[#A0E9FF] text-[#116AF8]">
                        {item.step}
                      </span>
                      <span className="text-xs text-[#2C4875] flex items-center gap-1 font-semibold">
                        <Calendar className="w-3 h-3 text-[#20BCED]" />
                        {item.date}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#020D33] mb-2 group-hover:text-[#116AF8] transition-colors">
                      {item.title}
                    </h3>

                    {/* Story Text */}
                    <p className="text-[#2C4875] text-sm sm:text-base leading-relaxed font-sans">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Timeline Center Node */}
                <div className="absolute left-6 md:left-1/2 -translate-x-1/2 flex items-center justify-center top-6 md:top-auto">
                  <motion.div
                    whileHover={{ scale: 1.25, rotate: 10 }}
                    className="w-12 h-12 rounded-full bg-white border-2 border-[#116AF8] shadow-md shadow-[#116AF8]/25 flex items-center justify-center z-10 transition-all"
                  >
                    {getIcon(item.icon)}
                  </motion.div>
                </div>

                {/* Empty opposite side for spacing on desktop */}
                <div className="hidden md:block md:w-1/2" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
