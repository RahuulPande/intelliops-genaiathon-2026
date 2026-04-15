'use client';

import { motion } from 'framer-motion';
import { 
  BarChart3,
  TrendingUp,
  Users,
  Clock,
  Target,
  Star,
  ThumbsUp,
  Search,
  BookOpen,
  Award,
  CheckCircle,
  DollarSign,
  Calendar,
  Activity
} from 'lucide-react';

export default function KnowledgeAnalyticsSection() {
  const impactMetrics = [
    {
      title: 'Onboarding Acceleration',
      value: '40%',
      description: 'Faster time to productivity for new team members',
      icon: TrendingUp,
      color: 'from-blue-500 to-blue-600',
      breakdown: [
        'Traditional onboarding: 5 weeks average',
        'With Knowledge Base: 3 weeks average',
        'Time saved per new joiner: 2 weeks',
        'Cost saving: $8,000 per new hire'
      ]
    },
    {
      title: 'Defect Recurrence Reduction',
      value: '35%',
      description: 'Fewer repeated mistakes due to pattern awareness',
      icon: Target,
      color: 'from-green-500 to-green-600',
      breakdown: [
        'Memory leak defects: 60% reduction',
        'Integration failures: 45% reduction',
        'Performance issues: 25% reduction',
        'Average cost saved per prevented defect: $5,200'
      ]
    },
    {
      title: 'Knowledge Accessibility',
      value: '95%',
      description: 'Team satisfaction with knowledge discovery and usage',
      icon: Star,
      color: 'from-purple-500 to-purple-600',
      breakdown: [
        'Time to find relevant information: 2 minutes vs 30 minutes',
        'Knowledge accuracy rating: 4.8/5',
        'Usage frequency: 3.2 times per developer per week',
        'Knowledge retention rate: 85% vs 45% traditional docs'
      ]
    }
  ];

  const usageAnalytics = {
    weeklyUpdates: 12,
    userRating: 4.7,
    accuracyRate: 94,
    modulesCovered: 87
  };

  const topQueries = [
    'Payment Gateway timeout resolution',
    'Memory leak detection techniques', 
    'Authentication service configuration',
    'Database connection best practices',
    'External API integration patterns'
  ];

  const weeklyUsageData = [
    { day: 'Mon', searches: 45, views: 127 },
    { day: 'Tue', searches: 52, views: 143 },
    { day: 'Wed', searches: 48, views: 134 },
    { day: 'Thu', searches: 61, views: 167 },
    { day: 'Fri', searches: 38, views: 98 },
    { day: 'Sat', searches: 12, views: 31 },
    { day: 'Sun', searches: 8, views: 22 }
  ];

  const knowledgeStats = [
    {
      label: 'Total Knowledge Articles',
      value: '247',
      change: '+12 this week',
      icon: BookOpen,
      color: 'text-blue-600'
    },
    {
      label: 'Weekly Active Users',
      value: '89',
      change: '+7% vs last week',
      icon: Users,
      color: 'text-green-600'
    },
    {
      label: 'Avg. Session Duration',
      value: '8.5 min',
      change: '+2.1 min vs last month',
      icon: Clock,
      color: 'text-purple-600'
    },
    {
      label: 'Knowledge Accuracy',
      value: '94%',
      change: 'Expert verified',
      icon: CheckCircle,
      color: 'text-orange-600'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <div className="flex items-center justify-center mb-6">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 rounded-full">
            <BarChart3 className="w-8 h-8 text-white" />
          </div>
        </div>
        
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          📊 Knowledge Base Impact Metrics
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-4xl mx-auto">
          Measuring the effectiveness of AI-generated institutional knowledge
        </p>
      </motion.div>

      {/* Knowledge Stats Overview */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
      >
        {knowledgeStats.map((stat, index) => (
          <div key={stat.label} className="bg-white dark:bg-[#1A1A1A] rounded-xl p-6 shadow-lg dark:shadow-none dark:border border-gray-100 dark:border-white/[0.06] text-center">
            <div className={`inline-flex items-center justify-center w-12 h-12 bg-gray-50 dark:bg-white/[0.03] rounded-lg mb-4`}>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{stat.value}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">{stat.label}</div>
            <div className="text-xs text-green-600 dark:text-green-400 font-medium">{stat.change}</div>
          </div>
        ))}
      </motion.div>

      {/* Impact Metrics Cards */}
      <div className="grid lg:grid-cols-3 gap-8 mb-12">
        {impactMetrics.map((metric, index) => (
          <motion.div
            key={metric.title}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
            className="bg-white dark:bg-[#1A1A1A] rounded-2xl shadow-xl dark:shadow-none dark:border border-gray-100 dark:border-white/[0.06] overflow-hidden"
          >
            {/* Metric Header */}
            <div className={`bg-gradient-to-r ${metric.color} p-6 text-white`}>
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-white/20 rounded-lg">
                  <metric.icon className="w-8 h-8" />
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold">{metric.value}</div>
                  <div className="text-white/80 text-sm">Improvement</div>
                </div>
              </div>
              <h3 className="text-xl font-bold">{metric.title}</h3>
              <p className="text-white/90 mt-2">{metric.description}</p>
            </div>

            {/* Metric Breakdown */}
            <div className="p-6">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Detailed Breakdown</h4>
              <div className="space-y-3">
                {metric.breakdown.map((item, itemIndex) => (
                  <div key={itemIndex} className="flex items-start space-x-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600 dark:text-gray-400">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Usage Analytics */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="grid lg:grid-cols-2 gap-8 mb-12"
      >
        {/* Usage Patterns Chart */}
        <div className="bg-white dark:bg-[#1A1A1A] rounded-2xl shadow-xl dark:shadow-none dark:border border-gray-100 dark:border-white/[0.06] p-8">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
            <Activity className="w-6 h-6 text-blue-600 mr-3" />
            Weekly Usage Patterns
          </h3>
          
          <div className="space-y-4">
            {weeklyUsageData.map((day, index) => (
              <div key={day.day} className="flex items-center space-x-4">
                <div className="w-8 text-sm font-medium text-gray-600 dark:text-gray-400">{day.day}</div>

                {/* Searches Bar */}
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-500 dark:text-gray-500">Searches</span>
                    <span className="text-xs text-blue-600 dark:text-blue-400 font-medium">{day.searches}</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-white/[0.06] rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: `${(day.searches / 61) * 100}%` }}
                    ></div>
                  </div>
                </div>

                {/* Views Bar */}
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-500 dark:text-gray-500">Views</span>
                    <span className="text-xs text-purple-600 dark:text-purple-400 font-medium">{day.views}</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-white/[0.06] rounded-full h-2">
                    <div
                      className="bg-purple-500 h-2 rounded-full"
                      style={{ width: `${(day.views / 167) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Queries */}
        <div className="bg-white dark:bg-[#1A1A1A] rounded-2xl shadow-xl dark:shadow-none dark:border border-gray-100 dark:border-white/[0.06] p-8">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
            <Search className="w-6 h-6 text-green-600 mr-3" />
            Most Searched Knowledge Topics
          </h3>
          
          <div className="space-y-4">
            {topQueries.map((query, index) => (
              <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-white/[0.03] rounded-lg">
                <div className="flex items-center justify-center w-8 h-8 bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-full font-bold text-sm">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <div className="font-medium text-gray-900 dark:text-white">{query}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-500">
                    {Math.floor(Math.random() * 20) + 10} searches this week
                  </div>
                </div>
                <TrendingUp className="w-5 h-5 text-green-500" />
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Feedback & Improvement System */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="bg-white dark:bg-[#1A1A1A] rounded-2xl shadow-xl dark:shadow-none dark:border border-gray-100 dark:border-white/[0.06] p-8 mb-12"
      >
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 flex items-center">
          <ThumbsUp className="w-6 h-6 text-purple-600 mr-3" />
          Continuous Knowledge Improvement
        </h3>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
            <Calendar className="w-8 h-8 text-blue-600 mx-auto mb-3" />
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">{usageAnalytics.weeklyUpdates}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Weekly knowledge updates</div>
            <div className="text-xs text-blue-500 dark:text-blue-400 mt-1">New insights added</div>
          </div>

          <div className="text-center p-6 bg-green-50 dark:bg-green-900/20 rounded-xl">
            <Star className="w-8 h-8 text-green-600 mx-auto mb-3" />
            <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-1">{usageAnalytics.userRating}/5</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">User feedback rating</div>
            <div className="text-xs text-green-500 dark:text-green-400 mt-1">Average satisfaction</div>
          </div>

          <div className="text-center p-6 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
            <CheckCircle className="w-8 h-8 text-purple-600 mx-auto mb-3" />
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-1">{usageAnalytics.accuracyRate}%</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Knowledge accuracy</div>
            <div className="text-xs text-purple-500 dark:text-purple-400 mt-1">Verified correct</div>
          </div>

          <div className="text-center p-6 bg-orange-50 dark:bg-orange-900/20 rounded-xl">
            <BookOpen className="w-8 h-8 text-orange-600 mx-auto mb-3" />
            <div className="text-2xl font-bold text-orange-600 dark:text-orange-400 mb-1">{usageAnalytics.modulesCovered}%</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Coverage completeness</div>
            <div className="text-xs text-orange-500 dark:text-orange-400 mt-1">Modules documented</div>
          </div>
        </div>
      </motion.div>

      {/* ROI Summary */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.0 }}
        className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white text-center"
      >
        <div className="flex items-center justify-center mb-6">
          <DollarSign className="w-12 h-12 text-yellow-300 mr-4" />
          <h3 className="text-3xl font-bold">Knowledge Base ROI Impact</h3>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="text-4xl font-bold text-yellow-300 mb-2">$156K</div>
            <div className="text-blue-100">Annual Cost Savings</div>
            <div className="text-sm text-blue-200 mt-1">From faster onboarding + defect prevention</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-yellow-300 mb-2">2.8x</div>
            <div className="text-blue-100">Knowledge Retention Improvement</div>
            <div className="text-sm text-blue-200 mt-1">85% vs 30% traditional documentation</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-yellow-300 mb-2">15x</div>
            <div className="text-blue-100">Faster Information Discovery</div>
            <div className="text-sm text-blue-200 mt-1">2 minutes vs 30 minutes search time</div>
          </div>
        </div>

        <p className="text-blue-100 max-w-4xl mx-auto text-lg">
          The AI-powered Knowledge Base transforms institutional knowledge from scattered tribal wisdom
          into accessible, searchable intelligence. This measurable impact proves that smart knowledge
          management is not just a productivity tool—it's a competitive advantage.
        </p>
      </motion.div>
    </div>
  );
}