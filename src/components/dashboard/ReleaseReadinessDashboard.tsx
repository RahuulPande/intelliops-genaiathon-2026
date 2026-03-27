'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle,
  XCircle,
  AlertTriangle,
  Clock,
  Calendar,
  Users,
  FileText,
  TrendingUp,
  TrendingDown,
  Shield,
  Bug,
  Target,
  Send,
  Download,
  Play,
  Pause,
  BarChart3,
  PieChart,
  Activity,
  Zap,
  Mail,
  Flag,
  ArrowRight,
  RefreshCw
} from 'lucide-react';
import { 
  CircularProgressbar, 
  buildStyles 
} from 'react-circular-progressbar';
import { formatPercentage } from '@/lib/utils/formatters';
import 'react-circular-progressbar/dist/styles.css';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart as RechartsPieChart,
  Cell
} from 'recharts';
import { format, addDays, subDays } from 'date-fns';

interface TestingPhase {
  id: string;
  name: string;
  progress: number; // 0-100
  total: number;
  passed: number;
  failed: number;
  blocked: number;
  status: 'not-started' | 'in-progress' | 'completed' | 'blocked';
  startDate: Date;
  endDate: Date;
  lead: string;
  criticalPath: boolean;
}

interface BlockingIssue {
  id: string;
  title: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  assignee: string;
  phase: string;
  createdAt: Date;
  estimatedResolution: Date;
  description: string;
  impact: string;
}

interface ReleaseTimeline {
  id: string;
  milestone: string;
  date: Date;
  status: 'completed' | 'on-track' | 'at-risk' | 'delayed';
  dependencies: string[];
  owner: string;
}

interface RiskItem {
  id: string;
  category: string;
  description: string;
  probability: number; // 0-100
  impact: number; // 0-100
  mitigation: string;
  owner: string;
  status: 'open' | 'mitigated' | 'accepted';
}

interface ReleaseReadinessDashboardProps {
  className?: string;
}

