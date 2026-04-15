// ── Simulated AI Engine ─────────────────────────────────
// Produces dynamic, varied AI-style outputs from structured context.
// No real LLM calls — all outputs are simulated with realistic metadata.

export type AITechnique = 'LLM' | 'RAG' | 'ML' | 'NLP';

export interface AIOutputMeta {
  model: string;
  tokens: number;
  latency_ms: number;
  technique: AITechnique;
  confidence: number;
  timestamp: string;
}

export interface AIGenerationResult {
  text: string;
  meta: AIOutputMeta;
  promptTemplate: string;
}

// ── Variation Helpers ──────────────────────────────────

const adjPool = ['critical', 'significant', 'notable', 'substantial', 'important', 'considerable', 'meaningful'];
const severityAdj = ['severe', 'high-impact', 'urgent', 'elevated', 'pronounced'];
const confidenceAdj = ['high', 'strong', 'robust', 'solid', 'reliable'];
const actionVerbs = ['indicates', 'suggests', 'reveals', 'demonstrates', 'highlights', 'confirms'];

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function shuffleArray<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function varyConfidence(base: number): number {
  const offset = (Math.random() - 0.5) * 0.12;
  return Math.min(0.97, Math.max(0.85, base + offset));
}

function randomTokens(base: number): number {
  return base + Math.floor((Math.random() - 0.5) * 800);
}

function randomLatency(): number {
  return 800 + Math.floor(Math.random() * 1700);
}

function buildMeta(technique: AITechnique, baseConfidence: number): AIOutputMeta {
  return {
    model: technique === 'ML' ? 'GradientBoosted v2.1 (simulated)' : 'Claude 3.5 Sonnet (simulated)',
    tokens: randomTokens(3000),
    latency_ms: randomLatency(),
    technique,
    confidence: varyConfidence(baseConfidence),
    timestamp: new Date().toISOString(),
  };
}

// ── PR Summary Generator (L1 BUILD) ───────────────────

export interface PRContext {
  id: string;
  title: string;
  service: string;
  filesChanged: number;
  linesAdded: number;
  linesRemoved: number;
  riskScore: number;
  riskLevel: string;
  author: string;
  description: string;
}

export function generatePRSummary(ctx: PRContext): AIGenerationResult {
  const verb = pickRandom(actionVerbs);
  const adj = pickRandom(adjPool);
  const sevAdj = ctx.riskScore > 0.7 ? pickRandom(severityAdj) : 'moderate';

  const sentences = shuffleArray([
    `This pull request modifies ${ctx.filesChanged} files across the ${ctx.service} codebase, with ${ctx.linesAdded} additions and ${ctx.linesRemoved} deletions.`,
    `Analysis ${verb} ${adj} changes to core service logic that could affect downstream consumers.`,
    `The change introduces ${sevAdj} risk factors related to ${ctx.service} stability under concurrent load.`,
    `Historical pattern matching against ${2 + Math.floor(Math.random() * 4)} similar PRs shows a ${Math.round(60 + Math.random() * 30)}% correlation with past incidents in this service area.`,
    `Automated entity extraction identified ${1 + Math.floor(Math.random() * 3)} critical code paths and ${2 + Math.floor(Math.random() * 3)} integration touchpoints requiring review.`,
  ]);

  const recommendation = ctx.riskScore > 0.7
    ? `Recommendation: Require senior review and load testing before merge. This PR touches ${ctx.service} which has a ${pickRandom(severityAdj)} incident history.`
    : `Recommendation: Standard review process is sufficient. The changes are well-scoped with ${pickRandom(confidenceAdj)} test coverage.`;

  const text = [...sentences.slice(0, 3 + Math.floor(Math.random() * 2)), '', recommendation].join('\n\n');

  return {
    text,
    meta: buildMeta('LLM', 0.91),
    promptTemplate: `Analyze PR ${ctx.id} ("${ctx.title}") targeting ${ctx.service}. Summarize changes across ${ctx.filesChanged} files (${ctx.linesAdded}+ / ${ctx.linesRemoved}-). Assess risk level, identify critical code paths, cross-reference with historical incidents, and provide a merge recommendation.`,
  };
}

// ── Incident Root Cause Generator (L4 OPERATE / L5 LEARN) ──

export interface IncidentContext {
  id: string;
  title: string;
  service: string;
  severity: string;
  impactedUsers: string;
  detectedAt: string;
}

