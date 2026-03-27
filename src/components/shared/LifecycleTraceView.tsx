'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowDown, Circle, TrendingUp } from 'lucide-react';
import { getTraceForService, LifecycleTrace, TraceNode, TraceEvent } from '@/lib/mock/lifecycleTraceData';
import { layerConfig, type SDLCLayer } from '@/lib/entityRegistry';

// ── Props ──────────────────────────────────────────────────────────

interface LifecycleTraceViewProps {
  /** Service ID to fetch trace for */
  serviceId: string;
  /** Callback to navigate to a section */
  onNavigate?: (sectionId: string) => void;
  /** Callback when close button (X) is clicked */
  onClose?: () => void;
}

// ── Main Component ─────────────────────────────────────────────────

export default function LifecycleTraceView({
  serviceId,
  onNavigate,
  onClose,
}: LifecycleTraceViewProps) {
  const trace = getTraceForService(serviceId);

  if (!trace) {
    return (
      <div className="flex items-center justify-center p-8 text-gray-500 dark:text-gray-400">
        <p>Trace not found for service: {serviceId}</p>
      </div>
    );
  }

  return (
    <div className="w-full space-y-8 p-8 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700">
      {/* ── Header ────────────────────────────────────────────── */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {trace.title}
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            {trace.serviceName}
          </p>
        </div>
        {onClose && (
          <motion.button
            onClick={onClose}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Close trace view"
          >
            <X className="w-5 h-5 text-gray-400 dark:text-gray-500" />
          </motion.button>
        )}
      </div>

      {/* ── Visual Flow (2x3 grid with connecting lines) ────────── */}
      <div className="space-y-8">
        {/* Row 1: L0-PLAN → L1-BUILD → L2-TEST */}
        <div className="relative">
          <div className="grid grid-cols-3 gap-6">
            {trace.nodes.slice(0, 3).map((node, idx) => (
              <motion.div
                key={node.entityId}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.15 }}
              >
                <NodeCard node={node} onNavigate={onNavigate} />
              </motion.div>
            ))}
          </div>

          {/* Connecting lines between row 1 nodes */}
          <svg
            className="absolute top-24 left-0 w-full h-12 pointer-events-none"
            style={{ overflow: 'visible' }}
          >
            {/* Line from node 0 to node 1 */}
            <motion.line
              x1="33.33%"
              y1="0"
              x2="66.66%"
              y2="0"
              stroke="currentColor"
              strokeWidth="2"
              strokeDasharray="8,4"
              className="text-gray-300 dark:text-gray-600"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.45, duration: 0.8 }}
            />
            {/* Line from node 1 to node 2 */}
            <motion.line
              x1="66.66%"
              y1="0"
              x2="100%"
              y2="0"
              stroke="currentColor"
              strokeWidth="2"
              strokeDasharray="8,4"
              className="text-gray-300 dark:text-gray-600"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            />
          </svg>
        </div>

        {/* Arrow down from row 1 to row 2 */}
        <div className="flex justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.75 }}
          >
            <ArrowDown className="w-6 h-6 text-purple-500 dark:text-purple-400" />
          </motion.div>
        </div>

        {/* Row 2: L3-RELEASE → L4-OPERATE → L5-LEARN */}
        <div className="relative">
          <div className="grid grid-cols-3 gap-6">
            {trace.nodes.slice(3, 6).map((node, idx) => (
              <motion.div
                key={node.entityId}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: (idx + 3) * 0.15 }}
              >
                <NodeCard node={node} onNavigate={onNavigate} />
              </motion.div>
            ))}
          </div>

          {/* Connecting lines between row 2 nodes */}
          <svg
            className="absolute top-24 left-0 w-full h-12 pointer-events-none"
            style={{ overflow: 'visible' }}
          >
            {/* Line from node 3 to node 4 */}
            <motion.line
              x1="33.33%"
              y1="0"
              x2="66.66%"
              y2="0"
              stroke="currentColor"
              strokeWidth="2"
              strokeDasharray="8,4"
              className="text-gray-300 dark:text-gray-600"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.75, duration: 0.8 }}
            />
            {/* Line from node 4 to node 5 */}
            <motion.line
              x1="66.66%"
              y1="0"
              x2="100%"
              y2="0"
              stroke="currentColor"
              strokeWidth="2"
              strokeDasharray="8,4"
              className="text-gray-300 dark:text-gray-600"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.9, duration: 0.8 }}
            />
          </svg>
        </div>
      </div>

      {/* ── Feedback Loop Card ────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.1 }}
        className="relative bg-gradient-to-br from-emerald-50 to-emerald-50/50 dark:from-emerald-900/20 dark:to-emerald-900/10 rounded-xl border border-emerald-200 dark:border-emerald-800 p-6"
      >
        {/* Pulse animation on border */}
        <motion.div
          className="absolute inset-0 rounded-xl border border-emerald-400 dark:border-emerald-700"
          animate={{
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        />

        <div className="relative z-10 flex items-start gap-4">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            className="flex-shrink-0 mt-1"
          >
            <TrendingUp className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          </motion.div>

          <div className="flex-1">
            <h4 className="font-bold text-emerald-900 dark:text-emerald-100 mb-2">
              Feedback Loop: L5 Learning Feeds Back to L0 Planning
            </h4>
            <ul className="space-y-1">
              {trace.feedbackLoopText.map((item, idx) => (
                <motion.li
                  key={idx}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.2 + idx * 0.1 }}
                  className="text-sm text-emerald-800 dark:text-emerald-200 flex items-start gap-2"
                >
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold mt-0.5">
                    →
                  </span>
                  <span>{item}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>

      {/* ── Chronological Timeline ────────────────────────────── */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Chronological Timeline
        </h3>

        <div className="space-y-4">
          {trace.events.map((event, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.4 + idx * 0.08 }}
              className="flex gap-4"
            >
              {/* Date label */}
              <div className="min-w-fit pt-1">
                <span className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">
                  {event.date}
                </span>
              </div>

              {/* Vertical line with dot */}
              <div className="flex flex-col items-center">
                <div
                  className={`w-3 h-3 rounded-full border-2 ${getLayerDotColor(
                    event.layer,
                  )}`}
                />
                {idx < trace.events.length - 1 && (
                  <div className="w-0.5 h-8 bg-gradient-to-b from-gray-300 dark:from-gray-600 to-transparent" />
                )}
              </div>

              {/* Event content */}
              <div className="pt-0.5 pb-4 flex-1">
                <p className="text-sm text-gray-900 dark:text-white mb-2">{event.description}</p>

                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${layerConfig[event.layer].bg} ${layerConfig[event.layer].color}`}>
                    {layerConfig[event.layer].label}
                  </span>

                  {event.technique && (
                    <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${getTechniqueBadgeColor(event.technique)}`}>
                      {event.technique}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Sub-component: Node Card ───────────────────────────────────

function NodeCard({
  node,
  onNavigate,
}: {
  node: TraceNode;
  onNavigate?: (sectionId: string) => void;
}) {
  const layer = layerConfig[node.layer];
  const statusColor =
    node.status === 'active'
      ? 'bg-amber-500'
      : node.status === 'resolved'
        ? 'bg-green-500'
        : 'bg-emerald-500';

  return (
    <motion.button
      onClick={() => onNavigate?.(node.sectionId)}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`w-full text-left p-4 rounded-lg border ${layer.border} ${layer.bg} transition-all hover:shadow-md`}
    >
      {/* Layer badge */}
      <div className="flex items-center justify-between mb-3">
        <span className={`text-[10px] font-bold uppercase tracking-wider ${layer.color}`}>
          {layer.label}
        </span>
        <div className={`w-2 h-2 rounded-full ${statusColor} animate-pulse`} />
      </div>

      {/* Entity ID (bold) */}
      <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-1">
        {node.entityId}
      </h4>

      {/* Entity label */}
      <p className="text-xs text-gray-600 dark:text-gray-400 mb-2 line-clamp-2">
        {node.entityLabel}
      </p>

      {/* Metric */}
      <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
        <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
          {node.metric}
        </span>
      </div>
    </motion.button>
  );
}

// ── Helpers ────────────────────────────────────────────────────

/**
 * Get Tailwind classes for the timeline dot based on layer.
 */
function getLayerDotColor(layer: SDLCLayer): string {
  const colorMap: Record<SDLCLayer, string> = {
    'L0-PLAN': 'border-teal-500 bg-teal-100 dark:bg-teal-900',
    'L1-BUILD': 'border-indigo-500 bg-indigo-100 dark:bg-indigo-900',
    'L2-TEST': 'border-purple-500 bg-purple-100 dark:bg-purple-900',
    'L3-RELEASE': 'border-rose-500 bg-rose-100 dark:bg-rose-900',
    'L4-OPERATE': 'border-blue-500 bg-blue-100 dark:bg-blue-900',
    'L5-LEARN': 'border-emerald-500 bg-emerald-100 dark:bg-emerald-900',
  };
  return colorMap[layer];
}

/**
 * Get Tailwind classes for technique badge.
 */
function getTechniqueBadgeColor(technique: string): string {
  switch (technique) {
    case 'LLM':
      return 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300';
    case 'RAG':
      return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300';
    case 'ML':
      return 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300';
    case 'NLP':
      return 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300';
    case 'LLM+RAG':
      return 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300';
    default:
      return 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300';
  }
}
