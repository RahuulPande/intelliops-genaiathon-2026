'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Brain,
  Lightbulb,
  CheckCircle,
  FileText,
  Link2,
  Target,
  Zap,
  ArrowRight,
  Database,
  GitBranch,
  Clock,
  ThumbsUp,
  ThumbsDown,
  Copy,
  ExternalLink,
  Sparkles,
  Shield,
  AlertTriangle,
  BookOpen
} from 'lucide-react';

// RAG pipeline visualization data
const ragPipelineSteps = [
  { step: 1, label: 'Query', description: 'New defect ingested', icon: Search, color: 'bg-blue-500' },
  { step: 2, label: 'Embed', description: 'Vector embedding generated', icon: Database, color: 'bg-purple-500' },
  { step: 3, label: 'Retrieve', description: 'Similar defects found', icon: GitBranch, color: 'bg-indigo-500' },
  { step: 4, label: 'Reason', description: 'Root cause extracted', icon: Brain, color: 'bg-orange-500' },
  { step: 5, label: 'Recommend', description: 'Fix suggestion generated', icon: Lightbulb, color: 'bg-green-500' },
];

// Sample active defect for RAG demo
const activeDefect = {
  id: 'DEF-4521',
  title: 'Payment API returns 504 Gateway Timeout during peak trading hours (09:00-10:30 GMT)',
  module: 'Payment Gateway',
  severity: 'Critical',
  reporter: 'Automated Monitor',
  created: '2 hours ago',
  description: 'The payment processing API intermittently returns 504 errors when concurrent request volume exceeds 400 req/s during morning trading peak. Affects approximately 12% of transactions during the window. No errors observed outside peak hours.',
  environment: 'Production',
  stackTrace: 'java.net.SocketTimeoutException: Read timed out at com.bank.payment.gateway.PaymentProcessor.execute(PaymentProcessor.java:342)',
};

// RAG-retrieved similar defects
const similarDefects = [
  {
    id: 'DEF-3201',
    title: 'Payment Gateway timeout under load during month-end batch processing',
    similarity: 94.7,
    resolvedDate: 'Jan 15, 2026',
    resolution: 'Increased connection pool from 50 to 200, added circuit breaker with 5s timeout, implemented request queuing with priority levels',
    rootCause: 'HikariCP connection pool exhaustion when concurrent DB connections exceeded pool size under sustained load',
    module: 'Payment Gateway',
    resolvedBy: 'Backend Team',
    mttr: '4.5 hours',
    linkedTickets: ['DEF-3198', 'DEF-3199']
  },
  {
    id: 'DEF-2847',
    title: 'API timeout spikes during authentication token refresh storm',
    similarity: 87.3,
    resolvedDate: 'Nov 22, 2025',
    resolution: 'Implemented token refresh jitter (random delay 0-30s) to prevent thundering herd, added local token cache with 30s grace period',
    rootCause: 'Synchronized token expiry causing all clients to refresh simultaneously, overwhelming the auth service',
    module: 'Authentication',
    resolvedBy: 'Platform Team',
    mttr: '6 hours',
    linkedTickets: ['DEF-2845']
  },
  {
    id: 'DEF-1956',
    title: 'Transaction service 504 errors during concurrent FX rate updates',
    similarity: 82.1,
    resolvedDate: 'Aug 03, 2025',
    resolution: 'Moved FX rate updates to async processing with event sourcing, decoupled rate ingestion from transaction path',
    rootCause: 'FX rate update locks blocking transaction processing threads in shared connection pool',
    module: 'Transaction Processing',
    resolvedBy: 'Backend Team',
    mttr: '8 hours',
    linkedTickets: ['DEF-1954', 'DEF-1955']
  },
  {
    id: 'DEF-3687',
    title: 'Payment confirmation endpoint slow under concurrent batch settlements',
    similarity: 78.5,
    resolvedDate: 'Feb 28, 2026',
    resolution: 'Added read replicas for settlement queries, separated OLTP and OLAP workloads, implemented query result caching',
    rootCause: 'Heavy analytical queries on settlement tables competing with real-time payment confirmations on same database',
    module: 'Payment Gateway',
    resolvedBy: 'Database Team',
    mttr: '12 hours',
    linkedTickets: ['DEF-3685']
  }
];

