export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Game {
  id: string;
  title: string;
  description: string;
  category: string;
}

export interface ConversationCard {
  id: string;
  question: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  tags: string[];
}

export interface Deck {
  id: string;
  name: string;
  description: string;
  color: string;
  icon: string;
  questions: ConversationCard[];
}