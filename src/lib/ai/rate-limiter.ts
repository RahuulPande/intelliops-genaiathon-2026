// ── In-Memory Rate Limiter ────────────────────────────────
// Per-user call counting with a sliding 60-second window.
// Designed for server-side use only (Next.js API routes / server actions).

const userCallCounts = new Map<string, { count: number; resetAt: number }>();
const MAX_CALLS_PER_MINUTE = parseInt(process.env.AI_MAX_CALLS_PER_MINUTE || '10');

export function checkRateLimit(userId: string): { allowed: boolean; retryAfterMs?: number } {
  const now = Date.now();

  // Clean expired entries to prevent unbounded memory growth
  for (const [key, val] of userCallCounts) {
    if (now > val.resetAt) userCallCounts.delete(key);
  }

  const entry = userCallCounts.get(userId);
  if (!entry) {
    userCallCounts.set(userId, { count: 1, resetAt: now + 60_000 });
    return { allowed: true };
  }

  if (entry.count >= MAX_CALLS_PER_MINUTE) {
    return { allowed: false, retryAfterMs: entry.resetAt - now };
  }

  entry.count++;
  return { allowed: true };
}
