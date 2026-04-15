// ============================================================================
// IntelliOps AI — Security Analysis Mock Data (BUILD Layer)
// Provides security scan results per PR for the Security Intelligence feature
// AI Techniques: LLM (reasoning), RAG (CWE/CVE pattern matching), ML (severity scoring), NLP (code parsing)
// ============================================================================

import { SecurityAnalysisResult } from '@/lib/types/securityIntelligence';

// ─── PR-1247: Payment Gateway — CRITICAL Risk ────────────────────────────────

const paymentGatewaySecurity: SecurityAnalysisResult = {
  prId: 'PR-1247',
  analyzedAt: '2026-03-24T10:42:00Z',
  analysisTimeMs: 3847,
  overallSecurityScore: 45,
  securityGrade: 'D',
  findings: [
    {
      id: 'sec-1247-001',
      type: 'insecure_configuration',
      severity: 'critical',
      title: 'Hardcoded timeout constant exceeds safe threshold',
      description:
        'The new PaymentTimeoutConfig sets HARD_LIMIT_MS to a static 30000ms value embedded in source code. Under adversarial or degraded conditions, this ceiling is exploitable to exhaust connection pool resources, causing denial-of-service to downstream checkout flows (CWE-400: Uncontrolled Resource Consumption).',
      file: 'src/services/payment-gateway/timeout-handler.ts',
      lineRange: { start: 42, end: 58 },
      cweId: 'CWE-400',
      owaspCategory: 'A05:2021 – Security Misconfiguration',
      recommendation:
        'Externalize timeout limits to environment-specific configuration with validated upper bounds. Add runtime assertions that reject values above the safe ceiling defined in the threat model.',
      codeSnippet:
        'const HARD_LIMIT_MS = 30000; // TODO: move to config\nconst config: PaymentTimeoutConfig = {\n  standard: 5000,\n  premium: 15000,\n  hardLimit: HARD_LIMIT_MS,\n};',
      fixSuggestion:
        'const HARD_LIMIT_MS = parseInt(process.env.PAYMENT_TIMEOUT_HARD_LIMIT ?? "30000", 10);\nif (HARD_LIMIT_MS > 45000) throw new Error("Timeout hard limit exceeds safe ceiling");',
      confidence: 0.91,
      isNewInThisPR: true,
      autoFixable: false,
    },
    {
      id: 'sec-1247-002',
      type: 'data_exposure',
      severity: 'high',
      title: 'Payment transaction amounts logged at INFO level',
      description:
        'The retry handler logs full payment context including transaction amount, card BIN prefix, and merchant ID at INFO level on each retry attempt. This violates PCI-DSS Requirement 3.4 by persisting cardholder-adjacent data in application logs, which are often shipped to centralised log aggregators without field-level redaction (CWE-532: Insertion of Sensitive Information into Log File).',
      file: 'src/services/payment-gateway/retry-handler.ts',
      lineRange: { start: 87, end: 104 },
      cweId: 'CWE-532',
      owaspCategory: 'A09:2021 – Security Logging and Monitoring Failures',
      recommendation:
        'Redact sensitive fields before logging. Replace transaction amounts and BIN data with tokenised references. Enforce a log sanitiser at the service boundary.',
      codeSnippet:
        'logger.info("Retry attempt", {\n  transactionId,\n  amount: payload.amount,\n  cardBin: payload.cardDetails.bin,\n  merchantId: payload.merchantId,\n  attempt,\n});',
      fixSuggestion:
        'logger.info("Retry attempt", {\n  transactionId,\n  amountCurrency: payload.currency,\n  merchantId: maskId(payload.merchantId),\n  attempt,\n});',
      confidence: 0.94,
      isNewInThisPR: true,
      autoFixable: false,
    },
    {
      id: 'sec-1247-003',
      type: 'insecure_configuration',
      severity: 'high',
      title: 'Retry backoff does not implement exponential delay',
      description:
        'The new retry logic uses a fixed 500ms delay between attempts regardless of failure count. Without exponential backoff, a sustained gateway outage will cause the payment service to hammer the downstream API with requests at a constant rate, amplifying the cascade and potentially triggering rate-limit lockout for all customers (CWE-770: Allocation of Resources Without Limits or Throttling).',
      file: 'src/services/payment-gateway/retry-handler.ts',
      lineRange: { start: 112, end: 131 },
      cweId: 'CWE-770',
      owaspCategory: 'A05:2021 – Security Misconfiguration',
      recommendation:
        'Replace the fixed delay with exponential backoff with jitter: delay = min(cap, base * 2^attempt) + random(0, jitter). Cap retries at 3 attempts for payment-critical paths.',
      codeSnippet:
        'for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {\n  await sleep(RETRY_DELAY_MS); // fixed 500ms\n  const result = await callPaymentGateway(payload);\n  if (result.success) return result;\n}',
      fixSuggestion:
        'const backoff = (attempt: number) =>\n  Math.min(30000, 500 * Math.pow(2, attempt)) + Math.random() * 200;\nfor (let attempt = 0; attempt < MAX_RETRIES; attempt++) {\n  await sleep(backoff(attempt));\n  const result = await callPaymentGateway(payload);\n  if (result.success) return result;\n}',
      confidence: 0.88,
      isNewInThisPR: true,
      autoFixable: true,
    },
    {
      id: 'sec-1247-004',
      type: 'data_exposure',
      severity: 'medium',
      title: 'Circuit breaker state exposed in health endpoint response',
      description:
        'The CircuitBreaker class registers its internal state (open/closed/half-open) and failure counters in the /health endpoint response. This exposes topology and failure thresholds to unauthenticated callers, enabling targeted timing attacks against the payment service (CWE-209: Generation of Error Message Containing Sensitive Information).',
      file: 'src/services/payment-gateway/circuit-breaker.ts',
      lineRange: { start: 201, end: 218 },
      cweId: 'CWE-209',
      owaspCategory: 'A01:2021 – Broken Access Control',
      recommendation:
        'Restrict circuit breaker state to authenticated internal health checks only. Remove failure counts from the public /health response. Expose only a boolean healthy flag externally.',
      codeSnippet:
        'app.get("/health", (req, res) => {\n  res.json({\n    status: "ok",\n    circuitBreaker: circuitBreaker.getState(),\n    failureCount: circuitBreaker.failureCount,\n    lastFailure: circuitBreaker.lastFailureTimestamp,\n  });\n});',
      fixSuggestion:
        'app.get("/health", (req, res) => {\n  res.json({ status: circuitBreaker.isHealthy() ? "ok" : "degraded" });\n});\napp.get("/internal/health", requireInternalAuth, (req, res) => {\n  res.json(circuitBreaker.getDetailedState());\n});',
      confidence: 0.82,
      isNewInThisPR: true,
      autoFixable: false,
    },
    {
      id: 'sec-1247-005',
      type: 'insufficient_logging',
      severity: 'low',
      title: 'Missing Content-Security-Policy header on payment callback route',
      description:
        'The new payment callback route does not set a Content-Security-Policy header. While not directly exploitable in isolation, the absence of CSP on payment-adjacent routes violates PCI-DSS Requirement 6.4.3 and increases residual risk if XSS is introduced in a future change (CWE-1021: Improper Restriction of Rendered UI Layers or Frames).',
      file: 'src/routes/payment-gateway/callback.ts',
      lineRange: { start: 14, end: 22 },
      cweId: 'CWE-1021',
      owaspCategory: 'A05:2021 – Security Misconfiguration',
      recommendation:
        "Add a strict CSP header to all payment-adjacent routes: Content-Security-Policy: default-src 'none'; frame-ancestors 'none';",
      codeSnippet:
        "router.post('/callback', async (req, res) => {\n  // No security headers set\n  const result = await processCallback(req.body);\n  res.json(result);\n});",
      fixSuggestion:
        "router.post('/callback', setSecurityHeaders, async (req, res) => {\n  const result = await processCallback(req.body);\n  res.json(result);\n});\n// middleware: res.setHeader('Content-Security-Policy', \"default-src 'none'; frame-ancestors 'none';\");",
      confidence: 0.76,
      isNewInThisPR: true,
      autoFixable: true,
    },
  ],
  summary: {
    critical: 1,
    high: 2,
    medium: 1,
    low: 1,
    info: 0,
    total: 5,
    newInThisPR: 5,
    preExisting: 0,
  },
  complianceFlags: {
    pciDssRelevant: true,
    gdprRelevant: false,
    soxRelevant: true,
    details: [
      'PCI-DSS Req 3.4: Sensitive authentication data in logs (sec-1247-002)',
      'PCI-DSS Req 6.4.3: Missing CSP header on payment route (sec-1247-005)',
      'SOX IT-General Control: Unvalidated resource limits in financial transaction paths (sec-1247-001)',
    ],
  },
  recommendation: 'review_required',
  reasoning:
    'This PR introduces 1 critical and 2 high severity security findings, all new in this change set. The combination of payment data in logs (PCI-DSS violation), hardcoded resource limits, and missing exponential backoff creates an elevated attack surface on a payment-critical service. The circuit breaker topology exposure compounds the risk. All findings must be resolved or formally risk-accepted before merge. The CSP finding is low-risk but should be addressed to maintain PCI-DSS compliance posture.',
};

