import React from 'react';
import { useHabit } from '../context/HabitContext';
import { Link } from 'react-router-dom';
import { Plus, Flame, Play, Trash2 } from 'lucide-react';
import VisualTheme from '../components/VisualTheme';
import { motion } from 'framer-motion';

const Dashboard: React.FC = () => {
  const { habits, userPoints, deleteHabit, triggerTestReminder } = useHabit();

  return (
    <div className="pb-24 pt-6 px-4 max-w-lg mx-auto">
      {/* Header */}
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold text-white">My Habits</h1>
          <p className="text-slate-400 text-sm">Keep your streak alive!</p>
        </div>
        <div className="flex items-center bg-gray-800 px-3 py-1.5 rounded-full border border-gray-700">
          <Flame className="text-orange-500 w-5 h-5 mr-1" fill="#f97316" />
          <span className="font-bold text-white">{userPoints} pts</span>
        </div>
      </header>

      {/* Habit List */}
      <div className="space-y-4">
        {habits.length === 0 ? (
          <div className="text-center py-12 bg-gray-900/50 rounded-2xl border border-dashed border-gray-700">
            <p className="text-gray-400 mb-4">No habits active yet.</p>
            <Link to="/add" className="inline-block px-6 py-2 bg-neon-blue text-black font-bold rounded-full">
              Create First Habit
            </Link>
          </div>
        ) : (
          habits.map((habit, index) => (
            <motion.div
              key={habit.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group relative overflow-hidden bg-gray-800 rounded-2xl border border-gray-700 hover:border-gray-500 transition-colors"
            >
              {/* Theme Preview Strip */}
              <div className="absolute top-0 right-0 w-24 h-full opacity-30 mask-image-linear-gradient-to-l">
                <div className="w-full h-full scale-150 transform translate-x-4">
                  <VisualTheme theme={habit.theme} />
                </div>
              </div>

              <div className="relative z-10 p-5">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs font-medium text-neon-blue bg-neon-blue/10 px-2 py-0.5 rounded uppercase tracking-wider">
                    {habit.category}
                  </span>
                  <div className="flex gap-2">
                     <button
                        onClick={() => triggerTestReminder(habit.id)}
                        className="p-1.5 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-colors"
                        title="Test Reminder"
                     >
                        <Play size={16} />
                     </button>
                     <button 
                        onClick={() => deleteHabit(habit.id)}
                        className="p-1.5 text-gray-400 hover:text-red-400 hover:bg-white/10 rounded-full transition-colors"
                     >
                        <Trash2 size={16} />
                     </button>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-1">{habit.name}</h3>
                <p className="text-sm text-gray-400 mb-4">Every {habit.intervalMinutes} mins</p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center text-orange-400">
                    <Flame size={16} className="mr-1" />
                    <span className="font-bold">{habit.streak} streak</span>
                  </div>
                  <div className="text-xs text-gray-500">
                    Next: {new Date(habit.nextReminder).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Floating Action Button */}
      {habits.length < 5 && (
        <Link
          to="/add"
          className="fixed bottom-24 right-6 w-14 h-14 bg-neon-blue text-black rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(0,243,255,0.4)] hover:scale-110 transition-transform z-40"
        >
          <Plus size={24} strokeWidth={3} />
        </Link>
      )}
    </div>
  );
};

export default Dashboard;