// ── IntelliOps AI — Unified AI Service ───────────────────
// Central entry point for all AI analysis across every workspace and layer.
// Handles: rate limiting → cost guarding → real Claude API → simulation fallback → audit logging.
// Never throws — errors produce a structured AIAnalysisResponse with success: false.

import { AIAuditLogger } from './audit-logger';
import { checkRateLimit } from './rate-limiter';
import { prisma } from '@/lib/db';

// ── Types ─────────────────────────────────────────────────

export type AIAnalysisType =
  | 'requirement_analysis'
  | 'risk_assessment'
  | 'test_case_generation'
  | 'pr_analysis'
  | 'pr_security_scan'
  | 'traceability_analysis'
  | 'test_result_analysis'
  | 'defect_pattern_analysis'
  | 'coverage_gap_analysis'
  | 'release_risk_assessment'
  | 'cab_package_generation'
  | 'incident_rca'
  | 'learning_extraction'
  | 'knowledge_synthesis'
  | 'test_prioritization'
  | 'flaky_test_detection'
  | 'test_gap_analysis'
  | 'failure_root_cause_cluster'
  | 'release_readiness'
  | 'smart_failure_triage';

export interface AIAnalysisRequest {
  type: AIAnalysisType;
  context: Record<string, unknown>;
  userId: string;
  userEmail?: string;
  layer: string;
  workspace: string;
  /** Brief description for audit logging — must NOT contain raw sensitive data */
  inputSummary: string;
}

export interface AIAnalysisResponse {
  success: boolean;
  result: unknown;
  model: string;
  tokenUsage: { input: number; output: number };
  durationMs: number;
  auditId: string;
  isSimulated: boolean;
  error?: string;
}

// ── Constants ─────────────────────────────────────────────

const AI_MODEL = process.env.AI_MODEL ?? 'claude-sonnet-4-20250514';
const AI_MAX_OUTPUT_TOKENS = parseInt(process.env.AI_MAX_OUTPUT_TOKENS ?? '2000');
const AI_MONTHLY_COST_LIMIT = parseFloat(process.env.AI_MONTHLY_COST_LIMIT ?? '50');
const AI_FALLBACK_TO_MOCK = process.env.AI_FALLBACK_TO_MOCK !== 'false'; // default true

// ── Generic system prompt ─────────────────────────────────

const SYSTEM_PROMPT = `You are IntelliOps AI, an enterprise software lifecycle intelligence platform built for banking delivery teams.
Analyse the provided context and return a structured JSON response with the following fields:
- "summary": string — one-paragraph plain-English explanation of your findings
- "confidence": number — 0.0 to 1.0
- "reasoning": string — step-by-step chain of thought
- "recommendations": string[] — specific, prioritised action items
- "evidence": string[] — references to supporting signals (PRs, incidents, logs, etc.)
- "technique": "LLM" | "RAG" | "ML" | "NLP" — primary AI technique used
Always output valid JSON only. Do not add markdown fences or prose outside the JSON object.`;

// ── Cost guard ────────────────────────────────────────────

async function isMonthlyBudgetExceeded(): Promise<boolean> {
  try {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const aggregate = await prisma.aIAuditLog.aggregate({
      _sum: { estimatedCostUsd: true },
      where: {
        createdAt: { gte: startOfMonth },
        isSimulated: false,
      },
    });

    const spent = aggregate._sum.estimatedCostUsd ?? 0;
    return spent >= AI_MONTHLY_COST_LIMIT;
  } catch {
    // If the DB is unavailable, allow real AI to proceed rather than blocking
    return false;
  }
}

// ── Generic simulated response ────────────────────────────