// ─── PR-1251: Portfolio Notifications — MEDIUM Risk ──────────────────────────

const portfolioNotificationSecurity: SecurityAnalysisResult = {
  prId: 'PR-1251',
  analyzedAt: '2026-03-25T08:54:00Z',
  analysisTimeMs: 2103,
  overallSecurityScore: 78,
  securityGrade: 'B',
  findings: [
    {
      id: 'sec-1251-001',
      type: 'xss',
      severity: 'medium',
      title: 'Unescaped portfolio name in email notification template',
      description:
        'The email template renderer inserts the portfolio display name directly into the HTML body using string interpolation without output encoding. A portfolio name containing HTML special characters (e.g., an attacker-controlled name with <script> tags) would be executed in the recipient\'s email client if it supports HTML rendering (CWE-79: Improper Neutralization of Input During Web Page Generation).',
      file: 'src/services/portfolio-engine/notification-templates.ts',
      lineRange: { start: 63, end: 79 },
      cweId: 'CWE-79',
      owaspCategory: 'A03:2021 – Injection',
      recommendation:
        'Use a templating engine with automatic HTML escaping (e.g., Mustache, Handlebars with triple-stash disabled) or apply an explicit htmlEncode() call on all user-controlled values before embedding in email HTML.',
      codeSnippet:
        "const html = `<p>Your portfolio <strong>${portfolio.displayName}</strong> has been rebalanced.</p>`;",
      fixSuggestion:
        'const html = `<p>Your portfolio <strong>${htmlEncode(portfolio.displayName)}</strong> has been rebalanced.</p>`;\n// htmlEncode: (s: string) => s.replace(/[&<>"\']/g, c => `&#${c.charCodeAt(0)};`)',
      confidence: 0.87,
      isNewInThisPR: true,
      autoFixable: true,
    },
    {
      id: 'sec-1251-002',
      type: 'data_exposure',
      severity: 'low',
      title: 'User notification preferences stored as plaintext in queue payload',
      description:
        'Notification preference records (opted-in channels, email address, phone number) are serialised in full into the RabbitMQ message payload. These records persist in the queue until consumed, creating an unnecessary plaintext PII exposure window in the message broker. Relevant under GDPR Article 25 (data minimisation by design).',
      file: 'src/services/portfolio-engine/notification-dispatcher.ts',
      lineRange: { start: 144, end: 162 },
      cweId: null,
      owaspCategory: 'A02:2021 – Cryptographic Failures',
      recommendation:
        'Publish only the user ID and preference version into the queue payload. Resolve the full preference record at consumption time from the preferences service. This limits PII exposure to the authorised consumer only.',
      codeSnippet:
        'await channel.publish(EXCHANGE, ROUTING_KEY, Buffer.from(JSON.stringify({\n  userId,\n  preferences: await userPreferences.getAll(userId), // full PII object\n  portfolioId,\n  eventType,\n})));',
      fixSuggestion:
        'await channel.publish(EXCHANGE, ROUTING_KEY, Buffer.from(JSON.stringify({\n  userId,\n  preferenceVersion: await userPreferences.getCurrentVersion(userId),\n  portfolioId,\n  eventType,\n})));',
      confidence: 0.79,
      isNewInThisPR: true,
      autoFixable: false,
    },
    {
      id: 'sec-1251-003',
      type: 'insufficient_logging',
      severity: 'info',
      title: 'No rate limiting on notification dispatch per user',
      description:
        'The NotificationDispatcher has no per-user rate limiting. In a burst rebalancing event, a single user could receive hundreds of notifications within a short window. While not a direct security vulnerability, the absence of throttling enables both accidental and intentional notification spam, which may constitute a nuisance or data-volume abuse vector under GDPR.',
      file: 'src/services/portfolio-engine/notification-dispatcher.ts',
      lineRange: { start: 178, end: 195 },
      cweId: null,
      owaspCategory: null,
      recommendation:
        'Implement a per-user token bucket rate limiter (e.g., max 5 notifications per 5-minute window). Use Redis with an expiring counter keyed by userId + notificationType.',
      codeSnippet:
        'export async function dispatch(userId: string, event: RebalanceEvent): Promise<void> {\n  // No rate limit check\n  const channels = await resolveChannels(userId);\n  await Promise.all(channels.map(c => send(c, event)));\n}',
      fixSuggestion:
        'export async function dispatch(userId: string, event: RebalanceEvent): Promise<void> {\n  const allowed = await rateLimiter.check(`notify:${userId}:${event.type}`, 5, 300);\n  if (!allowed) return; // silently drop, or queue for delayed delivery\n  const channels = await resolveChannels(userId);\n  await Promise.all(channels.map(c => send(c, event)));\n}',
      confidence: 0.75,
      isNewInThisPR: true,
      autoFixable: false,
    },
  ],
  summary: {
    critical: 0,
    high: 0,
    medium: 1,
    low: 1,
    info: 1,
    total: 3,
    newInThisPR: 3,
    preExisting: 0,
  },
  complianceFlags: {
    pciDssRelevant: false,
    gdprRelevant: true,
    soxRelevant: false,
    details: [
      'GDPR Art. 25 – Data minimisation: PII over-inclusion in queue payload (sec-1251-002)',
      'GDPR – Notification spam risk without rate limiting (sec-1251-003)',
    ],
  },
  recommendation: 'approve',
  reasoning:
    'This PR carries no critical or high severity findings. The medium XSS finding in the email template is the most actionable item and is auto-fixable with a one-line change. The low and info findings are GDPR hygiene improvements that should be addressed in a follow-up but do not block merge. The overall security posture of this change is acceptable for a standard review process.',
};

