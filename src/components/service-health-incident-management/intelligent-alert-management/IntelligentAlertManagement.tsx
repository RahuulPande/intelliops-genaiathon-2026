'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Brain, 
  Bell, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Users, 
  TrendingUp, 
  TrendingDown,
  Zap,
  Eye,
  EyeOff,
  Filter,
  Search,
  BarChart3,
  DollarSign,
  Shield,
  Activity,
  Target,
  BrainCircuit,
  Lightbulb,
  AlertCircle,
  UserCheck,
  Timer,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
  Plus,
  Settings,
  RefreshCw,
  Play,
  Pause,
  StopCircle
} from 'lucide-react';

interface AlertCategory {
  type: 'critical' | 'important' | 'maintenance' | 'noise';
  count: number;
  title: string;
  description: string;
  confidence: string;
  examples?: string[];
  autoAction?: string;
  savingsMetric?: string;
  suppressed?: boolean;
}

interface PatternCard {
  confidence: number;
  type: string;
  description: string;
  triggerAlert?: string;
  cascadeAlerts?: string[];
  triggerCondition?: string;
  timeWindow?: string;
  context?: string;
  outcome?: string;
  actionType: string;
  actionDescription: string;
  impact: string;
  learningData: string[];
}

interface RouteCard {
  alertType: string;
  severity: string;
  affectedUsers: number;
  primaryEngineer: string;
  primaryReason: string;
  primaryAvailability: string;
  estimatedResolution: string;
  backupEngineer: string;
  backupReason: string;
  backupAvailability: string;
  autoEscalation: string;
  escalationChain: string[];
  routingAccuracy: number;
  resolutionTimeImprovement: number;
}

interface TeamMember {
  name: string;
  fatigueLevel: 'low' | 'medium' | 'high';
  alertLoad: number;
  responseTime: string;
  responseTimeChange: number;
  stressIndicators?: string[];
  aiRecommendation?: string;
  performanceIndicator?: string;
}

interface OptimizationSuggestion {
  priority: 'high' | 'medium' | 'low';
  title: string;
  description: string;
  impactEstimate: string;
  implementation: string;
}

interface AlertProcessingItem {
  timestamp: string;
  alertTitle: string;
  originalSeverity: string;
  aiSeverity?: string;
  source: string;
  status: 'suppressed' | 'escalated' | 'grouped';
  processingSteps: string[];
  reasoning: string;
  savingsMetric?: string;
  autoActions?: string[];
  efficiencyGain?: string;
}

