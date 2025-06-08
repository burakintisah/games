"use client";

import { useState } from 'react';
import { Navigation } from '../../components/Navigation';
import { DeckCard } from '../../components/DeckCard';
import { QuestionModal } from '../../components/QuestionModal';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import { CONVERSATION_DECKS } from '../../../shared/src';
import { getTranslation } from '../../lib/i18n';
import { ClientPageWrapper } from '../../components/ClientPageWrapper';

interface PageContentProps {
  locale: string;
  onDeckClick: (deckId: string) => void;
  categoryCounts: Record<string, number>;
  isLoadingCategories: boolean;
}

function PageContent({ locale, onDeckClick, categoryCounts, isLoadingCategories }: PageContentProps) {
  // Create deck data with counts from API
  const decksWithCounts = CONVERSATION_DECKS.map(deck => ({
    ...deck,
    cardCount: categoryCounts[deck.id] || 0
  }));

  if (isLoadingCategories) {
    return (
      <main className="pt-24 pb-12 px-4">
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
    <main className="pt-24 pb-12 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Deck Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
  );
}

interface PageHeaderProps {
  title: string;
  description: string;
}

function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <div className="pt-24 pb-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {title}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {description}
          </p>
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
        <PageHeader 
          title={t('gameModes.conversationCards')}
          description={t('gameModes.conversationCardsDesc')}
        />
      </ClientPageWrapper>
    </div>
  );
} 