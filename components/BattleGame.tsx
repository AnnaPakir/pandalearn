
import React, { useState, useEffect, useMemo } from 'react';
import { BattleQuestion, Hero } from '../types';
import { HEROES } from '../constants';

interface BattleGameProps {
  questions: BattleQuestion[];
  onBack: () => void;
}

const BattleGame: React.FC<BattleGameProps> = ({ questions, onBack }) => {
  const [stage, setStage] = useState<'SELECT' | 'FIGHT' | 'WIN'>('SELECT');
  const [selectedHeroes, setSelectedHeroes] = useState<Hero[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [scores, setScores] = useState<number[]>([0, 0]);
  const [activeHeroIndex, setActiveHeroIndex] = useState<number | null>(null);
  const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);
  const [lastResult, setLastResult] = useState<'CORRECT' | 'WRONG' | null>(null);

  const currentQuestion = questions[currentQuestionIndex];

  // Pick heroes
  const toggleHero = (hero: Hero) => {
    if (selectedHeroes.find(h => h.id === hero.id)) {
      setSelectedHeroes(selectedHeroes.filter(h => h.id !== hero.id));
    } else if (selectedHeroes.length < 2) {
      setSelectedHeroes([...selectedHeroes, hero]);
    }
  };

  const startFight = () => {
    if (selectedHeroes.length === 2) {
      setStage('FIGHT');
      nextTurn();
    }
  };

  const nextTurn = () => {
    setLastResult(null);
    setActiveHeroIndex(Math.floor(Math.random() * 2));
    const currentQ = questions[currentQuestionIndex];
    if (currentQ) {
      setShuffledOptions([currentQ.correctAnswer, currentQ.wrongAnswer].sort(() => Math.random() - 0.5));
    }
  };

  const handleAnswer = (answer: string) => {
    const isCorrect = answer === currentQuestion.correctAnswer;
    setLastResult(isCorrect ? 'CORRECT' : 'WRONG');

    if (isCorrect && activeHeroIndex !== null) {
      const newScores = [...scores];
      newScores[activeHeroIndex] += 1;
      setScores(newScores);
    }

    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
        nextTurn();
      } else {
        setStage('WIN');
      }
    }, 1500);
  };

  if (stage === 'SELECT') {
    return (
      <div className="w-full flex flex-col items-center gap-8">
        <h2 className="text-4xl font-black text-rose-800">Choose 2 Heroes! ⚔️</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
          {HEROES.map(hero => (
            <button
              key={hero.id}
              onClick={() => toggleHero(hero)}
              className={`p-6 rounded-[30px] border-4 transition-all flex flex-col items-center gap-2 transform hover:scale-105 ${
                selectedHeroes.find(h => h.id === hero.id)
                  ? 'border-rose-500 bg-rose-50 scale-105 shadow-xl'
                  : 'border-white bg-white/40 grayscale hover:grayscale-0'
              }`}
            >
              <div className="text-6xl">{hero.emoji}</div>
              <div className="font-bold text-rose-900">{hero.name}</div>
            </button>
          ))}
        </div>
        <button
          disabled={selectedHeroes.length !== 2}
          onClick={startFight}
          className={`mt-4 px-12 py-4 rounded-3xl font-black text-2xl text-white shadow-xl transition-all active:translate-y-1 ${
            selectedHeroes.length === 2 ? 'bg-rose-500 hover:bg-rose-600' : 'bg-gray-300 cursor-not-allowed'
          }`}
        >
          FIGHT!
        </button>
      </div>
    );
  }

  if (stage === 'WIN') {
    const winnerIdx = scores[0] >= scores[1] ? 0 : 1;
    return (
      <div className="text-center space-y-8 animate-in zoom-in duration-500">
        <h2 className="text-6xl font-black text-rose-600">VICTORY! 🎉</h2>
        <div className="flex flex-col items-center gap-4">
          <div className="text-9xl animate-bounce">{selectedHeroes[winnerIdx].emoji}</div>
          <p className="text-3xl font-bold text-rose-900">{selectedHeroes[winnerIdx].name} Wins!</p>
        </div>
        <div className="flex gap-4">
           <button onClick={() => { setStage('SELECT'); setScores([0, 0]); setCurrentQuestionIndex(0); setSelectedHeroes([]); }} className="bg-rose-500 text-white px-8 py-3 rounded-2xl font-bold">New Battle</button>
           <button onClick={onBack} className="bg-gray-200 text-gray-700 px-8 py-3 rounded-2xl font-bold">Menu</button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center gap-6">
      {/* The Battle Arena */}
      <div className="w-full flex justify-between items-center px-4 md:px-12 relative h-48">
        {selectedHeroes.map((hero, idx) => (
          <div key={idx} className={`flex flex-col items-center transition-all duration-300 ${activeHeroIndex === idx ? 'scale-125' : 'opacity-50 scale-90'}`}>
             <div className="text-7xl drop-shadow-lg">{hero.emoji}</div>
             <div className="mt-2 w-24 bg-gray-200 h-3 rounded-full overflow-hidden border-2 border-white shadow-sm">
                <div className="bg-rose-500 h-full transition-all" style={{ width: `${(scores[idx] / questions.length) * 100}%` }}></div>
             </div>
             <div className="font-black text-rose-800 mt-1">Score: {scores[idx]}</div>
             {activeHeroIndex === idx && <div className="absolute -top-12 animate-bounce text-2xl">🔥 YOUR TURN!</div>}
          </div>
        ))}
      </div>

      {/* The Question */}
      <div className="w-full max-w-xl bg-white rounded-[40px] p-8 shadow-2xl border-4 border-rose-100 flex flex-col items-center gap-6 relative overflow-hidden">
        {lastResult && (
          <div className={`absolute inset-0 flex items-center justify-center text-8xl z-10 animate-ping pointer-events-none`}>
            {lastResult === 'CORRECT' ? '✨' : '💥'}
          </div>
        )}
        
        <div className="text-center space-y-2">
           <div className="text-sm font-bold text-rose-400 uppercase tracking-widest">Question {currentQuestionIndex + 1} of {questions.length}</div>
           <div className="text-5xl font-black text-rose-900 chinese-font">{currentQuestion.question}</div>
        </div>

        <div className="grid grid-cols-2 gap-4 w-full">
           {shuffledOptions.map((opt, i) => (
             <button
               key={i}
               onClick={() => handleAnswer(opt)}
               className="bg-white hover:bg-rose-50 border-4 border-rose-200 rounded-3xl py-6 px-4 text-2xl font-black text-rose-700 transition-all active:scale-95 shadow-lg"
             >
               {opt}
             </button>
           ))}
        </div>
      </div>

      <button onClick={onBack} className="text-rose-400 font-bold hover:text-rose-600">Quit Battle</button>
    </div>
  );
};

export default BattleGame;
