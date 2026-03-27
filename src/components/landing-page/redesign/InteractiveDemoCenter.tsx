'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, 
  BarChart3, 
  Shield, 
  Brain, 
  GitBranch, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  DollarSign,
  TrendingUp,
  Monitor,
  Search
} from 'lucide-react';

interface InteractiveDemoCenterProps {
  onNavigateToSection: (section: string) => void;
}

export default function InteractiveDemoCenter({ onNavigateToSection }: InteractiveDemoCenterProps) {
  const [activeDemo, setActiveDemo] = useState<string | null>(null);
  const [demoProgress, setDemoProgress] = useState(0);

  const demos = [
    {
      id: 'morning-health',
      title: 'Morning Health Check',
      subtitle: 'AI Predictive Service Monitoring',
      icon: Monitor,
      businessImpact: 'Prevents $25K downtime incident',
      description: 'AI detects payment gateway degradation 4 hours before failure',
      scenario: {
        setup: 'Payment gateway showing subtle performance degradation',
        detection: 'AI analyzes patterns and predicts failure in 4 hours',
        action: 'Automated alerts trigger preventive maintenance',
        result: 'Critical failure prevented, 99.99% uptime maintained'
      },
      metrics: {
        timeToDetection: '15 seconds',
        accuracyRate: '94%',
        downtimePrevented: '4.2 hours',
        costSavings: '$25,000'
      },
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'cascade-prevention',
      title: 'Cascade Failure Prevention',
      subtitle: 'Intelligent System Protection',
      icon: Shield,
      businessImpact: 'Saves $47K+ in business impact',
      description: 'AI prevents database failure from cascading to user systems',
      scenario: {
        setup: 'Database connection pool approaching saturation',
        detection: 'AI recognizes early cascade failure patterns',
        action: 'Automated circuit breakers isolate affected services',
        result: 'Cascade prevented, user experience protected'
      },
      metrics: {
        timeToDetection: '8 seconds',
        accuracyRate: '96%',
        systemsProtected: '127',
        costSavings: '$47,300'
      },
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 'ai-defect-matching',
      title: 'AI Defect Matching',
      subtitle: 'Historical Pattern Recognition',
      icon: Brain,
      businessImpact: '96% accuracy, saves 4+ hours resolution time',
      description: 'AI finds historical solutions by analyzing patterns across 5 years of data',
      scenario: {
        setup: 'New critical incident reported by operations team',
        detection: 'AI matches patterns against 50,000+ historical cases',
        action: 'System suggests 3 proven solutions with confidence scores',
        result: 'Incident resolved using historical knowledge in 47 minutes'
      },
      metrics: {
        timeToDetection: '3 seconds',
        accuracyRate: '96%',
        resolutionTime: '47 minutes',
        costSavings: '$12,800'
      },
      color: 'from-purple-500 to-violet-500'
    },
    {
      id: 'release-decision',
      title: 'Release Decision Workflow',
      subtitle: 'AI-Powered Deployment Intelligence',
      icon: GitBranch,
      businessImpact: 'Prevents $48K deployment failure',
      description: 'AI detects missing critical merge that would cause production failure',
      scenario: {
        setup: 'Release candidate ready for production deployment',
        detection: 'AI analyzes 200+ merge commits and dependency changes',
        action: 'Critical missing security patch identified and flagged',
        result: 'Deployment blocked, security issue resolved, safe release'
      },
      metrics: {
        timeToDetection: '12 seconds',
        accuracyRate: '98%',
        deploymentsAnalyzed: '847',
        costSavings: '$48,200'
      },
      color: 'from-orange-500 to-red-500'
    }
  ];

  const runDemo = async (demoId: string) => {
    setActiveDemo(demoId);
    setDemoProgress(0);
    
    // Simulate demo progress
    for (let i = 0; i <= 100; i += 10) {
      setDemoProgress(i);
      await new Promise(resolve => setTimeout(resolve, 200));
    }
    
    // Keep demo visible for a moment
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

  const resetDemo = () => {
    setActiveDemo(null);
    setDemoProgress(0);
  };

  return (
    <section id="demo-center" className="py-20 bg-gradient-to-br from-gray-900 to-blue-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Experience AI-Powered Operations Intelligence
          </h2>
          <p className="text-xl text-blue-200 max-w-4xl mx-auto mb-8">
            Live simulations showcasing measurable business impact across real banking scenarios
          </p>
        </motion.div>

        {/* Demo Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {demos.map((demo, index) => (
            <motion.div
              key={demo.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:border-white/40 transition-all"
            >
              {/* Demo Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-lg bg-gradient-to-r ${demo.color}`}>
                    <demo.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{demo.title}</h3>
                    <p className="text-blue-200 text-sm">{demo.subtitle}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-green-400 font-semibold text-sm">
                    {demo.businessImpact}
                  </div>
                </div>
              </div>

              {/* Demo Description */}
              <p className="text-blue-100 mb-6">{demo.description}</p>

              {/* Demo Button */}
              <div className="flex items-center justify-between mb-6">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => runDemo(demo.id)}
                  disabled={activeDemo === demo.id && demoProgress < 100}
                  className="flex items-center space-x-2 bg-white text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors disabled:opacity-70"
                >
                  <Play className="w-4 h-4" />
                  <span>
                    {activeDemo === demo.id && demoProgress < 100 ? 'Running...' : 'Try Demo'}
                  </span>
                </motion.button>

                {activeDemo === demo.id && (
                  <button
                    onClick={resetDemo}
                    className="text-blue-300 hover:text-white text-sm transition-colors"
                  >
                    Reset
                  </button>
                )}
              </div>

              {/* Demo Results */}
              <AnimatePresence>
                {activeDemo === demo.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="border-t border-white/20 pt-6"
                  >
                    {/* Progress Bar */}
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-white text-sm">Demo Progress</span>
                        <span className="text-blue-300 text-sm">{demoProgress}%</span>
                      </div>
                      <div className="w-full bg-white/20 rounded-full h-2">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${demoProgress}%` }}
                          transition={{ duration: 0.2 }}
                          className={`h-2 rounded-full bg-gradient-to-r ${demo.color}`}
                        />
                      </div>
                    </div>

                    {/* Scenario Steps */}
                    {demoProgress >= 100 && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="space-y-4"
                      >
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div className="bg-white/10 p-3 rounded-lg">
                            <div className="text-blue-300 font-medium mb-1">Setup</div>
                            <div className="text-white">{demo.scenario.setup}</div>
                          </div>
                          <div className="bg-white/10 p-3 rounded-lg">
                            <div className="text-green-300 font-medium mb-1">Detection</div>
                            <div className="text-white">{demo.scenario.detection}</div>
                          </div>
                          <div className="bg-white/10 p-3 rounded-lg">
                            <div className="text-yellow-300 font-medium mb-1">Action</div>
                            <div className="text-white">{demo.scenario.action}</div>
                          </div>
                          <div className="bg-white/10 p-3 rounded-lg">
                            <div className="text-purple-300 font-medium mb-1">Result</div>
                            <div className="text-white">{demo.scenario.result}</div>
                          </div>
                        </div>

                        {/* Metrics */}
                        <div className="grid grid-cols-2 gap-4 mt-4">
                          {Object.entries(demo.metrics).map(([key, value]) => (
                            <div key={key} className="text-center">
                              <div className="text-lg font-bold text-white">{value}</div>
                              <div className="text-blue-300 text-xs capitalize">
                                {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                              </div>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* How to Use Guide */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20"
        >
          <h3 className="text-2xl font-bold text-white mb-6 text-center">
            How to Use Interactive Demos
          </h3>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold">1</span>
              </div>
              <h4 className="text-white font-semibold mb-2">Select Scenario</h4>
              <p className="text-blue-200 text-sm">
                Choose from 4 real-world banking operation scenarios that demonstrate AI capabilities
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold">2</span>
              </div>
              <h4 className="text-white font-semibold mb-2">Run Simulation</h4>
              <p className="text-blue-200 text-sm">
                Click "Try Demo" to see AI analyze, detect patterns, and provide intelligent solutions
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold">3</span>
              </div>
              <h4 className="text-white font-semibold mb-2">View Results</h4>
              <p className="text-blue-200 text-sm">
                See measurable business impact, time savings, and cost prevention in real-time
              </p>
            </div>
          </div>

          <div className="mt-8 text-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onNavigateToSection('platform-overview')}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-xl transition-all"
            >
              Explore Complete Platform
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}