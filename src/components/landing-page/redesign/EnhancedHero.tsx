'use client';

import { motion } from 'framer-motion';
import {
  ArrowRight,
  User,
  Mail,
  Linkedin,
  Github,
  CheckCircle,
  Trophy,
  Zap
} from 'lucide-react';

interface EnhancedHeroProps {
  onNavigateToSection: (section: string) => void;
}

export default function EnhancedHero({ onNavigateToSection }: EnhancedHeroProps) {
  const openLinkedIn = () => {
    window.open('https://linkedin.com/in/rahuulpande', '_blank');
  };

  const openEmail = () => {
    window.open('mailto:rahuul.pande@intelliops.ai', '_blank');
  };

  const openGitHub = () => {
    window.open('https://github.com/rahuulpande', '_blank');
  };

  return (
    <div id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800"></div>
      <div className="absolute inset-0 bg-black opacity-20"></div>
      
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-72 h-72 bg-white rounded-full mix-blend-overlay filter blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-purple-300 rounded-full mix-blend-overlay filter blur-xl animate-pulse delay-1000"></div>
        <div className="absolute -bottom-20 left-1/2 w-80 h-80 bg-blue-300 rounded-full mix-blend-overlay filter blur-xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
          
          {/* LEFT SIDE: Main Content (60%) */}
          <div className="lg:col-span-3 text-white">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Platform Branding */}
              <div className="mb-4">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                  IntelliOps AI
                </h2>
                <p className="text-lg md:text-xl text-blue-200 italic">
                  Where Operations Become Intelligent
                </p>
              </div>

              {/* Headline */}
              <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
                AI-Powered{' '}
                <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                  Delivery Intelligence
                </span>
              </h1>

              {/* Subline */}
              <p className="text-xl md:text-2xl text-blue-100 mb-4 leading-relaxed">
                RAG-based defect matching, ML-powered release predictions, and AI-curated knowledge — built for enterprise banking delivery teams.
              </p>

              {/* AI Technique Pills */}
              <div className="flex flex-wrap gap-3 mb-8">
                <span className="inline-flex items-center space-x-2 bg-purple-500/30 border border-purple-400/40 px-4 py-1.5 rounded-full text-sm">
                  <span className="font-bold text-purple-200">RAG</span>
                  <span className="text-white/90">Defect Matching</span>
                </span>
                <span className="inline-flex items-center space-x-2 bg-blue-500/30 border border-blue-400/40 px-4 py-1.5 rounded-full text-sm">
                  <span className="font-bold text-blue-200">ML</span>
                  <span className="text-white/90">Release Prediction</span>
                </span>
                <span className="inline-flex items-center space-x-2 bg-green-500/30 border border-green-400/40 px-4 py-1.5 rounded-full text-sm">
                  <span className="font-bold text-green-200">LLM</span>
                  <span className="text-white/90">Knowledge Curation</span>
                </span>
              </div>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <button
                  onClick={() => {
                    const el = document.getElementById('ai-usage');
                    el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                  className="flex items-center justify-center space-x-2 bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-50 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105"
                >
                  <span>See How AI Powers It</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </motion.div>
            </motion.div>
          </div>

          {/* RIGHT SIDE: Developer Credibility (40%) */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20"
            >
              {/* Developer Header */}
              <div className="text-center mb-6">
                <div className="flex items-center justify-center space-x-3 mb-4">
                  <div className="p-3 bg-white/20 rounded-full">
                    <User className="w-8 h-8 text-white" />
                  </div>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                  Developed by Rahuul Pande
                </h2>
                <p className="text-blue-100 text-lg mb-4">
                  Senior Software Engineer | AI/ML Specialist
                </p>
              </div>

              {/* Contact Buttons */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                <button
                  onClick={openLinkedIn}
                  className="flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg transition-all duration-300 hover:scale-105"
                >
                  <Linkedin className="w-5 h-5" />
                  <span className="hidden sm:inline">LinkedIn</span>
                </button>
                <button
                  onClick={openEmail}
                  className="flex items-center justify-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg transition-all duration-300 hover:scale-105"
                >
                  <Mail className="w-5 h-5" />
                  <span className="hidden sm:inline">Email</span>
                </button>
                <button
                  onClick={openGitHub}
                  className="flex items-center justify-center space-x-2 bg-gray-800 hover:bg-gray-900 text-white px-4 py-3 rounded-lg transition-all duration-300 hover:scale-105"
                >
                  <Github className="w-5 h-5" />
                  <span className="hidden sm:inline">GitHub</span>
                </button>
              </div>

              {/* Validation Badges */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3 bg-green-500/20 border border-green-400/30 rounded-lg p-3">
                  <CheckCircle className="w-6 h-6 text-green-400" />
                  <div>
                    <div className="text-white font-semibold">Enterprise Prototype</div>
                    <div className="text-green-200 text-sm">Concepts inspired by real-world enterprise implementations</div>
                  </div>
                </div>

                <div className="flex items-center space-x-3 bg-purple-500/20 border border-purple-400/30 rounded-lg p-3">
                  <Trophy className="w-6 h-6 text-purple-400" />
                  <div>
                    <div className="text-white font-semibold">Built for GenAIathon 2026</div>
                    <div className="text-purple-200 text-sm">GenAIathon 2026 Submission</div>
                  </div>
                </div>

                <div className="flex items-center space-x-3 bg-blue-500/20 border border-blue-400/30 rounded-lg p-3">
                  <CheckCircle className="w-6 h-6 text-blue-400" />
                  <div>
                    <div className="text-white font-semibold">AI/ML/RAG Architecture</div>
                    <div className="text-blue-200 text-sm">RAG, ML, LLM &amp; NLP for delivery intelligence</div>
                  </div>
                </div>
              </div>

              {/* Availability Notice */}
              <div className="mt-6 text-center">
                <div className="text-blue-100 text-sm mb-2">Available for opportunities and collaborations</div>
                <div className="flex items-center justify-center space-x-2 text-yellow-300">
                  <Zap className="w-4 h-4" />
                  <span className="text-sm font-medium">Open to new challenges</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="flex flex-col items-center text-white/70">
            <div className="text-sm mb-2">Scroll to explore</div>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <ArrowRight className="w-6 h-6 rotate-90" />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 