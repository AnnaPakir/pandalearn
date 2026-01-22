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

  const colors = [
    '#f87171', // Red
    '#fb923c', // Orange
    '#facc15', // Yellow
    '#4ade80', // Green
    '#22d3ee', // Cyan
    '#818cf8', // Indigo
    '#c084fc', // Purple
    '#f472b6'  // Pink
  ];

  const getTextColor = (bgColor: string) => {
    if (['#facc15', '#22d3ee', '#4ade80'].includes(bgColor)) {
      return '#14532d';
    }
    return 'white';
  };

  const spin = () => {
    if (isSpinning || words.length === 0) return;

    setIsSpinning(true);
    setSelectedWord(null);
    
    const extraDegree = Math.floor(Math.random() * 360);
    const spins = 10 + Math.floor(Math.random() * 5); 
    const totalDegree = rotation + (spins * 360) + extraDegree;
    
    setRotation(totalDegree);

    setTimeout(() => {
      setIsSpinning(false);
      const actualDegree = totalDegree % 360;
      const sliceSize = 360 / words.length;
      const index = Math.floor(((360 - (actualDegree % 360)) + 270) % 360 / sliceSize);
      setSelectedWord(words[index]);
    }, 4000);
  };

  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-2xl">
      <div className="relative w-80 h-80 md:w-[550px] md:h-[550px] flex items-center justify-center">
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-30 text-7xl drop-shadow-2xl">
          📍
        </div>
        
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full drop-shadow-[0_30px_60px_rgba(0,0,0,0.3)] transition-transform duration-[4000ms] ease-[cubic-bezier(0.15,0,0.1,1)]"
          style={{ transform: `rotate(${rotation}deg)` }}
          ref={wheelRef}
        >
          <circle cx="50" cy="50" r="49.5" fill="white" stroke="#e2e8f0" strokeWidth="0.5" />
          
          {words.map((word, i) => {
            const angle = 360 / words.length;
            const startAngle = i * angle;
            const endAngle = (i + 1) * angle;
            
            const x1 = 50 + 49 * Math.cos((startAngle - 90) * Math.PI / 180);
            const y1 = 50 + 49 * Math.sin((startAngle - 90) * Math.PI / 180);
            const x2 = 50 + 49 * Math.cos((endAngle - 90) * Math.PI / 180);
            const y2 = 50 + 49 * Math.sin((endAngle - 90) * Math.PI / 180);
            
            const largeArcFlag = angle > 180 ? 1 : 0;
            const pathData = `M 50 50 L ${x1} ${y1} A 49 49 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;
            const color = colors[i % colors.length];

            const textRotation = startAngle + angle / 2;

            const baseSize = words.length > 12 ? 3.0 : words.length > 8 ? 4.0 : 5.2;
            const lengthPenalty = word.length > 10 ? 0.7 : word.length > 6 ? 0.85 : 1;
            const finalFontSize = baseSize * lengthPenalty;

            return (
              <g key={i}>
                <path d={pathData} fill={color} stroke="white" strokeWidth="0.4" />
                <text
                  x="96" 
                  y="50"
                  fill={getTextColor(color)}
                  fontSize={finalFontSize}
                  fontWeight="700" /* Сделали чуть тоньше (был 900), чтобы детали иероглифов не сливались */
                  textAnchor="end"
                  dominantBaseline="middle"
                  transform={`rotate(${textRotation - 90}, 50, 50)`}
                  className="chinese-font wheel-text"
                >
                  {word}
                </text>
              </g>
            );
          })}

          <circle cx="50" cy="50" r="3.5" fill="white" className="shadow-sm" />
          <circle cx="50" cy="50" r="2" fill="#f97316" />
        </svg>
      </div>

      <div className="flex flex-col items-center gap-6 w-full">
        {selectedWord && !isSpinning && (
          <div className="animate-in zoom-in duration-300 flex flex-col items-center">
            <div className="bg-white border-[6px] border-orange-400 px-12 py-6 rounded-[40px] shadow-2xl scale-110 relative">
               <div className="absolute -top-5 -left-5 text-4xl animate-bounce">🎈</div>
               <div className="absolute -bottom-5 -right-5 text-4xl animate-bounce" style={{animationDelay: '0.5s'}}>✨</div>
               <p className="text-5xl font-bold text-orange-950 chinese-font text-center">{selectedWord}</p>
            </div>
          </div>
        )}

        <div className="flex gap-4">
          <button
            onClick={onBack}
            className="bg-white border-2 border-gray-100 hover:bg-gray-50 text-gray-400 px-8 py-4 rounded-3xl font-bold transition-all"
          >
            ← Back
          </button>
          <button
            onClick={spin}
            disabled={isSpinning}
            className={`px-20 py-6 rounded-[35px] font-black text-3xl text-white shadow-[0_12px_0_0_rgba(234,88,12,1)] active:shadow-none active:translate-y-[12px] transition-all transform hover:scale-105 ${
              isSpinning ? 'bg-gray-300 shadow-none grayscale' : 'bg-orange-500 hover:bg-orange-600'
            }`}
          >
            {isSpinning ? 'SPINNING...' : 'GO! 🎡'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default WheelOfWords;
