'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  Activity, 
  DollarSign, 
  FileText, 
  Download,
  TrendingUp,
  Clock,
  Zap,
  Server,
  Database,
  Users,
  AlertCircle,
  CheckCircle
} from 'lucide-react';
import LogStreamDashboard from '@/components/dashboard/LogStreamDashboard';
import PerformanceMonitoring from '@/components/dashboard/PerformanceMonitoring';
import CostAnalytics from '@/components/dashboard/CostAnalytics';
import ExportReportingSuite from '@/components/dashboard/ExportReportingSuite';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, AreaChart, Area, PieChart, Pie, Cell } from 'recharts';

type AnalyticsTab = 'performance' | 'logs' | 'costs' | 'business' | 'reports' | 'monitoring' | 'cost-analytics';

export default function AnalyticsSection() {
  const [activeTab, setActiveTab] = useState<AnalyticsTab>('performance');

  const tabs = [
    { id: 'performance', label: 'Performance', icon: Activity },
    { id: 'logs', label: 'Logs', icon: FileText },
    { id: 'costs', label: 'Cost Analysis', icon: DollarSign },
    { id: 'business', label: 'Business Impact', icon: TrendingUp },
    { id: 'reports', label: 'Reports', icon: Download },
    { id: 'monitoring', label: 'API Monitoring', icon: Server },
    { id: 'cost-analytics', label: 'Cost Analytics', icon: BarChart3 }
  ];

  // Sample data for charts
  const performanceData = Array.from({ length: 24 }, (_, i) => ({
    hour: `${i}:00`,
    responseTime: 100 + Math.random() * 200,
    throughput: 1000 + Math.random() * 500,
    errorRate: Math.random() * 5
  }));

  const costData = [
    { category: 'Compute', cost: 12500, color: '#3B82F6' },
    { category: 'Storage', cost: 3200, color: '#10B981' },
    { category: 'Network', cost: 1800, color: '#F59E0B' },
    { category: 'Monitoring', cost: 750, color: '#EF4444' },
    { category: 'Other', cost: 950, color: '#8B5CF6' }
  ];

  const renderPerformance = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { title: 'Avg Response Time', value: '245ms', change: '-12%', positive: true, icon: Clock },
          { title: 'Throughput', value: '1.2K req/s', change: '+8%', positive: true, icon: Zap },
          { title: 'Error Rate', value: '0.3%', change: '-45%', positive: true, icon: AlertCircle },
          { title: 'Uptime', value: '99.97%', change: '+0.02%', positive: true, icon: CheckCircle }
        ].map((metric) => {
          const IconComponent = metric.icon;
          return (
            <div key={metric.title} className="bg-white rounded-lg border p-6">
              <div className="flex items-center justify-between mb-2">
                <div className={`p-2 rounded-lg ${metric.positive ? 'bg-green-100' : 'bg-red-100'}`}>
                  <IconComponent className={`w-5 h-5 ${metric.positive ? 'text-green-600' : 'text-red-600'}`} />
                </div>
                <span className={`text-sm font-medium ${metric.positive ? 'text-green-600' : 'text-red-600'}`}>
                  {metric.change}
                </span>
              </div>
              <h3 className="text-sm font-medium text-gray-600">{metric.title}</h3>
              <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Response Time Trend */}
        <div className="bg-white rounded-lg border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Response Time (24h)</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceData}>
                <XAxis dataKey="hour" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Line 
                  type="monotone" 
                  dataKey="responseTime" 
                  stroke="#3B82F6" 
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Throughput */}
        <div className="bg-white rounded-lg border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Throughput (24h)</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={performanceData}>
                <XAxis dataKey="hour" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Area 
                  type="monotone" 
                  dataKey="throughput" 
                  stroke="#10B981" 
                  fill="#10B981"
                  fillOpacity={0.2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Top Services by Performance */}
      <div className="bg-white rounded-lg border">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Service Performance Ranking</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {[
              { name: 'Payment API', responseTime: '89ms', throughput: '2.1K/s', status: 'excellent' },
              { name: 'Auth Service', responseTime: '156ms', throughput: '1.8K/s', status: 'good' },
              { name: 'User Profile API', responseTime: '234ms', throughput: '956/s', status: 'good' },
              { name: 'Notification Service', responseTime: '445ms', throughput: '234/s', status: 'warning' },
              { name: 'Analytics API', responseTime: '678ms', throughput: '123/s', status: 'critical' }
            ].map((service, index) => (
              <div key={service.name} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="text-lg font-bold text-gray-400">#{index + 1}</div>
                  <div>
                    <div className="font-medium text-gray-900">{service.name}</div>
                    <div className="text-sm text-gray-600">Response: {service.responseTime} • Throughput: {service.throughput}</div>
                  </div>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                  service.status === 'excellent' ? 'bg-green-100 text-green-800' :
                  service.status === 'good' ? 'bg-blue-100 text-blue-800' :
                  service.status === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {service.status.toUpperCase()}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderCostAnalysis = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg border p-6">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 bg-blue-100 rounded-lg">
              <DollarSign className="w-5 h-5 text-blue-600" />
            </div>
            <span className="text-sm font-medium text-green-600">-8%</span>
          </div>
          <h3 className="text-sm font-medium text-gray-600">Monthly Cost</h3>
          <p className="text-2xl font-bold text-gray-900">$19,200</p>
        </div>

        <div className="bg-white rounded-lg border p-6">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 bg-green-100 rounded-lg">
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
            <span className="text-sm font-medium text-green-600">+15%</span>
          </div>
          <h3 className="text-sm font-medium text-gray-600">Cost Savings</h3>
          <p className="text-2xl font-bold text-gray-900">$2,840</p>
        </div>

        <div className="bg-white rounded-lg border p-6">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Server className="w-5 h-5 text-orange-600" />
            </div>
            <span className="text-sm font-medium text-blue-600">92%</span>
          </div>
          <h3 className="text-sm font-medium text-gray-600">Efficiency</h3>
          <p className="text-2xl font-bold text-gray-900">Optimal</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Cost Breakdown */}
        <div className="bg-white rounded-lg border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Cost Breakdown</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={costData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="cost"
                  label={(entry) => `${entry.category}: $${entry.cost}`}
                >
                  {costData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Cost Optimization Opportunities */}
        <div className="bg-white rounded-lg border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Optimization Opportunities</h3>
          <div className="space-y-4">
            {[
              { opportunity: 'Scale down dev environments after hours', savings: '$1,200/month', effort: 'Low' },
              { opportunity: 'Optimize database storage', savings: '$850/month', effort: 'Medium' },
              { opportunity: 'Implement auto-scaling', savings: '$2,100/month', effort: 'High' },
              { opportunity: 'Reserved instance upgrades', savings: '$600/month', effort: 'Low' }
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <div className="font-medium text-gray-900">{item.opportunity}</div>
                  <div className="text-sm text-gray-600">Potential savings: {item.savings}</div>
                </div>
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                  item.effort === 'Low' ? 'bg-green-100 text-green-800' :
                  item.effort === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {item.effort}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderBusinessImpact = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { title: 'Revenue Impact', value: '$0', description: 'No downtime incidents', positive: true },
          { title: 'SLA Compliance', value: '99.97%', description: 'Above target', positive: true },
          { title: 'Customer Satisfaction', value: '4.8/5', description: '+0.2 this month', positive: true },
          { title: 'MTTR', value: '12 min', description: '-40% improvement', positive: true }
        ].map((metric) => (
          <div key={metric.title} className="bg-white rounded-lg border p-6">
            <h3 className="text-sm font-medium text-gray-600 mb-1">{metric.title}</h3>
            <p className="text-2xl font-bold text-gray-900 mb-1">{metric.value}</p>
            <p className={`text-sm ${metric.positive ? 'text-green-600' : 'text-red-600'}`}>
              {metric.description}
            </p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Business Metrics Dashboard</h3>
        <div className="text-center py-8 text-gray-600">
          <BarChart3 className="w-16 h-16 mx-auto mb-4 text-gray-400" />
          <p>Advanced business impact analytics coming soon...</p>
          <p className="text-sm">Track revenue correlation, customer impact, and business KPIs</p>
        </div>
      </div>
    </div>
  );

  const renderReports = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Reports & Exports</h3>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Schedule Report
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { name: 'Daily Health Report', description: 'System health summary', frequency: 'Daily at 9 AM', format: 'PDF' },
          { name: 'Weekly Performance', description: 'Performance metrics overview', frequency: 'Weekly on Monday', format: 'Excel' },
          { name: 'Monthly Executive', description: 'Executive dashboard summary', frequency: 'Monthly 1st', format: 'PDF' },
          { name: 'Incident Analysis', description: 'Detailed incident breakdown', frequency: 'On-demand', format: 'PDF' },
          { name: 'Cost Optimization', description: 'Cost analysis and recommendations', frequency: 'Monthly 15th', format: 'Excel' },
          { name: 'SLA Compliance', description: 'SLA metrics and compliance', frequency: 'Monthly end', format: 'PDF' }
        ].map((report) => (
          <div key={report.name} className="bg-white rounded-lg border p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <FileText className="w-5 h-5 text-blue-600" />
              </div>
              <button className="text-blue-600 hover:text-blue-700 transition-colors">
                <Download className="w-4 h-4" />
              </button>
            </div>
            <h4 className="font-medium text-gray-900 mb-1">{report.name}</h4>
            <p className="text-sm text-gray-600 mb-2">{report.description}</p>
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>{report.frequency}</span>
              <span>{report.format}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg border p-6">
        <h4 className="font-medium text-gray-900 mb-4">Custom Report Builder</h4>
        <div className="text-center py-8 text-gray-600">
          <Database className="w-16 h-16 mx-auto mb-4 text-gray-400" />
          <p>Build custom reports with drag-and-drop interface</p>
          <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Launch Report Builder
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
        <p className="text-gray-600 mt-1">Comprehensive performance and cost analytics</p>
      </div>

      {/* Sub-navigation */}
      <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
        {tabs.map((tab) => {
          const IconComponent = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as AnalyticsTab)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <IconComponent className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {activeTab === 'performance' && renderPerformance()}
        {activeTab === 'logs' && <LogStreamDashboard />}
        {activeTab === 'costs' && renderCostAnalysis()}
        {activeTab === 'business' && renderBusinessImpact()}
        {activeTab === 'reports' && <ExportReportingSuite />}
        {activeTab === 'monitoring' && <PerformanceMonitoring />}
        {activeTab === 'cost-analytics' && <CostAnalytics />}
      </motion.div>
    </div>
  );
} 