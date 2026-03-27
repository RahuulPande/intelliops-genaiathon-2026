// src/lib/types/index.ts

export type ServiceStatus = 'healthy' | 'degraded' | 'down';
export type ServiceType = 'internal' | 'external';
export type LogLevel = 'debug' | 'info' | 'warn' | 'error';
export type IncidentSeverity = 'low' | 'medium' | 'high' | 'critical';
export type DefectStatus = 'open' | 'in-progress' | 'resolved' | 'closed';
export type DefectPriority = 'low' | 'medium' | 'high' | 'critical';

export interface Service {
  id: string;
  name: string;
  type: ServiceType;
  status: ServiceStatus;
  health: number; // 0-100
  lastChecked: Date;
  owner: string;
  email: string;
  sla: number; // percentage
  dependencies: string[]; // service IDs
  endpoint: string;
  responseTime: number; // ms
  uptime: number; // percentage
}

export interface LogEntry {
  id: string;
  timestamp: Date;
  serviceId: string;
  serviceName: string;
  level: LogLevel;
  message: string;
  userId?: string;
  sessionId?: string;
  traceId?: string;
  spanId?: string;
  duration?: number; // ms
  statusCode?: number;
  metadata?: Record<string, any>;
}

export interface Incident {
  id: string;
  title: string;
  description: string;
  severity: IncidentSeverity;
  status: 'open' | 'investigating' | 'resolved';
  createdAt: Date;
  updatedAt: Date;
  affectedServices: string[]; // service IDs
  assignee: string;
  rootCause?: string;
  resolution?: string;
  impactedUsers?: number;
  estimatedRevenueLoss?: number;
}

export interface Defect {
  id: string;
  title: string;
  description: string;
  status: DefectStatus;
  priority: DefectPriority;
  category: string;
  createdAt: Date;
  updatedAt: Date;
  reporter: string;
  assignee: string;
  affectedServices: string[];
  solution?: string;
  tags: string[];
  // AI matching fields
  similarDefects?: DefectMatch[];
  confidence?: number;
}

export interface DefectMatch {
  defectId: string;
  similarity: number; // 0-100
  solution: string;
  resolvedIn: number; // hours
}

export interface PerformanceMetric {
  id: string;
  serviceId: string;
  timestamp: Date;
  responseTime: number; // ms
  errorRate: number; // percentage
  throughput: number; // requests per second
  cpuUsage: number; // percentage
  memoryUsage: number; // percentage
  activeConnections: number;
}

export interface Alert {
  id: string;
  type: 'error' | 'warning' | 'info';
  title: string;
  message: string;
  serviceId?: string;
  severity: IncidentSeverity;
  timestamp: Date;
  acknowledged: boolean;
  acknowledgedBy?: string;
  acknowledgedAt?: Date;
  autoResolve?: boolean;
  ttl?: number; // seconds
}

export interface TestResult {
  id: string;
  testSuite: 'SIT' | 'UAT' | 'Regression' | 'Performance' | 'Security';
  name: string;
  status: 'passed' | 'failed' | 'skipped' | 'pending';
  duration: number; // ms
  executedAt: Date;
  executedBy: string;
  errorMessage?: string;
  stackTrace?: string;
}

export interface ReleaseMetrics {
  releaseId: string;
  targetDate: Date;
  progress: {
    sit: number; // percentage
    uat: number; // percentage
    regression: number; // percentage
    defectsClosed: number; // percentage
  };
  isReady: boolean;
  blockers: string[];
  risks: Array<{
    risk: string;
    impact: string;
    mitigation: string;
  }>;
  lastUpdated: Date;
}

export interface TeamMember {
  id: string;
  name: string;
  role: 'developer' | 'tester' | 'lead' | 'manager';
  email: string;
  avatar?: string;
  workload: {
    assigned: number;
    completed: number;
    inProgress: number;
    blocked: number;
  };
  availability: 'available' | 'busy' | 'away';
}

export interface DashboardFilter {
  services: string[];
  timeRange: {
    start: Date;
    end: Date;
  };
  severity?: IncidentSeverity[];
  status?: ServiceStatus[];
  searchQuery?: string;
}

export interface DemoScenario {
  id: string;
  name: string;
  description: string;
  duration: number; // seconds
  steps: Array<{
    time: number; // seconds from start
    action: string;
    target?: string; // service ID or component
    data?: any;
  }>;
}

export interface AIInsight {
  id: string;
  type: 'prediction' | 'recommendation' | 'anomaly' | 'pattern';
  title: string;
  description: string;
  confidence: number; // 0-100
  impact: 'low' | 'medium' | 'high' | 'critical';
  suggestedAction?: string;
  relatedServices?: string[];
  timestamp: Date;
}

export interface CostMetric {
  id: string;
  category: 'infrastructure' | 'licensing' | 'personnel' | 'incident';
  amount: number;
  currency: string;
  period: 'hourly' | 'daily' | 'monthly' | 'yearly';
  trend: 'up' | 'down' | 'stable';
  forecast?: number;
  savingOpportunity?: number;
}

