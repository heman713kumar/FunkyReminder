import React from 'react';
import { motion } from 'framer-motion';
import { ThemeStyle } from '../types';
import { Droplets, Zap, Leaf, Activity, Sparkles } from 'lucide-react';

interface VisualThemeProps {
  theme: ThemeStyle;
  fullScreen?: boolean;
}

const VisualTheme: React.FC<VisualThemeProps> = ({ theme, fullScreen = false }) => {
  const containerClass = fullScreen 
    ? "fixed inset-0 z-0 flex items-center justify-center overflow-hidden bg-black" 
    : "relative w-full h-40 rounded-xl overflow-hidden bg-gray-900 flex items-center justify-center";

  // Cyberpunk Theme
  if (theme === ThemeStyle.CYBERPUNK) {
    return (
      <div className={`${containerClass} bg-slate-900`}>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
        {/* Neon Grid */}
        <div className="absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-neon-purple/30 to-transparent" />
        
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
            filter: ["hue-rotate(0deg)", "hue-rotate(90deg)", "hue-rotate(0deg)"]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="relative z-10"
        >
          <Zap size={fullScreen ? 120 : 48} className="text-neon-blue drop-shadow-[0_0_15px_rgba(0,243,255,0.8)]" />
        </motion.div>

        {/* Floating particles */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-neon-pink rounded-full"
            initial={{ x: Math.random() * 100 - 50, y: 100, opacity: 0, width: 4, height: 4 }}
            animate={{ y: -100, opacity: [0, 1, 0] }}
            transition={{ duration: 2 + Math.random(), repeat: Infinity, delay: Math.random() * 2 }}
            style={{ left: `${Math.random() * 100}%` }}
          />
        ))}
      </div>
    );
  }

  // Nature Theme
  if (theme === ThemeStyle.NATURE) {
    return (
      <div className={`${containerClass} bg-emerald-900`}>
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 bg-gradient-to-br from-emerald-800 to-green-950"
        />
        
        <motion.div
          animate={{ y: [0, -10, 0], rotate: [0, 5, -5, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="relative z-10"
        >
          <Leaf size={fullScreen ? 120 : 48} className="text-green-400 drop-shadow-lg" />
        </motion.div>

        {/* Rain/Dew */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-white/20 rounded-full"
            style={{ width: Math.random() * 10 + 5, height: Math.random() * 10 + 5, left: `${Math.random() * 100}%` }}
            animate={{ y: [0, fullScreen ? 800 : 150], opacity: [0, 1, 0] }}
            transition={{ duration: 3 + Math.random(), repeat: Infinity, delay: Math.random() * 3 }}
          />
        ))}
      </div>
    );
  }

  // Hydration / Playful Theme
  if (theme === ThemeStyle.CUTE) {
    return (
      <div className={`${containerClass} bg-blue-900`}>
         <div className="absolute inset-0 bg-gradient-to-b from-blue-400/20 to-blue-900/50" />
        <motion.div
          className="relative z-10 bg-blue-400 rounded-full flex items-center justify-center"
          style={{ width: fullScreen ? 150 : 60, height: fullScreen ? 150 : 60 }}
          animate={{ 
            y: [0, -20, 0],
            scaleX: [1, 1.1, 0.95, 1],
            scaleY: [1, 0.9, 1.1, 1]
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-white rounded-full opacity-60"></div>
          <Droplets size={fullScreen ? 80 : 32} className="text-white" />
        </motion.div>
        
        {/* Ripples */}
        <motion.div
           className="absolute border-4 border-blue-400 rounded-full"
           style={{ width: fullScreen ? 150 : 60, height: fullScreen ? 150 : 60 }}
           animate={{ scale: [1, 2], opacity: [1, 0] }}
           transition={{ duration: 2, repeat: Infinity }}
        />
      </div>
    );
  }

  // Abstract Theme
  if (theme === ThemeStyle.ABSTRACT) {
    return (
      <div className={`${containerClass} bg-indigo-950`}>
         <motion.div 
            className="absolute inset-0 opacity-50"
            style={{ background: 'conic-gradient(from 0deg, #4f46e5, #9333ea, #4f46e5)' }}
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
         />
         <motion.div
           className="relative z-10"
           animate={{ rotate: -360 }}
           transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
         >
           <Activity size={fullScreen ? 120 : 48} className="text-white mix-blend-overlay" />
         </motion.div>
      </div>
    );
  }

  // Default Minimal
  return (
    <div className={`${containerClass} bg-gray-900`}>
      <motion.div
        animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.05, 1] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute inset-0 bg-gray-800 rounded-full blur-3xl opacity-30 transform scale-50"
      />
      <motion.div
        animate={{ rotate: [0, 10, -10, 0] }}
        transition={{ duration: 10, repeat: Infinity }}
        className="relative z-10"
      >
        <Sparkles size={fullScreen ? 120 : 48} className="text-gray-200" />
      </motion.div>
    </div>
  );
};

export default VisualTheme;