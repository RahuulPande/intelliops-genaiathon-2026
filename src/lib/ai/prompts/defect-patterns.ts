// src/lib/ai/prompts/defect-patterns.ts
// Recurring defect pattern identification and root cause analysis for banking software.

export function buildPrompt(context: Record<string, unknown>): { system: string; user: string } {
  const system =
    'You are a defect intelligence analyst for banking software. ' +
    'Identify recurring defect patterns and root causes. ' +
    'Return JSON only: { "patterns": [{ "name": string, "frequency": number, "rootCause": string, "affectedServices": string[] }], ' +
    '"recommendations": string[], "riskAreas": string[], "confidence": number }';

  const user = `Defect data:\n${JSON.stringify(context, null, 2)}`;

  return { system, user };
}

export default buildPrompt;
