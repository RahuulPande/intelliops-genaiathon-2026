'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useROICalculation, formatCurrency } from '@/lib/hooks/useROICalculation';
import { 
  Calculator, 
  DollarSign, 
  Users,
  TrendingUp,
  Download,
  Share2,
  Info,
  MapPin,
  Target,
  CheckCircle,
  Award
} from 'lucide-react';

export default function InteractiveROICalculator() {
  const [teamSize, setTeamSize] = useState(100);
  const [zurichTeam, setZurichTeam] = useState(30);

  // Use shared calculation hook for consistency
  const calculations = useROICalculation({ teamSize, tier: 'enterprise' });

  const exportCalculation = () => {
    const data = {
      teamSize,
      zurichTeam,
      puneTeam: teamSize - zurichTeam,
      calculations,
      timestamp: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `intelliops-ai-roi-calculation-${teamSize}-team.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const shareCalculation = async () => {
    const shareData = {
      title: 'IntelliOps AI ROI Calculator Results',
      text: `ROI Analysis: ${teamSize}-person team shows ${formatCurrency(calculations.netSavings)} annual savings with ${calculations.roiPercentage}% ROI`,
      url: window.location.href
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        // Fallback to clipboard
        await navigator.clipboard.writeText(`${shareData.text} - ${shareData.url}`);
        alert('ROI analysis copied to clipboard!');
      }
    } else {
      await navigator.clipboard.writeText(`${shareData.text} - ${shareData.url}`);
      alert('ROI analysis copied to clipboard!');
    }
  };

  return (
    <div className="py-20 bg-gradient-to-br from-gray-50 to-blue-50" id="roi-calculator">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Calculator className="w-8 h-8 text-blue-600" />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Interactive ROI Calculator</h2>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-4">
            Configure your team size and see real-time savings calculations based on 
            industry benchmarks from Gartner, Forrester, and McKinsey.
          </p>
          <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center space-x-1">
              <Award className="w-4 h-4 text-yellow-600" />
              <span>Industry Validated</span>
            </div>
            <div className="flex items-center space-x-1">
              <Target className="w-4 h-4 text-green-600" />
              <span>Conservative Estimates</span>
            </div>
            <div className="flex items-center space-x-1">
              <CheckCircle className="w-4 h-4 text-blue-600" />
              <span>Real-time Calculations</span>
            </div>
          </div>
        </motion.div>

        {/* Calculator Inputs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 mb-8"
        >
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
            <Users className="w-6 h-6 text-blue-600" />
            <span>Team Configuration</span>
          </h3>

          <div className="space-y-6">
            {/* Total Team Size */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Total Team Size
              </label>
              
              <div className="relative mb-6">
                <div className="w-full h-3 bg-gray-200 rounded-lg relative">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg transition-all duration-200"
                    style={{ width: `${((teamSize - 20) / 480) * 100}%` }}
                  />
                  <input
                    type="range"
                    min="20"
                    max="500"
                    step="10"
                    value={teamSize}
                    onChange={(e) => setTeamSize(Number(e.target.value))}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div 
                    className="absolute top-1/2 w-6 h-6 bg-blue-600 border-3 border-white rounded-full transform -translate-y-1/2 -translate-x-1/2 cursor-pointer shadow-lg hover:scale-110 transition-transform"
                    style={{ left: `${((teamSize - 20) / 480) * 100}%` }}
                  />
                </div>
                
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>20 people</span>
                  <span>250 people</span>
                  <span>500 people</span>
                </div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 mb-2">{teamSize} people</div>
                <div className="flex justify-center space-x-6 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span className="text-gray-600">Zurich: {zurichTeam} people</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-gray-600">Pune: {teamSize - zurichTeam} people</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Location Split */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-red-600" />
                  <span>High-Cost Location (Zurich)</span>
                </label>
                
                <div className="relative mb-4">
                  <div className="w-full h-3 bg-gray-200 rounded-lg relative">
                    <div 
                      className="h-full bg-gradient-to-r from-red-400 to-red-600 rounded-lg transition-all duration-200"
                      style={{ width: `${(zurichTeam / teamSize) * 100}%` }}
                    />
                    <input
                      type="range"
                      min="0"
                      max={teamSize}
                      step="1"
                      value={zurichTeam}
                      onChange={(e) => setZurichTeam(Math.min(Number(e.target.value), teamSize))}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div 
                      className="absolute top-1/2 w-5 h-5 bg-red-600 border-2 border-white rounded-full transform -translate-y-1/2 -translate-x-1/2 cursor-pointer shadow-md hover:scale-110 transition-transform"
                      style={{ left: `${(zurichTeam / teamSize) * 100}%` }}
                    />
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="text-lg font-bold text-red-600 mb-1">{zurichTeam} people</div>
                  <div className="text-sm text-gray-600">
                    @ $800/day blended rate
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-green-600" />
                  <span>Lower-Cost Location (Pune)</span>
                </label>
                
                <div className="relative mb-4">
                  <div className="w-full h-3 bg-gray-200 rounded-lg relative">
                    <div 
                      className="h-full bg-gradient-to-r from-green-400 to-green-600 rounded-lg transition-all duration-200"
                      style={{ width: `${((teamSize - zurichTeam) / teamSize) * 100}%` }}
                    />
                    <div 
                      className="absolute top-1/2 w-5 h-5 bg-green-600 border-2 border-white rounded-full transform -translate-y-1/2 -translate-x-1/2 shadow-md"
                      style={{ left: `${((teamSize - zurichTeam) / teamSize) * 100}%` }}
                    />
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="text-lg font-bold text-green-600 mb-1">{teamSize - zurichTeam} people</div>
                  <div className="text-sm text-gray-600">
                    @ $300/day blended rate
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Calculator Results */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Team Investment */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-gray-600 to-gray-700 text-white rounded-2xl p-6"
          >
            <h4 className="font-semibold mb-2">Team Configuration</h4>
            <div className="text-3xl font-bold mb-4">{teamSize} Engineers</div>
            <div className="space-y-1 text-sm text-gray-200">
              <div>Blended rate: ~$400/day</div>
              <div>Enterprise license tier</div>
              <div>Industry-standard assumptions</div>
            </div>
          </motion.div>

          {/* Gross Savings */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-green-600 to-green-700 text-white rounded-2xl p-6"
          >
            <h4 className="font-semibold mb-2">Platform Gross Savings</h4>
            <div className="text-3xl font-bold mb-4">{formatCurrency(calculations.grossSavings)}</div>
            <div className="space-y-1 text-sm text-green-200">
              <div>Operational: {formatCurrency(calculations.breakdown.operationalSavings)}</div>
              <div>Productivity: {formatCurrency(calculations.breakdown.productivityGains)}</div>
              <div>Strategic: {formatCurrency(calculations.breakdown.strategicValue)}</div>
            </div>
          </motion.div>

          {/* Platform Investment */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-2xl p-6"
          >
            <h4 className="font-semibold mb-2">Platform Investment</h4>
            <div className="text-3xl font-bold mb-4">{formatCurrency(calculations.platformCosts)}</div>
            <div className="space-y-1 text-sm text-blue-200">
              <div>License: {formatCurrency(calculations.platformCosts)}/year</div>
              <div>No hidden infrastructure fees</div>
              <div>All-inclusive platform cost</div>
            </div>
          </motion.div>

          {/* Net Value */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-purple-600 to-indigo-700 text-white rounded-2xl p-6 ring-4 ring-yellow-400 relative"
          >
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <div className="bg-yellow-400 text-black px-3 py-1 rounded-full text-xs font-bold">
                NET VALUE
              </div>
            </div>
            <h4 className="font-semibold mb-2">Net Annual Value</h4>
            <div className="text-3xl font-bold mb-4">{formatCurrency(calculations.netSavings)}</div>
            <div className="space-y-1 text-sm text-purple-200">
              <div>ROI: {calculations.roiPercentage.toLocaleString()}%</div>
              <div>Payback: {calculations.paybackDays} days</div>
              <div>3-year: {formatCurrency(calculations.threeYearValue)}</div>
            </div>
          </motion.div>
        </div>

        {/* Calculator Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          viewport={{ once: true }}
          className="text-center space-y-4"
        >
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={exportCalculation}
              className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
            >
              <Download className="w-5 h-5" />
              <span>📊 Export ROI Analysis</span>
            </button>
            
            <button
              onClick={shareCalculation}
              className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition-colors"
            >
              <Share2 className="w-5 h-5" />
              <span>🔗 Share Results</span>
            </button>
          </div>

          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200 max-w-2xl mx-auto">
            <div className="flex items-start space-x-3">
              <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-blue-800">
                <strong>Methodology:</strong> Calculations based on Gartner incident costs ($5,600/minute), 
                Forrester efficiency studies (25% improvement), and McKinsey automation reports. 
                Conservative estimates with full platform cost transparency.
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}