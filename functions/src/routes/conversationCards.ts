import express from 'express';
import { getFirestore } from 'firebase-admin/firestore';

const router = express.Router();

// Helper function to format card based on language preference
const formatCardForLanguage = (cardData: any, language: 'en' | 'tr' = 'en') => {
  const { question, ...otherData } = cardData;
  
  // Expect new multilingual format only
  const formattedQuestion = question?.[language] || question?.en || 'Question not available';
  
  return {
    ...otherData,
    question: formattedQuestion,
    language: language
  };
};

// GET /api/v1/conversation-cards - Get all conversation cards
router.get('/', async (req: express.Request, res: express.Response): Promise<void> => {
  try {
    const db = getFirestore();
    const { category, difficulty, limit = '50', offset = '0', language = 'en' } = req.query;
    const lang = (language as string) === 'tr' ? 'tr' : 'en';
    
    let query: any = db.collection('conversation-cards');
    
    // Apply filters
    if (category) {
      query = query.where('category', '==', category);
    }
    if (difficulty) {
      query = query.where('difficulty', '==', difficulty);
    }
    
    // Apply pagination
    const limitNum = parseInt(limit as string);
    const offsetNum = parseInt(offset as string);
    
    query = query.limit(limitNum);
    if (offsetNum > 0) {
      query = query.offset(offsetNum);
    }
    
    const snapshot = await query.get();
    const conversationCards = snapshot.docs.map((doc: any) => {
      const cardData = { id: doc.id, ...doc.data() };
      return formatCardForLanguage(cardData, lang);
    });

    res.status(200).json({
      status: 'success',
      message: 'Conversation cards retrieved successfully',
      timestamp: new Date().toISOString(),
      data: {
        cards: conversationCards,
        total: conversationCards.length,
        filters: { category, difficulty, language: lang },
        pagination: { limit: limitNum, offset: offsetNum }
      }
    });
  } catch (error) {
    console.error('❌ Error fetching conversation cards:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to retrieve conversation cards',
      timestamp: new Date().toISOString(),
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// GET /api/v1/conversation-cards/categories/count - Get count for each category
router.get('/categories/count', async (req: express.Request, res: express.Response): Promise<void> => {
  try {
    const db = getFirestore();
    const snapshot = await db.collection('conversation-cards').get();
    const categoryCounts: { [key: string]: number } = {};
    let totalCards = 0;

    snapshot.docs.forEach((doc: any) => {
      const data = doc.data();
      const category = data.category || 'uncategorized';
      categoryCounts[category] = (categoryCounts[category] || 0) + 1;
      totalCards++;
    });

    // Sort categories by count (descending)
    const sortedCategories = Object.entries(categoryCounts)
      .sort(([, a], [, b]) => b - a)
      .reduce((obj, [key, value]) => {
        obj[key] = value;
        return obj;
      }, {} as { [key: string]: number });

    res.status(200).json({
      status: 'success',
      message: 'Category counts retrieved successfully',
      timestamp: new Date().toISOString(),
      data: {
        totalCards,
        categoryCounts: sortedCategories,
        uniqueCategories: Object.keys(sortedCategories).length
      }
    });
  } catch (error) {
    console.error('❌ Error fetching category counts:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to retrieve category counts',
      timestamp: new Date().toISOString(),
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// GET /api/v1/conversation-cards/random - Get random card(s) with optional category filtering
router.get('/random', async (req: express.Request, res: express.Response): Promise<void> => {
  try {
    const db = getFirestore();
    const { categories, count = '1', language = 'en' } = req.query;
    const cardCount = Math.min(parseInt(count as string) || 1, 10); // Limit to max 10 cards
    const lang = (language as string) === 'tr' ? 'tr' : 'en';
    
    let query: any = db.collection('conversation-cards');
    let appliedFilters: string[] = [];

    // Apply category filter if provided
    if (categories) {
      let categoryList: string[] = [];
      
      if (Array.isArray(categories)) {
        // Handle array of categories
        categoryList = categories.map(c => String(c).trim().toLowerCase());
      } else {
        // Handle single category or comma-separated string
        categoryList = String(categories).split(',').map(c => c.trim().toLowerCase());
      }
      
      if (categoryList.length === 1) {
        // Single category filter
        query = query.where('category', '==', categoryList[0]);
        appliedFilters = categoryList;
      } else if (categoryList.length > 1) {
        // Multiple categories - use 'in' operator (max 10 values)
        const limitedCategories = categoryList.slice(0, 10);
        query = query.where('category', 'in', limitedCategories);
        appliedFilters = limitedCategories;
      }
    }

    const snapshot = await query.get();
    
    if (snapshot.empty) {
      res.status(404).json({
        status: 'error',
        message: 'No conversation cards found matching the criteria',
        timestamp: new Date().toISOString(),
        data: {
          appliedFilters,
          availableCards: 0,
          language: lang
        }
      });
      return;
    }

    const allCards = snapshot.docs.map((doc: any) => {
      const cardData = { id: doc.id, ...doc.data() };
      return formatCardForLanguage(cardData, lang);
    });

    // Shuffle and select random cards
    const shuffledCards = allCards.sort(() => Math.random() - 0.5);
    const selectedCards = shuffledCards.slice(0, cardCount);

    res.status(200).json({
      status: 'success',
      message: `Random conversation card${cardCount > 1 ? 's' : ''} retrieved successfully`,
      timestamp: new Date().toISOString(),
      data: {
        cards: selectedCards,
        requestedCount: cardCount,
        returnedCount: selectedCards.length,
        appliedFilters,
        totalAvailableCards: allCards.length,
        language: lang
      }
    });
  } catch (error) {
    console.error('❌ Error fetching random conversation cards:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to retrieve random conversation cards',
      timestamp: new Date().toISOString(),
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// GET /api/v1/conversation-cards/:cardId - Get specific conversation card
router.get('/:cardId', async (req: express.Request, res: express.Response): Promise<void> => {
  try {
    const db = getFirestore();
    const { cardId } = req.params;
    const { language = 'en' } = req.query;
    const lang = (language as string) === 'tr' ? 'tr' : 'en';
    
    const cardDoc = await db.collection('conversation-cards').doc(cardId).get();
    
    if (!cardDoc.exists) {
      res.status(404).json({
        status: 'error',
        message: 'Conversation card not found',
        timestamp: new Date().toISOString()
      });
      return;
    }

    const cardData = { id: cardDoc.id, ...cardDoc.data() };
    const formattedCard = formatCardForLanguage(cardData, lang);

    res.status(200).json({
      status: 'success',
      message: 'Conversation card retrieved successfully',
      timestamp: new Date().toISOString(),
      data: formattedCard
    });
  } catch (error) {
    console.error('❌ Error fetching conversation card:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to retrieve conversation card',
      timestamp: new Date().toISOString(),
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// POST /api/v1/conversation-cards - Create new conversation card
router.post('/', async (req: express.Request, res: express.Response): Promise<void> => {
  try {
    const db = getFirestore();
    const { question, category, difficulty, tags } = req.body;
    
    // Validation
    if (!question || !category || !difficulty) {
      res.status(400).json({
        status: 'error',
        message: 'Missing required fields: question, category, difficulty',
        timestamp: new Date().toISOString()
      });
      return;
    }

    if (!['easy', 'medium', 'hard'].includes(difficulty)) {
      res.status(400).json({
        status: 'error',
        message: 'Invalid difficulty level. Must be: easy, medium, or hard',
        timestamp: new Date().toISOString()
      });
      return;
    }

    // Handle question format - require multilingual object
    if (!question || typeof question !== 'object' || !question.en || !question.tr) {
      res.status(400).json({
        status: 'error',
        message: 'Question must include both English and Turkish versions. Format: {"en": "English text", "tr": "Turkish text"}',
        timestamp: new Date().toISOString()
      });
      return;
    }

    const questionData = {
      en: question.en.trim(),
      tr: question.tr.trim()
    };

    const newCardData = {
      question: questionData,
      category: category.trim().toLowerCase(),
      difficulty,
      tags: Array.isArray(tags) ? tags : [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      upvotes: 0,
      downvotes: 0,
      totalVotes: 0
    };

    const cardRef = await db.collection('conversation-cards').add(newCardData);
    
    res.status(201).json({
      status: 'success',
      message: 'Conversation card created successfully',
      timestamp: new Date().toISOString(),
      data: {
        id: cardRef.id,
        ...newCardData
      }
    });
  } catch (error) {
    console.error('❌ Error creating conversation card:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to create conversation card',
      timestamp: new Date().toISOString(),
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// PUT /api/v1/conversation-cards/:cardId - Update conversation card
router.put('/:cardId', async (req: express.Request, res: express.Response): Promise<void> => {
  try {
    const db = getFirestore();
    const { cardId } = req.params;
    const { question, category, difficulty, tags } = req.body;
    
    // Check if card exists
    const cardDoc = await db.collection('conversation-cards').doc(cardId).get();
    if (!cardDoc.exists) {
      res.status(404).json({
        status: 'error',
        message: 'Conversation card not found',
        timestamp: new Date().toISOString()
      });
      return;
    }

    const updateData: any = {
      updatedAt: new Date().toISOString()
    };

    // Handle question update
    if (question) {
      if (!question || typeof question !== 'object' || !question.en || !question.tr) {
        res.status(400).json({
          status: 'error',
          message: 'Question must include both English and Turkish versions. Format: {"en": "English text", "tr": "Turkish text"}',
          timestamp: new Date().toISOString()
        });
        return;
      }
      
      updateData.question = {
        en: question.en.trim(),
        tr: question.tr.trim()
      };
    }

    if (category) updateData.category = category.trim().toLowerCase();
    if (difficulty) {
      if (!['easy', 'medium', 'hard'].includes(difficulty)) {
        res.status(400).json({
          status: 'error',
          message: 'Invalid difficulty level. Must be: easy, medium, or hard',
          timestamp: new Date().toISOString()
        });
        return;
      }
      updateData.difficulty = difficulty;
    }
    if (tags) updateData.tags = Array.isArray(tags) ? tags : [];

    await db.collection('conversation-cards').doc(cardId).update(updateData);
    
    // Get updated document
    const updatedDoc = await db.collection('conversation-cards').doc(cardId).get();
    
    res.status(200).json({
      status: 'success',
      message: 'Conversation card updated successfully',
      timestamp: new Date().toISOString(),
      data: {
        id: updatedDoc.id,
        ...updatedDoc.data()
      }
    });
  } catch (error) {
    console.error('❌ Error updating conversation card:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to update conversation card',
      timestamp: new Date().toISOString(),
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// DELETE /api/v1/conversation-cards/:cardId - Delete conversation card
router.delete('/:cardId', async (req: express.Request, res: express.Response): Promise<void> => {
  try {
    const db = getFirestore();
    const { cardId } = req.params;
    
    // Check if card exists
    const cardDoc = await db.collection('conversation-cards').doc(cardId).get();
    if (!cardDoc.exists) {
      res.status(404).json({
        status: 'error',
        message: 'Conversation card not found',
        timestamp: new Date().toISOString()
      });
      return;
    }

    await db.collection('conversation-cards').doc(cardId).delete();
    
    res.status(200).json({
      status: 'success',
      message: 'Conversation card deleted successfully',
      timestamp: new Date().toISOString(),
      data: {
        deletedCardId: cardId
      }
    });
  } catch (error) {
    console.error('❌ Error deleting conversation card:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to delete conversation card',
      timestamp: new Date().toISOString(),
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// POST /api/v1/conversation-cards/:cardId/vote - Upvote or downvote a card
router.post('/:cardId/vote', async (req: express.Request, res: express.Response): Promise<void> => {
  try {
    const db = getFirestore();
    const { cardId } = req.params;
    const { voteType } = req.body;
    
    // Validation
    if (!voteType || !['upvote', 'downvote'].includes(voteType)) {
      res.status(400).json({
        status: 'error',
        message: 'Invalid vote type. Must be: upvote or downvote',
        timestamp: new Date().toISOString()
      });
      return;
    }

    // Check if card exists
    const cardRef = db.collection('conversation-cards').doc(cardId);
    const cardDoc = await cardRef.get();
    
    if (!cardDoc.exists) {
      res.status(404).json({
        status: 'error',
        message: 'Conversation card not found',
        timestamp: new Date().toISOString()
      });
      return;
    }

    const cardData = cardDoc.data();
    const currentUpvotes = cardData?.upvotes || 0;
    const currentDownvotes = cardData?.downvotes || 0;

    let updateData: any = {};
    
    if (voteType === 'upvote') {
      updateData.upvotes = currentUpvotes + 1;
      updateData.downvotes = currentDownvotes;
    } else {
      updateData.upvotes = currentUpvotes;
      updateData.downvotes = currentDownvotes + 1;
    }
    
    updateData.totalVotes = updateData.upvotes + updateData.downvotes;
    updateData.updatedAt = new Date().toISOString();

    await cardRef.update(updateData);
    
    // Get updated document
    const updatedDoc = await cardRef.get();
    
    res.status(200).json({
      status: 'success',
      message: `Card ${voteType}d successfully`,
      timestamp: new Date().toISOString(),
      data: {
        id: updatedDoc.id,
        voteType,
        upvotes: updateData.upvotes,
        downvotes: updateData.downvotes,
        totalVotes: updateData.totalVotes
      }
    });
  } catch (error) {
    console.error('❌ Error voting on conversation card:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to vote on conversation card',
      timestamp: new Date().toISOString(),
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// GET /api/v1/conversation-cards/:cardId/votes - Get vote statistics for a card
router.get('/:cardId/votes', async (req: express.Request, res: express.Response): Promise<void> => {
  try {
    const db = getFirestore();
    const { cardId } = req.params;
    
    const cardDoc = await db.collection('conversation-cards').doc(cardId).get();
    
    if (!cardDoc.exists) {
      res.status(404).json({
        status: 'error',
        message: 'Conversation card not found',
        timestamp: new Date().toISOString()
      });
      return;
    }

    const cardData = cardDoc.data();
    const upvotes = cardData?.upvotes || 0;
    const downvotes = cardData?.downvotes || 0;
    const totalVotes = upvotes + downvotes;
    const upvotePercentage = totalVotes > 0 ? Math.round((upvotes / totalVotes) * 100) : 0;

    res.status(200).json({
      status: 'success',
      message: 'Vote statistics retrieved successfully',
      timestamp: new Date().toISOString(),
      data: {
        cardId,
        upvotes,
        downvotes,
        totalVotes,
        upvotePercentage,
        downvotePercentage: 100 - upvotePercentage
      }
    });
  } catch (error) {
    console.error('❌ Error fetching vote statistics:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to retrieve vote statistics',
      timestamp: new Date().toISOString(),
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

export default router; 