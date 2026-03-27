'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, X } from 'lucide-react';
import { getRecentEvents, ActivityEvent } from '@/lib/mock/activityData';

interface ActivityTickerProps {
  onNavigate?: (sectionId: string) => void;
}

// Layer color configuration
const layerConfig: Record<string, { color: string; label: string }> = {
  L0: { color: 'teal', label: 'L0' },
  L1: { color: 'purple', label: 'L1' },
  L2: { color: 'blue', label: 'L2' },
  L3: { color: 'orange', label: 'L3' },
  L4: { color: 'red', label: 'L4' },
  L5: { color: 'indigo', label: 'L5' },
};

// Helper function to calculate relative time
function relativeTime(iso: string): string {
  const now = Date.now();
  const eventTime = new Date(iso).getTime();
  const diff = now - eventTime;

  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;

  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;

  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export default function ActivityTicker({ onNavigate }: ActivityTickerProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const events = getRecentEvents(5);

  // Cycle through events every 4 seconds
  useEffect(() => {
    if (!isVisible || events.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % events.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isVisible, events.length]);

  if (!isVisible || events.length === 0) return null;

  const currentEvent = events[currentIndex];
  const layerInfo = layerConfig[currentEvent.layer];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg border border-blue-200 dark:border-blue-800/50 p-3 mb-4 flex items-center justify-between gap-3"
      >
        {/* Left: Layer badge + Event title + Time */}
        <button
          onClick={() => {
            if (currentEvent.targetSection && onNavigate) {
              onNavigate(currentEvent.targetSection);
            }
          }}
          className="flex-1 flex items-center gap-2 min-w-0 text-left hover:opacity-80 transition-opacity"
        >
          {/* Layer Badge */}
          <span
            className={`flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-${layerInfo.color}-100 dark:bg-${layerInfo.color}-900/30 text-${layerInfo.color}-700 dark:text-${layerInfo.color}-300 flex-shrink-0`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full bg-${layerInfo.color}-500 animate-pulse`}
            />
            {layerInfo.label}
          </span>

          {/* Event Info */}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
              {currentEvent.title}
            </p>
          </div>

          {/* Time */}
          <span className="text-xs text-gray-500 dark:text-gray-400 flex-shrink-0">
            {relativeTime(currentEvent.timestamp)}
          </span>

          {/* Arrow */}
          <ChevronRight className="w-4 h-4 text-gray-400 dark:text-gray-500 flex-shrink-0" />
        </button>

        {/* Right: Dismiss button */}
        <button
          onClick={() => setIsVisible(false)}
          className="p-1 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors flex-shrink-0"
        >
          <X className="w-4 h-4" />
        </button>
      </motion.div>
    </AnimatePresence>
  );
}
