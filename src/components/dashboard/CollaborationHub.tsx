'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Bell,
  MessageCircle,
  Users,
  Search,
  CheckCircle,
  Clock,
  AlertTriangle,
  BookOpen,
  Calendar,
  User,
  Filter,
  Star,
  Eye,
  ThumbsUp,
  FileText,
  UserCheck,
  UserX,
  Zap,
  Target,
  ArrowRight,
  Plus
} from 'lucide-react';
import useDashboardStore from '@/store/dashboard';

interface CollaborationMetrics {
  totalNotifications: number;
  unreadNotifications: number;
  pendingActions: number;
  activeHandovers: number;
  teamAvailability: number;
  knowledgeViews: number;
}

export default function CollaborationHub() {
  const { teamNotifications, handoverNotes, knowledgeArticles, actionItems, teamCollaborationMembers } = useDashboardStore();
  const [activeTab, setActiveTab] = useState<'notifications' | 'handovers' | 'knowledge' | 'actions' | 'team'>('notifications');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterPriority, setFilterPriority] = useState<string>('all');

  // Mock collaboration data
  const mockNotifications = useMemo(() => [
    {
      id: '1',
      type: 'incident' as const,
      title: 'High Severity Incident - Payment Gateway Down',
      message: 'Payment processing is currently experiencing issues. Immediate attention required.',
      priority: 'urgent' as const,
      from: 'System Alert',
      timestamp: new Date(Date.now() - 15 * 60 * 1000),
      isRead: false,
      actionRequired: true,
      relatedIncidentId: 'INC-001'
    },
    {
      id: '2',
      type: 'deployment' as const,
      title: 'Production Deployment Completed',
      message: 'Release v2.1.4 has been successfully deployed to production environment.',
      priority: 'medium' as const,
      from: 'DevOps Pipeline',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      isRead: true,
      actionRequired: false
    },
    {
      id: '3',
      type: 'handover' as const,
      title: 'Night Shift Handover Available',
      message: 'Night shift handover notes from Alice Johnson are ready for review.',
      priority: 'medium' as const,
      from: 'Alice Johnson',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      isRead: false,
      actionRequired: true
    },
    {
      id: '4',
      type: 'meeting' as const,
      title: 'Weekly Incident Review Meeting',
      message: 'Scheduled for tomorrow at 10:00 AM in Conference Room A.',
      priority: 'low' as const,
      from: 'Operations Manager',
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
      isRead: true,
      actionRequired: false
    }
  ], []);

  const mockHandoverNotes = useMemo(() => [
    {
      id: '1',
      shiftFrom: 'Alice Johnson (Day Shift)',
      shiftTo: 'Bob Smith (Night Shift)',
      date: new Date(Date.now() - 8 * 60 * 60 * 1000),
      summary: 'Routine monitoring shift with one minor incident resolved.',
      activeIncidents: ['INC-001: Payment Gateway Timeout'],
      completedTasks: [
        'Completed database maintenance window',
        'Updated security patches on web servers',
        'Resolved ticket #2341 - User login issues'
      ],
      pendingActions: [
        'Monitor payment gateway performance',
        'Follow up on memory usage alerts',
        'Schedule maintenance for next week'
      ],
      importantNotes: 'Payment gateway showing intermittent timeouts. Engineering team aware. Escalate if error rate exceeds 5%.',
      systemStatus: 'degraded' as const
    },
    {
      id: '2',
      shiftFrom: 'Carol Davis (Night Shift)',
      shiftTo: 'Alice Johnson (Day Shift)',
      date: new Date(Date.now() - 16 * 60 * 60 * 1000),
      summary: 'Quiet night with automated backups completed successfully.',
      activeIncidents: [],
      completedTasks: [
        'Monitored database backup completion',
        'Reviewed and acknowledged all alerts',
        'Updated incident documentation'
      ],
      pendingActions: [
        'Review backup logs for anomalies',
        'Test disaster recovery procedures'
      ],
      importantNotes: 'All systems stable. No escalations required.',
      systemStatus: 'normal' as const
    }
  ], []);

  const mockKnowledgeArticles = useMemo(() => [
    {
      id: '1',
      title: 'Payment Gateway Troubleshooting Guide',
      content: 'Step-by-step guide for diagnosing and resolving payment gateway issues...',
      category: 'troubleshooting' as const,
      tags: ['payment', 'gateway', 'timeout', 'troubleshooting'],
      author: 'John Doe',
      createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      views: 145,
      helpful: 23,
      difficulty: 'intermediate' as const
    },
    {
      id: '2',
      title: 'Database Performance Optimization Best Practices',
      content: 'Comprehensive guide to optimizing database performance in production...',
      category: 'best-practices' as const,
      tags: ['database', 'performance', 'optimization'],
      author: 'Jane Smith',
      createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),
      updatedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
      views: 89,
      helpful: 17,
      difficulty: 'advanced' as const
    },
    {
      id: '3',
      title: 'Incident Response Procedures',
      content: 'Standard operating procedures for handling various types of incidents...',
      category: 'procedures' as const,
      tags: ['incident', 'response', 'escalation', 'procedures'],
      author: 'Operations Team',
      createdAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000),
      updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      views: 234,
      helpful: 45,
      difficulty: 'beginner' as const
    }
  ], []);

  const mockActionItems = useMemo(() => [
    {
      id: '1',
      title: 'Investigate Payment Gateway Timeout Issues',
      description: 'Analyze logs and performance metrics to identify root cause of intermittent timeouts.',
      assignee: 'Bob Smith',
      assignedBy: 'Alice Johnson',
      priority: 'urgent' as const,
      status: 'in-progress' as const,
      dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000),
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
      relatedIncidentId: 'INC-001',
      category: 'incident-followup' as const
    },
    {
      id: '2',
      title: 'Update Incident Response Documentation',
      description: 'Revise procedures based on lessons learned from recent incidents.',
      assignee: 'Carol Davis',
      assignedBy: 'Operations Manager',
      priority: 'medium' as const,
      status: 'open' as const,
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
      category: 'improvement' as const
    },
    {
      id: '3',
      title: 'Schedule Database Maintenance Window',
      description: 'Coordinate with stakeholders for planned maintenance next weekend.',
      assignee: 'David Wilson',
      assignedBy: 'DBA Team',
      priority: 'medium' as const,
      status: 'completed' as const,
      dueDate: new Date(Date.now() - 24 * 60 * 60 * 1000),
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      category: 'maintenance' as const
    }
  ], []);

  const mockTeamMembers = useMemo(() => [
    {
      id: '1',
      name: 'Alice Johnson',
      role: 'Senior Operations Engineer',
      email: 'alice.johnson@company.com',
      avatar: '👩‍💻',
      status: 'available' as const,
      shift: 'Day (8 AM - 4 PM)',
      skills: ['Incident Response', 'Database Management', 'Monitoring'],
      currentTasks: ['Monitor payment gateway', 'Review security alerts'],
      lastActivity: new Date(Date.now() - 30 * 60 * 1000)
    },
    {
      id: '2',
      name: 'Bob Smith',
      role: 'Operations Engineer',
      email: 'bob.smith@company.com',
      avatar: '👨‍💻',
      status: 'busy' as const,
      shift: 'Night (4 PM - 12 AM)',
      skills: ['Network Troubleshooting', 'Performance Analysis'],
      currentTasks: ['Investigate payment issues', 'Weekly maintenance'],
      lastActivity: new Date(Date.now() - 5 * 60 * 1000)
    },
    {
      id: '3',
      name: 'Carol Davis',
      role: 'Senior Operations Engineer',
      email: 'carol.davis@company.com',
      avatar: '👩‍🔧',
      status: 'away' as const,
      shift: 'Night (12 AM - 8 AM)',
      skills: ['Security', 'Automation', 'Documentation'],
      currentTasks: ['Update procedures', 'Security review'],
      lastActivity: new Date(Date.now() - 2 * 60 * 60 * 1000)
    },
    {
      id: '4',
      name: 'David Wilson',
      role: 'Database Administrator',
      email: 'david.wilson@company.com',
      avatar: '👨‍🔧',
      status: 'offline' as const,
      shift: 'Day (9 AM - 5 PM)',
      skills: ['Database Administration', 'Backup Management'],
      currentTasks: [],
      lastActivity: new Date(Date.now() - 8 * 60 * 60 * 1000)
    }
  ], []);

  // Calculate metrics
  const collaborationMetrics = useMemo((): CollaborationMetrics => {
    const totalNotifications = mockNotifications.length;
    const unreadNotifications = mockNotifications.filter(n => !n.isRead).length;
    const pendingActions = mockActionItems.filter(a => a.status === 'open' || a.status === 'in-progress').length;
    const activeHandovers = mockHandoverNotes.length;
    const availableMembers = mockTeamMembers.filter(m => m.status === 'available').length;
    const teamAvailability = Math.round((availableMembers / mockTeamMembers.length) * 100);
    const knowledgeViews = mockKnowledgeArticles.reduce((sum, article) => sum + article.views, 0);

    return {
      totalNotifications,
      unreadNotifications,
      pendingActions,
      activeHandovers,
      teamAvailability,
      knowledgeViews
    };
  }, [mockNotifications, mockActionItems, mockHandoverNotes, mockTeamMembers, mockKnowledgeArticles]);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'incident': return AlertTriangle;
      case 'deployment': return Zap;
      case 'handover': return Users;
      case 'meeting': return Calendar;
      case 'announcement': return Bell;
      default: return MessageCircle;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'text-red-600 bg-red-100 border-red-200';
      case 'high': return 'text-orange-600 bg-orange-100 border-orange-200';
      case 'medium': return 'text-yellow-600 bg-yellow-100 border-yellow-200';
      case 'low': return 'text-blue-600 bg-blue-100 border-blue-200';
      default: return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'text-green-600 bg-green-100';
      case 'busy': return 'text-yellow-600 bg-yellow-100';
      case 'away': return 'text-orange-600 bg-orange-100';
      case 'offline': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getActionStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100';
      case 'in-progress': return 'text-blue-600 bg-blue-100';
      case 'blocked': return 'text-red-600 bg-red-100';
      case 'open': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'text-green-600 bg-green-100';
      case 'intermediate': return 'text-yellow-600 bg-yellow-100';
      case 'advanced': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getSystemStatusColor = (status: string) => {
    switch (status) {
      case 'normal': return 'text-green-600 bg-green-100';
      case 'degraded': return 'text-yellow-600 bg-yellow-100';
      case 'critical': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const filteredNotifications = mockNotifications.filter(notification => {
    if (filterPriority !== 'all' && notification.priority !== filterPriority) return false;
    if (searchQuery && !notification.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Team Collaboration Hub</h2>
          <p className="text-gray-600 mt-1">Team notifications, handovers, knowledge base, and action tracking</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
            <Plus className="w-4 h-4" />
            <span>New Item</span>
          </button>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: 'Unread Notifications', value: collaborationMetrics.unreadNotifications, icon: Bell, color: 'text-red-600', total: collaborationMetrics.totalNotifications },
          { title: 'Pending Actions', value: collaborationMetrics.pendingActions, icon: Target, color: 'text-orange-600', total: mockActionItems.length },
          { title: 'Team Availability', value: `${collaborationMetrics.teamAvailability}%`, icon: Users, color: 'text-green-600', total: mockTeamMembers.length },
          { title: 'Knowledge Views', value: collaborationMetrics.knowledgeViews, icon: BookOpen, color: 'text-blue-600', total: mockKnowledgeArticles.length }
        ].map((metric, index) => {
          const IconComponent = metric.icon;
          return (
            <motion.div
              key={metric.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-lg p-6 border border-gray-200 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center justify-between mb-2">
                <div className={`p-3 rounded-lg bg-gray-50 ${metric.color}`}>
                  <IconComponent className="w-6 h-6" />
                </div>
              </div>
              <h3 className="text-sm font-medium text-gray-600">{metric.title}</h3>
              <p className="text-3xl font-bold text-gray-900 mt-1">{metric.value}</p>
              {metric.total && (
                <p className="text-xs text-gray-500 mt-1">of {metric.total} total</p>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="flex space-x-1 p-1 bg-gray-100 rounded-t-lg">
          {[
            { id: 'notifications', label: 'Notifications', icon: Bell },
            { id: 'handovers', label: 'Handovers', icon: Users },
            { id: 'knowledge', label: 'Knowledge Base', icon: BookOpen },
            { id: 'actions', label: 'Action Items', icon: Target },
            { id: 'team', label: 'Team Status', icon: UserCheck }
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
          {/* Notifications Tab */}
          {activeTab === 'notifications' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Team Notifications</h3>
                <select
                  value={filterPriority}
                  onChange={(e) => setFilterPriority(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm bg-white"
                >
                  <option value="all">All Priorities</option>
                  <option value="urgent">Urgent</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>
              <div className="space-y-3">
                {filteredNotifications.map((notification) => {
                  const IconComponent = getNotificationIcon(notification.type);
                  return (
                    <div
                      key={notification.id}
                      className={`p-4 border rounded-lg ${
                        !notification.isRead ? 'bg-blue-50 border-blue-200' : 'bg-white border-gray-200'
                      } hover:shadow-md transition-shadow`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`p-2 rounded-lg ${getPriorityColor(notification.priority)}`}>
                          <IconComponent className="w-4 h-4" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-medium text-gray-900">{notification.title}</h4>
                            <span className="text-xs text-gray-500">
                              {notification.timestamp.toLocaleTimeString()}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{notification.message}</p>
                          <div className="flex items-center space-x-3 text-xs text-gray-500">
                            <span>From: {notification.from}</span>
                            <span className={`px-2 py-1 rounded-full ${getPriorityColor(notification.priority)}`}>
                              {notification.priority.toUpperCase()}
                            </span>
                            {notification.actionRequired && (
                              <span className="text-red-600 font-medium">Action Required</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* Handovers Tab */}
          {activeTab === 'handovers' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Shift Handover Notes</h3>
              <div className="space-y-4">
                {mockHandoverNotes.map((handover) => (
                  <div key={handover.id} className="border border-gray-200 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h4 className="font-medium text-gray-900">{handover.shiftFrom} → {handover.shiftTo}</h4>
                        <p className="text-sm text-gray-600">{handover.date.toLocaleString()}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getSystemStatusColor(handover.systemStatus)}`}>
                        {handover.systemStatus.toUpperCase()}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <h5 className="font-medium text-gray-900 mb-2">Active Incidents</h5>
                        {handover.activeIncidents.length > 0 ? (
                          <ul className="text-sm text-gray-600 space-y-1">
                            {handover.activeIncidents.map((incident, i) => (
                              <li key={i} className="flex items-center space-x-2">
                                <AlertTriangle className="w-3 h-3 text-red-500" />
                                <span>{incident}</span>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-sm text-gray-500">No active incidents</p>
                        )}
                      </div>
                      
                      <div>
                        <h5 className="font-medium text-gray-900 mb-2">Completed Tasks</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {handover.completedTasks.map((task, i) => (
                            <li key={i} className="flex items-center space-x-2">
                              <CheckCircle className="w-3 h-3 text-green-500" />
                              <span>{task}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h5 className="font-medium text-gray-900 mb-2">Pending Actions</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {handover.pendingActions.map((action, i) => (
                            <li key={i} className="flex items-center space-x-2">
                              <Clock className="w-3 h-3 text-yellow-500" />
                              <span>{action}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 rounded-lg p-3">
                      <h5 className="font-medium text-gray-900 mb-1">Important Notes</h5>
                      <p className="text-sm text-gray-600">{handover.importantNotes}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Knowledge Base Tab */}
          {activeTab === 'knowledge' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Knowledge Base</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {mockKnowledgeArticles.map((article) => (
                  <div key={article.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(article.difficulty)}`}>
                        {article.difficulty}
                      </span>
                      <span className="text-xs text-gray-500">{article.category}</span>
                    </div>
                    
                    <h4 className="font-medium text-gray-900 mb-2">{article.title}</h4>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{article.content}</p>
                    
                    <div className="flex flex-wrap gap-1 mb-3">
                      {article.tags.map((tag) => (
                        <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>By {article.author}</span>
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-1">
                          <Eye className="w-3 h-3" />
                          <span>{article.views}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <ThumbsUp className="w-3 h-3" />
                          <span>{article.helpful}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Action Items Tab */}
          {activeTab === 'actions' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Action Items</h3>
              <div className="space-y-3">
                {mockActionItems.map((action) => (
                  <div key={action.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(action.priority)}`}>
                            {action.priority.toUpperCase()}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getActionStatusColor(action.status)}`}>
                            {action.status.replace('-', ' ').toUpperCase()}
                          </span>
                          <span className="text-xs text-gray-500">{action.category.replace('-', ' ')}</span>
                        </div>
                        
                        <h4 className="font-medium text-gray-900 mb-1">{action.title}</h4>
                        <p className="text-sm text-gray-600 mb-3">{action.description}</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="text-gray-600">Assignee:</span>
                            <div className="font-medium text-gray-900">{action.assignee}</div>
                          </div>
                          <div>
                            <span className="text-gray-600">Due Date:</span>
                            <div className="font-medium text-gray-900">{action.dueDate.toLocaleDateString()}</div>
                          </div>
                          <div>
                            <span className="text-gray-600">Assigned By:</span>
                            <div className="font-medium text-gray-900">{action.assignedBy}</div>
                          </div>
                        </div>
                      </div>
                      
                      <button className="ml-4 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                        Update
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Team Status Tab */}
          {activeTab === 'team' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Team Availability</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mockTeamMembers.map((member) => (
                  <div key={member.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="text-2xl">{member.avatar}</div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{member.name}</h4>
                        <p className="text-sm text-gray-600">{member.role}</p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(member.status)}`}>
                        {member.status.toUpperCase()}
                      </span>
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="text-gray-600">Shift:</span>
                        <span className="ml-2 text-gray-900">{member.shift}</span>
                      </div>
                      
                      <div>
                        <span className="text-gray-600">Skills:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {member.skills.map((skill) => (
                            <span key={skill} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      {member.currentTasks.length > 0 && (
                        <div>
                          <span className="text-gray-600">Current Tasks:</span>
                          <ul className="mt-1 space-y-1">
                            {member.currentTasks.map((task, i) => (
                              <li key={i} className="text-gray-700 text-xs">• {task}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      <div className="text-xs text-gray-500">
                        Last activity: {member.lastActivity.toLocaleString()}
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