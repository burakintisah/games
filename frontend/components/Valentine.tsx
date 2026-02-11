"use client";

import { useState, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useClientTranslation } from '../hooks/useClientTranslation';

interface ValentineProps {
  locale: string;
}

type Screen = 'buildup' | 'question' | 'celebration';

// Floating heart component for background ambiance
function FloatingHeart({ delay, duration, left, size, emoji }: {
  delay: number;
  duration: number;
  left: number;
  size: number;
  emoji: string;
}) {
  return (
    <motion.div
      className="absolute pointer-events-none select-none"
      style={{ left: `${left}%`, bottom: -40, fontSize: size }}
      initial={{ y: 0, opacity: 0, rotate: 0 }}
      animate={{
        y: [0, -window.innerHeight - 100],
        opacity: [0, 1, 1, 0],
        rotate: [0, Math.random() > 0.5 ? 25 : -25, 0],
        x: [0, (Math.random() - 0.5) * 80],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeOut",
      }}
    >
      {emoji}
    </motion.div>
  );
}

// Confetti heart that bursts from center
function ConfettiHeart({ index }: { index: number }) {
  const angle = (index / 30) * Math.PI * 2 + (Math.random() - 0.5) * 0.5;
  const distance = 150 + Math.random() * 300;
  const emojis = ['❤️', '💕', '💖', '💗', '💘', '💝', '✨', '🌹', '💐'];
  const emoji = emojis[index % emojis.length];

  return (
    <motion.div
      className="absolute pointer-events-none select-none"
      style={{ left: '50%', top: '40%', fontSize: 16 + Math.random() * 20 }}
      initial={{ x: 0, y: 0, opacity: 1, scale: 0 }}
      animate={{
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance - 100,
        opacity: [1, 1, 0],
        scale: [0, 1.5, 1],
        rotate: Math.random() * 360,
      }}
      transition={{ duration: 1.5 + Math.random(), ease: "easeOut" }}
    >
      {emoji}
    </motion.div>
  );
}

// Kiss emoji falling from top
function KissEmoji({ delay, left }: { delay: number; left: number }) {
  const emojis = ['💋', '😘', '💕', '❤️', '💗'];
  const emoji = emojis[Math.floor(Math.random() * emojis.length)];

  return (
    <motion.div
      className="absolute pointer-events-none select-none"
      style={{ left: `${left}%`, top: -40, fontSize: 20 + Math.random() * 16 }}
      initial={{ y: -40, opacity: 0, rotate: 0 }}
      animate={{
        y: window.innerHeight + 40,
        opacity: [0, 1, 1, 0.8, 0],
        rotate: (Math.random() - 0.5) * 60,
        x: (Math.random() - 0.5) * 60,
      }}
      transition={{ duration: 2 + Math.random() * 2, delay, ease: "easeIn" }}
    >
      {emoji}
    </motion.div>
  );
}

const NO_TEXTS_EN = ["No", "Are you sure?", "Think again!", "Please???", "I'll cry...", "Pretty please?", "Don't do this!", "Impossible!"];

const BEAR_STAGES = ['🧸', '🐻', '🥺', '😢', '😭'];

