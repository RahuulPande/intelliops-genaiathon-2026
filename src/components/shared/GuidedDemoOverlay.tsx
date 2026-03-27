'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  X,
  CheckCircle,
  Zap,
  Check,
  SkipForward,
  RotateCcw,
  Pause,
  Play,
} from 'lucide-react';
import { tourSteps, getLayerBadgeColor } from '@/lib/demoTour';

interface GuidedDemoOverlayProps {
  isActive: boolean;
  onClose: () => void;
  onNavigate: (sectionId: string) => void;
}

// ── Spotlight: lightweight border highlight on target element ─────────────
// No full-page dim — just a pulsing border so the page stays fully visible.
const SpotlightHighlight: React.FC<{ target?: string }> = ({ target }) => {
  const [rect, setRect] = useState<DOMRect | null>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (!target) {
      setRect(null);
      return;
    }

    const track = () => {
      try {
        const el = document.querySelector(target);
        if (el) {
          setRect(el.getBoundingClientRect());
        } else {
          setRect(null);
        }
      } catch {
        setRect(null);
      }
      rafRef.current = requestAnimationFrame(track);
    };

    track();
    return () => cancelAnimationFrame(rafRef.current);
  }, [target]);

  if (!rect) return null;

  const pad = 6;

  return (
    <motion.div
      key="spotlight-border"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed pointer-events-none rounded-xl border-2 border-purple-400 dark:border-purple-300"
      style={{
        zIndex: 50,
        top: rect.top - pad,
        left: rect.left - pad,
        width: rect.width + pad * 2,
        height: rect.height + pad * 2,
      }}
    >
      <motion.div
        animate={{
          boxShadow: [
            '0 0 0 0px rgba(147, 130, 255, 0.4), 0 0 12px rgba(147, 130, 255, 0.3)',
            '0 0 0 6px rgba(147, 130, 255, 0.15), 0 0 24px rgba(147, 130, 255, 0.15)',
            '0 0 0 0px rgba(147, 130, 255, 0.4), 0 0 12px rgba(147, 130, 255, 0.3)',
          ],
        }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute inset-0 rounded-xl"
      />
    </motion.div>
  );
};

// ── Entity selection dispatcher ──────────────────────────────────────────
const dispatchEntitySelection = (step: (typeof tourSteps)[0]) => {
  const entityMap: Record<number, { entityId: string; layerId: string }> = {
    4: { entityId: 'pr-4521', layerId: 'build-intelligence' },
    5: { entityId: 'pr-4521', layerId: 'build-intelligence' },
    6: { entityId: 'def-2024-042', layerId: 'test-quality-intelligence' },
    7: { entityId: 'inc-2024-178', layerId: 'service-health-intelligence' },
  };

  if (step.id in entityMap) {
    const selection = entityMap[step.id as keyof typeof entityMap];
    window.dispatchEvent(
      new CustomEvent('intelliops-tour-select', {
        detail: selection,
        bubbles: true,
      }),
    );
  }
};

// ── SDLC mini-progress (horizontal pills) ───────────────────────────────
const SDLC_PHASES = [
  { id: 'plan', label: 'PLAN', colors: 'bg-teal-500 text-white' },
  { id: 'build', label: 'BUILD', colors: 'bg-indigo-500 text-white' },
  { id: 'test', label: 'TEST', colors: 'bg-purple-500 text-white' },
  { id: 'release', label: 'RELEASE', colors: 'bg-rose-500 text-white' },
  { id: 'operate', label: 'OPERATE', colors: 'bg-blue-500 text-white' },
  { id: 'learn', label: 'LEARN', colors: 'bg-emerald-500 text-white' },
];

const getPhaseIndex = (layer: string): number => {
  if (layer.includes('plan')) return 0;
  if (layer.includes('build')) return 1;
  if (layer.includes('test')) return 2;
  if (layer.includes('service-health') || layer.includes('operations')) return 4;
  if (layer.includes('learn')) return 5;
  return -1; // home / overview
};

