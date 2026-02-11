"use client";

import { useState, useEffect } from 'react';
import { Navigation } from '../../../components/Navigation';
import { DeckCard } from '../../../components/DeckCard';
import { QuestionModal } from '../../../components/QuestionModal';
import { LoadingSpinner } from '../../../components/LoadingSpinner';
import { ErrorMessage } from '../../../components/ErrorMessage';
import { EmojiDecoder } from '../../../components/EmojiDecoder';
import { Valentine } from '../../../components/Valentine';
import { CONVERSATION_DECKS } from '../../../../shared/src';
import type { GameMode, SupportedLanguage } from '../../../../shared/src';
import { useConversationCards } from '../../../hooks/useConversationCards';
import { useClientTranslation } from '../../../hooks/useClientTranslation';
import { motion } from 'framer-motion';
import { Shuffle } from 'lucide-react';

// Pair decks into rows of 2 for mobile grid
function chunkPairs<T>(arr: T[]): T[][] {
  const result: T[][] = [];
  for (let i = 0; i < arr.length; i += 2) {
    result.push(arr.slice(i, i + 2));
  }
  return result;
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.8 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 100, damping: 10 }
  }
};

export default function GamePage({ params: { locale, game } }: { params: { locale: string; game: string } }) {
  const activeGameMode = game as GameMode;

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isShuffleMode, setIsShuffleMode] = useState(false);
  const { t } = useClientTranslation(locale);

  const {
    categoryCounts,
    currentCard,
    isLoadingCategories,
    isLoadingCard,
    categoryError,
    cardError,
    getRandomCard,
    getRandomCardFromCategory,
    voteOnCard,
  } = useConversationCards();

  const language: SupportedLanguage = locale === 'tr' ? 'tr' : 'en';

  const handleDeckClick = async (deckId: string) => {
    try {
      setIsShuffleMode(false);
      await getRandomCardFromCategory(deckId, language);
      setIsModalOpen(true);
    } catch (error) {
      console.error('Failed to get random card from deck:', error);
    }
  };

  const handleNewQuestion = async () => {
    if (currentCard) {
      try {
        if (isShuffleMode) {
          await getRandomCard(language);
        } else {
          await getRandomCardFromCategory(currentCard.category, language);
        }
      } catch (error) {
        console.error('Failed to get new question:', error);
      }
    }
  };

  const handleShuffle = async () => {
    try {
      setIsShuffleMode(true);
      await getRandomCard(language);
      setIsModalOpen(true);
    } catch (error) {
      console.error('Failed to get random card:', error);
    }
  };

  const handleVote = async (cardId: string, voteType: 'up' | 'down') => {
    try {
      const apiVoteType = voteType === 'up' ? 'upvote' : 'downvote';
      await voteOnCard(cardId, apiVoteType);
    } catch (error) {
      console.error('Error voting on card:', error);
    }
  };

  const decksWithCounts = CONVERSATION_DECKS.map(deck => ({
    ...deck,
    cardCount: categoryCounts[deck.id] || 0
  }));

  const deckRows = chunkPairs(decksWithCounts);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navigation
        locale={locale}
        activeGameMode={activeGameMode}
        onShuffleMode={activeGameMode === 'conversation-cards' ? handleShuffle : undefined}
      />

      {activeGameMode === 'conversation-cards' && (
        <>
          {/* Error state */}
          {categoryError ? (
            <div className="pt-24 pb-12 px-4">
              <div className="container mx-auto max-w-6xl">
                <ErrorMessage
                  message={`Failed to load categories: ${categoryError}`}
                  onRetry={() => window.location.reload()}
                />
              </div>
            </div>
          ) : isLoadingCategories ? (
            <main className="pt-20 md:pt-24 pb-12 px-4">
              <div className="container mx-auto max-w-6xl">
                <div className="text-center py-12">
                  <LoadingSpinner size="lg" />
                  <p className="text-gray-600 mt-4">{t('ui.loadingQuestion')}</p>
                </div>
              </div>
            </main>
          ) : (
            <>
              {/* Mobile: 2-column grid using loop */}
              <div className="md:hidden fixed inset-0 pt-16 pb-4 px-2 overflow-hidden">
                <div className="flex flex-col h-full w-full justify-between gap-3">
                  {deckRows.map((row, rowIndex) => (
                    <div key={rowIndex} className="flex gap-2 flex-1">
                      {row.map((deck, colIndex) => (
                        <motion.div
                          key={deck.id}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3, delay: (rowIndex * 2 + colIndex) * 0.1 }}
                          className="flex-1"
                        >
                          <DeckCard
                            deck={deck}
                            index={rowIndex * 2 + colIndex}
                            onClick={() => handleDeckClick(deck.id)}
                            locale={locale}
                            cardCount={deck.cardCount}
                            variant="mobile-grid"
                          />
                        </motion.div>
                      ))}
                    </div>
                  ))}

                  {/* Shuffle button row */}
                  <div className="flex-1 flex items-center">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: 0.7 }}
                      className="w-full h-full"
                    >
                      <motion.div
                        className="w-full h-full bg-gradient-shuffle text-white rounded-3xl font-semibold shadow-sm hover:shadow-lg transition-all duration-300 relative overflow-hidden flex flex-col items-center justify-center cursor-pointer"
                        whileHover={{ scale: 1.05, rotate: -1, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleShuffle}
                        style={{ textShadow: '0 2px 4px rgba(0, 0, 0, 0.4)' }}
                      >
                        <div className="absolute inset-0 bg-black/15 rounded-3xl" />
                        <div className="relative z-10 text-center">
                          <div className="text-3xl md:text-4xl mb-3 drop-shadow-lg">
                            <Shuffle className="w-8 h-8 mx-auto" />
                          </div>
                          <span className="font-semibold tracking-tight text-base leading-tight drop-shadow-lg">
                            {t('navigation.shuffle')}
                          </span>
                        </div>
                        <div className="absolute top-2 right-2 w-12 h-12 bg-white/10 rounded-full" />
                        <div className="absolute bottom-2 left-2 w-16 h-16 bg-white/10 rounded-full" />
                      </motion.div>
                    </motion.div>
                  </div>
                </div>
              </div>

              {/* Desktop: Staggered grid */}
              <main className="hidden md:block md:pt-32 md:pb-12 md:px-4">
                <div className="container mx-auto max-w-6xl">
                  <motion.div
                    className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                  >
                    {decksWithCounts.map((deck, index) => (
                      <motion.div key={deck.id} variants={itemVariants}>
                        <DeckCard
                          deck={deck}
                          index={index}
                          onClick={() => handleDeckClick(deck.id)}
                          locale={locale}
                          cardCount={deck.cardCount}
                        />
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              </main>
            </>
          )}

          {/* Question Modal */}
          <QuestionModal
            question={currentCard}
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onNewQuestion={handleNewQuestion}
            onVote={handleVote}
            locale={locale}
            isLoading={isLoadingCard}
            error={cardError}
          />
        </>
      )}

      {activeGameMode === 'emoji-decoder' && (
        <EmojiDecoder locale={locale} />
      )}

      {activeGameMode === 'valentine' && (
        <Valentine locale={locale} />
      )}
    </div>
  );
}
