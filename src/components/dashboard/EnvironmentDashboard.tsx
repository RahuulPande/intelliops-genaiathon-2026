'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Server,
  Cpu,
  HardDrive,
  Calendar,
  Clock,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Settings,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  Play,
  Pause,
  RotateCcw,
  Database,
  Cloud,
  Activity
} from 'lucide-react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, LineChart, Line, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';
import useDashboardStore from '@/store/dashboard';

interface EnvironmentMetrics {
  totalEnvironments: number;
  healthyEnvironments: number;
  totalCost: number;
  avgHealthScore: number;
  configDriftCount: number;
  bookedEnvironments: number;
}

export default function EnvironmentDashboard() {
  const { environments, deploymentHistory } = useDashboardStore();
  const [selectedEnvironment, setSelectedEnvironment] = useState<string>('all');
  const [selectedTimeframe, setSelectedTimeframe] = useState<'24h' | '7d' | '30d'>('24h');

  // Mock environment data
  const mockEnvironments = useMemo(() => [
    {
      id: 'env-1',
      name: 'Production',
      type: 'PROD' as const,
      status: 'healthy' as const,
      healthScore: 95,
      cpuUsage: 68,
      memoryUsage: 72,
      diskUsage: 45,
      uptime: 720, // 30 days
      lastDeployment: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      cost: 15500,
      isBooked: false,
      configDrift: false
    },
    {
      id: 'env-2', 
      name: 'UAT',
      type: 'UAT' as const,
      status: 'healthy' as const,
      healthScore: 88,
      cpuUsage: 45,
      memoryUsage: 55,
      diskUsage: 35,
      uptime: 168, // 7 days
      lastDeployment: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      cost: 4200,
      isBooked: true,
      bookedBy: 'QA Team',
      bookingEnd: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      configDrift: false
    },
    {
      id: 'env-3',
      name: 'SIT',
      type: 'SIT' as const,
      status: 'degraded' as const,
      healthScore: 72,
      cpuUsage: 85,
      memoryUsage: 89,
      diskUsage: 78,
      uptime: 24,
      lastDeployment: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
      cost: 3800,
      isBooked: false,
      configDrift: true,
      driftDetails: ['Database connection pool size mismatch', 'API rate limiting configuration differs']
    },
    {
      id: 'env-4',
      name: 'Development',
      type: 'DEV' as const,
      status: 'maintenance' as const,
      healthScore: 0,
      cpuUsage: 15,
      memoryUsage: 25,
      diskUsage: 20,
      uptime: 0,
      lastDeployment: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
      cost: 1200,
      isBooked: false,
      configDrift: false
    }
  ], []);

  const mockDeploymentHistory = useMemo(() => [
    {
      id: 'dep-1',
      environment: 'Production',
      version: 'v2.1.4',
      deployedBy: 'DevOps Team',
      deployedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      status: 'success' as const,
      duration: 12,
      changes: ['Bug fixes for payment gateway', 'Performance optimizations', 'Security patches']
    },
    {
      id: 'dep-2',
      environment: 'UAT',
      version: 'v2.1.5-rc1',
      deployedBy: 'Release Manager',
      deployedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      status: 'success' as const,
      duration: 8,
      changes: ['New feature: Multi-factor authentication', 'UI improvements', 'Database migration']
    },
    {
      id: 'dep-3',
      environment: 'SIT',
      version: 'v2.1.3',
      deployedBy: 'Developer',
      deployedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
      status: 'failed' as const,
      duration: 25,
      changes: ['Failed migration rollback', 'Configuration issues']
    },
    {
      id: 'dep-4',
      environment: 'Development',
      version: 'v2.2.0-dev',
      deployedBy: 'Developer',
      deployedAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
      status: 'rollback' as const,
      duration: 15,
      changes: ['Experimental features', 'Breaking changes reverted']
    }
  ], []);

  // Calculate metrics
  const environmentMetrics = useMemo((): EnvironmentMetrics => {
    const total = mockEnvironments.length;
    const healthy = mockEnvironments.filter(env => env.status === 'healthy').length;
    const totalCost = mockEnvironments.reduce((sum, env) => sum + env.cost, 0);
    const avgHealth = Math.round(mockEnvironments.reduce((sum, env) => sum + env.healthScore, 0) / total);
    const driftCount = mockEnvironments.filter(env => env.configDrift).length;
    const booked = mockEnvironments.filter(env => env.isBooked).length;

    return {
      totalEnvironments: total,
      healthyEnvironments: healthy,
      totalCost,
      avgHealthScore: avgHealth,
      configDriftCount: driftCount,
      bookedEnvironments: booked
    };
  }, [mockEnvironments]);

  // Resource utilization trend data
  const resourceTrend = [
    { time: '00:00', cpu: 45, memory: 52, disk: 35 },
    { time: '04:00', cpu: 38, memory: 48, disk: 36 },
    { time: '08:00', cpu: 65, memory: 68, disk: 38 },
    { time: '12:00', cpu: 78, memory: 75, disk: 42 },
    { time: '16:00', cpu: 72, memory: 70, disk: 44 },
    { time: '20:00', cpu: 58, memory: 62, disk: 41 }
  ];

  // Cost breakdown by environment type
  const costBreakdown = [
    { name: 'PROD', value: mockEnvironments.filter(e => e.type === 'PROD').reduce((sum, e) => sum + e.cost, 0), color: '#EF4444' },
    { name: 'UAT', value: mockEnvironments.filter(e => e.type === 'UAT').reduce((sum, e) => sum + e.cost, 0), color: '#F59E0B' },
    { name: 'SIT', value: mockEnvironments.filter(e => e.type === 'SIT').reduce((sum, e) => sum + e.cost, 0), color: '#10B981' },
    { name: 'DEV', value: mockEnvironments.filter(e => e.type === 'DEV').reduce((sum, e) => sum + e.cost, 0), color: '#3B82F6' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'text-green-600 bg-green-100';
      case 'degraded': return 'text-yellow-600 bg-yellow-100';
      case 'down': return 'text-red-600 bg-red-100';
      case 'maintenance': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getDeploymentStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'text-green-600 bg-green-100';
      case 'failed': return 'text-red-600 bg-red-100';
      case 'rollback': return 'text-orange-600 bg-orange-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getHealthScoreColor = (score: number) => {
    if (score >= 90) return '#10B981'; // green
    if (score >= 70) return '#F59E0B'; // yellow
    if (score >= 50) return '#EF4444'; // red
    return '#6B7280'; // gray
  };

  const handleProvisionEnvironment = (envType: string) => {
    // Mock provisioning action
    console.log(`Provisioning ${envType} environment...`);
  };

  const handleBookEnvironment = (envId: string) => {
    // Mock booking action
    console.log(`Booking environment ${envId}...`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Environment Management</h2>
          <p className="text-gray-600 mt-1">Resource monitoring, deployment tracking, and environment provisioning</p>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={selectedEnvironment}
            onChange={(e) => setSelectedEnvironment(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm bg-white"
          >
            <option value="all">All Environments</option>
            <option value="PROD">Production</option>
            <option value="UAT">UAT</option>
            <option value="SIT">SIT</option>
            <option value="DEV">Development</option>
          </select>
          <button
            onClick={() => handleProvisionEnvironment('new')}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <Play className="w-4 h-4" />
            <span>New Environment</span>
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: 'Total Environments', value: environmentMetrics.totalEnvironments, icon: Server, color: 'text-blue-600', subtitle: `${environmentMetrics.healthyEnvironments} healthy` },
          { title: 'Avg Health Score', value: `${environmentMetrics.avgHealthScore}%`, icon: Activity, color: 'text-green-600', subtitle: 'Across all environments' },
          { title: 'Monthly Cost', value: `$${(environmentMetrics.totalCost / 1000).toFixed(0)}K`, icon: DollarSign, color: 'text-purple-600', subtitle: 'Total infrastructure' },
          { title: 'Config Drift', value: environmentMetrics.configDriftCount, icon: AlertTriangle, color: 'text-orange-600', subtitle: 'Environments affected' }
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
              </div>
              <h3 className="text-sm font-medium text-gray-600">{metric.title}</h3>
              <p className="text-3xl font-bold text-gray-900 mt-1">{metric.value}</p>
              <p className="text-xs text-gray-500 mt-1">{metric.subtitle}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Environment Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {mockEnvironments.map((env, index) => (
          <div key={env.id} className="bg-white rounded-lg p-6 border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${env.type === 'PROD' ? 'bg-red-100 text-red-600' : env.type === 'UAT' ? 'bg-yellow-100 text-yellow-600' : env.type === 'SIT' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'}`}>
                  <Server className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{env.name}</h3>
                  <p className="text-sm text-gray-600">{env.type} Environment</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(env.status)}`}>
                  {env.status.toUpperCase()}
                </span>
                {env.configDrift && (
                  <AlertTriangle className="w-4 h-4 text-orange-500" />
                )}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-4">
              {/* Health Score */}
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-2">
                  <CircularProgressbar
                    value={env.healthScore}
                    text={`${env.healthScore}%`}
                    styles={buildStyles({
                      textSize: '16px',
                      pathColor: getHealthScoreColor(env.healthScore),
                      textColor: '#374151',
                      trailColor: '#F3F4F6'
                    })}
                  />
                </div>
                <p className="text-xs text-gray-600">Health Score</p>
              </div>

              {/* CPU Usage */}
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-2">
                  <CircularProgressbar
                    value={env.cpuUsage}
                    text={`${env.cpuUsage}%`}
                    styles={buildStyles({
                      textSize: '16px',
                      pathColor: env.cpuUsage > 80 ? '#EF4444' : env.cpuUsage > 60 ? '#F59E0B' : '#10B981',
                      textColor: '#374151',
                      trailColor: '#F3F4F6'
                    })}
                  />
                </div>
                <p className="text-xs text-gray-600">CPU</p>
              </div>

              {/* Memory Usage */}
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-2">
                  <CircularProgressbar
                    value={env.memoryUsage}
                    text={`${env.memoryUsage}%`}
                    styles={buildStyles({
                      textSize: '16px',
                      pathColor: env.memoryUsage > 80 ? '#EF4444' : env.memoryUsage > 60 ? '#F59E0B' : '#10B981',
                      textColor: '#374151',
                      trailColor: '#F3F4F6'
                    })}
                  />
                </div>
                <p className="text-xs text-gray-600">Memory</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Uptime</span>
                <span className="font-medium text-gray-900">
                  {env.uptime > 24 ? `${Math.floor(env.uptime / 24)} days` : `${env.uptime} hours`}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Monthly Cost</span>
                <span className="font-medium text-gray-900">${env.cost.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Last Deployment</span>
                <span className="font-medium text-gray-900">
                  {env.lastDeployment.toLocaleDateString()}
                </span>
              </div>
              
              {env.isBooked && (
                <div className="p-2 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-blue-600" />
                    <span className="text-sm text-blue-800">
                      Booked by {env.bookedBy} until {env.bookingEnd?.toLocaleDateString()}
                    </span>
                  </div>
                </div>
              )}

              {env.configDrift && env.driftDetails && (
                <div className="p-2 bg-orange-50 rounded-lg border border-orange-200">
                  <div className="flex items-center space-x-2 mb-1">
                    <AlertTriangle className="w-4 h-4 text-orange-600" />
                    <span className="text-sm font-medium text-orange-800">Configuration Drift Detected</span>
                  </div>
                  <ul className="text-xs text-orange-700 space-y-1">
                    {env.driftDetails.map((detail, i) => (
                      <li key={i}>• {detail}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="flex items-center space-x-2 mt-4 pt-4 border-t border-gray-200">
              {!env.isBooked && env.status !== 'maintenance' && (
                <button
                  onClick={() => handleBookEnvironment(env.id)}
                  className="flex-1 px-3 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center space-x-1"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book</span>
                </button>
              )}
              <button className="flex-1 px-3 py-2 text-sm border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors flex items-center justify-center space-x-1">
                <Settings className="w-4 h-4" />
                <span>Configure</span>
              </button>
            </div>
          </div>
        ))}
      </motion.div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Resource Utilization Trend */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-lg p-6 border border-gray-200"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Resource Utilization Trend</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={resourceTrend}>
                <XAxis dataKey="time" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="cpu" stroke="#EF4444" strokeWidth={2} name="CPU %" />
                <Line type="monotone" dataKey="memory" stroke="#F59E0B" strokeWidth={2} name="Memory %" />
                <Line type="monotone" dataKey="disk" stroke="#10B981" strokeWidth={2} name="Disk %" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Cost Breakdown */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-white rounded-lg p-6 border border-gray-200"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Cost Breakdown by Environment</h3>
          <div className="flex items-center">
            <div className="w-1/2">
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={costBreakdown}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                  >
                    {costBreakdown.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`$${Number(value).toLocaleString()}`, 'Monthly Cost']} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="w-1/2 pl-4">
              <div className="space-y-3">
                {costBreakdown.map((item) => (
                  <div key={item.name} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                      <span className="text-sm text-gray-700">{item.name}</span>
                    </div>
                    <span className="text-sm font-medium text-gray-900">${item.value.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Deployment History */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="bg-white rounded-lg border border-gray-200"
      >
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Recent Deployment History</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Environment</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Version</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deployed By</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mockDeploymentHistory.map((deployment) => (
                <tr key={deployment.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Server className="w-4 h-4 text-gray-400 mr-2" />
                      <span className="font-medium text-gray-900">{deployment.environment}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{deployment.version}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{deployment.deployedBy}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDeploymentStatusColor(deployment.status)}`}>
                      {deployment.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{deployment.duration}m</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {deployment.deployedAt.toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
} 