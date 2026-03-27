'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Activity,
  Zap,
  Target,
  DollarSign,
  Clock,
  Server,
  Database,
  Cpu,
  HardDrive,
  BarChart3,
  LineChart,
  PieChart,
  Eye,
  Brain,
  Shield,
  Gauge,
  Calendar,
  MapPin,
  Settings
} from 'lucide-react';
import { 
  LineChart as RechartsLineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  ScatterChart,
  Scatter,
  Cell,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis
} from 'recharts';
import useDashboardStore from '@/store/dashboard';
import { format, addHours, subDays } from 'date-fns';

interface PredictiveAnalyticsProps {
  className?: string;
}

interface FailurePrediction {
  serviceId: string;
  serviceName: string;
  probability: number; // 0-100
  timeToFailure: number; // hours
  confidence: number; // 0-100
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
}

interface CapacityRecommendation {
  serviceId: string;
  serviceName: string;
  currentUtilization: number;
  predictedUtilization: number;
  recommendation: string;
  urgency: 'low' | 'medium' | 'high';
  costImpact: number;
}

interface AnomalyAlert {
  id: string;
  serviceId: string;
  serviceName: string;
  metric: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  detectedAt: Date;
  probability: number;
}

interface ResourceForecast {
  timestamp: string;
  cpu: number;
  memory: number;
  disk: number;
  network: number;
  predicted: boolean;
}

