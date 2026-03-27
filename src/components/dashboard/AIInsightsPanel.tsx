'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Brain,
  Lightbulb,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Clock,
  Target,
  Zap,
  Eye,
  Filter,
  Download,
  Play,
  Pause,
  BarChart3,
  Activity,
  Shield,
  Users,
  DollarSign,
  Settings,
  ArrowRight,
  Star,
  ThumbsUp,
  ThumbsDown,
  RefreshCw
} from 'lucide-react';
import useDashboardStore from '@/store/dashboard';
import { format, subHours, subDays } from 'date-fns';

interface AIInsight {
  id: string;
  type: 'prediction' | 'recommendation' | 'anomaly' | 'optimization' | 'alert';
  title: string;
  description: string;
  confidence: number; // 0-100
  impact: 'critical' | 'high' | 'medium' | 'low';
  category: 'performance' | 'security' | 'cost' | 'reliability' | 'capacity';
  timestamp: Date;
  actionable: boolean;
  actionText?: string;
  serviceId?: string;
  serviceName?: string;
  prediction?: {
    probability: number;
    timeframe: string;
    riskLevel: number;
  };
  recommendation?: {
    savingsPotential: number;
    implementationTime: string;
    complexity: 'low' | 'medium' | 'high';
  };
  applied?: boolean;
  accuracy?: number; // Historical accuracy for this type of insight
}

interface AIInsightsPanelProps {
  className?: string;
}

