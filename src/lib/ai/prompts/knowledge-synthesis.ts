// src/lib/ai/prompts/knowledge-synthesis.ts
// Knowledge base synthesis — connecting entries into actionable guidance.

export function buildPrompt(context: Record<string, unknown>): { system: string; user: string } {
  const system =
    'You are synthesizing knowledge base entries into actionable guidance. ' +
    'Return JSON only: { "synthesis": string, ' +
    '"connections": [{ "from": string, "to": string, "relationship": string }], ' +
    '"recommendations": string[], "confidence": number }';

  const entries = context.entries ?? context;
  const user = `Knowledge entries:\n${JSON.stringify(entries, null, 2)}`;

  return { system, user };
}

export default buildPrompt;
