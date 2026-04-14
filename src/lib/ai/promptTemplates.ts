// src/lib/ai/promptTemplates.ts

export function buildDORAPrompt(ctx: {
  serviceName: string;
  deployFreq: number;
  leadTime: number;
  mttr: number;
  cfr: number;
}): string {
  return `You are a DevOps performance analyst. Analyze these DORA metrics for ${ctx.serviceName}:
- Deployment Frequency: ${ctx.deployFreq} deploys/week
- Lead Time for Changes: ${ctx.leadTime} hours
- Mean Time to Recovery: ${ctx.mttr} minutes
- Change Failure Rate: ${(ctx.cfr * 100).toFixed(1)}%

Provide: performance classification (elite/high/medium/low), bottleneck identification, and 3 specific improvement recommendations. Reference DORA benchmarks. Return as structured JSON with fields: classification, bottlenecks[], recommendations[], overallAssessment.`;
}

export function buildACScorePrompt(ctx: {
  title: string;
  description: string;
  criteria: string[];
}): string {
  return `You are a senior business analyst and QA expert. Evaluate the following user story's acceptance criteria against this quality rubric:

1. Completeness: Are all functional paths covered?
2. Clarity: Are terms unambiguous and measurable?
3. Testability: Can each criterion be objectively verified?
4. Boundary Conditions: Are edge cases and limits defined?
5. Negative Scenarios: Are failure paths specified?
6. Security: Are security-relevant behaviors defined?

Also evaluate against INVEST criteria.

Story: ${ctx.title}
Description: ${ctx.description}
Acceptance Criteria:
${ctx.criteria.map((c, i) => `${i + 1}. ${c}`).join('\n')}

For each dimension, provide a 0-100 score, specific findings, and actionable improvement suggestions. Suggest concrete acceptance criteria text for gaps. Return as structured JSON.`;
}

export function buildTestGenPrompt(ctx: {
  title: string;
  description: string;
  criteria: string[];
  riskScore: number;
  gaps: string[];
}): string {
  return `You are a senior QA engineer at an enterprise bank. Given the following requirement, generate comprehensive test scenarios in structured format.

Requirement: ${ctx.title}
Description: ${ctx.description}
Acceptance Criteria:
${ctx.criteria.map((c, i) => `${i + 1}. ${c}`).join('\n')}
Risk Score: ${ctx.riskScore}/100
Identified Gaps: ${ctx.gaps.join(', ')}

Generate test scenarios covering: functional paths, edge cases, negative scenarios, security considerations, and performance aspects.

For each scenario provide:
- title, category (functional|edge_case|negative|security|performance), priority (critical|high|medium|low)
- given/when/then format
- preconditions[]
- suggested testData values[]
- whether it's automatable (boolean)
- estimatedEffort (trivial|small|medium|large)

Return as JSON array of scenario objects.`;
}

export function buildCABPrompt(ctx: {
  releaseName: string;
  changes: { title: string; riskScore: number; filesChanged: number }[];
  testsPassed: number;
  testsFailed: number;
  coveragePercentage: number;
}): string {
  return `You are a Change Advisory Board analyst for an enterprise bank. Evaluate this release for production deployment approval.

Release: ${ctx.releaseName}
Changes (${ctx.changes.length} total):
${ctx.changes.map(c => `- ${c.title} (risk: ${c.riskScore}, files: ${c.filesChanged})`).join('\n')}

Test Results: ${ctx.testsPassed} passed, ${ctx.testsFailed} failed, ${ctx.coveragePercentage}% coverage

Provide:
1. Recommendation: approve | conditional | reject
2. Confidence score (0-1)
3. Reasoning (2-3 sentences)
4. Conditions for approval (if conditional)
5. Identified risks
6. Regulatory impact assessment

Return as structured JSON.`;
}

export function buildTraceabilityPrompt(ctx: {
  totalChains: number;
  fullyTraceable: number;
  gaps: { type: string; description: string }[];
}): string {
  return `You are a software delivery compliance analyst. Analyze this traceability report:

Total requirement-to-deployment chains: ${ctx.totalChains}
Fully traceable: ${ctx.fullyTraceable}
Gaps found:
${ctx.gaps.map(g => `- [${g.type}] ${g.description}`).join('\n')}

Provide: compliance risk assessment, prioritized remediation steps, and specific tooling recommendations to close gaps. Return as structured JSON.`;
}
