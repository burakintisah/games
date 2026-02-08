"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ThumbsUp, ThumbsDown, RotateCcw } from 'lucide-react';
import type { ConversationCard } from '../../shared/src';
import { useClientTranslation } from '../hooks/useClientTranslation';
import { LoadingSpinner } from './LoadingSpinner';
import { ErrorMessage } from './ErrorMessage';

interface QuestionModalProps {
  question: ConversationCard | null;
  isOpen: boolean;
  onClose: () => void;
  onNewQuestion: () => void;
  onVote?: (cardId: string, voteType: 'up' | 'down') => Promise<void>;
  locale: string;
  isLoading?: boolean;
  error?: string | null;
  onRetry?: () => void;
  isVoting?: boolean;
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

const cardVariants = {
  hidden: {
    rotateY: -90,
    opacity: 0,
    scale: 0.8,
  },
  visible: {
    rotateY: 0,
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
      duration: 0.6,
    }
  },
  exit: {
    rotateY: 90,
    opacity: 0,
    scale: 0.8,
    transition: {
      duration: 0.3,
    }
  }
};

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.3 }
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.2 }
  }
};

function getCategoryIcon(category: string): string {
  const icons: Record<string, string> = {
    'relationships': '💕',
    'self-knowledge': '🧠',
    'work': '💼',
    'culture': '🎭',
    'philosophy': '🤔',
    'childhood': '🧸',
  };
  return icons[category] || '💭';
}

export function QuestionModal({
  question,
  isOpen,
  onClose,
  onNewQuestion,
  onVote,
  locale,
  isLoading = false,
  error = null,
  onRetry,
  isVoting = false
}: QuestionModalProps) {
  const { t } = useClientTranslation(locale);
  const [hasVoted, setHasVoted] = useState(false);
  const [voteError, setVoteError] = useState<string | null>(null);

  useEffect(() => {
    setHasVoted(false);
    setVoteError(null);
  }, [question?.id]);

  if (!isOpen) return null;

  const getQuestionText = () => {
    if (!question) return '';
    if (typeof question.question === 'string') {
      return question.question;
    }
    const lang = locale === 'tr' ? 'tr' : 'en';
    return question.question[lang] || question.question.en || '';
  };

  const handleVote = async (voteType: 'up' | 'down') => {
    if (!question || !onVote || hasVoted || isVoting) return;

    try {
      setVoteError(null);
      await onVote(question.id, voteType);
      setHasVoted(true);
    } catch (err) {
      setVoteError(t('errors.voteError'));
      console.error('Vote error:', err);
    }
  };

  const translationKey = question ? getDeckTranslationKey(question.category) : '';

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
        variants={overlayVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={onClose}
      >
        <motion.div
          className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={(e) => e.stopPropagation()}
          style={{
            perspective: 1000,
            transformStyle: "preserve-3d"
          }}
        >
          {/* Header */}
          <div className="flex justify-between items-center p-6 border-b border-gray-100">
            <div className="flex items-center space-x-3">
              {question && (
                <>
                  <span className="text-2xl">{getCategoryIcon(question.category)}</span>
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900 capitalize">
                      {t(`decks.${translationKey}.name`)}
                    </h2>
                    <p className="text-sm text-gray-500">
                      {t(`ui.difficulty.${question.difficulty}`)}
                      {question.tags?.length ? ` \u2022 ${question.tags.join(', ')}` : ''}
                    </p>
                  </div>
                </>
              )}
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 min-h-[300px] flex flex-col justify-center">
            {isLoading ? (
              <div className="text-center py-12">
                <LoadingSpinner size="lg" />
                <p className="text-gray-600 mt-4">{t('ui.loadingQuestion')}</p>
              </div>
            ) : error ? (
              <ErrorMessage
                message={error}
                onRetry={onRetry}
              />
            ) : question ? (
              <div className="text-center">
                <motion.p
                  className="text-xl md:text-2xl text-gray-800 leading-relaxed mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  {getQuestionText()}
                </motion.p>

                {/* Voting Section */}
                <motion.div
                  className="flex justify-center items-center space-x-4 mb-6"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5, duration: 0.4 }}
                >
                  <button
                    onClick={() => handleVote('up')}
                    disabled={hasVoted || isVoting}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-200 ${
                      hasVoted
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-green-50 hover:bg-green-100 text-green-600 hover:scale-105'
                    }`}
                  >
                    <ThumbsUp className="w-4 h-4" />
                    <span className="text-sm font-medium">
                      {question.upvotes || 0}
                    </span>
                  </button>

                  <button
                    onClick={() => handleVote('down')}
                    disabled={hasVoted || isVoting}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-200 ${
                      hasVoted
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-red-50 hover:bg-red-100 text-red-600 hover:scale-105'
                    }`}
                  >
                    <ThumbsDown className="w-4 h-4" />
                    <span className="text-sm font-medium">
                      {question.downvotes || 0}
                    </span>
                  </button>
                </motion.div>

                {voteError && (
                  <motion.p
                    className="text-red-500 text-sm mb-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    {voteError}
                  </motion.p>
                )}

                {hasVoted && (
                  <motion.p
                    className="text-green-600 text-sm mb-4"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    {t('ui.thankYouForVoting')}
                  </motion.p>
                )}
              </div>
            ) : null}
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-gray-100 flex justify-between items-center">
            <button
              onClick={onClose}
              className="px-6 py-2 text-gray-600 hover:text-gray-800 font-medium transition-colors"
            >
              {t('ui.close')}
            </button>

            <motion.button
              onClick={onNewQuestion}
              disabled={isLoading}
              className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white px-6 py-2 rounded-full font-medium transition-all duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <RotateCcw className="w-4 h-4" />
              <span>{t('ui.nextQuestion')}</span>
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
