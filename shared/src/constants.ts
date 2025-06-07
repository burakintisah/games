export const SUPPORTED_LANGUAGES = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'tr', name: 'Türkçe', flag: '🇹🇷' }
] as const;

export const GAME_MODES = [
  {
    id: 'conversation-cards',
    name: 'Conversation Cards',
    description: 'Deep, meaningful conversations with thought-provoking questions'
  }
] as const;

export const API_ENDPOINTS = {
  HEALTH: '/api/health'
} as const;