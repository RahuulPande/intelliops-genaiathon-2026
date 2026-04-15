'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMobileResponsive, useSwipeGestures } from '@/lib/hooks/useMobileResponsive';
import {
  Home, Activity, Brain, Package, Settings, Book, BookOpen, Menu, X,
  ChevronLeft, ChevronRight, ChevronDown, Layers, Lock, LogOut,
  FileSearch, Code, GraduationCap, TestTube, BarChart3, Zap, Sparkles
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

// ── Types ──────────────────────────────────────────────

export interface NavigationSection {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
  path: string;
  description: string;
}

export interface NavigationGroup {
  id: string;
  label: string;
  layerNumber: number;
  colorFrom: string;
  colorTo: string;
  badgeBg: string;
  badgeText: string;
  accentColor: string;
  icon: React.ComponentType<any>;
  integrations: string[];
  sections: NavigationSection[];
}

// ── Navigation Data ────────────────────────────────────

const topLevelSections: NavigationSection[] = [
  {
    id: 'platform-overview',
    name: 'Home',
    icon: Home,
    path: '/',
    description: 'Landing Page'
  }
];

const navigationGroups: NavigationGroup[] = [
  {
    id: 'plan-intelligence',
    label: 'Plan Intelligence',
    layerNumber: 0,
    colorFrom: 'from-teal-500',
    colorTo: 'to-cyan-600',
    badgeBg: 'bg-teal-100 dark:bg-teal-900/40',
    badgeText: 'text-teal-700 dark:text-teal-300',
    accentColor: 'bg-teal-600',
    icon: FileSearch,
    integrations: ['JIRA', 'Confluence', 'NLP', 'RAG'],
    sections: [
      { id: 'plan-intelligence', name: 'Requirement Intelligence', icon: FileSearch,
        path: '/plan/requirement-intelligence', description: 'AI-powered requirement analysis' }
    ]
  },
  {
    id: 'build-intelligence',
    label: 'Build Intelligence',
    layerNumber: 1,
    colorFrom: 'from-indigo-500',
    colorTo: 'to-cyan-600',
    badgeBg: 'bg-indigo-100 dark:bg-indigo-900/40',
    badgeText: 'text-indigo-700 dark:text-indigo-300',
    accentColor: 'bg-indigo-600',
    icon: Code,
    integrations: ['GitHub', 'GitLab', 'Jenkins', 'NLP'],
    sections: [
      { id: 'build-intelligence', name: 'Change Intelligence', icon: Code,
        path: '/build/change-intelligence', description: 'AI-powered PR risk & impact analysis' }
    ]
  },
  {
    id: 'test-intelligence',
    label: 'Test Intelligence',
    layerNumber: 2,
    colorFrom: 'from-purple-500',
    colorTo: 'to-indigo-600',
    badgeBg: 'bg-purple-100 dark:bg-purple-900/40',
    badgeText: 'text-purple-700 dark:text-purple-300',
    accentColor: 'bg-purple-600',
    icon: Brain,
    integrations: ['JIRA', 'TestRail', 'RAG', 'NLP'],
    sections: [
      { id: 'test-quality-intelligence', name: 'Test & Quality Intelligence', icon: Brain,
        path: '/test/quality', description: 'AI-powered quality assurance' }
    ]
  },
  {
    id: 'release-intelligence',
    label: 'Release Intelligence',
    layerNumber: 3,
    colorFrom: 'from-rose-500',
    colorTo: 'to-pink-600',
    badgeBg: 'bg-rose-100 dark:bg-rose-900/40',
    badgeText: 'text-rose-700 dark:text-rose-300',
    accentColor: 'bg-rose-600',
    icon: Package,
    integrations: ['Jenkins', 'GitHub', 'ML', 'LLM'],
    sections: [
      { id: 'release-intelligence', name: 'Release Intelligence', icon: Package,
        path: '/release/risk', description: 'Deployment risk assessment' }
    ]
  },
  {
    id: 'operate-intelligence',
    label: 'Operate Intelligence',
    layerNumber: 4,
    colorFrom: 'from-blue-500',
    colorTo: 'to-cyan-600',
    badgeBg: 'bg-blue-100 dark:bg-blue-900/40',
    badgeText: 'text-blue-700 dark:text-blue-300',
    accentColor: 'bg-blue-600',
    icon: Activity,
    integrations: ['Splunk', 'ServiceNow', 'Dynatrace'],
    sections: [
      { id: 'service-health-intelligence', name: 'Service Health & Incidents', icon: Activity,
        path: '/operate/service-health', description: 'Real-time monitoring & incident detection' }
    ]
  },
  {
    id: 'learn-intelligence',
    label: 'Learn Intelligence',
    layerNumber: 5,
    colorFrom: 'from-emerald-500',
    colorTo: 'to-green-600',
    badgeBg: 'bg-emerald-100 dark:bg-emerald-900/40',
    badgeText: 'text-emerald-700 dark:text-emerald-300',
    accentColor: 'bg-emerald-600',
    icon: GraduationCap,
    integrations: ['RAG', 'LLM', 'ML', 'Feedback Loop'],
    sections: [
      { id: 'learn-intelligence', name: 'Learning Intelligence', icon: GraduationCap,
        path: '/learn/intelligence', description: 'Self-learning feedback loop & continuous improvement' },
      { id: 'knowledge-base', name: 'Application Knowledge Base', icon: BookOpen,
        path: '/learn/knowledge-base', description: 'Institutional knowledge from defects & releases' }
    ]
  }
];

const bottomSections: NavigationSection[] = [
  {
    id: 'service-intelligence',
    name: 'Service Intelligence',
    icon: Layers,
    path: '/service-intelligence',
    description: 'Unified cross-layer service view'
  },
  {
    id: 'tech-docs',
    name: 'Technical Documentation',
    icon: Book,
    path: '/tech-docs',
    description: 'Architecture guides & API references'
  },
  {
    id: 'settings',
    name: 'Settings & Administration',
    icon: Settings,
    path: '/settings',
    description: 'Platform configuration'
  }
];

// ── Demo Mode Navigation (simplified — only accessible sections) ──

const demoNavigationGroups: NavigationGroup[] = [
  {
    id: 'delivery-intelligence',
    label: 'Delivery Intelligence',
    layerNumber: 1,
    colorFrom: 'from-purple-500',
    colorTo: 'to-indigo-600',
    badgeBg: 'bg-purple-100 dark:bg-purple-900/40',
    badgeText: 'text-purple-700 dark:text-purple-300',
    accentColor: 'bg-purple-600',
    icon: Brain,
    integrations: ['JIRA', 'TestRail', 'RAG', 'NLP', 'ML', 'LLM'],
    sections: [
      { id: 'demo-defect-intelligence', name: 'Defect Intelligence', icon: Brain,
        path: '/test/defects', description: 'AI defect matching & analytics' },
      { id: 'demo-test-management', name: 'Test Intelligence', icon: TestTube,
        path: '/test/management', description: '6 AI-powered test capabilities' },
      { id: 'release-intelligence', name: 'Release Intelligence', icon: Package,
        path: '/release/risk', description: 'Release risk & deployment' },
      { id: 'knowledge-base', name: 'Knowledge Base', icon: BookOpen,
        path: '/release/knowledge-base', description: 'Institutional knowledge' },
    ]
  }
];

const demoBottomSections: NavigationSection[] = [
  {
    id: 'tech-docs',
    name: 'Technical Documentation',
    icon: Book,
    path: '/tech-docs',
    description: 'Architecture guides & API references'
  },
  {
    id: 'settings',
    name: 'Settings & Administration',
    icon: Settings,
    path: '/settings',
    description: 'Platform configuration'
  }
];

// ── Component ──────────────────────────────────────────

interface SidebarProps {
  currentSection: string;
  onSectionChange: (section: string) => void;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

export default function Sidebar({
  currentSection,
  onSectionChange,
  isCollapsed = false,
  onToggleCollapse
}: SidebarProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [collapsedGroups, setCollapsedGroups] = useState<Set<string>>(new Set());
  const [showLockedModal, setShowLockedModal] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const mobileState = useMobileResponsive();
  const { isAdmin, logout } = useAuth();

  // Role-based layer access: admin unlocks all layers; demo gets Delivery Intelligence group
  const isLayerAccessible = (groupId: string): boolean => {
    if (isAdmin) return true;
    return groupId === 'test-intelligence' || groupId === 'release-intelligence' || groupId === 'delivery-intelligence';
  };

  const { touchEventHandlers } = useSwipeGestures({
    onSwipeLeft: () => {
      if (mobileState.isMobile && isMobileOpen) setIsMobileOpen(false);
    },
    onSwipeRight: () => {
      if (mobileState.isMobile && !isMobileOpen) setIsMobileOpen(true);
    },
    minSwipeDistance: 50
  });

  // Locked section IDs — admin unlocks all; demo locks L0/L1/L4/L5
  const lockedSections = isAdmin ? new Set<string>() : new Set(['plan-intelligence', 'build-intelligence', 'service-health-intelligence', 'learn-intelligence', 'service-intelligence']);

  const handleSectionClick = (sectionId: string) => {
    if (lockedSections.has(sectionId)) {
      setShowLockedModal(true);
      return;
    }
    onSectionChange(sectionId);
    setIsMobileOpen(false);
  };

  const toggleGroup = (groupId: string) => {
    setCollapsedGroups(prev => {
      const next = new Set(prev);
      if (next.has(groupId)) next.delete(groupId);
      else next.add(groupId);
      return next;
    });
  };

  // Check if any section in a group is active
  const isGroupActive = (group: NavigationGroup) =>
    group.sections.some(s => s.id === currentSection);

  // ── Render a single nav item (admin / light mode) ──
  const renderNavItem = (section: NavigationSection, accentColor?: string, locked?: boolean) => {
    const isActive = currentSection === section.id;
    const IconComponent = section.icon;
    const accent = accentColor || 'bg-blue-600';

    // Demo mode: use dark sidebar styling, no subtitles, never locked
    if (!isAdmin) {
      return (
        <motion.button
          key={section.id}
          data-section={section.id}
          onClick={() => handleSectionClick(section.id)}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          className={`w-full text-left px-3 py-1.5 rounded-lg transition-all duration-200 group relative ${
            isActive
              ? 'bg-white/10 text-white border-l-[3px] border-l-[#E8553A]'
              : 'text-white/65 hover:text-white/85 hover:bg-white/5'
          }`}
        >
          <div className="flex items-center space-x-2.5">
            <IconComponent className={`w-[15px] h-[15px] flex-shrink-0 ${isActive ? 'text-[#E8553A]' : 'text-white/40'}`} />
            {!isCollapsed && (
              <span className="text-[13px] font-medium leading-tight">{section.name}</span>
            )}
          </div>
        </motion.button>
      );
    }

    return (
      <motion.button
        key={section.id}
        data-section={section.id}
        onClick={() => handleSectionClick(section.id)}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
        className={`w-full text-left p-2.5 rounded-lg transition-all duration-200 group relative ${
          locked
            ? 'opacity-50 text-gray-400 dark:text-gray-600'
            : isActive
              ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800'
              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
        }`}
      >
        <div className="flex items-center space-x-3">
          <div className={`p-1.5 rounded-md ${
            locked
              ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600'
              : isActive
                ? 'bg-blue-100 dark:bg-blue-800 text-blue-600 dark:text-blue-300'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 group-hover:bg-gray-200 dark:group-hover:bg-gray-600'
          }`}>
            {locked ? <Lock className="w-4 h-4" /> : <IconComponent className="w-4 h-4" />}
          </div>

          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="flex-1 min-w-0"
            >
              <div className="font-medium text-sm leading-tight">{section.name}</div>
              <div className="text-xs text-gray-500 dark:text-gray-500 truncate mt-0.5">
                {locked ? 'Upgrade to access' : section.description}
              </div>
            </motion.div>
          )}
        </div>

        {/* Active Indicator */}
        {isActive && !locked && (
          <motion.div
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            className={`absolute left-0 top-2 bottom-2 w-1 ${accent} rounded-r-full`}
          />
        )}
      </motion.button>
    );
  };

  // ── Render a layer group header ──
  const renderGroupHeader = (group: NavigationGroup) => {
    const isExpanded = !collapsedGroups.has(group.id);
    const hasActiveChild = isGroupActive(group);
    const locked = isAdmin ? !isLayerAccessible(group.id) : false;

    // Demo mode: dark sidebar, no L badge, no integration tags, no lock icons
    if (!isAdmin) {
      return (
        <div key={group.id} className="mt-2 first:mt-0">
          {!isCollapsed ? (
            <>
              <div className="px-3 py-1.5">
                <span className="text-[10px] font-semibold text-white/30 uppercase tracking-wider">
                  {group.label}
                </span>
              </div>
              <div className="space-y-0.5">
                {group.sections.map(section => renderNavItem(section, group.accentColor, false))}
              </div>
            </>
          ) : (
            <div className="space-y-0.5">
              {group.sections.map(section => renderNavItem(section, group.accentColor, false))}
            </div>
          )}
        </div>
      );
    }

    // Admin mode: full group header with L badge, integration tags, collapsible
    return (
      <div key={group.id} className="mt-3 first:mt-0">
        {!isCollapsed ? (
          <>
            <button
              onClick={() => toggleGroup(group.id)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-colors ${
                locked
                  ? 'opacity-60'
                  : hasActiveChild
                    ? 'bg-gray-100 dark:bg-gray-800'
                    : 'hover:bg-gray-50 dark:hover:bg-gray-800/50'
              }`}
            >
              <div className="flex items-center space-x-2 min-w-0">
                <span className={`inline-flex items-center justify-center w-5 h-5 rounded text-[10px] font-bold ${group.badgeBg} ${group.badgeText}`}>
                  {`L${group.layerNumber}`}
                </span>
                <span className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider truncate">
                  {group.label}
                </span>
                {locked && <Lock className="w-3 h-3 text-gray-400 dark:text-gray-600 flex-shrink-0" />}
              </div>
              <ChevronDown className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-200 flex-shrink-0 ${
                isExpanded ? '' : '-rotate-90'
              }`} />
            </button>

            {/* Integration tags — admin only */}
            {isExpanded && (
              <div className="flex flex-wrap gap-1 px-3 mt-1 mb-1.5">
                {group.integrations.map(tool => (
                  <span key={tool} className={`inline-block px-1.5 py-0.5 text-[9px] font-medium bg-gray-100 dark:bg-gray-800 rounded ${
                    locked ? 'text-gray-400 dark:text-gray-600' : 'text-gray-500 dark:text-gray-500'
                  }`}>
                    {tool}
                  </span>
                ))}
              </div>
            )}

            {/* Section items */}
            <AnimatePresence initial={false}>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="space-y-0.5 pl-1">
                    {group.sections.map(section => renderNavItem(section, group.accentColor, locked))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        ) : (
          // Collapsed: show only icons with a colored left border for active group
          <div className={`space-y-0.5 ${hasActiveChild ? 'border-l-2 ' + group.accentColor : ''} pl-0.5`}>
            {group.sections.map(section => renderNavItem(section, group.accentColor, locked))}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      {/* Mobile/Tablet Menu Button */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="p-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile/Tablet Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="md:hidden fixed inset-0 bg-black/50 z-40"
            onClick={() => setIsMobileOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        ref={sidebarRef}
        initial={false}
        animate={{
          width: isCollapsed ? '4rem' : '17rem',
          x: isMobileOpen ? 0 : (isCollapsed ? 0 : 0)
        }}
        className={`fixed left-0 top-0 h-full shadow-lg z-40 transition-all duration-300 flex flex-col ${
          isAdmin
            ? 'bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800'
            : 'bg-[#1A1A1A] border-r border-white/[0.06]'
        } ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        } ${mobileState.isMobile ? 'touch-pan-x' : ''}`}
      >
        {/* Header */}
        <div className={`flex-shrink-0 ${
          isAdmin
            ? 'p-4 border-b border-gray-200 dark:border-gray-800'
            : 'px-4 py-3 border-b border-white/[0.06]'
        }`}>
          <div className="flex items-center justify-between">
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center space-x-2"
              >
                <div className={`${isAdmin ? 'w-8 h-8' : 'w-7 h-7'} bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center`}>
                  <Layers className={`${isAdmin ? 'w-5 h-5' : 'w-4 h-4'} text-white`} />
                </div>
                <div>
                  <h1 className={`${isAdmin ? 'text-base' : 'text-sm'} font-bold ${isAdmin ? 'text-gray-900 dark:text-white' : 'text-white'}`}>IntelliOps AI</h1>
                  <p className={`text-[10px] ${isAdmin ? 'text-gray-500 dark:text-gray-500' : 'text-white/50'}`}>Software Lifecycle Intelligence</p>
                </div>
              </motion.div>
            )}

            {/* Collapse Toggle (Desktop and Tablet) */}
            <div className="hidden md:block">
              <button
                onClick={onToggleCollapse}
                className={`p-1.5 rounded-lg transition-colors ${
                  isAdmin
                    ? 'hover:bg-gray-100 dark:hover:bg-gray-800'
                    : 'hover:bg-white/10'
                }`}
              >
                {isCollapsed ?
                  <ChevronRight className={`w-4 h-4 ${isAdmin ? 'text-gray-500' : 'text-white/40'}`} /> :
                  <ChevronLeft className={`w-4 h-4 ${isAdmin ? 'text-gray-500' : 'text-white/40'}`} />
                }
              </button>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className={`flex-1 overflow-y-auto scrollbar-thin ${isAdmin ? 'p-2' : 'px-2 py-1.5'}`}>
          {/* Top-level sections */}
          <div className="space-y-0.5">
            {topLevelSections.map(section => renderNavItem(section))}
          </div>

          {/* Divider */}
          <div className={`mx-2 border-t ${isAdmin ? 'my-3 border-gray-200 dark:border-gray-800' : 'my-2 border-white/[0.06]'}`} />

          {/* Layer groups */}
          <div className="space-y-1">
            {(isAdmin ? navigationGroups : demoNavigationGroups).map(group => renderGroupHeader(group))}
          </div>

          {/* Divider */}
          <div className={`mx-2 border-t ${isAdmin ? 'my-3 border-gray-200 dark:border-gray-800' : 'my-2 border-white/[0.06]'}`} />

          {/* Bottom sections */}
          <div className="space-y-0.5">
            {(isAdmin ? bottomSections : demoBottomSections).map(section => renderNavItem(section))}
          </div>
        </nav>

        {/* Footer */}
        <div className={`flex-shrink-0 ${
          isAdmin
            ? 'p-3 border-t border-gray-200 dark:border-gray-800'
            : 'px-3 py-2 border-t border-white/[0.06]'
        }`}>
          {/* Mode Badge */}
          {!isCollapsed && (
            <div className={`flex items-center justify-center gap-1.5 px-2 py-1 rounded-md mb-1.5 text-[10px] font-semibold tracking-wide ${
              isAdmin
                ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-700/50'
                : 'text-blue-400 bg-blue-400/10 border border-blue-400/20'
            }`}>
              {isAdmin ? 'Development Mode' : 'Demo Mode'}
            </div>
          )}
          <button
            onClick={logout}
            className={`w-full flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors mb-1 ${
              isAdmin
                ? 'text-gray-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 dark:hover:text-red-400'
                : 'text-white/40 hover:text-white/70 hover:bg-white/5'
            } ${isCollapsed ? 'justify-center' : ''}`}
            title="Logout"
          >
            <LogOut className="w-3.5 h-3.5 flex-shrink-0" />
            {!isCollapsed && <span className="text-xs font-medium">Logout</span>}
          </button>
          {!isCollapsed && (
            <div className="text-center">
              <div className={`text-[9px] ${isAdmin ? 'text-gray-400 dark:text-gray-600' : 'text-white/20'}`}>
                IntelliOps AI v4.0.0
              </div>
            </div>
          )}
        </div>
      </motion.aside>

      {/* Main Content Spacer */}
      <div className={`transition-all duration-300 ${
        isCollapsed ? 'md:ml-16' : 'md:ml-[17rem]'
      } ml-0`}>
      </div>

      {/* Coming Soon Modal */}
      <AnimatePresence>
        {showLockedModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4"
            onClick={() => setShowLockedModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-md w-full shadow-2xl border border-gray-200 dark:border-gray-700"
            >
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                  <Lock className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Coming Soon</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                  This capability is part of the IntelliOps future roadmap. For this demo, we are focusing on
                  AI-powered Delivery Intelligence.
                </p>
                <button
                  onClick={() => setShowLockedModal(false)}
                  className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg transition-shadow"
                >
                  Got it
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
