'use client';

import { motion } from 'framer-motion';
import { ArrowRight, GitPullRequest, AlertTriangle, Bug, Package, BookOpen, Server, Link2 } from 'lucide-react';
import {
  getCrossLayerReferences,
  layerConfig,
  type SDLCLayer,
  type EntityReference,
  type EntityType,
} from '@/lib/entityRegistry';

// ── Icon lookup ───────────────────────────────────────────────

const iconMap: Record<EntityType, React.ComponentType<{ className?: string }>> = {
  service: Server,
  pr: GitPullRequest,
  incident: AlertTriangle,
  defect: Bug,
  release: Package,
  knowledge: BookOpen,
};

// ── Props ─────────────────────────────────────────────────────

interface CrossLayerLinksProps {
  /** Service name to look up cross-layer references for */
  serviceName: string;
  /** Current layer — references in this layer are excluded */
  currentLayer: SDLCLayer;
  /** Callback when a reference is clicked */
  onNavigate?: (sectionId: string) => void;
  /** Optional max references to show */
  maxItems?: number;
}

// ── Component ─────────────────────────────────────────────────

export default function CrossLayerLinks({ serviceName, currentLayer, onNavigate, maxItems = 6 }: CrossLayerLinksProps) {
  const refs = getCrossLayerReferences(serviceName, currentLayer).slice(0, maxItems);

  if (refs.length === 0) return null;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-center gap-2 mb-4">
        <Link2 className="w-4 h-4 text-indigo-500" />
        <h4 className="text-sm font-bold text-gray-800 dark:text-gray-200">Cross-Layer Intelligence</h4>
        <span className="text-[10px] text-gray-400 dark:text-gray-500 ml-1">
          {serviceName} across the SDLC
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {refs.map((ref) => (
          <ReferenceCard key={ref.id} reference={ref} onNavigate={onNavigate} />
        ))}
      </div>
    </div>
  );
}

// ── Reference Card ─────────────────────────────────────────────

function ReferenceCard({
  reference,
  onNavigate,
}: {
  reference: EntityReference;
  onNavigate?: (sectionId: string) => void;
}) {
  const layer = layerConfig[reference.layer];
  const Icon = iconMap[reference.type] || Server;

  return (
    <motion.button
      onClick={() => onNavigate?.(reference.sectionId)}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      className={`text-left p-3 rounded-lg border ${layer.border} ${layer.bg} transition-all hover:shadow-sm`}
    >
      <div className="flex items-start gap-3">
        <div className="mt-0.5">
          <Icon className={`w-4 h-4 ${layer.color}`} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className={`text-[10px] font-bold uppercase tracking-wider ${layer.color}`}>
              {layer.label}
            </span>
            {reference.badge && (
              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${reference.badge.color}`}>
                {reference.badge.text}
              </span>
            )}
          </div>
          <p className="text-xs font-medium text-gray-900 dark:text-white truncate">{reference.label}</p>
          <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-2">{reference.description}</p>
        </div>
        <ArrowRight className="w-3.5 h-3.5 text-gray-400 dark:text-gray-500 mt-1 flex-shrink-0" />
      </div>
    </motion.button>
  );
}
