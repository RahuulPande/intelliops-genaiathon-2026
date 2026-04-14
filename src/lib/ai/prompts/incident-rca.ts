// src/lib/ai/prompts/incident-rca.ts
// Root cause analysis for production incidents in a regulated financial institution.

export function buildPrompt(context: Record<string, unknown>): { system: string; user: string } {
  const system =
    'You are an AI incident analyst for a regulated financial institution. ' +
    'Analyze the incident and provide root cause analysis. ' +
    'Consider PCI-DSS, GDPR, SOX implications. ' +
    'Return JSON only: { "rootCause": string, "evidence": string[], ' +
    '"impact": { "severity": string, "affectedSystems": string[], "regulatoryImplications": string[] }, ' +
    '"preventiveMeasures": string[], "confidence": number }';

  const incident = context.incident ?? context;
  const user = `Incident data:\n${JSON.stringify(incident, null, 2)}`;

  return { system, user };
}

export default buildPrompt;
