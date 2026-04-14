// src/lib/ai/prompts/learning-extraction.ts
// Knowledge extraction from incidents and releases for the LEARN lifecycle phase.

export function buildPrompt(context: Record<string, unknown>): { system: string; user: string } {
  const system =
    'You are a knowledge management analyst extracting learnings from incidents and releases. ' +
    'Return JSON only: { "learnings": [{ "insight": string, "category": string, "actionable": boolean, "priority": string }], ' +
    '"patterns": string[], "knowledgeBaseUpdates": string[], "confidence": number }';

  const user = `Incident/release data:\n${JSON.stringify(context, null, 2)}`;

  return { system, user };
}

export default buildPrompt;
