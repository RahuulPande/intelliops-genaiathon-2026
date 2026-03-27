'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Activity,
  Clock,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Database,
  Zap,
  Target,
  Gauge,
  BarChart3,
  LineChart as LineChartIcon,
  Server,
  Cpu,
  HardDrive,
  Network,
  Timer,
  Eye
} from 'lucide-react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';
import useDashboardStore from '@/store/dashboard';
import { formatNumber, formatPercentage } from '@/lib/utils/formatters';

interface PerformanceOverview {
  avgResponseTime: number;
  totalThroughput: number;
  errorRate: number;
  cacheHitRate: number;
  activeConnections: number;
  bottleneckCount: number;
}

export default function PerformanceMonitoring() {
  const { performanceMetrics, databasePerformance } = useDashboardStore();
  const [selectedService, setSelectedService] = useState<string>('all');
  const [selectedTimeframe, setSelectedTimeframe] = useState<'1h' | '6h' | '24h' | '7d'>('24h');

  // Mock performance data
  const mockServices = ['Auth API', 'Payment API', 'User API', 'Report API', 'Notification Service'];

  const mockPerformanceData = useMemo(() => {
    const hours = 24;
    const data = [];
    const now = new Date();
    
    for (let i = hours; i >= 0; i--) {
      const time = new Date(now.getTime() - i * 60 * 60 * 1000);
      data.push({
        time: time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        timestamp: time,
        authAPI: {
          responseTime: Math.floor(Math.random() * 200) + 50,
          throughput: Math.floor(Math.random() * 500) + 200,
          errorRate: Math.random() * 2,
          cacheHitRate: Math.random() * 20 + 75
        },
        paymentAPI: {
          responseTime: Math.floor(Math.random() * 300) + 80,
          throughput: Math.floor(Math.random() * 300) + 150,
          errorRate: Math.random() * 1.5,
          cacheHitRate: Math.random() * 15 + 80
        },
        userAPI: {
          responseTime: Math.floor(Math.random() * 150) + 30,
          throughput: Math.floor(Math.random() * 800) + 400,
          errorRate: Math.random() * 1,
          cacheHitRate: Math.random() * 25 + 70
        },
        reportAPI: {
          responseTime: Math.floor(Math.random() * 500) + 200,
          throughput: Math.floor(Math.random() * 200) + 50,
          errorRate: Math.random() * 3,
          cacheHitRate: Math.random() * 30 + 60
        },
        notificationService: {
          responseTime: Math.floor(Math.random() * 100) + 20,
          throughput: Math.floor(Math.random() * 1000) + 500,
          errorRate: Math.random() * 0.5,
          cacheHitRate: Math.random() * 10 + 85
        }
      });
    }
    return data;
  }, []);

  const mockDatabaseMetrics = useMemo(() => [
    {
      database: 'Primary PostgreSQL',
      queryTime: 45,
      connectionCount: 85,
      lockWaitTime: 12,
      indexHitRatio: 94,
      bufferHitRatio: 97,
      activeQueries: 23,
      slowQueries: 3
    },
    {
      database: 'Redis Cache',
      queryTime: 2,
      connectionCount: 120,
      lockWaitTime: 0,
      indexHitRatio: 100,
      bufferHitRatio: 99,
      activeQueries: 45,
      slowQueries: 0
    },
    {
      database: 'Analytics DB',
      queryTime: 180,
      connectionCount: 15,
      lockWaitTime: 45,
      indexHitRatio: 89,
      bufferHitRatio: 92,
      activeQueries: 8,
      slowQueries: 2
    }
  ], []);

  const mockBottlenecks = useMemo(() => [
    {
      id: 'btn-1',
      service: 'Payment API',
      type: 'Database Connection Pool',
      severity: 'high' as const,
      impact: 'Response time +120ms',
      occurrences: 45,
      lastSeen: new Date(Date.now() - 15 * 60 * 1000),
      recommendation: 'Increase connection pool size from 10 to 20'
    },
    {
      id: 'btn-2',
      service: 'Report API',
      type: 'Memory Leak',
      severity: 'critical' as const,
      impact: 'Memory usage +85%',
      occurrences: 12,
      lastSeen: new Date(Date.now() - 5 * 60 * 1000),
      recommendation: 'Review object lifecycle in report generation'
    },
    {
      id: 'btn-3',
      service: 'Auth API',
      type: 'Cache Miss Rate',
      severity: 'medium' as const,
      impact: 'Cache efficiency -15%',
      occurrences: 23,
      lastSeen: new Date(Date.now() - 30 * 60 * 1000),
      recommendation: 'Optimize cache key strategy'
    }
  ], []);

  // Calculate overview metrics
  const performanceOverview = useMemo((): PerformanceOverview => {
    const latest = mockPerformanceData[mockPerformanceData.length - 1];
    const allServices = ['authAPI', 'paymentAPI', 'userAPI', 'reportAPI', 'notificationService'] as const;
    
    const avgResponseTime = Math.round(
      allServices.reduce((sum, service) => sum + latest[service].responseTime, 0) / allServices.length
    );
    
    const totalThroughput = allServices.reduce((sum, service) => sum + latest[service].throughput, 0);
    
    const errorRate = Number(
      (allServices.reduce((sum, service) => sum + latest[service].errorRate, 0) / allServices.length).toFixed(2)
    );
    
    const cacheHitRate = Math.round(
      allServices.reduce((sum, service) => sum + latest[service].cacheHitRate, 0) / allServices.length
    );

    return {
      avgResponseTime,
      totalThroughput,
      errorRate,
      cacheHitRate,
      activeConnections: mockDatabaseMetrics.reduce((sum, db) => sum + db.connectionCount, 0),
      bottleneckCount: mockBottlenecks.length
    };
  }, [mockPerformanceData, mockDatabaseMetrics, mockBottlenecks]);

  // Prepare chart data
  const responseTimeData = mockPerformanceData.map(point => ({
    time: point.time,
    'Auth API': point.authAPI.responseTime,
    'Payment API': point.paymentAPI.responseTime,
    'User API': point.userAPI.responseTime,
    'Report API': point.reportAPI.responseTime,
    'Notification Service': point.notificationService.responseTime
  }));

  const throughputData = mockPerformanceData.map(point => ({
    time: point.time,
    'Auth API': point.authAPI.throughput,
    'Payment API': point.paymentAPI.throughput,
    'User API': point.userAPI.throughput,
    'Report API': point.reportAPI.throughput,
    'Notification Service': point.notificationService.throughput
  }));

  const errorRateData = mockPerformanceData.map(point => ({
    time: point.time,
    'Auth API': point.authAPI.errorRate,
    'Payment API': point.paymentAPI.errorRate,
    'User API': point.userAPI.errorRate,
    'Report API': point.reportAPI.errorRate,
    'Notification Service': point.notificationService.errorRate
  }));

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-600 bg-red-100';
      case 'high': return 'text-orange-600 bg-orange-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getPerformanceColor = (value: number, thresholds: { good: number, warning: number }) => {
    if (value <= thresholds.good) return 'text-green-600';
    if (value <= thresholds.warning) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Performance Monitoring</h2>
          <p className="text-gray-600 mt-1">Real-time API performance, database metrics, and bottleneck analysis</p>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={selectedService}
            onChange={(e) => setSelectedService(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm bg-white"
          >
            <option value="all">All Services</option>
            {mockServices.map(service => (
              <option key={service} value={service}>{service}</option>
            ))}
          </select>
          <div className="flex items-center space-x-2">
            {(['1h', '6h', '24h', '7d'] as const).map((timeframe) => (
              <button
                key={timeframe}
                onClick={() => setSelectedTimeframe(timeframe)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedTimeframe === timeframe
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-300'
                }`}
              >
                {timeframe}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Performance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { 
            title: 'Avg Response Time', 
            value: `${performanceOverview.avgResponseTime}ms`, 
            icon: Clock, 
            color: getPerformanceColor(performanceOverview.avgResponseTime, { good: 100, warning: 200 }),
            trend: '-12ms'
          },
          { 
            title: 'Total Throughput', 
            value: `${performanceOverview.totalThroughput.toLocaleString()}/sec`, 
            icon: TrendingUp, 
            color: 'text-blue-600',
            trend: '+15%'
          },
          { 
            title: 'Error Rate', 
            value: `${performanceOverview.errorRate}%`, 
            icon: AlertTriangle, 
            color: getPerformanceColor(performanceOverview.errorRate, { good: 1, warning: 2 }),
            trend: '-0.3%'
          },
          { 
            title: 'Cache Hit Rate', 
            value: `${performanceOverview.cacheHitRate}%`, 
            icon: Zap, 
            color: getPerformanceColor(100 - performanceOverview.cacheHitRate, { good: 15, warning: 25 }),
            trend: '+2%'
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
                <span className="text-sm font-medium text-green-600">{metric.trend}</span>
              </div>
              <h3 className="text-sm font-medium text-gray-600">{metric.title}</h3>
              <p className="text-3xl font-bold text-gray-900 mt-1">{metric.value}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Performance Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Response Time Trends */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-lg p-6 border border-gray-200"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">API Response Time Trends</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={responseTimeData}>
                <XAxis dataKey="time" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip formatter={(value) => [`${value}ms`, 'Response Time']} />
                <Legend />
                <Line type="monotone" dataKey="Auth API" stroke="#3B82F6" strokeWidth={2} />
                <Line type="monotone" dataKey="Payment API" stroke="#EF4444" strokeWidth={2} />
                <Line type="monotone" dataKey="User API" stroke="#10B981" strokeWidth={2} />
                <Line type="monotone" dataKey="Report API" stroke="#F59E0B" strokeWidth={2} />
                <Line type="monotone" dataKey="Notification Service" stroke="#8B5CF6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Throughput Analysis */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-lg p-6 border border-gray-200"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Throughput Metrics (req/sec)</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={throughputData}>
                <XAxis dataKey="time" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip formatter={(value) => [`${value} req/sec`, 'Throughput']} />
                <Legend />
                <Area type="monotone" dataKey="Auth API" stackId="1" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.3} />
                <Area type="monotone" dataKey="Payment API" stackId="1" stroke="#EF4444" fill="#EF4444" fillOpacity={0.3} />
                <Area type="monotone" dataKey="User API" stackId="1" stroke="#10B981" fill="#10B981" fillOpacity={0.3} />
                <Area type="monotone" dataKey="Report API" stackId="1" stroke="#F59E0B" fill="#F59E0B" fillOpacity={0.3} />
                <Area type="monotone" dataKey="Notification Service" stackId="1" stroke="#8B5CF6" fill="#8B5CF6" fillOpacity={0.3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Database Performance */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="bg-white rounded-lg p-6 border border-gray-200"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Database Performance</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mockDatabaseMetrics.map((db, index) => (
            <div key={db.database} className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 rounded-lg bg-blue-100 text-blue-600">
                  <Database className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{db.database}</h4>
                  <p className="text-sm text-gray-600">{db.connectionCount} connections</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Query Time</span>
                  <span className={`font-medium ${getPerformanceColor(db.queryTime, { good: 50, warning: 100 })}`}>
                    {db.queryTime}ms
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Lock Wait Time</span>
                  <span className={`font-medium ${getPerformanceColor(db.lockWaitTime, { good: 10, warning: 30 })}`}>
                    {db.lockWaitTime}ms
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Index Hit Ratio</span>
                  <span className={`font-medium ${getPerformanceColor(100 - db.indexHitRatio, { good: 5, warning: 15 })}`}>
                    {db.indexHitRatio}%
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Buffer Hit Ratio</span>
                  <span className={`font-medium ${getPerformanceColor(100 - db.bufferHitRatio, { good: 3, warning: 10 })}`}>
                    {db.bufferHitRatio}%
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Active Queries</span>
                  <span className="font-medium text-gray-900">{db.activeQueries}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Slow Queries</span>
                  <span className={`font-medium ${db.slowQueries > 0 ? 'text-red-600' : 'text-green-600'}`}>
                    {db.slowQueries}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Error Rate Analysis */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="bg-white rounded-lg p-6 border border-gray-200"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Error Rate Analysis</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={errorRateData}>
              <XAxis dataKey="time" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip formatter={(value) => [`${Number(value).toFixed(2)}%`, 'Error Rate']} />
              <Legend />
              <Bar dataKey="Auth API" fill="#3B82F6" />
              <Bar dataKey="Payment API" fill="#EF4444" />
              <Bar dataKey="User API" fill="#10B981" />
              <Bar dataKey="Report API" fill="#F59E0B" />
              <Bar dataKey="Notification Service" fill="#8B5CF6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Performance Bottlenecks */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="bg-white rounded-lg border border-gray-200"
      >
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Performance Bottlenecks</h3>
            <span className="px-3 py-1 bg-red-100 text-red-800 text-sm font-medium rounded-full">
              {mockBottlenecks.length} Active
            </span>
          </div>
        </div>
        <div className="divide-y divide-gray-200">
          {mockBottlenecks.map((bottleneck) => (
            <div key={bottleneck.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(bottleneck.severity)}`}>
                      {bottleneck.severity.toUpperCase()}
                    </span>
                    <h4 className="font-medium text-gray-900">{bottleneck.service}</h4>
                    <span className="text-sm text-gray-600">•</span>
                    <span className="text-sm text-gray-600">{bottleneck.type}</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{bottleneck.impact}</p>
                  <p className="text-sm text-blue-600 mb-3">
                    <strong>Recommendation:</strong> {bottleneck.recommendation}
                  </p>
                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    <span>{bottleneck.occurrences} occurrences</span>
                    <span>Last seen: {bottleneck.lastSeen.toLocaleTimeString()}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                    Investigate
                  </button>
                  <button className="px-3 py-1 text-sm border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors">
                    Dismiss
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
} 