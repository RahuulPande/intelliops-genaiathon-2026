'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Clock, 
  Target, 
  Users,
  BarChart3,
  Calendar,
  Activity,
  CheckCircle
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

export default function TestProgressVelocity() {
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'quarter'>('week');

  // Mock velocity data
  const velocityData = useMemo(() => {
    const days = selectedPeriod === 'week' ? 7 : selectedPeriod === 'month' ? 30 : 90;
    return Array.from({ length: days }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (days - i - 1));
      
      return {
        date: date.toISOString().split('T')[0],
        testsExecuted: Math.floor(Math.random() * 15) + 5,
        testsPassed: Math.floor(Math.random() * 12) + 3,
        testsFailed: Math.floor(Math.random() * 3) + 1,
        velocity: Math.random() * 2 + 0.5,
        teamEfficiency: Math.random() * 30 + 70
      };
    });
  }, [selectedPeriod]);

  const teamVelocity = [
    { member: 'Alice Johnson', testsCompleted: 45, velocity: 2.3, efficiency: 92 },
    { member: 'Bob Smith', testsCompleted: 38, velocity: 1.9, efficiency: 87 },
    { member: 'Carol Davis', testsCompleted: 42, velocity: 2.1, efficiency: 89 },
    { member: 'David Wilson', testsCompleted: 35, velocity: 1.8, efficiency: 85 },
    { member: 'Eve Brown', testsCompleted: 40, velocity: 2.0, efficiency: 88 }
  ];

  const moduleProgress = [
    { module: 'Authentication', completed: 25, total: 30, velocity: 2.5, trend: 'up' },
    { module: 'Payments', completed: 18, total: 25, velocity: 1.8, trend: 'stable' },
    { module: 'Account Management', completed: 32, total: 40, velocity: 2.1, trend: 'up' },
    { module: 'Reports', completed: 15, total: 20, velocity: 1.5, trend: 'down' },
    { module: 'Admin', completed: 22, total: 28, velocity: 2.0, trend: 'stable' }
  ];

  const sprintMetrics = {
    currentSprint: 'Sprint 15',
    sprintProgress: 68,
    remainingDays: 5,
    avgVelocity: 1.9,
    targetVelocity: 2.2,
    completionForecast: '2 days delay'
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'down': return <TrendingUp className="w-4 h-4 text-red-500 rotate-180" />;
      default: return <Target className="w-4 h-4 text-yellow-500" />;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header with Controls */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Test Progress & Velocity</h2>
          <p className="text-gray-600">Team performance metrics and velocity tracking</p>
        </div>
        
        <select 
          value={selectedPeriod}
          onChange={(e) => setSelectedPeriod(e.target.value as 'week' | 'month' | 'quarter')}
          className="border border-gray-300 rounded-lg px-3 py-2"
        >
          <option value="week">Last Week</option>
          <option value="month">Last Month</option>
          <option value="quarter">Last Quarter</option>
        </select>
      </div>

      {/* Sprint Overview */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">{sprintMetrics.currentSprint} Overview</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{sprintMetrics.sprintProgress}%</div>
            <div className="text-sm text-gray-600">Sprint Progress</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">{sprintMetrics.remainingDays}</div>
            <div className="text-sm text-gray-600">Days Remaining</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{sprintMetrics.avgVelocity}</div>
            <div className="text-sm text-gray-600">Avg Velocity</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">{sprintMetrics.targetVelocity}</div>
            <div className="text-sm text-gray-600">Target Velocity</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-red-600">{sprintMetrics.completionForecast}</div>
            <div className="text-sm text-gray-600">Forecast</div>
          </div>
        </div>
      </div>

      {/* Velocity Trend Chart */}
      <div className="bg-white dark:bg-[#1A1A1A] rounded-lg border border-gray-200 dark:border-gray-800 p-6">
        <h3 className="text-lg font-semibold mb-4">Velocity Trend</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={velocityData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="velocity" stroke="#3B82F6" strokeWidth={2} name="Daily Velocity" />
              <Line type="monotone" dataKey="teamEfficiency" stroke="#10B981" strokeWidth={2} name="Team Efficiency %" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Team Velocity */}
        <div className="bg-white dark:bg-[#1A1A1A] rounded-lg border border-gray-200 dark:border-gray-800 p-6">
          <h3 className="text-lg font-semibold mb-4">Team Member Velocity</h3>
          <div className="space-y-4">
            {teamVelocity.map((member) => (
              <div key={member.member} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{member.member}</span>
                  <div className="flex items-center space-x-4 text-sm">
                    <span className="text-gray-600">{member.testsCompleted} tests</span>
                    <span className="text-blue-600 font-medium">{member.velocity}/day</span>
                    <span className="text-green-600">{member.efficiency}%</span>
                  </div>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="h-2 rounded-full bg-blue-500"
                    style={{ width: `${member.efficiency}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Module Progress */}
        <div className="bg-white dark:bg-[#1A1A1A] rounded-lg border border-gray-200 dark:border-gray-800 p-6">
          <h3 className="text-lg font-semibold mb-4">Module Progress</h3>
          <div className="space-y-4">
            {moduleProgress.map((module) => (
              <div key={module.module} className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">{module.module}</span>
                    {getTrendIcon(module.trend)}
                  </div>
                  <div className="flex items-center space-x-3 text-sm">
                    <span className="text-gray-600">{module.completed}/{module.total}</span>
                    <span className="text-blue-600 font-medium">{module.velocity}/day</span>
                  </div>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="h-2 rounded-full bg-green-500"
                    style={{ width: `${(module.completed / module.total) * 100}%` }}
                  ></div>
                </div>
                
                <div className="text-xs text-gray-500">
                  {Math.round((module.completed / module.total) * 100)}% complete
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Daily Test Execution Chart */}
      <div className="bg-white dark:bg-[#1A1A1A] rounded-lg border border-gray-200 dark:border-gray-800 p-6">
        <h3 className="text-lg font-semibold mb-4">Daily Test Execution</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={velocityData.slice(-7)}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="testsPassed" fill="#10B981" name="Passed" />
              <Bar dataKey="testsFailed" fill="#EF4444" name="Failed" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Velocity Insights */}
      <div className="bg-white dark:bg-[#1A1A1A] rounded-lg border border-gray-200 dark:border-gray-800 p-6">
        <h3 className="text-lg font-semibold mb-4">Velocity Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-green-50 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="font-medium text-green-900">High Performers</span>
            </div>
            <p className="text-sm text-green-700">
              Alice and Carol are exceeding velocity targets. Consider sharing their best practices with the team.
            </p>
          </div>
          
          <div className="bg-yellow-50 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Clock className="w-5 h-5 text-yellow-600" />
              <span className="font-medium text-yellow-900">Attention Needed</span>
            </div>
            <p className="text-sm text-yellow-700">
              Reports module is behind schedule. Consider reallocating resources or reducing scope.
            </p>
          </div>
          
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Target className="w-5 h-5 text-blue-600" />
              <span className="font-medium text-blue-900">Optimization</span>
            </div>
            <p className="text-sm text-blue-700">
              Current velocity is 86% of target. Focus on reducing test complexity and improving tooling.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}