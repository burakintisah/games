"use client";

import { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronRight,
  ChevronLeft,
  RotateCcw,
  Trophy,
  SkipForward,
  Check,
  Timer,
  Play,
  Square,
} from 'lucide-react';
import {
  TABOO_CARDS,
  TABOO_CATEGORIES,
  TABOO_CARDS_TR,
  TABOO_CATEGORIES_TR,
} from '../../shared/src';
import type { TabooCard } from '../../shared/src';
import { useClientTranslation } from '../hooks/useClientTranslation';

interface TabooProps {
  locale: string;
}

const TIMER_OPTIONS = [30, 60, 90, 120];

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export function Taboo({ locale }: TabooProps) {
  const { t } = useClientTranslation(locale);

  // Locale-based data
  const allCards = locale === 'tr' ? TABOO_CARDS_TR : TABOO_CARDS;
  const categories = locale === 'tr' ? TABOO_CATEGORIES_TR : TABOO_CATEGORIES;

  // Game state
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [skipped, setSkipped] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);

  // Timer state
  const [timerDuration, setTimerDuration] = useState(60);
  const [timeLeft, setTimeLeft] = useState(60);
  const [timerRunning, setTimerRunning] = useState(false);
  const [timerExpired, setTimerExpired] = useState(false);
  const [showTimerPicker, setShowTimerPicker] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Create audio context for alarm (SSR-safe)
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const playAlarm = useCallback(() => {
    if (typeof window === 'undefined') return;
    try {
      const AudioContext = window.AudioContext || (window as unknown as { webkitAudioContext: typeof window.AudioContext }).webkitAudioContext;
      const ctx = new AudioContext();

      // Play 3 short beeps
      const beepDurations = [0, 0.25, 0.5];
      beepDurations.forEach((startOffset) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.frequency.value = 880;
        osc.type = 'square';
        gain.gain.value = 0.3;
        osc.start(ctx.currentTime + startOffset);
        osc.stop(ctx.currentTime + startOffset + 0.15);
      });

      // Longer final beep
      const finalOsc = ctx.createOscillator();
      const finalGain = ctx.createGain();
      finalOsc.connect(finalGain);
      finalGain.connect(ctx.destination);
      finalOsc.frequency.value = 440;
      finalOsc.type = 'square';
      finalGain.gain.value = 0.3;
      finalOsc.start(ctx.currentTime + 0.9);
      finalOsc.stop(ctx.currentTime + 1.5);
    } catch {
      // Audio not supported, silently fail
    }
  }, []);

  const startTimer = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setTimeLeft(timerDuration);
    setTimerRunning(true);
    setTimerExpired(false);

    intervalRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          setTimerRunning(false);
          setTimerExpired(true);
          playAlarm();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, [timerDuration, playAlarm]);

  const stopTimer = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setTimerRunning(false);
  }, []);

  const resetTimer = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setTimerRunning(false);
    setTimerExpired(false);
    setTimeLeft(timerDuration);
  }, [timerDuration]);

  const selectTimerDuration = useCallback((seconds: number) => {
    setTimerDuration(seconds);
    setTimeLeft(seconds);
    setTimerRunning(false);
    setTimerExpired(false);
    setShowTimerPicker(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
  }, []);

  const cards = useMemo(() => {
    let filtered: TabooCard[] = [...allCards];
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(c => c.category === selectedCategory);
    }
    if (selectedDifficulty !== 'all') {
      filtered = filtered.filter(c => c.difficulty === selectedDifficulty);
    }
    return shuffleArray(filtered);
  }, [selectedCategory, selectedDifficulty, allCards]);

  const currentCard: TabooCard | undefined = cards[currentIndex];
  const totalCards = cards.length;

  const handleGotIt = useCallback(() => {
    setScore(prev => prev + 1);
    if (currentIndex < totalCards - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setGameComplete(true);
    }
  }, [currentIndex, totalCards]);

  const handleSkip = useCallback(() => {
    setSkipped(prev => prev + 1);
    if (currentIndex < totalCards - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setGameComplete(true);
    }
  }, [currentIndex, totalCards]);

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  }, [currentIndex]);

  const handleNext = useCallback(() => {
    if (currentIndex < totalCards - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setGameComplete(true);
    }
  }, [currentIndex, totalCards]);

  const handleCategoryChange = useCallback((categoryId: string) => {
    setSelectedCategory(categoryId);
    setCurrentIndex(0);
    setScore(0);
    setSkipped(0);
    setGameComplete(false);
  }, []);

  const handleDifficultyChange = useCallback((difficulty: string) => {
    setSelectedDifficulty(difficulty);
    setCurrentIndex(0);
    setScore(0);
    setSkipped(0);
    setGameComplete(false);
  }, []);

  const handlePlayAgain = useCallback(() => {
    setCurrentIndex(0);
    setScore(0);
    setSkipped(0);
    setGameComplete(false);
    resetTimer();
  }, [resetTimer]);

  // Timer urgency colors
  const timerColor = timerExpired
    ? 'text-red-600 bg-red-50 border-red-200'
    : timeLeft <= 10 && timerRunning
    ? 'text-red-600 bg-red-50 border-red-200 animate-pulse'
    : timeLeft <= 30 && timerRunning
    ? 'text-orange-600 bg-orange-50 border-orange-200'
    : 'text-purple-600 bg-purple-50 border-purple-200';

  // Game complete screen
  if (gameComplete) {
    return (
      <div className="fixed inset-0 pt-16 pb-4 px-3 flex flex-col items-center justify-center bg-gradient-to-br from-purple-50 to-indigo-50 md:pt-24">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-3xl shadow-xl p-8 max-w-sm w-full text-center"
        >
          <div className="text-6xl mb-4">
            <Trophy className="w-16 h-16 mx-auto text-yellow-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('taboo.congratulations')}</h2>
          <p className="text-gray-600 mb-6">{t('taboo.finalScore')}</p>

          <div className="text-5xl font-bold text-purple-600 mb-4">
            {score}/{score + skipped}
          </div>
          <div className="flex justify-center gap-6 mb-6 text-sm">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{score}</div>
              <div className="text-gray-500">{t('taboo.wordsGuessed')}</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-500">{skipped}</div>
              <div className="text-gray-500">{t('taboo.wordsSkipped')}</div>
            </div>
          </div>

          <motion.button
            onClick={handlePlayAgain}
            className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-6 py-3 rounded-2xl font-semibold shadow-lg"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <RotateCcw className="w-5 h-5" />
            {t('taboo.playAgain')}
          </motion.button>
        </motion.div>
      </div>
    );
  }

  if (!currentCard) return null;

  const difficultyColor = currentCard.difficulty === 'easy'
    ? 'bg-green-50 text-green-700'
    : currentCard.difficulty === 'medium'
    ? 'bg-yellow-50 text-yellow-700'
    : 'bg-red-50 text-red-700';

  return (
    <div className="fixed inset-0 pt-16 pb-4 px-3 flex flex-col bg-gradient-to-br from-purple-50 to-indigo-50 md:static md:pt-24 md:pb-8 md:px-4 md:min-h-screen">
      <div className="container mx-auto max-w-lg flex flex-col h-full md:h-auto">

        {/* Difficulty filter */}
        <div className="flex-shrink-0">
          <div className="flex gap-2 overflow-x-auto py-1 mb-2 scrollbar-hide">
            {['all', 'easy', 'medium', 'hard'].map(diff => (
              <button
                key={diff}
                onClick={() => handleDifficultyChange(diff)}
                className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  selectedDifficulty === diff
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
              >
                {diff === 'all' ? t('taboo.allDifficulties') : t(`ui.difficulty.${diff}`)}
              </button>
            ))}
          </div>

          {/* Category filter pills */}
          <div className="flex gap-2 overflow-x-auto py-1 mb-3 scrollbar-hide">
            <button
              onClick={() => handleCategoryChange('all')}
              className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                selectedCategory === 'all'
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              {t('taboo.allCategories')}
            </button>
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
              >
                {cat.icon} {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Scoreboard + Timer row */}
        <div className="flex items-center justify-between mb-2 flex-shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-gray-400">
              {currentIndex + 1}/{totalCards}
            </span>
            <span className="text-xs font-bold text-green-600">✓{score}</span>
            <span className="text-xs font-bold text-orange-500">✗{skipped}</span>
          </div>

          {/* Timer widget */}
          <div className="relative flex items-center">
            <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-bold transition-all ${timerColor}`}>
              <Timer className="w-3.5 h-3.5" />
              <button
                onClick={() => setShowTimerPicker(!showTimerPicker)}
                className="hover:opacity-70 transition-opacity tabular-nums text-sm"
              >
                {formatTime(timeLeft)}
              </button>
              {!timerRunning ? (
                <button
                  onClick={timerExpired ? resetTimer : startTimer}
                  className="ml-0.5 hover:opacity-70 transition-opacity"
                  aria-label={timerExpired ? t('taboo.timerReset') : t('taboo.timerStart')}
                >
                  {timerExpired ? (
                    <RotateCcw className="w-3.5 h-3.5" />
                  ) : (
                    <Play className="w-3.5 h-3.5" />
                  )}
                </button>
              ) : (
                <button
                  onClick={stopTimer}
                  className="ml-0.5 hover:opacity-70 transition-opacity"
                  aria-label={t('taboo.timerStop')}
                >
                  <Square className="w-3 h-3" />
                </button>
              )}
            </div>

            {/* Timer duration picker dropdown */}
            <AnimatePresence>
              {showTimerPicker && (
                <motion.div
                  initial={{ opacity: 0, y: -5, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -5, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full right-0 mt-1 bg-white rounded-xl shadow-lg border border-gray-200 p-2 z-10 min-w-[120px]"
                >
                  {TIMER_OPTIONS.map(seconds => (
                    <button
                      key={seconds}
                      onClick={() => selectTimerDuration(seconds)}
                      className={`block w-full text-left px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                        timerDuration === seconds
                          ? 'bg-purple-100 text-purple-700'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      {formatTime(seconds)}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Time's up overlay */}
        <AnimatePresence>
          {timerExpired && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-3 flex-shrink-0"
            >
              <div className="bg-red-50 border border-red-200 rounded-2xl px-4 py-3 flex items-center justify-between">
                <span className="text-sm font-bold text-red-600">{t('taboo.timesUp')}</span>
                <button
                  onClick={resetTimer}
                  className="flex items-center gap-1.5 px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium hover:bg-red-200 transition-all"
                >
                  <RotateCcw className="w-3 h-3" />
                  {t('taboo.timerReset')}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Progress bar */}
        <div className="w-full bg-gray-200 rounded-full h-1 mb-3 flex-shrink-0">
          <div
            className="bg-gradient-to-r from-purple-500 to-indigo-500 h-1 rounded-full transition-all duration-500"
            style={{ width: `${((currentIndex + 1) / totalCards) * 100}%` }}
          />
        </div>

        {/* Main card */}
        <div className="flex-1 flex flex-col items-center justify-center min-h-0 overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentCard.id}
              initial={{ opacity: 0, x: 50, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -50, scale: 0.95 }}
              transition={{ duration: 0.3, type: "spring", stiffness: 200, damping: 20 }}
              className="bg-white rounded-2xl shadow-lg w-full max-w-md overflow-hidden"
            >
              {/* Category + Difficulty header */}
              <div className="flex items-center justify-between px-4 pt-3 pb-1">
                <span className="px-2.5 py-0.5 bg-purple-50 text-purple-700 rounded-full text-xs font-medium">
                  {categories.find(c => c.id === currentCard.category)?.icon}{' '}
                  {categories.find(c => c.id === currentCard.category)?.name}
                </span>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${difficultyColor}`}>
                  {t(`ui.difficulty.${currentCard.difficulty}`)}
                </span>
              </div>

              {/* Target word */}
              <div className="px-4 py-3 text-center">
                <h2 className="text-2xl md:text-4xl font-bold text-gray-900">
                  {currentCard.word}
                </h2>
              </div>

              {/* Taboo words */}
              <div className="mx-4 mb-3 bg-red-50 rounded-xl px-3 py-2.5">
                <div className="flex items-center gap-1.5 mb-2">
                  <span className="text-sm">🚫</span>
                  <span className="text-[10px] font-semibold text-red-600 uppercase tracking-wide">
                    {t('taboo.tabooWords')}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {currentCard.tabooWords.map((word, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white/80 rounded-lg border border-red-200 text-red-700 text-sm font-semibold"
                    >
                      {word}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom controls — always visible */}
        <div className="flex-shrink-0 pt-3 space-y-2">
          {/* Action buttons */}
          <div className="flex gap-3">
            <motion.button
              onClick={handleSkip}
              className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl font-bold text-base bg-white text-orange-600 border-2 border-orange-200 hover:bg-orange-50 transition-all shadow-sm"
              whileTap={{ scale: 0.95 }}
            >
              <SkipForward className="w-5 h-5" />
              {t('taboo.skip')}
            </motion.button>
            <motion.button
              onClick={handleGotIt}
              className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl font-bold text-base bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-md"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Check className="w-5 h-5" />
              {t('taboo.gotIt')}
            </motion.button>
          </div>

          {/* Navigation arrows */}
          <div className="flex items-center justify-between">
            <motion.button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className={`flex items-center gap-1 px-3 py-2 rounded-xl font-medium text-sm transition-all ${
                currentIndex === 0
                  ? 'text-gray-300 cursor-not-allowed'
                  : 'text-gray-500 hover:bg-white/60'
              }`}
              whileTap={currentIndex > 0 ? { scale: 0.95 } : {}}
            >
              <ChevronLeft className="w-4 h-4" />
              {t('taboo.prevCard')}
            </motion.button>

            <motion.button
              onClick={handleNext}
              disabled={currentIndex >= totalCards - 1}
              className={`flex items-center gap-1 px-3 py-2 rounded-xl font-medium text-sm transition-all ${
                currentIndex >= totalCards - 1
                  ? 'text-gray-300 cursor-not-allowed'
                  : 'text-purple-600 hover:bg-white/60'
              }`}
              whileTap={currentIndex < totalCards - 1 ? { scale: 0.95 } : {}}
            >
              {t('taboo.nextWord')}
              <ChevronRight className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}
