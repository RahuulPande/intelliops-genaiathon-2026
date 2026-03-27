'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  AlertTriangle, 
  Clock, 
  Users, 
  Settings, 
  History, 
  Bell,
  Calendar,
  Filter,
  Search,
  Eye,
  EyeOff,
  Zap,
  CheckCircle,
  XCircle,
  User
} from 'lucide-react';
import AlertsPanel from '@/components/dashboard/AlertsPanel';
import useDashboardStore from '@/store/dashboard';

type AlertTab = 'live-alerts' | 'incidents' | 'history' | 'config' | 'oncall';

export default function IncidentsAlertsSection() {
  const [activeTab, setActiveTab] = useState<AlertTab>('live-alerts');
  const { incidents, alerts } = useDashboardStore();

  const tabs = [
    { id: 'live-alerts', label: 'Live Alerts', icon: Bell, count: alerts.length },
    { id: 'incidents', label: 'Active Incidents', icon: AlertTriangle, count: incidents.length },
    { id: 'history', label: 'Alert History', icon: History, count: 245 },
    { id: 'config', label: 'Configuration', icon: Settings, count: null },
    { id: 'oncall', label: 'On-Call Schedule', icon: Calendar, count: null }
  ];

  const renderActiveIncidents = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Active Incidents</h3>
        <div className="flex items-center space-x-2">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Create Incident
          </button>
        </div>
      </div>

      {incidents.length > 0 ? (
        <div className="space-y-3">
          {incidents.map((incident) => (
            <div key={incident.id} className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      incident.severity === 'critical' ? 'bg-red-100 text-red-800' :
                      incident.severity === 'high' ? 'bg-orange-100 text-orange-800' :
                      incident.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {incident.severity.toUpperCase()}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      incident.status === 'open' ? 'bg-red-100 text-red-800' :
                      incident.status === 'investigating' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {incident.status.toUpperCase()}
                    </span>
                  </div>
                  <h4 className="font-medium text-gray-900 mb-1">{incident.title}</h4>
                  <p className="text-sm text-gray-600 mb-2">{incident.description}</p>
                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    <span>Created: {incident.createdAt.toLocaleString()}</span>
                    <span>Services: {incident.affectedServices.length}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                    <Users className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Active Incidents</h3>
          <p className="text-gray-600">All systems are operating normally</p>
        </div>
      )}
    </div>
  );

  const renderAlertHistory = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Alert History</h3>
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-2 bg-white rounded-lg border px-3 py-2">
            <Search className="w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search alerts..."
              className="border-none outline-none flex-1 text-sm"
            />
          </div>
          <select className="border border-gray-300 rounded-md px-3 py-2 text-sm bg-white">
            <option value="all">All Severities</option>
            <option value="critical">Critical</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-lg border">
        <div className="p-4 border-b border-gray-200">
          <div className="grid grid-cols-6 gap-4 text-sm font-medium text-gray-600">
            <div>Alert</div>
            <div>Severity</div>
            <div>Service</div>
            <div>Time</div>
            <div>Duration</div>
            <div>Status</div>
          </div>
        </div>
        <div className="divide-y divide-gray-200">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="p-4 grid grid-cols-6 gap-4 text-sm hover:bg-gray-50">
              <div className="font-medium text-gray-900">High CPU usage detected</div>
              <div>
                <span className="px-2 py-1 bg-orange-100 text-orange-800 rounded-full text-xs font-medium">
                  HIGH
                </span>
              </div>
              <div className="text-gray-600">Payment API</div>
              <div className="text-gray-600">2 hours ago</div>
              <div className="text-gray-600">5 minutes</div>
              <div>
                <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                  RESOLVED
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderConfiguration = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Alert Configuration</h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Thresholds */}
        <div className="bg-white rounded-lg border p-6">
          <h4 className="font-medium text-gray-900 mb-4">Alert Thresholds</h4>
          <div className="space-y-4">
            {[
              { metric: 'CPU Usage', warning: '75%', critical: '90%' },
              { metric: 'Memory Usage', warning: '80%', critical: '95%' },
              { metric: 'Response Time', warning: '500ms', critical: '1000ms' },
              { metric: 'Error Rate', warning: '1%', critical: '5%' }
            ].map((threshold) => (
              <div key={threshold.metric} className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">{threshold.metric}</span>
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-yellow-600">⚠️ {threshold.warning}</span>
                  <span className="text-xs text-red-600">🚨 {threshold.critical}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Notification Channels */}
        <div className="bg-white rounded-lg border p-6">
          <h4 className="font-medium text-gray-900 mb-4">Notification Channels</h4>
          <div className="space-y-3">
            {[
              { name: 'Email Alerts', enabled: true, type: 'email' },
              { name: 'Slack Integration', enabled: true, type: 'slack' },
              { name: 'SMS Notifications', enabled: false, type: 'sms' },
              { name: 'Webhook', enabled: true, type: 'webhook' }
            ].map((channel) => (
              <div key={channel.name} className="flex items-center justify-between">
                <span className="text-sm text-gray-700">{channel.name}</span>
                <button className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  channel.enabled ? 'bg-blue-600' : 'bg-gray-300'
                }`}>
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    channel.enabled ? 'translate-x-6' : 'translate-x-1'
                  }`} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderOnCallSchedule = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">On-Call Schedule</h3>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Edit Schedule
        </button>
      </div>

      <div className="bg-white rounded-lg border">
        <div className="p-4 border-b border-gray-200">
          <h4 className="font-medium text-gray-900">Current Week</h4>
        </div>
        <div className="p-4">
          <div className="grid grid-cols-7 gap-2 mb-4">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
              <div key={day} className="text-center text-sm font-medium text-gray-600 py-2">
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-2">
            {[
              { name: 'Alice', avatar: '👩‍💻' },
              { name: 'Bob', avatar: '👨‍💻' },
              { name: 'Carol', avatar: '👩‍🔬' },
              { name: 'Dave', avatar: '👨‍🔧' },
              { name: 'Eve', avatar: '👩‍💼' },
              { name: 'Alice', avatar: '👩‍💻' },
              { name: 'Bob', avatar: '👨‍💻' }
            ].map((person, index) => (
              <div key={index} className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-center">
                <div className="text-2xl mb-1">{person.avatar}</div>
                <div className="text-xs font-medium text-blue-900">{person.name}</div>
                <div className="text-xs text-blue-600">9AM-5PM</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border p-4">
        <h4 className="font-medium text-gray-900 mb-3">Current On-Call</h4>
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <div className="font-medium text-gray-900">Alice Johnson</div>
            <div className="text-sm text-gray-600">Primary on-call • Available until 5 PM</div>
          </div>
          <div className="ml-auto">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Incidents & Alerts</h1>
        <p className="text-gray-600 mt-1">Comprehensive alert management and incident tracking</p>
      </div>

      {/* Sub-navigation */}
      <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
        {tabs.map((tab) => {
          const IconComponent = tab.icon;
          return (
            <button
              key={tab.id}
                             onClick={() => setActiveTab(tab.id as AlertTab)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <IconComponent className="w-4 h-4" />
              <span>{tab.label}</span>
              {tab.count !== null && (
                <span className={`px-2 py-0.5 rounded-full text-xs ${
                  activeTab === tab.id 
                    ? 'bg-blue-100 text-blue-600' 
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {activeTab === 'live-alerts' && <AlertsPanel />}
        {activeTab === 'incidents' && renderActiveIncidents()}
        {activeTab === 'history' && renderAlertHistory()}
        {activeTab === 'config' && renderConfiguration()}
        {activeTab === 'oncall' && renderOnCallSchedule()}
      </motion.div>
    </div>
  );
} 