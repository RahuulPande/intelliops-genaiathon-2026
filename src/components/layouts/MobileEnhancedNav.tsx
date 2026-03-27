'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home,
  Activity,
  AlertTriangle,
  Brain,
  Package,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  Search,
  Bell,
  User
} from 'lucide-react';
import { useMobileResponsive, useSwipeGestures, useMobileNavigation } from '@/lib/hooks/useMobileResponsive';

interface MobileEnhancedNavProps {
  currentSection: string;
  onSectionChange: (section: string) => void;
  sections: Array<{
    id: string;
    name: string;
    icon: React.ComponentType<any>;
    shortName?: string;
  }>;
}

export default function MobileEnhancedNav({ 
  currentSection, 
  onSectionChange, 
  sections 
}: MobileEnhancedNavProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showQuickActions, setShowQuickActions] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const mobileState = useMobileResponsive();
  const { currentIndex, navigateNext, navigatePrevious, navigateTo } = useMobileNavigation();

  // Find current section index
  const currentSectionIndex = sections.findIndex(section => section.id === currentSection);

  // Swipe gestures for navigation
  const { touchEventHandlers } = useSwipeGestures({
    onSwipeLeft: () => {
      const nextIndex = Math.min(currentSectionIndex + 1, sections.length - 1);
      if (nextIndex !== currentSectionIndex) {
        onSectionChange(sections[nextIndex].id);
        navigateNext();
      }
    },
    onSwipeRight: () => {
      const prevIndex = Math.max(currentSectionIndex - 1, 0);
      if (prevIndex !== currentSectionIndex) {
        onSectionChange(sections[prevIndex].id);
        navigatePrevious();
      }
    },
    onSwipeUp: () => {
      setIsExpanded(true);
    },
    onSwipeDown: () => {
      setIsExpanded(false);
    },
    minSwipeDistance: 30
  });

  // Touch-friendly section change
  const handleSectionChange = (sectionId: string, index: number) => {
    onSectionChange(sectionId);
    navigateTo(index);
    setIsExpanded(false);
    
    // Haptic feedback if available
    if ('vibrate' in navigator) {
      navigator.vibrate(50);
    }
  };

  // Auto-hide on scroll (for even more screen space)
  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down
        setIsExpanded(false);
      }
      lastScrollY = currentScrollY;
    };

    if (mobileState.isMobile) {
      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [mobileState.isMobile]);

  if (!mobileState.isMobile) {
    return null; // Only show on mobile
  }

  return (
    <>
      {/* Swipe Area Indicator */}
      <div
        ref={navRef}
        className="fixed inset-0 pointer-events-none z-10"
        {...touchEventHandlers}
      />

      {/* Expanded Navigation Modal */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setIsExpanded(false)}
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              className="absolute bottom-0 left-0 right-0 bg-white rounded-t-xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Handle */}
              <div className="flex justify-center pt-3 pb-2">
                <div className="w-12 h-1 bg-gray-300 rounded-full"></div>
              </div>
              
              {/* Header */}
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Navigation</h3>
                <p className="text-sm text-gray-600">Swipe left/right to navigate between sections</p>
              </div>

              {/* Section Grid */}
              <div className="p-6">
                <div className="grid grid-cols-2 gap-4">
                  {sections.map((section, index) => {
                    const IconComponent = section.icon;
                    const isActive = section.id === currentSection;
                    
                    return (
                      <motion.button
                        key={section.id}
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: index * 0.05 }}
                        onClick={() => handleSectionChange(section.id, index)}
                        className={`p-4 rounded-lg text-left transition-all ${
                          isActive 
                            ? 'bg-blue-100 border border-blue-200 text-blue-700' 
                            : 'bg-gray-50 border border-gray-200 text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`p-2 rounded-lg ${
                            isActive ? 'bg-blue-200' : 'bg-gray-200'
                          }`}>
                            <IconComponent className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="font-medium text-sm">{section.name}</div>
                            {isActive && (
                              <div className="text-xs text-blue-600">Current section</div>
                            )}
                          </div>
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="px-6 py-4 border-t border-gray-200">
                <div className="flex justify-between">
                  <button className="flex flex-col items-center space-y-1 p-3 rounded-lg bg-gray-100 text-gray-600">
                    <Search className="w-5 h-5" />
                    <span className="text-xs">Search</span>
                  </button>
                  
                  <button className="flex flex-col items-center space-y-1 p-3 rounded-lg bg-gray-100 text-gray-600">
                    <Bell className="w-5 h-5" />
                    <span className="text-xs">Alerts</span>
                  </button>
                  
                  <button className="flex flex-col items-center space-y-1 p-3 rounded-lg bg-gray-100 text-gray-600">
                    <Settings className="w-5 h-5" />
                    <span className="text-xs">Settings</span>
                  </button>
                  
                  <button className="flex flex-col items-center space-y-1 p-3 rounded-lg bg-gray-100 text-gray-600">
                    <User className="w-5 h-5" />
                    <span className="text-xs">Profile</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Compact Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
        {/* Swipe Indicator */}
        <div className="flex justify-center py-1">
          <div className="flex space-x-1">
            {sections.map((_, index) => (
              <div
                key={index}
                className={`w-1 h-1 rounded-full transition-colors ${
                  index === currentSectionIndex ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Navigation Content */}
        <div className="grid grid-cols-5 gap-1 p-2 pb-safe">
          {/* Previous Button */}
          <button
            onClick={() => {
              const prevIndex = Math.max(currentSectionIndex - 1, 0);
              if (prevIndex !== currentSectionIndex) {
                handleSectionChange(sections[prevIndex].id, prevIndex);
              }
            }}
            disabled={currentSectionIndex === 0}
            className={`flex flex-col items-center justify-center py-2 px-1 rounded-lg transition-all ${
              currentSectionIndex === 0 
                ? 'text-gray-300' 
                : 'text-gray-600 hover:bg-gray-100 active:bg-gray-200'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="text-xs">Prev</span>
          </button>

          {/* Current Section (Center) */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex flex-col items-center justify-center py-2 px-1 rounded-lg transition-all col-span-3 text-blue-600 bg-blue-50"
          >
            <div className="relative">
              {(() => {
                const currentSectionData = sections[currentSectionIndex];
                if (!currentSectionData) return null;
                const IconComponent = currentSectionData.icon;
                return (
                  <>
                    <IconComponent className="w-5 h-5" />
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-blue-600 rounded-full"></div>
                  </>
                );
              })()}
            </div>
            <span className="text-xs font-medium">
              {sections[currentSectionIndex]?.shortName || sections[currentSectionIndex]?.name || 'Dashboard'}
            </span>
          </button>

          {/* Next Button */}
          <button
            onClick={() => {
              const nextIndex = Math.min(currentSectionIndex + 1, sections.length - 1);
              if (nextIndex !== currentSectionIndex) {
                handleSectionChange(sections[nextIndex].id, nextIndex);
              }
            }}
            disabled={currentSectionIndex === sections.length - 1}
            className={`flex flex-col items-center justify-center py-2 px-1 rounded-lg transition-all ${
              currentSectionIndex === sections.length - 1 
                ? 'text-gray-300' 
                : 'text-gray-600 hover:bg-gray-100 active:bg-gray-200'
            }`}
          >
            <ChevronRight className="w-4 h-4" />
            <span className="text-xs">Next</span>
          </button>
        </div>

        {/* Gesture Hint */}
        <div className="text-center pb-1">
          <span className="text-xs text-gray-400">
            ↔ Swipe to navigate • ↑ Tap to expand
          </span>
        </div>
      </div>

      {/* Safe area for iOS */}
      <div className="h-safe-area-inset-bottom bg-white"></div>
    </>
  );
} 