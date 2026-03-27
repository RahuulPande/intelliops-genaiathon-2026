import { useMemo } from 'react';
import {
  savingsCategories,
  getSavingsByTier,
  platformCosts as basePlatformCosts,
  type SavingsCategory
} from '@/lib/utils/realisticROI';

export interface ROIInputs {
  teamSize: number;           // Total engineering team size (25-300)
  incidentsPerMonth: number;  // Monthly incident count (5-60)
  avgMTTRHours: number;       // Mean time to resolve in hours (1-12)
  monitoringEffortPct: number; // % of team time on monitoring (5-30)
  tier: 'delivery' | 'operations' | 'enterprise';
}

export interface ROICalculationResult {
  // Inputs echo
  inputs: ROIInputs;

  // Savings outputs
  grossSavings: number;
  platformCosts: number;
  netSavings: number;
  roiPercentage: number;
  paybackDays: number;
  threeYearValue: number;

  // Categorized breakdown
  breakdown: {
    operationalSavings: number;   // Incident resolution + downtime prevention
    productivityGains: number;    // Monitoring efficiency + knowledge retention
    strategicValue: number;       // Cost optimization + analytics + cross-layer
  };

  // Per-category detail
  categories: Array<{
    name: string;
    savings: number;
    tier: string;
    confidence: number;
  }>;

  // Productivity metric
  productivityGainPct: number;
}

const DEFAULT_INPUTS: ROIInputs = {
  teamSize: 100,
  incidentsPerMonth: 30,
  avgMTTRHours: 6,
  monitoringEffortPct: 15,
  tier: 'enterprise',
};

/**
 * Calculates ROI based on user inputs and the tier-based savings model.
 *
 * The base savings in realisticROI.ts assume a 100-person team with
 * 30 incidents/month, 6.2h MTTR, and 15% monitoring effort.
 * We scale linearly from those baselines.
 */
export function useROICalculation(inputs: Partial<ROIInputs> = {}): ROICalculationResult {
  const resolved: ROIInputs = { ...DEFAULT_INPUTS, ...inputs };

  return useMemo(() => {
    const { teamSize, incidentsPerMonth, avgMTTRHours, monitoringEffortPct, tier } = resolved;

    // Scaling factors relative to baseline assumptions
    const teamScale = teamSize / 100;
    const incidentScale = incidentsPerMonth / 30;
    const mttrScale = avgMTTRHours / 6;
    const monitoringScale = monitoringEffortPct / 15;

    // Determine which tiers are included
    const includedTiers = tier === 'delivery'
      ? ['delivery']
      : tier === 'operations'
      ? ['delivery', 'operations']
      : ['delivery', 'operations', 'enterprise'];

    // Scale each savings category based on which input it depends on
    const scaledCategories = savingsCategories
      .filter(c => includedTiers.includes(c.tier))
      .map(c => {
        let scale = teamScale; // All scale with team size

        // Apply additional input-specific scaling
        if (c.name === 'Faster Incident Resolution') {
          scale = teamScale * incidentScale * mttrScale;
        } else if (c.name === 'Proactive Downtime Prevention') {
          scale = teamScale * incidentScale;
        } else if (c.name === 'Monitoring Efficiency') {
          scale = teamScale * monitoringScale;
        } else if (c.name === 'Knowledge Retention & Onboarding') {
          scale = teamScale; // Purely team-size driven
        } else if (c.name === 'Deployment Risk Reduction') {
          scale = teamScale * incidentScale;
        }
        // Enterprise categories scale with team size only

        return {
          name: c.name,
          baseSavings: c.annualSavings,
          savings: Math.round(c.annualSavings * scale),
          tier: c.tier,
          confidence: c.confidence,
        };
      });

    const grossSavings = scaledCategories.reduce((sum, c) => sum + c.savings, 0);
    const annualCost = basePlatformCosts[tier].annual;

    const netSavings = grossSavings - annualCost;
    const roiPercentage = annualCost > 0 ? Math.round((netSavings / annualCost) * 100) : 0;
    const dailySavings = grossSavings / 365;
    const paybackDays = dailySavings > 0 ? Math.ceil(annualCost / dailySavings) : 999;
    const threeYearValue = netSavings * 3; // Simplified: consistent annual net

    // Group into breakdown categories
    const operationalSavings = scaledCategories
      .filter(c => ['Faster Incident Resolution', 'Proactive Downtime Prevention', 'Deployment Risk Reduction'].includes(c.name))
      .reduce((sum, c) => sum + c.savings, 0);

    const productivityGains = scaledCategories
      .filter(c => ['Knowledge Retention & Onboarding', 'Monitoring Efficiency'].includes(c.name))
      .reduce((sum, c) => sum + c.savings, 0);

    const strategicValue = scaledCategories
      .filter(c => ['Cost Optimization Insights', 'Strategic Decision Analytics', 'Cross-Layer Correlation Value'].includes(c.name))
      .reduce((sum, c) => sum + c.savings, 0);

    // Productivity gain as a percentage of team cost
    // Rough team cost: teamSize * $400/day blended * 260 days
    const estimatedTeamCost = teamSize * 400 * 260;
    const productivityGainPct = estimatedTeamCost > 0
      ? parseFloat(((grossSavings / estimatedTeamCost) * 100).toFixed(1))
      : 0;

    return {
      inputs: resolved,
      grossSavings,
      platformCosts: annualCost,
      netSavings,
      roiPercentage,
      paybackDays,
      threeYearValue,
      breakdown: {
        operationalSavings,
        productivityGains,
        strategicValue,
      },
      categories: scaledCategories.map(c => ({
        name: c.name,
        savings: c.savings,
        tier: c.tier,
        confidence: c.confidence,
      })),
      productivityGainPct,
    };
  }, [
    resolved.teamSize,
    resolved.incidentsPerMonth,
    resolved.avgMTTRHours,
    resolved.monitoringEffortPct,
    resolved.tier,
  ]);
}

export function formatCurrency(amount: number): string {
  if (amount >= 1000000) {
    return `$${(amount / 1000000).toFixed(2)}M`;
  } else if (amount >= 1000) {
    return `$${(amount / 1000).toFixed(0)}K`;
  } else {
    return `$${amount.toLocaleString()}`;
  }
}
