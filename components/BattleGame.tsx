import React, { useState, useEffect } from 'react';
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
  const [activeHeroIndex, setActiveHeroIndex] = useState<number>(0);
  const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);
  const [lastResult, setLastResult] = useState<'CORRECT' | 'WRONG' | null>(null);

  const currentQuestion = questions[currentQuestionIndex];

  // Выбор героев
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
      prepareTurn(0);
    }
  };

  const prepareTurn = (qIndex: number) => {
    setLastResult(null);
    // Каждый ход — рандомный активный герой
    setActiveHeroIndex(Math.floor(Math.random() * 2));
    const q = questions[qIndex];
    if (q) {
      setShuffledOptions([q.correctAnswer, q.wrongAnswer].sort(() => Math.random() - 0.5));
    }
  };

  const handleAnswer = (answer: string) => {
    if (lastResult !== null) return; // Защита от двойного клика

    const isCorrect = answer === currentQuestion.correctAnswer;
    setLastResult(isCorrect ? 'CORRECT' : 'WRONG');

    setScores(prev => {
      const newScores = [...prev];
      if (isCorrect) {
        // Правильно: балл активному
        newScores[activeHeroIndex] += 1;
      } else {
        // Ошибка: балл сопернику!
        const opponentIndex = 1 - activeHeroIndex;
        newScores[opponentIndex] += 1;
      }
      return newScores;
    });

    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        const nextIdx = currentQuestionIndex + 1;
        setCurrentQuestionIndex(nextIdx);
        prepareTurn(nextIdx);
      } else {
        setStage('WIN');
      }
    }, 1500);
  };

  if (stage === 'SELECT') {
    return (
      <div className="w-full flex flex-col items-center gap-8">
        <div className="text-center space-y-2">
          <h2 className="text-4xl font-black text-rose-800">Choose 2 Heroes! ⚔️</h2>
          <p className="text-rose-600 font-bold">Pick your fighters for the duel!</p>
        </div>
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
          {selectedHeroes.length === 2 ? 'START BATTLE! ⚔️' : `Select ${2 - selectedHeroes.length} more`}
        </button>
      </div>
    );
  }

  if (stage === 'WIN') {
    const winnerIdx = scores[0] > scores[1] ? 0 : (scores[1] > scores[0] ? 1 : -1);
    return (
      <div className="text-center space-y-8 animate-in zoom-in duration-500 w-full flex flex-col items-center">
        <h2 className="text-6xl font-black text-rose-600">BATTLE ENDED!</h2>
        
        {winnerIdx !== -1 ? (
          <div className="flex flex-col items-center gap-4">
            <div className="text-9xl animate-bounce">{selectedHeroes[winnerIdx].emoji}</div>
            <p className="text-3xl font-bold text-rose-900">Champion: {selectedHeroes[winnerIdx].name}!</p>
            <div className="text-xl font-black text-rose-500">Score: {scores[winnerIdx]} vs {scores[1-winnerIdx]}</div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4">
            <div className="text-9xl">🤝</div>
            <p className="text-3xl font-bold text-rose-900">It's a Draw!</p>
            <div className="text-xl font-black text-rose-500">Score: {scores[0]} - {scores[1]}</div>
          </div>
        )}

        <div className="flex gap-4 mt-4">
           <button onClick={() => { setStage('SELECT'); setScores([0, 0]); setCurrentQuestionIndex(0); setSelectedHeroes([]); }} className="bg-rose-500 text-white px-8 py-4 rounded-3xl font-black shadow-lg hover:bg-rose-600 transition-all">New Battle</button>
           <button onClick={onBack} className="bg-gray-200 text-gray-700 px-8 py-4 rounded-3xl font-black shadow-lg hover:bg-gray-300 transition-all">Back to Menu</button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center gap-6">
      {/* Арена с полосками здоровья */}
      <div className="w-full flex justify-between items-center px-4 md:px-12 relative h-48 bg-rose-50/30 rounded-[40px] border-2 border-dashed border-rose-200">
        {selectedHeroes.map((hero, idx) => (
          <div key={idx} className={`flex flex-col items-center transition-all duration-500 p-4 rounded-3xl ${activeHeroIndex === idx ? 'active-hero bg-white' : 'opacity-40 grayscale scale-90'}`}>
             <div className="text-7xl drop-shadow-lg">{hero.emoji}</div>
             <div className="mt-2 w-32 bg-gray-200 h-4 rounded-full overflow-hidden border-2 border-white shadow-inner">
                <div 
                  className={`h-full transition-all duration-500 ${idx === 0 ? 'bg-blue-500' : 'bg-orange-500'}`}
                  style={{ width: `${Math.min((scores[idx] / Math.max(1, questions.length)) * 100, 100)}%` }}
                ></div>
             </div>
             <div className="font-black text-rose-900 mt-1 uppercase tracking-tighter">Points: {scores[idx]}</div>
             {activeHeroIndex === idx && (
               <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-rose-600 text-white text-xs font-black px-3 py-1 rounded-full whitespace-nowrap shadow-lg">
                 🔥 YOUR ATTACK!
               </div>
             )}
          </div>
        ))}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl font-black text-rose-200 opacity-50">VS</div>
      </div>

      {/* Карточка вопроса */}
      <div className="w-full max-w-xl bg-white rounded-[40px] p-8 shadow-2xl border-4 border-rose-100 flex flex-col items-center gap-6 relative overflow-hidden">
        {lastResult && (
          <div className={`absolute inset-0 flex items-center justify-center text-9xl z-20 animate-ping pointer-events-none`}>
            {lastResult === 'CORRECT' ? '⭐' : '💀'}
          </div>
        )}
        
        <div className="text-center space-y-2">
           <div className="text-sm font-bold text-rose-400 uppercase tracking-widest">Question {currentQuestionIndex + 1} of {questions.length}</div>
           <div className="text-6xl font-black text-rose-900 chinese-font drop-shadow-sm">{currentQuestion.question}</div>
           <p className="text-rose-500 font-bold italic">
             {lastResult === 'WRONG' ? 'Oops! Opponent gets a point!' : 'Pick the right translation!'}
           </p>
        </div>

        <div className="grid grid-cols-2 gap-4 w-full">
           {shuffledOptions.map((opt, i) => (
             <button
               key={i}
               disabled={lastResult !== null}
               onClick={() => handleAnswer(opt)}
               className={`border-4 rounded-3xl py-6 px-4 text-2xl font-black transition-all shadow-lg active:scale-95
                 ${lastResult === null 
                   ? 'bg-white border-rose-200 text-rose-700 hover:border-rose-400 hover:bg-rose-50' 
                   : opt === currentQuestion.correctAnswer
                     ? 'bg-green-500 border-green-600 text-white'
                     : 'bg-rose-100 border-rose-200 text-rose-300'
                 }`}
             >
               {opt}
             </button>
           ))}
        </div>
      </div>

      <button onClick={onBack} className="text-rose-400 font-bold hover:text-rose-600 underline decoration-2">Quit Battle</button>
    </div>
  );
};

export default BattleGame;
