// ============================================================================
// IntelliOps AI — Security Intelligence Types (BUILD Layer)
// AI Techniques: LLM (reasoning), RAG (historical matching), ML (risk scoring), NLP (entity extraction)
// ============================================================================

export type SecurityFindingType =
  | 'sql_injection'
  | 'xss'
  | 'hardcoded_secret'
  | 'insecure_dependency'
  | 'authentication_weakness'
  | 'authorization_bypass'
  | 'data_exposure'
  | 'insecure_deserialization'
  | 'path_traversal'
  | 'ssrf'
  | 'race_condition'
  | 'insufficient_logging'
  | 'insecure_configuration';

export interface SecurityFinding {
  id: string;
  type: SecurityFindingType;
  severity: 'critical' | 'high' | 'medium' | 'low' | 'info';
  title: string;
  description: string;
  file: string;
  lineRange: { start: number; end: number };
  cweId: string | null;
  owaspCategory: string | null;
  recommendation: string;
  codeSnippet: string | null;
  fixSuggestion: string | null;
  confidence: number;
  isNewInThisPR: boolean;
  autoFixable: boolean;
}

export interface SecurityAnalysisResult {
  prId: string;
  analyzedAt: string;
  analysisTimeMs: number;
  overallSecurityScore: number;
  securityGrade: 'A' | 'B' | 'C' | 'D' | 'F';
  findings: SecurityFinding[];
  summary: {
    critical: number;
    high: number;
    medium: number;
    low: number;
    info: number;
    total: number;
    newInThisPR: number;
    preExisting: number;
  };
  complianceFlags: {
    pciDssRelevant: boolean;
    gdprRelevant: boolean;
    soxRelevant: boolean;
    details: string[];
  };
  recommendation: 'approve' | 'review_required' | 'block';
  reasoning: string;
}
