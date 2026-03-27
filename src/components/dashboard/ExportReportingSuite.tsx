'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Download,
  FileText,
  Calendar,
  Settings,
  Plus,
  Trash2,
  Edit3,
  Clock,
  CheckCircle,
  AlertCircle,
  Eye,
  Mail,
  Users,
  Filter,
  Search,
  BarChart3,
  PieChart,
  FileSpreadsheet,
  Upload,
  Play,
  Pause,
  RotateCcw,
  Activity,
  Shield
} from 'lucide-react';
import useDashboardStore from '@/store/dashboard';

interface ReportSection {
  id: string;
  name: string;
  description: string;
  icon: any;
  dataPoints: string[];
}

export default function ExportReportingSuite() {
  const { 
    reportTemplates, 
    exportJobs,
    createReportTemplate, 
    updateReportTemplate, 
    deleteReportTemplate,
    startExportJob,
    updateExportJob
  } = useDashboardStore();

  const [activeTab, setActiveTab] = useState<'templates' | 'jobs' | 'builder' | 'schedule'>('templates');
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const [isBuilderOpen, setIsBuilderOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Mock report sections available for building reports
  const reportSections = useMemo((): ReportSection[] => [
    {
      id: 'executive-summary',
      name: 'Executive Summary',
      description: 'High-level KPIs and system overview',
      icon: BarChart3,
      dataPoints: ['System Health Score', 'Active Incidents', 'Monthly Savings', 'Uptime %']
    },
    {
      id: 'service-health',
      name: 'Service Health',
      description: 'Service status and performance metrics',
      icon: Activity,
      dataPoints: ['Service Status', 'Response Times', 'Error Rates', 'Availability']
    },
    {
      id: 'incidents',
      name: 'Incidents & Alerts',
      description: 'Incident reports and alert summaries',
      icon: AlertCircle,
      dataPoints: ['Incident Count', 'MTTR', 'Severity Breakdown', 'Resolution Times']
    },
    {
      id: 'performance',
      name: 'Performance Metrics',
      description: 'System and application performance data',
      icon: BarChart3,
      dataPoints: ['CPU Usage', 'Memory Usage', 'Disk I/O', 'Network Latency']
    },
    {
      id: 'cost-analysis',
      name: 'Cost Analysis',
      description: 'Cost breakdown and optimization insights',
      icon: PieChart,
      dataPoints: ['Monthly Costs', 'Budget Variance', 'Optimization Savings', 'License Usage']
    },
    {
      id: 'security',
      name: 'Security Report',
      description: 'Security compliance and vulnerability data',
      icon: Shield,
      dataPoints: ['Vulnerability Count', 'Compliance Score', 'Security Events', 'Patch Status']
    }
  ], []);

  // Mock report templates
  const mockTemplates = useMemo(() => [
    {
      id: 'exec-weekly',
      name: 'Executive Weekly Report',
      description: 'Weekly summary for executive stakeholders',
      type: 'executive' as const,
      sections: ['executive-summary', 'incidents', 'cost-analysis'],
      schedule: 'weekly' as const,
      recipients: ['exec@company.com', 'cto@company.com'],
      format: 'pdf' as const,
      createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      lastGenerated: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    },
    {
      id: 'ops-daily',
      name: 'Operations Daily Report',
      description: 'Daily operational metrics and alerts',
      type: 'operational' as const,
      sections: ['service-health', 'incidents', 'performance'],
      schedule: 'daily' as const,
      recipients: ['ops@company.com', 'devops@company.com'],
      format: 'excel' as const,
      createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),
      lastGenerated: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
    },
    {
      id: 'security-monthly',
      name: 'Security Monthly Assessment',
      description: 'Comprehensive security and compliance report',
      type: 'technical' as const,
      sections: ['security', 'incidents', 'executive-summary'],
      schedule: 'monthly' as const,
      recipients: ['security@company.com', 'compliance@company.com'],
      format: 'pdf' as const,
      createdAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000),
      lastGenerated: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
    }
  ], []);

  // Mock export jobs
  const mockExportJobs = useMemo(() => [
    {
      id: 'job-001',
      templateId: 'exec-weekly',
      status: 'completed' as const,
      progress: 100,
      format: 'pdf' as const,
      generatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
      downloadUrl: '/reports/exec-weekly-2024-01.pdf'
    },
    {
      id: 'job-002',
      templateId: 'ops-daily',
      status: 'generating' as const,
      progress: 75,
      format: 'excel' as const
    },
    {
      id: 'job-003',
      templateId: 'security-monthly',
      status: 'failed' as const,
      progress: 45,
      format: 'pdf' as const,
      error: 'Failed to access security metrics API'
    }
  ], []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100';
      case 'generating': return 'text-blue-600 bg-blue-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'failed': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'executive': return 'text-purple-600 bg-purple-100';
      case 'technical': return 'text-blue-600 bg-blue-100';
      case 'operational': return 'text-green-600 bg-green-100';
      case 'custom': return 'text-orange-600 bg-orange-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getFormatIcon = (format: string) => {
    switch (format) {
      case 'pdf': return FileText;
      case 'excel': return FileSpreadsheet;
      case 'csv': return FileText;
      default: return FileText;
    }
  };

  const handleExportNow = (templateId: string, format: 'pdf' | 'excel' | 'csv') => {
    const jobId = startExportJob(templateId, format);
    
    // Simulate export progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 30;
      if (progress >= 100) {
        updateExportJob(jobId, {
          status: 'completed',
          progress: 100,
          generatedAt: new Date(),
          downloadUrl: `/reports/${templateId}-${Date.now()}.${format}`
        });
        clearInterval(interval);
      } else {
        updateExportJob(jobId, {
          status: 'generating',
          progress: Math.min(progress, 99)
        });
      }
    }, 1000);
  };

  const handleDeleteTemplate = (templateId: string) => {
    if (confirm('Are you sure you want to delete this template?')) {
      deleteReportTemplate(templateId);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Export & Reporting Suite</h2>
          <p className="text-gray-600 mt-1">Generate, schedule, and manage comprehensive reports</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search templates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button
            onClick={() => setIsBuilderOpen(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>New Template</span>
          </button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: 'Report Templates', value: mockTemplates.length, icon: FileText, color: 'text-blue-600' },
          { title: 'Active Jobs', value: mockExportJobs.filter(j => j.status === 'generating').length, icon: Clock, color: 'text-orange-600' },
          { title: 'Completed Today', value: mockExportJobs.filter(j => j.status === 'completed').length, icon: CheckCircle, color: 'text-green-600' },
          { title: 'Total Downloads', value: '1,234', icon: Download, color: 'text-purple-600' }
        ].map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-lg p-6 border border-gray-200 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center justify-between mb-2">
                <div className={`p-3 rounded-lg bg-gray-50 ${stat.color}`}>
                  <IconComponent className="w-6 h-6" />
                </div>
              </div>
              <h3 className="text-sm font-medium text-gray-600">{stat.title}</h3>
              <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="flex space-x-1 p-1 bg-gray-100 rounded-t-lg">
          {[
            { id: 'templates', label: 'Templates', icon: FileText },
            { id: 'jobs', label: 'Export Jobs', icon: Download },
            { id: 'builder', label: 'Report Builder', icon: Settings },
            { id: 'schedule', label: 'Scheduled Reports', icon: Calendar }
          ].map((tab) => {
            const IconComponent = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <IconComponent className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        <div className="p-6">
          {/* Templates Tab */}
          {activeTab === 'templates' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockTemplates.map((template) => (
                  <div key={template.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(template.type)}`}>
                        {template.type}
                      </span>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => setSelectedTemplate(template.id)}
                          className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteTemplate(template.id)}
                          className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    
                    <h3 className="font-semibold text-gray-900 mb-2">{template.name}</h3>
                    <p className="text-sm text-gray-600 mb-4">{template.description}</p>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span>Schedule: {template.schedule || 'Manual'}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Users className="w-4 h-4 mr-2" />
                        <span>{template.recipients.length} recipients</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        {(() => {
                          const FormatIcon = getFormatIcon(template.format);
                          return <FormatIcon className="w-4 h-4 mr-2" />;
                        })()}
                        <span>{template.format.toUpperCase()}</span>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleExportNow(template.id, template.format)}
                        className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm"
                      >
                        Export Now
                      </button>
                      <button className="px-3 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors text-sm">
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Export Jobs Tab */}
          {activeTab === 'jobs' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="space-y-4">
                {mockExportJobs.map((job) => {
                  const template = mockTemplates.find(t => t.id === job.templateId);
                  const FormatIcon = getFormatIcon(job.format);
                  
                  return (
                    <div key={job.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="p-2 bg-gray-100 rounded-lg">
                            <FormatIcon className="w-5 h-5 text-gray-600" />
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900">{template?.name || 'Unknown Template'}</h4>
                            <div className="flex items-center space-x-4 text-sm text-gray-600">
                              <span>Format: {job.format.toUpperCase()}</span>
                              {job.generatedAt && (
                                <span>Generated: {job.generatedAt.toLocaleString()}</span>
                              )}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(job.status)}`}>
                            {job.status}
                          </span>
                          
                          {job.status === 'generating' && (
                            <div className="w-32">
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div 
                                  className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                                  style={{ width: `${job.progress}%` }}
                                ></div>
                              </div>
                              <span className="text-xs text-gray-600">{job.progress}%</span>
                            </div>
                          )}
                          
                          {job.status === 'completed' && job.downloadUrl && (
                            <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-sm flex items-center space-x-2">
                              <Download className="w-4 h-4" />
                              <span>Download</span>
                            </button>
                          )}
                          
                          {job.status === 'failed' && (
                            <button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors text-sm flex items-center space-x-2">
                              <RotateCcw className="w-4 h-4" />
                              <span>Retry</span>
                            </button>
                          )}
                        </div>
                      </div>
                      
                      {job.error && (
                        <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-md">
                          <p className="text-sm text-red-600">{job.error}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* Report Builder Tab */}
          {activeTab === 'builder' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Report Builder</h3>
                  <p className="text-gray-600">Drag and drop sections to create custom reports</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {reportSections.map((section) => {
                    const IconComponent = section.icon;
                    return (
                      <div
                        key={section.id}
                        className="border border-gray-200 rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow"
                        draggable
                      >
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="p-2 bg-gray-100 rounded-lg">
                            <IconComponent className="w-5 h-5 text-gray-600" />
                          </div>
                          <h4 className="font-medium text-gray-900">{section.name}</h4>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">{section.description}</p>
                        <div className="space-y-1">
                          {section.dataPoints.map((point) => (
                            <div key={point} className="text-xs text-gray-500">• {point}</div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}

          {/* Scheduled Reports Tab */}
          {activeTab === 'schedule' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="space-y-4">
                {mockTemplates.filter(t => t.schedule).map((template) => (
                  <div key={template.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900">{template.name}</h4>
                        <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                          <span>Schedule: {template.schedule}</span>
                          <span>Last run: {template.lastGenerated?.toLocaleDateString()}</span>
                          <span>Recipients: {template.recipients.length}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button className="p-2 text-gray-400 hover:text-green-600 transition-colors">
                          <Play className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-yellow-600 transition-colors">
                          <Pause className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                          <Settings className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
} 