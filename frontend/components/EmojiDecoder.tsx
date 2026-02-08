"use client";

import { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lightbulb, Eye, ChevronRight, ChevronLeft, Check, SkipForward, RotateCcw, Trophy } from 'lucide-react';
import { EMOJI_PUZZLES, EMOJI_PUZZLE_CATEGORIES } from '../../shared/src';
import type { EmojiPuzzle } from '../../shared/src';
import { useClientTranslation } from '../hooks/useClientTranslation';

interface EmojiDecoderProps {
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

export function EmojiDecoder({ locale }: EmojiDecoderProps) {
  const { t } = useClientTranslation(locale);
  const lang = locale === 'tr' ? 'tr' : 'en';

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState<Set<string>>(new Set());
  const [gameComplete, setGameComplete] = useState(false);

  const puzzles = useMemo(() => {
    const filtered = selectedCategory === 'all'
      ? EMOJI_PUZZLES
      : EMOJI_PUZZLES.filter(p => p.category === selectedCategory);
    return shuffleArray(filtered);
  }, [selectedCategory]);

  const currentPuzzle: EmojiPuzzle | undefined = puzzles[currentIndex];
  const totalPuzzles = puzzles.length;

  const resetForNewPuzzle = useCallback(() => {
    setShowHint(false);
    setShowAnswer(false);
  }, []);

  const handleNext = useCallback(() => {
    if (currentIndex < totalPuzzles - 1) {
      setCurrentIndex(prev => prev + 1);
      resetForNewPuzzle();
    } else {
      setGameComplete(true);
    }
  }, [currentIndex, totalPuzzles, resetForNewPuzzle]);

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      resetForNewPuzzle();
    }
  }, [currentIndex, resetForNewPuzzle]);

  const handleGotIt = useCallback(() => {
    if (currentPuzzle && !answered.has(currentPuzzle.id)) {
      setScore(prev => prev + 1);
      setAnswered(prev => new Set(prev).add(currentPuzzle.id));
    }
    setShowAnswer(true);
    setTimeout(() => handleNext(), 1200);
  }, [currentPuzzle, answered, handleNext]);

  const handleSkip = useCallback(() => {
    if (currentPuzzle) {
      setAnswered(prev => new Set(prev).add(currentPuzzle.id));
    }
    setShowAnswer(true);
    setTimeout(() => handleNext(), 1200);
  }, [currentPuzzle, handleNext]);

  const handleCategoryChange = useCallback((categoryId: string) => {
    setSelectedCategory(categoryId);
    setCurrentIndex(0);
    setScore(0);
    setAnswered(new Set());
    setGameComplete(false);
    resetForNewPuzzle();
  }, [resetForNewPuzzle]);

  const handlePlayAgain = useCallback(() => {
    setCurrentIndex(0);
    setScore(0);
    setAnswered(new Set());
    setGameComplete(false);
    resetForNewPuzzle();
  }, [resetForNewPuzzle]);

  const alreadyAnswered = currentPuzzle ? answered.has(currentPuzzle.id) : false;

  // Game complete screen
  if (gameComplete) {
    const skipped = answered.size - score;
    return (
      <div className="fixed inset-0 pt-16 pb-4 px-3 flex flex-col items-center justify-center bg-gradient-to-br from-violet-50 to-indigo-50 md:pt-24">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-3xl shadow-xl p-8 max-w-sm w-full text-center"
        >
          <div className="text-6xl mb-4"><Trophy className="w-16 h-16 mx-auto text-yellow-500" /></div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('emoji.congratulations')}</h2>
          <p className="text-gray-600 mb-6">{t('emoji.finalScore')}</p>
          <div className="text-5xl font-bold text-violet-600 mb-6">{score}/{totalPuzzles}</div>
          <div className="flex justify-center gap-6 mb-8 text-sm">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{score}</div>
              <div className="text-gray-500">{t('emoji.correct')}</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-500">{skipped}</div>
              <div className="text-gray-500">{t('emoji.skipped')}</div>
            </div>
          </div>
          <motion.button
            onClick={handlePlayAgain}
            className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white px-6 py-3 rounded-2xl font-semibold shadow-lg"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <RotateCcw className="w-5 h-5" />
            {t('emoji.playAgain')}
          </motion.button>
        </motion.div>
      </div>
    );
  }

  if (!currentPuzzle) return null;

  return (
    <div className="fixed inset-0 pt-16 pb-4 px-3 flex flex-col bg-gradient-to-br from-violet-50 to-indigo-50 md:static md:pt-24 md:pb-8 md:px-4 md:min-h-screen">
      <div className="container mx-auto max-w-lg flex flex-col h-full md:h-auto">

        {/* Category filter pills */}
        <div className="flex gap-2 overflow-x-auto py-2 mb-3 scrollbar-hide flex-shrink-0">
          <button
            onClick={() => handleCategoryChange('all')}
            className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
              selectedCategory === 'all'
                ? 'bg-violet-600 text-white shadow-md'
                : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
          >
            {t('emoji.allCategories')}
          </button>
          {EMOJI_PUZZLE_CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => handleCategoryChange(cat.id)}
              className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                selectedCategory === cat.id
                  ? 'bg-violet-600 text-white shadow-md'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              {cat.icon} {cat.name[lang]}
            </button>
          ))}
        </div>

        {/* Score & Progress bar */}
        <div className="flex items-center justify-between mb-3 flex-shrink-0">
          <span className="text-sm font-medium text-gray-500">
            {currentIndex + 1} {t('emoji.puzzleOf')} {totalPuzzles}
          </span>
          <span className="text-sm font-bold text-violet-600">
            {t('emoji.score')}: {score}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-1.5 mb-4 flex-shrink-0">
          <div
            className="bg-gradient-to-r from-violet-500 to-indigo-500 h-1.5 rounded-full transition-all duration-500"
            style={{ width: `${((currentIndex + 1) / totalPuzzles) * 100}%` }}
          />
        </div>

        {/* Main puzzle card */}
        <div className="flex-1 flex flex-col items-center justify-center min-h-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPuzzle.id}
              initial={{ opacity: 0, x: 50, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -50, scale: 0.95 }}
              transition={{ duration: 0.3, type: "spring", stiffness: 200, damping: 20 }}
              className="bg-white rounded-3xl shadow-lg p-6 md:p-8 w-full max-w-md"
            >
              {/* Category badge */}
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 bg-violet-50 text-violet-700 rounded-full text-xs font-medium">
                  {EMOJI_PUZZLE_CATEGORIES.find(c => c.id === currentPuzzle.category)?.icon}{' '}
                  {EMOJI_PUZZLE_CATEGORIES.find(c => c.id === currentPuzzle.category)?.name[lang]}
                </span>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  currentPuzzle.difficulty === 'easy' ? 'bg-green-50 text-green-700' :
                  currentPuzzle.difficulty === 'medium' ? 'bg-yellow-50 text-yellow-700' :
                  'bg-red-50 text-red-700'
                }`}>
                  {t(`ui.difficulty.${currentPuzzle.difficulty}`)}
                </span>
              </div>

              {/* Emoji display */}
              <div className="text-center py-6 md:py-8">
                <motion.div
                  className="text-5xl md:text-7xl tracking-widest select-none"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  {currentPuzzle.emojis}
                </motion.div>
              </div>

              {/* Hint section */}
              <AnimatePresence>
                {showHint && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mb-4 overflow-hidden"
                  >
                    <div className="bg-amber-50 border border-amber-200 rounded-2xl px-4 py-3 text-center">
                      <span className="text-xs font-medium text-amber-600 uppercase tracking-wide">{t('emoji.hintLabel')}</span>
                      <p className="text-amber-800 font-medium mt-1">{currentPuzzle.hint[lang]}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Answer reveal */}
              <AnimatePresence>
                {showAnswer && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="mb-4"
                  >
                    <div className="bg-green-50 border border-green-200 rounded-2xl px-4 py-3 text-center">
                      <span className="text-xs font-medium text-green-600 uppercase tracking-wide">{t('emoji.answerLabel')}</span>
                      <p className="text-green-800 font-bold text-lg mt-1">{currentPuzzle.answer[lang]}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Action buttons */}
              {!showAnswer && !alreadyAnswered && (
                <div className="space-y-2">
                  {!showHint && (
                    <motion.button
                      onClick={() => setShowHint(true)}
                      className="flex items-center justify-center gap-2 w-full bg-amber-50 hover:bg-amber-100 text-amber-700 px-4 py-2.5 rounded-2xl font-medium text-sm transition-all"
                      whileTap={{ scale: 0.98 }}
                    >
                      <Lightbulb className="w-4 h-4" />
                      {t('emoji.showHint')}
                    </motion.button>
                  )}
                  <div className="flex gap-2">
                    <motion.button
                      onClick={handleGotIt}
                      className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-3 rounded-2xl font-semibold shadow-md text-sm"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Check className="w-4 h-4" />
                      {t('emoji.gotIt')}
                    </motion.button>
                    <motion.button
                      onClick={handleSkip}
                      className="flex-1 flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-600 px-4 py-3 rounded-2xl font-medium text-sm"
                      whileTap={{ scale: 0.98 }}
                    >
                      <SkipForward className="w-4 h-4" />
                      {t('emoji.skip')}
                    </motion.button>
                  </div>
                </div>
              )}

              {/* Already answered - show answer and next */}
              {alreadyAnswered && !showAnswer && (
                <div className="text-center">
                  <div className="bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 mb-3">
                    <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">{t('emoji.answerLabel')}</span>
                    <p className="text-gray-800 font-bold text-lg mt-1">{currentPuzzle.answer[lang]}</p>
                  </div>
                </div>
              )}
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
            {t('emoji.prevPuzzle')}
          </motion.button>

          <motion.button
            onClick={handleNext}
            disabled={currentIndex >= totalPuzzles - 1}
            className={`flex items-center gap-1 px-4 py-2 rounded-xl font-medium text-sm transition-all ${
              currentIndex >= totalPuzzles - 1
                ? 'text-gray-300 cursor-not-allowed'
                : 'text-violet-600 hover:bg-white hover:shadow-sm'
            }`}
            whileTap={currentIndex < totalPuzzles - 1 ? { scale: 0.95 } : {}}
          >
            {t('emoji.nextPuzzle')}
            <ChevronRight className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </div>
  );
}
