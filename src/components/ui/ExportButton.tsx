'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Clock, Download, FileJson, FileText, Share2, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useToast } from '@/hooks/useToast';

interface ExportButtonProps {
  sectionName: string;
  onExport?: (format: string) => void;
}

const exportOptions = [
  {
    id: 'pdf',
    title: 'Export as PDF',
    description: 'Download report as PDF file',
    icon: FileText,
    action: 'pdf',
  },
  {
    id: 'json',
    title: 'Export as JSON',
    description: 'Export data in JSON format',
    icon: FileJson,
    action: 'json',
  },
  {
    id: 'slack',
    title: 'Share to Slack',
    description: 'Send report to team channel',
    icon: Share2,
    action: 'slack',
  },
  {
    id: 'schedule',
    title: 'Schedule Report',
    description: 'Set up recurring delivery',
    icon: Clock,
    action: 'schedule',
  },
];

const toastMessages = {
  pdf: (sectionName: string) => `PDF report generated: ${sectionName}`,
  json: () => 'JSON exported',
  slack: () => 'Shared to #intelliops-reports',
  schedule: () => 'Weekly report scheduled',
};

export default function ExportButton({ sectionName, onExport }: ExportButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  const handleExport = (action: string) => {
    // Trigger callback if provided
    if (onExport) {
      onExport(action);
    }

    // Show toast notification
    const message = toastMessages[action as keyof typeof toastMessages](sectionName);
    toast(message, 'success');

    // Close dropdown
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
      >
        <Download className="w-4 h-4" />
        Export
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-xl z-40"
          >
            <div className="p-2">
              {exportOptions.map(option => {
                const Icon = option.icon;
                return (
                  <button
                    key={option.id}
                    onClick={() => handleExport(option.action)}
                    className="w-full flex items-start gap-3 px-3 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors text-left"
                  >
                    <Icon className="w-5 h-5 mt-0.5 flex-shrink-0 text-gray-400 dark:text-gray-600" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{option.title}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{option.description}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
