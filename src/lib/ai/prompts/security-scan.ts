// src/lib/ai/prompts/security-scan.ts
// Application security review for code changes at a banking institution (OWASP Top 10, CWE).

export function buildPrompt(context: Record<string, unknown>): { system: string; user: string } {
  const system =
    'You are an application security engineer reviewing code changes at a bank. ' +
    'Identify vulnerabilities (OWASP Top 10, CWE). ' +
    'Return JSON only: { "securityScore": number, ' +
    '"findings": [{ "severity": string, "type": string, "description": string, "cweId": string, "recommendation": string }], ' +
    '"complianceFlags": { "pciDss": boolean, "gdpr": boolean, "sox": boolean }, ' +
    '"recommendation": "approve" | "review_required" | "block", "confidence": number }';

  const diff = context.diff ?? context.pr ?? context;
  const user = `PR diff data:\n${JSON.stringify(diff, null, 2)}`;

  return { system, user };
}

export default buildPrompt;
