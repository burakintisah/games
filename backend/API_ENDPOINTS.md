# 🚀 Conversation Cards API Documentation

## Base URL
```
http://localhost:3001
```

## 📋 API Endpoints Overview

### Health & System
- `GET /api/health` - Health check
- `GET /api/firebase/test` - Firebase connection test

### Conversation Cards CRUD
- `GET /api/v1/conversation-cards` - Get all cards (with filters, pagination & language)
- `GET /api/v1/conversation-cards/categories/count` - Get count for each category
- `GET /api/v1/conversation-cards/random` - Get random card(s) with optional filtering & language
- `GET /api/v1/conversation-cards/:cardId` - Get specific card (with language support)
- `POST /api/v1/conversation-cards` - Create new multilingual card
- `PUT /api/v1/conversation-cards/:cardId` - Update multilingual card
- `DELETE /api/v1/conversation-cards/:cardId` - Delete card

### Voting System
- `POST /api/v1/conversation-cards/:cardId/vote` - Vote on a card
- `GET /api/v1/conversation-cards/:cardId/votes` - Get vote statistics

---

## 🌍 Language Support

All endpoints that return conversation cards support **English (en)** and **Turkish (tr)** languages:

- **Default**: English (`en`)
- **Parameter**: `?language=tr` for Turkish
- **Required Format**: All cards must include both English and Turkish versions

---

## 🔧 cURL Examples

### Health & System Endpoints

#### Health Check
```bash
curl -X GET http://localhost:3001/api/health
```

#### Firebase Connection Test
```bash
curl -X GET http://localhost:3001/api/firebase/test
```

---

### Conversation Cards CRUD Operations

#### 1. Get All Conversation Cards
```bash
# Basic request (English by default)
curl -X GET http://localhost:3001/api/v1/conversation-cards

# Get Turkish versions
curl -X GET "http://localhost:3001/api/v1/conversation-cards?language=tr"

# With category filter and Turkish language
curl -X GET "http://localhost:3001/api/v1/conversation-cards?category=relationships&language=tr"

# With difficulty filter and English language
curl -X GET "http://localhost:3001/api/v1/conversation-cards?difficulty=medium&language=en"

# With pagination and Turkish language
curl -X GET "http://localhost:3001/api/v1/conversation-cards?limit=10&offset=0&language=tr"

# Combined filters with Turkish
curl -X GET "http://localhost:3001/api/v1/conversation-cards?category=self-knowledge&difficulty=hard&limit=5&language=tr"
```

#### 2. Get Category Counts
```bash
curl -X GET http://localhost:3001/api/v1/conversation-cards/categories/count
```

#### 3. Get Random Card(s)
```bash
# Get single random card (English by default)
curl -X GET http://localhost:3001/api/v1/conversation-cards/random

# Get random card in Turkish
curl -X GET "http://localhost:3001/api/v1/conversation-cards/random?language=tr"

# Get random card from specific category in Turkish
curl -X GET "http://localhost:3001/api/v1/conversation-cards/random?categories=relationships&language=tr"

# Get multiple random cards from specific categories in Turkish
curl -X GET "http://localhost:3001/api/v1/conversation-cards/random?categories=relationships,self-knowledge&count=3&language=tr"

# Get random cards from multiple categories in English
curl -X GET "http://localhost:3001/api/v1/conversation-cards/random?categories=work,philosophy&count=2&language=en"
```

#### 4. Get Specific Conversation Card
```bash
# Get card in English (default)
curl -X GET http://localhost:3001/api/v1/conversation-cards/CARD_ID_HERE

# Get card in Turkish
curl -X GET "http://localhost:3001/api/v1/conversation-cards/CARD_ID_HERE?language=tr"
```

#### 5. Create New Multilingual Conversation Card
```bash
curl -X POST http://localhost:3001/api/v1/conversation-cards \
  -H "Content-Type: application/json" \
  -d '{
    "question": {
      "en": "What is the most important lesson you learned this year?",
      "tr": "Bu yıl öğrendiğin en önemli ders neydi?"
    },
    "category": "self-knowledge",
    "difficulty": "medium",
    "tags": ["reflection", "growth", "learning"]
  }'
```

#### 6. Update Multilingual Conversation Card
```bash
curl -X PUT http://localhost:3001/api/v1/conversation-cards/CARD_ID_HERE \
  -H "Content-Type: application/json" \
  -d '{
    "question": {
      "en": "What is the most valuable lesson you learned this year?",
      "tr": "Bu yıl öğrendiğin en değerli ders neydi?"
    },
    "difficulty": "hard",
    "tags": ["reflection", "growth", "learning", "wisdom"]
  }'
```

#### 7. Delete Conversation Card
```bash
curl -X DELETE http://localhost:3001/api/v1/conversation-cards/CARD_ID_HERE
```

---

### Voting System

#### 1. Upvote a Card
```bash
curl -X POST http://localhost:3001/api/v1/conversation-cards/CARD_ID_HERE/vote \
  -H "Content-Type: application/json" \
  -d '{
    "voteType": "upvote"
  }'
```

