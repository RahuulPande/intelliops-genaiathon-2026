// src/lib/ai/prompts/flaky-test-detection.ts
// Flaky test detection — identifies tests with inconsistent pass/fail patterns.

export function buildPrompt(context: Record<string, unknown>): { system: string; user: string } {
  const system =
    'You are a flaky test detection system. ' +
    'Analyze test execution history to identify tests with inconsistent pass/fail patterns. ' +
    'Look for timing dependencies, environment sensitivity, race conditions, and resource leaks. ' +
    'Return JSON: { flakyTests: [{ name, flakinessScore (0-100), runHistory: string, rootCause, ' +
    'recommendation: "quarantine"|"investigate"|"fix" }], totalQuarantined, timeSaved, impact, ' +
    'technique: "ML", confidence }';

  const user = `Test execution history:\n${JSON.stringify(context, null, 2)}`;

  return { system, user };
}

export default buildPrompt;
