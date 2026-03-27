'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  AlertTriangle, 
  Clock, 
  TestTube, 
  Mail, 
  Calendar, 
  Flag,
  User,
  CheckCircle,
  XCircle,
  PlayCircle,
  Timer
} from 'lucide-react';
import { 
  mockTestReexecutionGaps, 
  getTestGapsByPriority,
  type TestReexecutionGap,
  type TestCase
} from '@/lib/mock-data/intelligentMonitoringData';

export default function TestReexecutionMonitor() {
  const [selectedDefect, setSelectedDefect] = useState<string | null>(null);
  const gaps = mockTestReexecutionGaps;
  const gapsByPriority = getTestGapsByPriority(gaps);

  const handleNotifyTester = (testCase: TestCase) => {
    // Mock notification action
    alert(`Notification sent to ${testCase.assignee} for test case ${testCase.testId}`);
  };

  const handleScheduleExecution = (testCase: TestCase) => {
    // Mock scheduling action
    alert(`Test execution scheduled for ${testCase.testId}`);
  };

  const handleMarkHighPriority = (defectId: string) => {
    // Mock priority escalation
    alert(`Defect ${defectId} marked as high priority`);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Critical': return 'text-red-600 bg-red-50 border-red-200';
      case 'High': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'Medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      default: return 'text-blue-600 bg-blue-50 border-blue-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Not Re-executed': return 'text-red-600 bg-red-100';
      case 'Scheduled': return 'text-blue-600 bg-blue-100';
      case 'In Progress': return 'text-yellow-600 bg-yellow-100';
      case 'Completed': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-xl p-6 text-white">
        <div className="flex items-center space-x-3 mb-4">
          <div className="bg-white/20 p-2 rounded-full">
            <TestTube className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Test Re-execution Gap Detection</h2>
            <p className="text-orange-100">AI-powered detection of incomplete test cycles after defect fixes</p>
          </div>
        </div>
        
        {/* Health Score */}
        <div className="bg-white/10 rounded-lg p-4 mb-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold">87%</div>
              <div className="text-orange-100">Test Coverage Health</div>
            </div>
            <div className="text-right">
              <div className="text-sm text-orange-200">Target: 95%</div>
              <div className="text-xs text-orange-300">↗ +3% this week</div>
            </div>
          </div>
        </div>
      </div>

      {/* Alerts Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-red-50 border border-red-200 rounded-lg p-6"
        >
          <div className="flex items-center space-x-3 mb-3">
            <AlertTriangle className="w-6 h-6 text-red-600" />
            <div>
              <div className="text-2xl font-bold text-red-600">{gapsByPriority.critical + gapsByPriority.high}</div>
              <div className="text-red-700 font-medium">Tests Awaiting Re-execution</div>
            </div>
          </div>
          <p className="text-red-600 text-sm mb-3">Fixed defects with related tests not re-run</p>
          <button className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-700 transition-colors">
            Review & Execute
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-orange-50 border border-orange-200 rounded-lg p-6"
        >
          <div className="flex items-center space-x-3 mb-3">
            <Clock className="w-6 h-6 text-orange-600" />
            <div>
              <div className="text-2xl font-bold text-orange-600">23</div>
              <div className="text-orange-700 font-medium">Test Cases Affected</div>
            </div>
          </div>
          <p className="text-orange-600 text-sm mb-3">Total test cases requiring re-execution</p>
          <button className="bg-orange-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-orange-700 transition-colors">
            View Details
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-blue-50 border border-blue-200 rounded-lg p-6"
        >
          <div className="flex items-center space-x-3 mb-3">
            <Flag className="w-6 h-6 text-blue-600" />
            <div>
              <div className="text-2xl font-bold text-blue-600">8</div>
              <div className="text-blue-700 font-medium">Critical User Journeys</div>
            </div>
          </div>
          <p className="text-blue-600 text-sm mb-3">High-impact user flows at risk</p>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors">
            Prioritize
          </button>
        </motion.div>
      </div>

      {/* Defect-Test Mapping List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <AlertTriangle className="w-5 h-5 text-orange-500 mr-2" />
            Tests Awaiting Re-execution
          </h3>
          <p className="text-gray-600 text-sm mt-1">
            {gaps.length} fixed defects have related test cases that haven't been re-executed
          </p>
        </div>

        <div className="divide-y divide-gray-200">
          {gaps.map((gap, index) => (
            <motion.div
              key={gap.defectId}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-6"
            >
              {/* Defect Information */}
              <div className="mb-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">
                        {gap.defectId}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(gap.riskLevel)}`}>
                        {gap.riskLevel} Risk
                      </span>
                      <span className="text-xs text-gray-500">
                        Fixed {gap.daysSinceFixed} days ago
                      </span>
                    </div>
                    <h4 className="text-lg font-medium text-gray-900 mb-1">
                      {gap.defectTitle}
                    </h4>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <User className="w-4 h-4" />
                        <span>Fixed by: {gap.fixedBy}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(gap.fixedDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
                  <div className="flex items-center space-x-2">
                    <Flag className="w-4 h-4 text-yellow-600" />
                    <span className="text-sm font-medium text-yellow-800">Business Impact:</span>
                    <span className="text-sm text-yellow-700">{gap.businessImpact}</span>
                  </div>
                </div>
              </div>

              {/* Related Test Cases */}
              <div className="space-y-3">
                <h5 className="font-medium text-gray-900 flex items-center">
                  <TestTube className="w-4 h-4 mr-2" />
                  Related Test Cases ({gap.relatedTests.length})
                </h5>
                
                {gap.relatedTests.map((testCase) => (
                  <div
                    key={testCase.testId}
                    className="bg-gray-50 rounded-lg p-4 border border-gray-200"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <span className="font-mono text-sm bg-white px-2 py-1 rounded border">
                            {testCase.testId}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(testCase.priority)}`}>
                            {testCase.priority}
                          </span>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(testCase.status)}`}>
                            {testCase.status}
                          </span>
                        </div>
                        <h6 className="font-medium text-gray-900 mb-2">{testCase.testName}</h6>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>Last executed: {new Date(testCase.lastExecuted).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <User className="w-4 h-4" />
                            <span>Assignee: {testCase.assignee}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Timer className="w-4 h-4" />
                            <span>Duration: {testCase.estimatedDuration}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Smart Actions */}
                    <div className="flex flex-wrap gap-2 mt-4">
                      <button
                        onClick={() => handleNotifyTester(testCase)}
                        className="flex items-center space-x-1 bg-blue-600 text-white px-3 py-1.5 rounded text-sm hover:bg-blue-700 transition-colors"
                      >
                        <Mail className="w-4 h-4" />
                        <span>Notify Tester</span>
                      </button>
                      <button
                        onClick={() => handleScheduleExecution(testCase)}
                        className="flex items-center space-x-1 bg-green-600 text-white px-3 py-1.5 rounded text-sm hover:bg-green-700 transition-colors"
                      >
                        <Calendar className="w-4 h-4" />
                        <span>Schedule Re-execution</span>
                      </button>
                      {testCase.priority !== 'Critical' && (
                        <button
                          onClick={() => handleMarkHighPriority(gap.defectId)}
                          className="flex items-center space-x-1 bg-red-600 text-white px-3 py-1.5 rounded text-sm hover:bg-red-700 transition-colors"
                        >
                          <Flag className="w-4 h-4" />
                          <span>Mark High Priority</span>
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Summary Statistics */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 border border-blue-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Re-execution Health Summary</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">{gapsByPriority.critical}</div>
            <div className="text-sm text-gray-600">Critical Risk</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">{gapsByPriority.high}</div>
            <div className="text-sm text-gray-600">High Risk</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-600">{gapsByPriority.medium}</div>
            <div className="text-sm text-gray-600">Medium Risk</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {Math.round((23 - gaps.length * 2.3) / 23 * 100)}%
            </div>
            <div className="text-sm text-gray-600">Coverage Health</div>
          </div>
        </div>
      </div>
    </div>
  );
}