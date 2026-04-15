import type { DORAMetrics, DORAClassification } from '@/lib/types/doraMetrics';

// ─── Payment Service (high performer, declining trend) ────────────────────────

const paymentService: DORAMetrics = {
  serviceId: 'svc-payment',
  serviceName: 'Payment Service',
  period: 'Last 30 days',

  deploymentFrequency: {
    value: 3.2,
    trend: 'declining',
    rating: 'high',
    history: [
      { week: 'W1',  count: 4.1 },
      { week: 'W2',  count: 4.0 },
      { week: 'W3',  count: 3.8 },
      { week: 'W4',  count: 3.9 },
      { week: 'W5',  count: 3.7 },
      { week: 'W6',  count: 3.6 },
      { week: 'W7',  count: 3.4 },
      { week: 'W8',  count: 3.5 },
      { week: 'W9',  count: 3.2 },
      { week: 'W10', count: 3.1 },
      { week: 'W11', count: 2.9 },
      { week: 'W12', count: 3.2 },
    ],
  },

  leadTimeForChanges: {
    value: 18.5,
    trend: 'declining',
    rating: 'high',
    history: [
      { week: 'W1',  hours: 15.2 },
      { week: 'W2',  hours: 15.8 },
      { week: 'W3',  hours: 16.4 },
      { week: 'W4',  hours: 16.1 },
      { week: 'W5',  hours: 17.0 },
      { week: 'W6',  hours: 17.5 },
      { week: 'W7',  hours: 17.9 },
      { week: 'W8',  hours: 18.2 },
      { week: 'W9',  hours: 18.0 },
      { week: 'W10', hours: 19.1 },
      { week: 'W11', hours: 19.4 },
      { week: 'W12', hours: 18.5 },
    ],
    breakdown: {
      codingTime: 6.0,
      reviewTime: 8.0,
      ciTime: 2.5,
      deployTime: 2.0,
    },
  },

  meanTimeToRecovery: {
    value: 45,
    trend: 'declining',
    rating: 'high',
    history: [
      { week: 'W1',  minutes: 32 },
      { week: 'W2',  minutes: 35 },
      { week: 'W3',  minutes: 38 },
      { week: 'W4',  minutes: 36 },
      { week: 'W5',  minutes: 40 },
      { week: 'W6',  minutes: 41 },
      { week: 'W7',  minutes: 43 },
      { week: 'W8',  minutes: 44 },
      { week: 'W9',  minutes: 42 },
      { week: 'W10', minutes: 47 },
      { week: 'W11', minutes: 50 },
      { week: 'W12', minutes: 45 },
    ],
    recentIncidents: [
      {
        id: 'inc-pay-001',
        title: 'Payment gateway timeout during peak load',
        recoveryMinutes: 52,
        date: '2026-03-28T14:15:00Z',
      },
      {
        id: 'inc-pay-002',
        title: 'Duplicate transaction detection false positives blocking settlements',
        recoveryMinutes: 38,
        date: '2026-03-18T09:42:00Z',
      },
      {
        id: 'inc-pay-003',
        title: 'Currency conversion service degradation causing failed FX transactions',
        recoveryMinutes: 45,
        date: '2026-03-07T22:10:00Z',
      },
    ],
  },

  changeFailureRate: {
    value: 0.082,
    trend: 'declining',
    rating: 'high',
    history: [
      { week: 'W1',  rate: 0.052 },
      { week: 'W2',  rate: 0.058 },
      { week: 'W3',  rate: 0.061 },
      { week: 'W4',  rate: 0.060 },
      { week: 'W5',  rate: 0.065 },
      { week: 'W6',  rate: 0.068 },
      { week: 'W7',  rate: 0.072 },
      { week: 'W8',  rate: 0.075 },
      { week: 'W9',  rate: 0.078 },
      { week: 'W10', rate: 0.080 },
      { week: 'W11', rate: 0.085 },
      { week: 'W12', rate: 0.082 },
    ],
    totalDeploys: 128,
    failedDeploys: 11,
  },

  overallRating: 'high',
};