export default function ReleaseReadinessDashboard({ className = '' }: ReleaseReadinessDashboardProps) {
  const [testingPhases, setTestingPhases] = useState<TestingPhase[]>([]);
  const [blockingIssues, setBlockingIssues] = useState<BlockingIssue[]>([]);
  const [timeline, setTimeline] = useState<ReleaseTimeline[]>([]);
  const [risks, setRisks] = useState<RiskItem[]>([]);
  const [selectedView, setSelectedView] = useState<'overview' | 'testing' | 'risks' | 'timeline'>('overview');
  const [autoRefresh, setAutoRefresh] = useState(true);

  // Generate release readiness data
  useEffect(() => {
    const generateData = () => {
      // Testing Phases
      const phases: TestingPhase[] = [
        {
          id: 'sit',
          name: 'System Integration Testing (SIT)',
          progress: 85,
          total: 245,
          passed: 208,
          failed: 12,
          blocked: 5,
          status: 'in-progress',
          startDate: subDays(new Date(), 10),
          endDate: addDays(new Date(), 2),
          lead: 'Sarah Johnson',
          criticalPath: true
        },
        {
          id: 'uat',
          name: 'User Acceptance Testing (UAT)',
          progress: 65,
          total: 180,
          passed: 117,
          failed: 8,
          blocked: 3,
          status: 'in-progress',
          startDate: subDays(new Date(), 5),
          endDate: addDays(new Date(), 5),
          lead: 'Michael Chen',
          criticalPath: true
        },
        {
          id: 'regression',
          name: 'Regression Testing',
          progress: 92,
          total: 320,
          passed: 294,
          failed: 15,
          blocked: 2,
          status: 'in-progress',
          startDate: subDays(new Date(), 8),
          endDate: addDays(new Date(), 1),
          lead: 'Emily Rodriguez',
          criticalPath: false
        },
        {
          id: 'performance',
          name: 'Performance Testing',
          progress: 78,
          total: 95,
          passed: 74,
          failed: 3,
          blocked: 1,
          status: 'in-progress',
          startDate: subDays(new Date(), 6),
          endDate: addDays(new Date(), 3),
          lead: 'David Kim',
          criticalPath: true
        },
        {
          id: 'security',
          name: 'Security Testing',
          progress: 88,
          total: 125,
          passed: 110,
          failed: 5,
          blocked: 0,
          status: 'in-progress',
          startDate: subDays(new Date(), 12),
          endDate: addDays(new Date(), 1),
          lead: 'Lisa Wang',
          criticalPath: false
        }
      ];

      // Blocking Issues
      const issues: BlockingIssue[] = [
        {
          id: 'issue_1',
          title: 'API Gateway timeout during peak load',
          severity: 'critical',
          assignee: 'John Smith',
          phase: 'Performance Testing',
          createdAt: subDays(new Date(), 2),
          estimatedResolution: addDays(new Date(), 1),
          description: 'Gateway times out when handling >1000 concurrent requests',
          impact: 'Blocks performance validation for go-live'
        },
        {
          id: 'issue_2',
          title: 'User login fails in Edge browser',
          severity: 'high',
          assignee: 'Maria Garcia',
          phase: 'UAT',
          createdAt: subDays(new Date(), 1),
          estimatedResolution: addDays(new Date(), 2),
          description: 'Authentication module incompatible with Edge browser',
          impact: 'Affects 15% of user base'
        },
        {
          id: 'issue_3',
          title: 'Database connection pool leak',
          severity: 'medium',
          assignee: 'Robert Taylor',
          phase: 'SIT',
          createdAt: subDays(new Date(), 3),
          estimatedResolution: new Date(),
          description: 'Memory leak in connection pooling causing gradual degradation',
          impact: 'System stability over extended periods'
        }
      ];

      // Release Timeline
      const timelineItems: ReleaseTimeline[] = [
        {
          id: 'code_freeze',
          milestone: 'Code Freeze',
          date: subDays(new Date(), 14),
          status: 'completed',
          dependencies: [],
          owner: 'Development Team'
        },
        {
          id: 'sit_complete',
          milestone: 'SIT Sign-off',
          date: addDays(new Date(), 2),
          status: 'on-track',
          dependencies: ['sit'],
          owner: 'QA Team'
        },
        {
          id: 'uat_complete',
          milestone: 'UAT Sign-off',
          date: addDays(new Date(), 5),
          status: 'at-risk',
          dependencies: ['uat'],
          owner: 'Business Users'
        },
        {
          id: 'prod_deploy',
          milestone: 'Production Deployment',
          date: addDays(new Date(), 8),
          status: 'on-track',
          dependencies: ['sit_complete', 'uat_complete'],
          owner: 'DevOps Team'
        },
        {
          id: 'go_live',
          milestone: 'Go-Live',
          date: addDays(new Date(), 10),
          status: 'on-track',
          dependencies: ['prod_deploy'],
          owner: 'Release Manager'
        }
      ];

      // Risk Assessment
      const riskItems: RiskItem[] = [
        {
          id: 'risk_1',
          category: 'Technical',
          description: 'Third-party API dependency failure',
          probability: 30,
          impact: 85,
          mitigation: 'Implement circuit breaker and fallback mechanisms',
          owner: 'Architecture Team',
          status: 'open'
        },
        {
          id: 'risk_2',
          category: 'Business',
          description: 'Key business user unavailable for final sign-off',
          probability: 40,
          impact: 70,
          mitigation: 'Identify backup approvers and delegate authority',
          owner: 'Business Analyst',
          status: 'mitigated'
        },
        {
          id: 'risk_3',
          category: 'Infrastructure',
          description: 'Production environment capacity constraints',
          probability: 25,
          impact: 90,
          mitigation: 'Scale infrastructure and conduct load testing',
          owner: 'Infrastructure Team',
          status: 'open'
        },
        {
          id: 'risk_4',
          category: 'Process',
          description: 'Incomplete rollback procedures',
          probability: 35,
          impact: 60,
          mitigation: 'Document and test rollback scenarios',
          owner: 'DevOps Team',
          status: 'mitigated'
        }
      ];

      setTestingPhases(phases);
      setBlockingIssues(issues);
      setTimeline(timelineItems);
      setRisks(riskItems);
    };

    generateData();
    
    if (autoRefresh) {
      const interval = setInterval(() => {
        // Simulate progress updates
        setTestingPhases(prev => prev.map(phase => ({
          ...phase,
          progress: Math.min(100, Math.round((phase.progress + Math.random() * 2) * 100) / 100)
        })));
      }, 10000);
      
      return () => clearInterval(interval);
    }
  }, [autoRefresh]);

  // Calculate overall readiness score
  const readinessScore = useMemo(() => {
    const testingWeight = 0.4;
    const issuesWeight = 0.3;
    const timelineWeight = 0.2;
    const riskWeight = 0.1;

    // Testing score (average progress)
    const testingScore = testingPhases.reduce((sum, phase) => sum + phase.progress, 0) / testingPhases.length;

    // Issues score (inverse of critical issues)
    const criticalIssues = blockingIssues.filter(issue => issue.severity === 'critical').length;
    const issuesScore = Math.max(0, 100 - criticalIssues * 25);

    // Timeline score (milestones on track)
    const onTrackMilestones = timeline.filter(item => item.status === 'completed' || item.status === 'on-track').length;
    const timelineScore = (onTrackMilestones / timeline.length) * 100;

    // Risk score (inverse of high-impact risks)
    const highRisks = risks.filter(risk => risk.probability * risk.impact / 100 > 50).length;
    const riskScore = Math.max(0, 100 - highRisks * 20);

    return Math.round(
      testingScore * testingWeight +
      issuesScore * issuesWeight +
      timelineScore * timelineWeight +
      riskScore * riskWeight
    );
  }, [testingPhases, blockingIssues, timeline, risks]);

  const getGoNoGoStatus = () => {
    if (readinessScore >= 85) return { status: 'go', color: 'text-green-600 bg-green-50', text: 'GO' };
    if (readinessScore >= 70) return { status: 'caution', color: 'text-yellow-600 bg-yellow-50', text: 'CAUTION' };
    return { status: 'no-go', color: 'text-red-600 bg-red-50', text: 'NO-GO' };
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-600 bg-red-50 border-red-200';
      case 'high': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-50';
      case 'on-track': return 'text-blue-600 bg-blue-50';
      case 'at-risk': return 'text-yellow-600 bg-yellow-50';
      case 'delayed': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const goNoGoStatus = getGoNoGoStatus();

  return (
    <div className={`bg-white rounded-lg shadow-lg ${className}`}>
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white p-6 rounded-t-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Flag className="w-8 h-8" />
            <div>
              <h2 className="text-2xl font-bold">Release Readiness Dashboard</h2>
              <p className="text-green-100">Real-time release preparation and go/no-go assessment</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-center">
              <p className="text-sm text-green-100">Readiness Score</p>
              <p className="text-3xl font-bold">{readinessScore}%</p>
            </div>
            <div className={`px-4 py-2 rounded-lg font-bold text-lg ${goNoGoStatus.color}`}>
              {goNoGoStatus.text}
            </div>
            <button
              onClick={() => setAutoRefresh(!autoRefresh)}
              className={`p-2 rounded-lg transition-colors ${
                autoRefresh ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
              }`}
            >
              {autoRefresh ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="border-b bg-gray-50">
        <div className="flex space-x-0">
          {['overview', 'testing', 'risks', 'timeline'].map((view) => (
            <button
              key={view}
              onClick={() => setSelectedView(view as any)}
              className={`px-6 py-3 font-medium capitalize transition-colors ${
                selectedView === view
                  ? 'text-blue-600 border-b-2 border-blue-600 bg-white'
                  : 'text-gray-600 hover:text-blue-600 hover:bg-white'
              }`}
            >
              {view}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {selectedView === 'overview' && (
          <div className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg border">
                <div className="flex items-center space-x-2 text-blue-600 mb-2">
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-medium">Tests Passed</span>
                </div>
                <p className="text-2xl font-bold text-blue-700">
                  {testingPhases.reduce((sum, phase) => sum + phase.passed, 0)}
                </p>
                <p className="text-sm text-gray-500">
                  /{testingPhases.reduce((sum, phase) => sum + phase.total, 0)} total
                </p>
              </div>
              <div className="bg-red-50 p-4 rounded-lg border">
                <div className="flex items-center space-x-2 text-red-600 mb-2">
                  <Bug className="w-5 h-5" />
                  <span className="font-medium">Blocking Issues</span>
                </div>
                <p className="text-2xl font-bold text-red-700">{blockingIssues.length}</p>
                <p className="text-sm text-gray-500">
                  {blockingIssues.filter(i => i.severity === 'critical').length} critical
                </p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg border">
                <div className="flex items-center space-x-2 text-green-600 mb-2">
                  <Calendar className="w-5 h-5" />
                  <span className="font-medium">On Schedule</span>
                </div>
                <p className="text-2xl font-bold text-green-700">
                  {timeline.filter(t => t.status === 'completed' || t.status === 'on-track').length}
                </p>
                <p className="text-sm text-gray-500">/{timeline.length} milestones</p>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg border">
                <div className="flex items-center space-x-2 text-yellow-600 mb-2">
                  <AlertTriangle className="w-5 h-5" />
                  <span className="font-medium">Open Risks</span>
                </div>
                <p className="text-2xl font-bold text-yellow-700">
                  {risks.filter(r => r.status === 'open').length}
                </p>
                <p className="text-sm text-gray-500">requiring mitigation</p>
              </div>
            </div>

            {/* Testing Progress Overview */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Testing Progress</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {testingPhases.map((phase) => (
                  <div key={phase.id} className="bg-white p-4 rounded-lg text-center">
                    <div className="w-16 h-16 mx-auto mb-3">
                      <CircularProgressbar
                        value={phase.progress}
                        text={formatPercentage(phase.progress)}
                        styles={buildStyles({
                          pathColor: phase.progress >= 90 ? '#10B981' : phase.progress >= 70 ? '#F59E0B' : '#EF4444',
                          textColor: '#1F2937',
                          trailColor: '#F3F4F6'
                        })}
                      />
                    </div>
                    <h4 className="font-medium text-sm text-gray-900 mb-1">{phase.name}</h4>
                    <p className="text-xs text-gray-500">{phase.passed}/{phase.total} passed</p>
                    {phase.criticalPath && (
                      <span className="inline-block mt-1 px-2 py-1 text-xs bg-red-100 text-red-600 rounded">
                        Critical Path
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {selectedView === 'testing' && (
          <div className="space-y-6">
            {testingPhases.map((phase) => (
              <motion.div
                key={phase.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="border rounded-lg p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{phase.name}</h3>
                    <p className="text-sm text-gray-600">Lead: {phase.lead}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-blue-600">{formatPercentage(phase.progress)}</div>
                    <div className="text-sm text-gray-500">Complete</div>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${phase.progress}%` }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div className="text-center">
                    <div className="text-lg font-semibold text-green-600">{phase.passed}</div>
                    <div className="text-sm text-gray-500">Passed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold text-red-600">{phase.failed}</div>
                    <div className="text-sm text-gray-500">Failed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold text-yellow-600">{phase.blocked}</div>
                    <div className="text-sm text-gray-500">Blocked</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold text-gray-600">{phase.total}</div>
                    <div className="text-sm text-gray-500">Total</div>
                  </div>
                </div>

                <div className="flex justify-between text-sm text-gray-600">
                  <span>Start: {format(phase.startDate, 'MMM dd, yyyy')}</span>
                  <span>End: {format(phase.endDate, 'MMM dd, yyyy')}</span>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {selectedView === 'risks' && (
          <div className="space-y-4">
            {/* Risk Matrix */}
            <div className="bg-gray-50 p-6 rounded-lg mb-6">
              <h3 className="text-lg font-semibold mb-4">Risk Assessment Matrix</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-3">
                  {risks.map((risk) => (
                    <div key={risk.id} className="bg-white p-4 rounded-lg border">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium text-gray-900">{risk.category}</h4>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          risk.status === 'open' ? 'bg-red-100 text-red-600' :
                          risk.status === 'mitigated' ? 'bg-green-100 text-green-600' :
                          'bg-yellow-100 text-yellow-600'
                        }`}>
                          {risk.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{risk.description}</p>
                      <div className="grid grid-cols-2 gap-4 mb-3">
                        <div>
                          <div className="text-xs text-gray-500">Probability</div>
                          <div className="text-lg font-semibold">{risk.probability}%</div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-500">Impact</div>
                          <div className="text-lg font-semibold">{risk.impact}%</div>
                        </div>
                      </div>
                      <div className="text-sm">
                        <div className="text-gray-500">Mitigation:</div>
                        <div className="text-gray-700">{risk.mitigation}</div>
                      </div>
                      <div className="text-xs text-gray-500 mt-2">Owner: {risk.owner}</div>
                    </div>
                  ))}
                </div>
                <div className="bg-white p-4 rounded-lg border h-fit">
                  <h4 className="font-medium mb-4">Risk Distribution</h4>
                  <ResponsiveContainer width="100%" height={200}>
                    <RechartsPieChart>
                      <RechartsPieChart data={[
                        { name: 'Technical', value: risks.filter(r => r.category === 'Technical').length },
                        { name: 'Business', value: risks.filter(r => r.category === 'Business').length },
                        { name: 'Infrastructure', value: risks.filter(r => r.category === 'Infrastructure').length },
                        { name: 'Process', value: risks.filter(r => r.category === 'Process').length }
                      ]}>
                        {/* Add pie chart cells here */}
                      </RechartsPieChart>
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        )}

        {selectedView === 'timeline' && (
          <div className="space-y-4">
            {timeline.map((milestone, index) => (
              <motion.div
                key={milestone.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center space-x-4 p-4 border rounded-lg"
              >
                <div className={`w-4 h-4 rounded-full ${
                  milestone.status === 'completed' ? 'bg-green-500' :
                  milestone.status === 'on-track' ? 'bg-blue-500' :
                  milestone.status === 'at-risk' ? 'bg-yellow-500' :
                  'bg-red-500'
                }`} />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-gray-900">{milestone.milestone}</h4>
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(milestone.status)}`}>
                      {milestone.status.replace('-', ' ')}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    {format(milestone.date, 'MMM dd, yyyy')} • Owner: {milestone.owner}
                  </div>
                  {milestone.dependencies.length > 0 && (
                    <div className="text-xs text-gray-500 mt-1">
                      Dependencies: {milestone.dependencies.join(', ')}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Blocking Issues (shown on all views) */}
        {blockingIssues.length > 0 && (
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4 text-red-600">Blocking Issues</h3>
            <div className="space-y-3">
              {blockingIssues.map((issue) => (
                <motion.div
                  key={issue.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="border-l-4 border-red-500 bg-red-50 p-4 rounded"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h4 className="font-medium text-gray-900">{issue.title}</h4>
                        <span className={`px-2 py-1 text-xs rounded-full border ${getSeverityColor(issue.severity)}`}>
                          {issue.severity}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{issue.description}</p>
                      <div className="text-xs text-gray-500">
                        <span>Assignee: {issue.assignee}</span>
                        <span className="mx-2">•</span>
                        <span>Phase: {issue.phase}</span>
                        <span className="mx-2">•</span>
                        <span>ETA: {format(issue.estimatedResolution, 'MMM dd')}</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 p-3 bg-yellow-50 rounded text-sm">
                    <span className="font-medium">Impact:</span> {issue.impact}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 