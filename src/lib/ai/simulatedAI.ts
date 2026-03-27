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

// ── Streaming Simulation ───────────────────────────────
// Returns words one at a time with realistic delays

export function getStreamingWords(text: string): string[] {
  return text.split(/(\s+)/).filter(Boolean);
}

export const STREAM_DELAY_MS = 35;
