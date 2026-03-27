'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Shield,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  Search,
  Filter,
  Download,
  Eye,
  Lock,
  Key,
  FileText,
  Calendar,
  User,
  Settings,
  TrendingUp,
  TrendingDown,
  Award,
  AlertCircle
} from 'lucide-react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, ResponsiveContainer, LineChart, Line, Tooltip, Legend } from 'recharts';
import useDashboardStore from '@/store/dashboard';

interface SecurityMetrics {
  totalVulnerabilities: number;
  criticalVulnerabilities: number;
  resolvedVulnerabilities: number;
  complianceScore: number;
  certificatesExpiring: number;
  auditFindings: number;
}

export default function SecurityComplianceDashboard() {
  const { securityVulnerabilities, complianceChecks, securityCertificates } = useDashboardStore();
  const [activeTab, setActiveTab] = useState<'vulnerabilities' | 'compliance' | 'certificates' | 'audit'>('vulnerabilities');
  const [selectedFramework, setSelectedFramework] = useState<string>('all');

  // Mock security data
  const mockVulnerabilities = useMemo(() => [
    {
      id: 'VULN-001',
      title: 'SQL Injection in Login Form',
      description: 'User input not properly sanitized in authentication module',
      severity: 'critical' as const,
      cvssScore: 9.1,
      type: 'SAST' as const,
      status: 'open' as const,
      discoveredAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      affectedComponent: 'Authentication Service',
      assignee: 'Alice Johnson',
      remediation: 'Implement parameterized queries and input validation'
    },
    {
      id: 'VULN-002',
      title: 'Cross-Site Scripting (XSS)',
      description: 'Reflected XSS vulnerability in user profile page',
      severity: 'high' as const,
      cvssScore: 7.4,
      type: 'DAST' as const,
      status: 'in-progress' as const,
      discoveredAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      affectedComponent: 'User Profile Module',
      assignee: 'Bob Smith',
      remediation: 'Implement proper output encoding and CSP headers'
    },
    {
      id: 'VULN-003',
      title: 'Outdated Cryptographic Library',
      description: 'Using deprecated version of OpenSSL with known vulnerabilities',
      severity: 'medium' as const,
      cvssScore: 5.3,
      type: 'SCA' as const,
      status: 'resolved' as const,
      discoveredAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      resolvedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      affectedComponent: 'Encryption Service',
      assignee: 'Carol Davis',
      remediation: 'Upgrade to latest stable version of OpenSSL'
    },
    {
      id: 'VULN-004',
      title: 'Weak Password Policy',
      description: 'Password complexity requirements are insufficient',
      severity: 'medium' as const,
      cvssScore: 4.8,
      type: 'SAST' as const,
      status: 'open' as const,
      discoveredAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      affectedComponent: 'User Management',
      assignee: 'David Wilson',
      remediation: 'Implement stricter password complexity rules'
    },
    {
      id: 'VULN-005',
      title: 'Unencrypted Data Transmission',
      description: 'Sensitive data transmitted over HTTP',
      severity: 'high' as const,
      cvssScore: 6.8,
      type: 'DAST' as const,
      status: 'in-progress' as const,
      discoveredAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
      affectedComponent: 'Payment Gateway',
      assignee: 'Eve Brown',
      remediation: 'Enforce HTTPS for all sensitive data transmission'
    }
  ], []);

  const mockComplianceChecks = useMemo(() => [
    {
      id: 'PCI-001',
      framework: 'PCI-DSS' as const,
      control: '3.4.1',
      description: 'Encrypt cardholder data during transmission over open networks',
      status: 'compliant' as const,
      lastAssessed: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      nextAssessment: new Date(Date.now() + 335 * 24 * 60 * 60 * 1000),
      evidence: 'TLS 1.3 implemented for all payment transactions',
      owner: 'Security Team',
      riskLevel: 'low' as const
    },
    {
      id: 'SOX-001',
      framework: 'SOX' as const,
      control: '404.1',
      description: 'Maintain effective internal controls over financial reporting',
      status: 'non-compliant' as const,
      lastAssessed: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
      nextAssessment: new Date(Date.now() + 75 * 24 * 60 * 60 * 1000),
      owner: 'Finance Team',
      riskLevel: 'high' as const
    },
    {
      id: 'GDPR-001',
      framework: 'GDPR' as const,
      control: 'Art. 32',
      description: 'Implement appropriate technical and organizational security measures',
      status: 'compliant' as const,
      lastAssessed: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000),
      nextAssessment: new Date(Date.now() + 320 * 24 * 60 * 60 * 1000),
      evidence: 'Data encryption at rest and in transit implemented',
      owner: 'Privacy Team',
      riskLevel: 'medium' as const
    },
    {
      id: 'ISO-001',
      framework: 'ISO27001' as const,
      control: 'A.8.2.1',
      description: 'Information classification',
      status: 'pending' as const,
      lastAssessed: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
      nextAssessment: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000),
      owner: 'IT Security',
      riskLevel: 'medium' as const
    },
    {
      id: 'GDPR-002',
      framework: 'GDPR' as const,
      control: 'Art. 25',
      description: 'Data protection by design and by default',
      status: 'compliant' as const,
      lastAssessed: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000),
      nextAssessment: new Date(Date.now() + 345 * 24 * 60 * 60 * 1000),
      evidence: 'Privacy impact assessments conducted for all new systems',
      owner: 'Development Team',
      riskLevel: 'low' as const
    }
  ], []);

  const mockCertificates = useMemo(() => [
    {
      id: 'CERT-001',
      name: 'api.bankingapp.com',
      issuer: 'DigiCert Inc',
      subject: 'CN=api.bankingapp.com',
      expiryDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
      status: 'expiring' as const,
      daysUntilExpiry: 15,
      type: 'SSL/TLS' as const
    },
    {
      id: 'CERT-002',
      name: 'Code Signing Certificate',
      issuer: 'VeriSign',
      subject: 'CN=BankingApp Development',
      expiryDate: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000),
      status: 'valid' as const,
      daysUntilExpiry: 180,
      type: 'Code Signing' as const
    },
    {
      id: 'CERT-003',
      name: 'admin.bankingapp.com',
      issuer: 'Let\'s Encrypt',
      subject: 'CN=admin.bankingapp.com',
      expiryDate: new Date(Date.now() + 75 * 24 * 60 * 60 * 1000),
      status: 'valid' as const,
      daysUntilExpiry: 75,
      type: 'SSL/TLS' as const
    },
    {
      id: 'CERT-004',
      name: 'Email Signing Certificate',
      issuer: 'Comodo',
      subject: 'emailAddress=security@bankingapp.com',
      expiryDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      status: 'expired' as const,
      daysUntilExpiry: -5,
      type: 'Email' as const
    }
  ], []);

  // Calculate metrics
  const securityMetrics = useMemo((): SecurityMetrics => {
    const totalVulns = mockVulnerabilities.length;
    const criticalVulns = mockVulnerabilities.filter(v => v.severity === 'critical').length;
    const resolvedVulns = mockVulnerabilities.filter(v => v.status === 'resolved').length;
    
    const totalChecks = mockComplianceChecks.length;
    const compliantChecks = mockComplianceChecks.filter(c => c.status === 'compliant').length;
    const complianceScore = Math.round((compliantChecks / totalChecks) * 100);
    
    const expiringCerts = mockCertificates.filter(c => c.status === 'expiring' || c.status === 'expired').length;
    
    return {
      totalVulnerabilities: totalVulns,
      criticalVulnerabilities: criticalVulns,
      resolvedVulnerabilities: resolvedVulns,
      complianceScore,
      certificatesExpiring: expiringCerts,
      auditFindings: 12 // Mock value
    };
  }, [mockVulnerabilities, mockComplianceChecks, mockCertificates]);

  // Vulnerability distribution by severity
  const vulnerabilityDistribution = [
    { name: 'Critical', value: mockVulnerabilities.filter(v => v.severity === 'critical').length, color: '#DC2626' },
    { name: 'High', value: mockVulnerabilities.filter(v => v.severity === 'high').length, color: '#EA580C' },
    { name: 'Medium', value: mockVulnerabilities.filter(v => v.severity === 'medium').length, color: '#D97706' },
    { name: 'Low', value: 0, color: '#65A30D' }
  ];

  // Compliance by framework
  const complianceByFramework = ['PCI-DSS', 'SOX', 'GDPR', 'ISO27001', 'HIPAA'].map(framework => {
    const frameworkChecks = mockComplianceChecks.filter(c => c.framework === framework);
    const compliant = frameworkChecks.filter(c => c.status === 'compliant').length;
    const total = frameworkChecks.length || 1;
    
    return {
      framework,
      compliance: Math.round((compliant / total) * 100),
      total: frameworkChecks.length,
      compliant
    };
  });

  // Security trend data
  const securityTrend = [
    { month: 'Jan', vulnerabilities: 23, resolved: 18 },
    { month: 'Feb', vulnerabilities: 19, resolved: 22 },
    { month: 'Mar', vulnerabilities: 25, resolved: 20 },
    { month: 'Apr', vulnerabilities: 18, resolved: 24 },
    { month: 'May', vulnerabilities: 21, resolved: 19 },
    { month: 'Jun', vulnerabilities: 16, resolved: 23 }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-600 bg-red-100';
      case 'high': return 'text-orange-600 bg-orange-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'text-red-600 bg-red-100';
      case 'in-progress': return 'text-yellow-600 bg-yellow-100';
      case 'resolved': return 'text-green-600 bg-green-100';
      case 'accepted': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getComplianceStatusColor = (status: string) => {
    switch (status) {
      case 'compliant': return 'text-green-600 bg-green-100';
      case 'non-compliant': return 'text-red-600 bg-red-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'not-applicable': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getCertificateStatusColor = (status: string) => {
    switch (status) {
      case 'valid': return 'text-green-600 bg-green-100';
      case 'expiring': return 'text-orange-600 bg-orange-100';
      case 'expired': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Security & Compliance</h2>
          <p className="text-gray-600 mt-1">Comprehensive security monitoring and compliance tracking</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: 'Active Vulnerabilities', value: securityMetrics.totalVulnerabilities - securityMetrics.resolvedVulnerabilities, icon: AlertTriangle, color: 'text-red-600', trend: '-15%' },
          { title: 'Compliance Score', value: `${securityMetrics.complianceScore}%`, icon: Award, color: 'text-green-600', trend: '+5%' },
          { title: 'Certificates Expiring', value: securityMetrics.certificatesExpiring, icon: Key, color: 'text-orange-600', trend: '2 this month' },
          { title: 'Audit Findings', value: securityMetrics.auditFindings, icon: FileText, color: 'text-blue-600', trend: '-8%' }
        ].map((metric, index) => {
          const IconComponent = metric.icon;
          return (
            <motion.div
              key={metric.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-lg p-6 border border-gray-200 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center justify-between mb-2">
                <div className={`p-3 rounded-lg bg-gray-50 ${metric.color}`}>
                  <IconComponent className="w-6 h-6" />
                </div>
                <span className="text-sm font-medium text-green-600">{metric.trend}</span>
              </div>
              <h3 className="text-sm font-medium text-gray-600">{metric.title}</h3>
              <p className="text-3xl font-bold text-gray-900 mt-1">{metric.value}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
        {[
          { id: 'vulnerabilities', label: 'Vulnerabilities', icon: Shield },
          { id: 'compliance', label: 'Compliance', icon: CheckCircle },
          { id: 'certificates', label: 'Certificates', icon: Key },
          { id: 'audit', label: 'Audit Trail', icon: FileText }
        ].map((tab) => {
          const IconComponent = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <IconComponent className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {activeTab === 'vulnerabilities' && (
          <div className="space-y-6">
            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Vulnerability Distribution */}
              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Vulnerability Distribution</h3>
                <div className="flex items-center">
                  <div className="w-1/2">
                    <ResponsiveContainer width="100%" height={200}>
                      <PieChart>
                        <Pie
                          data={vulnerabilityDistribution}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          dataKey="value"
                        >
                          {vulnerabilityDistribution.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="w-1/2 pl-4">
                    <div className="space-y-3">
                      {vulnerabilityDistribution.map((item) => (
                        <div key={item.name} className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                            <span className="text-sm text-gray-700">{item.name}</span>
                          </div>
                          <span className="text-sm font-medium text-gray-900">{item.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Security Trend */}
              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Security Trend</h3>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={securityTrend}>
                      <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                      <YAxis tick={{ fontSize: 12 }} />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="vulnerabilities" stroke="#EF4444" strokeWidth={2} name="New Vulnerabilities" />
                      <Line type="monotone" dataKey="resolved" stroke="#10B981" strokeWidth={2} name="Resolved" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Vulnerabilities Table */}
            <div className="bg-white rounded-lg border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Vulnerability Details</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vulnerability</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Severity</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CVSS Score</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Component</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assignee</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {mockVulnerabilities.map((vuln) => (
                      <tr key={vuln.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{vuln.title}</div>
                            <div className="text-sm text-gray-500">{vuln.id}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(vuln.severity)}`}>
                            {vuln.severity.toUpperCase()}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{vuln.cvssScore}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(vuln.status)}`}>
                            {vuln.status.replace('-', ' ').toUpperCase()}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{vuln.affectedComponent}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{vuln.assignee}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'compliance' && (
          <div className="space-y-6">
            {/* Compliance Overview */}
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Compliance by Framework</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={complianceByFramework}>
                    <XAxis dataKey="framework" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip formatter={(value) => [`${value}%`, 'Compliance Score']} />
                    <Bar dataKey="compliance" fill="#10B981" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Compliance Checks */}
            <div className="bg-white rounded-lg border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Compliance Controls</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Framework</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Control</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Risk Level</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Owner</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {mockComplianceChecks.map((check) => (
                      <tr key={check.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                            {check.framework}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{check.control}</td>
                        <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">{check.description}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getComplianceStatusColor(check.status)}`}>
                            {check.status.replace('-', ' ').toUpperCase()}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(check.riskLevel)}`}>
                            {check.riskLevel.toUpperCase()}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{check.owner}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'certificates' && (
          <div className="bg-white rounded-lg border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Certificate Management</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Certificate</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Issuer</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expiry Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Days Until Expiry</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {mockCertificates.map((cert) => (
                    <tr key={cert.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{cert.name}</div>
                        <div className="text-sm text-gray-500">{cert.subject}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{cert.type}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{cert.issuer}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCertificateStatusColor(cert.status)}`}>
                          {cert.status.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {cert.expiryDate.toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {cert.daysUntilExpiry > 0 ? cert.daysUntilExpiry : 'Expired'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'audit' && (
          <div className="bg-white rounded-lg border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Audit Trail</h3>
            </div>
            <div className="p-6">
              <div className="text-center py-8 text-gray-600">
                <FileText className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Audit Trail Viewer</h3>
                <p className="text-gray-600 mb-4">Comprehensive audit logging and analysis coming soon...</p>
                <p className="text-sm text-gray-500">Track user activities, system changes, and compliance events</p>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
} 