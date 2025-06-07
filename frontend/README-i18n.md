# Next.js 13+ App Router i18n Implementation

This project has been successfully migrated from manual translation objects to a proper i18n setup using `react-i18next` with Next.js 13+ App Router.

## 🚀 What Was Achieved

✅ **Proper i18n Implementation**: Replaced manual translation objects with `react-i18next`  
✅ **Server-Side Rendering**: Translations are rendered on the server for SEO  
✅ **Client-Side Hydration**: Smooth client-side language switching  
✅ **Centralized Translations**: All translations in JSON files  
✅ **Type Safety**: Full TypeScript support  
✅ **App Router Compatible**: Works with Next.js 13+ App Router  

## 📁 Project Structure

```
frontend/
├── app/
│   ├── [locale]/
│   │   ├── layout.tsx          # Server-side metadata generation
│   │   └── page.tsx            # Main page with server-side translations
│   └── globals.css
├── components/
│   ├── ClientPageWrapper.tsx   # Client-side state management
│   ├── Navigation.tsx          # Updated with useClientTranslation
│   ├── DeckCard.tsx           # Updated with useClientTranslation
│   └── QuestionModal.tsx      # Updated with useClientTranslation
├── hooks/
│   └── useClientTranslation.ts # Client-side translation hook
├── lib/
│   └── i18n.ts                # Server-side translation utilities
└── public/
    └── locales/
        ├── en/
        │   └── common.json     # English translations
        └── tr/
            └── common.json     # Turkish translations
```

## 🔧 Key Components

### 1. Server-Side Translations (`lib/i18n.ts`)

```typescript
import { getTranslation } from '../../lib/i18n';

// In server components
export default async function Page({ params: { locale } }) {
  const { t } = await getTranslation(locale);
  
  return (
    <h1>{t('gameModes.conversationCards')}</h1>
  );
}
```

### 2. Client-Side Translations (`hooks/useClientTranslation.ts`)

```typescript
import { useClientTranslation } from '../hooks/useClientTranslation';

// In client components
export function MyComponent({ locale }) {
  const { t } = useClientTranslation(locale);
  
  return (
    <button>{t('ui.newQuestion')}</button>
  );
}
```

### 3. Translation Files Structure

```json
{
  "navigation": {
    "games": "Games",
    "byAuthor": "by Burak Intisah",
    "shuffle": "Shuffle"
  },
  "gameModes": {
    "conversationCards": "Conversation Cards",
    "conversationCardsDesc": "Deep, meaningful conversations"
  },
  "decks": {
    "relationships": {
      "name": "Relationships",
      "description": "Explore connections, love, and human bonds"
    }
  },
  "ui": {
    "cards": "cards",
    "tapToExplore": "Tap to explore",
    "newQuestion": "New Question",
    "difficulty": {
      "easy": "Easy",
      "medium": "Medium",
      "hard": "Hard"
    }
  }
}
```

## 🌍 Supported Languages

- **English** (`en`) - Default language
- **Turkish** (`tr`) - Secondary language

## 📝 Usage Examples

### Adding New Translations

1. **Add to JSON files**:
```json
// public/locales/en/common.json
{
  "newSection": {
    "title": "New Feature",
    "description": "This is a new feature"
  }
}

// public/locales/tr/common.json
{
  "newSection": {
    "title": "Yeni Özellik", 
    "description": "Bu yeni bir özellik"
  }
}
```

2. **Use in components**:
```typescript
// Server component
const { t } = await getTranslation(locale);
return <h1>{t('newSection.title')}</h1>;

// Client component  
const { t } = useClientTranslation(locale);
return <h1>{t('newSection.title')}</h1>;
```

### Adding New Languages

1. **Create translation files**:
```
public/locales/fr/common.json
public/locales/de/common.json
```

2. **Update language configuration**:
```typescript
// lib/i18n.ts
export const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
];
```

3. **Update i18n configuration**:
```typescript
// Both lib/i18n.ts and hooks/useClientTranslation.ts
supportedLngs: ['en', 'tr', 'fr', 'de'],
```

## 🔄 Migration Summary

### Before (Manual Translation Objects)
```typescript
const translations = {
  en: { title: "Games" },
  tr: { title: "Oyunlar" }
};
const t = translations[locale] || translations.en;
return <h1>{t.title}</h1>;
```

### After (Proper i18n)
```typescript
// Server component
const { t } = await getTranslation(locale);
return <h1>{t('navigation.games')}</h1>;

// Client component
const { t } = useClientTranslation(locale);
return <h1>{t('navigation.games')}</h1>;
```

## 🚀 Benefits

1. **SEO-Friendly**: Server-side rendering of translations
2. **Performance**: Efficient loading and caching of translation resources
3. **Maintainability**: Centralized translation management
4. **Scalability**: Easy to add new languages and translations
5. **Type Safety**: Full TypeScript support with proper typing
6. **Developer Experience**: Clear separation between server and client translations

## 🛠 Development Commands

```bash
# Install dependencies
npm install

# Development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 📚 Key Files Changed

- ✅ `package.json` - Updated dependencies
- ✅ `lib/i18n.ts` - Server-side translation utilities
- ✅ `hooks/useClientTranslation.ts` - Client-side translation hook
- ✅ `app/[locale]/layout.tsx` - Server-side metadata with translations
- ✅ `app/[locale]/page.tsx` - Server component with translations
- ✅ `components/ClientPageWrapper.tsx` - Client-side state management
- ✅ `components/Navigation.tsx` - Updated to use client translations
- ✅ `components/DeckCard.tsx` - Updated to use client translations
- ✅ `components/QuestionModal.tsx` - Updated to use client translations
- ✅ `public/locales/*/common.json` - Enhanced translation files

## 🎯 Next Steps

1. **Add more languages** as needed
2. **Create namespace-specific translation files** for larger applications
3. **Implement translation validation** in CI/CD pipeline
4. **Add translation management tools** for non-technical team members
5. **Consider lazy loading** of translation resources for performance optimization

---

**Note**: This implementation is specifically designed for Next.js 13+ App Router. The traditional `next-i18next` library does not support App Router, which is why we use `react-i18next` directly with custom server and client-side utilities. 