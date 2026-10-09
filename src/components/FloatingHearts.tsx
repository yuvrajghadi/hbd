'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FloatingItem {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  icon: string;
  opacity: number;
}

interface ClickHeart {
  id: number;
  x: number;
  y: number;
  targetY: number;
  targetX: number;
  targetRotate: number;
  icon: string;
}

const BLUE_HEART_ICONS = ['💙', '🩵', '🤍', '✨', '🌟', '🎂', '💫', '🌙', '💙'];

export default function FloatingHearts() {
  const [ambientHearts, setAmbientHearts] = useState<FloatingItem[]>([]);
  const [clickHearts, setClickHearts] = useState<ClickHeart[]>([]);

  useEffect(() => {
    // Generate initial ambient particles across the screen asynchronously to avoid cascading renders
    const timer = setTimeout(() => {
      const initial: FloatingItem[] = Array.from({ length: 18 }).map((_, i) => ({
        id: i,
        x: ((i * 5.5 + 3) % 94) + 2,
        y: (i * 7.3) % 100,
        size: (i % 8) * 2 + 14,
        duration: (i % 6) * 2 + 16,
        delay: (i % 5) * 1.2,
        icon: BLUE_HEART_ICONS[i % BLUE_HEART_ICONS.length],
        opacity: 0.25 + (i % 4) * 0.08,
      }));
      setAmbientHearts(initial);
    }, 50);

    return () => clearTimeout(timer);
  }, []);

  // Spawn romantic blue heart burst whenever user clicks anywhere on screen
  const handleWindowClick = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement;
    // Don't spawn if clicking input, button or link to keep interactions clean
    if (target.closest('button') || target.closest('a') || target.closest('input')) {
      return;
    }

    const newHearts: ClickHeart[] = Array.from({ length: 3 }).map((_, i) => ({
      id: Date.now() + i + Math.random(),
      x: e.clientX + (Math.random() * 30 - 15),
      y: e.clientY + (Math.random() * 20 - 10),
      targetY: -80 - Math.random() * 40,
      targetX: (Math.random() - 0.5) * 60,
      targetRotate: (Math.random() - 0.5) * 40,
      icon: BLUE_HEART_ICONS[Math.floor(Math.random() * 4)],
    }));

    setClickHearts((prev) => [...prev.slice(-12), ...newHearts]);

    setTimeout(() => {
      setClickHearts((prev) =>
        prev.filter((h) => !newHearts.some((nh) => nh.id === h.id))
      );
    }, 1800);
  }, []);

  useEffect(() => {
    window.addEventListener('click', handleWindowClick);
    return () => window.removeEventListener('click', handleWindowClick);
  }, [handleWindowClick]);

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {/* Ambient Rising Blue Hearts & Starlight */}
      {ambientHearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute select-none will-change-transform drop-shadow-[0_0_8px_rgba(56,189,248,0.5)]"
          style={{
            left: `${heart.x}%`,
            fontSize: `${heart.size}px`,
            opacity: heart.opacity,
          }}
          initial={{ y: '105vh', rotate: -15 }}
          animate={{
            y: '-10vh',
            rotate: [-15, 15, -10, 10],
            x: [0, 18, -18, 0],
          }}
          transition={{
            duration: heart.duration,
            repeat: Infinity,
            delay: heart.delay,
            ease: 'linear',
          }}
        >
          {heart.icon}
        </motion.div>
      ))}

      {/* Interactive Click Burst Hearts */}
      <AnimatePresence>
        {clickHearts.map((heart) => (
          <motion.div
            key={heart.id}
            className="absolute text-xl select-none drop-shadow-[0_0_12px_rgba(56,189,248,0.8)]"
            style={{ left: heart.x, top: heart.y }}
            initial={{ scale: 0.3, opacity: 1, y: 0 }}
            animate={{
              scale: [0.3, 1.4, 1.1],
              opacity: [1, 0.9, 0],
              y: heart.targetY,
              x: heart.targetX,
              rotate: heart.targetRotate,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
          >
            {heart.icon}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
