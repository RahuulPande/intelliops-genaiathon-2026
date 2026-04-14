'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Loader2, Sparkles, Clock, Cpu, DollarSign, Activity, CheckCircle } from 'lucide-react';
import AIResultFormatter from '@/components/showcase/AIResultFormatter';

const analysisOptions = [
  {
    id: 'defect_pattern_analysis',
    label: 'Defect Pattern Analysis',
    description: 'RAG-powered matching against 3,247 historical defects',
    technique: 'RAG',
    techniqueBg: 'bg-green-100',
    techniqueText: 'text-green-700',
  },
  {
    id: 'failure_root_cause_cluster',
    label: 'Failure Root Cause Clustering',
    description: 'ML + NLP to group failures by shared root cause',
    technique: 'ML+NLP',
    techniqueBg: 'bg-amber-100',
    techniqueText: 'text-amber-700',
  },
  {
    id: 'release_readiness',
    label: 'Release Readiness Prediction',
    description: 'ML-based confidence scoring from partial test results',
    technique: 'ML',
    techniqueBg: 'bg-amber-100',
    techniqueText: 'text-amber-700',
  },
];

interface AuditEntry {
  timestamp: string;
  model: string;
  inputTokens: number;
  outputTokens: number;
  costUsd: string;
  isSimulated: boolean;
  durationMs: number;
}

