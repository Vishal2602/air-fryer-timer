# Air Fryer Timer - Design System

A warm, kitchen-friendly design optimized for visibility at arm's length and interaction with messy hands. Built for the core workflow: input food, see instructions, get voice alerts, flip reminders, and cook perfectly.

---

## Design Principles

1. **Readability First**: Large text, high contrast - visible from 3 feet away while cooking
2. **Touch-Friendly**: Big targets for greasy fingers, generous spacing between actions
3. **Warm & Inviting**: Kitchen-appropriate colors that feel cozy, not clinical
4. **Focused States**: Clear visual hierarchy between idle, cooking, flip alerts, and done states
5. **Voice-First Alerts**: Audio cues paired with visual feedback so you never miss a flip
6. **Accessible**: WCAG AA contrast ratios, clear focus indicators, screen reader support

---

## Color Palette

### Primary Colors

| Name | Hex | Usage |
|------|-----|-------|
| **Warm Orange** | `#E85D04` | Primary actions, timer progress, brand accent |
| **Deep Charcoal** | `#1A1A2E` | Timer display background, text |
| **Cream White** | `#FDF8F3` | App background, cards |

### Secondary Colors

| Name | Hex | Usage |
|------|-----|-------|
| **Golden Amber** | `#F48C06` | Hover states, secondary accents |
| **Soft Coral** | `#FFBA8C` | Light accent, progress bar background |
| **Smoke Gray** | `#6B7280` | Secondary text, inactive states |

### Semantic Colors

| Name | Hex | Usage |
|------|-----|-------|
| **Alert Red** | `#DC2626` | Time-critical alerts (flip now!) |
| **Success Green** | `#16A34A` | Cooking complete |
| **Warning Yellow** | `#FBBF24` | Approaching action, 5 min warning |
| **Info Blue** | `#3B82F6` | Tips, informational text |

### State Colors

| State | Background | Text |
|-------|------------|------|
| Idle | `#FDF8F3` (Cream) | `#1A1A2E` (Charcoal) |
| Cooking Active | `#1A1A2E` (Charcoal) | `#FFFFFF` (White) |
| Alert Active | `#DC2626` (Alert Red) | `#FFFFFF` (White) |
| Paused | `#374151` (Dark Gray) | `#9CA3AF` (Muted) |
| Complete | `#16A34A` (Success) | `#FFFFFF` (White) |

---

## Typography

### Font Stack

```css
--font-primary: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
--font-timer: 'JetBrains Mono', 'SF Mono', 'Consolas', monospace;
```

### Type Scale

| Element | Size (Mobile) | Size (Desktop) | Weight | Line Height |
|---------|---------------|----------------|--------|-------------|
| Timer Display | `72px` | `120px` | 700 | 1 |
| Section Heading | `24px` | `32px` | 600 | 1.2 |
| Card Title | `20px` | `24px` | 600 | 1.3 |
| Body Text | `16px` | `18px` | 400 | 1.5 |
| Label / Caption | `14px` | `14px` | 500 | 1.4 |
| Small / Helper | `12px` | `12px` | 400 | 1.4 |

### Font Classes (Tailwind)

```
Timer:          text-7xl md:text-9xl font-bold font-mono tracking-tight
Heading:        text-2xl md:text-3xl font-semibold
Card Title:     text-xl md:text-2xl font-semibold
Body:           text-base md:text-lg
Label:          text-sm font-medium
Caption:        text-xs text-smoke-gray
```

---

## Spacing Scale

Using a 4px base unit. All spacing in multiples of 4.

| Token | Value | Usage |
|-------|-------|-------|
| `xs` | `4px` | Tight gaps, icon padding |
| `sm` | `8px` | Inline spacing, small gaps |
| `md` | `16px` | Default component padding |
| `lg` | `24px` | Section spacing, card padding |
| `xl` | `32px` | Major section gaps |
| `2xl` | `48px` | Page section separation |
| `3xl` | `64px` | Top/bottom page margins |

### Container Widths

| Breakpoint | Max Width | Padding |
|------------|-----------|---------|
| Mobile | 100% | `16px` |
| Tablet (768px) | `720px` | `24px` |
| Desktop (1024px) | `960px` | `32px` |

---

## Component Styles

### Buttons

#### Primary Button (Start Cooking)
```css
background: #E85D04;
color: #FFFFFF;
padding: 16px 32px;
border-radius: 12px;
font-size: 18px;
font-weight: 600;
min-height: 56px;      /* Touch-friendly */
min-width: 160px;

/* Hover */
background: #F48C06;

/* Active/Pressed */
background: #C74E04;
transform: scale(0.98);

/* Disabled */
background: #D1D5DB;
color: #6B7280;
```

