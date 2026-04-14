// src/lib/ai/prompts/coverage-gaps.ts
// Test coverage gap identification and risk-weighted priority recommendations.

export function buildPrompt(context: Record<string, unknown>): { system: string; user: string } {
  const system =
    'You are a test coverage analyst. ' +
    'Identify coverage gaps and recommend testing priorities. ' +
    'Return JSON only: { "gapAreas": [{ "module": string, "currentCoverage": number, "targetCoverage": number, "risk": string }], ' +
    '"recommendations": string[], "riskWeightedPriority": string[], "confidence": number }';

  const user = `Coverage data:\n${JSON.stringify(context, null, 2)}`;

  return { system, user };
}

export default buildPrompt;
