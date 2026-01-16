import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useHabit } from '../context/HabitContext';
import { HabitCategory, ThemeStyle } from '../types';
import VisualTheme from '../components/VisualTheme';
import { ArrowLeft, Check, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const AddHabit: React.FC = () => {
  const navigate = useNavigate();
  const { addHabit } = useHabit();
  const [step, setStep] = useState(1);
  
  const [formData, setFormData] = useState({
    name: '',
    category: HabitCategory.HYDRATION,
    intervalMinutes: 60,
    theme: ThemeStyle.CUTE,
  });

  const categories = Object.values(HabitCategory);
  const themes = Object.values(ThemeStyle);

  const handleSubmit = () => {
    addHabit({
      name: formData.name || formData.category,
      category: formData.category,
      intervalMinutes: formData.intervalMinutes,
      theme: formData.theme,
      soundEnabled: true,
    });
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-dark-bg p-6 pb-24 max-w-lg mx-auto">
      <div className="flex items-center mb-8">
        <button onClick={() => step > 1 ? setStep(step - 1) : navigate('/')} className="p-2 -ml-2 text-gray-400 hover:text-white">
          <ArrowLeft />
        </button>
        <h1 className="text-xl font-bold ml-2">New Habit {step}/3</h1>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-1 bg-gray-800 rounded-full mb-8">
        <div 
          className="h-full bg-neon-blue rounded-full transition-all duration-300" 
          style={{ width: `${(step / 3) * 100}%` }} 
        />
      </div>

      <motion.div
        key={step}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
      >
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <label className="block text-gray-400 text-sm font-medium mb-2">Category</label>
              <div className="grid grid-cols-2 gap-3">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setFormData({ ...formData, category: cat, name: cat === HabitCategory.CUSTOM ? '' : cat })}
                    className={`p-4 rounded-xl text-left border transition-all ${
                      formData.category === cat 
                        ? 'bg-neon-blue/10 border-neon-blue text-neon-blue' 
                        : 'bg-gray-800 border-transparent text-gray-300 hover:border-gray-600'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <label className="block text-gray-400 text-sm font-medium mb-2">Habit Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-gray-800 border border-gray-700 rounded-xl p-4 text-white focus:outline-none focus:border-neon-blue"
                placeholder="e.g. Drink Water"
              />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
             <h2 className="text-2xl font-display font-bold text-white">How often?</h2>
             <div className="grid grid-cols-2 gap-4">
                {[15, 30, 45, 60, 90, 120].map((min) => (
                   <button
                    key={min}
                    onClick={() => setFormData({...formData, intervalMinutes: min})}
                    className={`p-6 rounded-2xl flex flex-col items-center justify-center border-2 transition-all ${
                       formData.intervalMinutes === min
                       ? 'border-neon-green bg-neon-green/10 text-white'
                       : 'border-gray-700 bg-gray-800 text-gray-400 hover:border-gray-600'
                    }`}
                   >
                      <span className="text-3xl font-bold mb-1">{min}</span>
                      <span className="text-xs uppercase tracking-wider">Minutes</span>
                   </button>
                ))}
             </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-display font-bold text-white">Choose Theme</h2>
            <div className="space-y-4">
              {themes.map((theme) => (
                <div 
                  key={theme}
                  onClick={() => setFormData({ ...formData, theme })}
                  className={`relative rounded-xl overflow-hidden cursor-pointer border-2 transition-all ${
                    formData.theme === theme ? 'border-neon-pink shadow-[0_0_20px_rgba(255,0,255,0.3)]' : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <div className="absolute top-3 left-3 z-10 font-bold bg-black/50 px-2 py-1 rounded backdrop-blur-sm text-sm">
                    {theme}
                  </div>
                  <VisualTheme theme={theme} />
                </div>
              ))}
            </div>
          </div>
        )}
      </motion.div>

      {/* Footer Navigation */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-dark-bg border-t border-gray-800 max-w-lg mx-auto">
        <button
          onClick={() => step < 3 ? setStep(step + 1) : handleSubmit()}
          className="w-full py-4 bg-white text-black font-bold rounded-xl flex items-center justify-center text-lg hover:bg-gray-200 transition-colors"
        >
          {step < 3 ? (
            <>Next <ChevronRight className="ml-2" /></>
          ) : (
            <>Create Habit <Check className="ml-2" /></>
          )}
        </button>
      </div>
    </div>
  );
};

export default AddHabit;