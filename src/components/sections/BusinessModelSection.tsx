'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  DollarSign, 
  TrendingUp, 
  Users, 
  Target, 
  CheckCircle, 
  XCircle, 
  Star,
  Award,
  Building,
  Globe,
  Zap,
  Shield,
  Clock,
  BarChart3,
  ArrowRight,
  Crown,
  Rocket,
  Briefcase,
  Calculator,
  PieChart,
  TrendingDown,
  AlertTriangle,
  Lightbulb,
  Phone,
  Mail,
  MessageCircle
} from 'lucide-react';

export default function BusinessModelSection() {
  const [activeTab, setActiveTab] = useState('overview');

  const marketOpportunity = [
    { value: '$47B', label: 'Global Banking IT Services Market', icon: Globe, color: 'text-blue-600' },
    { value: '2,500+', label: 'Potential Enterprise Client Projects', icon: Building, color: 'text-green-600' },
    { value: '$890M', label: 'Addressable Revenue Opportunity', icon: DollarSign, color: 'text-purple-600' }
  ];

  const licenseTiers = [
    {
      id: 'delivery',
      name: 'Delivery Intelligence License',
      price: '$2,500/month',
      target: 'Layer 1: Test & Quality, Release, Knowledge Base (up to 200 services)',
      color: 'from-purple-500 to-indigo-600',
      badge: 'Layer 1',
      badgeColor: 'bg-purple-100 text-purple-800',
      features: [
        { name: 'Test & Quality Intelligence (L1)', included: true },
        { name: 'Release Intelligence (L1)', included: true },
        { name: 'Application Knowledge Base (L1)', included: true },
        { name: 'AI Defect Matching (L1)', included: true },
        { name: 'Basic Alerts & Reporting', included: true },
        { name: 'Service Health & Incident Intelligence (L2)', included: false },
        { name: 'Predictive Operations (L2)', included: false },
        { name: 'Business Intelligence & Analytics (L3)', included: false },
        { name: 'Financial Intelligence (L3)', included: false },
        { name: 'Executive Strategic Dashboards (L3)', included: false }
      ],
      limitations: [
        { label: 'Services', value: '200 max' },
        { label: 'Users', value: '25 max' },
        { label: 'Historical Data', value: '3 months' },
        { label: 'Support', value: 'Business hours email' }
      ],
      roi: '~$88K annually'
    },
    {
      id: 'operations',
      name: 'Operations Intelligence License',
      price: '$4,000/month',
      target: 'Layer 1 + Layer 2: Delivery & Operations Intelligence (up to 500 services)',
      color: 'from-blue-500 to-cyan-600',
      badge: 'Layer 1 + 2',
      badgeColor: 'bg-blue-100 text-blue-800',
      features: [
        { name: 'Test & Quality Intelligence (L1)', included: true },
        { name: 'Release Intelligence (L1)', included: true },
        { name: 'Application Knowledge Base (L1)', included: true },
        { name: 'AI Defect Matching (L1)', included: true },
        { name: 'Basic Alerts & Reporting', included: true },
        { name: 'Service Health & Incident Intelligence (L2)', included: true },
        { name: 'Predictive Operations (L2)', included: true },
        { name: 'Business Intelligence & Analytics (L3)', included: false },
        { name: 'Financial Intelligence (L3)', included: false },
        { name: 'Executive Strategic Dashboards (L3)', included: false }
      ],
      limitations: [
        { label: 'Services', value: '500 max' },
        { label: 'Users', value: '100 max' },
        { label: 'Historical Data', value: '1 year' },
        { label: 'Support', value: 'Priority email + chat' }
      ],
      roi: '~$160K annually'
    },
    {
      id: 'enterprise',
      name: 'Enterprise Intelligence License',
      price: '$5,000/month',
      target: 'All 3 layers, unlimited: Delivery + Operations + Enterprise (500+ services)',
      color: 'from-orange-500 to-red-600',
      badge: 'All Layers',
      badgeColor: 'bg-orange-100 text-orange-800',
      featured: true,
      features: [
        { name: 'Test & Quality Intelligence (L1)', included: true },
        { name: 'Release Intelligence (L1)', included: true },
        { name: 'Application Knowledge Base (L1)', included: true },
        { name: 'AI Defect Matching (L1)', included: true },
        { name: 'Basic Alerts & Reporting', included: true },
        { name: 'Service Health & Incident Intelligence (L2)', included: true },
        { name: 'Predictive Operations (L2)', included: true },
        { name: 'Business Intelligence & Analytics (L3)', included: true },
        { name: 'Financial Intelligence (L3)', included: true },
        { name: 'Executive Strategic Dashboards (L3)', included: true }
      ],
      limitations: [
        { label: 'Services', value: 'Unlimited' },
        { label: 'Users', value: 'Unlimited' },
        { label: 'Historical Data', value: '5 years' },
        { label: 'Support', value: '24/7 phone + dedicated success manager' }
      ],
      roi: '~$255K annually'
    }
  ];

  const revenueProjections = [
    {
      year: 'Year 1',
      clients: 35,
      revenue: '$2.67M',
      margin: '65%',
      breakdown: [
        { item: '10 Enterprise licenses @ $5,000/month', value: '$600K' },
        { item: '15 Operations licenses @ $4,000/month', value: '$720K' },
        { item: '10 Delivery licenses @ $2,500/month', value: '$300K' },
        { item: 'Implementation & training services', value: '$1.05M' }
      ]
    },
    {
      year: 'Year 2',
      clients: 85,
      revenue: '$7.2M',
      margin: '72%',
      breakdown: [
        { item: '30 Enterprise licenses @ $5,000/month', value: '$1.8M' },
        { item: '35 Operations licenses @ $4,000/month', value: '$1.68M' },
        { item: '20 Delivery licenses @ $2,500/month', value: '$600K' },
        { item: 'Implementation & training services', value: '$3.12M' }
      ]
    },
    {
      year: 'Year 3',
      clients: 150,
      revenue: '$14.4M',
      margin: '78%',
      breakdown: [
        { item: '60 Enterprise licenses @ $5,000/month', value: '$3.6M' },
        { item: '55 Operations licenses @ $4,000/month', value: '$2.64M' },
        { item: '35 Delivery licenses @ $2,500/month', value: '$1.05M' },
        { item: 'Implementation & training services', value: '$7.11M' }
      ]
    }
  ];

  const competitors = [
    {
      name: 'Traditional APM Tools (Dynatrace, New Relic)',
      pricing: '$15K-$25K/month for enterprise',
      disadvantages: [
        'Single-tenant architecture',
        'No AI defect matching',
        'Limited banking-specific features',
        'High implementation costs ($500K+)'
      ],
      advantages: [
        '60% lower cost with higher ROI',
        'Banking-optimized workflows',
        'AI-powered defect resolution',
        '6-week implementation vs 6 months'
      ]
    },
    {
      name: 'Manual/Custom Solutions',
      pricing: '$200K-$500K development + maintenance',
      disadvantages: [
        'Long development cycles (12+ months)',
        'No AI capabilities',
        'High maintenance overhead',
        'Limited scalability'
      ],
      advantages: [
        'Immediate deployment (6 weeks)',
        'Proven AI algorithms',
        'Continuous platform updates',
        'Scalable cloud architecture'
      ]
    }
  ];

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-xl p-8 text-white">
        <div className="flex items-center space-x-3 mb-4">
          <DollarSign className="w-8 h-8" />
          <div>
            <h1 className="text-3xl font-bold">💼 Commercial Business Model</h1>
            <p className="text-green-100 text-lg">How IntelliOps AI monetizes 3 intelligence layers across banking IT projects</p>
          </div>
        </div>
        
        {/* Market Opportunity */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {marketOpportunity.map((metric, index) => {
            const IconComponent = metric.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center"
              >
                <IconComponent className={`w-8 h-8 mx-auto mb-2 ${metric.color}`} />
                <div className="text-2xl font-bold mb-1">{metric.value}</div>
                <div className="text-green-100 text-sm">{metric.label}</div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-1">
        <div className="flex flex-wrap gap-1">
          {[
            { id: 'overview', label: 'Licensing Strategy', icon: Target },
            { id: 'revenue', label: 'Revenue Projections', icon: TrendingUp },
            { id: 'go-to-market', label: 'Go-to-Market', icon: Rocket },
            { id: 'competitive', label: 'Competitive Analysis', icon: Shield }
          ].map((tab) => {
            const IconComponent = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`flex items-center space-x-2 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-green-600 to-blue-600 text-white shadow-lg'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <IconComponent className="w-4 h-4" />
                <span>{tab.label}</span>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Licensing Strategy */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">🎯 Three-Tier Licensing Strategy</h2>
                <p className="text-gray-600">Designed for different project sizes and client maturity levels across 3 intelligence layers: Delivery, Operations, and Enterprise</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {licenseTiers.map((tier, index) => (
                  <motion.div
                    key={tier.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className={`relative rounded-xl p-6 border-2 ${
                      tier.featured 
                        ? 'border-purple-300 bg-gradient-to-br from-purple-50 to-blue-50' 
                        : 'border-gray-200 bg-white'
                    }`}
                  >
                    {tier.featured && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                        <span className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                          ⭐ Most Popular
                        </span>
                      </div>
                    )}

                    <div className="text-center mb-6">
                      <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold mb-3 ${tier.badgeColor}`}>
                        {tier.badge}
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{tier.name}</h3>
                      <div className="text-2xl font-bold text-gray-900 mb-1">{tier.price}</div>
                      <p className="text-sm text-gray-600">{tier.target}</p>
                    </div>

                    <div className="space-y-3 mb-6">
                      {tier.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center space-x-3">
                          {feature.included ? (
                            <CheckCircle className="w-5 h-5 text-green-500" />
                          ) : (
                            <XCircle className="w-5 h-5 text-gray-400" />
                          )}
                          <span className={`text-sm ${feature.included ? 'text-gray-900' : 'text-gray-500'}`}>
                            {feature.name}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="border-t border-gray-200 pt-4">
                      <h4 className="font-semibold text-gray-900 mb-3">Limitations:</h4>
                      <div className="space-y-2">
                        {tier.limitations.map((limitation, idx) => (
                          <div key={idx} className="flex justify-between text-sm">
                            <span className="text-gray-600">{limitation.label}:</span>
                            <span className="font-medium text-gray-900">{limitation.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-6 p-3 bg-green-50 rounded-lg">
                      <div className="text-center">
                        <div className="text-sm text-gray-600">ROI Potential</div>
                        <div className="text-lg font-bold text-green-600">{tier.roi}</div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'revenue' && (
          <div className="space-y-8">
            {/* Revenue Projections */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">📈 Revenue Projections & Business Case</h2>
                <p className="text-gray-600">Conservative financial projections for IntelliOps AI commercial success</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {revenueProjections.map((projection, index) => (
                  <motion.div
                    key={projection.year}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200"
                  >
                    <div className="text-center mb-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{projection.year}</h3>
                      <div className="text-3xl font-bold text-blue-600 mb-1">{projection.revenue}</div>
                      <div className="text-sm text-gray-600">{projection.clients} banking clients</div>
                      <div className="text-sm text-green-600 font-semibold">{projection.margin} margin</div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-semibold text-gray-900">Revenue Breakdown:</h4>
                      {projection.breakdown.map((item, idx) => (
                        <div key={idx} className="flex justify-between text-sm">
                          <span className="text-gray-600">{item.item}</span>
                          <span className="font-medium text-gray-900">{item.value}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'go-to-market' && (
          <div className="space-y-8">
            {/* Go-to-Market Strategy */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">🚀 Go-to-Market Strategy</h2>
                <p className="text-gray-600">How IntelliOps AI is positioned and sold to banking clients</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Phase 1 */}
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-200">
                  <div className="flex items-center space-x-3 mb-4">
                    <Target className="w-6 h-6 text-blue-600" />
                    <h3 className="text-lg font-bold text-gray-900">Phase 1: Proof of Value (Months 1-3)</h3>
                  </div>
                  <p className="text-gray-600 mb-4">Current Enterprise Banking Clients</p>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">🎯 Target Client Profile</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Large banks with 100+ IT team members</li>
                        <li>• Complex multi-service architecture (200+ services)</li>
                        <li>• High operational costs and incident frequency</li>
                        <li>• Existing IT services engagement</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">💡 Value Proposition</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• "Reduce operational costs by up to $255K annually"</li>
                        <li>• "30% faster incident resolution with AI pattern matching"</li>
                        <li>• "Transform reactive operations into predictive intelligence"</li>
                        <li>• "ROI of 250-325% with conservative estimates"</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">📊 Sales Process</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Week 1-2: Executive presentation + ROI calculator demo</li>
                        <li>• Week 3-4: 30-day trial deployment on non-critical services</li>
                        <li>• Week 5-6: Results analysis + business case development</li>
                        <li>• Week 7-8: Contract negotiation + Pro license deployment</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Phase 2 */}
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
                  <div className="flex items-center space-x-3 mb-4">
                    <Rocket className="w-6 h-6 text-green-600" />
                    <h3 className="text-lg font-bold text-gray-900">Phase 2: Market Expansion (Months 4-12)</h3>
                  </div>
                  <p className="text-gray-600 mb-4">New Banking Prospects + Existing Client Upsell</p>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">🏦 New Banking Clients</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Target: 25 new banking engagements</li>
                        <li>• Average deal size: $5,000/month × 36 months = $180K</li>
                        <li>• Total pipeline value: $4.5M</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">📈 Existing Client Expansion</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Upgrade Delivery to Operations: 15 clients × $1.5K/month uplift = $22.5K/month</li>
                        <li>• Multi-project deployment: 3-5 projects per client</li>
                        <li>• Additional services revenue: $120K/month</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'competitive' && (
          <div className="space-y-8">
            {/* Competitive Analysis */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">⚔️ Competitive Positioning</h2>
                <p className="text-gray-600">How IntelliOps AI compares to existing market solutions</p>
              </div>

              <div className="space-y-6">
                {competitors.map((competitor, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-gradient-to-br from-gray-50 to-slate-50 rounded-xl p-6 border border-gray-200"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-bold text-gray-900">{competitor.name}</h3>
                      <span className="text-sm font-semibold text-gray-600">{competitor.pricing}</span>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-red-600 mb-3 flex items-center">
                          <XCircle className="w-4 h-4 mr-2" />
                          Their Disadvantages
                        </h4>
                        <ul className="space-y-2">
                          {competitor.disadvantages.map((disadvantage, idx) => (
                            <li key={idx} className="text-sm text-gray-600 flex items-start">
                              <span className="text-red-500 mr-2">•</span>
                              {disadvantage}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold text-green-600 mb-3 flex items-center">
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Our Advantages
                        </h4>
                        <ul className="space-y-2">
                          {competitor.advantages.map((advantage, idx) => (
                            <li key={idx} className="text-sm text-gray-600 flex items-start">
                              <span className="text-green-500 mr-2">•</span>
                              {advantage}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
