'use client';

import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Filter, 
  Download, 
  Play, 
  Pause, 
  RefreshCw,
  Calendar,
  User,
  Server,
  AlertCircle,
  Info,
  AlertTriangle,
  XCircle,
  Eye,
  EyeOff,
  ChevronDown,
  ChevronUp,
  Clock,
  Hash,
  Settings
} from 'lucide-react';
import useDashboardStore from '@/store/dashboard';
import { LogEntry, LogLevel } from '@/lib/types';
import { format, subDays, startOfDay, endOfDay } from 'date-fns';
import { FixedSizeList as List } from 'react-window';

interface LogFilter {
  serviceIds: string[];
  levels: LogLevel[];
  dateRange: {
    start: Date;
    end: Date;
  };
  userIds: string[];
  sessionIds: string[];
  searchQuery: string;
  isRegex: boolean;
}

interface ExpandedLog extends LogEntry {
  expanded?: boolean;
}

const levelColors = {
  debug: 'text-gray-600 bg-gray-50 border-gray-200',
  info: 'text-blue-600 bg-blue-50 border-blue-200',
  warn: 'text-yellow-600 bg-yellow-50 border-yellow-200',
  error: 'text-red-600 bg-red-50 border-red-200'
};

const levelIcons = {
  debug: Hash,
  info: Info,
  warn: AlertTriangle,
  error: XCircle
};

