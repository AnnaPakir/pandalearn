
import React, { useState } from 'react';
import { WordPair, BattleQuestion } from '../types';

interface TeacherSettingsProps {
  wheelWords: string[];
  matchPairs: WordPair[];
  battleQuestions: BattleQuestion[];
  setWheelWords: (words: string[]) => void;
  setMatchPairs: (pairs: WordPair[]) => void;
  setBattleQuestions: (questions: BattleQuestion[]) => void;
  onBack: () => void;
}

const TeacherSettings: React.FC<TeacherSettingsProps> = ({
  wheelWords,
  matchPairs,
  battleQuestions,
  setWheelWords,
  setMatchPairs,
  setBattleQuestions,
  onBack
}) => {
  const [newWheelWord, setNewWheelWord] = useState('');
  const [newChinese, setNewChinese] = useState('');
  const [newTranslation, setNewTranslation] = useState('');
  const [bQ, setBQ] = useState('');
  const [bC, setBC] = useState('');
  const [bW, setBW] = useState('');

  const addWheelWord = () => {
    if (newWheelWord.trim()) {
      setWheelWords([...wheelWords, newWheelWord.trim()]);
      setNewWheelWord('');
    }
  };

  const addMatchPair = () => {
    if (newChinese.trim() && newTranslation.trim()) {
      setMatchPairs([
        ...matchPairs,
        { id: Date.now().toString(), chinese: newChinese.trim(), translation: newTranslation.trim() }
      ]);
      setNewChinese('');
      setNewTranslation('');
    }
  };

  const addBattleQuestion = () => {
    if (bQ.trim() && bC.trim() && bW.trim()) {
      setBattleQuestions([
        ...battleQuestions,
        { id: Date.now().toString(), question: bQ.trim(), correctAnswer: bC.trim(), wrongAnswer: bW.trim() }
      ]);
      setBQ(''); setBC(''); setBW('');
    }
  };

  return (
    <div className="w-full max-w-3xl space-y-12 h-[550px] overflow-y-auto pr-4 scroll-smooth custom-scrollbar">
      <div className="flex justify-between items-center sticky top-0 bg-white/95 backdrop-blur-md z-20 py-4 border-b">
        <h2 className="text-3xl font-black text-orange-900">Teacher Room 🍎</h2>
        <button
          onClick={onBack}
          className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-2 rounded-full font-black shadow-lg transition-all active:translate-y-1"
        >
          Save & Exit
        </button>
      </div>

      {/* 🎡 Magic Wheel Section */}
      <section className="space-y-4 bg-orange-50/50 p-6 rounded-[30px] border-2 border-orange-100">
        <h3 className="text-2xl font-black text-orange-800 flex items-center gap-2">🎡 Magic Wheel Words</h3>
        <div className="flex gap-2">
          <input type="text" value={newWheelWord} onChange={(e) => setNewWheelWord(e.target.value)} placeholder="e.g. 苹果" className="flex-1 border-2 border-orange-200 rounded-2xl px-4 py-3" />
          <button onClick={addWheelWord} className="bg-orange-500 text-white px-6 rounded-2xl font-bold">Add</button>
        </div>
        <div className="flex flex-wrap gap-2">
          {wheelWords.map((word, i) => (
            <div key={i} className="bg-white border border-orange-200 px-3 py-1 rounded-xl flex items-center gap-2 shadow-sm">
              <span className="chinese-font font-bold text-orange-900">{word}</span>
              <button onClick={() => setWheelWords(wheelWords.filter((_, idx) => idx !== i))} className="text-red-400">×</button>
            </div>
          ))}
        </div>
      </section>

      {/* 🧩 Matching Game Section */}
      <section className="space-y-4 bg-indigo-50/50 p-6 rounded-[30px] border-2 border-indigo-100">
        <h3 className="text-2xl font-black text-indigo-800 flex items-center gap-2">🧩 Matching Pairs</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <input type="text" value={newChinese} onChange={(e) => setNewChinese(e.target.value)} placeholder="Chinese Word" className="border-2 border-indigo-200 rounded-2xl px-4 py-3" />
          <div className="flex gap-2">
            <input type="text" value={newTranslation} onChange={(e) => setNewTranslation(e.target.value)} placeholder="Translation" className="flex-1 border-2 border-indigo-200 rounded-2xl px-4 py-3" />
            <button onClick={addMatchPair} className="bg-indigo-500 text-white px-6 rounded-2xl font-bold">Add</button>
          </div>
        </div>
        <div className="space-y-2">
          {matchPairs.map(p => (
            <div key={p.id} className="bg-white border border-indigo-100 p-3 rounded-xl flex justify-between items-center shadow-sm">
              <span><span className="chinese-font font-bold text-indigo-900">{p.chinese}</span> ➜ {p.translation}</span>
              <button onClick={() => setMatchPairs(matchPairs.filter(item => item.id !== p.id))} className="text-red-400">🗑️</button>
            </div>
          ))}
        </div>
      </section>

      {/* ⚔️ Battle Section */}
      <section className="space-y-4 bg-rose-50/50 p-6 rounded-[30px] border-2 border-rose-100">
        <h3 className="text-2xl font-black text-rose-800 flex items-center gap-2">⚔️ Battle Questions</h3>
        <div className="space-y-3">
          <input type="text" value={bQ} onChange={(e) => setBQ(e.target.value)} placeholder="Question word" className="w-full border-2 border-rose-200 rounded-2xl px-4 py-3" />
          <div className="grid grid-cols-2 gap-3">
            <input type="text" value={bC} onChange={(e) => setBC(e.target.value)} placeholder="Correct" className="border-2 border-rose-200 rounded-2xl px-4 py-3" />
            <input type="text" value={bW} onChange={(e) => setBW(e.target.value)} placeholder="Wrong" className="border-2 border-rose-200 rounded-2xl px-4 py-3" />
          </div>
          <button onClick={addBattleQuestion} className="w-full bg-rose-500 text-white py-3 rounded-2xl font-black">Add Battle Task</button>
        </div>
        <div className="space-y-2">
          {battleQuestions.map(q => (
            <div key={q.id} className="bg-white border border-rose-100 p-3 rounded-xl flex justify-between items-center shadow-sm">
              <span><span className="chinese-font font-bold text-rose-900">{q.question}</span> ({q.correctAnswer} / {q.wrongAnswer})</span>
              <button onClick={() => setBattleQuestions(battleQuestions.filter(item => item.id !== q.id))} className="text-red-400">🗑️</button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default TeacherSettings;
