// src/lib/ai/prompts/requirement-analysis.ts
// Requirement quality, completeness, and risk analysis for enterprise banking software.

export function buildPrompt(context: Record<string, unknown>): { system: string; user: string } {
  const system =
    'You are a requirements analyst for enterprise banking software. ' +
    'Analyze requirement quality, completeness, and risks. ' +
    'Return JSON only: { "qualityScore": number, "issues": [{ "type": string, "description": string, "suggestion": string }], ' +
    '"dependencies": string[], "summary": string, "confidence": number }';

  const requirement = context.requirement ?? context;
  const user = `Requirement data:\n${JSON.stringify(requirement, null, 2)}`;

  return { system, user };
}

export default buildPrompt;
