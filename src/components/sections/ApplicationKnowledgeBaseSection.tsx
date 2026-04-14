'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen,
  Brain,
  Target,
  TrendingUp,
  Users,
  Clock,
  CheckCircle,
  Search,
  FileText,
  Lightbulb,
  Network,
  GraduationCap,
  BarChart3,
  AlertTriangle,
  Award,
  Database,
  Zap,
  Shield,
  Info
} from 'lucide-react';

import ModuleIntelligenceSection from '../application-knowledge-base/ModuleIntelligenceSection';
import CommonIssuesPatternsSection from '../application-knowledge-base/CommonIssuesPatternsSection';
import NewJoinerGuideSection from '../application-knowledge-base/NewJoinerGuideSection';
import KnowledgeAnalyticsSection from '../application-knowledge-base/KnowledgeAnalyticsSection';
import FeatureAboutTab from '@/components/demo/FeatureAboutTab';
import { knowledgeBaseAbout } from '@/lib/content/aboutContent';

export default function ApplicationKnowledgeBaseSection() {
  const [activeTab, setActiveTab] = useState('module-intelligence');

  const knowledgeStats = [
    {
      value: '1,247',
      label: 'Defects Analyzed',
      icon: Database,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      value: '89',
      label: 'Application Modules',
      icon: Network,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      value: '2.3 years',
      label: 'Historical Data',
      icon: Clock,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      value: '40%',
      label: 'Faster Onboarding',
      icon: TrendingUp,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    }
  ];

  const onboardingImpacts = [
    {
      icon: FileText,
      title: 'Knowledge Accessibility',
      description: 'Instant access to 2+ years of institutional knowledge',
      impact: 'Reduces knowledge-gathering time by 60%',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Search,
      title: 'Problem Pattern Recognition', 
      description: 'Learn common issues and solutions before encountering them',
      impact: '30% fewer "rookie mistakes"',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: GraduationCap,
      title: 'Module Expertise',
      description: 'Understanding module dependencies and failure patterns',
      impact: '50% faster module comprehension',
      color: 'from-purple-500 to-purple-600'
    }
  ];

  const sectionTabs = [
    {
      id: 'module-intelligence',
      name: 'Module Intelligence',
      icon: Brain,
      description: 'AI-generated insights from defect patterns'
    },
    {
      id: 'common-patterns',
      name: 'Common Issues & Patterns',
      icon: AlertTriangle,
      description: 'Pattern recognition from 1,247 defects'
    },
    {
      id: 'new-joiner-guide',
      name: 'New Joiner Guide',
      icon: GraduationCap,
      description: 'AI-curated learning paths for faster onboarding'
    },
    {
      id: 'knowledge-analytics',
      name: 'Knowledge Analytics',
      icon: BarChart3,
      description: 'Impact metrics and usage patterns'
    },
    {
      id: 'about',
      name: 'About',
      icon: Info,
      description: 'How Knowledge Base works'
    }
  ];

  const renderActiveSection = () => {
    switch (activeTab) {
      case 'module-intelligence':
        return <ModuleIntelligenceSection />;
      case 'common-patterns':
        return <CommonIssuesPatternsSection />;
      case 'new-joiner-guide':
        return <NewJoinerGuideSection />;
      case 'knowledge-analytics':
        return <KnowledgeAnalyticsSection />;
      case 'about':
        return <FeatureAboutTab {...knowledgeBaseAbout} />;
      default:
        return <ModuleIntelligenceSection />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-[#0F0F0F] dark:to-[#141414]">
      {/* Knowledge Base Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white dark:bg-[#141414] border-b border-gray-200 dark:border-white/[0.06]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Title Section */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-full">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
            </div>
            
            <p className="text-sm font-medium text-purple-600 dark:text-purple-400 mb-1">
              Delivery Intelligence
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              📚 Application Knowledge Base
            </h1>
            
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-4xl mx-auto mb-8">
              AI-generated insights from 1000+ defects, service analytics, and release data transforming 
              reactive troubleshooting into proactive institutional knowledge
            </p>

            {/* Knowledge Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
              {knowledgeStats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className={`inline-flex items-center justify-center w-16 h-16 ${stat.bgColor} dark:bg-white/[0.06] rounded-full mb-3`}>
                    <stat.icon className={`w-8 h-8 ${stat.color} dark:opacity-90`} />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Onboarding Impact Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-gradient-to-r from-gray-50 to-blue-50 dark:from-white/[0.03] dark:to-blue-900/10 rounded-2xl p-8 mb-12"
          >
            <div className="text-center mb-8">
              <div className="inline-flex items-center space-x-3 mb-4">
                <Target className="w-8 h-8 text-blue-600" />
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">🎯 New Joiner Onboarding Impact</h2>
              </div>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Proven acceleration of team member productivity through AI-curated institutional knowledge
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {onboardingImpacts.map((impact, index) => (
                <motion.div
                  key={impact.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                  className="bg-white dark:bg-[#1A1A1A] rounded-xl p-6 shadow-lg hover:shadow-xl dark:shadow-none dark:border dark:border-white/[0.06] transition-shadow"
                >
                  <div className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r ${impact.color} rounded-lg mb-4`}>
                    <impact.icon className="w-6 h-6 text-white" />
                  </div>

                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{impact.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">{impact.description}</p>

                  <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800/30 rounded-lg p-3">
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="w-4 h-4 text-green-600 dark:text-green-400" />
                      <span className="text-green-800 dark:text-green-300 font-medium text-sm">{impact.impact}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Onboarding Comparison */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="mt-8 bg-white dark:bg-[#1A1A1A] rounded-xl p-6 shadow-lg dark:shadow-none dark:border dark:border-white/[0.06]"
            >
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">Onboarding Time Comparison</h3>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="text-center">
                  <div className="text-red-600 text-sm font-medium mb-2">Traditional Onboarding</div>
                  <div className="text-4xl font-bold text-red-600 mb-2">5 weeks</div>
                  <div className="text-gray-600 dark:text-gray-400 text-sm">Average time to productivity</div>
                  <div className="mt-4 space-y-2 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                      <span>Manual knowledge discovery</span>
                    </div>
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                      <span>Learning from repeated mistakes</span>
                    </div>
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                      <span>Scattered documentation</span>
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <div className="text-green-600 text-sm font-medium mb-2">With Knowledge Base</div>
                  <div className="text-4xl font-bold text-green-600 mb-2">3 weeks</div>
                  <div className="text-gray-600 dark:text-gray-400 text-sm">40% faster onboarding</div>
                  <div className="mt-4 space-y-2 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center justify-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>AI-curated learning paths</span>
                    </div>
                    <div className="flex items-center justify-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Pattern-based problem prevention</span>
                    </div>
                    <div className="flex items-center justify-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Centralized institutional knowledge</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 text-center">
                <div className="inline-flex items-center space-x-2 bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 px-4 py-2 rounded-full">
                  <Award className="w-4 h-4" />
                  <span className="font-medium">Cost Saving: $8,000 per new hire</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Knowledge Sections Navigation */}
      <div className="bg-white dark:bg-[#141414] border-b border-gray-200 dark:border-white/[0.06] sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto scrollbar-hide">
            {sectionTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-shrink-0 flex items-center space-x-3 px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <div className="text-left">
                  <div className="font-medium">{tab.name}</div>
                  <div className="text-xs text-gray-400 dark:text-gray-500">{tab.description}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Active Section Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="py-8"
      >
        {renderActiveSection()}
      </motion.div>
    </div>
  );
}