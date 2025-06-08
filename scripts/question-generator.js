#!/usr/bin/env node

/**
 * Question Generator Script for Conversation Cards
 * 
 * This script allows you to easily add multiple questions to the database.
 * Simply modify the QUESTIONS array below and run the script.
 * 
 * Usage:
 *   node scripts/question-generator.js
 * 
 * Requirements:
 *   - Backend API must be running (Firebase Functions deployed)
 *   - Questions must have both English and Turkish translations
 */

const API_BASE_URL = 'https://api-ptwvx3edda-ew.a.run.app';

// Add your questions here - modify this array to add new questions
// ─────────────────────────────────────────────────────────────
// 🪞 Self-Knowledge – 50 questions split by difficulty
// ─────────────────────────────────────────────────────────────
const QUESTIONS = [
    // ───── Easy (16)
    {
      question: {
        en: "What activity makes you lose track of time the fastest?",
        tr: "Hangi etkinlik sana zamanı en hızlı unutturuyor?"
      },
      category: "self-knowledge",
      difficulty: "easy",
      tags: ["flow", "passion", "time"]
    },
    {
      question: {
        en: "Which compliment do you find easiest to believe about yourself?",
        tr: "Kendin hakkında inanması en kolay iltifat hangisi?"
      },
      category: "self-knowledge",
      difficulty: "easy",
      tags: ["compliments", "self-image", "positivity"]
    },
    {
      question: {
        en: "Are you more energized by solitude or social gatherings?",
        tr: "Yalnızlık mı yoksa sosyal buluşmalar mı sana daha çok enerji verir?"
      },
      category: "self-knowledge",
      difficulty: "easy",
      tags: ["energy", "introvert", "extrovert"]
    },
    {
      question: {
        en: "Which small habit improves your mood almost every time?",
        tr: "Hangi küçük alışkanlık neredeyse her seferinde modunu yükseltir?"
      },
      category: "self-knowledge",
      difficulty: "easy",
      tags: ["habits", "mood", "wellbeing"]
    },
    {
      question: {
        en: "What type of weather best matches your natural temperament?",
        tr: "Hangi hava durumu doğal mizacını en iyi yansıtır?"
      },
      category: "self-knowledge",
      difficulty: "easy",
      tags: ["weather", "temperament", "analogy"]
    },
    {
      question: {
        en: "Which childhood nickname still feels accurate today?",
        tr: "Hangi çocukluk lakabı bugün bile sana uygun geliyor?"
      },
      category: "self-knowledge",
      difficulty: "easy",
      tags: ["nickname", "identity", "continuity"]
    },
    {
      question: {
        en: "Do you prefer clear plans or spontaneous adventures?",
        tr: "Net planları mı yoksa spontane maceraları mı tercih edersin?"
      },
      category: "self-knowledge",
      difficulty: "easy",
      tags: ["planning", "spontaneity", "preference"]
    },
    {
      question: {
        en: "What physical space brings out your best ideas?",
        tr: "Hangi fiziksel mekân en iyi fikirlerini ortaya çıkarıyor?"
      },
      category: "self-knowledge",
      difficulty: "easy",
      tags: ["environment", "creativity", "space"]
    },
    {
      question: {
        en: "Which sense (sight, sound, touch, taste, smell) is most vivid for you?",
        tr: "Hangi duyu (görme, işitme, dokunma, tat, koku) senin için en belirgindir?"
      },
      category: "self-knowledge",
      difficulty: "easy",
      tags: ["senses", "vivid", "awareness"]
    },
    {
      question: {
        en: "When do you feel most confident in making quick decisions?",
        tr: "Hızlı karar verirken kendine en çok ne zaman güvenirsin?"
      },
      category: "self-knowledge",
      difficulty: "easy",
      tags: ["confidence", "decision-making", "situations"]
    },
    {
      question: {
        en: "What color do you associate with calm, and why that color?",
        tr: "Hangi rengi huzurla ilişkilendiriyorsun ve neden?"
      },
      category: "self-knowledge",
      difficulty: "easy",
      tags: ["color", "calm", "association"]
    },
    {
      question: {
        en: "Which season best aligns with your energy cycles?",
        tr: "Enerji döngülerinle en çok hangi mevsim örtüşür?"
      },
      category: "self-knowledge",
      difficulty: "easy",
      tags: ["season", "energy", "cycles"]
    },
    {
      question: {
        en: "Do you recharge faster through sleep or through creative play?",
        tr: "Uyku mu yoksa yaratıcı oyun mu seni daha hızlı şarj eder?"
      },
      category: "self-knowledge",
      difficulty: "easy",
      tags: ["recharge", "sleep", "creativity"]
    },
    {
      question: {
        en: "What everyday task gives you an unexpected sense of satisfaction?",
        tr: "Hangi günlük iş beklenmedik bir tatmin hissi verir?"
      },
      category: "self-knowledge",
      difficulty: "easy",
      tags: ["tasks", "satisfaction", "routine"]
    },
    {
      question: {
        en: "Which genre of music describes your current life chapter?",
        tr: "Hangi müzik türü şu anki hayat bölümünü tanımlar?"
      },
      category: "self-knowledge",
      difficulty: "easy",
      tags: ["music", "life-stage", "metaphor"]
    },
    {
      question: {
        en: "Do you learn better by reading, listening, or doing?",
        tr: "Okuyarak mı dinleyerek mi yaparak mı daha iyi öğrenirsin?"
      },
      category: "self-knowledge",
      difficulty: "easy",
      tags: ["learning", "style", "preference"]
    },
  
    // ───── Medium (17)
    {
      question: {
        en: "Which personal value do you struggle to uphold under stress?",
        tr: "Stres altındayken sürdürmekte zorlandığın hangi kişisel değer var?"
      },
      category: "self-knowledge",
      difficulty: "medium",
      tags: ["values", "stress", "consistency"]
    },
    {
      question: {
        en: "What assumption about yourself have you recently proven wrong?",
        tr: "Kendinle ilgili hangi varsayımı yakın zamanda yanlış çıkardın?"
      },
      category: "self-knowledge",
      difficulty: "medium",
      tags: ["assumptions", "self-discovery", "change"]
    },
    {
      question: {
        en: "When do you notice your inner critic becoming loudest?",
        tr: "İç eleştirmenin en çok ne zaman sesini yükseltiyor?"
      },
      category: "self-knowledge",
      difficulty: "medium",
      tags: ["inner-critic", "timing", "awareness"]
    },
    {
      question: {
        en: "What past version of yourself do you feel most compassion toward, and why?",
        tr: "Geçmişteki hangi haline en çok şefkat duyuyorsun ve neden?"
      },
      category: "self-knowledge",
      difficulty: "medium",
      tags: ["self-compassion", "past-self", "growth"]
    },
    {
      question: {
        en: "Which relationship pattern have you consciously decided to break?",
        tr: "Hangi ilişki kalıbını bilinçli olarak kırmaya karar verdin?"
      },
      category: "self-knowledge",
      difficulty: "medium",
      tags: ["patterns", "relationships", "change"]
    },
    {
      question: {
        en: "How do your ambitions differ from those of your childhood heroes?",
        tr: "Hırsların çocukluk kahramanlarınınkinden nasıl farklı?"
      },
      category: "self-knowledge",
      difficulty: "medium",
      tags: ["ambitions", "heroes", "comparison"]
    },
    {
      question: {
        en: "When does seeking advice become avoidance of responsibility for you?",
        tr: "Ne zaman tavsiye istemek senin için sorumluluktan kaçışa dönüşür?"
      },
      category: "self-knowledge",
      difficulty: "medium",
      tags: ["advice", "responsibility", "avoidance"]
    },
    {
      question: {
        en: "Which emotional trigger are you currently learning to anticipate?",
        tr: "Şu sıralar hangi duygusal tetikleyiciyi öngörmeyi öğreniyorsun?"
      },
      category: "self-knowledge",
      difficulty: "medium",
      tags: ["triggers", "anticipation", "emotions"]
    },
    {
      question: {
        en: "How does your self-talk change when you shift from private thoughts to public speech?",
        tr: "Özel düşüncelerden kamuya konuşmaya geçerken iç konuşman nasıl değişir?"
      },
      category: "self-knowledge",
      difficulty: "medium",
      tags: ["self-talk", "public", "shift"]
    },
    {
      question: {
        en: "What belief about success did you inherit, and what belief have you chosen instead?",
        tr: "Başarı hakkında miras aldığın hangi inancı bıraktın ve yerine hangisini seçtin?"
      },
      category: "self-knowledge",
      difficulty: "medium",
      tags: ["success", "beliefs", "choice"]
    },
    {
      question: {
        en: "When do you feel most aligned between your thoughts, words, and actions?",
        tr: "Düşüncelerinle sözlerin ve eylemlerin en çok ne zaman uyum içinde?"
      },
      category: "self-knowledge",
      difficulty: "medium",
      tags: ["alignment", "integrity", "moments"]
    },
    {
      question: {
        en: "Which small failure taught you a lesson you still rely on today?",
        tr: "Hangi küçük başarısızlık sana bugün hâlâ güvendiğin bir ders verdi?"
      },
      category: "self-knowledge",
      difficulty: "medium",
      tags: ["failure", "lesson", "reliance"]
    },
    {
      question: {
        en: "How do you react physically when facing internal conflict?",
        tr: "İçsel çatışma yaşarken fiziksel olarak nasıl tepki verirsin?"
      },
      category: "self-knowledge",
      difficulty: "medium",
      tags: ["body", "conflict", "signals"]
    },
    {
      question: {
        en: "When have you used humor to reveal a serious truth about yourself?",
        tr: "Kendinle ilgili ciddi bir gerçeği ne zaman mizahla ortaya koydun?"
      },
      category: "self-knowledge",
      difficulty: "medium",
      tags: ["humor", "truth", "revelation"]
    },
    {
      question: {
        en: "Which part of your identity feels most misunderstood by others?",
        tr: "Kimliğinin başkaları tarafından en yanlış anlaşılan yönü hangisi?"
      },
      category: "self-knowledge",
      difficulty: "medium",
      tags: ["identity", "misunderstanding", "others"]
    },
    {
      question: {
        en: "How do you balance accepting flaws with striving for improvement?",
        tr: "Kusurları kabul etmekle gelişmeye çabalamak arasındaki dengeyi nasıl kuruyorsun?"
      },
      category: "self-knowledge",
      difficulty: "medium",
      tags: ["flaws", "acceptance", "improvement"]
    },
    {
      question: {
        en: "What recent insight about yourself surprised you the most?",
        tr: "Kendinle ilgili seni en çok şaşırtan son içgörü nedir?"
      },
      category: "self-knowledge",
      difficulty: "medium",
      tags: ["insight", "surprise", "self-awareness"]
    },
  
    // ───── Hard (17)
    {
      question: {
        en: "Which contradiction within you have you learned to coexist with rather than resolve?",
        tr: "İçindeki hangi çelişkiyle çözmek yerine birlikte yaşamayı öğrendin?"
      },
      category: "self-knowledge",
      difficulty: "hard",
      tags: ["contradiction", "coexistence", "acceptance"]
    },
    {
      question: {
        en: "When does self-honesty verge into self-cruelty for you?",
        tr: "Kendine dürüstlük ne zaman kendine zulme dönüşür?"
      },
      category: "self-knowledge",
      difficulty: "hard",
      tags: ["self-honesty", "cruelty", "boundary"]
    },
    {
      question: {
        en: "What hidden narrative drives your greatest fear, and how was it written?",
        tr: "En büyük korkunu tetikleyen gizli anlatı nedir ve nasıl yazıldı?"
      },
      category: "self-knowledge",
      difficulty: "hard",
      tags: ["fear", "narrative", "origin"]
    },
    {
      question: {
        en: "Which part of your self-image would collapse if you stopped achieving?",
        tr: "Başarmayı bıraksaydın öz-imajının hangi kısmı çökerdi?"
      },
      category: "self-knowledge",
      difficulty: "hard",
      tags: ["achievement", "identity", "collapse"]
    },
    {
      question: {
        en: "How does your most persistent bias distort your interpretation of kindness?",
        tr: "En inatçı önyargın nezaketi yorumlama biçimini nasıl çarpıtıyor?"
      },
      category: "self-knowledge",
      difficulty: "hard",
      tags: ["bias", "kindness", "distortion"]
    },
    {
      question: {
        en: "When have you confused loyalty to others with loyalty to your own values?",
        tr: "Başkalarına sadakati kendi değerlerine sadakatle ne zaman karıştırdın?"
      },
      category: "self-knowledge",
      difficulty: "hard",
      tags: ["loyalty", "values", "confusion"]
    },
    {
      question: {
        en: "What aspect of your personality do you commodify for acceptance?",
        tr: "Kabul görmek için kişiliğinin hangi yönünü meta hâline getiriyorsun?"
      },
      category: "self-knowledge",
      difficulty: "hard",
      tags: ["commodification", "acceptance", "personality"]
    },
    {
      question: {
        en: "Which internal boundary do you most frequently violate, and for what payoff?",
        tr: "Hangi iç sınırını en sık ihlal ediyorsun ve bunun getirisi ne?"
      },
      category: "self-knowledge",
      difficulty: "hard",
      tags: ["boundaries", "violation", "payoff"]
    },
    {
      question: {
        en: "How does your relationship with mortality influence your daily priorities?",
        tr: "Ölümle ilişkin günlük önceliklerini nasıl etkiliyor?"
      },
      category: "self-knowledge",
      difficulty: "hard",
      tags: ["mortality", "priorities", "awareness"]
    },
    {
      question: {
        en: "When does your pursuit of excellence mask a deeper sense of inadequacy?",
        tr: "Mükemmeliyet arayışın ne zaman daha derin bir yetersizlik hissini gizler?"
      },
      category: "self-knowledge",
      difficulty: "hard",
      tags: ["excellence", "inadequacy", "mask"]
    },
    {
      question: {
        en: "What unfulfilled longing continues to shape your life choices covertly?",
        tr: "Karşılanmamış hangi özlem hayat seçimlerini gizlice şekillendirmeye devam ediyor?"
      },
      category: "self-knowledge",
      difficulty: "hard",
      tags: ["longing", "choices", "covert"]
    },
    {
      question: {
        en: "Which version of your future self do you secretly fear becoming?",
        tr: "Gelecekteki hangi haline gizlice dönüşmekten korkuyorsun?"
      },
      category: "self-knowledge",
      difficulty: "hard",
      tags: ["future-self", "fear", "transformation"]
    },
    {
      question: {
        en: "How has regret shaped the architecture of your current moral code?",
        tr: "Pişmanlık mevcut ahlaki kodunun mimarisini nasıl şekillendirdi?"
      },
      category: "self-knowledge",
      difficulty: "hard",
      tags: ["regret", "morality", "architecture"]
    },
    {
      question: {
        en: "What would unconditional self-acceptance demand you abandon?",
        tr: "Koşulsuz öz-kabul senden neyi terk etmeni gerektirirdi?"
      },
      category: "self-knowledge",
      difficulty: "hard",
      tags: ["self-acceptance", "abandon", "identity"]
    },
    {
      question: {
        en: "When does resilience transform into unhealthy endurance in your life?",
        tr: "Direnç hayatında ne zaman sağlıksız bir tahammüle dönüşüyor?"
      },
      category: "self-knowledge",
      difficulty: "hard",
      tags: ["resilience", "endurance", "threshold"]
    },
    {
      question: {
        en: "Which unseen part of your shadow self occasionally asserts control?",
        tr: "Gölge benliğinin hangi görünmez parçası zaman zaman kontrolü ele geçiriyor?"
      },
      category: "self-knowledge",
      difficulty: "hard",
      tags: ["shadow", "control", "psyche"]
    },
    {
      question: {
        en: "How do you distinguish surrender to reality from resignation to mediocrity?",
        tr: "Gerçekliğe teslimiyeti vasatlığa boyun eğmekten nasıl ayırt ediyorsun?"
      },
      category: "self-knowledge",
      difficulty: "hard",
      tags: ["surrender", "mediocrity", "discernment"]
    }
  ];
  


