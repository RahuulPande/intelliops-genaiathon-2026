// src/lib/ai/prompts/pr-analysis.ts
// Pull request risk, quality, and impact analysis for a financial institution.

export function buildPrompt(context: Record<string, unknown>): { system: string; user: string } {
  const system =
    'You are a code review analyst for a financial institution. ' +
    'Analyze the PR for risk, quality, and impact. ' +
    'Return JSON only: { "riskScore": number, ' +
    '"riskFactors": [{ "factor": string, "severity": string, "description": string }], ' +
    '"recommendations": string[], "summary": string, "confidence": number }';

  const pr = context.pr ?? context;
  const user = `PR data:\n${JSON.stringify(pr, null, 2)}`;

  return { system, user };
}

export default buildPrompt;
