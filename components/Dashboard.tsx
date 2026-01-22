
import React from 'react';
import { AppMode } from '../types';

interface DashboardProps {
  onNavigate: (mode: AppMode) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  return (
    <div className="flex flex-col items-center gap-8 text-center w-full">
      <div className="space-y-4">
        <h2 className="text-4xl md:text-5xl font-extrabold text-green-900 drop-shadow-sm">
          Welcome, Little Dragon! 🐉
        </h2>
        <p className="text-xl text-green-700 font-medium">Which game do you want to play today?</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
        <button
          onClick={() => onNavigate(AppMode.WHEEL)}
          className="group relative bg-gradient-to-br from-yellow-300 to-orange-400 p-6 rounded-[30px] shadow-[0_10px_0_0_rgba(251,146,60,1)] hover:shadow-[0_5px_0_0_rgba(251,146,60,1)] transition-all transform active:translate-y-[5px] active:shadow-none hover:-translate-y-1"
        >
          <div className="text-6xl mb-4 group-hover:rotate-12 transition-transform">🎡</div>
          <h3 className="text-2xl font-black text-white uppercase tracking-wider">Magic Wheel</h3>
          <p className="text-orange-900 font-bold mt-2 opacity-80">Spin & Say!</p>
        </button>

        <button
          onClick={() => onNavigate(AppMode.MATCHING)}
          className="group relative bg-gradient-to-br from-blue-400 to-indigo-500 p-6 rounded-[30px] shadow-[0_10px_0_0_rgba(79,70,229,1)] hover:shadow-[0_5px_0_0_rgba(79,70,229,1)] transition-all transform active:translate-y-[5px] active:shadow-none hover:-translate-y-1"
        >
          <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">🧩</div>
          <h3 className="text-2xl font-black text-white uppercase tracking-wider">Pair Match</h3>
          <p className="text-blue-900 font-bold mt-2 opacity-80">Connect Them!</p>
        </button>

        <button
          onClick={() => onNavigate(AppMode.BATTLE)}
          className="group relative bg-gradient-to-br from-red-400 to-rose-600 p-6 rounded-[30px] shadow-[0_10px_0_0_rgba(225,29,72,1)] hover:shadow-[0_5px_0_0_rgba(225,29,72,1)] transition-all transform active:translate-y-[5px] active:shadow-none hover:-translate-y-1"
        >
          <div className="text-6xl mb-4 group-hover:animate-bounce transition-transform">⚔️</div>
          <h3 className="text-2xl font-black text-white uppercase tracking-wider">Hero Battle</h3>
          <p className="text-red-900 font-bold mt-2 opacity-80">Defeat the Boss!</p>
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
