// ── AI Audit Log Types ──────────────────────────────────
// Typed interfaces for the AI decision audit trail — every AI inference
// made in IntelliOps is logged with full context for compliance and governance.

export type AIAuditAction =
  | 'pr_risk_analysis'
  | 'pr_security_scan'
  | 'requirement_analysis'
  | 'acceptance_criteria_scoring'
  | 'test_case_generation'
  | 'test_strategy_generation'
  | 'incident_root_cause'
  | 'release_risk_assessment'
  | 'cab_package_generation'
  | 'defect_matching'
  | 'coverage_analysis'
  | 'dora_insight_generation'
  | 'general_query';

export interface AIAuditEntry {
  /** Unique identifier for this audit record — format: audit-{YYYYMMDD}-{seq} */
  id: string;
  /** ISO 8601 timestamp of when the inference was triggered */
  timestamp: string;
  /** Username of the user who triggered the analysis */
  userId: string;
  /** Display name of the user */
  userName: string;
  /** Role of the user at the time of the request */
  userRole: 'admin' | 'viewer' | 'operator';
  /** The type of AI action performed */
  action: AIAuditAction;
  /** Model identifier used for the inference */
  model: string;
  /** AI provider (e.g., "Anthropic (simulated)") */
  provider: string;
  /** Platform layer where the analysis originated */
  layer: 'L0' | 'L1' | 'L2' | 'L3' | 'L4' | 'L5' | 'cross-layer';
  /** Workspace/feature area within the layer */
  workspace: string;
  /** Type of entity analyzed (e.g., "pull_request", "requirement", "incident") */
  entityType: string;
  /** ID of the analyzed entity */
  entityId: string;
  /** Human-readable title of the analyzed entity */
  entityTitle: string;
  /** Short description of the input context provided to the model */
  inputSummary: string;
  /** Short description of the AI-generated output */
  outputSummary: string;
  /** Number of input tokens consumed */
  inputTokens: number;
  /** Number of output tokens generated */
  outputTokens: number;
  /** Total wall-clock duration of the inference in milliseconds */
  durationMs: number;
  /** Confidence score returned by the model (null if not applicable) */
  confidence: number | null;
  /** Final status of the inference request */
  status: 'success' | 'error' | 'timeout' | 'rate_limited';
  /** Error message if status is not 'success' (null otherwise) */
  errorMessage: string | null;
  /** Whether a human reviewer has validated this AI output */
  humanReviewed: boolean;
  /** Action taken by the user after reviewing the AI output (null if not yet acted upon) */
  actionTaken: string | null;
  /** Regulatory / compliance framework tags applicable to this inference */
  complianceTags: string[];
}

export interface AIAuditSummary {
  /** Human-readable label for the reporting period (e.g., "Last 30 days") */
  period: string;
  /** Total number of AI inference requests in the period */
  totalAnalyses: number;
  /** Breakdown of inference count by layer ID */
  byLayer: Record<string, number>;
  /** Breakdown of inference count by action type */
  byAction: Record<string, number>;
  /** Breakdown of inference count by model name */
  byModel: Record<string, number>;
  /** Breakdown of inference count by status */
  byStatus: Record<string, number>;
  /** Total tokens consumed (input + output) across all inferences */
  totalTokensUsed: number;
  /** Average confidence score across all inferences that returned one */
  avgConfidence: number;
  /** Fraction of inferences that were human-reviewed (0.0–1.0) */
  humanReviewRate: number;
  /** Fraction of inferences that resulted in a non-success status (0.0–1.0) */
  errorRate: number;
  /** Number of inferences tagged with at least one compliance framework */
  complianceRelevant: number;
}
