// src/store/dashboard.ts
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { 
  Service, 
  LogEntry, 
  Incident, 
  Alert, 
  DashboardFilter,
  AIInsight,
  ReleaseMetrics,
  DemoScenario,
  TestExecution,
  TestTeamMember,
  DefectPattern,
  DefectTrend,
  SecurityVulnerability,
  ComplianceCheck,
  SecurityCertificate,
  ReleaseTest,
  Environment,
  DeploymentHistory,
  PerformanceMetric,
  DatabasePerformance,
  ExecutiveMetric,
  BusinessImpact,
  CostBreakdown,
  LicenseUtilization,
  CostOptimization,
  TeamNotification,
  HandoverNote,
  KnowledgeArticle,
  TeamCollaborationMember,
  ActionItem,
  DemoControlState,
  DemoScenarioConfig,
  TouchGesture,
  ReportTemplate,
  ExportJob,
  UserSettings,
  SearchResult,
  SearchHistory,
  QuickAction
} from '@/lib/types';
import { mockDataGenerator } from '@/lib/mock-data/generator';

interface DashboardState {
  // Data
  services: Service[];
  logs: LogEntry[];
  incidents: Incident[];
  alerts: Alert[];
  insights: AIInsight[];
  releaseMetrics: ReleaseMetrics | null;
  
  // New Feature Data
  testExecutions: TestExecution[];
  testTeamMembers: TestTeamMember[];
  defectPatterns: DefectPattern[];
  defectTrends: DefectTrend[];
  securityVulnerabilities: SecurityVulnerability[];
  complianceChecks: ComplianceCheck[];
  securityCertificates: SecurityCertificate[];
  releaseTests: ReleaseTest[];
  
  // Features 11-13 Data
  environments: Environment[];
  deploymentHistory: DeploymentHistory[];
  performanceMetrics: PerformanceMetric[];
  databasePerformance: DatabasePerformance[];
  executiveMetrics: ExecutiveMetric[];
  businessImpacts: BusinessImpact[];
  
  // Features 14-15 Data
  costBreakdowns: CostBreakdown[];
  licenseUtilization: LicenseUtilization[];
  costOptimizations: CostOptimization[];
  teamNotifications: TeamNotification[];
  handoverNotes: HandoverNote[];
  knowledgeArticles: KnowledgeArticle[];
  teamCollaborationMembers: TeamCollaborationMember[];
  actionItems: ActionItem[];
  
  // Features 16-17 Data
  demoControlState: DemoControlState;
  demoScenarios: DemoScenarioConfig[];
  touchGestures: TouchGesture[];
  isMobileView: boolean;
  
  // Features 18-20 Data
  reportTemplates: ReportTemplate[];
  exportJobs: ExportJob[];
  userSettings: UserSettings;
  searchResults: SearchResult[];
  searchHistory: SearchHistory[];
  quickActions: QuickAction[];
  isSearchOpen: boolean;
  
  // UI State
  selectedService: Service | null;
  isServiceModalOpen: boolean;
  filter: DashboardFilter;
  isRealTimeEnabled: boolean;
  isDemoMode: boolean;
  currentScenario: DemoScenario | null;
  
  // Actions
  setServices: (services: Service[]) => void;
  addLog: (log: LogEntry) => void;
  addIncident: (incident: Incident) => void;
  addAlert: (alert: Alert) => void;
  acknowledgeAlert: (alertId: string, acknowledgedBy: string) => void;
  dismissAlert: (alertId: string) => void;
  addInsight: (insight: AIInsight) => void;
  
  updateService: (serviceId: string, updates: Partial<Service>) => void;
  selectService: (service: Service | null) => void;
  openServiceModal: (service: Service) => void;
  closeServiceModal: () => void;
  setFilter: (filter: Partial<DashboardFilter>) => void;
  
  toggleRealTime: () => void;
  toggleDemoMode: () => void;
  startDemoScenario: (scenario: DemoScenario) => void;
  stopDemoScenario: () => void;
  
