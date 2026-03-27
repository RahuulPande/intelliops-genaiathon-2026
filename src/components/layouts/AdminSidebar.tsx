'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import {
  Home, FileSearch, Code, Brain, Package, BookOpen,
  Activity, GraduationCap, Layers, Book, Settings, LogOut,
  ChevronLeft, ChevronRight,
} from 'lucide-react';

// ── Admin Sidebar — 260px / 64px collapsible (DESIGN.md v2.0) ──

interface AdminSidebarProps {
  currentSection: string;
  onSectionChange: (section: string) => void;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

// ── Navigation data (shortened labels) ──

interface AdminNavItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface AdminNavGroup {
  layerNumber: number;
  shortLabel: string;
  items: AdminNavItem[];
}

const adminNavGroups: AdminNavGroup[] = [
  {
    layerNumber: 0, shortLabel: 'PLAN',
    items: [{ id: 'plan-intelligence', label: 'Requirements', icon: FileSearch }],
  },
  {
    layerNumber: 1, shortLabel: 'BUILD',
    items: [{ id: 'build-intelligence', label: 'Changes', icon: Code }],
  },
  {
    layerNumber: 2, shortLabel: 'TEST',
    items: [{ id: 'test-quality-intelligence', label: 'Quality', icon: Brain }],
  },
  {
    layerNumber: 3, shortLabel: 'RELEASE',
    items: [
      { id: 'release-intelligence', label: 'Releases', icon: Package },
      { id: 'knowledge-base', label: 'Knowledge Base', icon: BookOpen },
    ],
  },
  {
    layerNumber: 4, shortLabel: 'OPERATE',
    items: [{ id: 'service-health-intelligence', label: 'Incidents', icon: Activity }],
  },
  {
    layerNumber: 5, shortLabel: 'LEARN',
    items: [{ id: 'learn-intelligence', label: 'Learnings', icon: GraduationCap }],
  },
];

const adminBottomItems: AdminNavItem[] = [
  { id: 'service-intelligence', label: 'Services', icon: Layers },
  { id: 'tech-docs', label: 'Docs', icon: Book },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export default function AdminSidebar({
  currentSection,
  onSectionChange,
  isCollapsed = false,
  onToggleCollapse,
}: AdminSidebarProps) {
  const { logout } = useAuth();

  // ── Expanded nav item ──
  const renderExpandedItem = (item: AdminNavItem) => {
    const isActive = currentSection === item.id;
    const Icon = item.icon;
    return (
      <button
        key={item.id}
        onClick={() => onSectionChange(item.id)}
        className={`w-full flex items-center gap-2.5 rounded-md transition-colors relative text-[13px] font-medium ${
          isActive
            ? 'text-white font-semibold'
            : 'text-neutral-300 hover:text-neutral-100 hover:bg-white/[0.06]'
        }`}
        style={{ padding: '7px 16px' }}
      >
        {isActive && (
          <motion.div
            layoutId="admin-sidebar-active"
            className="absolute left-0 top-1 bottom-1 w-[3px] rounded-r-full bg-brand"
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          />
        )}
        {isActive && (
          <div className="absolute inset-0 rounded-md bg-white/10" />
        )}
        <Icon className={`w-[18px] h-[18px] flex-shrink-0 relative z-10 ${isActive ? 'text-white' : 'text-neutral-500'}`} />
        <span className="relative z-10">{item.label}</span>
      </button>
    );
  };

  // ── Collapsed icon item with tooltip ──
  const renderCollapsedItem = (item: AdminNavItem) => {
    const isActive = currentSection === item.id;
    const Icon = item.icon;
    return (
      <div key={item.id} className="relative group">
        <button
          onClick={() => onSectionChange(item.id)}
          className={`relative w-10 h-9 flex items-center justify-center rounded-md transition-colors ${
            isActive
              ? 'text-white'
              : 'text-neutral-500 hover:text-neutral-300 hover:bg-white/[0.06]'
          }`}
        >
          {isActive && (
            <motion.div
              layoutId="admin-sidebar-active"
              className="absolute left-0 top-1 bottom-1 w-[3px] rounded-r-full bg-brand"
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            />
          )}
          {isActive && (
            <div className="absolute inset-0 rounded-md bg-white/10" />
          )}
          <Icon className="w-[18px] h-[18px] relative z-10" />
        </button>
        {/* Tooltip */}
        <div className="absolute left-full top-1/2 -translate-y-1/2 ml-3 px-2.5 py-1.5 bg-neutral-800 text-white text-xs font-medium rounded-md whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-[60] shadow-md pointer-events-none">
          {item.label}
          <div className="absolute right-full top-1/2 -translate-y-1/2 w-0 h-0 border-y-[5px] border-y-transparent border-r-[5px] border-r-neutral-800" />
        </div>
      </div>
    );
  };

  // ━━━━━━━━━ COLLAPSED LAYOUT ━━━━━━━━━
  if (isCollapsed) {
    return (
      <aside
        className="fixed left-0 top-0 h-full w-16 flex flex-col items-center z-40"
        style={{ backgroundColor: '#1A1A1A', borderRight: '1px solid rgba(255,255,255,0.08)' }}
      >
        {/* Logo + expand toggle */}
        <div className="flex-shrink-0 pt-2.5 pb-2 flex flex-col items-center gap-1">
          <div className="w-8 h-8 rounded-md flex items-center justify-center bg-brand">
            <span className="text-white text-xs font-bold">IO</span>
          </div>
          <button
            onClick={onToggleCollapse}
            className="w-7 h-7 flex items-center justify-center rounded-md text-neutral-500 hover:text-white hover:bg-white/10 transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="w-8 mx-auto" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }} />

        {/* Nav icons */}
        <nav className="flex-1 flex flex-col items-center py-2 gap-0.5 overflow-y-auto w-full px-2">
          {renderCollapsedItem({ id: 'platform-overview', label: 'Home', icon: Home })}

          <div className="w-8 my-1.5" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }} />

          {adminNavGroups.map((group) => (
            <div key={group.layerNumber} className="flex flex-col items-center gap-0.5">
              {group.items.map((item) => renderCollapsedItem(item))}
            </div>
          ))}

          <div className="w-8 my-1.5" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }} />