// ─── Portfolio Engine (elite performer, improving trend) ──────────────────────

const portfolioEngine: DORAMetrics = {
  serviceId: 'svc-portfolio',
  serviceName: 'Portfolio Engine',
  period: 'Last 30 days',

  deploymentFrequency: {
    value: 8.1,
    trend: 'improving',
    rating: 'elite',
    history: [
      { week: 'W1',  count: 6.2 },
      { week: 'W2',  count: 6.5 },
      { week: 'W3',  count: 6.8 },
      { week: 'W4',  count: 7.0 },
      { week: 'W5',  count: 7.1 },
      { week: 'W6',  count: 7.3 },
      { week: 'W7',  count: 7.5 },
      { week: 'W8',  count: 7.8 },
      { week: 'W9',  count: 7.9 },
      { week: 'W10', count: 8.0 },
      { week: 'W11', count: 8.2 },
      { week: 'W12', count: 8.1 },
    ],
  },

  leadTimeForChanges: {
    value: 3.8,
    trend: 'improving',
    rating: 'elite',
    history: [
      { week: 'W1',  hours: 5.2 },
      { week: 'W2',  hours: 5.0 },
      { week: 'W3',  hours: 4.8 },
      { week: 'W4',  hours: 4.6 },
      { week: 'W5',  hours: 4.5 },
      { week: 'W6',  hours: 4.3 },
      { week: 'W7',  hours: 4.1 },
      { week: 'W8',  hours: 4.0 },
      { week: 'W9',  hours: 3.9 },
      { week: 'W10', hours: 3.8 },
      { week: 'W11', hours: 3.7 },
      { week: 'W12', hours: 3.8 },
    ],
    breakdown: {
      codingTime: 1.5,
      reviewTime: 1.0,
      ciTime: 0.8,
      deployTime: 0.5,
    },
  },

  meanTimeToRecovery: {
    value: 28,
    trend: 'improving',
    rating: 'high',
    history: [
      { week: 'W1',  minutes: 38 },
      { week: 'W2',  minutes: 36 },
      { week: 'W3',  minutes: 35 },
      { week: 'W4',  minutes: 34 },
      { week: 'W5',  minutes: 33 },
      { week: 'W6',  minutes: 32 },
      { week: 'W7',  minutes: 31 },
      { week: 'W8',  minutes: 30 },
      { week: 'W9',  minutes: 29 },
      { week: 'W10', minutes: 27 },
      { week: 'W11', minutes: 26 },
      { week: 'W12', minutes: 28 },
    ],
    recentIncidents: [
      {
        id: 'inc-port-001',
        title: 'Portfolio rebalancing calculation error on multi-currency accounts',
        recoveryMinutes: 28,
        date: '2026-03-25T11:30:00Z',
      },
      {
        id: 'inc-port-002',
        title: 'Risk analytics aggregation timeout during end-of-day processing',
        recoveryMinutes: 22,
        date: '2026-03-12T17:05:00Z',
      },
    ],
  },

  changeFailureRate: {
    value: 0.031,
    trend: 'improving',
    rating: 'elite',
    history: [
      { week: 'W1',  rate: 0.048 },
      { week: 'W2',  rate: 0.045 },
      { week: 'W3',  rate: 0.044 },
      { week: 'W4',  rate: 0.042 },
      { week: 'W5',  rate: 0.040 },
      { week: 'W6',  rate: 0.038 },
      { week: 'W7',  rate: 0.036 },
      { week: 'W8',  rate: 0.035 },
      { week: 'W9',  rate: 0.033 },
      { week: 'W10', rate: 0.031 },
      { week: 'W11', rate: 0.029 },
      { week: 'W12', rate: 0.031 },
    ],
    totalDeploys: 324,
    failedDeploys: 10,
  },

  overallRating: 'elite',
};