#### 2. Downvote a Card
```bash
curl -X POST http://localhost:3001/api/v1/conversation-cards/CARD_ID_HERE/vote \
  -H "Content-Type: application/json" \
  -d '{
    "voteType": "downvote"
  }'
```

#### 3. Get Vote Statistics
```bash
curl -X GET http://localhost:3001/api/v1/conversation-cards/CARD_ID_HERE/votes
```

---

## 📊 Response Format

All API responses follow this consistent format:

```json
{
  "status": "success" | "error",
  "message": "Human readable message",
  "timestamp": "2024-01-01T12:00:00.000Z",
  "data": {
    // Response data here
  },
  "error": "Error message (only present on errors)"
}
```

### Multilingual Card Response Format
```json
{
  "id": "card_id",
  "question": "Localized question text based on language parameter",
  "category": "category_name",
  "difficulty": "easy|medium|hard",
  "tags": ["array", "of", "tags"],
  "language": "en|tr",
  "createdAt": "ISO timestamp",
  "updatedAt": "ISO timestamp",
  "upvotes": 0,
  "downvotes": 0,
  "totalVotes": 0
}
```

---

## 🔍 Query Parameters

### GET /api/v1/conversation-cards

| Parameter | Type | Description | Default |
|-----------|------|-------------|---------|
| `category` | string | Filter by category (e.g., "relationships", "self-knowledge") | - |
| `difficulty` | string | Filter by difficulty ("easy", "medium", "hard") | - |
| `language` | string | Language for questions ("en", "tr") | "en" |
| `limit` | number | Maximum number of cards to return | 50 |
| `offset` | number | Number of cards to skip (for pagination) | 0 |

### GET /api/v1/conversation-cards/random

| Parameter | Type | Description | Default |
|-----------|------|-------------|---------|
| `categories` | string | Comma-separated list of categories to filter by | - |
| `count` | number | Number of random cards to return (max 10) | 1 |
| `language` | string | Language for questions ("en", "tr") | "en" |

### GET /api/v1/conversation-cards/:cardId

| Parameter | Type | Description | Default |
|-----------|------|-------------|---------|
| `language` | string | Language for question ("en", "tr") | "en" |

**Examples:**
- `categories=relationships` - Single category
- `categories=relationships,self-knowledge,work` - Multiple categories
- `count=3` - Return 3 random cards
- `language=tr` - Return Turkish versions
- `language=en` - Return English versions

---

## 📝 Request Body Schemas

### Create/Update Multilingual Card
```json
{
  "question": {
    "en": "English question text (required)",
    "tr": "Turkish question text (required)"
  },
  "category": "string (required for create)",
  "difficulty": "easy" | "medium" | "hard" (required for create)",
  "tags": ["string", "array", "optional"]
}
```

### Vote on Card
```json
{
  "voteType": "upvote" | "downvote"
}
```

---

## ⚠️ Error Codes

| Status Code | Description |
|-------------|-------------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request (validation error, missing translations) |
| 404 | Not Found |
| 500 | Internal Server Error |

---

## 🧪 Testing Workflow

1. **Start the backend server:**
   ```bash
   cd backend && npm run dev
   ```

2. **Test health endpoint:**
   ```bash
   curl -X GET http://localhost:3001/api/health
   ```

3. **Get category counts:**
   ```bash
   curl -X GET http://localhost:3001/api/v1/conversation-cards/categories/count
   ```

4. **Get random card in English:**
   ```bash
   curl -X GET http://localhost:3001/api/v1/conversation-cards/random
   ```

5. **Get random card in Turkish:**
   ```bash
   curl -X GET "http://localhost:3001/api/v1/conversation-cards/random?language=tr"
   ```

6. **Create a multilingual test card:**
   ```bash
   curl -X POST http://localhost:3001/api/v1/conversation-cards \
     -H "Content-Type: application/json" \
     -d '{
       "question": {
         "en": "What makes you feel most alive?",
         "tr": "Seni en çok yaşıyor hissettiren şey nedir?"
       },
       "category": "self-knowledge",
       "difficulty": "medium",
       "tags": ["passion", "energy", "life"]
     }'
   ```

7. **Get all cards in Turkish:**
   ```bash
   curl -X GET "http://localhost:3001/api/v1/conversation-cards?language=tr"
   ```

8. **Vote on the card (use the ID from step 6):**
   ```bash
   curl -X POST http://localhost:3001/api/v1/conversation-cards/CARD_ID/vote \
     -H "Content-Type: application/json" \
     -d '{"voteType": "upvote"}'
   ```

9. **Check vote statistics:**
   ```bash
   curl -X GET http://localhost:3001/api/v1/conversation-cards/CARD_ID/votes
   ```

---

## 🔥 Firebase Collections

The API uses the following Firestore collections:

- **`conversation-cards`** - Stores all conversation card data
- **`system-tests`** - Used for connection testing

### Multilingual Card Document Structure
```json
{
  "question": {
    "en": "English question text",
    "tr": "Turkish question text"
  },
  "category": "string",
  "difficulty": "easy|medium|hard",
  "tags": ["array", "of", "strings"],
  "createdAt": "ISO timestamp",
  "updatedAt": "ISO timestamp",
  "upvotes": 0,
  "downvotes": 0,
  "totalVotes": 0
}
``` 