'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Settings,
  Bell,
  Palette,
  Shield,
  Monitor,
  User,
  Sliders,
  Wifi,
  Save,
  RotateCcw,
  Moon,
  Sun,
  Eye,
  EyeOff,
  Mail,
  Smartphone,
  MessageSquare,
  Database,
  Clock,
  Globe,
  Lock,
  Key,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  Info
} from 'lucide-react';
import useDashboardStore from '@/store/dashboard';

interface SettingsSection {
  id: string;
  title: string;
  icon: any;
  description: string;
}

export default function SettingsConfiguration() {
  const { 
    userSettings, 
    updateUserSettings, 
    updateTheme, 
    updateNotificationSettings, 
    updateAlertThresholds 
  } = useDashboardStore();

  const [activeSection, setActiveSection] = useState<string>('general');
  const [hasChanges, setHasChanges] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [localSettings, setLocalSettings] = useState(userSettings);

  // Sync local settings with store
  useEffect(() => {
    setLocalSettings(userSettings);
  }, [userSettings]);

  const settingsSections: SettingsSection[] = [
    {
      id: 'general',
      title: 'General',
      icon: Settings,
      description: 'Basic preferences and dashboard behavior'
    },
    {
      id: 'notifications',
      title: 'Notifications',
      icon: Bell,
      description: 'Manage how you receive alerts and updates'
    },
    {
      id: 'appearance',
      title: 'Appearance',
      icon: Palette,
      description: 'Theme and visual customization options'
    },
    {
      id: 'monitoring',
      title: 'Monitoring',
      icon: Monitor,
      description: 'Alert thresholds and monitoring preferences'
    },
    {
      id: 'integrations',
      title: 'Integrations',
      icon: Wifi,
      description: 'Connect with external tools and services'
    },
    {
      id: 'security',
      title: 'Security & Privacy',
      icon: Shield,
      description: 'Security settings and data privacy controls'
    }
  ];

  const handleSettingChange = (section: string, key: string, value: any) => {
    setLocalSettings(prev => ({
      ...prev,
      [section]: {
        ...(prev as any)[section],
        [key]: value
      }
    }));
    setHasChanges(true);
  };

  const handleSave = async () => {
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      updateUserSettings(localSettings);
      setHasChanges(false);
      setIsSaving(false);
    }, 1000);
  };

  const handleReset = () => {
    setLocalSettings(userSettings);
    setHasChanges(false);
  };

  const handleThemeChange = (theme: 'light' | 'dark' | 'auto') => {
    setLocalSettings(prev => ({ ...prev, theme }));
    updateTheme(theme);
    setHasChanges(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Settings & Configuration</h2>
          <p className="text-gray-600 mt-1">Customize your dashboard experience and preferences</p>
        </div>
        
        {hasChanges && (
          <div className="flex items-center space-x-3">
            <button
              onClick={handleReset}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset</span>
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2 disabled:opacity-50"
            >
              {isSaving ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              <span>{isSaving ? 'Saving...' : 'Save Changes'}</span>
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Settings Navigation */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="font-semibold text-gray-900 mb-4">Settings</h3>
            <nav className="space-y-2">
              {settingsSections.map((section) => {
                const IconComponent = section.icon;
                return (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full text-left p-3 rounded-lg transition-colors flex items-center space-x-3 ${
                      activeSection === section.id
                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <IconComponent className="w-5 h-5" />
                    <div>
                      <div className="font-medium text-sm">{section.title}</div>
                      <div className="text-xs text-gray-500">{section.description}</div>
                    </div>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-lg border border-gray-200">
            <div className="p-6">
              {/* General Settings */}
              {activeSection === 'general' && (
                <motion.div
                  key="general"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">General Settings</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="flex items-center justify-between">
                          <div>
                            <span className="text-sm font-medium text-gray-700">Auto Refresh</span>
                            <p className="text-sm text-gray-500">Automatically refresh dashboard data</p>
                          </div>
                          <button
                            onClick={() => handleSettingChange('dashboardPreferences', 'autoRefresh', !localSettings.dashboardPreferences.autoRefresh)}
                            className={`relative w-12 h-6 rounded-full transition-colors ${
                              localSettings.dashboardPreferences.autoRefresh ? 'bg-blue-600' : 'bg-gray-300'
                            }`}
                          >
                            <div
                              className={`absolute w-4 h-4 bg-white rounded-full top-1 transition-transform ${
                                localSettings.dashboardPreferences.autoRefresh ? 'translate-x-7' : 'translate-x-1'
                              }`}
                            />
                          </button>
                        </label>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Refresh Interval
                        </label>
                        <select
                          value={localSettings.dashboardPreferences.refreshInterval}
                          onChange={(e) => handleSettingChange('dashboardPreferences', 'refreshInterval', parseInt(e.target.value))}
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value={10}>10 seconds</option>
                          <option value={30}>30 seconds</option>
                          <option value={60}>1 minute</option>
                          <option value={300}>5 minutes</option>
                          <option value={900}>15 minutes</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Default Time Range
                        </label>
                        <select
                          value={localSettings.dashboardPreferences.defaultTimeRange}
                          onChange={(e) => handleSettingChange('dashboardPreferences', 'defaultTimeRange', e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="1h">Last Hour</option>
                          <option value="6h">Last 6 Hours</option>
                          <option value="24h">Last 24 Hours</option>
                          <option value="7d">Last 7 Days</option>
                          <option value="30d">Last 30 Days</option>
                        </select>
                      </div>

                      <div>
                        <label className="flex items-center justify-between">
                          <div>
                            <span className="text-sm font-medium text-gray-700">Compact Mode</span>
                            <p className="text-sm text-gray-500">Show more data in less space</p>
                          </div>
                          <button
                            onClick={() => handleSettingChange('dashboardPreferences', 'compactMode', !localSettings.dashboardPreferences.compactMode)}
                            className={`relative w-12 h-6 rounded-full transition-colors ${
                              localSettings.dashboardPreferences.compactMode ? 'bg-blue-600' : 'bg-gray-300'
                            }`}
                          >
                            <div
                              className={`absolute w-4 h-4 bg-white rounded-full top-1 transition-transform ${
                                localSettings.dashboardPreferences.compactMode ? 'translate-x-7' : 'translate-x-1'
                              }`}
                            />
                          </button>
                        </label>
                      </div>

                      <div>
                        <label className="flex items-center justify-between">
                          <div>
                            <span className="text-sm font-medium text-gray-700">Animations</span>
                            <p className="text-sm text-gray-500">Enable smooth animations and transitions</p>
                          </div>
                          <button
                            onClick={() => handleSettingChange('dashboardPreferences', 'showAnimations', !localSettings.dashboardPreferences.showAnimations)}
                            className={`relative w-12 h-6 rounded-full transition-colors ${
                              localSettings.dashboardPreferences.showAnimations ? 'bg-blue-600' : 'bg-gray-300'
                            }`}
                          >
                            <div
                              className={`absolute w-4 h-4 bg-white rounded-full top-1 transition-transform ${
                                localSettings.dashboardPreferences.showAnimations ? 'translate-x-7' : 'translate-x-1'
                              }`}
                            />
                          </button>
                        </label>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Notifications Settings */}
              {activeSection === 'notifications' && (
                <motion.div
                  key="notifications"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Notification Preferences</h3>
                    
                    <div className="space-y-4">
                      {[
                        { key: 'email', label: 'Email Notifications', icon: Mail, description: 'Receive alerts via email' },
                        { key: 'push', label: 'Push Notifications', icon: Bell, description: 'Browser push notifications' },
                        { key: 'sms', label: 'SMS Notifications', icon: Smartphone, description: 'Critical alerts via SMS' },
                        { key: 'desktop', label: 'Desktop Notifications', icon: Monitor, description: 'Desktop system notifications' }
                      ].map((notification) => {
                        const IconComponent = notification.icon;
                        return (
                          <div key={notification.key} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                            <div className="flex items-center space-x-3">
                              <div className="p-2 bg-gray-100 rounded-lg">
                                <IconComponent className="w-5 h-5 text-gray-600" />
                              </div>
                              <div>
                                <span className="text-sm font-medium text-gray-700">{notification.label}</span>
                                <p className="text-sm text-gray-500">{notification.description}</p>
                              </div>
                            </div>
                            <button
                              onClick={() => handleSettingChange('notifications', notification.key, !(localSettings.notifications as any)[notification.key])}
                              className={`relative w-12 h-6 rounded-full transition-colors ${
                                (localSettings.notifications as any)[notification.key] ? 'bg-blue-600' : 'bg-gray-300'
                              }`}
                            >
                              <div
                                className={`absolute w-4 h-4 bg-white rounded-full top-1 transition-transform ${
                                  (localSettings.notifications as any)[notification.key] ? 'translate-x-7' : 'translate-x-1'
                                }`}
                              />
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Appearance Settings */}
              {activeSection === 'appearance' && (
                <motion.div
                  key="appearance"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Appearance Settings</h3>
                    
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">Theme</label>
                        <div className="grid grid-cols-3 gap-3">
                          {[
                            { value: 'light', label: 'Light', icon: Sun },
                            { value: 'dark', label: 'Dark', icon: Moon },
                            { value: 'auto', label: 'Auto', icon: Monitor }
                          ].map((theme) => {
                            const IconComponent = theme.icon;
                            return (
                              <button
                                key={theme.value}
                                onClick={() => handleThemeChange(theme.value as 'light' | 'dark' | 'auto')}
                                className={`p-4 border-2 rounded-lg transition-colors flex flex-col items-center space-y-2 ${
                                  localSettings.theme === theme.value
                                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                                    : 'border-gray-200 hover:border-gray-300'
                                }`}
                              >
                                <IconComponent className="w-6 h-6" />
                                <span className="text-sm font-medium">{theme.label}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Monitoring Settings */}
              {activeSection === 'monitoring' && (
                <motion.div
                  key="monitoring"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Alert Thresholds</h3>
                    
                    <div className="space-y-4">
                      {[
                        { key: 'cpu', label: 'CPU Usage', unit: '%', description: 'Alert when CPU usage exceeds this threshold' },
                        { key: 'memory', label: 'Memory Usage', unit: '%', description: 'Alert when memory usage exceeds this threshold' },
                        { key: 'disk', label: 'Disk Usage', unit: '%', description: 'Alert when disk usage exceeds this threshold' },
                        { key: 'responseTime', label: 'Response Time', unit: 'ms', description: 'Alert when response time exceeds this threshold' },
                        { key: 'errorRate', label: 'Error Rate', unit: '%', description: 'Alert when error rate exceeds this threshold' }
                      ].map((threshold) => (
                        <div key={threshold.key} className="p-4 border border-gray-200 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <span className="text-sm font-medium text-gray-700">{threshold.label}</span>
                              <p className="text-sm text-gray-500">{threshold.description}</p>
                            </div>
                            <div className="flex items-center space-x-2">
                              <input
                                type="number"
                                value={(localSettings.alertThresholds as any)[threshold.key]}
                                onChange={(e) => handleSettingChange('alertThresholds', threshold.key, parseInt(e.target.value))}
                                className="w-20 p-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              />
                              <span className="text-sm text-gray-500">{threshold.unit}</span>
                            </div>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full"
                              style={{ width: `${Math.min((localSettings.alertThresholds as any)[threshold.key], 100)}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Integrations Settings */}
              {activeSection === 'integrations' && (
                <motion.div
                  key="integrations"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">External Integrations</h3>
                    
                    <div className="space-y-4">
                      {[
                        { key: 'slack', label: 'Slack', description: 'Send notifications to Slack channels', icon: MessageSquare },
                        { key: 'teams', label: 'Microsoft Teams', description: 'Send notifications to Teams channels', icon: MessageSquare },
                        { key: 'email', label: 'Email SMTP', description: 'Configure email server settings', icon: Mail }
                      ].map((integration) => {
                        const IconComponent = integration.icon;
                        return (
                          <div key={integration.key} className="p-4 border border-gray-200 rounded-lg">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <div className="p-2 bg-gray-100 rounded-lg">
                                  <IconComponent className="w-5 h-5 text-gray-600" />
                                </div>
                                <div>
                                  <span className="text-sm font-medium text-gray-700">{integration.label}</span>
                                  <p className="text-sm text-gray-500">{integration.description}</p>
                                </div>
                              </div>
                              <div className="flex items-center space-x-3">
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  (localSettings.integrations as any)[integration.key].enabled 
                                    ? 'bg-green-100 text-green-700' 
                                    : 'bg-gray-100 text-gray-700'
                                }`}>
                                  {(localSettings.integrations as any)[integration.key].enabled ? 'Connected' : 'Disconnected'}
                                </span>
                                <button
                                  onClick={() => handleSettingChange('integrations', integration.key, {
                                    ...(localSettings.integrations as any)[integration.key],
                                    enabled: !(localSettings.integrations as any)[integration.key].enabled
                                  })}
                                  className="px-3 py-1 text-sm border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                                >
                                  {(localSettings.integrations as any)[integration.key].enabled ? 'Disconnect' : 'Connect'}
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Security Settings */}
              {activeSection === 'security' && (
                <motion.div
                  key="security"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Security & Privacy</h3>
                    
                    <div className="space-y-4">
                      <div className="p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <span className="text-sm font-medium text-gray-700">Data Sharing</span>
                            <p className="text-sm text-gray-500">Allow anonymous analytics to help improve the product</p>
                          </div>
                          <button
                            onClick={() => handleSettingChange('privacy', 'shareAnalytics', !localSettings.privacy.shareAnalytics)}
                            className={`relative w-12 h-6 rounded-full transition-colors ${
                              localSettings.privacy.shareAnalytics ? 'bg-blue-600' : 'bg-gray-300'
                            }`}
                          >
                            <div
                              className={`absolute w-4 h-4 bg-white rounded-full top-1 transition-transform ${
                                localSettings.privacy.shareAnalytics ? 'translate-x-7' : 'translate-x-1'
                              }`}
                            />
                          </button>
                        </div>
                      </div>

                      <div className="p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <span className="text-sm font-medium text-gray-700">Usage Tracking</span>
                            <p className="text-sm text-gray-500">Track usage patterns for performance optimization</p>
                          </div>
                          <button
                            onClick={() => handleSettingChange('privacy', 'trackUsage', !localSettings.privacy.trackUsage)}
                            className={`relative w-12 h-6 rounded-full transition-colors ${
                              localSettings.privacy.trackUsage ? 'bg-blue-600' : 'bg-gray-300'
                            }`}
                          >
                            <div
                              className={`absolute w-4 h-4 bg-white rounded-full top-1 transition-transform ${
                                localSettings.privacy.trackUsage ? 'translate-x-7' : 'translate-x-1'
                              }`}
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 