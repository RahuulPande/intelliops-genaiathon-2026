// src/lib/ai/prompts/index.ts
// Central lookup for all IntelliOps AI prompt builders.
// Each builder accepts a context record and returns { system, user } strings.

import { buildPrompt as incidentRca } from './incident-rca';
import { buildPrompt as requirementAnalysis } from './requirement-analysis';
import { buildPrompt as prAnalysis } from './pr-analysis';
import { buildPrompt as securityScan } from './security-scan';
import { buildPrompt as testResultAnalysis } from './test-result-analysis';
import { buildPrompt as defectPatterns } from './defect-patterns';
import { buildPrompt as coverageGaps } from './coverage-gaps';
import { buildPrompt as releaseRisk } from './release-risk';
import { buildPrompt as cabPackage } from './cab-package';
import { buildPrompt as riskAssessment } from './risk-assessment';
import { buildPrompt as testCaseGeneration } from './test-case-generation';
import { buildPrompt as traceability } from './traceability';
import { buildPrompt as learningExtraction } from './learning-extraction';
import { buildPrompt as knowledgeSynthesis } from './knowledge-synthesis';
import { buildPrompt as testPrioritization } from './test-prioritization';
import { buildPrompt as flakyTestDetection } from './flaky-test-detection';
import { buildPrompt as testGapAnalysis } from './test-gap-analysis';
import { buildPrompt as failureRootCauseCluster } from './failure-root-cause-cluster';
import { buildPrompt as releaseReadiness } from './release-readiness';
import { buildPrompt as smartFailureTriage } from './smart-failure-triage';

export type PromptBuilder = (context: Record<string, unknown>) => { system: string; user: string };

export const promptBuilders: Record<string, PromptBuilder> = {
  incident_rca: incidentRca,
  requirement_analysis: requirementAnalysis,
  pr_analysis: prAnalysis,
  pr_security_scan: securityScan,
  test_result_analysis: testResultAnalysis,
  defect_pattern_analysis: defectPatterns,
  coverage_gap_analysis: coverageGaps,
  release_risk_assessment: releaseRisk,
  cab_package_generation: cabPackage,
  risk_assessment: riskAssessment,
  test_case_generation: testCaseGeneration,
  traceability_analysis: traceability,
  learning_extraction: learningExtraction,
  knowledge_synthesis: knowledgeSynthesis,
  test_prioritization: testPrioritization,
  flaky_test_detection: flakyTestDetection,
  test_gap_analysis: testGapAnalysis,
  failure_root_cause_cluster: failureRootCauseCluster,
  release_readiness: releaseReadiness,
  smart_failure_triage: smartFailureTriage,
};
