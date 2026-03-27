'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  PieChart, 
  BarChart3, 
  Target, 
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  TrendingUp,
  Filter
} from 'lucide-react';
import { PieChart as PieChartComponent, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function TestStatusDistribution() {
  const [viewMode, setViewMode] = useState<'overview' | 'modules' | 'timeline'>('overview');
  const [selectedModule, setSelectedModule] = useState<string>('all');

  // Mock test status data
  const testStatusData = [
    { name: 'Passed', value: 342, color: '#10B981', percentage: 68.4 },
    { name: 'Failed', value: 89, color: '#EF4444', percentage: 17.8 },
    { name: 'In Progress', value: 45, color: '#F59E0B', percentage: 9.0 },
    { name: 'Blocked', value: 24, color: '#6B7280', percentage: 4.8 }
  ];

  const moduleDistribution = [
    { 
      module: 'Authentication', 
      total: 85,
      passed: 68,
      failed: 12,
      inProgress: 3,
      blocked: 2,
      passRate: 85.0,
      trend: 'up'
    },
    { 
      module: 'Payments', 
      total: 120,
      passed: 78,
      failed: 28,
      inProgress: 10,
      blocked: 4,
      passRate: 73.6,
      trend: 'down'
    },
    { 
      module: 'Account Management', 
      total: 95,
      passed: 82,
      failed: 8,
      inProgress: 3,
      blocked: 2,
      passRate: 91.1,
      trend: 'up'
    },
    { 
      module: 'Reports', 
      total: 65,
      passed: 48,
      failed: 12,
      inProgress: 3,
      blocked: 2,
      passRate: 80.0,
      trend: 'stable'
    },
    { 
      module: 'Admin', 
      total: 135,
      passed: 66,
      failed: 29,
      inProgress: 26,
      blocked: 14,
      passRate: 69.5,
      trend: 'down'
    }
  ];

  const timelineData = useMemo(() => {
    return Array.from({ length: 30 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (29 - i));
      
      return {
        date: date.toISOString().split('T')[0],
        passed: Math.floor(Math.random() * 25) + 10,
        failed: Math.floor(Math.random() * 8) + 2,
        inProgress: Math.floor(Math.random() * 5) + 1,
        blocked: Math.floor(Math.random() * 3) + 1
      };
    });
  }, []);

  const testComplexity = [
    { name: 'Simple', count: 180, time: '5-15 min', color: '#10B981' },
    { name: 'Medium', count: 245, time: '15-45 min', color: '#F59E0B' },
    { name: 'Complex', count: 75, time: '45+ min', color: '#EF4444' }
  ];

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'down': return <TrendingUp className="w-4 h-4 text-red-500 rotate-180" />;
      default: return <Target className="w-4 h-4 text-yellow-500" />;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'passed': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'failed': return <XCircle className="w-4 h-4 text-red-500" />;
      case 'inProgress': return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'blocked': return <AlertCircle className="w-4 h-4 text-gray-500" />;
      default: return null;
    }
  };

  const filteredModules = selectedModule === 'all' ? moduleDistribution : 
    moduleDistribution.filter(m => m.module.toLowerCase() === selectedModule.toLowerCase());

  return (
    <div className="p-6 space-y-6">
      {/* Header with Controls */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Test Status Distribution</h2>
          <p className="text-gray-600">Comprehensive test status breakdown and analytics</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <select 
            value={selectedModule}
            onChange={(e) => setSelectedModule(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2"
          >
            <option value="all">All Modules</option>
            {moduleDistribution.map(module => (
              <option key={module.module} value={module.module.toLowerCase()}>
                {module.module}
              </option>
            ))}
          </select>
          
          <div className="flex bg-gray-100 rounded-lg p-1">
            {[
              { id: 'overview', label: 'Overview', icon: PieChart },
              { id: 'modules', label: 'Modules', icon: BarChart3 },
              { id: 'timeline', label: 'Timeline', icon: TrendingUp }
            ].map((mode) => (
              <button
                key={mode.id}
                onClick={() => setViewMode(mode.id as any)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  viewMode === mode.id
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <mode.icon className="w-4 h-4" />
                <span>{mode.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Overview Mode */}
      {viewMode === 'overview' && (
        <>
          {/* Status Summary Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {testStatusData.map((status) => (
              <motion.div
                key={status.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-lg border border-gray-200 p-4"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold" style={{ color: status.color }}>
                      {status.value}
                    </div>
                    <div className="text-sm text-gray-600">{status.name}</div>
                    <div className="text-xs text-gray-500">{status.percentage}%</div>
                  </div>
                  {getStatusIcon(status.name.toLowerCase().replace(' ', ''))}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Status Distribution Pie Chart */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold mb-4">Status Distribution</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChartComponent>
                    <Pie
                      data={testStatusData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label={({ name, percentage }) => `${name} ${percentage}%`}
                    >
                      {testStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChartComponent>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Test Complexity Distribution */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold mb-4">Test Complexity</h3>
              <div className="space-y-4">
                {testComplexity.map((complexity) => (
                  <div key={complexity.name} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{complexity.name}</span>
                      <div className="flex items-center space-x-3 text-sm">
                        <span className="text-gray-600">{complexity.count} tests</span>
                        <span className="text-gray-500">{complexity.time}</span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="h-2 rounded-full"
                        style={{ 
                          width: `${(complexity.count / 500) * 100}%`,
                          backgroundColor: complexity.color 
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      {/* Modules Mode */}
      {viewMode === 'modules' && (
        <div className="space-y-6">
          {/* Module Performance Table */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold">Module Test Status</h3>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Module</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Passed</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Failed</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">In Progress</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Blocked</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pass Rate</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trend</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredModules.map((module) => (
                    <tr key={module.module} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                        {module.module}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {module.total}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">
                        {module.passed}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">
                        {module.failed}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-yellow-600">
                        {module.inProgress}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {module.blocked}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className={`font-medium ${
                          module.passRate >= 90 ? 'text-green-600' :
                          module.passRate >= 75 ? 'text-yellow-600' : 'text-red-600'
                        }`}>
                          {module.passRate}%
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getTrendIcon(module.trend)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Module Status Chart */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold mb-4">Module Status Comparison</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={filteredModules}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="module" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="passed" stackId="a" fill="#10B981" name="Passed" />
                  <Bar dataKey="failed" stackId="a" fill="#EF4444" name="Failed" />
                  <Bar dataKey="inProgress" stackId="a" fill="#F59E0B" name="In Progress" />
                  <Bar dataKey="blocked" stackId="a" fill="#6B7280" name="Blocked" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* Timeline Mode */}
      {viewMode === 'timeline' && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold mb-4">Test Status Timeline (Last 30 Days)</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={timelineData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="passed" stackId="a" fill="#10B981" name="Passed" />
                <Bar dataKey="failed" stackId="a" fill="#EF4444" name="Failed" />
                <Bar dataKey="inProgress" stackId="a" fill="#F59E0B" name="In Progress" />
                <Bar dataKey="blocked" stackId="a" fill="#6B7280" name="Blocked" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Status Insights */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold mb-4">Status Analysis & Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-green-50 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="font-medium text-green-900">High Pass Rate</span>
            </div>
            <p className="text-sm text-green-700">
              Account Management module has 91% pass rate. Consider using their testing approach as a best practice.
            </p>
          </div>
          
          <div className="bg-red-50 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <AlertCircle className="w-5 h-5 text-red-600" />
              <span className="font-medium text-red-900">Attention Required</span>
            </div>
            <p className="text-sm text-red-700">
              Admin module has 14 blocked tests and declining pass rate. Immediate investigation needed.
            </p>
          </div>
          
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Target className="w-5 h-5 text-blue-600" />
              <span className="font-medium text-blue-900">Optimization</span>
            </div>
            <p className="text-sm text-blue-700">
              Overall pass rate is 68%. Focus on reducing failed tests in Payments and Admin modules.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}