export default function PredictiveAnalytics({ className = '' }: PredictiveAnalyticsProps) {
  const { services } = useDashboardStore();
  const [selectedTimeframe, setSelectedTimeframe] = useState<'6h' | '24h' | '7d'>('24h');
  const [selectedService, setSelectedService] = useState<string | null>(null);

  // Predictive data states
  const [failurePredictions, setFailurePredictions] = useState<FailurePrediction[]>([]);
  const [capacityRecommendations, setCapacityRecommendations] = useState<CapacityRecommendation[]>([]);
  const [anomalies, setAnomalies] = useState<AnomalyAlert[]>([]);
  const [resourceForecasts, setResourceForecasts] = useState<ResourceForecast[]>([]);
  const [riskHeatMap, setRiskHeatMap] = useState<any[]>([]);

  // Generate predictive analytics data
  useEffect(() => {
    const generatePredictiveData = () => {
      // Failure Predictions
      const predictions: FailurePrediction[] = services.slice(0, 8).map(service => {
        const probability = Math.random() * 100;
        const getRiskLevel = (prob: number) => {
          if (prob > 80) return 'critical';
          if (prob > 60) return 'high';
          if (prob > 40) return 'medium';
          return 'low';
        };

        return {
          serviceId: service.id,
          serviceName: service.name,
          probability: Math.round(probability),
          timeToFailure: Math.round(1 + Math.random() * 48),
          confidence: Math.round(70 + Math.random() * 30),
          riskLevel: getRiskLevel(probability)
        };
      });

      // Capacity Recommendations
      const recommendations: CapacityRecommendation[] = services.slice(0, 6).map(service => {
        const current = Math.round(50 + Math.random() * 40);
        const predicted = Math.round(current + Math.random() * 30);
        const urgency = predicted > 90 ? 'high' : predicted > 75 ? 'medium' : 'low';

        return {
          serviceId: service.id,
          serviceName: service.name,
          currentUtilization: current,
          predictedUtilization: predicted,
          recommendation: getCapacityRecommendation(predicted),
          urgency,
          costImpact: Math.round(100 + Math.random() * 2000)
        };
      });

      // Anomaly Alerts
      const anomalyAlerts: AnomalyAlert[] = services.slice(0, 5).map((service, i) => ({
        id: `anomaly_${i}`,
        serviceId: service.id,
        serviceName: service.name,
        metric: ['CPU Usage', 'Memory Usage', 'Response Time', 'Error Rate', 'Throughput'][i],
        severity: (['low', 'medium', 'high', 'critical'] as const)[Math.floor(Math.random() * 4)],
        description: getAnomalyDescription(['CPU Usage', 'Memory Usage', 'Response Time', 'Error Rate', 'Throughput'][i]),
        detectedAt: new Date(Date.now() - Math.random() * 3600000),
        probability: Math.round(60 + Math.random() * 40)
      }));

      // Resource Forecasts
      const forecasts: ResourceForecast[] = [];
      const now = new Date();
      for (let i = -12; i <= 12; i++) {
        const timestamp = addHours(now, i);
        const predicted = i > 0;
        
        forecasts.push({
          timestamp: format(timestamp, 'HH:mm'),
          cpu: Math.round(40 + Math.sin(i * 0.3) * 20 + Math.random() * 10),
          memory: Math.round(50 + Math.cos(i * 0.2) * 15 + Math.random() * 10),
          disk: Math.round(30 + Math.random() * 20),
          network: Math.round(35 + Math.sin(i * 0.4) * 25 + Math.random() * 10),
          predicted
        });
      }

      // Risk Heat Map
      const heatMap = services.slice(0, 12).map((service, index) => ({
        service: service.name.split(' ')[0],
        x: index % 4,
        y: Math.floor(index / 4),
        risk: Math.round(Math.random() * 100),
        incidents: Math.floor(Math.random() * 10)
      }));

      setFailurePredictions(predictions);
      setCapacityRecommendations(recommendations);
      setAnomalies(anomalyAlerts);
      setResourceForecasts(forecasts);
      setRiskHeatMap(heatMap);
    };

    generatePredictiveData();
    const interval = setInterval(generatePredictiveData, 30000);

    return () => clearInterval(interval);
  }, [services]);

  const getCapacityRecommendation = (utilization: number): string => {
    if (utilization > 90) return 'Immediate scaling required - Add 2-3 instances';
    if (utilization > 75) return 'Plan capacity increase within 48 hours';
    if (utilization > 60) return 'Monitor closely - Scale up next week';
    return 'Current capacity sufficient for next 30 days';
  };

  const getAnomalyDescription = (metric: string): string => {
    const descriptions: Record<string, string> = {
      'CPU Usage': 'CPU usage spike detected - 25% above normal baseline',
      'Memory Usage': 'Memory consumption trending upward - potential leak detected',
      'Response Time': 'Response times increasing - 40% slower than typical',
      'Error Rate': 'Error rate anomaly - 3x higher than normal',
      'Throughput': 'Throughput decline detected - 30% below expected levels'
    };
    return descriptions[metric] || 'Anomaly detected in system metrics';
  };

  const getRiskColor = (risk: number) => {
    if (risk > 80) return '#dc2626'; // red-600
    if (risk > 60) return '#ea580c'; // orange-600
    if (risk > 40) return '#d97706'; // amber-600
    return '#16a34a'; // green-600
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-600 bg-red-50 border-red-200';
      case 'high': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const criticalPredictions = failurePredictions.filter(p => p.riskLevel === 'critical').length;
  const highRiskServices = failurePredictions.filter(p => p.riskLevel === 'high').length;
  const totalCostOptimization = capacityRecommendations.reduce((sum, rec) => sum + rec.costImpact, 0);
  const activeAnomalies = anomalies.filter(a => a.severity === 'high' || a.severity === 'critical').length;

  return (
    <div className={`bg-white rounded-lg shadow-lg ${className}`}>
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6 rounded-t-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Brain className="w-8 h-8" />
            <div>
              <h2 className="text-2xl font-bold">Predictive Analytics Dashboard</h2>
              <p className="text-indigo-100">AI-powered insights and failure predictions</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <select
              value={selectedTimeframe}
              onChange={(e) => setSelectedTimeframe(e.target.value as any)}
              className="px-3 py-1 rounded-md bg-white/20 text-white border-white/30 text-sm"
            >
              <option value="6h">6 Hours</option>
              <option value="24h">24 Hours</option>
              <option value="7d">7 Days</option>
            </select>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="p-6 border-b bg-gray-50">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg border">
            <div className="flex items-center space-x-2 text-red-600 mb-2">
              <AlertTriangle className="w-5 h-5" />
              <span className="font-medium">Critical Risks</span>
            </div>
            <p className="text-2xl font-bold text-red-700">{criticalPredictions}</p>
            <p className="text-sm text-gray-500">Services at risk</p>
          </div>
          <div className="bg-white p-4 rounded-lg border">
            <div className="flex items-center space-x-2 text-orange-600 mb-2">
              <TrendingUp className="w-5 h-5" />
              <span className="font-medium">High Risk</span>
            </div>
            <p className="text-2xl font-bold text-orange-700">{highRiskServices}</p>
            <p className="text-sm text-gray-500">Needs attention</p>
          </div>
          <div className="bg-white p-4 rounded-lg border">
            <div className="flex items-center space-x-2 text-green-600 mb-2">
              <DollarSign className="w-5 h-5" />
              <span className="font-medium">Cost Savings</span>
            </div>
            <p className="text-2xl font-bold text-green-700">${totalCostOptimization.toLocaleString()}</p>
            <p className="text-sm text-gray-500">Potential monthly</p>
          </div>
          <div className="bg-white p-4 rounded-lg border">
            <div className="flex items-center space-x-2 text-purple-600 mb-2">
              <Eye className="w-5 h-5" />
              <span className="font-medium">Anomalies</span>
            </div>
            <p className="text-2xl font-bold text-purple-700">{activeAnomalies}</p>
            <p className="text-sm text-gray-500">Active alerts</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6 space-y-6">
        {/* Failure Predictions & Resource Forecasts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Failure Predictions */}
          <div className="bg-gradient-to-br from-red-50 to-orange-50 p-6 rounded-lg border">
            <div className="flex items-center space-x-2 mb-4">
              <Target className="w-5 h-5 text-red-600" />
              <h3 className="text-lg font-semibold text-red-900">Service Failure Predictions</h3>
            </div>
            <div className="space-y-3">
              {failurePredictions.slice(0, 5).map((prediction, index) => (
                <motion.div
                  key={prediction.serviceId}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white p-3 rounded-lg border"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-900 text-sm">
                      {prediction.serviceName.length > 30 
                        ? prediction.serviceName.substring(0, 30) + '...'
                        : prediction.serviceName}
                    </span>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      prediction.riskLevel === 'critical' ? 'bg-red-100 text-red-600' :
                      prediction.riskLevel === 'high' ? 'bg-orange-100 text-orange-600' :
                      prediction.riskLevel === 'medium' ? 'bg-yellow-100 text-yellow-600' :
                      'bg-green-100 text-green-600'
                    }`}>
                      {prediction.riskLevel}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-600">
                    <span>Failure Probability: {prediction.probability}%</span>
                    <span>ETA: {prediction.timeToFailure}h</span>
                  </div>
                  <div className="mt-2 bg-gray-200 rounded-full h-1">
                    <div
                      className={`h-1 rounded-full ${
                        prediction.probability > 80 ? 'bg-red-500' :
                        prediction.probability > 60 ? 'bg-orange-500' :
                        prediction.probability > 40 ? 'bg-yellow-500' :
                        'bg-green-500'
                      }`}
                      style={{ width: `${prediction.probability}%` }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Resource Forecasts */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-lg border">
            <div className="flex items-center space-x-2 mb-4">
              <BarChart3 className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-semibold text-blue-900">Resource Utilization Forecast</h3>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={resourceForecasts}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="timestamp" tick={{ fontSize: 12 }} />
                <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} />
                <Tooltip />
                <Area 
                  type="monotone" 
                  dataKey="cpu" 
                  stackId="1" 
                  stroke="#3B82F6" 
                  fill="#3B82F6" 
                  fillOpacity={0.6}
                  name="CPU %"
                />
                <Area 
                  type="monotone" 
                  dataKey="memory" 
                  stackId="1" 
                  stroke="#10B981" 
                  fill="#10B981" 
                  fillOpacity={0.6}
                  name="Memory %"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Capacity Planning & Anomaly Detection */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Capacity Planning */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-lg border">
            <div className="flex items-center space-x-2 mb-4">
              <Server className="w-5 h-5 text-green-600" />
              <h3 className="text-lg font-semibold text-green-900">Capacity Planning</h3>
            </div>
            <div className="space-y-3">
              {capacityRecommendations.slice(0, 4).map((rec, index) => (
                <motion.div
                  key={rec.serviceId}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white p-3 rounded-lg border"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-900 text-sm">
                      {rec.serviceName.length > 25 
                        ? rec.serviceName.substring(0, 25) + '...'
                        : rec.serviceName}
                    </span>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      rec.urgency === 'high' ? 'bg-red-100 text-red-600' :
                      rec.urgency === 'medium' ? 'bg-yellow-100 text-yellow-600' :
                      'bg-green-100 text-green-600'
                    }`}>
                      {rec.urgency}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 mb-2">{rec.recommendation}</p>
                  <div className="flex items-center justify-between text-xs">
                    <span>Current: {rec.currentUtilization}%</span>
                    <span>Predicted: {rec.predictedUtilization}%</span>
                    <span className="text-green-600">Save: ${rec.costImpact}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Anomaly Detection */}
          <div className="bg-gradient-to-br from-yellow-50 to-amber-50 p-6 rounded-lg border">
            <div className="flex items-center space-x-2 mb-4">
              <Zap className="w-5 h-5 text-yellow-600" />
              <h3 className="text-lg font-semibold text-yellow-900">Anomaly Detection</h3>
            </div>
            <div className="space-y-3">
              {anomalies.slice(0, 4).map((anomaly, index) => (
                <motion.div
                  key={anomaly.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white p-3 rounded-lg border"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-900 text-sm">
                      {anomaly.serviceName.length > 25 
                        ? anomaly.serviceName.substring(0, 25) + '...'
                        : anomaly.serviceName}
                    </span>
                    <span className={`px-2 py-1 text-xs rounded-full border ${getSeverityColor(anomaly.severity)}`}>
                      {anomaly.severity}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 mb-2">{anomaly.description}</p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{anomaly.metric}</span>
                    <span>{format(anomaly.detectedAt, 'HH:mm')}</span>
                    <span>{anomaly.probability}% confidence</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Risk Heat Map */}
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-lg border">
          <div className="flex items-center space-x-2 mb-4">
            <MapPin className="w-5 h-5 text-purple-600" />
            <h3 className="text-lg font-semibold text-purple-900">Service Risk Heat Map</h3>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {riskHeatMap.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                className="relative p-3 rounded-lg text-center cursor-pointer hover:scale-105 transition-transform"
                style={{ 
                  backgroundColor: getRiskColor(item.risk) + '20',
                  border: `1px solid ${getRiskColor(item.risk)}30`
                }}
              >
                <div className="text-sm font-medium text-gray-900 mb-1">
                  {item.service}
                </div>
                <div className="text-xs text-gray-600">
                  Risk: {item.risk}%
                </div>
                <div className="text-xs text-gray-500">
                  {item.incidents} incidents
                </div>
                <div 
                  className="absolute top-1 right-1 w-3 h-3 rounded-full"
                  style={{ backgroundColor: getRiskColor(item.risk) }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 