export function Valentine({ locale }: ValentineProps) {
  const { t } = useClientTranslation(locale);

  const [screen, setScreen] = useState<Screen>('buildup');
  const [noAttempts, setNoAttempts] = useState(0);
  const [noPosition, setNoPosition] = useState<{ x: number; y: number } | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [kissRain, setKissRain] = useState(false);
  const [kissWaves, setKissWaves] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Generate floating hearts based on screen and attempts
  const heartCount = screen === 'buildup' ? 12 : screen === 'question' ? 12 + noAttempts * 3 : 20;
  const heartEmojis = ['❤️', '💕', '💖', '💗', '🩷', '🌹', '💘'];

  const floatingHearts = Array.from({ length: Math.min(heartCount, 35) }, (_, i) => ({
    id: i,
    delay: Math.random() * 8,
    duration: 4 + Math.random() * 6,
    left: Math.random() * 100,
    size: 16 + Math.random() * 20,
    emoji: heartEmojis[i % heartEmojis.length],
  }));

  // Get the "No" button text based on attempts
  const getNoText = useCallback(() => {
    const texts = NO_TEXTS_EN;
    try {
      const translated = t('valentine.noTexts', { returnObjects: true });
      if (Array.isArray(translated) && translated.length > 0) {
        return translated[Math.min(noAttempts, translated.length - 1)] as string;
      }
    } catch {
      // fallback
    }
    return texts[Math.min(noAttempts, texts.length - 1)];
  }, [noAttempts, t]);

  // Bear emoji based on attempts
  const bearEmoji = BEAR_STAGES[Math.min(Math.floor(noAttempts / 2), BEAR_STAGES.length - 1)];

  // "Yes" button scale grows with attempts
  const yesScale = 1 + noAttempts * 0.12;

  // "No" button scale shrinks with attempts
  const noScale = Math.max(0.3, 1 - noAttempts * 0.1);

  // Randomize the "No" button position
  const moveNoButton = useCallback(() => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const padding = 60;
    const x = padding + Math.random() * (rect.width - padding * 2);
    const y = padding + Math.random() * (rect.height - padding * 2);
    setNoPosition({ x: x - rect.width / 2, y: y - rect.height / 2 });
    setNoAttempts(prev => prev + 1);
  }, []);

  // Handle "Yes" click
  const handleYes = useCallback(() => {
    setScreen('celebration');
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
  }, []);

  // Handle kiss button
  const handleKiss = useCallback(() => {
    setKissRain(true);
    setKissWaves(prev => prev + 1);
    setTimeout(() => setKissRain(false), 3000);
  }, []);

  // Screen transition variants
  const screenVariants = {
    initial: { opacity: 0, scale: 0.9, y: 30 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.9, y: -30 },
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 overflow-hidden bg-gradient-to-br from-pink-100 via-rose-50 to-pink-200"
    >
      {/* Floating hearts background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {floatingHearts.map((heart) => (
          <FloatingHeart key={`${heart.id}-${screen}`} {...heart} />
        ))}
      </div>

      {/* Main content */}
      <AnimatePresence mode="wait">
        {/* ===== SCREEN 1: BUILD-UP ===== */}
        {screen === 'buildup' && (
          <motion.div
            key="buildup"
            variants={screenVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
            className="absolute inset-0 flex flex-col items-center justify-center px-6"
          >
            {/* Animated bear with heart */}
            <motion.div
              className="text-8xl md:text-9xl mb-8"
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, -5, 5, 0],
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              🧸
            </motion.div>

            <motion.div
              className="text-5xl md:text-6xl mb-8"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              💝
            </motion.div>

            <motion.h1
              className="text-2xl md:text-4xl font-bold text-rose-700 text-center mb-12 max-w-lg leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {t('valentine.buildup')}
            </motion.h1>

            <motion.button
              className="px-10 py-4 bg-gradient-to-r from-rose-500 to-pink-600 text-white text-xl font-bold rounded-full shadow-lg shadow-rose-300/50"
              whileHover={{ scale: 1.08, boxShadow: "0 20px 40px rgba(244, 63, 94, 0.4)" }}
              whileTap={{ scale: 0.95 }}
              animate={{
                boxShadow: [
                  "0 10px 30px rgba(244, 63, 94, 0.3)",
                  "0 15px 40px rgba(244, 63, 94, 0.5)",
                  "0 10px 30px rgba(244, 63, 94, 0.3)",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              onClick={() => setScreen('question')}
            >
              {t('valentine.continue')} →
            </motion.button>
          </motion.div>
        )}

        {/* ===== SCREEN 2: THE QUESTION ===== */}
        {screen === 'question' && (
          <motion.div
            key="question"
            variants={screenVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
            className="absolute inset-0 flex flex-col items-center justify-center px-6"
          >
            {/* Bear that gets sadder */}
            <motion.div
              key={bearEmoji}
              className="text-7xl md:text-8xl mb-4"
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 10 }}
            >
              {bearEmoji}
            </motion.div>

            {/* The big question */}
            <motion.h1
              className="text-3xl md:text-5xl font-extrabold text-rose-700 text-center mb-12 max-w-xl leading-tight"
              animate={noAttempts > 3 ? {
                scale: [1, 1.05, 1],
              } : {}}
              transition={{ duration: 1, repeat: Infinity }}
            >
              {t('valentine.question')}
            </motion.h1>

            {/* Attempt counter - shows up after 2+ attempts */}
            {noAttempts >= 2 && (
              <motion.p
                className="text-rose-400 text-sm mb-6 font-medium"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {noAttempts >= 5 ? "Just click Yes already! 😭" : `Attempt ${noAttempts}... the bear is getting sad`}
              </motion.p>
            )}

            {/* Buttons container */}
            <div className="relative w-full max-w-md flex flex-col items-center gap-4">
              {/* YES button - grows with each attempt */}
              <motion.button
                className="px-12 py-5 bg-gradient-to-r from-green-400 to-emerald-500 text-white font-extrabold rounded-full shadow-lg shadow-green-300/50 text-xl"
                animate={{
                  scale: [yesScale, yesScale + 0.05, yesScale],
                  boxShadow: [
                    `0 10px 30px rgba(52, 211, 153, ${0.3 + noAttempts * 0.05})`,
                    `0 20px 50px rgba(52, 211, 153, ${0.5 + noAttempts * 0.05})`,
                    `0 10px 30px rgba(52, 211, 153, ${0.3 + noAttempts * 0.05})`,
                  ],
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
                whileHover={{ scale: yesScale + 0.1 }}
                whileTap={{ scale: yesScale - 0.1 }}
                onClick={handleYes}
              >
                {t('valentine.yes')} 💖
              </motion.button>

              {/* NO button - runs away and shrinks */}
              <motion.button
                className="px-8 py-3 bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold rounded-full shadow-md text-base"
                animate={noPosition ? {
                  x: noPosition.x,
                  y: noPosition.y,
                  scale: noScale,
                  rotate: noAttempts > 4 ? [0, 10, -10, 0] : 0,
                } : { scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 300 + noAttempts * 50,
                  damping: 15,
                }}
                onMouseEnter={moveNoButton}
                onClick={moveNoButton}
                style={{ position: noPosition ? 'absolute' : 'relative' }}
              >
                {getNoText()}
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* ===== SCREEN 3: CELEBRATION ===== */}
        {screen === 'celebration' && (
          <motion.div
            key="celebration"
            variants={screenVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.8, type: "spring", stiffness: 80 }}
            className="absolute inset-0 flex flex-col items-center justify-center px-6"
          >
            {/* Confetti burst */}
            {showConfetti && (
              <div className="absolute inset-0 pointer-events-none">
                {Array.from({ length: 35 }, (_, i) => (
                  <ConfettiHeart key={i} index={i} />
                ))}
              </div>
            )}

            {/* Kiss rain */}
            {kissRain && (
              <div className="absolute inset-0 pointer-events-none">
                {Array.from({ length: 25 }, (_, i) => (
                  <KissEmoji key={`${kissWaves}-${i}`} delay={i * 0.1} left={Math.random() * 100} />
                ))}
              </div>
            )}

            {/* Big celebration emoji */}
            <motion.div
              className="text-7xl md:text-9xl mb-4"
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 10, -10, 0],
              }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              💑
            </motion.div>

            {/* Hearts row */}
            <motion.div
              className="flex gap-3 text-3xl md:text-4xl mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {['💖', '💕', '❤️', '💕', '💖'].map((heart, i) => (
                <motion.span
                  key={i}
                  animate={{
                    y: [0, -10, 0],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 1,
                    delay: i * 0.15,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  {heart}
                </motion.span>
              ))}
            </motion.div>

            {/* Celebration text */}
            <motion.h1
              className="text-3xl md:text-5xl font-extrabold text-rose-600 text-center mb-4 max-w-lg"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
            >
              {t('valentine.celebration')}
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-rose-500 text-center mb-10 max-w-md font-medium"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              {t('valentine.sweetMessage')} 🥰
            </motion.p>

            {/* Action buttons */}
            <motion.div
              className="flex flex-col items-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <motion.button
                className="px-10 py-4 bg-gradient-to-r from-rose-500 to-pink-600 text-white text-lg font-bold rounded-full shadow-lg shadow-rose-300/50"
                whileHover={{ scale: 1.08, boxShadow: "0 20px 40px rgba(244, 63, 94, 0.4)" }}
                whileTap={{ scale: 0.95 }}
                onClick={handleKiss}
              >
                {t('valentine.sendKiss')} 💋
              </motion.button>

              <motion.p
                className="text-rose-400 text-base font-semibold tracking-wider mt-4"
                animate={{
                  opacity: [0.6, 1, 0.6],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {t('valentine.forever')} ❤️
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