export interface ReleaseTest {
  id: string;
  phase: 'SIT' | 'UAT' | 'Regression' | 'Performance' | 'Security';
  progress: number; // 0-100
  status: 'not-started' | 'in-progress' | 'completed' | 'blocked';
  testsTotal: number;
  testsCompleted: number;
  testsPassed: number;
  testsFailed: number;
  assignee: string;
  deadline: Date;
  environment: string;
}

export interface TestExecution {
  id: string;
  testCaseId: string;
  testCaseName: string;
  module: string;
  assignee: string;
  status: 'not-started' | 'in-progress' | 'passed' | 'failed' | 'blocked';
  executedAt?: Date;
  duration?: number; // minutes
  priority: 'low' | 'medium' | 'high' | 'critical';
  browser?: string;
  environment: string;
  defectId?: string;
}

export interface TestTeamMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
  capacity: number; // hours per day
  currentWorkload: number; // hours assigned
  productivity: number; // tests per hour
  passRate: number; // percentage
}

export interface DefectPattern {
  id: string;
  pattern: string;
  frequency: number;
  modules: string[];
  rootCause: string;
  averageResolutionTime: number; // hours
  similarDefects: string[];
  costImpact: number; // in dollars
}

export interface DefectTrend {
  period: string;
  newDefects: number;
  resolvedDefects: number;
  avgResolutionTime: number;
  module: string;
  severity: IncidentSeverity;
}

export interface SecurityVulnerability {
  id: string;
  title: string;
  description: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  cvssScore: number;
  type: 'SAST' | 'DAST' | 'SCA' | 'IAST';
  status: 'open' | 'in-progress' | 'resolved' | 'accepted';
  discoveredAt: Date;
  resolvedAt?: Date;
  affectedComponent: string;
  assignee: string;
  remediation: string;
}

export interface ComplianceCheck {
  id: string;
  framework: 'PCI-DSS' | 'SOX' | 'GDPR' | 'ISO27001' | 'HIPAA';
  control: string;
  description: string;
  status: 'compliant' | 'non-compliant' | 'pending' | 'not-applicable';
  lastAssessed: Date;
  nextAssessment: Date;
  evidence?: string;
  owner: string;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
}

export interface SecurityCertificate {
  id: string;
  name: string;
  issuer: string;
  subject: string;
  expiryDate: Date;
  status: 'valid' | 'expiring' | 'expired';
  daysUntilExpiry: number;
  type: 'SSL/TLS' | 'Code Signing' | 'Email' | 'Client Auth';
}

export interface Environment {
  id: string;
  name: string;
  type: 'DEV' | 'SIT' | 'UAT' | 'PROD';
  status: 'healthy' | 'degraded' | 'down' | 'maintenance';
  healthScore: number; // 0-100
  cpuUsage: number; // 0-100
  memoryUsage: number; // 0-100
  diskUsage: number; // 0-100
  uptime: number; // hours
  lastDeployment: Date;
  cost: number; // monthly cost
  isBooked: boolean;
  bookedBy?: string;
  bookingEnd?: Date;
  configDrift: boolean;
  driftDetails?: string[];
}

export interface DeploymentHistory {
  id: string;
  environment: string;
  version: string;
  deployedBy: string;
  deployedAt: Date;
  status: 'success' | 'failed' | 'rollback';
  duration: number; // minutes
  changes: string[];
}

export interface PerformanceMetric {
  id: string;
  serviceName: string;
  timestamp: Date;
  responseTime: number; // milliseconds
  throughput: number; // requests per second
  errorRate: number; // percentage
  cpuUsage: number; // percentage
  memoryUsage: number; // percentage
  cacheHitRate: number; // percentage
}

export interface DatabasePerformance {
  id: string;
  database: string;
  queryTime: number; // milliseconds
  connectionCount: number;
  lockWaitTime: number; // milliseconds
  indexHitRatio: number; // percentage
  bufferHitRatio: number; // percentage
  timestamp: Date;
}

export interface ExecutiveMetric {
  id: string;
  metric: string;
  value: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  changePercent: number;
  period: 'daily' | 'weekly' | 'monthly' | 'yearly';
  businessImpact: 'high' | 'medium' | 'low';
  target?: number;
}

export interface BusinessImpact {
  id: string;
  incident: string;
  revenueloss: number;
  customerImpact: number;
  duration: number; // minutes
  severity: IncidentSeverity;
  timestamp: Date;
  recoveryTime: number; // minutes
}

export interface CostBreakdown {
  id: string;
  category: 'Infrastructure' | 'Licenses' | 'Personnel' | 'Operations' | 'Compliance';
  subcategory: string;
  cost: number; // monthly cost
  previousCost: number;
  budget: number;
  usage: number; // utilization percentage
  service?: string;
  environment?: string;
  trend: 'up' | 'down' | 'stable';
}

