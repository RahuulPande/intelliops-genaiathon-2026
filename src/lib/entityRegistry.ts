// ── Entity Registry ────────────────────────────────────────────────
// Cross-layer entity linking for IntelliOps AI.
// Maps entities (services, PRs, incidents, defects) across SDLC layers,
// enabling navigation and context display between layers.

export type EntityType = 'service' | 'pr' | 'incident' | 'defect' | 'release' | 'knowledge';

export type SDLCLayer = 'L0-PLAN' | 'L1-BUILD' | 'L2-TEST' | 'L3-RELEASE' | 'L4-OPERATE' | 'L5-LEARN';

export interface EntityReference {
  id: string;
  type: EntityType;
  label: string;
  layer: SDLCLayer;
  /** Section ID for navigation */
  sectionId: string;
  /** Brief context about this entity */
  description: string;
  /** Severity or status badge */
  badge?: { text: string; color: string };
}

export interface ServiceEntity {
  id: string;
  name: string;
  description: string;
  owner: string;
  /** References to entities in other layers that involve this service */
  references: EntityReference[];
}

// ── Service Registry ─────────────────────────────────────────────

export const serviceRegistry: ServiceEntity[] = [
  {
    id: 'svc-payment',
    name: 'payment-service',
    description: 'Core payment processing gateway handling checkout, refunds, and premium-tier billing flows.',
    owner: 'Payments Team',
    references: [
      {
        id: 'PR-4521',
        type: 'pr',
        label: 'PR-4521: Gateway timeout optimization',
        layer: 'L1-BUILD',
        sectionId: 'build-intelligence',
        description: 'Reduced gateway timeout from 30s to 5s — flagged as High risk by ML model.',
        badge: { text: 'High Risk', color: 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300' },
      },
      {
        id: 'inc-checkout-001',
        type: 'incident',
        label: 'INC: Checkout failure for premium users',
        layer: 'L4-OPERATE',
        sectionId: 'service-health-intelligence',
        description: 'Critical incident: ~2,400 premium-tier users affected by cascading timeout failures.',
        badge: { text: 'Critical', color: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300' },
      },
      {
        id: 'learn-inc-001',
        type: 'knowledge',
        label: 'Learning: Timeout pattern in payment paths',
        layer: 'L5-LEARN',
        sectionId: 'learn-intelligence',
        description: 'Feedback loop identified 3 similar timeout incidents in 6 months. Knowledge base updated.',
        badge: { text: 'Learned', color: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300' },
      },
      {
        id: 'def-2024-001',
        type: 'defect',
        label: 'DEF: Timeout handling in checkout flow',
        layer: 'L2-TEST',
        sectionId: 'test-quality-intelligence',
        description: 'RAG-matched defect: recurring timeout pattern detected across payment service test suites.',
        badge: { text: 'RAG Match', color: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300' },
      },
    ],
  },
  {
    id: 'svc-auth',
    name: 'auth-gateway',
    description: 'Central authentication and authorization service handling SSO, MFA, and RBAC policy enforcement.',
    owner: 'Platform Security Team',
    references: [
      {
        id: 'PR-4523',
        type: 'pr',
        label: 'PR-4523: MFA token validation refactor',
        layer: 'L1-BUILD',
        sectionId: 'build-intelligence',
        description: 'Refactored MFA validation logic across 12 files — flagged as Medium risk.',
        badge: { text: 'Medium Risk', color: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300' },
      },
      {
        id: 'learn-inc-003',
        type: 'knowledge',
        label: 'Learning: RBAC cache TTL mismatch',
        layer: 'L5-LEARN',
        sectionId: 'learn-intelligence',
        description: 'Identified cache TTL mismatch between auth-gateway and downstream services.',
        badge: { text: 'Learned', color: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300' },
      },
    ],
  },
  {
    id: 'svc-portfolio',
    name: 'portfolio-engine',
    description: 'Real-time portfolio valuation, notification engine, and investment analytics service.',
    owner: 'Wealth Management Team',
    references: [
      {
        id: 'PR-4522',
        type: 'pr',
        label: 'PR-4522: Notification batch optimization',
        layer: 'L1-BUILD',
        sectionId: 'build-intelligence',
        description: 'Optimized notification delivery batch size — flagged as Critical risk.',
        badge: { text: 'Critical Risk', color: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300' },
      },
      {
        id: 'inc-portfolio-001',
        type: 'incident',
        label: 'INC: Portfolio notification delay',
        layer: 'L4-OPERATE',
        sectionId: 'service-health-intelligence',
        description: 'High severity: notification-service consumer lag caused by schema migration.',
        badge: { text: 'High', color: 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300' },
      },
      {
        id: 'learn-inc-002',
        type: 'knowledge',
        label: 'Learning: Queue consumer lag patterns',
        layer: 'L5-LEARN',
        sectionId: 'learn-intelligence',
        description: 'Schema migration impact on message queues documented. Model accuracy improved.',
        badge: { text: 'Learned', color: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300' },
      },
    ],
  },
];

// ── Lookup Helpers ─────────────────────────────────────────────

export function getServiceByName(name: string): ServiceEntity | undefined {
  return serviceRegistry.find(
    s => s.name.toLowerCase() === name.toLowerCase() || s.name.toLowerCase().includes(name.toLowerCase()),
  );
}

export function getServiceById(id: string): ServiceEntity | undefined {
  return serviceRegistry.find(s => s.id === id);
}

export function getReferencesForService(serviceName: string): EntityReference[] {
  const svc = getServiceByName(serviceName);
  return svc?.references ?? [];
}

export function getReferencesForLayer(serviceName: string, layer: SDLCLayer): EntityReference[] {
  return getReferencesForService(serviceName).filter(r => r.layer === layer);
}

/** Get all cross-layer references excluding a specific layer (useful to show "related in other layers") */
export function getCrossLayerReferences(serviceName: string, excludeLayer: SDLCLayer): EntityReference[] {
  return getReferencesForService(serviceName).filter(r => r.layer !== excludeLayer);
}

// ── Layer Display Config ─────────────────────────────────────

export const layerConfig: Record<SDLCLayer, { label: string; color: string; bg: string; border: string }> = {
  'L0-PLAN': { label: 'L0 PLAN', color: 'text-teal-600 dark:text-teal-400', bg: 'bg-teal-50 dark:bg-teal-900/20', border: 'border-teal-200 dark:border-teal-800' },
  'L1-BUILD': { label: 'L1 BUILD', color: 'text-indigo-600 dark:text-indigo-400', bg: 'bg-indigo-50 dark:bg-indigo-900/20', border: 'border-indigo-200 dark:border-indigo-800' },
  'L2-TEST': { label: 'L2 TEST', color: 'text-purple-600 dark:text-purple-400', bg: 'bg-purple-50 dark:bg-purple-900/20', border: 'border-purple-200 dark:border-purple-800' },
  'L3-RELEASE': { label: 'L3 RELEASE', color: 'text-rose-600 dark:text-rose-400', bg: 'bg-rose-50 dark:bg-rose-900/20', border: 'border-rose-200 dark:border-rose-800' },
  'L4-OPERATE': { label: 'L4 OPERATE', color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-50 dark:bg-blue-900/20', border: 'border-blue-200 dark:border-blue-800' },
  'L5-LEARN': { label: 'L5 LEARN', color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-900/20', border: 'border-emerald-200 dark:border-emerald-800' },
};

/** Icon mapping for entity types — consumers should import from lucide-react */
export const entityTypeIcons: Record<EntityType, string> = {
  service: 'Server',
  pr: 'GitPullRequest',
  incident: 'AlertTriangle',
  defect: 'Bug',
  release: 'Package',
  knowledge: 'BookOpen',
};
