'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  Brain, 
  Shield, 
  Target, 
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  GitBranch,
  TestTube,
  Code,
  Database,
  Activity
} from 'lucide-react';
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadialBarChart, RadialBar } from 'recharts';

export default function AIReleaseHealthScore() {
  const [selectedTimeframe, setSelectedTimeframe] = useState<'week' | 'month' | 'quarter'>('month');

  // AI-calculated release health score
  const releaseHealthData = {
    overallScore: 87.3,
    trend: 3.2, // positive improvement
    confidence: 96, // AI confidence in the score
    riskLevel: 'LOW',
    lastUpdated: new Date().toISOString(),
    nextRecommendedAction: 'Address medium priority issues before deployment window'
  };

  // Health factors contributing to the score
  const healthFactors = [
    {
      category: 'Code Quality',
      score: 92.1,
      weight: 25,
      status: 'excellent',
      trend: 'up',
      issues: 2,
      details: 'Code coverage: 94%, Technical debt: Low, Complexity: Acceptable'
    },
    {
      category: 'Test Coverage',
      score: 89.4,
      weight: 20,
      status: 'good',
      trend: 'up',
      issues: 1,
      details: 'Unit tests: 94%, Integration: 85%, E2E: 78%'
    },
    {
      category: 'Branch Consistency',
      score: 81.7,
      weight: 25,
      status: 'warning',
      trend: 'down',
      issues: 3,
      details: '3 missing merges detected across release branches'
    },
    {
      category: 'Dependencies',
      score: 95.2,
      weight: 15,
      status: 'excellent',
      trend: 'stable',
      issues: 0,
      details: 'All dependencies up-to-date, no security vulnerabilities'
    },
    {
      category: 'Performance',
      score: 84.8,
      weight: 15,
      status: 'good',
      trend: 'up',
      issues: 2,
      details: 'Response times within SLA, minor optimization opportunities'
    }
  ];

  // Historical health score trend
  const healthTrend = useMemo(() => {
    const days = selectedTimeframe === 'week' ? 7 : selectedTimeframe === 'month' ? 30 : 90;
    return Array.from({ length: days }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (days - i - 1));
      
      const baseScore = 85 + Math.sin(i / 10) * 5;
      
      return {
        date: date.toISOString().split('T')[0],
        healthScore: Math.max(75, Math.min(95, baseScore + Math.random() * 6 - 3)),
        codeQuality: Math.max(80, Math.min(98, 90 + Math.random() * 8 - 4)),
        testCoverage: Math.max(75, Math.min(95, 87 + Math.random() * 8 - 4)),
        branchConsistency: Math.max(70, Math.min(95, 82 + Math.random() * 10 - 5))
      };
    });
  }, [selectedTimeframe]);

  // AI insights and recommendations
  const aiInsights = [
    {
      type: 'critical',
      title: 'Missing Branch Merges Detected',
      description: 'AI detected 3 defect fixes in August release that are missing from October branch',
      impact: 'HIGH',
      recommendation: 'Merge DEF-1234, DEF-5678, and DEF-9012 to October branch before deployment',
      estimatedCost: '$45,000',
      confidence: 94
    },
    {
      type: 'warning',
      title: 'Performance Regression Risk',
      description: 'Recent changes show 15% slower response time in payment processing',
      impact: 'MEDIUM',
      recommendation: 'Run load tests and optimize database queries before release',
      estimatedCost: '$8,000',
      confidence: 87
    },
    {
      type: 'optimization',
      title: 'Test Coverage Opportunity',
      description: 'AI identified 12 high-risk code paths with insufficient test coverage',
      impact: 'MEDIUM',
      recommendation: 'Add integration tests for payment gateway and user authentication flows',
      estimatedCost: '$12,000',
      confidence: 91
    }
  ];

  // Score calculation breakdown for transparency
  const scoreBreakdown = healthFactors.map(factor => ({
    name: factor.category,
    score: factor.score,
    weight: factor.weight,
    contribution: (factor.score * factor.weight) / 100,
    color: factor.status === 'excellent' ? '#10B981' :
           factor.status === 'good' ? '#3B82F6' :
           factor.status === 'warning' ? '#F59E0B' : '#EF4444'
  }));

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'excellent': return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'good': return <CheckCircle className="w-5 h-5 text-blue-500" />;
      case 'warning': return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'critical': return <XCircle className="w-5 h-5 text-red-500" />;
      default: return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'down': return <TrendingDown className="w-4 h-4 text-red-500" />;
      default: return <Target className="w-4 h-4 text-gray-500" />;
    }
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'critical': return <XCircle className="w-5 h-5 text-red-500" />;
      case 'warning': return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'optimization': return <TrendingUp className="w-5 h-5 text-blue-500" />;
      default: return <Brain className="w-5 h-5 text-purple-500" />;
    }
  };

  const getInsightBgColor = (type: string) => {
    switch (type) {
      case 'critical': return 'bg-red-50 border-red-200';
      case 'warning': return 'bg-yellow-50 border-yellow-200';
      case 'optimization': return 'bg-blue-50 border-blue-200';
      default: return 'bg-purple-50 border-purple-200';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header with Controls */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">AI Release Health Score</h2>
          <p className="text-gray-600">AI-powered assessment of release readiness and risk factors</p>
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

      {/* Overall Health Score */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <Brain className="w-8 h-8" />
              <div>
                <h3 className="text-2xl font-bold">AI Release Health Score</h3>
                <p className="text-blue-100">Last updated: {new Date().toLocaleString()}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              <div>
                <div className="text-3xl font-bold">{releaseHealthData.overallScore}</div>
                <div className="text-sm text-blue-100">Overall Score</div>
              </div>
              <div>
                <div className="text-xl font-bold text-green-300">+{releaseHealthData.trend}</div>
                <div className="text-sm text-blue-100">Improvement</div>
              </div>
              <div>
                <div className="text-xl font-bold">{releaseHealthData.confidence}%</div>
                <div className="text-sm text-blue-100">AI Confidence</div>
              </div>
              <div>
                <div className="text-xl font-bold text-green-300">{releaseHealthData.riskLevel}</div>
                <div className="text-sm text-blue-100">Risk Level</div>
              </div>
            </div>
          </div>
          
          <div className="hidden md:block">
            <div className="w-32 h-32 relative">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  stroke="rgba(255,255,255,0.2)"
                  strokeWidth="10"
                  fill="none"
                />
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  stroke="white"
                  strokeWidth="10"
                  fill="none"
                  strokeDasharray={`${(releaseHealthData.overallScore / 100) * 314} 314`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-2xl font-bold">{releaseHealthData.overallScore}</div>
                  <div className="text-xs">SCORE</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Health Factors Breakdown */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold mb-6">Health Factors Analysis</h3>
        <div className="space-y-4">
          {healthFactors.map((factor, index) => (
            <motion.div
              key={factor.category}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="border rounded-lg p-4"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  {getStatusIcon(factor.status)}
                  <div>
                    <h4 className="font-medium text-gray-900">{factor.category}</h4>
                    <p className="text-sm text-gray-600">{factor.details}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 text-right">
                  <div>
                    <div className="text-lg font-bold">{factor.score}</div>
                    <div className="text-xs text-gray-500">Score</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium">{factor.weight}%</div>
                    <div className="text-xs text-gray-500">Weight</div>
                  </div>
                  <div>
                    <div className="text-sm">{factor.issues} issues</div>
                    <div className="text-xs text-gray-500">Open</div>
                  </div>
                  {getTrendIcon(factor.trend)}
                </div>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className={`h-3 rounded-full ${
                    factor.status === 'excellent' ? 'bg-green-500' :
                    factor.status === 'good' ? 'bg-blue-500' :
                    factor.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${factor.score}%` }}
                ></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Health Score Trend */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold mb-4">Health Score Trend</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={healthTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis domain={[70, 100]} />
                <Tooltip />
                <Line type="monotone" dataKey="healthScore" stroke="#6366F1" strokeWidth={3} name="Overall Health" />
                <Line type="monotone" dataKey="codeQuality" stroke="#10B981" strokeWidth={2} name="Code Quality" />
                <Line type="monotone" dataKey="branchConsistency" stroke="#F59E0B" strokeWidth={2} name="Branch Consistency" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Score Contribution Breakdown */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold mb-4">Score Contribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={scoreBreakdown}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="contribution"
                  label={({ name, contribution }) => `${name}: ${contribution.toFixed(1)}`}
                >
                  {scoreBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* AI Insights and Recommendations */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold mb-6">AI Insights & Recommendations</h3>
        <div className="space-y-4">
          {aiInsights.map((insight, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className={`border-2 rounded-lg p-4 ${getInsightBgColor(insight.type)}`}
            >
              <div className="flex items-start space-x-3">
                {getInsightIcon(insight.type)}
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-gray-900">{insight.title}</h4>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        insight.impact === 'HIGH' ? 'bg-red-100 text-red-800' :
                        insight.impact === 'MEDIUM' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {insight.impact} IMPACT
                      </span>
                      <span className="text-xs text-gray-500">{insight.confidence}% confidence</span>
                    </div>
                  </div>
                  <p className="text-gray-700 mb-3">{insight.description}</p>
                  <div className="bg-white rounded-lg p-3 border">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-medium text-gray-900">Recommendation:</span>
                        <p className="text-sm text-gray-700 mt-1">{insight.recommendation}</p>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-red-600">{insight.estimatedCost}</div>
                        <div className="text-xs text-gray-500">Potential cost</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Next Action Recommendation */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6 border border-purple-200">
        <div className="flex items-center space-x-3 mb-4">
          <Brain className="w-6 h-6 text-purple-600" />
          <h3 className="text-lg font-semibold text-gray-900">AI Recommendation</h3>
        </div>
        <p className="text-gray-700 text-lg">{releaseHealthData.nextRecommendedAction}</p>
        <div className="mt-4 flex items-center space-x-4">
          <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
            View Detailed Action Plan
          </button>
          <button className="border border-purple-600 text-purple-600 px-4 py-2 rounded-lg hover:bg-purple-50 transition-colors">
            Schedule Review Meeting
          </button>
        </div>
      </div>
    </div>
  );
}