export const SUPPORTED_LANGUAGES = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'tr', name: 'Türkçe', flag: '🇹🇷' }
] as const;

export const GAME_MODES = [
  {
    id: 'conversation-cards',
    nameKey: 'gameModes.conversationCards',
    descKey: 'gameModes.conversationCardsDesc',
    icon: '💬',
  },
  {
    id: 'emoji-decoder',
    nameKey: 'gameModes.emojiDecoder',
    descKey: 'gameModes.emojiDecoderDesc',
    icon: '🧩',
  },
  {
    id: 'valentine',
    nameKey: 'gameModes.valentine',
    descKey: 'gameModes.valentineDesc',
    icon: '💝',
  }
] as const;

export const API_ENDPOINTS = {
  HEALTH: '/api/health'
} as const;
