import { ConversationDeck } from '../types';

export const CONVERSATION_DECKS: ConversationDeck[] = [
  {
    id: 'relationships',
    name: 'Relationships',
    description: 'Deep questions about love, friendship, and human connections',
    color: 'bg-gradient-to-br from-rose-400 to-pink-600',
    icon: '💕',
    cards: [
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
    id: 'self-knowledge',
    name: 'Self-Knowledge',
    description: 'Questions to help you understand yourself better',
    color: 'bg-gradient-to-br from-blue-400 to-indigo-600',
    icon: '🧠',
    cards: [
      {
        id: 'self_1',
        question: 'What pattern in your life are you most ready to break, and what would replace it?',
        category: 'self-knowledge',
        difficulty: 'hard',
        tags: ['patterns', 'change', 'transformation']
      },
      {
        id: 'self_2',
        question: 'What compliment do you have trouble accepting, and what might that reveal about you?',
        category: 'self-knowledge',
        difficulty: 'medium',
        tags: ['self-worth', 'acceptance', 'insight']
      },
      {
        id: 'self_3',
        question: 'If you could give yourself one piece of advice right now, what would it be?',
        category: 'self-knowledge',
        difficulty: 'medium',
        tags: ['wisdom', 'advice', 'reflection']
      }
    ]
  },
  {
    id: 'work',
    name: 'Work & Purpose',
    description: 'Exploring career, ambition, and life purpose',
    color: 'bg-gradient-to-br from-green-400 to-emerald-600',
    icon: '💼',
    cards: [
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
    id: 'culture',
    name: 'Culture & Society',
    description: 'Questions about art, society, and human culture',
    color: 'bg-gradient-to-br from-purple-400 to-violet-600',
    icon: '🎭',
    cards: [
      {
        id: 'culture_1',
        question: 'What creative pursuit have you always wanted to try but haven\'t yet? What\'s holding you back?',
        category: 'culture',
        difficulty: 'medium',
        tags: ['creativity', 'barriers', 'exploration']
      },
      {
        id: 'culture_2',
        question: 'When do you feel most creative and alive? What conditions bring out your best ideas?',
        category: 'culture',
        difficulty: 'easy',
        tags: ['flow', 'inspiration', 'conditions']
      },
      {
        id: 'culture_3',
        question: 'How do you deal with creative blocks, and what have you learned about your creative process?',
        category: 'culture',
        difficulty: 'medium',
        tags: ['blocks', 'process', 'learning']
      }
    ]
  },
  {
    id: 'philosophy',
    name: 'Philosophy',
    description: 'Deep philosophical questions about existence and meaning',
    color: 'bg-gradient-to-br from-amber-400 to-orange-600',
    icon: '🤔',
    cards: [
      {
        id: 'phil_1',
        question: 'If you could live your life again, what would you spend more time doing and less time worrying about?',
        category: 'philosophy',
        difficulty: 'hard',
        tags: ['regret', 'priorities', 'wisdom']
      },
      {
        id: 'phil_2',
        question: 'What does a meaningful life look like to you, and how close are you to living it?',
        category: 'philosophy',
        difficulty: 'hard',
        tags: ['meaning', 'purpose', 'fulfillment']
      },
      {
        id: 'phil_3',
        question: 'What belief about life have you held for a long time that you\'re now questioning?',
        category: 'philosophy',
        difficulty: 'hard',
        tags: ['beliefs', 'questioning', 'growth']
      }
    ]
  },
  {
    id: 'childhood',
    name: 'Childhood & Memory',
    description: 'Reflecting on past experiences and formative moments',
    color: 'bg-gradient-to-br from-teal-400 to-cyan-600',
    icon: '🧸',
    cards: [
      {
        id: 'child_1',
        question: 'What family tradition or value do you want to pass on, and what would you change?',
        category: 'childhood',
        difficulty: 'medium',
        tags: ['tradition', 'values', 'legacy']
      },
      {
        id: 'child_2',
        question: 'How has your understanding of your parents changed as you\'ve grown older?',
        category: 'childhood',
        difficulty: 'medium',
        tags: ['parents', 'perspective', 'maturity']
      },
      {
        id: 'child_3',
        question: 'What aspect of your family dynamic do you find most challenging to navigate?',
        category: 'childhood',
        difficulty: 'hard',
        tags: ['dynamics', 'challenges', 'growth']
      }
    ]
  }
];