export function generateRootCause(ctx: IncidentContext): AIGenerationResult {
  const verb = pickRandom(actionVerbs);
  const adj = pickRandom(adjPool);

  const sentences = shuffleArray([
    `Root cause analysis ${verb} a ${adj} failure originating in the ${ctx.service} service.`,
    `The ${ctx.severity.toLowerCase()}-severity incident impacted ${ctx.impactedUsers} and was detected at ${new Date(ctx.detectedAt).toLocaleTimeString()}.`,
    `Cross-system correlation identified ${2 + Math.floor(Math.random() * 3)} contributing factors spanning code changes, configuration drift, and infrastructure state.`,
    `RAG retrieval matched ${1 + Math.floor(Math.random() * 3)} historical incidents with ${Math.round(75 + Math.random() * 20)}% similarity, providing context for the root cause determination.`,
    `The failure cascade originated from a ${pickRandom(['race condition', 'resource exhaustion', 'configuration mismatch', 'dependency timeout', 'cache invalidation error'])} that propagated through ${1 + Math.floor(Math.random() * 2)} downstream services.`,
  ]);

  const action = `Immediate action: ${pickRandom([
    'Deploy hotfix to stabilize connection pool under concurrent load.',
    'Roll back the most recent deployment and increase monitoring thresholds.',
    'Apply circuit breaker pattern to isolate the affected service path.',
    'Scale horizontal replicas and implement request throttling.',
  ])}`;

  const text = [...sentences.slice(0, 3 + Math.floor(Math.random() * 2)), '', action].join('\n\n');

  return {
    text,
    meta: buildMeta('LLM', 0.89),
    promptTemplate: `Analyze incident ${ctx.id} ("${ctx.title}") affecting ${ctx.service} (${ctx.severity}). Perform root cause analysis using correlated evidence from PRs, logs, Slack threads, and historical incidents. Identify contributing factors and recommend immediate remediation.`,
  };
}

// ── DORA Metrics Analysis Generator ───────────────────

export function generateDORAAnalysis(ctx: {
  serviceName: string;
  overallRating: string;
  deployFreq: number;
  leadTime: number;
  mttr: number;
  cfr: number;
}): AIGenerationResult {
  const bottlenecks = shuffleArray([
    `Lead time is bottlenecked at code review (avg ${ctx.leadTime.toFixed(1)} hours). Teams with pair programming practices reduce this by 40%.`,
    `Change failure rate of ${(ctx.cfr * 100).toFixed(1)}% indicates deployment pipeline gaps. Adding canary deployments could reduce rollback frequency by 60%.`,
    `MTTR of ${ctx.mttr} minutes is ${ctx.mttr < 60 ? 'within elite range' : 'above target'}. Automated runbook execution could improve recovery by 35%.`,
    `Deployment frequency of ${ctx.deployFreq.toFixed(1)}/week ${ctx.deployFreq > 5 ? 'reflects strong CI/CD maturity' : 'suggests batch deployment patterns that increase risk'}.`,
  ]);
  const recommendations = shuffleArray([
    'Consider implementing trunk-based development to reduce lead time.',
    'Automated rollback triggers on error rate spikes would improve MTTR.',
    'Feature flags would enable safer deployments and reduce change failure rate.',
    'Review rotation scheduling could reduce code review bottleneck by 30%.',
  ]);
  const text = `DORA Performance Analysis for ${ctx.serviceName} (${ctx.overallRating} performer):\n\n${bottlenecks.slice(0, 2).join('\n\n')}\n\nRecommendations:\n${recommendations.slice(0, 2).map((r, i) => `${i + 1}. ${r}`).join('\n')}`;
  return {
    text,
    meta: buildMeta('ML', 0.85),
    promptTemplate: `Analyze DORA metrics for ${ctx.serviceName}: DF=${ctx.deployFreq}/wk, LT=${ctx.leadTime}h, MTTR=${ctx.mttr}m, CFR=${(ctx.cfr * 100).toFixed(1)}%`,
  };
}

// ── Acceptance Criteria Score Analysis Generator ───────

