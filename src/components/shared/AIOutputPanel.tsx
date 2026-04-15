'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, RefreshCw, Eye, X, Clock, Cpu, Hash, BarChart3 } from 'lucide-react';
import type { AIGenerationResult, AITechnique } from '@/lib/ai/simulatedAI';
import { getStreamingWords, STREAM_DELAY_MS } from '@/lib/ai/simulatedAI';

// ── Types ──────────────────────────────────────────────

interface AIOutputPanelProps {
  /** Function that produces a new AI result (called on mount + regenerate) */
  generate: () => AIGenerationResult;
  /** Unique key — changing this triggers a new generation */
  contextKey: string;
  /** Technique badges to display in header */
  techniques: AITechnique[];
  /** Section title */
  title: string;
}

const techBadge: Record<string, string> = {
  LLM: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300',
  RAG: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300',
  ML: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300',
  NLP: 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300',
};

const confidenceColor = (v: number) =>
  v >= 0.9 ? 'text-green-600 dark:text-green-400' :
  v >= 0.7 ? 'text-amber-600 dark:text-amber-400' :
  v >= 0.5 ? 'text-orange-600 dark:text-orange-400' :
  'text-red-600 dark:text-red-400';

// ── Component ──────────────────────────────────────────

export default function AIOutputPanel({ generate, contextKey, techniques, title }: AIOutputPanelProps) {
  const [result, setResult] = useState<AIGenerationResult | null>(null);
  const [displayedText, setDisplayedText] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const wordIndexRef = useRef(0);
  const wordsRef = useRef<string[]>([]);

  const startStreaming = useCallback((genResult: AIGenerationResult) => {
    setResult(genResult);
    setDisplayedText('');
    setIsStreaming(true);
    wordIndexRef.current = 0;
    wordsRef.current = getStreamingWords(genResult.text);
  }, []);

  // Stream words one at a time — uses the original text as source of truth
  // to prevent duplication from React strict-mode double-invocation or stale closures.
  // We track how many tokens have been revealed via wordIndexRef, then display
  // the corresponding substring of the original text to guarantee correct spacing.
  useEffect(() => {
    if (!isStreaming || !result || wordsRef.current.length === 0) return;

    const fullText = result.text;

    const tick = () => {
      if (wordIndexRef.current >= wordsRef.current.length) {
        setDisplayedText(fullText);
        setIsStreaming(false);
        return;
      }
      wordIndexRef.current++;
      // Calculate the character length of revealed tokens and slice the original text
      const charCount = wordsRef.current.slice(0, wordIndexRef.current).reduce((sum, tok) => sum + tok.length, 0);
      setDisplayedText(fullText.substring(0, charCount));
      timerRef.current = setTimeout(tick, STREAM_DELAY_MS);
    };

    timerRef.current = setTimeout(tick, 400); // initial delay to show "Generating..."
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [isStreaming, result]);

  // Trigger generation on contextKey change
  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    const r = generate();
    startStreaming(r);
  }, [contextKey, generate, startStreaming]);

  const handleRegenerate = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    const r = generate();
    startStreaming(r);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-3 border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-blue-500" />
          <span className="text-sm font-semibold text-gray-900 dark:text-white">{title}</span>
          {techniques.map(t => (
            <span key={t} className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${techBadge[t]}`}>{t}</span>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setShowPrompt(!showPrompt)} className="flex items-center gap-1 px-2 py-1 text-[10px] font-medium text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 rounded transition-colors" title="View Prompt">
            <Eye className="w-3 h-3" /><span>Prompt</span>
          </button>
          <button onClick={handleRegenerate} disabled={isStreaming} className="flex items-center gap-1 px-2 py-1 text-[10px] font-medium text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 rounded transition-colors disabled:opacity-40" title="Regenerate">
            <RefreshCw className={`w-3 h-3 ${isStreaming ? 'animate-spin' : ''}`} /><span>Regenerate</span>
          </button>
        </div>
      </div>

      {/* Prompt Template (collapsible) */}
      <AnimatePresence>
        {showPrompt && result && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
            <div className="px-6 py-3 bg-blue-50 dark:bg-blue-900/10 border-b border-blue-100 dark:border-blue-900/30">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">Prompt Template</span>
                <button onClick={() => setShowPrompt(false)}><X className="w-3 h-3 text-blue-400" /></button>
              </div>
              <p className="text-xs text-blue-700 dark:text-blue-300 font-mono leading-relaxed">{result.promptTemplate}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Output Body */}
      <div className="px-6 py-4 min-h-[120px]">
        {isStreaming && displayedText.length === 0 ? (
          <div className="flex items-center gap-3">
            <div className="flex gap-1">
              <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400">Generating analysis...</span>
          </div>
        ) : (
          <div className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
            {displayedText}
            {isStreaming && <span className="inline-block w-2 h-4 bg-blue-500 ml-0.5 animate-pulse rounded-sm" />}
          </div>
        )}
      </div>

      {/* Metadata Footer */}
      {result && !isStreaming && displayedText.length > 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="px-6 py-2 border-t border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-1 text-[10px] text-gray-500 dark:text-gray-400">
            <Cpu className="w-3 h-3" /><span>{result.meta.model}</span>
          </div>
          <div className="flex items-center gap-1 text-[10px] text-gray-500 dark:text-gray-400">
            <Hash className="w-3 h-3" /><span>{result.meta.tokens.toLocaleString()} tokens</span>
          </div>
          <div className="flex items-center gap-1 text-[10px] text-gray-500 dark:text-gray-400">
            <Clock className="w-3 h-3" /><span>{(result.meta.latency_ms / 1000).toFixed(1)}s</span>
          </div>
          <div className="flex items-center gap-1 text-[10px]">
            <BarChart3 className="w-3 h-3 text-gray-400" />
            <span className={`font-semibold ${confidenceColor(result.meta.confidence)}`}>
              {Math.round(result.meta.confidence * 100)}% confidence
            </span>
          </div>
        </motion.div>
      )}
    </div>
  );
}
