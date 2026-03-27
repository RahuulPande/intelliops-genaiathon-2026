'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers, ArrowRight, Brain, Code, FileSearch, Package, Activity, GraduationCap, CheckCircle2, Zap, RefreshCw, TrendingUp, Shield } from 'lucide-react';

interface DevLandingPageProps {
  onNavigateToSection: (section: string) => void;
}

// ── SDLC Layer Definitions ─────────────────────────────

const sdlcLayers = [
  { id: 'plan-intelligence', num: 0, label: 'PLAN', name: 'Plan Intelligence', icon: FileSearch, color: 'teal', section: 'plan-intelligence', desc: 'Requirement analysis, gap detection, risk prediction', techniques: ['NLP', 'RAG', 'ML', 'LLM'] },
  { id: 'build-intelligence', num: 1, label: 'BUILD', name: 'Build Intelligence', icon: Code, color: 'indigo', section: 'build-intelligence', desc: 'PR risk scoring, change impact, failure prediction', techniques: ['ML', 'NLP', 'RAG', 'LLM'] },
  { id: 'test-intelligence', num: 2, label: 'TEST', name: 'Test Intelligence', icon: Brain, color: 'purple', section: 'test-quality-intelligence', desc: 'Defect matching, root cause, quality insights', techniques: ['RAG', 'LLM', 'NLP'] },
  { id: 'release-intelligence', num: 3, label: 'RELEASE', name: 'Release Intelligence', icon: Package, color: 'rose', section: 'release-intelligence', desc: 'Risk prediction, readiness scoring, knowledge base', techniques: ['ML', 'LLM', 'RAG'] },
  { id: 'operate-intelligence', num: 4, label: 'OPERATE', name: 'Operate Intelligence', icon: Activity, color: 'blue', section: 'service-health-intelligence', desc: 'Incident analysis, cross-system correlation', techniques: ['LLM', 'RAG', 'ML'] },
  { id: 'learn-intelligence', num: 5, label: 'LEARN', name: 'Learn Intelligence', icon: GraduationCap, color: 'emerald', section: 'learn-intelligence', desc: 'Self-learning feedback loop, continuous improvement', techniques: ['ML', 'RAG', 'LLM'] },
];

const colorMap: Record<string, { bg: string; text: string; border: string; gradient: string; light: string; glow: string }> = {
  teal: { bg: 'bg-teal-500', text: 'text-teal-600 dark:text-teal-400', border: 'border-teal-500', gradient: 'from-teal-500 to-cyan-500', light: 'bg-teal-50 dark:bg-teal-900/20', glow: 'shadow-teal-500/30' },
  indigo: { bg: 'bg-indigo-500', text: 'text-indigo-600 dark:text-indigo-400', border: 'border-indigo-500', gradient: 'from-indigo-500 to-cyan-500', light: 'bg-indigo-50 dark:bg-indigo-900/20', glow: 'shadow-indigo-500/30' },
  purple: { bg: 'bg-purple-500', text: 'text-purple-600 dark:text-purple-400', border: 'border-purple-500', gradient: 'from-purple-500 to-indigo-500', light: 'bg-purple-50 dark:bg-purple-900/20', glow: 'shadow-purple-500/30' },
  rose: { bg: 'bg-rose-500', text: 'text-rose-600 dark:text-rose-400', border: 'border-rose-500', gradient: 'from-rose-500 to-pink-500', light: 'bg-rose-50 dark:bg-rose-900/20', glow: 'shadow-rose-500/30' },
  blue: { bg: 'bg-blue-500', text: 'text-blue-600 dark:text-blue-400', border: 'border-blue-500', gradient: 'from-blue-500 to-cyan-500', light: 'bg-blue-50 dark:bg-blue-900/20', glow: 'shadow-blue-500/30' },
  emerald: { bg: 'bg-emerald-500', text: 'text-emerald-600 dark:text-emerald-400', border: 'border-emerald-500', gradient: 'from-emerald-500 to-green-500', light: 'bg-emerald-50 dark:bg-emerald-900/20', glow: 'shadow-emerald-500/30' },
};

const techBadgeColors: Record<string, string> = {
  LLM: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300',
  RAG: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300',
  ML: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300',
  NLP: 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300',
};

// ── Simulated Event Messages ─────────────────────────

const eventMessages = [
  ['Analyzing requirements...', 'Detecting gaps in KYC spec...', 'Risk scoring user stories...'],
  ['Scanning PR #4521...', 'Predicting change impact...', 'Extracting entities from diff...'],
  ['Matching defect DEF-4521...', 'Generating root cause...', 'Classifying severity...'],
  ['Scoring release v3.5.0...', 'Checking deployment readiness...', 'Validating knowledge base...'],
  ['Correlating incident signals...', 'Analyzing log patterns...', 'Detecting anomalies...'],
  ['Updating risk models...', 'Enriching knowledge base...', 'Closing feedback loop...'],
];

// ── Flow Simulation (12s loop) ───────────────────────

