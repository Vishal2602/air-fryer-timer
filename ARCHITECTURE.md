# Air Fryer Timer - Architecture

## Tech Stack

| Layer | Choice | Rationale |
|-------|--------|-----------|
| Framework | React 18 | Standard, simple SPA |
| Build | Vite | Fast, zero-config |
| Styling | Tailwind CSS | Rapid prototyping, responsive |
| State | React Context + useReducer | Shared timer state across components |
| Voice | Web Speech API | Built into browsers, no dependencies |
| Storage | localStorage | Persist user preferences |

---

## Project Structure

```
src/
├── main.jsx                 # App entry point
├── App.jsx                  # Main app component, routes/views
├── index.css                # Tailwind imports + custom styles
│
├── components/
│   ├── Header.jsx           # App header with title + settings
│   ├── FoodSearch.jsx       # Search input + category filters
│   ├── FoodList.jsx         # Grid of food cards
│   ├── FoodCard.jsx         # Individual food item display
│   ├── FoodDetail.jsx       # Full cooking details for selected food
│   ├── Timer.jsx            # Main timer display (large countdown)
│   ├── TimerControls.jsx    # Start/pause/reset buttons
│   ├── ProgressRing.jsx     # Circular progress indicator
│   ├── InstructionPanel.jsx # Step-by-step instructions display
│   ├── AlertBanner.jsx      # Visual flip/shake alert overlay
│   ├── VoiceSettings.jsx    # Voice toggle + volume control
│   └── Settings.jsx         # User preferences panel
│
├── context/
│   └── TimerContext.jsx     # Global timer state provider
│
├── data/
│   └── foods.js             # Food database (static data)
│
├── hooks/
│   ├── useTimer.js          # Timer countdown logic
│   ├── useVoice.js          # Speech synthesis wrapper
│   ├── useLocalStorage.js   # Persistent state helper
│   └── useAlerts.js         # Alert trigger logic
│
└── utils/
    ├── speech.js            # Voice alert functions
    ├── formatTime.js        # MM:SS time formatting
    └── constants.js         # App-wide constants
```

---

## Data Model

### Food Item Schema

```javascript
{
  id: "chicken-wings",
  name: "Chicken Wings",
  category: "protein",        // protein | vegetable | frozen | snack
  cookTime: 24,               // total minutes
  temperature: 400,           // Fahrenheit
  image: "🍗",                // emoji for visual

  // Mid-cook actions (triggers alerts)
  actions: [
    {
      atMinute: 12,           // when to trigger (minutes elapsed)
      type: "flip",           // flip | shake | check | spray
      message: "Flip the wings for even cooking"
    },
    {
      atMinute: 20,
      type: "check",
      message: "Check for desired crispiness"
    }
  ],

  // Step-by-step instructions
  instructions: [
    {
      step: 1,
      text: "Pat wings completely dry with paper towels",
      timing: "before"        // before | during | after
    },
    {
      step: 2,
      text: "Season wings with salt, pepper, and desired spices",
      timing: "before"
    },
    {
      step: 3,
      text: "Arrange in single layer - don't overcrowd the basket",
      timing: "before"
    },
    {
      step: 4,
      text: "Cook at 400°F for 24 minutes total",
      timing: "during"
    },
    {
      step: 5,
      text: "Flip wings halfway through cooking",
      timing: "during"
    },
    {
      step: 6,
      text: "Check internal temp reaches 165°F",
      timing: "after"
    }
  ],

  tips: "For extra crispy skin, lightly coat with baking powder before cooking"
}
```

### Timer State Schema

```javascript
{
  status: "idle" | "running" | "paused" | "complete",
  selectedFood: FoodItem | null,
  totalSeconds: number,         // original cook time in seconds
  remainingSeconds: number,     // current countdown
  elapsedSeconds: number,       // time cooked so far
  firedActions: string[],       // IDs of actions already announced
  currentAction: Action | null  // currently displaying action
}
```

### User Preferences Schema

```javascript
{
  voiceEnabled: boolean,        // default: true
  voiceVolume: number,          // 0-1, default: 1
  showCelsius: boolean,         // default: false (Fahrenheit)
  recentFoods: string[]         // IDs of recently cooked foods
}
```

---

## Component Details

### TimerContext (Global State)

