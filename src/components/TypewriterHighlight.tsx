'use client';

import { useState, useEffect } from 'react';

interface TypewriterHighlightProps {
  text: string;
  speed?: number;
  highlightColor?: string;
  textColor?: string;
  className?: string;
  onComplete?: () => void;
}

export default function TypewriterHighlight({
  text,
  speed = 100,
  highlightColor = 'bg-yellow-300',
  textColor = 'text-gray-900',
  className = '',
  onComplete
}: TypewriterHighlightProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);

      return () => clearTimeout(timer);
    } else if (currentIndex === text.length && !isComplete) {
      setIsComplete(true);
      onComplete?.();
    }
  }, [currentIndex, text, speed, isComplete, onComplete]);

  const resetAnimation = () => {
    setDisplayedText('');
    setCurrentIndex(0);
    setIsComplete(false);
  };

  return (
    <div className={`inline-block ${className}`}>
      <span className={textColor}>
        {displayedText.split('').map((char, index) => (
          <span
            key={index}
            className={`
              ${highlightColor} 
              ${char === ' ' ? 'px-1' : 'px-0.5'} 
              py-0.5 
              rounded-sm 
              animate-pulse
              transition-all 
              duration-300
            `}
            style={{
              animationDelay: `${index * 50}ms`,
              animationDuration: '0.8s',
              animationFillMode: 'forwards'
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
        {!isComplete && (
          <span className="animate-blink ml-0.5 text-2xl font-bold text-blue-600">
            |
          </span>
        )}
      </span>
      
      {isComplete && (
        <button
          onClick={resetAnimation}
          className="ml-4 px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Replay
        </button>
      )}
    </div>
  );
}
