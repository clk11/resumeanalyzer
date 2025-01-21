import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

const statusMessages = [
  "Analyzing your resume...",
  "Extracting key details...",
  "Processing layout information...",
  "Evaluating content structure...",
  "Finalizing analysis..."
];

interface ProcessingAnimationProps {
  onComplete: () => void;
}

export default function ProcessingAnimation({ onComplete }: ProcessingAnimationProps) {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  
  useEffect(() => {
    // Change message every 2 seconds
    const messageInterval = setInterval(() => {
      setCurrentMessageIndex((prev) => {
        if (prev < statusMessages.length - 1) return prev + 1;
        return prev;
      });
    }, 2000);

    // Complete after 8 seconds
    const timer = setTimeout(() => {
      onComplete();
    }, 8000);

    return () => {
      clearInterval(messageInterval);
      clearTimeout(timer);
    };
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center space-y-12"
    >
      <div className="h-16">
        <AnimatePresence mode="wait">
          <motion.p
            key={currentMessageIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-xl text-white/90 text-center"
          >
            {statusMessages[currentMessageIndex]}
          </motion.p>
        </AnimatePresence>
      </div>

      <div className="relative w-64 h-80">
        {/* Document outline */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 border-2 border-blue-400/30 rounded-lg backdrop-blur-sm bg-white/5"
        >
          {/* Resume Header with Avatar */}
          <div className="absolute top-0 left-0 right-0 p-4 flex items-start gap-4">
            {/* Avatar circle */}
            <motion.div
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
              className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex-shrink-0"
            />
            {/* Header text lines */}
            <div className="flex-1 space-y-2">
              <motion.div
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
                className="h-3 bg-white/20 rounded w-3/4"
              />
              <motion.div
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{
                  duration: 2,
                  delay: 0.2,
                  repeat: Infinity,
                }}
                className="h-2 bg-white/10 rounded w-1/2"
              />
            </div>
          </div>

          {/* Animated scan line */}
          <motion.div
            initial={{ y: 0 }}
            animate={{ y: [0, 280, 0] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent"
          />

          {/* Document content lines */}
          <div className="p-6 pt-24 space-y-3">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ width: "100%", opacity: 0.3 }}
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{
                  duration: 1.5,
                  delay: i * 0.2,
                  repeat: Infinity
                }}
                className="h-2 bg-white/10 rounded"
                style={{
                  width: `${Math.random() * 30 + 70}%`
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
} 