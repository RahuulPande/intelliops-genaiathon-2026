'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Command, Search, HelpCircle } from 'lucide-react';

interface KeyboardShortcutsProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Shortcut {
  keys: string[];
  description: string;
  category: string;
}

export default function KeyboardShortcuts({ isOpen, onClose }: KeyboardShortcutsProps) {
  const shortcuts: Shortcut[] = [
    // General
    { keys: ['?'], description: 'Show keyboard shortcuts', category: 'General' },
    { keys: ['⌘', 'K'], description: 'Open global search', category: 'General' },
    { keys: ['Esc'], description: 'Close modal/search', category: 'General' },
    { keys: ['Ctrl', 'L'], description: 'Start live demo tour', category: 'General' },
    { keys: ['Ctrl', 'Q'], description: 'Show QR code for mobile access', category: 'General' },
    
    // Demo shortcuts
    { keys: ['Ctrl', '1'], description: 'Morning health check demo', category: 'Demo' },
    { keys: ['Ctrl', '2'], description: 'Cascade failure demo', category: 'Demo' },
    { keys: ['Ctrl', '3'], description: 'Release ready demo', category: 'Demo' },
    { keys: ['Ctrl', '4'], description: 'AI defect matching demo', category: 'Demo' },
    { keys: ['Ctrl', '5'], description: 'AI insights demo', category: 'Demo' },
    { keys: ['Ctrl', '6'], description: 'Predictive analytics demo', category: 'Demo' },
    
    // Navigation shortcuts
    { keys: ['g', 'h'], description: 'Go to Platform Overview', category: 'Navigation' },
    { keys: ['g', 'i'], description: 'L1: Test & Quality Intelligence', category: 'Navigation' },
    { keys: ['g', 'r'], description: 'L1: Release Intelligence', category: 'Navigation' },
    { keys: ['g', 'k'], description: 'L1: Application Knowledge Base', category: 'Navigation' },
    { keys: ['g', 's'], description: 'L2: Service Health & Incidents', category: 'Navigation' },
    { keys: ['g', 'a'], description: 'L3: Business Intelligence', category: 'Navigation' },
    { keys: ['g', 't'], description: 'Go to Technical Docs', category: 'Navigation' },
    
    // Actions
    { keys: ['r'], description: 'Refresh data', category: 'Actions' },
    { keys: ['f'], description: 'Toggle favorites filter', category: 'Actions' },
    { keys: ['/'], description: 'Focus search input', category: 'Actions' }
  ];

  const categories = Array.from(new Set(shortcuts.map(s => s.category)));

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl mx-4 bg-white rounded-lg shadow-2xl z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <HelpCircle className="w-5 h-5 text-blue-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900">Keyboard Shortcuts</h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="max-h-96 overflow-y-auto p-6">
              <div className="space-y-6">
                {categories.map((category) => (
                  <div key={category}>
                    <h3 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">
                      {category}
                    </h3>
                    <div className="space-y-2">
                      {shortcuts
                        .filter(shortcut => shortcut.category === category)
                        .map((shortcut, index) => (
                          <div key={index} className="flex items-center justify-between py-2">
                            <span className="text-gray-700">{shortcut.description}</span>
                            <div className="flex items-center space-x-1">
                              {shortcut.keys.map((key, keyIndex) => (
                                <span key={keyIndex} className="flex items-center">
                                  <kbd className="px-2 py-1 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-300 rounded">
                                    {key}
                                  </kbd>
                                  {keyIndex < shortcut.keys.length - 1 && (
                                    <span className="mx-1 text-gray-400">+</span>
                                  )}
                                </span>
                              ))}
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">
              <div className="flex items-center justify-center text-xs text-gray-500">
                <span>Press</span>
                <kbd className="mx-1 px-1 py-0.5 bg-white border border-gray-300 rounded">?</kbd>
                <span>anytime to see this help</span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
} 