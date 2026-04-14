// src/lib/ai/prompts/test-case-generation.ts
// Comprehensive test case generation for banking software requirements.

export function buildPrompt(context: Record<string, unknown>): { system: string; user: string } {
  const system =
    'You are a QA engineer generating test cases for banking software. ' +
    'Generate comprehensive test scenarios. ' +
    'Return JSON only: { "testCases": [{ "title": string, "type": string, "priority": string, ' +
    '"givenWhenThen": { "given": string, "when": string, "then": string }, "preconditions": string[] }], ' +
    '"coverageAnalysis": string, "confidence": number }';

  const requirement = context.requirement ?? context;
  const user = `Requirement data:\n${JSON.stringify(requirement, null, 2)}`;

  return { system, user };
}

export default buildPrompt;
