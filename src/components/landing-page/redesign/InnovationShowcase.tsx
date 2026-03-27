'use client';

import { motion } from 'framer-motion';
import { TrendingUp, Users, Clock, Award, Lightbulb, Target, Zap, Shield } from 'lucide-react';

export default function InnovationShowcase() {
  const innovations = [
    {
      icon: Lightbulb,
      title: "AI-Powered Defect Prediction",
      description: "Machine learning algorithms predict potential system failures 3-5 days before they occur",
      impact: "85% reduction in unplanned downtime",
      color: "from-yellow-500 to-orange-500"
    },
    {
      icon: Target,
      title: "Intelligent Release Scoring",
      description: "Automated quality assessment provides confidence scores for production releases",
      impact: "40% faster release cycles",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Zap,
      title: "Real-time Performance Optimization",
      description: "Dynamic resource allocation based on predictive load analysis",
      impact: "60% improvement in response times",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Shield,
      title: "Proactive Security Monitoring",
      description: "Advanced threat detection with automated incident response workflows",
      impact: "99.9% threat detection accuracy",
      color: "from-purple-500 to-violet-500"
    }
  ];





  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Innovation That Delivers Results
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Production-validated innovations powering enterprise IT operations worldwide
          </p>
        </motion.div>

        {/* Innovation Features */}
        <div className="grid lg:grid-cols-2 gap-8 mb-20">
          {innovations.map((innovation, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all"
            >
              <div className="flex items-start space-x-4">
                <div className={`p-3 rounded-lg bg-gradient-to-r ${innovation.color} flex-shrink-0`}>
                  <innovation.icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{innovation.title}</h3>
                  <p className="text-gray-600 mb-4">{innovation.description}</p>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <div className="text-green-800 font-medium">Impact: {innovation.impact}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* UBS Implementation Success */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16"
        >
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white text-center">
            <h3 className="text-3xl font-bold mb-6">Proven Innovation at UBS</h3>
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <h4 className="text-xl font-semibold mb-4">Release Readiness Intelligence</h4>
                <p className="text-blue-100 mb-4">
                  AI-powered release quality assessment and risk prediction deployed in UBS production environment
                </p>
                <div className="text-2xl font-bold text-yellow-300 mb-2">$500,000</div>
                <div className="text-blue-200">Annual savings achieved</div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <h4 className="text-xl font-semibold mb-4">Defect Intelligence System</h4>
                <p className="text-blue-100 mb-4">
                  Historical pattern matching and predictive defect detection reducing incident resolution time
                </p>
                <div className="text-2xl font-bold text-yellow-300 mb-2">96%</div>
                <div className="text-blue-200">Accuracy in defect matching</div>
              </div>
            </div>
            
            <p className="text-blue-100 max-w-4xl mx-auto mb-6">
              This prototype represents an expanded vision based on successful UBS implementations. 
              With 40+ integrated features, we're confident in the platform's capabilities to transform 
              enterprise IT operations at scale.
            </p>
            
            <div className="bg-green-500/20 border border-green-400/30 rounded-lg p-4 inline-block">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                <span className="font-semibold">Production Validated at UBS</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}