import { ConversationDeck } from '../types';

export const CONVERSATION_DECKS: ConversationDeck[] = [
  {
    id: 'relationships',
    name: 'Relationships',
    description: 'Deep questions about love, friendship, and human connections',
    color: 'bg-gradient-relationships',
    icon: '💕',
    cards: [
      {
        id: 'rel_1',
        question: {
          en: 'What do you believe makes a relationship truly fulfilling, beyond the obvious compatibility?',
          tr: 'Açık uyumluluğun ötesinde, bir ilişkiyi gerçekten tatmin edici kılan şeyin ne olduğuna inanıyorsun?'
        },
        category: 'relationships',
        difficulty: 'medium',
        tags: ['love', 'fulfillment', 'connection']
      },
      {
        id: 'rel_2',
        question: {
          en: 'How do you handle the tension between being authentic and being liked?',
          tr: 'Otantik olmak ile sevilmek arasındaki gerilimi nasıl yönetiyorsun?'
        },
        category: 'relationships',
        difficulty: 'hard',
        tags: ['authenticity', 'acceptance', 'identity']
      },
      {
        id: 'rel_3',
        question: {
          en: 'What is something you wish you could tell your younger self about relationships?',
          tr: 'İlişkiler hakkında genç haline söylemek istediğin bir şey var mı?'
        },
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
    color: 'bg-gradient-self-knowledge',
    icon: '🧠',
    cards: [
      {
        id: 'self_1',
        question: {
          en: 'What pattern in your life are you most ready to break, and what would replace it?',
          tr: 'Hayatındaki hangi kalıbı kırmaya en hazırsın ve onun yerine ne koyardın?'
        },
        category: 'self-knowledge',
        difficulty: 'hard',
        tags: ['patterns', 'change', 'transformation']
      },
      {
        id: 'self_2',
        question: {
          en: 'What compliment do you have trouble accepting, and what might that reveal about you?',
          tr: 'Hangi iltifatı kabul etmekte zorlanıyorsun ve bu senin hakkında ne açığa çıkarabilir?'
        },
        category: 'self-knowledge',
        difficulty: 'medium',
        tags: ['self-worth', 'acceptance', 'insight']
      },
      {
        id: 'self_3',
        question: {
          en: 'If you could give yourself one piece of advice right now, what would it be?',
          tr: 'Şu anda kendine bir tavsiye verebilseydin, ne olurdu?'
        },
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
    color: 'bg-gradient-work',
    icon: '💼',
    cards: [
      {
        id: 'work_1',
        question: {
          en: 'What would you do if you knew you couldn\'t fail, and money wasn\'t a concern?',
          tr: 'Başarısız olamayacağını bilseydin ve para bir sorun olmasaydı ne yapardın?'
        },
        category: 'work',
        difficulty: 'medium',
        tags: ['dreams', 'purpose', 'freedom']
      },
      {
        id: 'work_2',
        question: {
          en: 'How do you define success, and has that definition changed over time?',
          tr: 'Başarıyı nasıl tanımlıyorsun ve bu tanım zamanla değişti mi?'
        },
        category: 'work',
        difficulty: 'medium',
        tags: ['success', 'values', 'evolution']
      },
      {
        id: 'work_3',
        question: {
          en: 'What work gives you the most energy, and what drains you the most?',
          tr: 'Hangi iş sana en çok enerji veriyor ve hangisi seni en çok tüketi̇yor?'
        },
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
    color: 'bg-gradient-culture',
    icon: '🎭',
    cards: [
      {
        id: 'culture_1',
        question: {
          en: 'What creative pursuit have you always wanted to try but haven\'t yet? What\'s holding you back?',
          tr: 'Hep denemek istediğin ama henüz yapmadığın yaratıcı bir uğraş var mı? Seni ne engelliyor?'
        },
        category: 'culture',
        difficulty: 'medium',
        tags: ['creativity', 'barriers', 'exploration']
      },
      {
        id: 'culture_2',
        question: {
          en: 'When do you feel most creative and alive? What conditions bring out your best ideas?',
          tr: 'Kendini en yaratıcı ve canlı ne zaman hissediyorsun? Hangi koşullar en iyi fikirlerini ortaya çıkarıyor?'
        },
        category: 'culture',
        difficulty: 'easy',
        tags: ['flow', 'inspiration', 'conditions']
      },
      {
        id: 'culture_3',
        question: {
          en: 'How do you deal with creative blocks, and what have you learned about your creative process?',
          tr: 'Yaratıcı tıkanıklıklarla nasıl başa çıkıyorsun ve yaratıcı sürecin hakkında ne öğrendin?'
        },
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
    color: 'bg-gradient-philosophy',
    icon: '🤔',
    cards: [
      {
        id: 'phil_1',
        question: {
          en: 'If you could live your life again, what would you spend more time doing and less time worrying about?',
          tr: 'Hayatını tekrar yaşayabilseydin, neyi yapmaya daha çok zaman ayırır, neyi düşünmeye daha az zaman harcardın?'
        },
        category: 'philosophy',
        difficulty: 'hard',
        tags: ['regret', 'priorities', 'wisdom']
      },
      {
        id: 'phil_2',
        question: {
          en: 'What does a meaningful life look like to you, and how close are you to living it?',
          tr: 'Anlamlı bir hayat senin için neye benziyor ve onu yaşamaya ne kadar yakınsın?'
        },
        category: 'philosophy',
        difficulty: 'hard',
        tags: ['meaning', 'purpose', 'fulfillment']
      },
      {
        id: 'phil_3',
        question: {
          en: 'What belief about life have you held for a long time that you\'re now questioning?',
          tr: 'Hayat hakkında uzun zamandır sahip olduğun ve şimdi sorguladığın bir inanç var mı?'
        },
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
    color: 'bg-gradient-childhood',
    icon: '🧸',
    cards: [
      {
        id: 'child_1',
        question: {
          en: 'What family tradition or value do you want to pass on, and what would you change?',
          tr: 'Hangi aile geleneğini veya değerini aktarmak istiyorsun ve neyi değiştirirdin?'
        },
        category: 'childhood',
        difficulty: 'medium',
        tags: ['tradition', 'values', 'legacy']
      },
      {
        id: 'child_2',
        question: {
          en: 'How has your understanding of your parents changed as you\'ve grown older?',
          tr: 'Büyüdükçe ailene olan bakış açın nasıl değişti?'
        },
        category: 'childhood',
        difficulty: 'medium',
        tags: ['parents', 'perspective', 'maturity']
      },
      {
        id: 'child_3',
        question: {
          en: 'What aspect of your family dynamic do you find most challenging to navigate?',
          tr: 'Aile dinamiğinin hangi yönünü yönetmeyi en zor buluyorsun?'
        },
        category: 'childhood',
        difficulty: 'hard',
        tags: ['dynamics', 'challenges', 'growth']
      }
    ]
  }
];