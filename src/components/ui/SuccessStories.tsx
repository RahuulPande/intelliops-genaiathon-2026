'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';

interface SuccessStory {
  id: number;
  emoji: string;
  title: string;
  description: string;
  impact: string;
  color: string;
}

export const SuccessStories = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const stories: SuccessStory[] = [
    {
      id: 1,
      emoji: "🚨",
      title: "Critical Alert: Payment Gateway failure detected",
      description: "AI predicted 2 hours early",
      impact: "Prevented $2.5M loss",
      color: "from-red-500 to-red-600"
    },
    {
      id: 2,
      emoji: "📈",
      title: "Release Success: Q4 deployment completed",
      description: "0 incidents",
      impact: "60% faster than manual process",
      color: "from-green-500 to-green-600"
    },
    {
      id: 3,
      emoji: "💰",
      title: "Cost Optimization: Identified unused resources",
      description: "$45K/month saved",
      impact: "ROI in 2 weeks",
      color: "from-yellow-500 to-yellow-600"
    },
    {
      id: 4,
      emoji: "⚡",
      title: "Performance Win: API response time improved 78%",
      description: "Customer satisfaction up 45%",
      impact: "Reduced support tickets by 60%",
      color: "from-blue-500 to-blue-600"
    }
  ];

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % stories.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isPlaying, stories.length]);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % stories.length);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + stories.length) % stories.length);
  };

  const goToStory = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/20 shadow-2xl"
         style={{
           background: 'rgba(255, 255, 255, 0.1)',
           backdropFilter: 'blur(20px)',
           WebkitBackdropFilter: 'blur(20px)'
         }}>
      <div className="p-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-white drop-shadow-md">Success Stories</h3>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors duration-200"
          >
            {isPlaying ? <Pause className="w-5 h-5 text-white" /> : <Play className="w-5 h-5 text-white" />}
          </button>
        </div>

        <div className="relative h-48">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="absolute inset-0 flex flex-col justify-center"
            >
              <div className={`bg-gradient-to-r ${stories[currentIndex].color} rounded-xl p-6 text-white shadow-lg`}>
                <div className="flex items-start space-x-4">
                  <div className="text-4xl">{stories[currentIndex].emoji}</div>
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold mb-2">{stories[currentIndex].title}</h4>
                    <p className="text-white/90 mb-2">{stories[currentIndex].description}</p>
                    <div className="text-sm font-medium bg-white/20 rounded-lg px-3 py-1 inline-block">
                      {stories[currentIndex].impact}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Controls */}
        <div className="flex items-center justify-between mt-6">
          <button
            onClick={goToPrevious}
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors duration-200"
          >
            <ChevronLeft className="w-5 h-5 text-white" />
          </button>

          {/* Dots */}
          <div className="flex space-x-2">
            {stories.map((_, index) => (
              <button
                key={index}
                onClick={() => goToStory(index)}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  index === currentIndex 
                    ? 'bg-white scale-125' 
                    : 'bg-white/30 hover:bg-white/50'
                }`}
              />
            ))}
          </div>

          <button
            onClick={goToNext}
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors duration-200"
          >
            <ChevronRight className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}; 