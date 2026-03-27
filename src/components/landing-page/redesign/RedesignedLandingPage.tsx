'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';

// Import redesigned components
import FixedHeader from './FixedHeader';
import EnhancedHero from './EnhancedHero';
import ProblemStatement from './ProblemStatement';
import ProductRoadmapSection from './ProductRoadmapSection';

// Focused landing page sections
import WhatIsDeliveryIntelligence from '../WhatIsDeliveryIntelligence';
import AIUsageSection from '../AIUsageSection';
import DeliveryFeaturesSection from '../DeliveryFeaturesSection';
import DeliveryImpactSection from '../DeliveryImpactSection';

export interface RedesignedLandingPageProps {
  onNavigateToSection: (section: string) => void;
}

export default function RedesignedLandingPage({ onNavigateToSection }: RedesignedLandingPageProps) {
  // Handle keyboard shortcuts for intelligence layers
  useEffect(() => {
    const handleKeyboardShortcuts = (event: KeyboardEvent) => {
      if (event.ctrlKey || event.metaKey) {
        switch (event.key) {
          case '1':
            event.preventDefault();
            onNavigateToSection('test-quality-intelligence');
            break;
          case '2':
            event.preventDefault();
            onNavigateToSection('release-intelligence');
            break;
          case '3':
            event.preventDefault();
            onNavigateToSection('knowledge-base');
            break;
          default:
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyboardShortcuts);
    return () => {
      window.removeEventListener('keydown', handleKeyboardShortcuts);
    };
  }, [onNavigateToSection]);

  // Smooth scroll enhancement
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      html {
        scroll-behavior: smooth;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Fixed Header Navigation */}
      <FixedHeader onNavigateToSection={onNavigateToSection} />

      {/* Main Content */}
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* 1. Hero — AI-Powered Delivery Intelligence */}
        <EnhancedHero onNavigateToSection={onNavigateToSection} />

        {/* 2. What is Delivery Intelligence? */}
        <WhatIsDeliveryIntelligence />

        {/* 3. The Delivery Intelligence Gap */}
        <ProblemStatement />

        {/* 4. How AI Powers Delivery Intelligence */}
        <AIUsageSection />

        {/* 5. AI-Powered Delivery Features */}
        <DeliveryFeaturesSection />

        {/* 6. Delivery Impact — Measurable results */}
        <DeliveryImpactSection />

        {/* 7. Product Roadmap & Intelligence Layers */}
        <ProductRoadmapSection onNavigateToSection={onNavigateToSection} />
      </motion.main>

      {/* Accessibility Enhancement */}
      <div className="sr-only" role="region" aria-label="Navigation shortcuts">
        <p>Use Ctrl+1 to Ctrl+3 to navigate to Delivery Intelligence sections</p>
      </div>
    </div>
  );
}