# CLAUDE.md

This file provides guidance for AI assistants working with this codebase.

## Project Overview

A multilingual conversation card game platform built as an npm workspaces monorepo. Users browse 364+ conversation cards across 6 categories (Relationships, Self-Knowledge, Work, Culture, Philosophy, Childhood) in English and Turkish, with voting, difficulty levels, and shuffle mode.

**Live site:** games.burakintisah.com

## Repository Structure

```
games/
├── frontend/          # Next.js 14 App Router (UI)
├── functions/         # Firebase Cloud Functions (REST API via Express)
├── shared/            # Shared TypeScript types, constants, and card data
├── scripts/           # Utility scripts (question generator)
├── firebase.json      # Firebase project config
├── firestore.rules    # Firestore security rules
└── firestore.indexes.json
```

### Workspace packages

| Package | Purpose | Entry point |
|---------|---------|-------------|
| `frontend` | Next.js 14 static-export app with Tailwind CSS, Framer Motion, i18next | `app/[locale]/page.tsx` |
| `functions` | Express API on Firebase Functions (europe-west1) | `src/index.ts` |
| `shared` | Types (`ConversationCard`, `MultilingualText`), constants, question data | `src/index.ts` → `dist/index.js` |

## Common Commands

### Development

```bash
npm run dev                # Start frontend dev server (localhost:3000)
npm run dev:frontend       # Same as above
npm run dev:functions      # Start Firebase emulator for functions
```

### Build

```bash
npm run build              # Build all packages (shared → frontend → functions)
npm run build:shared       # Compile shared types to dist/
npm run build:frontend     # Next.js production build (static export)
npm run build:functions    # Compile functions to lib/
```

### Lint

```bash
cd frontend && npm run lint   # ESLint with next/core-web-vitals rules
```

### Deploy

```bash
npm run deploy             # Full build + deploy functions + deploy frontend
npm run deploy:functions   # Deploy Cloud Functions only
npm run deploy:frontend    # Deploy frontend hosting only
```

**Build order matters:** shared must be built before frontend and functions, since both depend on its compiled output.

## Architecture

### Frontend (`frontend/`)

- **Framework:** Next.js 14 with App Router and static export (`output: 'export'` in next.config.js)
- **Styling:** Tailwind CSS 3 with custom WCAG-compliant gradient themes in `tailwind.config.ts`
- **Animations:** Framer Motion (card flips, stagger effects, spring physics)
- **i18n:** react-i18next with SSR support. Server components use `getTranslation(locale)` from `lib/i18n.ts`; client components use `useClientTranslation(locale)` hook
- **Translations:** JSON files in `public/locales/{en,tr}/common.json`
- **UI components:** Radix UI primitives + custom components in `components/ui/`
- **API client:** Class-based `ConversationCardsAPI` in `lib/api.ts` with typed responses

Key directories:
- `app/[locale]/` — Locale-parameterized pages (main game page, layout with metadata)
- `app/admin/` — Admin panel for card management
- `components/` — React components (DeckCard, QuestionModal, Navigation, etc.)
- `hooks/` — Custom hooks (`useConversationCards`, `useClientTranslation`)
- `lib/` — Utilities (API client, i18n helpers, cn utility)

### Backend (`functions/`)

- **Runtime:** Node.js 20 on Firebase Functions
- **Framework:** Express 4.18 with Helmet security headers and CORS
- **Database:** Firestore (collection: `conversation-cards`)
- **Region:** europe-west1

API routes in `src/routes/conversationCards.ts`:
- `GET /` — List cards with filtering and pagination
- `GET /categories/count` — Category statistics
- `GET /random` — Random cards with optional category filter
- `GET /admin` — Raw multilingual data for admin panel
- `GET /:cardId` — Single card
- `GET /:cardId/votes` — Vote statistics
- `POST /` — Create card (multilingual validation)
- `POST /:cardId/vote` — Upvote/downvote
- `PUT /:cardId` — Update card
- `DELETE /:cardId` — Delete card

All responses follow format: `{ status, message, data?, timestamp }`

### Shared (`shared/`)

- `types.ts` — `ConversationCard`, `ConversationDeck`, `MultilingualText`, `DifficultyLevel`, `SupportedLanguage`
- `constants.ts` — `SUPPORTED_LANGUAGES` (en, tr with flags), `GAME_MODES`, `API_ENDPOINTS`
- `data/questions.ts` — `CONVERSATION_DECKS` array with 364+ cards across 6 categories

## Code Conventions

### TypeScript

- All packages use `strict: true`
- Frontend: ES5 target, bundler module resolution, path alias `@/*` → `./`
- Functions: ES2017 target, NodeNext modules, `noUnusedLocals` and `noImplicitReturns` enabled
- Shared: ES2020 target, CommonJS output with declaration files

### React / Next.js

- Client components must have `"use client"` directive at the top
- Component props defined via `interface ComponentNameProps {}`
- Custom hooks follow `useXxx` naming pattern
- Framer Motion animation variants defined at the top of component files

### Styling

- Tailwind utility classes preferred over custom CSS
- 6 deck-specific gradient themes defined in `tailwind.config.ts` (WCAG AA compliant)
- Responsive: mobile-first with `md:` and `lg:` breakpoints

### i18n

- Translation keys are nested: `decks.relationships.name`, `ui.shuffle`, etc.
- Multilingual card data uses `{ en: string, tr: string }` structure (`MultilingualText` type)
- Server components: `const { t } = await getTranslation(locale)`
- Client components: `const { t } = useClientTranslation(locale)`

### API patterns

- Backend: async Express route handlers with try-catch, consistent JSON response format
- Frontend: singleton `conversationCardsAPI` instance, generic `ApiResponse<T>` wrapper
- Helper object `apiHelpers` provides shorthand methods for common operations

## Testing

No test framework is currently configured. The project has no test files or test runner setup. This is listed as a future enhancement.

## Deployment

- **Frontend hosting:** Firebase Hosting (also configured for Vercel/Netlify via CORS)
- **Functions:** Firebase Functions (predeploy runs `npm run build` automatically)
- **Database:** Firestore with rules in `firestore.rules` (public read, authenticated write on `conversation-cards`)
- **Firebase project:** `games-123f7`

## Key Files for Common Tasks

| Task | Files |
|------|-------|
| Add a new card category | `shared/src/data/questions.ts`, `shared/src/types.ts`, `frontend/public/locales/*/common.json`, `frontend/tailwind.config.ts` (gradient) |
| Add a new language | `shared/src/types.ts` (`SupportedLanguage`), `shared/src/constants.ts`, `frontend/public/locales/{lang}/common.json`, `frontend/lib/i18n.ts` |
| Add a new API endpoint | `functions/src/routes/conversationCards.ts`, `frontend/lib/api.ts` |
| Modify card UI | `frontend/components/DeckCard.tsx`, `frontend/components/QuestionModal.tsx` |
| Change navigation | `frontend/components/Navigation.tsx` |
| Update Firestore rules | `firestore.rules` |
| Update Firestore indexes | `firestore.indexes.json` |
