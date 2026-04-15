'use client';

import { motion } from 'framer-motion';
import { 
  CreditCard,
  Shield,
  BarChart3,
  AlertTriangle,
  CheckCircle,
  Clock,
  TrendingUp,
  TrendingDown,
  Link,
  Code,
  Target,
  Users,
  FileText,
  Zap,
  Database,
  Server
} from 'lucide-react';

export default function ModuleIntelligenceSection() {
  const modules = [
    {
      id: 'payment-gateway',
      name: 'Payment Gateway',
      icon: CreditCard,
      riskLevel: 'high',
      defectCount: 47,
      color: 'from-red-500 to-red-600',
      bgColor: 'bg-red-50',
      textColor: 'text-red-600',
      commonIssues: [
        {
          type: 'Connection Timeouts',
          frequency: 18,
          description: 'High traffic causes gateway timeouts, avg resolution: 45 min',
          rootCause: 'Connection pool exhaustion during peak hours',
          typicalFix: 'Increase connection pool size + implement circuit breaker',
          preventionTips: 'Monitor connection pool metrics, implement auto-scaling'
        },
        {
          type: 'Memory Leaks',
          frequency: 12,
          description: 'Gradual memory increase leading to service restarts',
          rootCause: 'Unclosed HTTP connections in payment validation flows',
          typicalFix: 'Proper connection disposal in finally blocks',
          preventionTips: 'Code reviews focus on resource cleanup, automated leak detection'
        },
        {
          type: 'Transaction Failures',
          frequency: 9,
          description: 'Payment transactions fail without proper error handling',
          rootCause: 'Network interruptions not handled gracefully',
          typicalFix: 'Implement retry logic with exponential backoff',
          preventionTips: 'Comprehensive error handling, idempotent operations'
        }
      ],
      performancePatterns: [
        {
          pattern: 'Peak Usage: 9 AM - 11 AM, 2 PM - 4 PM',
          impact: 'Response time increases 300% during peaks',
          recommendation: 'Pre-scale resources before known peak times'
        },
        {
          pattern: 'Memory usage grows 15% daily until restart',
          impact: 'Performance degradation after 3 days uptime',
          recommendation: 'Scheduled restarts every 48 hours or fix memory leaks'
        }
      ],
      dependencies: [
        {
          service: 'User Authentication Service',
          criticality: 'high',
          impact: 'Payment failures if auth service down',
          mitigation: 'Implement auth service fallback'
        },
        {
          service: 'Transaction Database',
          criticality: 'medium',
          impact: 'Payments queue up during DB maintenance',
          mitigation: 'Database clustering for high availability'
        }
      ],
      codeHealth: {
        defectDensity: { value: '0.8 defects/KLOC', benchmark: '0.5 defects/KLOC', status: 'needs-improvement' },
        hotspotFiles: { value: 'PaymentProcessor.java (23 defects)', benchmark: '<10 defects per file', status: 'critical' }
      },
      newJoinerGuidance: [
        {
          priority: 'High',
          task: 'Understand payment flow architecture',
          resources: 'Architecture diagram, sequence diagrams',
          timeEstimate: '2 hours'
        },
        {
          priority: 'High',
          task: 'Study common timeout scenarios',
          resources: 'DEF-2847, DEF-2891, DEF-2934 for examples',
          timeEstimate: '1 hour'
        },
        {
          priority: 'Medium',
          task: 'Review connection pool configuration',
          resources: 'application.properties, monitoring dashboards',
          timeEstimate: '30 minutes'
        }
      ]
    },
    {
      id: 'user-authentication',
      name: 'User Authentication',
      icon: Shield,
      riskLevel: 'medium',
      defectCount: 23,
      color: 'from-yellow-500 to-orange-500',
      bgColor: 'bg-yellow-50',
      textColor: 'text-yellow-600',
      commonIssues: [
        {
          type: 'Session Timeout Issues',
          frequency: 8,
          description: 'Users logged out unexpectedly during active sessions',
          rootCause: 'Session timeout configuration inconsistencies',
          typicalFix: 'Standardize session timeout across all services',
          preventionTips: 'Centralized session management, user activity tracking'
        },
        {
          type: 'Token Validation Failures',
          frequency: 6,
          description: 'JWT tokens rejected intermittently',
          rootCause: 'Clock skew between services causes token expiry issues',
          typicalFix: 'Implement clock synchronization + grace period for token validation',
          preventionTips: 'NTP synchronization, token grace period configuration'
        }
      ],
      performancePatterns: [
        {
          pattern: 'Login spikes during business hours',
          impact: 'Authentication latency increases 150%',
          recommendation: 'Load balance authentication requests'
        }
      ],
      dependencies: [
        {
          service: 'LDAP Directory',
          criticality: 'high',
          impact: 'No user authentication if LDAP unavailable',
          mitigation: 'LDAP failover cluster configuration'
        }
      ],
      codeHealth: {
        defectDensity: { value: '0.4 defects/KLOC', benchmark: '0.5 defects/KLOC', status: 'good' },
        hotspotFiles: { value: 'AuthController.java (8 defects)', benchmark: '<10 defects per file', status: 'acceptable' }
      },
      newJoinerGuidance: [
        {
          priority: 'High',
          task: 'Understand JWT token lifecycle',
          resources: 'Token validation flow, expiry handling',
          timeEstimate: '1.5 hours'
        },
        {
          priority: 'Medium',
          task: 'Review session management',
          resources: 'Session configuration, timeout policies',
          timeEstimate: '1 hour'
        }
      ]
    },
    {
      id: 'reporting-engine',
      name: 'Reporting Engine',
      icon: BarChart3,
      riskLevel: 'low',
      defectCount: 8,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600',
      commonIssues: [
        {
          type: 'Report Generation Delays',
          frequency: 3,
          description: 'Large reports take excessive time to generate',
          rootCause: 'Inefficient database queries for large datasets',
          typicalFix: 'Optimize queries with proper indexing and pagination',
          preventionTips: 'Query performance testing, database monitoring'
        }
      ],
      performancePatterns: [
        {
          pattern: 'Monthly report generation causes CPU spikes',
          impact: 'Other services affected during report runs',
          recommendation: 'Schedule reports during off-peak hours'
        }
      ],
      dependencies: [
        {
          service: 'Data Warehouse',
          criticality: 'medium',
          impact: 'Reports unavailable during warehouse maintenance',
          mitigation: 'Read replica for reporting queries'
        }
      ],
      codeHealth: {
        defectDensity: { value: '0.2 defects/KLOC', benchmark: '0.5 defects/KLOC', status: 'excellent' },
        hotspotFiles: { value: 'ReportGenerator.java (3 defects)', benchmark: '<10 defects per file', status: 'excellent' }
      },
      stabilityFactors: [
        'Well-documented APIs with comprehensive test coverage',
        'Clear separation of concerns with minimal dependencies',
        'Regular refactoring keeps technical debt low',
        'Experienced team ownership with good practices'
      ],
      newJoinerGuidance: [
        {
          priority: 'Medium',
          task: 'Understand reporting architecture',
          resources: 'Report templates, data source mapping',
          timeEstimate: '1 hour'
        },
        {
          priority: 'Low',
          task: 'Review query optimization techniques',
          resources: 'Performance tuning guide, indexing strategies',
          timeEstimate: '45 minutes'
        }
      ]
    }
  ];

  const getRiskBadge = (riskLevel: string) => {
    switch (riskLevel) {
      case 'high':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">High Risk Module</span>;
      case 'medium':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">Medium Risk Module</span>;
      case 'low':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Low Risk Module</span>;
      default:
        return null;
    }
  };

  const getHealthStatusIcon = (status: string) => {
    switch (status) {
      case 'excellent':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'good':
        return <CheckCircle className="w-4 h-4 text-blue-500" />;
      case 'acceptable':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'needs-improvement':
        return <AlertTriangle className="w-4 h-4 text-orange-500" />;
      case 'critical':
        return <AlertTriangle className="w-4 h-4 text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          🏗️ Application Module Intelligence
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-4xl mx-auto">
          AI analysis of 89 modules based on defect patterns, service metrics, and release data
        </p>
      </motion.div>

      {/* Module Cards */}
      <div className="space-y-8">
        {modules.map((module, index) => (
          <motion.div
            key={module.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className="bg-white dark:bg-[#1A1A1A] rounded-2xl shadow-xl dark:shadow-none dark:border border-gray-100 dark:border-white/[0.06] overflow-hidden"
          >
            {/* Module Header */}
            <div className={`bg-gradient-to-r ${module.color} p-6 text-white`}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-white/20 rounded-lg">
                    <module.icon className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">{module.name}</h3>
                    <div className="flex items-center space-x-3 mt-2">
                      {getRiskBadge(module.riskLevel)}
                      <span className="text-white/90">
                        Based on {module.defectCount} defects analyzed
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold">{module.defectCount}</div>
                  <div className="text-white/80">Total Defects</div>
                </div>
              </div>
            </div>

            <div className="p-8">
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Left Column - Issues and Performance */}
                <div className="space-y-8">
                  {/* Common Issues */}
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                      <Target className="w-5 h-5 text-blue-600 mr-2" />
                      Common Issues (Based on {module.defectCount} defects)
                    </h4>
                    
                    <div className="space-y-4">
                      {module.commonIssues.map((issue, issueIndex) => (
                        <div key={issueIndex} className="bg-gray-50 dark:bg-white/[0.03] rounded-lg p-4 border-l-4 border-blue-500">
                          <div className="flex items-center justify-between mb-2">
                            <h5 className="font-semibold text-gray-900 dark:text-white">{issue.type}</h5>
                            <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs font-medium px-2.5 py-0.5 rounded-full">
                              {issue.frequency} occurrences
                            </span>
                          </div>
                          
                          <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">{issue.description}</p>

                          <div className="space-y-2 text-sm">
                            <div>
                              <span className="font-medium text-red-700 dark:text-red-300">Root Cause:</span>
                              <span className="text-gray-600 dark:text-gray-400 ml-2">{issue.rootCause}</span>
                            </div>
                            <div>
                              <span className="font-medium text-green-700 dark:text-green-300">Typical Fix:</span>
                              <span className="text-gray-600 dark:text-gray-400 ml-2">{issue.typicalFix}</span>
                            </div>
                            <div>
                              <span className="font-medium text-blue-700 dark:text-blue-300">Prevention:</span>
                              <span className="text-gray-600 dark:text-gray-400 ml-2">{issue.preventionTips}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Performance Patterns */}
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                      <TrendingUp className="w-5 h-5 text-purple-600 mr-2" />
                      Service Performance Patterns
                    </h4>

                    <div className="space-y-3">
                      {module.performancePatterns.map((pattern, patternIndex) => (
                        <div key={patternIndex} className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
                          <div className="font-medium text-gray-900 dark:text-white mb-2">{pattern.pattern}</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                            <span className="font-medium text-red-600 dark:text-red-300">Impact:</span> {pattern.impact}
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            <span className="font-medium text-green-600 dark:text-green-300">Recommendation:</span> {pattern.recommendation}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Column - Dependencies and Health */}
                <div className="space-y-8">
                  {/* Critical Dependencies */}
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                      <Link className="w-5 h-5 text-orange-600 mr-2" />
                      Critical Dependencies
                    </h4>

                    <div className="space-y-3">
                      {module.dependencies.map((dep, depIndex) => (
                        <div key={depIndex} className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4 border-l-4 border-orange-400">
                          <div className="flex items-center justify-between mb-2">
                            <h5 className="font-semibold text-gray-900 dark:text-white">{dep.service}</h5>
                            <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${
                              dep.criticality === 'high'
                                ? 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300'
                                : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300'
                            }`}>
                              {dep.criticality} criticality
                            </span>
                          </div>
                          
                          <div className="text-sm space-y-1">
                            <div>
                              <span className="font-medium text-red-700 dark:text-red-300">Impact:</span>
                              <span className="text-gray-600 dark:text-gray-400 ml-2">{dep.impact}</span>
                            </div>
                            <div>
                              <span className="font-medium text-green-700 dark:text-green-300">Mitigation:</span>
                              <span className="text-gray-600 dark:text-gray-400 ml-2">{dep.mitigation}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Code Health Insights */}
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                      <Code className="w-5 h-5 text-indigo-600 mr-2" />
                      Code Health Insights
                    </h4>

                    <div className="space-y-4">
                      <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-gray-900 dark:text-white">Defect Density</span>
                          {getHealthStatusIcon(module.codeHealth.defectDensity.status)}
                        </div>
                        <div className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                          {module.codeHealth.defectDensity.value}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                          Industry benchmark: {module.codeHealth.defectDensity.benchmark}
                        </div>
                        {module.codeHealth.defectDensity.status !== 'excellent' && (
                          <div className="text-sm text-blue-700 dark:text-blue-300 font-medium">
                            Focus on payment validation logic - 60% of defects
                          </div>
                        )}
                      </div>

                      <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-gray-900 dark:text-white">Hotspot Files</span>
                          {getHealthStatusIcon(module.codeHealth.hotspotFiles.status)}
                        </div>
                        <div className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                          {module.codeHealth.hotspotFiles.value}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                          Should be: {module.codeHealth.hotspotFiles.benchmark}
                        </div>
                        {module.codeHealth.hotspotFiles.status === 'critical' && (
                          <div className="text-sm text-red-700 dark:text-red-300 font-medium">
                            Refactor PaymentProcessor into smaller components
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Stability Factors (for low-risk modules) */}
                  {module.stabilityFactors && (
                    <div>
                      <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                        Stable Module Characteristics
                      </h4>

                      <div className="space-y-2">
                        {module.stabilityFactors.map((factor, factorIndex) => (
                          <div key={factorIndex} className="flex items-start space-x-2 text-sm text-gray-600 dark:text-gray-400">
                            <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>{factor}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* New Joiner Guidance */}
              <div className="mt-8 pt-8 border-t border-gray-200 dark:border-white/[0.06]">
                <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
                  <Users className="w-5 h-5 text-green-600 mr-2" />
                  🎓 New Joiner Quick Start
                </h4>

                <div className="grid md:grid-cols-3 gap-6">
                  {module.newJoinerGuidance.map((guidance, guidanceIndex) => (
                    <div key={guidanceIndex} className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border border-green-200 dark:border-green-800/30">
                      <div className="flex items-center justify-between mb-3">
                        <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${
                          guidance.priority === 'High'
                            ? 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300'
                            : guidance.priority === 'Medium'
                            ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300'
                            : 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300'
                        }`}>
                          {guidance.priority} Priority
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-500">{guidance.timeEstimate}</span>
                      </div>

                      <h5 className="font-semibold text-gray-900 dark:text-white mb-2">{guidance.task}</h5>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{guidance.resources}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}