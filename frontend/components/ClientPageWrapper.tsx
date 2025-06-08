"use client";

import { useState, useEffect } from 'react';
import { Navigation } from './Navigation';
import { QuestionModal } from './QuestionModal';
import { LoadingSpinner } from './LoadingSpinner';
import { ErrorMessage } from './ErrorMessage';
import { useConversationCards } from '../hooks/useConversationCards';
import type { ConversationCard, SupportedLanguage } from '../../shared/src';

interface ClientPageWrapperProps {
  children: React.ReactNode;
  locale: string;
  PageContent: React.ComponentType<{ 
    locale: string; 
    onDeckClick: (deckId: string) => void;
    categoryCounts: Record<string, number>;
    isLoadingCategories: boolean;
  }>;
}

export function ClientPageWrapper({ children, locale, PageContent }: ClientPageWrapperProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isShuffleMode, setIsShuffleMode] = useState(false); // Track if user is in shuffle mode
  
  // Use the conversation cards hook
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

  // Convert locale to supported language
  const language: SupportedLanguage = locale === 'tr' ? 'tr' : 'en';

  const handleDeckClick = async (deckId: string) => {
    try {
      setIsShuffleMode(false); // User clicked a specific deck, not shuffle mode
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
          // If in shuffle mode, get random card from any category
          await getRandomCard(language);
        } else {
          // If in deck mode, get random card from same category
          await getRandomCardFromCategory(currentCard.category, language);
        }
      } catch (error) {
        console.error('Failed to get new question:', error);
      }
    }
  };

  const handleShuffle = async () => {
    try {
      setIsShuffleMode(true); // User clicked shuffle, enable shuffle mode
      await getRandomCard(language);
      setIsModalOpen(true);
    } catch (error) {
      console.error('Failed to get random card:', error);
    }
  };

  const handleVote = async (cardId: string, voteType: 'upvote' | 'downvote') => {
    try {
      const success = await voteOnCard(cardId, voteType);
      if (!success) {
        console.error('Failed to vote on card');
      }
    } catch (error) {
      console.error('Error voting on card:', error);
    }
  };

  // Show error if categories failed to load
  if (categoryError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <Navigation 
          onShuffleMode={handleShuffle}
          locale={locale}
        />
        {children}
        <div className="pt-24 pb-12 px-4">
          <div className="container mx-auto max-w-6xl">
            <ErrorMessage 
              message={`Failed to load categories: ${categoryError}`}
              onRetry={() => window.location.reload()}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navigation 
        onShuffleMode={handleShuffle}
        locale={locale}
      />
      
      {children}
      
      <PageContent 
        locale={locale} 
        onDeckClick={handleDeckClick}
        categoryCounts={categoryCounts}
        isLoadingCategories={isLoadingCategories}
      />

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
  );
} 