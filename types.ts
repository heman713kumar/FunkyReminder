export enum HabitCategory {
  POSTURE = 'Posture Check',
  HYDRATION = 'Hydration',
  STRETCH = 'Stretch & Move',
  EYE_REST = 'Eye Rest',
  FOCUS = 'Deep Focus',
  BREATHE = 'Deep Breathing',
  CUSTOM = 'Custom',
}

export enum ThemeStyle {
  CYBERPUNK = 'Cyberpunk',
  NATURE = 'Nature',
  MINIMAL = 'Minimalist',
  ABSTRACT = 'Abstract',
  CUTE = 'Playful',
}

export interface Habit {
  id: string;
  name: string;
  category: HabitCategory;
  intervalMinutes: number;
  nextReminder: number; // Timestamp
  theme: ThemeStyle;
  soundEnabled: boolean;
  streak: number;
  totalCompletions: number;
  history: number[]; // Array of completion timestamps
  active: boolean;
}

export interface ReminderFact {
  category: HabitCategory;
  text: string;
}

export interface AppState {
  habits: Habit[];
  activeReminder: Habit | null; // If not null, overlay is shown
  userPoints: number;
}