#### Secondary Button (Pause, Reset)
```css
background: transparent;
color: #1A1A2E;
border: 2px solid #1A1A2E;
padding: 14px 28px;
border-radius: 12px;
min-height: 56px;

/* Hover */
background: #1A1A2E;
color: #FFFFFF;
```

#### Icon Button (Voice Toggle)
```css
width: 48px;
height: 48px;
border-radius: 50%;
background: #FDF8F3;
border: 2px solid #E5E7EB;
display: flex;
align-items: center;
justify-content: center;

/* Active State (voice on) */
background: #E85D04;
border-color: #E85D04;
color: #FFFFFF;
```

#### Touch Targets

All interactive elements: **minimum 48px x 48px** touch area.

---

### Cards

#### Food Card (Selection List)
```css
background: #FFFFFF;
border: 1px solid #E5E7EB;
border-radius: 16px;
padding: 20px;
box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);

/* Hover */
border-color: #E85D04;
box-shadow: 0 4px 12px rgba(232, 93, 4, 0.15);

/* Selected */
border: 2px solid #E85D04;
background: #FFF8F5;
```

#### Timer Display Card (Active Cooking)
```css
background: #1A1A2E;
color: #FFFFFF;
border-radius: 24px;
padding: 32px;
text-align: center;

/* Timer digits */
font-family: 'JetBrains Mono', monospace;
font-size: 120px;
font-weight: 700;
letter-spacing: -0.02em;
```

---

### Progress Indicator

#### Circular Progress (Timer)
```css
/* Track */
stroke: #374151;
stroke-width: 8px;

/* Progress Fill */
stroke: #E85D04;
stroke-width: 8px;
stroke-linecap: round;
transition: stroke-dashoffset 1s linear;

/* When alert is active */
stroke: #DC2626;
animation: pulse 1s ease-in-out infinite;
```

#### Linear Progress (Alternative)
```css
/* Track */
background: #FFBA8C;
height: 8px;
border-radius: 4px;

/* Fill */
background: linear-gradient(90deg, #E85D04, #F48C06);
border-radius: 4px;
```

---

### Alert Banner

#### Flip/Shake Alert (Active)
```css
background: #DC2626;
color: #FFFFFF;
padding: 20px 24px;
border-radius: 16px;
font-size: 20px;
font-weight: 600;
text-align: center;
animation: attention 0.5s ease-in-out infinite alternate;

/* Attention animation */
@keyframes attention {
  from { transform: scale(1); }
  to { transform: scale(1.02); }
}
```

#### Completion Alert
```css
background: #16A34A;
color: #FFFFFF;
/* Same structure as above */
```

#### Warning Alert (5 min remaining)
```css
background: #FBBF24;
color: #1A1A2E;
```

---

### Search Input

```css
background: #FFFFFF;
border: 2px solid #E5E7EB;
border-radius: 12px;
padding: 16px 20px;
padding-left: 48px;       /* Space for search icon */
font-size: 18px;
min-height: 56px;

/* Focus */
border-color: #E85D04;
outline: none;
box-shadow: 0 0 0 3px rgba(232, 93, 4, 0.2);

/* Placeholder */
color: #9CA3AF;
```

---

### Category Pills (Filter)

```css
background: #F3F4F6;
color: #374151;
padding: 10px 20px;
border-radius: 100px;
font-size: 14px;
font-weight: 500;
border: none;

/* Active */
background: #E85D04;
color: #FFFFFF;

/* Hover (inactive) */
background: #E5E7EB;
```

---

### Voice Toggle

```css
/* Container */
display: flex;
align-items: center;
gap: 12px;

/* Toggle Switch */
width: 56px;
height: 32px;
background: #D1D5DB;
border-radius: 16px;
position: relative;
transition: background 0.2s;

/* Toggle Knob */
width: 28px;
height: 28px;
background: #FFFFFF;
border-radius: 50%;
position: absolute;
top: 2px;
left: 2px;
transition: transform 0.2s;
box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);

/* Active State */
.toggle-active {
  background: #E85D04;
}
.toggle-active .knob {
  transform: translateX(24px);
}
```

---

### Instructions List

