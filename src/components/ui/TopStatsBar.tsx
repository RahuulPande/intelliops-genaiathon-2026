'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Activity, Shield, DollarSign, Globe, TrendingUp } from 'lucide-react';

interface StatData {
  icon: React.ElementType;
  value: number;
  suffix: string;
  label: string;
  color: string;
}

// Animated Counter Component
const AnimatedCounter = ({ value, suffix }: { value: number; suffix: string }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (!isInitialized) {
      // Initial animation
      let start = 0;
      const duration = 2000;
      const increment = value / (duration / 16);
      
      const animate = () => {
        start += increment;
        if (start < value) {
          setDisplayValue(Math.floor(start));
          requestAnimationFrame(animate);
        } else {
          setDisplayValue(value);
          setIsInitialized(true);
        }
      };
      
      requestAnimationFrame(animate);
    } else {
      // Smooth transition for updates
      setDisplayValue(value);
    }
  }, [value, isInitialized]);

  return (
    <span className="font-bold text-white tabular-nums">
      {displayValue.toLocaleString()}{suffix}
    </span>
  );
};

export default function TopStatsBar() {
  const [stats, setStats] = useState<StatData[]>([
    { icon: Activity, value: 150, suffix: '+', label: 'Services', color: 'text-blue-500' },
    { icon: Shield, value: 50, suffix: '+', label: 'Incidents Prevented Daily', color: 'text-green-500' },
    { icon: DollarSign, value: 45, suffix: 'K', label: 'Daily Savings', color: 'text-purple-500' },
    { icon: Globe, value: 4500, suffix: '+', label: 'Banks Can Benefit', color: 'text-orange-500' }
  ]);

  // Real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => prev.map(stat => {
        if (stat.label === 'Incidents Prevented Daily') {
          return { ...stat, value: Math.floor(Math.random() * 10) + 45 }; // 45-55
        }
        if (stat.label === 'Daily Savings') {
          return { ...stat, value: Math.floor(Math.random() * 5) + 43 }; // 43-48K
        }
        return stat;
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 text-white py-3 px-4 shadow-lg relative overflow-hidden border-b border-blue-800/30"
    >
      {/* Background Animation */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 via-purple-400/10 to-pink-400/10 animate-pulse"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="flex items-center justify-center space-x-6 md:space-x-10 text-sm">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.15 }}
              className="flex items-center space-x-3 group cursor-default hover:bg-white/10 px-3 py-1 rounded-lg transition-all duration-200"
            >
              <div className={`p-1.5 rounded-lg bg-white/10 group-hover:bg-white/20 transition-colors duration-200`}>
                <stat.icon className={`w-4 h-4 ${stat.color} group-hover:scale-110 transition-transform duration-200`} />
              </div>
              <div className="flex flex-col">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                <span className="text-white/80 text-xs leading-tight">{stat.label}</span>
              </div>
              {index < stats.length - 1 && (
                <div className="w-px h-8 bg-gradient-to-b from-transparent via-white/30 to-transparent ml-3"></div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Subtle animated dots */}
      <div className="absolute top-1/2 left-4 w-1 h-1 bg-green-400 rounded-full animate-ping"></div>
      <div className="absolute top-1/2 right-4 w-1 h-1 bg-blue-400 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
    </motion.div>
  );
}