'use client';

import { Server, Users, GitPullRequest, AlertTriangle, BookOpen, Bug, Package, ExternalLink } from 'lucide-react';
import { getServiceByName, layerConfig, type ServiceEntity, type EntityType } from '@/lib/entityRegistry';

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

interface ServiceContextCardProps {
  /** Service name to look up */
  serviceName: string;
  /** Callback when a linked entity is clicked */
  onNavigate?: (sectionId: string) => void;
}

// ── Component ─────────────────────────────────────────────────

export default function ServiceContextCard({ serviceName, onNavigate }: ServiceContextCardProps) {
  const service = getServiceByName(serviceName);

  if (!service) return null;

  return (
    <div className="bg-gradient-to-br from-gray-50 to-slate-50 dark:from-gray-800 dark:to-slate-900/50 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
      {/* Service Header */}
      <div className="flex items-center gap-3 mb-3">
        <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
          <Server className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-bold text-gray-900 dark:text-white">{service.name}</h4>
          <div className="flex items-center gap-2">
            <Users className="w-3 h-3 text-gray-400" />
            <span className="text-[10px] text-gray-500 dark:text-gray-400">{service.owner}</span>
          </div>
        </div>
      </div>

      <p className="text-xs text-gray-600 dark:text-gray-400 mb-3 leading-relaxed">{service.description}</p>

      {/* Layer Presence Indicators */}
      <div className="flex flex-wrap gap-1.5">
        {service.references.map(ref => {
          const layer = layerConfig[ref.layer];
          const Icon = iconMap[ref.type] || Server;
          return (
            <button
              key={ref.id}
              onClick={() => onNavigate?.(ref.sectionId)}
              className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-medium border ${layer.border} ${layer.bg} ${layer.color} hover:shadow-sm transition-all`}
              title={ref.description}
            >
              <Icon className="w-3 h-3" />
              <span>{layer.label}</span>
              <ExternalLink className="w-2.5 h-2.5 opacity-50" />
            </button>
          );
        })}
      </div>
    </div>
  );
}
