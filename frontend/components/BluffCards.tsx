"use client";

import { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronRight,
  ChevronLeft,
  RotateCcw,
  Trophy,
  Users,
  User,
  Flame,
  Eye,
} from 'lucide-react';
import { BLUFF_CARDS, BLUFF_CARD_CATEGORIES } from '../../shared/src';
import type { BluffCard } from '../../shared/src';
import { useClientTranslation } from '../hooks/useClientTranslation';

interface BluffCardsProps {
  locale: string;
}

type GameModeType = 'solo' | 'teams';

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function BluffCards({ locale }: BluffCardsProps) {
  const { t } = useClientTranslation(locale);
  const lang = locale === 'tr' ? 'tr' : 'en';

  // Game state
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);
  const [gameMode, setGameMode] = useState<GameModeType>('solo');

  // Score tracking
  const [soloScore, setSoloScore] = useState({ correct: 0, wrong: 0 });
  const [teamScores, setTeamScores] = useState({ team1: 0, team2: 0 });
  const [currentTeam, setCurrentTeam] = useState<1 | 2>(1);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);

  // User choice tracking
  const [userChoice, setUserChoice] = useState<boolean | null>(null);
  const [answered, setAnswered] = useState<Set<string>>(new Set());

  const cards = useMemo(() => {
    const filtered = selectedCategory === 'all'
      ? BLUFF_CARDS
      : BLUFF_CARDS.filter(c => c.category === selectedCategory);
    return shuffleArray(filtered);
  }, [selectedCategory]);

  const currentCard: BluffCard | undefined = cards[currentIndex];
  const totalCards = cards.length;

  const resetForNewCard = useCallback(() => {
    setRevealed(false);
    setUserChoice(null);
  }, []);

  const handleReveal = useCallback(() => {
    if (userChoice === null) return;
    setRevealed(true);

    const isCorrect = userChoice === currentCard?.isTrue;

    if (currentCard) {
      setAnswered(prev => new Set(prev).add(currentCard.id));
    }

    if (gameMode === 'solo') {
      if (isCorrect) {
        setSoloScore(prev => ({ ...prev, correct: prev.correct + 1 }));
        setStreak(prev => {
          const newStreak = prev + 1;
          setBestStreak(best => Math.max(best, newStreak));
          return newStreak;
        });
      } else {
        setSoloScore(prev => ({ ...prev, wrong: prev.wrong + 1 }));
        setStreak(0);
      }
    } else {
      if (isCorrect) {
        if (currentTeam === 1) {
          setTeamScores(prev => ({ ...prev, team1: prev.team1 + 1 }));
        } else {
          setTeamScores(prev => ({ ...prev, team2: prev.team2 + 1 }));
        }
      }
      setCurrentTeam(prev => prev === 1 ? 2 : 1);
    }
  }, [userChoice, currentCard, gameMode, currentTeam]);

  const handleNext = useCallback(() => {
    if (currentIndex < totalCards - 1) {
      setCurrentIndex(prev => prev + 1);
      resetForNewCard();
    } else {
      setGameComplete(true);
    }
  }, [currentIndex, totalCards, resetForNewCard]);

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      resetForNewCard();
    }
  }, [currentIndex, resetForNewCard]);

  const handleCategoryChange = useCallback((categoryId: string) => {
    setSelectedCategory(categoryId);
    setCurrentIndex(0);
    setSoloScore({ correct: 0, wrong: 0 });
    setTeamScores({ team1: 0, team2: 0 });
    setCurrentTeam(1);
    setStreak(0);
    setBestStreak(0);
    setAnswered(new Set());
    setGameComplete(false);
    resetForNewCard();
  }, [resetForNewCard]);

  const handlePlayAgain = useCallback(() => {
    setCurrentIndex(0);
    setSoloScore({ correct: 0, wrong: 0 });
    setTeamScores({ team1: 0, team2: 0 });
    setCurrentTeam(1);
    setStreak(0);
    setBestStreak(0);
    setAnswered(new Set());
    setGameComplete(false);
    resetForNewCard();
  }, [resetForNewCard]);

  const handleGameModeSwitch = useCallback((mode: GameModeType) => {
    setGameMode(mode);
    handlePlayAgain();
  }, [handlePlayAgain]);

  const alreadyAnswered = currentCard ? answered.has(currentCard.id) : false;

  // Game complete screen
  if (gameComplete) {
    const totalAnswered = gameMode === 'solo'
      ? soloScore.correct + soloScore.wrong
      : teamScores.team1 + teamScores.team2;

    return (
      <div className="fixed inset-0 pt-16 pb-4 px-3 flex flex-col items-center justify-center bg-gradient-to-br from-orange-50 to-red-50 md:pt-24">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-3xl shadow-xl p-8 max-w-sm w-full text-center"
        >
          <div className="text-6xl mb-4">
            <Trophy className="w-16 h-16 mx-auto text-yellow-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('bluff.congratulations')}</h2>
          <p className="text-gray-600 mb-6">{t('bluff.finalScore')}</p>

          {gameMode === 'solo' ? (
            <>
              <div className="text-5xl font-bold text-orange-600 mb-4">
                {soloScore.correct}/{totalAnswered}
              </div>
              <div className="flex justify-center gap-6 mb-4 text-sm">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{soloScore.correct}</div>
                  <div className="text-gray-500">{t('bluff.correct')}</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-500">{soloScore.wrong}</div>
                  <div className="text-gray-500">{t('bluff.wrong')}</div>
                </div>
              </div>
              {bestStreak > 1 && (
                <div className="flex items-center justify-center gap-2 mb-6 text-orange-600">
                  <Flame className="w-5 h-5" />
                  <span className="font-semibold">{t('bluff.bestStreak')}: {bestStreak}</span>
                </div>
              )}
            </>
          ) : (
            <div className="flex justify-center gap-8 mb-8">
              <div className={`text-center p-4 rounded-2xl ${teamScores.team1 >= teamScores.team2 ? 'bg-blue-50 ring-2 ring-blue-400' : 'bg-gray-50'}`}>
                <div className="text-3xl font-bold text-blue-600">{teamScores.team1}</div>
                <div className="text-sm font-medium text-gray-600">{t('bluff.team1')}</div>
              </div>
              <div className="flex items-center text-2xl font-bold text-gray-300">vs</div>
              <div className={`text-center p-4 rounded-2xl ${teamScores.team2 >= teamScores.team1 ? 'bg-red-50 ring-2 ring-red-400' : 'bg-gray-50'}`}>
                <div className="text-3xl font-bold text-red-600">{teamScores.team2}</div>
                <div className="text-sm font-medium text-gray-600">{t('bluff.team2')}</div>
              </div>
            </div>
          )}

          <motion.button
            onClick={handlePlayAgain}
            className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-2xl font-semibold shadow-lg"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <RotateCcw className="w-5 h-5" />
            {t('bluff.playAgain')}
          </motion.button>
        </motion.div>
      </div>
    );
  }

  if (!currentCard) return null;

  return (
    <div className="fixed inset-0 pt-16 pb-4 px-3 flex flex-col bg-gradient-to-br from-orange-50 to-red-50 md:static md:pt-24 md:pb-8 md:px-4 md:min-h-screen">
      <div className="container mx-auto max-w-lg flex flex-col h-full md:h-auto">

        {/* Game mode toggle + Category filters */}
        <div className="flex-shrink-0">
          {/* Game mode toggle */}
          <div className="flex items-center justify-center gap-2 py-2 mb-2">
            <motion.button
              onClick={() => handleGameModeSwitch('solo')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                gameMode === 'solo'
                  ? 'bg-orange-600 text-white shadow-md'
                  : 'bg-white text-gray-500 hover:bg-gray-100'
              }`}
              whileTap={{ scale: 0.95 }}
            >
              <User className="w-3.5 h-3.5" />
              {t('bluff.soloMode')}
            </motion.button>
            <motion.button
              onClick={() => handleGameModeSwitch('teams')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                gameMode === 'teams'
                  ? 'bg-orange-600 text-white shadow-md'
                  : 'bg-white text-gray-500 hover:bg-gray-100'
              }`}
              whileTap={{ scale: 0.95 }}
            >
              <Users className="w-3.5 h-3.5" />
              {t('bluff.teamMode')}
            </motion.button>
          </div>

          {/* Category filter pills */}
          <div className="flex gap-2 overflow-x-auto py-1 mb-3 scrollbar-hide">
            <button
              onClick={() => handleCategoryChange('all')}
              className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                selectedCategory === 'all'
                  ? 'bg-orange-600 text-white shadow-md'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              {t('bluff.allCategories')}
            </button>
            {BLUFF_CARD_CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-orange-600 text-white shadow-md'
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
              >
                {cat.icon} {cat.name[lang]}
              </button>
            ))}
          </div>
        </div>

        {/* Scoreboard */}
        <div className="flex items-center justify-between mb-3 flex-shrink-0">
          <span className="text-sm font-medium text-gray-500">
            {currentIndex + 1} {t('bluff.cardOf')} {totalCards}
          </span>
          {gameMode === 'solo' ? (
            <div className="flex items-center gap-3">
              {streak > 1 && (
                <span className="flex items-center gap-1 text-xs font-bold text-orange-500">
                  <Flame className="w-3.5 h-3.5" /> {streak}
                </span>
              )}
              <span className="text-sm font-bold text-green-600">{soloScore.correct}</span>
              <span className="text-gray-300">/</span>
              <span className="text-sm font-bold text-red-500">{soloScore.wrong}</span>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-sm">
              <span className={`font-bold px-2 py-0.5 rounded-lg ${currentTeam === 1 ? 'bg-blue-100 text-blue-700' : 'text-blue-500'}`}>
                {t('bluff.team1')}: {teamScores.team1}
              </span>
              <span className="text-gray-300">|</span>
              <span className={`font-bold px-2 py-0.5 rounded-lg ${currentTeam === 2 ? 'bg-red-100 text-red-700' : 'text-red-500'}`}>
                {t('bluff.team2')}: {teamScores.team2}
              </span>
            </div>
          )}
        </div>

        {/* Progress bar */}
        <div className="w-full bg-gray-200 rounded-full h-1.5 mb-4 flex-shrink-0">
          <div
            className="bg-gradient-to-r from-orange-500 to-red-500 h-1.5 rounded-full transition-all duration-500"
            style={{ width: `${((currentIndex + 1) / totalCards) * 100}%` }}
          />
        </div>

        {/* Team indicator for team mode */}
        {gameMode === 'teams' && !revealed && !alreadyAnswered && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`text-center mb-3 py-2 rounded-2xl font-semibold text-sm flex-shrink-0 ${
              currentTeam === 1
                ? 'bg-blue-100 text-blue-700'
                : 'bg-red-100 text-red-700'
            }`}
          >
            {currentTeam === 1 ? t('bluff.team1') : t('bluff.team2')}
          </motion.div>
        )}

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
                <span className="px-3 py-1 bg-orange-50 text-orange-700 rounded-full text-xs font-medium">
                  {BLUFF_CARD_CATEGORIES.find(c => c.id === currentCard.category)?.icon}{' '}
                  {BLUFF_CARD_CATEGORIES.find(c => c.id === currentCard.category)?.name[lang]}
                </span>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  currentCard.difficulty === 'easy' ? 'bg-green-50 text-green-700' :
                  currentCard.difficulty === 'medium' ? 'bg-yellow-50 text-yellow-700' :
                  'bg-red-50 text-red-700'
                }`}>
                  {t(`ui.difficulty.${currentCard.difficulty}`)}
                </span>
              </div>

              {/* Statement */}
              <div className="px-6 py-6 md:py-8">
                <p className="text-lg md:text-xl font-semibold text-gray-900 text-center leading-relaxed">
                  &ldquo;{currentCard.statement[lang]}&rdquo;
                </p>
              </div>

              {/* Answer section (revealed) */}
              <AnimatePresence>
                {(revealed || alreadyAnswered) && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    {/* True/False result banner */}
                    <div className={`mx-6 mb-3 py-3 rounded-2xl text-center font-bold text-lg ${
                      currentCard.isTrue
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {currentCard.isTrue ? t('bluff.trueStatement') : t('bluff.falseStatement')}
                    </div>

                    {/* User result indicator */}
                    {userChoice !== null && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 300, damping: 15 }}
                        className="text-center mb-3"
                      >
                        <span className={`text-4xl ${userChoice === currentCard.isTrue ? '' : ''}`}>
                          {userChoice === currentCard.isTrue ? '🎉' : '😅'}
                        </span>
                      </motion.div>
                    )}

                    {/* Explanation */}
                    <div className="mx-6 mb-5 bg-gray-50 rounded-2xl px-4 py-3">
                      <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">{t('bluff.explanation')}</span>
                      <p className="text-gray-700 mt-1 text-sm leading-relaxed">{currentCard.explanation[lang]}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Action buttons */}
              <div className="px-6 pb-5">
                {!revealed && !alreadyAnswered ? (
                  <div className="space-y-3">
                    {/* True / False buttons */}
                    <div className="flex gap-3">
                      <motion.button
                        onClick={() => setUserChoice(true)}
                        className={`flex-1 py-4 rounded-2xl font-bold text-base transition-all ${
                          userChoice === true
                            ? 'bg-green-500 text-white shadow-lg ring-2 ring-green-300 scale-[1.02]'
                            : 'bg-green-50 text-green-700 hover:bg-green-100'
                        }`}
                        whileTap={{ scale: 0.95 }}
                      >
                        {t('bluff.true')}
                      </motion.button>
                      <motion.button
                        onClick={() => setUserChoice(false)}
                        className={`flex-1 py-4 rounded-2xl font-bold text-base transition-all ${
                          userChoice === false
                            ? 'bg-red-500 text-white shadow-lg ring-2 ring-red-300 scale-[1.02]'
                            : 'bg-red-50 text-red-700 hover:bg-red-100'
                        }`}
                        whileTap={{ scale: 0.95 }}
                      >
                        {t('bluff.false')}
                      </motion.button>
                    </div>

                    {/* Reveal button */}
                    <motion.button
                      onClick={handleReveal}
                      disabled={userChoice === null}
                      className={`flex items-center justify-center gap-2 w-full py-3 rounded-2xl font-semibold text-sm transition-all ${
                        userChoice !== null
                          ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-md'
                          : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      }`}
                      whileHover={userChoice !== null ? { scale: 1.02 } : {}}
                      whileTap={userChoice !== null ? { scale: 0.98 } : {}}
                    >
                      <Eye className="w-4 h-4" />
                      {userChoice !== null ? t('bluff.revealAnswer') : t('bluff.madeYourChoice')}
                    </motion.button>
                  </div>
                ) : (
                  /* Next card button */
                  <motion.button
                    onClick={handleNext}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-3 rounded-2xl font-semibold shadow-md text-sm"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {t('bluff.nextCard')}
                    <ChevronRight className="w-4 h-4" />
                  </motion.button>
                )}
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
            {t('bluff.prevCard')}
          </motion.button>

          <motion.button
            onClick={handleNext}
            disabled={currentIndex >= totalCards - 1}
            className={`flex items-center gap-1 px-4 py-2 rounded-xl font-medium text-sm transition-all ${
              currentIndex >= totalCards - 1
                ? 'text-gray-300 cursor-not-allowed'
                : 'text-orange-600 hover:bg-white hover:shadow-sm'
            }`}
            whileTap={currentIndex < totalCards - 1 ? { scale: 0.95 } : {}}
          >
            {t('bluff.nextCard')}
            <ChevronRight className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </div>
  );
}
