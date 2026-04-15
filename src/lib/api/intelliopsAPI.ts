/**
 * IntelliOps Backend API Client
 *
 * All API calls go to /api (same-origin Next.js API routes).
 * Graceful degradation: components fall back to mock data if API is unreachable.
 */

const API_BASE = "/api";

// ── Token management (in-memory, NOT localStorage) ────────────────────

let _accessToken: string | null = null;
let _refreshToken: string | null = null;

export function setTokens(access: string, refresh: string) {
  _accessToken = access;
  _refreshToken = refresh;
}

export function clearTokens() {
  _accessToken = null;
  _refreshToken = null;
}

export function getAccessToken(): string | null {
  return _accessToken;
}

export function getRefreshToken(): string | null {
  return _refreshToken;
}

// ── Authenticated fetch wrapper ───────────────────────────────────────

let _onUnauthorized: (() => void) | null = null;

export function setOnUnauthorized(callback: () => void) {
  _onUnauthorized = callback;
}

async function authFetch(url: string, options: RequestInit = {}): Promise<Response> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string> || {}),
  };

  if (_accessToken) {
    headers["Authorization"] = `Bearer ${_accessToken}`;
  }

  let response = await fetch(url, { ...options, headers });

  // On 401, attempt token refresh
  if (response.status === 401 && _refreshToken) {
    const refreshResp = await fetch(`${API_BASE}/auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh_token: _refreshToken }),
    });

    if (refreshResp.ok) {
      const data = await refreshResp.json();
      _accessToken = data.access_token;
      headers["Authorization"] = `Bearer ${_accessToken}`;
      response = await fetch(url, { ...options, headers });
    } else {
      // Refresh failed — force logout
      clearTokens();
      _onUnauthorized?.();
      throw new Error("Session expired");
    }
  }

  return response;
}

// ── Types ──────────────────────────────────────────────────────────────

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

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: string;
  is_active: boolean;
}

export interface LoginResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
  user: AuthUser;
}

export interface ConfigCategory {
  label: string;
  description: string;
  status: string;
  configs: Array<{
    key: string;
    label: string;
    type: string;
    is_secret: boolean;
    is_configured: boolean;
    value: string | null;
    description: string;
  }>;
}

export interface ConnectorInfo {
  connector_id: string;
  display_name: string;
  category: string;
  is_configured: boolean;
  is_connected: boolean;
  last_sync: string | null;
  record_count: number;
  error_message: string | null;
  status: string;
}

export interface FeatureFlag {
  flag_key: string;
  display_name: string;
  description: string;
  category: string;
  is_enabled: boolean;
  allowed_roles: string[] | null;
}

// ── Auth API ──────────────────────────────────────────────────────────

export async function loginAPI(email: string, password: string): Promise<LoginResponse> {
  const response = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new Error(data.detail || "Login failed");
  }
  return response.json();
}

export async function refreshTokenAPI(refreshToken: string): Promise<{ access_token: string }> {
  const response = await fetch(`${API_BASE}/auth/refresh`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refresh_token: refreshToken }),
  });
  if (!response.ok) throw new Error("Token refresh failed");
  return response.json();
}

export async function getMeAPI(): Promise<AuthUser> {
  const response = await authFetch(`${API_BASE}/auth/me`);
  if (!response.ok) throw new Error("Failed to fetch profile");
  return response.json();
}

export async function logoutAPI(refreshToken: string): Promise<void> {
  await fetch(`${API_BASE}/auth/logout`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refresh_token: refreshToken }),
  }).catch(() => {});
}

// ── Config API ────────────────────────────────────────────────────────

export async function getConfigAPI(): Promise<{ categories: Record<string, ConfigCategory> }> {
  const response = await authFetch(`${API_BASE}/config`);
  if (!response.ok) throw new Error("Failed to fetch config");
  return response.json();
}

export async function updateConfigAPI(key: string, value: string): Promise<void> {
  const response = await authFetch(`${API_BASE}/config/${key}`, {
    method: "PUT",
    body: JSON.stringify({ value }),
  });
  if (!response.ok) throw new Error("Failed to update config");
}

export async function batchUpdateConfigAPI(configs: Record<string, string>): Promise<void> {
  const response = await authFetch(`${API_BASE}/config/batch`, {
    method: "PUT",
    body: JSON.stringify({ configs }),
  });
  if (!response.ok) throw new Error("Failed to batch update configs");
}

export async function testConnectionAPI(category: string): Promise<{ success: boolean; message: string; details?: Record<string, unknown> }> {
  const response = await authFetch(`${API_BASE}/config/test/${category}`, {
    method: "POST",
  });
  if (!response.ok) throw new Error("Connection test failed");
  return response.json();
}

// ── Connector API ─────────────────────────────────────────────────────

export async function getConnectorsAPI(): Promise<{ connectors: ConnectorInfo[] }> {
  const response = await authFetch(`${API_BASE}/connectors`);
  if (!response.ok) throw new Error("Failed to fetch connectors");
  return response.json();
}

export async function testConnectorAPI(connectorId: string): Promise<{ success: boolean; message: string }> {
  const response = await authFetch(`${API_BASE}/connectors/${connectorId}/test`, {
    method: "POST",
  });
  if (!response.ok) throw new Error("Connector test failed");
  return response.json();
}

export async function syncConnectorAPI(connectorId: string): Promise<{ records_synced: number; records_failed: number; errors: string[]; duration_ms: number }> {
  const response = await authFetch(`${API_BASE}/connectors/${connectorId}/sync`, {
    method: "POST",
  });
  if (!response.ok) throw new Error("Sync failed");
  return response.json();
}

export async function getConnectorStatusAPI(connectorId: string): Promise<ConnectorInfo> {
  const response = await authFetch(`${API_BASE}/connectors/${connectorId}/status`);
  if (!response.ok) throw new Error("Failed to fetch connector status");
  return response.json();
}

export async function getConnectorLogsAPI(connectorId: string): Promise<{ logs: Array<Record<string, unknown>> }> {
  const response = await authFetch(`${API_BASE}/connectors/${connectorId}/logs`);
  if (!response.ok) throw new Error("Failed to fetch connector logs");
  return response.json();
}

// ── Feature Flags API ─────────────────────────────────────────────────

export async function getFeaturesAPI(): Promise<{ flags: FeatureFlag[]; grouped: Record<string, FeatureFlag[]> }> {
  const response = await authFetch(`${API_BASE}/features`);
  if (!response.ok) throw new Error("Failed to fetch features");
  return response.json();
}

export async function updateFeatureAPI(flagKey: string, isEnabled: boolean): Promise<void> {
  const response = await authFetch(`${API_BASE}/features/${flagKey}`, {
    method: "PUT",
    body: JSON.stringify({ is_enabled: isEnabled }),
  });
  if (!response.ok) throw new Error("Failed to update feature flag");
}

// ── PR API (existing, now with auth) ──────────────────────────────────

export async function fetchPRs(service?: string): Promise<RealPR[]> {
  const params = new URLSearchParams();
  if (service) params.set("service", service);

  const response = await authFetch(`${API_BASE}/prs?${params}`);
  if (!response.ok) throw new Error("Failed to fetch PRs");
  return response.json();
}

export async function fetchPR(prId: string): Promise<RealPR> {
  const response = await authFetch(`${API_BASE}/prs/${prId}`);
  if (!response.ok) throw new Error("Failed to fetch PR");
  return response.json();
}

export async function fetchPRAnalysis(prId: string): Promise<RealAnalysis> {
  const response = await authFetch(`${API_BASE}/prs/${prId}/analysis`);
  if (!response.ok) throw new Error("Failed to fetch analysis");
  return response.json();
}

export async function reanalyzePR(prId: string): Promise<void> {
  const response = await authFetch(`${API_BASE}/prs/${prId}/reanalyze`, {
    method: "POST",
  });
  if (!response.ok) throw new Error("Failed to trigger reanalysis");
}
