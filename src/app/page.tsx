'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Sidebar from '@/components/layouts/Sidebar';
import MobileBottomNav from '@/components/layouts/MobileBottomNav';
import GlobalSearch from '@/components/layouts/GlobalSearch';
import KeyboardShortcuts from '@/components/layouts/KeyboardShortcuts';
import ThemeToggle from '@/components/layouts/ThemeToggle';
import Breadcrumb from '@/components/layouts/Breadcrumb';

import LandingPage from '@/components/landing-page/LandingPage';
import IntelligentTestQualitySection from '@/components/sections/IntelligentTestQualitySection';
import ReleaseManagementSection from '@/components/sections/ReleaseManagementSection';
import ApplicationKnowledgeBaseSection from '@/components/sections/ApplicationKnowledgeBaseSection';
import TechnicalDocsSection from '@/components/sections/TechnicalDocsSection';
import SettingsSection from '@/components/sections/SettingsSection';
import DemoControlPanel from '@/components/dashboard/DemoControlPanel';
import GlobalSearchNavigation from '@/components/dashboard/GlobalSearchNavigation';
import IntelligentNotificationCenter from '@/components/intelligent-test-quality/defect-intelligence/IntelligentNotificationCenter';

import CommandPalette from '@/components/shared/CommandPalette';
import NotificationPanel from '@/components/shared/NotificationPanel';
import { GuidedDemoOverlay } from '@/components/shared/GuidedDemoOverlay';
import AskIntelliOpsPanel from '@/components/shared/AskIntelliOpsPanel';

// Sprint 22 — Demo mode flattened wrappers
import QualityOverviewSection from '@/components/sections/demo/QualityOverviewSection';
import DemoDefectIntelligenceSection from '@/components/sections/demo/DemoDefectIntelligenceSection';
import DemoTestManagementSection from '@/components/sections/demo/DemoTestManagementSection';
import DemoQualityInsightsSection from '@/components/sections/demo/DemoQualityInsightsSection';
import DemoPerformanceSection from '@/components/sections/demo/DemoPerformanceSection';
import DemoAIInsightsSection from '@/components/sections/demo/DemoAIInsightsSection';
import DemoLandingPage from '@/components/demo/DemoLandingPage';

import TopStatsBar from '@/components/ui/TopStatsBar';
import LicenseSelector from '@/components/layouts/LicenseSelector';
import { useRealTimeData, useDemoScenario } from '@/lib/hooks/useRealTimeData';
import { demoScenarios, demoKeyboardShortcuts } from '@/lib/mock-data/scenarios';
import useDashboardStore from '@/store/dashboard';
import { useAuth } from '@/context/AuthContext';

import DemoLoginPage from '@/app/login/page';

// Auth-gated wrapper: unauthenticated users see login, authenticated see dashboard
export default function Dashboard() {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <DemoLoginPage />;
  return <DashboardContent />;
}

