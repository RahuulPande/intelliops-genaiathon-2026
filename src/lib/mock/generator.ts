// src/lib/mock-data/generator.ts
import { faker } from '@faker-js/faker';
import { 
  Service, 
  ServiceStatus, 
  LogEntry, 
  Incident, 
  Defect,
  PerformanceMetric,
  Alert,
  ServiceType,
  TestResult,
  ReleaseMetrics
} from '@/lib/types';

export class MockDataGenerator {
  private services: Service[] = [];
  private logs: LogEntry[] = [];
  private incidents: Incident[] = [];
  private defects: Defect[] = [];

  constructor() {
    this.initializeServices();
    this.generateDependencies();
    this.generateHistoricalData();
  }

  // Initialize 150+ services with realistic distribution
  private initializeServices() {
    const serviceNames = [
      // Core Banking Services
      'Payment Gateway', 'Account Management', 'Transaction Processor',
      'Authentication Service', 'Authorization Engine', 'Fraud Detection',
      'Credit Scoring', 'Loan Origination', 'KYC Verification',
      
      // External Services
      'SWIFT Gateway', 'ACH Processor', 'Credit Bureau API',
      'Sanctions Screening', 'Reuters Market Data', 'Bloomberg Terminal API',
      
      // Infrastructure
      'Database Cluster', 'Message Queue', 'Cache Layer',
      'API Gateway', 'Load Balancer', 'Monitoring Service'
    ];

    // Generate 150 services with realistic names
    for (let i = 0; i < 150; i++) {
      const baseName = faker.helpers.arrayElement(serviceNames);
      const instance = faker.helpers.arrayElement(['Primary', 'Secondary', 'DR', 'Prod', 'UAT']);
      const region = faker.helpers.arrayElement(['US-East', 'EU-West', 'APAC', 'US-West']);
      
      this.services.push({
        id: faker.string.uuid(),
        name: `${baseName} - ${instance} (${region})`,
        type: faker.helpers.arrayElement(['internal', 'external'] as ServiceType[]),
        status: this.getRealisticStatus(),
        health: faker.number.int({ min: 85, max: 100 }),
        lastChecked: new Date(),
        owner: faker.person.fullName(),
        email: faker.internet.email(),
        sla: faker.number.int({ min: 95, max: 99.9 }),
        dependencies: [], // Will be populated later
        endpoint: faker.internet.url(),
        responseTime: faker.number.int({ min: 50, max: 500 }),
        uptime: faker.number.float({ min: 95, max: 99.99, fractionDigits: 2 })
      });
    }
  }

  // Generate realistic status distribution
  private getRealisticStatus(): ServiceStatus {
    const rand = Math.random();
    if (rand < 0.85) return 'healthy';
    if (rand < 0.95) return 'degraded';
    return 'down';
  }

  // Generate service dependencies after all services are created
  private generateDependencies(): void {
    // Create meaningful dependency relationships
    this.services.forEach(service => {
      const serviceName = service.name.toLowerCase();
      const dependencies: string[] = [];
      
      // Payment services depend on auth and core services
      if (serviceName.includes('payment') || serviceName.includes('transaction')) {
        const authService = this.services.find(s => s.name.toLowerCase().includes('auth'));
        const coreService = this.services.find(s => s.name.toLowerCase().includes('core'));
        if (authService && authService.id !== service.id) dependencies.push(authService.id);
        if (coreService && coreService.id !== service.id) dependencies.push(coreService.id);
      }
      
      // External services depend on infrastructure
      if (service.type === 'external') {
        const infraServices = this.services.filter(s => 
          s.name.toLowerCase().includes('gateway') || 
          s.name.toLowerCase().includes('load balancer')
        );
        infraServices.forEach(infra => {
          if (infra.id !== service.id && dependencies.length < 3) {
            dependencies.push(infra.id);
          }
        });
      }
      
      // All services depend on database and monitoring
      if (!serviceName.includes('database') && !serviceName.includes('monitoring')) {
        const dbService = this.services.find(s => s.name.toLowerCase().includes('database'));
        const monitoringService = this.services.find(s => s.name.toLowerCase().includes('monitoring'));
        if (dbService && dbService.id !== service.id) dependencies.push(dbService.id);
        if (monitoringService && monitoringService.id !== service.id && dependencies.length < 4) {
          dependencies.push(monitoringService.id);
        }
      }
      
      // Add some random dependencies for complexity
      if (dependencies.length < 2) {
        const potentialDeps = this.services.filter(s => 
          s.id !== service.id && 
          !dependencies.includes(s.id) &&
          s.name.toLowerCase().includes('cache') || 
          s.name.toLowerCase().includes('queue') ||
          s.name.toLowerCase().includes('api')
        );
        
        const randomDepsCount = Math.min(2 - dependencies.length, potentialDeps.length);
        for (let i = 0; i < randomDepsCount; i++) {
          const randomDep = potentialDeps[Math.floor(Math.random() * potentialDeps.length)];
          if (randomDep && !dependencies.includes(randomDep.id)) {
            dependencies.push(randomDep.id);
          }
        }
      }
      
      service.dependencies = [...new Set(dependencies)]; // Remove duplicates
    });
  }

