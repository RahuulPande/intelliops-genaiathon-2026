'use client';

import { Shield } from 'lucide-react';

interface TrustBadgesProps {
  className?: string;
}

const badges = [
  'SOC 2',
  'ISO 27001',
  'GDPR Ready',
  'PCI DSS',
  'EU AI Act Ready',
];

export default function TrustBadges({ className = '' }: TrustBadgesProps) {
  return (
    <div className={`flex flex-wrap items-center justify-center gap-6 ${className}`}>
      {badges.map((badge) => (
        <div
          key={badge}
          className="flex items-center gap-2 text-[#64748B]"
        >
          <Shield className="w-4 h-4" />
          <span className="font-[family-name:var(--font-mono-jb)] text-xs tracking-wide">
            {badge}
          </span>
        </div>
      ))}
    </div>
  );
}
