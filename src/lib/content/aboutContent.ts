// ── About Tab Content for All 4 Pillars ────────────────────
// Single source of truth for the structured "About" tab content
// displayed in each pillar page.

export interface FeatureAboutData {
  pillarName: string;
  pillarColor: string;
  overview: string;
  aiTechniques: { name: string; description: string }[];
  capabilities: {
    name: string;
    howItWorks: string;
    prerequisites: string;
    realWorldUsage: string;
    expectedBenefits: string;
  }[];
  integrationRequirements: string[];
  setupTime: string;
  prototypeStatus: string;
  differentiators: string;
}

// ── Defect Intelligence ─────────────────────────────────────

export const defectIntelligenceAbout: FeatureAboutData = {
  pillarName: 'Defect Intelligence',
  pillarColor: 'purple',
  overview:
    'Defect Intelligence uses RAG (Retrieval-Augmented Generation) to match new defects against historical patterns with 96% accuracy. Instead of manual searching through documentation and tribal knowledge, the AI instantly finds similar past defects with proven resolutions — reducing mean time to resolution from 6+ hours to under 45 minutes.',
  aiTechniques: [
    {
      name: 'RAG',
      description:
        'Retrieves relevant historical defects from a vector-indexed knowledge base and generates contextual resolution recommendations.',
    },
    {
      name: 'ML',
      description:
        'Pattern recognition across defect categories, modules, and severity trends.',
    },
    {
      name: 'NLP',
      description:
        'Natural language understanding of defect descriptions, error messages, and resolution notes.',
    },
    {
      name: 'LLM',
      description:
        'Generates human-readable resolution recommendations and documentation quality assessments.',
    },
  ],
  capabilities: [
    {
      name: 'AI Defect Matching',
      howItWorks:
        'When a new defect is reported, the system encodes its description into a vector embedding and searches the historical defect knowledge base for semantically similar entries. It returns matches ranked by similarity score with their resolution history.',
      prerequisites:
        'Historical defect database with at least 6 months of data (defect descriptions, resolutions, affected modules). Integration with defect tracking tool (Jira, ServiceNow, Azure DevOps).',
      realWorldUsage:
        'A tester reports a new payment gateway timeout defect. Within seconds, IntelliOps surfaces 3 similar past defects, showing that the last time this happened, the fix was increasing the connection pool from 10 to 25. The developer applies the fix in minutes instead of hours.',
      expectedBenefits:
        '87% reduction in defect resolution time. Fewer escalations. Preserved institutional knowledge even when team members leave.',
    },
    {
      name: 'Test Re-execution Monitor',
      howItWorks:
        'After a defect is resolved, the system identifies which test cases need to be re-executed to verify the fix and checks for regression impacts across related modules.',
      prerequisites:
        'Linked test case management system. Defect-to-test traceability mapping.',
      realWorldUsage:
        'After fixing a payment timeout defect, IntelliOps automatically identifies 12 related test cases across 3 modules that should be re-run to verify the fix didn\'t break anything.',
      expectedBenefits:
        'Prevents missed regression testing. Ensures defect fixes are properly validated.',
    },
    {
      name: 'Documentation Quality Analysis',
      howItWorks:
        'LLM analyzes defect reports for completeness — checking for steps to reproduce, expected vs actual results, environment details, and severity justification.',
      prerequisites:
        'Access to defect tracking system. Defined quality criteria for defect documentation.',
      realWorldUsage:
        'When a defect report is submitted with only "login doesn\'t work" as the description, IntelliOps flags it as incomplete and suggests adding: environment, browser version, specific error message, and steps to reproduce.',
      expectedBenefits:
        'Higher quality defect reports lead to faster resolution. Fewer back-and-forth clarification cycles.',
    },
    {
      name: 'Solution Recommendations',
      howItWorks:
        'RAG retrieves relevant past resolutions and LLM generates contextual fix recommendations based on the specific defect context, affected module, and technology stack.',
      prerequisites:
        'Historical resolution data. Knowledge base of past fixes and their outcomes.',
      realWorldUsage:
        'For a recurring database connection issue, IntelliOps recommends the specific configuration change that resolved it last time, including the exact file and parameter to modify.',
      expectedBenefits:
        'Faster fixes, especially for recurring issues. Junior developers can resolve issues that previously required senior expertise.',
    },
    {
      name: 'Defect Analytics & Patterns',
      howItWorks:
        'ML analyzes defect trends across modules, sprints, and teams to identify systemic patterns — modules with rising defect rates, recurring defect categories, and seasonal patterns.',
      prerequisites:
        '3+ months of defect data with module, severity, and date fields.',
      realWorldUsage:
        'IntelliOps identifies that the Payment module has had a 40% increase in defects over the last 3 sprints, correlating with a recent refactoring initiative — suggesting the refactoring introduced instability.',
      expectedBenefits:
        'Proactive identification of quality hotspots. Data-driven decisions about where to invest in code quality.',
    },
    {
      name: 'Historical Analysis & Predictions',
      howItWorks:
        'ML models trained on historical defect data predict future defect volumes, likely problem areas, and resource needs for upcoming sprints.',
      prerequisites:
        '6+ months of historical defect data with consistent categorization.',
      realWorldUsage:
        'Before sprint planning, IntelliOps predicts "Based on current velocity and code change patterns, expect 8-12 defects in the next sprint, primarily in the Authentication module."',
      expectedBenefits:
        'Better sprint planning. Proactive resource allocation to high-risk areas.',
    },
  ],
  integrationRequirements: [
    'Defect tracking system (Jira, ServiceNow, Azure DevOps) — primary data source',
    'Version control (GitHub, GitLab, Bitbucket) — for correlating defects with code changes',
    'Test management tool — for linking defects to test cases',
  ],
  setupTime: '2-4 hours for initial connector configuration, 1-2 weeks for knowledge base population',
  prototypeStatus:
    'In this demo, defect data is simulated based on patterns from real banking delivery projects. The RAG matching algorithm demonstrates the concept using pre-indexed mock data. In production, this would connect to your Jira/ServiceNow instance and build its knowledge base from your actual defect history.',
  differentiators:
    'Unlike traditional defect tracking tools that only store defects, IntelliOps turns every past defect into a learning asset. The RAG approach means the system gets smarter with every resolved defect — new team members benefit from the entire organization\'s defect resolution history.',
};

