import { useState, useEffect, useCallback } from 'react';
import type { ConversationCard, SupportedLanguage } from '../../shared/src';
import { apiHelpers, conversationCardsAPI, type CategoryCountsData } from '../lib/api';

interface UseConversationCardsState {
  // Data
  categoryCounts: Record<string, number>;
  currentCard: ConversationCard | null;
  
  // Loading states
  isLoadingCategories: boolean;
  isLoadingCard: boolean;
  
  // Error states
  categoryError: string | null;
  cardError: string | null;
  
  // Actions
  getRandomCard: (language?: SupportedLanguage) => Promise<void>;
  getRandomCardFromCategory: (category: string, language?: SupportedLanguage) => Promise<void>;
  refreshCategories: () => Promise<void>;
  voteOnCard: (cardId: string, voteType: 'upvote' | 'downvote') => Promise<boolean>;
}

export function useConversationCards(): UseConversationCardsState {
  // State
  const [categoryCounts, setCategoryCounts] = useState<Record<string, number>>({});
  const [currentCard, setCurrentCard] = useState<ConversationCard | null>(null);
  
  // Loading states
  const [isLoadingCategories, setIsLoadingCategories] = useState(false);
  const [isLoadingCard, setIsLoadingCard] = useState(false);
  
  // Error states
  const [categoryError, setCategoryError] = useState<string | null>(null);
  const [cardError, setCardError] = useState<string | null>(null);

  // Load category counts on mount
  const loadCategories = useCallback(async () => {
    setIsLoadingCategories(true);
    setCategoryError(null);
    
    try {
      const stats = await apiHelpers.getCategoryStats();
      setCategoryCounts(stats);
    } catch (error) {
      console.error('Failed to load categories:', error);
      setCategoryError(error instanceof Error ? error.message : 'Failed to load categories');
    } finally {
      setIsLoadingCategories(false);
    }
  }, []);

  // Get random card from any category
  const getRandomCard = useCallback(async (language?: SupportedLanguage) => {
    setIsLoadingCard(true);
    setCardError(null);
    
    try {
      const card = await apiHelpers.getRandomCard(language);
      if (card) {
        setCurrentCard(card);
      } else {
        setCardError('No cards available');
      }
    } catch (error) {
      console.error('Failed to get random card:', error);
      setCardError(error instanceof Error ? error.message : 'Failed to get random card');
    } finally {
      setIsLoadingCard(false);
    }
  }, []);

  // Get random card from specific category
  const getRandomCardFromCategory = useCallback(async (category: string, language?: SupportedLanguage) => {
    setIsLoadingCard(true);
    setCardError(null);
    
    try {
      const card = await apiHelpers.getRandomCardFromCategory(category, language);
      if (card) {
        setCurrentCard(card);
      } else {
        setCardError(`No cards available in category: ${category}`);
      }
    } catch (error) {
      console.error('Failed to get random card from category:', error);
      setCardError(error instanceof Error ? error.message : 'Failed to get random card');
    } finally {
      setIsLoadingCard(false);
    }
  }, []);

  // Vote on current card
  const voteOnCard = useCallback(async (cardId: string, voteType: 'upvote' | 'downvote'): Promise<boolean> => {
    try {
      await conversationCardsAPI.voteOnCard(cardId, voteType);
      
      // Update the current card's vote counts if it's the same card
      if (currentCard && currentCard.id === cardId) {
        const updatedCard = { ...currentCard };
        if (voteType === 'upvote') {
          updatedCard.upvotes = (updatedCard.upvotes || 0) + 1;
        } else {
          updatedCard.downvotes = (updatedCard.downvotes || 0) + 1;
        }
        updatedCard.totalVotes = (updatedCard.upvotes || 0) + (updatedCard.downvotes || 0);
        setCurrentCard(updatedCard);
      }
      
      return true;
    } catch (error) {
      console.error('Failed to vote on card:', error);
      return false;
    }
  }, [currentCard]);

  // Refresh categories
  const refreshCategories = useCallback(async () => {
    await loadCategories();
  }, [loadCategories]);

  // Load categories on mount
  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  return {
    // Data
    categoryCounts,
    currentCard,
    
    // Loading states
    isLoadingCategories,
    isLoadingCard,
    
    // Error states
    categoryError,
    cardError,
    
    // Actions
    getRandomCard,
    getRandomCardFromCategory,
    refreshCategories,
    voteOnCard,
  };
}

// Additional hook for getting cards by category (for deck display)
export function useCategoryCards(category: string, language?: SupportedLanguage) {
  const [cards, setCards] = useState<ConversationCard[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadCards = useCallback(async () => {
    if (!category) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const categoryCards = await apiHelpers.getCardsByCategory(category, language);
      setCards(categoryCards);
    } catch (err) {
      console.error('Failed to load category cards:', err);
      setError(err instanceof Error ? err.message : 'Failed to load cards');
    } finally {
      setIsLoading(false);
    }
  }, [category, language]);

  useEffect(() => {
    loadCards();
  }, [loadCards]);

  return {
    cards,
    isLoading,
    error,
    refetch: loadCards,
  };
} 