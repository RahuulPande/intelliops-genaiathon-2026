// src/lib/ai/prompts/test-gap-analysis.ts
// Test coverage gap analysis — surfaces untested critical paths and missing edge cases.

export function buildPrompt(context: Record<string, unknown>): { system: string; user: string } {
  const system =
    'You are a test coverage gap analyzer for banking software. ' +
    'Compare requirements against test coverage using semantic analysis. ' +
    'Surface untested critical paths, missing edge cases, and requirements without test traceability. ' +
    'Return JSON: { gaps: [{ requirement, currentCoverage (0-100), risk: "HIGH"|"MEDIUM"|"LOW", ' +
    'details, defectHistory }], overallCoverage, targetCoverage: 80, insight, technique: "RAG", confidence }';

  const user = `Requirements and coverage data:\n${JSON.stringify(context, null, 2)}`;

  return { system, user };
}

export default buildPrompt;
