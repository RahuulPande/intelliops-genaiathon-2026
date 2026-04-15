'use client';

import RedesignedLandingPage from './redesign/RedesignedLandingPage';

export interface LandingPageProps {
  onNavigateToSection: (section: string) => void;
}

export default function LandingPage({ onNavigateToSection }: LandingPageProps) {
  return <RedesignedLandingPage onNavigateToSection={onNavigateToSection} />;
}