function buildSimulatedResult(type: AIAnalysisType, context: Record<string, unknown>): unknown {
  // Return type-specific realistic mock data for known analysis types.
  switch (type) {
    case 'test_prioritization':
      return {
        summary: 'Smart test prioritization analysis based on historical failure patterns and code change impact.',
        technique: 'ML',
        confidence: 0.91,
        prioritizedTests: [
          { name: 'Payment_Checkout_E2E', riskScore: 94, reason: 'Module had 5 critical defects in last quarter; recent code changes to checkout flow', module: 'payment-service' },
          { name: 'Auth_Token_Refresh', riskScore: 87, reason: 'Authentication service recently modified; token handling has regression history', module: 'auth-gateway' },
          { name: 'Transfer_Validation_E2E', riskScore: 82, reason: 'Cross-service dependency chain — transfer depends on payment + auth', module: 'transfer-service' },
          { name: 'KYC_Document_Upload', riskScore: 76, reason: 'File handling module flagged in security scan; 2 open defects', module: 'kyc-service' },
          { name: 'Portfolio_Rebalance_Calc', riskScore: 71, reason: 'Complex calculation logic with edge cases in currency conversion', module: 'portfolio-engine' },
          { name: 'Session_Timeout_Handler', riskScore: 65, reason: 'Intermittent failures in UAT; environment-specific timing dependency', module: 'auth-gateway' },
          { name: 'Report_PDF_Generation', riskScore: 58, reason: 'PDF library upgrade pending; current version has known memory leak', module: 'reporting-service' },
          { name: 'Notification_Delivery', riskScore: 52, reason: 'Low defect history but untested after recent infrastructure change', module: 'notification-service' },
          { name: 'Audit_Log_Integrity', riskScore: 45, reason: 'Stable module with comprehensive coverage; minor priority', module: 'audit-service' },
          { name: 'Dashboard_Widget_Render', riskScore: 38, reason: 'UI-only test; low business impact if failing', module: 'frontend' },
        ],
        coverage: { top20PercentCatches: 82, estimatedTimeSaved: '3.2 hours' },
        insight: 'Top 20% of tests (47 of 235) catch 82% of bugs. Running these first saves ~3.2 hours per cycle.',
        _simulated: true,
      };

    case 'flaky_test_detection':
      return {
        summary: 'Flaky test detection identified 5 tests with inconsistent pass/fail patterns.',
        technique: 'ML',
        confidence: 0.88,
        flakyTests: [
          { name: 'UI_Render_Dashboard', flakinessScore: 89, runHistory: '\u2713\u2717\u2713\u2713\u2717\u2713\u2717\u2717\u2713\u2717\u2713\u2713\u2717\u2713\u2717\u2713\u2713\u2717\u2713\u2717', rootCause: 'CSS animation timing dependency — test assertions fire before render completes', recommendation: 'quarantine' },
          { name: 'API_Concurrent_Load', flakinessScore: 78, runHistory: '\u2713\u2713\u2717\u2713\u2713\u2717\u2713\u2717\u2713\u2713\u2713\u2717\u2713\u2713\u2717\u2713\u2717\u2713\u2713\u2717', rootCause: 'Race condition in connection pool under concurrent requests', recommendation: 'investigate' },
          { name: 'DB_Connection_Pool', flakinessScore: 74, runHistory: '\u2713\u2713\u2713\u2717\u2713\u2713\u2713\u2717\u2713\u2713\u2713\u2713\u2717\u2713\u2713\u2713\u2717\u2713\u2713\u2713', rootCause: 'Resource leak in test teardown — connections not properly released', recommendation: 'fix' },
          { name: 'Cache_Invalidation_E2E', flakinessScore: 68, runHistory: '\u2713\u2713\u2717\u2717\u2713\u2713\u2713\u2713\u2717\u2713\u2713\u2713\u2713\u2717\u2713\u2713\u2713\u2713\u2717\u2713', rootCause: 'Redis TTL timing varies between environments', recommendation: 'investigate' },
          { name: 'Websocket_Reconnect', flakinessScore: 62, runHistory: '\u2713\u2713\u2713\u2713\u2717\u2713\u2713\u2713\u2713\u2713\u2717\u2713\u2713\u2713\u2713\u2713\u2717\u2713\u2713\u2713', rootCause: 'Network timeout threshold too aggressive in CI environment', recommendation: 'fix' },
        ],
        totalQuarantined: 5,
        timeSaved: '2.1 hrs/sprint',
        impact: 'Quarantining these 5 tests saves 2.1 hrs/sprint in false triage and unblocks 3 release pipelines.',
        _simulated: true,
      };

    case 'test_gap_analysis':
      return {
        summary: 'Test coverage gap analysis identified 3 critical gaps and 2 medium gaps.',
        technique: 'RAG',
        confidence: 0.86,
        gaps: [
          { requirement: 'Payment reconciliation workflow', currentCoverage: 0, risk: 'HIGH', details: 'No test cases exist for the reconciliation batch process. 3 acceptance criteria completely untested. Module had 5 defects last quarter.', defectHistory: 5 },
          { requirement: 'User session timeout handling', currentCoverage: 12, risk: 'MEDIUM', details: 'Happy path tested, but error flows (network interruption, concurrent sessions, token refresh failure) have no coverage.', defectHistory: 2 },
          { requirement: 'Multi-currency transfer validation', currentCoverage: 45, risk: 'HIGH', details: 'Currency conversion edge cases untested — rounding errors, rate fluctuation during transaction, unsupported currency pairs.', defectHistory: 3 },
        ],
        overallCoverage: 68,
        targetCoverage: 80,
        insight: '3 critical requirements have less than 50% coverage. Closing these gaps would prevent an estimated 8 defects per release cycle based on historical patterns.',
        _simulated: true,
      };

    case 'failure_root_cause_cluster':
      return {
        summary: '12 test failures clustered into 2 root causes instead of 12 separate issues.',
        technique: 'NLP',
        confidence: 0.91,
        clusters: [
          { rootCause: 'Auth service connection pool exhaustion — response time exceeds 5s threshold after deployment AUT-2847', failureCount: 8, affectedSuites: 4, affectedModules: ['Login', 'Checkout', 'Profile', 'Transfer'], relatedDeployment: 'AUT-2847 (deployed 2 hours ago)', suggestedFix: 'Check auth service connection pool configuration. Previous incident INC-1122 was resolved by increasing pool size from 10 to 25.', confidence: 91 },
          { rootCause: 'Stale test data in SIT environment — expected accounts were deleted during data refresh', failureCount: 4, affectedSuites: 1, affectedModules: ['Regression Suite'], relatedDeployment: 'ENV-refresh-0412 (scheduled maintenance)', suggestedFix: 'Run test data seed script for SIT environment. Contact DevOps to add data validation to the refresh pipeline.', confidence: 87 },
        ],
        totalFailures: 12,
        uniqueRootCauses: 2,
        insight: 'What looked like 12 separate problems is actually 2 root causes. Fixing the auth pool config resolves 67% of all failures.',
        _simulated: true,
      };

    case 'release_readiness':
      return {
        summary: 'Release readiness prediction: CONDITIONAL GO at 82% confidence with 60% test completion.',
        technique: 'ML',
        confidence: 0.82,
        completionPercentage: 60,
        recommendation: 'CONDITIONAL_GO',
        historicalSuccessRate: 94,
        historicalSampleSize: 50,
        remainingRisks: [
          { module: 'Payment Module', risk: '2 critical tests still pending execution', severity: 'critical' },
          { module: 'Auth Service', risk: 'Flaky test may produce false negative — quarantined but monitor', severity: 'warning' },
          { module: 'Core Workflow', risk: '100% pass rate, high confidence — no action needed', severity: 'info' },
        ],
        recommendationText: 'Proceed with release. Monitor payment module post-deployment. Auth flaky test is quarantined and should not block. Historical releases with this test pattern had 94% success rate (47/50).',
        _simulated: true,
      };

    case 'smart_failure_triage':
      return {
        summary: 'Smart triage for Payment_Checkout_E2E failure: 92% match to resolved defect DEF-1247.',
        technique: 'RAG',
        confidence: 0.89,
        failedTest: 'Payment_Checkout_E2E',
        error: 'AssertionError: Expected status 200, received 503 Service Unavailable',
        module: 'Payment Gateway',
        similarDefects: [
          { id: 'DEF-1247', similarity: 92, resolution: 'Connection pool exhaustion — increased pool size from 10 to 25 in payment-gateway config', resolvedDate: '2026-03-22' },
          { id: 'DEF-1189', similarity: 78, resolution: 'Timeout configuration mismatch between gateway and downstream service', resolvedDate: '2026-02-15' },
          { id: 'DEF-1056', similarity: 65, resolution: 'Circuit breaker threshold too aggressive — adjusted from 3 to 5 failures', resolvedDate: '2026-01-08' },
        ],
        suggestedAction: 'Check if payment-gateway connection pool config was reverted during recent deployment. DEF-1247 had identical symptoms and was resolved by pool size increase. Verify config in payment-gateway/config/db.yml.',
        routeTo: '@dev-payment-team (code owners: payment-gateway/src/checkout/)',
        _simulated: true,
      };

    case 'defect_pattern_analysis':
      return {
        summary: 'Matched against 3,247 historical defects in the knowledge base. Highest similarity match found for payment gateway connection timeout pattern.',
        confidence: 0.94,
        technique: 'RAG',
        matches: [
          { id: 'DEF-1247', similarity: 94, title: 'Payment gateway connection timeout', module: 'Payment Processing', resolved: 'March 2026', resolution: 'Increased connection pool from 10 → 25', timeToResolve: '4.2 hours' },
          { id: 'DEF-892', similarity: 87, title: 'API timeout during peak transaction load', module: 'Transaction Gateway', resolved: 'January 2026', resolution: 'Implemented circuit breaker pattern', timeToResolve: '6.1 hours' },
          { id: 'DEF-1056', similarity: 71, title: 'Service degradation under concurrent requests', module: 'Auth Gateway', resolved: 'February 2026', resolution: 'Added request queuing with backpressure', timeToResolve: '3.8 hours' },
        ],
        recommendations: [
          'Check connection pool configuration — previous resolution pattern suggests pool exhaustion.',
          'Review circuit breaker thresholds for the payment gateway service.',
          'Monitor connection metrics post-fix to validate resolution.',
        ],
        evidence: [
          'DEF-1247 resolution (March 2026) — identical symptoms, same module',
          'INC-2847 post-mortem — connection pool exhaustion confirmed via APM traces',
          'PR-4521 — pool size increase from 10 to 25 resolved timeout cascade',
        ],
        _simulated: true,
      };

    default: {
      // Generic fallback for types without dedicated mock data
      return {
        summary: `Analysis complete for ${type.replace(/_/g, ' ')}. Structural analysis performed against IntelliOps knowledge base with historical pattern matching.`,
        confidence: 0.85 + Math.random() * 0.1,
        reasoning:
          'Simulated reasoning chain based on structural analysis of the provided context and historical pattern matching against the IntelliOps knowledge base.',
        recommendations: [
          'Review the flagged risk factors with the responsible team.',
          'Validate findings against the latest release metrics.',
          'Schedule a follow-up analysis after any remediating changes.',
        ],
        evidence: ['Historical incident correlation (simulated)', 'PR pattern analysis (simulated)'],
        technique: 'LLM',
        _simulated: true,
      };
    }
  }
}

