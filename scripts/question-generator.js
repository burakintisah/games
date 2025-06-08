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
const QUESTIONS = [
  // Relationships Category Examples
  {
    question: {
      en: "What's the most important quality you look for in a friend?",
      tr: "Bir arkadaşta aradığın en önemli özellik nedir?"
    },
    category: "relationships",
    difficulty: "easy",
    tags: ["friendship", "qualities", "values"]
  },
  {
    question: {
      en: "How do you handle conflicts in your relationships?",
      tr: "İlişkilerindeki çatışmaları nasıl çözüyorsun?"
    },
    category: "relationships",
    difficulty: "medium",
    tags: ["conflict", "communication", "resolution"]
  },
  {
    question: {
      en: "What's the most vulnerable thing you've shared with someone?",
      tr: "Biriyle paylaştığın en savunmasız kaldığın şey neydi?"
    },
    category: "relationships",
    difficulty: "hard",
    tags: ["vulnerability", "trust", "intimacy"]
  },

  // Self-Knowledge Category Examples
  {
    question: {
      en: "What's your biggest strength and how do you use it?",
      tr: "En büyük gücün nedir ve onu nasıl kullanıyorsun?"
    },
    category: "self-knowledge",
    difficulty: "easy",
    tags: ["strengths", "self-awareness", "personal-growth"]
  },
  {
    question: {
      en: "What pattern do you notice repeating in your life?",
      tr: "Hayatında tekrar eden hangi kalıbı fark ediyorsun?"
    },
    category: "self-knowledge",
    difficulty: "medium",
    tags: ["patterns", "habits", "self-reflection"]
  },
  {
    question: {
      en: "What's the deepest fear that holds you back from being your authentic self?",
      tr: "Gerçek benliğin olmaktan seni alıkoyan en derin korku nedir?"
    },
    category: "self-knowledge",
    difficulty: "hard",
    tags: ["fear", "authenticity", "self-acceptance"]
  },

  // Work Category Examples
  {
    question: {
      en: "What motivates you most at work?",
      tr: "İşte seni en çok motive eden şey nedir?"
    },
    category: "work",
    difficulty: "easy",
    tags: ["motivation", "career", "purpose"]
  },
  {
    question: {
      en: "How do you balance ambition with contentment in your career?",
      tr: "Kariyerinde hırsla memnuniyeti nasıl dengeliyorsun?"
    },
    category: "work",
    difficulty: "medium",
    tags: ["ambition", "balance", "satisfaction"]
  },
  {
    question: {
      en: "What would you do professionally if money wasn't a factor?",
      tr: "Para bir faktör olmasaydı profesyonel olarak ne yapardın?"
    },
    category: "work",
    difficulty: "hard",
    tags: ["passion", "purpose", "dreams"]
  },

  // Culture Category Examples
  {
    question: {
      en: "What tradition from your culture do you value most?",
      tr: "Kültürünün hangi geleneğine en çok değer veriyorsun?"
    },
    category: "culture",
    difficulty: "easy",
    tags: ["tradition", "heritage", "values"]
  },
  {
    question: {
      en: "How has your cultural background shaped your worldview?",
      tr: "Kültürel geçmişin dünya görüşünü nasıl şekillendirdi?"
    },
    category: "culture",
    difficulty: "medium",
    tags: ["worldview", "identity", "perspective"]
  },
  {
    question: {
      en: "What aspects of other cultures do you wish were more present in your own?",
      tr: "Diğer kültürlerin hangi yönlerinin kendi kültüründe daha fazla olmasını istiyorsun?"
    },
    category: "culture",
    difficulty: "hard",
    tags: ["cultural-exchange", "diversity", "learning"]
  },

  // Philosophy Category Examples
  {
    question: {
      en: "What do you think is the meaning of life?",
      tr: "Hayatın anlamının ne olduğunu düşünüyorsun?"
    },
    category: "philosophy",
    difficulty: "easy",
    tags: ["meaning", "purpose", "existence"]
  },
  {
    question: {
      en: "Do you believe people are fundamentally good or bad?",
      tr: "İnsanların temelde iyi mi kötü mü olduğuna inanıyorsun?"
    },
    category: "philosophy",
    difficulty: "medium",
    tags: ["human-nature", "morality", "beliefs"]
  },
  {
    question: {
      en: "If you could know the absolute truth about one thing, what would it be?",
      tr: "Bir şey hakkında mutlak gerçeği bilebilseydin, bu ne olurdu?"
    },
    category: "philosophy",
    difficulty: "hard",
    tags: ["truth", "knowledge", "curiosity"]
  },

  // Childhood Category Examples
  {
    question: {
      en: "What's your favorite childhood memory?",
      tr: "En sevdiğin çocukluk anın nedir?"
    },
    category: "childhood",
    difficulty: "easy",
    tags: ["memories", "nostalgia", "happiness"]
  },
  {
    question: {
      en: "What did you want to be when you grew up, and how does that relate to who you are now?",
      tr: "Büyüdüğünde ne olmak istiyordun ve bu şu anki halinle nasıl ilişkili?"
    },
    category: "childhood",
    difficulty: "medium",
    tags: ["dreams", "growth", "identity"]
  },
  {
    question: {
      en: "What childhood experience most shaped who you became as an adult?",
      tr: "Hangi çocukluk deneyimi yetişkin olarak kim olduğunu en çok şekillendirdi?"
    },
    category: "childhood",
    difficulty: "hard",
    tags: ["formative-experiences", "development", "influence"]
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