export default function LogStreamDashboard() {
  const { logs, services, addLog } = useDashboardStore();
  const [isPaused, setIsPaused] = useState(false);
  const [selectedLog, setSelectedLog] = useState<LogEntry | null>(null);
  const [expandedLogs, setExpandedLogs] = useState<Set<string>>(new Set());
  const [showFilters, setShowFilters] = useState(false);
  const listRef = useRef<List>(null);
  
  const [filter, setFilter] = useState<LogFilter>({
    serviceIds: [],
    levels: [],
    dateRange: {
      start: subDays(new Date(), 1),
      end: new Date()
    },
    userIds: [],
    sessionIds: [],
    searchQuery: '',
    isRegex: false
  });

  // Generate real-time logs
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      const levels: LogLevel[] = ['debug', 'info', 'warn', 'error'];
      const messages = [
        'User authentication successful',
        'Database query executed',
        'Cache invalidation triggered',
        'API request processed',
        'Background job completed',
        'Configuration updated',
        'Health check performed',
        'Session expired',
        'Rate limit exceeded',
        'Connection timeout',
        'Invalid request format',
        'Permission denied'
      ];

      const level = levels[Math.floor(Math.random() * levels.length)];
      const message = messages[Math.floor(Math.random() * messages.length)];
      const serviceId = services[Math.floor(Math.random() * services.length)]?.id || 'unknown';

      const newLog: LogEntry = {
        id: `log_${Date.now()}_${Math.random()}`,
        timestamp: new Date(),
        serviceId,
        serviceName: services.find(s => s.id === serviceId)?.name || 'Unknown Service',
        level,
        message,
        userId: `user_${Math.floor(Math.random() * 100)}`,
        sessionId: `session_${Math.floor(Math.random() * 1000)}`,
        traceId: `trace_${Math.floor(Math.random() * 10000)}`,
        spanId: `span_${Math.floor(Math.random() * 10000)}`,
        duration: Math.floor(Math.random() * 500),
        statusCode: Math.random() > 0.1 ? 200 : Math.random() > 0.5 ? 404 : 500,
        metadata: {
          ip: `192.168.1.${Math.floor(Math.random() * 255)}`,
          userAgent: 'Mozilla/5.0 (compatible)',
          endpoint: `/api/v1/${message.split(' ')[0].toLowerCase()}`,
          method: ['GET', 'POST', 'PUT', 'DELETE'][Math.floor(Math.random() * 4)]
        }
      };

      addLog(newLog);
    }, 1000);

    return () => clearInterval(interval);
  }, [isPaused, services, addLog]);

  // Filter logs based on current filters
  const filteredLogs = useMemo(() => {
    let filtered = logs;

    // Service filter
    if (filter.serviceIds.length > 0) {
      filtered = filtered.filter(log => filter.serviceIds.includes(log.serviceId));
    }

    // Level filter
    if (filter.levels.length > 0) {
      filtered = filtered.filter(log => filter.levels.includes(log.level));
    }

    // Date range filter
    filtered = filtered.filter(log => 
      log.timestamp >= filter.dateRange.start && 
      log.timestamp <= filter.dateRange.end
    );

    // User filter
    if (filter.userIds.length > 0) {
      filtered = filtered.filter(log => 
        log.userId && filter.userIds.includes(log.userId)
      );
    }

    // Session filter
    if (filter.sessionIds.length > 0) {
      filtered = filtered.filter(log => 
        log.sessionId && filter.sessionIds.includes(log.sessionId)
      );
    }

    // Search filter
    if (filter.searchQuery) {
      try {
        if (filter.isRegex) {
          const regex = new RegExp(filter.searchQuery, 'i');
          filtered = filtered.filter(log => 
            regex.test(log.message) || 
            regex.test(log.serviceName) ||
            (log.traceId && regex.test(log.traceId))
          );
        } else {
          const query = filter.searchQuery.toLowerCase();
          filtered = filtered.filter(log => 
            log.message.toLowerCase().includes(query) ||
            log.serviceName.toLowerCase().includes(query) ||
            (log.traceId && log.traceId.toLowerCase().includes(query))
          );
        }
      } catch (e) {
        // Invalid regex, fall back to simple search
        const query = filter.searchQuery.toLowerCase();
        filtered = filtered.filter(log => 
          log.message.toLowerCase().includes(query) ||
          log.serviceName.toLowerCase().includes(query)
        );
      }
    }

    return filtered.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  }, [logs, filter]);

  // Export logs to CSV
  const exportToCsv = useCallback(() => {
    const headers = [
      'Timestamp',
      'Service',
      'Level',
      'Message',
      'User ID',
      'Session ID',
      'Trace ID',
      'Duration',
      'Status Code'
    ];

    const rows = filteredLogs.map(log => [
      format(log.timestamp, 'yyyy-MM-dd HH:mm:ss'),
      log.serviceName,
      log.level,
      log.message,
      log.userId || '',
      log.sessionId || '',
      log.traceId || '',
      log.duration?.toString() || '',
      log.statusCode?.toString() || ''
    ]);

    const csvContent = [headers, ...rows]
      .map(row => row.map(field => `"${field}"`).join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `logs_${format(new Date(), 'yyyy-MM-dd_HH-mm-ss')}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }, [filteredLogs]);

  // Toggle log expansion
  const toggleLogExpansion = useCallback((logId: string) => {
    setExpandedLogs(prev => {
      const newSet = new Set(prev);
      if (newSet.has(logId)) {
        newSet.delete(logId);
      } else {
        newSet.add(logId);
      }
      return newSet;
    });
  }, []);

  // Get unique values for filters
  const uniqueServices = useMemo(() => 
    Array.from(new Set(logs.map(log => ({ id: log.serviceId, name: log.serviceName }))))
      .filter((service, index, self) => self.findIndex(s => s.id === service.id) === index),
    [logs]
  );

  const uniqueUsers = useMemo(() => 
    Array.from(new Set(logs.map(log => log.userId).filter(Boolean))),
    [logs]
  );

  const uniqueSessions = useMemo(() => 
    Array.from(new Set(logs.map(log => log.sessionId).filter(Boolean))),
    [logs]
  );

  // Virtual list row renderer
  const LogRow = ({ index, style }: { index: number; style: React.CSSProperties }) => {
    const log = filteredLogs[index];
    const isExpanded = expandedLogs.has(log.id);
    const LevelIcon = levelIcons[log.level];

    return (
      <div style={style} className="px-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`border-l-4 rounded-lg p-3 mb-2 cursor-pointer transition-all hover:shadow-md ${levelColors[log.level]}`}
          onClick={() => toggleLogExpansion(log.id)}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 flex-1 min-w-0">
              <LevelIcon className="w-4 h-4 flex-shrink-0" />
              <span className="font-medium text-xs uppercase tracking-wide flex-shrink-0">
                {log.level}
              </span>
              <span className="text-sm font-medium text-gray-900 truncate">
                {log.serviceName}
              </span>
              <span className="text-sm text-gray-600 truncate flex-1">
                {log.message}
              </span>
            </div>
            <div className="flex items-center space-x-2 text-xs text-gray-500 flex-shrink-0">
              <Clock className="w-3 h-3" />
              <span>{format(log.timestamp, 'HH:mm:ss')}</span>
              {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </div>
          </div>

          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="mt-3 space-y-2 text-sm"
              >
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="font-medium">Timestamp:</span> {format(log.timestamp, 'yyyy-MM-dd HH:mm:ss.SSS')}
                  </div>
                  <div>
                    <span className="font-medium">Duration:</span> {log.duration}ms
                  </div>
                  {log.userId && (
                    <div>
                      <span className="font-medium">User ID:</span> {log.userId}
                    </div>
                  )}
                  {log.sessionId && (
                    <div>
                      <span className="font-medium">Session ID:</span> {log.sessionId}
                    </div>
                  )}
                  {log.traceId && (
                    <div>
                      <span className="font-medium">Trace ID:</span> {log.traceId}
                    </div>
                  )}
                  {log.statusCode && (
                    <div>
                      <span className="font-medium">Status Code:</span> {log.statusCode}
                    </div>
                  )}
                </div>
                
                {log.metadata && (
                  <div>
                    <span className="font-medium">Metadata:</span>
                    <pre className="mt-1 p-2 bg-gray-100 rounded text-xs overflow-x-auto">
                      {JSON.stringify(log.metadata, null, 2)}
                    </pre>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-lg">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6 rounded-t-lg">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Log Stream Dashboard</h2>
            <p className="text-purple-100">Real-time application logs with advanced filtering</p>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <div className={`w-2 h-2 rounded-full ${isPaused ? 'bg-red-400' : 'bg-green-400'}`} />
            <span>{isPaused ? 'Paused' : 'Live'}</span>
            <span className="mx-2">|</span>
            <span>{filteredLogs.length} logs</span>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="p-4 border-b bg-gray-50">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="flex items-center space-x-2 bg-white rounded-lg border px-3 py-2">
              <Search className="w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search logs (supports regex)..."
                value={filter.searchQuery}
                onChange={(e) => setFilter(prev => ({ ...prev, searchQuery: e.target.value }))}
                className="border-none outline-none text-sm w-64"
              />
              <button
                onClick={() => setFilter(prev => ({ ...prev, isRegex: !prev.isRegex }))}
                className={`text-xs px-2 py-1 rounded ${
                  filter.isRegex ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
                }`}
              >
                Regex
              </button>
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg border transition-colors ${
                showFilters ? 'bg-blue-100 text-blue-600 border-blue-200' : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Filter className="w-4 h-4" />
              <span>Filters</span>
              {(filter.serviceIds.length > 0 || filter.levels.length > 0) && (
                <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                  {filter.serviceIds.length + filter.levels.length}
                </span>
              )}
            </button>
          </div>

          <div className="flex items-center space-x-2">
            {/* Pause/Resume */}
            <button
              onClick={() => setIsPaused(!isPaused)}
              className={`p-2 rounded-lg transition-colors ${
                isPaused ? 'bg-green-100 text-green-600 hover:bg-green-200' : 'bg-red-100 text-red-600 hover:bg-red-200'
              }`}
            >
              {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
            </button>

            {/* Export */}
            <button
              onClick={exportToCsv}
              className="flex items-center space-x-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        {/* Advanced Filters */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t"
            >
              {/* Service Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Services</label>
                <select
                  multiple
                  value={filter.serviceIds}
                  onChange={(e) => setFilter(prev => ({ 
                    ...prev, 
                    serviceIds: Array.from(e.target.selectedOptions, option => option.value)
                  }))}
                  className="w-full border rounded-md p-2 text-sm max-h-24"
                >
                  {uniqueServices.map(service => (
                    <option key={service.id} value={service.id}>
                      {service.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Level Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Log Levels</label>
                <div className="space-y-1">
                  {(['debug', 'info', 'warn', 'error'] as LogLevel[]).map(level => (
                    <label key={level} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={filter.levels.includes(level)}
                        onChange={(e) => {
                          setFilter(prev => ({
                            ...prev,
                            levels: e.target.checked
                              ? [...prev.levels, level]
                              : prev.levels.filter(l => l !== level)
                          }));
                        }}
                        className="rounded"
                      />
                      <span className="text-sm capitalize">{level}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Date Range */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
                <div className="space-y-2">
                  <input
                    type="datetime-local"
                    value={format(filter.dateRange.start, "yyyy-MM-dd'T'HH:mm")}
                    onChange={(e) => setFilter(prev => ({
                      ...prev,
                      dateRange: { ...prev.dateRange, start: new Date(e.target.value) }
                    }))}
                    className="w-full border rounded-md p-2 text-sm"
                  />
                  <input
                    type="datetime-local"
                    value={format(filter.dateRange.end, "yyyy-MM-dd'T'HH:mm")}
                    onChange={(e) => setFilter(prev => ({
                      ...prev,
                      dateRange: { ...prev.dateRange, end: new Date(e.target.value) }
                    }))}
                    className="w-full border rounded-md p-2 text-sm"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Log Stream with Virtual Scrolling */}
      <div className="h-96">
        {filteredLogs.length > 0 ? (
          <List
            ref={listRef}
            height={384}
            width="100%"
            itemCount={filteredLogs.length}
            itemSize={80}
            className="bg-gray-50"
          >
            {LogRow}
          </List>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            <div className="text-center">
              <AlertCircle className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <p>No logs match the current filters</p>
              <p className="text-sm">Try adjusting your search criteria</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 