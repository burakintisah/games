import type { ConversationCard, SupportedLanguage } from '../../shared/src';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

// API Response types
interface ApiResponse<T> {
  status: 'success' | 'error';
  message: string;
  timestamp: string;
  data?: T;
  error?: string;
}

interface CategoryCountsData {
  totalCards: number;
  categoryCounts: Record<string, number>;
  uniqueCategories: number;
}

interface RandomCardsData {
  cards: ConversationCard[];
  requestedCount: number;
  returnedCount: number;
  appliedFilters: string[];
  totalAvailableCards: number;
  language: SupportedLanguage;
}

interface CardsListData {
  cards: ConversationCard[];
  total: number;
  filters: {
    category?: string;
    difficulty?: string;
    language: SupportedLanguage;
  };
  pagination: {
    limit: number;
    offset: number;
  };
}

interface VoteData {
  id: string;
  voteType: 'upvote' | 'downvote';
  upvotes: number;
  downvotes: number;
  totalVotes: number;
}

interface VoteStatsData {
  cardId: string;
  upvotes: number;
  downvotes: number;
  totalVotes: number;
  upvotePercentage: number;
  downvotePercentage: number;
}

// API Client class
export class ConversationCardsAPI {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`;
    
    try {
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error(`API request failed for ${endpoint}:`, error);
      throw error;
    }
  }

  // Health check
  async healthCheck(): Promise<ApiResponse<any>> {
    return this.request('/api/health');
  }

  // Get all conversation cards
  async getCards(params: {
    category?: string;
    difficulty?: 'easy' | 'medium' | 'hard';
    language?: SupportedLanguage;
    limit?: number;
    offset?: number;
  } = {}): Promise<ApiResponse<CardsListData>> {
    const searchParams = new URLSearchParams();
    
    if (params.category) searchParams.append('category', params.category);
    if (params.difficulty) searchParams.append('difficulty', params.difficulty);
    if (params.language) searchParams.append('language', params.language);
    if (params.limit) searchParams.append('limit', params.limit.toString());
    if (params.offset) searchParams.append('offset', params.offset.toString());

    const query = searchParams.toString();
    const endpoint = `/api/v1/conversation-cards${query ? `?${query}` : ''}`;
    
    return this.request<CardsListData>(endpoint);
  }

  // Get category counts
  async getCategoryCounts(): Promise<ApiResponse<CategoryCountsData>> {
    return this.request<CategoryCountsData>('/api/v1/conversation-cards/categories/count');
  }

  // Get random cards
  async getRandomCards(params: {
    categories?: string[];
    count?: number;
    language?: SupportedLanguage;
  } = {}): Promise<ApiResponse<RandomCardsData>> {
    const searchParams = new URLSearchParams();
    
    if (params.categories && params.categories.length > 0) {
      searchParams.append('categories', params.categories.join(','));
    }
    if (params.count) searchParams.append('count', params.count.toString());
    if (params.language) searchParams.append('language', params.language);

    const query = searchParams.toString();
    const endpoint = `/api/v1/conversation-cards/random${query ? `?${query}` : ''}`;
    
    return this.request<RandomCardsData>(endpoint);
  }

  // Get specific card
  async getCard(cardId: string, language?: SupportedLanguage): Promise<ApiResponse<ConversationCard>> {
    const searchParams = new URLSearchParams();
    if (language) searchParams.append('language', language);
    
    const query = searchParams.toString();
    const endpoint = `/api/v1/conversation-cards/${cardId}${query ? `?${query}` : ''}`;
    
    return this.request<ConversationCard>(endpoint);
  }

  // Create new card
  async createCard(cardData: {
    question: { en: string; tr: string };
    category: string;
    difficulty: 'easy' | 'medium' | 'hard';
    tags?: string[];
  }): Promise<ApiResponse<ConversationCard>> {
    return this.request<ConversationCard>('/api/v1/conversation-cards', {
      method: 'POST',
      body: JSON.stringify(cardData),
    });
  }

  // Update card
  async updateCard(cardId: string, cardData: {
    question?: { en: string; tr: string };
    category?: string;
    difficulty?: 'easy' | 'medium' | 'hard';
    tags?: string[];
  }): Promise<ApiResponse<ConversationCard>> {
    return this.request<ConversationCard>(`/api/v1/conversation-cards/${cardId}`, {
      method: 'PUT',
      body: JSON.stringify(cardData),
    });
  }

  // Delete card
  async deleteCard(cardId: string): Promise<ApiResponse<{ deletedCardId: string }>> {
    return this.request<{ deletedCardId: string }>(`/api/v1/conversation-cards/${cardId}`, {
      method: 'DELETE',
    });
  }

  // Vote on card
  async voteOnCard(cardId: string, voteType: 'upvote' | 'downvote'): Promise<ApiResponse<VoteData>> {
    return this.request<VoteData>(`/api/v1/conversation-cards/${cardId}/vote`, {
      method: 'POST',
      body: JSON.stringify({ voteType }),
    });
  }

  // Get vote statistics
  async getVoteStats(cardId: string): Promise<ApiResponse<VoteStatsData>> {
    return this.request<VoteStatsData>(`/api/v1/conversation-cards/${cardId}/votes`);
  }
}

// Create a singleton instance
export const conversationCardsAPI = new ConversationCardsAPI();

// Helper functions for common operations
export const apiHelpers = {
  // Get random card from specific category
  async getRandomCardFromCategory(category: string, language?: SupportedLanguage): Promise<ConversationCard | null> {
    try {
      const response = await conversationCardsAPI.getRandomCards({
        categories: [category],
        count: 1,
        language,
      });
      
      return response.data?.cards[0] || null;
    } catch (error) {
      console.error('Failed to get random card from category:', error);
      return null;
    }
  },

  // Get random card from any category
  async getRandomCard(language?: SupportedLanguage): Promise<ConversationCard | null> {
    try {
      const response = await conversationCardsAPI.getRandomCards({
        count: 1,
        language,
      });
      
      return response.data?.cards[0] || null;
    } catch (error) {
      console.error('Failed to get random card:', error);
      return null;
    }
  },

  // Get all cards from specific category
  async getCardsByCategory(category: string, language?: SupportedLanguage): Promise<ConversationCard[]> {
    try {
      const response = await conversationCardsAPI.getCards({
        category,
        language,
        limit: 100, // Get all cards from category
      });
      
      return response.data?.cards || [];
    } catch (error) {
      console.error('Failed to get cards by category:', error);
      return [];
    }
  },

  // Get category statistics
  async getCategoryStats(): Promise<Record<string, number>> {
    try {
      const response = await conversationCardsAPI.getCategoryCounts();
      return response.data?.categoryCounts || {};
    } catch (error) {
      console.error('Failed to get category stats:', error);
      return {};
    }
  },
};

// Export types for use in components
export type {
  ApiResponse,
  CategoryCountsData,
  RandomCardsData,
  CardsListData,
  VoteData,
  VoteStatsData,
}; 