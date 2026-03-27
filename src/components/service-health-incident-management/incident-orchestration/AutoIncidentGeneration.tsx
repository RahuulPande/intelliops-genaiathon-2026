'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  Zap, 
  Brain, 
  AlertTriangle, 
  CheckCircle,
  XCircle,
  Clock,
  Users,
  Target,
  Activity,
  ArrowRight,
  Bell,
  Settings,
  Play,
  Pause,
  ExternalLink,
  GitBranch,
  Shield,
  TrendingUp,
  Calendar
} from 'lucide-react';

interface AutoIncidentRule {
  id: string;
  serviceName: string;
  serviceId: string;
  triggerCondition: string;
  threshold: string;
  duration: string;
  incidentTemplate: {
    title: string;
    priority: 'P1' | 'P2' | 'P3' | 'P4';
    assignedTeam: string;
    escalationTime: string;
  };
  aiSuggestion: {
    solution: string;
    confidence: number;
    basedOn: string;
    historicalSuccessRate: number;
  };
  isActive: boolean;
  triggeredCount: number;
  lastTriggered?: string;
}

interface GeneratedIncident {
  id: string;
  ruleId: string;
  serviceName: string;
  title: string;
  priority: 'P1' | 'P2' | 'P3' | 'P4';
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  assignedTeam: string;
  assignedTo?: string;
  createdAt: string;
  resolvedAt?: string;
  resolutionTime?: string;
  triggerValue: string;
  aiSuggestionUsed: boolean;
  aiSuccessful?: boolean;
}

