'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function QualityTrends() {
  const trendData = Array.from({ length: 30 }, (_, i) => ({
    date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    qualityScore: 90 + Math.sin(i / 5) * 5 + Math.random() * 3,
    defectRate: 0.5 + Math.random() * 1,
    testCoverage: 85 + Math.random() * 10
  }));

  return (
    <div className="p-6 space-y-6">
      <div className="bg-white dark:bg-[#1A1A1A] rounded-lg border border-gray-200 dark:border-gray-800 p-6">
        <h3 className="text-lg font-semibold mb-4">Quality Score Trends (30 Days)</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="qualityScore" stroke="#10B981" strokeWidth={2} name="Quality Score" />
              <Line type="monotone" dataKey="testCoverage" stroke="#3B82F6" strokeWidth={2} name="Test Coverage" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}