// ── Test Intelligence ───────────────────────────────────────

export const testIntelligenceAbout: FeatureAboutData = {
  pillarName: 'Test Intelligence',
  pillarColor: 'purple',
  overview:
    'Test Intelligence transforms traditional reactive test management into AI-powered predictive testing. Instead of running all tests and hoping for the best, IntelliOps prioritizes tests by risk, detects flaky tests automatically, finds coverage gaps, clusters failures by root cause, predicts release readiness, and triages failures with resolution suggestions — all powered by 6 AI capabilities.',
  aiTechniques: [
    {
      name: 'ML',
      description:
        'Risk-based test prioritization, flaky test pattern detection, release readiness prediction.',
    },
    {
      name: 'RAG',
      description:
        'Test gap analysis against requirements, failure triage matching against defect knowledge base.',
    },
    {
      name: 'NLP',
      description: 'Failure message analysis for root cause clustering.',
    },
    {
      name: 'LLM',
      description:
        'Resolution suggestion generation, coverage gap descriptions.',
    },
  ],
  capabilities: [
    {
      name: 'Smart Test Prioritization',
      howItWorks:
        'ML model analyzes code change impact, historical defect density per module, and test failure probability to rank tests by risk score. Tests most likely to catch bugs are ranked highest.',
      prerequisites:
        'Test execution history (6+ months), code change data from version control, defect history per module.',
      realWorldUsage:
        'Before a release, instead of running all 235 tests (4+ hours), the team runs the top 47 high-risk tests first (45 minutes). These catch 82% of potential bugs, giving fast feedback while remaining tests run in parallel.',
      expectedBenefits:
        '3.2 hours saved per test cycle. Faster feedback on critical paths. More efficient use of limited testing time windows.',
    },
    {
      name: 'Flaky Test Detection',
      howItWorks:
        'ML analyzes pass/fail patterns per test across multiple runs. Tests that fail inconsistently without corresponding code changes are flagged with a flakiness score (0-100%). Tests scoring above 70% are recommended for quarantine.',
      prerequisites:
        'Test execution history with pass/fail results across multiple runs. CI/CD pipeline integration.',
      realWorldUsage:
        'The system identifies that UI_Render_Dashboard has an 89% flakiness score — it fails roughly every other run due to CSS animation timing dependencies. It\'s quarantined so it doesn\'t block releases while the team schedules a fix.',
      expectedBenefits:
        '2.1 hours/sprint saved in false triage. Fewer blocked release pipelines. Clear visibility into test suite health.',
    },
    {
      name: 'Test Gap Analysis',
      howItWorks:
        'RAG compares requirement descriptions against existing test case descriptions using semantic similarity (not just keyword matching). Identifies requirements with no corresponding tests or only partial coverage.',
      prerequisites:
        'Requirements in a trackable system (Jira, Azure DevOps). Test cases linked or mappable to requirements.',
      realWorldUsage:
        'IntelliOps identifies that the "Payment reconciliation workflow" has 3 acceptance criteria with zero test cases. The module had 5 defects last quarter — this is a HIGH risk gap that should be addressed before the next release.',
      expectedBenefits:
        'Targeted test creation for highest-risk gaps. Reduced post-release defects in untested areas. Data-driven coverage improvement.',
    },
    {
      name: 'Failure Root Cause Clustering',
      howItWorks:
        'NLP analyzes failure messages, stack traces, and error patterns across all failed tests. ML clusters failures that share the same underlying root cause, even if they appear in different test suites.',
      prerequisites:
        'Test execution results with failure details (error messages, stack traces). Recent deployment/change data.',
      realWorldUsage:
        'After a deployment, 12 tests fail across 4 different suites. Instead of investigating each one separately, IntelliOps groups them into 2 clusters: 8 failures caused by auth service connection pool exhaustion, and 4 caused by stale test data. The team fixes 2 issues instead of investigating 12.',
      expectedBenefits:
        'Dramatic reduction in failure investigation time. Faster root cause identification. Clear action items instead of overwhelming failure lists.',
    },
    {
      name: 'Release Readiness Prediction',
      howItWorks:
        'ML model evaluates current test pass rates, coverage of critical paths, historical release outcomes with similar test patterns, and open blocking issues to predict release confidence as a percentage.',
      prerequisites:
        'Historical release data (pass/fail rates at release time, post-release defect counts). Current test execution progress. Defined critical test paths.',
      realWorldUsage:
        'At 60% test completion, IntelliOps predicts 82% release confidence with a "CONDITIONAL GO" recommendation. It notes that Payment module has 2 critical tests pending and a flaky auth test is quarantined. Historical releases with this pattern had 94% success rate (47/50).',
      expectedBenefits:
        'Faster release decisions without waiting for 100% test completion. Data-driven go/no-go instead of gut feel. Reduced time in release review meetings.',
    },
    {
      name: 'Smart Failure Triage',
      howItWorks:
        'When a test fails, LLM analyzes the error and RAG searches the defect knowledge base for similar past failures. It suggests resolutions based on how similar defects were resolved and routes the issue to the appropriate developer team based on code ownership.',
      prerequisites:
        'Defect knowledge base (populated through Defect Intelligence pillar). Code ownership mapping. Team routing rules.',
      realWorldUsage:
        'Payment_Checkout_E2E fails with "503 Service Unavailable." IntelliOps finds a 92% match to DEF-1247 (resolved 3 weeks ago by increasing connection pool). Suggested action: check if pool config was reverted. Routes to @dev-payment-team.',
      expectedBenefits:
        'Instant context for every failure. Junior testers can triage issues that previously required senior expertise. Connects test failures to the defect intelligence knowledge base.',
    },
  ],
  integrationRequirements: [
    'CI/CD pipeline (Jenkins, GitHub Actions, GitLab CI) — for test execution data',
    'Test management tool — for test case inventory',
    'Version control (GitHub, GitLab) — for code change correlation',
    'Defect tracking system — for defect-to-test linking',
  ],
  setupTime: '3-5 hours for connector configuration, 2-4 weeks for model training on historical data',
  prototypeStatus:
    'In this demo, test data is simulated based on patterns from real enterprise banking projects. The AI analysis panels demonstrate the concepts using pre-loaded mock data. The "Analyze" buttons trigger real AI analysis (or simulated fallback) to show how each capability works. In production, this would connect to your CI/CD pipeline and test management tools.',
  differentiators:
    'Traditional test management tools track what happened. IntelliOps predicts what will happen. The 6 AI capabilities work together — flaky test detection feeds into release readiness prediction, failure clustering connects to smart triage, and gap analysis informs test prioritization. This integrated intelligence loop means the system gets smarter with every test cycle.',
};

