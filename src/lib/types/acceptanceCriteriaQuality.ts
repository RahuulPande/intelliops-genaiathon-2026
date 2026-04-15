export interface DimensionScore {
  score: number;
  findings: string[];
  suggestions: string[];
}

export interface AcceptanceCriteriaScore {
  requirementId: string;
  requirementTitle: string;
  overallScore: number;
  grade: 'A' | 'B' | 'C' | 'D' | 'F';

  dimensions: {
    completeness: DimensionScore;
    clarity: DimensionScore;
    testability: DimensionScore;
    boundaryConditions: DimensionScore;
    negativeScenarios: DimensionScore;
    securityConsiderations: DimensionScore;
  };

  investScore: {
    independent: boolean;
    negotiable: boolean;
    valuable: boolean;
    estimable: boolean;
    small: boolean;
    testable: boolean;
    score: number;
  };

  totalCriteria: number;
  criteriaPassing: number;
  criteriaFailing: number;
  criteriaMissing: number;
}
