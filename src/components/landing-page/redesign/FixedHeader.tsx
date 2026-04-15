'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  QrCode, 
  Menu, 
  X, 
  Trophy,
  ExternalLink
} from 'lucide-react';

interface FixedHeaderProps {
  onNavigateToSection: (section: string) => void;
}

export default function FixedHeader({ onNavigateToSection }: FixedHeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);

  const navigationItems = [
    { id: 'concept', label: 'Concept', section: 'what-is-delivery-intelligence' },
    { id: 'problem', label: 'Problem', section: 'problem-statement' },
    { id: 'ai', label: 'AI Approach', section: 'ai-usage' },
    { id: 'features', label: 'Features', section: 'delivery-features' },
    { id: 'impact', label: 'Impact', section: 'delivery-impact' },
    { id: 'roadmap', label: 'Roadmap', section: 'product-roadmap' },
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ 
      behavior: 'smooth', 
      block: 'start',
      inline: 'nearest'
    });
    setIsMenuOpen(false);
  };

  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

  return (
    <>
      {/* Fixed Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-[#1A1A1A]/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 shadow-sm"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo and Brand */}
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">IO</span>
              </div>
              <div>
                <div className="font-bold text-gray-900 dark:text-white">IntelliOps AI</div>
                <div className="text-xs text-gray-600 dark:text-gray-400 hidden sm:block">Where Operations Become Intelligent</div>
              </div>
            </div>

            {/* Navigation Menu - Desktop */}
            <nav className="hidden md:flex items-center space-x-8">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.section)}
                  className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors duration-200 relative group"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 dark:bg-blue-400 transition-all duration-200 group-hover:w-full"></span>
                </button>
              ))}
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-4">
              
              {/* QR Code Button */}
              <button
                onClick={() => setIsQRModalOpen(true)}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                title="Mobile Access QR Code"
              >
                <QrCode className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              </button>

              {/* GenAIathon Badge */}
              <div className="hidden sm:flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-blue-600 px-3 py-1.5 rounded-full shadow-md">
                <Trophy className="w-4 h-4 text-white" />
                <span className="text-sm font-medium text-white">GenAIathon 2026</span>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                {isMenuOpen ? <X className="w-5 h-5 dark:text-gray-300" /> : <Menu className="w-5 h-5 dark:text-gray-300" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-gray-200 dark:border-gray-700 py-4"
            >
              <nav className="flex flex-col space-y-3">
                {navigationItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.section)}
                    className="text-left text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium py-2 transition-colors"
                  >
                    {item.label}
                  </button>
                ))}
                <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center space-x-2 text-purple-600 dark:text-purple-400">
                    <Trophy className="w-4 h-4" />
                    <span className="text-sm font-medium">GenAIathon 2026</span>
                  </div>
                </div>
              </nav>
            </motion.div>
          )}
        </div>
      </motion.header>

      {/* QR Code Modal */}
      {isQRModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="bg-white dark:bg-[#1A1A1A] rounded-xl p-6 max-w-md mx-4 shadow-2xl"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Mobile Access</h3>
              <button
                onClick={() => setIsQRModalOpen(false)}
                className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              </button>
            </div>
            
            <div className="text-center">
              <div className="bg-white dark:bg-[#1A1A1A] p-4 rounded-lg border-2 border-gray-200 dark:border-gray-800 mb-4 inline-block">
                <img 
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(currentUrl)}`}
                  alt="QR Code for mobile access"
                  className="w-48 h-48"
                />
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                Scan this QR code with your phone to access the platform instantly
              </p>
              <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400 truncate flex-1">{currentUrl}</span>
                  <button
                    onClick={() => navigator.clipboard?.writeText(currentUrl)}
                    className="ml-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
} 