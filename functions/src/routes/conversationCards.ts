import express from 'express';
import * as logger from 'firebase-functions/logger';
import { getFirestore, QuerySnapshot, DocumentSnapshot, DocumentData } from 'firebase-admin/firestore';

const router = express.Router();

// Max pagination limits
const MAX_LIMIT = 100;
const MAX_ADMIN_LIMIT = 500;
const MAX_QUESTION_LENGTH = 1000;
const MAX_CATEGORY_LENGTH = 50;
const MAX_TAG_LENGTH = 50;
const MAX_TAGS_COUNT = 10;

// Fisher-Yates shuffle for unbiased randomness
function fisherYatesShuffle<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Helper function to format card based on language preference
const formatCardForLanguage = (cardData: DocumentData & { id: string }, language: 'en' | 'tr' = 'en') => {
  const { question, ...otherData } = cardData;

  // Expect new multilingual format only
  const formattedQuestion = question?.[language] || question?.en || 'Question not available';

  return {
    ...otherData,
    question: formattedQuestion,
    language: language
  };
};

// Helper to clamp pagination values
function clampPagination(limitStr: string, offsetStr: string, maxLimit: number): { limitNum: number; offsetNum: number } {
  const limitNum = Math.min(Math.max(parseInt(limitStr) || 50, 1), maxLimit);
  const offsetNum = Math.max(parseInt(offsetStr) || 0, 0);
  return { limitNum, offsetNum };
}

// Helper to validate string length
function isValidString(value: unknown, maxLength: number): value is string {
  return typeof value === 'string' && value.trim().length > 0 && value.trim().length <= maxLength;
}

// Middleware to verify admin authorization
function requireAdminAuth(req: express.Request, res: express.Response): boolean {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({
      status: 'error',
      message: 'Authentication required',
      timestamp: new Date().toISOString()
    });
    return false;
  }

  const token = authHeader.split('Bearer ')[1];
  const adminToken = process.env.ADMIN_API_TOKEN;
  if (!adminToken || token !== adminToken) {
    res.status(403).json({
      status: 'error',
      message: 'Forbidden: invalid credentials',
      timestamp: new Date().toISOString()
    });
    return false;
  }

  return true;
}

