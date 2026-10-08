'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Maximize2, ChevronLeft, ChevronRight, MapPin } from 'lucide-react';
import SectionHeading from './SectionHeading';
import PhotoModal from './PhotoModal';
import { memories, siteConfig } from '@/data/memories';

export default function PhotoSpotlight() {
  const [activeSpotlightIndex, setActiveSpotlightIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const activeMemory = memories[activeSpotlightIndex];

  const handlePrev = () => {
    setActiveSpotlightIndex((prev) => (prev - 1 + memories.length) % memories.length);
  };

  const handleNext = () => {
    setActiveSpotlightIndex((prev) => (prev + 1) % memories.length);
  };

  return (
    <section className="relative py-20 md:py-28 px-4 max-w-6xl mx-auto">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-gradient-to-tr from-[#A0E9FF]/40 to-[#20BCED]/20 rounded-full blur-3xl pointer-events-none" />

      {/* Heading */}
      <SectionHeading
        badge="In The Spotlight"
        title={siteConfig.spotlightTitle}
        subtitle={siteConfig.spotlightSubtitle}
      />

      {/* Prominent Large Showcase Container */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.8 }}
        className="relative max-w-4xl mx-auto"
      >
        <div
          onClick={() => setIsModalOpen(true)}
          className="group relative cursor-pointer overflow-hidden rounded-3xl sm:rounded-4xl glass-panel-dreamy border border-white/95 shadow-2xl p-4 sm:p-6 transition-all duration-500 hover:border-[#A0E9FF]"
        >
          {/* Main Large Image Container */}
          <div className="relative aspect-16/10 sm:aspect-16/9 w-full overflow-hidden rounded-2xl sm:rounded-3xl bg-[#CDF5FD]/60">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeMemory.id}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="relative w-full h-full"
              >
                <Image
                  src={activeMemory.image}
                  alt={activeMemory.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 896px"
                  className="object-cover group-hover:scale-104 transition-transform duration-700 ease-out"
                  priority
                />

                {/* Soft Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

                {/* Top Corner Details */}
                <div className="absolute top-4 left-4 sm:top-6 sm:left-6 flex items-center gap-2">
                  <span className="px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md text-xs sm:text-sm font-bold text-[#020D33] shadow-md flex items-center gap-1.5 border border-white/80">
                    <Heart className="w-4 h-4 fill-[#116AF8] text-[#116AF8]" />
                    <span>Featured Memory</span>
                  </span>
                </div>

                {/* Expand Indicator Badge */}
                <div className="absolute top-4 right-4 sm:top-6 sm:right-6 px-3.5 py-1.5 rounded-full bg-white/85 backdrop-blur-md text-[#116AF8] text-xs sm:text-sm font-bold flex items-center gap-1.5 border border-white/80 group-hover:bg-[#116AF8] group-hover:text-white transition-colors">
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>Click to Expand</span>
                </div>

                {/* Bottom Overlay Content */}
                <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 text-white">
                  {activeMemory.location && (
                    <div className="flex items-center gap-1 text-xs sm:text-sm text-[#A0E9FF] mb-1 font-medium">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{activeMemory.location}</span>
                    </div>
                  )}
                  <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl font-extrabold text-white drop-shadow-md">
                    {activeMemory.title}
                  </h3>
                  <p className="font-cursive text-xl sm:text-2xl md:text-3xl text-[#A0E9FF] mt-1 tracking-wide font-bold drop-shadow-sm">
                    “{activeMemory.caption}”
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Quick Selector Thumbnail Bar & Prev/Next Controls */}
          <div className="mt-5 flex flex-col sm:flex-row items-center justify-between gap-4 px-2">
            {/* Quick Thumbnail Indicators */}
            <div className="flex items-center gap-2 overflow-x-auto max-w-full py-1">
              {memories.slice(0, 8).map((m, idx) => (
                <button
                  key={m.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveSpotlightIndex(idx);
                  }}
                  className={`relative w-12 h-10 sm:w-14 sm:h-12 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                    idx === activeSpotlightIndex
                      ? 'border-[#116AF8] scale-105 shadow-md shadow-[#116AF8]/35'
                      : 'border-[#CDF5FD] opacity-70 hover:opacity-100 hover:scale-102'
                  }`}
                  aria-label={`Select memory ${m.id}`}
                >
                  <Image
                    src={m.image}
                    alt={m.title}
                    fill
                    sizes="56px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>

            {/* Stepper Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrev();
                }}
                className="w-10 h-10 rounded-full bg-white hover:bg-[#CDF5FD] text-[#116AF8] border border-[#A0E9FF] flex items-center justify-center transition-all cursor-pointer shadow-xs"
                aria-label="Previous spotlight photo"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <span className="text-xs font-bold text-[#020D33] px-2">
                {activeSpotlightIndex + 1} / {memories.length}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                className="w-10 h-10 rounded-full bg-white hover:bg-[#CDF5FD] text-[#116AF8] border border-[#A0E9FF] flex items-center justify-center transition-all cursor-pointer shadow-xs"
                aria-label="Next spotlight photo"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Expanded Modal */}
      <PhotoModal
        memory={isModalOpen ? activeMemory : null}
        onClose={() => setIsModalOpen(false)}
        onPrev={handlePrev}
        onNext={handleNext}
      />
    </section>
  );
}
