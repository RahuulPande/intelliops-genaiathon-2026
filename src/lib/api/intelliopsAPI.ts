/**
 * IntelliOps Backend API Client
 *
 * Feature-flagged: when USE_REAL_API is true, the frontend reads from the
 * FastAPI backend instead of mock data. When false, everything uses the
 * existing mock data — zero changes to the default experience.
 */

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

/** Feature flag — set NEXT_PUBLIC_USE_REAL_API=true to activate real backend. */
export const USE_REAL_API = process.env.NEXT_PUBLIC_USE_REAL_API === "true";

// ── Types ──────────────────────────────────────────────────────────────────

export interface RealPR {
  id: string;
  github_id: number;
  title: string;
  author: string | null;
  service_id: string | null;
  repository: string | null;
  files_changed: number;
  additions: number;
  deletions: number;
  risk_score: number | null;
  risk_level: string | null;
  status: string;
  created_at: string | null;
  analyzed_at: string | null;
}

export interface RealAnalysis {
  summary: string;
  risk_factors: Array<{
    factor: string;
    evidence: string;
    severity: string;
  }>;
  recommendations: string[];
  confidence: number;
  model: string;
  tokens_used: number;
  latency_ms: number;
  generated_at: string;
}

// ── API Functions ──────────────────────────────────────────────────────────

export async function fetchPRs(service?: string): Promise<RealPR[]> {
  const params = new URLSearchParams();
  if (service) params.set("service", service);

  const response = await fetch(`${API_BASE}/prs?${params}`);
  if (!response.ok) throw new Error("Failed to fetch PRs");
  return response.json();
}

export async function fetchPR(prId: string): Promise<RealPR> {
  const response = await fetch(`${API_BASE}/prs/${prId}`);
  if (!response.ok) throw new Error("Failed to fetch PR");
  return response.json();
}

export async function fetchPRAnalysis(prId: string): Promise<RealAnalysis> {
  const response = await fetch(`${API_BASE}/prs/${prId}/analysis`);
  if (!response.ok) throw new Error("Failed to fetch analysis");
  return response.json();
}

export async function reanalyzePR(prId: string): Promise<void> {
  const response = await fetch(`${API_BASE}/prs/${prId}/reanalyze`, {
    method: "POST",
  });
  if (!response.ok) throw new Error("Failed to trigger reanalysis");
}
