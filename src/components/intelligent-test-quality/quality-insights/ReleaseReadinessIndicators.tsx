'use client';

import { CheckCircle, XCircle, AlertTriangle, Clock, Shield } from 'lucide-react';

export default function ReleaseReadinessIndicators() {
  const readinessChecks = [
    { name: 'Code Quality Gates', status: 'pass', score: 94.2, required: 85 },
    { name: 'Test Coverage', status: 'pass', score: 87.5, required: 80 },
    { name: 'Security Scan', status: 'pass', score: 96.8, required: 90 },
    { name: 'Performance Benchmarks', status: 'fail', score: 78.2, required: 85 },
    { name: 'Documentation', status: 'warn', score: 72.1, required: 75 }
  ];

  const overallReadiness = 'CONDITIONAL_GO';

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pass': return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'fail': return <XCircle className="w-5 h-5 text-red-500" />;
      case 'warn': return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      default: return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  const getReadinessColor = (readiness: string) => {
    switch (readiness) {
      case 'GO': return 'bg-green-500';
      case 'NO_GO': return 'bg-red-500';
      case 'CONDITIONAL_GO': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className={`${getReadinessColor(overallReadiness)} rounded-xl p-8 text-white text-center`}>
        <Shield className="w-16 h-16 mx-auto mb-4" />
        <h2 className="text-3xl font-bold mb-2">CONDITIONAL GO</h2>
        <p className="text-lg">Release approved with conditions - address performance and documentation gaps</p>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold mb-4">Release Readiness Checklist</h3>
        <div className="space-y-4">
          {readinessChecks.map((check) => (
            <div key={check.name} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center space-x-3">
                {getStatusIcon(check.status)}
                <span className="font-medium">{check.name}</span>
              </div>
              <div className="text-right">
                <div className="font-medium">{check.score}% / {check.required}%</div>
                <div className={`text-sm ${check.status === 'pass' ? 'text-green-600' : check.status === 'fail' ? 'text-red-600' : 'text-yellow-600'}`}>
                  {check.status === 'pass' ? 'PASSED' : check.status === 'fail' ? 'FAILED' : 'WARNING'}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}