  // Mock data actions
  generateRealtimeData: () => void;
  triggerServiceFailure: (serviceId: string) => void;
  triggerCascadeFailure: () => void;
  resolveAllIncidents: () => void;
  
  // Computed values
  getHealthyServices: () => Service[];
  getDegradedServices: () => Service[];
  getDownServices: () => Service[];
  getRecentIncidents: (hours?: number) => Incident[];
  getServiceLogs: (serviceId: string) => LogEntry[];
  getActiveAlerts: () => Alert[];

  // Export & Reporting Actions - Function signatures
  createReportTemplate: (template: Omit<ReportTemplate, 'id' | 'createdAt'>) => void;
  updateReportTemplate: (id: string, updates: Partial<ReportTemplate>) => void;
  deleteReportTemplate: (id: string) => void;
  startExportJob: (templateId: string, format: 'pdf' | 'excel' | 'csv') => string;
  updateExportJob: (id: string, updates: Partial<ExportJob>) => void;

  // Settings Actions - Function signatures
  updateUserSettings: (updates: Partial<UserSettings>) => void;
  updateTheme: (theme: 'light' | 'dark' | 'auto') => void;
  updateNotificationSettings: (notifications: Partial<UserSettings['notifications']>) => void;
  updateAlertThresholds: (thresholds: Partial<UserSettings['alertThresholds']>) => void;

  // Search Actions - Function signatures
  setSearchOpen: (isOpen: boolean) => void;
  updateSearchResults: (results: SearchResult[]) => void;
  addSearchHistory: (query: string, resultCount: number) => void;
  clearSearchHistory: () => void;
  setQuickActions: (actions: QuickAction[]) => void;
}

