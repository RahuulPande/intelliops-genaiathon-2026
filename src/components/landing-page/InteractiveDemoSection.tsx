'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Play, 
  Sun, 
  AlertTriangle, 
  Brain, 
  Rocket,
  CheckCircle,
  Clock,
  Target,
  Zap,
  ArrowRight,
  Gamepad2
} from 'lucide-react';

interface DemoScenario {
  id: string;
  title: string;
  description: string;
  icon: any;
  gradient: string;
  impact: string;
  aiFeatures: string[];
  shortcut?: string;
  route: string;
  demoParams?: string;
}

interface InteractiveDemoSectionProps {
  onNavigateToSection: (section: string) => void;
}

export default function InteractiveDemoSection({ onNavigateToSection }: InteractiveDemoSectionProps) {
  const [activeDemo, setActiveDemo] = useState<string | null>(null);
  const [demoRunning, setDemoRunning] = useState(false);

  const demoScenarios: DemoScenario[] = [
    {
      id: 'morning-health-check',
      title: 'Morning Health Check',
      description: 'AI detects payment gateway degradation 4 hours before failure, suggesting proactive scaling',
      icon: Sun,
      gradient: 'from-orange-400 to-pink-600',
      impact: 'Prevents $22,400 downtime incident',
      aiFeatures: ['Predictive analytics', 'Anomaly detection', 'Automated alerting', 'Cost impact analysis'],
      shortcut: 'Ctrl+1',
      route: 'service-health-intelligence',
      demoParams: '?demo=morning-check'
    },
    {
      id: 'cascade-prevention',
      title: 'Cascade Failure Prevention',
      description: 'AI prevents database failure from cascading to user authentication and payment systems',
      icon: AlertTriangle,
      gradient: 'from-red-500 to-pink-600',
      impact: 'Saves $67,200 in business impact',
      aiFeatures: ['Dependency mapping', 'Impact analysis', 'Auto-isolation', 'Service correlation'],
      shortcut: 'Ctrl+2',
      route: 'service-health-intelligence',
      demoParams: '?demo=cascade-prevention'
    },
    {
      id: 'ai-defect-matching',
      title: 'AI Defect Matching',
      description: '96% accuracy in finding historical solutions by analyzing patterns across 5 years of data',
      icon: Brain,
      gradient: 'from-purple-500 to-indigo-600',
      impact: 'Resolution time: 6 hours → 45 minutes',
      aiFeatures: ['Pattern recognition', 'NLP analysis', 'Confidence scoring', 'Historical matching'],
      shortcut: 'Ctrl+3',
      route: 'test-quality-intelligence',
      demoParams: '?demo=defect-matching'
    },
    {
      id: 'release-decision',
      title: 'Release Decision Workflow',
      description: 'AI detects missing critical merge that would cause production failure, blocking release',
      icon: Rocket,
      gradient: 'from-green-500 to-teal-600',
      impact: 'Prevents $45,000 deployment failure',
      aiFeatures: ['Branch analysis', 'Risk assessment', 'Merge tracking', 'Deployment gates'],
      shortcut: 'Ctrl+4',
      route: 'release-intelligence',
      demoParams: '?demo=release-workflow'
    }
  ];

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.ctrlKey || event.metaKey) {
        switch(event.key) {
          case '1':
            event.preventDefault();
            triggerDemo('morning-health-check');
            break;
          case '2':
            event.preventDefault();
            triggerDemo('cascade-prevention');
            break;
          case '3':
            event.preventDefault();
            triggerDemo('ai-defect-matching');
            break;
          case '4':
            event.preventDefault();
            triggerDemo('release-decision');
            break;
        }
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, []);

  const triggerDemo = (demoId: string) => {
    const demo = demoScenarios.find(d => d.id === demoId);
    if (!demo) return;

    setActiveDemo(demoId);
    setDemoRunning(true);

    // Show demo notification
    const notification = document.createElement('div');
    notification.className = 'fixed top-4 right-4 bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center space-x-3';
    notification.innerHTML = `
      <div class="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
      <span>Launching ${demo.title} Demo...</span>
    `;
    document.body.appendChild(notification);

    // Navigate to the relevant section with demo parameters
    setTimeout(() => {
      onNavigateToSection(demo.route);
      document.body.removeChild(notification);
      
      // Show success notification
      const successNotification = document.createElement('div');
      successNotification.className = 'fixed top-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center space-x-3';
      successNotification.innerHTML = `
        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
        </svg>
        <span>${demo.title} Demo Active</span>
      `;
      document.body.appendChild(successNotification);
      
      setTimeout(() => {
        document.body.removeChild(successNotification);
        setDemoRunning(false);
        setActiveDemo(null);
      }, 3000);
    }, 1500);
  };

  return (
    <div className="py-20 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white" id="interactive-demos">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Gamepad2 className="w-8 h-8 text-yellow-400" />
            <h2 className="text-3xl md:text-4xl font-bold">Interactive Demo Scenarios</h2>
          </div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-6">
            Experience real AI-powered operational intelligence in action. 
            Each demo showcases measurable business impact with live data simulation.
          </p>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 inline-block">
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-2">
                <Gamepad2 className="w-4 h-4 text-yellow-400" />
                <span>Use keyboard shortcuts:</span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {demoScenarios.map((demo) => (
                  <div key={demo.id} className="bg-white/10 rounded px-2 py-1 font-mono text-xs">
                    {demo.shortcut}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Demo Cards */}
        <div className="grid md:grid-cols-2 gap-8">
          {demoScenarios.map((demo, index) => (
            <motion.div
              key={demo.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`relative bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all group cursor-pointer ${
                activeDemo === demo.id ? 'ring-4 ring-yellow-400' : ''
              }`}
              onClick={() => triggerDemo(demo.id)}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`p-3 bg-gradient-to-r ${demo.gradient} rounded-lg`}>
                    <demo.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{demo.title}</h3>
                    <div className="bg-gray-800 text-gray-300 px-2 py-1 rounded text-xs font-mono mt-1">
                      {demo.shortcut}
                    </div>
                  </div>
                </div>
                
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className={`p-3 bg-white/20 rounded-full transition-colors ${
                    demoRunning && activeDemo === demo.id
                      ? 'bg-yellow-400 text-black animate-pulse'
                      : 'group-hover:bg-white/30'
                  }`}
                >
                  <Play className="w-5 h-5" />
                </motion.div>
              </div>

              {/* Description */}
              <p className="text-gray-300 mb-4 leading-relaxed">{demo.description}</p>

              {/* Impact */}
              <div className="bg-green-500/20 rounded-lg p-3 mb-4 border border-green-500/30">
                <div className="flex items-center space-x-2 text-green-300">
                  <Target className="w-4 h-4" />
                  <span className="font-semibold">Business Impact:</span>
                </div>
                <div className="text-green-200 font-bold mt-1">{demo.impact}</div>
              </div>

              {/* AI Features */}
              <div className="mb-4">
                <div className="flex items-center space-x-2 text-purple-300 mb-2">
                  <Brain className="w-4 h-4" />
                  <span className="text-sm font-medium">AI Technologies:</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {demo.aiFeatures.map((feature, i) => (
                    <div key={i} className="flex items-center space-x-2">
                      <CheckCircle className="w-3 h-3 text-blue-400 flex-shrink-0" />
                      <span className="text-xs text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Call to Action */}
              <div className="flex items-center justify-between pt-4 border-t border-white/20">
                <span className="text-sm text-gray-400">Click to launch demo</span>
                <div className="flex items-center space-x-1 text-blue-300 group-hover:text-blue-200">
                  <span className="text-sm font-medium">Try Now</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* Active Demo Indicator */}
              {activeDemo === demo.id && demoRunning && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 bg-yellow-400/20 rounded-2xl border-2 border-yellow-400 flex items-center justify-center"
                >
                  <div className="bg-yellow-400 text-black px-4 py-2 rounded-lg font-bold animate-pulse">
                    Demo Launching...
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Instructions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
            <h3 className="text-xl font-bold mb-4 flex items-center justify-center space-x-2">
              <Zap className="w-6 h-6 text-yellow-400" />
              <span>How to Use Interactive Demos</span>
            </h3>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-blue-500/20 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                  <span className="text-xl font-bold">1</span>
                </div>
                <h4 className="font-semibold mb-2">Choose Demo</h4>
                <p className="text-sm text-gray-300">Click any demo card or use keyboard shortcuts (Ctrl+1-4)</p>
              </div>
              
              <div className="text-center">
                <div className="bg-green-500/20 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                  <span className="text-xl font-bold">2</span>
                </div>
                <h4 className="font-semibold mb-2">Navigate</h4>
                <p className="text-sm text-gray-300">Automatically navigate to relevant platform section</p>
              </div>
              
              <div className="text-center">
                <div className="bg-purple-500/20 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                  <span className="text-xl font-bold">3</span>
                </div>
                <h4 className="font-semibold mb-2">Experience</h4>
                <p className="text-sm text-gray-300">Interact with live AI-powered features and real data</p>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-white/20">
              <p className="text-gray-400 text-sm">
                💡 <strong>Pro Tip:</strong> Each demo shows real AI decision-making with confidence scores, 
                historical data analysis, and measurable business impact calculations.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}