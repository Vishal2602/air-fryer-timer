# Air Fryer Timer - Project Plan

## Overview

A web-based React app that helps users cook with their air fryer. User inputs what they're cooking, gets cooking times, temperature, and step-by-step instructions including when to flip/shake, with voice alerts for hands-free cooking.

---

## Core Features

### 1. Food Selection & Search
- Searchable list of common air fryer foods
- Categories: proteins, vegetables, frozen foods, snacks
- Quick-select popular items (fries, chicken wings, salmon, etc.)

### 2. Cooking Database
Pre-populated cooking times and instructions for:
- **Proteins**: chicken breast, chicken wings, salmon, shrimp, steak, pork chops, bacon
- **Vegetables**: broccoli, brussels sprouts, asparagus, zucchini, cauliflower, sweet potato
- **Frozen Foods**: frozen fries, frozen nuggets, frozen fish sticks, pizza rolls, mozzarella sticks
- **Snacks**: tater tots, egg rolls, spring rolls

Each entry includes:
- Cook time (in minutes)
- Temperature (Fahrenheit)
- Flip/shake intervals
- Prep notes (preheat, oil spray, etc.)
- Step-by-step cooking instructions

### 3. Timer Functionality
- Countdown timer with large, readable display
- Visual progress indicator (progress bar/circle)
- Pause/resume capability
- Reset option
- Time remaining prominently displayed

### 4. Mid-Cook Instructions & Alerts
- Notifications when it's time to flip or shake
- "Halfway done" alerts
- Alert sounds + visual indicators
- Current instruction step highlighted
- Tips for better results

### 5. Voice Alerts
- Browser Speech Synthesis API for voice notifications
- Announces: "Time to flip your chicken wings"
- Announces: "5 minutes remaining"
- Announces: "Shake the basket"
- Announces: "Your food is ready!"
- Toggle on/off + volume control

---

## User Flow

1. User opens app
2. Searches or browses for food item
3. Selects food → sees cook time, temp, and full instructions
4. Hits "Start Cooking"
5. Timer counts down with current step displayed
6. Gets alerts (voice + visual) at flip/shake points
7. Final alert when done

---

## Milestones

### Milestone 1: Project Setup & Food Database
**Goal**: Establish app foundation with comprehensive food data

**Deliverables**:
- React + Vite project scaffolding
- Food database JSON with 25+ items
- Data model: name, category, time, temp, instructions, actions
- Basic app layout and routing

**Acceptance Criteria**:
- App runs locally with `npm run dev`
- Food data is accessible and correctly structured

---

### Milestone 2: Food Selection UI
**Goal**: Users can find and select foods to cook

**Deliverables**:
- Food search component with live filtering
- Category browsing (proteins, vegetables, frozen, snacks)
- Food card display with time/temp preview
- Food detail view with full instructions

**Acceptance Criteria**:
- User can search by name
- User can filter by category
- Selecting food shows all cooking details

---

### Milestone 3: Timer Core
**Goal**: Functional countdown timer

**Deliverables**:
- Timer component with countdown logic
- Start/pause/reset controls
- Visual progress indicator
- Large, kitchen-friendly time display
- Timer state management (React context or hooks)

**Acceptance Criteria**:
- Timer counts down accurately
- Pause preserves remaining time
- Reset returns to original cook time

---

### Milestone 4: Cooking Instructions Display
**Goal**: Step-by-step guidance during cooking

**Deliverables**:
- Instruction list component
- Current step highlighting based on elapsed time
- Action triggers (flip at 5 min, shake at 8 min, etc.)
- Next action preview

**Acceptance Criteria**:
- Instructions display for selected food
- Current step updates as timer progresses
- Actions trigger at correct times

---

### Milestone 5: Voice Alerts
**Goal**: Hands-free audio notifications

**Deliverables**:
- Web Speech API integration
- Voice triggers for: flip, shake, time warnings, completion
- Settings panel with voice on/off toggle
- Volume control
- Browser permission handling

**Acceptance Criteria**:
- Voice alerts fire at correct moments
- User can mute/unmute
- Works across major browsers (Chrome, Firefox, Safari)

---

### Milestone 6: Polish & Mobile Optimization
**Goal**: Production-ready, kitchen-friendly app

**Deliverables**:
- Responsive design (mobile-first)
- Large touch targets for kitchen use
- High contrast for visibility
- localStorage for user preferences
- PWA manifest for home screen install

**Acceptance Criteria**:
- App works well on mobile phone propped in kitchen
- Preferences persist across sessions
- App installable as PWA

---

## Out of Scope (v1)

- User accounts / login
- Cloud sync
- Custom recipe saving
- Multi-item simultaneous cooking
- Nutrition information
- Smart device integration
- Native mobile apps

---

## Tech Stack

| Component | Technology |
|-----------|------------|
| Framework | React 18 |
| Build Tool | Vite |
| Styling | Tailwind CSS |
| Voice | Web Speech API |
| Storage | localStorage |
| Deployment | Static hosting (Vercel/Netlify) |

---

## Success Metrics

- User can go from app open to timer started in under 30 seconds
- Voice alerts are audible and fire at correct times
- App is usable on a phone from 3 feet away (kitchen counter)
- Works offline after initial load
