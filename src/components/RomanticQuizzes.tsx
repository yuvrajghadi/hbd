'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, Award, RotateCcw, CheckCircle2, ArrowRight } from 'lucide-react';
import SectionHeading from './SectionHeading';
import { romanticQuizzes, siteConfig } from '@/data/memories';
import { QuizOption } from '@/types';

export default function RomanticQuizzes() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<QuizOption | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const currentQuiz = romanticQuizzes[currentQuestionIndex];
  const progressPercent = ((currentQuestionIndex + 1) / romanticQuizzes.length) * 100;

  const triggerConfetti = () => {
    confetti({
      particleCount: 90,
      spread: 60,
      origin: { y: 0.65 },
      colors: ['#116AF8', '#20BCED', '#A0E9FF', '#CDF5FD', '#ffffff'],
    });
  };

  const handleSelectOption = (option: QuizOption) => {
    setSelectedOption(option);
    setShowAnswer(true);
    triggerConfetti();
  };

  const handleNextQuestion = () => {
    setSelectedOption(null);
    setShowAnswer(false);

    if (currentQuestionIndex + 1 < romanticQuizzes.length) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setIsCompleted(true);
      // Final grand celebration
      confetti({
        particleCount: 160,
        spread: 90,
        origin: { y: 0.6 },
        colors: ['#116AF8', '#20BCED', '#A0E9FF', '#CDF5FD', '#ffd166', '#ffffff'],
      });
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setShowAnswer(false);
    setIsCompleted(false);
  };

  return (
    <section id="quizzes-section" className="relative py-20 md:py-28 px-4 max-w-4xl mx-auto overflow-hidden">
      {/* Background Soft Blue Glowing Orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#A0E9FF]/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[460px] h-[460px] rounded-full border border-[#A0E9FF]/40 pointer-events-none" />

      {/* Heading */}
      <SectionHeading
        badge="Cute & Playful Quizzes"
        title={siteConfig.quizzesTitle}
        subtitle={siteConfig.quizzesSubtitle}
      />

      {/* Quiz Card Container */}
      <div className="relative max-w-2xl mx-auto rounded-4xl p-6 sm:p-10 md:p-12 text-center glass-panel-dreamy border border-white/95 shadow-2xl shadow-[#116AF8]/5 overflow-hidden">
        {/* Subtle Starlight Accent line */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#116AF8] via-[#20BCED] to-[#A0E9FF]" />

        {!isCompleted ? (
          <div>
            {/* Progress Header */}
            <div className="mb-6 flex items-center justify-between text-xs font-bold text-[#2C4875]">
              <span className="px-3 py-1 rounded-full bg-[#CDF5FD] text-[#116AF8] border border-[#A0E9FF]">
                {currentQuiz.badge}
              </span>
              <span>{Math.round(progressPercent)}% Completed</span>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-2 rounded-full bg-[#CDF5FD] mb-8 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-[#116AF8] to-[#20BCED] rounded-full"
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 0.4 }}
              />
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuiz.id}
                initial={{ opacity: 0, x: 25 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -25 }}
                transition={{ duration: 0.35 }}
                className="flex flex-col items-center"
              >
                {/* Question */}
                <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#020D33] mb-2 leading-snug">
                  {currentQuiz.question}
                </h3>

                {currentQuiz.subtitle && (
                  <p className="font-sans text-sm sm:text-base text-[#2C4875] mb-8 font-medium">
                    {currentQuiz.subtitle}
                  </p>
                )}

                {/* Options List */}
                <div className="w-full space-y-3.5 mb-8">
                  {currentQuiz.options.map((option, idx) => {
                    const isSelected = selectedOption?.text === option.text;

                    return (
                      <motion.button
                        key={idx}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleSelectOption(option)}
                        disabled={showAnswer}
                        className={`w-full p-4 sm:p-5 rounded-2xl text-left font-serif font-bold text-base sm:text-lg transition-all cursor-pointer flex items-center justify-between border ${
                          isSelected
                            ? 'bg-gradient-to-r from-[#116AF8] to-[#20BCED] text-white border-white shadow-lg shadow-[#116AF8]/25'
                            : 'bg-white/85 hover:bg-white text-[#020D33] border-[#CDF5FD] hover:border-[#A0E9FF] shadow-xs'
                        }`}
                      >
                        <span>{option.text}</span>
                        {isSelected && <CheckCircle2 className="w-5 h-5 text-white shrink-0 ml-2" />}
                      </motion.button>
                    );
                  })}
                </div>

                {/* Revealed Cute Reaction & Answer Box */}
                <AnimatePresence>
                  {showAnswer && selectedOption && (
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 15 }}
                      transition={{ duration: 0.4 }}
                      className="w-full p-5 rounded-3xl bg-gradient-to-r from-[#CDF5FD] to-[#E5F7FD] border border-[#A0E9FF] mb-6 text-left"
                    >
                      <div className="flex items-center gap-2 text-xs font-bold text-[#116AF8] uppercase tracking-wide mb-1">
                        <Sparkles className="w-4 h-4 text-[#20BCED]" />
                        <span>Cute Reaction</span>
                      </div>
                      <p className="font-serif font-bold text-lg text-[#020D33] mb-2">
                        {selectedOption.reaction}
                      </p>
                      <p className="font-cursive text-xl sm:text-2xl text-[#116AF8] font-bold">
                        “{currentQuiz.sweetNote}”
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Next Button */}
                {showAnswer && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleNextQuestion}
                    className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#116AF8] to-[#20BCED] text-white font-bold text-base sm:text-lg shadow-lg shadow-[#116AF8]/30 border border-white/60 cursor-pointer inline-flex items-center gap-2"
                  >
                    <span>{currentQuestionIndex + 1 === romanticQuizzes.length ? 'See Final Score 🏆' : 'Next Question'}</span>
                    <ArrowRight className="w-5 h-5 text-white" />
                  </motion.button>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        ) : (
          /* FINAL ROMANTIC SCORE & CERTIFICATE SCREEN */
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', damping: 20, stiffness: 220 }}
            className="flex flex-col items-center"
          >
            {/* Animated Royal Badge */}
            <motion.div
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              className="w-24 h-24 rounded-full bg-gradient-to-tr from-[#116AF8] via-[#20BCED] to-[#A0E9FF] flex items-center justify-center text-white shadow-2xl shadow-[#116AF8]/35 mb-6 border-2 border-white"
            >
              <Heart className="w-12 h-12 fill-white text-white drop-shadow-md" />
            </motion.div>

            <span className="text-sm font-extrabold text-[#116AF8] tracking-widest uppercase mb-1">
              OFFICIAL RESULT: 100% PERFECT MATCH 💙
            </span>

            <h3 className="font-serif text-3xl sm:text-5xl font-black text-[#020D33] mb-3">
              You Passed With Pure Love! 🥰
            </h3>

            <p className="font-cursive text-2xl sm:text-3xl text-[#116AF8] font-bold mb-6">
              “There is nobody in this world like my Yedu.”
            </p>

            {/* Official Birthday Love Voucher */}
            <div className="w-full max-w-md my-4 p-6 sm:p-7 rounded-3xl bg-gradient-to-r from-[#CDF5FD] to-[#E9F8FD] border-2 border-dashed border-[#20BCED] shadow-sm text-left relative overflow-hidden">
              <div className="absolute top-2 right-2 text-[#20BCED]/25 text-5xl">
                🎂
              </div>
              <div className="flex items-center gap-2 text-[#116AF8] font-extrabold text-sm mb-1">
                <Award className="w-4 h-4 text-[#116AF8]" />
                <span>OFFICIAL BIRTHDAY HUG PASS FOR YEDU</span>
              </div>
              <p className="font-serif text-xl font-black text-[#020D33] mb-1">
                Unlimited Hugs, Forehead Kisses & Love
              </p>
              <p className="text-xs text-[#2C4875] font-medium leading-relaxed">
                Valid for: A lifetime • Non-transferable • Exclusively for My Baby • Signed on 9 October 💙
              </p>
            </div>

            {/* Play Again Button */}
            <button
              onClick={handleRestart}
              className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white hover:bg-[#CDF5FD] text-[#116AF8] text-sm font-bold transition-all cursor-pointer border border-[#A0E9FF] shadow-xs"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Play Quiz Again</span>
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
