
import React, { useState, useRef, useEffect } from 'react';

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
    '#f87171', '#fb923c', '#facc15', '#4ade80', 
    '#22d3ee', '#818cf8', '#c084fc', '#f472b6'
  ];

  const spin = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    setSelectedWord(null);
    
    // Calculate a random degree (at least 5 full spins + some extra)
    const extraDegree = Math.floor(Math.random() * 360);
    const spins = 5 + Math.floor(Math.random() * 5);
    const totalDegree = rotation + (spins * 360) + extraDegree;
    
    setRotation(totalDegree);

    setTimeout(() => {
      setIsSpinning(false);
      // Determine which slice is at the top (needle is at 0 degrees, pointing down or up?)
      // We'll assume needle is at the top (270 degrees in SVG circle space)
      const actualDegree = totalDegree % 360;
      const sliceSize = 360 / words.length;
      const index = Math.floor(((360 - (actualDegree % 360)) + 90) % 360 / sliceSize);
      setSelectedWord(words[index]);
    }, 4000); // match transition duration
  };

  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-lg">
      <div className="relative w-80 h-80 md:w-96 md:h-96">
        {/* Pointer/Needle */}
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20 text-4xl drop-shadow-md">
          👇
        </div>
        
        {/* The Wheel SVG */}
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full drop-shadow-2xl transition-transform duration-[4000ms] cubic-bezier(0.15, 0, 0.15, 1)"
          style={{ transform: `rotate(${rotation}deg)` }}
          ref={wheelRef}
        >
          <circle cx="50" cy="50" r="48" fill="white" stroke="#e5e7eb" strokeWidth="2" />
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

            return (
              <g key={i}>
                <path d={pathData} fill={colors[i % colors.length]} stroke="white" strokeWidth="0.5" />
                <text
                  x="50"
                  y="20"
                  fill="white"
                  fontSize="4"
                  fontWeight="bold"
                  textAnchor="middle"
                  transform={`rotate(${startAngle + angle / 2}, 50, 50)`}
                  className="chinese-font"
                >
                  {word.length > 10 ? word.substring(0, 8) + '...' : word}
                </text>
              </g>
            );
          })}
          <circle cx="50" cy="50" r="8" fill="white" className="drop-shadow-sm" />
          <circle cx="50" cy="50" r="4" fill="#166534" />
        </svg>
      </div>

      <div className="flex flex-col items-center gap-4 w-full">
        {selectedWord && !isSpinning && (
          <div className="animate-bounce bg-yellow-100 border-2 border-yellow-400 px-6 py-3 rounded-2xl shadow-lg">
             <p className="text-2xl font-black text-yellow-800 chinese-font">{selectedWord}</p>
          </div>
        )}

        <div className="flex gap-4">
          <button
            onClick={onBack}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-8 py-3 rounded-2xl font-bold transition-all shadow-md active:translate-y-1"
          >
            Go Back
          </button>
          <button
            onClick={spin}
            disabled={isSpinning}
            className={`px-12 py-3 rounded-2xl font-black text-xl text-white shadow-[0_8px_0_0_rgba(22,101,52,1)] transition-all transform active:translate-y-1 active:shadow-none ${
              isSpinning ? 'bg-gray-400 shadow-none cursor-not-allowed translate-y-1' : 'bg-green-600 hover:bg-green-700'
            }`}
          >
            {isSpinning ? 'Spinning...' : 'SPIN IT! 🎡'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default WheelOfWords;
