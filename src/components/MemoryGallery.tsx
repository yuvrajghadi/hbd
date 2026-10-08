'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, Film, Star } from 'lucide-react';
import SectionHeading from './SectionHeading';
import MemoryCard from './MemoryCard';
import PhotoModal from './PhotoModal';
import { memories, siteConfig } from '@/data/memories';
import { Memory } from '@/types';

export default function MemoryGallery() {
  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null);
  const [activeFilter, setActiveFilter] = useState<'all' | 'video' | 'core' | 'candid'>('all');
  const [visibleCount, setVisibleCount] = useState<number>(14);

  const videoCount = memories.filter((m) => m.mediaType === 'video' || m.videoUrl).length;

  const filteredMemories = memories.filter((m) => {
    if (activeFilter === 'video') return m.mediaType === 'video' || Boolean(m.videoUrl);
    if (activeFilter === 'core') return m.category === 'core' || m.highlight;
    if (activeFilter === 'candid') return m.category === 'candid';
    return true;
  });

  const displayedMemories = filteredMemories.slice(0, visibleCount);

  const handlePrev = () => {
    if (!selectedMemory) return;
    const currentIndex = memories.findIndex((m) => m.id === selectedMemory.id);
    const prevIndex = (currentIndex - 1 + memories.length) % memories.length;
    setSelectedMemory(memories[prevIndex]);
  };

  const handleNext = () => {
    if (!selectedMemory) return;
    const currentIndex = memories.findIndex((m) => m.id === selectedMemory.id);
    const nextIndex = (currentIndex + 1) % memories.length;
    setSelectedMemory(memories[nextIndex]);
  };

  return (
    <section id="gallery-section" className="relative py-20 md:py-28 px-4 max-w-7xl mx-auto">
      {/* Background Soft Blue Glows & Concentric Rings */}
      <div className="absolute top-1/4 -right-20 w-80 h-80 bg-[#A0E9FF]/35 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -left-20 w-80 h-80 bg-[#20BCED]/20 rounded-full blur-3xl pointer-events-none" />

      {/* Heading */}
      <SectionHeading
        badge="Our Little Moments"
        title={siteConfig.galleryTitle}
        subtitle={siteConfig.gallerySubtitle}
      />

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2.5 mb-12">
        <button
          onClick={() => {
            setActiveFilter('all');
            setVisibleCount(14);
          }}
          className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer backdrop-blur-md shadow-xs ${
            activeFilter === 'all'
              ? 'bg-gradient-to-r from-[#116AF8] to-[#20BCED] text-white shadow-md shadow-[#116AF8]/25 border border-white/60'
              : 'bg-white/85 text-[#020D33] border border-[#CDF5FD] hover:bg-white hover:border-[#A0E9FF]'
          }`}
        >
          All Moments ({memories.length})
        </button>

        <button
          onClick={() => {
            setActiveFilter('video');
            setVisibleCount(14);
          }}
          className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer backdrop-blur-md flex items-center gap-1.5 shadow-xs ${
            activeFilter === 'video'
              ? 'bg-gradient-to-r from-[#116AF8] to-[#20BCED] text-white shadow-md shadow-[#116AF8]/25 border border-white/60'
              : 'bg-white/85 text-[#020D33] border border-[#CDF5FD] hover:bg-white hover:border-[#A0E9FF]'
          }`}
        >
          <Film className="w-3.5 h-3.5 text-[#116AF8]" />
          <span>Our Videos 🎥 ({videoCount})</span>
        </button>

        <button
          onClick={() => {
            setActiveFilter('core');
            setVisibleCount(14);
          }}
          className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer backdrop-blur-md flex items-center gap-1.5 shadow-xs ${
            activeFilter === 'core'
              ? 'bg-gradient-to-r from-[#116AF8] to-[#20BCED] text-white shadow-md shadow-[#116AF8]/25 border border-white/60'
              : 'bg-white/85 text-[#020D33] border border-[#CDF5FD] hover:bg-white hover:border-[#A0E9FF]'
          }`}
        >
          <Star className="w-3.5 h-3.5 fill-[#116AF8] text-[#116AF8]" />
          <span>Special Moments ⭐</span>
        </button>

        <button
          onClick={() => {
            setActiveFilter('candid');
            setVisibleCount(14);
          }}
          className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer backdrop-blur-md flex items-center gap-1.5 shadow-xs ${
            activeFilter === 'candid'
              ? 'bg-gradient-to-r from-[#116AF8] to-[#20BCED] text-white shadow-md shadow-[#116AF8]/25 border border-white/60'
              : 'bg-white/85 text-[#020D33] border border-[#CDF5FD] hover:bg-white hover:border-[#A0E9FF]'
          }`}
        >
          <Heart className="w-3.5 h-3.5 fill-[#20BCED] text-[#20BCED]" />
          <span>Candid Smiles 🫶🏻</span>
        </button>
      </div>

      {/* Cinematic Mixed Layout Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-7 auto-rows-fr">
        {displayedMemories.map((memory, index) => (
          <MemoryCard
            key={memory.id}
            memory={memory}
            index={index}
            onSelect={(m) => setSelectedMemory(m)}
          />
        ))}
      </div>

      {/* Load More Button if more memories exist */}
      {visibleCount < filteredMemories.length && (
        <div className="flex justify-center mt-14">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setVisibleCount((prev) => prev + 12)}
            className="px-9 py-4 rounded-full bg-gradient-to-r from-[#116AF8] to-[#20BCED] text-white font-bold text-sm sm:text-base shadow-xl shadow-[#116AF8]/25 hover:shadow-[#116AF8]/40 transition-all border border-white/60 cursor-pointer flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-white" />
            <span>Show More Moments ({filteredMemories.length - visibleCount} more)</span>
          </motion.button>
        </div>
      )}

      {/* Full-Screen Video & Photo Viewer Modal */}
      <PhotoModal
        memory={selectedMemory}
        onClose={() => setSelectedMemory(null)}
        onPrev={handlePrev}
        onNext={handleNext}
      />
    </section>
  );
}