// ═════════════════════════════════════════════════════════════════════════════
// Main component — compact bottom-docked strip that keeps the page visible
// ═════════════════════════════════════════════════════════════════════════════
export const GuidedDemoOverlay: React.FC<GuidedDemoOverlayProps> = ({
  isActive,
  onClose,
  onNavigate,
}) => {
  const [stepIndex, setStepIndex] = useState(0);
  const [progress, setProgress] = useState(100);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const step = tourSteps[stepIndex];
  const phaseIdx = getPhaseIndex(step.layer);
  const layerColors = getLayerBadgeColor(step.layer);

  // ── Auto-advance timer ──────────────────────────────────────────────────
  useEffect(() => {
    if (!isActive || isCompleted || isPaused) return;

    const ms = step.autoAdvanceMs;
    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev - 100 / (ms / 100);
        if (next <= 0) {
          if (stepIndex < tourSteps.length - 1) {
            setStepIndex((p) => p + 1);
            setProgress(100);
          } else {
            setIsCompleted(true);
          }
          return 0;
        }
        return next;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isActive, stepIndex, step, isCompleted, isPaused]);

  // ── Navigate on step change ─────────────────────────────────────────────
  useEffect(() => {
    if (isActive && !isCompleted) {
      try {
        onNavigate(step.targetSection);
        dispatchEntitySelection(step);
      } catch (err) {
        console.warn('[DemoTour] Navigation error:', err);
      }
    }
  }, [stepIndex, isActive, isCompleted, step, onNavigate]);

  // ── Keyboard: Esc closes, arrow keys navigate ──────────────────────────
  useEffect(() => {
    if (!isActive) return;
    const handle = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === ' ') {
        e.preventDefault();
        setIsPaused((p) => !p);
      }
    };
    window.addEventListener('keydown', handle);
    return () => window.removeEventListener('keydown', handle);
  }, [isActive, stepIndex, onClose]);

  // ── Navigation helpers ──────────────────────────────────────────────────
  const goPrev = () => {
    if (stepIndex > 0) {
      setStepIndex((p) => p - 1);
      setProgress(100);
    }
  };
  const goNext = () => {
    if (stepIndex < tourSteps.length - 1) {
      setStepIndex((p) => p + 1);
      setProgress(100);
    } else {
      setIsCompleted(true);
    }
  };
  const reset = () => {
    setStepIndex(0);
    setProgress(100);
    setIsCompleted(false);
    setIsPaused(false);
  };
  const close = () => {
    onClose();
    reset();
  };

  if (!isActive) return null;

  // ══════════════════════════════════════════════════════════════════════════
  return (
    <>
      {/* Spotlight highlight on the target element (no page dimming) */}
      <AnimatePresence>
        {!isCompleted && step.spotlightTarget && (
          <SpotlightHighlight key="spotlight" target={step.spotlightTarget} />
        )}
      </AnimatePresence>

      {/* Bottom-docked tour strip */}
      <AnimatePresence>
        <motion.div
          key="tour-strip"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed bottom-0 inset-x-0 z-50"
        >
          {/* Progress bar — full-width, very thin */}
          {!isCompleted && (
            <div className="h-1 bg-gray-200 dark:bg-gray-700">
              <motion.div
                className="h-full bg-gradient-to-r from-purple-500 to-indigo-500"
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1, ease: 'linear' }}
              />
            </div>
          )}

          <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-t border-gray-200 dark:border-gray-700 shadow-2xl">
            {!isCompleted ? (
              /* ── Active tour step ─────────────────────────────── */
              <div className="max-w-6xl mx-auto px-6 py-4 flex items-center gap-6">
                {/* SDLC phase pills */}
                <div className="hidden lg:flex items-center gap-1 flex-shrink-0">
                  {SDLC_PHASES.map((phase, i) => {
                    const done = i < phaseIdx;
                    const current = i === phaseIdx;
                    return (
                      <div
                        key={phase.id}
                        className={`flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider transition-all ${
                          current
                            ? phase.colors
                            : done
                              ? 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                              : 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600'
                        }`}
                      >
                        {done && <Check className="w-2.5 h-2.5" />}
                        {current && <Zap className="w-2.5 h-2.5" />}
                        {phase.label}
                      </div>
                    );
                  })}
                </div>

                {/* Divider */}
                <div className="hidden lg:block w-px h-8 bg-gray-200 dark:bg-gray-700 flex-shrink-0" />

                {/* Step badge */}
                <span
                  className={`flex-shrink-0 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${layerColors.bg} ${layerColors.text}`}
                >
                  <Zap className="w-3 h-3" />
                  {step.id}/{tourSteps.length}
                </span>

                {/* Narration text */}
                <AnimatePresence mode="wait">
                  <motion.p
                    key={stepIndex}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                    className="flex-1 text-sm font-medium text-gray-800 dark:text-gray-200 leading-snug min-w-0"
                  >
                    {step.narration}
                  </motion.p>
                </AnimatePresence>

                {/* Controls */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={() => setIsPaused((p) => !p)}
                    className="p-1.5 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    title={isPaused ? 'Resume (Space)' : 'Pause (Space)'}
                  >
                    {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={goPrev}
                    disabled={stepIndex === 0}
                    className="p-1.5 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    title="Previous step"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={goNext}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-semibold hover:shadow-lg transition-shadow"
                  >
                    {stepIndex === tourSteps.length - 1 ? 'Finish' : 'Next'}
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={close}
                    className="p-1.5 rounded-lg text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    title="End tour (Esc)"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              /* ── Tour complete ────────────────────────────────── */
              <div className="max-w-6xl mx-auto px-6 py-4 flex items-center gap-6">
                <CheckCircle className="w-8 h-8 text-emerald-500 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-sm font-bold text-gray-900 dark:text-white">
                    Tour Complete
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    You&apos;ve explored the full IntelliOps AI lifecycle — 75% faster resolution, 96% defect accuracy, continuous self-learning.
                  </p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={reset}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 text-xs font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    Restart
                  </button>
                  <button
                    onClick={close}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-semibold hover:shadow-lg transition-shadow"
                  >
                    Done
                  </button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </>
  );
};
