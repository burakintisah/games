# Question Generator Scripts

This directory contains scripts to help manage conversation cards for the games platform.

## Question Generator (`question-generator.js`)

A generic script to easily add multiple questions to the database with proper validation and error handling.

### Features

- ✅ **Validation**: Validates all questions before sending to API
- 🌍 **Multilingual**: Requires both English and Turkish translations
- 📊 **Progress Tracking**: Shows real-time progress and summary
- 🔄 **Error Handling**: Graceful error handling with detailed messages
- ⏱️ **Rate Limiting**: Built-in delays to avoid overwhelming the API
- 📝 **Examples**: Includes examples for all 6 categories

### Usage

1. **Edit the questions**: Open `question-generator.js` and modify the `QUESTIONS` array
2. **Run the script**: Execute from the project root:
   ```bash
   node scripts/question-generator.js
   ```

### Question Format

Each question must follow this structure:

```javascript
{
  question: {
    en: "English question text",
    tr: "Turkish question text"
  },
  category: "relationships", // or self-knowledge, work, culture, philosophy, childhood
  difficulty: "medium",      // easy, medium, or hard
  tags: ["tag1", "tag2"]     // optional array of tags
}
```

### Categories

- **relationships** - Questions about friendships, family, romantic relationships
- **self-knowledge** - Questions about personal growth, self-awareness, identity
- **work** - Questions about career, professional life, ambitions
- **culture** - Questions about traditions, heritage, cultural identity
- **philosophy** - Questions about life's big questions, beliefs, values
- **childhood** - Questions about memories, formative experiences, growing up

### Difficulty Levels

- **easy** - Light, accessible questions suitable for any conversation
- **medium** - Deeper questions that require some reflection
- **hard** - Profound, vulnerable questions for intimate conversations

### Example Output

```
🚀 Starting Question Generator...

📋 Validating questions...
✅ All 18 questions are valid!

🔗 Testing API connection...
✅ API connection successful!

📝 Adding questions to database...

   1/18 Adding: "What's the most important quality you look for in a..."
   ✅ Success! ID: abc123

   2/18 Adding: "How do you handle conflicts in your relationships?"
   ✅ Success! ID: def456

   ...

📊 Summary:
   ✅ Successfully added: 18 questions
   ❌ Failed to add: 0 questions
   📝 Total processed: 18 questions

🎉 Questions have been added to the database!
```

### Adding Your Own Questions

1. **Copy the format**: Use the existing examples as templates
2. **Add translations**: Ensure both English and Turkish versions are provided
3. **Choose appropriate category and difficulty**: Match the content to the right category
4. **Add relevant tags**: Help with filtering and organization
5. **Test locally**: Run the script to validate before adding many questions

### Tips

- **Quality over quantity**: Focus on meaningful, thought-provoking questions
- **Cultural sensitivity**: Ensure questions work well in both English and Turkish contexts
- **Variety**: Mix different difficulty levels and topics within each category
- **Clear language**: Use simple, clear language that's easy to understand
- **Avoid duplicates**: Check existing questions in the admin panel first

### Troubleshooting

**API Connection Failed**
- Ensure Firebase Functions are deployed and running
- Check the API_BASE_URL in the script matches your deployment

**Validation Errors**
- Check that all required fields are present
- Ensure categories and difficulties match the allowed values
- Verify both English and Turkish translations are provided

**Rate Limiting**
- The script includes 500ms delays between requests
- If you get rate limit errors, increase the delay in the script

### Related Files

- `frontend/app/admin/page.tsx` - Admin panel to view and manage questions
- `functions/src/routes/conversationCards.ts` - Backend API endpoints
- `shared/src/types.ts` - TypeScript type definitions 