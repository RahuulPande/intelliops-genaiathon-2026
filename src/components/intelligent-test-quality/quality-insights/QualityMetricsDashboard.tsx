'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  Target, 
  TrendingUp, 
  TrendingDown, 
  CheckCircle,
  XCircle,
  AlertTriangle,
  Clock,
  Award,
  Zap,
  Shield,
  BarChart3
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadialBarChart, RadialBar, PieChart, Pie, Cell } from 'recharts';

export default function QualityMetricsDashboard() {
  const [selectedTimeframe, setSelectedTimeframe] = useState<'week' | 'month' | 'quarter'>('month');

  // Quality Score Calculation
  const qualityMetrics = {
    overallScore: 94.2,
    testCoverage: 87.5,
    defectDensity: 0.12, // defects per KLOC
    customerSatisfaction: 4.6,
    performanceScore: 92.1,
    securityScore: 96.8,
    trend: 2.1 // positive improvement
  };

  const qualityTrendData = useMemo(() => {
    const days = selectedTimeframe === 'week' ? 7 : selectedTimeframe === 'month' ? 30 : 90;
    return Array.from({ length: days }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (days - i - 1));
      
      const baseScore = 92 + Math.sin(i / 10) * 3;
      
      return {
        date: date.toISOString().split('T')[0],
        qualityScore: Math.max(85, Math.min(98, baseScore + Math.random() * 4 - 2)),
        testCoverage: Math.max(80, Math.min(95, 85 + Math.random() * 10)),
        defectRate: Math.max(0, Math.min(2, 0.5 + Math.random() * 1)),
        customerSat: Math.max(4.0, Math.min(5.0, 4.4 + Math.random() * 0.6))
      };
    });
  }, [selectedTimeframe]);

  const moduleQuality = [
    { module: 'Authentication', score: 96.2, coverage: 92, defects: 2, trend: 'up' },
    { module: 'Payments', score: 89.7, coverage: 85, defects: 5, trend: 'down' },
    { module: 'Account Management', score: 94.8, coverage: 88, defects: 1, trend: 'up' },
    { module: 'Reports', score: 91.3, coverage: 83, defects: 3, trend: 'stable' },
    { module: 'Admin', score: 87.9, coverage: 79, defects: 8, trend: 'down' }
  ];

  const qualityGates = [
    { 
      name: 'Unit Test Coverage', 
      threshold: 80, 
      current: 87.5, 
      status: 'pass',
      trend: '+2.3%'
    },
    { 
      name: 'Integration Test Coverage', 
      threshold: 70, 
      current: 74.2, 
      status: 'pass',
      trend: '+1.8%'
    },
    { 
      name: 'Code Quality Score', 
      threshold: 85, 
      current: 92.1, 
      status: 'pass',
      trend: '+0.9%'
    },
    { 
      name: 'Security Scan Score', 
      threshold: 90, 
      current: 96.8, 
      status: 'pass',
      trend: '+1.2%'
    },
    { 
      name: 'Performance Score', 
      threshold: 85, 
      current: 82.4, 
      status: 'fail',
      trend: '-2.1%'
    },
    { 
      name: 'Documentation Coverage', 
      threshold: 75, 
      current: 68.9, 
      status: 'warn',
      trend: '+0.5%'
    }
  ];

  const qualityDistribution = [
    { category: 'Excellent (90-100)', count: 45, color: '#10B981' },
    { category: 'Good (80-89)', count: 32, color: '#F59E0B' },
    { category: 'Needs Improvement (70-79)', count: 18, color: '#EF4444' },
    { category: 'Poor (<70)', count: 5, color: '#6B7280' }
  ];

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'down': return <TrendingDown className="w-4 h-4 text-red-500" />;
      default: return <Target className="w-4 h-4 text-yellow-500" />;
    }
  };

  const getGateStatusIcon = (status: string) => {
    switch (status) {
      case 'pass': return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'fail': return <XCircle className="w-5 h-5 text-red-500" />;
      case 'warn': return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      default: return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  const getGateStatusColor = (status: string) => {
    switch (status) {
      case 'pass': return 'bg-green-50 border-green-200';
      case 'fail': return 'bg-red-50 border-red-200';
      case 'warn': return 'bg-yellow-50 border-yellow-200';
      default: return 'bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header with Controls */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Quality Metrics Dashboard</h2>
          <p className="text-gray-600">Comprehensive quality scoring and performance metrics</p>
        </div>
        
        <select 
          value={selectedTimeframe}
          onChange={(e) => setSelectedTimeframe(e.target.value as 'week' | 'month' | 'quarter')}
          className="border border-gray-300 rounded-lg px-3 py-2"
        >
          <option value="week">Last Week</option>
          <option value="month">Last Month</option>
          <option value="quarter">Last Quarter</option>
        </select>
      </div>

      {/* Overall Quality Score */}
      <div className="bg-gradient-to-r from-green-500 to-teal-600 rounded-xl p-8 text-white">
        <div className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, type: "spring" }}
            className="inline-flex items-center justify-center w-32 h-32 bg-white/20 rounded-full mb-4"
          >
            <div className="text-4xl font-bold">{qualityMetrics.overallScore}</div>
          </motion.div>
          
          <h3 className="text-2xl font-bold mb-2">Overall Quality Score</h3>
          <div className="flex items-center justify-center space-x-2">
            <TrendingUp className="w-5 h-5" />
            <span className="text-lg">+{qualityMetrics.trend} from last period</span>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-6">
            <div className="text-center">
              <div className="text-xl font-bold">{qualityMetrics.testCoverage}%</div>
              <div className="text-sm text-green-100">Test Coverage</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold">{qualityMetrics.defectDensity}</div>
              <div className="text-sm text-green-100">Defect Density</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold">{qualityMetrics.customerSatisfaction}/5</div>
              <div className="text-sm text-green-100">Customer Satisfaction</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold">{qualityMetrics.performanceScore}%</div>
              <div className="text-sm text-green-100">Performance</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold">{qualityMetrics.securityScore}%</div>
              <div className="text-sm text-green-100">Security</div>
            </div>
          </div>
        </div>
      </div>

      {/* Quality Trend Chart */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold mb-4">Quality Score Trend</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={qualityTrendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis domain={[80, 100]} />
              <Tooltip />
              <Line type="monotone" dataKey="qualityScore" stroke="#10B981" strokeWidth={3} name="Quality Score" />
              <Line type="monotone" dataKey="testCoverage" stroke="#3B82F6" strokeWidth={2} name="Test Coverage %" />
              <Line type="monotone" dataKey="customerSat" stroke="#8B5CF6" strokeWidth={2} name="Customer Satisfaction" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Module Quality Breakdown */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold mb-4">Module Quality Breakdown</h3>
          <div className="space-y-4">
            {moduleQuality.map((module) => (
              <div key={module.module} className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">{module.module}</span>
                    {getTrendIcon(module.trend)}
                  </div>
                  <div className="flex items-center space-x-4 text-sm">
                    <span className="text-gray-600">Score: {module.score}</span>
                    <span className="text-blue-600">Coverage: {module.coverage}%</span>
                    <span className="text-red-600">{module.defects} defects</span>
                  </div>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className={`h-3 rounded-full ${
                      module.score >= 95 ? 'bg-green-500' :
                      module.score >= 90 ? 'bg-blue-500' :
                      module.score >= 85 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${module.score}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quality Distribution */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold mb-4">Quality Score Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={qualityDistribution}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="count"
                  label={({ category, count }) => `${category}: ${count}`}
                >
                  {qualityDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Quality Gates */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold mb-6">Quality Gates Status</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {qualityGates.map((gate, index) => (
            <motion.div
              key={gate.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className={`p-4 rounded-lg border-2 ${getGateStatusColor(gate.status)}`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  {getGateStatusIcon(gate.status)}
                  <span className="font-medium text-sm">{gate.name}</span>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  gate.trend.startsWith('+') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {gate.trend}
                </span>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Threshold: {gate.threshold}%</span>
                  <span className="font-medium">Current: {gate.current}%</span>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      gate.status === 'pass' ? 'bg-green-500' :
                      gate.status === 'warn' ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${Math.min(100, (gate.current / gate.threshold) * 100)}%` }}
                  ></div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Quality Insights */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold mb-4">Quality Insights & Recommendations</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-green-50 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Award className="w-5 h-5 text-green-600" />
              <span className="font-medium text-green-900">Excellence Achieved</span>
            </div>
            <p className="text-sm text-green-700">
              Authentication module maintains 96.2% quality score. Document and replicate best practices across other modules.
            </p>
          </div>
          
          <div className="bg-yellow-50 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Zap className="w-5 h-5 text-yellow-600" />
              <span className="font-medium text-yellow-900">Performance Alert</span>
            </div>
            <p className="text-sm text-yellow-700">
              Performance gate failing at 82.4%. Investigate load testing results and optimize critical paths.
            </p>
          </div>
          
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Shield className="w-5 h-5 text-blue-600" />
              <span className="font-medium text-blue-900">Security Strength</span>
            </div>
            <p className="text-sm text-blue-700">
              Security score of 96.8% exceeds industry benchmarks. Continue current security practices and review quarterly.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}