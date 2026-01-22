
import React, { useState, useEffect, useMemo } from 'react';
import { WordPair } from '../types';

interface MatchingGameProps {
  pairs: WordPair[];
  onBack: () => void;
}

const MatchingGame: React.FC<MatchingGameProps> = ({ pairs, onBack }) => {
  const [selectedChinese, setSelectedChinese] = useState<string | null>(null);
  const [selectedTranslation, setSelectedTranslation] = useState<string | null>(null);
  const [matchedIds, setMatchedIds] = useState<Set<string>>(new Set());
  const [shuffledChinese, setShuffledChinese] = useState<{ id: string, text: string }[]>([]);
  const [shuffledTranslations, setShuffledTranslations] = useState<{ id: string, text: string }[]>([]);
  const [isWinning, setIsWinning] = useState(false);

  // Initialize and shuffle
  useEffect(() => {
    const c = pairs.map(p => ({ id: p.id, text: p.chinese }));
    const t = pairs.map(p => ({ id: p.id, text: p.translation }));
    setShuffledChinese([...c].sort(() => Math.random() - 0.5));
    setShuffledTranslations([...t].sort(() => Math.random() - 0.5));
    setMatchedIds(new Set());
    setIsWinning(false);
  }, [pairs]);

  const handleChineseClick = (id: string) => {
    if (matchedIds.has(id)) return;
    if (selectedTranslation) {
      if (selectedTranslation === id) {
        setMatchedIds(prev => new Set(prev).add(id));
        setSelectedChinese(null);
        setSelectedTranslation(null);
      } else {
        setSelectedChinese(id);
        setSelectedTranslation(null);
      }
    } else {
      setSelectedChinese(id === selectedChinese ? null : id);
    }
  };

  const handleTranslationClick = (id: string) => {
    if (matchedIds.has(id)) return;
    if (selectedChinese) {
      if (selectedChinese === id) {
        setMatchedIds(prev => new Set(prev).add(id));
        setSelectedChinese(null);
        setSelectedTranslation(null);
      } else {
        setSelectedTranslation(id);
        setSelectedChinese(null);
      }
    } else {
      setSelectedTranslation(id === selectedTranslation ? null : id);
    }
  };

  useEffect(() => {
    if (matchedIds.size === pairs.length && pairs.length > 0) {
      setIsWinning(true);
    }
  }, [matchedIds, pairs]);

  return (
    <div className="w-full flex flex-col items-center gap-8">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-black text-indigo-900">Match the Pairs! 🧩</h2>
        <p className="text-indigo-600 font-medium">Click on a Chinese word, then its translation.</p>
      </div>

      <div className="grid grid-cols-2 gap-x-12 gap-y-4 w-full max-w-2xl relative">
        {/* Chinese Column */}
        <div className="flex flex-col gap-4">
          {shuffledChinese.map((item) => (
            <button
              key={`c-${item.id}`}
              onClick={() => handleChineseClick(item.id)}
              disabled={matchedIds.has(item.id)}
              className={`h-20 text-2xl font-bold rounded-2xl transition-all shadow-md transform active:scale-95 chinese-font flex items-center justify-center p-2 text-center
                ${matchedIds.has(item.id) 
                  ? 'bg-green-100 text-green-400 border-green-200 cursor-default shadow-none translate-y-1 grayscale' 
                  : selectedChinese === item.id 
                    ? 'bg-indigo-500 text-white scale-105 ring-4 ring-indigo-200 shadow-indigo-200' 
                    : 'bg-white text-indigo-800 border-2 border-indigo-100 hover:border-indigo-300'
                }`}
            >
              {item.text}
              {matchedIds.has(item.id) && <span className="ml-2">✅</span>}
            </button>
          ))}
        </div>

        {/* Translation Column */}
        <div className="flex flex-col gap-4">
          {shuffledTranslations.map((item) => (
            <button
              key={`t-${item.id}`}
              onClick={() => handleTranslationClick(item.id)}
              disabled={matchedIds.has(item.id)}
              className={`h-20 text-xl font-bold rounded-2xl transition-all shadow-md transform active:scale-95 flex items-center justify-center p-2 text-center
                ${matchedIds.has(item.id) 
                  ? 'bg-green-100 text-green-400 border-green-200 cursor-default shadow-none translate-y-1 grayscale' 
                  : selectedTranslation === item.id 
                    ? 'bg-indigo-500 text-white scale-105 ring-4 ring-indigo-200 shadow-indigo-200' 
                    : 'bg-white text-indigo-800 border-2 border-indigo-100 hover:border-indigo-300'
                }`}
            >
              {item.text}
              {matchedIds.has(item.id) && <span className="ml-2">✅</span>}
            </button>
          ))}
        </div>
      </div>

      {isWinning && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-indigo-900/40 backdrop-blur-sm p-4">
          <div className="bg-white p-10 rounded-[40px] shadow-2xl text-center space-y-6 animate-in zoom-in duration-300 max-w-sm w-full">
            <div className="text-8xl">🎉✨</div>
            <h3 className="text-4xl font-black text-indigo-900">GREAT JOB!</h3>
            <p className="text-indigo-600 font-bold">You matched all the words!</p>
            <button
              onClick={() => {
                setMatchedIds(new Set());
                setIsWinning(false);
                setShuffledChinese([...shuffledChinese].sort(() => Math.random() - 0.5));
                setShuffledTranslations([...shuffledTranslations].sort(() => Math.random() - 0.5));
              }}
              className="w-full bg-indigo-600 text-white py-4 rounded-3xl font-black text-xl hover:bg-indigo-700 transition-colors shadow-lg"
            >
              Play Again!
            </button>
            <button
              onClick={onBack}
              className="w-full text-indigo-400 font-bold hover:text-indigo-600"
            >
              Go to Menu
            </button>
          </div>
        </div>
      )}

      <button
        onClick={onBack}
        className="mt-4 text-indigo-400 font-bold hover:text-indigo-600 transition-colors"
      >
        ← Back to Menu
      </button>
    </div>
  );
};

export default MatchingGame;
