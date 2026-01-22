import React, { useState, useRef } from 'react';

interface WheelOfWordsProps {
  words: string[];
  onBack: () => void;
}

const WheelOfWords: React.FC<WheelOfWordsProps> = ({ words, onBack }) => {
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const wheelRef = useRef<SVGSVGElement>(null);

  // Яркие цвета, подходящие для детей
  const colors = [
    '#f87171', // Red
    '#fb923c', // Orange
    '#facc15', // Yellow (needs dark text)
    '#4ade80', // Green
    '#22d3ee', // Cyan (needs dark text)
    '#818cf8', // Indigo
    '#c084fc', // Purple
    '#f472b6'  // Pink
  ];

  // Функция для определения, какой текст лучше: темный или светлый
  const getTextColor = (bgColor: string) => {
    // Желтый и Голубой слишком светлые для белого текста
    if (bgColor === '#facc15' || bgColor === '#22d3ee' || bgColor === '#4ade80') {
      return '#14532d'; // Темно-зеленый/черный для контраста
    }
    return 'white';
  };

  const spin = () => {
    if (isSpinning || words.length === 0) return;

    setIsSpinning(true);
    setSelectedWord(null);
    
    const extraDegree = Math.floor(Math.random() * 360);
    const spins = 7 + Math.floor(Math.random() * 5); // Больше оборотов для эффектности
    const totalDegree = rotation + (spins * 360) + extraDegree;
    
    setRotation(totalDegree);

    setTimeout(() => {
      setIsSpinning(false);
      const actualDegree = totalDegree % 360;
      const sliceSize = 360 / words.length;
      // Корректировка индекса (стрелка сверху = 270 град в SVG)
      const index = Math.floor(((360 - (actualDegree % 360)) + 90) % 360 / sliceSize);
      setSelectedWord(words[index]);
    }, 4000);
  };

  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-lg">
      <div className="relative w-80 h-80 md:w-[450px] md:h-[450px]">
        {/* Pointer/Needle */}
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-20 text-5xl drop-shadow-xl animate-pulse">
          👇
        </div>
        
        {/* The Wheel SVG */}
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full drop-shadow-[0_20px_50px_rgba(0,0,0,0.2)] transition-transform duration-[4000ms] cubic-bezier(0.15, 0, 0.15, 1)"
          style={{ transform: `rotate(${rotation}deg)` }}
          ref={wheelRef}
        >
          <circle cx="50" cy="50" r="48" fill="white" stroke="#e5e7eb" strokeWidth="1" />
          {words.map((word, i) => {
            const angle = 360 / words.length;
            const startAngle = i * angle;
            const endAngle = (i + 1) * angle;
            const x1 = 50 + 48 * Math.cos((startAngle - 90) * Math.PI / 180);
            const y1 = 50 + 48 * Math.sin((startAngle - 90) * Math.PI / 180);
            const x2 = 50 + 48 * Math.cos((endAngle - 90) * Math.PI / 180);
            const y2 = 50 + 48 * Math.sin((endAngle - 90) * Math.PI / 180);
            
            const largeArcFlag = angle > 180 ? 1 : 0;
            const pathData = `M 50 50 L ${x1} ${y1} A 48 48 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;
            const color = colors[i % colors.length];

            return (
              <g key={i}>
                <path d={pathData} fill={color} stroke="white" strokeWidth="0.8" />
                <text
                  x="50"
                  y="14" 
                  fill={getTextColor(color)}
                  fontSize={words.length > 10 ? "5" : "7"} // Динамический размер шрифта
                  fontWeight="900"
                  textAnchor="middle"
                  transform={`rotate(${startAngle + angle / 2}, 50, 50)`}
                  className="chinese-font wheel-text"
                >
                  {word.length > 12 ? word.substring(0, 10) + '..' : word}
                </text>
              </g>
            );
          })}
          {/* Central Hub */}
          <circle cx="50" cy="50" r="10" fill="white" className="shadow-lg" />
          <circle cx="50" cy="50" r="6" fill="#16a34a" />
          <circle cx="50" cy="50" r="3" fill="#ffffff" opacity="0.5" />
        </svg>
      </div>

      <div className="flex flex-col items-center gap-6 w-full">
        {selectedWord && !isSpinning && (
          <div className="animate-in zoom-in duration-300 flex flex-col items-center">
            <div className="bg-white border-4 border-green-500 px-8 py-4 rounded-[30px] shadow-2xl scale-110">
               <p className="text-4xl font-black text-green-800 chinese-font">{selectedWord}</p>
            </div>
            <p className="mt-4 text-green-600 font-bold animate-bounce">Great job! Say it out loud! 🗣️</p>
          </div>
        )}

        <div className="flex gap-4">
          <button
            onClick={onBack}
            className="bg-white border-2 border-gray-200 hover:bg-gray-50 text-gray-500 px-8 py-4 rounded-3xl font-bold transition-all active:translate-y-1"
          >
            ← Back
          </button>
          <button
            onClick={spin}
            disabled={isSpinning}
            className={`px-14 py-4 rounded-3xl font-black text-2xl text-white shadow-[0_10px_0_0_rgba(21,128,61,1)] active:shadow-none active:translate-y-[10px] transition-all ${
              isSpinning ? 'bg-gray-400 shadow-none grayscale cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'
            }`}
          >
            {isSpinning ? 'Spinning...' : 'SPIN! 🎡'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default WheelOfWords;
