'use client';

import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ShowcaseNavProps {
  currentScreen: number;
  totalScreens: number;
  onPrev: () => void;
  onNext: () => void;
  onGoTo: (index: number) => void;
}

const screenTeasers = [
  'The Challenge',
  'Our Approach',
  'Proof of Scale',
  'AI in Action',
  'Impact & ROI',
];

export default function ShowcaseNav({ currentScreen, totalScreens, onPrev, onNext, onGoTo }: ShowcaseNavProps) {
  const isFirst = currentScreen === 0;
  const isLast = currentScreen === totalScreens - 1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="fixed bottom-0 left-0 right-0 z-50"
    >
      <div className="max-w-4xl mx-auto px-6 pb-6">
        <div className="flex items-center justify-between bg-white/90 backdrop-blur-xl rounded-2xl border border-gray-200 shadow-lg px-6 py-4">
          {/* Previous */}
          <button
            onClick={onPrev}
            disabled={isFirst}
            className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-900 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-4 h-4" />
            Back
          </button>

          {/* Dot Indicators */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              {Array.from({ length: totalScreens }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => onGoTo(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    i === currentScreen
                      ? 'bg-teal-600 scale-125 shadow-[0_0_8px_rgba(13,148,136,0.4)]'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to screen ${i + 1}: ${screenTeasers[i]}`}
                />
              ))}
            </div>
            <span className="text-xs text-gray-400 font-mono">
              {currentScreen + 1} / {totalScreens}
            </span>
          </div>

          {/* Next */}
          <button
            onClick={onNext}
            disabled={isLast}
            className="flex items-center gap-1 text-sm font-medium text-teal-700 hover:text-teal-900 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            {isLast ? 'End' : `Next: ${screenTeasers[currentScreen + 1]}`}
            {!isLast && <ChevronRight className="w-4 h-4" />}
          </button>
        </div>

        {/* Keyboard hint */}
        <div className="text-center mt-2">
          <span className="text-[10px] text-gray-400">
            ← → arrow keys · Esc to exit
          </span>
        </div>
      </div>
    </motion.div>
  );
}
