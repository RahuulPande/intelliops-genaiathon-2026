'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  AlertCircle,
  Eye,
  EyeOff,
  ArrowRight,
  Bug,
  TestTube,
  Package,
  BookOpen,
  Sparkles,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const pillars = [
  {
    name: 'Defect Intelligence',
    icon: Bug,
    technique: 'RAG',
    techColor: 'bg-green-500/20 text-green-300',
    metric: '96% accuracy',
    description: 'AI-powered defect matching against historical patterns',
  },
  {
    name: 'Test Intelligence',
    icon: TestTube,
    technique: 'ML',
    techColor: 'bg-amber-500/20 text-amber-300',
    metric: '6 AI capabilities',
    description: 'Smart test prioritization and gap analysis',
  },
  {
    name: 'Release Intelligence',
    icon: Package,
    technique: 'ML',
    techColor: 'bg-amber-500/20 text-amber-300',
    metric: '87.3 risk score',
    description: 'AI risk scoring for deployment readiness',
  },
  {
    name: 'Knowledge Base',
    icon: BookOpen,
    technique: 'RAG+LLM',
    techColor: 'bg-blue-500/20 text-blue-300',
    metric: '40% faster',
    description: 'Self-building knowledge from defect history',
  },
];

const aiBadges = [
  { label: 'ML', color: 'bg-amber-500/20 text-amber-300 border-amber-500/30' },
  { label: 'RAG', color: 'bg-green-500/20 text-green-300 border-green-500/30' },
  { label: 'LLM', color: 'bg-blue-500/20 text-blue-300 border-blue-500/30' },
  { label: 'NLP', color: 'bg-purple-500/20 text-purple-300 border-purple-500/30' },
];

export default function DemoLoginPage() {
  const router = useRouter();
  const { isAuthenticated, login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) router.replace('/');
  }, [isAuthenticated, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    const errorMsg = await login(username, password);
    if (errorMsg) {
      setError(errorMsg);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* ── Left Panel: Platform Identity ── */}
      <div className="lg:w-[58%] bg-[#0F1629] text-white p-8 lg:p-12 flex flex-col justify-between relative overflow-hidden">
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-blue-900/20 pointer-events-none" />

        <div className="relative z-10">
          {/* Logo + Tagline */}
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-sm font-bold">
              IO
            </div>
            <div>
              <h1 className="text-xl font-bold">IntelliOps AI</h1>
              <p className="text-xs text-gray-400">AI-Powered Delivery Intelligence</p>
            </div>
          </div>

          <p className="text-gray-300 text-sm leading-relaxed mt-6 max-w-xl">
            Transforming software delivery with AI — from defect resolution to release intelligence.
            Built for enterprise banking teams who need accuracy, speed, and confidence.
          </p>

          {/* 4 Pillar Cards */}
          <div className="grid grid-cols-2 gap-3 mt-8">
            {pillars.map((pillar, i) => (
              <motion.div
                key={pillar.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i, duration: 0.4 }}
                className="bg-white/[0.04] border border-white/[0.08] rounded-xl p-4 hover:bg-white/[0.07] transition-colors"
              >
                <div className="flex items-center gap-2 mb-2">
                  <pillar.icon className="w-4 h-4 text-purple-400" />
                  <span className="text-sm font-semibold text-white">{pillar.name}</span>
                </div>
                <p className="text-[11px] text-gray-400 mb-3 leading-relaxed">{pillar.description}</p>
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${pillar.techColor}`}>
                    {pillar.technique}
                  </span>
                  <span className="text-[11px] font-medium text-gray-300">{pillar.metric}</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Powered By */}
          <div className="mt-8">
            <p className="text-[10px] uppercase tracking-widest text-gray-500 mb-3">Powered by</p>
            <div className="flex gap-2">
              {aiBadges.map((badge) => (
                <span
                  key={badge.label}
                  className={`text-[10px] font-bold uppercase px-3 py-1 rounded-full border ${badge.color}`}
                >
                  {badge.label}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="relative z-10 mt-8 pt-6 border-t border-white/[0.06]">
          <p className="text-xs text-gray-500">
            Built by <span className="text-gray-300 font-medium">Rahuul Pande</span> · GenAIathon 2026
          </p>
        </div>
      </div>

      {/* ── Right Panel: Login Form ── */}
      <div className="lg:w-[42%] bg-gray-50 dark:bg-[#1A1A2E] flex items-center justify-center p-8 lg:p-12">
        <div className="w-full max-w-sm">
          {/* Header Badge */}
          <div className="flex items-center gap-2 mb-6">
            <Sparkles className="w-4 h-4 text-purple-500" />
            <span className="text-xs font-semibold text-purple-600 dark:text-purple-400 uppercase tracking-wider">
              GenAIathon 2026 Demo
            </span>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Access the Demo Platform
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">
            Explore 4 AI intelligence pillars built for enterprise banking.
          </p>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => { setUsername(e.target.value); setError(''); }}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                placeholder="Enter username"
                autoComplete="username"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(''); }}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all pr-12"
                  placeholder="Enter password"
                  autoComplete="current-password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 px-4 py-2.5 rounded-lg border border-red-200 dark:border-red-800"
              >
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                {error}
              </motion.div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-purple-500/20"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Access IntelliOps
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Credentials hint */}
          <div className="mt-6 p-3 rounded-lg bg-gray-100 dark:bg-white/[0.04] border border-gray-200 dark:border-white/[0.08]">
            <p className="text-[11px] text-gray-500 dark:text-gray-400 mb-1">Demo credentials:</p>
            <p className="text-xs font-mono text-gray-700 dark:text-gray-300">
              admin / IntelliOps@2026
            </p>
          </div>

          {/* Showcase link */}
          <div className="mt-4 text-center">
            <a
              href="/showcase"
              className="text-sm text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-medium transition-colors"
            >
              Or view the Showcase &rarr;
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
