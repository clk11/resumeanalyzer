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

    // Complete after 10 seconds
    const timer = setTimeout(() => {
      onComplete();
    }, 10000);

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
      className="flex flex-col items-center justify-center space-y-8"
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

      <div className="relative">
        <motion.div
          animate={{
            rotate: 360
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear"
          }}
          className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full"
        />
        <motion.div
          animate={{
            rotate: -360
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute inset-0 w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full"
        />
      </div>
    </motion.div>
  );
} 