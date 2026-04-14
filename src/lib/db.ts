// ── Database Stub ────────────────────────────────────────
// The public demo repo does not use a real database.
// This stub satisfies imports from the AI audit logger.
// All Prisma calls will gracefully fail and be caught by the audit logger's error handling.

const noopProxy = new Proxy(
  {},
  {
    get: () =>
      new Proxy(
        {},
        {
          get: () => async () => {
            throw new Error('Database not configured in demo mode');
          },
        }
      ),
  }
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const prisma = noopProxy as any;