```javascript
// context/TimerContext.jsx
const TimerContext = createContext();

const initialState = {
  status: "idle",
  selectedFood: null,
  totalSeconds: 0,
  remainingSeconds: 0,
  elapsedSeconds: 0,
  firedActions: [],
  currentAction: null
};

function timerReducer(state, action) {
  switch (action.type) {
    case "SELECT_FOOD":
      return { ...initialState, selectedFood: action.food,
               totalSeconds: action.food.cookTime * 60,
               remainingSeconds: action.food.cookTime * 60 };
    case "START":
      return { ...state, status: "running" };
    case "PAUSE":
      return { ...state, status: "paused" };
    case "TICK":
      return { ...state,
               remainingSeconds: state.remainingSeconds - 1,
               elapsedSeconds: state.elapsedSeconds + 1 };
    case "FIRE_ACTION":
      return { ...state,
               firedActions: [...state.firedActions, action.actionId],
               currentAction: action.action };
    case "CLEAR_ACTION":
      return { ...state, currentAction: null };
    case "COMPLETE":
      return { ...state, status: "complete" };
    case "RESET":
      return initialState;
    default:
      return state;
  }
}
```

### useTimer Hook

```javascript
// hooks/useTimer.js
function useTimer() {
  const { state, dispatch } = useContext(TimerContext);
  const { speak } = useVoice();

  useEffect(() => {
    if (state.status !== "running") return;

    const interval = setInterval(() => {
      if (state.remainingSeconds <= 0) {
        dispatch({ type: "COMPLETE" });
        speak(`Your ${state.selectedFood.name} is ready!`);
        return;
      }

      dispatch({ type: "TICK" });
      checkForActions();
    }, 1000);

    return () => clearInterval(interval);
  }, [state.status, state.remainingSeconds]);

  const checkForActions = () => {
    const elapsedMinutes = Math.floor(state.elapsedSeconds / 60);
    state.selectedFood.actions.forEach(action => {
      if (action.atMinute === elapsedMinutes &&
          !state.firedActions.includes(action.atMinute)) {
        dispatch({ type: "FIRE_ACTION", actionId: action.atMinute, action });
        speak(action.message);
      }
    });
  };

  return {
    ...state,
    start: () => dispatch({ type: "START" }),
    pause: () => dispatch({ type: "PAUSE" }),
    reset: () => dispatch({ type: "RESET" }),
    selectFood: (food) => dispatch({ type: "SELECT_FOOD", food })
  };
}
```

### useVoice Hook

```javascript
// hooks/useVoice.js
function useVoice() {
  const [enabled, setEnabled] = useLocalStorage("voiceEnabled", true);
  const [volume, setVolume] = useLocalStorage("voiceVolume", 1);

  const speak = useCallback((message) => {
    if (!enabled || !("speechSynthesis" in window)) return;

    // Cancel any ongoing speech
    speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(message);
    utterance.rate = 0.9;
    utterance.volume = volume;
    speechSynthesis.speak(utterance);
  }, [enabled, volume]);

  const testVoice = () => speak("Voice alerts are working!");

  return { enabled, setEnabled, volume, setVolume, speak, testVoice };
}
```

---

## Component Hierarchy

```
App
├── TimerProvider (context wrapper)
│   │
│   ├── Header
│   │   ├── Logo/Title
│   │   └── VoiceSettings (toggle + volume)
│   │
│   ├── [status === "idle"]
│   │   ├── FoodSearch (search input + category tabs)
│   │   └── FoodList
│   │       └── FoodCard[] (grid of foods)
│   │
│   ├── [status === "idle" && selectedFood]
│   │   └── FoodDetail (full info, "Start Cooking" button)
│   │
│   ├── [status === "running" || "paused"]
│   │   ├── Timer
│   │   │   ├── ProgressRing (circular progress)
│   │   │   ├── TimeDisplay (MM:SS countdown)
│   │   │   └── TimerControls (pause/resume/reset)
│   │   ├── AlertBanner (when currentAction !== null)
│   │   └── InstructionPanel (current + upcoming steps)
│   │
│   └── [status === "complete"]
│       └── CompletionScreen (food ready message, reset button)
```

---

## Voice Alert Triggers

| Trigger | Condition | Message |
|---------|-----------|---------|
| Action Alert | `elapsedMinutes === action.atMinute` | action.message |
| 5 Min Warning | `remainingSeconds === 300` | "5 minutes remaining" |
| 1 Min Warning | `remainingSeconds === 60` | "1 minute remaining" |
| 30 Sec Warning | `remainingSeconds === 30` | "30 seconds remaining" |
| Complete | `remainingSeconds === 0` | "Your {food.name} is ready!" |

