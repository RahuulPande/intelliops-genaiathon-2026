import { NextResponse } from 'next/server';
import { analyzeWithAI, AIAnalysisType } from '@/lib/ai/intelliops-ai';
import { validateAPIRequest } from '@/lib/server/auth';

export async function POST(request: Request) {
  const auth = await validateAPIRequest(request);

  let body: {
    type?: string;
    context?: Record<string, unknown>;
    layer?: string;
    workspace?: string;
    inputSummary?: string;
    showcaseMode?: boolean;
  };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const { type, context, layer, workspace, inputSummary, showcaseMode } = body;

  if (!type || !context) {
    return NextResponse.json({ error: 'Missing required fields: type and context' }, { status: 400 });
  }

  // Determine the userId based on auth or showcase mode
  let userId: string;

  if (auth) {
    userId = auth.userId;
  } else if (showcaseMode === true) {
    // Allow unauthenticated showcase requests — the AI service will use simulation
    // since there is no API key check bypass; it naturally falls back to mock data
    userId = 'showcase-visitor';
  } else {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const result = await analyzeWithAI({
      type: type as AIAnalysisType,
      context,
      userId,
      layer: layer ?? 'L1',
      workspace: workspace ?? 'test-management-intelligence',
      inputSummary: inputSummary ?? `${type} analysis request`,
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error('[AI Analyze Route] Unexpected error:', error);
    return NextResponse.json(
      { error: 'Internal server error during AI analysis' },
      { status: 500 }
    );
  }
}