```css
/* Container */
background: #FFFFFF;
border-radius: 16px;
padding: 24px;

/* Step Item */
display: flex;
gap: 16px;
padding: 16px 0;
border-bottom: 1px solid #F3F4F6;

/* Step Number */
width: 32px;
height: 32px;
background: #F3F4F6;
color: #6B7280;
border-radius: 50%;
font-weight: 600;
display: flex;
align-items: center;
justify-content: center;

/* Current Step */
.current-step .number {
  background: #E85D04;
  color: #FFFFFF;
}
.current-step .text {
  font-weight: 600;
  color: #1A1A2E;
}

/* Completed Step */
.completed-step .number {
  background: #16A34A;
  color: #FFFFFF;
}
.completed-step .text {
  color: #6B7280;
  text-decoration: line-through;
}
```

---

## Layout Patterns

### Mobile-First Timer Screen

```
┌─────────────────────────────┐
│  [Voice]    Air Fryer   [?] │  Header (56px)
├─────────────────────────────┤
│                             │
│    ┌───────────────────┐    │
│    │                   │    │
│    │     12:34         │    │  Timer Display
│    │   Chicken Wings   │    │  (centered, dominant)
│    │     400°F         │    │
│    │                   │    │
│    └───────────────────┘    │
│                             │
│  ┌───────────────────────┐  │
│  │  🔔 FLIP YOUR WINGS  │  │  Alert Banner
│  └───────────────────────┘  │  (when active)
│                             │
│   [ Pause ]    [ Reset ]    │  Controls (sticky bottom)
│                             │
└─────────────────────────────┘
```

### Food Selection Screen

```
┌─────────────────────────────┐
│  [Voice]    Air Fryer   [?] │  Header
├─────────────────────────────┤
│  🔍 Search foods...         │  Search
├─────────────────────────────┤
│  (Proteins) (Veggies) (All) │  Category pills
├─────────────────────────────┤
│  ┌─────────┐ ┌─────────┐    │
│  │ Chicken │ │  Fries  │    │  Food Grid
│  │  Wings  │ │         │    │  (2 columns mobile)
│  │ 24m/400°│ │ 18m/400°│    │
│  └─────────┘ └─────────┘    │
│  ┌─────────┐ ┌─────────┐    │
│  │ Salmon  │ │ Broccoli│    │
│  ...                        │
└─────────────────────────────┘
```

---

## Iconography

Using **Lucide Icons** (MIT licensed, React-ready).

| Icon | Usage |
|------|-------|
| `volume-2` | Voice on |
| `volume-x` | Voice off |
| `search` | Search input |
| `clock` | Cook time |
| `thermometer` | Temperature |
| `refresh-cw` | Flip/rotate |
| `shake` | Shake basket |
| `play` | Start timer |
| `pause` | Pause timer |
| `rotate-ccw` | Reset timer |
| `check-circle` | Complete/success |
| `alert-triangle` | Warning |
| `info` | Tips |

Icon size: **24px** default, **32px** for primary actions.

---

## Motion & Animation

### Transitions

```css
/* Default transition */
transition: all 0.2s ease-out;

/* Color/background */
transition: background-color 0.15s ease;

/* Scale interactions */
transition: transform 0.1s ease-out;
```

### Keyframe Animations

```css
/* Pulse for alerts */
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}

/* Shake for attention */
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-4px); }
  75% { transform: translateX(4px); }
}

/* Fade in */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}
```

---

## Tailwind Configuration

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        'warm-orange': '#E85D04',
        'golden-amber': '#F48C06',
        'soft-coral': '#FFBA8C',
        'deep-charcoal': '#1A1A2E',
        'cream-white': '#FDF8F3',
        'smoke-gray': '#6B7280',
        'alert-red': '#DC2626',
        'success-green': '#16A34A',
        'warning-yellow': '#FBBF24',
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'mono': ['JetBrains Mono', 'Consolas', 'monospace'],
      },
      borderRadius: {
        'xl': '16px',
        '2xl': '24px',
      },
      minHeight: {
        'touch': '48px',
        'button': '56px',
      },
      fontSize: {
        'timer': ['120px', { lineHeight: '1', fontWeight: '700' }],
        'timer-mobile': ['72px', { lineHeight: '1', fontWeight: '700' }],
      },
    },
  },
}
```

---

## Accessibility Checklist

- [ ] All interactive elements have min 48px touch targets
- [ ] Color contrast meets WCAG AA (4.5:1 for text, 3:1 for UI)
- [ ] Focus states visible on all interactive elements
- [ ] Voice alerts supplement visual alerts (not replace)
- [ ] Timer digits readable without color perception
- [ ] All icons have aria-labels
- [ ] Semantic HTML structure (buttons, headings, lists)
- [ ] Screen reader announces timer updates at intervals

---

## Dark Mode (Future)

Not in v1 scope, but colors are designed to adapt:

| Light Mode | Dark Mode |
|------------|-----------|
| `#FDF8F3` (Cream) | `#1A1A2E` (Charcoal) |
| `#1A1A2E` (Charcoal) | `#FDF8F3` (Cream) |
| `#E85D04` (Orange) | `#F48C06` (Amber - slightly lighter) |

