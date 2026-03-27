'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Brain, 
  Sparkles, 
  FileText, 
  CheckCircle, 
  ArrowRight,
  Edit3,
  Send,
  Copy,
  Wand2,
  Target,
  TrendingUp,
  Award,
  Clock,
  Code,
  Settings,
  Zap
} from 'lucide-react';

interface EnhancementOpportunity {
  defectId: string;
  defectTitle: string;
  currentQualityScore: number;
  potentialScore: number;
  currentDocumentation: string;
  enhancementSections: EnhancementSection[];
  estimatedTimeToImplement: string;
  businessValue: string;
}

interface EnhancementSection {
  title: string;
  type: 'root-cause' | 'technical-solution' | 'prevention' | 'metrics' | 'testing';
  currentContent: string;
  suggestedContent: string;
  impact: string;
  priority: 'High' | 'Medium' | 'Low';
}

export default function AIDocumentationAssistant() {
  const [selectedOpportunity, setSelectedOpportunity] = useState<string>('DEF-2850');
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['root-cause']));

  const enhancementOpportunities: EnhancementOpportunity[] = [
    {
      defectId: 'DEF-2850',
      defectTitle: 'Memory Leak in User Session Management',
      currentQualityScore: 4,
      potentialScore: 9,
      currentDocumentation: 'Fixed memory issue. Tested and works now.',
      estimatedTimeToImplement: '15 minutes',
      businessValue: 'High - Enables 50% faster resolution of memory-related issues',
      enhancementSections: [
        {
          title: 'Root Cause Analysis',
          type: 'root-cause',
          currentContent: 'No root cause documented',
          suggestedContent: 'Memory leak caused by unclosed HttpClient connections in SessionManager.java. Sessions were not being properly disposed after timeout, leading to gradual memory accumulation over 4-6 hours of operation. Heap analysis showed 2.3GB of retained HttpClient objects after 8 hours.',
          impact: 'AI can identify similar connection management issues with 85% accuracy',
          priority: 'High'
        },
        {
          title: 'Technical Solution Details',
          type: 'technical-solution',
          currentContent: 'Fixed the issue',
          suggestedContent: 'Implemented proper connection disposal in SessionManager.dispose() method. Added connection pool monitoring with max connections set to 500. Modified session cleanup logic to force disposal of HttpClient resources. Updated SessionTimeout configuration from 30 minutes to 15 minutes to reduce memory pressure.',
          impact: 'Future engineers can implement identical solution in 30 minutes vs 4+ hours',
          priority: 'High'
        },
        {
          title: 'Prevention Measures',
          type: 'prevention',
          currentContent: 'No prevention measures documented',
          suggestedContent: 'Added memory usage alerts when heap utilization exceeds 80%. Implemented connection leak detection logging in SessionManager. Added unit tests for session cleanup scenarios. Created monitoring dashboard for HttpClient connection pool metrics.',
          impact: 'Prevents 90% of similar memory leak occurrences',
          priority: 'Medium'
        },
        {
          title: 'Performance Metrics',
          type: 'metrics',
          currentContent: 'No metrics provided',
          suggestedContent: 'Before fix: Memory usage grew from 1.2GB to 4.8GB over 8 hours. After fix: Memory stable at 1.3-1.5GB range. Response time improved from 2.3s to 0.8s. Connection pool utilization reduced from 95% to 60%.',
          impact: 'Enables performance regression detection and benchmarking',
          priority: 'Medium'
        },
        {
          title: 'Testing Validation',
          type: 'testing',
          currentContent: 'Tested and works',
          suggestedContent: 'Load tested with 1000 concurrent sessions for 12 hours. Memory leak test ran for 24 hours with session creation/destruction cycles. Validated fix in staging environment with production-like load patterns. All memory and performance benchmarks passed.',
          impact: 'Provides validation framework for similar fixes',
          priority: 'Low'
        }
      ]
    },
    {
      defectId: 'DEF-2851',
      defectTitle: 'Database Connection Pool Exhaustion',
      currentQualityScore: 2,
      potentialScore: 9,
      currentDocumentation: 'Fixed connection issue. Working now.',
      estimatedTimeToImplement: '20 minutes',
      businessValue: 'Critical - Enables 40% faster resolution of database issues',
      enhancementSections: [
        {
          title: 'Root Cause Analysis',
          type: 'root-cause',
          currentContent: 'Connection issue',
          suggestedContent: 'Connection pool exhaustion caused by long-running transactions not being properly committed/rolled back in PaymentProcessor.java. Max pool size of 50 connections was insufficient during peak load (11 AM - 1 PM). Connection leak occurred in error handling paths where transactions were not closed.',
          impact: 'AI can identify database connection patterns with 92% accuracy',
          priority: 'High'
        },
        {
          title: 'Technical Solution Details',
          type: 'technical-solution',
          currentContent: 'Fixed',
          suggestedContent: 'Increased connection pool size from 50 to 100. Implemented proper try-with-resources for all database operations. Added connection timeout configuration (30 seconds). Modified PaymentProcessor to use connection pooling best practices with automatic cleanup.',
          impact: 'Provides exact implementation roadmap for similar issues',
          priority: 'High'
        }
      ]
    }
  ];

  const currentOpportunity = enhancementOpportunities.find(op => op.defectId === selectedOpportunity) || enhancementOpportunities[0];

  const toggleSection = (sectionTitle: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionTitle)) {
      newExpanded.delete(sectionTitle);
    } else {
      newExpanded.add(sectionTitle);
    }
    setExpandedSections(newExpanded);
  };

  const handleApplyAISuggestions = () => {
    alert(`AI suggestions applied for ${currentOpportunity.defectId}. Documentation quality improved from ${currentOpportunity.currentQualityScore}/10 to ${currentOpportunity.potentialScore}/10.`);
  };

  const handleCustomizeTemplate = () => {
    alert(`Documentation template customization opened for ${currentOpportunity.defectId}`);
  };

  const handleSendToDefectOwner = () => {
    alert(`Enhanced documentation sent to defect owner for ${currentOpportunity.defectId}`);
  };

  const getSectionTypeColor = (type: string) => {
    switch (type) {
      case 'root-cause': return 'text-red-600 bg-red-50 border-red-200';
      case 'technical-solution': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'prevention': return 'text-green-600 bg-green-50 border-green-200';
      case 'metrics': return 'text-purple-600 bg-purple-50 border-purple-200';
      case 'testing': return 'text-orange-600 bg-orange-50 border-orange-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getSectionIcon = (type: string) => {
    switch (type) {
      case 'root-cause': return Target;
      case 'technical-solution': return Code;
      case 'prevention': return Settings;
      case 'metrics': return TrendingUp;
      case 'testing': return CheckCircle;
      default: return FileText;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-6 text-white">
        <div className="flex items-center space-x-3 mb-4">
          <div className="bg-white/20 p-2 rounded-full">
            <Brain className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold flex items-center">
              <Sparkles className="w-6 h-6 mr-2" />
              AI Documentation Assistant
            </h2>
            <p className="text-purple-100">Improving documentation quality for better future AI matching</p>
          </div>
        </div>
        
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white/10 rounded-lg p-3">
            <div className="text-2xl font-bold">{enhancementOpportunities.length}</div>
            <div className="text-purple-100">Enhancement Opportunities</div>
          </div>
          <div className="bg-white/10 rounded-lg p-3">
            <div className="text-2xl font-bold">+4.5</div>
            <div className="text-purple-100">Avg Quality Improvement</div>
          </div>
          <div className="bg-white/10 rounded-lg p-3">
            <div className="text-2xl font-bold">18 min</div>
            <div className="text-purple-100">Avg Implementation Time</div>
          </div>
          <div className="bg-white/10 rounded-lg p-3">
            <div className="text-2xl font-bold">+45%</div>
            <div className="text-purple-100">AI Accuracy Improvement</div>
          </div>
        </div>
      </div>

      {/* Opportunity Selection */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Enhancement Opportunity</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {enhancementOpportunities.map((opportunity) => (
            <motion.button
              key={opportunity.defectId}
              onClick={() => setSelectedOpportunity(opportunity.defectId)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`text-left p-4 rounded-lg border-2 transition-all ${
                selectedOpportunity === opportunity.defectId
                  ? 'border-purple-500 bg-purple-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">
                  {opportunity.defectId}
                </span>
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-red-600 font-medium">
                    {opportunity.currentQualityScore}/10
                  </span>
                  <ArrowRight className="w-3 h-3 text-gray-400" />
                  <span className="text-xs text-green-600 font-medium">
                    {opportunity.potentialScore}/10
                  </span>
                </div>
              </div>
              <h4 className="font-medium text-gray-900 mb-1">{opportunity.defectTitle}</h4>
              <div className="text-xs text-gray-600">
                Improvement: +{opportunity.potentialScore - opportunity.currentQualityScore} points • {opportunity.estimatedTimeToImplement}
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Current Documentation */}
      <motion.div
        key={selectedOpportunity}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-lg shadow-sm border border-gray-200"
      >
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{currentOpportunity.defectTitle}</h3>
              <p className="text-gray-600 text-sm">{currentOpportunity.defectId}</p>
            </div>
            <div className="text-right">
              <div className="flex items-center space-x-2 mb-1">
                <span className="text-sm text-gray-600">Quality Score:</span>
                <span className="text-lg font-bold text-red-600">{currentOpportunity.currentQualityScore}/10</span>
                <ArrowRight className="w-4 h-4 text-gray-400" />
                <span className="text-lg font-bold text-green-600">{currentOpportunity.potentialScore}/10</span>
              </div>
              <div className="text-xs text-gray-500">{currentOpportunity.estimatedTimeToImplement} to implement</div>
            </div>
          </div>
          
          {/* Business Value */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
            <div className="flex items-center space-x-2">
              <Award className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-800">Business Value:</span>
              <span className="text-sm text-blue-700">{currentOpportunity.businessValue}</span>
            </div>
          </div>

          {/* Current Documentation */}
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <h4 className="font-medium text-red-800 mb-2 flex items-center">
              <FileText className="w-4 h-4 mr-2" />
              Current Documentation:
            </h4>
            <p className="text-red-700 text-sm italic">"{currentOpportunity.currentDocumentation}"</p>
            <div className="mt-2 text-xs text-red-600">
              Issues: No technical details • Missing root cause analysis • No prevention measures documented
            </div>
          </div>
        </div>

        {/* AI Enhancement Sections */}
        <div className="p-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Wand2 className="w-5 h-5 text-purple-600 mr-2" />
            AI Enhancement Suggestions
          </h4>
          
          <div className="space-y-4">
            {currentOpportunity.enhancementSections.map((section, index) => {
              const SectionIcon = getSectionIcon(section.type);
              const isExpanded = expandedSections.has(section.title);
              
              return (
                <motion.div
                  key={section.title}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="border border-gray-200 rounded-lg overflow-hidden"
                >
                  <button
                    onClick={() => toggleSection(section.title)}
                    className="w-full p-4 text-left hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <SectionIcon className="w-5 h-5 text-gray-600" />
                        <div>
                          <h5 className="font-medium text-gray-900">{section.title}</h5>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getSectionTypeColor(section.type)}`}>
                              {section.priority} Priority
                            </span>
                            <span className="text-xs text-gray-500">{section.impact}</span>
                          </div>
                        </div>
                      </div>
                      <motion.div
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ArrowRight className="w-4 h-4 text-gray-400" />
                      </motion.div>
                    </div>
                  </button>
                  
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="border-t border-gray-200 p-4 bg-gray-50"
                    >
                      <div className="space-y-4">
                        {/* Current Content */}
                        <div>
                          <h6 className="font-medium text-gray-700 mb-2">Current Content:</h6>
                          <div className="bg-red-50 border border-red-200 rounded p-3">
                            <p className="text-red-700 text-sm italic">
                              {section.currentContent || 'No content documented'}
                            </p>
                          </div>
                        </div>
                        
                        {/* AI Suggested Content */}
                        <div>
                          <h6 className="font-medium text-gray-700 mb-2 flex items-center">
                            <Sparkles className="w-4 h-4 text-purple-600 mr-1" />
                            AI-Enhanced Content:
                          </h6>
                          <div className="bg-green-50 border border-green-200 rounded p-3">
                            <p className="text-green-800 text-sm">{section.suggestedContent}</p>
                          </div>
                        </div>
                        
                        {/* Impact */}
                        <div className="bg-blue-50 border border-blue-200 rounded p-3">
                          <div className="flex items-center space-x-2">
                            <Zap className="w-4 h-4 text-blue-600" />
                            <span className="text-sm font-medium text-blue-800">Impact:</span>
                            <span className="text-sm text-blue-700">{section.impact}</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Enhancement Actions */}
        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <div className="flex flex-wrap gap-3">
            <button
              onClick={handleApplyAISuggestions}
              className="flex items-center space-x-2 bg-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors"
            >
              <Sparkles className="w-5 h-5" />
              <span>Apply AI Suggestions</span>
            </button>
            <button
              onClick={handleCustomizeTemplate}
              className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              <Edit3 className="w-5 h-5" />
              <span>Customize Template</span>
            </button>
            <button
              onClick={handleSendToDefectOwner}
              className="flex items-center space-x-2 bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors"
            >
              <Send className="w-5 h-5" />
              <span>Send to Defect Owner</span>
            </button>
            <button className="flex items-center space-x-2 bg-gray-200 text-gray-800 px-6 py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors">
              <Copy className="w-5 h-5" />
              <span>Copy Enhanced Documentation</span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}