export default function IntelligentAlertManagement() {
  const [activeView, setActiveView] = useState<'overview' | 'patterns' | 'routing' | 'fatigue' | 'live'>('overview');
  const [isLiveMode, setIsLiveMode] = useState(true);

  // Mock data for alert categories
  const alertCategories: AlertCategory[] = [
    {
      type: 'critical',
      count: 23,
      title: 'Business Critical',
      description: 'Require immediate attention',
      confidence: '98% accuracy',
      examples: ['Payment system down', 'Database cluster failure', 'Security breach detected']
    },
    {
      type: 'important',
      count: 89,
      title: 'Performance Impact',
      description: 'Affect user experience',
      confidence: '91% accuracy',
      examples: ['API response time degraded', 'Memory usage above threshold', 'Error rate increase detected']
    },
    {
      type: 'maintenance',
      count: 156,
      title: 'Maintenance Notices',
      description: 'Planned maintenance alerts',
      confidence: '96% accuracy',
      autoAction: 'Auto-scheduled for maintenance windows'
    },
    {
      type: 'noise',
      count: 579,
      title: 'Intelligent Suppression',
      description: 'AI-identified noise - auto-suppressed',
      confidence: '87% accuracy',
      savingsMetric: '579 alerts suppressed = 19.3 hours saved daily',
      suppressed: true
    }
  ];

  // Mock data for pattern recognition
  const patternCards: PatternCard[] = [
    {
      confidence: 94,
      type: 'Cascade Alert Pattern',
      description: 'Database connection timeout triggers 23 downstream service alerts within 2 minutes',
      triggerAlert: 'Database connection timeout (PRIMARY)',
      cascadeAlerts: [
        'API Gateway timeout (SECONDARY)',
        'Authentication service failure (SECONDARY)',
        'Payment processing timeout (SECONDARY)',
        'User session errors (SECONDARY)'
      ],
      actionType: 'Smart Grouping',
      actionDescription: 'Group all cascade alerts under primary root cause alert. Suppress secondary alerts and focus team on root issue.',
      impact: 'Reduced 24 alerts to 1 focused incident',
      learningData: [
        'Pattern observed 47 times in last 3 months',
        'Average cascade: 23 alerts in 127 seconds',
        'Root cause resolution time: 18 minutes average'
      ]
    },
    {
      confidence: 89,
      type: 'False Positive Pattern',
      description: 'Memory usage alerts during backup window (2 AM - 4 AM) are consistently false positives',
      triggerCondition: 'Memory usage > 85% threshold',
      timeWindow: '02:00 - 04:00 daily',
      context: 'Automated backup process running',
      outcome: 'Memory returns to normal after backup completion',
      actionType: 'Time-based Suppression',
      actionDescription: 'Automatically suppress memory alerts during backup windows. Only alert if memory remains high after 4:30 AM.',
      impact: 'Eliminated 62 false alerts per month',
      learningData: [
        'Pattern observed 89 times in last 6 months',
        'False positive rate: 94% during backup windows',
        'No missed critical alerts due to suppression'
      ]
    },
    {
      confidence: 92,
      type: 'Maintenance Correlation',
      description: 'Disk space alerts 24-48 hours before scheduled deployments are predictable and actionable',
      triggerCondition: 'Disk usage > 75%',
      context: 'Scheduled deployment within 48 hours',
      outcome: 'Disk cleanup during deployment prep',
      actionType: 'Proactive Automation',
      actionDescription: 'Auto-trigger disk cleanup process and create deployment preparation ticket. Convert reactive alert into proactive maintenance task.',
      impact: 'Prevented 23 deployment delays in 6 months',
      learningData: [
        'Pattern observed 34 times in last 4 months',
        'Predictive accuracy: 92%',
        'Average time saved: 2.3 hours per deployment'
      ]
    }
  ];

  // Mock data for routing intelligence
  const routeCard: RouteCard = {
    alertType: 'Payment Gateway Timeout',
    severity: 'Critical',
    affectedUsers: 1247,
    primaryEngineer: 'Sarah Chen (Payment Team Lead)',
    primaryReason: 'Resolved 23/25 similar payment issues (92% success rate)',
    primaryAvailability: 'Available (last seen 2 min ago)',
    estimatedResolution: '18 minutes (based on historical pattern)',
    backupEngineer: 'Mike Rodriguez (Senior Backend)',
    backupReason: 'Payment gateway expertise + currently on-call',
    backupAvailability: 'Available',
    autoEscalation: 'If no response in 5 minutes',
    escalationChain: [
      'Payment Team Lead (Sarah Chen)',
      'Backend Team Lead (Mike Rodriguez)',
      'Engineering Manager (David Park)',
      'VP Engineering (Lisa Wang)'
    ],
    routingAccuracy: 89,
    resolutionTimeImprovement: -45
  };

  // Mock data for team fatigue
  const teamMembers: TeamMember[] = [
    {
      name: 'John Doe - DevOps Lead',
      fatigueLevel: 'medium',
      alertLoad: 67,
      responseTime: '8.3 minutes',
      responseTimeChange: 40,
      stressIndicators: [
        'Longer response times to non-critical alerts',
        'Increased escalation rate (15% vs 8% normal)'
      ],
      aiRecommendation: 'Reduce non-critical alert volume by 30% for this team member. Redistribute some monitoring responsibilities to prevent burnout.'
    },
    {
      name: 'Sarah Chen - Payment Team',
      fatigueLevel: 'low',
      alertLoad: 23,
      responseTime: '4.1 minutes',
      responseTimeChange: 0,
      performanceIndicator: 'High alert resolution accuracy (94%)'
    }
  ];

  // Mock data for optimization suggestions
  const optimizationSuggestions: OptimizationSuggestion[] = [
    {
      priority: 'high',
      title: 'Suppress Duplicate Memory Alerts',
      description: '17 memory usage alerts in last 2 days for same issue. Group similar alerts and send summary every 30 minutes instead.',
      impactEstimate: '-23 alerts per day',
      implementation: 'Auto-implement in 24 hours'
    },
    {
      priority: 'medium',
      title: 'Time-based Alert Sensitivity',
      description: 'Reduce sensitivity for non-critical alerts during off-hours (10 PM - 6 AM). Most issues self-resolve and can be addressed during business hours.',
      impactEstimate: '-34 alerts per day',
      implementation: 'Requires team approval'
    },
    {
      priority: 'low',
      title: 'Maintenance Window Intelligence',
      description: 'Automatically suppress predictable alerts during scheduled maintenance windows. AI learns maintenance patterns and adjusts thresholds accordingly.',
      impactEstimate: '-12 alerts per maintenance window',
      implementation: 'Ready to deploy'
    }
  ];

  // Mock data for live alert processing
  const alertProcessingItems: AlertProcessingItem[] = [
    {
      timestamp: '11:23:47 AM',
      alertTitle: 'Memory Usage High - Payment Service',
      originalSeverity: 'Warning',
      source: 'Payment-Service-Pod-3',
      status: 'suppressed',
      processingSteps: [
        'Pattern Recognition: Backup Window False Positive',
        'Confidence: 94% (observed 47 times)',
        'Action: Auto-suppressed',
        'Reasoning: Memory spike during 11:00-12:00 backup window'
      ],
      reasoning: 'Memory spike during 11:00-12:00 backup window',
      savingsMetric: 'Saved 4.2 minutes of investigation time'
    },
    {
      timestamp: '11:25:12 AM',
      alertTitle: 'Database Connection Pool Exhausted',
      originalSeverity: 'Warning',
      aiSeverity: 'Critical',
      source: 'Primary-DB-Cluster',
      status: 'escalated',
      processingSteps: [
        'Pattern Recognition: Cascade Failure Trigger',
        'Confidence: 96% (observed 31 times)',
        'Action: Escalated to Critical + Auto-routed',
        'Reasoning: Historical pattern leads to service cascade in 2.3 minutes'
      ],
      reasoning: 'Historical pattern leads to service cascade in 2.3 minutes',
      autoActions: [
        '🚨 Escalated severity: Warning → Critical',
        '📧 Routed to Sarah Chen (DB expert, available)',
        '📋 Created incident ticket with historical context',
        '🔄 Prepared automated rollback procedures'
      ]
    },
    {
      timestamp: '11:26:03 AM',
      alertTitle: '15 API Timeout Alerts',
      originalSeverity: 'Warning',
      source: 'Multiple Services',
      status: 'grouped',
      processingSteps: [
        'Pattern Recognition: Cascade Effect Detection',
        'Confidence: 98% (root cause correlation)',
        'Action: Grouped under parent incident',
        'Reasoning: All timeouts caused by DB connection exhaustion'
      ],
      reasoning: 'All timeouts caused by DB connection exhaustion',
      efficiencyGain: 'Reduced alert noise: 15 alerts → 1 focused incident'
    }
  ];

  const getCategoryIcon = (type: string) => {
    switch (type) {
      case 'critical': return '🔥';
      case 'important': return '⚠️';
      case 'maintenance': return '🔧';
      case 'noise': return '🔇';
      default: return '📊';
    }
  };

  const getCategoryColor = (type: string) => {
    switch (type) {
      case 'critical': return 'bg-red-50 border-red-200 text-red-800';
      case 'important': return 'bg-orange-50 border-orange-200 text-orange-800';
      case 'maintenance': return 'bg-blue-50 border-blue-200 text-blue-800';
      case 'noise': return 'bg-gray-50 border-gray-200 text-gray-600';
      default: return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 border-red-300 text-red-800';
      case 'medium': return 'bg-yellow-100 border-yellow-300 text-yellow-800';
      case 'low': return 'bg-green-100 border-green-300 text-green-800';
      default: return 'bg-gray-100 border-gray-300 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'suppressed': return 'bg-gray-100 border-gray-300 text-gray-700';
      case 'escalated': return 'bg-red-100 border-red-300 text-red-700';
      case 'grouped': return 'bg-blue-100 border-blue-300 text-blue-700';
      default: return 'bg-gray-100 border-gray-300 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-6 text-white">
        <div className="flex items-center space-x-3 mb-4">
          <Brain className="w-8 h-8" />
          <div>
            <h1 className="text-3xl font-bold">🧠 Intelligent Alert Management</h1>
            <p className="text-purple-100 text-lg">AI-powered alert noise reduction and intelligent prioritization</p>
          </div>
        </div>

        {/* Alert Intelligence Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">847</div>
                <div className="text-sm text-purple-200">Daily Alerts</div>
              </div>
              <div className="text-green-400 text-sm">
                <TrendingDown className="w-5 h-5" />
                <div>-68% noise</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">23</div>
                <div className="text-sm text-purple-200">Critical Alerts</div>
              </div>
              <div className="text-green-400 text-sm">
                <TrendingUp className="w-5 h-5" />
                <div>+34% accuracy</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">87%</div>
                <div className="text-sm text-purple-200">Noise Reduction</div>
              </div>
              <div className="text-green-400 text-sm">
                <Brain className="w-5 h-5" />
                <div>AI Learning</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">4.2 min</div>
                <div className="text-sm text-purple-200">MTTA</div>
              </div>
              <div className="text-green-400 text-sm">
                <TrendingDown className="w-5 h-5" />
                <div>-73% faster</div>
              </div>
            </div>
          </div>
        </div>

        {/* AI Learning Status */}
        <div className="mt-6 bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
          <div className="flex items-center space-x-3">
            <div className="text-2xl">🤖</div>
            <div>
              <div className="font-semibold">AI Learning Active</div>
              <div className="text-sm text-purple-200">Analyzed 12,847 alerts over 6 months</div>
              <div className="text-sm text-green-300">94% accuracy in noise detection</div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-1">
        <div className="flex flex-wrap gap-1">
          {[
            { id: 'overview', label: 'Alert Overview', icon: BarChart3 },
            { id: 'patterns', label: 'Pattern Recognition', icon: BrainCircuit },
            { id: 'routing', label: 'Smart Routing', icon: Target },
            { id: 'fatigue', label: 'Fatigue Prevention', icon: Users },
            { id: 'live', label: 'Live Intelligence', icon: Activity }
          ].map((tab) => {
            const IconComponent = tab.icon;
            const isActive = activeView === tab.id;
            
            return (
              <motion.button
                key={tab.id}
                onClick={() => setActiveView(tab.id as any)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`flex items-center space-x-2 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <IconComponent className="w-4 h-4" />
                <span>{tab.label}</span>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeView}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {activeView === 'overview' && (
            <div className="space-y-6">
              {/* Alert Categorization Dashboard */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Alert Categorization Dashboard</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {alertCategories.map((category) => (
                    <div
                      key={category.type}
                      className={`rounded-lg p-4 border ${getCategoryColor(category.type)} ${
                        category.suppressed ? 'opacity-60' : ''
                      }`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="text-2xl">{getCategoryIcon(category.type)}</div>
                        <div className="text-2xl font-bold">{category.count}</div>
                      </div>
                      <div className="font-semibold mb-1">{category.title}</div>
                      <div className="text-sm mb-2">{category.description}</div>
                      <div className="text-xs font-medium mb-2">{category.confidence}</div>
                      
                      {category.examples && (
                        <div className="space-y-1">
                          {category.examples.map((example, index) => (
                            <div key={index} className="text-xs opacity-75">• {example}</div>
                          ))}
                        </div>
                      )}
                      
                      {category.autoAction && (
                        <div className="mt-2 text-xs font-medium text-green-600">
                          {category.autoAction}
                        </div>
                      )}
                      
                      {category.savingsMetric && (
                        <div className="mt-2 text-xs font-medium text-blue-600">
                          {category.savingsMetric}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeView === 'patterns' && (
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">🔍 AI Alert Pattern Recognition</h3>
                <p className="text-gray-600 mb-6">Machine learning identifies noise patterns and alert relationships</p>
                
                <div className="space-y-6">
                  {patternCards.map((pattern, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-lg font-semibold text-gray-900">{pattern.type}</h4>
                        <div className="flex items-center space-x-2">
                          <div className="text-sm font-medium text-gray-600">Confidence:</div>
                          <div className="text-lg font-bold text-green-600">{pattern.confidence}%</div>
                        </div>
                      </div>
                      
                      <p className="text-gray-700 mb-4">{pattern.description}</p>
                      
                      {pattern.triggerAlert && (
                        <div className="mb-4">
                          <div className="font-medium text-gray-900 mb-2">Pattern Logic:</div>
                          <div className="bg-blue-50 rounded p-3 mb-2">
                            <div className="font-medium text-blue-800">Trigger Alert: {pattern.triggerAlert}</div>
                            {pattern.cascadeAlerts && (
                              <div className="mt-2">
                                <div className="text-sm font-medium text-blue-700 mb-1">Cascade Alerts:</div>
                                {pattern.cascadeAlerts.map((alert, idx) => (
                                  <div key={idx} className="text-sm text-blue-600 ml-4">• {alert}</div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                      
                      {pattern.triggerCondition && (
                        <div className="mb-4">
                          <div className="font-medium text-gray-900 mb-2">Pattern Logic:</div>
                          <div className="bg-blue-50 rounded p-3">
                            <div className="text-sm text-blue-800">
                              <div><strong>Trigger:</strong> {pattern.triggerCondition}</div>
                              {pattern.timeWindow && <div><strong>Time Window:</strong> {pattern.timeWindow}</div>}
                              {pattern.context && <div><strong>Context:</strong> {pattern.context}</div>}
                              {pattern.outcome && <div><strong>Outcome:</strong> {pattern.outcome}</div>}
                            </div>
                          </div>
                        </div>
                      )}
                      
                      <div className="mb-4">
                        <div className="font-medium text-gray-900 mb-2">AI Action:</div>
                        <div className="bg-green-50 rounded p-3">
                          <div className="font-medium text-green-800">{pattern.actionType}</div>
                          <div className="text-sm text-green-700 mt-1">{pattern.actionDescription}</div>
                          <div className="text-sm font-medium text-green-600 mt-2">{pattern.impact}</div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="font-medium text-gray-900 mb-2">Learning Data:</div>
                        <div className="space-y-1">
                          {pattern.learningData.map((data, idx) => (
                            <div key={idx} className="text-sm text-gray-600">• {data}</div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeView === 'routing' && (
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">🎯 Intelligent Alert Routing</h3>
                <p className="text-gray-600 mb-6">AI-powered routing based on expertise, availability, and historical resolution patterns</p>
                
                <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900">{routeCard.alertType}</h4>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span className="bg-red-100 text-red-800 px-2 py-1 rounded">Critical</span>
                          <span>{routeCard.affectedUsers.toLocaleString()} users affected</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <h5 className="font-semibold text-gray-900 mb-3">Primary Route</h5>
                      <div className="bg-blue-50 rounded p-4">
                        <div className="font-medium text-blue-800">{routeCard.primaryEngineer}</div>
                        <div className="text-sm text-blue-700 mt-1">{routeCard.primaryReason}</div>
                        <div className="text-sm text-green-600 mt-2">✓ {routeCard.primaryAvailability}</div>
                        <div className="text-sm text-gray-600 mt-1">Estimated: {routeCard.estimatedResolution}</div>
                      </div>
                    </div>
                    
                    <div>
                      <h5 className="font-semibold text-gray-900 mb-3">Backup Route</h5>
                      <div className="bg-orange-50 rounded p-4">
                        <div className="font-medium text-orange-800">{routeCard.backupEngineer}</div>
                        <div className="text-sm text-orange-700 mt-1">{routeCard.backupReason}</div>
                        <div className="text-sm text-green-600 mt-2">✓ {routeCard.backupAvailability}</div>
                        <div className="text-sm text-red-600 mt-1">{routeCard.autoEscalation}</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <h5 className="font-semibold text-gray-900 mb-3">Escalation Chain</h5>
                    <div className="flex items-center space-x-2">
                      {routeCard.escalationChain.map((level, index) => (
                        <div key={index} className="flex items-center">
                          <div className="bg-gray-200 rounded px-3 py-1 text-sm">
                            {level}
                          </div>
                          {index < routeCard.escalationChain.length - 1 && (
                            <ArrowUpRight className="w-4 h-4 text-gray-400 mx-1" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mt-6 grid grid-cols-2 gap-4">
                    <div className="bg-white rounded p-4 border">
                      <div className="text-2xl font-bold text-green-600">{routeCard.routingAccuracy}%</div>
                      <div className="text-sm text-gray-600">Routing Accuracy</div>
                      <div className="text-xs text-gray-500">Correct first assignment rate</div>
                    </div>
                    <div className="bg-white rounded p-4 border">
                      <div className="text-2xl font-bold text-green-600">{routeCard.resolutionTimeImprovement}%</div>
                      <div className="text-sm text-gray-600">Resolution Time</div>
                      <div className="text-xs text-gray-500">Improvement vs manual routing</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeView === 'fatigue' && (
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">😴 Alert Fatigue Prevention</h3>
                <p className="text-gray-600 mb-6">Monitoring team stress and optimizing alert volume for maximum effectiveness</p>
                
                <div className="space-y-6">
                  {teamMembers.map((member, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-lg font-semibold text-gray-900">{member.name}</h4>
                        <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                          member.fatigueLevel === 'low' ? 'bg-green-100 text-green-800' :
                          member.fatigueLevel === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {member.fatigueLevel.charAt(0).toUpperCase() + member.fatigueLevel.slice(1)} Fatigue
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <div className="text-2xl font-bold text-gray-900">{member.alertLoad}</div>
                          <div className="text-sm text-gray-600">Alerts this week</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-gray-900">{member.responseTime}</div>
                          <div className="text-sm text-gray-600">Average response time</div>
                          {member.responseTimeChange !== 0 && (
                            <div className={`text-xs ${member.responseTimeChange > 0 ? 'text-red-600' : 'text-green-600'}`}>
                              {member.responseTimeChange > 0 ? '+' : ''}{member.responseTimeChange}% vs normal
                            </div>
                          )}
                        </div>
                        {member.performanceIndicator && (
                          <div>
                            <div className="text-sm text-green-600 font-medium">{member.performanceIndicator}</div>
                          </div>
                        )}
                      </div>
                      
                      {member.stressIndicators && (
                        <div className="mb-4">
                          <div className="font-medium text-gray-900 mb-2">Stress Indicators:</div>
                          <div className="space-y-1">
                            {member.stressIndicators.map((indicator, idx) => (
                              <div key={idx} className="text-sm text-red-600">• {indicator}</div>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {member.aiRecommendation && (
                        <div className="bg-blue-50 rounded p-4">
                          <div className="font-medium text-blue-800 mb-2">AI Recommendation:</div>
                          <div className="text-sm text-blue-700">{member.aiRecommendation}</div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                
                <div className="mt-8">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Alert Volume Optimization</h4>
                  <div className="space-y-4">
                    {optimizationSuggestions.map((suggestion, index) => (
                      <div key={index} className={`rounded-lg p-4 border ${getPriorityColor(suggestion.priority)}`}>
                        <div className="flex items-center justify-between mb-2">
                          <h5 className="font-semibold">{suggestion.title}</h5>
                          <div className={`px-2 py-1 rounded text-xs font-medium ${
                            suggestion.priority === 'high' ? 'bg-red-200 text-red-800' :
                            suggestion.priority === 'medium' ? 'bg-yellow-200 text-yellow-800' :
                            'bg-green-200 text-green-800'
                          }`}>
                            {suggestion.priority.toUpperCase()}
                          </div>
                        </div>
                        <p className="text-sm mb-3">{suggestion.description}</p>
                        <div className="flex items-center justify-between text-sm">
                          <span className="font-medium">{suggestion.impactEstimate}</span>
                          <span className="text-gray-600">{suggestion.implementation}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeView === 'live' && (
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">⚡ Real-Time Alert Intelligence</h3>
                    <p className="text-gray-600">AI processes incoming alerts in real-time, applying learned patterns</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setIsLiveMode(!isLiveMode)}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        isLiveMode
                          ? 'bg-green-100 text-green-800 border border-green-300'
                          : 'bg-gray-100 text-gray-800 border border-gray-300'
                      }`}
                    >
                      {isLiveMode ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
                      <span>{isLiveMode ? 'Live' : 'Paused'}</span>
                    </button>
                    <button className="flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium bg-blue-100 text-blue-800 border border-blue-300">
                      <RefreshCw className="w-4 h-4" />
                      <span>Refresh</span>
                    </button>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {alertProcessingItems.map((item, index) => (
                    <div key={index} className={`rounded-lg p-4 border ${getStatusColor(item.status)}`}>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className="text-sm font-mono text-gray-600">{item.timestamp}</div>
                          <div className="font-semibold">{item.alertTitle}</div>
                          <div className="text-sm">
                            {item.originalSeverity}
                            {item.aiSeverity && item.aiSeverity !== item.originalSeverity && (
                              <span className="ml-2 text-red-600">→ {item.aiSeverity}</span>
                            )}
                          </div>
                        </div>
                        <div className="text-xs font-medium">{item.source}</div>
                      </div>
                      
                      <div className="mb-3">
                        <div className="font-medium text-gray-900 mb-2">AI Processing:</div>
                        <div className="space-y-1">
                          {item.processingSteps.map((step, idx) => (
                            <div key={idx} className="text-sm text-gray-700">• {step}</div>
                          ))}
                        </div>
                      </div>
                      
                      {item.autoActions && (
                        <div className="mb-3">
                          <div className="font-medium text-gray-900 mb-2">Auto Actions:</div>
                          <div className="space-y-1">
                            {item.autoActions.map((action, idx) => (
                              <div key={idx} className="text-sm text-blue-700">• {action}</div>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {item.savingsMetric && (
                        <div className="flex items-center space-x-2 text-sm text-green-600">
                          <DollarSign className="w-4 h-4" />
                          <span>{item.savingsMetric}</span>
                        </div>
                      )}
                      
                      {item.efficiencyGain && (
                        <div className="flex items-center space-x-2 text-sm text-blue-600">
                          <Zap className="w-4 h-4" />
                          <span>{item.efficiencyGain}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Business Impact Metrics */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-xl p-6 text-white">
        <h3 className="text-2xl font-bold mb-6">💰 Alert Intelligence Business Impact</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
            <div className="text-2xl font-bold">23.4 hours/day</div>
            <div className="text-sm text-green-200">Time Savings</div>
            <div className="text-xs text-green-100 mt-1">Team time saved through noise reduction</div>
            <div className="text-sm font-medium mt-2">$247,000 annual value</div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
            <div className="text-2xl font-bold">73% faster</div>
            <div className="text-sm text-green-200">MTTA Improvement</div>
            <div className="text-xs text-green-100 mt-1">Mean Time to Acknowledge critical alerts</div>
            <div className="text-sm font-medium mt-2">$89,000 in faster response</div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
            <div className="text-2xl font-bold">87% less noise</div>
            <div className="text-sm text-green-200">Stress Reduction</div>
            <div className="text-xs text-green-100 mt-1">Alert fatigue prevention</div>
            <div className="text-sm font-medium mt-2">Higher team satisfaction</div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
            <div className="text-2xl font-bold">34 incidents/month</div>
            <div className="text-sm text-green-200">Incident Prevention</div>
            <div className="text-xs text-green-100 mt-1">Issues caught and resolved before escalation</div>
            <div className="text-sm font-medium mt-2">$5.06M in prevented costs</div>
          </div>
        </div>
        
        <div className="mt-6 text-center">
          <div className="text-3xl font-bold mb-2">$5.4M Annual Value</div>
          <div className="text-sm text-green-200">2,340% ROI (vs $230K annual AI/ML costs)</div>
        </div>
      </div>
    </div>
  );
}
