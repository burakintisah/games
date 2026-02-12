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
    locales: ['en', 'tr'],
  },
  {
    id: 'emoji-decoder',
    nameKey: 'gameModes.emojiDecoder',
    descKey: 'gameModes.emojiDecoderDesc',
    icon: '🧩',
    locales: ['en', 'tr'],
  },
  {
    id: 'valentine',
    nameKey: 'gameModes.valentine',
    descKey: 'gameModes.valentineDesc',
    icon: '💝',
    locales: ['en', 'tr'],
  },
  {
    id: 'bluff-cards',
    nameKey: 'gameModes.bluffCards',
    descKey: 'gameModes.bluffCardsDesc',
    icon: '🃏',
    locales: ['en', 'tr'],
  },
  {
    id: 'taboo',
    nameKey: 'gameModes.taboo',
    descKey: 'gameModes.tabooDesc',
    icon: '🚫',
    locales: ['en'],
  }
] as const;

export const API_ENDPOINTS = {
  HEALTH: '/api/health'
} as const;
