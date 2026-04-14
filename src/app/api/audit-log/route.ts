// src/app/api/audit-log/route.ts
// Paginated listing of AI audit log entries — admin only.

import { NextResponse } from 'next/server';
import { validateAPIRequest } from '@/lib/server/auth';
import { prisma } from '@/lib/db';

export async function GET(request: Request) {
  const auth = await validateAPIRequest(request);
  if (!auth?.isAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1');
  const limit = Math.min(parseInt(searchParams.get('limit') || '50'), 100);
  const layer = searchParams.get('layer') || undefined;
  const analysisType = searchParams.get('type') || undefined;
  const skip = (page - 1) * limit;

  const where: Record<string, unknown> = {};
  if (layer) where.layer = layer;
  if (analysisType) where.analysisType = analysisType;

  const [entries, total] = await Promise.all([
    prisma.aIAuditLog.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      take: limit,
      skip,
    }),
    prisma.aIAuditLog.count({ where }),
  ]);

  return NextResponse.json({
    entries,
    total,
    page,
    limit,
    pages: Math.ceil(total / limit),
  });
}
