'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Volume2, Music } from 'lucide-react';

export default function RomanticAudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Gentle, soothing pentatonic love chords (F, A, C, E, G in warm romantic frequencies)
  const notes = [261.63, 293.66, 329.63, 392.0, 440.0, 523.25];

  const playSoftChime = () => {
    try {
      if (!audioCtxRef.current) {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        audioCtxRef.current = new AudioContextClass();
      }

      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      // Pick 2 harmonious notes
      const note1 = notes[Math.floor(Math.random() * notes.length)];
      const note2 = notes[(notes.indexOf(note1) + 2) % notes.length];

      [note1, note2].forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.25);

        // Gentle envelope
        gain.gain.setValueAtTime(0.001, ctx.currentTime + idx * 0.25);
        gain.gain.exponentialRampToValueAtTime(0.035, ctx.currentTime + idx * 0.25 + 0.1);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + idx * 0.25 + 2.5);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(ctx.currentTime + idx * 0.25);
        osc.stop(ctx.currentTime + idx * 0.25 + 2.6);
      });
    } catch {
      // Audio autoplay policy fallback
    }
  };

  const toggleSound = () => {
    if (isPlaying) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      playSoftChime();
      intervalRef.current = setInterval(() => {
        playSoftChime();
      }, 3400);
    }
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (audioCtxRef.current) audioCtxRef.current.close();
    };
  }, []);

  return (
    <div className="fixed top-5 right-5 z-40">
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        onClick={toggleSound}
        className={`px-4 py-2 rounded-full backdrop-blur-md border text-xs sm:text-sm font-medium flex items-center gap-2 shadow-md transition-all duration-300 cursor-pointer ${
          isPlaying
            ? 'bg-gradient-to-r from-[#116AF8] to-[#20BCED] text-white border-[#A0E9FF] shadow-[#116AF8]/30'
            : 'bg-white/90 text-[#020D33] border-[#A0E9FF] hover:border-[#20BCED] shadow-sm hover:bg-white'
        }`}
        title={isPlaying ? 'Mute soothing melody' : 'Play romantic melody for Yedu'}
        aria-label="Toggle romantic music"
      >
        {isPlaying ? (
          <>
            <Volume2 className="w-4 h-4 animate-pulse text-white" />
            <span className="hidden sm:inline">Melody Playing 💙</span>
            <span className="flex gap-0.5">
              <span className="w-1 h-3 bg-white rounded-full animate-bounce delay-100" />
              <span className="w-1 h-2 bg-white rounded-full animate-bounce delay-200" />
              <span className="w-1 h-4 bg-white rounded-full animate-bounce" />
            </span>
          </>
        ) : (
          <>
            <Music className="w-4 h-4 text-[#116AF8]" />
            <span className="hidden sm:inline">Play Melody</span>
          </>
        )}
      </motion.button>
    </div>
  );
}
