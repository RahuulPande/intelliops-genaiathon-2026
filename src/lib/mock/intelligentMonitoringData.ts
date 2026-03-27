export interface TestReexecutionGap {
  defectId: string;
  defectTitle: string;
  fixedDate: string;
  fixedBy: string;
  status: 'Fixed' | 'Resolved' | 'Closed';
  relatedTests: TestCase[];
  businessImpact: string;
  daysSinceFixed: number;
  riskLevel: 'Critical' | 'High' | 'Medium' | 'Low';
}

export interface TestCase {
  testId: string;
  testName: string;
  lastExecuted: string;
  assignee: string;
  priority: 'Critical' | 'High' | 'Medium' | 'Low';
  estimatedDuration: string;
  status: 'Not Re-executed' | 'Scheduled' | 'In Progress' | 'Completed';
}

export interface DocumentationQualityIssue {
  defectId: string;
  defectTitle: string;
  closedBy: string;
  closedDate: string;
  currentDocumentation: string;
  qualityScore: number; // 1-10
  missingElements: QualityElement[];
  aiSuggestions: AISuggestion[];
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
}

export interface QualityElement {
  element: string;
  importance: 'Critical' | 'High' | 'Medium' | 'Low';
  impact: string;
}

export interface AISuggestion {
  category: string;
  suggestion: string;
  potentialImpact: string;
}

export interface AILearningMetrics {
  totalDefectsThisMonth: number;
  wellDocumented: number;
  needsImprovement: number;
  criticallyPoor: number;
  averageQualityScore: number;
  aiMatchingAccuracy: number;
  potentialAccuracy: number;
  monthlyImprovementTrend: string;
}

export const mockTestReexecutionGaps: TestReexecutionGap[] = [
  {
    defectId: "DEF-2847",
    defectTitle: "Payment Gateway Timeout",
    fixedDate: "2026-08-02T14:30:00Z",
    fixedBy: "john.doe@company.com",
    status: "Fixed",
    relatedTests: [
      {
        testId: "PAY-TC-401",
        testName: "High Volume Payment Processing",
        lastExecuted: "2026-07-28T10:15:00Z",
        assignee: "sarah.tester@company.com",
        priority: "Critical",
        estimatedDuration: "45 minutes",
        status: "Not Re-executed"
      },
      {
        testId: "PAY-TC-402",
        testName: "Timeout Handling Validation",
        lastExecuted: "2026-07-25T16:20:00Z",
        assignee: "sarah.tester@company.com",
        priority: "High",
        estimatedDuration: "30 minutes",
        status: "Not Re-executed"
      }
    ],
    businessImpact: "High - Payment processing critical path",
    daysSinceFixed: 3,
    riskLevel: "Critical"
  },
  {
    defectId: "DEF-2851",
    defectTitle: "Login Session Timeout",
    fixedDate: "2026-08-03T16:45:00Z",
    fixedBy: "mike.dev@company.com",
    status: "Fixed",
    relatedTests: [
      {
        testId: "AUTH-TC-205",
        testName: "Session Management Test Suite",
        lastExecuted: "2026-07-30T14:30:00Z",
        assignee: "alex.tester@company.com",
        priority: "High",
        estimatedDuration: "60 minutes",
        status: "Not Re-executed"
      }
    ],
    businessImpact: "Medium - User authentication flow",
    daysSinceFixed: 2,
    riskLevel: "High"
  },
  {
    defectId: "DEF-2855",
    defectTitle: "Database Connection Pool Leak",
    fixedDate: "2026-08-04T09:15:00Z",
    fixedBy: "database.team@company.com",
    status: "Resolved",
    relatedTests: [
      {
        testId: "DB-TC-301",
        testName: "Connection Pool Stress Test",
        lastExecuted: "2026-08-01T11:00:00Z",
        assignee: "db.tester@company.com",
        priority: "Critical",
        estimatedDuration: "90 minutes",
        status: "Not Re-executed"
      },
      {
        testId: "DB-TC-302",
        testName: "Connection Cleanup Validation",
        lastExecuted: "2026-07-31T15:45:00Z",
        assignee: "db.tester@company.com",
        priority: "Medium",
        estimatedDuration: "45 minutes",
        status: "Not Re-executed"
      }
    ],
    businessImpact: "Critical - System stability",
    daysSinceFixed: 1,
    riskLevel: "Critical"
  }
];

