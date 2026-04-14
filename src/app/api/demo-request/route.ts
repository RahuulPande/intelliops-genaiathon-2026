import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

interface DemoRequestBody {
  name: string;
  email: string;
  company: string;
  role: string;
  teamSize: string;
  message?: string;
  source?: string;
}

// Simple in-memory rate limiting: 3 requests per IP per 15 minutes
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 3;
const RATE_WINDOW_MS = 15 * 60 * 1000;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  // Clean expired entries
  for (const [key, val] of rateLimitMap) {
    if (now > val.resetAt) rateLimitMap.delete(key);
  }
  const entry = rateLimitMap.get(ip);
  if (!entry) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return true;
  }
  if (entry.count >= RATE_LIMIT) return false;
  entry.count++;
  return true;
}

const CONSUMER_DOMAINS = [
  'gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'aol.com',
  'icloud.com', 'mail.com', 'protonmail.com', 'yandex.com', 'gmx.com',
  'live.com', 'me.com',
];

export async function POST(request: Request) {
  try {
    // Rate limiting
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    const body: DemoRequestBody = await request.json();

    // Validate required fields
    if (!body.name || !body.email || !body.company || !body.role || !body.teamSize) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Validate field lengths
    if (body.name.length < 2 || body.name.length > 100) {
      return NextResponse.json({ error: 'Name must be 2-100 characters' }, { status: 400 });
    }
    if (body.company.length < 2 || body.company.length > 200) {
      return NextResponse.json({ error: 'Company must be 2-200 characters' }, { status: 400 });
    }
    if (body.message && body.message.length > 2000) {
      return NextResponse.json({ error: 'Message must be under 2000 characters' }, { status: 400 });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
    }

    // Reject consumer email domains
    const domain = body.email.split('@')[1]?.toLowerCase();
    if (CONSUMER_DOMAINS.includes(domain)) {
      return NextResponse.json({ error: 'Please use your work email address' }, { status: 400 });
    }

    // Store in database
    await prisma.demoRequest.create({
      data: {
        name: body.name,
        email: body.email,
        company: body.company,
        role: body.role,
        teamSize: body.teamSize,
        message: body.message || null,
        source: body.source || 'website',
      },
    });

    console.log(`[DEMO REQUEST] ${body.name} from ${body.company} (${body.email})`);

    return NextResponse.json({
      success: true,
      message: `We'll reach out to ${body.email} within 24 hours to schedule your demo.`,
    }, { status: 201 });
  } catch (error) {
    console.error('[DEMO REQUEST ERROR]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
