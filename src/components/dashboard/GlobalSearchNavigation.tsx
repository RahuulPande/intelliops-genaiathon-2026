'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Command,
  ArrowRight,
  Clock,
  Star,
  Filter,
  X,
  Zap,
  Activity,
  AlertTriangle,
  Settings,
  BarChart3,
  FileText,
  Users,
  Database,
  Monitor,
  Shield,
  Package,
  Brain,
  Home,
  RefreshCw,
  Download,
  Plus,
  Edit,
  Trash2,
  Eye,
  Copy,
  ExternalLink,
  Bell
} from 'lucide-react';
import useDashboardStore from '@/store/dashboard';
import { SearchResult } from '@/lib/types';



interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: any;
  shortcut?: string;
  category: 'navigation' | 'data' | 'configuration' | 'help';
  action: () => void;
}

export default function GlobalSearchNavigation() {
  const { 
    isSearchOpen,
    setSearchOpen,
    searchResults,
    updateSearchResults,
    searchHistory,
    addSearchHistory,
    clearSearchHistory,
    quickActions,
    setQuickActions,
    services,
    incidents,
    insights
  } = useDashboardStore();

  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [recentItems, setRecentItems] = useState<SearchResult[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Mock search data
  const allSearchableItems = useMemo((): SearchResult[] => [
    // Pages/Navigation
    {
      id: 'nav-overview',
      type: 'page',
      title: 'Overview Dashboard',
      description: 'Executive summary and key metrics',
      category: 'Navigation',
      relevance: 1,
      icon: Home,
      url: '/overview',
      keywords: ['dashboard', 'overview', 'summary', 'metrics']
    },
    {
      id: 'nav-services',
      type: 'page',
      title: 'Service Health',
      description: 'Monitor service status and performance',
      category: 'Navigation',
      relevance: 1,
      icon: Activity,
      url: '/service-health-intelligence',
      keywords: ['services', 'health', 'status', 'performance']
    },
    {
      id: 'nav-incidents',
      type: 'page',
      title: 'Incidents & Alerts',
      description: 'Manage incidents and alerts',
      category: 'Navigation',
      relevance: 1,
      icon: AlertTriangle,
      url: '/incidents-alerts',
      keywords: ['incidents', 'alerts', 'issues', 'problems']
    },
    {
      id: 'nav-ai',
      type: 'page',
      title: 'Intelligent Test & Quality Management',
      description: 'AI-powered quality assurance across the entire software delivery lifecycle',
      category: 'Navigation',
      relevance: 1,
      icon: Brain,
      url: '/test-quality-intelligence',
      keywords: ['test management', 'quality assurance', 'defect matching', 'ai intelligence', 'test execution', 'quality insights', 'performance testing', 'qa automation']
    },
    {
      id: 'nav-analytics',
      type: 'page',
      title: 'Business Intelligence & Analytics',
      description: 'Transform operational data into strategic business insights',
      category: 'Navigation',
      relevance: 1,
      icon: BarChart3,
      url: '/business-intelligence',
      keywords: ['analytics', 'business intelligence', 'performance', 'cost', 'metrics', 'financial', 'operational', 'executive', 'reports']
    },
    {
      id: 'nav-settings',
      type: 'page',
      title: 'Settings',
      description: 'Configuration and preferences',
      category: 'Navigation',
      relevance: 1,
      icon: Settings,
      url: '/settings',
      keywords: ['settings', 'configuration', 'preferences']
    },

    // Services
    {
      id: 'service-payment',
      type: 'service',
      title: 'Payment Gateway API',
      description: 'Handles payment processing and transactions',
      category: 'Services',
      relevance: 0.9,
      icon: Database,
      metadata: { status: 'healthy', responseTime: 245 },
      keywords: ['payment', 'gateway', 'api', 'transactions']
    },
    {
      id: 'service-auth',
      type: 'service',
      title: 'Authentication Service',
      description: 'User authentication and authorization',
      category: 'Services',
      relevance: 0.9,
      icon: Shield,
      metadata: { status: 'healthy', responseTime: 120 },
      keywords: ['auth', 'authentication', 'login', 'security']
    },
    {
      id: 'service-notification',
      type: 'service',
      title: 'Notification Service',
      description: 'Email and push notification delivery',
      category: 'Services',
      relevance: 0.8,
      icon: Bell,
      metadata: { status: 'degraded', responseTime: 890 },
      keywords: ['notifications', 'email', 'push', 'alerts']
    },

    // Incidents
    {
      id: 'incident-001',
      type: 'incident',
      title: 'Payment Gateway Timeout',
      description: 'High response times causing transaction failures',
      category: 'Incidents',
      relevance: 0.95,
      icon: AlertTriangle,
      metadata: { severity: 'high', status: 'investigating', affectedUsers: 1250 },
      keywords: ['payment', 'timeout', 'failures', 'transactions']
    },
    {
      id: 'incident-002',
      type: 'incident',
      title: 'Database Connection Pool Exhausted',
      description: 'Too many concurrent connections to primary database',
      category: 'Incidents',
      relevance: 0.9,
      icon: Database,
      metadata: { severity: 'critical', status: 'resolving', affectedUsers: 5000 },
      keywords: ['database', 'connection', 'pool', 'exhausted']
    },

    // AI Insights
    {
      id: 'insight-001',
      type: 'insight',
      title: 'Capacity Warning Predicted',
      description: 'Payment API likely to reach capacity in 6 hours',
      category: 'AI Insights',
      relevance: 0.87,
      icon: Brain,
      metadata: { confidence: 87, priority: 'high', timeframe: '6 hours' },
      keywords: ['capacity', 'prediction', 'payment', 'api']
    },
    {
      id: 'insight-002',
      type: 'insight',
      title: 'Cost Optimization Opportunity',
      description: 'Scale down Dev environment during off-hours',
      category: 'AI Insights',
      relevance: 0.82,
      icon: Brain,
      metadata: { confidence: 92, savings: '$2,400/month', difficulty: 'easy' },
      keywords: ['cost', 'optimization', 'dev', 'environment']
    }
  ], []);

  // Mock quick actions
  const mockQuickActions = useMemo((): QuickAction[] => [
    {
      id: 'quick-refresh',
      title: 'Refresh All Data',
      description: 'Refresh all dashboard data',
      icon: RefreshCw,
      shortcut: 'Cmd+R',
      category: 'data',
      action: () => {
        console.log('Refreshing all data...');
        setSearchOpen(false);
      }
    },
    {
      id: 'quick-export',
      title: 'Export Current View',
      description: 'Export current dashboard view as PDF',
      icon: Download,
      shortcut: 'Cmd+E',
      category: 'data',
      action: () => {
        console.log('Exporting current view...');
        setSearchOpen(false);
      }
    },
    {
      id: 'quick-new-incident',
      title: 'Create New Incident',
      description: 'Create a new incident report',
      icon: Plus,
      shortcut: 'Cmd+N',
      category: 'data',
      action: () => {
        console.log('Creating new incident...');
        setSearchOpen(false);
      }
    },
    {
      id: 'quick-settings',
      title: 'Open Settings',
      description: 'Go to settings page',
      icon: Settings,
      shortcut: 'Cmd+,',
      category: 'navigation',
      action: () => {
        console.log('Opening settings...');
        setSearchOpen(false);
      }
    },
    {
      id: 'quick-help',
      title: 'Show Help',
      description: 'Open help documentation',
      icon: FileText,
      shortcut: '?',
      category: 'help',
      action: () => {
        console.log('Opening help...');
        setSearchOpen(false);
      }
    }
  ], [setSearchOpen]);

  // Fuzzy search implementation
  const performSearch = (searchQuery: string): SearchResult[] => {
    if (!searchQuery.trim()) return [];

    const lowerQuery = searchQuery.toLowerCase();
    const words = lowerQuery.split(' ').filter(w => w.length > 0);

    return allSearchableItems
      .map(item => {
        let score = 0;
        const lowerTitle = item.title.toLowerCase();
        const lowerDescription = item.description.toLowerCase();
        const lowerKeywords = item.keywords?.join(' ').toLowerCase() || '';

        // Exact title match (highest score)
        if (lowerTitle === lowerQuery) score += 100;
        
        // Title starts with query
        if (lowerTitle.startsWith(lowerQuery)) score += 80;
        
        // Title contains query
        if (lowerTitle.includes(lowerQuery)) score += 60;
        
        // Description contains query
        if (lowerDescription.includes(lowerQuery)) score += 40;
        
        // Keywords contain query
        if (lowerKeywords.includes(lowerQuery)) score += 50;

        // Check individual words
        words.forEach(word => {
          if (lowerTitle.includes(word)) score += 30;
          if (lowerDescription.includes(word)) score += 20;
          if (lowerKeywords.includes(word)) score += 25;
        });

        // Boost by base relevance
        score *= item.relevance;

        return { ...item, searchScore: score };
      })
      .filter(item => item.searchScore > 0)
      .sort((a, b) => b.searchScore - a.searchScore)
      .slice(0, 10);
  };

  // Handle search
  useEffect(() => {
    if (query.length > 0) {
      const results = performSearch(query);
      updateSearchResults(results);
    } else {
      updateSearchResults([]);
    }
  }, [query, updateSearchResults]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(true);
        setTimeout(() => searchInputRef.current?.focus(), 100);
      }

      if (isSearchOpen) {
        if (e.key === 'Escape') {
          setSearchOpen(false);
          setQuery('');
        } else if (e.key === 'ArrowDown') {
          e.preventDefault();
          setSelectedIndex(prev => Math.min(prev + 1, currentResults.length - 1));
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          setSelectedIndex(prev => Math.max(prev - 1, 0));
        } else if (e.key === 'Enter') {
          e.preventDefault();
          const selectedItem = currentResults[selectedIndex];
          if (selectedItem) {
            handleResultClick(selectedItem);
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, selectedIndex]);

  // Focus search input when opened
  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 100);
    } else {
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isSearchOpen]);

  const currentResults = query.length > 0 ? searchResults : mockQuickActions;
  const categories = ['all', 'navigation', 'services', 'incidents', 'insights', 'actions'];

  const handleResultClick = (item: SearchResult | QuickAction) => {
    if ('action' in item && item.action) {
      item.action();
    } else if ('url' in item && item.url) {
      console.log(`Navigating to: ${item.url}`);
      setSearchOpen(false);
    }

    if (query.length > 0) {
      addSearchHistory(query, currentResults.length);
    }

    // Add to recent items
    if ('type' in item) {
      setRecentItems(prev => {
        const filtered = prev.filter(r => r.id !== item.id);
        return [item as SearchResult, ...filtered].slice(0, 5);
      });
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'navigation': return Home;
      case 'services': return Database;
      case 'incidents': return AlertTriangle;
      case 'insights': return Brain;
      case 'actions': return Zap;
      default: return Search;
    }
  };

  const getResultIcon = (item: SearchResult | QuickAction) => {
    return item.icon || Search;
  };

  if (!isSearchOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-[10vh]"
        onClick={() => setSearchOpen(false)}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: -20 }}
          className="bg-white rounded-lg shadow-2xl border border-gray-200 w-full max-w-2xl mx-4"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Search Header */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <Search className="w-5 h-5 text-gray-400" />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search services, incidents, insights, or run commands..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 text-lg bg-transparent border-none outline-none"
              />
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <kbd className="px-2 py-1 bg-gray-100 rounded text-xs">⌘K</kbd>
                <button
                  onClick={() => setSearchOpen(false)}
                  className="p-1 rounded hover:bg-gray-100"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Category Filter */}
          {query.length > 0 && (
            <div className="px-4 py-2 border-b border-gray-200">
              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4 text-gray-400" />
                <div className="flex space-x-1">
                  {categories.map(category => {
                    const IconComponent = getCategoryIcon(category);
                    return (
                      <button
                        key={category}
                        onClick={() => setActiveCategory(category)}
                        className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                          activeCategory === category
                            ? 'bg-blue-100 text-blue-700'
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        {category === 'all' ? 'All' : category.charAt(0).toUpperCase() + category.slice(1)}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Results */}
          <div className="max-h-96 overflow-y-auto">
            {query.length === 0 ? (
              <div className="p-4">
                {/* Quick Actions */}
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-900 mb-3 flex items-center">
                    <Zap className="w-4 h-4 mr-2" />
                    Quick Actions
                  </h3>
                  <div className="space-y-1">
                    {mockQuickActions.slice(0, 5).map((action, index) => {
                      const IconComponent = getResultIcon(action);
                      return (
                        <button
                          key={action.id}
                          onClick={() => handleResultClick(action)}
                          className={`w-full text-left p-3 rounded-lg transition-colors flex items-center space-x-3 ${
                            selectedIndex === index ? 'bg-blue-50 border border-blue-200' : 'hover:bg-gray-50'
                          }`}
                        >
                          <div className="p-2 bg-gray-100 rounded-lg">
                            <IconComponent className="w-4 h-4 text-gray-600" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2">
                              <span className="font-medium text-gray-900">{action.title}</span>
                              {action.shortcut && (
                                <kbd className="px-2 py-1 bg-gray-100 rounded text-xs text-gray-600">
                                  {action.shortcut}
                                </kbd>
                              )}
                            </div>
                            <p className="text-sm text-gray-600">{action.description}</p>
                          </div>
                          <ArrowRight className="w-4 h-4 text-gray-400" />
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Recent Items */}
                {recentItems.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 mb-3 flex items-center">
                      <Clock className="w-4 h-4 mr-2" />
                      Recent
                    </h3>
                    <div className="space-y-1">
                      {recentItems.map((item) => {
                        const IconComponent = getResultIcon(item);
                        return (
                          <button
                            key={item.id}
                            onClick={() => handleResultClick(item)}
                            className="w-full text-left p-3 rounded-lg transition-colors hover:bg-gray-50 flex items-center space-x-3"
                          >
                            <div className="p-2 bg-gray-100 rounded-lg">
                              <IconComponent className="w-4 h-4 text-gray-600" />
                            </div>
                            <div className="flex-1">
                              <span className="font-medium text-gray-900">{item.title}</span>
                              <p className="text-sm text-gray-600">{item.description}</p>
                            </div>
                            <span className="text-xs text-gray-500">{item.category}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Search History */}
                {searchHistory.length > 0 && (
                  <div className="mt-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-sm font-medium text-gray-900 flex items-center">
                        <Clock className="w-4 h-4 mr-2" />
                        Recent Searches
                      </h3>
                      <button
                        onClick={clearSearchHistory}
                        className="text-xs text-gray-500 hover:text-gray-700"
                      >
                        Clear
                      </button>
                    </div>
                    <div className="space-y-1">
                      {searchHistory.slice(-3).reverse().map((search) => (
                        <button
                          key={search.id}
                          onClick={() => setQuery(search.query)}
                          className="w-full text-left p-2 rounded hover:bg-gray-50 flex items-center justify-between"
                        >
                          <span className="text-sm text-gray-700">{search.query}</span>
                          <span className="text-xs text-gray-500">
                            {search.resultCount} results
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="p-4">
                {searchResults.length > 0 ? (
                  <div className="space-y-1">
                    {searchResults.map((result, index) => {
                      const IconComponent = getResultIcon(result);
                      return (
                        <button
                          key={result.id}
                          onClick={() => handleResultClick(result)}
                          className={`w-full text-left p-3 rounded-lg transition-colors flex items-center space-x-3 ${
                            selectedIndex === index ? 'bg-blue-50 border border-blue-200' : 'hover:bg-gray-50'
                          }`}
                        >
                          <div className="p-2 bg-gray-100 rounded-lg">
                            <IconComponent className="w-4 h-4 text-gray-600" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <span className="font-medium text-gray-900">{result.title}</span>
                              <span className="text-xs text-gray-500">{result.category}</span>
                            </div>
                            <p className="text-sm text-gray-600">{result.description}</p>
                            {result.metadata && (
                              <div className="mt-1 flex items-center space-x-3 text-xs text-gray-500">
                                {result.metadata.status && (
                                  <span className={`px-2 py-1 rounded-full ${
                                    result.metadata.status === 'healthy' ? 'bg-green-100 text-green-700' :
                                    result.metadata.status === 'degraded' ? 'bg-yellow-100 text-yellow-700' :
                                    'bg-red-100 text-red-700'
                                  }`}>
                                    {result.metadata.status}
                                  </span>
                                )}
                                {result.metadata.responseTime && (
                                  <span>{result.metadata.responseTime}ms</span>
                                )}
                                {result.metadata.confidence && (
                                  <span>{result.metadata.confidence}% confident</span>
                                )}
                              </div>
                            )}
                          </div>
                          <ArrowRight className="w-4 h-4 text-gray-400" />
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Search className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-600">No results found for "{query}"</p>
                    <p className="text-sm text-gray-500 mt-1">Try adjusting your search terms</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-4 py-3 border-t border-gray-200 bg-gray-50">
            <div className="flex items-center justify-between text-xs text-gray-500">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <kbd className="px-1.5 py-0.5 bg-white border border-gray-300 rounded">↑↓</kbd>
                  <span>navigate</span>
                </div>
                <div className="flex items-center space-x-1">
                  <kbd className="px-1.5 py-0.5 bg-white border border-gray-300 rounded">⏎</kbd>
                  <span>select</span>
                </div>
                <div className="flex items-center space-x-1">
                  <kbd className="px-1.5 py-0.5 bg-white border border-gray-300 rounded">esc</kbd>
                  <span>close</span>
                </div>
              </div>
              <div>
                Powered by AI Search
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
} 