export default function AIInsightsPanel({ className = '' }: AIInsightsPanelProps) {
  const { services } = useDashboardStore();
  const [insights, setInsights] = useState<AIInsight[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedImpact, setSelectedImpact] = useState<string>('all');
  const [isStreaming, setIsStreaming] = useState(true);
  const [appliedInsights, setAppliedInsights] = useState<Set<string>>(new Set());
  const [feedbackGiven, setFeedbackGiven] = useState<Map<string, boolean>>(new Map());

  // Generate AI insights with real-time updates
  useEffect(() => {
    const generateInsights = () => {
      const insightTemplates = [
        {
          type: 'prediction' as const,
          title: 'Service Degradation Predicted',
          category: 'reliability' as const,
          template: 'AI predicts {service} will experience degradation in {timeframe} with {probability}% probability'
        },
        {
          type: 'recommendation' as const,
          title: 'Performance Optimization Opportunity',
          category: 'performance' as const,
          template: 'Optimize {service} database queries to reduce response time by {savings}ms'
        },
        {
          type: 'anomaly' as const,
          title: 'Unusual Traffic Pattern Detected',
          category: 'security' as const,
          template: 'Anomalous traffic pattern detected on {service} - {description}'
        },
        {
          type: 'optimization' as const,
          title: 'Cost Reduction Opportunity',
          category: 'cost' as const,
          template: 'Scale down {service} during off-peak hours to save ${savings}/month'
        },
        {
          type: 'alert' as const,
          title: 'Capacity Threshold Warning',
          category: 'capacity' as const,
          template: '{service} approaching capacity limits - {description}'
        }
      ];

      const impacts: ('critical' | 'high' | 'medium' | 'low')[] = ['critical', 'high', 'medium', 'low'];
      const descriptions = [
        'Memory usage trending upward beyond normal baseline',
        'Response times 40% slower than typical patterns',
        'Error rate spike detected across multiple services',
        'Database connection pool nearing capacity limits',
        'CPU utilization showing sustained high usage',
        'Cache hit rate declining below optimal thresholds',
        'Network latency increasing during peak hours',
        'Storage usage growing faster than projected'
      ];

      const newInsights: AIInsight[] = Array.from({ length: 12 }, (_, i) => {
        const template = insightTemplates[i % insightTemplates.length];
        const service = services[Math.floor(Math.random() * services.length)];
        const impact = impacts[Math.floor(Math.random() * impacts.length)];
        const confidence = Math.round(70 + Math.random() * 30);
        const timeframe = ['2 hours', '6 hours', '24 hours', '3 days'][Math.floor(Math.random() * 4)];
        const savings = Math.round(50 + Math.random() * 500);

        let title = template.template
          .replace('{service}', service?.name?.split(' ')[0] || 'Service')
          .replace('{timeframe}', timeframe)
          .replace('{probability}', Math.round(60 + Math.random() * 35).toString())
          .replace('{savings}', savings.toString())
          .replace('{description}', descriptions[Math.floor(Math.random() * descriptions.length)]);

        return {
          id: `insight_${i + 1}`,
          type: template.type,
          title: template.title,
          description: title,
          confidence,
          impact,
          category: template.category,
          timestamp: subHours(new Date(), Math.random() * 2),
          actionable: Math.random() > 0.3,
          actionText: getActionText(template.type),
          serviceId: service?.id,
          serviceName: service?.name,
          prediction: template.type === 'prediction' ? {
            probability: Math.round(60 + Math.random() * 35),
            timeframe,
            riskLevel: Math.round(Math.random() * 100)
          } : undefined,
          recommendation: template.type === 'recommendation' || template.type === 'optimization' ? {
            savingsPotential: savings,
            implementationTime: ['15 min', '1 hour', '4 hours', '1 day'][Math.floor(Math.random() * 4)],
            complexity: (['low', 'medium', 'high'] as const)[Math.floor(Math.random() * 3)]
          } : undefined,
          applied: false,
          accuracy: Math.round(75 + Math.random() * 20) // Historical accuracy
        };
      });

      setInsights(prev => {
        // Add new insights and keep only the latest 20
        const combined = [...newInsights, ...prev];
        return combined.slice(0, 20);
      });
    };

    generateInsights();
    const interval = setInterval(() => {
      if (isStreaming) {
        // Add 1-2 new insights every 15 seconds
        const numNew = Math.random() > 0.5 ? 1 : 2;
        const newInsights = Array.from({ length: numNew }, (_, i) => {
          const templates = [
            { type: 'prediction' as const, title: 'Anomaly Prediction', category: 'reliability' as const },
            { type: 'recommendation' as const, title: 'Optimization Suggestion', category: 'performance' as const },
            { type: 'alert' as const, title: 'Resource Alert', category: 'capacity' as const }
          ];
          
          const template = templates[Math.floor(Math.random() * templates.length)];
          const service = services[Math.floor(Math.random() * services.length)];
          
          return {
            id: `insight_${Date.now()}_${i}`,
            type: template.type,
            title: template.title,
            description: `AI detected potential issue with ${service?.name || 'service'} requiring attention`,
            confidence: Math.round(70 + Math.random() * 30),
            impact: (['medium', 'high'] as const)[Math.floor(Math.random() * 2)],
            category: template.category,
            timestamp: new Date(),
            actionable: true,
            actionText: getActionText(template.type),
            serviceId: service?.id,
            serviceName: service?.name,
            applied: false,
            accuracy: Math.round(75 + Math.random() * 20)
          };
        });
        
        setInsights(prev => [...newInsights, ...prev].slice(0, 20));
      }
    }, 15000);

    return () => clearInterval(interval);
  }, [services, isStreaming]);

  const getActionText = (type: string): string => {
    switch (type) {
      case 'prediction': return 'Prepare Mitigation';
      case 'recommendation': return 'Apply Recommendation';
      case 'anomaly': return 'Investigate Anomaly';
      case 'optimization': return 'Implement Optimization';
      case 'alert': return 'Acknowledge Alert';
      default: return 'Take Action';
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'critical': return 'text-red-600 bg-red-50 border-red-200';
      case 'high': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'prediction': return <TrendingUp className="w-4 h-4" />;
      case 'recommendation': return <Lightbulb className="w-4 h-4" />;
      case 'anomaly': return <AlertTriangle className="w-4 h-4" />;
      case 'optimization': return <Target className="w-4 h-4" />;
      case 'alert': return <Zap className="w-4 h-4" />;
      default: return <Brain className="w-4 h-4" />;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'performance': return <Activity className="w-4 h-4" />;
      case 'security': return <Shield className="w-4 h-4" />;
      case 'cost': return <DollarSign className="w-4 h-4" />;
      case 'reliability': return <CheckCircle className="w-4 h-4" />;
      case 'capacity': return <BarChart3 className="w-4 h-4" />;
      default: return <Settings className="w-4 h-4" />;
    }
  };

  const applyInsight = async (insightId: string) => {
    setAppliedInsights(prev => new Set([...prev, insightId]));
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setInsights(prev => prev.map(insight => 
      insight.id === insightId ? { ...insight, applied: true } : insight
    ));
  };

  const provideFeedback = (insightId: string, isPositive: boolean) => {
    setFeedbackGiven(prev => new Map(prev.set(insightId, isPositive)));
  };

  const filteredInsights = useMemo(() => {
    return insights.filter(insight => {
      const categoryMatch = selectedCategory === 'all' || insight.category === selectedCategory;
      const impactMatch = selectedImpact === 'all' || insight.impact === selectedImpact;
      return categoryMatch && impactMatch;
    });
  }, [insights, selectedCategory, selectedImpact]);

  const averageConfidence = insights.length > 0 ? 
    Math.round(insights.reduce((sum, insight) => sum + insight.confidence, 0) / insights.length) : 0;

  const averageAccuracy = insights.length > 0 ? 
    Math.round(insights.reduce((sum, insight) => sum + (insight.accuracy || 0), 0) / insights.length) : 0;

  const criticalInsights = insights.filter(i => i.impact === 'critical').length;
  const actionableInsights = insights.filter(i => i.actionable).length;

  return (
    <div className={`bg-white rounded-lg shadow-lg ${className}`}>
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-t-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Brain className="w-8 h-8" />
            <div>
              <h2 className="text-2xl font-bold">AI Insights Panel</h2>
              <p className="text-blue-100">Real-time AI-generated insights and recommendations</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-center">
              <p className="text-sm text-blue-100">Avg Confidence</p>
              <p className="text-lg font-bold">{averageConfidence}%</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-blue-100">Accuracy</p>
              <p className="text-lg font-bold">{averageAccuracy}%</p>
            </div>
            <button
              onClick={() => setIsStreaming(!isStreaming)}
              className={`p-2 rounded-lg transition-colors ${
                isStreaming ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
              }`}
            >
              {isStreaming ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="p-6 border-b bg-gray-50">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg border">
            <div className="flex items-center space-x-2 text-red-600 mb-2">
              <AlertTriangle className="w-5 h-5" />
              <span className="font-medium">Critical Insights</span>
            </div>
            <p className="text-2xl font-bold text-red-700">{criticalInsights}</p>
            <p className="text-sm text-gray-500">Require immediate attention</p>
          </div>
          <div className="bg-white p-4 rounded-lg border">
            <div className="flex items-center space-x-2 text-blue-600 mb-2">
              <Lightbulb className="w-5 h-5" />
              <span className="font-medium">Actionable</span>
            </div>
            <p className="text-2xl font-bold text-blue-700">{actionableInsights}</p>
            <p className="text-sm text-gray-500">Ready to implement</p>
          </div>
          <div className="bg-white p-4 rounded-lg border">
            <div className="flex items-center space-x-2 text-green-600 mb-2">
              <CheckCircle className="w-5 h-5" />
              <span className="font-medium">Applied</span>
            </div>
            <p className="text-2xl font-bold text-green-700">{appliedInsights.size}</p>
            <p className="text-sm text-gray-500">Actions taken</p>
          </div>
          <div className="bg-white p-4 rounded-lg border">
            <div className="flex items-center space-x-2 text-purple-600 mb-2">
              <Activity className="w-5 h-5" />
              <span className="font-medium">Active Insights</span>
            </div>
            <p className="text-2xl font-bold text-purple-700">{insights.length}</p>
            <p className="text-sm text-gray-500">Total insights</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="p-4 border-b bg-gray-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-600" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-1 text-sm"
              >
                <option value="all">All Categories</option>
                <option value="performance">Performance</option>
                <option value="security">Security</option>
                <option value="cost">Cost</option>
                <option value="reliability">Reliability</option>
                <option value="capacity">Capacity</option>
              </select>
            </div>
            <select
              value={selectedImpact}
              onChange={(e) => setSelectedImpact(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-1 text-sm"
            >
              <option value="all">All Impact Levels</option>
              <option value="critical">Critical</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${isStreaming ? 'bg-green-400' : 'bg-red-400'}`} />
            <span className="text-sm text-gray-600">{isStreaming ? 'Live' : 'Paused'}</span>
          </div>
        </div>
      </div>

      {/* Insights List */}
      <div className="p-6 max-h-96 overflow-y-auto">
        <AnimatePresence>
          {filteredInsights.map((insight, index) => (
            <motion.div
              key={insight.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -300 }}
              transition={{ delay: index * 0.05 }}
              className="mb-4 border rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2">
                    {getTypeIcon(insight.type)}
                    {getCategoryIcon(insight.category)}
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{insight.title}</h4>
                    <p className="text-sm text-gray-600 mt-1">{insight.description}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 text-xs rounded-full border ${getImpactColor(insight.impact)}`}>
                    {insight.impact}
                  </span>
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    {insight.confidence}% confident
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                <div className="flex items-center space-x-4">
                  <span>{format(insight.timestamp, 'HH:mm:ss')}</span>
                  {insight.serviceName && <span>Service: {insight.serviceName.split(' ')[0]}</span>}
                  {insight.accuracy && <span>Historical accuracy: {insight.accuracy}%</span>}
                </div>
              </div>

              {insight.prediction && (
                <div className="bg-blue-50 p-3 rounded-md mb-3">
                  <div className="flex items-center justify-between text-sm">
                    <span>Probability: {insight.prediction.probability}%</span>
                    <span>Timeframe: {insight.prediction.timeframe}</span>
                    <span>Risk Level: {insight.prediction.riskLevel}%</span>
                  </div>
                </div>
              )}

              {insight.recommendation && (
                <div className="bg-green-50 p-3 rounded-md mb-3">
                  <div className="flex items-center justify-between text-sm">
                    <span>Savings: ${insight.recommendation.savingsPotential}</span>
                    <span>Time: {insight.recommendation.implementationTime}</span>
                    <span>Complexity: {insight.recommendation.complexity}</span>
                  </div>
                </div>
              )}

              {insight.actionable && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {!insight.applied && !appliedInsights.has(insight.id) ? (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => applyInsight(insight.id)}
                        className="flex items-center space-x-2 px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm"
                      >
                        <ArrowRight className="w-3 h-3" />
                        <span>{insight.actionText}</span>
                      </motion.button>
                    ) : (
                      <span className="flex items-center space-x-2 text-green-600 text-sm">
                        <CheckCircle className="w-4 h-4" />
                        <span>Applied</span>
                      </span>
                    )}
                  </div>

                  {(insight.applied || appliedInsights.has(insight.id)) && (
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-gray-500">Was this helpful?</span>
                      <button
                        onClick={() => provideFeedback(insight.id, true)}
                        className={`p-1 rounded ${
                          feedbackGiven.get(insight.id) === true 
                            ? 'bg-green-100 text-green-600' 
                            : 'text-gray-400 hover:text-green-600'
                        }`}
                      >
                        <ThumbsUp className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => provideFeedback(insight.id, false)}
                        className={`p-1 rounded ${
                          feedbackGiven.get(insight.id) === false 
                            ? 'bg-red-100 text-red-600' 
                            : 'text-gray-400 hover:text-red-600'
                        }`}
                      >
                        <ThumbsDown className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {filteredInsights.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <Brain className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>No insights match the current filters</p>
          </div>
        )}
      </div>
    </div>
  );
} 