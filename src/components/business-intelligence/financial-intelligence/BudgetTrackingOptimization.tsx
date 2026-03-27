'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Target, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  CheckCircle,
  DollarSign,
  Calendar,
  PieChart as PieChartIcon
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

export default function BudgetTrackingOptimization() {
  const [selectedPeriod, setSelectedPeriod] = useState('current');

  // Mock budget data
  const budgetData = [
    { month: 'Jan', planned: 45000, actual: 42500, variance: -2500 },
    { month: 'Feb', planned: 47000, actual: 48200, variance: 1200 },
    { month: 'Mar', planned: 46000, actual: 44800, variance: -1200 },
    { month: 'Apr', planned: 48000, actual: 47500, variance: -500 },
    { month: 'May', planned: 49000, actual: 52100, variance: 3100 },
    { month: 'Jun', planned: 50000, actual: 48900, variance: -1100 },
  ];

  const departmentBudgets = [
    { name: 'Infrastructure', budget: 150000, spent: 142000, remaining: 8000, utilization: 94.7 },
    { name: 'Software Licenses', budget: 85000, spent: 78500, remaining: 6500, utilization: 92.4 },
    { name: 'Cloud Services', budget: 120000, spent: 134500, remaining: -14500, utilization: 112.1 },
    { name: 'Security', budget: 75000, spent: 68200, remaining: 6800, utilization: 90.9 },
    { name: 'Monitoring Tools', budget: 45000, spent: 41200, remaining: 3800, utilization: 91.6 },
  ];

  const budgetDistribution = [
    { category: 'Infrastructure', amount: 142000, color: '#3B82F6' },
    { category: 'Cloud Services', amount: 134500, color: '#EF4444' },
    { category: 'Software Licenses', amount: 78500, color: '#10B981' },
    { category: 'Security', amount: 68200, color: '#F59E0B' },
    { category: 'Monitoring', amount: 41200, color: '#8B5CF6' },
  ];

  const optimizationRecommendations = [
    {
      title: 'Cloud Cost Optimization',
      impact: 'High',
      savings: '$14,500',
      description: 'Right-size underutilized EC2 instances and implement auto-scaling',
      priority: 'urgent',
      effort: 'Medium'
    },
    {
      title: 'License Consolidation',
      impact: 'Medium',
      savings: '$8,200',
      description: 'Consolidate duplicate software licenses across departments',
      priority: 'high',
      effort: 'Low'
    },
    {
      title: 'Reserved Instance Purchase',
      impact: 'High',
      savings: '$22,300',
      description: 'Purchase 1-year reserved instances for predictable workloads',
      priority: 'medium',
      effort: 'High'
    },
    {
      title: 'Monitoring Tool Audit',
      impact: 'Low',
      savings: '$3,800',
      description: 'Remove redundant monitoring tools and consolidate dashboards',
      priority: 'low',
      effort: 'Low'
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header with Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg p-4 text-white">
          <div className="flex items-center space-x-2">
            <Target className="w-6 h-6" />
            <div>
              <div className="text-2xl font-bold">87%</div>
              <div className="text-sm text-green-100">Budget Utilization</div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center space-x-2">
            <DollarSign className="w-6 h-6 text-blue-600" />
            <div>
              <div className="text-2xl font-bold text-gray-900">$464K</div>
              <div className="text-sm text-gray-600">Total Spent</div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center space-x-2">
            <TrendingDown className="w-6 h-6 text-green-600" />
            <div>
              <div className="text-2xl font-bold text-gray-900">$48.8K</div>
              <div className="text-sm text-gray-600">Potential Savings</div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="w-6 h-6 text-yellow-600" />
            <div>
              <div className="text-2xl font-bold text-gray-900">1</div>
              <div className="text-sm text-gray-600">Over Budget</div>
            </div>
          </div>
        </div>
      </div>

      {/* Budget vs Actual Trend */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">Budget vs Actual Spending Trend</h3>
          <select 
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
          >
            <option value="current">Current Year</option>
            <option value="previous">Previous Year</option>
            <option value="forecast">Forecast</option>
          </select>
        </div>
        
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={budgetData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip 
                formatter={(value, name) => [
                  `$${(value as number).toLocaleString()}`, 
                  name === 'planned' ? 'Planned' : name === 'actual' ? 'Actual' : 'Variance'
                ]}
              />
              <Line type="monotone" dataKey="planned" stroke="#6B7280" strokeWidth={2} name="planned" strokeDasharray="5 5" />
              <Line type="monotone" dataKey="actual" stroke="#3B82F6" strokeWidth={2} name="actual" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Department Budget Status */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold mb-4">Department Budget Status</h3>
          <div className="space-y-4">
            {departmentBudgets.map((dept) => (
              <div key={dept.name} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{dept.name}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">
                      ${dept.spent.toLocaleString()} / ${dept.budget.toLocaleString()}
                    </span>
                    {dept.utilization > 100 ? (
                      <AlertTriangle className="w-4 h-4 text-red-500" />
                    ) : dept.utilization > 90 ? (
                      <AlertTriangle className="w-4 h-4 text-yellow-500" />
                    ) : (
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    )}
                  </div>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      dept.utilization > 100 ? 'bg-red-500' : 
                      dept.utilization > 90 ? 'bg-yellow-500' : 'bg-green-500'
                    }`}
                    style={{ width: `${Math.min(dept.utilization, 100)}%` }}
                  ></div>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">{dept.utilization.toFixed(1)}% utilized</span>
                  <span className={dept.remaining < 0 ? 'text-red-600' : 'text-green-600'}>
                    {dept.remaining < 0 ? 'Over by' : 'Remaining'}: ${Math.abs(dept.remaining).toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Budget Distribution */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold mb-4">Current Budget Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={budgetDistribution}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="amount"
                  label={({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(1)}%`}
                >
                  {budgetDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`$${(value as number).toLocaleString()}`, 'Amount']} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Optimization Recommendations */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold mb-6">Budget Optimization Recommendations</h3>
        <div className="grid gap-4">
          {optimizationRecommendations.map((rec, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="font-medium">{rec.title}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs ${getPriorityColor(rec.priority)}`}>
                      {rec.priority.toUpperCase()}
                    </span>
                    <span className="text-sm text-gray-600">
                      {rec.effort} effort
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{rec.description}</p>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <DollarSign className="w-4 h-4 text-green-600" />
                      <span className="text-sm font-medium text-green-600">
                        {rec.savings} potential savings
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <TrendingUp className="w-4 h-4 text-blue-600" />
                      <span className="text-sm text-blue-600">{rec.impact} impact</span>
                    </div>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors"
                >
                  Implement
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Action Panel */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center justify-center space-x-2 bg-white rounded-lg p-4 shadow-sm border border-gray-200 hover:shadow-md transition-all"
          >
            <Calendar className="w-5 h-5 text-blue-600" />
            <span>Set Budget Alerts</span>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center justify-center space-x-2 bg-white rounded-lg p-4 shadow-sm border border-gray-200 hover:shadow-md transition-all"
          >
            <PieChartIcon className="w-5 h-5 text-green-600" />
            <span>Generate Report</span>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center justify-center space-x-2 bg-white rounded-lg p-4 shadow-sm border border-gray-200 hover:shadow-md transition-all"
          >
            <Target className="w-5 h-5 text-purple-600" />
            <span>Review Forecasts</span>
          </motion.button>
        </div>
      </div>
    </div>
  );
}