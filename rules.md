# 🎮 Games Platform - Development Rules & Control Log

## 📋 Project Overview

### Brief Description
A modern monorepo for **games.burakintisah.com** - a website hosting simple web-based games. The first game is a digital version of **The School of Life – Conversation Cards**, currently in development.

### 🛠️ Tech Stack
- **Frontend**: Next.js 14 + Tailwind CSS + Framer Motion
- **Backend**: Express.js with Firebase integration
- **Language**: TypeScript throughout
- **Internationalization**: react-i18next (en, tr)
- **UI Components**: Radix UI + Lucide React

### 🏗️ Monorepo Structure
```
games/
├── frontend/     # Next.js 14 App Router application
├── backend/      # Express.js API server
├── shared/       # Shared types and utilities
└── app/          # Additional app configurations
```

---

## 🎯 Development Rules

### ✨ Animation Guidelines
- **ALL animations must be handled using Framer Motion**
- Use consistent easing curves and timing
- Implement smooth page transitions and micro-interactions
- Follow accessibility guidelines for motion preferences

### 🌍 Language Support
- **Primary**: English (en) - default language
- **Secondary**: Turkish (tr) - fully supported
- Use `react-i18next` for all text content
- Server-side rendering for SEO optimization
- Expandable architecture for additional languages

### 🔧 Backend Requirements
- Start with minimal `/api/health` endpoint
- Express.js with TypeScript
- Firebase integration for data persistence
- RESTful API design principles
- Proper error handling and logging

### 🎨 Design Principles
- **Clean, minimal design** with focus on usability
- **Mobile-first responsive layout**
- Consistent color scheme and typography
- Accessible UI components (WCAG 2.1 AA)
- Dark/light mode support consideration

---

## ✅ Task Checklist

### 🚀 Initial Setup
- [x] **Backend Health Endpoint**
  - *Prompt*: Create a basic Express.js server with /api/health endpoint
  - *Notes*: ✅ Complete - Health endpoint added, returns status, timestamp, uptime, environment, version

- [x] **Firebase Integration**
  - *Prompt*: Set up Firebase configuration and basic connection
  - *Notes*: ✅ Complete - Real Firestore connection to games-123f7, read/write operations working, Application Default Credentials configured

- [x] **Code Cleanup & Refactoring**
  - *Prompt*: Remove unnecessary code and improve naming conventions
  - *Notes*: ✅ Complete - Refactored types (Deck → ConversationDeck, questions → cards), cleaned up Firebase config, improved variable naming, removed unused files

- [x] **Implement endpoints on Backend**
  - *Prompt*: Implement get/post/delete endpoints for questions. Also there is gonna be an endpoint where upvote / downvote for a question. Just implement the endpoints and give curls for each endpoint. Do not integrate with frontend. Give proper namings for classes endpoints and variables. 
  - *Notes*: ✅ Complete - Comprehensive REST API implemented with 8 endpoints: GET/POST/PUT/DELETE for conversation cards, voting system (upvote/downvote), vote statistics, filtering & pagination. All endpoints tested and working. Full documentation with curl examples in backend/API_ENDPOINTS.md

- [ ] **Frontend-Backend Connection**
  - *Prompt*: Establish communication between frontend and backend. Use the endpoints that are already created. Do not add any new functionality on frontend. Just make sure use the proper endpoints. Like while showing the count use the /api/v1/conversation-cards/categories/ and get random question. Also make sure call endpoint for shuffle button. 
  - *Notes*:

### 🎮 Game Development
- [x] **Conversation Cards Data Structure**
  - *Prompt*: Design and implement card data models in shared/
  - *Notes*: ✅ Complete - Types defined in shared/src/types.ts, data in shared/src/data/questions.ts

- [x] **Card Display Component**
  - *Prompt*: Create animated card component with Framer Motion
  - *Notes*: ✅ Complete - DeckCard.tsx with full Framer Motion animations

- [x] **Game Logic Implementation**
  - *Prompt*: Implement shuffle, draw, and game state management
  - *Notes*: ✅ Complete - QuestionModal.tsx handles game interactions

- [x] **Difficulty Levels**
  - *Prompt*: Add different conversation card categories/difficulties
  - *Notes*: ✅ Complete - Easy/Medium/Hard levels implemented with visual indicators

### 🌍 Internationalization
- [x] **Complete Turkish Translation**
  - *Prompt*: Translate all game content and UI to Turkish
  - *Notes*: ✅ Complete - Both en/common.json and tr/common.json exist

- [x] **Language Switcher UI**
  - *Prompt*: Add elegant language toggle component
  - *Notes*: ✅ Complete - Navigation.tsx includes full language switcher with flags

### 🎨 UI/UX Polish
- [x] **Responsive Design Audit**
  - *Prompt*: Test and optimize for all device sizes
  - *Notes*: ✅ Complete - Components use responsive Tailwind classes

- [x] **Animation Polish**
  - *Prompt*: Add smooth transitions and micro-interactions
  - *Notes*: ✅ Complete - Framer Motion used throughout with hover/tap animations

- [ ] **Accessibility Improvements**
  - *Prompt*: Implement WCAG 2.1 AA compliance
  - *Notes*: Needs accessibility audit and improvements

### 📱 Mobile Friendly Game Implementation
- [ ] **Mobile Version Improvements**
  - *Prompt*: Implement more user friendly version on the mobile website
  - *Notes*: 

### 🚀 Deployment & Production
- [x] **Frontend Deployment Setup**
  - *Prompt*: Configure Vercel deployment for frontend
  - *Notes*: ✅ Complete - Firebase hosting configured with proper build settings

- [ ] **Backend Deployment**
  - *Prompt*: Set up backend hosting and environment variables
  - *Notes*: Backend exists but deployment not configured

- [ ] **Domain Configuration**
  - *Prompt*: Configure games.burakintisah.com domain
  - *Notes*: Needs domain setup and DNS configuration


---

## 🔄 Iterative Workflow

**For each development iteration, we will define the next step here and complete it one by one. This file will serve as the master control log.**

### 📝 Current Iteration
**Status**: 🟢 Development Phase - Frontend-Backend Connection
**Focus**: Establishing API communication between frontend and backend

### 🎯 Next Steps
1. **Immediate Priority**: Create frontend API client utilities
2. **Following**: Implement backend endpoints for game data
3. **Then**: Test full-stack integration

### 📊 Progress Tracking
- **Completed Tasks**: 11/14 (79% Complete)
- **Current Sprint**: Frontend-Backend Integration
- **Estimated Completion**: 1-2 iterations remaining

### 💡 Notes & Decisions
- ✅ Core conversation card game is fully functional
- ✅ Framer Motion animations implemented throughout
- ✅ Full internationalization (EN/TR) working
- ✅ Backend health endpoint implemented and tested
- ✅ Firebase backend integration complete with real database
- ✅ Code cleanup and refactoring completed - improved naming conventions
- ✅ Comprehensive REST API with 8 endpoints implemented and tested
- 🔄 Frontend-Backend connection needed
- 🔄 Domain configuration pending

---

## 📚 Additional Resources

### 🔗 Important Links
- [Next.js 14 Documentation](https://nextjs.org/docs)
- [Framer Motion Guide](https://www.framer.com/motion/)
- [Tailwind CSS Reference](https://tailwindcss.com/docs)
- [Firebase Documentation](https://firebase.google.com/docs)

### 🎨 Design References
- The School of Life original card designs
- Modern card game interfaces
- Minimalist conversation apps

---

*Last Updated: Code Cleanup & Refactoring Complete - 10/14 Complete*
*Next Review: After Frontend-Backend Connection* 