  // Generate 7 days of historical data
  private generateHistoricalData() {
    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    // Generate logs
    for (let time = weekAgo.getTime(); time < now.getTime(); time += 60000) { // Every minute
      const timestamp = new Date(time);
      
      // Normal activity with patterns
      const hourOfDay = timestamp.getHours();
      const isBusinessHours = hourOfDay >= 9 && hourOfDay <= 17;
      const activityLevel = isBusinessHours ? 0.8 : 0.2;

      if (Math.random() < activityLevel) {
        this.generateLogsForTimestamp(timestamp);
      }

      // Random incidents
      if (Math.random() < 0.001) { // 0.1% chance per minute
        this.generateIncident(timestamp);
      }
    }

    // Generate defects
    this.generateDefects();
  }

  private generateLogsForTimestamp(timestamp: Date) {
    const count = faker.number.int({ min: 10, max: 100 });
    
    for (let i = 0; i < count; i++) {
      const service = faker.helpers.arrayElement(this.services);
      const isError = Math.random() < 0.05; // 5% error rate

      this.logs.push({
        id: faker.string.uuid(),
        timestamp,
        serviceId: service.id,
        serviceName: service.name,
        level: isError ? 'error' : faker.helpers.arrayElement(['info', 'warn', 'debug']),
        message: isError ? this.generateErrorMessage() : this.generateNormalMessage(),
        userId: faker.string.uuid(),
        sessionId: faker.string.alphanumeric(32),
        traceId: faker.string.alphanumeric(16),
        spanId: faker.string.alphanumeric(8),
        duration: faker.number.int({ min: 10, max: 5000 }),
        statusCode: isError ? faker.helpers.arrayElement([400, 401, 403, 404, 500, 502, 503]) : 200,
        metadata: {
          ip: faker.internet.ip(),
          userAgent: faker.internet.userAgent(),
          method: faker.helpers.arrayElement(['GET', 'POST', 'PUT', 'DELETE']),
          path: faker.internet.url()
        }
      });
    }
  }

  private generateErrorMessage(): string {
    return faker.helpers.arrayElement([
      'Connection timeout to database',
      'Authentication failed: Invalid credentials',
      'Rate limit exceeded',
      'Service unavailable: Circuit breaker open',
      'Invalid request payload',
      'Downstream service error',
      'Database connection pool exhausted',
      'Memory allocation failed',
      'SSL handshake failed',
      'Transaction rollback: Constraint violation'
    ]);
  }

  private generateNormalMessage(): string {
    return faker.helpers.arrayElement([
      'Request processed successfully',
      'User authenticated',
      'Transaction completed',
      'Cache hit for key',
      'Database query executed',
      'Message published to queue',
      'Health check passed',
      'Configuration reloaded',
      'Session created',
      'Payment processed'
    ]);
  }

  private generateIncident(timestamp: Date) {
    const severity = faker.helpers.arrayElement(['low', 'medium', 'high', 'critical']);
    const affectedServices = faker.helpers.arrayElements(this.services, { min: 1, max: 5 });

    this.incidents.push({
      id: faker.string.uuid(),
      title: this.generateIncidentTitle(severity),
      description: faker.lorem.paragraph(),
      severity,
      status: faker.helpers.arrayElement(['open', 'investigating', 'resolved']),
      createdAt: timestamp,
      updatedAt: new Date(timestamp.getTime() + faker.number.int({ min: 5, max: 120 }) * 60000),
      affectedServices: affectedServices.map(s => s.id),
      assignee: faker.person.fullName(),
      rootCause: faker.lorem.sentence(),
      resolution: faker.lorem.sentence(),
      impactedUsers: faker.number.int({ min: 10, max: 10000 }),
      estimatedRevenueLoss: faker.number.int({ min: 1000, max: 100000 })
    });
  }

