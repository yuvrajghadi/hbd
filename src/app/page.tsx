'use client';

import React, { useState } from 'react';
import Hero from '@/components/Hero';
import OctoberSection from '@/components/OctoberSection';
import BirthdayLetter from '@/components/BirthdayLetter';
import YouChangedMe from '@/components/YouChangedMe';
import MyYeduSection from '@/components/MyYeduSection';
import StoryTimeline from '@/components/StoryTimeline';
import MemoryGallery from '@/components/MemoryGallery';
import PhotoSpotlight from '@/components/PhotoSpotlight';
import LoveQuestion from '@/components/LoveQuestion';
import RomanticQuizzes from '@/components/RomanticQuizzes';
import MemoryCarousel from '@/components/MemoryCarousel';
import SecretMessage from '@/components/SecretMessage';
import FinalSection from '@/components/FinalSection';
import FloatingHearts from '@/components/FloatingHearts';
import RomanticAudioPlayer from '@/components/RomanticAudioPlayer';

export default function Home() {
  const [isUnlocked, setIsUnlocked] = useState(false);

  return (
    <main className="relative min-h-screen selection:bg-[#A0E9FF] selection:text-[#020D33] bg-[#EBF7FD] text-[#020D33]">
      {/* Ambient Rising & Interactive Tap Blue Hearts */}
      <FloatingHearts />

      {/* Romantic Melody Sound Player in Corner */}
      <RomanticAudioPlayer />

      {/* 1. HERO SECTION ("Happy Birthday, My Yedu 💙") */}
      <Hero
        onUnlock={() => setIsUnlocked(true)}
        isUnlocked={isUnlocked}
      />

      {/* MAIN WEBSITE CONTENT (Seamlessly accessible & unlocked) */}
      <div
        className={`transition-all duration-1000 ${
          isUnlocked
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-95 translate-y-0'
        }`}
      >
        {/* 2. OCTOBER BIRTHDAY SECTION ("October Became My Favorite Month 💙") */}
        <OctoberSection />

        {/* 3. MAIN BIRTHDAY MESSAGE LETTER ("To My Beautiful Baby 💙") */}
        <BirthdayLetter />

        {/* 4. "YOU CHANGED ME 💙" PERSONAL QUOTE CARDS */}
        <YouChangedMe />

        {/* 5. "MY YEDU 🫶🏻" CUTE PERSONAL HIGHLIGHT SECTION */}
        <MyYeduSection />

        {/* 6. OUR STORY TIMELINE */}
        <StoryTimeline />

        {/* 7. PERSONAL PHOTO MEMORIES (8 Handcrafted Unique Animations + All Photos) */}
        <MemoryGallery />

        {/* 8. INTERACTIVE PHOTO SPOTLIGHT */}
        <PhotoSpotlight />

        {/* 9. CUTE MINI GAME ("Do you know how much I love you?") */}
        <LoveQuestion />

        {/* 10. ROMANTIC & PLAYFUL QUIZZES (7 Interactive Questions + Results) */}
        <RomanticQuizzes />

        {/* 11. MEMORY CAROUSEL (Touch & Drag Swipe Support) */}
        <MemoryCarousel />

        {/* 11. SECRET / SURPRISE SECTION (Locked Birthday Envelope Reveal) */}
        <SecretMessage />

        {/* 12. FINAL SECTION ("Just Love you more more more my baby😘") */}
        <FinalSection />
      </div>
    </main>
  );
}