export const mockDocumentationQualityIssues: DocumentationQualityIssue[] = [
  {
    defectId: "DEF-2849",
    defectTitle: "Database Connection Pool Exhaustion",
    closedBy: "dev.team.lead@company.com",
    closedDate: "2026-08-04T11:00:00Z",
    currentDocumentation: "Fixed connection issue. Working now.",
    qualityScore: 2,
    severity: "Critical",
    missingElements: [
      {
        element: "Root Cause Analysis",
        importance: "Critical",
        impact: "AI cannot identify similar connection pool issues"
      },
      {
        element: "Technical Solution Details",
        importance: "High",
        impact: "Future engineers cannot learn from this fix"
      },
      {
        element: "Prevention Measures",
        importance: "Medium",
        impact: "Similar issues likely to recur"
      }
    ],
    aiSuggestions: [
      {
        category: "Root Cause",
        suggestion: "Add details about connection pool configuration, concurrent user load, and resource monitoring data",
        potentialImpact: "+40% accuracy for similar database issues"
      },
      {
        category: "Technical Solution",
        suggestion: "Document specific code changes, configuration updates, and monitoring improvements",
        potentialImpact: "+35% resolution speed for similar issues"
      }
    ]
  },
  {
    defectId: "DEF-2850",
    defectTitle: "Memory Leak in User Session Management",
    closedBy: "frontend.dev@company.com",
    closedDate: "2026-08-03T14:20:00Z",
    currentDocumentation: "Fixed memory issue. Tested and works now.",
    qualityScore: 3,
    severity: "High",
    missingElements: [
      {
        element: "Memory Profiling Data",
        importance: "Critical",
        impact: "Cannot identify memory leak patterns"
      },
      {
        element: "Code Changes Documentation",
        importance: "High",
        impact: "Solution cannot be replicated"
      }
    ],
    aiSuggestions: [
      {
        category: "Technical Details",
        suggestion: "Include memory usage before/after, profiling screenshots, and specific code modifications",
        potentialImpact: "+50% accuracy for memory-related defects"
      }
    ]
  },
  {
    defectId: "DEF-2852",
    defectTitle: "API Response Timeout",
    closedBy: "backend.dev@company.com",
    closedDate: "2026-08-02T16:30:00Z",
    currentDocumentation: "Increased timeout values. Issue resolved.",
    qualityScore: 4,
    severity: "Medium",
    missingElements: [
      {
        element: "Performance Metrics",
        importance: "High",
        impact: "Cannot optimize similar API issues"
      },
      {
        element: "Load Testing Results",
        importance: "Medium",
        impact: "Cannot validate solution under stress"
      }
    ],
    aiSuggestions: [
      {
        category: "Performance Data",
        suggestion: "Add response time metrics, load test results, and configuration changes",
        potentialImpact: "+30% accuracy for API performance issues"
      }
    ]
  }
];

export const mockAILearningMetrics: AILearningMetrics = {
  totalDefectsThisMonth: 45,
  wellDocumented: 28,
  needsImprovement: 11,
  criticallyPoor: 4,
  averageQualityScore: 7.3,
  aiMatchingAccuracy: 94.2,
  potentialAccuracy: 98.7,
  monthlyImprovementTrend: "+2.1%"
};

export const mockNotificationTemplates = {
  testReexecution: {
    subject: "🔄 Test Re-execution Required: {defectId}",
    body: "The defect {defectTitle} was fixed on {fixDate}, but the following related test cases haven't been re-executed: {testCasesList}. Please prioritize re-execution to ensure the fix is properly validated.",
    actions: ["Mark for re-execution", "Schedule test run", "Snooze for 4 hours"]
  },
  documentationQuality: {
    subject: "📝 Documentation Enhancement Needed: {defectId}",
    body: "The defect {defectTitle} was closed but lacks sufficient documentation for future AI pattern matching. Enhanced documentation will help the system automatically suggest solutions for similar issues in the future.",
    actions: ["Use AI Documentation Assistant", "Add detailed comments", "Request team lead review"]
  }
};

// Helper functions for data manipulation
export function getTestGapsByPriority(gaps: TestReexecutionGap[]) {
  return {
    critical: gaps.filter(gap => gap.riskLevel === 'Critical').length,
    high: gaps.filter(gap => gap.riskLevel === 'High').length,
    medium: gaps.filter(gap => gap.riskLevel === 'Medium').length,
    low: gaps.filter(gap => gap.riskLevel === 'Low').length
  };
}

export function getDocumentationIssuesBySeverity(issues: DocumentationQualityIssue[]) {
  return {
    critical: issues.filter(issue => issue.severity === 'Critical').length,
    high: issues.filter(issue => issue.severity === 'High').length,
    medium: issues.filter(issue => issue.severity === 'Medium').length,
    low: issues.filter(issue => issue.severity === 'Low').length
  };
}

export function calculatePotentialROIImprovement(metrics: AILearningMetrics) {
  const currentAccuracy = metrics.aiMatchingAccuracy;
  const potentialAccuracy = metrics.potentialAccuracy;
  const improvement = potentialAccuracy - currentAccuracy;
  
  // Each 1% improvement in AI accuracy saves approximately 2.5 hours per defect
  const timeSavingsPerDefect = improvement * 2.5; // hours
  const monthlyDefects = metrics.totalDefectsThisMonth;
  const monthlySavings = timeSavingsPerDefect * monthlyDefects;
  const annualSavings = monthlySavings * 12;
  
  return {
    accuracyImprovement: improvement,
    timeSavingsPerDefect,
    monthlySavings,
    annualSavings
  };
}