  private generateIncidentTitle(severity: string): string {
    const titles = {
      critical: [
        'Complete Payment System Outage',
        'Database Cluster Failure',
        'Authentication Service Down'
      ],
      high: [
        'Degraded Performance in Transaction Processing',
        'Partial API Gateway Failure',
        'High Error Rate in Fraud Detection'
      ],
      medium: [
        'Slow Response Times in Account Management',
        'Intermittent Cache Failures',
        'Message Queue Backlog'
      ],
      low: [
        'Minor UI Glitches',
        'Delayed Report Generation',
        'Non-critical Service Warning'
      ]
    };

    return faker.helpers.arrayElement(titles[severity as keyof typeof titles] || titles.low);
  }

  private generateDefects() {
    // Historical defects for pattern matching
    const defectTemplates = [
      {
        pattern: 'Database connection timeout',
        category: 'Infrastructure',
        solutions: ['Increase connection pool size', 'Optimize query performance', 'Add connection retry logic']
      },
      {
        pattern: 'Authentication token expiration',
        category: 'Security',
        solutions: ['Implement token refresh', 'Extend token lifetime', 'Add grace period']
      },
      {
        pattern: 'Memory leak in service',
        category: 'Performance',
        solutions: ['Fix object disposal', 'Implement garbage collection', 'Add memory monitoring']
      }
    ];

    // Generate 200 historical defects
    for (let i = 0; i < 200; i++) {
      const template = faker.helpers.arrayElement(defectTemplates);
      const createdDate = faker.date.past({ years: 1 });
      
      this.defects.push({
        id: `DEF-${faker.number.int({ min: 1000, max: 9999 })}`,
        title: `${template.pattern} in ${faker.helpers.arrayElement(this.services).name}`,
        description: faker.lorem.paragraphs(2),
        status: faker.helpers.arrayElement(['open', 'in-progress', 'resolved', 'closed']),
        priority: faker.helpers.arrayElement(['low', 'medium', 'high', 'critical']),
        category: template.category,
        createdAt: createdDate,
        updatedAt: faker.date.between({ from: createdDate, to: new Date() }),
        reporter: faker.person.fullName(),
        assignee: faker.person.fullName(),
        affectedServices: faker.helpers.arrayElements(this.services, { min: 1, max: 3 }).map(s => s.id),
        solution: faker.helpers.arrayElement(template.solutions),
        tags: faker.helpers.arrayElements(['backend', 'frontend', 'database', 'api', 'security', 'performance'], { min: 1, max: 3 }),
        similarDefects: [], // Will be populated by AI matching
        confidence: 0
      });
    }
  }

  // Real-time data generation methods
  generateRealtimeLog(): LogEntry {
    const service = faker.helpers.arrayElement(this.services);
    const isError = Math.random() < 0.02; // 2% error rate for real-time

    return {
      id: faker.string.uuid(),
      timestamp: new Date(),
      serviceId: service.id,
      serviceName: service.name,
      level: isError ? 'error' : faker.helpers.arrayElement(['info', 'warn']),
      message: isError ? this.generateErrorMessage() : this.generateNormalMessage(),
      userId: faker.string.uuid(),
      sessionId: faker.string.alphanumeric(32),
      traceId: faker.string.alphanumeric(16),
      spanId: faker.string.alphanumeric(8),
      duration: faker.number.int({ min: 10, max: 2000 }),
      statusCode: isError ? faker.helpers.arrayElement([400, 500, 503]) : 200,
      metadata: {
        ip: faker.internet.ip(),
        userAgent: faker.internet.userAgent(),
        method: faker.helpers.arrayElement(['GET', 'POST']),
        path: faker.internet.url()
      }
    };
  }

  generateRealtimeMetric(serviceId: string): PerformanceMetric {
    const service = this.services.find(s => s.id === serviceId);
    if (!service) throw new Error('Service not found');

    return {
      id: faker.string.uuid(),
      serviceId,
      serviceName: service.name,
      timestamp: new Date(),
      responseTime: service.responseTime + faker.number.int({ min: -50, max: 50 }),
      errorRate: faker.number.float({ min: 0, max: 5, fractionDigits: 1 }),
      throughput: faker.number.int({ min: 100, max: 1000 }),
      cpuUsage: faker.number.float({ min: 20, max: 80, fractionDigits: 1 }),
      memoryUsage: faker.number.float({ min: 30, max: 70, fractionDigits: 1 }),
      activeConnections: faker.number.int({ min: 10, max: 500 }),
      cacheHitRate: faker.number.float({ min: 70, max: 99, fractionDigits: 1 })
    };
  }

