// src/lib/ai/prompts/risk-assessment.ts
// Risk assessment for enterprise software requirements and acceptance criteria.

export function buildPrompt(context: Record<string, unknown>): { system: string; user: string } {
  const system =
    'You are a risk analyst for enterprise software requirements. ' +
    'Assess risks in requirements and acceptance criteria. ' +
    'Return JSON only: { "overallRisk": number, ' +
    '"risks": [{ "type": string, "severity": string, "description": string, "mitigation": string }], ' +
    '"acceptanceCriteriaGaps": string[], "recommendations": string[], "confidence": number }';

  const requirement = context.requirement ?? context;
  const user = `Requirement data:\n${JSON.stringify(requirement, null, 2)}`;

  return { system, user };
}

export default buildPrompt;
