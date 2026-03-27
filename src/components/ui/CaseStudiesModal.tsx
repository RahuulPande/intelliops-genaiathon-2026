'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, Building2, Globe, Building, Shield } from 'lucide-react';

interface CaseStudy {
  id: string;
  title: string;
  company: string;
  industry: string;
  icon: any;
  challenge: string;
  solution: string;
  results: {
    metric: string;
    value: string;
    description: string;
  }[];
}

interface CaseStudiesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const caseStudies: CaseStudy[] = [
  {
    id: '1',
    title: 'Global Bank Reduces Incident Response Time by 70%',
    company: 'Global Banking Corp',
    industry: 'Banking',
    icon: Building,
    challenge: 'Manual incident detection and response leading to extended downtime and customer dissatisfaction.',
    solution: 'Implemented AI-powered incident detection and automated response workflows.',
    results: [
      { metric: 'MTTR Reduction', value: '70%', description: 'From 6 hours to 45 minutes' },
      { metric: 'Cost Savings', value: '$2.5M', description: 'Annual incident management costs' },
      { metric: 'Customer Satisfaction', value: '+25%', description: 'Improvement in NPS score' }
    ]
  },
  {
    id: '2',
    title: 'Insurance Provider Achieves 99.99% System Uptime',
    company: 'Secure Insurance Ltd',
    industry: 'Insurance',
    icon: Building2,
    challenge: 'Frequent system outages affecting critical payment processing systems.',
    solution: 'Deployed predictive maintenance and real-time health monitoring.',
    results: [
      { metric: 'System Uptime', value: '99.99%', description: 'Up from 98.5%' },
      { metric: 'Failed Transactions', value: '-95%', description: 'Reduction in failed payments' },
      { metric: 'Revenue Impact', value: '+$3.2M', description: 'Additional annual revenue' }
    ]
  },
  {
    id: '3',
    title: 'Investment Firm Enhances Security Compliance',
    company: 'Capital Investments Inc',
    industry: 'Investment',
    icon: Shield,
    challenge: 'Complex regulatory compliance requirements and security vulnerabilities.',
    solution: 'Implemented automated compliance checks and security monitoring.',
    results: [
      { metric: 'Compliance Rate', value: '100%', description: 'Automated compliance verification' },
      { metric: 'Security Incidents', value: '-80%', description: 'Reduction in security breaches' },
      { metric: 'Audit Time', value: '-60%', description: 'Reduction in audit preparation' }
    ]
  },
  {
    id: '4',
    title: 'International Bank Optimizes Cloud Costs',
    company: 'World Finance Bank',
    industry: 'Banking',
    icon: Globe,
    challenge: 'Escalating cloud infrastructure costs and inefficient resource utilization.',
    solution: 'Deployed AI-driven resource optimization and cost monitoring.',
    results: [
      { metric: 'Cost Reduction', value: '45%', description: 'Annual cloud infrastructure costs' },
      { metric: 'Resource Efficiency', value: '+60%', description: 'Improvement in resource utilization' },
      { metric: 'ROI', value: '312%', description: 'First year return on investment' }
    ]
  }
];

export default function CaseStudiesModal({ isOpen, onClose }: CaseStudiesModalProps) {
  const [selectedCase, setSelectedCase] = useState<CaseStudy | null>(null);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[80vh] overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Success Stories</h2>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(80vh-140px)]">
              {selectedCase ? (
                // Detailed Case Study View
                <div className="space-y-6">
                  <button
                    onClick={() => setSelectedCase(null)}
                    className="text-blue-600 hover:text-blue-700 flex items-center space-x-1 mb-4"
                  >
                    <span>← Back to all cases</span>
                  </button>
                  
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-blue-100 rounded-lg text-blue-600">
                      <selectedCase.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{selectedCase.title}</h3>
                      <p className="text-gray-600">{selectedCase.company} • {selectedCase.industry}</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900">Challenge</h4>
                      <p className="text-gray-600 mt-1">{selectedCase.challenge}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Solution</h4>
                      <p className="text-gray-600 mt-1">{selectedCase.solution}</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-4">Key Results</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {selectedCase.results.map((result, index) => (
                        <div
                          key={index}
                          className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors"
                        >
                          <div className="text-2xl font-bold text-blue-600">{result.value}</div>
                          <div className="font-medium text-gray-900">{result.metric}</div>
                          <div className="text-sm text-gray-600">{result.description}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                // Case Studies Grid
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {caseStudies.map((study) => (
                    <button
                      key={study.id}
                      onClick={() => setSelectedCase(study)}
                      className="text-left bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors group"
                    >
                      <div className="flex items-start space-x-4">
                        <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                          <study.icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                            {study.title}
                          </h3>
                          <p className="text-sm text-gray-600 mt-1">
                            {study.company} • {study.industry}
                          </p>
                        </div>
                        <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 