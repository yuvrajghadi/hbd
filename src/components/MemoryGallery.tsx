'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, Film, Star, Database, AlertCircle, RefreshCw } from 'lucide-react';
import SectionHeading from './SectionHeading';
import MemoryCard from './MemoryCard';
import PhotoModal from './PhotoModal';
import { memories as fallbackMemories, siteConfig } from '@/data/memories';
import { Memory } from '@/types';

export default function MemoryGallery() {
  const [mediaItems, setMediaItems] = useState<Memory[]>(fallbackMemories);
  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null);
  const [activeFilter, setActiveFilter] = useState<'all' | 'video' | 'core' | 'candid'>('all');
  const [visibleCount, setVisibleCount] = useState<number>(14);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [source, setSource] = useState<'mongodb' | 'fallback'>('fallback');
  const [fetchError, setFetchError] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;
    fetch('/api/media', { cache: 'no-store' })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((json) => {
        if (!ignore && json?.success && Array.isArray(json.data) && json.data.length > 0) {
          setMediaItems(json.data);
          setSource(json.source || 'fallback');
          setFetchError(null);
        }
      })
      .catch((err: unknown) => {
        if (!ignore) {
          const msg = err instanceof Error ? err.message : 'Fetch error';
          setFetchError(msg);
          setMediaItems(fallbackMemories);
          setSource('fallback');
        }
      });

    return () => {
      ignore = true;
    };
  }, []);

  const loadMedia = useCallback(() => {
    setIsLoading(true);
    fetch('/api/media', { cache: 'no-store' })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((json) => {
        if (json?.success && Array.isArray(json.data) && json.data.length > 0) {
          setMediaItems(json.data);
          setSource(json.source || 'fallback');
          setFetchError(null);
        } else {
          setMediaItems(fallbackMemories);
          setSource('fallback');
        }
      })
      .catch((err: unknown) => {
        const msg = err instanceof Error ? err.message : 'Fetch error';
        setFetchError(msg);
        setMediaItems(fallbackMemories);
        setSource('fallback');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const videoCount = mediaItems.filter((m) => m.mediaType === 'video' || Boolean(m.videoUrl)).length;

  const filteredMemories = mediaItems.filter((m) => {
    if (activeFilter === 'video') return m.mediaType === 'video' || Boolean(m.videoUrl);
    if (activeFilter === 'core') return m.category === 'core' || m.highlight;
    if (activeFilter === 'candid') return m.category === 'candid';
    return true;
  });

  const displayedMemories = filteredMemories.slice(0, visibleCount);

  const handlePrev = () => {
    if (!selectedMemory || filteredMemories.length === 0) return;
    const currentIndex = filteredMemories.findIndex((m) => m.id === selectedMemory.id);
    const prevIndex = (currentIndex - 1 + filteredMemories.length) % filteredMemories.length;
    setSelectedMemory(filteredMemories[prevIndex]);
  };

  const handleNext = () => {
    if (!selectedMemory || filteredMemories.length === 0) return;
    const currentIndex = filteredMemories.findIndex((m) => m.id === selectedMemory.id);
    const nextIndex = (currentIndex + 1) % filteredMemories.length;
    setSelectedMemory(filteredMemories[nextIndex]);
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

      {/* Filter Tabs & Data Source Badge */}
      <div className="flex flex-col items-center gap-4 mb-10">
        <div className="flex flex-wrap items-center justify-center gap-2.5">
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
            All Moments ({mediaItems.length})
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

        {/* Subtle Database / Storage Status indicator */}
        <div className="flex items-center gap-2 text-xs font-semibold px-3 py-1 rounded-full bg-white/70 border border-[#CDF5FD] text-[#2C4875] backdrop-blur-xs">
          <Database className="w-3.5 h-3.5 text-[#116AF8]" />
          <span>
            {source === 'mongodb' ? (
              <span className="text-[#0E8A5E] font-bold">● Connected to MongoDB Atlas</span>
            ) : (
              <span>Gallery Source: Local Assets ({mediaItems.length} items ready)</span>
            )}
          </span>
          {isLoading && (
            <RefreshCw className="w-3 h-3 text-[#116AF8] animate-spin ml-1" />
          )}
        </div>
      </div>

      {/* Error notification if any (non-disruptive) */}
      {fetchError && (
        <div className="max-w-md mx-auto mb-6 p-3 rounded-2xl bg-[#FFF5F5] border border-rose-200 text-rose-800 text-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
            <span>Database offline: seamlessly displaying local gallery.</span>
          </div>
          <button
            onClick={loadMedia}
            className="text-xs font-bold text-rose-700 underline cursor-pointer ml-2"
          >
            Retry
          </button>
        </div>
      )}

      {/* Loading Skeleton State */}
      {isLoading && mediaItems.length === 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-7">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="rounded-3xl p-4 bg-white/60 border border-[#CDF5FD] animate-pulse flex flex-col gap-3"
            >
              <div className="w-full aspect-[4/3] rounded-2xl bg-gradient-to-tr from-[#CDF5FD] to-[#A0E9FF]/40" />
              <div className="h-5 w-3/4 rounded-full bg-[#CDF5FD]" />
              <div className="h-4 w-1/2 rounded-full bg-[#CDF5FD]/60" />
            </div>
          ))}
        </div>
      ) : displayedMemories.length === 0 ? (
        /* Empty Gallery State */
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-16 px-6 rounded-3xl bg-white/80 border border-[#CDF5FD] max-w-lg mx-auto shadow-md"
        >
          <Heart className="w-12 h-12 text-[#116AF8] fill-[#A0E9FF] mx-auto mb-3 animate-pulse" />
          <h3 className="text-xl font-serif font-bold text-[#020D33] mb-2">No moments in this category yet</h3>
          <p className="text-sm text-[#2C4875] mb-6">
            Every moment with you is precious. Choose “All Moments” to see all {mediaItems.length} memories!
          </p>
          <button
            onClick={() => setActiveFilter('all')}
            className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#116AF8] to-[#20BCED] text-white font-bold text-xs shadow-md"
          >
            Show All Moments
          </button>
        </motion.div>
      ) : (
        /* Cinematic Mixed Layout Grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-7 auto-rows-fr">
          {displayedMemories.map((memory, index) => (
            <MemoryCard
              key={memory._id || memory.id}
              memory={memory}
              index={index}
              onSelect={(m) => setSelectedMemory(m)}
            />
          ))}
        </div>
      )}

      {/* Load More Button if more memories exist */}
      {visibleCount < filteredMemories.length && (
        <div className="flex justify-center mt-14">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setVisibleCount((prev) => prev + 16)}
            className="px-9 py-4 rounded-full bg-gradient-to-r from-[#116AF8] to-[#20BCED] text-white font-bold text-sm sm:text-base shadow-xl shadow-[#116AF8]/25 hover:shadow-[#116AF8]/40 transition-all border border-white/60 cursor-pointer flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-white" />
            <span>Show More Moments ({filteredMemories.length - visibleCount} more)</span>
          </motion.button>
        </div>
      )}

      {/* Full-Screen Video & Photo Viewer Modal */}
      <AnimatePresence>
        {selectedMemory && (
          <PhotoModal
            memory={selectedMemory}
            onClose={() => setSelectedMemory(null)}
            onPrev={handlePrev}
            onNext={handleNext}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
