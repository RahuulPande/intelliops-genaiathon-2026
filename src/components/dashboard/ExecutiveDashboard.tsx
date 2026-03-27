'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  AlertTriangle,
  CheckCircle,
  Clock,
  Target,
  BarChart3,
  Download,
  Calendar,
  Activity,
  Award,
  Zap,
  Shield,
  Globe
} from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Legend, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import useDashboardStore from '@/store/dashboard';

interface ExecutiveKPIs {
  systemUptime: number;
  totalIncidents: number;
  revenueLoss: number;
  customerImpact: number;
  goLiveConfidence: number;
  costSavings: number;
  riskScore: number;
  slaCompliance: number;
}

export default function ExecutiveDashboard() {
  const { services, incidents, businessImpacts, executiveMetrics } = useDashboardStore();
  const [selectedPeriod, setSelectedPeriod] = useState<'monthly' | 'quarterly' | 'yearly'>('monthly');

  // Mock executive data
  const mockExecutiveKPIs = useMemo((): ExecutiveKPIs => ({
    systemUptime: 99.97,
    totalIncidents: 12,
    revenueLoss: 45320,
    customerImpact: 2340,
    goLiveConfidence: 87,
    costSavings: 234500,
    riskScore: 23, // lower is better
    slaCompliance: 96.8
  }), []);

  const mockBusinessMetrics = useMemo(() => [
    {
      metric: 'Customer Satisfaction',
      current: 4.2,
      previous: 4.0,
      target: 4.5,
      unit: '/5.0',
      trend: 'up' as const,
      changePercent: 5.0
    },
    {
      metric: 'Transaction Volume',
      current: 1250000,
      previous: 1180000,
      target: 1300000,
      unit: '/month',
      trend: 'up' as const,
      changePercent: 5.9
    },
    {
      metric: 'System Availability',
      current: 99.97,
      previous: 99.89,
      target: 99.95,
      unit: '%',
      trend: 'up' as const,
      changePercent: 0.08
    },
    {
      metric: 'Mean Resolution Time',
      current: 23,
      previous: 34,
      target: 20,
      unit: 'minutes',
      trend: 'down' as const,
      changePercent: -32.4
    },
    {
      metric: 'Cost per Transaction',
      current: 0.12,
      previous: 0.15,
      target: 0.10,
      unit: '$',
      trend: 'down' as const,
      changePercent: -20.0
    },
    {
      metric: 'Security Score',
      current: 94,
      previous: 91,
      target: 95,
      unit: '/100',
      trend: 'up' as const,
      changePercent: 3.3
    }
  ], []);

  const mockRevenueImpact = useMemo(() => [
    { period: 'Jan', revenue: 2.4, loss: 0.08, incidents: 8 },
    { period: 'Feb', revenue: 2.6, loss: 0.12, incidents: 12 },
    { period: 'Mar', revenue: 2.5, loss: 0.05, incidents: 5 },
    { period: 'Apr', revenue: 2.8, loss: 0.15, incidents: 15 },
    { period: 'May', revenue: 2.7, loss: 0.08, incidents: 9 },
    { period: 'Jun', revenue: 2.9, loss: 0.04, incidents: 4 }
  ], []);

  const mockRiskAssessment = [
    { category: 'Infrastructure', score: 85, trend: 'stable', priority: 'medium' },
    { category: 'Security', score: 94, trend: 'improving', priority: 'low' },
    { category: 'Compliance', score: 92, trend: 'improving', priority: 'low' },
    { category: 'Performance', score: 78, trend: 'declining', priority: 'high' },
    { category: 'Data Quality', score: 88, trend: 'stable', priority: 'medium' }
  ];

  const mockPredictiveInsights = [
    {
      id: 'insight-1',
      type: 'Cost Optimization',
      prediction: 'Infrastructure costs could be reduced by 15% through resource optimization',
      confidence: 87,
      potentialSaving: 45000,
      timeframe: '3 months',
      action: 'Implement auto-scaling policies'
    },
    {
      id: 'insight-2',
      type: 'Risk Mitigation',
      prediction: 'Payment system may experience capacity issues during Black Friday',
      confidence: 92,
      potentialSaving: 125000,
      timeframe: '2 months',
      action: 'Scale payment infrastructure by 40%'
    },
    {
      id: 'insight-3',
      type: 'Performance Enhancement',
      prediction: 'Database optimization could improve response times by 30%',
      confidence: 78,
      potentialSaving: 18000,
      timeframe: '1 month',
      action: 'Implement query optimization recommendations'
    }
  ];

  const mockMonthlyTrends = [
    { month: 'Jan', uptime: 99.89, incidents: 8, revenue: 2.4, satisfaction: 4.0 },
    { month: 'Feb', uptime: 99.92, incidents: 12, revenue: 2.6, satisfaction: 4.1 },
    { month: 'Mar', uptime: 99.95, incidents: 5, revenue: 2.5, satisfaction: 4.2 },
    { month: 'Apr', uptime: 99.87, incidents: 15, revenue: 2.8, satisfaction: 3.9 },
    { month: 'May', uptime: 99.96, incidents: 9, revenue: 2.7, satisfaction: 4.2 },
    { month: 'Jun', uptime: 99.97, incidents: 4, revenue: 2.9, satisfaction: 4.2 }
  ];

  // ROI calculation
  const mockROIData = [
    { initiative: 'AI Monitoring', investment: 150000, saving: 320000, roi: 113 },
    { initiative: 'Cloud Migration', investment: 280000, saving: 450000, roi: 61 },
    { initiative: 'Security Upgrade', investment: 95000, saving: 185000, roi: 95 },
    { initiative: 'Performance Optimization', investment: 45000, saving: 125000, roi: 178 }
  ];

  const getRiskColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 75) return 'text-yellow-600';
    if (score >= 60) return 'text-orange-600';
    return 'text-red-600';
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
      case 'improving':
        return <TrendingUp className="w-4 h-4 text-green-600" />;
      case 'down':
      case 'declining':
        return <TrendingDown className="w-4 h-4 text-red-600" />;
      default:
        return <Activity className="w-4 h-4 text-gray-600" />;
    }
  };

  const formatCurrency = (value: number) => {
    if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `$${(value / 1000).toFixed(0)}K`;
    return `$${value.toLocaleString()}`;
  };

  const formatNumber = (value: number) => {
    if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `${(value / 1000).toFixed(0)}K`;
    return value.toLocaleString();
  };

  const handleExportReport = () => {
    console.log('Exporting executive report...');
    // Mock export functionality
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Executive Dashboard</h2>
          <p className="text-gray-600 mt-1">High-level business metrics and predictive insights</p>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value as typeof selectedPeriod)}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm bg-white"
          >
            <option value="monthly">Monthly</option>
            <option value="quarterly">Quarterly</option>
            <option value="yearly">Yearly</option>
          </select>
          <button
            onClick={handleExportReport}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <Download className="w-4 h-4" />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* Executive KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { 
            title: 'System Uptime', 
            value: `${mockExecutiveKPIs.systemUptime}%`, 
            icon: CheckCircle, 
            color: 'text-green-600',
            target: '99.95%',
            trend: '+0.08%'
          },
          { 
            title: 'Revenue Protected', 
            value: formatCurrency(2900000 - mockExecutiveKPIs.revenueLoss), 
            icon: DollarSign, 
            color: 'text-blue-600',
            target: '$3.0M',
            trend: '-$45K lost'
          },
          { 
            title: 'Go-Live Confidence', 
            value: `${mockExecutiveKPIs.goLiveConfidence}%`, 
            icon: Target, 
            color: 'text-purple-600',
            target: '90%',
            trend: '+5%'
          },
          { 
            title: 'Risk Score', 
            value: mockExecutiveKPIs.riskScore, 
            icon: Shield, 
            color: 'text-orange-600',
            target: '< 20',
            trend: '-3 pts'
          }
        ].map((kpi, index) => {
          const IconComponent = kpi.icon;
          return (
            <motion.div
              key={kpi.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-lg p-6 border border-gray-200 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg bg-gray-50 ${kpi.color}`}>
                  <IconComponent className="w-6 h-6" />
                </div>
                <div className="text-right">
                  <div className="text-xs text-gray-500">Target</div>
                  <div className="text-sm font-medium text-gray-700">{kpi.target}</div>
                </div>
              </div>
              <h3 className="text-sm font-medium text-gray-600 mb-1">{kpi.title}</h3>
              <p className="text-3xl font-bold text-gray-900">{kpi.value}</p>
              <p className="text-sm text-green-600 mt-1">{kpi.trend}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Business Metrics Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white rounded-lg p-6 border border-gray-200"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Business Metrics</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockBusinessMetrics.map((metric) => (
            <div key={metric.metric} className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-gray-900">{metric.metric}</h4>
                {getTrendIcon(metric.trend)}
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Current</span>
                  <span className="font-bold text-gray-900">
                    {metric.unit === '/month' ? formatNumber(metric.current) : metric.current}
                    {metric.unit !== '/month' && metric.unit}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Previous</span>
                  <span className="text-gray-700">
                    {metric.unit === '/month' ? formatNumber(metric.previous) : metric.previous}
                    {metric.unit !== '/month' && metric.unit}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Target</span>
                  <span className="text-gray-700">
                    {metric.unit === '/month' ? formatNumber(metric.target) : metric.target}
                    {metric.unit !== '/month' && metric.unit}
                  </span>
                </div>
                <div className="pt-2 border-t border-gray-200">
                  <span className={`text-sm font-medium ${
                    (metric.trend === 'up' && metric.changePercent > 0) || 
                    (metric.trend === 'down' && metric.changePercent < 0)
                      ? 'text-green-600' 
                      : 'text-red-600'
                  }`}>
                    {metric.changePercent > 0 ? '+' : ''}{metric.changePercent.toFixed(1)}% change
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Impact Analysis */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-lg p-6 border border-gray-200"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Impact & Loss Analysis</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockRevenueImpact}>
                <XAxis dataKey="period" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip 
                  formatter={(value, name) => [
                    name === 'revenue' ? `$${value}M` : `$${value}M`,
                    name === 'revenue' ? 'Revenue' : 'Loss'
                  ]}
                />
                <Legend />
                <Area type="monotone" dataKey="revenue" stackId="1" stroke="#10B981" fill="#10B981" fillOpacity={0.3} name="Revenue" />
                <Area type="monotone" dataKey="loss" stackId="2" stroke="#EF4444" fill="#EF4444" fillOpacity={0.3} name="Loss" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* ROI Analysis */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-white rounded-lg p-6 border border-gray-200"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">IT Initiative ROI</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockROIData}>
                <XAxis dataKey="initiative" tick={{ fontSize: 11 }} angle={-45} textAnchor="end" height={80} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip formatter={(value) => [`${value}%`, 'ROI']} />
                <Bar dataKey="roi" fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Risk Assessment */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="bg-white rounded-lg p-6 border border-gray-200"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Risk Assessment Matrix</h3>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {mockRiskAssessment.map((risk) => (
            <div key={risk.category} className="p-4 border border-gray-200 rounded-lg text-center">
              <h4 className="font-medium text-gray-900 mb-2">{risk.category}</h4>
              <div className={`text-3xl font-bold mb-2 ${getRiskColor(risk.score)}`}>
                {risk.score}
              </div>
              <div className="flex items-center justify-center space-x-1 mb-2">
                {getTrendIcon(risk.trend)}
                <span className="text-sm text-gray-600">{risk.trend}</span>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                risk.priority === 'high' ? 'bg-red-100 text-red-800' :
                risk.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                'bg-green-100 text-green-800'
              }`}>
                {risk.priority.toUpperCase()} PRIORITY
              </span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Predictive Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="bg-white rounded-lg border border-gray-200"
      >
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <Zap className="w-6 h-6 text-yellow-600" />
            <h3 className="text-lg font-semibold text-gray-900">AI Predictive Insights</h3>
            <span className="px-2 py-1 bg-yellow-100 text-yellow-600 text-xs font-medium rounded-full">
              AI-Powered
            </span>
          </div>
        </div>
        <div className="divide-y divide-gray-200">
          {mockPredictiveInsights.map((insight) => (
            <div key={insight.id} className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                      {insight.type}
                    </span>
                    <span className="text-sm text-gray-600">
                      {insight.confidence}% confidence
                    </span>
                  </div>
                  <p className="text-gray-900 mb-3">{insight.prediction}</p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Potential Saving:</span>
                      <div className="font-semibold text-green-600">{formatCurrency(insight.potentialSaving)}</div>
                    </div>
                    <div>
                      <span className="text-gray-600">Timeframe:</span>
                      <div className="font-semibold text-gray-900">{insight.timeframe}</div>
                    </div>
                    <div>
                      <span className="text-gray-600">Recommended Action:</span>
                      <div className="font-semibold text-blue-600">{insight.action}</div>
                    </div>
                  </div>
                </div>
                <button className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                  Implement
                </button>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Monthly Trends */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0 }}
        className="bg-white rounded-lg p-6 border border-gray-200"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">6-Month Performance Trends</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={mockMonthlyTrends}>
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="uptime" stroke="#10B981" strokeWidth={2} name="Uptime %" />
              <Line type="monotone" dataKey="satisfaction" stroke="#3B82F6" strokeWidth={2} name="Satisfaction (x20)" />
              <Line type="monotone" dataKey="incidents" stroke="#EF4444" strokeWidth={2} name="Incidents" />
              <Line type="monotone" dataKey="revenue" stroke="#8B5CF6" strokeWidth={2} name="Revenue ($M)" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </div>
  );
} 