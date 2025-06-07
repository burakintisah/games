import { Deck } from '../types';

export const CONVERSATION_DECKS: Deck[] = [
  {
    id: 'relationships',
    name: 'Relationships',
    description: 'Explore connections, love, and human bonds',
    color: 'from-rose-400 to-pink-600',
    icon: '💕',
    questions: [
      {
        id: 'rel_1',
        question: 'What do you believe makes a relationship truly fulfilling, beyond the obvious compatibility?',
        category: 'relationships',
        difficulty: 'medium',
        tags: ['love', 'fulfillment', 'connection']
      },
      {
        id: 'rel_2',
        question: 'How do you handle the tension between being authentic and being liked?',
        category: 'relationships',
        difficulty: 'hard',
        tags: ['authenticity', 'acceptance', 'identity']
      },
      {
        id: 'rel_3',
        question: 'What is something you wish you could tell your younger self about relationships?',
        category: 'relationships',
        difficulty: 'medium',
        tags: ['wisdom', 'growth', 'advice']
      }
    ]
  },
  {
    id: 'family',
    name: 'Family',
    description: 'Navigate family dynamics and generational wisdom',
    color: 'from-emerald-400 to-teal-600',
    icon: '🏠',
    questions: [
      {
        id: 'fam_1',
        question: 'What family tradition or value do you want to pass on, and what would you change?',
        category: 'family',
        difficulty: 'medium',
        tags: ['tradition', 'values', 'legacy']
      },
      {
        id: 'fam_2',
        question: 'How has your understanding of your parents changed as you\'ve grown older?',
        category: 'family',
        difficulty: 'medium',
        tags: ['parents', 'perspective', 'maturity']
      },
      {
        id: 'fam_3',
        question: 'What aspect of your family dynamic do you find most challenging to navigate?',
        category: 'family',
        difficulty: 'hard',
        tags: ['dynamics', 'challenges', 'growth']
      }
    ]
  },
  {
    id: 'life',
    name: 'Life',
    description: 'Reflect on purpose, meaning, and personal growth',
    color: 'from-violet-400 to-purple-600',
    icon: '🌟',
    questions: [
      {
        id: 'life_1',
        question: 'If you could live your life again, what would you spend more time doing and less time worrying about?',
        category: 'life',
        difficulty: 'hard',
        tags: ['regret', 'priorities', 'wisdom']
      },
      {
        id: 'life_2',
        question: 'What does a meaningful life look like to you, and how close are you to living it?',
        category: 'life',
        difficulty: 'hard',
        tags: ['meaning', 'purpose', 'fulfillment']
      },
      {
        id: 'life_3',
        question: 'What belief about life have you held for a long time that you\'re now questioning?',
        category: 'life',
        difficulty: 'hard',
        tags: ['beliefs', 'questioning', 'growth']
      }
    ]
  },
  {
    id: 'work',
    name: 'Work & Purpose',
    description: 'Discover calling, creativity, and professional fulfillment',
    color: 'from-amber-400 to-orange-600',
    icon: '🎯',
    questions: [
      {
        id: 'work_1',
        question: 'What would you do if you knew you couldn\'t fail, and money wasn\'t a concern?',
        category: 'work',
        difficulty: 'medium',
        tags: ['dreams', 'purpose', 'freedom']
      },
      {
        id: 'work_2',
        question: 'How do you define success, and has that definition changed over time?',
        category: 'work',
        difficulty: 'medium',
        tags: ['success', 'values', 'evolution']
      },
      {
        id: 'work_3',
        question: 'What work gives you the most energy, and what drains you the most?',
        category: 'work',
        difficulty: 'easy',
        tags: ['energy', 'passion', 'burnout']
      }
    ]
  },
  {
    id: 'creativity',
    name: 'Creativity',
    description: 'Unlock imagination, expression, and artistic spirit',
    color: 'from-indigo-400 to-blue-600',
    icon: '🎨',
    questions: [
      {
        id: 'cre_1',
        question: 'What creative pursuit have you always wanted to try but haven\'t yet? What\'s holding you back?',
        category: 'creativity',
        difficulty: 'medium',
        tags: ['creativity', 'barriers', 'exploration']
      },
      {
        id: 'cre_2',
        question: 'When do you feel most creative and alive? What conditions bring out your best ideas?',
        category: 'creativity',
        difficulty: 'easy',
        tags: ['flow', 'inspiration', 'conditions']
      },
      {
        id: 'cre_3',
        question: 'How do you deal with creative blocks, and what have you learned about your creative process?',
        category: 'creativity',
        difficulty: 'medium',
        tags: ['blocks', 'process', 'learning']
      }
    ]
  },
  {
    id: 'growth',
    name: 'Personal Growth',
    description: 'Journey of self-discovery and transformation',
    color: 'from-green-400 to-emerald-600',
    icon: '🌱',
    questions: [
      {
        id: 'grow_1',
        question: 'What pattern in your life are you most ready to break, and what would replace it?',
        category: 'growth',
        difficulty: 'hard',
        tags: ['patterns', 'change', 'transformation']
      },
      {
        id: 'grow_2',
        question: 'What compliment do you have trouble accepting, and what might that reveal about you?',
        category: 'growth',
        difficulty: 'medium',
        tags: ['self-worth', 'acceptance', 'insight']
      },
      {
        id: 'grow_3',
        question: 'If you could give yourself one piece of advice right now, what would it be?',
        category: 'growth',
        difficulty: 'medium',
        tags: ['wisdom', 'advice', 'reflection']
      }
    ]
  }
];