export default function AIProofScreen() {
  const [selectedAnalysis, setSelectedAnalysis] = useState(analysisOptions[0].id);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Record<string, unknown> | null>(null);
  const [audit, setAudit] = useState<AuditEntry | null>(null);

  const runAnalysis = useCallback(async () => {
    setLoading(true);
    setResult(null);
    setAudit(null);

    try {
      const res = await fetch('/api/ai/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: selectedAnalysis,
          context: { source: 'showcase', timestamp: new Date().toISOString() },
          layer: 'L1',
          workspace: 'showcase',
          inputSummary: `Showcase demo: ${selectedAnalysis}`,
          showcaseMode: true,
        }),
      });

      const json = await res.json();

      setResult(json.result as Record<string, unknown>);
      setAudit({
        timestamp: new Date().toISOString(),
        model: json.model ?? 'claude-sonnet-4-20250514 (simulated)',
        inputTokens: json.tokenUsage?.input ?? 0,
        outputTokens: json.tokenUsage?.output ?? 0,
        costUsd: ((json.tokenUsage?.input ?? 0) * 3 / 1_000_000 + (json.tokenUsage?.output ?? 0) * 15 / 1_000_000).toFixed(4),
        isSimulated: json.isSimulated ?? true,
        durationMs: json.durationMs ?? 0,
      });
    } catch {
      setResult({ error: 'Analysis failed — API unavailable. This is expected in demo mode.' });
      setAudit({
        timestamp: new Date().toISOString(),
        model: 'claude-sonnet-4-20250514 (simulated)',
        inputTokens: 0,
        outputTokens: 0,
        costUsd: '0.0000',
        isSimulated: true,
        durationMs: 0,
      });
    } finally {
      setLoading(false);
    }
  }, [selectedAnalysis]);

  return (
    <div className="relative">
      {/* Section Label */}
      <div className="absolute top-0 left-0 -mt-16 ml-2">
        <div className="text-[11px] uppercase tracking-[0.15em] font-semibold text-gray-500">AI IN ACTION</div>
        <div className="text-[10px] text-gray-400 mt-0.5 font-medium">Live analysis with audit trail</div>
      </div>

      {/* Accent Line */}
      <div className="absolute top-0 left-0 right-0 -mt-24 h-[2px] bg-purple-500/60" />

      {/* Headline */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          AI in Action — <span className="text-teal-700">Live Proof</span>
        </h1>
        <p className="text-gray-600">Select an analysis type and watch AI generate real insights.</p>
        <p className="text-sm text-gray-500 italic mt-1">
          AI modeled on 3,247 defect patterns, incident logs, and resolution data
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {/* Left: Picker */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Choose Analysis Type</h3>
          {analysisOptions.map((opt) => (
            <button
              key={opt.id}
              onClick={() => setSelectedAnalysis(opt.id)}
              className={`w-full text-left p-4 rounded-xl border transition-all ${
                selectedAnalysis === opt.id
                  ? 'border-teal-500 bg-teal-50'
                  : 'border-gray-200 bg-white hover:border-gray-300 shadow-sm'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-gray-900">{opt.label}</span>
                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${opt.techniqueBg} ${opt.techniqueText}`}>
                  {opt.technique}
                </span>
              </div>
              <p className="text-xs text-gray-500">{opt.description}</p>
            </button>
          ))}

          <button
            onClick={runAnalysis}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-teal-700 hover:bg-teal-800 text-white font-bold rounded-xl transition-colors disabled:opacity-50 mt-4"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Play className="w-5 h-5" />}
            {loading ? 'Analyzing...' : 'Run AI Analysis'}
          </button>
        </div>

        {/* Right: Result */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 min-h-[300px] flex flex-col">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-4 h-4 text-teal-700" />
            <h3 className="text-sm font-semibold text-gray-700">AI Result</h3>
          </div>

          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-1 flex items-center justify-center"
              >
                <div className="text-center">
                  <Loader2 className="w-8 h-8 text-teal-700 animate-spin mx-auto mb-3" />
                  <p className="text-sm text-gray-500">Running AI analysis pipeline...</p>
                  <p className="text-xs text-gray-400 mt-1">Rate limit → Cost guard → Claude API → Audit</p>
                </div>
              </motion.div>
            ) : result ? (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex-1 overflow-auto"
              >
                <AIResultFormatter analysisType={selectedAnalysis} result={result} />
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex-1 flex items-center justify-center"
              >
                <p className="text-sm text-gray-400">Click &quot;Run AI Analysis&quot; to see results</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Powered By Strip */}
      <AnimatePresence>
        {result && !loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="max-w-5xl mx-auto mt-4"
          >
            <div className="flex items-center justify-center gap-3 text-xs text-gray-400">
              <span className="flex items-center gap-1">
                Powered by: <span className="text-green-600 font-medium">RAG</span> · <span className="text-amber-600 font-medium">ML</span> · <span className="text-purple-600 font-medium">NLP</span>
              </span>
              <span className="w-px h-3 bg-gray-300" />
              <span>Model: <span className="text-gray-600">Claude Sonnet 4</span></span>
              <span className="w-px h-3 bg-gray-300" />
              <span className="flex items-center gap-1 text-green-600">
                <CheckCircle className="w-3 h-3" />
                Audit logged
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Audit Entry */}
      <AnimatePresence>
        {audit && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="max-w-5xl mx-auto mt-6"
          >
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
              <div className="flex items-center gap-2 mb-3">
                <Activity className="w-4 h-4 text-teal-700" />
                <span className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Real-Time Audit Entry</span>
                {audit.isSimulated && (
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-700 border border-amber-200">
                    Simulated
                  </span>
                )}
              </div>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-gray-400" />
                  <div>
                    <div className="text-[10px] text-gray-400">Timestamp</div>
                    <div className="text-xs text-gray-700 font-mono">{new Date(audit.timestamp).toLocaleTimeString()}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Cpu className="w-3.5 h-3.5 text-gray-400" />
                  <div>
                    <div className="text-[10px] text-gray-400">Model</div>
                    <div className="text-xs text-gray-700 font-mono truncate max-w-[140px]">{audit.model}</div>
                  </div>
                </div>
                <div>
                  <div className="text-[10px] text-gray-400">Tokens</div>
                  <div className="text-xs text-gray-700 font-mono">{audit.inputTokens} in / {audit.outputTokens} out</div>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="w-3.5 h-3.5 text-gray-400" />
                  <div>
                    <div className="text-[10px] text-gray-400">Cost</div>
                    <div className="text-xs text-gray-700 font-mono">${audit.costUsd}</div>
                  </div>
                </div>
                <div>
                  <div className="text-[10px] text-gray-400">Duration</div>
                  <div className="text-xs text-gray-700 font-mono">{audit.durationMs}ms</div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
