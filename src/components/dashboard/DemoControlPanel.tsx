'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Settings,
  Play,
  Pause,
  Square,
  RotateCcw,
  Zap,
  Monitor,
  Eye,
  EyeOff,
  Download,
  Upload,
  Gauge,
  Timer,
  Bug,
  RefreshCw,
  X,
  ChevronDown,
  ChevronUp,
  Circle,
  Presentation,
  Database,
  Activity,
  AlertTriangle,
  DollarSign,
  Shield
} from 'lucide-react';
import useDashboardStore from '@/store/dashboard';

interface DemoScenario {
  id: string;
  name: string;
  description: string;
  category: 'incident' | 'performance' | 'cost' | 'security' | 'normal';
  icon: any;
  color: string;
  duration: number;
}

export default function DemoControlPanel() {
  const { demoControlState } = useDashboardStore();
  const [isVisible, setIsVisible] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [activeScenario, setActiveScenario] = useState('normal');
  const [speedMultiplier, setSpeedMultiplier] = useState(1);
  const [isRecording, setIsRecording] = useState(false);
  const [presentationMode, setPresentationMode] = useState(false);
  const [debugMode, setDebugMode] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(true);

  // Demo scenarios
  const demoScenarios = useMemo((): DemoScenario[] => [
    {
      id: 'normal',
      name: 'Normal Operations',
      description: 'All systems operating normally with standard metrics',
      category: 'normal',
      icon: Activity,
      color: 'text-green-600',
      duration: 30
    },
    {
      id: 'payment-incident',
      name: 'Payment Gateway Incident',
      description: 'Simulate payment gateway downtime and response',
      category: 'incident',
      icon: AlertTriangle,
      color: 'text-red-600',
      duration: 120
    },
    {
      id: 'high-load',
      name: 'High Performance Load',
      description: 'Simulate system under high performance stress',
      category: 'performance',
      icon: Gauge,
      color: 'text-orange-600',
      duration: 90
    },
    {
      id: 'cost-spike',
      name: 'Cost Spike Scenario',
      description: 'Demonstrate cost monitoring and optimization',
      category: 'cost',
      icon: DollarSign,
      color: 'text-yellow-600',
      duration: 60
    },
    {
      id: 'security-breach',
      name: 'Security Alert',
      description: 'Simulate security vulnerability detection',
      category: 'security',
      icon: Shield,
      color: 'text-purple-600',
      duration: 45
    }
  ], []);

  // Keyboard shortcut handler
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === 'd') {
        event.preventDefault();
        setIsVisible(!isVisible);
      }
      if (event.key === 'Escape' && isVisible) {
        setIsVisible(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isVisible]);

  // Handle scenario change
  const handleScenarioChange = (scenarioId: string) => {
    setActiveScenario(scenarioId);
    // Here you would trigger data changes based on the scenario
    console.log(`Activating scenario: ${scenarioId}`);
  };

  // Handle speed change
  const handleSpeedChange = (speed: number) => {
    setSpeedMultiplier(speed);
    console.log(`Speed multiplier set to: ${speed}x`);
  };

  // Handle recording toggle
  const toggleRecording = () => {
    setIsRecording(!isRecording);
    console.log(`Recording ${!isRecording ? 'started' : 'stopped'}`);
  };

  // Handle presentation mode
  const togglePresentationMode = () => {
    setPresentationMode(!presentationMode);
    // This would hide/show UI elements for cleaner presentation
    console.log(`Presentation mode ${!presentationMode ? 'enabled' : 'disabled'}`);
  };

  // Reset data
  const resetData = () => {
    setActiveScenario('normal');
    setSpeedMultiplier(1);
    setIsRecording(false);
    setPresentationMode(false);
    console.log('Demo data reset to defaults');
  };

  // Export demo data
  const exportDemoData = () => {
    const demoState = {
      scenario: activeScenario,
      speed: speedMultiplier,
      timestamp: new Date().toISOString(),
      settings: {
        presentationMode,
        debugMode,
        autoRefresh
      }
    };
    
    const blob = new Blob([JSON.stringify(demoState, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `demo-state-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'incident': return 'bg-red-100 text-red-800 border-red-200';
      case 'performance': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'cost': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'security': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'normal': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.8, y: 50 }}
        className="fixed bottom-6 right-6 z-50 bg-white rounded-lg shadow-2xl border border-gray-200 overflow-hidden"
        style={{ width: isMinimized ? '320px' : '400px' }}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Settings className="w-5 h-5" />
              <h3 className="font-semibold">Demo Control Panel</h3>
              {isRecording && (
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
                  <span className="text-xs">REC</span>
                </div>
              )}
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="p-1 rounded hover:bg-white/20 transition-colors"
              >
                {isMinimized ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              <button
                onClick={() => setIsVisible(false)}
                className="p-1 rounded hover:bg-white/20 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {!isMinimized && (
          <div className="p-4 space-y-4 max-h-96 overflow-y-auto">
            {/* Quick Actions */}
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={toggleRecording}
                className={`p-3 rounded-lg text-center transition-colors ${
                  isRecording ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Circle className="w-5 h-5 mx-auto mb-1" />
                <span className="text-xs">{isRecording ? 'Stop' : 'Record'}</span>
              </button>
              
              <button
                onClick={togglePresentationMode}
                className={`p-3 rounded-lg text-center transition-colors ${
                  presentationMode ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Presentation className="w-5 h-5 mx-auto mb-1" />
                <span className="text-xs">Present</span>
              </button>
              
              <button
                onClick={resetData}
                className="p-3 rounded-lg text-center bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
              >
                <RotateCcw className="w-5 h-5 mx-auto mb-1" />
                <span className="text-xs">Reset</span>
              </button>
            </div>

            {/* Scenario Selector */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Demo Scenario</label>
              <select
                value={activeScenario}
                onChange={(e) => handleScenarioChange(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {demoScenarios.map((scenario) => (
                  <option key={scenario.id} value={scenario.id}>
                    {scenario.name}
                  </option>
                ))}
              </select>
              
              {/* Active Scenario Details */}
              {(() => {
                const scenario = demoScenarios.find(s => s.id === activeScenario);
                if (!scenario) return null;
                
                const IconComponent = scenario.icon;
                return (
                  <div className={`mt-2 p-3 rounded-lg border ${getCategoryColor(scenario.category)}`}>
                    <div className="flex items-center space-x-2 mb-1">
                      <IconComponent className="w-4 h-4" />
                      <span className="font-medium text-sm">{scenario.name}</span>
                      <span className="text-xs px-2 py-1 rounded-full bg-white/50">
                        {scenario.duration}s
                      </span>
                    </div>
                    <p className="text-xs">{scenario.description}</p>
                  </div>
                );
              })()}
            </div>

            {/* Speed Control */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Speed Multiplier: {speedMultiplier}x
              </label>
              <div className="space-y-2">
                <input
                  type="range"
                  min="0.25"
                  max="5"
                  step="0.25"
                  value={speedMultiplier}
                  onChange={(e) => handleSpeedChange(parseFloat(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>0.25x</span>
                  <span>1x</span>
                  <span>5x</span>
                </div>
              </div>
            </div>

            {/* Settings Toggles */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm text-gray-700">Auto Refresh</label>
                <button
                  onClick={() => setAutoRefresh(!autoRefresh)}
                  className={`relative w-10 h-6 rounded-full transition-colors ${
                    autoRefresh ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                >
                  <div
                    className={`absolute w-4 h-4 bg-white rounded-full top-1 transition-transform ${
                      autoRefresh ? 'translate-x-5' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
              
              <div className="flex items-center justify-between">
                <label className="text-sm text-gray-700">Debug Mode</label>
                <button
                  onClick={() => setDebugMode(!debugMode)}
                  className={`relative w-10 h-6 rounded-full transition-colors ${
                    debugMode ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                >
                  <div
                    className={`absolute w-4 h-4 bg-white rounded-full top-1 transition-transform ${
                      debugMode ? 'translate-x-5' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Data Controls */}
            <div className="border-t pt-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Data Management</h4>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={exportDemoData}
                  className="flex items-center justify-center space-x-2 p-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors text-sm"
                >
                  <Download className="w-4 h-4" />
                  <span>Export</span>
                </button>
                
                <button
                  className="flex items-center justify-center space-x-2 p-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors text-sm"
                  onClick={() => {
                    const input = document.createElement('input');
                    input.type = 'file';
                    input.accept = '.json';
                    input.click();
                  }}
                >
                  <Upload className="w-4 h-4" />
                  <span>Import</span>
                </button>
              </div>
            </div>

            {/* Status Info */}
            {debugMode && (
              <div className="border-t pt-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Debug Info</h4>
                <div className="bg-gray-50 p-2 rounded text-xs font-mono space-y-1">
                  <div>Scenario: {activeScenario}</div>
                  <div>Speed: {speedMultiplier}x</div>
                  <div>Recording: {isRecording ? 'Yes' : 'No'}</div>
                  <div>Presentation: {presentationMode ? 'Yes' : 'No'}</div>
                  <div>Timestamp: {new Date().toLocaleTimeString()}</div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Minimized View */}
        {isMinimized && (
          <div className="p-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">
                {demoScenarios.find(s => s.id === activeScenario)?.name || 'Unknown'}
              </span>
              <div className="flex items-center space-x-2">
                <span className="text-gray-500">{speedMultiplier}x</span>
                {isRecording && (
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                )}
              </div>
            </div>
          </div>
        )}
        
        {/* Keyboard Hint */}
        <div className="absolute bottom-2 left-2 text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded">
          Ctrl+D to toggle
        </div>
      </motion.div>
    </AnimatePresence>
  );
} 