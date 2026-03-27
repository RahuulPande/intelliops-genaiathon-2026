'use client';

import { useState, useEffect } from 'react';
import { Smartphone, Tablet, Monitor, Wifi, Play, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from '@/components/layouts/Sidebar';
import AdminSidebar from '@/components/layouts/AdminSidebar';
import MobileBottomNav from '@/components/layouts/MobileBottomNav';
import GlobalSearch from '@/components/layouts/GlobalSearch';
import KeyboardShortcuts from '@/components/layouts/KeyboardShortcuts';
import ThemeToggle from '@/components/layouts/ThemeToggle';
import Breadcrumb from '@/components/layouts/Breadcrumb';

import LandingPage from '@/components/landing-page/LandingPage';
import ServiceHealthSection from '@/components/sections/ServiceHealthSection';
import IntelligentTestQualitySection from '@/components/sections/IntelligentTestQualitySection';
import ReleaseManagementSection from '@/components/sections/ReleaseManagementSection';
import ApplicationKnowledgeBaseSection from '@/components/sections/ApplicationKnowledgeBaseSection';
import RequirementIntelligenceWorkspace from '@/components/plan-intelligence/RequirementIntelligenceWorkspace';
import ChangeIntelligenceWorkspace from '@/components/build-intelligence/ChangeIntelligenceWorkspace';
import LearningIntelligenceWorkspace from '@/components/learn-intelligence/LearningIntelligenceWorkspace';
import TechnicalDocsSection from '@/components/sections/TechnicalDocsSection';
import SettingsSection from '@/components/sections/SettingsSection';
import DemoControlPanel from '@/components/dashboard/DemoControlPanel';
import GlobalSearchNavigation from '@/components/dashboard/GlobalSearchNavigation';
import IntelligentNotificationCenter from '@/components/intelligent-test-quality/defect-intelligence/IntelligentNotificationCenter';

import CommandPalette from '@/components/shared/CommandPalette';
import NotificationPanel from '@/components/shared/NotificationPanel';
import ActivityTicker from '@/components/shared/ActivityTicker';
import { GuidedDemoOverlay } from '@/components/shared/GuidedDemoOverlay';
import AskIntelliOpsPanel from '@/components/shared/AskIntelliOpsPanel';
import ServiceDashboard from '@/components/service-intelligence/ServiceDashboard';
import LifecycleTraceView from '@/components/shared/LifecycleTraceView';
import TopStatsBar from '@/components/ui/TopStatsBar';
import LicenseSelector from '@/components/layouts/LicenseSelector';
import { useRealTimeData, useDemoScenario } from '@/lib/hooks/useRealTimeData';
import { demoScenarios, demoKeyboardShortcuts } from '@/lib/mock-data/scenarios';
import useDashboardStore from '@/store/dashboard';
import { useAuth } from '@/context/AuthContext';

// Section component mapping — keyed by SDLC layer section IDs
const sectionComponents: Record<string, React.ComponentType<any>> = {
  'platform-overview': LandingPage,
  // L0 PLAN
  'plan-intelligence': RequirementIntelligenceWorkspace,
  // L1 BUILD
  'build-intelligence': ChangeIntelligenceWorkspace,
  // L2 TEST
  'test-quality-intelligence': IntelligentTestQualitySection,
  // L3 RELEASE
  'release-intelligence': ReleaseManagementSection,
  'knowledge-base': ApplicationKnowledgeBaseSection,
  // L4 OPERATE
  'service-health-intelligence': ServiceHealthSection,
  // L5 LEARN
  'learn-intelligence': LearningIntelligenceWorkspace,
  // Cross-Layer
  'service-intelligence': ServiceDashboard,
  // Utility
  'tech-docs': TechnicalDocsSection,
  'settings': SettingsSection,
};

// Legacy section ID mapping for backward compatibility
const legacySectionMapping: Record<string, string> = {
  'ai-intelligence': 'test-quality-intelligence',
  'release-management': 'release-intelligence',
  'application-knowledge-base': 'knowledge-base',
  'service-health': 'service-health-intelligence',
  'overview': 'platform-overview',
};

export default function Dashboard() {
  const { isAdmin } = useAuth();
  const [currentSection, setCurrentSection] = useState('platform-overview');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isNotificationPanelOpen, setIsNotificationPanelOpen] = useState(false);
  const [isShortcutsOpen, setIsShortcutsOpen] = useState(false);
  const [isDemoTourActive, setIsDemoTourActive] = useState(false);
  const [isAskPanelOpen, setIsAskPanelOpen] = useState(false);
  const [deviceType, setDeviceType] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');
  const [showMobileIndicator, setShowMobileIndicator] = useState(true);

  const { 
    isDemoMode,
    currentScenario,
    startDemoScenario,
    stopDemoScenario 
  } = useDashboardStore();

  // Initialize real-time data updates and demo scenarios
  useRealTimeData(true, 1000);
  useDemoScenario();

  // Get the active section component
  const ActiveSectionComponent = sectionComponents[currentSection as keyof typeof sectionComponents] || LandingPage;
  
  // Handle redirects for legacy routes
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const legacySection = urlParams.get('section');

    if (legacySection) {
      const resolved = legacySectionMapping[legacySection] || legacySection;
      setCurrentSection(resolved);
    } else if (legacySectionMapping[currentSection]) {
      setCurrentSection(legacySectionMapping[currentSection]);
    }
  }, [currentSection]);

  // Role-based section locking: admin unlocks all; demo locks L0/L1/L4/L5
  const lockedSections = isAdmin ? new Set<string>() : new Set(['plan-intelligence', 'build-intelligence', 'service-health-intelligence', 'learn-intelligence', 'service-intelligence', 'lifecycle-trace']);

  // Demo route guard: redirect to landing page if demo user lands on a locked section
  useEffect(() => {
    if (!isAdmin && lockedSections.has(currentSection)) {
      setCurrentSection('platform-overview');
    }
  }, [currentSection, isAdmin]);

  const handleSectionChange = (section: string) => {
    const resolvedSection = legacySectionMapping[section] || section;
    if (lockedSections.has(resolvedSection)) {
      // Don't navigate — sidebar handles the modal
      return;
    }
    setCurrentSection(resolvedSection);
  };

  const handleToggleCollapse = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      // Global shortcuts
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault();
        setIsCommandPaletteOpen(true);
      }

      // Ask IntelliOps shortcut (Ctrl+I)
      if ((event.metaKey || event.ctrlKey) && event.key === 'i') {
        event.preventDefault();
        setIsAskPanelOpen(prev => !prev);
      }
      
      if (event.key === '?' && !event.metaKey && !event.ctrlKey && !event.altKey) {
        event.preventDefault();
        setIsShortcutsOpen(true);
      }

      if (event.key === 'Escape') {
        setIsSearchOpen(false);
        setIsShortcutsOpen(false);
      }

      // Live Demo shortcut (Ctrl+L)
      if ((event.metaKey || event.ctrlKey) && event.key === 'l') {
        event.preventDefault();
        // Trigger live demo if on platform overview section
        if (currentSection === 'platform-overview') {
          const overviewElement = document.querySelector('[data-section="platform-overview"]');
          if (overviewElement) {
            const liveDemoButton = overviewElement.querySelector('button[data-demo-trigger]') as HTMLButtonElement;
            if (liveDemoButton && !liveDemoButton.disabled) {
              liveDemoButton.click();
            }
          }
        }
      }

      // QR Code shortcut (Ctrl+Q)
      if ((event.metaKey || event.ctrlKey) && event.key === 'q') {
        event.preventDefault();
        // Trigger QR code modal if on overview section
        if (currentSection === 'overview') {
          const overviewElement = document.querySelector('[data-section="overview"]');
          if (overviewElement) {
            const qrButton = overviewElement.querySelector('button[data-qr-trigger]') as HTMLButtonElement;
            if (qrButton) {
              qrButton.click();
            }
          }
        }
      }

      // Demo shortcuts
      if (event.ctrlKey) {
        const shortcut = `ctrl+${event.key}`;
        const scenarioId = demoKeyboardShortcuts[shortcut as keyof typeof demoKeyboardShortcuts];
        if (scenarioId) {
          event.preventDefault();
          const scenario = demoScenarios.find(s => s.id === scenarioId);
          if (scenario) {
            if (isDemoMode && currentScenario?.id === scenarioId) {
              stopDemoScenario();
            } else {
              startDemoScenario(scenario);
            }
          }
        }
      }

      // Navigation shortcuts (vim-style)
      if (!event.metaKey && !event.ctrlKey && !event.altKey) {
        const target = event.target as HTMLElement;
        // Don't trigger if typing in an input
        if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') return;

        if (event.key === 'g') {
          // Wait for next key
          const handleSecondKey = (e: KeyboardEvent) => {
            e.preventDefault();
            switch (e.key) {
              case 'h': setCurrentSection('platform-overview'); break;
              case 'i': setCurrentSection('test-quality-intelligence'); break;
              case 'r': setCurrentSection('release-intelligence'); break;
              case 'k': setCurrentSection('knowledge-base'); break;
              case 't': setCurrentSection('tech-docs'); break;
              case 'c': setCurrentSection('settings'); break;
            }
            document.removeEventListener('keydown', handleSecondKey);
          };
          document.addEventListener('keydown', handleSecondKey);
          setTimeout(() => document.removeEventListener('keydown', handleSecondKey), 2000);
        }
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [isDemoMode, currentScenario, startDemoScenario, stopDemoScenario, currentSection]);

  // Layer badge mapping for contextual header (static classes for Tailwind purge)
  const layerBadgeConfig: Record<string, { label: string; badgeClass: string; dotClass: string }> = {
    'plan-intelligence': { label: 'PLAN', badgeClass: 'bg-teal-50 dark:bg-teal-900/20 text-teal-700 dark:text-teal-300 border-teal-200 dark:border-teal-700/50', dotClass: 'bg-teal-500' },
    'build-intelligence': { label: 'BUILD', badgeClass: 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-700/50', dotClass: 'bg-indigo-500' },
    'test-quality-intelligence': { label: 'TEST', badgeClass: 'bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-700/50', dotClass: 'bg-purple-500' },
    'release-intelligence': { label: 'RELEASE', badgeClass: 'bg-rose-50 dark:bg-rose-900/20 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-700/50', dotClass: 'bg-rose-500' },
    'knowledge-base': { label: 'RELEASE', badgeClass: 'bg-rose-50 dark:bg-rose-900/20 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-700/50', dotClass: 'bg-rose-500' },
    'service-health-intelligence': { label: 'OPERATE', badgeClass: 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-700/50', dotClass: 'bg-blue-500' },
    'learn-intelligence': { label: 'LEARN', badgeClass: 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-700/50', dotClass: 'bg-emerald-500' },
  };

  const currentLayerBadge = layerBadgeConfig[currentSection];

  // Get breadcrumb items with layer context (2-level for layer sections)
  const getBreadcrumbItems = () => {
    const layerMapping: Record<string, string> = {
      'plan-intelligence': 'L0 — Plan Intelligence',
      'build-intelligence': 'L1 — Build Intelligence',
      'test-quality-intelligence': 'L2 — Test Intelligence',
      'release-intelligence': 'L3 — Release Intelligence',
      'knowledge-base': 'L3 — Release Intelligence',
      'service-health-intelligence': 'L4 — Operate Intelligence',
      'learn-intelligence': 'L5 — Learn Intelligence',
      'service-intelligence': 'Cross-Layer Intelligence',
      'lifecycle-trace': 'Cross-Layer Intelligence',
    };

    const sectionNames: Record<string, string> = {
      'platform-overview': 'IntelliOps AI Platform',
      'plan-intelligence': 'Requirement Intelligence',
      'build-intelligence': 'Change Intelligence',
      'test-quality-intelligence': 'Test & Quality Intelligence',
      'release-intelligence': 'Release Intelligence',
      'knowledge-base': 'Application Knowledge Base',
      'service-health-intelligence': 'Service Health & Incidents',
      'learn-intelligence': 'Learning Intelligence',
      'service-intelligence': 'Service Intelligence',
      'lifecycle-trace': 'Lifecycle Trace',
      'tech-docs': 'Technical Documentation',
      'settings': 'Settings & Administration',
    };

    const items = [];
    const layerName = layerMapping[currentSection];
    if (layerName) {
      items.push({ label: layerName, isActive: false });
    }
    items.push({
      label: sectionNames[currentSection] || 'Unknown',
      isActive: true,
    });
    return items;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      {/* Top Stats Bar */}
      <TopStatsBar />
      
      {/* Sidebar Navigation */}
      {isAdmin ? (
        <AdminSidebar
          currentSection={currentSection}
          onSectionChange={handleSectionChange}
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={handleToggleCollapse}
        />
      ) : (
        <Sidebar
          currentSection={currentSection}
          onSectionChange={handleSectionChange}
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={handleToggleCollapse}
        />
      )}

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav
        currentSection={currentSection}
        onSectionChange={handleSectionChange}
      />

      {/* Main Content */}
      <main className={`transition-all duration-300 ${
        isAdmin
          ? (isSidebarCollapsed ? 'md:ml-16' : 'md:ml-[260px]')
          : (isSidebarCollapsed ? 'md:ml-16' : 'md:ml-[17rem]')
      } ml-0 min-h-screen pb-20 md:pb-0`}>
        <div className="pt-4 md:pt-0">
          {/* Top Bar with Breadcrumbs and Controls */}
          <div className="flex items-center justify-between p-6 pb-0">
            <div className="flex-1">
              <Breadcrumb 
                items={getBreadcrumbItems()}
                onNavigate={handleSectionChange}
              />
            </div>
            <div className="flex items-center space-x-3">
              {/* Contextual Layer Badge */}
              {currentLayerBadge && (
                <span className={`hidden md:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${currentLayerBadge.badgeClass}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${currentLayerBadge.dotClass}`} />
                  {currentLayerBadge.label}
                </span>
              )}
              {/* Mode Badge */}
              <span className={`hidden md:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold border ${
                isAdmin
                  ? 'bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-700/50'
                  : 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-700/50'
              }`}>
                {isAdmin ? (
                  <><span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" /> Development Mode</>
                ) : (
                  <><span className="w-1.5 h-1.5 rounded-full bg-blue-500" /> Demo Mode — GenAIathon</>
                )}
              </span>
              <LicenseSelector />
              <ThemeToggle />
              <IntelligentNotificationCenter />
              <button
                onClick={() => setIsCommandPaletteOpen(true)}
                className="p-2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors"
                title="Command Palette (⌘K)"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
              <button
                onClick={() => setIsShortcutsOpen(true)}
                className="p-2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors"
                title="Keyboard shortcuts (?)"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Activity Ticker — Dev Mode Only */}
          {isAdmin && (
            <div className="px-6 pt-2">
              <ActivityTicker onNavigate={handleSectionChange} />
            </div>
          )}

          {/* Section Content */}
          {(() => {
            switch (currentSection) {
              case 'platform-overview':
                return <LandingPage onNavigateToSection={handleSectionChange} />;
              // L0 PLAN
              case 'plan-intelligence':
                return <RequirementIntelligenceWorkspace />;
              // L1 BUILD
              case 'build-intelligence':
                return <ChangeIntelligenceWorkspace />;
              // L2 TEST
              case 'test-quality-intelligence':
                return <IntelligentTestQualitySection />;
              // L3 RELEASE
              case 'release-intelligence':
                return <ReleaseManagementSection />;
              case 'knowledge-base':
                return <ApplicationKnowledgeBaseSection />;
              // L4 OPERATE
              case 'service-health-intelligence':
                return <ServiceHealthSection />;
              // L5 LEARN
              case 'learn-intelligence':
                return <LearningIntelligenceWorkspace />;
              // Cross-Layer
              case 'service-intelligence':
                return <ServiceDashboard onNavigate={handleSectionChange} />;
              case 'lifecycle-trace':
                return <LifecycleTraceView serviceId="svc-payment" onNavigate={handleSectionChange} />;
              // Utility
              case 'tech-docs':
                return <TechnicalDocsSection />;
              case 'settings':
                return <SettingsSection />;
              default:
                return <LandingPage onNavigateToSection={handleSectionChange} />;
            }
          })()}
        </div>
      </main>

      {/* Command Palette */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onNavigate={handleSectionChange}
      />

      {/* Notification Panel */}
      <NotificationPanel
        isOpen={isNotificationPanelOpen}
        onClose={() => setIsNotificationPanelOpen(false)}
        onNavigate={handleSectionChange}
      />

      {/* Global Search (legacy) */}
      <GlobalSearch
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigate={handleSectionChange}
      />

      {/* Keyboard Shortcuts */}
      <KeyboardShortcuts
        isOpen={isShortcutsOpen}
        onClose={() => setIsShortcutsOpen(false)}
      />

      {/* Guided Demo Overlay */}
      <GuidedDemoOverlay
        isActive={isDemoTourActive}
        onClose={() => setIsDemoTourActive(false)}
        onNavigate={handleSectionChange}
      />

      {/* Demo Control Panel */}
      <DemoControlPanel />

      {/* Global Search Navigation */}
      <GlobalSearchNavigation />

      {/* Ask IntelliOps Chat Panel */}
      <AskIntelliOpsPanel
        isOpen={isAskPanelOpen}
        onClose={() => setIsAskPanelOpen(false)}
        onNavigate={handleSectionChange}
      />

      {/* Floating Action Buttons (Admin/Dev Mode Only) */}
      {isAdmin && !isDemoTourActive && (
        <div className="fixed bottom-6 right-6 z-30 flex flex-col gap-3">
          <motion.button
            onClick={() => setIsAskPanelOpen(true)}
            className="flex items-center gap-2 px-4 py-3 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg hover:shadow-xl transition-shadow"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            title="Ask IntelliOps (⌘I)"
          >
            <MessageSquare className="w-4 h-4" />
            <span className="text-sm font-semibold">Ask IntelliOps</span>
          </motion.button>
          <motion.button
            onClick={() => setIsDemoTourActive(true)}
            className="flex items-center gap-2 px-4 py-3 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg hover:shadow-xl transition-shadow"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            title="Start guided demo tour"
          >
            <Play className="w-4 h-4" />
            <span className="text-sm font-semibold">Start Demo Tour</span>
          </motion.button>
        </div>
      )}

      {/* Footer with Developer Credits */}
      <footer className="relative z-10 bg-gray-900 text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-3">
              <img 
                src="/images/intelliops-logo.svg" 
                alt="IntelliOps AI Logo" 
                width={32} 
                height={32}
                className="opacity-90"
              />
              <div className="flex flex-col">
                <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  IntelliOps AI
                </span>
                <span className="text-xs text-gray-500">v4.0.0</span>
              </div>
            </div>
            
            <div className="text-sm text-gray-400">
              <p>Developed by <span className="text-blue-400 font-medium">Rahuul Pande</span></p>
              <p>GenAIathon 2026 | <span className="text-blue-400">IntelliOps AI</span></p>
            </div>
            
            <div className="text-xs text-gray-500">
              <p>Enterprise Banking Intelligence Platform</p>
              <p>© 2026 All rights reserved</p>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
