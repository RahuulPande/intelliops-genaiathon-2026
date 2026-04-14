// ── AI Audit Logger ───────────────────────────────────────
// Persists every AI inference to the AIAuditLog Prisma model.
// Supports compliance traceability (PCI-DSS, GDPR, SOX) and cost tracking.
// Failures are swallowed — audit logging must never break the main AI flow.

import { prisma } from '@/lib/db';

export interface AuditLogEntry {
  userId: string;
  userEmail?: string;
  analysisType: string;
  layer: string;
  workspace: string;
  inputSummary: string;
  outputSummary: string;
  model: string;
  isSimulated: boolean;
  tokenInput: number;
  tokenOutput: number;
  durationMs: number;
  complianceTags?: string[];
  dataClassification?: string;
}

export class AIAuditLogger {
  static async log(entry: AuditLogEntry): Promise<string> {
    // claude-sonnet-4-20250514 pricing: ~$3/1M input tokens, ~$15/1M output tokens
    const estimatedCostUsd = entry.isSimulated
      ? 0
      : (entry.tokenInput * 3) / 1_000_000 + (entry.tokenOutput * 15) / 1_000_000;

    try {
      const record = await prisma.aIAuditLog.create({
        data: {
          userId: entry.userId,
          userEmail: entry.userEmail ?? null,
          analysisType: entry.analysisType,
          layer: entry.layer,
          workspace: entry.workspace,
          inputSummary: entry.inputSummary.substring(0, 500),
          outputSummary: entry.outputSummary.substring(0, 500),
          model: entry.model,
          isSimulated: entry.isSimulated,
          tokenInput: entry.tokenInput,
          tokenOutput: entry.tokenOutput,
          durationMs: entry.durationMs,
          estimatedCostUsd,
          complianceTags: entry.complianceTags ? JSON.stringify(entry.complianceTags) : null,
          dataClassification: entry.dataClassification ?? 'internal',
        },
      });
      return record.id;
    } catch (error) {
      // Audit logging must never break the main flow
      console.error('[AI AUDIT] Failed to write audit log:', error);
      return 'audit-failed';
    }
  }
}
