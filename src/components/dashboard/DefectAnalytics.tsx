'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Bug,
  TrendingUp,
  TrendingDown,
  Clock,
  DollarSign,
  AlertTriangle,
  Target,
  Users,
  Brain,
  Zap,
  BarChart3,
  PieChart as PieChartIcon,
  Activity,
  Search
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  LineChart, 
  Line, 
  Tooltip, 
  Legend,
  ScatterChart,
  Scatter
} from 'recharts';
import useDashboardStore from '@/store/dashboard';

interface DefectMetrics {
  totalDefects: number;
  openDefects: number;
  resolvedDefects: number;
  avgResolutionTime: number;
  costImpact: number;
  topModule: string;
  criticalDefects: number;
}

export default function DefectAnalytics() {
  const { defectPatterns, defectTrends } = useDashboardStore();
  const [selectedTimeframe, setSelectedTimeframe] = useState<'week' | 'month' | 'quarter'>('month');
  const [selectedModule, setSelectedModule] = useState<string>('all');

  // Mock defect data for comprehensive analytics
  const mockDefectPatterns = useMemo(() => [
    {
      id: '1',
      pattern: 'Authentication timeout errors',
      frequency: 45,
      modules: ['Authentication', 'Session Management'],
      rootCause: 'Session timeout configuration too aggressive',
      averageResolutionTime: 4.2,
      similarDefects: ['AUTH-001', 'AUTH-023', 'AUTH-034'],
      costImpact: 12500
    },
    {
      id: '2', 
      pattern: 'Payment processing failures',
      frequency: 32,
      modules: ['Payments', 'Transaction Processing'],
      rootCause: 'Third-party gateway timeouts',
      averageResolutionTime: 8.7,
      similarDefects: ['PAY-002', 'PAY-018', 'PAY-025'],
      costImpact: 25000
    },
    {
      id: '3',
      pattern: 'UI rendering inconsistencies',
      frequency: 28,
      modules: ['Frontend', 'UI Components'],
      rootCause: 'CSS specificity conflicts',
      averageResolutionTime: 2.1,
      similarDefects: ['UI-005', 'UI-012', 'UI-019'],
      costImpact: 5200
    },
    {
      id: '4',
      pattern: 'Database connection pooling issues',
      frequency: 19,
      modules: ['Database', 'Connection Management'],
      rootCause: 'Connection pool size misconfiguration',
      averageResolutionTime: 12.3,
      similarDefects: ['DB-003', 'DB-015', 'DB-028'],
      costImpact: 18700
    },
    {
      id: '5',
      pattern: 'API rate limiting errors',
      frequency: 15,
      modules: ['API Gateway', 'Rate Limiting'],
      rootCause: 'Inconsistent rate limiting policies',
      averageResolutionTime: 6.8,
      similarDefects: ['API-007', 'API-021'],
      costImpact: 8300
    }
  ], []);

  const mockDefectTrends = useMemo(() => [
    { period: 'Week 1', newDefects: 12, resolvedDefects: 8, avgResolutionTime: 5.2, module: 'Authentication', severity: 'high' as const },
    { period: 'Week 2', newDefects: 15, resolvedDefects: 12, avgResolutionTime: 4.8, module: 'Payments', severity: 'critical' as const },
    { period: 'Week 3', newDefects: 9, resolvedDefects: 14, avgResolutionTime: 3.9, module: 'Frontend', severity: 'medium' as const },
    { period: 'Week 4', newDefects: 11, resolvedDefects: 10, avgResolutionTime: 6.1, module: 'Database', severity: 'high' as const }
  ], []);

  // Calculate overall metrics
  const defectMetrics = useMemo((): DefectMetrics => {
    const totalDefects = mockDefectPatterns.reduce((sum, pattern) => sum + pattern.frequency, 0);
    const totalCost = mockDefectPatterns.reduce((sum, pattern) => sum + pattern.costImpact, 0);
    const avgResolutionTime = mockDefectPatterns.reduce((sum, pattern) => sum + pattern.averageResolutionTime, 0) / mockDefectPatterns.length;
    const topModule = mockDefectPatterns.sort((a, b) => b.frequency - a.frequency)[0]?.modules[0] || 'Unknown';
    
    return {
      totalDefects,
      openDefects: Math.floor(totalDefects * 0.3),
      resolvedDefects: Math.floor(totalDefects * 0.7),
      avgResolutionTime,
      costImpact: totalCost,
      topModule,
      criticalDefects: Math.floor(totalDefects * 0.15)
    };
  }, [mockDefectPatterns]);

  // Module defect density data
  const moduleDefectDensity = useMemo(() => {
    const modules = ['Authentication', 'Payments', 'Frontend', 'Database', 'API Gateway', 'Reports', 'Admin'];
    return modules.map(module => {
      const modulePatterns = mockDefectPatterns.filter(pattern => 
        pattern.modules.some(m => m.toLowerCase().includes(module.toLowerCase()))
      );
      const defectCount = modulePatterns.reduce((sum, pattern) => sum + pattern.frequency, 0);
      const avgResolutionTime = modulePatterns.length > 0 
        ? modulePatterns.reduce((sum, pattern) => sum + pattern.averageResolutionTime, 0) / modulePatterns.length
        : 0;
      
      return {
        module,
        defects: defectCount || Math.floor(Math.random() * 20) + 5,
        density: (defectCount || Math.floor(Math.random() * 20) + 5) / 100, // defects per 100 LOC
        avgResolutionTime: avgResolutionTime || Math.random() * 10 + 2,
        severity: defectCount > 30 ? 'high' : defectCount > 15 ? 'medium' : 'low'
      };
    });
  }, [mockDefectPatterns]);

  // Defect prediction data
  const defectPredictions = useMemo(() => {
    const modules = ['Authentication', 'Payments', 'Frontend', 'Database'];
    return modules.map(module => ({
      module,
      predictedDefects: Math.floor(Math.random() * 15) + 5,
      confidence: Math.floor(Math.random() * 30) + 70,
      riskLevel: Math.random() > 0.7 ? 'high' : Math.random() > 0.4 ? 'medium' : 'low'
    }));
  }, []);

  // Developer performance insights
  const developerInsights = useMemo(() => [
    { developer: 'Alice Johnson', defectsIntroduced: 3, defectsFixed: 12, efficiency: 4.0, quality: 92 },
    { developer: 'Bob Smith', defectsIntroduced: 7, defectsFixed: 8, efficiency: 1.1, quality: 78 },
    { developer: 'Carol Davis', defectsIntroduced: 2, defectsFixed: 15, efficiency: 7.5, quality: 96 },
    { developer: 'David Wilson', defectsIntroduced: 5, defectsFixed: 10, efficiency: 2.0, quality: 85 },
    { developer: 'Eve Brown', defectsIntroduced: 4, defectsFixed: 9, efficiency: 2.3, quality: 88 }
  ], []);

  // Resolution time trend
  const resolutionTimeTrend = [
    { month: 'Jan', avgTime: 6.2, target: 4.0 },
    { month: 'Feb', avgTime: 5.8, target: 4.0 },
    { month: 'Mar', avgTime: 5.1, target: 4.0 },
    { month: 'Apr', avgTime: 4.9, target: 4.0 },
    { month: 'May', avgTime: 4.3, target: 4.0 },
    { month: 'Jun', avgTime: 3.8, target: 4.0 }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return '#EF4444';
      case 'medium': return '#F59E0B';
      case 'low': return '#10B981';
      default: return '#6B7280';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Defect Analytics</h2>
          <p className="text-gray-600 mt-1">AI-powered defect pattern analysis and predictions</p>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={selectedModule}
            onChange={(e) => setSelectedModule(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm bg-white"
          >
            <option value="all">All Modules</option>
            <option value="authentication">Authentication</option>
            <option value="payments">Payments</option>
            <option value="frontend">Frontend</option>
            <option value="database">Database</option>
          </select>
          <div className="flex items-center space-x-2">
            {(['week', 'month', 'quarter'] as const).map((timeframe) => (
              <button
                key={timeframe}
                onClick={() => setSelectedTimeframe(timeframe)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedTimeframe === timeframe
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-300'
                }`}
              >
                {timeframe.charAt(0).toUpperCase() + timeframe.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: 'Total Defects', value: defectMetrics.totalDefects, icon: Bug, color: 'text-red-600', trend: '-12%' },
          { title: 'Avg Resolution Time', value: `${defectMetrics.avgResolutionTime.toFixed(1)}h`, icon: Clock, color: 'text-blue-600', trend: '-8%' },
          { title: 'Cost Impact', value: `$${(defectMetrics.costImpact / 1000).toFixed(0)}K`, icon: DollarSign, color: 'text-green-600', trend: '-15%' },
          { title: 'Critical Defects', value: defectMetrics.criticalDefects, icon: AlertTriangle, color: 'text-orange-600', trend: '-5%' }
        ].map((metric, index) => {
          const IconComponent = metric.icon;
          return (
            <motion.div
              key={metric.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-lg p-6 border border-gray-200 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center justify-between mb-2">
                <div className={`p-3 rounded-lg bg-gray-50 ${metric.color}`}>
                  <IconComponent className="w-6 h-6" />
                </div>
                <span className="text-sm font-medium text-green-600">{metric.trend}</span>
              </div>
              <h3 className="text-sm font-medium text-gray-600">{metric.title}</h3>
              <p className="text-3xl font-bold text-gray-900 mt-1">{metric.value}</p>
            </motion.div>
          );
        })}
      </div>

      {/* AI Pattern Analysis */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white rounded-lg p-6 border border-gray-200"
      >
        <div className="flex items-center space-x-3 mb-4">
          <Brain className="w-6 h-6 text-purple-600" />
          <h3 className="text-lg font-semibold text-gray-900">AI-Discovered Defect Patterns</h3>
          <span className="px-2 py-1 bg-purple-100 text-purple-600 text-xs font-medium rounded-full">NLP Clustering</span>
        </div>
        <div className="space-y-4">
          {mockDefectPatterns.slice(0, 3).map((pattern, index) => (
            <div key={pattern.id} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-semibold text-sm">{index + 1}</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900">{pattern.pattern}</h4>
                  <div className="flex items-center space-x-3">
                    <span className="text-sm text-gray-600">{pattern.frequency} occurrences</span>
                    <span className="text-sm font-medium text-red-600">${(pattern.costImpact / 1000).toFixed(0)}K impact</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-2">
                  <strong>Root Cause:</strong> {pattern.rootCause}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span>Modules: {pattern.modules.join(', ')}</span>
                    <span>Avg Resolution: {pattern.averageResolutionTime}h</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    {pattern.similarDefects.slice(0, 3).map((defectId) => (
                      <span key={defectId} className="px-2 py-1 bg-blue-100 text-blue-600 text-xs rounded">
                        {defectId}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Module Defect Density */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-lg p-6 border border-gray-200"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Defect Density by Module</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={moduleDefectDensity}>
                <XAxis dataKey="module" tick={{ fontSize: 11 }} angle={-45} textAnchor="end" height={80} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip 
                  formatter={(value, name) => [
                    name === 'defects' ? `${value} defects` : `${value} per 100 LOC`,
                    name === 'defects' ? 'Total Defects' : 'Density'
                  ]}
                />
                <Bar dataKey="defects" fill="#3B82F6" />
                <Bar dataKey="density" fill="#10B981" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Resolution Time Trend */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-white rounded-lg p-6 border border-gray-200"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Resolution Time Trend</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={resolutionTimeTrend}>
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip formatter={(value, name) => [`${value}h`, name === 'avgTime' ? 'Actual' : 'Target']} />
                <Line type="monotone" dataKey="avgTime" stroke="#EF4444" strokeWidth={3} name="Actual" />
                <Line type="monotone" dataKey="target" stroke="#10B981" strokeWidth={2} strokeDasharray="5 5" name="Target" />
                <Legend />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Predictions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="bg-white rounded-lg p-6 border border-gray-200"
      >
        <div className="flex items-center space-x-3 mb-4">
          <Zap className="w-6 h-6 text-yellow-600" />
          <h3 className="text-lg font-semibold text-gray-900">AI Defect Predictions (Next Sprint)</h3>
          <span className="px-2 py-1 bg-yellow-100 text-yellow-600 text-xs font-medium rounded-full">Machine Learning</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {defectPredictions.map((prediction) => (
            <div key={prediction.module} className="p-4 border border-gray-200 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">{prediction.module}</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Predicted Defects</span>
                  <span className="font-bold text-gray-900">{prediction.predictedDefects}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Confidence</span>
                  <span className="font-medium text-gray-900">{prediction.confidence}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Risk Level</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(prediction.riskLevel)}`}>
                    {prediction.riskLevel.toUpperCase()}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Developer Performance */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="bg-white rounded-lg border border-gray-200"
      >
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Developer Performance Insights</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Developer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Defects Introduced</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Defects Fixed</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fix Efficiency</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Code Quality Score</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {developerInsights.map((dev) => (
                <tr key={dev.developer} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                        <Users className="w-4 h-4 text-blue-600" />
                      </div>
                      <span className="font-medium text-gray-900">{dev.developer}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      dev.defectsIntroduced <= 3 ? 'bg-green-100 text-green-800' :
                      dev.defectsIntroduced <= 5 ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {dev.defectsIntroduced}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{dev.defectsFixed}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      dev.efficiency >= 3 ? 'bg-green-100 text-green-800' :
                      dev.efficiency >= 2 ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {dev.efficiency.toFixed(1)}x
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className="font-medium text-gray-900 mr-2">{dev.quality}%</span>
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            dev.quality >= 90 ? 'bg-green-500' :
                            dev.quality >= 80 ? 'bg-yellow-500' :
                            'bg-red-500'
                          }`}
                          style={{ width: `${dev.quality}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
} 