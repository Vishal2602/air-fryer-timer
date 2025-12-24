import React, { createContext, useContext, useReducer, useEffect, useCallback, useRef } from 'react';
import { useVoice } from '../hooks/useVoice';

const TimerContext = createContext(null);

const initialState = {
  status: 'idle', // idle | running | paused | complete
  selectedFood: null,
  totalSeconds: 0,
  remainingSeconds: 0,
  elapsedSeconds: 0,
  firedActions: [],
  currentAction: null
};

function timerReducer(state, action) {
  switch (action.type) {
    case 'SELECT_FOOD':
      return {
        ...initialState,
        selectedFood: action.food,
        totalSeconds: action.food.cookTime * 60,
        remainingSeconds: action.food.cookTime * 60
      };
    case 'START':
      return { ...state, status: 'running' };
    case 'PAUSE':
      return { ...state, status: 'paused' };
    case 'TICK':
      const newRemaining = state.remainingSeconds - 1;
      const newElapsed = state.elapsedSeconds + 1;
      if (newRemaining <= 0) {
        return {
          ...state,
          remainingSeconds: 0,
          elapsedSeconds: newElapsed,
          status: 'complete'
        };
      }
      return {
        ...state,
        remainingSeconds: newRemaining,
        elapsedSeconds: newElapsed
      };
    case 'FIRE_ACTION':
      return {
        ...state,
        firedActions: [...state.firedActions, action.actionId],
        currentAction: action.action
      };
    case 'CLEAR_ACTION':
      return { ...state, currentAction: null };
    case 'COMPLETE':
      return { ...state, status: 'complete' };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

export function TimerProvider({ children }) {
  const [state, dispatch] = useReducer(timerReducer, initialState);
  const { speak, enabled: voiceEnabled } = useVoice();
  const intervalRef = useRef(null);
  const firedWarningsRef = useRef(new Set());

  // Handle timer tick
  useEffect(() => {
    if (state.status !== 'running') {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    intervalRef.current = setInterval(() => {
      dispatch({ type: 'TICK' });
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [state.status]);

  // Check for actions and time warnings
  useEffect(() => {
    if (state.status !== 'running' || !state.selectedFood) return;

    const elapsedMinutes = Math.floor(state.elapsedSeconds / 60);

    // Check for mid-cook actions
    state.selectedFood.actions?.forEach(action => {
      const actionId = `${action.atMinute}-${action.type}`;
      if (action.atMinute === elapsedMinutes && !state.firedActions.includes(actionId)) {
        dispatch({ type: 'FIRE_ACTION', actionId, action });
        if (voiceEnabled) {
          speak(action.message);
        }
      }
    });

    // Time-based voice alerts
    const warningKey = `warning-${state.remainingSeconds}`;
    if (!firedWarningsRef.current.has(warningKey)) {
      if (state.remainingSeconds === 300) {
        firedWarningsRef.current.add(warningKey);
        speak('5 minutes remaining');
      } else if (state.remainingSeconds === 60) {
        firedWarningsRef.current.add(warningKey);
        speak('1 minute remaining');
      } else if (state.remainingSeconds === 30) {
        firedWarningsRef.current.add(warningKey);
        speak('30 seconds remaining');
      }
    }
  }, [state.elapsedSeconds, state.remainingSeconds, state.status, state.selectedFood, state.firedActions, voiceEnabled, speak]);

  // Handle completion
  useEffect(() => {
    if (state.status === 'complete' && state.selectedFood) {
      speak(`Your ${state.selectedFood.name} is ready!`);
    }
  }, [state.status, state.selectedFood, speak]);

  const selectFood = useCallback((food) => {
    firedWarningsRef.current.clear();
    dispatch({ type: 'SELECT_FOOD', food });
  }, []);

  const start = useCallback(() => {
    dispatch({ type: 'START' });
  }, []);

  const pause = useCallback(() => {
    dispatch({ type: 'PAUSE' });
  }, []);

  const reset = useCallback(() => {
    firedWarningsRef.current.clear();
    dispatch({ type: 'RESET' });
  }, []);

  const clearAction = useCallback(() => {
    dispatch({ type: 'CLEAR_ACTION' });
  }, []);

  const value = {
    ...state,
    selectFood,
    start,
    pause,
    reset,
    clearAction
  };

  return (
    <TimerContext.Provider value={value}>
      {children}
    </TimerContext.Provider>
  );
}

export function useTimer() {
  const context = useContext(TimerContext);
  if (!context) {
    throw new Error('useTimer must be used within a TimerProvider');
  }
  return context;
}

export default TimerContext;
