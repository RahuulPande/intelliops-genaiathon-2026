'use client';

import { useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ShowcaseNav from './ShowcaseNav';

interface ShowcaseContainerProps {
  currentScreen: number;
  totalScreens: number;
  onPrev: () => void;
  onNext: () => void;
  onGoTo: (index: number) => void;
  children: React.ReactNode;
}

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 80 : -80,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 80 : -80,
    opacity: 0,
  }),
};

export default function ShowcaseContainer({
  currentScreen,
  totalScreens,
  onPrev,
  onNext,
  onGoTo,
  children,
}: ShowcaseContainerProps) {
  const directionRef = useRef(1);
  const touchStartRef = useRef<number | null>(null);

  const handlePrev = useCallback(() => {
    directionRef.current = -1;
    onPrev();
  }, [onPrev]);

  const handleNext = useCallback(() => {
    directionRef.current = 1;
    onNext();
  }, [onNext]);

  const handleGoTo = useCallback(
    (index: number) => {
      directionRef.current = index > currentScreen ? 1 : -1;
      onGoTo(index);
    },
    [currentScreen, onGoTo],
  );

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartRef.current = e.touches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (touchStartRef.current === null) return;
      const delta = e.changedTouches[0].clientX - touchStartRef.current;
      if (Math.abs(delta) > 60) {
        if (delta < 0) handleNext();
        else handlePrev();
      }
      touchStartRef.current = null;
    },
    [handleNext, handlePrev],
  );

  return (
    <div
      className="relative w-full min-h-screen overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Screen Content */}
      <div className="w-full min-h-screen flex items-center justify-center px-6 py-24 md:px-12">
        <AnimatePresence mode="wait" custom={directionRef.current}>
          <motion.div
            key={currentScreen}
            custom={directionRef.current}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="w-full max-w-6xl mx-auto"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Nav */}
      <ShowcaseNav
        currentScreen={currentScreen}
        totalScreens={totalScreens}
        onPrev={handlePrev}
        onNext={handleNext}
        onGoTo={handleGoTo}
      />
    </div>
  );
}
