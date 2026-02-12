"use client";

import { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronRight,
  ChevronLeft,
  RotateCcw,
  Trophy,
  SkipForward,
  Check,
} from 'lucide-react';
import { TABOO_CARDS, TABOO_CATEGORIES } from '../../shared/src';
import type { TabooCard, DifficultyLevel } from '../../shared/src';
import { useClientTranslation } from '../hooks/useClientTranslation';

interface TabooProps {
  locale: string;
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function Taboo({ locale }: TabooProps) {
  const { t } = useClientTranslation(locale);

  // Game state
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [skipped, setSkipped] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);

  const cards = useMemo(() => {
    let filtered: TabooCard[] = [...TABOO_CARDS];
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(c => c.category === selectedCategory);
    }
    if (selectedDifficulty !== 'all') {
      filtered = filtered.filter(c => c.difficulty === selectedDifficulty);
    }
    return shuffleArray(filtered);
  }, [selectedCategory, selectedDifficulty]);

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
  }, []);

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
            {TABOO_CATEGORIES.map(cat => (
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

        {/* Scoreboard */}
        <div className="flex items-center justify-between mb-3 flex-shrink-0">
          <span className="text-sm font-medium text-gray-500">
            {currentIndex + 1} {t('taboo.cardOf')} {totalCards}
          </span>
          <div className="flex items-center gap-3">
            <span className="text-sm font-bold text-green-600">{score} {t('taboo.wordsGuessed')}</span>
            <span className="text-gray-300">|</span>
            <span className="text-sm font-bold text-orange-500">{skipped} {t('taboo.wordsSkipped')}</span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-gray-200 rounded-full h-1.5 mb-4 flex-shrink-0">
          <div
            className="bg-gradient-to-r from-purple-500 to-indigo-500 h-1.5 rounded-full transition-all duration-500"
            style={{ width: `${((currentIndex + 1) / totalCards) * 100}%` }}
          />
        </div>

        {/* Main card */}
        <div className="flex-1 flex flex-col items-center justify-center min-h-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentCard.id}
              initial={{ opacity: 0, x: 50, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -50, scale: 0.95 }}
              transition={{ duration: 0.3, type: "spring", stiffness: 200, damping: 20 }}
              className="bg-white rounded-3xl shadow-lg w-full max-w-md overflow-hidden"
            >
              {/* Category + Difficulty header */}
              <div className="flex items-center justify-between px-6 pt-5 pb-2">
                <span className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-xs font-medium">
                  {TABOO_CATEGORIES.find(c => c.id === currentCard.category)?.icon}{' '}
                  {TABOO_CATEGORIES.find(c => c.id === currentCard.category)?.name}
                </span>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${difficultyColor}`}>
                  {t(`ui.difficulty.${currentCard.difficulty}`)}
                </span>
              </div>

              {/* Target word */}
              <div className="px-6 py-6 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                  {currentCard.word}
                </h2>
              </div>

              {/* Taboo words */}
              <div className="mx-6 mb-5 bg-red-50 rounded-2xl px-4 py-4">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-lg">🚫</span>
                  <span className="text-xs font-semibold text-red-600 uppercase tracking-wide">
                    {t('taboo.tabooWords')}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {currentCard.tabooWords.map((word, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 bg-red-100 text-red-700 rounded-xl text-sm font-medium border border-red-200"
                    >
                      {word}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action buttons */}
              <div className="px-6 pb-5 flex gap-3">
                <motion.button
                  onClick={handleSkip}
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl font-semibold text-sm bg-orange-50 text-orange-600 hover:bg-orange-100 transition-all"
                  whileTap={{ scale: 0.95 }}
                >
                  <SkipForward className="w-4 h-4" />
                  {t('taboo.skip')}
                </motion.button>
                <motion.button
                  onClick={handleGotIt}
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl font-semibold text-sm bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-md"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Check className="w-4 h-4" />
                  {t('taboo.gotIt')}
                </motion.button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation arrows */}
        <div className="flex items-center justify-between mt-4 flex-shrink-0">
          <motion.button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className={`flex items-center gap-1 px-4 py-2 rounded-xl font-medium text-sm transition-all ${
              currentIndex === 0
                ? 'text-gray-300 cursor-not-allowed'
                : 'text-gray-600 hover:bg-white hover:shadow-sm'
            }`}
            whileTap={currentIndex > 0 ? { scale: 0.95 } : {}}
          >
            <ChevronLeft className="w-4 h-4" />
            {t('taboo.prevCard')}
          </motion.button>

          <motion.button
            onClick={handleNext}
            disabled={currentIndex >= totalCards - 1}
            className={`flex items-center gap-1 px-4 py-2 rounded-xl font-medium text-sm transition-all ${
              currentIndex >= totalCards - 1
                ? 'text-gray-300 cursor-not-allowed'
                : 'text-purple-600 hover:bg-white hover:shadow-sm'
            }`}
            whileTap={currentIndex < totalCards - 1 ? { scale: 0.95 } : {}}
          >
            {t('taboo.nextWord')}
            <ChevronRight className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </div>
  );
}