const useDashboardStore = create<DashboardState>()(
  devtools(
    persist(
      (set, get) => ({
        // Initial data from mock generator
        services: mockDataGenerator.getServices(),
        logs: mockDataGenerator.getLogs().slice(-1000), // Last 1000 logs
        incidents: mockDataGenerator.getIncidents(),
        alerts: [],
        insights: [],
        releaseMetrics: null,
        
        // New Feature Data - Initial values
        testExecutions: [],
        testTeamMembers: [],
        defectPatterns: [],
        defectTrends: [],
        securityVulnerabilities: [],
        complianceChecks: [],
        securityCertificates: [],
        releaseTests: [],
        
        // Features 11-13 Data - Initial values
        environments: [],
        deploymentHistory: [],
        performanceMetrics: [],
        databasePerformance: [],
        executiveMetrics: [],
        businessImpacts: [],
        
        // Features 14-15 Data - Initial values
        costBreakdowns: [],
        licenseUtilization: [],
        costOptimizations: [],
        teamNotifications: [],
        handoverNotes: [],
        knowledgeArticles: [],
        teamCollaborationMembers: [],
        actionItems: [],
        
        // Features 16-17 Data - Initial values
        demoControlState: {
          isVisible: false,
          selectedScenario: 'normal',
          speedMultiplier: 1,
          isRecording: false,
          presentationMode: false,
          currentDataState: 'default',
          autoRefresh: true,
          debugMode: false
        },
        demoScenarios: [],
        touchGestures: [],
        isMobileView: false,
        
        // Features 18-20 Data - Initial values
        reportTemplates: [],
        exportJobs: [],
        userSettings: {
          id: 'default',
          theme: 'light',
          notifications: {
            email: true,
            push: true,
            sms: false,
            desktop: true
          },
          alertThresholds: {
            cpu: 80,
            memory: 85,
            disk: 90,
            responseTime: 2000,
            errorRate: 5
          },
          dashboardPreferences: {
            autoRefresh: true,
            refreshInterval: 30,
            compactMode: false,
            showAnimations: true,
            defaultTimeRange: '24h'
          },
          privacy: {
            shareAnalytics: true,
            trackUsage: true
          },
          integrations: {
            slack: { enabled: false },
            teams: { enabled: false },
            email: { enabled: true }
          }
        },
        searchResults: [],
        searchHistory: [],
        quickActions: [],
        isSearchOpen: false,
        
        // UI State
        selectedService: null,
        isServiceModalOpen: false,
        filter: {
          services: [],
          timeRange: {
            start: new Date(Date.now() - 24 * 60 * 60 * 1000), // 24 hours ago
            end: new Date()
          }
        },
        isRealTimeEnabled: true,
        isDemoMode: false,
        currentScenario: null,
        
        // Actions
        setServices: (services) => set({ services }),
        
        addLog: (log) => set((state) => ({
          logs: [...state.logs.slice(-999), log] // Keep last 1000 logs
        })),
        
        addIncident: (incident) => set((state) => ({
          incidents: [...state.incidents, incident]
        })),
        
        addAlert: (alert) => set((state) => ({
          alerts: [...state.alerts, alert]
        })),
        
        acknowledgeAlert: (alertId, acknowledgedBy) => set((state) => ({
          alerts: state.alerts.map(alert => 
            alert.id === alertId 
              ? { ...alert, acknowledged: true, acknowledgedBy, acknowledgedAt: new Date() }
              : alert
          )
        })),
        
        dismissAlert: (alertId) => set((state) => ({
          alerts: state.alerts.filter(alert => alert.id !== alertId)
        })),
        
        addInsight: (insight) => set((state) => ({
          insights: [...state.insights, insight]
        })),
        
        updateService: (serviceId, updates) => set((state) => ({
          services: state.services.map(s => 
            s.id === serviceId ? { ...s, ...updates } : s
          )
        })),
        
        selectService: (service) => set({ selectedService: service }),
        
        openServiceModal: (service) => set({ 
          selectedService: service, 
          isServiceModalOpen: true 
        }),
        
        closeServiceModal: () => set({ 
          selectedService: null, 
          isServiceModalOpen: false 
        }),
        
        setFilter: (filter) => set((state) => ({
          filter: { ...state.filter, ...filter }
        })),
        
        toggleRealTime: () => set((state) => ({
          isRealTimeEnabled: !state.isRealTimeEnabled
        })),
        
        toggleDemoMode: () => set((state) => ({
          isDemoMode: !state.isDemoMode
        })),
        
        startDemoScenario: (scenario) => set({
          currentScenario: scenario,
          isDemoMode: true
        }),
        
        stopDemoScenario: () => set({
          currentScenario: null,
          isDemoMode: false
        }),
        
        // Mock data generators
        generateRealtimeData: () => {
          const state = get();
          
          // Generate new log entry
          const newLog = mockDataGenerator.generateRealtimeLog();
          state.addLog(newLog);
          
          // Update service status based on logs
          if (newLog.level === 'error') {
            const service = state.services.find(s => s.id === newLog.serviceId);
            if (service && service.status === 'healthy') {
              state.updateService(newLog.serviceId, {
                status: 'degraded',
                health: Math.max(50, service.health - 10)
              });
              
              // Generate alert
              state.addAlert({
                id: crypto.randomUUID(),
                type: 'warning',
                title: `Service Degradation: ${service.name}`,
                message: newLog.message,
                serviceId: service.id,
                severity: 'medium',
                timestamp: new Date(),
                acknowledged: false,
                autoResolve: true,
                ttl: 300 // 5 minutes
              });
            }
          }
          
          // Random service health updates
          if (Math.random() < 0.1) {
            const randomService = state.services[Math.floor(Math.random() * state.services.length)];
            const healthDelta = (Math.random() - 0.5) * 10;
            const newHealth = Math.max(0, Math.min(100, randomService.health + healthDelta));
            
            state.updateService(randomService.id, {
              health: newHealth,
              status: newHealth > 80 ? 'healthy' : newHealth > 50 ? 'degraded' : 'down',
              lastChecked: new Date()
            });
          }
          
          // Generate AI insights occasionally
          if (Math.random() < 0.01) {
            state.addInsight({
              id: crypto.randomUUID(),
              type: 'anomaly',
              title: 'Unusual Traffic Pattern Detected',
              description: 'Transaction volume is 35% higher than typical for this time period',
              confidence: 87,
              impact: 'medium',
              suggestedAction: 'Monitor closely and prepare to scale if trend continues',
              relatedServices: state.services.slice(0, 3).map(s => s.id),
              timestamp: new Date()
            });
          }
        },
        
        triggerServiceFailure: (serviceId) => {
          const state = get();
          state.updateService(serviceId, {
            status: 'down',
            health: 0,
            lastChecked: new Date()
          });
          
          // Create incident
          const service = state.services.find(s => s.id === serviceId);
          if (service) {
            state.addIncident({
              id: crypto.randomUUID(),
              title: `Service Failure: ${service.name}`,
              description: 'Complete service outage detected',
              severity: 'critical',
              status: 'open',
              createdAt: new Date(),
              updatedAt: new Date(),
              affectedServices: [serviceId],
              assignee: 'Auto-assigned',
              impactedUsers: Math.floor(Math.random() * 10000),
              estimatedRevenueLoss: Math.floor(Math.random() * 100000)
            });
          }
        },
        
        triggerCascadeFailure: () => {
          const result = mockDataGenerator.createServiceFailureCascade();
          const state = get();
          
          // Update primary service
          state.updateService(result.primaryService.id, {
            status: 'down',
            health: 0
          });
          
          // Update dependent services after delay
          setTimeout(() => {
            result.dependentServices.forEach(service => {
              state.updateService(service.id, {
                status: 'degraded',
                health: Math.floor(Math.random() * 40) + 30
              });
            });
          }, 2000);
          
          // Add incident
          state.addIncident(result.incident);
          
          // Add critical alert
          state.addAlert({
            id: crypto.randomUUID(),
            type: 'error',
            title: 'CASCADE FAILURE DETECTED',
            message: `${result.primaryService.name} failure affecting ${result.dependentServices.length} services`,
            severity: 'critical',
            timestamp: new Date(),
            acknowledged: false,
            autoResolve: false
          });
        },
        
        resolveAllIncidents: () => set((state) => ({
          incidents: state.incidents.map(i => ({
            ...i,
            status: 'resolved',
            resolution: 'Automated recovery completed',
            updatedAt: new Date()
          })),
          services: state.services.map(s => ({
            ...s,
            status: 'healthy',
            health: 95 + Math.random() * 5
          }))
        })),
        
        // Computed values
        getHealthyServices: () => {
          const { services } = get();
          return services.filter(s => s.status === 'healthy');
        },
        
        getDegradedServices: () => {
          const { services } = get();
          return services.filter(s => s.status === 'degraded');
        },
        
        getDownServices: () => {
          const { services } = get();
          return services.filter(s => s.status === 'down');
        },
        
        getRecentIncidents: (hours = 24) => {
          const { incidents } = get();
          const cutoff = new Date(Date.now() - hours * 60 * 60 * 1000);
          return incidents.filter(i => i.createdAt > cutoff);
        },
        
        getServiceLogs: (serviceId) => {
          const { logs } = get();
          return logs.filter(l => l.serviceId === serviceId);
        },
        
        getActiveAlerts: () => {
          const { alerts } = get();
          return alerts.filter(a => !a.acknowledged);
        },

        // Demo Control Actions
        setDemoVisible: (isVisible: boolean) => set((state) => ({
          demoControlState: { ...state.demoControlState, isVisible }
        })),
        
        setDemoScenario: (scenario: string) => set((state) => ({
          demoControlState: { ...state.demoControlState, selectedScenario: scenario }
        })),
        
        setDemoSpeed: (speed: number) => set((state) => ({
          demoControlState: { ...state.demoControlState, speedMultiplier: speed }
        })),
        
        toggleDemoRecording: () => set((state) => ({
          demoControlState: { ...state.demoControlState, isRecording: !state.demoControlState.isRecording }
        })),
        
        togglePresentationMode: () => set((state) => ({
          demoControlState: { ...state.demoControlState, presentationMode: !state.demoControlState.presentationMode }
        })),
        
        resetDemoState: () => set((state) => ({
          demoControlState: {
            isVisible: false,
            selectedScenario: 'normal',
            speedMultiplier: 1,
            isRecording: false,
            presentationMode: false,
            currentDataState: 'default',
            autoRefresh: true,
            debugMode: false
          }
        })),

        // Mobile Actions
        setMobileView: (isMobile: boolean) => set({ isMobileView: isMobile }),
        
        addTouchGesture: (gesture: TouchGesture) => set((state) => ({
          touchGestures: [...state.touchGestures, gesture]
        })),

        // Export & Reporting Actions
        createReportTemplate: (template: Omit<ReportTemplate, 'id' | 'createdAt'>) => set((state) => ({
          reportTemplates: [...state.reportTemplates, {
            ...template,
            id: `tpl_${Date.now()}`,
            createdAt: new Date()
          }]
        })),
        
        updateReportTemplate: (id: string, updates: Partial<ReportTemplate>) => set((state) => ({
          reportTemplates: state.reportTemplates.map(template =>
            template.id === id ? { ...template, ...updates } : template
          )
        })),
        
        deleteReportTemplate: (id: string) => set((state) => ({
          reportTemplates: state.reportTemplates.filter(template => template.id !== id)
        })),
        
        startExportJob: (templateId: string, format: 'pdf' | 'excel' | 'csv') => {
          const jobId = `job_${Date.now()}`;
          set((state) => ({
            exportJobs: [...state.exportJobs, {
              id: jobId,
              templateId,
              status: 'pending',
              progress: 0,
              format
            }]
          }));
          return jobId;
        },
        
        updateExportJob: (id: string, updates: Partial<ExportJob>) => set((state) => ({
          exportJobs: state.exportJobs.map(job =>
            job.id === id ? { ...job, ...updates } : job
          )
        })),

        // Settings Actions
        updateUserSettings: (updates: Partial<UserSettings>) => set((state) => ({
          userSettings: { ...state.userSettings, ...updates }
        })),
        
        updateTheme: (theme: 'light' | 'dark' | 'auto') => set((state) => ({
          userSettings: { ...state.userSettings, theme }
        })),
        
        updateNotificationSettings: (notifications: Partial<UserSettings['notifications']>) => set((state) => ({
          userSettings: {
            ...state.userSettings,
            notifications: { ...state.userSettings.notifications, ...notifications }
          }
        })),
        
        updateAlertThresholds: (thresholds: Partial<UserSettings['alertThresholds']>) => set((state) => ({
          userSettings: {
            ...state.userSettings,
            alertThresholds: { ...state.userSettings.alertThresholds, ...thresholds }
          }
        })),

        // Search Actions
        setSearchOpen: (isOpen: boolean) => set({ isSearchOpen: isOpen }),
        
        updateSearchResults: (results: SearchResult[]) => set({ searchResults: results }),
        
        addSearchHistory: (query: string, resultCount: number) => set((state) => ({
          searchHistory: [...state.searchHistory.slice(-19), {
            id: `search_${Date.now()}`,
            query,
            timestamp: new Date(),
            resultCount
          }]
        })),
        
        clearSearchHistory: () => set({ searchHistory: [] }),
        
        setQuickActions: (actions: QuickAction[]) => set({ quickActions: actions })
      }),
      {
        name: 'dashboard-storage',
        partialize: (state) => ({
          isDemoMode: state.isDemoMode,
          isRealTimeEnabled: state.isRealTimeEnabled
        })
      }
    )
  )
);

export default useDashboardStore;