# 🎮 Games Platform

A modern, multilingual conversation card game platform built with Next.js 14 App Router, Firebase Functions, and TypeScript. Create meaningful connections through thoughtfully crafted conversation prompts inspired by The School of Life.

## 🌐 Live Demo

- **🌍 Primary Site**: [games.burakintisah.com](https://games.burakintisah.com)
- **🔥 Firebase Hosting**: [games-123f7.web.app](https://games-123f7.web.app)
- **🔌 API Backend**: [API Endpoints](https://europe-west1-games-123f7.cloudfunctions.net/api/)

## ✨ Features

- 🌍 **Multilingual Support** - English and Turkish with complete translation coverage
- 🎯 **364 Conversation Cards** - Deep, meaningful prompts across 6 categories
- 🎨 **Modern UI** - Beautiful, responsive design with WCAG-compliant gradients
- 🎭 **Smooth Animations** - Card flip effects, stagger animations with Framer Motion
- 🚀 **Server-Side Rendering** - SEO-friendly with Next.js 14 App Router
- 📱 **Mobile-Optimized** - Touch-friendly 2x4 grid layout for mobile devices
- 🎲 **Interactive Gameplay** - Shuffle questions, voting system, difficulty levels
- 🔧 **Type-Safe** - Full TypeScript implementation throughout
- ♿ **Accessible** - WCAG 2.1 AA compliant with 4.5:1+ contrast ratios
- 🔥 **Real-time Backend** - Firebase Functions with Firestore database

## 🏗️ Project Structure

This is a monorepo with the following structure:

```
games/
├── frontend/           # Next.js 14 App Router application
│   ├── app/
│   │   └── [locale]/   # Internationalized routing (en/tr)
│   ├── components/     # Reusable UI components with animations
│   ├── hooks/          # Custom React hooks for API integration
│   ├── lib/            # Utility functions and i18n configuration
│   └── public/
│       └── locales/    # Complete translation files (en/tr)
├── functions/          # Firebase Functions (Express.js API)
│   ├── src/
│   │   ├── routes/     # API route handlers
│   │   └── index.ts    # Main function entry point
├── shared/             # Shared types and utilities
│   ├── src/
│   │   ├── types.ts    # TypeScript interfaces
│   │   └── data/       # Conversation card data
└── scripts/            # Utility scripts and generators
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Firebase CLI (for deployment)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/burakintisah/games.git
   cd games
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Build shared package**
   ```bash
   cd shared && npm run build
   ```

4. **Start frontend development**
   ```bash
   cd frontend && npm run dev
   ```

5. **Open your browser**
   ```
   http://localhost:3000
   ```

### Firebase Functions Development (Optional)

```bash
cd functions
npm run build
firebase emulators:start
```

## 🌍 Internationalization (i18n)

The platform supports multiple languages with server-side rendering:

- **English** (`/en`) - Default language
- **Turkish** (`/tr`) - Complete translation coverage

### Translation Coverage
- ✅ Navigation and UI elements
- ✅ Game mode descriptions  
- ✅ Deck names and descriptions
- ✅ Error messages and feedback
- ✅ All conversation card content (364 cards)

### Adding New Languages

1. Create translation files:
   ```
   frontend/public/locales/[language]/common.json
   ```

2. Update language configuration in `frontend/lib/i18n.ts`

3. Add language to supported languages list

For detailed i18n implementation, see [README-i18n.md](frontend/README-i18n.md).

## 🎮 Game Features

### Conversation Cards
Deep, meaningful conversation prompts designed to:
- Build stronger relationships and connections
- Explore personal values and experiences  
- Create memorable and meaningful moments
- Break the ice in social and professional situations

### Available Decks (364 Total Cards)
- **💕 Relationships** (70 cards) - Love, friendship, and human connections
- **🧠 Self-Knowledge** (58 cards) - Personal growth and self-reflection
- **💼 Work & Purpose** (62 cards) - Career, ambition, and life purpose
- **🎭 Culture & Society** (58 cards) - Art, society, and human culture
- **🤔 Philosophy** (58 cards) - Existence, meaning, and deep thinking
- **🧸 Childhood & Memory** (58 cards) - Past experiences and formative moments

### Game Modes
- **📚 Deck Mode** - Explore specific categories
- **🎲 Shuffle Mode** - Random questions from all categories
- **👍 Voting System** - Rate question quality
- **📱 Mobile-Optimized** - Touch-friendly interface

### Difficulty Levels
- **🟢 Easy** - Light conversation starters
- **🟡 Medium** - Thoughtful discussion topics
- **🔴 Hard** - Deep, introspective questions

## 🛠️ Development

### Frontend (Next.js 14)
```bash
cd frontend
npm run dev     # Development server (http://localhost:3000)
npm run build   # Production build
npm run start   # Production server
npm run lint    # ESLint
```

### Firebase Functions
```bash
cd functions
npm run build   # Build TypeScript
npm run serve   # Local emulator
```

### Shared Package
```bash
cd shared
npm run build   # Build shared types and data
```

### Project Scripts
```bash
npm run dev              # Start frontend development
npm run build            # Build all packages
npm run build:shared     # Build shared package
npm run build:frontend   # Build frontend
npm run build:functions  # Build Firebase Functions
```

## 🏗️ Tech Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom WCAG-compliant gradients
- **Animations**: Framer Motion (card flips, stagger effects)
- **UI Components**: Radix UI + Lucide React
- **Internationalization**: react-i18next with SSR support
- **State Management**: Custom hooks with API integration

### Backend
- **Platform**: Firebase Functions (Node.js 18)
- **Language**: TypeScript
- **Framework**: Express.js
- **Database**: Firestore (364 conversation cards)
- **API**: RESTful with comprehensive endpoints
- **Region**: Europe West 1

### Development Tools
- **Linting**: ESLint with TypeScript rules
- **Package Manager**: npm workspaces
- **Version Control**: Git
- **Deployment**: Firebase CLI
- **Build System**: TypeScript compiler

## 🔌 API Endpoints

The Firebase Functions backend provides a comprehensive REST API:

### Core Endpoints
- `GET /health` - Health check
- `GET /v1/conversation-cards` - Get all cards with filtering
- `GET /v1/conversation-cards/random` - Get random card(s)
- `GET /v1/conversation-cards/categories/count` - Category statistics
- `POST /v1/conversation-cards/:id/vote` - Vote on cards
- `GET /v1/conversation-cards/:id/votes` - Get vote statistics

### Features
- **Filtering**: By category, difficulty, language
- **Pagination**: Limit and offset support
- **Voting System**: Upvote/downvote with statistics
- **Multilingual**: English and Turkish support
- **Error Handling**: Comprehensive error responses

## 📁 Key Directories

- `frontend/app/[locale]/` - Internationalized pages with SSR
- `frontend/components/` - Reusable UI components with animations
- `frontend/hooks/` - Custom hooks for API integration
- `frontend/public/locales/` - Complete translation files
- `functions/src/routes/` - API route handlers
- `shared/src/` - Shared types and conversation card data

## 🚀 Deployment

### CI/CD (GitHub Actions)

Pushing to `main` automatically triggers a full build and deploy pipeline via GitHub Actions:

1. Installs dependencies
2. Builds packages in order: `shared` → `frontend` → `functions`
3. Runs ESLint on frontend
4. Deploys Cloud Functions and Hosting to Firebase

**Required secret:** `FIREBASE_SERVICE_ACCOUNT_GAMES_123F7` — a Firebase service account JSON key stored in GitHub repo Settings → Secrets → Actions.

### Manual Deployment

```bash
# Build shared package
cd shared && npm run build

# Build and deploy frontend
cd frontend && npm run build
firebase deploy --only hosting

# Build and deploy functions
cd functions && npm run build
firebase deploy --only functions
```

### Live URLs
- **Primary Domain**: https://games.burakintisah.com
- **Firebase Hosting**: https://games-123f7.web.app
- **API Backend**: https://europe-west1-games-123f7.cloudfunctions.net/api/

### Environment
- **Frontend**: Firebase Hosting with CDN
- **Backend**: Firebase Functions (Europe West 1)
- **Database**: Firestore with 364 conversation cards
- **Domain**: Custom domain with SSL

## 🎯 Performance & Accessibility

### Performance
- ✅ **Optimized Build**: Next.js static generation
- ✅ **CDN Delivery**: Firebase Hosting global CDN
- ✅ **Bundle Optimization**: Tree shaking and code splitting
- ✅ **Image Optimization**: Next.js automatic optimization

### Accessibility
- ✅ **WCAG 2.1 AA Compliant**: 4.5:1+ contrast ratios
- ✅ **Responsive Design**: Mobile-first approach
- ✅ **Semantic HTML**: Proper heading structure
- ✅ **Keyboard Navigation**: Full keyboard accessibility
- ✅ **Screen Reader Support**: ARIA labels and descriptions

## 🔮 Future Enhancements

### High Priority
- [ ] **Dark Mode** - System-wide theme toggle
- [ ] **Card Favorites** - Save favorite questions
- [ ] **Progressive Web App** - App-like experience

### Advanced Features
- [ ] **Game Sessions** - Track conversation progress
- [ ] **Social Sharing** - Share questions via URL
- [ ] **Custom Card Sets** - User-generated content
- [ ] **Analytics Dashboard** - Usage statistics
- [ ] **More Languages** - Spanish, French, German

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Use Framer Motion for all animations
- Maintain WCAG accessibility standards
- Add translations for new UI elements
- Test on mobile devices

## 📝 License

This project is private and proprietary.

## 👨‍💻 Author

**Burak Intisah**
- GitHub: [@burakintisah](https://github.com/burakintisah)
- Website: [burakintisah.com](https://burakintisah.com)

---

Built with ❤️ for meaningful conversations and human connections.

*Inspired by The School of Life conversation cards - bringing people together through thoughtful dialogue.* 