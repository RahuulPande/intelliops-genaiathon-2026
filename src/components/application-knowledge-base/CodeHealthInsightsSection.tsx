'use client';

import { motion } from 'framer-motion';
import { 
  Code, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  Bug, 
  Shield, 
  Zap,
  Target,
  FileText,
  BarChart3,
  ArrowUp,
  ArrowDown,
  Minus
} from 'lucide-react';

export default function CodeHealthInsightsSection() {
  const overallMetrics = [
    {
      title: 'Overall Code Health Score',
      value: '7.2/10',
      change: '+0.8',
      trend: 'up',
      description: 'Based on defect density, complexity, and maintainability'
    },
    {
      title: 'Technical Debt Ratio',
      value: '23%',
      change: '-5%',
      trend: 'down',
      description: 'Time to fix technical debt vs. feature development'
    },
    {
      title: 'Test Coverage',
      value: '78%',
      change: '+12%',
      trend: 'up',
      description: 'Unit and integration test coverage across modules'
    },
    {
      title: 'Code Duplication',
      value: '8.4%',
      change: '-2.1%',
      trend: 'down',
      description: 'Percentage of duplicated code blocks'
    }
  ];

  const moduleHealthData = [
    {
      module: 'Payment Gateway',
      healthScore: 6.2,
      defectDensity: '0.8 defects/KLOC',
      complexity: 'High',
      maintainability: 'Medium',
      techDebt: '34%',
      testCoverage: '65%',
      hotspotFiles: [
        { file: 'PaymentProcessor.java', defects: 23, lines: 1847 },
        { file: 'TransactionValidator.java', defects: 12, lines: 923 },
        { file: 'PaymentGatewayService.java', defects: 8, lines: 1245 }
      ],
      recommendations: [
        'Refactor PaymentProcessor.java - split into smaller classes',
        'Increase test coverage for transaction validation logic',
        'Implement circuit breaker pattern for external payment APIs',
        'Add comprehensive error handling for timeout scenarios'
      ],
      priority: 'High',
      estimatedEffort: '3-4 sprints'
    },
    {
      module: 'User Authentication',
      healthScore: 7.8,
      defectDensity: '0.4 defects/KLOC',
      complexity: 'Medium',
      maintainability: 'High',
      techDebt: '18%',
      testCoverage: '87%',
      hotspotFiles: [
        { file: 'AuthenticationService.java', defects: 8, lines: 1156 },
        { file: 'TokenManager.java', defects: 6, lines: 734 },
        { file: 'SessionValidator.java', defects: 4, lines: 489 }
      ],
      recommendations: [
        'Optimize token validation performance',
        'Add comprehensive logging for security events',
        'Implement rate limiting for login attempts',
        'Update to latest OAuth 2.1 specification'
      ],
      priority: 'Medium',
      estimatedEffort: '1-2 sprints'
    },
    {
      module: 'Reporting Engine',
      healthScore: 8.9,
      defectDensity: '0.2 defects/KLOC',
      complexity: 'Low',
      maintainability: 'High',
      techDebt: '12%',
      testCoverage: '94%',
      hotspotFiles: [
        { file: 'ReportGenerator.java', defects: 3, lines: 892 },
        { file: 'DataAggregator.java', defects: 2, lines: 567 },
        { file: 'ExportService.java', defects: 1, lines: 445 }
      ],
      recommendations: [
        'Optimize large report generation performance',
        'Add caching for frequently requested reports',
        'Implement progressive report loading for large datasets'
      ],
      priority: 'Low',
      estimatedEffort: '0.5-1 sprint'
    }
  ];

  const qualityTrends = [
    {
      metric: 'Defect Introduction Rate',
      current: '2.3 defects/week',
      previous: '3.7 defects/week',
      trend: 'down',
      improvement: '38% reduction'
    },
    {
      metric: 'Code Review Coverage',
      current: '94%',
      previous: '87%',
      trend: 'up',
      improvement: '7% increase'
    },
    {
      metric: 'Time to Fix Critical Issues',
      current: '4.2 hours',
      previous: '6.8 hours',
      trend: 'down',
      improvement: '38% faster'
    },
    {
      metric: 'Automated Test Execution',
      current: '98.7%',
      previous: '94.1%',
      trend: 'up',
      improvement: '4.6% increase'
    }
  ];

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <ArrowUp className="w-4 h-4 text-green-500" />;
      case 'down': return <ArrowDown className="w-4 h-4 text-red-500" />;
      default: return <Minus className="w-4 h-4 text-gray-500" />;
    }
  };

  const getTrendColor = (trend: string, isPositive: boolean = true) => {
    if (trend === 'up') {
      return isPositive ? 'text-green-600' : 'text-red-600';
    } else if (trend === 'down') {
      return isPositive ? 'text-red-600' : 'text-green-600';
    }
    return 'text-gray-600';
  };

  const getHealthScoreColor = (score: number) => {
    if (score >= 8) return 'text-green-600 bg-green-100';
    if (score >= 6) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <Code className="w-16 h-16 text-blue-600 mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Code Health Insights</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Quality metrics and improvement recommendations based on defect analysis and code patterns
        </p>
      </motion.div>

      {/* Overall Metrics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
      >
        {overallMetrics.map((metric, index) => (
          <div key={index} className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-500">{metric.title}</h3>
              {getTrendIcon(metric.trend)}
            </div>
            <div className="flex items-baseline space-x-2 mb-2">
              <span className="text-3xl font-bold text-gray-900">{metric.value}</span>
              <span className={`text-sm font-medium ${getTrendColor(metric.trend, metric.title !== 'Technical Debt Ratio' && metric.title !== 'Code Duplication')}`}>
                {metric.change}
              </span>
            </div>
            <p className="text-xs text-gray-500">{metric.description}</p>
          </div>
        ))}
      </motion.div>

      {/* Module Health Analysis */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mb-12"
      >
        <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <BarChart3 className="w-6 h-6 text-blue-600 mr-3" />
          Module Health Analysis
        </h3>
        <div className="grid gap-8">
          {moduleHealthData.map((module, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden"
            >
              {/* Module Header */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xl font-bold">{module.module}</h4>
                    <p className="text-blue-100 mt-1">Defect Density: {module.defectDensity}</p>
                  </div>
                  <div className="text-right">
                    <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold ${getHealthScoreColor(module.healthScore)}`}>
                      Health Score: {module.healthScore}/10
                    </div>
                    <div className={`mt-2 inline-block px-3 py-1 rounded-full text-xs font-medium ${
                      module.priority === 'High' ? 'bg-red-100 text-red-700' :
                      module.priority === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {module.priority} Priority
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6">
                {/* Quality Metrics */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">{module.complexity}</div>
                    <div className="text-sm text-gray-500">Complexity</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">{module.maintainability}</div>
                    <div className="text-sm text-gray-500">Maintainability</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">{module.techDebt}</div>
                    <div className="text-sm text-gray-500">Tech Debt</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">{module.testCoverage}</div>
                    <div className="text-sm text-gray-500">Test Coverage</div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Hotspot Files */}
                  <div>
                    <h5 className="font-semibold text-gray-900 mb-3 flex items-center">
                      <Bug className="w-4 h-4 text-red-500 mr-2" />
                      Hotspot Files
                    </h5>
                    <div className="space-y-2">
                      {module.hotspotFiles.map((file, fileIndex) => (
                        <div key={fileIndex} className="bg-gray-50 rounded-lg p-3">
                          <div className="font-medium text-gray-900">{file.file}</div>
                          <div className="text-sm text-gray-600">
                            {file.defects} defects • {file.lines} lines
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recommendations */}
                  <div>
                    <h5 className="font-semibold text-gray-900 mb-3 flex items-center">
                      <Target className="w-4 h-4 text-blue-500 mr-2" />
                      Recommendations
                    </h5>
                    <ul className="space-y-2">
                      {module.recommendations.map((rec, recIndex) => (
                        <li key={recIndex} className="flex items-start space-x-2 text-sm text-gray-600">
                          <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>{rec}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-4 text-sm text-blue-600 font-medium">
                      Estimated Effort: {module.estimatedEffort}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Quality Trends */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="mb-12"
      >
        <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <TrendingUp className="w-6 h-6 text-green-600 mr-3" />
          Quality Improvement Trends
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {qualityTrends.map((trend, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
              className="bg-white rounded-xl shadow-lg border border-gray-200 p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold text-gray-900">{trend.metric}</h4>
                {getTrendIcon(trend.trend)}
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Current:</span>
                  <span className="font-medium text-gray-900">{trend.current}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Previous:</span>
                  <span className="text-gray-600">{trend.previous}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Improvement:</span>
                  <span className="font-medium text-green-600">{trend.improvement}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Action Items */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.7 }}
        className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white"
      >
        <h3 className="text-2xl font-bold mb-4 flex items-center">
          <Zap className="w-6 h-6 mr-3" />
          Next Steps for Code Health Improvement
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold mb-3">Immediate Actions (This Sprint)</h4>
            <ul className="space-y-2 text-blue-100">
              <li>• Refactor PaymentProcessor.java into smaller components</li>
              <li>• Increase test coverage for critical payment flows</li>
              <li>• Implement circuit breaker for external APIs</li>
              <li>• Add comprehensive error handling patterns</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Strategic Improvements (Next Quarter)</h4>
            <ul className="space-y-2 text-blue-100">
              <li>• Establish automated code quality gates</li>
              <li>• Implement continuous technical debt monitoring</li>
              <li>• Create module ownership and quality SLAs</li>
              <li>• Develop code health scoring automation</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );
}