  // Demo scenario generators
  createServiceFailureCascade() {
    const primaryService = faker.helpers.arrayElement(this.services.filter(s => s.type === 'internal'));
    const dependentServices = this.services.filter(s => s.dependencies.includes(primaryService.id));

    // Fail primary service
    primaryService.status = 'down';
    primaryService.health = 0;

    // Cascade to dependents
    setTimeout(() => {
      dependentServices.forEach(service => {
        service.status = 'degraded';
        service.health = faker.number.int({ min: 30, max: 60 });
      });
    }, 2000);

    // Generate incident
    const incident: Incident = {
      id: faker.string.uuid(),
      title: `Critical: ${primaryService.name} Failure - Cascade Effect`,
      description: `Primary service failure detected with ${dependentServices.length} affected downstream services`,
      severity: 'critical',
      status: 'open',
      createdAt: new Date(),
      updatedAt: new Date(),
      affectedServices: [primaryService.id, ...dependentServices.map(s => s.id)],
      assignee: 'Auto-assigned to Ops Team',
      rootCause: 'Under investigation',
      resolution: 'In progress',
      impactedUsers: faker.number.int({ min: 5000, max: 50000 }),
      estimatedRevenueLoss: faker.number.int({ min: 50000, max: 500000 })
    };

    return { primaryService, dependentServices, incident };
  }

  simulateReleaseReadiness(): ReleaseMetrics {
    const progress = {
      sit: faker.number.int({ min: 85, max: 100 }),
      uat: faker.number.int({ min: 75, max: 100 }),
      regression: faker.number.int({ min: 70, max: 98 }),
      defectsClosed: faker.number.int({ min: 80, max: 100 })
    };

    const isReady = progress.sit === 100 && 
                   progress.uat === 100 && 
                   progress.regression >= 95 && 
                   progress.defectsClosed === 100;

    return {
      releaseId: `REL-${faker.date.future().getFullYear()}-Q${faker.number.int({ min: 1, max: 4 })}`,
      targetDate: faker.date.future({ years: 0.25 }),
      progress,
      isReady,
      blockers: isReady ? [] : this.generateBlockers(),
      risks: this.generateRisks(),
      lastUpdated: new Date()
    };
  }

  private generateBlockers(): string[] {
    return faker.helpers.arrayElements([
      'Critical defect in payment module',
      'Performance testing incomplete',
      'Security scan pending',
      'UAT sign-off required',
      'Database migration script review',
      'Third-party API integration issues'
    ], { min: 1, max: 3 });
  }

  private generateRisks(): Array<{ risk: string; impact: string; mitigation: string }> {
    const risks = [
      {
        risk: 'Limited testing window',
        impact: 'High',
        mitigation: 'Automated regression suite prepared'
      },
      {
        risk: 'Dependency on external vendor',
        impact: 'Medium',
        mitigation: 'Fallback mechanism implemented'
      },
      {
        risk: 'Complex database migration',
        impact: 'High',
        mitigation: 'Rollback procedure tested'
      }
    ];

    return faker.helpers.arrayElements(risks, { min: 0, max: 2 });
  }

  // Getters
  getServices() { return this.services; }
  getLogs() { return this.logs; }
  getIncidents() { return this.incidents; }
  getDefects() { return this.defects; }
  
  // Get logs for a specific time range
  getLogsInRange(start: Date, end: Date) {
    return this.logs.filter(log => 
      log.timestamp >= start && log.timestamp <= end
    );
  }

  // Get service health history
  getServiceHealthHistory(serviceId: string, hours: number = 24) {
    const now = new Date();
    const start = new Date(now.getTime() - hours * 60 * 60 * 1000);
    
    const history = [];
    for (let time = start.getTime(); time < now.getTime(); time += 15 * 60 * 1000) { // 15 min intervals
      history.push({
        timestamp: new Date(time),
        health: faker.number.int({ min: 85, max: 100 }),
        responseTime: faker.number.int({ min: 50, max: 500 })
      });
    }
    
    return history;
  }
}

// Singleton instance
export const mockDataGenerator = new MockDataGenerator();