'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Activity, 
  Clock, 
  Mail,
  Phone,
  ExternalLink,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Zap,
  Database,
  Network,
  Download,
  Pause,
  Play,
  Filter,
  Server,
  Eye,
  BarChart3
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar
} from 'recharts';
import useDashboardStore from '@/store/dashboard';
import { Service, LogEntry, Incident, PerformanceMetric } from '@/lib/types';
import { format, subHours, subDays } from 'date-fns';
import { formatPercentage } from '@/lib/utils/formatters';

interface ServiceDetailModalProps {
  service: Service | null;
  isOpen: boolean;
  onClose: () => void;
}

interface HealthDataPoint {
  timestamp: string;
  health: number;
  responseTime: number;
  errorRate: number;
  throughput: number;
}

export default function ServiceDetailModal({ service, isOpen, onClose }: ServiceDetailModalProps) {
  const { services, logs, incidents, addLog } = useDashboardStore();
  const [activeTab, setActiveTab] = useState<'overview' | 'logs' | 'metrics' | 'dependencies' | 'incidents'>('overview');
  const [logsFilter, setLogsFilter] = useState('');
  const [logsPaused, setLogsPaused] = useState(false);
  const [selectedLogLevel, setSelectedLogLevel] = useState<'all' | 'debug' | 'info' | 'warn' | 'error'>('all');

  // Generate health history data
  const healthHistory = useMemo(() => {
    if (!service) return [];
    
    const data: HealthDataPoint[] = [];
    const now = new Date();
    
    for (let i = 23; i >= 0; i--) {
      const timestamp = subHours(now, i);
      const baseHealth = service.health;
      const variation = (Math.random() - 0.5) * 20;
      const health = Math.max(0, Math.min(100, baseHealth + variation));
      
      data.push({
        timestamp: format(timestamp, 'HH:mm'),
        health,
        responseTime: service.responseTime + (Math.random() - 0.5) * 100,
        errorRate: Math.random() * 5,
        throughput: 100 + Math.random() * 200
      });
    }
    
    return data;
  }, [service]);

  // Filter logs for this service
  const serviceLogs = useMemo(() => {
    if (!service) return [];
    
    return logs
      .filter(log => log.serviceId === service.id)
      .filter(log => selectedLogLevel === 'all' || log.level === selectedLogLevel)
      .filter(log => !logsFilter || log.message.toLowerCase().includes(logsFilter.toLowerCase()))
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
      .slice(0, 100); // Limit to 100 for performance
  }, [logs, service, selectedLogLevel, logsFilter]);

  // Get service incidents
  const serviceIncidents = useMemo(() => {
    if (!service) return [];
    
    return incidents
      .filter(incident => incident.affectedServices.includes(service.id))
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, 10);
  }, [incidents, service]);

  // Get dependencies
  const dependencies = useMemo(() => {
    if (!service) return { upstream: [], downstream: [] };
    
    const upstream = services.filter(s => service.dependencies.includes(s.id));
    const downstream = services.filter(s => s.dependencies.includes(service.id));
    
    return { upstream, downstream };
  }, [services, service]);

  // Mock performance metrics
  const performanceMetrics = useMemo(() => {
    if (!service) return [];
    
    const metrics = [];
    const now = new Date();
    
    for (let i = 23; i >= 0; i--) {
      const timestamp = subHours(now, i);
      metrics.push({
        timestamp: format(timestamp, 'HH:mm'),
        cpu: 20 + Math.random() * 60,
        memory: 30 + Math.random() * 50,
        connections: 50 + Math.random() * 100
      });
    }
    
    return metrics;
  }, [service]);

  // Real-time log simulation
  useEffect(() => {
    if (!service || logsPaused) return;

    const interval = setInterval(() => {
      const levels: ('debug' | 'info' | 'warn' | 'error')[] = ['debug', 'info', 'warn', 'error'];
      const messages = [
        'Request processed successfully',
        'Database connection established',
        'Cache miss, fetching from source',
        'Authentication successful',
        'Rate limit check passed',
        'Health check completed',
        'Background job started',
        'Configuration updated'
      ];

      const newLog: LogEntry = {
        id: `log_${Date.now()}_${Math.random()}`,
        timestamp: new Date(),
        serviceId: service.id,
        serviceName: service.name,
        level: levels[Math.floor(Math.random() * levels.length)],
        message: messages[Math.floor(Math.random() * messages.length)],
        userId: `user_${Math.floor(Math.random() * 1000)}`,
        sessionId: `session_${Math.floor(Math.random() * 10000)}`,
        traceId: `trace_${Math.floor(Math.random() * 100000)}`,
        duration: Math.floor(Math.random() * 500),
        statusCode: Math.random() > 0.9 ? 500 : 200
      };

      addLog(newLog);
    }, 2000);

    return () => clearInterval(interval);
  }, [service, logsPaused, addLog]);

  if (!service) return null;

  const slaCompliance = Math.round(service.uptime);
  const avgResponseTime = Math.round(service.responseTime);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`w-4 h-4 rounded-full ${
                    service.status === 'healthy' ? 'bg-green-400' :
                    service.status === 'degraded' ? 'bg-yellow-400' : 'bg-red-400'
                  }`} />
                  <div>
                    <h2 className="text-2xl font-bold">{service.name}</h2>
                    <p className="text-blue-100">{service.type} service</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-sm text-blue-100">Health Score</p>
                    <p className="text-2xl font-bold">{service.health}%</p>
                  </div>
                  <button
                    onClick={onClose}
                    className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="bg-gray-50 border-b">
              <div className="flex">
                {[
                  { id: 'overview', label: 'Overview', icon: Activity },
                  { id: 'logs', label: 'Logs', icon: Database },
                  { id: 'metrics', label: 'Metrics', icon: TrendingUp },
                  { id: 'dependencies', label: 'Dependencies', icon: Network },
                  { id: 'incidents', label: 'Incidents', icon: AlertTriangle }
                ].map(tab => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`flex items-center space-x-2 px-6 py-4 font-medium transition-colors ${
                        activeTab === tab.id
                          ? 'text-blue-600 border-b-2 border-blue-600 bg-white'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Content */}
            <div className="p-6 max-h-[60vh] overflow-y-auto">
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  {/* Key Metrics */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-lg">
                      <div className="flex items-center space-x-2 text-green-600 mb-2">
                        <CheckCircle className="w-5 h-5" />
                        <span className="font-medium">SLA Compliance</span>
                      </div>
                      <p className="text-2xl font-bold text-green-700">{slaCompliance}%</p>
                    </div>
                    <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg">
                      <div className="flex items-center space-x-2 text-blue-600 mb-2">
                        <Clock className="w-5 h-5" />
                        <span className="font-medium">Avg Response</span>
                      </div>
                      <p className="text-2xl font-bold text-blue-700">{avgResponseTime}ms</p>
                    </div>
                    <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-lg">
                      <div className="flex items-center space-x-2 text-purple-600 mb-2">
                        <Zap className="w-5 h-5" />
                        <span className="font-medium">Uptime</span>
                      </div>
                      <p className="text-2xl font-bold text-purple-700">{formatPercentage(service.uptime)}</p>
                    </div>
                    <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-4 rounded-lg">
                      <div className="flex items-center space-x-2 text-orange-600 mb-2">
                        <Activity className="w-5 h-5" />
                        <span className="font-medium">Status</span>
                      </div>
                      <p className="text-lg font-bold text-orange-700 capitalize">{service.status}</p>
                    </div>
                  </div>

                  {/* Health History Chart */}
                  <div className="bg-white border rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-4">Health History (24 Hours)</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <AreaChart data={healthHistory}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="timestamp" />
                        <YAxis domain={[0, 100]} />
                        <Tooltip />
                        <Area 
                          type="monotone" 
                          dataKey="health" 
                          stroke="#3B82F6" 
                          fill="#3B82F6"
                          fillOpacity={0.3}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Contact Information */}
                  <div className="bg-white border rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{service.owner}</p>
                        <p className="text-gray-600">{service.email}</p>
                        <p className="text-sm text-gray-500">Service Owner</p>
                      </div>
                      <div className="flex space-x-2">
                        <a
                          href={`mailto:${service.email}`}
                          className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                        >
                          <Mail className="w-5 h-5" />
                        </a>
                        <a
                          href={service.endpoint}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors"
                        >
                          <ExternalLink className="w-5 h-5" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'logs' && (
                <div className="space-y-4">
                  {/* Log Controls */}
                  <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <Filter className="w-4 h-4 text-gray-500" />
                        <select
                          value={selectedLogLevel}
                          onChange={(e) => setSelectedLogLevel(e.target.value as any)}
                          className="px-3 py-1 border rounded-md text-sm"
                        >
                          <option value="all">All Levels</option>
                          <option value="debug">Debug</option>
                          <option value="info">Info</option>
                          <option value="warn">Warning</option>
                          <option value="error">Error</option>
                        </select>
                      </div>
                      <input
                        type="text"
                        placeholder="Search logs..."
                        value={logsFilter}
                        onChange={(e) => setLogsFilter(e.target.value)}
                        className="px-3 py-1 border rounded-md text-sm w-64"
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setLogsPaused(!logsPaused)}
                        className={`p-2 rounded-lg transition-colors ${
                          logsPaused ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                        }`}
                      >
                        {logsPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
                      </button>
                      <span className="text-sm text-gray-500">
                        {logsPaused ? 'Paused' : 'Live'}
                      </span>
                    </div>
                  </div>

                  {/* Logs List */}
                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    {serviceLogs.map(log => (
                      <motion.div
                        key={log.id}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`p-3 rounded-lg border-l-4 ${
                          log.level === 'error' ? 'bg-red-50 border-red-400' :
                          log.level === 'warn' ? 'bg-yellow-50 border-yellow-400' :
                          log.level === 'info' ? 'bg-blue-50 border-blue-400' :
                          'bg-gray-50 border-gray-400'
                        }`}
                      >
                        <div className="flex items-center justify-between text-sm">
                          <span className={`font-medium uppercase ${
                            log.level === 'error' ? 'text-red-600' :
                            log.level === 'warn' ? 'text-yellow-600' :
                            log.level === 'info' ? 'text-blue-600' :
                            'text-gray-600'
                          }`}>
                            {log.level}
                          </span>
                          <span className="text-gray-500">
                            {format(log.timestamp, 'HH:mm:ss')}
                          </span>
                        </div>
                        <p className="mt-1 text-gray-900">{log.message}</p>
                        {log.traceId && (
                          <p className="text-xs text-gray-500 mt-1">
                            Trace: {log.traceId} | Duration: {log.duration}ms
                          </p>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'metrics' && (
                <div className="space-y-6">
                  {/* Response Time Chart */}
                  <div className="bg-white border rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-4">Response Time & Error Rate</h3>
                    <ResponsiveContainer width="100%" height={250}>
                      <LineChart data={healthHistory}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="timestamp" />
                        <YAxis yAxisId="left" />
                        <YAxis yAxisId="right" orientation="right" />
                        <Tooltip />
                        <Line yAxisId="left" type="monotone" dataKey="responseTime" stroke="#3B82F6" name="Response Time (ms)" />
                        <Line yAxisId="right" type="monotone" dataKey="errorRate" stroke="#EF4444" name="Error Rate (%)" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Resource Usage */}
                  <div className="bg-white border rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-4">Resource Usage</h3>
                    <ResponsiveContainer width="100%" height={250}>
                      <AreaChart data={performanceMetrics}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="timestamp" />
                        <YAxis />
                        <Tooltip />
                        <Area type="monotone" dataKey="cpu" stackId="1" stroke="#8884d8" fill="#8884d8" name="CPU %" />
                        <Area type="monotone" dataKey="memory" stackId="1" stroke="#82ca9d" fill="#82ca9d" name="Memory %" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              )}

              {activeTab === 'dependencies' && (
                <div className="space-y-6">
                  {/* Upstream Dependencies */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Upstream Dependencies</h3>
                    {dependencies.upstream.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {dependencies.upstream.map(dep => (
                          <div key={dep.id} className="p-4 border rounded-lg bg-blue-50">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <div className={`w-3 h-3 rounded-full ${
                                  dep.status === 'healthy' ? 'bg-green-400' :
                                  dep.status === 'degraded' ? 'bg-yellow-400' : 'bg-red-400'
                                }`} />
                                <span className="font-medium">{dep.name}</span>
                              </div>
                              <span className="text-sm text-gray-500">{dep.health}%</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500">No upstream dependencies</p>
                    )}
                  </div>

                  {/* Downstream Dependencies */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Downstream Dependencies</h3>
                    {dependencies.downstream.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {dependencies.downstream.map(dep => (
                          <div key={dep.id} className="p-4 border rounded-lg bg-green-50">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <div className={`w-3 h-3 rounded-full ${
                                  dep.status === 'healthy' ? 'bg-green-400' :
                                  dep.status === 'degraded' ? 'bg-yellow-400' : 'bg-red-400'
                                }`} />
                                <span className="font-medium">{dep.name}</span>
                              </div>
                              <span className="text-sm text-gray-500">{dep.health}%</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500">No downstream dependencies</p>
                    )}
                  </div>
                </div>
              )}

              {activeTab === 'incidents' && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Recent Incidents</h3>
                  {serviceIncidents.length > 0 ? (
                    <div className="space-y-3">
                      {serviceIncidents.map(incident => (
                        <div key={incident.id} className="p-4 border rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-2">
                              <div className={`w-3 h-3 rounded-full ${
                                incident.severity === 'critical' ? 'bg-red-400' :
                                incident.severity === 'high' ? 'bg-orange-400' :
                                incident.severity === 'medium' ? 'bg-yellow-400' : 'bg-green-400'
                              }`} />
                              <span className="font-medium">{incident.title}</span>
                            </div>
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              incident.status === 'resolved' ? 'bg-green-100 text-green-600' :
                              incident.status === 'investigating' ? 'bg-yellow-100 text-yellow-600' :
                              'bg-red-100 text-red-600'
                            }`}>
                              {incident.status}
                            </span>
                          </div>
                          <p className="text-gray-600 text-sm mb-2">{incident.description}</p>
                          <div className="flex items-center justify-between text-xs text-gray-500">
                            <span>Created: {format(incident.createdAt, 'MMM dd, yyyy HH:mm')}</span>
                            <span>Assignee: {incident.assignee}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500">No recent incidents</p>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 