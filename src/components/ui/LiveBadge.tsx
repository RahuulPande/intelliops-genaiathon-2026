'use client';

import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';

interface LiveBadgeProps {
  isActive: boolean;
  size?: 'sm' | 'md';
  showText?: boolean;
}

export default function LiveBadge({ isActive, size = 'md', showText = true }: LiveBadgeProps) {
  if (!isActive) return null;

  const sizeClasses = size === 'sm' ? 'gap-1 px-2 py-1 text-[10px]' : 'gap-1.5 px-2.5 py-1 text-xs';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.3 }}
      className={`inline-flex items-center ${sizeClasses} rounded-full font-bold uppercase tracking-wider bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800`}
    >
      {/* Pulsing dot indicator */}
      <motion.span
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="w-1.5 h-1.5 rounded-full bg-red-500 dark:bg-red-400 flex-shrink-0"
      />

      {/* Icon and text */}
      {showText && (
        <div className="flex items-center gap-0.5">
          <Zap className="w-3 h-3 flex-shrink-0" />
          <span>LIVE</span>
        </div>
      )}
    </motion.div>
  );
}