export default function AutoIncidentGeneration() {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'active' | 'triggered'>('all');
  const [showSettings, setShowSettings] = useState(false);

  // Auto-incident generation rules
  const incidentRules: AutoIncidentRule[] = [
    {
      id: 'RULE-001',
      serviceName: 'Credit Scoring - Secondary',
      serviceId: 'credit-scoring-secondary',
      triggerCondition: 'Health Score < 85%',
      threshold: '85%',
      duration: '5 minutes',
      incidentTemplate: {
        title: 'Credit Scoring Service Degradation',
        priority: 'P2',
        assignedTeam: 'Banking Operations',
        escalationTime: '30 minutes'
      },
      aiSuggestion: {
        solution: 'Restart secondary credit scoring instances',
        confidence: 96,
        basedOn: 'Similar incident DEF-3891 resolved in 15 minutes',
        historicalSuccessRate: 94
      },
      isActive: true,
      triggeredCount: 23,
      lastTriggered: '2026-08-01T14:23:00Z'
    },
    {
      id: 'RULE-002',
      serviceName: 'Payment API Gateway',
      serviceId: 'payment-api-gateway',
      triggerCondition: 'Error Rate > 5%',
      threshold: '5%',
      duration: '3 minutes',
      incidentTemplate: {
        title: 'Payment API High Error Rate',
        priority: 'P1',
        assignedTeam: 'Platform Engineering',
        escalationTime: '15 minutes'
      },
      aiSuggestion: {
        solution: 'Scale API gateway instances and check database connections',
        confidence: 91,
        basedOn: 'Pattern analysis of 47 similar incidents',
        historicalSuccessRate: 87
      },
      isActive: true,
      triggeredCount: 8,
      lastTriggered: '2026-07-30T16:45:00Z'
    },
    {
      id: 'RULE-003',
      serviceName: 'User Authentication Service',
      serviceId: 'user-auth-service',
      triggerCondition: 'Response Time > 2 seconds',
      threshold: '2s',
      duration: '10 minutes',
      incidentTemplate: {
        title: 'Authentication Service Performance Degradation',
        priority: 'P2',
        assignedTeam: 'Security & Auth Team',
        escalationTime: '45 minutes'
      },
      aiSuggestion: {
        solution: 'Clear authentication cache and restart auth service cluster',
        confidence: 83,
        basedOn: 'Historical resolution pattern from last 6 months',
        historicalSuccessRate: 78
      },
      isActive: true,
      triggeredCount: 15,
      lastTriggered: '2026-07-28T09:12:00Z'
    },
    {
      id: 'RULE-004',
      serviceName: 'Database Cluster Primary',
      serviceId: 'db-cluster-primary',
      triggerCondition: 'Connection Pool > 90%',
      threshold: '90%',
      duration: '2 minutes',
      incidentTemplate: {
        title: 'Database Connection Pool Exhaustion',
        priority: 'P1',
        assignedTeam: 'Database Team',
        escalationTime: '10 minutes'
      },
      aiSuggestion: {
        solution: 'Scale connection pool and investigate long-running queries',
        confidence: 98,
        basedOn: 'Automated runbook based on 156 previous incidents',
        historicalSuccessRate: 95
      },
      isActive: true,
      triggeredCount: 5,
      lastTriggered: '2026-07-25T11:30:00Z'
    },
    {
      id: 'RULE-005',
      serviceName: 'External Partner API',
      serviceId: 'external-partner-api',
      triggerCondition: 'Availability < 95%',
      threshold: '95%',
      duration: '15 minutes',
      incidentTemplate: {
        title: 'External Partner Service Unavailable',
        priority: 'P3',
        assignedTeam: 'Integration Team',
        escalationTime: '60 minutes'
      },
      aiSuggestion: {
        solution: 'Enable circuit breaker and switch to backup partner',
        confidence: 76,
        basedOn: 'Fallback strategy from partner integration playbook',
        historicalSuccessRate: 82
      },
      isActive: false,
      triggeredCount: 2,
      lastTriggered: '2026-07-20T13:45:00Z'
    }
  ];

  // Recently generated incidents
  const generatedIncidents: GeneratedIncident[] = [
    {
      id: 'INC-2024-0847',
      ruleId: 'RULE-001',
      serviceName: 'Credit Scoring - Secondary',
      title: 'Credit Scoring Service Degradation',
      priority: 'P2',
      status: 'resolved',
      assignedTeam: 'Banking Operations',
      assignedTo: 'Sarah Wilson',
      createdAt: '2026-08-01T14:23:00Z',
      resolvedAt: '2026-08-01T14:38:00Z',
      resolutionTime: '15 minutes',
      triggerValue: 'Health Score: 82%',
      aiSuggestionUsed: true,
      aiSuccessful: true
    },
    {
      id: 'INC-2024-0846',
      ruleId: 'RULE-002',
      serviceName: 'Payment API Gateway',
      title: 'Payment API High Error Rate',
      priority: 'P1',
      status: 'resolved',
      assignedTeam: 'Platform Engineering',
      assignedTo: 'Mike Chen',
      createdAt: '2026-07-30T16:45:00Z',
      resolvedAt: '2026-07-30T17:12:00Z',
      resolutionTime: '27 minutes',
      triggerValue: 'Error Rate: 7.3%',
      aiSuggestionUsed: true,
      aiSuccessful: true
    },
    {
      id: 'INC-2024-0845',
      ruleId: 'RULE-003',
      serviceName: 'User Authentication Service',
      title: 'Authentication Service Performance Degradation',
      priority: 'P2',
      status: 'in-progress',
      assignedTeam: 'Security & Auth Team',
      assignedTo: 'David Kim',
      createdAt: '2026-07-28T09:12:00Z',
      triggerValue: 'Response Time: 2.4s',
      aiSuggestionUsed: false,
      aiSuccessful: undefined
    }
  ];

  const filteredRules = useMemo(() => {
    switch (selectedFilter) {
      case 'active':
        return incidentRules.filter(rule => rule.isActive);
      case 'triggered':
        return incidentRules.filter(rule => rule.triggeredCount > 0);
      default:
        return incidentRules;
    }
  }, [selectedFilter]);

  const automationStats = {
    totalRules: incidentRules.length,
    activeRules: incidentRules.filter(r => r.isActive).length,
    totalIncidentsGenerated: 53,
    aiSuggestionUsageRate: 78,
    averageResolutionTime: '18 minutes',
    automationSuccessRate: 94
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'P1': return 'text-red-600 bg-red-50 border-red-200';
      case 'P2': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'P3': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'P4': return 'text-blue-600 bg-blue-50 border-blue-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'text-red-600 bg-red-100';
      case 'in-progress': return 'text-yellow-600 bg-yellow-100';
      case 'resolved': return 'text-green-600 bg-green-100';
      case 'closed': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'open': return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case 'in-progress': return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'resolved': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'closed': return <XCircle className="w-4 h-4 text-gray-500" />;
      default: return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header with Controls */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Auto-Incident Generation</h2>
          <p className="text-gray-600">Automated incident creation from service health triggers with AI-powered resolution suggestions</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <select 
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value as 'all' | 'active' | 'triggered')}
            className="border border-gray-300 rounded-lg px-3 py-2"
          >
            <option value="all">All Rules</option>
            <option value="active">Active Rules</option>
            <option value="triggered">Recently Triggered</option>
          </select>
          
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="flex items-center space-x-2 border border-gray-300 rounded-lg px-3 py-2 hover:bg-gray-50"
          >
            <Settings className="w-4 h-4" />
            <span>Settings</span>
          </button>
        </div>
      </div>

      {/* Automation Overview */}
      <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl p-6 text-white">
        <div className="flex items-center space-x-3 mb-4">
          <Zap className="w-8 h-8" />
          <div>
            <h3 className="text-2xl font-bold">Incident Automation Engine</h3>
            <p className="text-purple-100">AI-powered incident generation and resolution assistance</p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
          <div className="bg-white/10 rounded-lg p-3">
            <div className="text-2xl font-bold">{automationStats.totalIncidentsGenerated}</div>
            <div className="text-sm text-purple-100">Incidents Generated</div>
            <div className="text-xs text-purple-200">This month</div>
          </div>
          <div className="bg-white/10 rounded-lg p-3">
            <div className="text-2xl font-bold">{automationStats.aiSuggestionUsageRate}%</div>
            <div className="text-sm text-purple-100">AI Suggestions Used</div>
            <div className="text-xs text-purple-200">High adoption rate</div>
          </div>
          <div className="bg-white/10 rounded-lg p-3">
            <div className="text-2xl font-bold">{automationStats.averageResolutionTime}</div>
            <div className="text-sm text-purple-100">Avg Resolution Time</div>
            <div className="text-xs text-purple-200">↓ 60% improvement</div>
          </div>
          <div className="bg-white/10 rounded-lg p-3">
            <div className="text-2xl font-bold">{automationStats.automationSuccessRate}%</div>
            <div className="text-sm text-purple-100">Success Rate</div>
            <div className="text-xs text-purple-200">AI-assisted resolution</div>
          </div>
          <div className="bg-white/10 rounded-lg p-3">
            <div className="text-2xl font-bold">{automationStats.activeRules}</div>
            <div className="text-sm text-purple-100">Active Rules</div>
            <div className="text-xs text-purple-200">Out of {automationStats.totalRules} total</div>
          </div>
          <div className="bg-white/10 rounded-lg p-3">
            <div className="text-2xl font-bold">24/7</div>
            <div className="text-sm text-purple-100">Monitoring</div>
            <div className="text-xs text-purple-200">Continuous automation</div>
          </div>
        </div>
      </div>

      {/* Auto-Incident Rules */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold mb-6">Auto-Incident Generation Rules</h3>
        <div className="space-y-4">
          {filteredRules.map((rule, index) => (
            <motion.div
              key={rule.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="border rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className={`w-3 h-3 rounded-full ${rule.isActive ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                    <h4 className="font-semibold text-gray-900">{rule.serviceName}</h4>
                    <span className={`px-2 py-1 text-xs rounded-full border ${getPriorityColor(rule.incidentTemplate.priority)}`}>
                      {rule.incidentTemplate.priority}
                    </span>
                    <span className="text-sm text-gray-500">Rule {rule.id}</span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="space-y-2 text-sm">
                      <div><span className="text-gray-600">Trigger:</span> <span className="font-medium">{rule.triggerCondition}</span></div>
                      <div><span className="text-gray-600">Duration:</span> <span className="font-medium">{rule.duration}</span></div>
                      <div><span className="text-gray-600">Team:</span> <span className="font-medium">{rule.incidentTemplate.assignedTeam}</span></div>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div><span className="text-gray-600">Triggered:</span> <span className="font-medium">{rule.triggeredCount} times</span></div>
                      <div><span className="text-gray-600">Last:</span> <span className="font-medium">
                        {rule.lastTriggered ? new Date(rule.lastTriggered).toLocaleString() : 'Never'}
                      </span></div>
                      <div><span className="text-gray-600">Escalation:</span> <span className="font-medium">{rule.incidentTemplate.escalationTime}</span></div>
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                    <div className="flex items-start space-x-2">
                      <Brain className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium text-blue-900">AI Resolution Suggestion</span>
                          <span className="text-xs text-blue-600">{rule.aiSuggestion.confidence}% confidence</span>
                        </div>
                        <p className="text-blue-800 text-sm mb-2">{rule.aiSuggestion.solution}</p>
                        <div className="flex items-center justify-between text-xs text-blue-600">
                          <span>{rule.aiSuggestion.basedOn}</span>
                          <span>{rule.aiSuggestion.historicalSuccessRate}% historical success</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="ml-4 flex flex-col space-y-2">
                  <button className={`p-2 rounded-lg ${rule.isActive ? 'bg-green-100 text-green-600 hover:bg-green-200' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                    {rule.isActive ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
                  </button>
                  <button className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200">
                    <Settings className="w-4 h-4" />
                  </button>
                  <button className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200">
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Recently Generated Incidents */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold mb-6">Recently Generated Incidents</h3>
        <div className="space-y-4">
          {generatedIncidents.map((incident, index) => (
            <motion.div
              key={incident.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="border rounded-lg p-4"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    {getStatusIcon(incident.status)}
                    <h4 className="font-semibold text-gray-900">{incident.title}</h4>
                    <span className={`px-2 py-1 text-xs rounded-full border ${getPriorityColor(incident.priority)}`}>
                      {incident.priority}
                    </span>
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(incident.status)}`}>
                      {incident.status.replace('-', ' ').toUpperCase()}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm mb-3">
                    <div>
                      <span className="text-gray-600">Service:</span>
                      <span className="ml-2 font-medium">{incident.serviceName}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Assigned:</span>
                      <span className="ml-2 font-medium">{incident.assignedTo || incident.assignedTeam}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Created:</span>
                      <span className="ml-2 font-medium">{new Date(incident.createdAt).toLocaleString()}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-sm">
                    <div>
                      <span className="text-gray-600">Trigger Value:</span>
                      <span className="ml-2 font-medium text-red-600">{incident.triggerValue}</span>
                    </div>
                    {incident.resolutionTime && (
                      <div>
                        <span className="text-gray-600">Resolution Time:</span>
                        <span className="ml-2 font-medium text-green-600">{incident.resolutionTime}</span>
                      </div>
                    )}
                    <div className="flex items-center space-x-2">
                      <Brain className="w-4 h-4 text-purple-600" />
                      <span className={`text-sm ${incident.aiSuggestionUsed ? 'text-purple-600' : 'text-gray-500'}`}>
                        AI Suggestion {incident.aiSuggestionUsed ? 'Used' : 'Not Used'}
                      </span>
                      {incident.aiSuccessful && (
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="ml-4">
                  <button className="text-blue-600 hover:text-blue-800">
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Automation Benefits */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Automation Benefits</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="flex items-center space-x-3 mb-2">
              <Clock className="w-5 h-5 text-blue-600" />
              <span className="font-medium">Faster Response</span>
            </div>
            <p className="text-sm text-gray-600">
              Automated incident creation reduces response time from manual detection by 75%, 
              enabling immediate team assignment and escalation.
            </p>
          </div>
          
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="flex items-center space-x-3 mb-2">
              <Brain className="w-5 h-5 text-purple-600" />
              <span className="font-medium">AI-Powered Solutions</span>
            </div>
            <p className="text-sm text-gray-600">
              AI analyzes historical patterns to suggest proven solutions with 94% success rate, 
              reducing resolution time and improving outcomes.
            </p>
          </div>
          
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="flex items-center space-x-3 mb-2">
              <Shield className="w-5 h-5 text-green-600" />
              <span className="font-medium">Consistent Process</span>
            </div>
            <p className="text-sm text-gray-600">
              Standardized incident creation ensures consistent priority assignment, 
              team routing, and escalation procedures across all services.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}