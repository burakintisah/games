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
          en: 'What small gesture from someone has meant the most to you, and why did it matter so much?',
          tr: 'Birinden gelen hangi küçük jest senin için en çok anlam ifade etti ve neden bu kadar önemliydi?'
        },
        category: 'relationships',
        difficulty: 'easy',
        tags: ['gratitude', 'connection', 'kindness']
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
          en: 'What is a friendship deal-breaker for you that most people might overlook?',
          tr: 'Çoğu insanın görmezden gelebileceği ama senin için arkadaşlık bozucu olan şey nedir?'
        },
        category: 'relationships',
        difficulty: 'medium',
        tags: ['boundaries', 'values', 'friendship']
      },
      {
        id: 'rel_4',
        question: {
          en: 'When was the last time you felt truly understood by someone? What did they do differently?',
          tr: 'En son ne zaman biri tarafından gerçekten anlaşıldığını hissettin? O kişi neyi farklı yaptı?'
        },
        category: 'relationships',
        difficulty: 'medium',
        tags: ['understanding', 'empathy', 'listening']
      },
      {
        id: 'rel_5',
        question: {
          en: 'What is a secret rule you have in relationships that you have never told anyone about?',
          tr: 'İlişkilerde kimseye söylemediğin gizli bir kuralın var mı? Nedir?'
        },
        category: 'relationships',
        difficulty: 'hard',
        tags: ['secrets', 'rules', 'vulnerability']
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
          en: 'What is something you pretend to like but secretly find boring or overrated?',
          tr: 'Beğeniyormuş gibi yaptığın ama gizlice sıkıcı ya da abartılmış bulduğun şey nedir?'
        },
        category: 'self-knowledge',
        difficulty: 'easy',
        tags: ['honesty', 'social-masks', 'preferences']
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
          en: 'What is the most irrational fear you have that actually affects your daily decisions?',
          tr: 'Günlük kararlarını etkileyen en mantıksız korku ne?'
        },
        category: 'self-knowledge',
        difficulty: 'medium',
        tags: ['fears', 'decisions', 'self-awareness']
      },
      {
        id: 'self_4',
        question: {
          en: 'If your emotions had a soundtrack today, what genre of music would be playing?',
          tr: 'Bugün duyguların bir film müziği olsaydı, hangi tarz müzik çalıyor olurdu?'
        },
        category: 'self-knowledge',
        difficulty: 'easy',
        tags: ['emotions', 'creativity', 'mood']
      },
      {
        id: 'self_5',
        question: {
          en: 'What habit do you have that you know is holding you back, but you are not ready to change yet?',
          tr: 'Seni geri tuttuğunu bildiğin ama henüz değiştirmeye hazır olmadığın alışkanlığın ne?'
        },
        category: 'self-knowledge',
        difficulty: 'hard',
        tags: ['habits', 'growth', 'honesty']
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
          en: 'If money was no object and you could not fail, what would you spend your days doing?',
          tr: 'Para önemli olmasaydı ve başarısız olamasan, günlerini ne yaparak geçirirdin?'
        },
        category: 'work',
        difficulty: 'medium',
        tags: ['dreams', 'purpose', 'freedom']
      },
      {
        id: 'work_2',
        question: {
          en: 'What is the most useless skill you have that you are secretly proud of?',
          tr: 'Gizlice gurur duyduğun en işe yaramaz yeteneğin ne?'
        },
        category: 'work',
        difficulty: 'easy',
        tags: ['skills', 'humor', 'pride']
      },
      {
        id: 'work_3',
        question: {
          en: 'If your current self could send a one-line work advice to your 18-year-old self, what would it say?',
          tr: 'Şimdiki sen 18 yaşındaki kendine tek cümlelik bir iş tavsiyesi gönderebilseydi, ne derdi?'
        },
        category: 'work',
        difficulty: 'medium',
        tags: ['advice', 'career', 'reflection']
      },
      {
        id: 'work_4',
        question: {
          en: 'What is something at work that everyone complains about but nobody tries to fix?',
          tr: 'İşte herkesin şikayet ettiği ama kimsenin düzeltmeye çalışmadığı şey ne?'
        },
        category: 'work',
        difficulty: 'easy',
        tags: ['workplace', 'frustration', 'initiative']
      },
      {
        id: 'work_5',
        question: {
          en: 'Do you think your job title accurately describes what you actually do? What title would be more honest?',
          tr: 'İş unvanının gerçekte ne yaptığını doğru tanımladığını düşünüyor musun? Daha dürüst bir unvan ne olurdu?'
        },
        category: 'work',
        difficulty: 'medium',
        tags: ['identity', 'honesty', 'career']
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
          en: 'What piece of art, song, or movie changed the way you see the world?',
          tr: 'Hangi sanat eseri, şarkı ya da film dünyaya bakış açını değiştirdi?'
        },
        category: 'culture',
        difficulty: 'medium',
        tags: ['art', 'perspective', 'impact']
      },
      {
        id: 'culture_2',
        question: {
          en: 'If you could have dinner with any historical figure, who would it be and what would you ask?',
          tr: 'Herhangi bir tarihi figürle akşam yemeği yiyebilseydin, kim olurdu ve ne sorardın?'
        },
        category: 'culture',
        difficulty: 'easy',
        tags: ['history', 'curiosity', 'imagination']
      },
      {
        id: 'culture_3',
        question: {
          en: 'What social norm do you think is completely outdated and should be abandoned?',
          tr: 'Hangi toplumsal normun tamamen modası geçmiş olduğunu ve terk edilmesi gerektiğini düşünüyorsun?'
        },
        category: 'culture',
        difficulty: 'medium',
        tags: ['society', 'norms', 'change']
      },
      {
        id: 'culture_4',
        question: {
          en: 'What tradition from another culture do you wish your own culture had adopted?',
          tr: 'Başka bir kültürden hangi geleneğin kendi kültüründe de olmasını isterdin?'
        },
        category: 'culture',
        difficulty: 'medium',
        tags: ['traditions', 'cultures', 'appreciation']
      },
      {
        id: 'culture_5',
        question: {
          en: 'If you could ban one thing from social media, what would it be and why?',
          tr: 'Sosyal medyadan bir şeyi yasaklayabilseydin, ne olurdu ve neden?'
        },
        category: 'culture',
        difficulty: 'easy',
        tags: ['social-media', 'opinion', 'digital']
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
          en: 'If you found out the universe was a simulation, would it change how you live your life?',
          tr: 'Evrenin bir simülasyon olduğunu öğrenseydin, hayatını yaşama şeklini değiştirir miydi?'
        },
        category: 'philosophy',
        difficulty: 'hard',
        tags: ['simulation', 'existence', 'meaning']
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
          en: 'Would you rather know the date of your death or the cause? Why?',
          tr: 'Ölümünün tarihini mi yoksa sebebini mi bilmeyi tercih ederdin? Neden?'
        },
        category: 'philosophy',
        difficulty: 'hard',
        tags: ['mortality', 'choice', 'future']
      },
      {
        id: 'phil_4',
        question: {
          en: 'If you could ask the universe one question and get a truthful answer, what would you ask?',
          tr: 'Evrene bir soru sorup doğru bir cevap alabilseydin, ne sorardın?'
        },
        category: 'philosophy',
        difficulty: 'medium',
        tags: ['curiosity', 'truth', 'universe']
      },
      {
        id: 'phil_5',
        question: {
          en: 'Do you think people are fundamentally good or fundamentally selfish? What experience shaped your view?',
          tr: 'İnsanların temelde iyi mi yoksa temelde bencil mi olduğunu düşünüyorsun? Hangi deneyim bu görüşünü şekillendirdi?'
        },
        category: 'philosophy',
        difficulty: 'hard',
        tags: ['human-nature', 'experience', 'belief']
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
          en: 'What is a childhood memory that you think about more often than you would expect?',
          tr: 'Beklediğinden daha sık düşündüğün bir çocukluk anın var mı?'
        },
        category: 'childhood',
        difficulty: 'easy',
        tags: ['memories', 'nostalgia', 'reflection']
      },
      {
        id: 'child_2',
        question: {
          en: 'What lie did your parents tell you as a child that you believed for way too long?',
          tr: 'Ailen çocukken sana hangi yalanı söyledi ve sen çok uzun süre inandın?'
        },
        category: 'childhood',
        difficulty: 'easy',
        tags: ['parents', 'humor', 'childhood']
      },
      {
        id: 'child_3',
        question: {
          en: 'What did you want to be when you grew up, and how does that dream compare to your reality now?',
          tr: 'Büyüyünce ne olmak istiyordun ve o hayal şimdiki gerçekliğinle nasıl karşılaştırılıyor?'
        },
        category: 'childhood',
        difficulty: 'medium',
        tags: ['dreams', 'reality', 'growth']
      },
      {
        id: 'child_4',
        question: {
          en: 'What smell or sound instantly transports you back to your childhood?',
          tr: 'Hangi koku ya da ses seni anında çocukluğuna geri götürüyor?'
        },
        category: 'childhood',
        difficulty: 'easy',
        tags: ['senses', 'nostalgia', 'memory']
      },
      {
        id: 'child_5',
        question: {
          en: 'What is something your family always did that you thought was normal but later discovered was unique to your family?',
          tr: 'Ailenin hep yaptığı, normal sandığın ama sonradan sadece ailenize özgü olduğunu keşfettiğin şey ne?'
        },
        category: 'childhood',
        difficulty: 'medium',
        tags: ['family', 'unique', 'discovery']
      }
    ]
  }
];
