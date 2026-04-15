// ============================================================================
// IntelliOps AI — Acceptance Criteria Quality Scores Mock Data (PLAN Layer)
// Scores, dimension breakdowns, and INVEST assessments for requirement ACs
// ============================================================================

import type { AcceptanceCriteriaScore } from '@/lib/types/acceptanceCriteriaQuality';

export const acceptanceCriteriaScores: AcceptanceCriteriaScore[] = [
  // ---------------------------------------------------------------------------
  // feat1 — Premium checkout with discount logic
  // Overall: 62 (Grade C) | Weakest: boundaryConditions (35) | Strongest: clarity (78)
  // ---------------------------------------------------------------------------
  {
    requirementId: 'feat1',
    requirementTitle: 'Premium checkout with discount logic',
    overallScore: 62,
    grade: 'C',

    dimensions: {
      clarity: {
        score: 78,
        findings: [
          'Discount application order is clearly stated for loyalty points vs. promotional codes',
          'User tier definitions (Silver, Gold, Platinum) are referenced with explicit thresholds',
          'Integration touch-points with pricing engine and payment service are named explicitly',
          'Outcome language uses measurable terms ("discount applied before tax calculation")',
        ],
        suggestions: [
          'Add: Define the precise sequence of operations when multiple discount types apply simultaneously',
          'Clarify: Specify whether "premium user" refers to account tier or subscription status — these differ in the system',
          'Add: Include example scenarios in the AC to remove ambiguity for testers',
        ],
      },
      completeness: {
        score: 65,
        findings: [
          'Happy-path scenario for single discount application is fully described',
          'Missing: No AC covers discount service unavailability during checkout',
          'Missing: No AC addresses rollback behavior when payment fails after discount is applied',
          'Missing: No AC specifies how expired promotional codes are surfaced to the user',
        ],
        suggestions: [
          'Add: "When the discount service is unavailable, the checkout proceeds at full price with a user-visible notice and the discount is applied retrospectively via refund within 24 hours"',
          'Add: "When payment fails after discount reservation, the discount reservation is released within 60 seconds"',
          'Add: "When a promotional code is expired, the system displays error code PROMO-EXPIRED with the code expiry date"',
        ],
      },
      testability: {
        score: 72,
        findings: [
          'Most ACs contain verifiable outcomes with clear pass/fail criteria',
          'Discount percentage output is measurable and system-checkable',
          'Some ACs use subjective language ("reasonable discount") without numeric thresholds',
          'No acceptance criteria reference specific test data or scenarios for QA setup',
        ],
        suggestions: [
          'Replace: "reasonable discount" → "discount between 5% and 40% as defined by the tier pricing table"',
          'Add: Reference to the discount tier matrix document so testers can build parameterised test cases',
          'Add: "The system logs each discount application event to the audit table with fields: user_id, discount_code, original_amount, discounted_amount, timestamp"',
        ],
      },
      boundaryConditions: {
        score: 35,
        findings: [
          'No upper or lower bounds defined for discount percentage values',
          'No AC covers a discount that reduces the order total below the minimum order threshold',
          'No AC addresses a cart where 100% discount is applied (zero-value order)',
          'No AC specifies behaviour when loyalty points exceed the cart total',
          'Edge case of negative cart value (over-discount) is entirely absent',
        ],
        suggestions: [
          'Add: "When discount percentage exceeds 100%, system rejects with error code DISC-001 and logs the attempt"',
          'Add: "When applied discount reduces order total below the £5.00 minimum, the system caps the discount and notifies the user"',
          'Add: "When loyalty points redeemed exceed the cart total, the excess points are returned to the user\'s balance immediately"',
          'Add: "When discount value equals the cart total (100% off), the order is processed as a zero-value transaction and triggers compliance review flag"',
        ],
      },
      negativeScenarios: {
        score: 58,
        findings: [
          'Invalid promotional code rejection is specified with a generic error message',
          'Double-submission prevention for checkout is mentioned but not fully specified',
          'No AC covers simultaneous checkout by the same user from two devices',
          'Concurrent use of the same single-use discount code by two users is not addressed',
        ],
        suggestions: [
          'Add: "When the same single-use promotional code is submitted by two concurrent sessions, only the first successful reservation is honoured; the second receives error PROMO-ALREADY-USED"',
          'Add: "When a user submits checkout from two browser tabs simultaneously, only the first request is processed; the second receives error CHECKOUT-DUPLICATE"',
          'Strengthen: "Invalid code" error should include the specific reason (expired, not yet valid, wrong tier, already used)',
        ],
      },
      securityConsiderations: {
        score: 62,
        findings: [
          'PII handling during checkout is referenced but not enforced at the AC level',
          'No AC specifies rate-limiting for promotional code validation attempts',
          'Audit trail requirement is mentioned in gaps but not formalised as an AC',
          'No AC addresses prevention of discount code enumeration attacks',
        ],
        suggestions: [
          'Add: "Promotional code validation is rate-limited to 10 attempts per user per hour; further attempts return error RATE-LIMIT-EXCEEDED"',
          'Add: "All discount application events are written to the immutable audit log within 500ms, including originating IP and session ID"',
          'Add: "Discount codes are validated server-side only; no code list or pattern is exposed in client-side responses"',
        ],
      },
    },

    investScore: {
      independent: true,
      negotiable: true,
      valuable: true,
      estimable: true,
      small: false,
      testable: true,
      score: 5,
    },

    totalCriteria: 18,
    criteriaPassing: 9,
    criteriaFailing: 5,
    criteriaMissing: 4,
  },

  // ---------------------------------------------------------------------------
  // feat2 — Real-time portfolio update
  // Overall: 78 (Grade B) | Weakest: boundaryConditions (55) | Strongest: testability (88)
  // ---------------------------------------------------------------------------
  {
    requirementId: 'feat2',
    requirementTitle: 'Real-time portfolio update',
    overallScore: 78,
    grade: 'B',

    dimensions: {
      clarity: {
        score: 82,
        findings: [
          'WebSocket-based streaming mechanism is explicitly named and constrained',
          'Portfolio valuation refresh interval (<500ms) is precisely specified',
          'Stale data threshold (>5 seconds without update) is defined in the AC',
          'Dependency on market data feed is named with the expected data format',
        ],
        suggestions: [
          'Add: Specify whether "real-time" means server-push (WebSocket) or client-poll — currently ambiguous in two ACs',
          'Clarify: Define "live valuation" — does it include unrealised gain/loss or only mark-to-market price?',
        ],
      },
      completeness: {
        score: 75,
        findings: [
          'Happy-path streaming flow is fully covered with connection, update, and disconnect steps',
          'Reconnection logic on feed disruption is specified with a 3-retry policy',
          'Missing: No AC covers data reconciliation between live stream and persisted portfolio at session end',
          'Missing: No AC addresses portfolio display when the user has zero active positions',
        ],
        suggestions: [
          'Add: "On user session end, the system reconciles live portfolio state with the database within 2 seconds and flags any discrepancies to the operations team"',
          'Add: "When a portfolio contains zero positions, the dashboard displays an empty state with onboarding guidance rather than a loading spinner"',
          'Add: "When market data feed is in maintenance mode, the system displays the last known valuation with a staleness timestamp"',
        ],
      },
      testability: {
        score: 88,
        findings: [
          'All ACs use numeric thresholds that can be validated programmatically',
          'Connection states (connected, reconnecting, stale, disconnected) are enumerated and testable',
          'Notification throttling rate (max 1 alert per 30 seconds per instrument) is precisely specified',
          'Load criterion (50K concurrent streams) is stated with clear SLA target (<200ms p99 latency)',
          'Test infrastructure requirements are referenced in the lifecycle impact section',
        ],
        suggestions: [
          'Add: Define the market data simulation test doubles so QA teams can reproduce edge cases deterministically',
          'Add: "Integration tests must cover the reconnection sequence using a controlled feed-disruption test harness"',
        ],
      },
      boundaryConditions: {
        score: 55,
        findings: [
          'Maximum concurrent streams per server instance is not defined',
          'No AC covers behaviour when a single instrument has more than 1000 price updates per second',
          'Portfolio with a single instrument vs. 500+ instruments behaviour is not differentiated',
          'No AC addresses what happens when price update arrives with a timestamp in the future',
        ],
        suggestions: [
          'Add: "When the market feed delivers >500 price ticks per second for a single instrument, the system applies a 100ms debounce and forwards the latest value only"',
          'Add: "When a price update timestamp is more than 30 seconds in the future, the update is rejected and logged as CLOCK-SKEW-DETECTED"',
          'Add: "When a portfolio contains more than 500 instruments, pagination is applied and only the top 100 by value are streamed by default"',
        ],
      },
      negativeScenarios: {
        score: 80,
        findings: [
          'Market feed disconnection scenario is well specified with visual indicator and retry logic',
          'Invalid instrument ID in portfolio triggers a clear error state',
          'Concurrent modification (same portfolio from two devices) conflict resolution is described',
          'Network throttling / slow connection degradation is noted but resolution is vague',
        ],
        suggestions: [
          'Strengthen: "Network degradation" AC should specify the fallback polling interval (e.g., 5-second poll when WebSocket latency exceeds 2 seconds)',
          'Add: "When the market feed returns a price of zero or negative, the value is rejected and the last valid price is displayed with a DATA-ANOMALY badge"',
        ],
      },
      securityConsiderations: {
        score: 68,
        findings: [
          'WebSocket authentication token validation is mentioned but expiry handling is not specified',
          'No AC covers prevention of portfolio data leakage across user sessions',
          'Rate-limiting on WebSocket subscription requests is absent',
        ],
        suggestions: [
          'Add: "When a WebSocket authentication token expires mid-session, the connection is terminated gracefully and the client is redirected to re-authenticate without data loss"',
          'Add: "Each WebSocket channel is scoped to a single user_id; cross-user subscription attempts return error WS-AUTH-403"',
          'Add: "WebSocket connection requests are rate-limited to 10 new connections per IP per minute to prevent resource exhaustion"',
        ],
      },
    },

    investScore: {
      independent: true,
      negotiable: false,
      valuable: true,
      estimable: true,
      small: true,
      testable: true,
      score: 5,
    },

    totalCriteria: 22,
    criteriaPassing: 16,
    criteriaFailing: 4,
    criteriaMissing: 2,
  },

  // ---------------------------------------------------------------------------
  // feat3 — KYC document verification flow
  // Overall: 45 (Grade D) | Weakest: securityConsiderations (28) | Strongest: completeness (62)
  // ---------------------------------------------------------------------------
  {
    requirementId: 'feat3',
    requirementTitle: 'KYC document verification flow',
    overallScore: 45,
    grade: 'D',

    dimensions: {
      clarity: {
        score: 50,
        findings: [
          '"Automated identity verification" is mentioned but the split between automated and human-review steps is undefined',
          'OCR accuracy threshold is referenced in risks but not formalised in any AC',
          'No AC defines what constitutes a "successful" verification result — the criteria are circular',
          'Liveness check parameters (challenge type, attempt limit) are absent',
        ],
        suggestions: [
          'Add: "A verification is marked APPROVED when: OCR confidence ≥ 98%, liveness score ≥ 0.85, and compliance database returns no sanctions match"',
          'Add: "When automated OCR confidence is between 85% and 97%, the case is routed to manual review queue within 5 minutes"',
          'Rewrite: Replace "complete the verification flow" with enumerated states: PENDING, OCR_REVIEW, LIVENESS_FAILED, MANUAL_REVIEW, APPROVED, REJECTED',
        ],
      },
      completeness: {
        score: 62,
        findings: [
          'Document submission step is covered with supported document types listed',
          'Compliance database check is included as a required step',
          'Missing: No AC covers the re-submission flow when a document fails OCR',
          'Missing: No AC specifies the data retention policy for rejected documents',
          'Missing: No AC addresses the user notification when manual review exceeds SLA (4 hours)',
        ],
        suggestions: [
          'Add: "When OCR processing fails, the user is prompted to re-upload with guidance on accepted formats; maximum 3 attempts before the session is escalated to manual review"',
          'Add: "Rejected verification documents are retained for 30 days for audit purposes then permanently deleted; approved documents are retained for 7 years per regulatory requirement"',
          'Add: "When manual review exceeds 4 hours, the user receives an email notification and the case is escalated to the compliance operations team"',
        ],
      },
      testability: {
        score: 42,
        findings: [
          'ACs use vague outcome language: "documents are verified correctly", "liveness check passes" without measurable criteria',
          'No test data specification exists for document types, sizes, or formats',
          'Compliance validation success criteria reference "regulatory requirements" without specifying which regulations or thresholds',
          'Vendor API mock/stub requirements are absent, making isolated testing impossible',
        ],
        suggestions: [
          'Replace: "documents are verified correctly" → "OCR extraction achieves ≥98% field accuracy against ground-truth test set of 50 documents across 5 document types"',
          'Add: "Vendor API must be abstractable via a test double interface; all ACs must be verifiable without live vendor connection"',
          'Add: Reference the specific regulatory framework (e.g., FCA SYSC, GDPR Article 9) in each compliance AC so testers can verify against the correct standard',
        ],
      },
      boundaryConditions: {
        score: 38,
        findings: [
          'No AC covers documents at the size boundary (e.g., exactly 10MB file upload limit)',
          'No AC specifies behaviour for documents that are partially legible or physically damaged',
          'No AC addresses verification for users at the age boundary (18 years old edge case)',
          'Maximum number of documents per verification session is not defined',
        ],
        suggestions: [
          'Add: "When an uploaded document exceeds 10MB, the system rejects with error KYC-FILE-TOO-LARGE before OCR processing begins"',
          'Add: "When OCR legibility score is below 50%, the system immediately requests re-upload without consuming an attempt credit"',
          'Add: "When document indicates the applicant is under 18, verification is immediately rejected with error KYC-AGE-INELIGIBLE and no PII is retained beyond 24 hours"',
          'Add: Define the maximum document count per session (suggest: 5 documents) to prevent resource exhaustion',
        ],
      },
      negativeScenarios: {
        score: 45,
        findings: [
          'Expired document rejection is mentioned in test strategy but not formalised as an AC',
          'Vendor API timeout handling references a retry policy but no AC specifies the exact behaviour',
          'No AC covers a user submitting a document that belongs to another person',
          'Fraudulent document detection outcome is absent',
        ],
        suggestions: [
          'Add: "When vendor OCR detects document tampering or forgery indicators, verification is immediately rejected with status FRAUD-SUSPECTED and the case is flagged to the fraud team via real-time alert"',
          'Add: "When ID verification vendor API times out after 30 seconds, the system retries once; if the second attempt fails, the case is queued for batch processing and the user is notified within 2 hours"',
          'Add: "When submitted document data does not match the account profile name by more than a defined threshold (Levenshtein distance > 3), a manual review flag is raised"',
        ],
      },
      securityConsiderations: {
        score: 28,
        findings: [
          'PII encryption at rest and in transit is mentioned as a risk but has no corresponding AC',
          'No AC specifies access control on who can view or retrieve submitted identity documents',
          'Audit logging requirements for document access are entirely absent from ACs',
          'No AC addresses secure deletion of PII after retention period expires',
          'Compliance with GDPR right-to-erasure for KYC data is not addressed',
        ],
        suggestions: [
          'Add: "All document images and extracted PII are encrypted at rest using AES-256; encryption keys are managed by the enterprise KMS and rotated annually"',
          'Add: "Access to stored KYC documents is restricted to roles: COMPLIANCE_OFFICER, FRAUD_ANALYST, and SYSTEM_AUDIT; all access attempts are logged to the immutable audit trail"',
          'Add: "When a user exercises GDPR right-to-erasure, all KYC documents and extracted data are permanently deleted within 72 hours, except where regulatory retention applies; the erasure is logged with timestamp and approving officer"',
          'Add: "Document storage keys in S3 must use non-guessable UUIDs; no sequential or user-ID-based naming that enables enumeration"',
        ],
      },
    },

    investScore: {
      independent: false,
      negotiable: true,
      valuable: true,
      estimable: true,
      small: false,
      testable: false,
      score: 3,
    },

    totalCriteria: 14,
    criteriaPassing: 5,
    criteriaFailing: 6,
    criteriaMissing: 3,
  },
];

export function getACScoreByRequirementId(id: string): AcceptanceCriteriaScore | undefined {
  return acceptanceCriteriaScores.find((s) => s.requirementId === id);
}
