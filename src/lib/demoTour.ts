export interface TourStep {
  id: number;
  layer: string;
  targetSection: string;
  narration: string;
  autoAdvanceMs: number;
  /** CSS selector or data attribute for spotlight highlight */
  spotlightTarget?: string;
}

export const tourSteps: TourStep[] = [
  {
    id: 1,
    layer: 'home',
    targetSection: 'platform-overview',
    narration:
      'IntelliOps monitors your entire software lifecycle — from requirements to production. Watch as intelligence flows through each layer.',
    autoAdvanceMs: 6000,
  },
  {
    id: 2,
    layer: 'plan-intelligence',
    targetSection: 'plan-intelligence',
    narration:
      'It starts with requirements. Our AI analyzes every requirement for gaps, ambiguities, and risk — before a single line of code is written.',
    autoAdvanceMs: 6000,
    spotlightTarget: '[data-tour-target="step-2"]',
  },
  {
    id: 3,
    layer: 'plan-intelligence',
    targetSection: 'plan-intelligence',
    narration:
      'Machine learning predicts risk across 5 dimensions, identifying problems while they\'re still cheap to fix.',
    autoAdvanceMs: 6000,
    spotlightTarget: '[data-tour-target="step-3"]',
  },
  {
    id: 4,
    layer: 'build-intelligence',
    targetSection: 'build-intelligence',
    narration:
      'When developers open pull requests, IntelliOps instantly assesses risk. This PR scores 82% risk — it touches a critical payment service.',
    autoAdvanceMs: 6000,
    spotlightTarget: '[data-tour-target="step-4"]',
  },
  {
    id: 5,
    layer: 'build-intelligence',
    targetSection: 'build-intelligence',
    narration:
      'AI generates a grounded summary explaining exactly what changed and why it\'s risky — citing specific files, not guessing.',
    autoAdvanceMs: 6000,
    spotlightTarget: '[data-tour-target="step-5"]',
  },
  {
    id: 6,
    layer: 'test-quality-intelligence',
    targetSection: 'test-quality-intelligence',
    narration:
      'Test intelligence identifies coverage gaps and matches new failures to historical defects with 96% accuracy.',
    autoAdvanceMs: 6000,
    spotlightTarget: '[data-tour-target="step-6"]',
  },
  {
    id: 7,
    layer: 'service-health-intelligence',
    targetSection: 'service-health-intelligence',
    narration:
      'When incidents occur, root cause analysis happens in 2.3 seconds — correlating across PRs, logs, and historical patterns.',
    autoAdvanceMs: 6000,
    spotlightTarget: '[data-tour-target="step-7"]',
  },
  {
    id: 8,
    layer: 'learn-intelligence',
    targetSection: 'learn-intelligence',
    narration:
      'This is our differentiator: the Learning Loop. Every incident makes the system smarter — updating risk models, closing knowledge gaps.',
    autoAdvanceMs: 6000,
    spotlightTarget: '[data-tour-target="step-8"]',
  },
  {
    id: 9,
    layer: 'learn-intelligence',
    targetSection: 'learn-intelligence',
    narration:
      'Watch the full lifecycle trace: a requirement became a PR, which caused an incident, which generated a learning that prevents future problems.',
    autoAdvanceMs: 6000,
    spotlightTarget: '[data-tour-target="step-9"]',
  },
  {
    id: 10,
    layer: 'home',
    targetSection: 'platform-overview',
    narration:
      'The result: 75% faster incident resolution, 96% defect match accuracy, and a system that continuously improves itself.',
    autoAdvanceMs: 6000,
  },
];

export const getLayerBadgeColor = (
  layer: string
): { bg: string; text: string } => {
  const colors: Record<string, { bg: string; text: string }> = {
    home: { bg: 'bg-gray-600 dark:bg-gray-700', text: 'text-white' },
    'plan-intelligence': {
      bg: 'bg-teal-600 dark:bg-teal-700',
      text: 'text-white',
    },
    'build-intelligence': {
      bg: 'bg-indigo-600 dark:bg-indigo-700',
      text: 'text-white',
    },
    'test-quality-intelligence': {
      bg: 'bg-purple-600 dark:bg-purple-700',
      text: 'text-white',
    },
    'service-health-intelligence': {
      bg: 'bg-blue-600 dark:bg-blue-700',
      text: 'text-white',
    },
    'learn-intelligence': {
      bg: 'bg-emerald-600 dark:bg-emerald-700',
      text: 'text-white',
    },
  };

  return colors[layer] || { bg: 'bg-gray-600 dark:bg-gray-700', text: 'text-white' };
};