export function generateACScoreAnalysis(ctx: {
  requirementTitle: string;
  overallScore: number;
  grade: string;
  weakestDimension: string;
  weakestScore: number;
}): AIGenerationResult {
  const insights = shuffleArray([
    `This requirement has significant gaps in ${ctx.weakestDimension} (score: ${ctx.weakestScore}/100). Adding ${pickRandom(['3', '4', '5'])} specific criteria would raise the overall score from ${ctx.overallScore} to approximately ${Math.min(100, ctx.overallScore + 15)}.`,
    `The acceptance criteria lack ${pickRandom(['measurable outcomes', 'boundary definitions', 'error handling scenarios'])}. Without these, QA teams cannot write deterministic test cases.`,
    `Compared to similar requirements in the portfolio, this ${ctx.grade === 'A' || ctx.grade === 'B' ? 'meets' : 'falls below'} the organization average quality score of 72.`,
  ]);
  const text = `Acceptance Criteria Quality Analysis for "${ctx.requirementTitle}" (Grade ${ctx.grade}):\n\n${insights.slice(0, 2).join('\n\n')}\n\nImproving ${ctx.weakestDimension} should be the immediate priority — it has the highest impact on overall testability.`;
  return {
    text,
    meta: buildMeta('NLP', 0.82),
    promptTemplate: `Score acceptance criteria quality for: ${ctx.requirementTitle} (current score: ${ctx.overallScore}/100)`,
  };
}

// ── Test Case Generation Analysis Generator ────────────

export function generateTestCaseAnalysis(ctx: {
  requirementTitle: string;
  scenarioCount: number;
  functionalCount: number;
  edgeCaseCount: number;
  missingAreas: string[];
}): AIGenerationResult {
  const text = `Test Case Generation Report for "${ctx.requirementTitle}":\n\nGenerated ${ctx.scenarioCount} test scenarios: ${ctx.functionalCount} functional, ${ctx.edgeCaseCount} edge cases, and ${ctx.scenarioCount - ctx.functionalCount - ctx.edgeCaseCount} other categories.\n\nMissing Coverage Areas:\n${ctx.missingAreas.map((a, i) => `${i + 1}. ${a}`).join('\n')}\n\nThe generated scenarios cover ${pickRandom(['85%', '88%', '91%'])} of the identified acceptance criteria. ${pickRandom(['Consider adding performance benchmarks for the payment processing path.', 'Security scenarios for input validation should be expanded.', 'Concurrent access patterns are not yet covered.'])}`;
  return {
    text,
    meta: buildMeta('LLM', 0.88),
    promptTemplate: `Generate comprehensive test scenarios for: ${ctx.requirementTitle}`,
  };
}

// ── CAB Recommendation Generator ──────────────────────

export function generateCABRecommendation(ctx: {
  releaseName: string;
  changeCount: number;
  riskScore: number;
  recommendation: string;
  conditions: string[];
}): AIGenerationResult {
  const riskLevel = ctx.riskScore >= 70 ? 'HIGH' : ctx.riskScore >= 40 ? 'MEDIUM' : 'LOW';
  const text = `CAB Assessment for Release ${ctx.releaseName}:\n\nRecommendation: ${ctx.recommendation.toUpperCase()}\nOverall Risk: ${riskLevel} (${ctx.riskScore}/100)\n\nThis release contains ${ctx.changeCount} changes. ${ctx.riskScore >= 70 ? 'The elevated risk is driven by database schema changes and modifications to regulated payment flows.' : 'The risk profile is within acceptable bounds for automated deployment.'}\n\n${ctx.conditions.length > 0 ? `Conditions for approval:\n${ctx.conditions.map((c, i) => `${i + 1}. ${c}`).join('\n')}` : 'No conditions — standard deployment procedures apply.'}\n\n${pickRandom(['Recommend scheduling deployment during low-traffic window (02:00-04:00 UTC).', 'Ensure on-call team is aware and monitoring dashboards are active.', 'Consider staggered rollout starting with 5% canary.'])}`;
  return {
    text,
    meta: buildMeta('LLM', 0.9),
    promptTemplate: `Generate CAB submission recommendation for release ${ctx.releaseName} with ${ctx.changeCount} changes, risk score ${ctx.riskScore}`,
  };
}

// ── Traceability Analysis Generator ───────────────────

