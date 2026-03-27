'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, Zap, Target } from 'lucide-react';
import AIDefectMatcher from '@/components/dashboard/AIDefectMatcher';
import PredictiveAnalytics from '@/components/dashboard/PredictiveAnalytics';
import AIInsightsPanel from '@/components/dashboard/AIInsightsPanel';
import DefectAnalytics from '@/components/dashboard/DefectAnalytics';

// Animated Counter Component
const AnimatedCounter = ({ end, duration = 2000, prefix = '', suffix = '' }: {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp: number;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [end, duration]);

  return <span>{prefix}{count.toLocaleString()}{suffix}</span>;
};

export default function AIIntelligenceSection() {
  const [activeTab, setActiveTab] = useState('insights');

  const tabs = [
    { id: 'insights', label: 'AI Insights', component: AIInsightsPanel },
    { id: 'defects', label: 'Defect Matching', component: AIDefectMatcher },
    { id: 'predictions', label: 'Predictions', component: PredictiveAnalytics },
    { id: 'analytics', label: 'Defect Analytics', component: DefectAnalytics },
  ];

  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component || AIInsightsPanel;

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">AI Intelligence</h1>
        <p className="text-gray-600 mt-1">AI-powered insights and predictions</p>
      </div>

      {/* Industry First Badge */}
      <motion.div
        initial={{ opacity: 0, y: -20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="relative"
      >
        <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 rounded-2xl p-6 shadow-2xl border-2 border-amber-300/50">
          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-amber-400 via-orange-400 to-red-400 rounded-2xl blur-lg opacity-30 -z-10"></div>
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="bg-white/20 p-2 rounded-full">
                  <Star className="w-6 h-6 text-white animate-pulse" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white flex items-center">
                    ⭐ Industry First: AI-Powered Defect Matching
                  </h3>
                  <p className="text-orange-100 text-sm mt-1">
                    Revolutionary pattern recognition technology
                  </p>
                </div>
              </div>
              
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center min-w-[120px]">
                <div className="text-3xl font-bold text-white">
                  <AnimatedCounter end={96} />%
                </div>
                <div className="text-orange-100 text-xs">Accuracy</div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Zap className="w-4 h-4 text-yellow-300" />
                  <span className="text-white font-medium text-sm">Matches Found</span>
                </div>
                <div className="text-2xl font-bold text-white">
                  <AnimatedCounter end={12847} duration={3000} />
                </div>
                <div className="text-orange-200 text-xs">This month</div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Target className="w-4 h-4 text-green-300" />
                  <span className="text-white font-medium text-sm">Time Saved</span>
                </div>
                <div className="text-2xl font-bold text-white">
                  <AnimatedCounter end={2340} duration={2500} />h
                </div>
                <div className="text-orange-200 text-xs">Developer hours</div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Star className="w-4 h-4 text-blue-300" />
                  <span className="text-white font-medium text-sm">Success Rate</span>
                </div>
                <div className="text-2xl font-bold text-white">
                  <AnimatedCounter end={96} duration={1500} />%
                </div>
                <div className="text-orange-200 text-xs">Industry leading</div>
              </div>
            </div>

            <div className="mt-4 p-3 bg-white/10 backdrop-blur-sm rounded-lg">
              <p className="text-orange-100 text-sm">
                🚀 <strong>Why Revolutionary?</strong> Our AI doesn't just detect defects—it learns from historical patterns across 4,500+ banking systems to predict and prevent issues before they impact customers. No other platform offers this level of predictive intelligence.
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Sub-navigation */}
      <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Active Component */}
      <ActiveComponent />
    </div>
  );
}