function useFlowSimulation() {
  const [activeStep, setActiveStep] = useState(0);
  const [eventMsg, setEventMsg] = useState('');
  const msgIdxRef = useRef(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep(prev => {
        const next = (prev + 1) % 6;
        msgIdxRef.current = 0;
        return next;
      });
    }, 2000); // 2s per step = 12s full loop
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const msgs = eventMessages[activeStep];
    setEventMsg(msgs[0]);
    msgIdxRef.current = 0;

    const msgTimer = setInterval(() => {
      msgIdxRef.current = (msgIdxRef.current + 1) % msgs.length;
      setEventMsg(msgs[msgIdxRef.current]);
    }, 650);

    return () => clearInterval(msgTimer);
  }, [activeStep]);

  return { activeStep, eventMsg };
}

// ── Animated Counter ─────────────────────────────────

function AnimatedCounter({ target, duration = 1800 }: { target: number; duration?: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Small delay so animation is visible after mount/scroll
    const delay = setTimeout(() => {
      const steps = 30;
      const increment = target / steps;
      const stepTime = duration / steps;
      let current = 0;
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          setCount(target);
          clearInterval(timer);
        } else {
          setCount(Math.round(current));
        }
      }, stepTime);
      // Store cleanup
      return () => clearInterval(timer);
    }, 400);
    return () => clearTimeout(delay);
  }, [target, duration]);

  return <span>{count}</span>;
}

// ── Component ──────────────────────────────────────────

