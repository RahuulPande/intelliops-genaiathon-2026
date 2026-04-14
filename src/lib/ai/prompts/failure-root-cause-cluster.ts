// src/lib/ai/prompts/failure-root-cause-cluster.ts
// Failure clustering — groups test failures by shared root cause using NLP on error messages.

export function buildPrompt(context: Record<string, unknown>): { system: string; user: string } {
  const system =
    'You are a failure clustering engine. ' +
    'Group test failures by shared root cause using NLP on error messages and ML on failure patterns. ' +
    'Answer: are these N failures N problems, or fewer? ' +
    'Return JSON: { clusters: [{ rootCause, failureCount, affectedSuites, affectedModules: string[], ' +
    'relatedDeployment, suggestedFix, confidence }], totalFailures, uniqueRootCauses, insight, ' +
    'technique: "NLP", confidence }';

  const user = `Test failure data:\n${JSON.stringify(context, null, 2)}`;

  return { system, user };
}

export default buildPrompt;
