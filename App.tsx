import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { HabitProvider } from './context/HabitContext';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import AddHabit from './pages/AddHabit';
import Stats from './pages/Stats';
import Profile from './pages/Profile';
import ReminderOverlay from './components/ReminderOverlay';

const App: React.FC = () => {
  return (
    <HabitProvider>
      <HashRouter>
        <ReminderOverlay />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="stats" element={<Stats />} />
            <Route path="profile" element={<Profile />} />
          </Route>
          <Route path="/add" element={<AddHabit />} />
        </Routes>
      </HashRouter>
    </HabitProvider>
  );
};

export default App;