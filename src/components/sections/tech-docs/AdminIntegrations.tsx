'use client';

import { motion } from 'framer-motion';
import { CheckCircle, Database, GitBranch, TestTube, AlertCircle, Users } from 'lucide-react';

interface Integration {
  name: string;
  version: string;
  requirements: string[];
  icon: any;
}

interface IntegrationGroup {
  title: string;
  color: 'green' | 'blue' | 'amber' | 'purple' | 'teal';
  icon: any;
  integrations: Integration[];
}

const integrationGroups: IntegrationGroup[] = [
  {
    title: 'Planning & Requirements (L0 PLAN)',
    color: 'green',
    icon: Database,
    integrations: [
      { name: 'Jira Cloud', version: 'API v3', requirements: ['API token', 'Project access', 'Webhook permissions'], icon: Database },
      { name: 'Jira Server', version: 'API v2', requirements: ['Admin account', 'REST API enabled', 'SSL certificate'], icon: Database },
      { name: 'Azure DevOps', version: 'REST API v7', requirements: ['PAT token', 'Project access', 'Work items read'], icon: Database },
      { name: 'Confluence', version: 'API v3', requirements: ['API token', 'Space access', 'Content permissions'], icon: Database },
      { name: 'Linear', version: 'GraphQL API', requirements: ['API key', 'Team access', 'Issue read permissions'], icon: Database }
    ]
  },
  {
    title: 'Source Control & CI/CD (L1 BUILD + L3 RELEASE)',
    color: 'blue',
    icon: GitBranch,
    integrations: [
      { name: 'GitHub', version: 'API v3/GraphQL', requirements: ['OAuth token', 'Repo webhooks', 'Commit access'], icon: GitBranch },
      { name: 'GitLab', version: 'API v4', requirements: ['Personal access token', 'Webhook setup', 'Push access'], icon: GitBranch },
      { name: 'Bitbucket', version: 'Cloud API', requirements: ['App password', 'Repo permissions', 'Webhook access'], icon: GitBranch },
      { name: 'Jenkins', version: 'REST API 2.0', requirements: ['API token', 'Build job read access', 'Log streaming'], icon: GitBranch },
      { name: 'ArgoCD', version: 'API v1', requirements: ['Auth token', 'App read access', 'Sync permissions'], icon: GitBranch },
      { name: 'GitHub Actions', version: 'API v3', requirements: ['Workflow tokens', 'Run history access', 'Artifact read'], icon: GitBranch }
    ]
  },
  {
    title: 'Testing & Quality (L2 TEST)',
    color: 'amber',
    icon: TestTube,
    integrations: [
      { name: 'TestRail', version: 'API v2', requirements: ['API key', 'Project access', 'Test result read'], icon: TestTube },
      { name: 'Xray', version: 'Cloud API', requirements: ['API token', 'Test execution rights', 'Result permissions'], icon: TestTube },
      { name: 'Playwright', version: 'Trace API', requirements: ['Trace files access', 'Reporter API', 'Step results'], icon: TestTube },
      { name: 'Selenium', version: 'Grid 4+', requirements: ['Grid hub URL', 'Session logging', 'Log file access'], icon: TestTube }
    ]
  },
  {
    title: 'Monitoring & Incident Management (L4 OPERATE)',
    color: 'purple',
    icon: AlertCircle,
    integrations: [
      { name: 'Splunk', version: 'REST API 9.0+', requirements: ['API token', 'Search permissions', 'Saved search access'], icon: AlertCircle },
      { name: 'Datadog', version: 'API v1/v2', requirements: ['API + App keys', 'Log read access', 'Metrics query'], icon: AlertCircle },
      { name: 'Grafana', version: 'API v1', requirements: ['Service account token', 'Dashboard read', 'Alert rule access'], icon: AlertCircle },
      { name: 'ServiceNow', version: 'REST API', requirements: ['Service account', 'Incident table access', 'CMDB read'], icon: AlertCircle },
      { name: 'PagerDuty', version: 'REST API v2', requirements: ['API token', 'Incident read', 'Event rule creation'], icon: AlertCircle },
      { name: 'Opsgenie', version: 'REST API', requirements: ['API key', 'Incident access', 'Alert permissions'], icon: AlertCircle }
    ]
  },
  {
    title: 'Communication & Collaboration',
    color: 'teal',
    icon: Users,
    integrations: [
      { name: 'Slack Enterprise', version: 'API v1/Bot API', requirements: ['Bot token', 'Channel access', 'Message permissions'], icon: Users },
      { name: 'Microsoft Teams', version: 'Graph API v1.0', requirements: ['App token', 'Channel read', 'Message permissions'], icon: Users }
    ]
  }
];

const colorConfig = {
  green: { bg: 'bg-green-50 dark:bg-green-900/20', border: 'border-green-200 dark:border-green-800', badge: 'bg-green-600 text-white' },
  blue: { bg: 'bg-blue-50 dark:bg-blue-900/20', border: 'border-blue-200 dark:border-blue-800', badge: 'bg-blue-600 text-white' },
  amber: { bg: 'bg-amber-50 dark:bg-amber-900/20', border: 'border-amber-200 dark:border-amber-800', badge: 'bg-amber-600 text-white' },
  purple: { bg: 'bg-purple-50 dark:bg-purple-900/20', border: 'border-purple-200 dark:border-purple-800', badge: 'bg-purple-600 text-white' },
  teal: { bg: 'bg-teal-50 dark:bg-teal-900/20', border: 'border-teal-200 dark:border-teal-800', badge: 'bg-teal-600 text-white' }
};

export default function AdminIntegrations() {
  return (
    <div className="space-y-6">
      {integrationGroups.map((group, gidx) => {
        const config = colorConfig[group.color];
        return (
          <motion.div
            key={group.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: gidx * 0.1 }}
            className={`border ${config.border} ${config.bg} rounded-lg p-6`}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className={`${config.badge} text-xs font-bold px-2 py-1 rounded`}>
                {group.title.split('(')[1]?.replace(')', '') || group.title}
              </span>
              <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                {group.title}
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {group.integrations.map((integration, iidx) => (
                <motion.div
                  key={integration.name}
                  whileHover={{ scale: 1.02 }}
                  className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4"
                >
                  <div className="flex items-start gap-3 mb-2">
                    <group.icon className="w-5 h-5 text-gray-600 dark:text-gray-400 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900 dark:text-white text-sm">
                        {integration.name}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {integration.version}
                      </p>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase mb-2">
                      Requirements
                    </p>
                    <ul className="space-y-1">
                      {integration.requirements.map((req, ridx) => (
                        <li key={ridx} className="flex items-center gap-2 text-xs text-gray-700 dark:text-gray-300">
                          <CheckCircle className="w-3 h-3 text-gray-400 dark:text-gray-600 flex-shrink-0" />
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
