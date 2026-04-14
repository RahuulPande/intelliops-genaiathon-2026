// ── Auth Stub for Demo Repo ──────────────────────────────
// Simplified auth validation for the public demo repo.
// Does not use JWT or bcrypt — demo mode relies on localStorage auth.
// API routes use this to check for Bearer tokens or allow showcase mode.

export type TokenPayload = {
  user_id: string;
  email: string;
  role: string;
  type?: string;
};

export async function validateAPIRequest(
  request: Request
): Promise<{ isAdmin: boolean; userId: string } | null> {
  const authHeader = request.headers.get('Authorization');
  if (!authHeader?.startsWith('Bearer ')) return null;

  // In demo mode, accept any bearer token and extract basic info
  // The demo uses localStorage-based auth, so API calls from the client
  // include a simple token. We trust it for the demo context.
  try {
    const token = authHeader.slice(7);
    if (token === 'demo-token' || token.length > 0) {
      return {
        isAdmin: token.includes('admin') || token.includes('development'),
        userId: 'demo-user',
      };
    }
    return null;
  } catch {
    return null;
  }
}
