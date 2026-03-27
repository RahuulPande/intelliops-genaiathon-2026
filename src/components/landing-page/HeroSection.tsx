'use client';

import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  Calculator, 
  Play, 
  Trophy,
  Star,
  Target,
  Zap,
  Brain
} from 'lucide-react';
import { useROICalculation, formatCurrency } from '@/lib/hooks/useROICalculation';

interface HeroSectionProps {
  onNavigateToSection: (section: string) => void;
}

export default function HeroSection({ onNavigateToSection }: HeroSectionProps) {
  // Use consistent calculation with default team
  const roiData = useROICalculation({ teamSize: 100, tier: 'enterprise' });

  return (
    <div className="relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800"></div>
      <div className="absolute inset-0 bg-black opacity-20"></div>
      
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <motion.div
          animate={{
            backgroundPosition: ['0px 0px', '100px 100px'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
          className="w-full h-full"
          style={{
            backgroundImage: `
              radial-gradient(circle at 25% 25%, white 2px, transparent 2px),
              radial-gradient(circle at 75% 75%, white 2px, transparent 2px)
            `,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        {/* Brand Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center space-x-3 mb-4">
            <img 
              src="/images/intelliops-logo.svg" 
              alt="IntelliOps AI" 
              className="w-12 h-12"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
            />
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-white">
                IntelliOps AI
              </h1>
              <p className="text-blue-200 text-lg italic">
                "Where Operations Become Intelligent"
              </p>
            </div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-4 py-2 rounded-full font-semibold"
          >
            <Trophy className="w-5 h-5" />
            <span>🏆 GenAIathon 2026 | Innovation Summit</span>
          </motion.div>
        </motion.div>

        {/* Value Proposition */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
            Transform Banking IT Operations with 
            <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent"> AI-Powered Intelligence</span>
          </h2>
          
          <p className="text-xl text-blue-100 max-w-4xl mx-auto leading-relaxed">
            Proven <strong className="text-white">{formatCurrency(roiData.netSavings)} annual savings</strong> through predictive operations, 
            intelligent automation, and 30% faster incident resolution. 
            <strong className="text-yellow-300">{roiData.paybackDays}-day payback period</strong> with industry-validated ROI.
          </p>
        </motion.div>

        {/* Hero Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20">
            <div className="text-4xl font-bold text-white mb-2">{formatCurrency(roiData.netSavings)}</div>
            <div className="text-blue-200 font-medium mb-1">Net Annual Savings</div>
            <div className="text-blue-300 text-sm">After all platform costs</div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20">
            <div className="text-4xl font-bold text-white mb-2">{roiData.roiPercentage.toLocaleString()}%</div>
            <div className="text-blue-200 font-medium mb-1">Year 1 ROI</div>
            <div className="text-blue-300 text-sm">{roiData.paybackDays}-day payback</div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20">
            <div className="text-4xl font-bold text-white mb-2">20+</div>
            <div className="text-blue-200 font-medium mb-1">AI-Powered Features</div>
            <div className="text-blue-300 text-sm">Complete platform</div>
          </div>
        </motion.div>

        {/* Call to Action Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="text-center space-y-6"
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.button
              onClick={() => onNavigateToSection('interactive-demos')}
              whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(0,0,0,0.3)' }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-2xl hover:from-green-600 hover:to-emerald-700 transition-all"
            >
              <Play className="w-6 h-6" />
              <span>🎮 Experience Live Demo</span>
            </motion.button>
            
            <motion.button
              onClick={() => onNavigateToSection('roi-calculator')}
              whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-3 bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-semibold text-lg border border-white/30 hover:bg-white/30 transition-all"
            >
              <Calculator className="w-6 h-6" />
              <span>📊 Try ROI Calculator</span>
            </motion.button>
          </div>

          {/* Key Innovation Badges */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
            <div className="flex items-center space-x-2 bg-yellow-500/20 text-yellow-300 px-3 py-2 rounded-full text-sm font-medium border border-yellow-500/30">
              <Star className="w-4 h-4" />
              <span>96% AI Accuracy</span>
            </div>
            <div className="flex items-center space-x-2 bg-green-500/20 text-green-300 px-3 py-2 rounded-full text-sm font-medium border border-green-500/30">
              <Target className="w-4 h-4" />
              <span>80% Downtime Prevention</span>
            </div>
            <div className="flex items-center space-x-2 bg-purple-500/20 text-purple-300 px-3 py-2 rounded-full text-sm font-medium border border-purple-500/30">
              <Zap className="w-4 h-4" />
              <span>30% Faster Resolution</span>
            </div>
            <div className="flex items-center space-x-2 bg-blue-500/20 text-blue-300 px-3 py-2 rounded-full text-sm font-medium border border-blue-500/30">
              <Brain className="w-4 h-4" />
              <span>Industry First</span>
            </div>
          </div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="pt-8"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex flex-col items-center text-blue-200"
            >
              <span className="text-sm mb-2">Explore the Platform</span>
              <ArrowRight className="w-5 h-5 rotate-90" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}