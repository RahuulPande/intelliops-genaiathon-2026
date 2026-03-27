'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Lock,
  Crown,
  Clock,
  Zap,
  Layers,
  ArrowRight,
  Star,
  DollarSign,
  TrendingUp,
  CheckCircle
} from 'lucide-react';
import useLicenseStore, { LicenseType } from '@/store/license';

interface FeatureUpgradePromptProps {
  feature: string;
  currentLicense: LicenseType;
  requiredLicense: LicenseType;
  benefits?: Array<{
    icon: React.ComponentType<any>;
    text: string;
    value: string;
  }>;
  description?: string;
}

export default function FeatureUpgradePrompt({
  feature,
  currentLicense,
  requiredLicense,
  benefits = [],
  description
}: FeatureUpgradePromptProps) {
  const { changeLicense } = useLicenseStore();

  const getLicenseInfo = (license: LicenseType) => {
    switch (license) {
      case 'delivery':
        return { name: 'Delivery (L1)', price: '$2,500/month', icon: Zap, color: 'from-purple-500 to-indigo-600' };
      case 'operations':
        return { name: 'Operations (L1+L2)', price: '$4,000/month', icon: Layers, color: 'from-blue-500 to-cyan-600' };
      case 'trial':
        return { name: 'Trial (All)', price: 'Free 30-day', icon: Clock, color: 'from-green-500 to-emerald-600' };
      case 'enterprise':
        return { name: 'Enterprise (All)', price: '$5,000/month', icon: Crown, color: 'from-orange-500 to-red-600' };
      default:
        return { name: 'Enterprise (All)', price: '$5,000/month', icon: Crown, color: 'from-orange-500 to-red-600' };
    }
  };

  const currentLicenseInfo = getLicenseInfo(currentLicense);
  const requiredLicenseInfo = getLicenseInfo(requiredLicense);

  const defaultBenefits = [
    {
      icon: Star,
      text: '96% accuracy in finding historical solutions',
      value: 'Saves 75% incident resolution time'
    },
    {
      icon: DollarSign,
      text: 'Automated defect pattern recognition',
      value: 'Significant reduction in repeated issues'
    },
    {
      icon: TrendingUp,
      text: 'Institutional knowledge retention',
      value: '40% faster new team member onboarding'
    }
  ];

  const displayBenefits = benefits.length > 0 ? benefits : defaultBenefits;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 rounded-xl p-8 border-2 border-dashed border-gray-300 dark:border-gray-600"
    >
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-red-500 to-pink-500 rounded-full mb-4">
          <Lock className="w-8 h-8 text-white" />
        </div>

        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          {feature} - {requiredLicenseInfo.name} Feature
        </h3>

        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Currently viewing with {currentLicenseInfo.name} license
        </p>

        {description && (
          <p className="text-sm text-gray-500 dark:text-gray-400 max-w-md mx-auto">
            {description}
          </p>
        )}
      </div>

      {/* Feature Benefits */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {displayBenefits.map((benefit, index) => {
          const IconComponent = benefit.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-600 shadow-sm"
            >
              <div className="flex items-center space-x-3 mb-3">
                <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg">
                  <IconComponent className="w-5 h-5 text-white" />
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white">{benefit.text}</h4>
              </div>
              <p className="text-sm text-green-600 dark:text-green-400 font-medium">{benefit.value}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Upgrade Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <motion.button
          onClick={() => changeLicense(requiredLicense)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`flex items-center justify-center space-x-2 px-6 py-3 rounded-lg font-semibold text-white shadow-lg bg-gradient-to-r ${
            requiredLicense === 'enterprise'
              ? 'from-orange-500 to-red-600'
              : requiredLicense === 'operations'
              ? 'from-blue-500 to-cyan-600'
              : 'from-purple-500 to-indigo-600'
          }`}
        >
          {React.createElement(requiredLicenseInfo.icon, { className: 'w-5 h-5' })}
          <span>Try {requiredLicenseInfo.name} Features</span>
          <ArrowRight className="w-4 h-4" />
        </motion.button>

        {requiredLicense === 'enterprise' && (
          <motion.button
            onClick={() => changeLicense('trial')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center justify-center space-x-2 px-6 py-3 rounded-lg font-semibold bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg"
          >
            <Clock className="w-5 h-5" />
            <span>Start 30-Day Trial</span>
          </motion.button>
        )}
      </div>

      {/* Value Proposition */}
      <div className="mt-6 text-center">
        <div className="inline-flex items-center space-x-2 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-lg px-4 py-2">
          <CheckCircle className="w-4 h-4 text-green-600" />
          <span className="text-sm font-medium text-green-800 dark:text-green-300">
            Upgrade to see the full capabilities of the {requiredLicenseInfo.name} tier
          </span>
        </div>
      </div>

      {/* License Comparison */}
      <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-600">
        <h4 className="font-semibold text-gray-900 dark:text-white mb-4 text-center">License Comparison</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Current License</div>
            <div className="font-semibold text-gray-900 dark:text-white">{currentLicenseInfo.name}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">{currentLicenseInfo.price}</div>
          </div>
          <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg border border-blue-200 dark:border-blue-700">
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Required License</div>
            <div className="font-semibold text-gray-900 dark:text-white">{requiredLicenseInfo.name}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">{requiredLicenseInfo.price}</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
