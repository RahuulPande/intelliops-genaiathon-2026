'use client';

import { motion } from 'framer-motion';
import { 
  Clock,
  Link as LinkIcon,
  Database,
  Shield,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  Zap,
  RefreshCw,
  Network,
  Bug,
  FileText,
  Search,
  Target,
  Award
} from 'lucide-react';

export default function CommonIssuesPatternsSection() {
  const patternCategories = [
    {
      id: 'performance-scalability',
      title: 'Performance & Scalability Issues',
      icon: Zap,
      frequency: '34% of all defects',
      color: 'from-red-500 to-red-600',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      patterns: [
        {
          name: 'Memory Leak → Service Restart Cycle',
          confidence: 94,
          description: 'Services show gradual memory increase over 2-3 days, leading to performance degradation and eventual restart requirement.',
          indicators: [
            'Heap utilization increases >5% daily',
            'Response times degrade after 48h uptime',
            'GC frequency increases over time'
          ],
          commonCauses: [
            { cause: 'Unclosed database connections', frequency: 67 },
            { cause: 'Event listener memory leaks', frequency: 23 },
            { cause: 'Large object retention in caches', frequency: 10 }
          ],
          solutions: [
            {
              title: 'Connection Pool Management',
              successRate: 91,
              steps: [
                'Implement try-with-resources for all DB operations',
                'Add connection leak detection logging',
                'Set appropriate connection timeout values'
              ],
              timeToFix: '2-4 hours',
              preventionCost: '30 minutes additional code review per feature'
            }
          ],
          relatedDefects: [
            'DEF-2849 - Payment Gateway Memory Leak',
            'DEF-2823 - Authentication Service Memory Growth',
            'DEF-2801 - Reporting Service Heap Overflow'
          ]
        },
        {
          name: 'Peak Load → Cascade Failure',
          confidence: 87,
          description: 'High traffic periods cause one service to fail, triggering failures in dependent services due to lack of circuit breaker patterns.',
          indicators: [
            'Response times spike >300% during peak hours',
            'Multiple services fail within 15-minute window',
            'Error rates correlate across service boundaries'
          ],
          commonCauses: [
            { cause: 'Missing circuit breaker implementation', frequency: 78 },
            { cause: 'Insufficient load testing', frequency: 15 },
            { cause: 'Inadequate resource provisioning', frequency: 7 }
          ],
          solutions: [
            {
              title: 'Circuit Breaker + Bulkhead Pattern',
              successRate: 88,
              steps: [
                'Implement Hystrix/Resilience4j circuit breakers',
                'Add dedicated thread pools for external calls',
                'Configure appropriate timeout and retry policies'
              ],
              timeToFix: '1-2 days per service',
              preventionCost: 'Circuit breaker implementation in service template'
            }
          ],
          relatedDefects: [
            'DEF-2834 - Payment Gateway Cascade Failure',
            'DEF-2812 - Authentication Service Overload',
            'DEF-2798 - Load Balancer Configuration Issues'
          ]
        }
      ]
    },
    {
      id: 'integration-data',
      title: 'Integration & Data Issues',
      icon: LinkIcon,
      frequency: '28% of all defects',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      patterns: [
        {
          name: 'External API Changes → Internal Failures',
          confidence: 92,
          description: 'Third-party API changes or temporary unavailability cause internal service failures due to insufficient error handling and fallback mechanisms.',
          indicators: [
            'Sudden spike in API call failures',
            'Serialization/deserialization exceptions',
            'Timeout exceptions from external services'
          ],
          commonCauses: [
            { cause: 'No contract testing for external APIs', frequency: 54 },
            { cause: 'Hardcoded API response expectations', frequency: 31 },
            { cause: 'Missing fallback mechanisms', frequency: 15 }
          ],
          solutions: [
            {
              title: 'Defensive Integration Pattern',
              successRate: 85,
              steps: [
                'Implement contract testing for external APIs',
                'Add graceful degradation for API failures',
                'Create fallback mechanisms for critical operations',
                'Implement API version monitoring'
              ],
              timeToFix: '3-5 days per integration',
              preventionCost: 'Contract tests + monitoring setup'
            }
          ],
          relatedDefects: [
            'DEF-2856 - Payment Provider API Changes',
            'DEF-2831 - Credit Score Service Integration',
            'DEF-2807 - Notification Service Failures'
          ]
        },
        {
          name: 'Database Connection Pool Exhaustion',
          confidence: 89,
          description: 'Applications run out of database connections during high load, causing service unavailability and transaction failures.',
          indicators: [
            'Connection timeout exceptions in logs',
            'Service unavailability during peak hours',
            'Thread blocking on connection acquisition'
          ],
          commonCauses: [
            { cause: 'Undersized connection pool', frequency: 45 },
            { cause: 'Long-running transactions not closed', frequency: 32 },
            { cause: 'Connection leaks in error handling', frequency: 23 }
          ],
          solutions: [
            {
              title: 'Connection Pool Optimization',
              successRate: 93,
              steps: [
                'Right-size connection pool based on load testing',
                'Implement connection monitoring and alerting',
                'Add automatic pool expansion during peaks',
                'Audit and fix connection leaks'
              ],
              timeToFix: '1-2 days',
              preventionCost: 'Connection pool monitoring dashboard'
            }
          ],
          relatedDefects: [
            'DEF-2845 - Payment Database Pool Exhaustion',
            'DEF-2821 - User Service Connection Timeout',
            'DEF-2803 - Reporting Database Connections'
          ]
        }
      ]
    },
    {
      id: 'security-compliance',
      title: 'Security & Compliance Issues',
      icon: Shield,
      frequency: '18% of all defects',
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      patterns: [
        {
          name: 'Authentication Token Management Issues',
          confidence: 86,
          description: 'Problems with JWT token validation, refresh, and expiry handling causing user access issues.',
          indicators: [
            'Users unexpectedly logged out',
            'Token validation failures in logs',
            'Inconsistent authentication across services'
          ],
          commonCauses: [
            { cause: 'Clock skew between services', frequency: 52 },
            { cause: 'Inconsistent token expiry policies', frequency: 28 },
            { cause: 'Missing token refresh logic', frequency: 20 }
          ],
          solutions: [
            {
              title: 'Centralized Token Management',
              successRate: 88,
              steps: [
                'Implement NTP synchronization across services',
                'Standardize token expiry and refresh policies',
                'Add token validation with grace periods',
                'Implement centralized token blacklisting'
              ],
              timeToFix: '2-3 days',
              preventionCost: 'Authentication service standardization'
            }
          ],
          relatedDefects: [
            'DEF-2842 - JWT Token Clock Skew',
            'DEF-2828 - Session Timeout Inconsistency',
            'DEF-2814 - Token Refresh Failures'
          ]
        }
      ]
    },
    {
      id: 'configuration-deployment',
      title: 'Configuration & Deployment Issues',
      icon: RefreshCw,
      frequency: '20% of all defects',
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      patterns: [
        {
          name: 'Environment Configuration Drift',
          confidence: 83,
          description: 'Differences in configuration between environments causing unexpected behavior in production.',
          indicators: [
            'Features work in staging but fail in production',
            'Different error rates across environments',
            'Configuration-related deployment rollbacks'
          ],
          commonCauses: [
            { cause: 'Manual configuration management', frequency: 61 },
            { cause: 'Environment-specific hardcoded values', frequency: 25 },
            { cause: 'Missing configuration validation', frequency: 14 }
          ],
          solutions: [
            {
              title: 'Infrastructure as Code + Config Validation',
              successRate: 91,
              steps: [
                'Implement Terraform/CloudFormation for config management',
                'Add configuration validation in CI/CD pipeline',
                'Use environment-agnostic configuration templates',
                'Implement configuration drift detection'
              ],
              timeToFix: '1-2 weeks',
              preventionCost: 'Configuration management setup'
            }
          ],
          relatedDefects: [
            'DEF-2839 - Production Database Config Issue',
            'DEF-2825 - Load Balancer Configuration Drift',
            'DEF-2811 - Environment Variable Mismatch'
          ]
        }
      ]
    }
  ];

  const overallStats = {
    totalDefectsAnalyzed: 1247,
    patternAccuracy: 91,
    avgResolutionTime: '4.2 hours',
    preventionSuccess: '67% reduction in repeated issues'
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
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          🔍 Issue Patterns & Solutions
        </h2>
        <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-8">
          AI-identified patterns from {overallStats.totalDefectsAnalyzed} defects across all modules with proven solutions
        </p>

        {/* Overall Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-1">{overallStats.totalDefectsAnalyzed}</div>
            <div className="text-sm text-gray-600">Defects Analyzed</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-1">{overallStats.patternAccuracy}%</div>
            <div className="text-sm text-gray-600">Pattern Accuracy</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-1">{overallStats.avgResolutionTime}</div>
            <div className="text-sm text-gray-600">Avg Resolution Time</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-600 mb-1">67%</div>
            <div className="text-sm text-gray-600">Issue Prevention</div>
          </div>
        </div>
      </motion.div>

      {/* Pattern Categories */}
      <div className="space-y-12">
        {patternCategories.map((category, categoryIndex) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: categoryIndex * 0.2 }}
            className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
          >
            {/* Category Header */}
            <div className={`bg-gradient-to-r ${category.color} p-6 text-white`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-white/20 rounded-lg">
                    <category.icon className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">{category.title}</h3>
                    <p className="text-white/90 mt-1">{category.frequency}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Patterns List */}
            <div className="p-8">
              <div className="space-y-8">
                {category.patterns.map((pattern, patternIndex) => (
                  <div key={patternIndex} className={`${category.bgColor} rounded-lg p-6 border ${category.borderColor}`}>
                    {/* Pattern Header */}
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-xl font-bold text-gray-900">{pattern.name}</h4>
                      <div className="flex items-center space-x-2">
                        <span className="bg-white text-gray-800 text-xs font-medium px-3 py-1 rounded-full">
                          {pattern.confidence}% confidence
                        </span>
                        <Award className="w-5 h-5 text-yellow-500" />
                      </div>
                    </div>

                    <p className="text-gray-700 mb-6">{pattern.description}</p>

                    <div className="grid lg:grid-cols-2 gap-8">
                      {/* Left Side - Indicators and Causes */}
                      <div className="space-y-6">
                        {/* Pattern Indicators */}
                        <div>
                          <h5 className="font-semibold text-gray-900 mb-3 flex items-center">
                            <Search className="w-4 h-4 text-blue-600 mr-2" />
                            Pattern Indicators
                          </h5>
                          <ul className="space-y-2">
                            {pattern.indicators.map((indicator, indicatorIndex) => (
                              <li key={indicatorIndex} className="flex items-start space-x-2 text-sm">
                                <AlertTriangle className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                                <span className="text-gray-600">{indicator}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Common Causes */}
                        <div>
                          <h5 className="font-semibold text-gray-900 mb-3 flex items-center">
                            <Bug className="w-4 h-4 text-red-600 mr-2" />
                            Common Causes
                          </h5>
                          <div className="space-y-2">
                            {pattern.commonCauses.map((cause, causeIndex) => (
                              <div key={causeIndex} className="flex items-center justify-between bg-white rounded-lg p-3">
                                <span className="text-sm text-gray-700">{cause.cause}</span>
                                <span className="text-xs font-medium bg-red-100 text-red-800 px-2 py-1 rounded-full">
                                  {cause.frequency}%
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Right Side - Solutions */}
                      <div className="space-y-6">
                        {/* Proven Solutions */}
                        <div>
                          <h5 className="font-semibold text-gray-900 mb-3 flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                            Proven Solutions
                          </h5>
                          
                          {pattern.solutions.map((solution, solutionIndex) => (
                            <div key={solutionIndex} className="bg-white rounded-lg p-4 border border-green-200">
                              <div className="flex items-center justify-between mb-3">
                                <h6 className="font-semibold text-gray-900">{solution.title}</h6>
                                <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">
                                  {solution.successRate}% success rate
                                </span>
                              </div>
                              
                              <div className="space-y-3">
                                <div>
                                  <span className="text-sm font-medium text-gray-900">Implementation Steps:</span>
                                  <ol className="mt-2 space-y-1">
                                    {solution.steps.map((step, stepIndex) => (
                                      <li key={stepIndex} className="text-sm text-gray-600 flex items-start space-x-2">
                                        <span className="text-green-600 font-bold">{stepIndex + 1}.</span>
                                        <span>{step}</span>
                                      </li>
                                    ))}
                                  </ol>
                                </div>
                                
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                  <div>
                                    <span className="font-medium text-gray-900">Time to Fix:</span>
                                    <div className="text-blue-600">{solution.timeToFix}</div>
                                  </div>
                                  <div>
                                    <span className="font-medium text-gray-900">Prevention Cost:</span>
                                    <div className="text-purple-600">{solution.preventionCost}</div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Related Defects */}
                        <div>
                          <h5 className="font-semibold text-gray-900 mb-3 flex items-center">
                            <FileText className="w-4 h-4 text-purple-600 mr-2" />
                            Related Defects
                          </h5>
                          <div className="space-y-2">
                            {pattern.relatedDefects.map((defect, defectIndex) => (
                              <div key={defectIndex} className="bg-white rounded-lg p-3 border border-purple-200">
                                <span className="text-sm text-purple-700 font-medium">{defect}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Pattern Analysis Impact */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.0 }}
        className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white text-center"
      >
        <h3 className="text-3xl font-bold mb-6">Pattern Analysis Impact</h3>
        
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="text-4xl font-bold text-yellow-300 mb-2">91%</div>
            <div className="text-blue-100">Pattern Recognition Accuracy</div>
            <div className="text-sm text-blue-200 mt-1">Based on historical validation</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-yellow-300 mb-2">67%</div>
            <div className="text-blue-100">Reduction in Repeated Issues</div>
            <div className="text-sm text-blue-200 mt-1">Teams using pattern guidance</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-yellow-300 mb-2">4.2h</div>
            <div className="text-blue-100">Average Resolution Time</div>
            <div className="text-sm text-blue-200 mt-1">With pattern-based solutions</div>
          </div>
        </div>
        
        <p className="text-blue-100 max-w-4xl mx-auto text-lg">
          Pattern recognition transforms reactive debugging into proactive problem prevention. 
          Teams equipped with this knowledge base solve issues 60% faster and avoid 67% of 
          recurring problems that typically plague new team members.
        </p>
      </motion.div>
    </div>
  );
}