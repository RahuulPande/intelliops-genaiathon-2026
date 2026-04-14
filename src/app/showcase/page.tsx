'use client';

import { useState, useEffect, useCallback } from 'react';
import ShowcaseContainer from '@/components/showcase/ShowcaseContainer';
import ProblemScreen from '@/components/showcase/screens/ProblemScreen';
import SolutionScreen from '@/components/showcase/screens/SolutionScreen';
import LiveFeaturesScreen from '@/components/showcase/screens/LiveFeaturesScreen';
import AIProofScreen from '@/components/showcase/screens/AIProofScreen';
import ImpactScreen from '@/components/showcase/screens/ImpactScreen';

const TOTAL_SCREENS = 5;

export default function ShowcasePage() {
  const [currentScreen, setCurrentScreen] = useState(0);

  // Force dark mode
  useEffect(() => {
    const html = document.documentElement;
    const hadDark = html.classList.contains('dark');
    html.classList.add('dark');
    return () => {
      if (!hadDark) html.classList.remove('dark');
    };
  }, []);

  const goNext = useCallback(() => {
    setCurrentScreen((s) => Math.min(s + 1, TOTAL_SCREENS - 1));
  }, []);

  const goPrev = useCallback(() => {
    setCurrentScreen((s) => Math.max(s - 1, 0));
  }, []);

  const goTo = useCallback((index: number) => {
    setCurrentScreen(Math.max(0, Math.min(index, TOTAL_SCREENS - 1)));
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        goNext();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        goPrev();
      } else if (e.key === 'Escape') {
        window.location.href = '/';
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goNext, goPrev]);

  const screens = [
    <ProblemScreen key="problem" />,
    <SolutionScreen key="solution" />,
    <LiveFeaturesScreen key="live-features" />,
    <AIProofScreen key="ai-proof" />,
    <ImpactScreen key="impact" />,
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-gray-900">
      <ShowcaseContainer
        currentScreen={currentScreen}
        totalScreens={TOTAL_SCREENS}
        onPrev={goPrev}
        onNext={goNext}
        onGoTo={goTo}
      >
        {screens[currentScreen]}
      </ShowcaseContainer>
    </div>
  );
}
