'use client';

import { motion } from 'framer-motion';
import {
  Zap,
  Layers,
  Crown,
  Check,
  X,
  ArrowRight,
  Info,
  Clock
} from 'lucide-react';
import useLicenseStore from '@/store/license';

interface LicensingSectionProps {
  onNavigateToSection?: (section: string) => void;
}

export default function LicensingSection({ onNavigateToSection }: LicensingSectionProps) {
  const { changeLicense, currentLicense } = useLicenseStore();

  const tiers = [
    {
      id: 'delivery' as const,
      name: 'Delivery',
      fullName: 'Delivery Intelligence License',
      layers: 'Layer 1',
      price: '$2,500',
      period: '/month',
      icon: Zap,
      color: 'purple',
      gradient: 'from-purple-500 to-indigo-600',
      borderColor: 'border-purple-200 dark:border-purple-700',
      bgHighlight: 'bg-purple-50 dark:bg-purple-900/20',
      features: [
        { name: 'Test & Quality Intelligence', included: true },
        { name: 'Release Intelligence', included: true },
        { name: 'Application Knowledge Base', included: true },
        { name: 'AI Defect Matching', included: true },
        { name: 'Cross-Branch Intelligence', included: true },
        { name: 'Service Health Monitoring', included: false },
        { name: 'Predictive Operations', included: false },
        { name: 'Business Intelligence', included: false },
      ],
      limits: '200 services, 25 users',
      cta: 'View L1 Features',
    },
    {
      id: 'operations' as const,
      name: 'Operations',
      fullName: 'Operations Intelligence License',
      layers: 'Layer 1 + 2',
      price: '$4,000',
      period: '/month',
      icon: Layers,
      color: 'blue',
      gradient: 'from-blue-500 to-cyan-600',
      borderColor: 'border-blue-300 dark:border-blue-600',
      bgHighlight: 'bg-blue-50 dark:bg-blue-900/20',
      featured: true,
      features: [
        { name: 'Test & Quality Intelligence', included: true },
        { name: 'Release Intelligence', included: true },
        { name: 'Application Knowledge Base', included: true },
        { name: 'AI Defect Matching', included: true },
        { name: 'Cross-Branch Intelligence', included: true },
        { name: 'Service Health Monitoring', included: true },
        { name: 'Predictive Operations', included: true },
        { name: 'Business Intelligence', included: false },
      ],
      limits: '500 services, 100 users',
      cta: 'View L1+L2 Features',
    },
    {
      id: 'enterprise' as const,
      name: 'Enterprise',
      fullName: 'Enterprise Intelligence License',
      layers: 'All 3 Layers',
      price: '$5,000',
      period: '/month',
      icon: Crown,
      color: 'orange',
      gradient: 'from-orange-500 to-red-600',
      borderColor: 'border-orange-200 dark:border-orange-700',
      bgHighlight: 'bg-orange-50 dark:bg-orange-900/20',
      features: [
        { name: 'Test & Quality Intelligence', included: true },
        { name: 'Release Intelligence', included: true },
        { name: 'Application Knowledge Base', included: true },
        { name: 'AI Defect Matching', included: true },
        { name: 'Cross-Branch Intelligence', included: true },
        { name: 'Service Health Monitoring', included: true },
        { name: 'Predictive Operations', included: true },
        { name: 'Business Intelligence', included: true },
      ],
      limits: 'Unlimited services & users',
      cta: 'View All Features',
    },
  ];

  return (
    <section id="licensing" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            License Tiers Aligned to Platform Layers
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Start with Delivery Intelligence and expand progressively.
            Each tier includes all features from the previous tier.
          </p>
        </motion.div>

        {/* Tier Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {tiers.map((tier, index) => {
            const IconComponent = tier.icon;
            const isActive = currentLicense === tier.id;

            return (
              <motion.div
                key={tier.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className={`relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border-2 ${
                  isActive ? tier.borderColor : 'border-gray-200 dark:border-gray-700'
                } ${tier.featured ? 'ring-2 ring-blue-400 dark:ring-blue-500' : ''}`}
              >
                {tier.featured && (
                  <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-blue-500 to-cyan-600 text-white text-center text-xs font-bold py-1">
                    MOST POPULAR
                  </div>
                )}

                <div className={`p-6 ${tier.featured ? 'pt-8' : ''}`}>
                  {/* Header */}
                  <div className="flex items-center space-x-3 mb-4">
                    <div className={`p-2 rounded-lg bg-gradient-to-r ${tier.gradient}`}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">{tier.name}</h3>
                      <span className="text-sm text-gray-500 dark:text-gray-400">{tier.layers}</span>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-gray-900 dark:text-white">{tier.price}</span>
                    <span className="text-gray-500 dark:text-gray-400">{tier.period}</span>
                  </div>

                  {/* Features */}
                  <div className="space-y-3 mb-6">
                    {tier.features.map((feature) => (
                      <div key={feature.name} className="flex items-center space-x-2">
                        {feature.included ? (
                          <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                        ) : (
                          <X className="w-4 h-4 text-gray-300 dark:text-gray-600 flex-shrink-0" />
                        )}
                        <span className={`text-sm ${
                          feature.included
                            ? 'text-gray-700 dark:text-gray-300'
                            : 'text-gray-400 dark:text-gray-600'
                        }`}>
                          {feature.name}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Limits */}
                  <div className="text-xs text-gray-500 dark:text-gray-400 mb-6">
                    {tier.limits}
                  </div>

                  {/* CTA */}
                  <motion.button
                    onClick={() => {
                      changeLicense(tier.id);
                      if (onNavigateToSection) {
                        onNavigateToSection('test-quality-intelligence');
                      }
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full flex items-center justify-center space-x-2 py-3 rounded-lg font-semibold transition-all ${
                      isActive
                        ? `bg-gradient-to-r ${tier.gradient} text-white shadow-lg`
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    <span>{isActive ? 'Currently Active' : tier.cta}</span>
                    {!isActive && <ArrowRight className="w-4 h-4" />}
                  </motion.button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Trial + Judge Note */}
        <div className="grid md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center space-x-4 bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700"
          >
            <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <Clock className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white">Free 30-Day Trial</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Try all 3 intelligence layers with no commitment. Evaluate the full platform before choosing a tier.
              </p>
            </div>
            <button
              onClick={() => changeLicense('trial')}
              className="flex-shrink-0 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition-colors"
            >
              Start Trial
            </button>
          </motion.div>

          {/* Demo Note */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex items-center space-x-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl p-6 border border-purple-200 dark:border-purple-700"
          >
            <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
              <Info className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h4 className="font-semibold text-purple-800 dark:text-purple-300">Demo Focus: Delivery Intelligence</h4>
              <p className="text-sm text-purple-700 dark:text-purple-400">
                This demo showcases the full L1 Delivery Intelligence layer. Operations and Enterprise layers are part of the platform roadmap.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Prototype Note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-sm text-gray-500 dark:text-gray-400 mt-8 max-w-2xl mx-auto"
        >
          Platform concepts inspired by real-world implementations of defect intelligence, release decision support,
          and service monitoring in enterprise banking environments. This prototype demonstrates an integrated vision
          of what a unified operational intelligence platform could deliver.
        </motion.p>
      </div>
    </section>
  );
}