          {adminBottomItems.map((item) => renderCollapsedItem(item))}
        </nav>

        {/* Footer */}
        <div className="flex-shrink-0 py-3 flex flex-col items-center gap-2" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <div className="w-1.5 h-1.5 rounded-full bg-brand" />
          <div className="relative group">
            <button
              onClick={logout}
              className="w-9 h-9 flex items-center justify-center rounded-md text-neutral-500 hover:text-neutral-200 hover:bg-white/10 transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
            <div className="absolute left-full top-1/2 -translate-y-1/2 ml-3 px-2.5 py-1.5 bg-neutral-800 text-white text-xs font-medium rounded-md whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-[60] shadow-md pointer-events-none">
              Logout
              <div className="absolute right-full top-1/2 -translate-y-1/2 w-0 h-0 border-y-[5px] border-y-transparent border-r-[5px] border-r-neutral-800" />
            </div>
          </div>
        </div>
      </aside>
    );
  }

  // ━━━━━━━━━ EXPANDED LAYOUT ━━━━━━━━━
  return (
    <aside
      className="fixed left-0 top-0 h-full w-[260px] flex flex-col z-40"
      style={{ backgroundColor: '#1A1A1A', borderRight: '1px solid rgba(255,255,255,0.08)' }}
    >
      {/* Logo header */}
      <div
        className="flex items-center justify-between flex-shrink-0"
        style={{ height: '48px', padding: '0 12px 0 16px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}
      >
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-md flex items-center justify-center flex-shrink-0 bg-brand">
            <span className="text-white text-xs font-bold tracking-tight">IO</span>
          </div>
          <span className="text-white text-sm font-bold">IntelliOps AI</span>
        </div>
        <button
          onClick={onToggleCollapse}
          className="w-7 h-7 flex items-center justify-center rounded-md text-neutral-500 hover:text-white hover:bg-white/10 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-3">
        {/* Home */}
        <div className="px-2 mb-2">
          {renderExpandedItem({ id: 'platform-overview', label: 'Home', icon: Home })}
        </div>

        {/* Layer groups */}
        {adminNavGroups.map((group) => (
          <div key={group.layerNumber}>
            <div
              className="select-none text-[11px] font-semibold uppercase tracking-wider text-neutral-500"
              style={{ padding: '18px 16px 6px 16px' }}
            >
              L{group.layerNumber}&nbsp;&nbsp;{group.shortLabel}
            </div>
            <div className="px-2 space-y-0.5">
              {group.items.map((item) => renderExpandedItem(item))}
            </div>
          </div>
        ))}

        {/* Separator */}
        <div className="mx-4 my-4" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }} />

        {/* Utility items */}
        <div className="px-2 space-y-0.5">
          {adminBottomItems.map((item) => renderExpandedItem(item))}
        </div>
      </nav>

      {/* Footer */}
      <div
        className="flex-shrink-0 flex items-center justify-between"
        style={{ padding: '12px 16px', borderTop: '1px solid rgba(255,255,255,0.08)' }}
      >
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-brand" />
          <span className="text-[10px] text-neutral-500">Dev</span>
          <span className="text-[10px] text-neutral-600">v4.0.0</span>
        </div>
        <button
          onClick={logout}
          className="flex items-center gap-1.5 text-[13px] text-neutral-500 hover:text-neutral-200 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
