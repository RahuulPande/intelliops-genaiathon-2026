'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  ChevronRight,
  Zap,
  GitBranch,
  AlertCircle,
  Package,
  BookOpen,
  Settings,
  Clock,
  ArrowRight,
} from 'lucide-react';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (sectionId: string) => void;
}

interface CommandItem {
  id: string;
  name: string;
  category: 'Navigation' | 'Entity' | 'Service' | 'Action';
  sectionId?: string;
  icon?: React.ReactNode;
  description?: string;
}

// Search index data
const commandIndex: CommandItem[] = [
  // Navigation — All 6 SDLC Layers
  {
    id: 'nav-l0',
    name: 'L0 — Plan Intelligence',
    category: 'Navigation',
    sectionId: 'plan-intelligence',
    icon: <Zap className="w-4 h-4" />,
    description: 'Requirement analysis & risk detection',
  },
  {
    id: 'nav-l1',
    name: 'L1 — Build Intelligence',
    category: 'Navigation',
    sectionId: 'build-intelligence',
    icon: <GitBranch className="w-4 h-4" />,
    description: 'PR analysis & change impact',
  },
  {
    id: 'nav-l2',
    name: 'L2 — Test Intelligence',
    category: 'Navigation',
    sectionId: 'test-quality-intelligence',
    icon: <AlertCircle className="w-4 h-4" />,
    description: 'Test quality & defect analysis',
  },
  {
    id: 'nav-l3',
    name: 'L3 — Release Intelligence',
    category: 'Navigation',
    sectionId: 'release-intelligence',
    icon: <Package className="w-4 h-4" />,
    description: 'Deployment readiness & risk',
  },
  {
    id: 'nav-l4',
    name: 'L4 — Operate Intelligence',
    category: 'Navigation',
    sectionId: 'service-health-intelligence',
    icon: <AlertCircle className="w-4 h-4" />,
    description: 'Service health & incidents',
  },
  {
    id: 'nav-l5',
    name: 'L5 — Learn Intelligence',
    category: 'Navigation',
    sectionId: 'learn-intelligence',
    icon: <BookOpen className="w-4 h-4" />,
    description: 'Learning feedback & patterns',
  },
  {
    id: 'nav-docs',
    name: 'Technical Documentation',
    category: 'Navigation',
    sectionId: 'tech-docs',
    icon: <BookOpen className="w-4 h-4" />,
    description: 'Platform architecture & APIs',
  },
  {
    id: 'nav-settings',
    name: 'Settings & Administration',
    category: 'Navigation',
    sectionId: 'settings',
    icon: <Settings className="w-4 h-4" />,
    description: 'User settings & admin controls',
  },

  // Entities — PRs
  {
    id: 'ent-pr-4521',
    name: 'PR-4521 — Add payment retry logic',
    category: 'Entity',
    sectionId: 'build-intelligence',
    icon: <GitBranch className="w-4 h-4" />,
  },
  {
    id: 'ent-pr-4522',
    name: 'PR-4522 — Update auth docs',
    category: 'Entity',
    sectionId: 'build-intelligence',
    icon: <GitBranch className="w-4 h-4" />,
  },
  {
    id: 'ent-pr-4523',
    name: 'PR-4523 — Refactor core ledger logic',
    category: 'Entity',
    sectionId: 'build-intelligence',
    icon: <GitBranch className="w-4 h-4" />,
  },

  // Entities — Incidents
  {
    id: 'ent-inc-2024-001',
    name: 'INC-2024-001 — Payment service error spike',
    category: 'Entity',
    sectionId: 'service-health-intelligence',
    icon: <AlertCircle className="w-4 h-4" />,
  },
  {
    id: 'ent-inc-2024-002',
    name: 'INC-2024-002 — Portfolio engine latency',
    category: 'Entity',
    sectionId: 'service-health-intelligence',
    icon: <AlertCircle className="w-4 h-4" />,
  },

  // Entities — Requirements
  {
    id: 'ent-req-101',
    name: 'REQ-101 — Multi-currency support',
    category: 'Entity',
    sectionId: 'plan-intelligence',
    icon: <Zap className="w-4 h-4" />,
  },
  {
    id: 'ent-req-201',
    name: 'REQ-201 — Enhanced KYC workflows',
    category: 'Entity',
    sectionId: 'plan-intelligence',
    icon: <Zap className="w-4 h-4" />,
  },
  {
    id: 'ent-req-301',
    name: 'REQ-301 — Real-time portfolio analytics',
    category: 'Entity',
    sectionId: 'plan-intelligence',
    icon: <Zap className="w-4 h-4" />,
  },

  // Services
  {
    id: 'svc-payment',
    name: 'payment-service',
    category: 'Service',
    description: 'Payment processing & transactions',
    icon: <Package className="w-4 h-4" />,
  },
  {
    id: 'svc-portfolio',
    name: 'portfolio-engine',
    category: 'Service',
    description: 'Portfolio analytics & management',
    icon: <Package className="w-4 h-4" />,
  },
  {
    id: 'svc-auth',
    name: 'auth-gateway',
    category: 'Service',
    description: 'Authentication & authorization',
    icon: <Package className="w-4 h-4" />,
  },
  {
    id: 'svc-kyc',
    name: 'kyc-service',
    category: 'Service',
    description: 'Know-Your-Customer verification',
    icon: <Package className="w-4 h-4" />,
  },

  // Cross-Layer
  {
    id: 'nav-service-intelligence',
    name: 'Service Intelligence Dashboard',
    category: 'Navigation',
    sectionId: 'service-intelligence',
    icon: <Package className="w-4 h-4" />,
    description: 'Unified cross-layer service view',
  },

  // Actions
  {
    id: 'act-demo-tour',
    name: 'Start Guided Demo Tour',
    category: 'Action',
    description: 'Walk through IntelliOps key features',
    icon: <Zap className="w-4 h-4" />,
  },
  {
    id: 'act-ask-intelliops',
    name: 'Ask IntelliOps',
    category: 'Action',
    description: 'Open AI assistant chat panel (⌘I)',
    icon: <Zap className="w-4 h-4" />,
  },
  {
    id: 'act-regen-summary',
    name: 'Regenerate AI Summary',
    category: 'Action',
    description: 'Recompute intelligent summaries',
    icon: <Zap className="w-4 h-4" />,
  },
  {
    id: 'act-integrations',
    name: 'View Integrations',
    category: 'Action',
    description: 'Connected systems & APIs',
    icon: <ArrowRight className="w-4 h-4" />,
  },
  {
    id: 'act-docs',
    name: 'Open Tech Docs',
    category: 'Action',
    sectionId: 'tech-docs',
    description: 'API reference & guides',
    icon: <BookOpen className="w-4 h-4" />,
  },
];

