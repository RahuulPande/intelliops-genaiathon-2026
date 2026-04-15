'use client';

export interface ScoreGaugeProps {
  score: number;
  grade?: string;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  className?: string;
}

const sizeConfig = {
  sm: { dim: 64, stroke: 4, fontSize: 'text-lg', labelSize: 'text-[10px]' },
  md: { dim: 96, stroke: 6, fontSize: 'text-2xl', labelSize: 'text-xs' },
  lg: { dim: 128, stroke: 8, fontSize: 'text-3xl', labelSize: 'text-sm' },
};

function getColor(score: number): string {
  if (score >= 80) return '#22c55e'; // green-500
  if (score >= 60) return '#f59e0b'; // amber-500
  if (score >= 40) return '#f97316'; // orange-500
  return '#ef4444'; // red-500
}

export default function ScoreGauge({
  score,
  grade,
  size = 'md',
  showLabel = true,
  className = '',
}: ScoreGaugeProps) {
  const config = sizeConfig[size];
  const radius = (config.dim - config.stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.max(0, Math.min(100, score));
  const dashOffset = circumference * (1 - progress / 100);
  const color = getColor(score);

  return (
    <div className={`relative inline-flex flex-col items-center ${className}`}>
      <svg width={config.dim} height={config.dim} className="-rotate-90">
        <circle
          cx={config.dim / 2}
          cy={config.dim / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={config.stroke}
          className="text-gray-200 dark:text-gray-700"
        />
        <circle
          cx={config.dim / 2}
          cy={config.dim / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={config.stroke}
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          strokeLinecap="round"
          className="transition-all duration-700 ease-out"
        />
      </svg>
      <div
        className="absolute flex flex-col items-center justify-center"
        style={{ width: config.dim, height: config.dim }}
      >
        {grade && (
          <span className={`${config.fontSize} font-bold`} style={{ color }}>
            {grade}
          </span>
        )}
      </div>
      {showLabel && (
        <span className={`${config.labelSize} text-gray-500 dark:text-gray-400 mt-1`}>
          {score}/100
        </span>
      )}
    </div>
  );
}