// GET /api/v1/conversation-cards - Get all conversation cards
router.get('/', async (req: express.Request, res: express.Response): Promise<void> => {
  try {
    const db = getFirestore();
    const { category, difficulty, limit = '50', offset = '0', language = 'en' } = req.query;
    const lang = (language as string) === 'tr' ? 'tr' : 'en';

    let query: FirebaseFirestore.Query<DocumentData> = db.collection('conversation-cards');

    // Apply filters
    if (category && typeof category === 'string') {
      query = query.where('category', '==', category);
    }
    if (difficulty && typeof difficulty === 'string') {
      query = query.where('difficulty', '==', difficulty);
    }

    // Apply pagination with caps
    const { limitNum, offsetNum } = clampPagination(limit as string, offset as string, MAX_LIMIT);

    query = query.limit(limitNum);
    if (offsetNum > 0) {
      query = query.offset(offsetNum);
    }

    const snapshot: QuerySnapshot<DocumentData> = await query.get();
    const conversationCards = snapshot.docs.map((doc: DocumentSnapshot<DocumentData>) => {
      const cardData = { id: doc.id, ...doc.data() } as DocumentData & { id: string };
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
    logger.error('Error fetching conversation cards:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to retrieve conversation cards',
      timestamp: new Date().toISOString()
    });
  }
});

// GET /api/v1/conversation-cards/categories/count - Get count for each category
router.get('/categories/count', async (req: express.Request, res: express.Response): Promise<void> => {
  try {
    const db = getFirestore();
    const snapshot: QuerySnapshot<DocumentData> = await db.collection('conversation-cards').get();
    const categoryCounts: { [key: string]: number } = {};
    let totalCards = 0;

    snapshot.docs.forEach((doc: DocumentSnapshot<DocumentData>) => {
      const data = doc.data();
      const category = data?.category || 'uncategorized';
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
    logger.error('Error fetching category counts:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to retrieve category counts',
      timestamp: new Date().toISOString()
    });
  }
});

// GET /api/v1/conversation-cards/random - Get random card(s) with optional category filtering
router.get('/random', async (req: express.Request, res: express.Response): Promise<void> => {
  try {
    const db = getFirestore();
    const { categories, count = '1', language = 'en' } = req.query;
    const cardCount = Math.min(parseInt(count as string) || 1, 10);
    const lang = (language as string) === 'tr' ? 'tr' : 'en';

    let query: FirebaseFirestore.Query<DocumentData> = db.collection('conversation-cards');
    let appliedFilters: string[] = [];

    // Apply category filter if provided
    if (categories) {
      let categoryList: string[] = [];

      if (Array.isArray(categories)) {
        categoryList = categories.map(c => String(c).trim().toLowerCase());
      } else {
        categoryList = String(categories).split(',').map(c => c.trim().toLowerCase());
      }

      if (categoryList.length === 1) {
        query = query.where('category', '==', categoryList[0]);
        appliedFilters = categoryList;
      } else if (categoryList.length > 1) {
        const limitedCategories = categoryList.slice(0, 10);
        query = query.where('category', 'in', limitedCategories);
        appliedFilters = limitedCategories;
      }
    }

    const snapshot: QuerySnapshot<DocumentData> = await query.get();

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

    const allCards = snapshot.docs.map((doc: DocumentSnapshot<DocumentData>) => {
      const cardData = { id: doc.id, ...doc.data() } as DocumentData & { id: string };
      return formatCardForLanguage(cardData, lang);
    });

    // Use proper Fisher-Yates shuffle for unbiased randomness
    const shuffledCards = fisherYatesShuffle(allCards);
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
    logger.error('Error fetching random conversation cards:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to retrieve random conversation cards',
      timestamp: new Date().toISOString()
    });
  }
});

// GET /api/v1/conversation-cards/admin - Get all conversation cards with raw multilingual data (for admin panel)
router.get('/admin', async (req: express.Request, res: express.Response): Promise<void> => {
  try {
    // Require admin authentication
    if (!requireAdminAuth(req, res)) return;

    const db = getFirestore();
    const { category, difficulty, limit = '100', offset = '0' } = req.query;

    let query: FirebaseFirestore.Query<DocumentData> = db.collection('conversation-cards');

    // Apply filters
    if (category && typeof category === 'string') {
      query = query.where('category', '==', category);
    }
    if (difficulty && typeof difficulty === 'string') {
      query = query.where('difficulty', '==', difficulty);
    }

    // Apply pagination with admin-level caps
    const { limitNum, offsetNum } = clampPagination(limit as string, offset as string, MAX_ADMIN_LIMIT);

    query = query.limit(limitNum);
    if (offsetNum > 0) {
      query = query.offset(offsetNum);
    }

    const snapshot: QuerySnapshot<DocumentData> = await query.get();
    const conversationCards = snapshot.docs.map((doc: DocumentSnapshot<DocumentData>) => {
      return { id: doc.id, ...doc.data() };
    });

    res.status(200).json({
      status: 'success',
      message: 'Admin conversation cards retrieved successfully',
      timestamp: new Date().toISOString(),
      data: {
        cards: conversationCards,
        total: conversationCards.length,
        filters: { category, difficulty, language: 'raw' },
        pagination: { limit: limitNum, offset: offsetNum }
      }
    });
  } catch (error) {
    logger.error('Error fetching admin conversation cards:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to retrieve admin conversation cards',
      timestamp: new Date().toISOString()
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

    const cardData = { id: cardDoc.id, ...cardDoc.data() } as DocumentData & { id: string };
    const formattedCard = formatCardForLanguage(cardData, lang);

    res.status(200).json({
      status: 'success',
      message: 'Conversation card retrieved successfully',
      timestamp: new Date().toISOString(),
      data: formattedCard
    });
  } catch (error) {
    logger.error('Error fetching conversation card:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to retrieve conversation card',
      timestamp: new Date().toISOString()
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

    // Handle question format - require multilingual object with length validation
    if (!question || typeof question !== 'object' || !question.en || !question.tr) {
      res.status(400).json({
        status: 'error',
        message: 'Question must include both English and Turkish versions. Format: {"en": "English text", "tr": "Turkish text"}',
        timestamp: new Date().toISOString()
      });
      return;
    }

    if (!isValidString(question.en, MAX_QUESTION_LENGTH) || !isValidString(question.tr, MAX_QUESTION_LENGTH)) {
      res.status(400).json({
        status: 'error',
        message: `Question text must be between 1 and ${MAX_QUESTION_LENGTH} characters`,
        timestamp: new Date().toISOString()
      });
      return;
    }

    if (!isValidString(category, MAX_CATEGORY_LENGTH)) {
      res.status(400).json({
        status: 'error',
        message: `Category must be between 1 and ${MAX_CATEGORY_LENGTH} characters`,
        timestamp: new Date().toISOString()
      });
      return;
    }

    // Validate tags
    const validTags: string[] = [];
    if (Array.isArray(tags)) {
      for (const tag of tags.slice(0, MAX_TAGS_COUNT)) {
        if (isValidString(tag, MAX_TAG_LENGTH)) {
          validTags.push(tag.trim());
        }
      }
    }

    const questionData = {
      en: question.en.trim(),
      tr: question.tr.trim()
    };

    const newCardData = {
      question: questionData,
      category: category.trim().toLowerCase(),
      difficulty,
      tags: validTags,
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
    logger.error('Error creating conversation card:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to create conversation card',
      timestamp: new Date().toISOString()
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

    const updateData: Record<string, unknown> = {
      updatedAt: new Date().toISOString()
    };

    // Handle question update
    if (question) {
      if (typeof question !== 'object' || !question.en || !question.tr) {
        res.status(400).json({
          status: 'error',
          message: 'Question must include both English and Turkish versions. Format: {"en": "English text", "tr": "Turkish text"}',
          timestamp: new Date().toISOString()
        });
        return;
      }

      if (!isValidString(question.en, MAX_QUESTION_LENGTH) || !isValidString(question.tr, MAX_QUESTION_LENGTH)) {
        res.status(400).json({
          status: 'error',
          message: `Question text must be between 1 and ${MAX_QUESTION_LENGTH} characters`,
          timestamp: new Date().toISOString()
        });
        return;
      }

      updateData.question = {
        en: question.en.trim(),
        tr: question.tr.trim()
      };
    }

    if (category) {
      if (!isValidString(category, MAX_CATEGORY_LENGTH)) {
        res.status(400).json({
          status: 'error',
          message: `Category must be between 1 and ${MAX_CATEGORY_LENGTH} characters`,
          timestamp: new Date().toISOString()
        });
        return;
      }
      updateData.category = category.trim().toLowerCase();
    }
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
    if (tags) {
      const validTags: string[] = [];
      if (Array.isArray(tags)) {
        for (const tag of tags.slice(0, MAX_TAGS_COUNT)) {
          if (isValidString(tag, MAX_TAG_LENGTH)) {
            validTags.push(tag.trim());
          }
        }
      }
      updateData.tags = validTags;
    }

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
    logger.error('Error updating conversation card:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to update conversation card',
      timestamp: new Date().toISOString()
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
    logger.error('Error deleting conversation card:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to delete conversation card',
      timestamp: new Date().toISOString()
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

    const voteUpdate: Record<string, number | string> = {};

    if (voteType === 'upvote') {
      voteUpdate.upvotes = currentUpvotes + 1;
      voteUpdate.downvotes = currentDownvotes;
    } else {
      voteUpdate.upvotes = currentUpvotes;
      voteUpdate.downvotes = currentDownvotes + 1;
    }

    voteUpdate.totalVotes = (voteUpdate.upvotes as number) + (voteUpdate.downvotes as number);
    voteUpdate.updatedAt = new Date().toISOString();

    await cardRef.update(voteUpdate);

    res.status(200).json({
      status: 'success',
      message: `Card ${voteType}d successfully`,
      timestamp: new Date().toISOString(),
      data: {
        id: cardDoc.id,
        voteType,
        upvotes: voteUpdate.upvotes,
        downvotes: voteUpdate.downvotes,
        totalVotes: voteUpdate.totalVotes
      }
    });
  } catch (error) {
    logger.error('Error voting on conversation card:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to vote on conversation card',
      timestamp: new Date().toISOString()
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
    logger.error('Error fetching vote statistics:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to retrieve vote statistics',
      timestamp: new Date().toISOString()
    });
  }
});

export default router;
