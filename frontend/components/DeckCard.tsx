"use client";

import { motion } from 'framer-motion';
import type { ConversationDeck } from '../../shared/src';
import { useClientTranslation } from '../hooks/useClientTranslation';

interface DeckCardProps {
  deck: ConversationDeck;
  onClick: () => void;
  index: number;
  locale: string;
  cardCount?: number; // Optional prop for API-provided card count
  compact?: boolean; // Optional prop for compact mobile layout
  mobile?: boolean; // Optional prop for ultra-compact mobile grid layout
  fullSize?: boolean; // Optional prop for full-size mobile layout
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

export function DeckCard({ deck, onClick, index, locale, cardCount, compact = false, mobile = false, fullSize = false }: DeckCardProps) {
  const { t } = useClientTranslation(locale);
  const translationKey = getDeckTranslationKey(deck.id);
  
  // Use API-provided count if available, otherwise fall back to static count
  const displayCardCount = cardCount !== undefined ? cardCount : deck.cards.length;

  // Mobile ultra-compact layout
  if (mobile) {
    // Full-size mobile layout for 2x4 grid
    if (fullSize) {
      return (
        <motion.div
          className={`${deck.color} rounded-3xl p-6 text-white cursor-pointer shadow-sm hover:shadow-lg transition-all duration-300 relative overflow-hidden w-full h-full flex flex-col items-center justify-center`}
          whileHover={{ scale: 1.05, rotate: -1, y: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={onClick}
          style={{ textShadow: '0 2px 4px rgba(0, 0, 0, 0.4)' }}
        >
          {/* Background overlay for better text readability */}
          <div className="absolute inset-0 bg-black/15 rounded-3xl"></div>
          
          {/* Content */}
          <div className="relative z-10 text-center">
            <div className="text-3xl md:text-4xl mb-3 drop-shadow-lg">{deck.icon}</div>
            <span className="font-semibold tracking-tight text-base leading-tight drop-shadow-lg">
              {t(`decks.${translationKey}.name`) || deck.name}
            </span>
          </div>
          
          {/* Decorative elements - positioned within rounded corners */}
          <div className="absolute top-2 right-2 w-12 h-12 bg-white/10 rounded-full"></div>
          <div className="absolute bottom-2 left-2 w-16 h-16 bg-white/10 rounded-full"></div>
        </motion.div>
      );
    }
    
    // Original compact mobile layout
    return (
      <motion.div
        className={`${deck.color} rounded-3xl p-6 text-white cursor-pointer shadow-sm hover:shadow-lg transition-all duration-300 relative overflow-hidden w-28 h-32 flex flex-col items-center justify-center`}
        whileHover={{ scale: 1.05, rotate: -1, y: -2 }}
        whileTap={{ scale: 0.95 }}
        onClick={onClick}
        style={{ textShadow: '0 2px 4px rgba(0, 0, 0, 0.4)' }}
      >
        {/* Background overlay for better text readability */}
        <div className="absolute inset-0 bg-black/15 rounded-3xl"></div>
        
        {/* Content */}
        <div className="relative z-10 text-center">
          <div className="text-3xl md:text-4xl mb-2 drop-shadow-lg">{deck.icon}</div>
          <span className="font-semibold tracking-tight text-xs leading-tight drop-shadow-lg">
            {t(`decks.${translationKey}.name`) || deck.name}
          </span>
        </div>
        
        {/* Decorative elements - positioned within rounded corners */}
        <div className="absolute top-1 right-1 w-8 h-8 bg-white/10 rounded-full"></div>
        <div className="absolute bottom-1 left-1 w-10 h-10 bg-white/10 rounded-full"></div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className={`${deck.color} rounded-3xl ${compact ? 'p-6' : 'p-6'} text-white cursor-pointer shadow-sm hover:shadow-lg transition-all duration-300 relative overflow-hidden`}
      whileHover={{ scale: 1.05, rotate: -1, y: -2 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      style={{ textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)' }}
    >
      {/* Background overlay for better text readability */}
      <div className="absolute inset-0 bg-black/10 rounded-3xl"></div>
      
      {/* Content */}
      <div className="relative z-10">
        <div className="text-3xl md:text-4xl mb-4 drop-shadow-sm">{deck.icon}</div>
        <h3 className="text-xl font-semibold tracking-tight mb-2 text-white drop-shadow-sm">
          {t(`decks.${translationKey}.name`) || deck.name}
        </h3>
        <p className="text-white/95 text-sm mb-4 leading-relaxed drop-shadow-sm">
          {t(`decks.${translationKey}.description`) || deck.description}
        </p>
        <div className="flex justify-between items-center">
          <span className="text-white/90 text-sm font-medium drop-shadow-sm">
            {displayCardCount} {t('ui.cards')}
          </span>
          <motion.button
            className="bg-white/25 hover:bg-white/35 px-4 py-2 text-sm rounded-3xl font-semibold tracking-tight transition-colors backdrop-blur-sm border border-white/20 text-white drop-shadow-sm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {t('ui.start')}
          </motion.button>
        </div>
      </div>
      
      {/* Decorative elements - positioned within rounded corners */}
      <div className="absolute top-2 right-2 w-16 h-16 bg-white/5 rounded-full"></div>
      <div className="absolute bottom-2 left-2 w-20 h-20 bg-white/5 rounded-full"></div>
    </motion.div>
  );
}