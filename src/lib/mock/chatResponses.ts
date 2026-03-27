// ============================================================================
// IntelliOps AI — Chat Response Mock Data
// Pre-built Q&A pairs for the "Ask IntelliOps" conversational chat panel
// Uses RAG (retrieval), LLM (explanation), ML (scoring), NLP (extraction)
// ============================================================================

// ─── Types ────────────────────────────────────────────────────────────────

export interface Evidence {
  type: 'pr' | 'slack' | 'incident' | 'log' | 'jira' | 'commit';
  id: string;
  title: string;
  timestamp?: string;
  relevance: number; // 0.0-1.0
}

export interface ChatResponse {
  id: string;
  triggers: string[]; // keywords that match this response
  question: string; // canonical question text
  answer: string; // full answer text (multi-paragraph)
  sources: Evidence[];
  techniques: ('LLM' | 'RAG' | 'ML' | 'NLP')[];
  confidence: number; // 0.0-1.0
  relatedSection?: string; // section ID to navigate to
}

export interface SuggestionChip {
  label: string;
  query: string;
}

// ─── Chat Responses Data ──────────────────────────────────────────────────

export const chatResponses: ChatResponse[] = [
  {
    id: 'cr-001',
    triggers: ['highest risk', 'risk release', 'risky release', 'release risk'],
    question: 'What is the highest risk release?',
    answer:
      'The March 2026 Release (v3.5.0) shows the highest risk profile with a risk score of 72%. This release introduces changes to the Payment Service and Auth Gateway, affecting critical transaction flows. The risk assessment is driven by three primary factors: the complexity of payment service coupling, the size of changes (3,421 additions, 1,856 deletions across 45 files), and a history of similar deployment challenges in this service layer.\n\nRecommendation: Execute a phased canary deployment starting at 5% user traffic, with automated rollback triggers if error rates exceed 2% or latency surpasses 500ms. The payment service retains a 5-minute transaction replay buffer to support rapid recovery if needed. Monitor transaction error rates and latency metrics closely during the 4-hour rollout window.',
    sources: [
      {
        type: 'pr',
        id: 'PR-4521',
        title: 'Payment Service Enhancements — March Release',
        timestamp: '2026-03-20T14:30:00Z',
        relevance: 0.95,
      },
      {
        type: 'log',
        id: 'release-log-2026-03',
        title: 'Release Deployment Metrics — v3.5.0',
        relevance: 0.88,
      },
      {
        type: 'jira',
        id: 'PLAT-4821',
        title: 'Release Planning & Risk Assessment',
        relevance: 0.82,
      },
    ],
    techniques: ['ML', 'RAG'],
    confidence: 0.92,
    relatedSection: 'release-intelligence',
  },
  {
    id: 'cr-002',
    triggers: ['recent defects', 'latest defects', 'show defects', 'defect list'],
    question: 'Show me recent defects.',
    answer:
      'Our recent defect inventory reveals 8 active defects across the banking platform, with 5 categorized as high or critical severity. The most critical issue involves a timeout failure in the Payment Service (DEF-2025-001), where the 3D Secure redirect process fails to complete within the 30-second window, causing ~1,200 checkout failures daily. This defect is linked to a code change deployed on February 15, 2025, and represents a recurring pattern we\'ve seen 3 times in the past 6 months.\n\nSecond priority is a discount code application bug (DEF-2025-002) affecting promotional checkout flows — the promotion system fails to apply valid discount codes, resulting in incorrect cart totals. A third defect involves payment gateway retry logic (DEF-2025-003) where the retry handler was refactored without proper backward compatibility testing.\n\nDefect matching analysis shows 68% of recent defects correlate with changes in payment-critical services, suggesting a need for enhanced test coverage and pre-deployment validation in transaction paths.',
    sources: [
      {
        type: 'jira',
        id: 'DEF-2025-001',
        title: '3D Secure Redirect Timeout — Payment Service',
        timestamp: '2025-02-15T09:15:00Z',
        relevance: 0.98,
      },
      {
        type: 'jira',
        id: 'DEF-2025-002',
        title: 'Discount Code Not Applied to Cart',
        timestamp: '2025-02-20T16:45:00Z',
        relevance: 0.94,
      },
      {
        type: 'log',
        id: 'test-results-2026-03-25',
        title: 'Latest Test Execution Summary',
        relevance: 0.87,
      },
    ],
    techniques: ['RAG', 'NLP'],
    confidence: 0.89,
    relatedSection: 'intelligent-test-quality',
  },
  {
    id: 'cr-003',
    triggers: ['last incident', 'recent incident', 'what caused', 'root cause'],
    question: 'What caused the last incident?',
    answer:
      'The most recent critical incident (Incident INC-001, detected March 25, 2026) involved checkout failures affecting approximately 2,400 premium-tier users. The root cause was a timeout misconfiguration introduced in the Payment Service through PR #482, where the default gateway timeout was reduced from 30 seconds to 5 seconds during a latency optimization pass.\n\nContributing factors included increased peak load during a promotional event without corresponding scaling adjustments, and the absence of retry and fallback mechanisms for timeout errors. The premium user checkout path involves additional validation steps that inherently require longer response windows, making it particularly susceptible to aggressive timeout reductions.\n\nEvidence shows the engineering team actually flagged this risk 2 days before deployment in a Slack discussion, but the concern was not escalated. Our analysis retrieved historical incident INC-2847 from February 2025 showing a nearly identical failure pattern. The incident was resolved by restoring the timeout threshold and implementing circuit breaker logic with retry capabilities.',
    sources: [
      {
        type: 'incident',
        id: 'INC-001',
        title: 'Checkout Failure for Premium Users — Critical',
        timestamp: '2026-03-25T09:14:00Z',
        relevance: 1.0,
      },
      {
        type: 'pr',
        id: 'PR-482',
        title: 'Payment Service Timeout Optimization',
        timestamp: '2026-03-20T14:30:00Z',
        relevance: 0.96,
      },
      {
        type: 'slack',
        id: '#payments-team',
        title: 'Risk Flag Discussion — PR #482 Review',
        relevance: 0.92,
      },
      {
        type: 'incident',
        id: 'INC-2847',
        title: 'Historical Incident — Similar Timeout Pattern (Feb 2025)',
        relevance: 0.88,
      },
    ],
    techniques: ['LLM', 'RAG'],
    confidence: 0.94,
    relatedSection: 'operations-intelligence',
  },
  {
    id: 'cr-004',
    triggers: ['defect matching', 'accuracy', 'rag accuracy', 'matching accuracy'],
    question: 'How accurate is defect matching?',
    answer:
      'Our defect matching system achieves 89% accuracy by combining RAG (Retrieval-Augmented Generation) with NLP techniques. The system retrieves similar defects from our historical database of 2,400+ documented issues and uses semantic similarity scoring to identify the most relevant matches.\n\nRecent analysis shows that when the similarity confidence exceeds 0.85, our recommendations are correct 96% of the time. However, when similarity drops below 0.65, accuracy degrades to 71%, indicating that edge cases and novel defect patterns require additional human review.\n\nThe matching system has learned from 18 months of incident history and recognizes recurring failure patterns with high precision. For instance, we correctly identified that 3 recent payment-related defects matched a pattern from February 2025, allowing the team to apply known remediation strategies. This prevents redundant investigation time and accelerates time-to-resolution.\n\nOur confidence in the matching system is highest for payment service defects (94%) and authentication failures (91%), but lower for complex distributed system failures (73%) where patterns are more variable.',
    sources: [
      {
        type: 'log',
        id: 'rag-metrics-2026-03',
        title: 'RAG Matching Performance Metrics — March 2026',
        relevance: 0.97,
      },
      {
        type: 'jira',
        id: 'PLAT-3456',
        title: 'Defect Matching Accuracy Analysis Report',
        timestamp: '2026-03-25T10:30:00Z',
        relevance: 0.93,
      },
      {
        type: 'log',
        id: 'model-validation-2026-03',
        title: 'ML Model Validation Results',
        relevance: 0.88,
      },
    ],
    techniques: ['RAG', 'ML'],
    confidence: 0.87,
    relatedSection: 'intelligent-test-quality',
  },
  {
    id: 'cr-005',
    triggers: ['services at risk', 'risky service', 'service health', 'which services'],
    question: 'What services are at risk?',
    answer:
      'Three critical services show elevated risk profiles based on recent incident history, defect density, and deployment patterns:\n\n1. **Payment Service** (Risk Score: 78%) — 5 active defects in the past 30 days, 2 critical incidents in the past 2 months, and 3 high-risk changes queued for deployment. The primary vulnerability is timeout-sensitive transaction flows that degrade under load. Mitigation: require load testing for all configuration changes and implement circuit breaker patterns.\n\n2. **Gateway API** (Risk Score: 71%) — Database connection pool exhaustion has caused 2 incidents in the past 4 months. Current pool configuration (max_connections: 50) is undersized for the observed +35% month-over-month traffic growth. Mitigation: scale pool to 200 and implement auto-scaling based on queue depth.\n\n3. **Auth Service** (Risk Score: 64%) — Token validation performance degraded due to JWT cache expiration settings that force unnecessary re-fetches from the identity provider. The service was affected by a recent incident (INC-003) involving login timeouts at scale. Mitigation: increase cache TTL and implement fallback mechanisms.\n\nAll three services are payment-critical, meaning issues cascade quickly to the user experience. Recommend increasing deployment caution and pre-release validation intensity for these services.',
    sources: [
      {
        type: 'log',
        id: 'service-health-2026-03',
        title: 'Service Health Dashboard — Current Metrics',
        relevance: 0.95,
      },
      {
        type: 'incident',
        id: 'INC-001',
        title: 'Payment Service Checkout Failure',
        timestamp: '2026-03-25T09:14:00Z',
        relevance: 0.92,
      },
      {
        type: 'incident',
        id: 'INC-002',
        title: 'Gateway API Connection Pool Exhaustion',
        timestamp: '2026-03-24T16:42:00Z',
        relevance: 0.89,
      },
    ],
    techniques: ['ML', 'RAG', 'NLP'],
    confidence: 0.90,
    relatedSection: 'service-health-intelligence',
  },
  {
    id: 'cr-006',
    triggers: ['learning loop', 'self-learning', 'how does learn', 'improve'],
    question: 'Explain the learning loop.',
    answer:
      'IntelliOps AI implements a self-learning cycle that transforms every production incident, defect, and successful release into actionable intelligence that prevents future failures.\n\nHere\'s how the cycle works:\n\n**OPERATE → LEARN:** When incidents occur in production, our intelligent monitoring captures the failure context — root cause, contributing factors, affected services, and resolution steps. Each incident becomes a training signal.\n\n**LEARN → PLAN:** Incident patterns inform our risk models. For example, when we identified that 3 payment service incidents were caused by timeout configuration changes, we updated our release risk predictor to automatically flag similar changes as high-risk in future deployments.\n\n**PLAN → BUILD:** Test coverage recommendations are refined based on defect patterns. If we see recurring failures in payment-critical paths, we recommend additional test scenarios and load testing for any future changes in those paths.\n\n**BUILD → TEST:** Defect matching patterns learned from resolved incidents help us rapidly identify and categorize new defects, reducing triage time and accelerating time-to-resolution.\n\n**TEST → RELEASE:** Release risk scores continuously improve as we accumulate evidence about which types of changes, sizes of changes, and service combinations are most likely to cause production issues.\n\nThe result: the platform gets smarter with every incident. Teams spend less time fighting fires and more time building value.',
    sources: [
      {
        type: 'log',
        id: 'learning-feedback-2026-03',
        title: 'Learning Loop Telemetry — March 2026',
        relevance: 0.93,
      },
      {
        type: 'jira',
        id: 'PLAT-5012',
        title: 'Self-Learning System Architecture Documentation',
        relevance: 0.88,
      },
    ],
    techniques: ['LLM'],
    confidence: 0.91,
    relatedSection: 'learn-intelligence',
  },
  {
    id: 'cr-007',
    triggers: ['pr changes', 'risky pr', 'pr risk', 'pull request risk'],
    question: 'What PR changes are risky?',
    answer:
      'Our analysis of active pull requests identifies 3 PRs with elevated risk profiles:\n\n**PR-4521 (Payment Service Enhancements)** — Risk Score: 72% — This PR introduces changes to critical payment transaction flows during peak trading season. The change footprint is large (3,421 additions, 1,856 deletions across 45 files), touching both the payment service and auth gateway. While the PR has passed all pre-deployment checks (487 unit tests, integration suite, security scan), the risk is elevated due to coupling with high-traffic services and a historical pattern of payment service incidents under load.\n\nRecommendation: Execute canary deployment (5% → 25% → 50% → 100%) with close monitoring of transaction error rates and latency.\n\n**PR-4543 (Database Configuration Update)** — Risk Score: 68% — This PR modifies connection pool settings in the Gateway API. While the change itself is small, the historical context is important: we\'ve had 2 incidents in the past 4 months related to connection pool exhaustion. Database configuration changes in payment-critical services require load testing validation before merge.\n\nRecommendation: Add load simulation test scenario that simulates peak traffic (200+ concurrent connections) before merging.\n\n**PR-4512 (Auth Service Cache TTL)** — Risk Score: 61% — Modifies JWT cache expiration settings. Recent incident INC-003 showed that aggressive cache expiration causes token validation bottlenecks at scale. This change appears well-intentioned (security hardening) but requires performance validation under peak authentication load.\n\nRecommendation: Run authentication spike test (1,000 login attempts/sec) before production deployment.',
    sources: [
      {
        type: 'pr',
        id: 'PR-4521',
        title: 'Payment Service Enhancements',
        relevance: 0.96,
      },
      {
        type: 'pr',
        id: 'PR-4543',
        title: 'Database Connection Pool Configuration',
        relevance: 0.89,
      },
      {
        type: 'pr',
        id: 'PR-4512',
        title: 'Auth Service JWT Cache Optimization',
        relevance: 0.85,
      },
    ],
    techniques: ['ML', 'NLP'],
    confidence: 0.88,
    relatedSection: 'build-intelligence',
  },
  {
    id: 'cr-008',
    triggers: ['platform health', 'overall health', 'summarize health', 'system status'],
    question: 'Summarize platform health.',
    answer:
      'Current Platform Health Summary (as of March 26, 2026):\n\n**Overall Status: CAUTION** — The platform is operationally stable but showing elevated risk signals that require attention over the next 1-2 weeks.\n\n**Incident Summary:** 3 active incidents in the past 72 hours (1 Critical, 1 High, 1 Medium), all resolved or nearly resolved. The critical incident (checkout failures) impacted 2,400 users but was remediable with configuration changes. Resolution time averaged 2.1 hours, which is above our SLA target of <1.5 hours.\n\n**Release Pipeline:** 1 major release deployed (v3.5.0) with acceptable risk (72%). Pre-deployment checks all passed. 3 PRs awaiting deployment review, all with moderate-to-elevated risk profiles requiring deployment caution.\n\n**Service Health:** Payment Service (Risk: 78%), Gateway API (Risk: 71%), and Auth Service (Risk: 64%) show concerning defect density and incident history. These three services warrant increased monitoring and testing attention.\n\n**Defect Status:** 8 active defects, 5 high/critical severity. Defect matching accuracy is 89%, with 68% of recent defects concentrated in payment-critical paths.\n\n**Key Actions:** (1) Increase load testing requirements for payment service changes, (2) Scale Gateway API database connection pool from 50 to 200, (3) Review JWT cache TTL settings in Auth Service, (4) Increase deployment caution for Q2 releases given incident frequency.\n\n**Confidence:** 92% — Assessment based on 18 months of incident history, 2,400+ defect records, and real-time deployment metrics.',
    sources: [
      {
        type: 'log',
        id: 'platform-health-2026-03',
        title: 'Comprehensive Platform Health Report — March 2026',
        timestamp: '2026-03-26T00:00:00Z',
        relevance: 1.0,
      },
      {
        type: 'incident',
        id: 'INC-001',
        title: 'Recent Critical Incident Summary',
        relevance: 0.94,
      },
      {
        type: 'log',
        id: 'release-metrics-2026-03',
        title: 'Release Deployment Metrics',
        relevance: 0.91,
      },
    ],
    techniques: ['LLM', 'RAG', 'ML'],
    confidence: 0.92,
    relatedSection: undefined,
  },
];

