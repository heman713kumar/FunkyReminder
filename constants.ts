import { HabitCategory, ReminderFact } from './types';

export const HABIT_LIMIT = 5;

export const FACTS: ReminderFact[] = [
  { category: HabitCategory.HYDRATION, text: "Drinking water can boost your metabolism by up to 30%." },
  { category: HabitCategory.HYDRATION, text: "Even mild dehydration can affect your energy level and mood." },
  { category: HabitCategory.POSTURE, text: "Good posture reduces back pain and improves confidence." },
  { category: HabitCategory.POSTURE, text: "Slouching can actually decrease your lung capacity by up to 30%." },
  { category: HabitCategory.EYE_REST, text: "The 20-20-20 rule: Every 20 mins, look at something 20 feet away for 20 seconds." },
  { category: HabitCategory.STRETCH, text: "Stretching increases blood flow to your muscles." },
  { category: HabitCategory.FOCUS, text: "Short breaks actually improve your ability to focus for longer periods." },
  { category: HabitCategory.BREATHE, text: "Deep breathing activates the parasympathetic nervous system, calming you down." },
  { category: HabitCategory.CUSTOM, text: "Consistency is the key to building any new habit." },
];

export const getRandomFact = (category: HabitCategory): string => {
  const specificFacts = FACTS.filter(f => f.category === category);
  const pool = specificFacts.length > 0 ? specificFacts : FACTS;
  return pool[Math.floor(Math.random() * pool.length)].text;
};

export const MOCK_HABITS = []; // Start empty for clean onboarding