'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  TrendingUp,
  TrendingDown,
  BarChart3,
  Target,
  Calendar,
  Activity,
  User
} from 'lucide-react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, ResponsiveContainer, LineChart, Line, Tooltip } from 'recharts';
import useDashboardStore from '@/store/dashboard';

interface TestMetrics {
  totalTests: number;
  completed: number;
  passed: number;
  failed: number;
  blocked: number;
  inProgress: number;
  passRate: number;
  velocity: number; // tests per day
}

export default function TestManagementDashboard() {
  const { testExecutions, testTeamMembers } = useDashboardStore();
  const [selectedPeriod, setSelectedPeriod] = useState<'today' | 'week' | 'month'>('week');

  // Generate mock data for demo purposes
  const mockTestExecutions = useMemo(() => {
    const today = new Date();
    const generateTestCase = (id: number, date: Date) => ({
      id: `TC${id.toString().padStart(3, '0')}`,
      testCaseId: `TC${id.toString().padStart(3, '0')}`,
      testCaseName: ['Login Functionality', 'Payment Processing', 'User Registration', 'Balance Inquiry', 'Transaction History', 'Fund Transfer'][id % 6],
      module: ['Authentication', 'Payments', 'Account', 'Reports', 'Admin'][id % 5],
      assignee: ['Alice Johnson', 'Bob Smith', 'Carol Davis', 'David Wilson', 'Eve Brown', 'Frank Miller'][id % 6],
      status: ['passed', 'failed', 'in-progress', 'blocked', 'passed', 'passed'][id % 6],
      executedAt: date,
      duration: Math.floor(Math.random() * 30) + 5,
      priority: ['critical', 'high', 'medium', 'low', 'high', 'critical'][id % 6],
      environment: ['SIT', 'UAT', 'SIT', 'UAT', 'SIT', 'UAT'][id % 6],
      defectId: id % 6 === 1 ? `DEF${id.toString().padStart(3, '0')}` : undefined
    });

    let tests: any[] = [];
    switch (selectedPeriod) {
      case 'today':
        // Generate 6 test cases for today
        for (let i = 0; i < 6; i++) {
          const hours = Math.floor(Math.random() * 8);
          const date = new Date(today);
          date.setHours(9 + hours);
          tests.push(generateTestCase(i, date));
        }
        break;
      
      case 'week':
        // Generate 15 test cases spread across the last 7 days
        for (let i = 0; i < 15; i++) {
          const days = Math.floor(Math.random() * 7);
          const hours = Math.floor(Math.random() * 8);
          const date = new Date(today);
          date.setDate(date.getDate() - days);
          date.setHours(9 + hours);
          tests.push(generateTestCase(i, date));
        }
        break;
      
      case 'month':
        // Generate 30 test cases spread across the last 30 days
        for (let i = 0; i < 30; i++) {
          const days = Math.floor(Math.random() * 30);
          const hours = Math.floor(Math.random() * 8);
          const date = new Date(today);
          date.setDate(date.getDate() - days);
          date.setHours(9 + hours);
          tests.push(generateTestCase(i, date));
        }
        break;
    }
    
    return tests.sort((a, b) => b.executedAt.getTime() - a.executedAt.getTime());
  }, [selectedPeriod]);

  const mockTeamMembers = useMemo(() => {
    const baseMembers = [
      { id: '1', name: 'Alice Johnson', role: 'Senior QA Engineer', avatar: '👩‍💻' },
      { id: '2', name: 'Bob Smith', role: 'QA Engineer', avatar: '👨‍💻' },
      { id: '3', name: 'Carol Davis', role: 'Test Automation Engineer', avatar: '👩‍🔬' },
      { id: '4', name: 'David Wilson', role: 'QA Engineer', avatar: '👨‍🔧' },
      { id: '5', name: 'Eve Brown', role: 'Performance Tester', avatar: '👩‍💼' },
      { id: '6', name: 'Frank Miller', role: 'Senior QA Engineer', avatar: '👨‍🏫' }
    ];

    // Adjust metrics based on time period
    return baseMembers.map(member => {
      const memberTests = mockTestExecutions.filter(t => t.assignee === member.name);
      const capacity = selectedPeriod === 'today' ? 8 : selectedPeriod === 'week' ? 40 : 160;
      const currentWorkload = selectedPeriod === 'today' 
        ? Math.min(capacity, 4 + Math.random() * 6)  // 4-10 hours for today
        : selectedPeriod === 'week'
          ? Math.min(capacity, 30 + Math.random() * 15) // 30-45 hours for week
          : Math.min(capacity, 120 + Math.random() * 50); // 120-170 hours for month
      
      const completed = memberTests.filter(t => t.status === 'passed' || t.status === 'failed').length;
      const passed = memberTests.filter(t => t.status === 'passed').length;
      const totalHours = memberTests.reduce((sum, test) => sum + (test.duration || 0), 0) / 60;
      
      return {
        ...member,
        capacity,
        currentWorkload: Math.round(currentWorkload * 10) / 10,
        productivity: totalHours > 0 ? Math.round((completed / totalHours) * 10) / 10 : 2.5 + Math.random(),
        passRate: completed > 0 ? Math.round((passed / completed) * 100) : 85 + Math.floor(Math.random() * 10)
      };
    });
  }, [mockTestExecutions, selectedPeriod]);

  // Calculate metrics based on selected period
  const testMetrics = useMemo((): TestMetrics => {
    const totalTests = mockTestExecutions.length;
    const completed = mockTestExecutions.filter(t => t.status === 'passed' || t.status === 'failed').length;
    const passed = mockTestExecutions.filter(t => t.status === 'passed').length;
    const failed = mockTestExecutions.filter(t => t.status === 'failed').length;
    const blocked = mockTestExecutions.filter(t => t.status === 'blocked').length;
    const inProgress = mockTestExecutions.filter(t => t.status === 'in-progress').length;
    const passRate = completed > 0 ? Math.round((passed / completed) * 100) : 0;
    
    // Calculate velocity based on period
    let velocity;
    switch (selectedPeriod) {
      case 'today':
        velocity = completed; // All completed tests today
        break;
      case 'week':
        velocity = Math.round(completed / 7); // Average per day over the week
        break;
      case 'month':
        velocity = Math.round(completed / 30); // Average per day over the month
        break;
      default:
        velocity = 0;
    }
    
    return {
      totalTests,
      completed,
      passed,
      failed,
      blocked,
      inProgress,
      passRate,
      velocity
    };
  }, [mockTestExecutions, selectedPeriod]);

  // Test execution data for charts
  const statusDistribution = [
    { name: 'Passed', value: testMetrics.passed, color: '#10B981' },
    { name: 'Failed', value: testMetrics.failed, color: '#EF4444' },
    { name: 'In Progress', value: testMetrics.inProgress, color: '#F59E0B' },
    { name: 'Blocked', value: testMetrics.blocked, color: '#6B7280' }
  ];

  const moduleProgress = useMemo(() => {
    const modules = ['Authentication', 'Payments', 'Account', 'Reports', 'Admin'];
    
    // Get base numbers based on time period
    const baseTotal = selectedPeriod === 'today' ? 10 : selectedPeriod === 'week' ? 25 : 50;
    
    return modules.map(module => {
      const moduleTests = mockTestExecutions.filter(t => t.module === module);
      const total = moduleTests.length || Math.floor(baseTotal / modules.length);
      const passed = moduleTests.filter(t => t.status === 'passed').length;
      const failed = moduleTests.filter(t => t.status === 'failed').length;
      const progress = total > 0 ? Math.round(((passed + failed) / total) * 100) : Math.floor(Math.random() * 100);
      
      return {
        module,
        total,
        completed: passed + failed,
        passed,
        failed,
        progress,
        passRate: passed + failed > 0 ? Math.round((passed / (passed + failed)) * 100) : 0
      };
    });
  }, [mockTestExecutions, selectedPeriod]);

  // Generate velocity trend data based on selected period
  const velocityTrend = useMemo(() => {
    const today = new Date();
    switch (selectedPeriod) {
      case 'today':
        // Show hourly data for today
        return Array.from({ length: 8 }, (_, i) => ({
          label: `${9 + i}:00`,
          tests: Math.floor(Math.random() * 4) + 1
        }));
      
      case 'week':
        // Show daily data for the week
        const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        return days.map(day => ({
          label: day,
          tests: Math.floor(Math.random() * 8) + 4
        }));
      
      case 'month':
        // Show weekly data for the month
        return Array.from({ length: 4 }, (_, i) => ({
          label: `Week ${i + 1}`,
          tests: Math.floor(Math.random() * 20) + 15
        }));
    }
  }, [selectedPeriod]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'passed': return 'text-green-600 bg-green-100';
      case 'failed': return 'text-red-600 bg-red-100';
      case 'in-progress': return 'text-yellow-600 bg-yellow-100';
      case 'blocked': return 'text-gray-600 bg-gray-100';
      default: return 'text-blue-600 bg-blue-100';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'text-red-600 bg-red-100';
      case 'high': return 'text-orange-600 bg-orange-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getWorkloadColor = (workload: number, capacity: number) => {
    const percentage = (workload / capacity) * 100;
    if (percentage > 100) return 'text-red-600 bg-red-100';
    if (percentage > 80) return 'text-orange-600 bg-orange-100';
    if (percentage > 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-green-600 bg-green-100';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Test Management Dashboard</h2>
          <p className="text-gray-600 mt-1">Test execution progress and team performance metrics</p>
        </div>
        <div className="flex items-center space-x-2">
          {(['today', 'week', 'month'] as const).map((period) => (
            <button
              key={period}
              onClick={() => setSelectedPeriod(period)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedPeriod === period
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-300'
              }`}
            >
              {period.charAt(0).toUpperCase() + period.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: 'Total Test Cases', value: testMetrics.totalTests, icon: Target, color: 'text-blue-600' },
          { title: 'Pass Rate', value: `${testMetrics.passRate}%`, icon: CheckCircle, color: 'text-green-600' },
          { title: 'Daily Velocity', value: `${testMetrics.velocity}/day`, icon: TrendingUp, color: 'text-purple-600' },
          { title: 'Active Blockers', value: testMetrics.blocked, icon: AlertCircle, color: 'text-red-600' }
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
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{metric.value}</p>
                </div>
                <div className={`p-3 rounded-lg bg-gray-50 ${metric.color}`}>
                  <IconComponent className="w-6 h-6" />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Test Status Distribution */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-lg p-6 border border-gray-200"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Test Status Distribution</h3>
          <div className="flex items-center">
            <div className="w-1/2">
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={statusDistribution}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                  >
                    {statusDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="w-1/2 pl-4">
              <div className="space-y-3">
                {statusDistribution.map((item) => (
                  <div key={item.name} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                      <span className="text-sm text-gray-700">{item.name}</span>
                    </div>
                    <span className="text-sm font-medium text-gray-900">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Execution Velocity */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-lg p-6 border border-gray-200"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Test Execution Velocity</h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={velocityTrend}>
                <XAxis dataKey="label" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="tests"
                  stroke="#3B82F6"
                  strokeWidth={3}
                  dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Module Progress */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="bg-white rounded-lg p-6 border border-gray-200"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Progress by Module</h3>
        <div className="space-y-4">
          {moduleProgress.map((module) => (
            <div key={module.module} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900">{module.module}</h4>
                  <span className="text-sm text-gray-600">{module.completed}/{module.total} tests</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${module.progress}%` }}
                  ></div>
                </div>
              </div>
              <div className="ml-4 text-center">
                <div className="text-lg font-bold text-gray-900">{module.passRate}%</div>
                <div className="text-xs text-gray-500">Pass Rate</div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Team Performance */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="bg-white rounded-lg p-6 border border-gray-200"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Team Performance & Workload</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockTeamMembers.map((member) => (
            <div key={member.id} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
              <div className="flex items-center space-x-3 mb-3">
                <div className="text-2xl">{member.avatar}</div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{member.name}</h4>
                  <p className="text-sm text-gray-600">{member.role}</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Workload</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getWorkloadColor(member.currentWorkload, member.capacity)}`}>
                    {member.currentWorkload}{selectedPeriod === 'today' ? 'h' : selectedPeriod === 'week' ? 'h/w' : 'h/m'} / {member.capacity}{selectedPeriod === 'today' ? 'h' : selectedPeriod === 'week' ? 'h/w' : 'h/m'}
                  </span>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-500 ${
                      member.currentWorkload > member.capacity ? 'bg-red-500' :
                      member.currentWorkload > member.capacity * 0.8 ? 'bg-orange-500' :
                      'bg-green-500'
                    }`}
                    style={{ width: `${Math.min((member.currentWorkload / member.capacity) * 100, 100)}%` }}
                  ></div>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Pass Rate</span>
                  <span className="font-medium text-gray-900">{member.passRate}%</span>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Productivity</span>
                  <span className="font-medium text-gray-900">{member.productivity} tests/{selectedPeriod === 'today' ? 'hour' : selectedPeriod === 'week' ? 'day' : 'week'}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Recent Test Executions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="bg-white rounded-lg border border-gray-200"
      >
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Recent Test Executions</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Test Case</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Module</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assignee</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Environment</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mockTestExecutions.map((test) => (
                <tr key={test.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{test.testCaseName}</div>
                      <div className="text-sm text-gray-500">{test.testCaseId}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{test.module}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{test.assignee}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(test.status)}`}>
                      {test.status.replace('-', ' ').toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(test.priority)}`}>
                      {test.priority.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {test.duration ? `${test.duration}m` : '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{test.environment}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
} 