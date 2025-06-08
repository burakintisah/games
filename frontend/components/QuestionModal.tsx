"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, RefreshCw, CheckCircle, ThumbsUp, ThumbsDown } from 'lucide-react';
import type { ConversationCard } from '../../shared/src';
import { useClientTranslation } from '../hooks/useClientTranslation';
import { LoadingSpinner } from './LoadingSpinner';
import { ErrorMessage } from './ErrorMessage';

interface QuestionModalProps {
  question: ConversationCard | null;
  isOpen: boolean;
  onClose: () => void;
  onNewQuestion: () => void;
  onVote?: (cardId: string, voteType: 'upvote' | 'downvote') => Promise<void>;
  locale: string;
  isLoading?: boolean;
  error?: string | null;
}

const getDeckTranslationKey = (category: string) => {
  const keyMap: Record<string, string> = {
    'relationships': 'relationships',
    'self-knowledge': 'selfKnowledge',
    'work': 'work',
    'culture': 'culture',
    'philosophy': 'philosophy',
    'childhood': 'childhood',
  };
  
  return keyMap[category] || category;
};

export function QuestionModal({ 
  question, 
  isOpen, 
  onClose, 
  onNewQuestion, 
  onVote,
  locale,
  isLoading = false,
  error = null
}: QuestionModalProps) {
  const { t } = useClientTranslation(locale);
  const [isVoting, setIsVoting] = useState(false);

  if (!isOpen) return null;

  // Get the appropriate language version of the question
  const getQuestionText = () => {
    if (!question) return '';
    
    if (typeof question.question === 'string') {
      // Backward compatibility for old format
      return question.question;
    }
    // New multilingual format
    const lang = locale === 'tr' ? 'tr' : 'en';
    return question.question[lang] || question.question.en || 'Question not available';
  };

  const handleVote = async (voteType: 'upvote' | 'downvote') => {
    if (!question || !onVote || isVoting) return;
    
    setIsVoting(true);
    try {
      await onVote(question.id, voteType);
    } catch (error) {
      console.error('Failed to vote:', error);
    } finally {
      setIsVoting(false);
    }
  };

  const translationKey = question ? getDeckTranslationKey(question.category) : '';

  return (
    <AnimatePresence>
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
          {question && (
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-violet-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white text-lg">
                    {question.category === 'relationships' ? '💕' : 
                     question.category === 'self-knowledge' ? '🧠' :
                     question.category === 'work' ? '💼' :
                     question.category === 'culture' ? '🎭' :
                     question.category === 'philosophy' ? '🤔' :
                     question.category === 'childhood' ? '🧸' : '❓'}
                  </span>
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
          )}

          {/* Content */}
          <div className="p-6">
            {isLoading ? (
              <div className="text-center py-12">
                <LoadingSpinner size="lg" />
                <p className="text-gray-600 mt-4">Loading question...</p>
              </div>
            ) : error ? (
              <ErrorMessage 
                message={error}
                onRetry={onNewQuestion}
                className="mb-6"
              />
            ) : question ? (
              <>
                {/* Question Content */}
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 leading-relaxed mb-4">
                    {getQuestionText()}
                  </h2>
                  <p className="text-gray-600 text-sm">
                    {t('ui.takeYourTime')}
                  </p>
                </div>

                {/* Voting Section */}
                {onVote && (
                  <div className="flex items-center justify-center gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
                    <span className="text-sm text-gray-600">Rate this question:</span>
                    <div className="flex items-center gap-2">
                      <motion.button
                        onClick={() => handleVote('upvote')}
                        disabled={isVoting}
                        className="flex items-center gap-1 px-3 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors disabled:opacity-50"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <ThumbsUp className="w-4 h-4" />
                        <span className="text-sm">{question.upvotes || 0}</span>
                      </motion.button>
                      
                      <motion.button
                        onClick={() => handleVote('downvote')}
                        disabled={isVoting}
                        className="flex items-center gap-1 px-3 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors disabled:opacity-50"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <ThumbsDown className="w-4 h-4" />
                        <span className="text-sm">{question.downvotes || 0}</span>
                      </motion.button>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <motion.button
                    onClick={onNewQuestion}
                    disabled={isLoading}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-lg font-medium hover:from-violet-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg disabled:opacity-50"
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
              </>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-600">No question available</p>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}