// ─── Suggestion Chips ─────────────────────────────────────────────────────

export const suggestionChips: SuggestionChip[] = [
  { label: 'Highest Risk Release', query: 'What is the highest risk release?' },
  { label: 'Recent Defects', query: 'Show me recent defects' },
  { label: 'Last Incident', query: 'What caused the last incident?' },
  { label: 'Services at Risk', query: 'What services are at risk?' },
  { label: 'Platform Health', query: 'Summarize platform health' },
  { label: 'Explain Learning Loop', query: 'Explain the learning loop' },
];

// ─── Response Matching ─────────────────────────────────────────────────────

/**
 * Find the best matching response for a user query
 * Uses keyword matching against triggers array
 * Falls back to null if no match found (component shows fallback response)
 */
export function findBestResponse(query: string): ChatResponse | null {
  const lowerQuery = query.toLowerCase();

  // Score each response based on trigger matches
  let bestMatch: ChatResponse | null = null;
  let bestScore = 0;

  for (const response of chatResponses) {
    let score = 0;

    for (const trigger of response.triggers) {
      if (lowerQuery.includes(trigger.toLowerCase())) {
        score += 1;
      }
    }

    // Bonus for exact question match
    if (lowerQuery === response.question.toLowerCase()) {
      score += 10;
    }

    if (score > bestScore) {
      bestScore = score;
      bestMatch = response;
    }
  }

  return bestMatch;
}
