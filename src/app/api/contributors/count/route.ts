import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { validateAPIRequest } from '@/lib/server/auth';

export async function GET(request: Request) {
  const auth = await validateAPIRequest(request);
  if (!auth?.isAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const [total, active] = await Promise.all([
    prisma.contributor.count(),
    prisma.contributor.count({
      where: { lastActiveAt: { gte: thirtyDaysAgo } },
    }),
  ]);

  return NextResponse.json({
    total,
    active,
    billingPeriod: {
      start: new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString(),
      end: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).toISOString(),
    },
  });
}
