'use client';

import RedesignedLandingPage from './redesign/RedesignedLandingPage';
import DevLandingPage from './DevLandingPage';
import { useAuth } from '@/context/AuthContext';

export interface LandingPageProps {
  onNavigateToSection: (section: string) => void;
}

export default function LandingPage({ onNavigateToSection }: LandingPageProps) {
  const { isAdmin } = useAuth();

  // Dev mode: full SDLC lifecycle landing page
  // Demo mode: original redesigned landing page (unchanged)
  if (isAdmin) {
    return <DevLandingPage onNavigateToSection={onNavigateToSection} />;
  }

  return <RedesignedLandingPage onNavigateToSection={onNavigateToSection} />;
}