---

## Asset Requirements

- **Favicon**: Orange circle with timer icon, 32x32 and 180x180 (Apple touch)
- **PWA Icons**: 192x192 and 512x512 with warm orange background
- **OG Image**: 1200x630 preview card for sharing
- **App fonts**: Inter (400, 500, 600, 700), JetBrains Mono (400, 700)

---

## Voice Alerts UX

### Alert Types & Timing

| Alert Type | Trigger | Voice Message | Visual State |
|------------|---------|---------------|--------------|
| **Start** | Timer begins | "Starting [food] timer. [X] minutes at [temp] degrees." | Timer card activates |
| **Halfway/Flip** | 50% time elapsed | "Time to flip your [food]! Open the basket and flip now." | Alert Red banner + shake animation |
| **Shake** | For specific foods | "Give your [food] a good shake!" | Warning Yellow banner |
| **Almost Done** | 2 minutes left | "Two minutes remaining. [Food] almost ready." | Subtle pulse on timer |
| **Final Alert** | 30 seconds left | "Thirty seconds left!" | Timer digits flash |
| **Complete** | Timer ends | "Your [food] is done! Enjoy your meal." | Success Green state + celebration |

### Voice Toggle Behavior

- Default: **Voice ON** (cooking scenario expects hands-busy)
- Toggle persists in localStorage
- Visual indicator always visible in header
- Muted state still shows all visual alerts

### Audio Specifications

```
Voice: Web Speech API (browser native)
Rate: 0.9 (slightly slower for clarity)
Pitch: 1.0 (natural)
Volume: 1.0 (full - user controls device volume)
Fallback: System beep/chime if Speech API unavailable
```

---

## Cooking Instructions Component

### Instruction Card Layout

```
┌────────────────────────────────────────────┐
│  📋 Cooking Instructions                   │
├────────────────────────────────────────────┤
│  ① Set air fryer to 400°F              ✓  │ ← completed (gray, struck)
│  ② Place wings in single layer         ✓  │
│  ③ Cook for 12 minutes                 ●  │ ← current (orange highlight)
│  ④ Flip wings and shake basket         ○  │ ← upcoming (muted)
│  ⑤ Cook for remaining 12 minutes       ○  │
│  ⑥ Check internal temp reaches 165°F   ○  │
└────────────────────────────────────────────┘
```

### Step States

| State | Number BG | Text Style | Indicator |
|-------|-----------|------------|-----------|
| Completed | `#16A34A` | Gray, line-through | ✓ checkmark |
| Current | `#E85D04` | Bold, dark | ● filled dot |
| Upcoming | `#F3F4F6` | Normal, muted | ○ empty dot |
| Action Required | `#DC2626` | Bold, white on red | ! exclamation |

### Instruction Data Structure

Each food item includes:
```javascript
{
  name: "Chicken Wings",
  category: "proteins",
  cookTime: 24,          // total minutes
  temperature: 400,      // Fahrenheit
  flipAt: [12],          // flip at 12 min mark
  shakeAt: [],           // no shake needed
  instructions: [
    { step: 1, text: "Set air fryer to 400°F", type: "prep" },
    { step: 2, text: "Place wings in single layer, no overlap", type: "prep" },
    { step: 3, text: "Cook for 12 minutes", type: "cook", duration: 12 },
    { step: 4, text: "Flip wings", type: "action", alert: "flip" },
    { step: 5, text: "Cook for remaining 12 minutes", type: "cook", duration: 12 },
    { step: 6, text: "Check internal temp reaches 165°F", type: "check" }
  ],
  tips: [
    "Pat wings dry for extra crispiness",
    "Toss in sauce after cooking, not before"
  ]
}
```

---

## Food Database Display

### Category Filters

```
┌────────────────────────────────────────────────────────────┐
│  (All) (🍗 Proteins) (🥔 Sides) (🥦 Veggies) (❄️ Frozen)  │
└────────────────────────────────────────────────────────────┘
```

### Food Card Grid

Each card shows:

