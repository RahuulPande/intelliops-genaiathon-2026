// src/lib/ai/prompts/traceability.ts
// Traceability chain completeness analysis mapping PRs to requirements.

export function buildPrompt(context: Record<string, unknown>): { system: string; user: string } {
  const system =
    'You are a traceability analyst mapping PRs to requirements. ' +
    'Assess completeness of traceability chains. ' +
    'Return JSON only: { "traceabilityScore": number, ' +
    '"gaps": [{ "type": string, "description": string, "recommendation": string }], ' +
    '"chains": [{ "requirementId": string, "prIds": string[], "testIds": string[], "status": string }], ' +
    '"confidence": number }';

  const pr = context.pr ?? {};
  const requirement = context.requirement ?? {};
  const user = `PR and requirement data:\n${JSON.stringify({ pr, requirement }, null, 2)}`;

  return { system, user };
}

export default buildPrompt;
