import React from 'react';
import { useHabit } from '../context/HabitContext';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const Stats: React.FC = () => {
  const { habits, userPoints } = useHabit();

  const data = habits.map(h => ({
    name: h.name.substring(0, 10),
    completions: h.totalCompletions,
    streak: h.streak
  }));

  // Neon colors
  const colors = ['#00f3ff', '#ff00ff', '#00ff9d', '#bd00ff', '#fbbf24'];

  return (
    <div className="pb-24 pt-6 px-4 max-w-lg mx-auto min-h-screen">
      <h1 className="text-3xl font-display font-bold text-white mb-8">Insights</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-gray-800 p-5 rounded-2xl border border-gray-700">
          <p className="text-gray-400 text-sm mb-1">Total Points</p>
          <p className="text-3xl font-bold text-neon-green">{userPoints}</p>
        </div>
        <div className="bg-gray-800 p-5 rounded-2xl border border-gray-700">
          <p className="text-gray-400 text-sm mb-1">Active Habits</p>
          <p className="text-3xl font-bold text-white">{habits.length}</p>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700 mb-8">
        <h2 className="text-lg font-bold text-white mb-6">Total Completions</h2>
        <div className="h-64 w-full">
          {data.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }}
                  cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                />
                <Bar dataKey="completions" radius={[4, 4, 0, 0]}>
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full flex items-center justify-center text-gray-500">
              No data available yet
            </div>
          )}
        </div>
      </div>

      {/* Streaks List */}
      <div className="space-y-3">
        <h2 className="text-lg font-bold text-white mb-4">Current Streaks</h2>
        {habits.map((habit, idx) => (
          <div key={habit.id} className="flex items-center justify-between p-4 bg-gray-900 rounded-xl border border-gray-800">
             <div className="flex items-center">
                <div className="w-2 h-2 rounded-full mr-3" style={{ backgroundColor: colors[idx % colors.length] }}></div>
                <span className="text-white font-medium">{habit.name}</span>
             </div>
             <span className="text-orange-400 font-bold">{habit.streak} 🔥</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stats;