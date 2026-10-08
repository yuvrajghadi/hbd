'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Heart, Sparkles, MapPin } from 'lucide-react';
import SectionHeading from './SectionHeading';
import PhotoModal from './PhotoModal';
import { memories, siteConfig } from '@/data/memories';
import { Memory } from '@/types';

export default function MemoryCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedPhoto, setSelectedPhoto] = useState<Memory | null>(null);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + memories.length) % memories.length);
  }, []);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % memories.length);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedPhoto) return;
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handlePrev, handleNext, selectedPhoto]);

  return (
    <section className="relative py-20 md:py-28 px-4 max-w-6xl mx-auto overflow-hidden">
      {/* Background Soft Blue Glow & Concentric Rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-[#CDF5FD]/50 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] rounded-full border border-[#A0E9FF]/40 pointer-events-none" />

      {/* Heading */}
      <SectionHeading
        badge="Swipe Through Time"
        title={siteConfig.carouselTitle}
        subtitle={siteConfig.carouselSubtitle}
      />

      {/* Carousel Container */}
      <div className="relative max-w-4xl mx-auto">
        {/* Navigation Buttons for Desktop */}
        <div className="absolute top-1/2 -left-4 sm:-left-7 -translate-y-1/2 z-20">
          <button
            onClick={handlePrev}
            className="w-12 h-12 rounded-full bg-white/95 hover:bg-white text-[#116AF8] shadow-lg border border-[#A0E9FF] flex items-center justify-center transition-all hover:scale-110 cursor-pointer"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        </div>

        <div className="absolute top-1/2 -right-4 sm:-right-7 -translate-y-1/2 z-20">
          <button
            onClick={handleNext}
            className="w-12 h-12 rounded-full bg-white/95 hover:bg-white text-[#116AF8] shadow-lg border border-[#A0E9FF] flex items-center justify-center transition-all hover:scale-110 cursor-pointer"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Swipeable Viewport with Framer Motion Drag */}
        <div className="relative py-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, scale: 0.92, x: 50 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.92, x: -50 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.25}
              onDragEnd={(_, info) => {
                if (info.offset.x > 80) {
                  handlePrev();
                } else if (info.offset.x < -80) {
                  handleNext();
                }
              }}
              className="relative cursor-grab active:cursor-grabbing"
            >
              {/* Active Slide Card */}
              <div
                onClick={() => setSelectedPhoto(memories[activeIndex])}
                className="group relative rounded-3xl sm:rounded-4xl overflow-hidden glass-panel-dreamy border border-white/80 p-4 sm:p-6 transition-all duration-300 hover:border-[#A0E9FF] shadow-xl hover:shadow-2xl"
              >
                {/* Photo */}
                <div className="relative aspect-16/10 sm:aspect-16/9 w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-sky-100">
                  <Image
                    src={memories[activeIndex].image}
                    alt={memories[activeIndex].title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 800px"
                    className="object-cover group-hover:scale-104 transition-transform duration-700 ease-out"
                    priority
                  />

                  {/* Gradient vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#020D33]/70 via-transparent to-black/10" />

                  {/* Memory tag badge */}
                  <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md text-xs sm:text-sm font-semibold text-[#020D33] shadow-md border border-[#A0E9FF]">
                    <Heart className="w-4 h-4 fill-[#116AF8] text-[#116AF8]" />
                    <span>Memory #{memories[activeIndex].id}</span>
                  </div>

                  {/* Location tag */}
                  {memories[activeIndex].location && (
                    <div className="absolute bottom-4 left-4 flex items-center gap-1.5 text-xs sm:text-sm text-white drop-shadow-md">
                      <MapPin className="w-4 h-4 text-[#A0E9FF]" />
                      <span>{memories[activeIndex].location}</span>
                    </div>
                  )}
                </div>

                {/* Caption Details Below Image */}
                <div className="pt-6 pb-2 text-center text-[#020D33]">
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold mb-1 text-[#020D33]">
                    {memories[activeIndex].title}
                  </h3>
                  <p className="font-cursive text-2xl sm:text-3xl text-[#116AF8] tracking-wide mb-2">
                    “{memories[activeIndex].caption}”
                  </p>
                  {memories[activeIndex].description && (
                    <p className="max-w-xl mx-auto text-sm sm:text-base text-[#2C4875] font-sans">
                      {memories[activeIndex].description}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Carousel Dots & Progress Indicators */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {memories.slice(0, 10).map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                index === activeIndex
                  ? 'w-8 bg-[#116AF8] shadow-sm shadow-[#116AF8]/40'
                  : 'w-2.5 bg-[#A0E9FF] hover:bg-[#20BCED]'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Swipe Helper Text on Mobile */}
        <p className="text-center text-xs text-[#2C4875] mt-3 flex items-center justify-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-[#116AF8]" />
          <span>Swipe horizontally or use arrows to navigate</span>
        </p>
      </div>

      {/* Modal for spotlighting clicked carousel photo */}
      <PhotoModal
        memory={selectedPhoto}
        onClose={() => setSelectedPhoto(null)}
        onPrev={handlePrev}
        onNext={handleNext}
      />
    </section>
  );
}