export function generateTraceabilityAnalysis(ctx: {
  totalChains: number;
  fullyTraceable: number;
  untraceable: number;
  criticalGapCount: number;
}): AIGenerationResult {
  const complianceRisk = ctx.untraceable > 0 ? `${ctx.untraceable} PRs were merged without linked requirements. This is a compliance risk — regulatory frameworks require audit trails from requirement to deployment.` : 'All PRs have linked requirements — compliance posture is strong.';
  const text = `Traceability Analysis:\n\n${ctx.fullyTraceable} of ${ctx.totalChains} chains are fully traceable (requirement → PR → tests → deployment). ${complianceRisk}\n\n${ctx.criticalGapCount > 0 ? `${ctx.criticalGapCount} critical gaps detected. ${pickRandom(['PRs without test coverage represent the highest deployment risk.', 'Untested acceptance criteria create blind spots in regression suites.', 'Missing requirement links prevent accurate impact analysis.'])}` : 'No critical gaps — traceability health is excellent.'}\n\nRecommendation: ${pickRandom(['Enforce branch protection rules requiring Jira ticket links on all PRs.', 'Add pre-merge test coverage gates to prevent untested code from reaching production.', 'Implement automated traceability checks in the CI pipeline.'])}`;
  return {
    text,
    meta: buildMeta('RAG', 0.86),
    promptTemplate: `Analyze traceability chains: ${ctx.totalChains} total, ${ctx.fullyTraceable} complete, ${ctx.untraceable} unlinked`,
  };
}

// ── Security Analysis Generator ───────────────────────

export interface SecurityAnalysisContext {
  prTitle: string;
  prService: string;
  securityScore: number;
  criticalCount: number;
  highCount: number;
  totalFindings: number;
  hasPciDss: boolean;
  hasGdpr: boolean;
}

export function generateSecurityAnalysis(ctx: SecurityAnalysisContext): AIGenerationResult {
  const verb = pickRandom(actionVerbs);
  const adj = pickRandom(adjPool);

  const riskLevel =
    ctx.securityScore < 50 ? 'critical' : ctx.securityScore < 70 ? 'elevated' : 'moderate';

  const findingSummary =
    ctx.criticalCount > 0
      ? `${ctx.criticalCount} critical and ${ctx.highCount} high severity finding${ctx.highCount !== 1 ? 's' : ''}`
      : ctx.highCount > 0
      ? `${ctx.highCount} high severity finding${ctx.highCount !== 1 ? 's' : ''}`
      : `${ctx.totalFindings} finding${ctx.totalFindings !== 1 ? 's' : ''} at medium or lower severity`;

  const complianceNotes: string[] = [];
  if (ctx.hasPciDss) {
    complianceNotes.push(
      pickRandom([
        'PCI-DSS compliance posture requires immediate remediation before merge.',
        'At least one finding violates PCI-DSS requirements for payment data handling.',
        'PCI-DSS-relevant findings must be resolved or formally risk-accepted by the security team.',
      ])
    );
  }
  if (ctx.hasGdpr) {
    complianceNotes.push(
      pickRandom([
        'GDPR data minimisation obligations are implicated in this change set.',
        'One or more findings create GDPR data exposure risk that requires DPA review.',
        'GDPR Article 25 (privacy by design) findings should be addressed before production deployment.',
      ])
    );
  }

  const remediationPriority = shuffleArray([
    ctx.criticalCount > 0
      ? `Priority 1: Resolve ${ctx.criticalCount} critical finding${ctx.criticalCount !== 1 ? 's' : ''} — these represent direct exploit paths.`
      : `Priority 1: Address high severity findings to close the attack surface in ${ctx.prService}.`,
    `Priority 2: Review all new-in-PR findings introduced by "${ctx.prTitle}" before merge.`,
    `Priority 3: Track pre-existing findings in the security backlog with assigned owners.`,
  ]);

  const sentences = shuffleArray([
    `Security scan of "${ctx.prTitle}" ${verb} ${adj} risk factors in the ${ctx.prService} codebase (score: ${ctx.securityScore}/100, ${riskLevel} risk profile).`,
    `Static analysis identified ${findingSummary} across ${ctx.totalFindings} total security observations.`,
    `LLM-assisted code review cross-referenced ${2 + Math.floor(Math.random() * 3)} CWE patterns and ${1 + Math.floor(Math.random() * 2)} OWASP Top-10 categories relevant to this service's threat model.`,
    `RAG retrieval matched this change against ${3 + Math.floor(Math.random() * 5)} historical security incidents in the ${ctx.prService} domain, providing contextual risk calibration.`,
  ]);

  const complianceText =
    complianceNotes.length > 0 ? `\n\nCompliance: ${complianceNotes.join(' ')}` : '';

  const remediationText = `\n\nRemediation Priorities:\n${remediationPriority
    .slice(0, 3)
    .map((p) => `• ${p}`)
    .join('\n')}`;

  const text =
    sentences.slice(0, 3).join('\n\n') + complianceText + remediationText;

  return {
    text,
    meta: buildMeta('LLM', 0.87),
    promptTemplate: `Perform security analysis for PR "${ctx.prTitle}" targeting ${ctx.prService}. Score: ${ctx.securityScore}/100. Findings: ${ctx.criticalCount} critical, ${ctx.highCount} high, ${ctx.totalFindings} total. Compliance scope: ${[ctx.hasPciDss && 'PCI-DSS', ctx.hasGdpr && 'GDPR'].filter(Boolean).join(', ') || 'none'}. Generate a prioritised remediation narrative.`,
  };
}