// Fuzzy search helper
function fuzzyMatch(query: string, text: string): number {
  const q = query.toLowerCase();
  const t = text.toLowerCase();

  if (t.includes(q)) return 2; // Exact substring match
  if (t.startsWith(q)) return 1.5; // Starts with match

  let score = 0;
  let qIdx = 0;
  for (let i = 0; i < t.length && qIdx < q.length; i++) {
    if (t[i] === q[qIdx]) {
      score += 1;
      qIdx++;
    }
  }
  return qIdx === q.length ? score / t.length : 0;
}

export default function CommandPalette({
  isOpen,
  onClose,
  onNavigate,
}: CommandPaletteProps) {
  const [input, setInput] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  // Search results
  const results = useMemo(() => {
    if (!input.trim()) {
      return [];
    }

    return commandIndex
      .map((item) => ({
        ...item,
        score: fuzzyMatch(input, item.name),
      }))
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 20);
  }, [input]);

  // Group results by category
  const groupedResults = useMemo(() => {
    const groups: Record<string, typeof results> = {};
    results.forEach((item) => {
      if (!groups[item.category]) {
        groups[item.category] = [];
      }
      groups[item.category].push(item);
    });
    return groups;
  }, [results]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex((prev) => (prev + 1) % results.length);
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex((prev) => (prev - 1 + results.length) % results.length);
          break;
        case 'Enter':
          e.preventDefault();
          if (results[selectedIndex]) {
            handleSelect(results[selectedIndex]);
          }
          break;
        case 'Escape':
          e.preventDefault();
          onClose();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, results, selectedIndex, onClose]);

  // Handle item selection
  const handleSelect = (item: CommandItem) => {
    // Add to recent searches
    setRecentSearches((prev) => [item.name, ...prev.filter((s) => s !== item.name)].slice(0, 3));

    // Navigate if available
    if (item.sectionId) {
      onNavigate(item.sectionId);
    }

    // Close palette
    setInput('');
    setSelectedIndex(0);
    onClose();
  };

  // Calculate displayed results
  const displayedResults = input.trim() ? results : [];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh]"
          >
            <div className="w-full max-w-xl bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden">
              {/* Input */}
              <div className="flex items-center gap-3 px-4 py-4 border-b border-gray-200 dark:border-gray-700">
                <Search className="w-5 h-5 text-gray-400" />
                <input
                  autoFocus
                  type="text"
                  value={input}
                  onChange={(e) => {
                    setInput(e.target.value);
                    setSelectedIndex(0);
                  }}
                  placeholder="Search layers, entities, services..."
                  className="flex-1 bg-transparent text-lg outline-none text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                />
              </div>

              {/* Results or Quick Navigation */}
              <div className="max-h-96 overflow-y-auto">
                {displayedResults.length > 0 ? (
                  // Search Results
                  <div>
                    {(['Navigation', 'Entity', 'Service', 'Action'] as const).map(
                      (category) => {
                        const items = groupedResults[category];
                        if (!items || items.length === 0) return null;

                        return (
                          <div key={category}>
                            {/* Category Header */}
                            <div className="px-4 py-2 text-xs uppercase font-bold text-gray-500 dark:text-gray-500 bg-gray-50 dark:bg-gray-900/20">
                              {category}
                            </div>

                            {/* Category Items */}
                            {items.map((item, idx) => {
                              const globalIdx = results.indexOf(item);
                              const isSelected = globalIdx === selectedIndex;

                              return (
                                <motion.button
                                  key={item.id}
                                  onClick={() => handleSelect(item)}
                                  className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                                    isSelected
                                      ? 'bg-blue-50 dark:bg-blue-900/20'
                                      : 'hover:bg-gray-50 dark:hover:bg-gray-700/50'
                                  }`}
                                >
                                  <div className="flex-shrink-0 text-gray-400">
                                    {item.icon}
                                  </div>

                                  <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                      {item.name}
                                    </p>
                                    {item.description && (
                                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                                        {item.description}
                                      </p>
                                    )}
                                  </div>

                                  {isSelected && (
                                    <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
                                  )}
                                </motion.button>
                              );
                            })}
                          </div>
                        );
                      }
                    )}
                  </div>
                ) : (
                  // Empty State with Quick Navigation or Recent Searches
                  <div className="p-6">
                    {recentSearches.length > 0 ? (
                      <div>
                        {/* Recent Searches */}
                        <div className="mb-6">
                          <h3 className="text-xs uppercase font-bold text-gray-500 dark:text-gray-500 mb-3 flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            Recent Searches
                          </h3>
                          <div className="space-y-2">
                            {recentSearches.map((search) => (
                              <button
                                key={search}
                                onClick={() => {
                                  const item = commandIndex.find(
                                    (i) => i.name === search
                                  );
                                  if (item) handleSelect(item);
                                }}
                                className="w-full text-left px-3 py-2 text-sm text-gray-600 dark:text-gray-400 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                              >
                                {search}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Quick Navigation */}
                        <h3 className="text-xs uppercase font-bold text-gray-500 dark:text-gray-500 mb-3">
                          Quick Navigation
                        </h3>
                        <div className="grid grid-cols-2 gap-2">
                          {commandIndex
                            .filter((i) => i.category === 'Navigation')
                            .slice(0, 6)
                            .map((item) => (
                              <button
                                key={item.id}
                                onClick={() => handleSelect(item)}
                                className="text-left px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 rounded bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                              >
                                {item.name}
                              </button>
                            ))}
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-4">
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                          Start typing to search...
                        </p>
                        <div>
                          <h3 className="text-xs uppercase font-bold text-gray-500 dark:text-gray-500 mb-3 text-left">
                            Quick Navigation
                          </h3>
                          <div className="grid grid-cols-2 gap-2">
                            {commandIndex
                              .filter((i) => i.category === 'Navigation')
                              .slice(0, 6)
                              .map((item) => (
                                <button
                                  key={item.id}
                                  onClick={() => handleSelect(item)}
                                  className="text-left px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 rounded bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                                >
                                  {item.name}
                                </button>
                              ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-700 text-[11px] text-gray-500 dark:text-gray-500 flex items-center justify-between">
                <span>Press ESC to close</span>
                <span>↑↓ Navigate • ↵ Select</span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
