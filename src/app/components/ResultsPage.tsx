import { motion } from 'framer-motion';
import { FiArrowLeft } from 'react-icons/fi';

interface ResultsPageProps {
  onReset: () => void;
}

export default function ResultsPage({ onReset }: ResultsPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex flex-col items-center justify-center">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold text-white mb-8"
      >
        Hello World
      </motion.h1>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onReset}
        className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-8 py-4 rounded-full backdrop-blur-sm transition-colors text-lg text-white"
      >
        <FiArrowLeft className="text-xl" />
        Upload Another Resume
      </motion.button>
    </div>
  );
} 