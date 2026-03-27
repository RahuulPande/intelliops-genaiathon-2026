'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Monitor, Smartphone, Tablet, Check, X } from 'lucide-react';

export default function MobileReadyIndicator() {
  const [isVisible, setIsVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth;
      setIsMobile(width <= 768);
      setIsTablet(width > 768 && width <= 1024);
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  if (!isVisible) return null;

  const currentDevice = isMobile ? 'phone' : isTablet ? 'tablet' : 'desktop';
  const deviceIcon = isMobile ? Smartphone : isTablet ? Tablet : Monitor;
  const CurrentIcon = deviceIcon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 1 }}
      className="fixed bottom-6 left-6 z-40"
    >
      <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-2xl shadow-2xl p-4 max-w-sm">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Check className="w-5 h-5 text-green-200" />
            <span className="font-bold text-lg">100% Mobile Ready</span>
          </div>
          <button
            onClick={() => setIsVisible(false)}
            className="p-1 hover:bg-white/20 rounded-full transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-3">
          {/* Device Icons */}
          <div className="flex items-center justify-center space-x-4 py-2">
            <div className={`p-2 rounded-lg transition-all duration-300 ${!isMobile && !isTablet ? 'bg-white/30 scale-110' : 'bg-white/10'}`}>
              <Monitor className="w-6 h-6" />
            </div>
            <div className={`p-2 rounded-lg transition-all duration-300 ${isTablet ? 'bg-white/30 scale-110' : 'bg-white/10'}`}>
              <Tablet className="w-6 h-6" />
            </div>
            <div className={`p-2 rounded-lg transition-all duration-300 ${isMobile ? 'bg-white/30 scale-110' : 'bg-white/10'}`}>
              <Smartphone className="w-6 h-6" />
            </div>
          </div>

          {/* Dynamic Message */}
          <div className="text-center">
            <div className="text-green-100 text-sm">
              No App Required - Works Everywhere
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentDevice}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="mt-2"
              >
                {isMobile && (
                  <div className="bg-white/20 rounded-lg p-2 flex items-center justify-center space-x-2">
                    <CurrentIcon className="w-4 h-4" />
                    <span className="text-sm font-medium">Optimized for This Device</span>
                  </div>
                )}
                {isTablet && (
                  <div className="bg-white/20 rounded-lg p-2 flex items-center justify-center space-x-2">
                    <CurrentIcon className="w-4 h-4" />
                    <span className="text-sm font-medium">Perfect Tablet Experience</span>
                  </div>
                )}
                {!isMobile && !isTablet && (
                  <div className="bg-white/20 rounded-lg p-2 flex items-center justify-center space-x-2">
                    <CurrentIcon className="w-4 h-4" />
                    <span className="text-sm font-medium">Full Desktop Power</span>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Features */}
          <div className="text-xs text-green-100 space-y-1">
            <div className="flex items-center space-x-2">
              <Check className="w-3 h-3" />
              <span>Touch-optimized interface</span>
            </div>
            <div className="flex items-center space-x-2">
              <Check className="w-3 h-3" />
              <span>Responsive layouts</span>
            </div>
            <div className="flex items-center space-x-2">
              <Check className="w-3 h-3" />
              <span>Progressive web app</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}