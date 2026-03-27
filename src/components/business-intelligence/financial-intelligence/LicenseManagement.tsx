'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  CreditCard, 
  Users, 
  Calendar, 
  AlertTriangle, 
  CheckCircle,
  TrendingUp,
  TrendingDown,
  Search,
  Download,
  Settings,
  RefreshCw
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export default function LicenseManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Mock license data
  const licenseData = [
    {
      id: 1,
      name: 'Microsoft Office 365',
      category: 'Productivity',
      totalLicenses: 150,
      usedLicenses: 142,
      monthlyCost: 12500,
      perLicenseCost: 83.33,
      renewalDate: '2024-03-15',
      status: 'active',
      utilizationRate: 94.7,
      vendor: 'Microsoft'
    },
    {
      id: 2,
      name: 'Adobe Creative Suite',
      category: 'Design',
      totalLicenses: 25,
      usedLicenses: 18,
      monthlyCost: 4500,
      perLicenseCost: 180,
      renewalDate: '2024-06-30',
      status: 'active',
      utilizationRate: 72.0,
      vendor: 'Adobe'
    },
    {
      id: 3,
      name: 'Splunk Enterprise',
      category: 'Analytics',
      totalLicenses: 10,
      usedLicenses: 10,
      monthlyCost: 8500,
      perLicenseCost: 850,
      renewalDate: '2024-01-20',
      status: 'expiring',
      utilizationRate: 100.0,
      vendor: 'Splunk'
    },
    {
      id: 4,
      name: 'Slack Business+',
      category: 'Communication',
      totalLicenses: 200,
      usedLicenses: 167,
      monthlyCost: 2500,
      perLicenseCost: 12.50,
      renewalDate: '2024-08-12',
      status: 'active',
      utilizationRate: 83.5,
      vendor: 'Slack'
    },
    {
      id: 5,
      name: 'JIRA Software',
      category: 'Development',
      totalLicenses: 75,
      usedLicenses: 68,
      monthlyCost: 3750,
      perLicenseCost: 50,
      renewalDate: '2024-04-22',
      status: 'active',
      utilizationRate: 90.7,
      vendor: 'Atlassian'
    },
    {
      id: 6,
      name: 'Zoom Pro',
      category: 'Communication',
      totalLicenses: 100,
      usedLicenses: 45,
      monthlyCost: 1500,
      perLicenseCost: 15,
      renewalDate: '2024-12-01',
      status: 'underutilized',
      utilizationRate: 45.0,
      vendor: 'Zoom'
    }
  ];

  const utilizationData = licenseData.map(license => ({
    name: license.name.split(' ')[0],
    utilization: license.utilizationRate,
    unused: 100 - license.utilizationRate
  }));

  const categorySpending = [
    { category: 'Productivity', amount: 14000, licenses: 250, color: '#3B82F6' },
    { category: 'Analytics', amount: 8500, licenses: 10, color: '#EF4444' },
    { category: 'Design', amount: 4500, licenses: 25, color: '#10B981' },
    { category: 'Development', amount: 3750, licenses: 75, color: '#F59E0B' },
    { category: 'Communication', amount: 4000, licenses: 300, color: '#8B5CF6' }
  ];

  const optimizationRecommendations = [
    {
      software: 'Zoom Pro',
      issue: 'Low Utilization',
      currentLicenses: 100,
      recommendedLicenses: 60,
      potentialSavings: '$600/month',
      action: 'Reduce licenses',
      priority: 'high'
    },
    {
      software: 'Adobe Creative Suite',
      issue: 'Moderate Utilization',
      currentLicenses: 25,
      recommendedLicenses: 20,
      potentialSavings: '$900/month',
      action: 'Optimize allocation',
      priority: 'medium'
    },
    {
      software: 'Splunk Enterprise',
      issue: 'Renewal Due Soon',
      currentLicenses: 10,
      recommendedLicenses: 10,
      potentialSavings: 'Negotiate better rate',
      action: 'Renew early',
      priority: 'urgent'
    }
  ];

  const filteredLicenses = licenseData.filter(license => {
    const matchesSearch = license.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         license.vendor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || license.category.toLowerCase() === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'expiring': return 'bg-red-100 text-red-800';
      case 'underutilized': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-green-100 text-green-800';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header with Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg p-4 text-white">
          <div className="flex items-center space-x-2">
            <CreditCard className="w-6 h-6" />
            <div>
              <div className="text-2xl font-bold">23</div>
              <div className="text-sm text-blue-100">Active Licenses</div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center space-x-2">
            <Users className="w-6 h-6 text-green-600" />
            <div>
              <div className="text-2xl font-bold text-gray-900">450</div>
              <div className="text-sm text-gray-600">Total Seats</div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center space-x-2">
            <TrendingDown className="w-6 h-6 text-red-600" />
            <div>
              <div className="text-2xl font-bold text-gray-900">$2.4K</div>
              <div className="text-sm text-gray-600">Potential Savings</div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="w-6 h-6 text-yellow-600" />
            <div>
              <div className="text-2xl font-bold text-gray-900">3</div>
              <div className="text-sm text-gray-600">Need Attention</div>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search licenses or vendors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <select 
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2"
            >
              <option value="all">All Categories</option>
              <option value="productivity">Productivity</option>
              <option value="design">Design</option>
              <option value="analytics">Analytics</option>
              <option value="development">Development</option>
              <option value="communication">Communication</option>
            </select>
          </div>
          
          <div className="flex items-center space-x-2">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Sync Data</span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Export</span>
            </motion.button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* License Utilization Chart */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold mb-4">License Utilization</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={utilizationData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="utilization" fill="#3B82F6" name="Used %" />
                <Bar dataKey="unused" fill="#E5E7EB" name="Unused %" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Spending by Category */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold mb-4">Spending by Category</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categorySpending}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="amount"
                  label={({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(1)}%`}
                >
                  {categorySpending.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`$${(value as number).toLocaleString()}`, 'Amount']} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* License Inventory Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold">License Inventory</h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Software</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Usage</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cost</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Renewal</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredLicenses.map((license) => (
                <tr key={license.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="font-medium text-gray-900">{license.name}</div>
                      <div className="text-sm text-gray-500">{license.vendor}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {license.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {license.usedLicenses}/{license.totalLicenses}
                    </div>
                    <div className="text-sm text-gray-500">
                      {license.utilizationRate.toFixed(1)}% utilization
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      ${license.monthlyCost.toLocaleString()}/mo
                    </div>
                    <div className="text-sm text-gray-500">
                      ${license.perLicenseCost.toFixed(2)} per license
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {license.renewalDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(license.status)}`}>
                      {license.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">
                      <Settings className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Optimization Recommendations */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold mb-6">Optimization Recommendations</h3>
        <div className="space-y-4">
          {optimizationRecommendations.map((rec, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="font-medium">{rec.software}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs ${getPriorityColor(rec.priority)}`}>
                      {rec.priority.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{rec.issue}</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Current:</span>
                      <span className="ml-1 font-medium">{rec.currentLicenses} licenses</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Recommended:</span>
                      <span className="ml-1 font-medium">{rec.recommendedLicenses} licenses</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Savings:</span>
                      <span className="ml-1 font-medium text-green-600">{rec.potentialSavings}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Action:</span>
                      <span className="ml-1 font-medium">{rec.action}</span>
                    </div>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors"
                >
                  Apply
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}