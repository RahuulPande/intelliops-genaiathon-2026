'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Brain,
  Shield,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  Eye,
  EyeOff,
  ArrowRight,
  Layers,
  Activity,
  Lock,
  Linkedin,
  Mail,
  Sparkles,
  GitPullRequest,
  ClipboardList,
  Code2,
  TestTube,
  Package,
  Radio,
  GraduationCap,
  Zap,
  BarChart3,
  RefreshCw,
  Lightbulb,
  TrendingDown,
  Layers3,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

// ── SDLC Layer Pills ──────────────────────────────────────
const sdlcLayers = [
  { id: 'L0', label: 'PLAN', color: 'teal' },
  { id: 'L1', label: 'BUILD', color: 'indigo' },
  { id: 'L2', label: 'TEST', color: 'purple' },
  { id: 'L3', label: 'RELEASE', color: 'rose' },
  { id: 'L4', label: 'OPERATE', color: 'blue' },
  { id: 'L5', label: 'LEARN', color: 'emerald' },
];

const colorMap: Record<string, { bg: string; text: string; badge: string }> = {
  teal: { bg: 'bg-teal-500/20', text: 'text-teal-300', badge: 'bg-teal-600' },
  indigo: { bg: 'bg-indigo-500/20', text: 'text-indigo-300', badge: 'bg-indigo-600' },
  purple: { bg: 'bg-purple-500/20', text: 'text-purple-300', badge: 'bg-purple-600' },
  rose: { bg: 'bg-rose-500/20', text: 'text-rose-300', badge: 'bg-rose-600' },
  blue: { bg: 'bg-blue-500/20', text: 'text-blue-300', badge: 'bg-blue-600' },
  emerald: { bg: 'bg-emerald-500/20', text: 'text-emerald-300', badge: 'bg-emerald-600' },
};

// ── Rotating Capability Cards ─────────────────────────────
const capabilityCards = [
  {
    id: 1,
    title: 'Lifecycle Intelligence',
    description: 'AI-driven cross-layer correlation connecting requirements → code → tests → releases → incidents',
    metric: '94.7% correlation accuracy',
  },
  {
    id: 2,
    title: 'Predictive Risk',
    description: 'ML-powered risk scoring predicts deployment failures before they happen',
    metric: '82% of critical incidents prevented',
  },
  {
    id: 3,
    title: 'Self-Learning System',
    description: 'Every incident makes the platform smarter — automatic knowledge base updates and risk model retraining',
    metric: '38 feedback loops active',
  },
];

// ── Platform Evolution / Layer Cards ──────────────────────
const platformLayers = [
  {
    id: 'L0',
    label: 'L0 PLAN',
    description: 'Requirement gap analysis & risk prediction',
    color: 'teal',
  },
  {
    id: 'L1',
    label: 'L1 BUILD',
    description: 'PR risk scoring & AI-generated summaries',
    color: 'indigo',
  },
  {
    id: 'L2',
    label: 'L2 TEST',
    description: 'Intelligent defect matching & coverage analysis',
    color: 'purple',
  },
  {
    id: 'L3',
    label: 'L3 RELEASE',
    description: 'Deployment risk assessment & rollback planning',
    color: 'rose',
  },
  {
    id: 'L4',
    label: 'L4 OPERATE',
    description: 'Real-time incident detection & root cause analysis',
    color: 'blue',
  },
  {
    id: 'L5',
    label: 'L5 LEARN',
    description: 'Self-learning feedback loop & knowledge generation',
    color: 'emerald',
  },
];

