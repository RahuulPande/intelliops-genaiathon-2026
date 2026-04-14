// src/app/api/audit-log/stats/route.ts
// Monthly AI usage statistics for the audit dashboard — admin only.

import { NextResponse } from 'next/server';
import { validateAPIRequest } from '@/lib/server/auth';
import { prisma } from '@/lib/db';

export async function GET(request: Request) {
  const auth = await validateAPIRequest(request);
  if (!auth?.isAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const now = new Date();
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

  const [total, realCount, simCount, costAgg, tokenAgg, durationAgg] = await Promise.all([
    prisma.aIAuditLog.count({ where: { createdAt: { gte: monthStart } } }),
    prisma.aIAuditLog.count({ where: { createdAt: { gte: monthStart }, isSimulated: false } }),
    prisma.aIAuditLog.count({ where: { createdAt: { gte: monthStart }, isSimulated: true } }),
    prisma.aIAuditLog.aggregate({
      where: { createdAt: { gte: monthStart } },
      _sum: { estimatedCostUsd: true },
    }),
    prisma.aIAuditLog.aggregate({
      where: { createdAt: { gte: monthStart } },
      _sum: { tokenInput: true, tokenOutput: true },
    }),
    prisma.aIAuditLog.aggregate({
      where: { createdAt: { gte: monthStart } },
      _avg: { durationMs: true },
    }),
  ]);

  // Group by layer
  const byLayer = await prisma.aIAuditLog.groupBy({
    by: ['layer'],
    where: { createdAt: { gte: monthStart } },
    _count: true,
  });

  // Group by analysis type
  const byType = await prisma.aIAuditLog.groupBy({
    by: ['analysisType'],
    where: { createdAt: { gte: monthStart } },
    _count: true,
  });

  return NextResponse.json({
    period: { from: monthStart.toISOString(), to: now.toISOString() },
    totalAnalyses: total,
    realAnalyses: realCount,
    simulatedAnalyses: simCount,
    estimatedCostUsd: Math.round((costAgg._sum.estimatedCostUsd || 0) * 100) / 100,
    tokenUsage: {
      input: tokenAgg._sum.tokenInput || 0,
      output: tokenAgg._sum.tokenOutput || 0,
    },
    avgDurationMs: Math.round(durationAgg._avg.durationMs || 0),
    byLayer: Object.fromEntries(byLayer.map((r: { layer: string; _count: number }) => [r.layer, r._count])),
    byType: Object.fromEntries(byType.map((r: { analysisType: string; _count: number }) => [r.analysisType, r._count])),
  });
}