// ── Generic prompt builder ────────────────────────────────

function buildGenericPrompt(type: AIAnalysisType, context: Record<string, unknown>): string {
  return `Analysis type: ${type}\n\nContext:\n${JSON.stringify(context, null, 2)}\n\nPerform a thorough ${type.replace(/_/g, ' ')} and return your findings as structured JSON per the system instructions.`;
}

// ── Main export ───────────────────────────────────────────

export async function analyzeWithAI(request: AIAnalysisRequest): Promise<AIAnalysisResponse> {
  const startMs = Date.now();

  // 1. Rate limit check
  const rateCheck = checkRateLimit(request.userId);
  if (!rateCheck.allowed) {
    return {
      success: false,
      result: null,
      model: 'rate-limited',
      tokenUsage: { input: 0, output: 0 },
      durationMs: Date.now() - startMs,
      auditId: 'rate-limited',
      isSimulated: true,
      error: `Rate limit exceeded. Retry after ${Math.ceil((rateCheck.retryAfterMs ?? 60_000) / 1000)}s.`,
    };
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;

  // 2. Decide: real AI vs simulation
  const budgetExceeded = apiKey ? await isMonthlyBudgetExceeded() : false;
  const useSimulation = !apiKey || budgetExceeded;

  let result: unknown;
  let model: string;
  let tokenInput = 0;
  let tokenOutput = 0;
  let isSimulated = false;
  let outputSummary = '';

  if (!useSimulation && apiKey) {
    // 3a. Attempt real Claude API call
    try {
      // Try to load a type-specific prompt builder; fall back to the generic one
      let prompt: string;
      try {
        const promptModule = await import(`./prompts/${request.type}.ts`);
        prompt = promptModule.default(request.context);
      } catch {
        prompt = buildGenericPrompt(request.type, request.context);
      }

      const claudeResponse = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify({
          model: AI_MODEL,
          max_tokens: AI_MAX_OUTPUT_TOKENS,
          messages: [{ role: 'user', content: prompt }],
          system: SYSTEM_PROMPT,
        }),
      });

      if (!claudeResponse.ok) {
        throw new Error(`Claude API responded with HTTP ${claudeResponse.status}`);
      }

      const data = await claudeResponse.json();
      const rawText: string = data.content?.[0]?.text ?? '{}';

      // Parse JSON response from Claude
      try {
        result = JSON.parse(rawText);
      } catch {
        result = { summary: rawText, _rawText: true };
      }

      tokenInput = data.usage?.input_tokens ?? 0;
      tokenOutput = data.usage?.output_tokens ?? 0;
      model = AI_MODEL;
      isSimulated = false;
      outputSummary = typeof result === 'object' && result !== null
        ? (result as Record<string, unknown>).summary as string ?? rawText.substring(0, 500)
        : rawText.substring(0, 500);
    } catch (error) {
      // 3b. Claude failed — fall back to simulation if allowed
      if (AI_FALLBACK_TO_MOCK) {
        console.warn('[IntelliOps AI] Claude call failed, falling back to simulation:', error);
        result = buildSimulatedResult(request.type, request.context);
        model = 'claude-sonnet-4-20250514 (simulated — fallback)';
        tokenInput = 0;
        tokenOutput = 0;
        isSimulated = true;
        outputSummary = 'Simulated fallback due to Claude API error.';
      } else {
        const durationMs = Date.now() - startMs;
        return {
          success: false,
          result: null,
          model: AI_MODEL,
          tokenUsage: { input: 0, output: 0 },
          durationMs,
          auditId: 'error-no-fallback',
          isSimulated: false,
          error: `Claude API call failed: ${error instanceof Error ? error.message : String(error)}`,
        };
      }
    }
  } else {
    // 3c. No API key or budget exceeded — use simulation
    result = buildSimulatedResult(request.type, request.context);
    model = budgetExceeded
      ? 'claude-sonnet-4-20250514 (simulated — budget limit)'
      : 'claude-sonnet-4-20250514 (simulated — no API key)';
    tokenInput = 0;
    tokenOutput = 0;
    isSimulated = true;
    outputSummary = 'Simulated — no real API call made.';
  }

  const durationMs = Date.now() - startMs;

  // 4. Write audit log (non-blocking — failures are swallowed in AIAuditLogger)
  const auditId = await AIAuditLogger.log({
    userId: request.userId,
    userEmail: request.userEmail,
    analysisType: request.type,
    layer: request.layer,
    workspace: request.workspace,
    inputSummary: request.inputSummary,
    outputSummary: outputSummary || JSON.stringify(result).substring(0, 500),
    model,
    isSimulated,
    tokenInput,
    tokenOutput,
    durationMs,
  });

  return {
    success: true,
    result,
    model,
    tokenUsage: { input: tokenInput, output: tokenOutput },
    durationMs,
    auditId,
    isSimulated,
  };
}