// ─── PR-1253: KYC Upload — HIGH Risk ─────────────────────────────────────────

const kycUploadSecurity: SecurityAnalysisResult = {
  prId: 'PR-1253',
  analyzedAt: '2026-03-25T12:01:00Z',
  analysisTimeMs: 2691,
  overallSecurityScore: 62,
  securityGrade: 'C',
  findings: [
    {
      id: 'sec-1253-001',
      type: 'insecure_configuration',
      severity: 'critical',
      title: 'MIME type validation bypassable via polyglot file upload',
      description:
        'The new server-side MIME validation checks the Content-Type header and file extension, but does not verify the file magic bytes (file signature). A polyglot file — valid as both a JPEG and an executable — will pass all current checks because the magic byte inspection was omitted from the mobile handler. This is the exact attack vector reported in SEC-421 and reintroduces the original vulnerability in a subtler form (CWE-434: Unrestricted Upload of File with Dangerous Type).',
      file: 'src/services/kyc-service/mobile-upload-handler.ts',
      lineRange: { start: 31, end: 57 },
      cweId: 'CWE-434',
      owaspCategory: 'A04:2021 – Insecure Design',
      recommendation:
        'Add magic byte inspection using a library such as file-type. Validate that the detected type matches both the declared MIME type and the allowed list. Reject any file whose magic bytes do not correspond to an approved document type (PDF, JPEG, PNG).',
      codeSnippet:
        "const mimeType = req.headers['content-type'];\nconst ext = path.extname(filename).toLowerCase();\nif (!ALLOWED_MIME_TYPES.includes(mimeType) || !ALLOWED_EXTENSIONS.includes(ext)) {\n  throw new ValidationError('Invalid file type');\n}\n// Missing: magic byte check",
      fixSuggestion:
        "import { fileTypeFromBuffer } from 'file-type';\nconst detected = await fileTypeFromBuffer(fileBuffer);\nif (!detected || !ALLOWED_MIME_TYPES.includes(detected.mime)) {\n  throw new ValidationError('File signature does not match declared type');\n}",
      confidence: 0.95,
      isNewInThisPR: true,
      autoFixable: false,
    },
    {
      id: 'sec-1253-002',
      type: 'insecure_configuration',
      severity: 'high',
      title: 'Uploaded documents stored with predictable sequential filenames',
      description:
        'The mobile upload handler stores documents using a sequential numeric identifier derived from the upload timestamp with millisecond precision. This naming scheme is predictable and enumerable, enabling an authenticated user to infer and attempt to access other users\' KYC documents via direct URL manipulation (CWE-330: Use of Insufficiently Random Values).',
      file: 'src/services/kyc-service/document-store.ts',
      lineRange: { start: 88, end: 103 },
      cweId: 'CWE-330',
      owaspCategory: 'A01:2021 – Broken Access Control',
      recommendation:
        'Replace timestamp-based names with cryptographically random UUIDs (crypto.randomUUID()). Add server-side authorisation checks that validate the requesting user owns the document before serving it.',
      codeSnippet:
        'const filename = `kyc-doc-${userId}-${Date.now()}.${ext}`;\nawait storage.save(filename, fileBuffer);',
      fixSuggestion:
        "import { randomUUID } from 'crypto';\nconst filename = `kyc/${userId}/${randomUUID()}.${ext}`;\nawait storage.save(filename, fileBuffer, { private: true });",
      confidence: 0.89,
      isNewInThisPR: true,
      autoFixable: true,
    },
    {
      id: 'sec-1253-003',
      type: 'insecure_configuration',
      severity: 'high',
      title: 'Uploaded files are not scanned for malware before storage',
      description:
        'Documents accepted by the mobile upload handler are written directly to the document store without malware or antivirus scanning. Banking KYC flows are a known target for malware delivery via document upload. Without pre-storage scanning, a malicious document reaches the document store and any downstream processor that opens the file (CWE-509: Replicating Malicious Code — Virus or Worm).',
      file: 'src/services/kyc-service/mobile-upload-handler.ts',
      lineRange: { start: 58, end: 74 },
      cweId: 'CWE-509',
      owaspCategory: 'A04:2021 – Insecure Design',
      recommendation:
        'Introduce a quarantine-then-scan pattern: store uploads in an isolated quarantine bucket, trigger async AV scan (e.g., ClamAV, cloud AV API), and only promote clean documents to the production document store. Reject and alert on infected uploads.',
      codeSnippet:
        '// After MIME validation\nawait documentStore.save(filename, fileBuffer);\nreturn { uploadId: generateId(), status: "stored" };',
      fixSuggestion:
        "await quarantineStore.save(filename, fileBuffer);\nconst scanResult = await avScanner.scan(fileBuffer);\nif (scanResult.infected) {\n  await quarantineStore.delete(filename);\n  await securityAuditLog.record({ event: 'malware_blocked', userId, filename });\n  throw new SecurityError('File failed malware scan');\n}\nawait documentStore.promoteFromQuarantine(filename);",
      confidence: 0.83,
      isNewInThisPR: false,
      autoFixable: false,
    },
    {
      id: 'sec-1253-004',
      type: 'insecure_deserialization',
      severity: 'medium',
      title: 'PDF documents rendered in unsandboxed iframe for preview',
      description:
        'The document preview feature renders uploaded PDFs in an iframe without sandbox restrictions. A malicious PDF containing embedded JavaScript or form actions could interact with the parent page, enabling data exfiltration or session hijacking within the review agent\'s browser session (CWE-829: Inclusion of Functionality from Untrusted Control Sphere).',
      file: 'src/components/kyc-service/document-preview.tsx',
      lineRange: { start: 44, end: 56 },
      cweId: 'CWE-829',
      owaspCategory: 'A03:2021 – Injection',
      recommendation:
        'Add sandbox="allow-scripts allow-same-origin" attribute to the iframe and restrict the iframe src to a dedicated document viewer subdomain isolated from the main application origin. Consider using PDF.js for server-side rendering instead of direct embedding.',
      codeSnippet:
        '<iframe\n  src={documentUrl}\n  className="w-full h-96"\n  title="Document Preview"\n/>',
      fixSuggestion:
        '<iframe\n  src={documentUrl}\n  className="w-full h-96"\n  title="Document Preview"\n  sandbox="allow-scripts allow-same-origin"\n  referrerPolicy="no-referrer"\n  csp="script-src \'none\'"\n/>',
      confidence: 0.81,
      isNewInThisPR: false,
      autoFixable: true,
    },
  ],
  summary: {
    critical: 1,
    high: 2,
    medium: 1,
    low: 0,
    info: 0,
    total: 4,
    newInThisPR: 2,
    preExisting: 2,
  },
  complianceFlags: {
    pciDssRelevant: true,
    gdprRelevant: true,
    soxRelevant: false,
    details: [
      'GDPR Art. 32 – Security of processing: no malware scanning before document storage (sec-1253-003)',
      'GDPR Art. 25 – Data minimisation: predictable document filenames expose user data (sec-1253-002)',
      'PCI-DSS Req 6.2: Unrestricted file upload reintroduces original vulnerability (sec-1253-001)',
    ],
  },
  recommendation: 'review_required',
  reasoning:
    'This hotfix PR addresses the original KYC upload vulnerability (SEC-421) but introduces a critical bypass in the same change: MIME type validation omits magic byte inspection, meaning the fix is incomplete. The two pre-existing findings (no malware scan, unsandboxed PDF iframe) were present before this PR but are surfaced here as they interact with the upload flow. The predictable filename finding is new and high severity. The PR must address the magic byte bypass before merge; the remaining findings should be tracked in SEC backlog.',
};

// ─── Exports ─────────────────────────────────────────────────────────────────

export const securityAnalysisData: SecurityAnalysisResult[] = [
  paymentGatewaySecurity,
  portfolioNotificationSecurity,
  kycUploadSecurity,
];

export function getSecurityAnalysisByPRId(prId: string): SecurityAnalysisResult | undefined {
  return securityAnalysisData.find((result) => result.prId === prId);
}
