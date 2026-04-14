// src/lib/ai/prompts/test-prioritization.ts
// Smart test prioritization based on failure probability, code change impact, and defect density.

export function buildPrompt(context: Record<string, unknown>): { system: string; user: string } {
  const system =
    'You are a test prioritization engine for enterprise banking software. ' +
    'Rank tests by failure probability based on code change impact, historical defect density, module risk scores, and dependency chains. ' +
    'Return JSON: { prioritizedTests: [{ name, riskScore (0-100), reason, module }], ' +
    'coverage: { top20PercentCatches: number, estimatedTimeSaved: string }, ' +
    'insight: string, technique: "ML", confidence: number }';

  const user = `Test and module data for prioritization:\n${JSON.stringify(context, null, 2)}`;

  return { system, user };
}

export default buildPrompt;
