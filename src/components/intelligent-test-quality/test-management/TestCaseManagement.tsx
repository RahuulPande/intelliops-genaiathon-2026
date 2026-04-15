'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Search, 
  Filter, 
  Plus,
  Edit,
  Trash2,
  Play,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  Tag,
  User,
  Calendar
} from 'lucide-react';

interface TestCase {
  id: string;
  title: string;
  description: string;
  module: string;
  priority: 'high' | 'medium' | 'low';
  status: 'draft' | 'active' | 'deprecated';
  executionStatus: 'not-run' | 'passed' | 'failed' | 'blocked';
  assignee: string;
  lastRun: string;
  estimatedTime: string;
  tags: string[];
}

export default function TestCaseManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedModule, setSelectedModule] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedPriority, setSelectedPriority] = useState('all');

  // Mock test cases data
  const testCases: TestCase[] = [
    {
      id: 'TC001',
      title: 'User Login with Valid Credentials',
      description: 'Verify that user can login with valid username and password',
      module: 'Authentication',
      priority: 'high',
      status: 'active',
      executionStatus: 'passed',
      assignee: 'Alice Johnson',
      lastRun: '2024-01-15',
      estimatedTime: '5 min',
      tags: ['login', 'authentication', 'smoke']
    },
    {
      id: 'TC002',
      title: 'Payment Processing with Valid Card',
      description: 'Test payment processing with valid credit card information',
      module: 'Payments',
      priority: 'high',
      status: 'active',
      executionStatus: 'failed',
      assignee: 'Bob Smith',
      lastRun: '2024-01-14',
      estimatedTime: '15 min',
      tags: ['payment', 'credit-card', 'critical']
    },
    {
      id: 'TC003',
      title: 'Account Balance Inquiry',
      description: 'Verify account balance inquiry functionality',
      module: 'Account Management',
      priority: 'medium',
      status: 'active',
      executionStatus: 'passed',
      assignee: 'Carol Davis',
      lastRun: '2024-01-15',
      estimatedTime: '8 min',
      tags: ['balance', 'inquiry', 'account']
    },
    {
      id: 'TC004',
      title: 'Generate Monthly Report',
      description: 'Test monthly report generation with various filters',
      module: 'Reports',
      priority: 'low',
      status: 'active',
      executionStatus: 'not-run',
      assignee: 'David Wilson',
      lastRun: 'Never',
      estimatedTime: '25 min',
      tags: ['reports', 'monthly', 'filters']
    },
    {
      id: 'TC005',
      title: 'Admin User Management',
      description: 'Test admin capabilities for user management',
      module: 'Admin',
      priority: 'medium',
      status: 'active',
      executionStatus: 'blocked',
      assignee: 'Eve Brown',
      lastRun: '2024-01-12',
      estimatedTime: '20 min',
      tags: ['admin', 'user-management', 'permissions']
    },
    {
      id: 'TC006',
      title: 'Password Reset Flow',
      description: 'Test password reset functionality via email',
      module: 'Authentication',
      priority: 'medium',
      status: 'draft',
      executionStatus: 'not-run',
      assignee: 'Alice Johnson',
      lastRun: 'Never',
      estimatedTime: '12 min',
      tags: ['password', 'reset', 'email']
    }
  ];

  const modules = Array.from(new Set(testCases.map(tc => tc.module)));
  const assignees = Array.from(new Set(testCases.map(tc => tc.assignee)));

  const filteredTestCases = testCases.filter(testCase => {
    const matchesSearch = testCase.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         testCase.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         testCase.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesModule = selectedModule === 'all' || testCase.module === selectedModule;
    const matchesStatus = selectedStatus === 'all' || testCase.status === selectedStatus;
    const matchesPriority = selectedPriority === 'all' || testCase.priority === selectedPriority;
    
    return matchesSearch && matchesModule && matchesStatus && matchesPriority;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      case 'deprecated': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getExecutionStatusIcon = (status: string) => {
    switch (status) {
      case 'passed': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'failed': return <XCircle className="w-4 h-4 text-red-500" />;
      case 'blocked': return <AlertCircle className="w-4 h-4 text-gray-500" />;
      case 'not-run': return <Clock className="w-4 h-4 text-yellow-500" />;
      default: return null;
    }
  };

  const testCaseStats = {
    total: testCases.length,
    active: testCases.filter(tc => tc.status === 'active').length,
    draft: testCases.filter(tc => tc.status === 'draft').length,
    passed: testCases.filter(tc => tc.executionStatus === 'passed').length,
    failed: testCases.filter(tc => tc.executionStatus === 'failed').length,
    blocked: testCases.filter(tc => tc.executionStatus === 'blocked').length,
    notRun: testCases.filter(tc => tc.executionStatus === 'not-run').length
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Test Case Management</h2>
          <p className="text-gray-600">Organize, manage, and track your test cases</p>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>New Test Case</span>
        </motion.button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
        <div className="bg-white dark:bg-[#1A1A1A] rounded-lg border border-gray-200 dark:border-gray-800 p-4 text-center">
          <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">{testCaseStats.total}</div>
          <div className="text-sm text-gray-600">Total Cases</div>
        </div>
        <div className="bg-white dark:bg-[#1A1A1A] rounded-lg border border-gray-200 dark:border-gray-800 p-4 text-center">
          <div className="text-2xl font-bold text-green-600">{testCaseStats.active}</div>
          <div className="text-sm text-gray-600">Active</div>
        </div>
        <div className="bg-white dark:bg-[#1A1A1A] rounded-lg border border-gray-200 dark:border-gray-800 p-4 text-center">
          <div className="text-2xl font-bold text-yellow-600">{testCaseStats.draft}</div>
          <div className="text-sm text-gray-600">Draft</div>
        </div>
        <div className="bg-white dark:bg-[#1A1A1A] rounded-lg border border-gray-200 dark:border-gray-800 p-4 text-center">
          <div className="text-2xl font-bold text-green-600">{testCaseStats.passed}</div>
          <div className="text-sm text-gray-600">Passed</div>
        </div>
        <div className="bg-white dark:bg-[#1A1A1A] rounded-lg border border-gray-200 dark:border-gray-800 p-4 text-center">
          <div className="text-2xl font-bold text-red-600">{testCaseStats.failed}</div>
          <div className="text-sm text-gray-600">Failed</div>
        </div>
        <div className="bg-white dark:bg-[#1A1A1A] rounded-lg border border-gray-200 dark:border-gray-800 p-4 text-center">
          <div className="text-2xl font-bold text-gray-600">{testCaseStats.blocked}</div>
          <div className="text-sm text-gray-600">Blocked</div>
        </div>
        <div className="bg-white dark:bg-[#1A1A1A] rounded-lg border border-gray-200 dark:border-gray-800 p-4 text-center">
          <div className="text-2xl font-bold text-yellow-600">{testCaseStats.notRun}</div>
          <div className="text-sm text-gray-600">Not Run</div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white dark:bg-[#1A1A1A] rounded-lg border border-gray-200 dark:border-gray-800 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search test cases..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <select 
            value={selectedModule}
            onChange={(e) => setSelectedModule(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2"
          >
            <option value="all">All Modules</option>
            {modules.map(module => (
              <option key={module} value={module}>{module}</option>
            ))}
          </select>
          
          <select 
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="draft">Draft</option>
            <option value="deprecated">Deprecated</option>
          </select>
          
          <select 
            value={selectedPriority}
            onChange={(e) => setSelectedPriority(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2"
          >
            <option value="all">All Priorities</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center justify-center space-x-2 border border-gray-300 rounded-lg px-3 py-2 hover:bg-gray-50 transition-colors"
          >
            <Filter className="w-4 h-4" />
            <span>More Filters</span>
          </motion.button>
        </div>
      </div>

      {/* Test Cases Table */}
      <div className="bg-white dark:bg-[#1A1A1A] rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Test Case</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Module</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Execution</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assignee</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Run</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-[#1A1A1A] divide-y divide-gray-200 dark:divide-gray-800">
              {filteredTestCases.map((testCase) => (
                <tr key={testCase.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-medium text-gray-900 dark:text-gray-100">{testCase.id}: {testCase.title}</div>
                      <div className="text-sm text-gray-500 max-w-xs truncate">{testCase.description}</div>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {testCase.tags.map(tag => (
                          <span key={tag} className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                            <Tag className="w-3 h-3 mr-1" />
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                    {testCase.module}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getPriorityColor(testCase.priority)}`}>
                      {testCase.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(testCase.status)}`}>
                      {testCase.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      {getExecutionStatusIcon(testCase.executionStatus)}
                      <span className="text-sm text-gray-900 dark:text-gray-100 capitalize">{testCase.executionStatus.replace('-', ' ')}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-900 dark:text-gray-100">{testCase.assignee}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-900 dark:text-gray-100">{testCase.lastRun}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="text-green-600 hover:text-green-900"
                        title="Run Test"
                      >
                        <Play className="w-4 h-4" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="text-blue-600 hover:text-blue-900"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="text-red-600 hover:text-red-900"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredTestCases.length === 0 && (
        <div className="text-center py-12">
          <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">No test cases found matching your criteria</p>
        </div>
      )}

      {/* Quick Actions */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center justify-center space-x-2 bg-white dark:bg-[#1A1A1A] rounded-lg p-4 shadow-sm dark:shadow-none border border-gray-200 dark:border-gray-800 hover:shadow-md transition-all"
          >
            <Play className="w-5 h-5 text-green-600" />
            <span>Run All Active Tests</span>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center justify-center space-x-2 bg-white dark:bg-[#1A1A1A] rounded-lg p-4 shadow-sm dark:shadow-none border border-gray-200 dark:border-gray-800 hover:shadow-md transition-all"
          >
            <FileText className="w-5 h-5 text-blue-600" />
            <span>Export Test Cases</span>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center justify-center space-x-2 bg-white dark:bg-[#1A1A1A] rounded-lg p-4 shadow-sm dark:shadow-none border border-gray-200 dark:border-gray-800 hover:shadow-md transition-all"
          >
            <Plus className="w-5 h-5 text-purple-600" />
            <span>Bulk Import</span>
          </motion.button>
        </div>
      </div>
    </div>
  );
}