// ── AI Audit Governance Insight Generator ─────────────

export interface AuditInsightContext {
  totalAnalyses: number;
  complianceRelevant: number;
  humanReviewRate: number;
  errorRate: number;
  topLayer: string;
  period: string;
}

export function generateAuditInsight(ctx: AuditInsightContext): AIGenerationResult {
  const reviewPct = Math.round(ctx.humanReviewRate * 100);
  const errorPct = Math.round(ctx.errorRate * 100);
  const compliancePct = Math.round((ctx.complianceRelevant / ctx.totalAnalyses) * 100);
  const euAiActThreshold = 70;

  const governanceStatements = shuffleArray([
    `${ctx.totalAnalyses} AI inferences were executed during the ${ctx.period}, with ${ctx.complianceRelevant} (${compliancePct}%) tagged against active regulatory frameworks (PCI-DSS, GDPR, SOX).`,
    `Human review coverage stands at ${reviewPct}% — ${reviewPct >= euAiActThreshold ? 'above' : 'below'} the ${euAiActThreshold}% threshold recommended by EU AI Act Article 14 for high-risk AI systems in financial services.`,
    `The analysis error rate is ${errorPct}%, ${errorPct <= 5 ? 'within the acceptable operational envelope of ≤5% for automated AI decision support' : 'exceeding the 5% threshold — investigation recommended'}.`,
    `The ${ctx.topLayer} layer ${pickRandom(actionVerbs)} the highest concentration of AI activity, ${pickRandom(confidenceAdj)} alignment with sprint delivery priorities.`,
    `Cross-system traceability is intact for ${pickRandom(['93', '94', '96'])}% of AI decisions — each inference is linked to the originating entity, user, model, and downstream action taken.`,
  ]);

  const euAiActNote = ctx.humanReviewRate < euAiActThreshold / 100
    ? `EU AI Act Compliance Alert: Human review rate (${reviewPct}%) is below the ${euAiActThreshold}% recommended threshold. For high-risk AI use cases in banking, increase human-in-the-loop oversight for regulated decision paths.`
    : `EU AI Act Posture: Human review rate of ${reviewPct}% meets the ${euAiActThreshold}% recommended threshold for high-risk AI systems. Maintain current oversight discipline for PCI-DSS, GDPR, and SOX-tagged inferences.`;

  const errorAssessment = errorPct > 5
    ? `Reliability: ${pickRandom(severityAdj)} error rate (${errorPct}%) warrants review — timeout and rate-limit patterns may indicate infrastructure pressure or model capacity constraints.`
    : `Reliability: Error rate of ${errorPct}% is within acceptable bounds. Monitor for trends as AI inference volume scales.`;

  const text = [
    ...governanceStatements.slice(0, 3),
    '',
    euAiActNote,
    '',
    errorAssessment,
  ].join('\n\n');

  return {
    text,
    meta: buildMeta('ML', 0.91),
    promptTemplate: `Generate AI governance insight for ${ctx.period}: ${ctx.totalAnalyses} total inferences, ${ctx.complianceRelevant} compliance-relevant, ${reviewPct}% human reviewed, ${errorPct}% error rate. Top layer: ${ctx.topLayer}.`,
  };
}

// ── Streaming Simulation ───────────────────────────────
// Returns words one at a time with realistic delays

export function getStreamingWords(text: string): string[] {
  return text.split(/(\s+)/).filter(Boolean);
}

export const STREAM_DELAY_MS = 35;
