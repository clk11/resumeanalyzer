'use client';
import { useEffect, useState } from 'react';

export default function Home() {
  const [text, setText] = useState('');
  const fullText = '> Hello World_';
  const [cursorVisible, setCursorVisible] = useState(true);

  useEffect(() => {
    // Typing animation
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex < fullText.length) {
        setText(fullText.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 150);

    // Cursor blinking
    const cursorInterval = setInterval(() => {
      setCursorVisible(prev => !prev);
    }, 530);

    return () => {
      clearInterval(typingInterval);
      clearInterval(cursorInterval);
    };
  }, []);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-black/50 rounded-lg p-8 backdrop-blur-sm border border-emerald-500/20">
        <pre className="font-mono text-2xl md:text-4xl">
          <code className="text-emerald-400">
            {text}
            <span 
              className={`${cursorVisible ? 'opacity-100' : 'opacity-0'} transition-opacity duration-100`}
            >
              ▋
            </span>
          </code>
        </pre>
      </div>
    </div>
  );
}