// AI-generated recommendation
const aiRecommendation = {
  confidence: 91,
  rootCauseAnalysis: {
    primaryCause: 'Connection pool exhaustion under peak concurrent load (>400 req/s)',
    contributingFactors: [
      'Default HikariCP pool size of 50 is insufficient for peak trading volumes',
      'No circuit breaker to prevent cascade failures when pool is exhausted',
      'Synchronous downstream calls holding connections longer than necessary',
      'Missing request prioritization - all requests treated equally regardless of criticality'
    ],
    evidence: 'Pattern matches DEF-3201 (94.7% similarity) which had identical root cause. Stack trace confirms SocketTimeoutException originating from connection acquisition timeout.'
  },
  suggestedFixes: [
    {
      priority: 1,
      title: 'Increase connection pool and add circuit breaker',
      description: 'Increase HikariCP pool to 200 connections with circuit breaker (threshold: 50% failure rate, timeout: 5s, reset: 30s)',
      effort: 'Low (2-4 hours)',
      impact: 'High - Resolves immediate timeout issue',
      codeSnippet: `// application.yml
spring.datasource.hikari:
  maximum-pool-size: 200
  minimum-idle: 50
  connection-timeout: 5000

// CircuitBreakerConfig.java
@CircuitBreaker(name = "paymentGateway",
  failureRateThreshold = 50,
  waitDurationInOpenState = 30s)`,
      relatedTicket: 'DEF-3201'
    },
    {
      priority: 2,
      title: 'Implement request queuing with priority levels',
      description: 'Add priority queue for payment requests - critical payments (settlements, confirmations) get priority over informational queries',
      effort: 'Medium (1-2 days)',
      impact: 'High - Ensures critical transactions succeed even under load',
      codeSnippet: `// PaymentRequestQueue.java
@Bean
public PriorityBlockingQueue<PaymentRequest> paymentQueue() {
  return new PriorityBlockingQueue<>(1000,
    Comparator.comparing(PaymentRequest::getPriority));
}`,
      relatedTicket: 'DEF-3201'
    },
    {
      priority: 3,
      title: 'Convert synchronous downstream calls to async',
      description: 'Use reactive WebClient for non-critical downstream calls (audit logging, notifications) to release connections faster',
      effort: 'Medium (2-3 days)',
      impact: 'Medium - Reduces connection hold time by ~40%',
      codeSnippet: `// AsyncNotificationService.java
webClient.post()
  .uri("/api/notifications")
  .bodyValue(notification)
  .retrieve()
  .bodyToMono(Void.class)
  .subscribe(); // fire-and-forget`,
      relatedTicket: 'DEF-1956'
    }
  ],
  testRecommendations: [
    'Load test with 500+ concurrent requests for 30 minutes',
    'Verify circuit breaker opens at 50% failure threshold',
    'Confirm priority queue routes critical payments correctly under load',
    'Test connection pool recovery after circuit breaker reset'
  ]
};

