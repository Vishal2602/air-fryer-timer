/**
 * Application-wide constants
 */

// Timer status values
export const TIMER_STATUS = {
  IDLE: 'idle',
  RUNNING: 'running',
  PAUSED: 'paused',
  COMPLETE: 'complete'
};

// Action types for mid-cook alerts
export const ACTION_TYPES = {
  FLIP: 'flip',
  SHAKE: 'shake',
  CHECK: 'check',
  SPRAY: 'spray'
};

// Action type display labels and icons
export const ACTION_LABELS = {
  flip: { label: 'FLIP', emoji: '🔄' },
  shake: { label: 'SHAKE', emoji: '🤝' },
  check: { label: 'CHECK', emoji: '👀' },
  spray: { label: 'SPRAY', emoji: '💨' }
};

// Time warning thresholds (in seconds)
export const TIME_WARNINGS = {
  FIVE_MINUTES: 300,
  ONE_MINUTE: 60,
  THIRTY_SECONDS: 30
};

// Local storage keys
export const STORAGE_KEYS = {
  VOICE_ENABLED: 'airfryer_voice_enabled',
  VOICE_VOLUME: 'airfryer_voice_volume',
  SHOW_CELSIUS: 'airfryer_show_celsius',
  RECENT_FOODS: 'airfryer_recent_foods'
};

// Category filter options
export const CATEGORY_OPTIONS = [
  { key: 'all', label: 'All Foods', icon: '🍽️' },
  { key: 'protein', label: 'Proteins', icon: '🥩' },
  { key: 'vegetable', label: 'Vegetables', icon: '🥦' },
  { key: 'frozen', label: 'Frozen', icon: '❄️' },
  { key: 'snack', label: 'Snacks', icon: '🍟' }
];
