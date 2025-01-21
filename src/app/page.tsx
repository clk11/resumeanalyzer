'use client';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiUpload, FiMaximize2, FiX, FiArrowRight, FiClock } from 'react-icons/fi';
import ProcessingAnimation from './components/ProcessingAnimation';
import ResultsPage from './components/ResultsPage';

type AppState = 'upload' | 'processing' | 'results';

export default function Home() {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [showFullScreen, setShowFullScreen] = useState(false);
  const [appState, setAppState] = useState<AppState>('upload');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showNotification, setShowNotification] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowNotification(false);
      setTimeout(() => setShowNotification(true), 100);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setPdfFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type === 'application/pdf') {
      setPdfFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const preventDefault = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleReset = () => {
    setPdfFile(null);
    setPreviewUrl(null);
    setAppState('upload');
  };

  const handleNextStep = () => {
    setAppState('processing');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-4">
      <AnimatePresence>
        {showNotification && (
          <motion.div
            initial={{ opacity: 0, y: -20, x: 20 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: -20, x: 20 }}
            className="fixed top-4 right-4 flex items-center gap-2 bg-gradient-to-r from-yellow-500/30 to-orange-500/30 backdrop-blur-sm px-4 py-2 rounded-xl border border-yellow-500/50 shadow-lg shadow-yellow-500/20"
          >
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 360, 360]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="text-yellow-300"
            >
              <FiClock className="text-lg" />
            </motion.div>
            <div className="relative">
              <p className="text-yellow-200 font-medium">
                Layout analysis coming soon
              </p>
              <motion.div
                animate={{
                  opacity: [0, 1, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute -right-2 -top-1 w-2 h-2 bg-yellow-400 rounded-full"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="container mx-auto max-w-4xl h-screen flex flex-col justify-center"
      >
        <AnimatePresence mode="wait">
          {appState === 'upload' && (
            <motion.div
              key="upload"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <h1 className="text-3xl md:text-4xl font-bold text-center mb-6">
                Drop your resume here
              </h1>

              <div
                onDrop={handleDrop}
                onDragOver={preventDefault}
                onDragEnter={preventDefault}
                className="w-full p-6 border-2 border-dashed border-gray-500 rounded-lg hover:border-blue-500 transition-colors text-center"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2.5 rounded-lg flex items-center justify-center mx-auto gap-2 transition-colors"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <FiUpload className="text-lg" />
                  Upload PDF
                </motion.button>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="application/pdf"
                  className="hidden"
                />
                <p className="text-gray-400 mt-3 text-sm">
                  or drag and drop your PDF file here
                </p>
              </div>

              {previewUrl && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6"
                >
                  <div className="relative">
                    <object
                      data={previewUrl || undefined}
                      type="application/pdf"
                      className="w-full h-[300px] rounded-lg shadow-lg"
                    >
                      <p>PDF preview not available</p>
                    </object>
                    <button
                      onClick={() => setShowFullScreen(true)}
                      className="absolute top-3 right-3 bg-black/50 p-1.5 rounded-full hover:bg-black/70 transition-colors"
                    >
                      <FiMaximize2 className="text-sm" />
                    </button>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05, x: 10 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleNextStep}
                    className="bg-green-500 hover:bg-green-600 text-white px-6 py-2.5 rounded-lg flex items-center justify-center mx-auto gap-2 mt-6 transition-colors"
                  >
                    Next Step
                    <FiArrowRight />
                  </motion.button>
                </motion.div>
              )}
            </motion.div>
          )}

          {appState === 'processing' && (
            <motion.div
              key="processing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <ProcessingAnimation onComplete={() => setAppState('results')} />
            </motion.div>
          )}

          {appState === 'results' && (
            <motion.div
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <ResultsPage onReset={handleReset} />
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showFullScreen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/90 z-50 p-4 flex flex-col"
            >
              <button
                onClick={() => setShowFullScreen(false)}
                className="self-end text-white p-2 hover:bg-white/10 rounded-full mb-2"
              >
                <FiX className="text-xl" />
              </button>
              <object
                data={previewUrl || undefined}
                type="application/pdf"
                className="flex-1 w-full rounded-lg"
              >
                <p>PDF preview not available</p>
              </object>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
