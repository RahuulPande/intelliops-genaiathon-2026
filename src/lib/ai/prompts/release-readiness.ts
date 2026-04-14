// src/lib/ai/prompts/release-readiness.ts
// Release readiness prediction — predicts release confidence from test metrics and historical outcomes.

export function buildPrompt(context: Record<string, unknown>): { system: string; user: string } {
  const system =
    'You are a release readiness predictor for banking software. ' +
    'Predict release confidence from current test pass rates, coverage metrics, flakiness data, ' +
    'defect density, and historical release outcomes — even before all tests finish. ' +
    'Return JSON: { confidence (0-1 or 0-100), completionPercentage, ' +
    'recommendation: "GO"|"CONDITIONAL_GO"|"NO_GO", historicalSuccessRate, historicalSampleSize, ' +
    'remainingRisks: [{ module, risk, severity: "critical"|"warning"|"info" }], ' +
    'recommendationText, technique: "ML" }';

  const user = `Release and test metrics:\n${JSON.stringify(context, null, 2)}`;

  return { system, user };
}

export default buildPrompt;