// ─── KYC Service (medium performer, stable trend) ─────────────────────────────

const kycService: DORAMetrics = {
  serviceId: 'svc-kyc',
  serviceName: 'KYC Service',
  period: 'Last 30 days',

  deploymentFrequency: {
    value: 0.8,
    trend: 'stable',
    rating: 'medium',
    history: [
      { week: 'W1',  count: 0.9 },
      { week: 'W2',  count: 0.8 },
      { week: 'W3',  count: 1.0 },
      { week: 'W4',  count: 0.8 },
      { week: 'W5',  count: 0.7 },
      { week: 'W6',  count: 0.9 },
      { week: 'W7',  count: 0.8 },
      { week: 'W8',  count: 0.7 },
      { week: 'W9',  count: 0.9 },
      { week: 'W10', count: 0.8 },
      { week: 'W11', count: 0.7 },
      { week: 'W12', count: 0.8 },
    ],
  },

  leadTimeForChanges: {
    value: 72,
    trend: 'stable',
    rating: 'medium',
    history: [
      { week: 'W1',  hours: 68 },
      { week: 'W2',  hours: 70 },
      { week: 'W3',  hours: 74 },
      { week: 'W4',  hours: 71 },
      { week: 'W5',  hours: 73 },
      { week: 'W6',  hours: 70 },
      { week: 'W7',  hours: 75 },
      { week: 'W8',  hours: 72 },
      { week: 'W9',  hours: 69 },
      { week: 'W10', hours: 74 },
      { week: 'W11', hours: 71 },
      { week: 'W12', hours: 72 },
    ],
    breakdown: {
      codingTime: 24.0,
      reviewTime: 30.0,
      ciTime: 8.0,
      deployTime: 10.0,
    },
  },

  meanTimeToRecovery: {
    value: 180,
    trend: 'stable',
    rating: 'medium',
    history: [
      { week: 'W1',  minutes: 175 },
      { week: 'W2',  minutes: 185 },
      { week: 'W3',  minutes: 178 },
      { week: 'W4',  minutes: 182 },
      { week: 'W5',  minutes: 176 },
      { week: 'W6',  minutes: 184 },
      { week: 'W7',  minutes: 179 },
      { week: 'W8',  minutes: 183 },
      { week: 'W9',  minutes: 177 },
      { week: 'W10', minutes: 181 },
      { week: 'W11', minutes: 186 },
      { week: 'W12', minutes: 180 },
    ],
    recentIncidents: [
      {
        id: 'inc-kyc-001',
        title: 'Identity verification provider outage blocking customer onboarding',
        recoveryMinutes: 195,
        date: '2026-03-30T08:20:00Z',
      },
      {
        id: 'inc-kyc-002',
        title: 'Document OCR pipeline failure causing AML screening backlog',
        recoveryMinutes: 162,
        date: '2026-03-20T13:45:00Z',
      },
      {
        id: 'inc-kyc-003',
        title: 'Sanctions list sync failure resulting in stale screening results',
        recoveryMinutes: 210,
        date: '2026-03-08T05:30:00Z',
      },
    ],
  },

  changeFailureRate: {
    value: 0.145,
    trend: 'stable',
    rating: 'medium',
    history: [
      { week: 'W1',  rate: 0.140 },
      { week: 'W2',  rate: 0.148 },
      { week: 'W3',  rate: 0.143 },
      { week: 'W4',  rate: 0.150 },
      { week: 'W5',  rate: 0.142 },
      { week: 'W6',  rate: 0.147 },
      { week: 'W7',  rate: 0.144 },
      { week: 'W8',  rate: 0.149 },
      { week: 'W9',  rate: 0.141 },
      { week: 'W10', rate: 0.146 },
      { week: 'W11', rate: 0.148 },
      { week: 'W12', rate: 0.145 },
    ],
    totalDeploys: 32,
    failedDeploys: 5,
  },

  overallRating: 'medium',
};

// ─── Exported dataset ──────────────────────────────────────────────────────────