export default function DevLandingPage({ onNavigateToSection }: DevLandingPageProps) {
  const { activeStep, eventMsg } = useFlowSimulation();

  return (
    <div className="p-6 space-y-8 max-w-7xl mx-auto">
      {/* Hero */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 via-blue-950 to-purple-950 p-8 md:p-12">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(59,130,246,0.15),transparent_60%)]" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-white/10 rounded-xl backdrop-blur-sm">
              <Layers className="w-8 h-8 text-white" />
            </div>
            <span className="px-3 py-1 bg-amber-500/20 text-amber-300 text-xs font-semibold rounded-full border border-amber-500/30">Development Mode</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">Software Lifecycle Intelligence Platform</h1>
          <p className="text-lg text-blue-200 max-w-2xl mb-6">The brain of the software lifecycle — learning from every defect, release, and incident. Six intelligence layers covering PLAN through LEARN.</p>
          <div className="flex flex-wrap gap-3">
            {sdlcLayers.map(layer => {
              const c = colorMap[layer.color];
              return (
                <button key={layer.id} onClick={() => onNavigateToSection(layer.section)} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/10 transition-all">
                  <span className={`w-6 h-6 rounded flex items-center justify-center text-[10px] font-bold bg-gradient-to-br ${c.gradient} text-white`}>L{layer.num}</span>
                  <span className="text-sm text-white font-medium">{layer.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </motion.div>

      {/* SDLC Flow Simulation — Enhanced */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center gap-2 mb-2">
          <Zap className="w-4 h-4 text-blue-500" />
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Live SDLC Intelligence Flow</h2>
          <span className="relative flex h-2 w-2 ml-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
          </span>
          <span className="text-[10px] text-green-600 dark:text-green-400 font-medium">Auto-play 12s loop</span>
        </div>

        {/* Event message ticker */}
        <AnimatePresence mode="wait">
          <motion.div key={eventMsg} initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }} transition={{ duration: 0.2 }} className="mb-4 px-3 py-2 bg-gray-50 dark:bg-gray-900/50 rounded-lg border border-gray-100 dark:border-gray-700">
            <span className="text-xs font-mono text-gray-600 dark:text-gray-400">
              <span className="text-blue-500 mr-2">&gt;</span>{eventMsg}
            </span>
          </motion.div>
        </AnimatePresence>

        {/* Flow nodes */}
        <div className="flex items-center justify-between gap-2 overflow-x-auto pb-2">
          {sdlcLayers.map((layer, i) => {
            const c = colorMap[layer.color];
            const isActive = activeStep === i;
            const isPast = i < activeStep;
            return (
              <div key={layer.id} className="flex items-center gap-2 flex-shrink-0">
                <motion.button
                  onClick={() => onNavigateToSection(layer.section)}
                  animate={{
                    scale: isActive ? 1.1 : 1,
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className={`relative flex flex-col items-center p-3 rounded-xl border-2 transition-colors min-w-[100px] ${
                    isActive
                      ? `${c.border} ${c.light} shadow-lg ${c.glow}`
                      : isPast
                        ? `border-gray-300 dark:border-gray-600 ${c.light} opacity-80`
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      className={`absolute inset-0 rounded-xl ${c.light} opacity-50`}
                      animate={{ opacity: [0.3, 0.6, 0.3] }}
                      transition={{ duration: 1.2, repeat: Infinity }}
                    />
                  )}
                  <div className={`relative z-10 p-2 rounded-lg mb-2 ${isActive ? `bg-gradient-to-br ${c.gradient} shadow-md` : isPast ? `bg-gradient-to-br ${c.gradient} opacity-60` : 'bg-gray-100 dark:bg-gray-700'}`}>
                    <layer.icon className={`w-4 h-4 ${isActive || isPast ? 'text-white' : 'text-gray-500 dark:text-gray-400'}`} />
                  </div>
                  <span className={`relative z-10 text-[10px] font-bold ${isActive ? c.text : isPast ? c.text + ' opacity-70' : 'text-gray-500 dark:text-gray-400'}`}>L{layer.num}</span>
                  <span className={`relative z-10 text-xs font-semibold ${isActive ? 'text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-400'}`}>{layer.label}</span>
                  {isActive && (
                    <motion.div layoutId="flow-indicator" className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 h-1 rounded-full ${c.bg}`} transition={{ type: 'spring', stiffness: 500, damping: 30 }} />
                  )}
                </motion.button>
                {i < sdlcLayers.length - 1 && (
                  <motion.div animate={{ opacity: activeStep === i ? 1 : 0.3, scale: activeStep === i ? 1.3 : 1 }} transition={{ duration: 0.3 }}>
                    <ArrowRight className={`w-4 h-4 flex-shrink-0 ${activeStep === i ? 'text-blue-500' : 'text-gray-300 dark:text-gray-600'}`} />
                  </motion.div>
                )}
              </div>
            );
          })}
        </div>

        {/* Progress bar */}
        <div className="mt-4 h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-teal-500 via-purple-500 to-emerald-500"
            animate={{ width: `${((activeStep + 1) / 6) * 100}%` }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          />
        </div>

        {/* Feedback loop indicator */}
        <div className="flex items-center justify-center gap-2 mt-3 pt-3 border-t border-gray-100 dark:border-gray-700">
          <RefreshCw className={`w-4 h-4 text-emerald-500 ${activeStep === 5 ? 'animate-spin' : ''}`} />
          <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
            {activeStep === 5 ? 'Feedback loop active — learning insights flowing back to PLAN' : 'PLAN → BUILD → TEST → RELEASE → OPERATE → LEARN → feedback loop'}
          </span>
        </div>
      </motion.div>

      {/* Layer Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sdlcLayers.map((layer, i) => {
          const c = colorMap[layer.color];
          return (
            <motion.button key={layer.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 + i * 0.06 }} onClick={() => onNavigateToSection(layer.section)} className="text-left p-6 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:shadow-lg transition-all group">
              <div className="flex items-center gap-3 mb-3">
                <div className={`p-2 rounded-lg bg-gradient-to-br ${c.gradient}`}>
                  <layer.icon className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-bold ${c.text}`}>L{layer.num}</span>
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">{layer.name}</span>
                  </div>
                </div>
                <CheckCircle2 className={`w-4 h-4 ml-auto ${c.text}`} />
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{layer.desc}</p>
              <div className="flex flex-wrap gap-1">
                {layer.techniques.map(t => (
                  <span key={t} className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${techBadgeColors[t]}`}>{t}</span>
                ))}
              </div>
              <div className="mt-3 flex items-center gap-1 text-xs text-gray-400 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors">
                <span>Explore</span><ArrowRight className="w-3 h-3" />
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Intelligence Loop */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="bg-gradient-to-r from-emerald-50 to-blue-50 dark:from-emerald-900/20 dark:to-blue-900/20 rounded-xl border border-emerald-200 dark:border-emerald-800 p-6">
        <div className="flex items-center gap-2 mb-4">
          <RefreshCw className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <h2 className="text-lg font-semibold text-emerald-900 dark:text-emerald-200">Self-Learning Intelligence Loop</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { icon: Activity, title: 'Production Incident', desc: 'Issue detected in OPERATE layer', color: 'text-blue-600 dark:text-blue-400' },
            { icon: Brain, title: 'Root Cause Analysis', desc: 'LLM + RAG analyze across systems', color: 'text-purple-600 dark:text-purple-400' },
            { icon: TrendingUp, title: 'Knowledge Update', desc: 'Patterns learned, models retrained', color: 'text-amber-600 dark:text-amber-400' },
            { icon: Shield, title: 'Prevention Applied', desc: 'Tests improved, risk models updated', color: 'text-emerald-600 dark:text-emerald-400' },
          ].map((step, i) => (
            <div key={step.title} className="flex items-start gap-3">
              {i > 0 && <ArrowRight className="w-4 h-4 text-emerald-400 mt-1 flex-shrink-0 hidden md:block" />}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <step.icon className={`w-4 h-4 ${step.color}`} />
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">{step.title}</span>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="text-xs text-emerald-700 dark:text-emerald-300 mt-4 text-center font-medium">Every incident makes the platform smarter. Every release improves future predictions.</p>
      </motion.div>

      {/* Key Metrics — Animated Counters */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'SDLC Layers', value: 6, sub: 'L0 through L5' },
          { label: 'AI Techniques', value: 4, sub: 'LLM, RAG, ML, NLP' },
          { label: 'Intelligence Modules', value: 8, sub: 'Active across all layers' },
          { label: 'Feedback Loops', value: 38, sub: 'Completed learning cycles' },
        ].map(m => (
          <motion.div key={m.label} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.6 }} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 text-center">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              <AnimatedCounter target={m.value} />
            </div>
            <div className="text-sm font-medium text-gray-700 dark:text-gray-300">{m.label}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">{m.sub}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
