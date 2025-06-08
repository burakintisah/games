"use client";

import { motion } from 'framer-motion';
import type { ConversationDeck } from '../../shared/src';
import { useClientTranslation } from '../hooks/useClientTranslation';

interface DeckCardProps {
  deck: ConversationDeck;
  onClick: () => void;
  index: number;
  locale: string;
}

const getDeckTranslationKey = (deckId: string) => {
  const keyMap: Record<string, string> = {
    'relationships': 'relationships',
    'self-knowledge': 'selfKnowledge',
    'work': 'work',
    'culture': 'culture',
    'philosophy': 'philosophy',
    'childhood': 'childhood',
  };
  
  return keyMap[deckId] || deckId;
};

export function DeckCard({ deck, onClick, index, locale }: DeckCardProps) {
  const { t } = useClientTranslation(locale);
  const translationKey = getDeckTranslationKey(deck.id);

  return (
    <motion.div
      className={`${deck.color} rounded-xl p-6 text-white cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden`}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      style={{ textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)' }}
    >
      {/* Background overlay for better text readability */}
      <div className="absolute inset-0 bg-black/10"></div>
      
      {/* Content */}
      <div className="relative z-10">
        <div className="text-4xl mb-4 drop-shadow-sm">{deck.icon}</div>
        <h3 className="text-xl font-bold mb-2 text-white drop-shadow-sm">
          {t(`decks.${translationKey}.name`) || deck.name}
        </h3>
        <p className="text-white/95 text-sm mb-4 leading-relaxed drop-shadow-sm">
          {t(`decks.${translationKey}.description`) || deck.description}
        </p>
        <div className="flex justify-between items-center">
          <span className="text-white/90 text-sm font-medium drop-shadow-sm">
            {deck.cards.length} {t('ui.cards')}
          </span>
          <motion.button
            className="bg-white/25 hover:bg-white/35 px-4 py-2 rounded-lg text-sm font-semibold transition-colors backdrop-blur-sm border border-white/20 text-white drop-shadow-sm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {t('ui.start')}
          </motion.button>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute -top-4 -right-4 w-16 h-16 bg-white/5 rounded-full"></div>
      <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-white/5 rounded-full"></div>
    </motion.div>
  );
}