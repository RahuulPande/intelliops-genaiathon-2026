'use client';

import React from 'react';
import { Zap } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function LicenseSelector() {
  const { isAdmin } = useAuth();

  // Hide the license badge entirely in dev mode — it's a demo/marketing artifact
  if (isAdmin) return null;

  return (
    <div className="flex items-center space-x-3">
      {/* Active License Badge */}
      <div className="flex items-center space-x-2 bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-lg px-4 py-2 border border-purple-200 dark:border-purple-700">
        <div className="p-1.5 bg-purple-100 dark:bg-purple-900/30 rounded-full">
          <Zap className="w-4 h-4 text-purple-600 dark:text-purple-400" />
        </div>
        <div>
          <div className="text-sm font-semibold text-gray-900 dark:text-white">
            Delivery Intelligence
          </div>
        </div>
      </div>
    </div>
  );
}