// ── Release Intelligence ────────────────────────────────────

export const releaseIntelligenceAbout: FeatureAboutData = {
  pillarName: 'Release Intelligence',
  pillarColor: 'blue',
  overview:
    'Release Intelligence provides AI-powered release orchestration that prevents costly deployment issues and ensures seamless delivery. From intelligent branch tracking to automated merge conflict prevention and AI-scored deployment risk, it replaces manual gut-feel release decisions with data-driven confidence.',
  aiTechniques: [
    {
      name: 'ML',
      description:
        'Release risk scoring, deployment success prediction, branch conflict probability.',
    },
    {
      name: 'NLP',
      description:
        'Change impact analysis from commit messages and PR descriptions.',
    },
    {
      name: 'RAG',
      description:
        'Historical release pattern matching for risk assessment.',
    },
  ],
  capabilities: [
    {
      name: 'AI Release Health Score',
      howItWorks:
        'ML model evaluates multiple factors — code change volume, test pass rates, open defects, branch complexity, and dependency changes — to produce a composite health score (0-100) and a go/no-go recommendation.',
      prerequisites:
        'Version control data, test execution results, defect tracking data. Historical release outcomes for model training.',
      realWorldUsage:
        'Before a release review meeting, the engineering manager checks IntelliOps and sees a health score of 87.3 with a "CONDITIONAL GO" recommendation. Two specific risk factors are flagged: a large PR in the payment module and an unresolved medium-severity defect.',
      expectedBenefits:
        'Objective, data-driven release decisions. Reduced release review meeting time. Earlier identification of release risks.',
    },
    {
      name: 'Branch Intelligence',
      howItWorks:
        'AI monitors branch lifecycles, detects potential merge conflicts before they happen, identifies missing merges across release branches, and tracks branch consistency across environments.',
      prerequisites:
        'Git repository access. Branch naming conventions. Multi-branch release workflow.',
      realWorldUsage:
        'A developer fixes a critical defect for the August release but forgets to merge it to the October branch. IntelliOps detects the missing merge and alerts the team before the October release goes out with the same defect.',
      expectedBenefits:
        'Prevents the "$45,000 merge problem" — costly production defects from missing cross-branch merges. Automated branch hygiene monitoring.',
    },
    {
      name: 'Release Analytics',
      howItWorks:
        'ML analyzes release performance trends — deployment frequency, lead time, failure rates, and recovery time — to provide insights and forecasts.',
      prerequisites:
        'Deployment pipeline data. Release history with outcomes. Incident data linked to releases.',
      realWorldUsage:
        'IntelliOps identifies that releases deployed on Fridays have a 3x higher incident rate than mid-week releases, and that releases with more than 50 PRs have a 40% higher rollback rate.',
      expectedBenefits:
        'Data-driven release scheduling. Evidence-based decisions about release scope and timing.',
    },
  ],
  integrationRequirements: [
    'Version control (GitHub, GitLab, Bitbucket) — primary data source',
    'CI/CD pipeline — for deployment data and status',
    'Incident management tool (ServiceNow, PagerDuty) — for post-release incident correlation',
  ],
  setupTime: '2-3 hours for connector configuration',
  prototypeStatus:
    'In this demo, release data is simulated based on patterns from real banking delivery projects. The AI health score demonstrates the concept using pre-configured risk factors. In production, this would connect to your Git repositories and CI/CD pipelines to provide real-time release intelligence.',
  differentiators:
    'Most release tools focus on automation (deploying code). IntelliOps focuses on intelligence (should you deploy this code?). The AI health score considers factors that no human can consistently evaluate — the interaction between code change scope, test coverage gaps, open defects, and historical patterns for similar releases.',
};

