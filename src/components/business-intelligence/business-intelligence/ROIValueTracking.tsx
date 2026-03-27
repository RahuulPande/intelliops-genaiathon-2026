'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Target, 
  TrendingUp, 
  DollarSign, 
  Clock, 
  Users,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  Award,
  CheckCircle
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, AreaChart, Area } from 'recharts';

export default function ROIValueTracking() {
  const [selectedTimeframe, setSelectedTimeframe] = useState('12months');
  const [selectedMetric, setSelectedMetric] = useState('all');

  // Mock ROI data
  const roiTrendData = [
    { month: 'Jan', roi: 245, investment: 125000, returns: 306250, cumulative: 306250 },
    { month: 'Feb', roi: 298, investment: 130000, returns: 387400, cumulative: 693650 },
    { month: 'Mar', roi: 312, investment: 135000, returns: 421200, cumulative: 1114850 },
    { month: 'Apr', roi: 356, investment: 128000, returns: 455680, cumulative: 1570530 },
    { month: 'May', roi: 389, investment: 142000, returns: 552380, cumulative: 2122910 },
    { month: 'Jun', roi: 423, investment: 138000, returns: 583740, cumulative: 2706650 },
  ];

  const valueMetrics = [
    {
      title: 'Total ROI',
      value: '2,122%',
      change: '+156%',
      trend: 'up',
      description: 'Overall return on investment',
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      title: 'Cost Savings',
      value: '$2.7M',
      change: '+$445K',
      trend: 'up',
      description: 'Accumulated cost savings',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      title: 'Efficiency Gains',
      value: '87%',
      change: '+12%',
      trend: 'up',
      description: 'Operational efficiency improvement',
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      title: 'Time Savings',
      value: '15,450',
      change: '+2,340',
      trend: 'up',
      description: 'Hours saved annually',
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    }
  ];

  const investmentBreakdown = [
    { category: 'Implementation', amount: 285000, percentage: 42.3, color: '#3B82F6' },
    { category: 'Training', amount: 125000, percentage: 18.5, color: '#10B981' },
    { category: 'Infrastructure', amount: 165000, percentage: 24.4, color: '#F59E0B' },
    { category: 'Maintenance', amount: 99000, percentage: 14.8, color: '#EF4444' }
  ];

  const impactAreas = [
    {
      area: 'Incident Response',
      beforeValue: '6.5 hours',
      afterValue: '1.2 hours',
      improvement: '82%',
      annualSavings: '$840K',
      description: 'Average incident resolution time'
    },
    {
      area: 'System Downtime',
      beforeValue: '2.3%',
      afterValue: '0.03%',
      improvement: '99%',
      annualSavings: '$1.2M',
      description: 'Unplanned system downtime'
    },
    {
      area: 'Manual Monitoring',
      beforeValue: '40 hours/week',
      afterValue: '8 hours/week',
      improvement: '80%',
      annualSavings: '$520K',
      description: 'Manual monitoring effort'
    },
    {
      area: 'False Alerts',
      beforeValue: '45/day',
      afterValue: '3/day',
      improvement: '93%',
      annualSavings: '$180K',
      description: 'False positive alerts'
    }
  ];

  const milestones = [
    {
      date: '2024-01-15',
      title: 'Platform Implementation',
      description: 'Core monitoring platform deployed',
      status: 'completed',
      impact: 'Foundation for all future improvements'
    },
    {
      date: '2024-02-28',
      title: 'AI Integration',
      description: 'Machine learning models activated',
      status: 'completed',
      impact: '40% reduction in false positives'
    },
    {
      date: '2024-04-10',
      title: 'Automation Rollout',
      description: 'Automated response systems enabled',
      status: 'completed',
      impact: '65% faster incident response'
    },
    {
      date: '2024-05-20',
      title: 'Advanced Analytics',
      description: 'Predictive analytics capabilities launched',
      status: 'completed',
      impact: '24-hour advance warning system'
    },
    {
      date: '2024-07-15',
      title: 'Full Optimization',
      description: 'Complete system optimization achieved',
      status: 'in-progress',
      impact: 'Target: 90% efficiency improvement'
    }
  ];

  const businessValue = [
    { metric: 'Customer Satisfaction', before: 3.2, after: 4.8, unit: '/5' },
    { metric: 'SLA Compliance', before: 92.5, after: 99.97, unit: '%' },
    { metric: 'Team Productivity', before: 65, after: 87, unit: '%' },
    { metric: 'Mean Time to Resolution', before: 390, after: 72, unit: 'min' }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header with Key ROI Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {valueMetrics.map((metric, index) => (
          <motion.div
            key={metric.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="bg-white rounded-lg border border-gray-200 p-4"
          >
            <div className="flex items-center justify-between">
              <div className={`p-2 ${metric.bgColor} rounded-lg`}>
                <Target className={`w-5 h-5 ${metric.color}`} />
              </div>
              <div className="flex items-center space-x-1">
                {metric.trend === 'up' ? (
                  <ArrowUpRight className="w-4 h-4 text-green-500" />
                ) : (
                  <ArrowDownRight className="w-4 h-4 text-red-500" />
                )}
                <span className={metric.trend === 'up' ? 'text-green-600' : 'text-red-600'}>
                  {metric.change}
                </span>
              </div>
            </div>
            <div className="mt-3">
              <div className="text-2xl font-bold text-gray-900">{metric.value}</div>
              <div className="text-sm text-gray-600">{metric.description}</div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* ROI Trend Chart */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">ROI Trend Analysis</h3>
          <div className="flex items-center space-x-4">
            <select 
              value={selectedTimeframe}
              onChange={(e) => setSelectedTimeframe(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
            >
              <option value="6months">Last 6 Months</option>
              <option value="12months">Last 12 Months</option>
              <option value="24months">Last 24 Months</option>
            </select>
          </div>
        </div>
        
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={roiTrendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip 
                formatter={(value, name) => [
                  name === 'roi' ? `${value}%` : `$${(value as number).toLocaleString()}`,
                  name === 'roi' ? 'ROI' : name === 'returns' ? 'Returns' : 'Cumulative'
                ]}
              />
              <Area type="monotone" dataKey="cumulative" stackId="1" stroke="#8B5CF6" fill="#8B5CF6" fillOpacity={0.3} />
              <Line type="monotone" dataKey="roi" stroke="#10B981" strokeWidth={3} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Investment Breakdown */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold mb-4">Investment Breakdown</h3>
          <div className="space-y-4">
            {investmentBreakdown.map((item) => (
              <div key={item.category} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{item.category}</span>
                  <div className="text-right">
                    <div className="font-semibold">${item.amount.toLocaleString()}</div>
                    <div className="text-sm text-gray-600">{item.percentage}%</div>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="h-2 rounded-full"
                    style={{ 
                      width: `${item.percentage}%`, 
                      backgroundColor: item.color 
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 pt-4 border-t border-gray-200">
            <div className="flex justify-between font-semibold">
              <span>Total Investment</span>
              <span>$674,000</span>
            </div>
          </div>
        </div>

        {/* Business Value Comparison */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold mb-4">Business Value Impact</h3>
          <div className="space-y-4">
            {businessValue.map((metric) => {
              const improvement = metric.metric === 'Mean Time to Resolution' 
                ? ((metric.before - metric.after) / metric.before * 100).toFixed(1)
                : ((metric.after - metric.before) / metric.before * 100).toFixed(1);
              
              return (
                <div key={metric.metric} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{metric.metric}</span>
                    <span className="text-sm text-green-600">
                      +{improvement}% improvement
                    </span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex-1">
                      <div className="text-sm text-gray-600">Before</div>
                      <div className="font-semibold">{metric.before}{metric.unit}</div>
                    </div>
                    <ArrowUpRight className="w-5 h-5 text-green-500" />
                    <div className="flex-1">
                      <div className="text-sm text-gray-600">After</div>
                      <div className="font-semibold text-green-600">{metric.after}{metric.unit}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Impact Areas Detail */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold mb-6">Detailed Impact Analysis</h3>
        <div className="grid gap-4">
          {impactAreas.map((area, index) => (
            <motion.div
              key={area.area}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="font-medium mb-2">{area.area}</h4>
                  <p className="text-sm text-gray-600 mb-3">{area.description}</p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Before:</span>
                      <div className="font-medium">{area.beforeValue}</div>
                    </div>
                    <div>
                      <span className="text-gray-500">After:</span>
                      <div className="font-medium text-green-600">{area.afterValue}</div>
                    </div>
                    <div>
                      <span className="text-gray-500">Improvement:</span>
                      <div className="font-medium text-blue-600">{area.improvement}</div>
                    </div>
                    <div>
                      <span className="text-gray-500">Annual Savings:</span>
                      <div className="font-medium text-green-600">{area.annualSavings}</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Implementation Milestones */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold mb-6">Implementation Milestones & Value Delivery</h3>
        <div className="space-y-4">
          {milestones.map((milestone, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="flex items-start space-x-4 p-4 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex-shrink-0">
                {milestone.status === 'completed' ? (
                  <CheckCircle className="w-6 h-6 text-green-500" />
                ) : (
                  <Clock className="w-6 h-6 text-yellow-500" />
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-3 mb-2">
                  <h4 className="font-medium">{milestone.title}</h4>
                  <span className="text-sm text-gray-500">{milestone.date}</span>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    milestone.status === 'completed' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {milestone.status}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-2">{milestone.description}</p>
                <p className="text-sm text-blue-600 font-medium">{milestone.impact}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Executive Summary */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6">
        <div className="flex items-center space-x-3 mb-4">
          <Award className="w-8 h-8 text-green-600" />
          <h3 className="text-xl font-semibold">Executive ROI Summary</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">2,122%</div>
            <div className="text-sm text-gray-600">Total ROI Achieved</div>
            <div className="text-xs text-gray-500 mt-1">17-day payback period</div>
          </div>
          
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">$2.7M</div>
            <div className="text-sm text-gray-600">Total Value Created</div>
            <div className="text-xs text-gray-500 mt-1">Annualized benefit</div>
          </div>
          
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600">87%</div>
            <div className="text-sm text-gray-600">Efficiency Improvement</div>
            <div className="text-xs text-gray-500 mt-1">Operational enhancement</div>
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-white rounded-lg border border-gray-200">
          <p className="text-gray-700 text-center">
            <strong>Business Impact:</strong> The IntelliOps AI platform has delivered exceptional value, 
            transforming reactive IT operations into predictive intelligence while generating substantial 
            cost savings and operational improvements that exceed initial projections by 156%.
          </p>
        </div>
      </div>
    </div>
  );
}