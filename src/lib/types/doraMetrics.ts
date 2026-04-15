// src/lib/types/doraMetrics.ts

export type DORAClassification = 'elite' | 'high' | 'medium' | 'low';
export type MetricTrend = 'improving' | 'stable' | 'declining';

export interface DORAMetrics {
  serviceId: string;
  serviceName: string;
  period: string;

  deploymentFrequency: {
    value: number;
    trend: MetricTrend;
    history: { week: string; count: number }[];
    rating: DORAClassification;
  };

  leadTimeForChanges: {
    value: number;
    trend: MetricTrend;
    history: { week: string; hours: number }[];
    rating: DORAClassification;
    breakdown: {
      codingTime: number;
      reviewTime: number;
      ciTime: number;
      deployTime: number;
    };
  };

  meanTimeToRecovery: {
    value: number;
    trend: MetricTrend;
    history: { week: string; minutes: number }[];
    rating: DORAClassification;
    recentIncidents: {
      id: string;
      title: string;
      recoveryMinutes: number;
      date: string;
    }[];
  };

  changeFailureRate: {
    value: number; // 0.0-1.0
    trend: MetricTrend;
    history: { week: string; rate: number }[]; // 0.0-1.0
    rating: DORAClassification;
    totalDeploys: number;
    failedDeploys: number;
  };

  overallRating: DORAClassification;
}

export interface DORABenchmark {
  metric: string;
  elite: string;
  high: string;
  medium: string;
  low: string;
}

export const DORA_BENCHMARKS: DORABenchmark[] = [
  { metric: 'Deployment Frequency', elite: 'Multiple/day', high: '1/week-1/month', medium: '1/month-6/months', low: '<1/6 months' },
  { metric: 'Lead Time', elite: '<1 hour', high: '<1 day', medium: '<1 week', low: '>1 month' },
  { metric: 'MTTR', elite: '<1 hour', high: '<1 day', medium: '<1 week', low: '>1 week' },
  { metric: 'Change Failure Rate', elite: '0-5%', high: '5-10%', medium: '10-15%', low: '>15%' },
];