function DashboardContent() {
  const [currentSection, setCurrentSection] = useState('platform-overview');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isNotificationPanelOpen, setIsNotificationPanelOpen] = useState(false);
  const [isShortcutsOpen, setIsShortcutsOpen] = useState(false);
  const [isDemoTourActive, setIsDemoTourActive] = useState(false);
  const [isAskPanelOpen, setIsAskPanelOpen] = useState(false);

  const {
    isDemoMode,
    currentScenario,
    startDemoScenario,
    stopDemoScenario
  } = useDashboardStore();

  // Initialize real-time data updates and demo scenarios
  useRealTimeData(true, 1000);
  useDemoScenario();

  const handleSectionChange = (section: string) => {
    setCurrentSection(section);
  };

  const handleToggleCollapse = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault();
        setIsCommandPaletteOpen(true);
      }

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
        if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') return;

        if (event.key === 'g') {
          const handleSecondKey = (e: KeyboardEvent) => {
            e.preventDefault();
            switch (e.key) {
              case 'h': setCurrentSection('platform-overview'); break;
              case 'i': setCurrentSection('demo-defect-intelligence'); break;
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

  // Layer badge mapping for contextual header
  const layerBadgeConfig: Record<string, { label: string; badgeClass: string; dotClass: string }> = {
    'test-quality-intelligence': { label: 'TEST', badgeClass: 'bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-700/50', dotClass: 'bg-purple-500' },
    'release-intelligence': { label: 'RELEASE', badgeClass: 'bg-rose-50 dark:bg-rose-900/20 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-700/50', dotClass: 'bg-rose-500' },
    'knowledge-base': { label: 'RELEASE', badgeClass: 'bg-rose-50 dark:bg-rose-900/20 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-700/50', dotClass: 'bg-rose-500' },
    'demo-defect-intelligence': { label: 'Delivery Intelligence', badgeClass: 'bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-700/50', dotClass: 'bg-purple-500' },
    'demo-test-management': { label: 'Delivery Intelligence', badgeClass: 'bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-700/50', dotClass: 'bg-purple-500' },
    'demo-quality-insights': { label: 'Delivery Intelligence', badgeClass: 'bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-700/50', dotClass: 'bg-purple-500' },
    'demo-performance-intelligence': { label: 'Delivery Intelligence', badgeClass: 'bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-700/50', dotClass: 'bg-purple-500' },
    'demo-ai-insights': { label: 'Delivery Intelligence', badgeClass: 'bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-700/50', dotClass: 'bg-purple-500' },
    'quality-overview': { label: 'Delivery Intelligence', badgeClass: 'bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-700/50', dotClass: 'bg-purple-500' },
  };

  const currentLayerBadge = layerBadgeConfig[currentSection];

  // Get breadcrumb items
  const getBreadcrumbItems = () => {
    const layerMapping: Record<string, string> = {
      'test-quality-intelligence': 'Test Intelligence',
      'release-intelligence': 'Release Intelligence',
      'knowledge-base': 'Release Intelligence',
      'quality-overview': 'Delivery Intelligence',
      'demo-defect-intelligence': 'Delivery Intelligence',
      'demo-test-management': 'Delivery Intelligence',
      'demo-quality-insights': 'Delivery Intelligence',
      'demo-performance-intelligence': 'Delivery Intelligence',
      'demo-ai-insights': 'Delivery Intelligence',
    };

    const sectionNames: Record<string, string> = {
      'platform-overview': 'IntelliOps AI Platform',
      'test-quality-intelligence': 'Test & Quality Intelligence',
      'release-intelligence': 'Release Intelligence',
      'knowledge-base': 'Application Knowledge Base',
      'tech-docs': 'Technical Documentation',
      'settings': 'Settings & Administration',
      'quality-overview': 'Quality Overview',
      'demo-defect-intelligence': 'Defect Intelligence',
      'demo-test-management': 'Test Intelligence',
      'demo-quality-insights': 'Quality Insights',
      'demo-performance-intelligence': 'Performance Intelligence',
      'demo-ai-insights': 'AI Insights',
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
    <div className="min-h-screen transition-colors bg-gray-50 dark:bg-[#0F0F0F]">
      {/* Top Stats Bar */}
      <TopStatsBar />

      {/* Sidebar Navigation */}
      <Sidebar
        currentSection={currentSection}
        onSectionChange={handleSectionChange}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={handleToggleCollapse}
      />

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav
        currentSection={currentSection}
        onSectionChange={handleSectionChange}
      />

      {/* Main Content */}
      <main className={`transition-all duration-300 ${
        isSidebarCollapsed ? 'md:ml-16' : 'md:ml-[17rem]'
      } ml-0 min-h-screen pb-20 md:pb-0`}>
        <div className="pt-4 md:pt-0">
          {/* Top Bar with Breadcrumbs and Controls */}
          <div className="flex items-center justify-between p-6 pb-0 dark:border-b dark:border-white/[0.04] dark:pb-4 dark:mb-2">
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
              <span className="hidden md:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold border bg-blue-50 dark:bg-blue-400/10 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-400/20">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 dark:bg-blue-400" /> Demo Mode
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

          {/* Section Content */}
          {(() => {
            switch (currentSection) {
              case 'platform-overview':
                return <DemoLandingPage onNavigate={handleSectionChange} />;
              case 'test-quality-intelligence':
                return <IntelligentTestQualitySection />;
              case 'release-intelligence':
                return <ReleaseManagementSection />;
              case 'knowledge-base':
                return <ApplicationKnowledgeBaseSection />;
              case 'tech-docs':
                return <TechnicalDocsSection />;
              case 'settings':
                return <SettingsSection />;
              case 'quality-overview':
                return <QualityOverviewSection onNavigateToSection={handleSectionChange} />;
              case 'demo-defect-intelligence':
                return <DemoDefectIntelligenceSection />;
              case 'demo-test-management':
                return <DemoTestManagementSection />;
              case 'demo-quality-insights':
                return <DemoQualityInsightsSection />;
              case 'demo-performance-intelligence':
                return <DemoPerformanceSection />;
              case 'demo-ai-insights':
                return <DemoAIInsightsSection />;
              default:
                return <DemoLandingPage onNavigate={handleSectionChange} />;
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

      {/* Footer with Developer Credits */}
      <footer className="relative z-10 text-white py-8 mt-16 bg-[#0A0A0A] border-t border-white/[0.04]">
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
              <p>Software Lifecycle Intelligence | <span className="text-blue-400">IntelliOps AI</span></p>
            </div>

            <div className="text-xs text-gray-500">
              <p>Enterprise Banking Intelligence Platform</p>
              <p>&copy; 2026 All rights reserved</p>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
