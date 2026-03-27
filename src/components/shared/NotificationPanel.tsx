'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCheck } from 'lucide-react';
import {
  allActivityEvents,
  ActivityEvent,
  getUnreadCount,
  markEventAsRead,
  markAllEventsAsRead,
} from '@/lib/mock/activityData';

interface NotificationPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate?: (sectionId: string) => void;
}

// Layer color configuration
const layerConfig: Record<string, { color: string; label: string }> = {
  L0: { color: 'teal', label: 'L0 — Plan' },
  L1: { color: 'purple', label: 'L1 — Build' },
  L2: { color: 'blue', label: 'L2 — Test' },
  L3: { color: 'orange', label: 'L3 — Release' },
  L4: { color: 'red', label: 'L4 — Operate' },
  L5: { color: 'indigo', label: 'L5 — Learn' },
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

// Severity color mapping
const severityConfig: Record<string, { color: string; label: string }> = {
  critical: { color: 'red', label: 'Critical' },
  warning: { color: 'amber', label: 'Warning' },
  info: { color: 'gray', label: 'Info' },
};

export default function NotificationPanel({
  isOpen,
  onClose,
  onNavigate,
}: NotificationPanelProps) {
  const [events, setEvents] = useState(allActivityEvents);
  const [activeFilter, setActiveFilter] = useState<
    'All' | 'Critical' | 'Warning' | 'Info'
  >('All');

  // Filter events based on active filter
  const filteredEvents = useMemo(() => {
    if (activeFilter === 'All') return events;
    return events.filter(
      (e) => e.severity.charAt(0).toUpperCase() + e.severity.slice(1) === activeFilter
    );
  }, [events, activeFilter]);

  const unreadCount = events.filter((e) => !e.read).length;

  // Handle event click — mark as read and navigate
  const handleEventClick = (event: ActivityEvent) => {
    const updatedEvent = { ...event, read: true };
    setEvents(
      events.map((e) => (e.id === event.id ? updatedEvent : e))
    );

    if (event.targetSection && onNavigate) {
      onNavigate(event.targetSection);
    }
  };

  // Handle mark all as read
  const handleMarkAllRead = () => {
    setEvents(events.map((e) => ({ ...e, read: true })));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
          />

          {/* Panel */}
          <motion.div
            initial={{ x: 384 }}
            animate={{ x: 0 }}
            exit={{ x: 384 }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-96 bg-white dark:bg-gray-800 shadow-2xl z-50 flex flex-col border-l border-gray-200 dark:border-gray-700"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Activity Feed
                </h2>
                {unreadCount > 0 && (
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-500 text-white text-xs font-bold">
                    {unreadCount}
                  </span>
                )}
              </div>
              <button
                onClick={onClose}
                className="p-1.5 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Action Bar */}
            <div className="flex items-center justify-between px-6 py-3 border-b border-gray-200 dark:border-gray-700">
              {unreadCount > 0 && (
                <button
                  onClick={handleMarkAllRead}
                  className="flex items-center gap-1.5 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                >
                  <CheckCheck className="w-4 h-4" />
                  Mark all read
                </button>
              )}
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-2 px-6 py-3 border-b border-gray-200 dark:border-gray-700 overflow-x-auto">
              {(['All', 'Critical', 'Warning', 'Info'] as const).map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-3 py-1.5 text-sm font-medium rounded-full transition-colors whitespace-nowrap ${
                    activeFilter === filter
                      ? 'bg-blue-500 text-white'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>

            {/* Event List */}
            <div className="flex-1 overflow-y-auto">
              {filteredEvents.length === 0 ? (
                <div className="flex items-center justify-center h-full">
                  <p className="text-gray-500 dark:text-gray-400">
                    No {activeFilter !== 'All' ? activeFilter.toLowerCase() : ''}{' '}
                    events
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredEvents.map((event) => {
                    const layerInfo = layerConfig[event.layer];
                    const severityInfo = severityConfig[event.severity];

                    return (
                      <motion.button
                        key={event.id}
                        onClick={() => handleEventClick(event)}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className={`w-full px-6 py-4 text-left transition-colors ${
                          event.read
                            ? 'bg-white dark:bg-gray-800/50'
                            : 'bg-blue-50 dark:bg-blue-900/10'
                        } hover:bg-gray-50 dark:hover:bg-gray-700/30`}
                      >
                        <div className="flex items-start gap-3">
                          {/* Unread Indicator */}
                          {!event.read && (
                            <div className="flex-shrink-0 w-2 h-2 rounded-full bg-blue-500 mt-2" />
                          )}

                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            {/* Layer + Severity */}
                            <div className="flex items-center gap-2 mb-1">
                              <span
                                className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-${layerInfo.color}-100 dark:bg-${layerInfo.color}-900/30 text-${layerInfo.color}-700 dark:text-${layerInfo.color}-300`}
                              >
                                <span
                                  className={`w-1.5 h-1.5 rounded-full bg-${layerInfo.color}-500`}
                                />
                                {layerInfo.label}
                              </span>
                              <span
                                className={`w-2 h-2 rounded-full bg-${severityInfo.color}-500`}
                              />
                            </div>

                            {/* Title */}
                            <h4 className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                              {event.title}
                            </h4>

                            {/* Description */}
                            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                              {event.description}
                            </p>

                            {/* Footer */}
                            <div className="flex items-center gap-2 mt-2">
                              <span className="text-[10px] text-gray-500 dark:text-gray-500">
                                {relativeTime(event.timestamp)}
                              </span>
                              <span className="text-[10px] text-gray-400 dark:text-gray-500">
                                •
                              </span>
                              <span className="text-[10px] text-gray-500 dark:text-gray-500">
                                {event.service}
                              </span>
                            </div>
                          </div>
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
