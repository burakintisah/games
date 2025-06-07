# 🎮 Games Platform

A modern, multilingual conversation card game platform built with Next.js 13+ App Router and TypeScript. Create meaningful connections through thoughtfully crafted conversation prompts.

## ✨ Features

- 🌍 **Multilingual Support** - English and Turkish with easy expansion to more languages
- 🎯 **Conversation Cards** - Deep, meaningful conversation prompts across different topics
- 🎨 **Modern UI** - Beautiful, responsive design with Tailwind CSS and Framer Motion
- 🚀 **Server-Side Rendering** - SEO-friendly with Next.js App Router
- 📱 **Mobile-First** - Optimized for all device sizes
- 🎲 **Interactive Gameplay** - Shuffle questions, difficulty levels, and smooth animations
- 🔧 **Type-Safe** - Full TypeScript implementation

## 🏗️ Project Structure

This is a monorepo with the following structure:

```
games/
├── frontend/           # Next.js 13+ App Router application
│   ├── app/
│   │   └── [locale]/   # Internationalized routing
│   ├── components/     # Reusable UI components
│   ├── hooks/          # Custom React hooks
│   ├── lib/            # Utility functions and configurations
│   └── public/
│       └── locales/    # Translation files
├── backend/            # Backend API (Node.js/TypeScript)
├── shared/             # Shared types and utilities
└── package.json        # Workspace configuration
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

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

3. **Start development servers**
   ```bash
   # Start both frontend and backend
   npm run dev
   
   # Or start individually
   npm run dev:frontend  # Frontend only (http://localhost:3000)
   npm run dev:backend   # Backend only
   ```

4. **Open your browser**
   ```
   http://localhost:3000
   ```

## 🌍 Internationalization (i18n)

The platform supports multiple languages with server-side rendering:

- **English** (`/en`) - Default language
- **Turkish** (`/tr`) - Secondary language

### Adding New Languages

1. Create translation files:
   ```
   frontend/public/locales/[language]/common.json
   ```

2. Update language configuration in `frontend/lib/i18n.ts`

3. Add language to supported languages list

For detailed i18n implementation, see [README-i18n.md](frontend/README-i18n.md).

## 🎮 Game Modes

### Conversation Cards
Deep, meaningful conversation prompts designed to:
- Build stronger relationships
- Explore personal values and experiences  
- Create memorable moments
- Break the ice in social situations

**Available Decks:**
- **Relationships** - Explore connections, love, and human bonds
- **Personal Growth** - Self-reflection and development questions
- **Fun & Light** - Entertaining conversation starters

## 🛠️ Development

### Frontend (Next.js)
```bash
cd frontend
npm run dev     # Development server
npm run build   # Production build
npm run start   # Production server
npm run lint    # ESLint
```

### Backend (Node.js)
```bash
cd backend
npm run dev     # Development server
npm run build   # Production build
```

### Project Scripts
```bash
npm run dev              # Start all services
npm run build            # Build all packages
npm run dev:frontend     # Frontend only
npm run dev:backend      # Backend only
npm run build:frontend   # Build frontend
npm run build:backend    # Build backend
```

## 🏗️ Tech Stack

### Frontend
- **Framework**: Next.js 13+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **UI Components**: Radix UI
- **Internationalization**: react-i18next
- **Icons**: Lucide React

### Backend
- **Runtime**: Node.js
- **Language**: TypeScript
- **Framework**: Express.js (planned)

### Development Tools
- **Linting**: ESLint
- **Package Manager**: npm workspaces
- **Version Control**: Git

## 📁 Key Directories

- `frontend/app/[locale]/` - Internationalized pages
- `frontend/components/` - Reusable UI components
- `frontend/public/locales/` - Translation files
- `frontend/lib/i18n.ts` - Internationalization configuration
- `shared/` - Shared types and utilities between frontend/backend

## 🚀 Deployment

### Frontend (Vercel - Recommended)
```bash
cd frontend
npm run build
```

### Backend (Node.js hosting)
```bash
cd backend  
npm run build
npm start
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is private and proprietary.

## 👨‍💻 Author

**Burak Intisah**
- GitHub: [@burakintisah](https://github.com/burakintisah)

---

Built with ❤️ for meaningful conversations and human connections. 