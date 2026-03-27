'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Activity, 
  Brain, 
  AlertTriangle, 
  CheckCircle,
  XCircle,
  Clock,
  Target,
  Shield,
  Users,
  ArrowRight,
  Star,
  Zap,
  BarChart3,
  Eye,
  Cpu,
  Database,
  Search,
  Bell,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Layers,
  GitBranch,
  RefreshCw,
  BrainCircuit
} from 'lucide-react';

export interface ServiceHealthIncidentLandingProps {
  onNavigateToSection: (section: string) => void;
}

export default function ServiceHealthIncidentLanding({ onNavigateToSection }: ServiceHealthIncidentLandingProps) {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const operationalMetrics = [
    { icon: Activity, label: 'Services Monitored', value: '150+', color: 'text-blue-600' },
    { icon: Eye, label: 'Daily Log Analysis', value: '10.2M', color: 'text-green-600' },
    { icon: Shield, label: 'Prevention Rate', value: '94%', color: 'text-purple-600' },
    { icon: Clock, label: 'MTTR', value: '12min', color: 'text-orange-600' }
  ];

  const serviceHealthSections = [
    {
      id: 'real-time-monitoring',
      title: 'Real-Time Monitoring',
      description: 'Continuous Splunk integration monitoring 150+ services with AI-powered health scoring',
      icon: Activity,
      gradient: 'from-blue-500 to-cyan-600',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
      splunkIntegration: true,
      features: [
        'Live Service Dashboard with AI Health Scoring',
        'Continuous Log Analysis (Splunk Integration)',
        'Predictive Service Degradation Detection',
        'Cross-Service Dependency Mapping'
      ],
      metrics: [
        { label: 'Healthy', value: '121', change: '↑ 2' },
        { label: 'Degraded', value: '16', change: '↓ 3' },
        { label: 'Down', value: '13', change: '↓ 1' }
      ],
      businessValue: 'Monitor 150+ services with 99.7% uptime through continuous Splunk analysis',
      integrationBadge: 'Splunk Integration Active',
      costSavings: '$340,000 annually from prevented outages'
    },
    {
      id: 'intelligent-alert-management',
      title: 'Intelligent Alert Management',
      description: 'AI-powered alert fatigue management and noise reduction',
      icon: BrainCircuit,
      gradient: 'from-purple-500 to-indigo-600',
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-600',
      aiPowered: true,
      features: [
        'AI-Powered Alert Categorization & Prioritization',
        'Smart Alert Routing & Escalation Chains',
        'Alert Fatigue Prevention & Team Monitoring',
        'Real-time Intelligence Feed & Pattern Recognition'
      ],
      metrics: [
        { label: 'Daily Alerts', value: '847', change: '-68% noise' },
        { label: 'Critical Alerts', value: '23', change: '+34% accuracy' },
        { label: 'Noise Reduction', value: '87%', change: 'AI Learning' }
      ],
      businessValue: 'AI-powered alert fatigue management saving $5.4M annually',
      integrationBadge: '87% Noise Reduction with AI Learning',
      costSavings: '$5.4M annually from intelligent alert management'
    },
    {
      id: 'incident-orchestration',
      title: 'Incident Orchestration',
      description: 'Automated incident creation and AI-assisted resolution workflows',
      icon: Zap,
      gradient: 'from-purple-500 to-indigo-600',
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-600',
      automationPowered: true,
      features: [
        'Auto-Incident Creation from Service Issues',
        'Incident Lifecycle Management & Tracking',
        'AI-Powered Resolution Suggestions (78% success)',
        'Cross-Service Impact Analysis & Escalation'
      ],
      metrics: [
        { label: 'Active Incidents', value: '3', change: '↓ 7' },
        { label: 'Auto-Resolution', value: '94%', change: '+12%' },
        { label: 'Avg MTTR', value: '12min', change: '↓ 8min' }
      ],
      businessValue: 'Automate 94% of incident responses with 12-minute MTTR',
      integrationBadge: 'Fully Automated Workflows',
      costSavings: '$520,000 annually from automation'
    },
    {
      id: 'operations-intelligence',
      title: 'Operations Intelligence',
      description: 'Service health trends and predictive incident analytics',
      icon: BarChart3,
      gradient: 'from-green-500 to-teal-600',
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600',
      analyticsEngine: true,
      features: [
        'Service Health Trend Analysis & Forecasting',
        'Incident Pattern Recognition & Prevention',
        'MTTR Optimization & Process Improvement',
        'Operational Cost Impact & ROI Analytics'
      ],
      metrics: [
        { label: 'Patterns Found', value: '89', change: '+23' },
        { label: 'Cost Savings', value: '$1.2M', change: '+$340K' },
        { label: 'Efficiency', value: '87%', change: '+15%' }
      ],
      businessValue: 'Predictive analytics preventing 89% of recurring incidents',
      integrationBadge: 'Predictive Intelligence Engine',
      costSavings: '$450,000 annually from pattern recognition'
    }
  ];

  const splunkIntegrationData = {
    connectionStatus: 'ACTIVE',
    lastSync: new Date().toLocaleTimeString(),
    dailyLogVolume: '10.2M',
    anomaliesDetected: 847,
    preventionRate: '94%',
    processingLatency: '< 2 seconds',
    integrationHealth: 98
  };

  const aiCapabilities = [
    {
      icon: Search,
      title: 'Continuous Log Analysis',
      description: 'AI processes 10.2M+ daily log entries from Splunk to detect anomalies',
      impact: '94% prevention rate',
      confidence: 98
    },
    {
      icon: Brain,
      title: 'Predictive Service Intelligence',
      description: 'ML models predict service degradation 2-4 hours before failure',
      impact: '89% accuracy in predictions',
      confidence: 92
    },
    {
      icon: Target,
      title: 'Smart Alert Correlation',
      description: 'AI groups related alerts reducing noise by 80% for operations teams',
      impact: '240 hours saved monthly',
      confidence: 96
    },
    {
      icon: Zap,
      title: 'Automated Incident Response',
      description: 'AI suggests solutions based on historical patterns with 78% success rate',
      impact: '12-minute average MTTR',
      confidence: 84
    }
  ];

  const achievementStats = [
    { icon: DollarSign, label: 'Annual Savings', value: '$1.49M', description: 'From AI-powered operations' },
    { icon: Shield, label: 'Service Uptime', value: '99.7%', description: 'Through predictive monitoring' },
    { icon: TrendingDown, label: 'Alert Noise', value: '80%', description: 'Reduction in false alerts' },
    { icon: Clock, label: 'MTTR', value: '12min', description: 'Average resolution time' }
  ];

  const currentServiceStatus = {
    healthy: 121,
    degraded: 16,
    down: 13,
    external: 67,
    totalMonitored: 150
  };

  return (
    <div className="p-6 space-y-8">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center space-y-6"
      >
        <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          <Activity className="w-8 h-8 text-blue-600" />
          <h1 className="text-4xl font-bold">Service Health & Incident Management</h1>
        </div>
        
        <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
          Real-time service monitoring with AI-powered incident detection and automated response workflows. 
          Continuous Splunk integration analyzes 10.2M+ daily events across 150+ services with 94% incident prevention rate.
        </p>
      </motion.div>

      {/* Unified Platform Metrics - Single Display */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white"
      >
        <div className="text-center mb-6">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Search className="w-8 h-8 text-blue-200" />
            <h2 className="text-2xl font-bold">Platform Performance Overview</h2>
          </div>
          <p className="text-blue-100 text-lg">
            Real-time operational intelligence powered by continuous Splunk log analysis
          </p>
        </div>

        {/* Main Platform Metrics - Single Authoritative Display */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
            <div className="text-3xl font-bold mb-2">150+</div>
            <div className="text-blue-100 text-sm font-medium">Services Monitored</div>
            <div className="text-xs text-blue-200 mt-1">Continuous health tracking</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
            <div className="text-3xl font-bold mb-2">10.2M</div>
            <div className="text-blue-100 text-sm font-medium">Daily Log Analysis</div>
            <div className="text-xs text-blue-200 mt-1">Splunk integration active</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
            <div className="text-3xl font-bold mb-2">94%</div>
            <div className="text-blue-100 text-sm font-medium">Prevention Rate</div>
            <div className="text-xs text-blue-200 mt-1">AI-powered predictions</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
            <div className="text-3xl font-bold mb-2">12min</div>
            <div className="text-blue-100 text-sm font-medium">Average MTTR</div>
            <div className="text-xs text-blue-200 mt-1">Automated resolution</div>
          </div>
        </div>

        {/* Additional Technical Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center">
            <div className="text-xl font-bold text-green-300">{splunkIntegrationData.anomaliesDetected}</div>
            <div className="text-xs text-blue-200">Anomalies Detected</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center">
            <div className="text-xl font-bold text-orange-300">{splunkIntegrationData.processingLatency}</div>
            <div className="text-xs text-blue-200">Processing Time</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center">
            <div className="text-xl font-bold text-purple-300">99.7%</div>
            <div className="text-xs text-blue-200">Platform Uptime</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center">
            <div className="text-xl font-bold text-cyan-300">{splunkIntegrationData.lastSync}</div>
            <div className="text-xs text-blue-200">Last Data Sync</div>
          </div>
        </div>
      </motion.div>

      {/* Real-Time Service Health Dashboard */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <h3 className="text-xl font-semibold text-gray-900">Live Service Health Dashboard</h3>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <RefreshCw className="w-4 h-4 animate-spin" />
            <span>Live data • Updated: {splunkIntegrationData.lastSync}</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Service Status Distribution */}
          <div className="col-span-2">
            <h4 className="text-sm font-medium text-gray-700 mb-4">Current Service Distribution</h4>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-green-600 mb-1">{currentServiceStatus.healthy}</div>
                <div className="text-sm font-medium text-green-700">Healthy</div>
                <div className="text-xs text-green-600 mt-1">↑ 2 improved</div>
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-yellow-600 mb-1">{currentServiceStatus.degraded}</div>
                <div className="text-sm font-medium text-yellow-700">Degraded</div>
                <div className="text-xs text-green-600 mt-1">↓ 3 resolved</div>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-red-600 mb-1">{currentServiceStatus.down}</div>
                <div className="text-sm font-medium text-red-700">Critical</div>
                <div className="text-xs text-green-600 mt-1">↓ 1 restored</div>
              </div>
            </div>
          </div>

          {/* Health Score & Trends */}
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-4">
            <h4 className="text-sm font-medium text-gray-700 mb-4">Overall Health Score</h4>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">98.7%</div>
              <div className="text-sm text-gray-600 mb-3">Platform Health</div>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-500">Uptime:</span>
                  <span className="text-green-600 font-medium">99.7%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Response:</span>
                  <span className="text-blue-600 font-medium">45ms avg</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Incidents:</span>
                  <span className="text-purple-600 font-medium">11 active</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* AI Capabilities Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6"
      >
        <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">AI-Powered Operations Intelligence</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {aiCapabilities.map((capability, index) => (
            <motion.div
              key={capability.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
              className="bg-white rounded-lg p-4 shadow-sm border border-gray-200"
            >
              <div className="flex items-center space-x-3 mb-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <capability.icon className="w-5 h-5 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-900">{capability.title}</h3>
              </div>
              <p className="text-sm text-gray-600 mb-3">{capability.description}</p>
              <div className="space-y-2">
                <div className="text-xs font-medium text-purple-700 bg-purple-50 rounded px-2 py-1">
                  {capability.impact}
                </div>
                <div className="text-xs text-gray-500">
                  AI Confidence: {capability.confidence}%
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Four Main Service Health & Incident Management Sections */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="grid md:grid-cols-1 lg:grid-cols-2 gap-6"
      >
        {serviceHealthSections.map((section, index) => (
          <motion.div
            key={section.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
            onMouseEnter={() => setHoveredCard(section.id)}
            onMouseLeave={() => setHoveredCard(null)}
            className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            {/* Card Header */}
            <div className={`bg-gradient-to-r ${section.gradient} p-6 text-white`}>
              <div className="flex items-center space-x-3 mb-4">
                <div className={`p-3 ${section.iconBg} rounded-lg`}>
                  <section.icon className={`w-6 h-6 ${section.iconColor}`} />
                </div>
                <div>
                  <h3 className="text-xl font-bold">{section.title}</h3>
                  {section.splunkIntegration && (
                    <div className="text-xs text-blue-100 bg-blue-500/20 rounded px-2 py-1 mt-1 inline-block">
                      {section.integrationBadge}
                    </div>
                  )}
                  {section.aiPowered && (
                    <div className="text-xs text-purple-100 bg-purple-500/20 rounded px-2 py-1 mt-1 inline-block">
                      {section.integrationBadge}
                    </div>
                  )}
                  {section.automationPowered && (
                    <div className="text-xs text-green-100 bg-green-500/20 rounded px-2 py-1 mt-1 inline-block">
                      {section.integrationBadge}
                    </div>
                  )}
                  {section.analyticsEngine && (
                    <div className="text-xs text-teal-100 bg-teal-500/20 rounded px-2 py-1 mt-1 inline-block">
                      {section.integrationBadge}
                    </div>
                  )}
                </div>
              </div>
              <p className="text-white/90">{section.description}</p>
            </div>

            {/* Metrics Preview */}
            <div className="p-6 space-y-4">
              <h4 className="font-semibold text-gray-900 mb-3">Current Metrics</h4>
              <div className="grid grid-cols-3 gap-3">
                {section.metrics.map((metric) => (
                  <div key={metric.label} className="text-center">
                    <div className="text-lg font-bold text-gray-900">{metric.value}</div>
                    <div className="text-xs text-gray-600">{metric.label}</div>
                    <div className="text-xs text-green-600 font-medium">{metric.change}</div>
                  </div>
                ))}
              </div>

              {/* Features */}
              <div className="mt-4">
                <h5 className="text-sm font-medium text-gray-700 mb-2">Key Features</h5>
                <div className="space-y-1">
                  {section.features.slice(0, 3).map((feature) => (
                    <div key={feature} className="flex items-center space-x-2">
                      <CheckCircle className="w-3 h-3 text-green-500" />
                      <span className="text-xs text-gray-600">{feature}</span>
                    </div>
                  ))}
                  <div className="text-xs text-purple-600 font-medium">+{section.features.length - 3} more features</div>
                </div>
              </div>

              {/* Business Value */}
              <div className="mt-4 p-3 bg-green-50 rounded-lg">
                <p className="text-sm text-green-800 font-medium mb-1">{section.businessValue}</p>
                <p className="text-xs text-green-600">{section.costSavings}</p>
              </div>

              {/* Quick Action */}
              <motion.button
                onClick={() => onNavigateToSection(section.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center justify-center space-x-2 p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors mt-4"
              >
                <span className="text-gray-700 font-medium">Explore {section.title}</span>
                <ArrowRight className="w-4 h-4 text-gray-400" />
              </motion.button>
            </div>

            {/* Hover Effect Indicator */}
            {hoveredCard === section.id && (
              <motion.div
                layoutId="card-hover"
                className="absolute inset-0 border-2 border-blue-400 rounded-xl pointer-events-none"
                initial={false}
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
          </motion.div>
        ))}
      </motion.div>

      {/* Achievement Statistics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.0 }}
        className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
      >
        <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">Operational Excellence Achievements</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {achievementStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 1.2 + index * 0.1 }}
              className="text-center"
            >
              <div className="flex justify-center mb-3">
                <div className="p-3 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full">
                  <stat.icon className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-sm font-medium text-gray-700 mb-1">{stat.label}</div>
              <div className="text-xs text-gray-500">{stat.description}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.2 }}
        className="text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white"
      >
        <h3 className="text-2xl font-bold mb-4">Transform Your Operations Intelligence</h3>
        <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
          Experience the power of continuous monitoring with AI-driven insights. From Splunk log analysis to 
          automated incident response, ensure 99.7% service uptime while saving $1.49M annually.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <motion.button
            onClick={() => onNavigateToSection('real-time-monitoring')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-2 bg-white text-blue-600 px-6 py-3 rounded-lg hover:shadow-lg transition-all font-medium"
          >
            <Activity className="w-5 h-5" />
            <span>Real-Time Monitoring</span>
          </motion.button>
          <motion.button
                            onClick={() => onNavigateToSection('intelligent-alert-management')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-2 bg-white text-red-600 px-6 py-3 rounded-lg hover:shadow-lg transition-all font-medium"
          >
            <Bell className="w-5 h-5" />
            <span>Intelligent Alerting</span>
          </motion.button>
          <motion.button
            onClick={() => onNavigateToSection('incident-orchestration')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-2 bg-white text-purple-600 px-6 py-3 rounded-lg hover:shadow-lg transition-all font-medium"
          >
            <Zap className="w-5 h-5" />
            <span>Incident Orchestration</span>
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}