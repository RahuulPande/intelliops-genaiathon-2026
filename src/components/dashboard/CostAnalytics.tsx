'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Target,
  PieChart as PieChartIcon,
  BarChart3,
  Calculator,
  Lightbulb,
  Calendar,
  Users,
  Server,
  Shield,
  Zap,
  CheckCircle,
  Clock,
  Award
} from 'lucide-react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, ResponsiveContainer, LineChart, Line, Tooltip, Legend, AreaChart, Area } from 'recharts';
import useDashboardStore from '@/store/dashboard';

interface CostSummary {
  totalMonthlyCost: number;
  budgetVariance: number;
  optimizationPotential: number;
  licenseWaste: number;
  costPerService: number;
  yearOverYearChange: number;
}

export default function CostAnalytics() {
  const { costBreakdowns, licenseUtilization, costOptimizations } = useDashboardStore();
  const [selectedPeriod, setSelectedPeriod] = useState<'monthly' | 'quarterly' | 'yearly'>('monthly');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Mock cost data for comprehensive analytics
  const mockCostBreakdowns = useMemo(() => [
    {
      id: '1',
      category: 'Infrastructure' as const,
      subcategory: 'Compute (EC2)',
      cost: 15600,
      previousCost: 14200,
      budget: 16000,
      usage: 87,
      service: 'Payment API',
      environment: 'Production',
      trend: 'up' as const
    },
    {
      id: '2',
      category: 'Infrastructure' as const,
      subcategory: 'Storage (S3)',
      cost: 3200,
      previousCost: 3800,
      budget: 4000,
      usage: 72,
      trend: 'down' as const
    },
    {
      id: '3',
      category: 'Licenses' as const,
      subcategory: 'Database (Oracle)',
      cost: 8500,
      previousCost: 8500,
      budget: 9000,
      usage: 64,
      trend: 'stable' as const
    },
    {
      id: '4',
      category: 'Infrastructure' as const,
      subcategory: 'Networking',
      cost: 2800,
      previousCost: 2400,
      budget: 3000,
      usage: 93,
      trend: 'up' as const
    },
    {
      id: '5',
      category: 'Personnel' as const,
      subcategory: 'On-call Support',
      cost: 12000,
      previousCost: 11500,
      budget: 12500,
      usage: 95,
      trend: 'up' as const
    },
    {
      id: '6',
      category: 'Operations' as const,
      subcategory: 'Monitoring Tools',
      cost: 1800,
      previousCost: 1600,
      budget: 2000,
      usage: 85,
      trend: 'up' as const
    },
    {
      id: '7',
      category: 'Compliance' as const,
      subcategory: 'Security Audits',
      cost: 4500,
      previousCost: 4500,
      budget: 5000,
      usage: 90,
      trend: 'stable' as const
    }
  ], []);

  const mockLicenseUtilization = useMemo(() => [
    {
      id: '1',
      software: 'Oracle Database',
      vendor: 'Oracle',
      totalLicenses: 20,
      usedLicenses: 13,
      costPerLicense: 425,
      expiryDate: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000),
      utilizationRate: 65,
      lastOptimized: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      potentialSavings: 2975
    },
    {
      id: '2',
      software: 'Splunk Enterprise',
      vendor: 'Splunk',
      totalLicenses: 50,
      usedLicenses: 42,
      costPerLicense: 150,
      expiryDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      utilizationRate: 84,
      lastOptimized: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),
      potentialSavings: 1200
    },
    {
      id: '3',
      software: 'VMware vSphere',
      vendor: 'VMware',
      totalLicenses: 100,
      usedLicenses: 78,
      costPerLicense: 85,
      expiryDate: new Date(Date.now() + 270 * 24 * 60 * 60 * 1000),
      utilizationRate: 78,
      lastOptimized: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000),
      potentialSavings: 1870
    },
    {
      id: '4',
      software: 'Microsoft Office 365',
      vendor: 'Microsoft',
      totalLicenses: 250,
      usedLicenses: 187,
      costPerLicense: 22,
      expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
      utilizationRate: 75,
      lastOptimized: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
      potentialSavings: 1386
    }
  ], []);

  const mockCostOptimizations = useMemo(() => [
    {
      id: '1',
      type: 'Resource Scaling' as const,
      title: 'Right-size EC2 instances in Dev environment',
      description: 'Reduce instance sizes during off-hours and weekends',
      potentialSaving: 2400,
      implementationCost: 120,
      timeToImplement: 5,
      roi: 1900,
      priority: 'high' as const,
      status: 'identified' as const
    },
    {
      id: '2',
      type: 'License Optimization' as const,
      title: 'Optimize Oracle Database licenses',
      description: 'Remove unused licenses and negotiate better rates',
      potentialSaving: 2975,
      implementationCost: 500,
      timeToImplement: 14,
      roi: 495,
      priority: 'critical' as const,
      status: 'in-progress' as const
    },
    {
      id: '3',
      type: 'Reserved Instances' as const,
      title: 'Purchase Reserved Instances for production workloads',
      description: 'Convert on-demand instances to reserved for 40% savings',
      potentialSaving: 6240,
      implementationCost: 0,
      timeToImplement: 1,
      roi: Infinity,
      priority: 'critical' as const,
      status: 'identified' as const
    },
    {
      id: '4',
      type: 'Environment Consolidation' as const,
      title: 'Consolidate test environments',
      description: 'Merge underutilized test environments',
      potentialSaving: 1800,
      implementationCost: 2400,
      timeToImplement: 21,
      roi: 75,
      priority: 'medium' as const,
      status: 'identified' as const
    }
  ], []);

  // Calculate cost summary
  const costSummary = useMemo((): CostSummary => {
    const totalMonthlyCost = mockCostBreakdowns.reduce((sum, item) => sum + item.cost, 0);
    const totalBudget = mockCostBreakdowns.reduce((sum, item) => sum + item.budget, 0);
    const budgetVariance = ((totalMonthlyCost - totalBudget) / totalBudget) * 100;
    const optimizationPotential = mockCostOptimizations.reduce((sum, opt) => sum + opt.potentialSaving, 0);
    const licenseWaste = mockLicenseUtilization.reduce((sum, license) => sum + license.potentialSavings, 0);
    const previousTotal = mockCostBreakdowns.reduce((sum, item) => sum + item.previousCost, 0);
    const yearOverYearChange = ((totalMonthlyCost - previousTotal) / previousTotal) * 100;

    return {
      totalMonthlyCost,
      budgetVariance,
      optimizationPotential,
      licenseWaste,
      costPerService: totalMonthlyCost / 12, // assuming 12 services
      yearOverYearChange
    };
  }, [mockCostBreakdowns, mockCostOptimizations, mockLicenseUtilization]);

  // Prepare chart data
  const categoryData = mockCostBreakdowns.reduce((acc, item) => {
    const existing = acc.find(cat => cat.category === item.category);
    if (existing) {
      existing.cost += item.cost;
      existing.budget += item.budget;
    } else {
      acc.push({
        category: item.category,
        cost: item.cost,
        budget: item.budget,
        color: getCategoryColor(item.category)
      });
    }
    return acc;
  }, [] as Array<{category: string, cost: number, budget: number, color: string}>);

  const monthlyTrend = Array.from({ length: 12 }, (_, i) => {
    const month = new Date(2024, i, 1).toLocaleDateString('en-US', { month: 'short' });
    const baseCost = costSummary.totalMonthlyCost;
    const variance = (Math.random() - 0.5) * 0.2; // ±10% variance
    return {
      month,
      actual: Math.round(baseCost * (1 + variance)),
      budget: Math.round(baseCost * 1.05),
      forecast: Math.round(baseCost * (1 + variance * 0.8))
    };
  });

  function getCategoryColor(category: string): string {
    const colors = {
      'Infrastructure': '#3B82F6',
      'Licenses': '#10B981',
      'Personnel': '#F59E0B',
      'Operations': '#EF4444',
      'Compliance': '#8B5CF6'
    };
    return colors[category as keyof typeof colors] || '#6B7280';
  }

  const getUtilizationColor = (rate: number) => {
    if (rate >= 85) return 'text-green-600 bg-green-100';
    if (rate >= 70) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100';
      case 'in-progress': return 'text-blue-600 bg-blue-100';
      case 'identified': return 'text-yellow-600 bg-yellow-100';
      case 'rejected': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const formatCurrency = (value: number) => {
    if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `$${(value / 1000).toFixed(0)}K`;
    return `$${value.toLocaleString()}`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Cost Analytics Dashboard</h2>
          <p className="text-gray-600 mt-1">Infrastructure costs, license optimization, and budget tracking</p>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm bg-white"
          >
            <option value="all">All Categories</option>
            <option value="Infrastructure">Infrastructure</option>
            <option value="Licenses">Licenses</option>
            <option value="Personnel">Personnel</option>
            <option value="Operations">Operations</option>
            <option value="Compliance">Compliance</option>
          </select>
          <div className="flex items-center space-x-2">
            {(['monthly', 'quarterly', 'yearly'] as const).map((period) => (
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
      </div>

      {/* Cost Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { 
            title: 'Monthly Spend', 
            value: formatCurrency(costSummary.totalMonthlyCost), 
            icon: DollarSign, 
            color: 'text-blue-600',
            change: `${costSummary.yearOverYearChange > 0 ? '+' : ''}${costSummary.yearOverYearChange.toFixed(1)}%`,
            changeColor: costSummary.yearOverYearChange > 0 ? 'text-red-600' : 'text-green-600'
          },
          { 
            title: 'Budget Variance', 
            value: `${costSummary.budgetVariance > 0 ? '+' : ''}${costSummary.budgetVariance.toFixed(1)}%`, 
            icon: Target, 
            color: costSummary.budgetVariance > 0 ? 'text-red-600' : 'text-green-600',
            change: costSummary.budgetVariance > 0 ? 'Over budget' : 'Under budget',
            changeColor: costSummary.budgetVariance > 0 ? 'text-red-600' : 'text-green-600'
          },
          { 
            title: 'Optimization Potential', 
            value: formatCurrency(costSummary.optimizationPotential), 
            icon: Lightbulb, 
            color: 'text-green-600',
            change: `${((costSummary.optimizationPotential / costSummary.totalMonthlyCost) * 100).toFixed(1)}% savings`,
            changeColor: 'text-green-600'
          },
          { 
            title: 'License Waste', 
            value: formatCurrency(costSummary.licenseWaste), 
            icon: AlertTriangle, 
            color: 'text-orange-600',
            change: 'Unused licenses',
            changeColor: 'text-orange-600'
          }
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
                <span className={`text-sm font-medium ${metric.changeColor}`}>{metric.change}</span>
              </div>
              <h3 className="text-sm font-medium text-gray-600">{metric.title}</h3>
              <p className="text-3xl font-bold text-gray-900 mt-1">{metric.value}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Cost Breakdown by Category */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-lg p-6 border border-gray-200"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Cost Breakdown by Category</h3>
          <div className="flex items-center">
            <div className="w-1/2">
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="cost"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="w-1/2 pl-4">
              <div className="space-y-3">
                {categoryData.map((item) => (
                  <div key={item.category} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                      <span className="text-sm text-gray-700">{item.category}</span>
                    </div>
                    <span className="text-sm font-medium text-gray-900">{formatCurrency(item.cost)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Monthly Trend */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-lg p-6 border border-gray-200"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Spend Trend</h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyTrend}>
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} tickFormatter={(value) => formatCurrency(value)} />
                <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                <Legend />
                <Line type="monotone" dataKey="actual" stroke="#3B82F6" strokeWidth={2} name="Actual" />
                <Line type="monotone" dataKey="budget" stroke="#10B981" strokeWidth={2} strokeDasharray="5 5" name="Budget" />
                <Line type="monotone" dataKey="forecast" stroke="#F59E0B" strokeWidth={2} name="Forecast" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* License Utilization */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="bg-white rounded-lg border border-gray-200"
      >
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">License Utilization</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Software</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vendor</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Usage</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Utilization</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Monthly Cost</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Potential Savings</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expiry</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mockLicenseUtilization.map((license) => (
                <tr key={license.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{license.software}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{license.vendor}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {license.usedLicenses}/{license.totalLicenses}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getUtilizationColor(license.utilizationRate)}`}>
                      {license.utilizationRate}%
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatCurrency(license.totalLicenses * license.costPerLicense)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                    {formatCurrency(license.potentialSavings)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {license.expiryDate.toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Cost Optimization Recommendations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="bg-white rounded-lg border border-gray-200"
      >
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Cost Optimization Recommendations</h3>
            <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
              {formatCurrency(costSummary.optimizationPotential)} Potential Savings
            </span>
          </div>
        </div>
        <div className="divide-y divide-gray-200">
          {mockCostOptimizations.map((optimization) => (
            <div key={optimization.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(optimization.priority)}`}>
                      {optimization.priority.toUpperCase()}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(optimization.status)}`}>
                      {optimization.status.replace('-', ' ').toUpperCase()}
                    </span>
                    <span className="text-sm text-gray-600">{optimization.type}</span>
                  </div>
                  <h4 className="font-medium text-gray-900 mb-2">{optimization.title}</h4>
                  <p className="text-sm text-gray-600 mb-3">{optimization.description}</p>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Monthly Savings:</span>
                      <div className="font-semibold text-green-600">{formatCurrency(optimization.potentialSaving)}</div>
                    </div>
                    <div>
                      <span className="text-gray-600">Implementation Cost:</span>
                      <div className="font-semibold text-gray-900">{formatCurrency(optimization.implementationCost)}</div>
                    </div>
                    <div>
                      <span className="text-gray-600">Time to Implement:</span>
                      <div className="font-semibold text-gray-900">{optimization.timeToImplement} days</div>
                    </div>
                    <div>
                      <span className="text-gray-600">ROI:</span>
                      <div className="font-semibold text-blue-600">
                        {optimization.roi === Infinity ? '∞' : `${optimization.roi.toFixed(0)}%`}
                      </div>
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
    </div>
  );
} 