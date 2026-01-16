import React, { createContext, useContext, useState, useEffect } from 'react';
import { Habit, AppState, HabitCategory, ThemeStyle } from '../types';
import { HABIT_LIMIT } from '../constants';

interface HabitContextType extends AppState {
  addHabit: (habit: Omit<Habit, 'id' | 'streak' | 'totalCompletions' | 'nextReminder' | 'active' | 'history'>) => void;
  deleteHabit: (id: string) => void;
  completeReminder: () => void;
  snoozeReminder: () => void;
  triggerTestReminder: (habitId: string) => void;
}

const HabitContext = createContext<HabitContextType | undefined>(undefined);

export const useHabit = () => {
  const context = useContext(HabitContext);
  if (!context) throw new Error('useHabit must be used within a HabitProvider');
  return context;
};

export const HabitProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [habits, setHabits] = useState<Habit[]>(() => {
    const saved = localStorage.getItem('habits');
    return saved ? JSON.parse(saved) : [];
  });

  const [activeReminder, setActiveReminder] = useState<Habit | null>(null);
  const [userPoints, setUserPoints] = useState<number>(() => {
    return parseInt(localStorage.getItem('userPoints') || '0');
  });

  // Persist habits
  useEffect(() => {
    localStorage.setItem('habits', JSON.stringify(habits));
    localStorage.setItem('userPoints', userPoints.toString());
  }, [habits, userPoints]);

  // Timer Logic
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      
      // Find a habit that needs reminding and isn't already active
      const dueHabit = habits.find(h => h.active && h.nextReminder <= now && !activeReminder);
      
      if (dueHabit) {
        setActiveReminder(dueHabit);
      }
    }, 5000); // Check every 5 seconds for efficiency

    return () => clearInterval(interval);
  }, [habits, activeReminder]);

  const addHabit = (newHabitData: Omit<Habit, 'id' | 'streak' | 'totalCompletions' | 'nextReminder' | 'active' | 'history'>) => {
    if (habits.length >= HABIT_LIMIT) return;

    const newHabit: Habit = {
      ...newHabitData,
      id: crypto.randomUUID(),
      streak: 0,
      totalCompletions: 0,
      active: true,
      history: [],
      nextReminder: Date.now() + newHabitData.intervalMinutes * 60 * 1000
    };

    setHabits(prev => [...prev, newHabit]);
  };

  const deleteHabit = (id: string) => {
    setHabits(prev => prev.filter(h => h.id !== id));
  };

  const completeReminder = () => {
    if (!activeReminder) return;

    setHabits(prev => prev.map(h => {
      if (h.id === activeReminder.id) {
        return {
          ...h,
          streak: h.streak + 1,
          totalCompletions: h.totalCompletions + 1,
          history: [...h.history, Date.now()],
          nextReminder: Date.now() + h.intervalMinutes * 60 * 1000
        };
      }
      return h;
    }));

    setUserPoints(prev => prev + 10);
    setActiveReminder(null);
  };

  const snoozeReminder = () => {
    if (!activeReminder) return;
    
    // Snooze for 5 minutes
    setHabits(prev => prev.map(h => {
        if(h.id === activeReminder.id) {
            return {
                ...h,
                nextReminder: Date.now() + 5 * 60 * 1000
            }
        }
        return h;
    }));
    setActiveReminder(null);
  };

  const triggerTestReminder = (habitId: string) => {
    const habit = habits.find(h => h.id === habitId);
    if (habit) setActiveReminder(habit);
  };

  return (
    <HabitContext.Provider value={{ habits, activeReminder, userPoints, addHabit, deleteHabit, completeReminder, snoozeReminder, triggerTestReminder }}>
      {children}
    </HabitContext.Provider>
  );
};