'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Command, ArrowRight, Hash } from 'lucide-react';

interface SearchResult {
  id: string;
  title: string;
  description: string;
  category: 'service' | 'section' | 'feature';
  icon: React.ComponentType<any>;
  action: () => void;
  badge?: string;
  parentSection?: string;
}

interface GlobalSearchProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (section: string) => void;
}

export default function GlobalSearch({ isOpen, onClose, onNavigate }: GlobalSearchProps) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const searchResults: SearchResult[] = [
    // Main Platform Sections
    ...[
      {
        id: 'platform-overview',
        title: 'IntelliOps AI Platform',
        description: 'Enterprise Intelligence Platform overview with adoption journey',
        category: 'section' as const
      },
      {
        id: 'business-model',
        title: 'Business Model & Licensing',
        description: 'Commercial licensing strategy, revenue projections, and go-to-market plan',
        category: 'section' as const
      },
      // Layer 1: Delivery Intelligence
      {
        id: 'test-quality-intelligence',
        title: 'Test & Quality Intelligence',
        description: 'Delivery Intelligence - AI-powered quality assurance across the software delivery lifecycle',
        category: 'section' as const
      },
      {
        id: 'release-intelligence',
        title: 'Release Intelligence',
        description: 'Delivery Intelligence - AI-powered release orchestration and deployment risk assessment',
        category: 'section' as const
      },
      {
        id: 'knowledge-base',
        title: 'Application Knowledge Base',
        description: 'Delivery Intelligence - AI-generated institutional knowledge from defects, services, and releases',
        category: 'section' as const
      },
      // Layer 2: Operations Intelligence
      {
        id: 'service-health-intelligence',
        title: 'Service Health & Incident Intelligence',
        description: 'Operations Intelligence - Real-time monitoring with AI-powered incident detection',
        category: 'section' as const
      },
      // Layer 3: Enterprise Intelligence
      {
        id: 'business-intelligence',
        title: 'Business Intelligence & Analytics',
        description: 'Enterprise Intelligence - Financial, operational, and strategic analytics',
        category: 'section' as const
      },
      {
        id: 'tech-docs',
        title: 'Technical Documentation',
        description: 'Architecture guides, API references, and integration documentation',
        category: 'section' as const
      },
      {
        id: 'settings',
        title: 'Settings & Administration',
        description: 'Platform configuration, security, and team management',
        category: 'section' as const
      }
    ]
      .filter(section => 
        section.title.toLowerCase().includes(query.toLowerCase()) ||
        section.description.toLowerCase().includes(query.toLowerCase())
      )
      .map(section => ({
        id: section.id,
        title: section.title,
        description: section.description,
        category: 'section' as const,
        icon: ArrowRight,
        action: () => {
          onNavigate(section.id);
          onClose();
        }
      })),

    // Key Features and Sub-sections
    ...[
      { 
        id: 'real-time-monitoring', 
        title: 'Real-Time Monitoring', 
        description: 'Continuous Splunk integration and service health',
        category: 'feature' as const,
        parentSection: 'service-health-intelligence'
      },
                                          { 
                    id: 'intelligent-alert-management', 
                    title: 'Intelligent Alert Management', 
                    description: 'AI-powered alert fatigue management and noise reduction',
                    category: 'feature' as const,
                    parentSection: 'service-health-intelligence'
                  },
      { 
        id: 'incident-orchestration', 
        title: 'Incident Orchestration', 
        description: 'Automated incident workflows and AI resolution',
        category: 'feature' as const,
        parentSection: 'service-health-intelligence'
      },
      { 
        id: 'operations-intelligence', 
        title: 'Operations Intelligence', 
        description: 'Service health trends and predictive analytics',
        category: 'feature' as const,
        parentSection: 'service-health-intelligence'
      },
      { 
        id: 'defect-intelligence', 
        title: 'Defect Intelligence', 
        description: 'AI-powered defect matching and root cause analysis',
        category: 'feature' as const,
        parentSection: 'test-quality-intelligence'
      },
      { 
        id: 'quality-insights', 
        title: 'Quality Insights', 
        description: 'Quality metrics dashboard and trend analysis',
        category: 'feature' as const,
        parentSection: 'test-quality-intelligence'
      },
      { 
        id: 'test-management', 
        title: 'Test Management', 
        description: 'Test case management and execution tracking',
        category: 'feature' as const,
        parentSection: 'test-quality-intelligence'
      },
      { 
        id: 'performance-intelligence', 
        title: 'Performance Intelligence', 
        description: 'Performance monitoring and optimization insights',
        category: 'feature' as const,
        parentSection: 'test-quality-intelligence'
      },
      { 
        id: 'deployment-intelligence', 
        title: 'Deployment Intelligence', 
        description: 'AI-powered deployment risk assessment and automation',
        category: 'feature' as const,
        parentSection: 'release-intelligence'
      },
      { 
        id: 'release-readiness', 
        title: 'Release Readiness', 
        description: 'Release health scoring and readiness indicators',
        category: 'feature' as const,
        parentSection: 'release-intelligence'
      },
      { 
        id: 'business-intelligence', 
        title: 'Business Intelligence', 
        description: 'Executive insights and strategic analytics',
        category: 'feature' as const,
        parentSection: 'business-intelligence'
      },
      { 
        id: 'financial-intelligence', 
        title: 'Financial Intelligence', 
        description: 'Cost optimization and budget tracking',
        category: 'feature' as const,
        parentSection: 'business-intelligence'
      },
      { 
        id: 'operational-intelligence', 
        title: 'Operational Intelligence', 
        description: 'Operational metrics and efficiency analysis',
        category: 'feature' as const,
        parentSection: 'business-intelligence'
      },
      { 
        id: 'module-intelligence', 
        title: 'Module Intelligence', 
        description: 'AI-generated insights for application modules',
        category: 'feature' as const,
        parentSection: 'knowledge-base'
      },
      { 
        id: 'common-issues-patterns', 
        title: 'Common Issues & Patterns', 
        description: 'AI-identified common issue patterns and solutions',
        category: 'feature' as const,
        parentSection: 'knowledge-base'
      },
      { 
        id: 'code-health-insights', 
        title: 'Code Health Insights', 
        description: 'Code quality metrics and improvement recommendations',
        category: 'feature' as const,
        parentSection: 'knowledge-base'
      },
      { 
        id: 'system-dependencies', 
        title: 'System Dependencies', 
        description: 'System dependency mapping and failure correlation analysis',
        category: 'feature' as const,
        parentSection: 'knowledge-base'
      },
      { 
        id: 'new-joiner-guide', 
        title: 'New Joiner Onboarding Guide', 
        description: 'AI-curated learning paths for new team members',
        category: 'feature' as const,
        parentSection: 'knowledge-base'
      },
      { 
        id: 'knowledge-analytics', 
        title: 'Knowledge Base Analytics', 
        description: 'Dashboard for measuring knowledge base impact',
        category: 'feature' as const,
        parentSection: 'knowledge-base'
      }
    ]
      .filter(feature => 
        feature.title.toLowerCase().includes(query.toLowerCase()) ||
        feature.description.toLowerCase().includes(query.toLowerCase())
      )
      .map(feature => ({
        id: feature.id,
        title: feature.title,
        description: feature.description,
        category: 'feature' as const,
        icon: ArrowRight,
        action: () => {
          // Navigate to parent section first, then to specific feature
          onNavigate(feature.parentSection);
          // Note: Individual feature navigation would need to be implemented in each section
          onClose();
        }
      }))
  ].filter(result => 
    query.length === 0 || 
    result.title.toLowerCase().includes(query.toLowerCase()) ||
    result.description.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 12);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => Math.min(prev + 1, searchResults.length - 1));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => Math.max(prev - 1, 0));
        break;
      case 'Enter':
        e.preventDefault();
        if (searchResults[selectedIndex]) {
          searchResults[selectedIndex].action();
        }
        break;
      case 'Escape':
        e.preventDefault();
        onClose();
        break;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'service': return Hash;
      case 'section': return ArrowRight;
      case 'feature': return ArrowRight;
      default: return Search;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'service': return 'text-green-600 bg-green-100';
      case 'section': return 'text-blue-600 bg-blue-100';
      case 'feature': return 'text-purple-600 bg-purple-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50"
            onClick={onClose}
          />

          {/* Search Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="fixed top-[20%] left-1/2 -translate-x-1/2 w-full max-w-2xl mx-4 bg-white rounded-lg shadow-2xl z-50 overflow-hidden"
          >
            {/* Search Input */}
            <div className="flex items-center px-6 py-4 border-b border-gray-200">
              <Search className="w-5 h-5 text-gray-400 mr-3" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search IntelliOps AI features, sections, and capabilities..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 outline-none text-lg placeholder-gray-400"
              />
              <div className="flex items-center space-x-2 ml-4">
                <kbd className="px-2 py-1 text-xs font-semibold text-gray-500 bg-gray-100 border border-gray-300 rounded">
                  ↑↓
                </kbd>
                <kbd className="px-2 py-1 text-xs font-semibold text-gray-500 bg-gray-100 border border-gray-300 rounded">
                  Enter
                </kbd>
                <kbd className="px-2 py-1 text-xs font-semibold text-gray-500 bg-gray-100 border border-gray-300 rounded">
                  Esc
                </kbd>
              </div>
            </div>

            {/* Search Results */}
            <div className="max-h-96 overflow-y-auto">
              {searchResults.length > 0 ? (
                <div className="py-2">
                  {searchResults.map((result, index) => {
                    const IconComponent = getCategoryIcon(result.category);
                    const isSelected = index === selectedIndex;
                    
                    return (
                      <motion.button
                        key={result.id}
                        onClick={result.action}
                        whileHover={{ backgroundColor: '#f3f4f6' }}
                        className={`w-full text-left px-6 py-3 flex items-center space-x-3 transition-colors ${
                          isSelected ? 'bg-blue-50' : 'hover:bg-gray-50'
                        }`}
                      >
                        <div className={`p-2 rounded-lg ${getCategoryColor(result.category)}`}>
                          <IconComponent className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h3 className="font-medium text-gray-900 truncate">{result.title}</h3>
                            {result.badge && (
                              <span className={`ml-2 px-2 py-1 text-xs rounded-full ${
                                result.badge === 'healthy' ? 'bg-green-100 text-green-800' :
                                result.badge === 'degraded' ? 'bg-yellow-100 text-yellow-800' :
                                result.badge === 'down' ? 'bg-red-100 text-red-800' :
                                'bg-gray-100 text-gray-800'
                              }`}>
                                {result.badge}
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 truncate">{result.description}</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-gray-400" />
                      </motion.button>
                    );
                  })}
                </div>
              ) : (
                <div className="py-12 text-center">
                  <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
                  <p className="text-gray-600">
                    {query ? `No results for "${query}"` : 'Start typing to search...'}
                  </p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">
              <div className="flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center space-x-4">
                  <span>Tip: Use keyboard shortcuts to navigate</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Command className="w-3 h-3" />
                  <span>+</span>
                  <kbd className="px-1 py-0.5 bg-white border border-gray-300 rounded">K</kbd>
                  <span>to search</span>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
} 