
import React, { useState, useEffect } from 'react';
import { AppMode, WordPair, BattleQuestion } from './types';
import { DEFAULT_WHEEL_WORDS, DEFAULT_MATCH_PAIRS, DEFAULT_BATTLE_QUESTIONS } from './constants';
import Dashboard from './components/Dashboard';
import WheelOfWords from './components/WheelOfWords';
import MatchingGame from './components/MatchingGame';
import BattleGame from './components/BattleGame';
import TeacherSettings from './components/TeacherSettings';

const App: React.FC = () => {
  const [mode, setMode] = useState<AppMode>(AppMode.DASHBOARD);
  const [wheelWords, setWheelWords] = useState<string[]>(DEFAULT_WHEEL_WORDS);
  const [matchPairs, setMatchPairs] = useState<WordPair[]>(DEFAULT_MATCH_PAIRS);
  const [battleQuestions, setBattleQuestions] = useState<BattleQuestion[]>(DEFAULT_BATTLE_QUESTIONS);

  const navigateTo = (newMode: AppMode) => setMode(newMode);

  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col items-center justify-center p-4">
      {/* Background Decor */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 opacity-20">
        <div className="absolute top-10 left-10 w-32 h-32 bg-green-300 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-yellow-200 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-100 rounded-full blur-[100px]"></div>
      </div>

      <main className="relative z-10 w-full max-w-4xl bg-white/60 backdrop-blur-md rounded-[40px] shadow-2xl border-4 border-white min-h-[650px] flex flex-col">
        {/* Header Branding */}
        <header className="pt-8 px-8 flex justify-between items-center">
          <button 
            onClick={() => navigateTo(AppMode.DASHBOARD)}
            className="flex items-center gap-2 hover:scale-105 transition-transform"
          >
            <span className="text-4xl">🐼</span>
            <h1 className="text-3xl font-bold text-green-800 tracking-tight">PandaLearn</h1>
          </button>
          
          <button 
            onClick={() => navigateTo(AppMode.TEACHER)}
            className="bg-orange-400 hover:bg-orange-500 text-white px-6 py-2 rounded-full font-bold shadow-lg transition-all active:translate-y-1"
          >
            ⚙️ Teacher Room
          </button>
        </header>

        <div className="flex-1 p-6 md:p-10 flex items-center justify-center">
          {mode === AppMode.DASHBOARD && <Dashboard onNavigate={navigateTo} />}
          {mode === AppMode.WHEEL && (
            <WheelOfWords 
              words={wheelWords} 
              onBack={() => navigateTo(AppMode.DASHBOARD)} 
            />
          )}
          {mode === AppMode.MATCHING && (
            <MatchingGame 
              pairs={matchPairs} 
              onBack={() => navigateTo(AppMode.DASHBOARD)} 
            />
          )}
          {mode === AppMode.BATTLE && (
            <BattleGame 
              questions={battleQuestions} 
              onBack={() => navigateTo(AppMode.DASHBOARD)} 
            />
          )}
          {mode === AppMode.TEACHER && (
            <TeacherSettings 
              wheelWords={wheelWords}
              matchPairs={matchPairs}
              battleQuestions={battleQuestions}
              setWheelWords={setWheelWords}
              setMatchPairs={setMatchPairs}
              setBattleQuestions={setBattleQuestions}
              onBack={() => navigateTo(AppMode.DASHBOARD)}
            />
          )}
        </div>
        
        <footer className="pb-6 text-center text-green-700 font-medium opacity-60 pointer-events-none">
          Let's have fun learning Chinese! 🎋🏮
        </footer>
      </main>
    </div>
  );
};

export default App;
