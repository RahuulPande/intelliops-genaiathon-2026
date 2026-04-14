// src/lib/ai/prompts/cab-package.ts
// Change Advisory Board submission generation for banking institutions.

export function buildPrompt(context: Record<string, unknown>): { system: string; user: string } {
  const system =
    'You are generating a Change Advisory Board submission for a banking institution. ' +
    'Create compliance-ready content. ' +
    'Return JSON only: { "summary": string, "riskAssessment": string, "testEvidence": string, ' +
    '"rollbackPlan": string, "regulatoryImpact": string[], "approvalRecommendation": string, "confidence": number }';

  const release = context.release ?? context;
  const change = context.change ?? {};
  const user = `Release and change data:\n${JSON.stringify({ release, change }, null, 2)}`;

  return { system, user };
}

export default buildPrompt;