```
┌─────────────────────┐
│  🍗                 │  ← Category icon
│                     │
│  Chicken Wings      │  ← Food name (bold)
│                     │
│  ⏱ 24 min  🌡 400°F │  ← Cook time & temp
│  📋 Flip halfway    │  ← Key instruction note
└─────────────────────┘
```

### Card Interaction States

| State | Border | Background | Shadow |
|-------|--------|------------|--------|
| Default | `#E5E7EB` | `#FFFFFF` | shadow-sm |
| Hover | `#E85D04` | `#FFFFFF` | shadow-md + orange glow |
| Selected | `#E85D04` 2px | `#FFF8F5` | shadow-lg |
| Disabled | `#E5E7EB` | `#F9FAFB` | none |

---

## Timer Display States

### State Machine

```
                    ┌─────────┐
                    │  IDLE   │ ← Cream background, no timer
                    └────┬────┘
                         │ User selects food + starts
                         ▼
                    ┌─────────┐
              ┌────▶│ COOKING │ ← Charcoal bg, countdown active
              │     └────┬────┘
              │          │ Pause pressed
              │          ▼
              │     ┌─────────┐
              │     │ PAUSED  │ ← Dark gray, timer frozen
              │     └────┬────┘
              │          │ Resume
              └──────────┘
                         │ Flip time reached
                         ▼
                    ┌─────────┐
              ┌────▶│ FLIP!   │ ← Alert red, pulsing, voice alert
              │     └────┬────┘
              │          │ User confirms flip (button or auto-timeout)
              └──────────┘
                         │ Timer reaches 0
                         ▼
                    ┌─────────┐
                    │  DONE   │ ← Success green, celebration
                    └─────────┘
```

### Flip Alert Full-Screen Takeover

When flip is required, overlay appears:

```
┌─────────────────────────────────────────┐
│                                         │
│         🔄 FLIP YOUR WINGS!             │  ← Large, pulsing
│                                         │
│         Open basket, flip food,         │
│         close basket                    │
│                                         │
│         [ ✓ Done Flipping ]             │  ← Big touch target
│                                         │
│         Timer paused: 12:00 remaining   │
│                                         │
└─────────────────────────────────────────┘

Background: Alert Red (#DC2626)
Animation: Pulse scale + shake icon
Voice: "Time to flip your wings!"
Auto-dismiss: After 15 seconds, resume timer
```

---

## Responsive Breakpoints

### Mobile (< 640px) - Primary Target

- Single column layout
- Timer takes 60% of viewport height
- Food list scrolls below timer
- Bottom-anchored controls
- Voice toggle in header (always visible)

### Tablet (640px - 1024px)

- Two-column food grid
- Timer still prominent but shares space
- Instructions panel slides in from right

### Desktop (> 1024px)

- Three-column layout: Food list | Timer | Instructions
- All panels visible simultaneously
- Larger timer digits (120px)

---

## Micro-interactions

### Button Press Feedback
```css
.btn-primary:active {
  transform: scale(0.96);
  transition: transform 0.1s ease-out;
}
```

### Timer Tick (every second)
```css
.timer-tick {
  animation: tick 0.2s ease-out;
}
@keyframes tick {
  0% { transform: scale(1); }
  50% { transform: scale(1.02); }
  100% { transform: scale(1); }
}
```

### Food Card Selection
```css
.food-card-selected {
  animation: select-pop 0.3s ease-out;
}
@keyframes select-pop {
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
}
```

### Flip Alert Shake
```css
.flip-alert {
  animation: urgent-shake 0.4s ease-in-out infinite;
}
@keyframes urgent-shake {
  0%, 100% { transform: translateX(0) rotate(0deg); }
  25% { transform: translateX(-8px) rotate(-2deg); }
  75% { transform: translateX(8px) rotate(2deg); }
}
```

---

## Empty States & Loading

### No Food Selected
```
┌─────────────────────────────────────────┐
│                                         │
│           🍳                            │
│                                         │
│     What are you cooking today?         │
│                                         │
│     Search or browse foods below        │
│     to get started                      │
│                                         │
└─────────────────────────────────────────┘
```

### Search No Results
```
┌─────────────────────────────────────────┐
│                                         │
│           🔍                            │
│                                         │
│     No foods found for "xyz"            │
│                                         │
│     Try a different search or           │
│     browse by category                  │
│                                         │
└─────────────────────────────────────────┘
```

### Loading State
- Skeleton cards for food list
- Pulsing placeholder for timer area
- Use `#F3F4F6` for skeleton background
