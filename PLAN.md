# Valentine's Game - Implementation Plan

## Concept: "Will You Be My Valentine?"

A fun, interactive game where you ask the big question - and **"No" is not an option**. The game progressively makes it harder (and funnier) to click "No" until the player gives in and clicks "Yes", followed by a celebration.

---

## Game Flow (3 Screens)

### Screen 1: The Build-Up
- Pink/red gradient background with **floating hearts** animation (Framer Motion)
- A cute bear emoji holding a rose
- Text: *"I have a very important question for you..."*
- Pulsing **"Continue"** button

### Screen 2: The Question (The Fun Part)
- Big text: **"Will you be my Valentine?"**
- Two buttons: **"Yes"** and **"No"**
- **"No" button behavior** (escalating through attempts):
  1. First hover/click: Button **teleports** to a random position on screen
  2. Button starts **shrinking** with each attempt
  3. Text changes through funny messages: *"Are you sure?"*, *"Think again!"*, *"Please???"*, *"I'll cry..."*, *"Impossible!"*
  4. Button moves **faster** and more erratically
  5. Eventually the "No" button becomes **tiny** (nearly impossible to click)
- **"Yes" button behavior**: Grows **bigger** with each failed "No" attempt, gets a glowing pulse effect
- **Bear emoji** gets progressively sadder with each "No" attempt (happy -> neutral -> sad -> crying)
- **Background** spawns more floating hearts with each attempt

### Screen 3: The Celebration (After "Yes")
- **Hearts/confetti explosion** animation
- Big animated text: *"Yayyy! I knew you'd say yes!"*
- Spinning/bouncing heart emojis
- Sweet closing message: *"You just made me the happiest person in the world"*
- A final **"Send a Kiss"** button that triggers a kiss emoji rain

---

## Files to Create/Modify

### 1. `shared/src/types.ts`
- Add `'valentine'` to the `GameMode` union type

### 2. `shared/src/constants.ts`
- Add valentine entry to `GAME_MODES` array:
  ```ts
  { id: 'valentine', nameKey: 'gameModes.valentine', descKey: 'gameModes.valentineDesc', icon: '💝' }
  ```

### 3. `frontend/components/Valentine.tsx` (NEW)
- Main game component with 3 screens managed by state
- Uses Framer Motion for all animations:
  - `FloatingHearts`: Background animated hearts (random sizes, positions, durations)
  - `ConfettiExplosion`: Burst of hearts on celebration screen
  - Button position tracking via `useState` + random repositioning
- "No" button: `onMouseEnter` and `onClick` handlers that increment attempt counter and reposition
- "Yes" button: `motion.button` with `animate={{ scale }}` growing based on attempts
- Bear emoji array: `['🧸','🐻','😐','😢','😭']` mapped to attempt count
- Responsive: works on both mobile (touch) and desktop (hover)

### 4. `frontend/app/[locale]/page.tsx`
- Import `Valentine` component
- Add conditional render: `{activeGameMode === 'valentine' && <Valentine locale={locale} />}`

### 5. `frontend/public/locales/en/common.json`
- Add `gameModes.valentine` and `gameModes.valentineDesc`
- Add `valentine.*` section with all game text strings

### 6. `frontend/public/locales/tr/common.json`
- Turkish translations for all valentine strings

### 7. `frontend/tailwind.config.ts`
- Add `bg-gradient-valentine` custom utility (pink -> rose -> red gradient)

---

## Animation Details (Framer Motion)

| Element | Animation | Trigger |
|---------|-----------|---------|
| Floating hearts | Float upward with gentle sway, random delay/duration | Always running in background |
| "No" button | `animate={{ x, y }}` with spring physics | Each hover/click attempt |
| "Yes" button | `animate={{ scale }}` growing 1.0 -> 1.5+ | Each "No" attempt |
| Bear emoji | `AnimatePresence` swap with fade | Attempt threshold changes |
| Screen transitions | `AnimatePresence` with slide/fade variants | State changes |
| Celebration confetti | Burst of 30+ heart emojis from center, random trajectories | "Yes" clicked |
| Kiss rain | Hearts falling from top of screen | "Send a Kiss" button |

---

## No Backend Changes Required
This is a purely frontend game - no API calls, no database, no Firebase changes needed.

## Build Verification
After implementation, run `npm run build` from the root to verify the static export works correctly with the new game mode.