// Utility functions
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const makeRequest = async (url, options = {}) => {
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || `HTTP error! status: ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error(`Request failed for ${url}:`, error.message);
    throw error;
  }
};

const addQuestion = async (questionData) => {
  const url = `${API_BASE_URL}/v1/conversation-cards`;
  return makeRequest(url, {
    method: 'POST',
    body: JSON.stringify(questionData),
  });
};

// Validation function
const validateQuestion = (question) => {
  const errors = [];
  
  if (!question.question || typeof question.question !== 'object') {
    errors.push('Question must be an object with en and tr properties');
  } else {
    if (!question.question.en || typeof question.question.en !== 'string' || question.question.en.trim() === '') {
      errors.push('English question is required and must be a non-empty string');
    }
    if (!question.question.tr || typeof question.question.tr !== 'string' || question.question.tr.trim() === '') {
      errors.push('Turkish question is required and must be a non-empty string');
    }
  }
  
  if (!question.category || typeof question.category !== 'string') {
    errors.push('Category is required and must be a string');
  }
  
  const validCategories = ['relationships', 'self-knowledge', 'work', 'culture', 'philosophy', 'childhood'];
  if (question.category && !validCategories.includes(question.category)) {
    errors.push(`Category must be one of: ${validCategories.join(', ')}`);
  }
  
  if (!question.difficulty || typeof question.difficulty !== 'string') {
    errors.push('Difficulty is required and must be a string');
  }
  
  const validDifficulties = ['easy', 'medium', 'hard'];
  if (question.difficulty && !validDifficulties.includes(question.difficulty)) {
    errors.push(`Difficulty must be one of: ${validDifficulties.join(', ')}`);
  }
  
  if (question.tags && !Array.isArray(question.tags)) {
    errors.push('Tags must be an array');
  }
  
  return errors;
};

// Main function
const main = async () => {
  console.log('🚀 Starting Question Generator...\n');
  
  // Validate all questions first
  console.log('📋 Validating questions...');
  let hasErrors = false;
  
  for (let i = 0; i < QUESTIONS.length; i++) {
    const question = QUESTIONS[i];
    const errors = validateQuestion(question);
    
    if (errors.length > 0) {
      console.error(`❌ Question ${i + 1} has errors:`);
      errors.forEach(error => console.error(`   - ${error}`));
      console.error(`   Question: ${question.question?.en || 'N/A'}\n`);
      hasErrors = true;
    }
  }
  
  if (hasErrors) {
    console.error('❌ Please fix the validation errors above before proceeding.');
    process.exit(1);
  }
  
  console.log(`✅ All ${QUESTIONS.length} questions are valid!\n`);
  
  // Test API connection
  console.log('🔗 Testing API connection...');
  try {
    await makeRequest(`${API_BASE_URL}/health`);
    console.log('✅ API connection successful!\n');
  } catch (error) {
    console.error('❌ Failed to connect to API. Make sure the backend is deployed and running.');
    console.error(`   API URL: ${API_BASE_URL}`);
    console.error(`   Error: ${error.message}\n`);
    process.exit(1);
  }
  
  // Add questions
  console.log('📝 Adding questions to database...\n');
  
  let successCount = 0;
  let failureCount = 0;
  
  for (let i = 0; i < QUESTIONS.length; i++) {
    const question = QUESTIONS[i];
    
    try {
      console.log(`   ${i + 1}/${QUESTIONS.length} Adding: "${question.question.en.substring(0, 50)}${question.question.en.length > 50 ? '...' : ''}"`);
      
      const response = await addQuestion(question);
      
      if (response.status === 'success') {
        successCount++;
        console.log(`   ✅ Success! ID: ${response.data.id}`);
      } else {
        failureCount++;
        console.log(`   ❌ Failed: ${response.message}`);
      }
      
      // Add delay to avoid overwhelming the API
      if (i < QUESTIONS.length - 1) {
        await delay(500); // 500ms delay between requests
      }
      
    } catch (error) {
      failureCount++;
      console.log(`   ❌ Error: ${error.message}`);
    }
    
    console.log(''); // Empty line for readability
  }
  
  // Summary
  console.log('📊 Summary:');
  console.log(`   ✅ Successfully added: ${successCount} questions`);
  console.log(`   ❌ Failed to add: ${failureCount} questions`);
  console.log(`   📝 Total processed: ${QUESTIONS.length} questions\n`);
  
  if (successCount > 0) {
    console.log('🎉 Questions have been added to the database!');
    console.log('   You can view them in the admin panel or through the API.');
  }
  
  if (failureCount > 0) {
    console.log('⚠️  Some questions failed to be added. Check the errors above.');
  }
};

// Handle errors and run
if (require.main === module) {
  main().catch(error => {
    console.error('\n💥 Script failed with error:', error.message);
    process.exit(1);
  });
}

module.exports = { QUESTIONS, addQuestion, validateQuestion }; 