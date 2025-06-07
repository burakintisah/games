"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, RefreshCw, CheckCircle } from 'lucide-react';
import type { ConversationCard } from '../../shared/src';
import { useClientTranslation } from '../hooks/useClientTranslation';

interface QuestionModalProps {
  question: ConversationCard | null;
  isOpen: boolean;
  onClose: () => void;
  onNewQuestion: () => void;
  locale: string;
}

const getDeckTranslationKey = (category: string) => {
  const keyMap: Record<string, string> = {
    'relationships': 'relationships',
    'family': 'family',
    'life': 'life',
    'work-purpose': 'work',
    'creativity': 'creativity',
    'personal-growth': 'growth',
  };
  
  return keyMap[category] || category;
};

export function QuestionModal({ question, isOpen, onClose, onNewQuestion, locale }: QuestionModalProps) {
  const { t } = useClientTranslation(locale);

  if (!question) return null;

  const translationKey = getDeckTranslationKey(question.category);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-violet-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white text-lg">{question.category === 'relationships' ? '💕' : 
                    question.category === 'family' ? '👨‍👩‍👧‍👦' :
                    question.category === 'life' ? '🌟' :
                    question.category === 'work-purpose' ? '🎯' :
                    question.category === 'creativity' ? '🎨' : '🌱'}</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 capitalize">
                    {t(`decks.${translationKey}.name`)}
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      question.difficulty === 'easy' ? 'bg-green-100 text-green-700' :
                      question.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {question.difficulty === 'easy' ? t('ui.difficulty.easy') :
                       question.difficulty === 'medium' ? t('ui.difficulty.medium') :
                       t('ui.difficulty.hard')}
                    </span>
                  </div>
                </div>
              </div>
              
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Question Content */}
            <div className="p-6">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 leading-relaxed mb-4">
                  {question.question}
                </h2>
                <p className="text-gray-600 text-sm">
                  {t('ui.takeYourTime')}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <motion.button
                  onClick={onNewQuestion}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-lg font-medium hover:from-violet-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>{t('ui.newQuestion')}</span>
                </motion.button>
                
                <motion.button
                  onClick={onClose}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <CheckCircle className="w-4 h-4" />
                  <span>{t('ui.imReady')}</span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}