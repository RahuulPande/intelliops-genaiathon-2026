'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Database, 
  Activity, 
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Eye,
  Cpu,
  Clock,
  BarChart3,
  Brain,
  RefreshCw,
  Zap,
  Target,
  Bell
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar } from 'recharts';

export default function ContinuousLogAnalysis() {
  const [selectedTimeframe, setSelectedTimeframe] = useState<'hour' | 'day' | 'week'>('hour');

  // Splunk Integration Status
  const splunkStatus = {
    connectionStatus: 'ACTIVE',
    lastSync: new Date(),
    dailyLogVolume: '10.2M',
    realTimeLatency: '< 2 seconds',
    dataRetention: '5 years',
    integrationHealth: 98,
    connectedSources: 47,
    anomaliesDetected: 847,
    preventionRate: 94.2
  };

  // Real-time log processing data
  const logProcessingData = useMemo(() => {
    const hours = selectedTimeframe === 'hour' ? 12 : selectedTimeframe === 'day' ? 24 : 168;
    return Array.from({ length: hours }, (_, i) => {
      const time = new Date();
      time.setHours(time.getHours() - (hours - i - 1));
      
      const baseVolume = 400000 + Math.sin(i / 4) * 100000;
      
      return {
        time: time.toISOString(),
        timeLabel: selectedTimeframe === 'hour' ? 
          time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) :
          selectedTimeframe === 'day' ? 
          time.toLocaleTimeString('en-US', { hour: '2-digit' }) :
          time.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit' }),
        logsProcessed: Math.max(200000, baseVolume + Math.random() * 200000),
        anomaliesDetected: Math.floor(Math.random() * 50) + 10,
        alertsGenerated: Math.floor(Math.random() * 15) + 2,
        processingLatency: Math.random() * 1.5 + 0.5,
        healthScore: Math.max(85, Math.min(99, 94 + Math.random() * 10 - 5))
      };
    });
  }, [selectedTimeframe]);

  // Service log sources
  const logSources = [
    {
      source: 'Application Servers',
      count: 12,
      volume: '4.2M',
      status: 'healthy',
      latency: '1.2s',
      errors: 23
    },
    {
      source: 'Database Instances',
      count: 8,
      volume: '2.8M',
      status: 'healthy',
      latency: '0.8s',
      errors: 5
    },
    {
      source: 'API Gateways',
      count: 6,
      volume: '1.9M',
      status: 'warning',
      latency: '2.1s',
      errors: 47
    },
    {
      source: 'Load Balancers',
      count: 4,
      volume: '0.9M',
      status: 'healthy',
      latency: '0.4s',
      errors: 2
    },
    {
      source: 'Cache Systems',
      count: 5,
      volume: '0.4M',
      status: 'healthy',
      latency: '0.2s',
      errors: 1
    },
    {
      source: 'External Services',
      count: 12,
      volume: '0.8M',
      status: 'degraded',
      latency: '3.2s',
      errors: 89
    }
  ];

  // AI-detected patterns and anomalies
  const aiDetectedPatterns = [
    {
      id: 'PATTERN-001',
      type: 'Anomaly',
      severity: 'HIGH',
      service: 'Payment API',
      pattern: 'Unusual error spike in payment processing',
      confidence: 96,
      impact: 'Potential service degradation in 2-4 hours',
      recommendation: 'Scale payment service instances',
      timestamp: new Date(Date.now() - 15 * 60 * 1000),
      logSample: 'ERROR: Payment timeout after 30s - retry limit exceeded'
    },
    {
      id: 'PATTERN-002',
      type: 'Trend',
      severity: 'MEDIUM',
      service: 'Database Cluster',
      pattern: 'Gradual increase in query response times',
      confidence: 87,
      impact: 'Performance degradation likely within 6 hours',
      recommendation: 'Review slow query logs and optimize indexes',
      timestamp: new Date(Date.now() - 45 * 60 * 1000),
      logSample: 'WARN: Query execution time 2.3s (threshold: 1.5s)'
    },
    {
      id: 'PATTERN-003',
      type: 'Prediction',
      severity: 'LOW',
      service: 'Cache System',
      pattern: 'Memory usage approaching threshold',
      confidence: 78,
      impact: 'Cache eviction rate may increase',
      recommendation: 'Schedule cache maintenance during low traffic',
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      logSample: 'INFO: Memory usage 82% (warning threshold: 85%)'
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'HIGH': return 'text-red-600 bg-red-50 border-red-200';
      case 'MEDIUM': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'LOW': return 'text-blue-600 bg-blue-50 border-blue-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'text-green-600 bg-green-100';
      case 'warning': return 'text-yellow-600 bg-yellow-100';
      case 'degraded': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'warning': return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case 'degraded': return <AlertTriangle className="w-4 h-4 text-red-500" />;
      default: return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header with Controls */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Continuous Log Analysis</h2>
          <p className="text-gray-600">Real-time Splunk integration monitoring and AI-powered pattern detection</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <select 
            value={selectedTimeframe}
            onChange={(e) => setSelectedTimeframe(e.target.value as 'hour' | 'day' | 'week')}
            className="border border-gray-300 rounded-lg px-3 py-2"
          >
            <option value="hour">Last 12 Hours</option>
            <option value="day">Last 24 Hours</option>
            <option value="week">Last Week</option>
          </select>
          
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <RefreshCw className="w-4 h-4" />
            <span>Live updating</span>
          </div>
        </div>
      </div>

      {/* Splunk Integration Status */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl p-6 text-white">
        <div className="flex items-center space-x-3 mb-4">
          <Search className="w-8 h-8" />
          <div>
            <h3 className="text-2xl font-bold">Splunk Integration Status</h3>
            <p className="text-blue-100">Continuous log monitoring and analysis</p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-white/10 rounded-lg p-3">
            <div className="text-2xl font-bold">{splunkStatus.dailyLogVolume}</div>
            <div className="text-sm text-blue-100">Daily Log Volume</div>
            <div className="text-xs text-blue-200">↑ 12% from yesterday</div>
          </div>
          <div className="bg-white/10 rounded-lg p-3">
            <div className="text-2xl font-bold">{splunkStatus.anomaliesDetected}</div>
            <div className="text-sm text-blue-100">Anomalies Detected</div>
            <div className="text-xs text-blue-200">{splunkStatus.preventionRate}% prevention rate</div>
          </div>
          <div className="bg-white/10 rounded-lg p-3">
            <div className="text-2xl font-bold">{splunkStatus.connectedSources}</div>
            <div className="text-sm text-blue-100">Connected Sources</div>
            <div className="text-xs text-blue-200">Real-time streaming</div>
          </div>
          <div className="bg-white/10 rounded-lg p-3">
            <div className="text-2xl font-bold">{splunkStatus.realTimeLatency}</div>
            <div className="text-sm text-blue-100">Processing Latency</div>
            <div className="text-xs text-blue-200">Health: {splunkStatus.integrationHealth}%</div>
          </div>
        </div>
        
        <div className="mt-4 flex items-center space-x-4 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <span>Connection: {splunkStatus.connectionStatus}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4" />
            <span>Last sync: {splunkStatus.lastSync.toLocaleTimeString()}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Database className="w-4 h-4" />
            <span>Retention: {splunkStatus.dataRetention}</span>
          </div>
        </div>
      </div>

      {/* Real-time Log Processing Chart */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold mb-4">Real-Time Log Processing Volume</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={logProcessingData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="timeLabel" />
              <YAxis />
              <Tooltip 
                formatter={(value, name) => [
                  name === 'logsProcessed' ? `${(value as number / 1000).toFixed(1)}K` : value,
                  name === 'logsProcessed' ? 'Logs Processed' : 
                  name === 'anomaliesDetected' ? 'Anomalies Detected' : 
                  name === 'alertsGenerated' ? 'Alerts Generated' : name
                ]}
              />
              <Area type="monotone" dataKey="logsProcessed" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.3} name="logsProcessed" />
              <Line type="monotone" dataKey="anomaliesDetected" stroke="#EF4444" strokeWidth={2} name="anomaliesDetected" />
              <Line type="monotone" dataKey="alertsGenerated" stroke="#F59E0B" strokeWidth={2} name="alertsGenerated" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Log Sources Status */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold mb-4">Log Sources Status</h3>
          <div className="space-y-4">
            {logSources.map((source, index) => (
              <motion.div
                key={source.source}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="border rounded-lg p-4"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(source.status)}
                    <div>
                      <h4 className="font-medium text-gray-900">{source.source}</h4>
                      <p className="text-sm text-gray-600">{source.count} instances</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(source.status)}`}>
                    {source.status.toUpperCase()}
                  </span>
                </div>
                
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Volume:</span>
                    <span className="ml-1 font-medium">{source.volume}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Latency:</span>
                    <span className="ml-1 font-medium">{source.latency}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Errors:</span>
                    <span className={`ml-1 font-medium ${source.errors > 50 ? 'text-red-600' : source.errors > 20 ? 'text-yellow-600' : 'text-green-600'}`}>
                      {source.errors}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Processing Latency Trend */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold mb-4">Processing Latency Trend</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={logProcessingData.slice(-20)}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="timeLabel" />
                <YAxis />
                <Tooltip formatter={(value) => [`${(value as number).toFixed(2)}s`, 'Processing Latency']} />
                <Line type="monotone" dataKey="processingLatency" stroke="#10B981" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* AI-Detected Patterns and Anomalies */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold mb-6">AI-Detected Patterns & Anomalies</h3>
        <div className="space-y-4">
          {aiDetectedPatterns.map((pattern, index) => (
            <motion.div
              key={pattern.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className={`border-2 rounded-lg p-4 ${getSeverityColor(pattern.severity)}`}
            >
              <div className="flex items-start space-x-3">
                <Brain className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <h4 className="font-semibold text-gray-900">{pattern.pattern}</h4>
                      <span className={`px-2 py-1 text-xs rounded-full border ${getSeverityColor(pattern.severity)}`}>
                        {pattern.severity}
                      </span>
                    </div>
                    <div className="text-sm text-gray-500">
                      {pattern.timestamp.toLocaleTimeString()} • {pattern.confidence}% confidence
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Service:</span>
                      <span className="ml-2 font-medium">{pattern.service}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Type:</span>
                      <span className="ml-2 font-medium">{pattern.type}</span>
                    </div>
                  </div>
                  
                  <div className="mt-3 p-3 bg-white rounded-lg border">
                    <div className="flex items-start space-x-2">
                      <Target className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-medium text-gray-900">Impact:</span>
                        <p className="text-gray-700 text-sm mt-1">{pattern.impact}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-2 p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-start space-x-2">
                      <Zap className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-medium text-blue-900">AI Recommendation:</span>
                        <p className="text-blue-800 text-sm mt-1">{pattern.recommendation}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-3 p-2 bg-gray-100 rounded font-mono text-xs text-gray-800">
                    <span className="text-gray-500">Log Sample:</span> {pattern.logSample}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Real-time Statistics */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Real-Time Processing Statistics</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg p-4 border border-gray-200 text-center">
            <div className="text-2xl font-bold text-blue-600">{(logProcessingData[logProcessingData.length - 1]?.logsProcessed / 1000).toFixed(1)}K</div>
            <div className="text-sm text-gray-600">Logs/Hour</div>
            <div className="text-xs text-green-600">Live processing</div>
          </div>
          <div className="bg-white rounded-lg p-4 border border-gray-200 text-center">
            <div className="text-2xl font-bold text-red-600">{logProcessingData[logProcessingData.length - 1]?.anomaliesDetected}</div>
            <div className="text-sm text-gray-600">Anomalies/Hour</div>
            <div className="text-xs text-blue-600">AI detected</div>
          </div>
          <div className="bg-white rounded-lg p-4 border border-gray-200 text-center">
            <div className="text-2xl font-bold text-yellow-600">{logProcessingData[logProcessingData.length - 1]?.alertsGenerated}</div>
            <div className="text-sm text-gray-600">Alerts/Hour</div>
            <div className="text-xs text-purple-600">Auto-generated</div>
          </div>
          <div className="bg-white rounded-lg p-4 border border-gray-200 text-center">
            <div className="text-2xl font-bold text-green-600">{logProcessingData[logProcessingData.length - 1]?.healthScore.toFixed(1)}</div>
            <div className="text-sm text-gray-600">Health Score</div>
            <div className="text-xs text-green-600">Overall system</div>
          </div>
        </div>
      </div>
    </div>
  );
}