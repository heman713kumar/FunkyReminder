import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { Home, BarChart2, User } from 'lucide-react';

const Layout: React.FC = () => {
  return (
    <div className="min-h-screen bg-dark-bg text-white font-sans selection:bg-neon-pink selection:text-white">
      <main>
        <Outlet />
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 w-full bg-dark-card/90 backdrop-blur-lg border-t border-gray-800 z-40 max-w-lg left-1/2 transform -translate-x-1/2">
        <div className="flex justify-around items-center h-20">
          <NavLink 
            to="/" 
            className={({ isActive }) => `flex flex-col items-center gap-1 transition-colors ${isActive ? 'text-neon-blue' : 'text-gray-500 hover:text-gray-300'}`}
          >
            <Home size={24} />
            <span className="text-xs font-medium">Home</span>
          </NavLink>
          
          <NavLink 
            to="/stats" 
            className={({ isActive }) => `flex flex-col items-center gap-1 transition-colors ${isActive ? 'text-neon-pink' : 'text-gray-500 hover:text-gray-300'}`}
          >
            <BarChart2 size={24} />
            <span className="text-xs font-medium">Stats</span>
          </NavLink>

          <NavLink 
            to="/profile" 
            className={({ isActive }) => `flex flex-col items-center gap-1 transition-colors ${isActive ? 'text-neon-green' : 'text-gray-500 hover:text-gray-300'}`}
          >
            <User size={24} />
            <span className="text-xs font-medium">Profile</span>
          </NavLink>
        </div>
      </nav>
    </div>
  );
};

export default Layout;