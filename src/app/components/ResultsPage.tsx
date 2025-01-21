import { motion } from 'framer-motion';
import { FiArrowLeft } from 'react-icons/fi';
import { AiFillStar } from 'react-icons/ai';

interface FeedbackSection {
  title: string;
  score: number;
  feedback: string;
}

interface ResultsPageProps {
  onReset: () => void;
}

const mockFeedback: FeedbackSection[] = [
  {
    title: "Professional Experience",
    score: 4.5,
    feedback: "Strong experience section with quantifiable achievements. Consider adding more specific metrics."
  },
  {
    title: "Skills & Technologies",
    score: 4.0,
    feedback: "Good range of technical skills. Group them by category for better readability."
  },
  {
    title: "Education",
    score: 5.0,
    feedback: "Well-structured education section with relevant coursework highlighted."
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 }
};

export default function ResultsPage({ onReset }: ResultsPageProps) {
  const renderStars = (score: number) => {
    return (
      <div className="flex gap-1">
        {[...Array(5)].map((_, index) => (
          <AiFillStar
            key={index}
            className={`text-xl ${
              index < score
                ? 'text-yellow-400'
                : 'text-gray-400'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex flex-col items-center justify-center p-8">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="w-full max-w-3xl"
      >
        <motion.h1
          variants={itemVariants}
          className="text-4xl font-bold text-white mb-8 text-center"
        >
          Resume Analysis Results
        </motion.h1>

        <div className="space-y-6">
          {mockFeedback.map((section, index) => (
            <motion.div
              key={section.title}
              variants={itemVariants}
              className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/15 transition-colors"
            >
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-xl font-semibold text-white">
                  {section.title}
                </h2>
                {renderStars(section.score)}
              </div>
              <p className="text-gray-300">
                {section.feedback}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.button
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onReset}
          className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-8 py-4 rounded-full backdrop-blur-sm transition-colors text-lg text-white mx-auto mt-8"
        >
          <FiArrowLeft className="text-xl" />
          Upload Another Resume
        </motion.button>
      </motion.div>
    </div>
  );
} 