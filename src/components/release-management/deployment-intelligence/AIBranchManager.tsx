'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  GitBranch, 
  Brain, 
  AlertTriangle, 
  CheckCircle,
  XCircle,
  Clock,
  Users,
  Calendar,
  Target,
  DollarSign,
  GitMerge,
  Code,
  ArrowRight,
  ExternalLink,
  Bell,
  Shield,
  TrendingUp,
  Activity
} from 'lucide-react';

interface BranchFix {
  defectId: string;
  title: string;
  developer: string;
  appliedDate: string;
  appliedBranches: string[];
  missingBranches: string[];
  impact: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  aiRiskScore: number;
  estimatedCost: string;
  recommendation: string;
  prUrl?: string;
}

interface BranchIntelligence {
  branch: string;
  releaseName: string;
  releaseDate: string;
  totalFixes: number;
  missingFixes: number;
  healthScore: number;
  riskLevel: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  lastSync: string;
}

export default function AIBranchManager() {
  const [selectedBranch, setSelectedBranch] = useState<string>('all');
  const [showOnlyIssues, setShowOnlyIssues] = useState(false);

  // Mock data representing real branch intelligence
  const branchIntelligence: BranchIntelligence[] = [
    {
      branch: 'release/aug-2026',
      releaseName: 'August 2026 Release',
      releaseDate: '2026-08-15',
      totalFixes: 23,
      missingFixes: 0,
      healthScore: 98,
      riskLevel: 'LOW',
      lastSync: '2026-08-01T10:30:00Z'
    },
    {
      branch: 'release/oct-2026',
      releaseName: 'October 2026 Release',
      releaseDate: '2026-10-15',
      totalFixes: 18,
      missingFixes: 3,
      healthScore: 67,
      riskLevel: 'HIGH',
      lastSync: '2026-08-01T09:45:00Z'
    },
    {
      branch: 'release/dec-2026',
      releaseName: 'December 2026 Release',
      releaseDate: '2026-12-15',
      totalFixes: 12,
      missingFixes: 5,
      healthScore: 58,
      riskLevel: 'CRITICAL',
      lastSync: '2026-08-01T08:15:00Z'
    }
  ];

  // Critical missing fixes that could cause production issues
  const missingFixes: BranchFix[] = [
    {
      defectId: 'DEF-1234',
      title: 'Payment gateway timeout handling',
      developer: 'john.doe@company.com',
      appliedDate: '2026-08-01',
      appliedBranches: ['release/aug-2026'],
      missingBranches: ['release/oct-2026', 'release/dec-2026'],
      impact: 'CRITICAL',
      aiRiskScore: 94,
      estimatedCost: '$45,000',
      recommendation: 'Merge immediately - production critical payment flow',
      prUrl: 'https://github.com/company/repo/pull/1234'
    },
    {
      defectId: 'DEF-5678',
      title: 'User session expiry bug',
      developer: 'jane.smith@company.com',
      appliedDate: '2026-07-28',
      appliedBranches: ['release/aug-2026'],
      missingBranches: ['release/oct-2026', 'release/dec-2026'],
      impact: 'HIGH',
      aiRiskScore: 87,
      estimatedCost: '$25,000',
      recommendation: 'Merge before user acceptance testing begins',
      prUrl: 'https://github.com/company/repo/pull/5678'
    },
    {
      defectId: 'DEF-9012',
      title: 'Database connection pool leak',
      developer: 'robert.wilson@company.com',
      appliedDate: '2026-07-25',
      appliedBranches: ['release/aug-2026', 'release/oct-2026'],
      missingBranches: ['release/dec-2026'],
      impact: 'MEDIUM',
      aiRiskScore: 73,
      estimatedCost: '$15,000',
      recommendation: 'Schedule merge during next maintenance window',
      prUrl: 'https://github.com/company/repo/pull/9012'
    },
    {
      defectId: 'DEF-3456',
      title: 'Mobile app crash on Android 14',
      developer: 'sarah.brown@company.com',
      appliedDate: '2026-07-30',
      appliedBranches: ['release/aug-2026'],
      missingBranches: ['release/oct-2026', 'release/dec-2026'],
      impact: 'HIGH',
      aiRiskScore: 89,
      estimatedCost: '$35,000',
      recommendation: 'Critical for mobile users - merge with regression testing',
      prUrl: 'https://github.com/company/repo/pull/3456'
    },
    {
      defectId: 'DEF-7890',
      title: 'Email notification encoding issue',
      developer: 'mike.johnson@company.com',
      appliedDate: '2026-07-26',
      appliedBranches: ['release/aug-2026'],
      missingBranches: ['release/dec-2026'],
      impact: 'LOW',
      aiRiskScore: 45,
      estimatedCost: '$5,000',
      recommendation: 'Low priority - can be included in next regular merge cycle'
    }
  ];

  // AI Insights and Predictions
  const aiInsights = {
    totalRiskExposure: '$120,000',
    highestRiskBranch: 'release/dec-2026',
    recommendedAction: 'Immediate merge required for 3 critical fixes',
    predictedIssues: 7,
    confidenceLevel: 92,
    lastAnalysis: new Date().toISOString()
  };

  // Filter fixes based on selected branch
  const filteredFixes = useMemo(() => {
    let fixes = missingFixes;
    
    if (selectedBranch !== 'all') {
      fixes = fixes.filter(fix => fix.missingBranches.includes(selectedBranch));
    }
    
    if (showOnlyIssues) {
      fixes = fixes.filter(fix => fix.impact === 'CRITICAL' || fix.impact === 'HIGH');
    }
    
    return fixes.sort((a, b) => b.aiRiskScore - a.aiRiskScore);
  }, [selectedBranch, showOnlyIssues]);

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'CRITICAL': return 'text-red-600 bg-red-50 border-red-200';
      case 'HIGH': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'MEDIUM': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'LOW': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getRiskLevelColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'CRITICAL': return 'bg-red-500';
      case 'HIGH': return 'bg-orange-500';
      case 'MEDIUM': return 'bg-yellow-500';
      case 'LOW': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getHealthScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header with Controls */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">AI Branch Management System</h2>
          <p className="text-gray-600">Intelligent cross-branch fix tracking and merge conflict prevention</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <select 
            value={selectedBranch}
            onChange={(e) => setSelectedBranch(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2"
          >
            <option value="all">All Branches</option>
            {branchIntelligence.map(branch => (
              <option key={branch.branch} value={branch.branch}>
                {branch.releaseName}
              </option>
            ))}
          </select>
          
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={showOnlyIssues}
              onChange={(e) => setShowOnlyIssues(e.target.checked)}
              className="rounded"
            />
            <span className="text-sm text-gray-700">Critical Issues Only</span>
          </label>
        </div>
      </div>

      {/* AI Intelligence Overview */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl p-6 text-white">
        <div className="flex items-center space-x-3 mb-4">
          <Brain className="w-8 h-8" />
          <div>
            <h3 className="text-2xl font-bold">Branch Intelligence Analysis</h3>
            <p className="text-purple-100">Real-time AI monitoring of cross-branch consistency</p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-white/10 rounded-lg p-3">
            <div className="text-2xl font-bold">{aiInsights.totalRiskExposure}</div>
            <div className="text-sm text-purple-100">Total Risk Exposure</div>
            <div className="text-xs text-purple-200">Potential cost of missing fixes</div>
          </div>
          <div className="bg-white/10 rounded-lg p-3">
            <div className="text-2xl font-bold">{filteredFixes.length}</div>
            <div className="text-sm text-purple-100">Missing Merges</div>
            <div className="text-xs text-purple-200">Across all release branches</div>
          </div>
          <div className="bg-white/10 rounded-lg p-3">
            <div className="text-2xl font-bold">{aiInsights.predictedIssues}</div>
            <div className="text-sm text-purple-100">Predicted Issues</div>
            <div className="text-xs text-purple-200">If deployed without fixes</div>
          </div>
          <div className="bg-white/10 rounded-lg p-3">
            <div className="text-2xl font-bold">{aiInsights.confidenceLevel}%</div>
            <div className="text-sm text-purple-100">AI Confidence</div>
            <div className="text-xs text-purple-200">Analysis accuracy</div>
          </div>
        </div>
      </div>

      {/* Branch Health Overview */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold mb-6">Release Branch Health Status</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {branchIntelligence.map((branch, index) => (
            <motion.div
              key={branch.branch}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="border rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <GitBranch className="w-5 h-5 text-gray-600" />
                  <span className="font-medium">{branch.releaseName}</span>
                </div>
                <div className={`w-3 h-3 rounded-full ${getRiskLevelColor(branch.riskLevel)}`}></div>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Health Score:</span>
                  <span className={`font-bold ${getHealthScoreColor(branch.healthScore)}`}>
                    {branch.healthScore}/100
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Missing Fixes:</span>
                  <span className={`font-medium ${branch.missingFixes > 0 ? 'text-red-600' : 'text-green-600'}`}>
                    {branch.missingFixes}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Release Date:</span>
                  <span className="font-medium">{new Date(branch.releaseDate).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Last Sync:</span>
                  <span className="text-xs text-gray-500">
                    {new Date(branch.lastSync).toLocaleString()}
                  </span>
                </div>
              </div>
              
              <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${
                    branch.healthScore >= 90 ? 'bg-green-500' :
                    branch.healthScore >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${branch.healthScore}%` }}
                ></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Critical Missing Fixes */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold mb-6">Missing Fixes Analysis</h3>
        
        {filteredFixes.length === 0 ? (
          <div className="text-center py-8">
            <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
            <p className="text-gray-500">No missing fixes detected for the selected criteria</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredFixes.map((fix, index) => (
              <motion.div
                key={fix.defectId}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="border rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <span className={`px-2 py-1 text-xs rounded-full border ${getImpactColor(fix.impact)}`}>
                        {fix.impact} IMPACT
                      </span>
                      <span className="font-mono text-sm text-gray-600">{fix.defectId}</span>
                      <span className="text-sm text-gray-500">Risk Score: {fix.aiRiskScore}/100</span>
                    </div>
                    
                    <h4 className="font-semibold text-gray-900 mb-2">{fix.title}</h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Developer:</span>
                        <span className="ml-2 font-medium">{fix.developer}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Applied Date:</span>
                        <span className="ml-2 font-medium">{new Date(fix.appliedDate).toLocaleDateString()}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Applied to:</span>
                        <div className="ml-2 flex flex-wrap gap-1">
                          {fix.appliedBranches.map(branch => (
                            <span key={branch} className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
                              {branch.replace('release/', '')}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <span className="text-gray-600">Missing from:</span>
                        <div className="ml-2 flex flex-wrap gap-1">
                          {fix.missingBranches.map(branch => (
                            <span key={branch} className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded">
                              {branch.replace('release/', '')}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                      <div className="flex items-start space-x-2">
                        <Brain className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <span className="font-medium text-blue-900">AI Recommendation:</span>
                          <p className="text-blue-800 text-sm mt-1">{fix.recommendation}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="ml-4 text-right">
                    <div className="text-lg font-bold text-red-600 mb-2">{fix.estimatedCost}</div>
                    <div className="text-xs text-gray-500 mb-3">Potential cost</div>
                    
                    <div className="space-y-2">
                      {fix.prUrl && (
                        <button className="w-full bg-blue-600 text-white px-3 py-1 rounded text-xs hover:bg-blue-700 transition-colors flex items-center justify-center space-x-1">
                          <ExternalLink className="w-3 h-3" />
                          <span>View PR</span>
                        </button>
                      )}
                      <button className="w-full bg-green-600 text-white px-3 py-1 rounded text-xs hover:bg-green-700 transition-colors flex items-center justify-center space-x-1">
                        <GitMerge className="w-3 h-3" />
                        <span>Auto Merge</span>
                      </button>
                      <button className="w-full border border-gray-300 text-gray-700 px-3 py-1 rounded text-xs hover:bg-gray-50 transition-colors">
                        Schedule
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* AI Recommendations Summary */}
      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-6 border-l-4 border-yellow-500">
        <div className="flex items-start space-x-4">
          <AlertTriangle className="w-8 h-8 text-yellow-500 flex-shrink-0 mt-1" />
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Immediate Action Required</h3>
            <p className="text-gray-700 mb-4">{aiInsights.recommendedAction}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-lg p-3 border border-gray-200">
                <div className="font-medium text-gray-900">Critical Fixes</div>
                <div className="text-2xl font-bold text-red-600">
                  {filteredFixes.filter(f => f.impact === 'CRITICAL').length}
                </div>
                <div className="text-sm text-gray-600">Require immediate attention</div>
              </div>
              <div className="bg-white rounded-lg p-3 border border-gray-200">
                <div className="font-medium text-gray-900">High Priority</div>
                <div className="text-2xl font-bold text-orange-600">
                  {filteredFixes.filter(f => f.impact === 'HIGH').length}
                </div>
                <div className="text-sm text-gray-600">Should be merged this week</div>
              </div>
              <div className="bg-white rounded-lg p-3 border border-gray-200">
                <div className="font-medium text-gray-900">Total Cost Risk</div>
                <div className="text-2xl font-bold text-red-600">{aiInsights.totalRiskExposure}</div>
                <div className="text-sm text-gray-600">If issues not addressed</div>
              </div>
            </div>
            
            <div className="mt-4 flex items-center space-x-4">
              <button className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2">
                <GitMerge className="w-4 h-4" />
                <span>Merge Critical Fixes Now</span>
              </button>
              <button className="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                Schedule Review Meeting
              </button>
              <button className="border border-blue-600 text-blue-600 px-6 py-2 rounded-lg hover:bg-blue-50 transition-colors flex items-center space-x-2">
                <Bell className="w-4 h-4" />
                <span>Set Up Alerts</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}