import { useState, useEffect, useCallback, useRef } from 'react';
import { Volume2, VolumeX, Search, Clock, Thermometer, Play, Pause, RotateCcw, RefreshCw, AlertTriangle, Check, ChevronLeft } from 'lucide-react';
import { foods, CATEGORIES, searchFoods, getFoodsByCategory } from './data/foods';

// Format time as MM:SS
function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

// Voice hook
function useVoice() {
  const [enabled, setEnabled] = useState(() => {
    const stored = localStorage.getItem('voiceEnabled');
    return stored !== null ? stored === 'true' : true;
  });

  useEffect(() => {
    localStorage.setItem('voiceEnabled', enabled.toString());
  }, [enabled]);

  const speak = useCallback((message) => {
    if (!enabled || typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(message);
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.volume = 1;
    window.speechSynthesis.speak(utterance);
  }, [enabled]);

  const testVoice = () => speak("Voice alerts are working!");

  return { enabled, setEnabled, speak, testVoice };
}

// Progress Ring Component
function ProgressRing({ progress, size = 280, strokeWidth = 12, isAlert = false }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <svg width={size} height={size} className="transform -rotate-90">
      {/* Background circle */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="#374151"
        strokeWidth={strokeWidth}
      />
      {/* Progress circle */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={isAlert ? '#DC2626' : '#E85D04'}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
        className={`transition-all duration-1000 ${isAlert ? 'animate-pulse' : ''}`}
      />
    </svg>
  );
}

// Food Card Component
function FoodCard({ food, onSelect, isSelected }) {
  return (
    <button
      onClick={() => onSelect(food)}
      className={`
        w-full text-left p-5 rounded-2xl border-2 transition-all duration-200
        hover:shadow-lg hover:border-warm-orange hover:-translate-y-0.5
        ${isSelected
          ? 'border-warm-orange bg-orange-50 shadow-md'
          : 'border-gray-200 bg-white'
        }
      `}
    >
      <div className="flex items-start gap-4">
        <span className="text-4xl">{food.image}</span>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-lg text-deep-charcoal truncate">{food.name}</h3>
          <div className="flex items-center gap-4 mt-2 text-smoke-gray text-sm">
            <span className="flex items-center gap-1">
              <Clock size={14} />
              {food.cookTime} min
            </span>
            <span className="flex items-center gap-1">
              <Thermometer size={14} />
              {food.temperature}°F
            </span>
          </div>
        </div>
      </div>
    </button>
  );
}

// Category Pills
function CategoryPills({ selected, onSelect }) {
  const categories = [
    { id: 'all', label: 'All', icon: '🍽️' },
    ...Object.entries(CATEGORIES).map(([id, cat]) => ({ id, ...cat }))
  ];

  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
      {categories.map(cat => (
        <button
          key={cat.id}
          onClick={() => onSelect(cat.id)}
          className={`
            flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all
            ${selected === cat.id
              ? 'bg-warm-orange text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }
          `}
        >
          <span className="mr-1">{cat.icon}</span>
          {cat.label}
        </button>
      ))}
    </div>
  );
}

// Alert Banner
function AlertBanner({ action, onDismiss }) {
  if (!action) return null;

  const getIcon = (type) => {
    switch (type) {
      case 'flip': return <RefreshCw size={24} />;
      case 'shake': return <RefreshCw size={24} className="animate-shake" />;
      case 'check': return <AlertTriangle size={24} />;
      default: return <AlertTriangle size={24} />;
    }
  };

  const getLabel = (type) => {
    switch (type) {
      case 'flip': return 'FLIP TIME';
      case 'shake': return 'SHAKE TIME';
      case 'check': return 'CHECK NOW';
      default: return 'ALERT';
    }
  };

  return (
    <div
      className="fixed inset-x-0 top-20 mx-4 z-50 animate-fade-in"
      onClick={onDismiss}
    >
      <div className="bg-alert-red text-white p-5 rounded-2xl shadow-2xl animate-pulse-alert cursor-pointer">
        <div className="flex items-center justify-center gap-3 mb-2">
          {getIcon(action.type)}
          <span className="font-bold text-xl">{getLabel(action.type)}</span>
        </div>
        <p className="text-center text-lg">{action.message}</p>
        <p className="text-center text-sm mt-2 opacity-75">Tap to dismiss</p>
      </div>
    </div>
  );
}

// Instructions Panel
function InstructionsPanel({ food, elapsedMinutes, status }) {
  const beforeInstructions = food.instructions.filter(i => i.timing === 'before');
  const duringInstructions = food.instructions.filter(i => i.timing === 'during');
  const afterInstructions = food.instructions.filter(i => i.timing === 'after');

  const getStepStyle = (timing) => {
    if (status === 'complete') {
      return 'bg-success-green text-white';
    }
    if (timing === 'before' && status === 'running') {
      return 'bg-success-green text-white';
    }
    if (timing === 'during' && status === 'running') {
      return 'bg-warm-orange text-white';
    }
    if (timing === 'after') {
      return 'bg-gray-200 text-gray-500';
    }
    return 'bg-gray-200 text-gray-500';
  };

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm">
      <h3 className="font-semibold text-lg mb-4 text-deep-charcoal">Cooking Instructions</h3>

      {beforeInstructions.length > 0 && (
        <div className="mb-4">
          <span className="text-sm font-medium text-smoke-gray uppercase tracking-wide">Before Cooking</span>
          <div className="mt-2 space-y-2">
            {beforeInstructions.map((instruction, idx) => (
              <div key={idx} className="flex gap-3 items-start">
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0 ${status !== 'idle' ? 'bg-success-green text-white' : 'bg-gray-200 text-gray-500'}`}>
                  {status !== 'idle' ? <Check size={12} /> : instruction.step}
                </span>
                <span className={`text-sm ${status !== 'idle' ? 'text-smoke-gray line-through' : 'text-deep-charcoal'}`}>{instruction.text}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {duringInstructions.length > 0 && (
        <div className="mb-4">
          <span className="text-sm font-medium text-smoke-gray uppercase tracking-wide">During Cooking</span>
          <div className="mt-2 space-y-2">
            {duringInstructions.map((instruction, idx) => (
              <div key={idx} className="flex gap-3 items-start">
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0 ${status === 'running' ? 'bg-warm-orange text-white' : 'bg-gray-200 text-gray-500'}`}>
                  {instruction.step}
                </span>
                <span className={`text-sm ${status === 'running' ? 'text-deep-charcoal font-medium' : 'text-smoke-gray'}`}>{instruction.text}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {afterInstructions.length > 0 && (
        <div>
          <span className="text-sm font-medium text-smoke-gray uppercase tracking-wide">After Cooking</span>
          <div className="mt-2 space-y-2">
            {afterInstructions.map((instruction, idx) => (
              <div key={idx} className="flex gap-3 items-start">
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0 ${status === 'complete' ? 'bg-success-green text-white' : 'bg-gray-200 text-gray-500'}`}>
                  {instruction.step}
                </span>
                <span className={`text-sm ${status === 'complete' ? 'text-deep-charcoal font-medium' : 'text-smoke-gray'}`}>{instruction.text}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {food.tips && (
        <div className="mt-5 p-4 bg-amber-50 rounded-xl border border-amber-200">
          <p className="text-sm text-amber-800">
            <span className="font-semibold">Pro tip:</span> {food.tips}
          </p>
        </div>
      )}
    </div>
  );
}

// Main App
export default function App() {
  const [view, setView] = useState('select'); // 'select' | 'detail' | 'timer'
  const [selectedFood, setSelectedFood] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Timer state
  const [timerStatus, setTimerStatus] = useState('idle'); // 'idle' | 'running' | 'paused' | 'complete'
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [remainingSeconds, setRemainingSeconds] = useState(0);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [currentAction, setCurrentAction] = useState(null);
  const [firedActions, setFiredActions] = useState([]);

  const timerRef = useRef(null);
  const { enabled: voiceEnabled, setEnabled: setVoiceEnabled, speak, testVoice } = useVoice();

  // Filter foods
  const filteredFoods = searchQuery
    ? searchFoods(searchQuery).filter(f => selectedCategory === 'all' || f.category === selectedCategory)
    : getFoodsByCategory(selectedCategory);

  // Select food and show detail
  const handleSelectFood = (food) => {
    setSelectedFood(food);
    setView('detail');
  };

  // Start cooking
  const handleStartCooking = () => {
    if (!selectedFood) return;
    const seconds = selectedFood.cookTime * 60;
    setTotalSeconds(seconds);
    setRemainingSeconds(seconds);
    setElapsedSeconds(0);
    setFiredActions([]);
    setCurrentAction(null);
    setTimerStatus('running');
    setView('timer');
    speak(`Starting ${selectedFood.name}. Cooking for ${selectedFood.cookTime} minutes at ${selectedFood.temperature} degrees.`);
  };

  // Timer controls
  const handlePause = () => {
    setTimerStatus('paused');
    speak('Timer paused');
  };

  const handleResume = () => {
    setTimerStatus('running');
    speak('Timer resumed');
  };

  const handleReset = () => {
    setTimerStatus('idle');
    setRemainingSeconds(0);
    setElapsedSeconds(0);
    setFiredActions([]);
    setCurrentAction(null);
    setView('select');
    setSelectedFood(null);
  };

  // Timer tick effect
  useEffect(() => {
    if (timerStatus !== 'running') {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setRemainingSeconds(prev => {
        if (prev <= 1) {
          setTimerStatus('complete');
          speak(`Your ${selectedFood?.name} is ready! Remove from the air fryer now.`);
          return 0;
        }

        // Voice warnings
        if (prev === 301) speak('5 minutes remaining');
        if (prev === 61) speak('1 minute remaining');
        if (prev === 31) speak('30 seconds remaining');

        return prev - 1;
      });

      setElapsedSeconds(prev => prev + 1);
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [timerStatus, selectedFood, speak]);

  // Check for actions
  useEffect(() => {
    if (timerStatus !== 'running' || !selectedFood) return;

    const elapsedMinutes = Math.floor(elapsedSeconds / 60);

    selectedFood.actions.forEach(action => {
      const actionKey = `${action.atMinute}-${action.type}`;
      if (action.atMinute === elapsedMinutes && !firedActions.includes(actionKey)) {
        setFiredActions(prev => [...prev, actionKey]);
        setCurrentAction(action);
        speak(action.message);

        // Auto-dismiss after 10 seconds
        setTimeout(() => {
          setCurrentAction(prev => prev === action ? null : prev);
        }, 10000);
      }
    });
  }, [elapsedSeconds, timerStatus, selectedFood, firedActions, speak]);

  // Calculate progress
  const progress = totalSeconds > 0 ? ((totalSeconds - remainingSeconds) / totalSeconds) * 100 : 0;
  const elapsedMinutes = Math.floor(elapsedSeconds / 60);

  return (
    <div className="min-h-screen bg-cream-white">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-cream-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-3xl mx-auto px-4 h-16 flex items-center justify-between">
          {view !== 'select' ? (
            <button
              onClick={() => {
                if (timerStatus === 'running' || timerStatus === 'paused') {
                  // Don't go back while timer is active
                  return;
                }
                setView(view === 'timer' ? 'detail' : 'select');
              }}
              className={`p-2 -ml-2 rounded-full transition-colors ${timerStatus === 'running' || timerStatus === 'paused' ? 'opacity-30 cursor-not-allowed' : 'hover:bg-gray-100'}`}
              disabled={timerStatus === 'running' || timerStatus === 'paused'}
            >
              <ChevronLeft size={24} />
            </button>
          ) : (
            <div className="w-10" />
          )}

          <h1 className="font-semibold text-lg text-deep-charcoal">Air Fryer Timer</h1>

          <button
            onClick={() => {
              setVoiceEnabled(!voiceEnabled);
              if (!voiceEnabled) {
                setTimeout(() => speak("Voice alerts enabled"), 100);
              }
            }}
            className={`
              p-2.5 rounded-full border-2 transition-all
              ${voiceEnabled
                ? 'bg-warm-orange border-warm-orange text-white'
                : 'bg-white border-gray-200 text-gray-400 hover:border-gray-300'
              }
            `}
            title={voiceEnabled ? "Voice alerts on" : "Voice alerts off"}
          >
            {voiceEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
          </button>
        </div>
      </header>

      {/* Alert Banner */}
      <AlertBanner action={currentAction} onDismiss={() => setCurrentAction(null)} />

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-4 py-6">
        {/* Food Selection View */}
        {view === 'select' && (
          <div className="animate-fade-in">
            {/* Search */}
            <div className="relative mb-4">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search foods..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-gray-200 bg-white text-lg focus:border-warm-orange focus:outline-none transition-colors"
              />
            </div>

            {/* Categories */}
            <div className="mb-6">
              <CategoryPills selected={selectedCategory} onSelect={setSelectedCategory} />
            </div>

            {/* Food Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filteredFoods.map(food => (
                <FoodCard
                  key={food.id}
                  food={food}
                  onSelect={handleSelectFood}
                  isSelected={selectedFood?.id === food.id}
                />
              ))}
            </div>

            {filteredFoods.length === 0 && (
              <div className="text-center py-12 text-smoke-gray">
                <p className="text-lg">No foods found</p>
                <p className="text-sm mt-1">Try a different search term</p>
              </div>
            )}
          </div>
        )}

        {/* Food Detail View */}
        {view === 'detail' && selectedFood && (
          <div className="animate-fade-in">
            {/* Food Header */}
            <div className="text-center mb-6">
              <span className="text-6xl mb-4 block">{selectedFood.image}</span>
              <h2 className="text-2xl font-bold text-deep-charcoal">{selectedFood.name}</h2>
              <div className="flex items-center justify-center gap-6 mt-3 text-smoke-gray">
                <span className="flex items-center gap-2">
                  <Clock size={18} />
                  <span className="font-semibold">{selectedFood.cookTime} min</span>
                </span>
                <span className="flex items-center gap-2">
                  <Thermometer size={18} />
                  <span className="font-semibold">{selectedFood.temperature}°F</span>
                </span>
              </div>
            </div>

            {/* Instructions */}
            <InstructionsPanel
              food={selectedFood}
              elapsedMinutes={0}
              status="idle"
            />

            {/* Actions Preview */}
            {selectedFood.actions.length > 0 && (
              <div className="mt-4 bg-amber-50 rounded-2xl p-5 border border-amber-200">
                <h4 className="font-semibold text-amber-800 mb-3 flex items-center gap-2">
                  <AlertTriangle size={18} />
                  During Cooking Reminders
                </h4>
                <div className="space-y-2">
                  {selectedFood.actions.map((action, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-sm text-amber-700">
                      <span className="font-mono bg-amber-100 px-2 py-1 rounded">@{action.atMinute}min</span>
                      <span>{action.message}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Start Button */}
            <button
              onClick={handleStartCooking}
              className="w-full mt-6 bg-warm-orange text-white py-4 rounded-xl font-semibold text-lg hover:bg-golden-amber transition-colors active:scale-[0.98] flex items-center justify-center gap-2"
            >
              <Play size={24} />
              Start Cooking
            </button>
          </div>
        )}

        {/* Timer View */}
        {view === 'timer' && selectedFood && (
          <div className="animate-fade-in">
            {/* Timer Display */}
            <div className={`
              rounded-3xl p-8 text-center mb-6 transition-colors duration-500
              ${timerStatus === 'complete'
                ? 'bg-success-green'
                : timerStatus === 'paused'
                  ? 'bg-gray-700'
                  : 'bg-deep-charcoal'
              }
            `}>
              <div className="relative inline-block">
                <ProgressRing
                  progress={progress}
                  isAlert={!!currentAction}
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="timer-display text-6xl md:text-7xl font-bold text-white">
                    {formatTime(remainingSeconds)}
                  </span>
                  <span className="text-white/70 text-sm mt-2">
                    {timerStatus === 'complete'
                      ? 'DONE!'
                      : timerStatus === 'paused'
                        ? 'PAUSED'
                        : 'remaining'}
                  </span>
                </div>
              </div>

              <div className="mt-6">
                <h2 className="text-white text-xl font-semibold">{selectedFood.name}</h2>
                <p className="text-white/60 mt-1">{selectedFood.temperature}°F</p>
              </div>
            </div>

            {/* Timer Controls */}
            <div className="flex gap-4 mb-6">
              {timerStatus === 'running' && (
                <button
                  onClick={handlePause}
                  className="flex-1 py-4 rounded-xl border-2 border-deep-charcoal text-deep-charcoal font-semibold flex items-center justify-center gap-2 hover:bg-deep-charcoal hover:text-white transition-colors"
                >
                  <Pause size={20} />
                  Pause
                </button>
              )}

              {timerStatus === 'paused' && (
                <button
                  onClick={handleResume}
                  className="flex-1 py-4 rounded-xl bg-warm-orange text-white font-semibold flex items-center justify-center gap-2 hover:bg-golden-amber transition-colors"
                >
                  <Play size={20} />
                  Resume
                </button>
              )}

              {timerStatus === 'complete' && (
                <button
                  onClick={handleReset}
                  className="flex-1 py-4 rounded-xl bg-success-green text-white font-semibold flex items-center justify-center gap-2 hover:bg-green-600 transition-colors"
                >
                  <Check size={20} />
                  Done - Cook Again
                </button>
              )}

              {(timerStatus === 'running' || timerStatus === 'paused') && (
                <button
                  onClick={handleReset}
                  className="py-4 px-6 rounded-xl border-2 border-gray-300 text-smoke-gray font-semibold flex items-center justify-center gap-2 hover:border-gray-400 hover:text-gray-600 transition-colors"
                >
                  <RotateCcw size={20} />
                  Reset
                </button>
              )}
            </div>

            {/* Instructions during cooking */}
            <InstructionsPanel
              food={selectedFood}
              elapsedMinutes={elapsedMinutes}
              status={timerStatus}
            />

            {/* Upcoming Actions */}
            {timerStatus === 'running' && selectedFood.actions.length > 0 && (
              <div className="mt-4 bg-white rounded-2xl p-5 shadow-sm">
                <h4 className="font-semibold text-deep-charcoal mb-3">Upcoming Alerts</h4>
                <div className="space-y-2">
                  {selectedFood.actions
                    .filter(a => a.atMinute > elapsedMinutes)
                    .map((action, idx) => (
                      <div key={idx} className="flex items-center gap-3 text-sm">
                        <span className="font-mono bg-gray-100 px-2 py-1 rounded text-smoke-gray">
                          in {action.atMinute - elapsedMinutes} min
                        </span>
                        <span className="text-deep-charcoal">{action.message}</span>
                      </div>
                    ))}
                  {selectedFood.actions.filter(a => a.atMinute > elapsedMinutes).length === 0 && (
                    <p className="text-sm text-smoke-gray">No more alerts - you're almost done!</p>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
