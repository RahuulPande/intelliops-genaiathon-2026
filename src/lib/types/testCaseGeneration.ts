export interface GeneratedTestScenario {
  id: string;
  requirementId: string;
  requirementTitle: string;
  category: 'functional' | 'edge_case' | 'negative' | 'security' | 'performance' | 'accessibility';
  priority: 'critical' | 'high' | 'medium' | 'low';
  scenario: {
    title: string;
    given: string;
    when: string;
    then: string;
  };
  preconditions: string[];
  testData: string[];
  relatedRisks: string[];
  estimatedEffort: 'trivial' | 'small' | 'medium' | 'large';
  automatable: boolean;
  tags: string[];
}

export interface TestGenerationResult {
  requirementId: string;
  requirementTitle: string;
  generatedAt: string;
  scenarios: GeneratedTestScenario[];
  coverageSummary: {
    functional: number;
    edgeCases: number;
    negative: number;
    security: number;
    performance: number;
    total: number;
  };
  aiConfidence: number;
  suggestedMissingCoverage: string[];
}
