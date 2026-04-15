'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Shield, Target, TrendingDown, CheckCircle, XCircle } from 'lucide-react';

export default function RiskAssessment() {
  const [selectedRiskLevel, setSelectedRiskLevel] = useState('all');

  const riskItems = [
    {
      id: 'RISK-001',
      title: 'Performance Degradation in Admin Module',
      description: 'Response times increased by 200% in admin functions',
      severity: 'critical',
      probability: 85,
      impact: 'high',
      module: 'Admin',
      status: 'active',
      mitigationPlan: 'Optimize database queries and implement caching',
      owner: 'Backend Team'
    },
    {
      id: 'RISK-002', 
      title: 'Test Coverage Gap in Payment Processing',
      description: 'Critical payment flows lack adequate test coverage',
      severity: 'high',
      probability: 70,
      impact: 'critical',
      module: 'Payments',
      status: 'mitigating',
      mitigationPlan: 'Add integration tests for payment flows',
      owner: 'QA Team'
    }
  ];

  const riskMetrics = {
    totalRisks: 12,
    criticalRisks: 1,
    highRisks: 3,
    mediumRisks: 5,
    lowRisks: 3,
    riskScore: 34.2,
    trendsDirection: 'down'
  };

  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-red-50 rounded-lg border border-red-200 p-4">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5 text-red-600" />
            <div>
              <div className="text-2xl font-bold text-red-600">{riskMetrics.criticalRisks}</div>
              <div className="text-sm text-red-700">Critical Risks</div>
            </div>
          </div>
        </div>
        
        <div className="bg-orange-50 rounded-lg border border-orange-200 p-4">
          <div className="flex items-center space-x-2">
            <Target className="w-5 h-5 text-orange-600" />
            <div>
              <div className="text-2xl font-bold text-orange-600">{riskMetrics.highRisks}</div>
              <div className="text-sm text-orange-700">High Risks</div>
            </div>
          </div>
        </div>
        
        <div className="bg-blue-50 rounded-lg border border-blue-200 p-4">
          <div className="flex items-center space-x-2">
            <Shield className="w-5 h-5 text-blue-600" />
            <div>
              <div className="text-2xl font-bold text-blue-600">{riskMetrics.riskScore}</div>
              <div className="text-sm text-blue-700">Risk Score</div>
            </div>
          </div>
        </div>
        
        <div className="bg-green-50 rounded-lg border border-green-200 p-4">
          <div className="flex items-center space-x-2">
            <TrendingDown className="w-5 h-5 text-green-600" />
            <div>
              <div className="text-lg font-bold text-green-600">Improving</div>
              <div className="text-sm text-green-700">Trend</div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-[#1A1A1A] rounded-lg border border-gray-200 dark:border-gray-800 p-6">
        <h3 className="text-lg font-semibold mb-4">Active Risk Items</h3>
        <div className="space-y-4">
          {riskItems.map((risk) => (
            <motion.div
              key={risk.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="border rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      risk.severity === 'critical' ? 'bg-red-100 text-red-800' :
                      risk.severity === 'high' ? 'bg-orange-100 text-orange-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {risk.severity.toUpperCase()}
                    </span>
                    <span className="font-medium">{risk.title}</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{risk.description}</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Module:</span>
                      <span className="ml-1 font-medium">{risk.module}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Probability:</span>
                      <span className="ml-1 font-medium">{risk.probability}%</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Impact:</span>
                      <span className="ml-1 font-medium">{risk.impact}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Owner:</span>
                      <span className="ml-1 font-medium">{risk.owner}</span>
                    </div>
                  </div>
                  <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                    <div className="text-sm">
                      <span className="font-medium">Mitigation Plan:</span>
                      <span className="ml-1">{risk.mitigationPlan}</span>
                    </div>
                  </div>
                </div>
                <div className="ml-4">
                  {risk.status === 'active' ? (
                    <AlertTriangle className="w-6 h-6 text-red-500" />
                  ) : risk.status === 'mitigating' ? (
                    <CheckCircle className="w-6 h-6 text-yellow-500" />
                  ) : (
                    <CheckCircle className="w-6 h-6 text-green-500" />
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}