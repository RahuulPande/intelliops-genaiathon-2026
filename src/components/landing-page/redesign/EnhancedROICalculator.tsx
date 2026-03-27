'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Calculator,
  Download,
  Share2,
  TrendingUp,
  DollarSign,
  Clock,
  BarChart3,
  CheckCircle,
  Zap,
  Layers,
  Crown,
  AlertTriangle,
  Activity,
  Users,
  Timer,
  Monitor
} from 'lucide-react';
import { useROICalculation, formatCurrency } from '@/lib/hooks/useROICalculation';
import { conservativeAssumptions } from '@/lib/utils/realisticROI';

export default function EnhancedROICalculator() {
  const [teamSize, setTeamSize] = useState(100);
  const [incidentsPerMonth, setIncidentsPerMonth] = useState(30);
  const [avgMTTRHours, setAvgMTTRHours] = useState(6);
  const [monitoringEffortPct, setMonitoringEffortPct] = useState(15);
  const [tier, setTier] = useState<'delivery' | 'operations' | 'enterprise'>('enterprise');

  const roiData = useROICalculation({
    teamSize,
    incidentsPerMonth,
    avgMTTRHours,
    monitoringEffortPct,
    tier,
  });

  const tierOptions = [
    { id: 'delivery' as const, name: 'Delivery', badge: 'L1', price: '$2,500/mo', color: 'purple', gradient: 'from-purple-500 to-indigo-600', icon: Zap },
    { id: 'operations' as const, name: 'Operations', badge: 'L1+L2', price: '$4,000/mo', color: 'blue', gradient: 'from-blue-500 to-cyan-600', icon: Layers },
    { id: 'enterprise' as const, name: 'Enterprise', badge: 'All', price: '$5,000/mo', color: 'orange', gradient: 'from-orange-500 to-red-600', icon: Crown },
  ];

  const exportAnalysis = () => {
    const analysisData = {
      inputs: {
        teamSize,
        incidentsPerMonth,
        avgMTTRHours,
        monitoringEffortPct,
        tier,
      },
      results: {
        grossSavings: formatCurrency(roiData.grossSavings),
        platformCosts: formatCurrency(roiData.platformCosts),
        netSavings: formatCurrency(roiData.netSavings),
        roi: `${roiData.roiPercentage}%`,
        paybackPeriod: `${roiData.paybackDays} days`,
        threeYearValue: formatCurrency(roiData.threeYearValue),
        productivityGain: `${roiData.productivityGainPct}%`,
      },
      breakdown: {
        operationalSavings: formatCurrency(roiData.breakdown.operationalSavings),
        productivityGains: formatCurrency(roiData.breakdown.productivityGains),
        strategicValue: formatCurrency(roiData.breakdown.strategicValue),
      },
      generatedOn: new Date().toISOString(),
      platform: 'IntelliOps AI'
    };

    const blob = new Blob([JSON.stringify(analysisData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `intelliops-roi-${tier}-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const sliderStyle = (value: number, min: number, max: number, color: string) => ({
    background: `linear-gradient(to right, ${color} 0%, ${color} ${((value - min) / (max - min)) * 100}%, #d1d5db ${((value - min) / (max - min)) * 100}%, #d1d5db 100%)`
  });

  return (
    <section id="roi-calculator" className="py-20 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
      <style dangerouslySetInnerHTML={{
        __html: `
          .slider-custom::-webkit-slider-thumb {
            appearance: none; height: 20px; width: 20px; border-radius: 50%;
            background: #3b82f6; border: 2px solid #fff; box-shadow: 0 2px 4px rgba(0,0,0,0.2); cursor: pointer;
          }
          .slider-custom::-moz-range-thumb {
            appearance: none; height: 20px; width: 20px; border-radius: 50%;
            background: #3b82f6; border: none; box-shadow: 0 2px 4px rgba(0,0,0,0.2); cursor: pointer;
          }
        `
      }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Interactive ROI Calculator
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-4xl mx-auto">
            Configure your operational parameters and license tier to see estimated savings
            based on conservative industry benchmarks.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Left Side: Inputs */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-100 dark:border-gray-700"
            >
              <div className="flex items-center space-x-3 mb-6">
                <Calculator className="w-6 h-6 text-blue-600" />
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Your Parameters</h3>
              </div>

              {/* Tier Selector */}
              <div className="mb-8">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3">License Tier</h4>
                <div className="grid grid-cols-3 gap-2">
                  {tierOptions.map((option) => {
                    const Icon = option.icon;
                    const isActive = tier === option.id;
                    return (
                      <motion.button
                        key={option.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setTier(option.id)}
                        className={`text-center p-3 rounded-lg border-2 transition-all ${
                          isActive
                            ? `border-${option.color}-500 bg-gradient-to-r ${option.gradient} text-white shadow-md`
                            : 'border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:border-gray-300'
                        }`}
                      >
                        <Icon className="w-5 h-5 mx-auto mb-1" />
                        <div className="text-xs font-semibold">{option.name}</div>
                        <div className="text-[10px] opacity-80">{option.price}</div>
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* Input Sliders */}
              <div className="space-y-6">
                {/* Team Size */}
                <div>
                  <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <Users className="w-4 h-4" />
                    <span>Team Size: <strong>{teamSize}</strong> engineers</span>
                  </label>
                  <input
                    type="range" min="25" max="300" step="25" value={teamSize}
                    onChange={(e) => setTeamSize(Number(e.target.value))}
                    className="w-full h-3 rounded-lg appearance-none cursor-pointer slider-custom"
                    style={sliderStyle(teamSize, 25, 300, '#3b82f6')}
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>25</span><span>150</span><span>300</span>
                  </div>
                </div>

                {/* Incidents per Month */}
                <div>
                  <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <AlertTriangle className="w-4 h-4" />
                    <span>Incidents/Month: <strong>{incidentsPerMonth}</strong></span>
                  </label>
                  <input
                    type="range" min="5" max="60" step="5" value={incidentsPerMonth}
                    onChange={(e) => setIncidentsPerMonth(Number(e.target.value))}
                    className="w-full h-3 rounded-lg appearance-none cursor-pointer slider-custom"
                    style={sliderStyle(incidentsPerMonth, 5, 60, '#3b82f6')}
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>5</span><span>30</span><span>60</span>
                  </div>
                </div>

                {/* MTTR */}
                <div>
                  <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <Timer className="w-4 h-4" />
                    <span>Avg MTTR: <strong>{avgMTTRHours}h</strong></span>
                  </label>
                  <input
                    type="range" min="1" max="12" step="0.5" value={avgMTTRHours}
                    onChange={(e) => setAvgMTTRHours(Number(e.target.value))}
                    className="w-full h-3 rounded-lg appearance-none cursor-pointer slider-custom"
                    style={sliderStyle(avgMTTRHours, 1, 12, '#3b82f6')}
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>1h</span><span>6h</span><span>12h</span>
                  </div>
                </div>

                {/* Monitoring Effort */}
                <div>
                  <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <Monitor className="w-4 h-4" />
                    <span>Monitoring Effort: <strong>{monitoringEffortPct}%</strong> of team time</span>
                  </label>
                  <input
                    type="range" min="5" max="30" step="1" value={monitoringEffortPct}
                    onChange={(e) => setMonitoringEffortPct(Number(e.target.value))}
                    className="w-full h-3 rounded-lg appearance-none cursor-pointer slider-custom"
                    style={sliderStyle(monitoringEffortPct, 5, 30, '#3b82f6')}
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>5%</span><span>15%</span><span>30%</span>
                  </div>
                </div>
              </div>

              {/* Export */}
              <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-600">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={exportAnalysis}
                  className="w-full flex items-center justify-center space-x-2 bg-blue-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>Export Analysis</span>
                </motion.button>
              </div>
            </motion.div>
          </div>

          {/* Right Side: Results */}
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700"
            >
              {/* Results Header */}
              <div className={`bg-gradient-to-r ${
                tier === 'delivery' ? 'from-purple-600 to-indigo-600' :
                tier === 'operations' ? 'from-blue-600 to-cyan-600' :
                'from-orange-500 to-red-600'
              } p-6 text-white`}>
                <h3 className="text-2xl font-bold mb-1">
                  {tier === 'delivery' ? 'Delivery' : tier === 'operations' ? 'Operations' : 'Enterprise'} ROI Analysis
                </h3>
                <p className="text-white/80 text-sm">
                  {teamSize}-person team &bull; {incidentsPerMonth} incidents/mo &bull; {avgMTTRHours}h MTTR &bull; {monitoringEffortPct}% monitoring
                </p>
              </div>

              <div className="p-6">
                {/* Key Metrics Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800">
                    <DollarSign className="w-6 h-6 text-green-600 mx-auto mb-1" />
                    <div className="text-2xl font-bold text-green-600">{formatCurrency(roiData.netSavings)}</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Net Annual Savings</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
                    <TrendingUp className="w-6 h-6 text-blue-600 mx-auto mb-1" />
                    <div className="text-2xl font-bold text-blue-600">{roiData.roiPercentage}%</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">ROI</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl border border-purple-200 dark:border-purple-800">
                    <Clock className="w-6 h-6 text-purple-600 mx-auto mb-1" />
                    <div className="text-2xl font-bold text-purple-600">{roiData.paybackDays} Days</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Payback Period</div>
                  </div>
                  <div className="text-center p-4 bg-orange-50 dark:bg-orange-900/20 rounded-xl border border-orange-200 dark:border-orange-800">
                    <Activity className="w-6 h-6 text-orange-600 mx-auto mb-1" />
                    <div className="text-2xl font-bold text-orange-600">{roiData.productivityGainPct}%</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Productivity Gain</div>
                  </div>
                </div>

                {/* Savings Breakdown by Category */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Savings Breakdown</h4>

                  {/* Summary Row */}
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 dark:text-gray-300">Operational Savings</span>
                        <span className="font-semibold text-gray-900 dark:text-white">{formatCurrency(roiData.breakdown.operationalSavings)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 dark:text-gray-300">Productivity Gains</span>
                        <span className="font-semibold text-gray-900 dark:text-white">{formatCurrency(roiData.breakdown.productivityGains)}</span>
                      </div>
                      {tier === 'enterprise' && (
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600 dark:text-gray-300">Strategic Value</span>
                          <span className="font-semibold text-gray-900 dark:text-white">{formatCurrency(roiData.breakdown.strategicValue)}</span>
                        </div>
                      )}
                      <div className="border-t border-gray-300 dark:border-gray-600 pt-3">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600 dark:text-gray-300">Gross Savings</span>
                          <span className="font-semibold text-green-600">{formatCurrency(roiData.grossSavings)}</span>
                        </div>
                        <div className="flex justify-between items-center mt-1">
                          <span className="text-gray-600 dark:text-gray-300">Platform License Cost</span>
                          <span className="font-semibold text-red-500">-{formatCurrency(roiData.platformCosts)}</span>
                        </div>
                      </div>
                      <div className="border-t border-gray-300 dark:border-gray-600 pt-3">
                        <div className="flex justify-between items-center">
                          <span className="font-semibold text-gray-900 dark:text-white">Net Annual Savings</span>
                          <span className="font-bold text-green-600 text-lg">{formatCurrency(roiData.netSavings)}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Detailed Category List */}
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                    <h5 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Detailed Categories</h5>
                    <div className="space-y-2 text-sm">
                      {roiData.categories.map((cat) => (
                        <div key={cat.name} className="flex justify-between items-center">
                          <div className="flex items-center space-x-2">
                            <span className={`inline-block w-2 h-2 rounded-full ${
                              cat.tier === 'delivery' ? 'bg-purple-500' :
                              cat.tier === 'operations' ? 'bg-blue-500' :
                              'bg-orange-500'
                            }`} />
                            <span className="text-gray-600 dark:text-gray-300">{cat.name}</span>
                          </div>
                          <span className="text-gray-900 dark:text-white font-medium">{formatCurrency(cat.savings)}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 3-Year Value */}
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg p-4 border border-green-200 dark:border-green-800">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <BarChart3 className="w-5 h-5 text-green-600" />
                        <span className="font-semibold text-green-900 dark:text-green-300">3-Year Cumulative Value</span>
                      </div>
                      <span className="text-2xl font-bold text-green-600">{formatCurrency(roiData.threeYearValue)}</span>
                    </div>
                  </div>

                  {/* Methodology Note */}
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                      <div>
                        <div className="font-medium text-blue-900 dark:text-blue-300 mb-1">Industry-Benchmarked Methodology</div>
                        <div className="text-blue-700 dark:text-blue-400 text-sm">
                          All estimates use conservative, lower-bound assumptions based on Gartner, Forrester,
                          and McKinsey research. Actual results may vary based on implementation maturity.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Assumptions Footer */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12"
        >
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Conservative Assumptions for Transparency</h4>
            <div className="grid md:grid-cols-2 gap-3 text-sm text-gray-600 dark:text-gray-400">
              {conservativeAssumptions.map((assumption, i) => (
                <div key={i}>• {assumption}</div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
