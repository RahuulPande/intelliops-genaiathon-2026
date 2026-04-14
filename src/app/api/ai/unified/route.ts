// src/app/api/ai/unified/route.ts
// Unified AI analysis endpoint — routes to IntelliOps AI service with auth + audit.

import { NextResponse } from 'next/server';
import { validateAPIRequest } from '@/lib/server/auth';
import { analyzeWithAI } from '@/lib/ai/intelliops-ai';
import type { AIAnalysisType } from '@/lib/ai/intelliops-ai';

export async function POST(request: Request) {
  const auth = await validateAPIRequest(request);
  if (!auth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const { type, context, layer, workspace, inputSummary } = body as {
    type: string;
    context: Record<string, unknown>;
    layer: string;
    workspace: string;
    inputSummary?: string;
  };

  if (!type || !context || !layer || !workspace) {
    return NextResponse.json({ error: 'Missing required fields: type, context, layer, workspace' }, { status: 400 });
  }

  const result = await analyzeWithAI({
    type: type as AIAnalysisType,
    context,
    userId: auth.userId,
    userEmail: undefined,
    layer,
    workspace,
    inputSummary: inputSummary || `${type} analysis`,
  });

  return NextResponse.json(result, { status: result.success ? 200 : 500 });
}
