'use client';

import { useState } from 'react';
import ExportButton from './ExportButton';
import { useToast } from '@/context/ToastContext';

export default function ExportShareDemo() {
  const { toast } = useToast();
  const [lastExportFormat, setLastExportFormat] = useState<string>('');

  const handleExport = (format: string) => {
    setLastExportFormat(format);
  };

  return (
    <div className="space-y-8 p-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Export & Share Demo
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
          Demonstrates the Export Button and Toast notification system.
        </p>
      </div>

      {/* Export Button Demo */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Release Risk Report
          </h3>
          <ExportButton sectionName="Release Risk Report" onExport={handleExport} />
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Click the Export button above to see the dropdown menu with export options.
        </p>
        {lastExportFormat && (
          <p className="text-sm text-blue-600 dark:text-blue-400">
            Last export format: <strong>{lastExportFormat}</strong>
          </p>
        )}
      </div>

      {/* Toast Type Examples */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Toast Notifications</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <button
            onClick={() => toast('Operation completed successfully!', 'success')}
            className="px-4 py-2 text-sm font-medium text-white bg-green-500 hover:bg-green-600 rounded-lg transition-colors"
          >
            Success
          </button>
          <button
            onClick={() => toast('An error occurred during processing', 'error')}
            className="px-4 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-lg transition-colors"
          >
            Error
          </button>
          <button
            onClick={() => toast('Here is some important information', 'info')}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors"
          >
            Info
          </button>
          <button
            onClick={() => toast('Please be careful with this action', 'warning')}
            className="px-4 py-2 text-sm font-medium text-white bg-amber-500 hover:bg-amber-600 rounded-lg transition-colors"
          >
            Warning
          </button>
        </div>
      </div>

      {/* Multiple Export Buttons */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Multiple Sections</h3>
        <div className="space-y-4">
          {['Test Quality Analysis', 'Incident Root Cause', 'Deployment Readiness'].map(
            sectionName => (
              <div
                key={sectionName}
                className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 flex items-center justify-between"
              >
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {sectionName}
                </span>
                <ExportButton sectionName={sectionName} onExport={handleExport} />
              </div>
            ),
          )}
        </div>
      </div>

      {/* Feature Overview */}
      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800 p-6">
        <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-300 mb-4">Features</h3>
        <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-400">
          <li className="flex gap-2">
            <span>✓</span>
            <span>Export Button with 4 export options (PDF, JSON, Slack, Schedule)</span>
          </li>
          <li className="flex gap-2">
            <span>✓</span>
            <span>Toast notifications with 4 types (success, error, info, warning)</span>
          </li>
          <li className="flex gap-2">
            <span>✓</span>
            <span>Auto-dismiss toasts after 4 seconds</span>
          </li>
          <li className="flex gap-2">
            <span>✓</span>
            <span>Click-outside detection for dropdown</span>
          </li>
          <li className="flex gap-2">
            <span>✓</span>
            <span>Full dark mode support</span>
          </li>
          <li className="flex gap-2">
            <span>✓</span>
            <span>Framer Motion animations</span>
          </li>
          <li className="flex gap-2">
            <span>✓</span>
            <span>lucide-react icons only</span>
          </li>
          <li className="flex gap-2">
            <span>✓</span>
            <span>TypeScript strict mode</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
