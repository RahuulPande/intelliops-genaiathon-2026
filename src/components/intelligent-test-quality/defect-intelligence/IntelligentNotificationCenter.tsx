'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bell, 
  X, 
  TestTube, 
  FileText, 
  AlertTriangle, 
  CheckCircle,
  Clock,
  User,
  Calendar,
  Settings,
  BellRing
} from 'lucide-react';
import { mockNotificationTemplates } from '@/lib/mock-data/intelligentMonitoringData';

interface Notification {
  id: string;
  type: 'test-reexecution' | 'documentation-quality' | 'ai-learning' | 'general';
  title: string;
  message: string;
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  timestamp: string;
  defectId?: string;
  assignee?: string;
  isRead: boolean;
  actions: NotificationAction[];
}

interface NotificationAction {
  label: string;
  type: 'primary' | 'secondary' | 'danger';
  action: () => void;
}

export default function IntelligentNotificationCenter() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [filter, setFilter] = useState<'all' | 'unread' | 'critical'>('all');

  // Mock notifications - in real app this would come from API/WebSocket
  useEffect(() => {
    const mockNotifications: Notification[] = [
      {
        id: 'notif-1',
        type: 'test-reexecution',
        title: '🔄 Test Re-execution Required: DEF-2847',
        message: 'Payment Gateway Timeout was fixed 3 days ago, but 2 related test cases haven\'t been re-executed. Please prioritize re-execution to ensure the fix is properly validated.',
        severity: 'Critical',
        timestamp: '2026-08-05T09:30:00Z',
        defectId: 'DEF-2847',
        assignee: 'sarah.tester@company.com',
        isRead: false,
        actions: [
          {
            label: 'Mark for re-execution',
            type: 'primary',
            action: () => alert('Marked for re-execution')
          },
          {
            label: 'Schedule test run',
            type: 'secondary',
            action: () => alert('Test run scheduled')
          },
          {
            label: 'Snooze for 4 hours',
            type: 'secondary',
            action: () => alert('Snoozed for 4 hours')
          }
        ]
      },
      {
        id: 'notif-2',
        type: 'documentation-quality',
        title: '📝 Documentation Enhancement Needed: DEF-2849',
        message: 'Database Connection Pool Exhaustion was closed but lacks sufficient documentation for future AI pattern matching. Enhanced documentation will help the system automatically suggest solutions for similar issues in the future.',
        severity: 'High',
        timestamp: '2026-08-05T08:15:00Z',
        defectId: 'DEF-2849',
        assignee: 'dev.team.lead@company.com',
        isRead: false,
        actions: [
          {
            label: 'Use AI Documentation Assistant',
            type: 'primary',
            action: () => alert('AI Assistant opened')
          },
          {
            label: 'Add detailed comments',
            type: 'secondary',
            action: () => alert('Comment editor opened')
          },
          {
            label: 'Request team lead review',
            type: 'secondary',
            action: () => alert('Team lead notified')
          }
        ]
      },
      {
        id: 'notif-3',
        type: 'ai-learning',
        title: '🤖 AI Learning Opportunity: DEF-2850',
        message: 'Memory Leak documentation can be enhanced to improve AI matching accuracy by +50% for similar issues. Quick enhancement available.',
        severity: 'Medium',
        timestamp: '2026-08-05T07:45:00Z',
        defectId: 'DEF-2850',
        isRead: true,
        actions: [
          {
            label: 'Enhance with AI',
            type: 'primary',
            action: () => alert('AI enhancement applied')
          },
          {
            label: 'Review suggestions',
            type: 'secondary',
            action: () => alert('Suggestions reviewed')
          }
        ]
      },
      {
        id: 'notif-4',
        type: 'test-reexecution',
        title: '🔄 Test Re-execution Required: DEF-2851',
        message: 'Login Session Timeout was fixed 2 days ago. Session Management Test Suite needs re-execution.',
        severity: 'High',
        timestamp: '2026-08-05T06:20:00Z',
        defectId: 'DEF-2851',
        assignee: 'alex.tester@company.com',
        isRead: true,
        actions: [
          {
            label: 'Schedule execution',
            type: 'primary',
            action: () => alert('Execution scheduled')
          }
        ]
      }
    ];

    setNotifications(mockNotifications);
  }, []);

  const filteredNotifications = notifications.filter(notification => {
    switch (filter) {
      case 'unread':
        return !notification.isRead;
      case 'critical':
        return notification.severity === 'Critical';
      default:
        return true;
    }
  });

  const unreadCount = notifications.filter(n => !n.isRead).length;
  const criticalCount = notifications.filter(n => n.severity === 'Critical' && !n.isRead).length;

  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(notification => 
      notification.id === id ? { ...notification, isRead: true } : notification
    ));
  };

  const dismissNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Critical': return 'border-l-red-500 bg-red-50';
      case 'High': return 'border-l-orange-500 bg-orange-50';
      case 'Medium': return 'border-l-yellow-500 bg-yellow-50';
      default: return 'border-l-blue-500 bg-blue-50';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'test-reexecution': return TestTube;
      case 'documentation-quality': return FileText;
      case 'ai-learning': return BellRing;
      default: return Bell;
    }
  };

  return (
    <div className="relative">
      {/* Notification Bell */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors"
      >
        <Bell className="w-6 h-6 text-gray-600" />
        {unreadCount > 0 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
          >
            {unreadCount > 9 ? '9+' : unreadCount}
          </motion.div>
        )}
        {criticalCount > 0 && (
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full"
          />
        )}
      </button>

      {/* Notification Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 top-12 w-96 bg-white rounded-lg shadow-xl border border-gray-200 z-50"
          >
            {/* Header */}
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-gray-900">Intelligent Notifications</h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded hover:bg-gray-100 transition-colors"
                >
                  <X className="w-4 h-4 text-gray-500" />
                </button>
              </div>
              
              {/* Filter Tabs */}
              <div className="flex space-x-1">
                {[
                  { id: 'all', label: 'All', count: notifications.length },
                  { id: 'unread', label: 'Unread', count: unreadCount },
                  { id: 'critical', label: 'Critical', count: criticalCount }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setFilter(tab.id as any)}
                    className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                      filter === tab.id
                        ? 'bg-purple-100 text-purple-700'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {tab.label} {tab.count > 0 && `(${tab.count})`}
                  </button>
                ))}
              </div>
            </div>

            {/* Notifications List */}
            <div className="max-h-96 overflow-y-auto">
              {filteredNotifications.length === 0 ? (
                <div className="p-6 text-center text-gray-500">
                  <Bell className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                  <p>No notifications to display</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-200">
                  {filteredNotifications.map((notification) => {
                    const TypeIcon = getTypeIcon(notification.type);
                    
                    return (
                      <motion.div
                        key={notification.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className={`p-4 border-l-4 ${getSeverityColor(notification.severity)} ${
                          !notification.isRead ? 'bg-opacity-100' : 'bg-opacity-50'
                        }`}
                      >
                        <div className="flex items-start space-x-3">
                          <TypeIcon className={`w-5 h-5 mt-0.5 ${
                            notification.severity === 'Critical' ? 'text-red-600' :
                            notification.severity === 'High' ? 'text-orange-600' :
                            notification.severity === 'Medium' ? 'text-yellow-600' : 'text-blue-600'
                          }`} />
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between">
                              <h4 className={`text-sm font-medium ${
                                !notification.isRead ? 'text-gray-900' : 'text-gray-700'
                              }`}>
                                {notification.title}
                              </h4>
                              <button
                                onClick={() => dismissNotification(notification.id)}
                                className="p-1 rounded hover:bg-gray-200 transition-colors ml-2"
                              >
                                <X className="w-3 h-3 text-gray-400" />
                              </button>
                            </div>
                            
                            <p className="text-xs text-gray-600 mt-1 line-clamp-3">
                              {notification.message}
                            </p>
                            
                            <div className="flex items-center space-x-3 mt-2 text-xs text-gray-500">
                              <div className="flex items-center space-x-1">
                                <Clock className="w-3 h-3" />
                                <span>{new Date(notification.timestamp).toLocaleTimeString()}</span>
                              </div>
                              {notification.assignee && (
                                <div className="flex items-center space-x-1">
                                  <User className="w-3 h-3" />
                                  <span>{notification.assignee}</span>
                                </div>
                              )}
                              {notification.defectId && (
                                <span className="font-mono bg-gray-100 px-1 rounded">
                                  {notification.defectId}
                                </span>
                              )}
                            </div>
                            
                            {/* Actions */}
                            <div className="flex flex-wrap gap-1 mt-3">
                              {notification.actions.slice(0, 2).map((action, index) => (
                                <button
                                  key={index}
                                  onClick={() => {
                                    action.action();
                                    markAsRead(notification.id);
                                  }}
                                  className={`px-2 py-1 text-xs rounded transition-colors ${
                                    action.type === 'primary'
                                      ? 'bg-purple-600 text-white hover:bg-purple-700'
                                      : action.type === 'danger'
                                      ? 'bg-red-600 text-white hover:bg-red-700'
                                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                  }`}
                                >
                                  {action.label}
                                </button>
                              ))}
                              {!notification.isRead && (
                                <button
                                  onClick={() => markAsRead(notification.id)}
                                  className="px-2 py-1 text-xs text-gray-600 hover:text-gray-800 transition-colors"
                                >
                                  Mark as read
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-3 border-t border-gray-200 bg-gray-50 rounded-b-lg">
              <div className="flex items-center justify-between text-xs text-gray-600">
                <span>{filteredNotifications.length} notifications</span>
                <button className="flex items-center space-x-1 hover:text-gray-800 transition-colors">
                  <Settings className="w-3 h-3" />
                  <span>Settings</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}