export default function RAGSolutionRecommendations() {
  const [activeStep, setActiveStep] = useState(5);
  const [expandedFix, setExpandedFix] = useState<number | null>(1);
  const [feedbackGiven, setFeedbackGiven] = useState<Record<string, boolean>>({});

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-teal-700 rounded-xl p-6 text-white">
        <div className="flex items-center space-x-3 mb-3">
          <Sparkles className="w-7 h-7" />
          <div>
            <h2 className="text-2xl font-bold">RAG-Powered Solution Recommendations</h2>
            <p className="text-green-200">Retrieval-Augmented Generation for intelligent defect resolution</p>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          <div className="bg-white/10 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold">12,847</div>
            <div className="text-xs text-green-200">Historical Defects Indexed</div>
          </div>
          <div className="bg-white/10 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold">96%</div>
            <div className="text-xs text-green-200">Match Accuracy</div>
          </div>
          <div className="bg-white/10 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold">87.5%</div>
            <div className="text-xs text-green-200">MTTR Reduction</div>
          </div>
          <div className="bg-white/10 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold">5 yrs</div>
            <div className="text-xs text-green-200">Knowledge Corpus</div>
          </div>
        </div>
      </div>

      {/* RAG Pipeline Visualization */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
          <Brain className="w-5 h-5 text-purple-600" />
          <span>RAG Pipeline</span>
          <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Live</span>
        </h3>

        <div className="flex items-center justify-between mb-6">
          {ragPipelineSteps.map((step, index) => {
            const Icon = step.icon;
            const isActive = activeStep >= step.step;
            return (
              <div key={step.step} className="flex items-center flex-1">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0.5 }}
                  animate={{ scale: isActive ? 1 : 0.8, opacity: isActive ? 1 : 0.5 }}
                  className="flex flex-col items-center"
                >
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    isActive ? step.color : 'bg-gray-200'
                  } transition-colors`}>
                    <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-400'}`} />
                  </div>
                  <div className={`text-xs font-medium mt-2 ${isActive ? 'text-gray-900' : 'text-gray-400'}`}>
                    {step.label}
                  </div>
                  <div className={`text-xs ${isActive ? 'text-gray-500' : 'text-gray-300'}`}>
                    {step.description}
                  </div>
                </motion.div>
                {index < ragPipelineSteps.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-2 ${
                    activeStep > step.step ? 'bg-green-400' : 'bg-gray-200'
                  } transition-colors`} />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Active Defect (Query) */}
      <div className="bg-white rounded-xl border-2 border-blue-200 p-6">
        <div className="flex items-center space-x-2 mb-4">
          <div className="bg-blue-100 p-1.5 rounded-lg">
            <AlertTriangle className="w-5 h-5 text-blue-600" />
          </div>
          <h3 className="font-semibold text-gray-900">Active Defect — Input Query</h3>
          <span className="bg-red-100 text-red-700 px-2 py-0.5 rounded text-xs font-medium">{activeDefect.severity}</span>
        </div>

        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-1">
              <span className="text-sm font-mono text-blue-600">{activeDefect.id}</span>
              <span className="text-xs text-gray-400">•</span>
              <span className="text-xs text-gray-500">{activeDefect.module}</span>
              <span className="text-xs text-gray-400">•</span>
              <span className="text-xs text-gray-500">{activeDefect.created}</span>
            </div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">{activeDefect.title}</h4>
            <p className="text-sm text-gray-600 mb-3">{activeDefect.description}</p>
            <div className="bg-gray-900 rounded-lg p-3">
              <code className="text-xs text-green-400 font-mono">{activeDefect.stackTrace}</code>
            </div>
          </div>
        </div>
      </div>

      {/* Retrieved Similar Defects */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center space-x-2 mb-4">
          <div className="bg-indigo-100 p-1.5 rounded-lg">
            <Search className="w-5 h-5 text-indigo-600" />
          </div>
          <h3 className="font-semibold text-gray-900">Retrieved Similar Defects</h3>
          <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full">
            {similarDefects.length} matches from vector search
          </span>
        </div>

        <div className="space-y-3">
          {similarDefects.map((defect, index) => (
            <motion.div
              key={defect.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="border border-gray-200 rounded-lg p-4 hover:border-indigo-300 hover:shadow-sm transition-all"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-xs font-mono text-indigo-600">{defect.id}</span>
                    <span className="text-xs text-gray-400">{defect.module}</span>
                    <span className="text-xs text-gray-400">•</span>
                    <span className="text-xs text-gray-400">Resolved: {defect.resolvedDate}</span>
                    <span className="text-xs text-gray-400">•</span>
                    <span className="text-xs text-gray-400">MTTR: {defect.mttr}</span>
                  </div>
                  <h4 className="text-sm font-medium text-gray-900">{defect.title}</h4>
                </div>
                <div className={`text-right px-3 py-1 rounded-lg ${
                  defect.similarity >= 90 ? 'bg-green-100 text-green-700' :
                  defect.similarity >= 80 ? 'bg-blue-100 text-blue-700' :
                  'bg-yellow-100 text-yellow-700'
                }`}>
                  <div className="text-lg font-bold">{defect.similarity}%</div>
                  <div className="text-xs">similarity</div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                <div className="bg-red-50 rounded p-2">
                  <div className="text-xs font-medium text-red-700 mb-0.5">Root Cause</div>
                  <p className="text-xs text-red-600">{defect.rootCause}</p>
                </div>
                <div className="bg-green-50 rounded p-2">
                  <div className="text-xs font-medium text-green-700 mb-0.5">Resolution Applied</div>
                  <p className="text-xs text-green-600">{defect.resolution}</p>
                </div>
              </div>

              <div className="flex items-center space-x-2 mt-2">
                <span className="text-xs text-gray-400">Linked tickets:</span>
                {defect.linkedTickets.map(ticket => (
                  <span key={ticket} className="text-xs text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded font-mono">
                    {ticket}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* AI-Generated Recommendation */}
      <div className="bg-white rounded-xl border-2 border-green-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <div className="bg-green-100 p-1.5 rounded-lg">
              <Lightbulb className="w-5 h-5 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900">AI-Generated Resolution Recommendation</h3>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-xs text-gray-500">Confidence:</span>
            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-bold">
              {aiRecommendation.confidence}%
            </span>
          </div>
        </div>

        {/* Root Cause Analysis */}
        <div className="bg-red-50 rounded-lg p-4 mb-4 border border-red-200">
          <h4 className="font-semibold text-red-800 mb-2 flex items-center space-x-2">
            <Target className="w-4 h-4" />
            <span>Root Cause Analysis</span>
          </h4>
          <p className="text-sm text-red-700 font-medium mb-2">{aiRecommendation.rootCauseAnalysis.primaryCause}</p>
          <div className="space-y-1 mb-3">
            {aiRecommendation.rootCauseAnalysis.contributingFactors.map((factor, i) => (
              <div key={i} className="flex items-start space-x-2 text-xs text-red-600">
                <span className="mt-0.5">•</span>
                <span>{factor}</span>
              </div>
            ))}
          </div>
          <div className="bg-white/50 rounded p-2 text-xs text-red-600 italic">
            <strong>Evidence:</strong> {aiRecommendation.rootCauseAnalysis.evidence}
          </div>
        </div>

        {/* Suggested Fixes */}
        <h4 className="font-semibold text-gray-900 mb-3 flex items-center space-x-2">
          <Zap className="w-4 h-4 text-yellow-500" />
          <span>Suggested Fixes (Ranked by Priority)</span>
        </h4>

        <div className="space-y-3">
          {aiRecommendation.suggestedFixes.map((fix) => (
            <motion.div
              key={fix.priority}
              className="border border-gray-200 rounded-lg overflow-hidden"
            >
              <button
                onClick={() => setExpandedFix(expandedFix === fix.priority ? null : fix.priority)}
                className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <span className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold ${
                    fix.priority === 1 ? 'bg-red-500' : fix.priority === 2 ? 'bg-orange-500' : 'bg-blue-500'
                  }`}>
                    {fix.priority}
                  </span>
                  <div className="text-left">
                    <h5 className="font-medium text-gray-900">{fix.title}</h5>
                    <div className="flex items-center space-x-3 text-xs text-gray-500 mt-0.5">
                      <span className="flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>{fix.effort}</span>
                      </span>
                      <span>Impact: {fix.impact}</span>
                    </div>
                  </div>
                </div>
                <ArrowRight className={`w-4 h-4 text-gray-400 transition-transform ${expandedFix === fix.priority ? 'rotate-90' : ''}`} />
              </button>

              {expandedFix === fix.priority && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  className="px-4 pb-4"
                >
                  <p className="text-sm text-gray-600 mb-3">{fix.description}</p>

                  <div className="bg-gray-900 rounded-lg p-4 mb-3 relative">
                    <button className="absolute top-2 right-2 text-gray-400 hover:text-white">
                      <Copy className="w-4 h-4" />
                    </button>
                    <pre className="text-xs text-green-400 font-mono whitespace-pre-wrap overflow-x-auto">
                      {fix.codeSnippet}
                    </pre>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500 flex items-center space-x-1">
                      <Link2 className="w-3 h-3" />
                      <span>Based on resolution from {fix.relatedTicket}</span>
                    </span>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setFeedbackGiven({ ...feedbackGiven, [fix.priority]: true })}
                        className={`p-1.5 rounded transition-colors ${
                          feedbackGiven[fix.priority] ? 'bg-green-100 text-green-600' : 'text-gray-400 hover:bg-gray-100'
                        }`}
                      >
                        <ThumbsUp className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 rounded text-gray-400 hover:bg-gray-100 transition-colors">
                        <ThumbsDown className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Test Recommendations */}
        <div className="mt-4 bg-blue-50 rounded-lg p-4 border border-blue-200">
          <h4 className="font-semibold text-blue-800 mb-2 flex items-center space-x-2">
            <Shield className="w-4 h-4" />
            <span>Verification Test Plan</span>
          </h4>
          <div className="space-y-1">
            {aiRecommendation.testRecommendations.map((test, i) => (
              <div key={i} className="flex items-center space-x-2 text-sm text-blue-700">
                <CheckCircle className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <span>{test}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RAG Knowledge Sources */}
      <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
        <div className="flex items-center space-x-2 mb-3">
          <BookOpen className="w-4 h-4 text-gray-600" />
          <span className="text-sm font-medium text-gray-700">RAG Knowledge Sources Used</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {['JIRA Defect History (12,847 tickets)', 'Resolution Wiki (2,340 articles)', 'Git Commit Messages (45K)', 'Stack Traces DB (8,200)', 'Post-Mortem Reports (156)'].map(source => (
            <span key={source} className="text-xs bg-white border border-gray-200 rounded-full px-3 py-1 text-gray-600">
              {source}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}