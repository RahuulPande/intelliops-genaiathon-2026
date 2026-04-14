// src/lib/ai/prompts/test-result-analysis.ts
// Test result pattern analysis — flaky tests, regressions, and quality signals.

export function buildPrompt(context: Record<string, unknown>): { system: string; user: string } {
  const system =
    'You are a test intelligence analyst. ' +
    'Analyze test results for patterns, flaky tests, and regressions. ' +
    'Return JSON only: { "patterns": [{ "type": string, "description": string, "affectedTests": string[] }], ' +
    '"flakyTests": string[], "regressions": string[], "recommendations": string[], "confidence": number }';

  const testSuite = context.testSuite ?? context;
  const user = `Test results:\n${JSON.stringify(testSuite, null, 2)}`;

  return { system, user };
}

export default buildPrompt;
