'use client';

import { useLiveSimulation } from '@/context/LiveSimulationContext';
import LiveBadge from '@/components/ui/LiveBadge';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play,
  Square,
  Activity,
  AlertCircle,
  TrendingUp,
  BookOpen,
} from 'lucide-react';

/**
 * SimulationDemoPanel
 *
 * A complete example showing how to integrate the Live Simulation Mode into your UI.
 * Demonstrates:
 * - Starting/stopping simulation
 * - Displaying live metrics with the LiveBadge
 * - Showing recent events in real-time
 * - Dark mode support
 */
export default function SimulationDemoPanel() {
  const { isSimulating, state, startSimulation, stopSimulation } = useLiveSimulation();

  const handleStartClick = () => {
    startSimulation();
  };

  const handleStopClick = () => {
    stopSimulation();
  };

  return (
    <div className="w-full space-y-6">
      {/* Header with control buttons */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Live Simulation Mode
            </h3>
            <LiveBadge isActive={isSimulating} size="sm" />
          </div>

          {/* Control buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleStartClick}
              disabled={isSimulating}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-green-600 text-white font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed hover:bg-green-700"
            >
              <Play className="w-4 h-4" />
              Start
            </button>

            <button
              onClick={handleStopClick}
              disabled={!isSimulating}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-400 dark:bg-gray-600 text-gray-900 dark:text-white font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-500 dark:hover:bg-gray-700"
            >
              <Square className="w-4 h-4" />
              Stop
            </button>
          </div>
        </div>

        {/* Status indicator */}
        <div className="text-sm text-gray-600 dark:text-gray-400">
          {isSimulating
            ? '🟢 Simulation active — metrics updating every 2.5s, events every 4-8s'
            : '⚪ Simulation stopped — click Start to begin'}
        </div>
      </div>

      {/* Live metrics grid */}
      <AnimatePresence>
        {isSimulating && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="grid grid-cols-2 md:grid-cols-3 gap-4"
          >
            {/* Active Services */}
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
              <div className="flex items-center gap-2 mb-2">
                <Activity className="w-4 h-4 text-blue-500" />
                <span className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">
                  Services
                </span>
              </div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {Math.round(state.metrics.activeServices)}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Range: 148-155</p>
            </div>

            {/* Incidents Prevented */}
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className="w-4 h-4 text-green-500" />
                <span className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">
                  Prevented
                </span>
              </div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {Math.round(state.metrics.incidentsPreventedToday)}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Daily incidents</p>
            </div>

            {/* Response Time */}
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-4 h-4 text-amber-500" />
                <span className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">
                  Response
                </span>
              </div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {Math.round(state.metrics.avgResponseTime)}ms
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Avg latency</p>
            </div>

            {/* Defect Accuracy */}
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
              <div className="flex items-center gap-2 mb-2">
                <BookOpen className="w-4 h-4 text-purple-500" />
                <span className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">
                  Accuracy
                </span>
              </div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {(state.metrics.defectMatchAccuracy * 100).toFixed(1)}%
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Match score</p>
            </div>

            {/* Release Risk */}
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-4 h-4 text-red-500" />
                <span className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">
                  Risk
                </span>
              </div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {(state.metrics.releaseRiskScore * 100).toFixed(0)}%
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Score</p>
            </div>

            {/* Knowledge Base */}
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
              <div className="flex items-center gap-2 mb-2">
                <BookOpen className="w-4 h-4 text-indigo-500" />
                <span className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">
                  Knowledge
                </span>
              </div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {state.metrics.knowledgeBaseEntries}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Total entries</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Recent events */}
      <AnimatePresence>
        {isSimulating && state.recentEvents.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6"
          >
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
              Recent Events
            </h4>

            <div className="space-y-3">
              {state.recentEvents.slice(0, 5).map((event) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`p-3 rounded-lg text-sm border ${
                    event.severity === 'warning'
                      ? 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800'
                      : event.severity === 'success'
                        ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
                        : 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 flex-shrink-0 mt-0.5">
                      {event.layer}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 dark:text-white">{event.type}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">
                        {event.message}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Info box when not simulating */}
      {!isSimulating && (
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800 p-4 text-sm text-blue-900 dark:text-blue-200">
          <p className="font-medium mb-2">Get Started</p>
          <ul className="list-disc list-inside space-y-1 text-xs">
            <li>Click "Start" to activate the simulation</li>
            <li>Watch metrics fluctuate in real-time</li>
            <li>View events generated across all SDLC layers</li>
            <li>Perfect for demos and presentations</li>
          </ul>
        </div>
      )}
    </div>
  );
}
