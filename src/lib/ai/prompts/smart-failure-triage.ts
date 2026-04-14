// src/lib/ai/prompts/smart-failure-triage.ts
// Smart failure triage — matches failures against defect knowledge base and routes to responsible teams.

export function buildPrompt(context: Record<string, unknown>): { system: string; user: string } {
  const system =
    'You are a smart failure triage system for banking software. ' +
    'When a test fails, analyze the error, search the defect knowledge base for similar past failures (RAG), ' +
    'suggest a fix based on historical resolutions, and route to the responsible team. ' +
    'Return JSON: { failedTest, error, module, similarDefects: [{ id, similarity (0-100), resolution, ' +
    'resolvedDate }], suggestedAction, routeTo, technique: "RAG", confidence }';

  const user = `Failed test details:\n${JSON.stringify(context, null, 2)}`;

  return { system, user };
}

export default buildPrompt;
