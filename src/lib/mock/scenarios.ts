// src/lib/mock-data/scenarios.ts
import { DemoScenario, Alert, AIInsight } from '@/lib/types';

export const demoScenarios: DemoScenario[] = [
  {
    id: 'morning-check',
    name: 'Morning Health Check',
    description: 'Typical morning system check with a critical failure detection',
    duration: 45,
    steps: [
      {
        time: 0,
        action: 'show-alert',
        data: {
          id: 'demo-1',
          type: 'info',
          title: 'Good Morning! Starting Daily Health Check',
          message: 'Analyzing system health across all services...',
          severity: 'low',
          timestamp: new Date(),
          acknowledged: false
        } as Alert
      },
      {
        time: 3,
        action: 'show-insight',
        data: {
          id: 'demo-insight-1',
          type: 'pattern',
          title: 'Unusual Early Morning Activity',
          description: 'Transaction volume 45% higher than typical Monday morning',
          confidence: 92,
          impact: 'medium',
          suggestedAction: 'Scale payment services by 2 additional instances',
          timestamp: new Date()
        } as AIInsight
      },
      {
        time: 8,
        action: 'service-failure',
        target: 'payment-gateway-primary' // Will be matched to actual service
      },
      {
        time: 10,
        action: 'show-alert',
        data: {
          id: 'demo-2',
          type: 'error',
          title: 'CRITICAL: Payment Gateway Failure',
          message: 'Primary payment gateway is not responding',
          severity: 'critical',
          timestamp: new Date(),
          acknowledged: false
        } as Alert
      },
      {
        time: 15,
        action: 'show-insight',
        data: {
          id: 'demo-insight-2',
          type: 'recommendation',
          title: 'Similar Issue Found in History',
          description: 'DEF-4521: Database connection pool exhaustion (95.3% match)',
          confidence: 95,
          impact: 'critical',
          suggestedAction: 'Increase connection pool size and restart service',
          timestamp: new Date()
        } as AIInsight
      },
      {
        time: 25,
        action: 'update-service',
        target: 'payment-gateway-primary',
        data: { status: 'degraded', health: 65 }
      },
      {
        time: 30,
        action: 'update-service',
        target: 'payment-gateway-primary',
        data: { status: 'healthy', health: 98 }
      },
      {
        time: 32,
        action: 'show-alert',
        data: {
          id: 'demo-3',
          type: 'info',
          title: 'Service Recovered',
          message: 'Payment Gateway restored to full functionality',
          severity: 'low',
          timestamp: new Date(),
          acknowledged: false
        } as Alert
      },
      {
        time: 35,
        action: 'show-insight',
        data: {
          id: 'demo-insight-3',
          type: 'pattern',
          title: 'Cost Impact Analysis',
          description: 'Downtime cost: $47,500. Early detection saved estimated $152,000',
          confidence: 88,
          impact: 'high',
          timestamp: new Date()
        } as AIInsight
      }
    ]
  },
  
  {
    id: 'cascade-failure',
    name: 'Cascade Failure Detection',
    description: 'Demonstrates AI-powered cascade failure prediction and prevention',
    duration: 60,
    steps: [
      {
        time: 0,
        action: 'show-alert',
        data: {
          id: 'cascade-1',
          type: 'info',
          title: 'Monitoring System Health',
          message: 'All systems operational',
          severity: 'low',
          timestamp: new Date(),
          acknowledged: false
        } as Alert
      },
      {
        time: 5,
        action: 'show-insight',
        data: {
          id: 'cascade-insight-1',
          type: 'prediction',
          title: 'Potential Database Bottleneck Detected',
          description: 'Connection pool usage trending toward capacity',
          confidence: 78,
          impact: 'medium',
          suggestedAction: 'Consider scaling database cluster',
          timestamp: new Date()
        } as AIInsight
      },
      {
        time: 10,
        action: 'cascade-failure'
      },
      {
        time: 12,
        action: 'show-alert',
        data: {
          id: 'cascade-2',
          type: 'error',
          title: 'CASCADE FAILURE IN PROGRESS',
          message: 'Database failure affecting 12 dependent services',
          severity: 'critical',
          timestamp: new Date(),
          acknowledged: false
        } as Alert
      },
      {
        time: 15,
        action: 'show-insight',
        data: {
          id: 'cascade-insight-2',
          type: 'anomaly',
          title: 'Cascade Pattern Recognized',
          description: 'Similar to incident INC-2453 from last quarter',
          confidence: 94,
          impact: 'critical',
          suggestedAction: 'Execute emergency failover procedure',
          timestamp: new Date()
        } as AIInsight
      },
      {
        time: 25,
        action: 'show-alert',
        data: {
          id: 'cascade-3',
          type: 'warning',
          title: 'Automated Failover Initiated',
          message: 'Switching to secondary database cluster',
          severity: 'high',
          timestamp: new Date(),
          acknowledged: false
        } as Alert
      },
      {
        time: 35,
        action: 'resolve-all'
      },
      {
        time: 38,
        action: 'show-alert',
        data: {
          id: 'cascade-4',
          type: 'info',
          title: 'All Services Restored',
          message: 'Cascade failure resolved. Post-incident analysis available.',
          severity: 'low',
          timestamp: new Date(),
          acknowledged: false
        } as Alert
      },
      {
        time: 45,
        action: 'show-insight',
        data: {
          id: 'cascade-insight-3',
          type: 'recommendation',
          title: 'Infrastructure Optimization Opportunity',
          description: 'Implement circuit breakers to prevent future cascades',
          confidence: 91,
          impact: 'high',
          suggestedAction: 'Schedule architecture review for resilience improvements',
          timestamp: new Date()
        } as AIInsight
      }
    ]
  },
  
  {
    id: 'release-ready',
    name: 'Release Readiness Check',
    description: 'Shows how AI assists in release go/no-go decisions',
    duration: 40,
    steps: [
      {
        time: 0,
        action: 'show-alert',
        data: {
          id: 'release-1',
          type: 'info',
          title: 'Release Readiness Assessment Started',
          message: 'Analyzing Q2 2024 Release readiness metrics',
          severity: 'low',
          timestamp: new Date(),
          acknowledged: false
        } as Alert
      },
      {
        time: 5,
        action: 'show-insight',
        data: {
          id: 'release-insight-1',
          type: 'pattern',
          title: 'Testing Progress Below Target',
          description: 'UAT completion at 78%, needs acceleration',
          confidence: 100,
          impact: 'high',
          suggestedAction: 'Assign 3 additional testers to UAT suite',
          timestamp: new Date()
        } as AIInsight
      },
      {
        time: 10,
        action: 'show-insight',
        data: {
          id: 'release-insight-2',
          type: 'prediction',
          title: 'Release Date Risk',
          description: 'Current velocity suggests 2-day delay',
          confidence: 85,
          impact: 'medium',
          suggestedAction: 'Consider deferring 2 low-priority features',
          timestamp: new Date()
        } as AIInsight
      },
      {
        time: 20,
        action: 'show-alert',
        data: {
          id: 'release-2',
          type: 'warning',
          title: 'Critical Defect Resolved',
          message: 'Payment validation bug fixed and verified',
          severity: 'medium',
          timestamp: new Date(),
          acknowledged: false
        } as Alert
      },
      {
        time: 25,
        action: 'show-insight',
        data: {
          id: 'release-insight-3',
          type: 'recommendation',
          title: 'All Release Criteria Met',
          description: 'SIT: 100%, UAT: 100%, Regression: 96.5%, Defects: Closed',
          confidence: 98,
          impact: 'low',
          suggestedAction: 'Proceed with release deployment',
          timestamp: new Date()
        } as AIInsight
      },
      {
        time: 30,
        action: 'show-alert',
        data: {
          id: 'release-3',
          type: 'info',
          title: '✅ RELEASE IS GO',
          message: 'All criteria met. Release approved for deployment.',
          severity: 'low',
          timestamp: new Date(),
          acknowledged: false
        } as Alert
      }
    ]
  },
  
  {
    id: 'ai-defect-match',
    name: 'AI Defect Resolution',
    description: 'Demonstrates AI matching new defects with historical solutions',
    duration: 30,
    steps: [
      {
        time: 0,
        action: 'show-alert',
        data: {
          id: 'defect-1',
          type: 'warning',
          title: 'New Critical Defect Raised',
          message: 'DEF-5234: API timeout during peak load',
          severity: 'high',
          timestamp: new Date(),
          acknowledged: false
        } as Alert
      },
      {
        time: 3,
        action: 'show-insight',
        data: {
          id: 'defect-insight-1',
          type: 'pattern',
          title: 'Analyzing Defect Pattern...',
          description: 'Searching through 10,000+ historical defects',
          confidence: 0,
          impact: 'medium',
          timestamp: new Date()
        } as AIInsight
      },
      {
        time: 8,
        action: 'show-insight',
        data: {
          id: 'defect-insight-2',
          type: 'recommendation',
          title: '5 Similar Defects Found!',
          description: 'DEF-3891 (96.7% match): "API Gateway timeout under load"',
          confidence: 97,
          impact: 'high',
          suggestedAction: 'Apply solution: Increase connection pool and implement circuit breaker',
          timestamp: new Date()
        } as AIInsight
      },
      {
        time: 15,
        action: 'show-alert',
        data: {
          id: 'defect-2',
          type: 'info',
          title: 'Solution Applied Successfully',
          message: 'Historical fix implemented. Monitoring for resolution.',
          severity: 'low',
          timestamp: new Date(),
          acknowledged: false
        } as Alert
      },
      {
        time: 20,
        action: 'show-insight',
        data: {
          id: 'defect-insight-3',
          type: 'pattern',
          title: 'Time Saved: 6 Hours',
          description: 'Average resolution time reduced from 8 hours to 2 hours',
          confidence: 95,
          impact: 'medium',
          suggestedAction: 'Update knowledge base with this resolution',
          timestamp: new Date()
        } as AIInsight
      }
    ]
  }
];

// Helper to get scenario by ID
export function getScenarioById(id: string): DemoScenario | undefined {
  return demoScenarios.find(s => s.id === id);
}

// Keyboard shortcuts for demos
export const demoKeyboardShortcuts = {
  'ctrl+1': 'morning-check',
  'ctrl+2': 'cascade-failure',
  'ctrl+3': 'release-ready',
  'ctrl+4': 'ai-defect-match'
};