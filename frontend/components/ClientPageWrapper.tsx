"use client";

import { useState } from 'react';
import { Navigation } from './Navigation';
import { QuestionModal } from './QuestionModal';
import { CONVERSATION_DECKS, ConversationCard } from '../../shared/dist';

interface ClientPageWrapperProps {
  children: React.ReactNode;
  locale: string;
  PageContent: React.ComponentType<{ locale: string; onDeckClick: (deckId: string) => void }>;
}

export function ClientPageWrapper({ children, locale, PageContent }: ClientPageWrapperProps) {
  const [selectedQuestion, setSelectedQuestion] = useState<ConversationCard | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDeckClick = (deckId: string) => {
    const deck = CONVERSATION_DECKS.find(d => d.id === deckId);
    if (deck && deck.questions.length > 0) {
      const randomQuestion = deck.questions[Math.floor(Math.random() * deck.questions.length)];
      setSelectedQuestion(randomQuestion);
      setIsModalOpen(true);
    }
  };

  const handleNewQuestion = () => {
    if (selectedQuestion) {
      const deck = CONVERSATION_DECKS.find(d => 
        d.questions.some(q => q.category === selectedQuestion.category)
      );
      if (deck) {
        const randomQuestion = deck.questions[Math.floor(Math.random() * deck.questions.length)];
        setSelectedQuestion(randomQuestion);
      }
    }
  };

  const handleShuffle = () => {
    const allQuestions = CONVERSATION_DECKS.flatMap(deck => deck.questions);
    const randomQuestion = allQuestions[Math.floor(Math.random() * allQuestions.length)];
    setSelectedQuestion(randomQuestion);
    setIsModalOpen(true);
  };

  return (
    <>
      <Navigation 
        onShuffleMode={handleShuffle}
        locale={locale}
      />
      
      {children}
      
      <PageContent locale={locale} onDeckClick={handleDeckClick} />

      {/* Question Modal */}
      <QuestionModal
        question={selectedQuestion}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onNewQuestion={handleNewQuestion}
        locale={locale}
      />
    </>
  );
} 