---

## UI/UX Specifications

### Color Palette (Kitchen-Friendly)
```css
--primary: #FF6B35;      /* Warm orange - action buttons */
--secondary: #004E89;    /* Deep blue - headers */
--success: #2E7D32;      /* Green - completion */
--warning: #F9A825;      /* Yellow - alerts */
--background: #FAFAFA;   /* Light gray - body */
--surface: #FFFFFF;      /* White - cards */
--text-primary: #212121;
--text-secondary: #757575;
```

### Typography
- Timer digits: 72px+ bold, monospace
- Headings: 24px semi-bold
- Body: 16px regular
- Minimum touch target: 48x48px

### Responsive Breakpoints
- **Mobile (default)**: Single column, full-width cards
- **Tablet (640px+)**: 2-column food grid
- **Desktop (1024px+)**: 3-column grid, side panel for instructions

---

## Food Database Categories

```javascript
// data/foods.js
export const CATEGORIES = {
  protein: { label: "Proteins", icon: "🥩" },
  vegetable: { label: "Vegetables", icon: "🥦" },
  frozen: { label: "Frozen Foods", icon: "❄️" },
  snack: { label: "Snacks", icon: "🍟" }
};

export const foods = [
  // Proteins (8 items)
  { id: "chicken-wings", name: "Chicken Wings", ... },
  { id: "chicken-breast", name: "Chicken Breast", ... },
  { id: "salmon", name: "Salmon Fillet", ... },
  { id: "shrimp", name: "Shrimp", ... },
  { id: "steak", name: "Steak", ... },
  { id: "pork-chops", name: "Pork Chops", ... },
  { id: "bacon", name: "Bacon", ... },
  { id: "chicken-thighs", name: "Chicken Thighs", ... },

  // Vegetables (7 items)
  { id: "french-fries", name: "French Fries", ... },
  { id: "sweet-potato-fries", name: "Sweet Potato Fries", ... },
  { id: "broccoli", name: "Broccoli", ... },
  { id: "brussels-sprouts", name: "Brussels Sprouts", ... },
  { id: "asparagus", name: "Asparagus", ... },
  { id: "zucchini", name: "Zucchini", ... },
  { id: "cauliflower", name: "Cauliflower", ... },

  // Frozen Foods (6 items)
  { id: "frozen-fries", name: "Frozen Fries", ... },
  { id: "chicken-nuggets", name: "Chicken Nuggets", ... },
  { id: "fish-sticks", name: "Fish Sticks", ... },
  { id: "pizza-rolls", name: "Pizza Rolls", ... },
  { id: "mozzarella-sticks", name: "Mozzarella Sticks", ... },
  { id: "frozen-wings", name: "Frozen Wings", ... },

  // Snacks (5 items)
  { id: "tater-tots", name: "Tater Tots", ... },
  { id: "egg-rolls", name: "Egg Rolls", ... },
  { id: "spring-rolls", name: "Spring Rolls", ... },
  { id: "onion-rings", name: "Onion Rings", ... },
  { id: "jalapeno-poppers", name: "Jalapeño Poppers", ... }
];
```

---

## Browser Compatibility

| Feature | Chrome | Firefox | Safari | Edge |
|---------|--------|---------|--------|------|
| React 18 | ✅ | ✅ | ✅ | ✅ |
| Speech Synthesis | ✅ | ✅ | ✅ | ✅ |
| localStorage | ✅ | ✅ | ✅ | ✅ |
| CSS Grid | ✅ | ✅ | ✅ | ✅ |

**Fallback**: If Speech Synthesis unavailable, visual-only alerts with larger alert banners.

---

## Performance Considerations

- No external API calls (fully client-side)
- Food database loaded at startup (~5KB)
- Timer uses `setInterval` with 1-second precision
- Minimal re-renders using proper React patterns
- Lazy load Settings component (rarely used)

---

## Future Extensibility (Not Building Now)

These patterns support future features:
- **Multi-timer**: TimerContext can manage array of timers
- **Custom foods**: foods.js can be extended with user entries
- **PWA**: Structure supports service worker addition
- **i18n**: Text in constants.js ready for translation

Explicitly deferred to keep v1 simple and focused.
