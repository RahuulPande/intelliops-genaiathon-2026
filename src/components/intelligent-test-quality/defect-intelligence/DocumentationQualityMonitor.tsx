'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  AlertCircle, 
  TrendingUp, 
  Brain, 
  Lightbulb,
  User,
  Calendar,
  ExternalLink,
  MessageSquare,
  CheckCircle,
  XCircle,
  Send,
  FileEdit,
  AlertTriangle
} from 'lucide-react';
import { 
  mockDocumentationQualityIssues, 
  mockAILearningMetrics,
  getDocumentationIssuesBySeverity,
  calculatePotentialROIImprovement,
  type DocumentationQualityIssue,
  type QualityElement,
  type AISuggestion
} from '@/lib/mock-data/intelligentMonitoringData';

export default function DocumentationQualityMonitor() {
  const [selectedIssue, setSelectedIssue] = useState<string | null>(null);
  const issues = mockDocumentationQualityIssues;
  const learningMetrics = mockAILearningMetrics;
  const issuesBySeverity = getDocumentationIssuesBySeverity(issues);
  const roiImprovement = calculatePotentialROIImprovement(learningMetrics);

  const handleRequestDetailedUpdate = (defectId: string) => {
    alert(`Detailed update request sent for ${defectId}`);
  };

  const handleGenerateDocTemplate = (defectId: string) => {
    alert(`Documentation template generated for ${defectId}`);
  };

  const handleEscalateToManager = (defectId: string) => {
    alert(`Issue escalated to manager for ${defectId}`);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Critical': return 'text-red-600 bg-red-50 border-red-200';
      case 'High': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'Medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      default: return 'text-blue-600 bg-blue-50 border-blue-200';
    }
  };

  const getQualityScoreColor = (score: number) => {
    if (score <= 3) return 'text-red-600 bg-red-100';
    if (score <= 6) return 'text-orange-600 bg-orange-100';
    if (score <= 8) return 'text-yellow-600 bg-yellow-100';
    return 'text-green-600 bg-green-100';
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-6 text-white">
        <div className="flex items-center space-x-3 mb-4">
          <div className="bg-white/20 p-2 rounded-full">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Documentation Quality Analysis</h2>
            <p className="text-indigo-100">AI analyzes defect documentation to ensure future pattern matching accuracy</p>
          </div>
        </div>
        
        {/* Quality Score and Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white/10 rounded-lg p-4">
            <div className="text-3xl font-bold">{learningMetrics.averageQualityScore.toFixed(1)}</div>
            <div className="text-indigo-100">Avg Quality Score</div>
            <div className="text-xs text-indigo-200">↗ {learningMetrics.monthlyImprovementTrend}</div>
          </div>
          <div className="bg-white/10 rounded-lg p-4">
            <div className="text-3xl font-bold">{learningMetrics.aiMatchingAccuracy}%</div>
            <div className="text-indigo-100">Current AI Accuracy</div>
            <div className="text-xs text-indigo-200">Target: {learningMetrics.potentialAccuracy}%</div>
          </div>
          <div className="bg-white/10 rounded-lg p-4">
            <div className="text-3xl font-bold">{issuesBySeverity.critical + issuesBySeverity.high}</div>
            <div className="text-indigo-100">Issues This Week</div>
            <div className="text-xs text-indigo-200">Need immediate attention</div>
          </div>
          <div className="bg-white/10 rounded-lg p-4">
            <div className="text-3xl font-bold">{Math.round(roiImprovement.annualSavings)}h</div>
            <div className="text-indigo-100">Potential Annual Savings</div>
            <div className="text-xs text-indigo-200">Through better documentation</div>
          </div>
        </div>
      </div>

      {/* AI Insights Panel */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-6"
      >
        <div className="flex items-center space-x-3 mb-4">
          <Brain className="w-6 h-6 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">AI Learning Impact Analysis</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white mb-3">Documentation Quality Distribution</h4>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">Well Documented</span>
                <span className="text-sm font-medium text-green-600">{learningMetrics.wellDocumented} defects</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">Needs Improvement</span>
                <span className="text-sm font-medium text-orange-600">{learningMetrics.needsImprovement} defects</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">Critically Poor</span>
                <span className="text-sm font-medium text-red-600">{learningMetrics.criticallyPoor} defects</span>
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white mb-3">AI Learning Potential</h4>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">Current Accuracy</span>
                <span className="text-sm font-medium text-blue-600">{learningMetrics.aiMatchingAccuracy}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">Potential Accuracy</span>
                <span className="text-sm font-medium text-green-600">{learningMetrics.potentialAccuracy}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">Improvement Opportunity</span>
                <span className="text-sm font-medium text-purple-600">+{roiImprovement.accuracyImprovement.toFixed(1)}%</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Critical Issues Section */}
      <div className="bg-white dark:bg-[#1A1A1A] rounded-lg shadow-sm dark:shadow-none border border-gray-200 dark:border-gray-800">
        <div className="p-6 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <AlertCircle className="w-6 h-6 text-red-500" />
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Defects Closed Without Proper Documentation
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {issuesBySeverity.critical + issuesBySeverity.high} cases this week - Severely impacts AI learning capability
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-red-600">{issuesBySeverity.critical + issuesBySeverity.high}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Critical + High severity</div>
            </div>
          </div>
        </div>

        <div className="divide-y divide-gray-200 dark:divide-gray-800">
          {issues.map((issue, index) => (
            <motion.div
              key={issue.defectId}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-6"
            >
              {/* Issue Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="font-mono text-sm bg-gray-100 dark:bg-[#242424] px-2 py-1 rounded">
                      {issue.defectId}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getSeverityColor(issue.severity)}`}>
                      {issue.severity} Severity
                    </span>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getQualityScoreColor(issue.qualityScore)}`}>
                      Quality: {issue.qualityScore}/10
                    </span>
                  </div>
                  <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">{issue.defectTitle}</h4>
                  <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center space-x-1">
                      <User className="w-4 h-4" />
                      <span>Closed by: {issue.closedBy}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(issue.closedDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Current Documentation */}
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900 rounded-lg p-4 mb-4">
                <h5 className="font-medium text-red-800 dark:text-red-200 mb-2 flex items-center">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Current Documentation:
                </h5>
                <p className="text-red-700 dark:text-red-200 text-sm italic">"{issue.currentDocumentation}"</p>
              </div>

              {/* Quality Issues */}
              <div className="mb-4">
                <h5 className="font-medium text-gray-900 dark:text-white mb-3 flex items-center">
                  <XCircle className="w-4 h-4 text-red-500 mr-2" />
                  Missing Elements:
                </h5>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {issue.missingElements.map((element, elemIndex) => (
                    <div
                      key={elemIndex}
                      className="border border-gray-200 dark:border-gray-700 rounded-lg p-3"
                    >
                      <div className="flex items-center space-x-2 mb-2">
                        <span className={`w-2 h-2 rounded-full ${
                          element.importance === 'Critical' ? 'bg-red-500' :
                          element.importance === 'High' ? 'bg-orange-500' :
                          element.importance === 'Medium' ? 'bg-yellow-500' : 'bg-blue-500'
                        }`}></span>
                        <span className="font-medium text-sm text-gray-900 dark:text-white">{element.element}</span>
                      </div>
                      <p className="text-xs text-gray-600 dark:text-gray-400">{element.impact}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* AI Suggestions */}
              <div className="mb-4">
                <h5 className="font-medium text-gray-900 dark:text-white mb-3 flex items-center">
                  <Lightbulb className="w-4 h-4 text-yellow-500 mr-2" />
                  AI Enhancement Suggestions:
                </h5>
                <div className="space-y-2">
                  {issue.aiSuggestions.map((suggestion, suggIndex) => (
                    <div
                      key={suggIndex}
                      className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-900 rounded-lg p-3"
                    >
                      <div className="flex items-start space-x-3">
                        <Brain className="w-4 h-4 text-blue-600 mt-0.5" />
                        <div className="flex-1">
                          <div className="font-medium text-blue-800 dark:text-blue-200 text-sm mb-1">{suggestion.category}:</div>
                          <p className="text-blue-700 dark:text-blue-200 text-sm mb-2">{suggestion.suggestion}</p>
                          <div className="text-xs text-blue-600 dark:text-blue-300 font-medium">{suggestion.potentialImpact}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Smart Actions */}
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => handleRequestDetailedUpdate(issue.defectId)}
                  className="flex items-center space-x-1 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors"
                >
                  <Send className="w-4 h-4" />
                  <span>Request Detailed Update</span>
                </button>
                <button
                  onClick={() => handleGenerateDocTemplate(issue.defectId)}
                  className="flex items-center space-x-1 bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700 transition-colors"
                >
                  <FileEdit className="w-4 h-4" />
                  <span>Generate Documentation Template</span>
                </button>
                <button
                  onClick={() => handleEscalateToManager(issue.defectId)}
                  className="flex items-center space-x-1 bg-red-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-700 transition-colors"
                >
                  <AlertTriangle className="w-4 h-4" />
                  <span>Escalate to Manager</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Learning Enhancement Suggestions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-6"
      >
        <div className="flex items-center space-x-3 mb-4">
          <Lightbulb className="w-6 h-6 text-green-600" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">AI Learning Enhancement Opportunities</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white mb-3">Quick Wins</h4>
            <div className="space-y-3">
              <div className="bg-white dark:bg-[#242424] rounded-lg p-3 border border-green-200 dark:border-green-900">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs bg-gray-100 dark:bg-[#141414] px-2 py-1 rounded">DEF-2845</span>
                  <span className="text-xs text-green-600 font-medium">+15% matching accuracy</span>
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300">Add specific error codes and stack traces to generic error documentation</p>
              </div>
              <div className="bg-white dark:bg-[#242424] rounded-lg p-3 border border-green-200 dark:border-green-900">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs bg-gray-100 dark:bg-[#141414] px-2 py-1 rounded">DEF-2846</span>
                  <span className="text-xs text-green-600 font-medium">+25% performance detection</span>
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300">Include response times and resource usage data for performance issues</p>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white mb-3">Impact Projection</h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">Time Savings per Defect</span>
                <span className="font-medium text-green-600">+{roiImprovement.timeSavingsPerDefect.toFixed(1)} hours</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">Monthly Savings</span>
                <span className="font-medium text-green-600">{Math.round(roiImprovement.monthlySavings)} hours</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">Annual Value</span>
                <span className="font-medium text-green-600">{Math.round(roiImprovement.annualSavings)} hours</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}