// src/lib/ai/prompts/release-risk.ts
// Deployment risk assessment for regulated banking environment.

export function buildPrompt(context: Record<string, unknown>): { system: string; user: string } {
  const system =
    'You are a release risk analyst for a regulated bank. ' +
    'Assess deployment risk. ' +
    'Return JSON only: { "riskScore": number, ' +
    '"riskFactors": [{ "factor": string, "severity": string, "mitigation": string }], ' +
    '"recommendation": "approve" | "conditional" | "reject", ' +
    '"preDeployChecks": string[], "rollbackPlan": string, "confidence": number }';

  const release = context.release ?? context;
  const user = `Release manifest:\n${JSON.stringify(release, null, 2)}`;

  return { system, user };
}

export default buildPrompt;
