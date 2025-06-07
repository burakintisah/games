"use client";

import { motion } from 'framer-motion';
import type { Deck } from '../../shared/src';
import { useClientTranslation } from '../hooks/useClientTranslation';

interface DeckCardProps {
  deck: Deck;
  onClick: () => void;
  index: number;
  locale: string;
}

const getGradientStyle = (color: string) => {
  const gradientMap: Record<string, string> = {
    'from-rose-400 to-pink-600': 'linear-gradient(135deg, #fb7185 0%, #db2777 100%)',
    'from-emerald-400 to-teal-600': 'linear-gradient(135deg, #34d399 0%, #0d9488 100%)',
    'from-violet-400 to-purple-600': 'linear-gradient(135deg, #a78bfa 0%, #9333ea 100%)',
    'from-amber-400 to-orange-600': 'linear-gradient(135deg, #fbbf24 0%, #ea580c 100%)',
    'from-indigo-400 to-blue-600': 'linear-gradient(135deg, #818cf8 0%, #2563eb 100%)',
    'from-green-400 to-emerald-600': 'linear-gradient(135deg, #4ade80 0%, #059669 100%)',
  };
  
  return gradientMap[color] || 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)';
};

const getDeckTranslationKey = (deckId: string) => {
  const keyMap: Record<string, string> = {
    'relationships': 'relationships',
    'family': 'family',
    'life': 'life',
    'work-purpose': 'work',
    'creativity': 'creativity',
    'personal-growth': 'growth',
  };
  
  return keyMap[deckId] || deckId;
};

export function DeckCard({ deck, onClick, index, locale }: DeckCardProps) {
  const { t } = useClientTranslation(locale);
  const translationKey = getDeckTranslationKey(deck.id);

  return (
    <motion.div
      whileHover={{ 
        scale: 1.03,
        rotateY: 5,
        rotateX: 2,
      }}
      whileTap={{ scale: 0.98 }}
      transition={{ 
        type: "spring", 
        stiffness: 300, 
        damping: 20 
      }}
      className="perspective-1000"
    >
      <div 
        className="cursor-pointer h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group rounded-lg relative min-h-[280px]"
        onClick={onClick}
        style={{
          background: getGradientStyle(deck.color),
        }}
      >
        {/* Dark overlay for better text contrast */}
        <div className="absolute inset-0 bg-black/20" />
        
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <div className="relative z-10 p-6 pb-4">
          <div className="flex items-center justify-between mb-3">
            <div className="text-4xl">{deck.icon}</div>
            <div className="bg-black/30 backdrop-blur-sm rounded-full px-3 py-1 border border-white/30">
              <span className="text-white text-sm font-bold">
                {deck.questions.length} {t('ui.cards')}
              </span>
            </div>
          </div>
          
          <h3 className="text-white text-xl font-bold leading-tight mb-2" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
            {t(`decks.${translationKey}.name`)}
          </h3>
          
          <p className="text-white text-sm leading-relaxed font-medium" style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.7)' }}>
            {t(`decks.${translationKey}.description`)}
          </p>
        </div>

        <div className="relative z-10 p-6 pt-0">
          <motion.div
            className="flex items-center justify-between"
            initial={{ opacity: 0.9 }}
            whileHover={{ opacity: 1 }}
          >
            <div className="text-white text-sm font-medium" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.7)' }}>
              {t('ui.tapToExplore')}
            </div>
            <motion.div
              className="w-8 h-8 bg-black/30 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30"
              whileHover={{ rotate: 90 }}
              transition={{ duration: 0.2 }}
            >
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.div>
          </motion.div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute -bottom-10 -right-10 w-20 h-20 bg-white/10 rounded-full" />
        <div className="absolute -top-10 -left-10 w-32 h-32 bg-white/5 rounded-full" />
      </div>
    </motion.div>
  );
}