import { motion } from 'framer-motion';
import { FiCheckCircle, FiArrowLeft } from 'react-icons/fi';

interface ResultsPageProps {
  onReset: () => void;
}

const feedbackItems = [
  {
    title: "Professional Layout",
    description: "Your resume has a clean and professional layout.",
    color: "text-green-400"
  },
  {
    title: "Contact Information",
    description: "Contact details are well-placed and easily accessible.",
    color: "text-blue-400"
  },
  {
    title: "Content Structure",
    description: "We found some areas where the content structure could be improved.",
    color: "text-yellow-400"
  }
];

export default function ResultsPage({ onReset }: ResultsPageProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full max-w-2xl mx-auto"
    >
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-center mb-8"
      >
        Analysis Complete!
      </motion.h2>

      <div className="space-y-6">
        {feedbackItems.map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.2 }}
            className="bg-white/5 rounded-lg p-4 backdrop-blur-sm"
          >
            <div className="flex items-start gap-3">
              <FiCheckCircle className={`text-xl mt-1 ${item.color}`} />
              <div>
                <h3 className={`font-semibold ${item.color}`}>{item.title}</h3>
                <p className="text-white/80 mt-1">{item.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onReset}
        className="mt-8 flex items-center gap-2 mx-auto text-white/90 hover:text-white"
      >
        <FiArrowLeft />
        Upload Another Resume
      </motion.button>
    </motion.div>
  );
} 