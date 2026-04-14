'use client';

import IntelligentTestQualityLanding from '@/components/intelligent-test-quality/IntelligentTestQualityLanding';

interface QualityOverviewSectionProps {
  onNavigateToSection?: (section: string) => void;
}

export default function QualityOverviewSection({ onNavigateToSection }: QualityOverviewSectionProps) {
  const handleNavigate = (section: string) => {
    // Map internal landing card actions to demo sidebar section IDs
    const sectionMapping: Record<string, string> = {
      'defect-matching': 'defect-intelligence',
      'defect-analytics': 'defect-intelligence',
      'test-execution': 'test-management',
      'test-velocity': 'test-management',
      'quality-metrics': 'quality-insights',
      'risk-assessment': 'quality-insights',
      'performance-testing': 'performance-intelligence',
      'bottleneck-identification': 'performance-intelligence',
    };
    const target = sectionMapping[section] || section;
    onNavigateToSection?.(target);
  };

  return <IntelligentTestQualityLanding onNavigateToSection={handleNavigate} />;
}
