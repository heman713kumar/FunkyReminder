import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useHabit } from '../context/HabitContext';
import VisualTheme from './VisualTheme';
import { getRandomFact } from '../constants';
import { Check, Clock, X } from 'lucide-react';

const ReminderOverlay: React.FC = () => {
  const { activeReminder, completeReminder, snoozeReminder } = useHabit();
  const [fact, setFact] = useState<string>("");

  useEffect(() => {
    if (activeReminder) {
      setFact(getRandomFact(activeReminder.category));
    }
  }, [activeReminder]);

  if (!activeReminder) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden"
      >
        {/* Background Animation */}
        <VisualTheme theme={activeReminder.theme} fullScreen={true} />

        {/* Content Overlay */}
        <div className="relative z-50 w-full max-w-md px-6 text-center text-white">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <h2 className="text-xl font-medium tracking-widest uppercase opacity-80 mb-2">It's time to</h2>
            <h1 className="text-5xl font-display font-bold mb-4 drop-shadow-lg">{activeReminder.name}</h1>
            <div className="bg-black/30 backdrop-blur-md p-4 rounded-xl border border-white/10">
              <p className="text-lg italic font-light">"{fact}"</p>
            </div>
          </motion.div>

          <motion.div 
             initial={{ scale: 0.8, opacity: 0 }}
             animate={{ scale: 1, opacity: 1 }}
             transition={{ delay: 0.5 }}
             className="flex flex-col gap-4"
          >
            <button
              onClick={completeReminder}
              className="group relative flex items-center justify-center w-full py-5 bg-white text-black rounded-2xl font-bold text-xl shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:shadow-[0_0_50px_rgba(255,255,255,0.5)] transition-all transform hover:scale-105"
            >
              <Check className="mr-2" />
              Complete Habit
              <div className="absolute inset-0 border-2 border-white rounded-2xl animate-ping opacity-20"></div>
            </button>

            <div className="flex gap-3">
              <button
                onClick={snoozeReminder}
                className="flex-1 flex items-center justify-center py-4 bg-white/10 backdrop-blur-md rounded-xl font-semibold border border-white/20 hover:bg-white/20 transition-all"
              >
                <Clock className="mr-2 w-5 h-5" />
                Snooze 5m
              </button>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ReminderOverlay;