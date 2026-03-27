'use client';

import { motion } from 'framer-motion';
import { 
  Network, 
  GitBranch, 
  AlertTriangle, 
  Clock, 
  Zap,
  Shield,
  ArrowRight,
  CircuitBoard,
  Activity
} from 'lucide-react';

export default function SystemDependenciesSection() {
  const criticalPathData = [
    {
      service: 'Payment Gateway',
      dependencies: ['User Authentication', 'Transaction Database', 'External Payment API'],
      failureImpact: 'High',
      avgResponseTime: '245ms',
      uptime: '99.2%',
      criticalityScore: 9.2,
      recentIncidents: 3,
      cascadeRisk: 'High'
    },
    {
      service: 'User Authentication',
      dependencies: ['User Database', 'Session Store', 'LDAP Server'],
      failureImpact: 'Critical',
      avgResponseTime: '89ms',
      uptime: '99.8%',
      criticalityScore: 9.8,
      recentIncidents: 1,
      cascadeRisk: 'Very High'
    },
    {
      service: 'Reporting Engine',
      dependencies: ['Data Warehouse', 'Cache Layer', 'File Storage'],
      failureImpact: 'Medium',
      avgResponseTime: '1.2s',
      uptime: '99.5%',
      criticalityScore: 6.4,
      recentIncidents: 0,
      cascadeRisk: 'Low'
    }
  ];

  const correlationAnalysis = [
    {
      primaryService: 'Payment Gateway',
      correlatedFailures: [
        { service: 'User Authentication', correlation: 0.87, description: 'Auth timeout causes payment failures' },
        { service: 'Transaction Database', correlation: 0.92, description: 'DB slowness impacts payment processing' },
        { service: 'External Payment API', correlation: 0.45, description: 'API downtime affects transaction completion' }
      ]
    },
    {
      primaryService: 'User Authentication', 
      correlatedFailures: [
        { service: 'Session Store', correlation: 0.78, description: 'Redis issues cause session validation failures' },
        { service: 'LDAP Server', correlation: 0.65, description: 'LDAP downtime affects login verification' },
        { service: 'Web Application', correlation: 0.83, description: 'Auth failures cascade to web app errors' }
      ]
    }
  ];

  const riskAssessment = [
    {
      riskType: 'Single Point of Failure',
      service: 'User Authentication',
      impact: 'Critical',
      likelihood: 'Medium',
      mitigation: 'Implement authentication service clustering and failover',
      timeToImplement: '2-3 sprints'
    },
    {
      riskType: 'Cascade Failure',
      service: 'Payment Gateway → Transaction Database',
      impact: 'High',
      likelihood: 'High',
      mitigation: 'Implement database connection pooling and circuit breakers',
      timeToImplement: '1 sprint'
    },
    {
      riskType: 'External Dependency',
      service: 'External Payment API',
      impact: 'High',
      likelihood: 'Medium',
      mitigation: 'Implement fallback payment providers and graceful degradation',
      timeToImplement: '4-6 sprints'
    }
  ];

  const getCriticalityColor = (score: number) => {
    if (score >= 9) return 'text-red-600 bg-red-100';
    if (score >= 7) return 'text-yellow-600 bg-yellow-100';
    return 'text-green-600 bg-green-100';
  };

  const getFailureImpactColor = (impact: string) => {
    switch (impact) {
      case 'Critical': return 'text-red-600 bg-red-100';
      case 'High': return 'text-orange-600 bg-orange-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-green-600 bg-green-100';
    }
  };

  const getRiskColor = (likelihood: string, impact: string) => {
    if ((likelihood === 'High' && impact === 'Critical') || (likelihood === 'Critical' && impact === 'High')) {
      return 'text-red-700 bg-red-100 border-red-300';
    }
    if ((likelihood === 'Medium' && impact === 'Critical') || (likelihood === 'High' && impact === 'High')) {
      return 'text-orange-700 bg-orange-100 border-orange-300';
    }
    return 'text-yellow-700 bg-yellow-100 border-yellow-300';
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
        <Network className="w-16 h-16 text-purple-600 mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-gray-900 mb-4">System Dependencies</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Service interactions and dependency mapping based on failure correlation analysis
        </p>
      </motion.div>

      {/* Critical Path Analysis */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="mb-12"
      >
        <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <Activity className="w-6 h-6 text-purple-600 mr-3" />
          Critical Path Analysis
        </h3>
        <div className="grid gap-6">
          {criticalPathData.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              className="bg-white rounded-xl shadow-lg border border-gray-200 p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-xl font-bold text-gray-900">{service.service}</h4>
                <div className="flex items-center space-x-3">
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${getCriticalityColor(service.criticalityScore)}`}>
                    Criticality: {service.criticalityScore}/10
                  </div>
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${getFailureImpactColor(service.failureImpact)}`}>
                    {service.failureImpact} Impact
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{service.avgResponseTime}</div>
                  <div className="text-sm text-gray-500">Avg Response</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{service.uptime}</div>
                  <div className="text-sm text-gray-500">Uptime</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{service.dependencies.length}</div>
                  <div className="text-sm text-gray-500">Dependencies</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">{service.recentIncidents}</div>
                  <div className="text-sm text-gray-500">Recent Incidents</div>
                </div>
                <div className="text-center">
                  <div className={`text-2xl font-bold ${
                    service.cascadeRisk === 'Very High' ? 'text-red-600' :
                    service.cascadeRisk === 'High' ? 'text-orange-600' :
                    'text-yellow-600'
                  }`}>
                    {service.cascadeRisk}
                  </div>
                  <div className="text-sm text-gray-500">Cascade Risk</div>
                </div>
              </div>
              
              <div>
                <h5 className="font-semibold text-gray-900 mb-2">Dependencies:</h5>
                <div className="flex flex-wrap gap-2">
                  {service.dependencies.map((dep, depIndex) => (
                    <span key={depIndex} className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
                      {dep}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Failure Correlation Analysis */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mb-12"
      >
        <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <GitBranch className="w-6 h-6 text-orange-600 mr-3" />
          Failure Correlation Analysis
        </h3>
        <div className="grid gap-6">
          {correlationAnalysis.map((analysis, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
              className="bg-white rounded-xl shadow-lg border border-gray-200 p-6"
            >
              <h4 className="text-lg font-bold text-gray-900 mb-4">
                {analysis.primaryService} Correlations
              </h4>
              <div className="space-y-3">
                {analysis.correlatedFailures.map((correlation, corrIndex) => (
                  <div key={corrIndex} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">{correlation.service}</div>
                      <div className="text-sm text-gray-600">{correlation.description}</div>
                    </div>
                    <div className="text-right">
                      <div className={`text-lg font-bold ${
                        correlation.correlation >= 0.8 ? 'text-red-600' :
                        correlation.correlation >= 0.6 ? 'text-orange-600' :
                        'text-yellow-600'
                      }`}>
                        {(correlation.correlation * 100).toFixed(0)}%
                      </div>
                      <div className="text-xs text-gray-500">Correlation</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Risk Assessment & Mitigation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="mb-12"
      >
        <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <Shield className="w-6 h-6 text-red-600 mr-3" />
          Risk Assessment & Mitigation Strategies
        </h3>
        <div className="grid gap-6">
          {riskAssessment.map((risk, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
              className={`rounded-xl shadow-lg border-2 p-6 ${getRiskColor(risk.likelihood, risk.impact)}`}
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="text-lg font-bold">{risk.riskType}</h4>
                  <p className="font-medium">{risk.service}</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-sm">Impact:</span>
                    <span className="font-bold">{risk.impact}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm">Likelihood:</span>
                    <span className="font-bold">{risk.likelihood}</span>
                  </div>
                </div>
              </div>
              <div className="mb-4">
                <h5 className="font-semibold mb-2">Mitigation Strategy:</h5>
                <p className="text-sm">{risk.mitigation}</p>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span className="text-sm font-medium">Implementation Time: {risk.timeToImplement}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Action Plan */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.7 }}
        className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-white"
      >
        <h3 className="text-2xl font-bold mb-4 flex items-center">
          <Zap className="w-6 h-6 mr-3" />
          Dependency Resilience Action Plan
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold mb-3">Immediate Actions (Next Sprint)</h4>
            <ul className="space-y-2 text-purple-100">
              <li>• Implement circuit breakers for high-risk dependencies</li>
              <li>• Add timeout configuration for all external calls</li>
              <li>• Create dependency health monitoring dashboards</li>
              <li>• Establish failure correlation alerting rules</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Strategic Improvements (Next Quarter)</h4>
            <ul className="space-y-2 text-purple-100">
              <li>• Implement service mesh for dependency management</li>
              <li>• Create automated dependency mapping tools</li>
              <li>• Establish chaos engineering practices</li>
              <li>• Build comprehensive failure recovery procedures</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );
}