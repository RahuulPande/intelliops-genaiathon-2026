/**
 * Hook that fires an audit API call for AI analyses.
 * Called by AIOutputPanel to log every AI generation to the persistent audit trail.
 * Non-blocking — audit failures never affect the UI.
 */

import type { AIGenerationResult } from './simulatedAI';

interface AuditContext {
  analysisType: string;
  layer: string;
  workspace: string;
  inputSummary: string;
}

export async function fireAuditLog(
  result: AIGenerationResult,
  context: AuditContext
): Promise<void> {
  try {
    // Get auth token from localStorage for the API call
    const stored = localStorage.getItem('intelliops_tokens');
    if (!stored) return; // No auth = no audit (marketing page, etc.)

    const { access } = JSON.parse(stored);
    if (!access) return;

    await fetch('/api/ai/unified', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${access}`,
      },
      body: JSON.stringify({
        type: context.analysisType,
        context: { _auditOnly: true }, // Signal this is for audit, not re-analysis
        layer: context.layer,
        workspace: context.workspace,
        inputSummary: context.inputSummary,
      }),
    }).catch(() => {
      // Silently ignore audit failures
    });
  } catch {
    // Never let audit logging break the UI
  }
}