export default function LoginPage() {
  const router = useRouter();
  const { isAuthenticated: alreadyAuth, login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [activeCapabilityIndex, setActiveCapabilityIndex] = useState(0);

  useEffect(() => {
    if (alreadyAuth) {
      router.replace('/');
    } else {
      setIsCheckingAuth(false);
    }
  }, [alreadyAuth, router]);

  // Auto-rotate capability cards every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCapabilityIndex((prev) => (prev + 1) % capabilityCards.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const errorMsg = await login(username, password);
    if (errorMsg) {
      setError(errorMsg);
      setIsLoading(false);
    }
  };

  if (isCheckingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* ════════════════════════════════════════════════════ */}
      {/* LEFT PANEL — Vision + Product Story                 */}
      {/* ════════════════════════════════════════════════════ */}
      <div className="lg:w-[58%] bg-gradient-to-br from-slate-900 via-purple-950 to-indigo-950 text-white relative overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 left-10 w-80 h-80 bg-purple-600/15 rounded-full blur-[120px]" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-600/12 rounded-full blur-[150px]" />
          <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-blue-600/10 rounded-full blur-[100px]" />
        </div>

        <div className="relative z-10 p-8 lg:p-10 lg:pr-8 overflow-y-auto max-h-screen">
          {/* ── 1. Header with Logo Animation ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <div className="flex items-center gap-3 mb-3">
              <motion.div
                className="w-11 h-11 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-purple-500/30"
                animate={{
                  boxShadow: [
                    '0 0 20px rgba(168, 85, 247, 0.3)',
                    '0 0 40px rgba(168, 85, 247, 0.5)',
                    '0 0 20px rgba(168, 85, 247, 0.3)',
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                IO
              </motion.div>
              <div>
                <h1 className="text-3xl font-bold tracking-tight">IntelliOps AI</h1>
              </div>
            </div>
            <p className="text-lg font-medium text-purple-200">
              The AI Brain for the Entire Software Lifecycle
            </p>
          </motion.div>

          {/* ── 2. Vision Statement ── */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-7"
          >
            <p className="text-sm text-gray-300 leading-relaxed border-l-2 border-purple-500/50 pl-4">
              Transforming software delivery into a self-learning intelligence system — connecting testing, release, and production into one unified AI layer.
            </p>
          </motion.div>

          {/* ── 3. SDLC Layer Pills ── */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mb-7"
          >
            <div className="flex items-center gap-2 mb-4">
              <Layers className="w-3.5 h-3.5 text-gray-400" />
              <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest">Software Lifecycle Layers</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {sdlcLayers.map((layer, i) => {
                const colors = colorMap[layer.color];
                return (
                  <div key={layer.id} className="flex items-center gap-1.5">
                    <div className={`flex items-center gap-2 px-3 py-2 rounded-lg border border-white/10 ${colors.bg} hover:border-white/20 transition-colors cursor-default`}>
                      <span className={`inline-flex items-center justify-center w-5 h-5 rounded-md text-[10px] font-bold text-white ${colors.badge}`}>
                        {layer.id}
                      </span>
                      <span className={`text-xs font-medium ${colors.text}`}>{layer.label}</span>
                    </div>
                    {i < sdlcLayers.length - 1 && (
                      <ArrowRight className="w-3 h-3 text-gray-600" />
                    )}
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* ── 4. Rotating Capability Cards ── */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-6"
          >
            <div className="h-32">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCapabilityIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                  className="rounded-xl bg-white/[0.04] backdrop-blur-sm border border-white/[0.08] p-4 h-full flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="p-1.5 bg-purple-500/20 rounded-lg">
                        <Sparkles className="w-4 h-4 text-purple-300" />
                      </div>
                      <h3 className="text-sm font-semibold text-white">
                        {capabilityCards[activeCapabilityIndex].title}
                      </h3>
                    </div>
                    <p className="text-xs text-gray-300 leading-relaxed">
                      {capabilityCards[activeCapabilityIndex].description}
                    </p>
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-[10px] font-bold text-purple-300 bg-purple-500/15 px-2 py-1 rounded">
                      {capabilityCards[activeCapabilityIndex].metric}
                    </span>
                    <div className="flex gap-1">
                      {capabilityCards.map((_, i) => (
                        <div
                          key={i}
                          className={`h-1.5 rounded-full transition-all ${
                            i === activeCapabilityIndex ? 'w-3 bg-purple-400' : 'w-1.5 bg-gray-600'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>

          {/* ── 5. Platform Evolution / Layer Capabilities ── */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-7"
          >
            <div className="flex items-center gap-2 mb-4">
              <Layers3 className="w-3.5 h-3.5 text-gray-400" />
              <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest">Layer Capabilities</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {platformLayers.map((layer) => {
                const colors = colorMap[layer.color];
                return (
                  <div
                    key={layer.id}
                    className={`p-3 rounded-lg border border-white/[0.06] ${colors.bg} hover:border-white/[0.12] transition-colors group`}
                  >
                    <div className="flex items-start gap-2">
                      <span className={`inline-flex items-center justify-center w-6 h-6 rounded-md text-[10px] font-bold text-white flex-shrink-0 ${colors.badge}`}>
                        {layer.id.charAt(1)}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className={`text-xs font-semibold ${colors.text} mb-0.5`}>{layer.label}</p>
                        <p className="text-[11px] text-gray-400 leading-snug">{layer.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* ── 6. Founder Section ── */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="flex items-center justify-between p-4 rounded-xl bg-white/[0.04] backdrop-blur-sm border border-white/[0.08]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  RP
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">Built by Rahuul Pande</p>
                  <p className="text-[11px] text-gray-400">Software Lifecycle Intelligence Architect</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href="https://www.linkedin.com/in/rahuulpande/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0A66C2]/20 hover:bg-[#0A66C2]/30 border border-[#0A66C2]/30 text-[#0A66C2] text-xs font-medium transition-colors"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                  <span>LinkedIn</span>
                </a>
                <a
                  href="mailto:rahuulpande@gmail.com"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-gray-400 text-xs font-medium transition-colors"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Email</span>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════ */}
      {/* RIGHT PANEL — Login Form                            */}
      {/* ════════════════════════════════════════════════════ */}
      <div className="lg:w-[42%] flex items-center justify-center p-8 lg:p-12 bg-gray-50 dark:bg-gray-900">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full max-w-md"
        >
          {/* Preview Badge */}
          <div className="flex items-center gap-2 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-xs font-semibold border border-purple-200 dark:border-purple-700/50">
              <Lock className="w-3 h-3" />
              Private Preview
            </span>
          </div>

          {/* Header */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1.5">
              Secure Demo Access
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
              This is a controlled preview of IntelliOps AI. Access is granted for evaluation, collaboration, and innovation discussions.
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
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
                  className="w-full px-4 py-3 pr-12 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
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

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800"
              >
                <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                <span className="text-sm text-red-600 dark:text-red-400">{error}</span>
              </motion.div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <span>Access IntelliOps</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Footer — Collaboration CTA */}
          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 space-y-4">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30">
              <Shield className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-xs text-blue-700 dark:text-blue-400 font-medium">Controlled Demo Environment</p>
                <p className="text-xs text-blue-600/70 dark:text-blue-400/70 mt-0.5">
                  Contact the team for access credentials to explore the full platform.
                </p>
              </div>
            </div>

            <div className="text-center">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                Interested in collaboration or partnership?
              </p>
              <a
                href="https://www.linkedin.com/in/rahuulpande/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-medium text-[#0A66C2] hover:text-[#004182] dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
              >
                <Linkedin className="w-3.5 h-3.5" />
                Connect via LinkedIn
                <ArrowRight className="w-3 h-3" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
