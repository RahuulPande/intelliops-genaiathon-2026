'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  AlertTriangle, 
  XCircle, 
  Info, 
  CheckCircle,
  X,
  Users,
  Clock,
  Building,
  Zap,
  Volume2,
  VolumeX,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import useDashboardStore from '@/store/dashboard';
import { Alert, Incident } from '@/lib/types';

interface GroupedAlert {
  id: string;
  type: string;
  title: string;
  message: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  timestamp: Date;
  count: number;
  serviceIds: string[];
  acknowledged: boolean;
  acknowledgedBy?: string;
  acknowledgedAt?: Date;
  relatedAlerts: Alert[];
}

export default function AlertsPanel() {
  const {
    alerts,
    incidents,
    services,
    addAlert,
    acknowledgeAlert,
    dismissAlert
  } = useDashboardStore();

  const [soundEnabled, setSoundEnabled] = useState(true);
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());
  const [filter, setFilter] = useState<'all' | 'critical' | 'unacknowledged'>('all');

  // Group similar alerts together
  const groupedAlerts = useMemo(() => {
    const groups = new Map<string, GroupedAlert>();
    
    alerts.forEach(alert => {
      // Create a key for grouping similar alerts
      const groupKey = `${alert.type}-${alert.severity}-${alert.serviceId}`;
      
      if (groups.has(groupKey)) {
        const existing = groups.get(groupKey)!;
        existing.count += 1;
        existing.relatedAlerts.push(alert);
        // Use the most recent timestamp
        if (alert.timestamp > existing.timestamp) {
          existing.timestamp = alert.timestamp;
        }
      } else {
        groups.set(groupKey, {
          id: alert.id,
          type: alert.type,
          title: alert.title,
          message: alert.message,
          severity: alert.severity,
          timestamp: alert.timestamp,
          count: 1,
          serviceIds: alert.serviceId ? [alert.serviceId] : [],
          acknowledged: alert.acknowledged,
          acknowledgedBy: alert.acknowledgedBy,
          acknowledgedAt: alert.acknowledgedAt,
          relatedAlerts: [alert]
        });
      }
    });

    return Array.from(groups.values()).sort((a, b) => {
      // Sort by severity first, then by timestamp
      const severityOrder = { critical: 4, high: 3, medium: 2, low: 1 };
      const severityDiff = severityOrder[b.severity] - severityOrder[a.severity];
      if (severityDiff !== 0) return severityDiff;
      return b.timestamp.getTime() - a.timestamp.getTime();
    });
  }, [alerts]);

  // Filter alerts based on current filter
  const filteredAlerts = useMemo(() => {
    switch (filter) {
      case 'critical':
        return groupedAlerts.filter(alert => alert.severity === 'critical');
      case 'unacknowledged':
        return groupedAlerts.filter(alert => !alert.acknowledged);
      default:
        return groupedAlerts;
    }
  }, [groupedAlerts, filter]);

  // Sound notification for critical alerts
  const playNotificationSound = useCallback(() => {
    if (!soundEnabled) return;
    
    // Create a simple beep sound using Web Audio API
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.value = 800;
      oscillator.type = 'sine';
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.5);
    } catch (error) {
      console.warn('Could not play notification sound:', error);
    }
  }, [soundEnabled]);

  // Watch for new critical alerts
  useEffect(() => {
    const criticalAlerts = alerts.filter(alert => 
      alert.severity === 'critical' && 
      !alert.acknowledged &&
      Date.now() - alert.timestamp.getTime() < 5000 // New in last 5 seconds
    );
    
    if (criticalAlerts.length > 0) {
      playNotificationSound();
    }
  }, [alerts, playNotificationSound]);

  // Auto-dismiss low priority alerts after 5 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      alerts.forEach(alert => {
        if (
          alert.severity === 'low' && 
          !alert.acknowledged && 
          now - alert.timestamp.getTime() > 5 * 60 * 1000 // 5 minutes
        ) {
          dismissAlert(alert.id);
        }
      });
    }, 30000); // Check every 30 seconds

    return () => clearInterval(interval);
  }, [alerts, dismissAlert]);

  const handleAcknowledge = (alert: GroupedAlert) => {
    // Acknowledge all alerts in the group
    alert.relatedAlerts.forEach(relatedAlert => {
      acknowledgeAlert(relatedAlert.id, 'Current User');
    });
  };

  const handleDismiss = (alert: GroupedAlert) => {
    // Dismiss all alerts in the group
    alert.relatedAlerts.forEach(relatedAlert => {
      dismissAlert(relatedAlert.id);
    });
  };

  const toggleGroup = (alertId: string) => {
    const newExpanded = new Set(expandedGroups);
    if (newExpanded.has(alertId)) {
      newExpanded.delete(alertId);
    } else {
      newExpanded.add(alertId);
    }
    setExpandedGroups(newExpanded);
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical':
        return <XCircle className="w-5 h-5 text-red-500" />;
      case 'high':
        return <AlertTriangle className="w-5 h-5 text-orange-500" />;
      case 'medium':
        return <Info className="w-5 h-5 text-yellow-500" />;
      case 'low':
        return <CheckCircle className="w-5 h-5 text-blue-500" />;
      default:
        return <Info className="w-5 h-5 text-gray-500" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'border-red-500 bg-red-50';
      case 'high':
        return 'border-orange-500 bg-orange-50';
      case 'medium':
        return 'border-yellow-500 bg-yellow-50';
      case 'low':
        return 'border-blue-500 bg-blue-50';
      default:
        return 'border-gray-500 bg-gray-50';
    }
  };

  const getServiceName = (serviceId: string) => {
    const service = services.find(s => s.id === serviceId);
    return service?.name || 'Unknown Service';
  };

  const activeIncidents = incidents.filter(incident => 
    incident.status !== 'resolved' && 
    Date.now() - incident.createdAt.getTime() < 24 * 60 * 60 * 1000 // Last 24 hours
  );

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Zap className="w-6 h-6 text-yellow-500" />
            <h2 className="text-xl font-semibold text-gray-900">
              Real-Time Alerts & Incidents
            </h2>
            {filteredAlerts.filter(a => !a.acknowledged).length > 0 && (
              <span className="bg-red-100 text-red-800 text-sm font-medium px-2.5 py-0.5 rounded-full">
                {filteredAlerts.filter(a => !a.acknowledged).length} Active
              </span>
            )}
          </div>
          
          <div className="flex items-center space-x-3">
            {/* Sound Toggle */}
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className={`p-2 rounded-lg transition-colors ${
                soundEnabled 
                  ? 'bg-green-100 text-green-600 hover:bg-green-200' 
                  : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
              }`}
              title={soundEnabled ? 'Disable sound notifications' : 'Enable sound notifications'}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Filter Buttons */}
            <div className="flex rounded-lg border border-gray-300 overflow-hidden">
              {[
                { key: 'all', label: 'All' },
                { key: 'critical', label: 'Critical' },
                { key: 'unacknowledged', label: 'Active' }
              ].map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => setFilter(key as any)}
                  className={`px-3 py-1 text-sm font-medium transition-colors ${
                    filter === key
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Incidents Timeline */}
      {activeIncidents.length > 0 && (
        <div className="px-6 py-4 bg-red-50 border-b border-red-200">
          <h3 className="text-sm font-semibold text-red-900 mb-2 flex items-center">
            <Building className="w-4 h-4 mr-2" />
            Active Incidents ({activeIncidents.length})
          </h3>
          <div className="space-y-2">
            {activeIncidents.slice(0, 3).map((incident) => (
              <div key={incident.id} className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${
                    incident.severity === 'critical' ? 'bg-red-500' :
                    incident.severity === 'high' ? 'bg-orange-500' :
                    'bg-yellow-500'
                  }`} />
                  <span className="font-medium text-red-900">{incident.title}</span>
                  <span className="text-red-600">
                    {incident.affectedServices.length} service{incident.affectedServices.length !== 1 ? 's' : ''}
                  </span>
                </div>
                <div className="flex items-center space-x-2 text-red-600">
                  <Clock className="w-3 h-3" />
                  <span>{Math.round((Date.now() - incident.createdAt.getTime()) / 60000)}m ago</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Alerts List */}
      <div className="max-h-96 overflow-y-auto">
        <AnimatePresence mode="popLayout">
          {filteredAlerts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-12 text-gray-500"
            >
              <CheckCircle className="w-12 h-12 mb-4" />
              <p className="text-lg font-medium">All Clear!</p>
              <p className="text-sm">No active alerts at the moment</p>
            </motion.div>
          ) : (
            filteredAlerts.map((alert, index) => (
              <motion.div
                key={alert.id}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className={`border-l-4 p-4 ${getSeverityColor(alert.severity)} ${
                  index !== filteredAlerts.length - 1 ? 'border-b border-gray-200' : ''
                } ${alert.acknowledged ? 'opacity-60' : ''}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3 flex-1">
                    <div className="flex-shrink-0 mt-0.5">
                      {getSeverityIcon(alert.severity)}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="text-sm font-semibold text-gray-900 truncate">
                          {alert.title}
                        </h4>
                        {alert.count > 1 && (
                          <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2 py-1 rounded-full">
                            {alert.count}×
                          </span>
                        )}
                        {alert.acknowledged && (
                          <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">
                            ✓ Acknowledged
                          </span>
                        )}
                      </div>
                      
                      <p className="text-sm text-gray-700 mb-2">{alert.message}</p>
                      
                      <div className="flex items-center space-x-4 text-xs text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Clock className="w-3 h-3" />
                          <span>{alert.timestamp.toLocaleTimeString()}</span>
                        </div>
                        
                        {alert.serviceIds.length > 0 && (
                          <div className="flex items-center space-x-1">
                            <Building className="w-3 h-3" />
                            <span>{getServiceName(alert.serviceIds[0])}</span>
                            {alert.serviceIds.length > 1 && (
                              <span>+{alert.serviceIds.length - 1} more</span>
                            )}
                          </div>
                        )}
                        
                        {alert.acknowledgedBy && (
                          <div className="flex items-center space-x-1">
                            <Users className="w-3 h-3" />
                            <span>by {alert.acknowledgedBy}</span>
                          </div>
                        )}
                      </div>

                      {/* Expandable details for grouped alerts */}
                      {alert.count > 1 && (
                        <div className="mt-2">
                          <button
                            onClick={() => toggleGroup(alert.id)}
                            className="flex items-center space-x-1 text-xs text-blue-600 hover:text-blue-800"
                          >
                            {expandedGroups.has(alert.id) ? (
                              <ChevronUp className="w-3 h-3" />
                            ) : (
                              <ChevronDown className="w-3 h-3" />
                            )}
                            <span>
                              {expandedGroups.has(alert.id) ? 'Hide' : 'Show'} {alert.count - 1} similar alert{alert.count - 1 !== 1 ? 's' : ''}
                            </span>
                          </button>
                          
                          <AnimatePresence>
                            {expandedGroups.has(alert.id) && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="mt-2 pl-4 border-l-2 border-gray-200 space-y-1"
                              >
                                {alert.relatedAlerts.slice(1).map((relatedAlert) => (
                                  <div key={relatedAlert.id} className="text-xs text-gray-600">
                                    <span className="font-medium">{relatedAlert.timestamp.toLocaleTimeString()}</span>
                                    {relatedAlert.serviceId && (
                                      <span className="ml-2">{getServiceName(relatedAlert.serviceId)}</span>
                                    )}
                                  </div>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex items-center space-x-2 ml-4">
                    {!alert.acknowledged && (
                      <button
                        onClick={() => handleAcknowledge(alert)}
                        className="p-1.5 text-green-600 hover:bg-green-100 rounded-lg transition-colors"
                        title="Acknowledge alert"
                      >
                        <CheckCircle className="w-4 h-4" />
                      </button>
                    )}
                    
                    <button
                      onClick={() => handleDismiss(alert)}
                      className="p-1.5 text-gray-400 hover:bg-gray-100 rounded-lg transition-colors"
                      title="Dismiss alert"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
} 