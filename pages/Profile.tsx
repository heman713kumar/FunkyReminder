import React from 'react';

const Profile: React.FC = () => {
  return (
    <div className="pb-24 pt-6 px-4 max-w-lg mx-auto">
      <h1 className="text-3xl font-display font-bold text-white mb-8">Profile</h1>
      
      <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700 text-center mb-6">
        <div className="w-24 h-24 bg-gradient-to-tr from-neon-blue to-neon-purple rounded-full mx-auto mb-4 p-1">
           <div className="w-full h-full bg-gray-900 rounded-full flex items-center justify-center">
              <span className="text-3xl">😎</span>
           </div>
        </div>
        <h2 className="text-xl font-bold">Habit Master</h2>
        <p className="text-gray-400">Pro Member</p>
      </div>

      <div className="space-y-4">
        <div className="p-4 bg-gray-900 rounded-xl border border-gray-800 flex justify-between items-center">
           <span>Sound Effects</span>
           <div className="w-10 h-6 bg-neon-green rounded-full relative cursor-pointer">
              <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm"></div>
           </div>
        </div>
        <div className="p-4 bg-gray-900 rounded-xl border border-gray-800 flex justify-between items-center">
           <span>Dark Mode</span>
           <div className="w-10 h-6 bg-neon-green rounded-full relative cursor-pointer">
              <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm"></div>
           </div>
        </div>
        <div className="p-4 bg-gray-900 rounded-xl border border-gray-800 flex justify-between items-center">
           <span>Notifications</span>
           <div className="w-10 h-6 bg-gray-700 rounded-full relative cursor-pointer">
              <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm"></div>
           </div>
        </div>
      </div>
      
      <p className="text-center text-gray-600 mt-12 text-sm">Version 1.0.0</p>
    </div>
  );
};

export default Profile;