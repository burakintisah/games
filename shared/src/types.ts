// Core game types
export type DifficultyLevel = 'easy' | 'medium' | 'hard';
export type SupportedLanguage = 'en' | 'tr';
export type GameMode = 'conversation-cards' | 'emoji-decoder' | 'valentine';

export interface MultilingualText {
  en: string;
  tr: string;
}

export interface ConversationCard {
  id: string;
  question: MultilingualText;
  category: string;
  difficulty: DifficultyLevel;
  tags: string[];
  upvotes?: number;
  downvotes?: number;
  totalVotes?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface ConversationDeck {
  id: string;
  name: string;
  description: string;
  color: string;
  icon: string;
  cards: ConversationCard[];
}

export interface EmojiPuzzle {
  id: string;
  emojis: string;
  answer: MultilingualText;
  hint: MultilingualText;
  category: string;
  difficulty: DifficultyLevel;
}

// API response types
export interface ApiResponse<T = any> {
  status: 'success' | 'error';
  message?: string;
  timestamp: string;
  data?: T;
  error?: string;
}

export interface HealthCheckResponse {
  status: 'healthy' | 'unhealthy';
  timestamp: string;
  uptime: number;
  environment: string;
  version: string;
  services: {
    firebase: 'connected' | 'disconnected';
  };
}
