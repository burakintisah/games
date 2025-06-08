"use client";

import { useState, useEffect } from 'react';
import { Navigation } from '../../components/Navigation';
import { DeckCard } from '../../components/DeckCard';
import { QuestionModal } from '../../components/QuestionModal';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import { CONVERSATION_DECKS } from '../../../shared/src';
import { getTranslation } from '../../lib/i18n';
import { ClientPageWrapper } from '../../components/ClientPageWrapper';
import { motion } from 'framer-motion';
import { Shuffle } from 'lucide-react';
import { useClientTranslation } from '../../hooks/useClientTranslation';

interface PageContentProps {
  locale: string;
  onDeckClick: (deckId: string) => void;
  onShuffleClick: () => void;
  categoryCounts: Record<string, number>;
  isLoadingCategories: boolean;
}

function PageContent({ locale, onDeckClick, onShuffleClick, categoryCounts, isLoadingCategories }: PageContentProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const { t } = useClientTranslation(locale);

  // Handle scroll for mobile navigation hiding
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Create deck data with counts from API
  const decksWithCounts = CONVERSATION_DECKS.map(deck => ({
    ...deck,
    cardCount: categoryCounts[deck.id] || 0
  }));

  if (isLoadingCategories) {
    return (
      <main className="pt-20 md:pt-24 pb-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center py-12">
            <LoadingSpinner size="lg" />
            <p className="text-gray-600 mt-4">Loading conversation decks...</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <>
      {/* Mobile Navigation - Hide when scrolled */}
      <div className={`md:hidden fixed top-0 left-0 right-0 z-40 transition-transform duration-300 ${
        isScrolled ? '-translate-y-full' : 'translate-y-0'
      }`}>
        <Navigation 
          onShuffleMode={onShuffleClick}
          locale={locale}
        />
      </div>

      {/* Desktop Navigation - Always visible */}
      <div className="hidden md:block">
        <Navigation 
          onShuffleMode={onShuffleClick}
          locale={locale}
        />
      </div>

      <main className="md:pt-32 md:pb-12 md:px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Mobile: 2x4 Layout - Non-scrollable */}
          <div className="md:hidden fixed inset-0 pt-20 pb-4 px-2 overflow-hidden">
            <div className="flex flex-col h-full w-full justify-between gap-3">
              {/* Row 1: Relationships, Self-Knowledge */}
              <div className="flex gap-2 flex-1">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  className="flex-1"
                >
                  <DeckCard
                    deck={decksWithCounts[0]}
                    index={0}
                    onClick={() => onDeckClick(decksWithCounts[0].id)}
                    locale={locale}
                    cardCount={decksWithCounts[0].cardCount}
                    compact={true}
                    mobile={true}
                    fullSize={true}
                  />
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                  className="flex-1"
                >
                  <DeckCard
                    deck={decksWithCounts[1]}
                    index={1}
                    onClick={() => onDeckClick(decksWithCounts[1].id)}
                    locale={locale}
                    cardCount={decksWithCounts[1].cardCount}
                    compact={true}
                    mobile={true}
                    fullSize={true}
                  />
                </motion.div>
              </div>

              {/* Row 2: Work & Purpose, Culture & Society */}
              <div className="flex gap-2 flex-1">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                  className="flex-1"
                >
                  <DeckCard
                    deck={decksWithCounts[2]}
                    index={2}
                    onClick={() => onDeckClick(decksWithCounts[2].id)}
                    locale={locale}
                    cardCount={decksWithCounts[2].cardCount}
                    compact={true}
                    mobile={true}
                    fullSize={true}
                  />
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.4 }}
                  className="flex-1"
                >
                  <DeckCard
                    deck={decksWithCounts[3]}
                    index={3}
                    onClick={() => onDeckClick(decksWithCounts[3].id)}
                    locale={locale}
                    cardCount={decksWithCounts[3].cardCount}
                    compact={true}
                    mobile={true}
                    fullSize={true}
                  />
                </motion.div>
              </div>

              {/* Row 3: Philosophy, Childhood & Memory */}
              <div className="flex gap-2 flex-1">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.5 }}
                  className="flex-1"
                >
                  <DeckCard
                    deck={decksWithCounts[4]}
                    index={4}
                    onClick={() => onDeckClick(decksWithCounts[4].id)}
                    locale={locale}
                    cardCount={decksWithCounts[4].cardCount}
                    compact={true}
                    mobile={true}
                    fullSize={true}
                  />
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.6 }}
                  className="flex-1"
                >
                  <DeckCard
                    deck={decksWithCounts[5]}
                    index={5}
                    onClick={() => onDeckClick(decksWithCounts[5].id)}
                    locale={locale}
                    cardCount={decksWithCounts[5].cardCount}
                    compact={true}
                    mobile={true}
                    fullSize={true}
                  />
                </motion.div>
              </div>

              {/* Bottom Row: Full-width Shuffle Button */}
              <div className="flex-1 flex items-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.7 }}
                  className="w-full h-full"
                >
                  <motion.div
                    className="w-full h-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-3xl font-bold shadow-xl hover:shadow-2xl transition-all duration-300 relative overflow-hidden flex flex-col items-center justify-center cursor-pointer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onShuffleClick}
                    style={{ textShadow: '0 2px 4px rgba(0, 0, 0, 0.4)' }}
                  >
                    {/* Background overlay for consistency */}
                    <div className="absolute inset-0 bg-black/15"></div>
                    
                    {/* Content */}
                    <div className="relative z-10 text-center">
                      <div className="text-3xl mb-3 drop-shadow-lg">
                        <Shuffle className="w-8 h-8 mx-auto" />
                      </div>
                      <span className="text-sm font-bold leading-tight drop-shadow-lg">
                        {t('navigation.shuffle')}
                      </span>
                    </div>
                    
                    {/* Decorative elements matching deck cards */}
                    <div className="absolute -top-4 -right-4 w-12 h-12 bg-white/10 rounded-full"></div>
                    <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-white/10 rounded-full"></div>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Desktop: Original grid layout */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {decksWithCounts.map((deck, index) => (
              <DeckCard
                key={deck.id}
                deck={deck}
                index={index}
                onClick={() => onDeckClick(deck.id)}
                locale={locale}
                cardCount={deck.cardCount}
              />
            ))}
          </div>
        </div>
      </main>
    </>
  );
}

interface PageHeaderProps {
  title: string;
  description: string;
}

function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <div className="pt-32 md:pt-40 pb-8 md:pb-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-8 md:mb-12">
          <motion.h1 
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 md:mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {title}
          </motion.h1>
          <motion.p 
            className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {description}
          </motion.p>
        </div>
      </div>
    </div>
  );
}

export default async function Page({ params: { locale } }: { params: { locale: string } }) {
  const { t } = await getTranslation(locale);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <ClientPageWrapper locale={locale} PageContent={PageContent}>
        <div className="hidden md:block">
          <PageHeader 
            title={t('gameModes.conversationCards')}
            description={t('gameModes.conversationCardsDesc')}
          />
        </div>
      </ClientPageWrapper>
    </div>
  );
} 