export interface LicenseUtilization {
  id: string;
  software: string;
  vendor: string;
  totalLicenses: number;
  usedLicenses: number;
  costPerLicense: number;
  expiryDate: Date;
  utilizationRate: number; // percentage
  lastOptimized: Date;
  potentialSavings: number;
}

export interface CostOptimization {
  id: string;
  type: 'Resource Scaling' | 'License Optimization' | 'Environment Consolidation' | 'Reserved Instances';
  title: string;
  description: string;
  potentialSaving: number; // monthly
  implementationCost: number;
  timeToImplement: number; // days
  roi: number; // percentage
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'identified' | 'in-progress' | 'completed' | 'rejected';
}

export interface TeamNotification {
  id: string;
  type: 'incident' | 'deployment' | 'meeting' | 'announcement' | 'handover';
  title: string;
  message: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  from: string;
  to?: string; // specific team member or null for all
  timestamp: Date;
  isRead: boolean;
  actionRequired: boolean;
  relatedIncidentId?: string;
}

export interface HandoverNote {
  id: string;
  shiftFrom: string;
  shiftTo: string;
  date: Date;
  summary: string;
  activeIncidents: string[];
  completedTasks: string[];
  pendingActions: string[];
  importantNotes: string;
  systemStatus: 'normal' | 'degraded' | 'critical';
}

export interface KnowledgeArticle {
  id: string;
  title: string;
  content: string;
  category: 'troubleshooting' | 'procedures' | 'best-practices' | 'documentation';
  tags: string[];
  author: string;
  createdAt: Date;
  updatedAt: Date;
  views: number;
  helpful: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export interface TeamCollaborationMember {
  id: string;
  name: string;
  role: string;
  email: string;
  avatar: string;
  status: 'available' | 'busy' | 'away' | 'offline';
  shift: string;
  skills: string[];
  currentTasks: string[];
  lastActivity: Date;
}

export interface ActionItem {
  id: string;
  title: string;
  description: string;
  assignee: string;
  assignedBy: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'open' | 'in-progress' | 'blocked' | 'completed';
  dueDate: Date;
  createdAt: Date;
  relatedIncidentId?: string;
  category: 'incident-followup' | 'improvement' | 'maintenance' | 'training';
}

export interface DemoControlState {
  isVisible: boolean;
  selectedScenario: string;
  speedMultiplier: number;
  isRecording: boolean;
  presentationMode: boolean;
  currentDataState: string;
  autoRefresh: boolean;
  debugMode: boolean;
}

export interface DemoScenarioConfig {
  id: string;
  name: string;
  description: string;
  duration: number; // seconds
  triggers: Array<{
    time: number;
    action: string;
    data: any;
  }>;
  category: 'incident' | 'performance' | 'cost' | 'security' | 'normal';
}

export interface TouchGesture {
  type: 'swipe' | 'tap' | 'pinch' | 'drag';
  direction?: 'left' | 'right' | 'up' | 'down';
  target: string;
  action: string;
}

export interface ReportTemplate {
  id: string;
  name: string;
  description: string;
  type: 'executive' | 'technical' | 'operational' | 'custom';
  sections: string[];
  schedule?: 'daily' | 'weekly' | 'monthly' | 'quarterly';
  recipients: string[];
  format: 'pdf' | 'excel' | 'csv';
  createdAt: Date;
  lastGenerated?: Date;
}

export interface ExportJob {
  id: string;
  templateId: string;
  status: 'pending' | 'generating' | 'completed' | 'failed';
  progress: number;
  format: 'pdf' | 'excel' | 'csv';
  generatedAt?: Date;
  downloadUrl?: string;
  error?: string;
}

export interface UserSettings {
  id: string;
  theme: 'light' | 'dark' | 'auto';
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
    desktop: boolean;
  };
  alertThresholds: {
    cpu: number;
    memory: number;
    disk: number;
    responseTime: number;
    errorRate: number;
  };
  dashboardPreferences: {
    autoRefresh: boolean;
    refreshInterval: number; // seconds
    compactMode: boolean;
    showAnimations: boolean;
    defaultTimeRange: '1h' | '6h' | '24h' | '7d' | '30d';
  };
  privacy: {
    shareAnalytics: boolean;
    trackUsage: boolean;
  };
  integrations: {
    slack: { enabled: boolean; webhook?: string };
    teams: { enabled: boolean; webhook?: string };
    email: { enabled: boolean; smtp?: any };
  };
}

export interface SearchResult {
  id: string;
  type: 'service' | 'incident' | 'log' | 'metric' | 'insight' | 'action' | 'page';
  title: string;
  description: string;
  category: string;
  relevance: number;
  icon: any;
  url?: string;
  action?: () => void;
  metadata?: any;
  keywords?: string[];
}

export interface SearchHistory {
  id: string;
  query: string;
  timestamp: Date;
  resultCount: number;
  clickedResult?: string;
}

export interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: string;
  shortcut?: string;
  category: 'navigation' | 'data' | 'configuration' | 'help';
  action: () => void;
}