// ── Knowledge Base ──────────────────────────────────────────

export const knowledgeBaseAbout: FeatureAboutData = {
  pillarName: 'Knowledge Base',
  pillarColor: 'teal',
  overview:
    'Knowledge Base uses RAG and LLM to automatically build and maintain an application knowledge base from your defect history. Every defect, incident, and resolution becomes a learning asset that helps new team members ramp up faster and prevents the organization from losing critical knowledge when experienced developers leave.',
  aiTechniques: [
    {
      name: 'RAG',
      description:
        'Retrieves relevant knowledge from indexed defect history, incident logs, and resolution data.',
    },
    {
      name: 'LLM',
      description:
        'Generates structured knowledge articles, module guides, and learning paths from raw data.',
    },
    {
      name: 'ML',
      description:
        'Pattern recognition across defect categories and module expertise requirements.',
    },
  ],
  capabilities: [
    {
      name: 'Module Intelligence',
      howItWorks:
        'AI analyzes all defects, incidents, and resolutions per application module to build a comprehensive knowledge profile — common issues, root causes, proven fixes, dependencies, and code health indicators.',
      prerequisites:
        'Defect data with module/component tagging. 6+ months of history for meaningful patterns.',
      realWorldUsage:
        'A new developer assigned to the Payment Gateway module can read a comprehensive AI-generated guide covering: the top 5 recurring issues, how they were resolved, key dependencies, and common pitfalls — knowledge that previously existed only in a senior developer\'s head.',
      expectedBenefits:
        '40% faster developer onboarding. Preserved institutional knowledge. Reduced dependency on specific individuals.',
    },
    {
      name: 'Common Issue Patterns',
      howItWorks:
        'ML identifies recurring defect patterns across the application — issue types that appear repeatedly, modules with systemic quality problems, and seasonal/cyclical patterns.',
      prerequisites:
        'Defect history with categorization. Consistent module/component tagging.',
      realWorldUsage:
        'IntelliOps identifies that connection pool exhaustion issues have occurred 7 times across 3 modules in the last 12 months, always after deployments that increase concurrent user capacity. It generates a prevention checklist for any future capacity-related deployment.',
      expectedBenefits:
        'Breaking recurring defect cycles. Proactive prevention instead of reactive fixes.',
    },
    {
      name: 'New Joiner Guide',
      howItWorks:
        'LLM generates personalized onboarding guides based on the team/module a new developer is joining. The guide includes: module overview, common issues to watch for, key contacts, and recommended learning sequence.',
      prerequisites:
        'Module intelligence data (built automatically from defect/incident history). Team/module assignment information.',
      realWorldUsage:
        'A new developer joining the Authentication team receives an AI-curated guide covering: the auth module\'s architecture, the 3 most common auth-related defects, how token refresh works, and the testing strategy for auth flows.',
      expectedBenefits:
        'Onboarding time reduced from 5 weeks to 3 weeks. $8K savings per hire. New developers become productive faster.',
    },
    {
      name: 'Knowledge Analytics',
      howItWorks:
        'Tracks knowledge base usage, identifies gaps in documentation, and measures the impact of knowledge-driven improvements on defect resolution times and onboarding effectiveness.',
      prerequisites:
        'Knowledge base in use. Usage tracking enabled.',
      realWorldUsage:
        'Analytics show that the Payment module knowledge articles are accessed 15 times/month and have reduced average resolution time for payment-related defects by 62%. The Authentication module has low knowledge coverage — flagged for improvement.',
      expectedBenefits:
        'Evidence-based investment in knowledge management. Measurable ROI on knowledge initiatives.',
    },
  ],
  integrationRequirements: [
    'Defect tracking system (Jira, ServiceNow) — primary data source for building knowledge',
    'Incident management tool — for operational knowledge',
    'Version control — for code context',
  ],
  setupTime: '2-3 hours for connector configuration, 2-4 weeks for initial knowledge base generation',
  prototypeStatus:
    'In this demo, the knowledge base is pre-populated with simulated data modeled on patterns from real banking projects (3,247 defects across 89 modules over 5 years). In production, the knowledge base would be built automatically from your actual defect and incident history, growing smarter with every resolved issue.',
  differentiators:
    'Traditional knowledge management requires someone to manually write and maintain documentation — a task that rarely gets prioritized. IntelliOps builds the knowledge base automatically from data that already exists (defects, incidents, resolutions). The knowledge base is always current because it updates with every new defect resolution.',
};