export const doraMetricsData: DORAMetrics[] = [
  paymentService,
  portfolioEngine,
  kycService,
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

export function getDORAByServiceId(serviceId: string): DORAMetrics | undefined {
  return doraMetricsData.find(m => m.serviceId === serviceId);
}

// Returns the modal (most-common) classification from an array
function mostCommonRating(ratings: DORAClassification[]): DORAClassification {
  const counts: Record<DORAClassification, number> = {
    elite: 0, high: 0, medium: 0, low: 0,
  };
  for (const r of ratings) counts[r]++;
  return (Object.entries(counts) as [DORAClassification, number][])
    .reduce((a, b) => (b[1] > a[1] ? b : a))[0];
}

// Averages a numeric array
function avg(nums: number[]): number {
  return nums.reduce((s, n) => s + n, 0) / nums.length;
}

export function getAggregateDORA(): DORAMetrics {
  const all = doraMetricsData;
  const weeks = ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8', 'W9', 'W10', 'W11', 'W12'];

  return {
    serviceId: 'aggregate',
    serviceName: 'All Services',
    period: 'Last 30 days',

    deploymentFrequency: {
      value: parseFloat(avg(all.map(s => s.deploymentFrequency.value)).toFixed(2)),
      trend: 'stable',
      rating: mostCommonRating(all.map(s => s.deploymentFrequency.rating)),
      history: weeks.map(w => ({
        week: w,
        count: parseFloat(
          avg(all.map(s => s.deploymentFrequency.history.find(h => h.week === w)!.count)).toFixed(2)
        ),
      })),
    },

    leadTimeForChanges: {
      value: parseFloat(avg(all.map(s => s.leadTimeForChanges.value)).toFixed(1)),
      trend: 'stable',
      rating: mostCommonRating(all.map(s => s.leadTimeForChanges.rating)),
      history: weeks.map(w => ({
        week: w,
        hours: parseFloat(
          avg(all.map(s => s.leadTimeForChanges.history.find(h => h.week === w)!.hours)).toFixed(1)
        ),
      })),
      breakdown: {
        codingTime: parseFloat(avg(all.map(s => s.leadTimeForChanges.breakdown.codingTime)).toFixed(1)),
        reviewTime: parseFloat(avg(all.map(s => s.leadTimeForChanges.breakdown.reviewTime)).toFixed(1)),
        ciTime:     parseFloat(avg(all.map(s => s.leadTimeForChanges.breakdown.ciTime)).toFixed(1)),
        deployTime: parseFloat(avg(all.map(s => s.leadTimeForChanges.breakdown.deployTime)).toFixed(1)),
      },
    },

    meanTimeToRecovery: {
      value: Math.round(avg(all.map(s => s.meanTimeToRecovery.value))),
      trend: 'stable',
      rating: mostCommonRating(all.map(s => s.meanTimeToRecovery.rating)),
      history: weeks.map(w => ({
        week: w,
        minutes: Math.round(
          avg(all.map(s => s.meanTimeToRecovery.history.find(h => h.week === w)!.minutes))
        ),
      })),
      recentIncidents: all.flatMap(s => s.meanTimeToRecovery.recentIncidents),
    },

    changeFailureRate: {
      value: parseFloat(avg(all.map(s => s.changeFailureRate.value)).toFixed(3)),
      trend: 'stable',
      rating: mostCommonRating(all.map(s => s.changeFailureRate.rating)),
      history: weeks.map(w => ({
        week: w,
        rate: parseFloat(
          avg(all.map(s => s.changeFailureRate.history.find(h => h.week === w)!.rate)).toFixed(3)
        ),
      })),
      totalDeploys:  all.reduce((s, m) => s + m.changeFailureRate.totalDeploys, 0),
      failedDeploys: all.reduce((s, m) => s + m.changeFailureRate.failedDeploys, 0),
    },

    overallRating: mostCommonRating(all.map(s => s.overallRating)),
  };
}
