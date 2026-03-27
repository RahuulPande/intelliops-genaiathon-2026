'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Brain,
  Bug,
  CheckCircle,
  Clock,
  TrendingUp,
  Zap,
  Target,
  AlertTriangle,
  ThumbsUp,
  ThumbsDown,
  Copy,
  ExternalLink,
  Users,
  Calendar,
  Tag,
  Sparkles,
  DollarSign,
  BarChart3,
  Lightbulb,
  History
} from 'lucide-react';
import { Defect, DefectMatch, DefectPriority, DefectStatus } from '@/lib/types';
import { format, subDays, subHours } from 'date-fns';

interface AIDefectMatcherProps {
  className?: string;
}

interface AIInsight {
  id: string;
  confidence: number;
  timeSaved: number; // hours
  costSaved: number; // dollars
  riskReduction: number; // percentage
}

export default function AIDefectMatcher({ className = '' }: AIDefectMatcherProps) {
  const [selectedDefect, setSelectedDefect] = useState<Defect | null>(null);
  const [appliedSolutions, setAppliedSolutions] = useState<Set<string>>(new Set());
  const [feedback, setFeedback] = useState<Map<string, boolean>>(new Map());
  const [aiProcessing, setAiProcessing] = useState(false);

  // Mock JIRA defects with AI matching
  const [newDefects, setNewDefects] = useState<Defect[]>([]);
  const [aiInsights, setAiInsights] = useState<AIInsight[]>([]);

  // Generate mock defects with AI matching
  useEffect(() => {
    const generateMockDefects = () => {
      const titles = [
        'Payment Gateway timeout on high traffic',
        'User authentication fails intermittently',
        'Database connection pool exhaustion',
        'Memory leak in transaction processor',
        'API rate limiting causing 429 errors',
        'Cache invalidation not working properly',
        'Session timeout issues in mobile app',
        'Data corruption in audit logs'
      ];

      const descriptions = [
        'Users experiencing payment failures during peak hours with gateway timeouts',
        'Intermittent login failures observed across multiple user sessions',
        'Connection pool reaching maximum capacity causing database errors',
        'Memory usage continuously increasing in payment processing service',
        'API calls being rate limited causing user experience degradation',
        'Stale data being served to users due to cache invalidation issues',
        'Mobile users getting logged out unexpectedly during active sessions',
        'Audit trail showing corrupted entries affecting compliance reporting'
      ];

      const categories = ['Performance', 'Authentication', 'Database', 'Memory', 'API', 'Cache', 'Session', 'Data'];
      const priorities: DefectPriority[] = ['critical', 'high', 'medium', 'low'];
      const statuses: DefectStatus[] = ['open', 'in-progress'];

      const defects: Defect[] = Array.from({ length: 8 }, (_, i) => {
        const priority = priorities[Math.floor(Math.random() * priorities.length)];
        const similarity = 75 + Math.random() * 20; // 75-95% similarity
        
        return {
          id: `defect_${i + 1}`,
          title: titles[i],
          description: descriptions[i],
          status: statuses[Math.floor(Math.random() * statuses.length)],
          priority,
          category: categories[i],
          createdAt: subHours(new Date(), Math.random() * 48),
          updatedAt: subHours(new Date(), Math.random() * 24),
          reporter: `user_${Math.floor(Math.random() * 10)}`,
          assignee: `dev_${Math.floor(Math.random() * 5)}`,
          affectedServices: [`service_${Math.floor(Math.random() * 3) + 1}`],
          tags: ['ai-matched', categories[i].toLowerCase()],
          confidence: Math.round(similarity),
          similarDefects: [
            {
              defectId: `hist_${i}_1`,
              similarity: Math.round(similarity),
              solution: getSolution(categories[i]),
              resolvedIn: Math.round(2 + Math.random() * 6)
            },
            {
              defectId: `hist_${i}_2`,
              similarity: Math.round(similarity - 10),
              solution: getAlternateSolution(categories[i]),
              resolvedIn: Math.round(4 + Math.random() * 8)
            }
          ]
        };
      });

      setNewDefects(defects);

      // Generate AI insights
      const insights: AIInsight[] = defects.map((defect, i) => ({
        id: defect.id,
        confidence: defect.confidence || 80,
        timeSaved: Math.round(2 + Math.random() * 8),
        costSaved: Math.round(500 + Math.random() * 2000),
        riskReduction: Math.round(60 + Math.random() * 30)
      }));

      setAiInsights(insights);
    };

    generateMockDefects();
    const interval = setInterval(generateMockDefects, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const getSolution = (category: string): string => {
    const solutions: Record<string, string> = {
      'Performance': 'Implement connection pooling with retry logic and circuit breaker pattern',
      'Authentication': 'Add session validation middleware and implement token refresh mechanism',
      'Database': 'Increase connection pool size and add connection timeout monitoring',
      'Memory': 'Implement proper garbage collection and add memory leak detection',
      'API': 'Implement exponential backoff retry strategy with jitter',
      'Cache': 'Add cache versioning and implement distributed cache invalidation',
      'Session': 'Extend session timeout and add session persistence layer',
      'Data': 'Add data validation middleware and implement audit trail repair'
    };
    return solutions[category] || 'Apply standard debugging and monitoring practices';
  };

  const getAlternateSolution = (category: string): string => {
    const solutions: Record<string, string> = {
      'Performance': 'Scale horizontally and implement load balancing',
      'Authentication': 'Implement OAuth 2.0 with refresh tokens',
      'Database': 'Add read replicas and implement database sharding',
      'Memory': 'Optimize object lifecycle and implement memory profiling',
      'API': 'Implement API gateway with rate limiting and caching',
      'Cache': 'Use Redis clustering with automatic failover',
      'Session': 'Implement distributed session storage with Redis',
      'Data': 'Add database constraints and implement data backup strategies'
    };
    return solutions[category] || 'Consider alternative architectural approaches';
  };

  const applySolution = async (defectId: string, solutionIndex: number) => {
    setAiProcessing(true);
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setAppliedSolutions(prev => new Set([...prev, `${defectId}_${solutionIndex}`]));
    setAiProcessing(false);

    // Update defect status to resolved
    setNewDefects(prev => prev.map(defect => 
      defect.id === defectId 
        ? { ...defect, status: 'resolved' as DefectStatus, updatedAt: new Date() }
        : defect
    ));
  };

  const provideFeedback = (solutionKey: string, isPositive: boolean) => {
    setFeedback(prev => new Map(prev.set(solutionKey, isPositive)));
  };

  const getPriorityColor = (priority: DefectPriority) => {
    switch (priority) {
      case 'critical': return 'text-red-600 bg-red-50 border-red-200';
      case 'high': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'text-green-600 bg-green-50';
    if (confidence >= 75) return 'text-blue-600 bg-blue-50';
    if (confidence >= 60) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  const totalTimeSaved = aiInsights.reduce((sum, insight) => sum + insight.timeSaved, 0);
  const totalCostSaved = aiInsights.reduce((sum, insight) => sum + insight.costSaved, 0);
  const averageConfidence = aiInsights.reduce((sum, insight) => sum + insight.confidence, 0) / aiInsights.length;
  const successRate = ((appliedSolutions.size / (newDefects.length * 2)) * 100).toFixed(1);

  return (
    <div className={`bg-white rounded-lg shadow-lg ${className}`}>
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-6 rounded-t-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Brain className="w-8 h-8" />
            <div>
              <h2 className="text-2xl font-bold">AI Defect Matching System</h2>
              <p className="text-purple-100">Intelligent defect resolution with historical matching</p>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center space-x-4">
              <div className="text-center">
                <p className="text-sm text-purple-100">Success Rate</p>
                <p className="text-lg font-bold">{successRate}%</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-purple-100">Avg Confidence</p>
                <p className="text-lg font-bold">{averageConfidence.toFixed(1)}%</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="p-6 border-b bg-gray-50">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg border">
            <div className="flex items-center space-x-2 text-blue-600 mb-2">
              <Clock className="w-5 h-5" />
              <span className="font-medium">Time Saved</span>
            </div>
            <p className="text-2xl font-bold text-blue-700">{totalTimeSaved}h</p>
            <p className="text-sm text-gray-500">This month</p>
          </div>
          <div className="bg-white p-4 rounded-lg border">
            <div className="flex items-center space-x-2 text-green-600 mb-2">
              <DollarSign className="w-5 h-5" />
              <span className="font-medium">Cost Saved</span>
            </div>
            <p className="text-2xl font-bold text-green-700">${totalCostSaved.toLocaleString()}</p>
            <p className="text-sm text-gray-500">This month</p>
          </div>
          <div className="bg-white p-4 rounded-lg border">
            <div className="flex items-center space-x-2 text-purple-600 mb-2">
              <Bug className="w-5 h-5" />
              <span className="font-medium">Active Defects</span>
            </div>
            <p className="text-2xl font-bold text-purple-700">{newDefects.filter(d => d.status !== 'resolved').length}</p>
            <p className="text-sm text-gray-500">Pending resolution</p>
          </div>
          <div className="bg-white p-4 rounded-lg border">
            <div className="flex items-center space-x-2 text-orange-600 mb-2">
              <Target className="w-5 h-5" />
              <span className="font-medium">AI Matches</span>
            </div>
            <p className="text-2xl font-bold text-orange-700">{newDefects.length * 2}</p>
            <p className="text-sm text-gray-500">Solutions found</p>
          </div>
        </div>
      </div>

      {/* Defects List */}
      <div className="p-6">
        <div className="space-y-4">
          {newDefects.map((defect, index) => (
            <motion.div
              key={defect.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow"
            >
              {/* Defect Header */}
              <div className="p-4 bg-gray-50 border-b">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Bug className="w-5 h-5 text-gray-600" />
                    <div>
                      <h3 className="font-semibold text-gray-900">{defect.title}</h3>
                      <p className="text-sm text-gray-600">{defect.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 text-xs rounded-full border ${getPriorityColor(defect.priority)}`}>
                      {defect.priority}
                    </span>
                    <span className={`px-2 py-1 text-xs rounded-full ${getConfidenceColor(defect.confidence || 0)}`}>
                      {defect.confidence}% AI Match
                    </span>
                  </div>
                </div>
                <div className="mt-2 flex items-center space-x-4 text-xs text-gray-500">
                  <span className="flex items-center space-x-1">
                    <Calendar className="w-3 h-3" />
                    <span>{format(defect.createdAt, 'MMM dd, HH:mm')}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Users className="w-3 h-3" />
                    <span>{defect.assignee}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Tag className="w-3 h-3" />
                    <span>{defect.category}</span>
                  </span>
                </div>
              </div>

              {/* AI Matched Solutions */}
              <div className="p-4">
                <div className="flex items-center space-x-2 mb-3">
                  <Sparkles className="w-4 h-4 text-purple-600" />
                  <span className="font-medium text-purple-600">AI Matched Solutions</span>
                </div>
                
                <div className="space-y-3">
                  {defect.similarDefects?.map((match, matchIndex) => {
                    const solutionKey = `${defect.id}_${matchIndex}`;
                    const isApplied = appliedSolutions.has(solutionKey);
                    const feedbackValue = feedback.get(solutionKey);
                    
                    return (
                      <motion.div
                        key={matchIndex}
                        className="bg-blue-50 border border-blue-200 rounded-lg p-4"
                        whileHover={{ scale: 1.01 }}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <Lightbulb className="w-4 h-4 text-blue-600" />
                              <span className="text-sm font-medium text-blue-900">
                                Historical Match #{matchIndex + 1}
                              </span>
                              <span className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded">
                                {match.similarity}% similarity
                              </span>
                            </div>
                            <p className="text-sm text-gray-700 mb-2">{match.solution}</p>
                            <div className="flex items-center space-x-4 text-xs text-gray-500">
                              <span className="flex items-center space-x-1">
                                <Clock className="w-3 h-3" />
                                <span>Resolved in {match.resolvedIn}h</span>
                              </span>
                              <span className="flex items-center space-x-1">
                                <History className="w-3 h-3" />
                                <span>Defect ID: {match.defectId}</span>
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            {!isApplied ? (
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => applySolution(defect.id, matchIndex)}
                                disabled={aiProcessing}
                                className="flex items-center space-x-2 px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 transition-colors text-sm"
                              >
                                <Zap className="w-3 h-3" />
                                <span>{aiProcessing ? 'Applying...' : 'Apply Solution'}</span>
                              </motion.button>
                            ) : (
                              <span className="flex items-center space-x-2 text-green-600 text-sm">
                                <CheckCircle className="w-4 h-4" />
                                <span>Applied Successfully</span>
                              </span>
                            )}
                          </div>
                          
                          {isApplied && (
                            <div className="flex items-center space-x-2">
                              <span className="text-xs text-gray-500">Was this helpful?</span>
                              <button
                                onClick={() => provideFeedback(solutionKey, true)}
                                className={`p-1 rounded ${feedbackValue === true ? 'bg-green-100 text-green-600' : 'text-gray-400 hover:text-green-600'}`}
                              >
                                <ThumbsUp className="w-3 h-3" />
                              </button>
                              <button
                                onClick={() => provideFeedback(solutionKey, false)}
                                className={`p-1 rounded ${feedbackValue === false ? 'bg-red-100 text-red-600' : 'text-gray-400 hover:text-red-600'}`}
                              >
                                <ThumbsDown className="w-3 h-3" />
                              </button>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
} 