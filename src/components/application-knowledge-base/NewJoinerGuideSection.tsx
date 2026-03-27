'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  GraduationCap,
  MapPin,
  Clock,
  CheckCircle,
  Target,
  Brain,
  Code,
  Users,
  Award,
  TrendingUp,
  FileText,
  Play,
  Star,
  AlertTriangle,
  Lightbulb,
  Book
} from 'lucide-react';

interface BaseModule {
  title: string;
  priority: string;
  estimatedTime: string;
  content: string[];
  resources: string[];
}

interface ModuleWithAI extends BaseModule {
  aiInsights: string;
}

interface ModuleWithExercises extends BaseModule {
  practicalExercises: string[];
}

interface ModuleWithMetrics extends BaseModule {
  successMetrics: string[];
}

type LearningModule = ModuleWithAI | ModuleWithExercises | ModuleWithMetrics;

interface LearningPhase {
  phase: number;
  duration: string;
  title: string;
  description: string;
  status: 'completed' | 'current' | 'upcoming';
  modules: LearningModule[];
}

export default function NewJoinerGuideSection() {
  const [activePhase, setActivePhase] = useState(1);

  const onboardingMetrics = [
    {
      value: '40%',
      label: 'Faster Onboarding',
      description: 'Average time to productivity: 2 weeks vs 5 weeks traditional',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      value: '60%',
      label: 'Fewer Initial Mistakes',
      description: 'New joiners avoid common pitfalls through pattern awareness',
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      value: '85%',
      label: 'Knowledge Retention',
      description: 'Information retained vs traditional documentation approaches',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    }
  ];

  const learningPhases: LearningPhase[] = [
    {
      phase: 1,
      duration: 'Day 1-2',
      title: '🗺️ Application Architecture Understanding',
      description: 'Build foundational knowledge of system architecture and critical data flows',
      status: 'completed',
      modules: [
        {
          title: 'Banking Application Overview',
          priority: 'critical',
          estimatedTime: '2 hours',
          content: [
            'High-level architecture and service boundaries',
            'Critical user journeys (payment, authentication, reporting)',
            'Data flow between major components'
          ],
          aiInsights: 'Based on defect analysis, 78% of new joiner mistakes stem from misunderstanding service boundaries and data ownership.',
          resources: [
            'Architecture diagrams with dependency mapping',
            'Service interface documentation',
            'Data model ER diagrams'
          ]
        },
        {
          title: 'High-Risk Module Deep Dive',
          priority: 'high',
          estimatedTime: '1.5 hours',
          content: [
            'Payment Gateway (47 defects) - common issues and patterns',
            'User Authentication (23 defects) - session management pitfalls',
            'Integration points and failure modes'
          ],
          aiInsights: 'New joiners who study high-risk modules first are 45% less likely to introduce defects in their first month.',
          resources: [
            'Module defect analysis reports',
            'Common issue pattern guides',
            'Historical defect case studies'
          ]
        }
      ]
    },
    {
      phase: 2,
      duration: 'Day 3-5',
      title: '🔍 Common Problem Patterns',
      description: 'Learn from historical issues to avoid repeating common mistakes',
      status: 'current',
      modules: [
        {
          title: 'Memory Management & Performance Patterns',
          priority: 'critical',
          estimatedTime: '3 hours',
          content: [
            'Memory leak detection and prevention (34% of defects)',
            'Connection pool management best practices',
            'Performance monitoring and alerting setup'
          ],
          practicalExercises: [
            'Review DEF-2849 (connection pool exhaustion) - understand root cause and fix',
            'Analyze memory usage patterns in Payment Gateway module',
            'Set up local monitoring to detect memory leaks'
          ],
          resources: [
            'Memory profiling tools guide',
            'Connection pool configuration templates',
            'Performance monitoring dashboards'
          ]
        },
        {
          title: 'Integration Failure Patterns',
          priority: 'high',
          estimatedTime: '2 hours',
          content: [
            'External API integration best practices (28% of defects)',
            'Circuit breaker and fallback implementation',
            'Error handling and graceful degradation'
          ],
          practicalExercises: [
            'Implement circuit breaker for a mock external service',
            'Review DEF-2834 (API integration failure) case study'
          ],
          resources: [
            'Circuit breaker implementation examples',
            'API integration patterns library',
            'Error handling best practices guide'
          ]
        }
      ]
    },
    {
      phase: 3,
      duration: 'Week 2',
      title: '🛠️ Hands-On Development',
      description: 'Apply learned patterns while working on low-risk features with mentorship',
      status: 'upcoming',
      modules: [
        {
          title: 'Mentored Feature Development',
          priority: 'medium',
          estimatedTime: 'Ongoing',
          content: [
            'Start with Reporting Engine (low-risk module with 8 defects)',
            'Implement features using established patterns and practices',
            'Regular code reviews focusing on common defect patterns'
          ],
          successMetrics: [
            'Zero memory leaks in first feature implementation',
            'Proper error handling and logging implementation',
            'Performance considerations documented and addressed'
          ],
          resources: [
            'Feature development templates',
            'Code review checklists',
            'Mentorship guidelines'
          ]
        }
      ]
    }
  ];

  const knowledgeAssessment = {
    title: 'Knowledge Check: Payment Gateway Module',
    questions: [
      'What are the top 3 causes of payment gateway failures?',
      'How would you implement connection pool monitoring?',
      'What\'s the typical resolution time for timeout issues?'
    ],
    correctAnswers: 3,
    totalQuestions: 3,
    recommendation: 'Ready to work on payment-related features'
  };

  const currentProgress = {
    milestones: [
      { title: 'Day 1: Architecture Overview', status: 'completed' },
      { title: 'Day 2: High-Risk Module Analysis', status: 'completed' },
      { title: 'Day 3: Memory Management Patterns', status: 'current' },
      { title: 'Day 4: Integration Patterns', status: 'upcoming' },
      { title: 'Week 2: Hands-On Development', status: 'upcoming' }
    ]
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical':
        return 'bg-red-100 text-red-800';
      case 'high':
        return 'bg-orange-100 text-orange-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'current':
        return <Play className="w-5 h-5 text-blue-500" />;
      case 'upcoming':
        return <Clock className="w-5 h-5 text-gray-400" />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <div className="flex items-center justify-center mb-6">
          <div className="bg-gradient-to-r from-green-500 to-blue-600 p-4 rounded-full">
            <GraduationCap className="w-8 h-8 text-white" />
          </div>
        </div>
        
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          🎓 New Joiner Fast-Track Learning Path
        </h2>
        <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-8">
          AI-curated learning journey based on analysis of 1,247 defects and team expertise patterns
        </p>

        {/* Onboarding Metrics */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {onboardingMetrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center"
            >
              <div className={`inline-flex items-center justify-center w-20 h-20 ${metric.bgColor} rounded-full mb-4`}>
                <span className={`text-2xl font-bold ${metric.color}`}>{metric.value}</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{metric.label}</h3>
              <p className="text-sm text-gray-600">{metric.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Learning Path - Left Side */}
        <div className="lg:col-span-2">
          {/* Phase Navigation */}
          <div className="flex items-center space-x-4 mb-8 overflow-x-auto">
            {learningPhases.map((phase) => (
              <button
                key={phase.phase}
                onClick={() => setActivePhase(phase.phase)}
                className={`flex-shrink-0 flex items-center space-x-3 px-6 py-3 rounded-lg border-2 transition-all ${
                  activePhase === phase.phase
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 hover:border-gray-300 text-gray-600'
                }`}
              >
                <div className="text-center">
                  <div className="text-sm font-medium">Phase {phase.phase}</div>
                  <div className="text-xs text-gray-500">{phase.duration}</div>
                </div>
                {getStatusIcon(phase.status)}
              </button>
            ))}
          </div>

          {/* Active Phase Content */}
          {learningPhases.map((phase) => (
            activePhase === phase.phase && (
              <motion.div
                key={phase.phase}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
              >
                {/* Phase Header */}
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold">{phase.title}</h3>
                      <p className="text-blue-100 mt-2">{phase.description}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-semibold">{phase.duration}</div>
                      {getStatusIcon(phase.status)}
                    </div>
                  </div>
                </div>

                {/* Phase Modules */}
                <div className="p-8">
                  <div className="space-y-8">
                    {phase.modules.map((module, moduleIndex) => (
                      <div key={moduleIndex} className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                        {/* Module Header */}
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="text-xl font-semibold text-gray-900">{module.title}</h4>
                          <div className="flex items-center space-x-3">
                            <span className={`text-xs font-medium px-3 py-1 rounded-full ${getPriorityColor(module.priority)}`}>
                              {module.priority} priority
                            </span>
                            <span className="text-sm text-gray-500 flex items-center">
                              <Clock className="w-4 h-4 mr-1" />
                              {module.estimatedTime}
                            </span>
                          </div>
                        </div>

                        {/* Module Content */}
                        <div className="space-y-6">
                          {/* Learning Content */}
                          <div>
                            <h5 className="font-semibold text-gray-900 mb-3 flex items-center">
                              <Book className="w-4 h-4 text-blue-600 mr-2" />
                              Learning Content
                            </h5>
                            <ul className="space-y-2">
                              {module.content.map((item, itemIndex) => (
                                <li key={itemIndex} className="flex items-start space-x-2 text-sm text-gray-600">
                                  <Target className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* AI Insights */}
                          {'aiInsights' in module && (
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                              <h5 className="font-semibold text-blue-900 mb-2 flex items-center">
                                <Brain className="w-4 h-4 text-blue-600 mr-2" />
                                AI Insights
                              </h5>
                              <p className="text-blue-800 text-sm">{module.aiInsights}</p>
                            </div>
                          )}

                          {/* Practical Exercises */}
                          {'practicalExercises' in module && (
                            <div>
                              <h5 className="font-semibold text-gray-900 mb-3 flex items-center">
                                <Code className="w-4 h-4 text-purple-600 mr-2" />
                                Practical Exercises
                              </h5>
                              <ul className="space-y-2">
                                {module.practicalExercises.map((exercise, exerciseIndex) => (
                                  <li key={exerciseIndex} className="flex items-start space-x-2 text-sm text-gray-600">
                                    <Play className="w-4 h-4 text-purple-500 mt-0.5 flex-shrink-0" />
                                    <span>{exercise}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {/* Success Metrics */}
                          {'successMetrics' in module && (
                            <div>
                              <h5 className="font-semibold text-gray-900 mb-3 flex items-center">
                                <Award className="w-4 h-4 text-yellow-600 mr-2" />
                                Success Metrics
                              </h5>
                              <ul className="space-y-2">
                                {module.successMetrics.map((metric, metricIndex) => (
                                  <li key={metricIndex} className="flex items-start space-x-2 text-sm text-gray-600">
                                    <Star className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                                    <span>{metric}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {/* Resources */}
                          <div>
                            <h5 className="font-semibold text-gray-900 mb-3 flex items-center">
                              <FileText className="w-4 h-4 text-gray-600 mr-2" />
                              Resources
                            </h5>
                            <ul className="space-y-2">
                              {module.resources.map((resource, resourceIndex) => (
                                <li key={resourceIndex} className="flex items-start space-x-2 text-sm text-gray-600">
                                  <Lightbulb className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                                  <span>{resource}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )
          ))}
        </div>

        {/* Progress Tracker - Right Side */}
        <div className="space-y-8">
          {/* Progress Tracker */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
              <MapPin className="w-5 h-5 text-blue-600 mr-2" />
              Learning Progress
            </h3>
            
            <div className="space-y-4">
              {currentProgress.milestones.map((milestone, index) => (
                <div key={index} className="flex items-center space-x-3">
                  {getStatusIcon(milestone.status)}
                  <span className={`text-sm ${
                    milestone.status === 'completed' 
                      ? 'text-green-700 font-medium' 
                      : milestone.status === 'current'
                      ? 'text-blue-700 font-medium'
                      : 'text-gray-500'
                  }`}>
                    {milestone.title}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Knowledge Assessment */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
              <Brain className="w-5 h-5 text-purple-600 mr-2" />
              Knowledge Assessment
            </h3>
            
            <div className="space-y-4">
              <h4 className="font-medium text-gray-900">{knowledgeAssessment.title}</h4>
              
              <div className="space-y-2">
                {knowledgeAssessment.questions.map((question, index) => (
                  <div key={index} className="text-sm text-gray-600 flex items-start space-x-2">
                    <span className="text-purple-600 font-bold">{index + 1}.</span>
                    <span>{question}</span>
                  </div>
                ))}
              </div>
              
              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-900">Score</span>
                  <span className="text-green-700 font-bold">
                    {knowledgeAssessment.correctAnswers}/{knowledgeAssessment.totalQuestions}
                  </span>
                </div>
                <div className="text-sm text-green-800">{knowledgeAssessment.recommendation}</div>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
            
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Time Saved vs Traditional:</span>
                <span className="font-medium text-green-600">2 weeks</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Cost Saving per Hire:</span>
                <span className="font-medium text-blue-600">$8,000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Knowledge Retention:</span>
                <span className="font-medium text-purple-600">85%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Defect Reduction:</span>
                <span className="font-medium text-orange-600">60%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}