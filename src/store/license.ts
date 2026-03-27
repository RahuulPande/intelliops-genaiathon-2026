import { create } from 'zustand';

export type LicenseType = 'delivery' | 'operations' | 'enterprise' | 'trial';

// Backward compatibility mapping from old tier IDs
export const legacyLicenseMapping: Record<string, LicenseType> = {
  'lite': 'delivery',
  'pro': 'enterprise',
};

export interface LicenseFeatures {
  serviceHealthMonitoring: boolean;
  basicIncidentManagement: boolean;
  simpleReporting: boolean;
  basicAlerts: boolean;
  aiDefectMatching: boolean;
  predictiveAnalytics: boolean;
  intelligentAlertManagement: boolean;
  knowledgeBase: boolean;
  releaseIntelligence: boolean;
  businessIntelligence: boolean;
  crossBranchIntelligence: boolean;
  multiTenantManagement: boolean;
  advancedAIModels: boolean;
  customIntegrations: boolean;
  whiteLabeling: boolean;
  dedicatedSupport: boolean;
}

export interface LicenseLimitations {
  services: string;
  users: string;
  historicalData: string;
  support: string;
  trialExpiry?: string;
}

export interface LicenseTier {
  id: LicenseType;
  name: string;
  shortName: string;
  price: string;
  target: string;
  layers: string[];
  features: LicenseFeatures;
  limitations: LicenseLimitations;
  roi: string;
}

export const licenseFeatures: Record<LicenseType, LicenseTier> = {
  delivery: {
    id: 'delivery',
    name: "Delivery Intelligence License",
    shortName: "Delivery (L1)",
    price: "$2,500/month",
    target: "Layer 1: Delivery Intelligence",
    layers: ['L1'],
    features: {
      serviceHealthMonitoring: false,
      basicIncidentManagement: true,
      simpleReporting: true,
      basicAlerts: true,
      aiDefectMatching: true,
      predictiveAnalytics: false,
      intelligentAlertManagement: false,
      knowledgeBase: true,
      releaseIntelligence: true,
      businessIntelligence: false,
      crossBranchIntelligence: true,
      multiTenantManagement: false,
      advancedAIModels: false,
      customIntegrations: false,
      whiteLabeling: false,
      dedicatedSupport: false
    },
    limitations: {
      services: "200 max",
      users: "25 max",
      historicalData: "3 months",
      support: "Business hours email"
    },
    roi: "~$88K annually"
  },

  operations: {
    id: 'operations',
    name: "Operations Intelligence License",
    shortName: "Operations (L1+L2)",
    price: "$4,000/month",
    target: "Layer 1 + Layer 2: Delivery & Operations",
    layers: ['L1', 'L2'],
    features: {
      serviceHealthMonitoring: true,
      basicIncidentManagement: true,
      simpleReporting: true,
      basicAlerts: true,
      aiDefectMatching: true,
      predictiveAnalytics: true,
      intelligentAlertManagement: true,
      knowledgeBase: true,
      releaseIntelligence: true,
      businessIntelligence: false,
      crossBranchIntelligence: true,
      multiTenantManagement: false,
      advancedAIModels: false,
      customIntegrations: true,
      whiteLabeling: false,
      dedicatedSupport: false
    },
    limitations: {
      services: "500 max",
      users: "100 max",
      historicalData: "1 year",
      support: "Priority email + chat"
    },
    roi: "~$160K annually"
  },

  enterprise: {
    id: 'enterprise',
    name: "Enterprise Intelligence License",
    shortName: "Enterprise (All)",
    price: "$5,000/month",
    target: "All 3 layers, unlimited (500+ services)",
    layers: ['L1', 'L2', 'L3'],
    features: {
      serviceHealthMonitoring: true,
      basicIncidentManagement: true,
      simpleReporting: true,
      basicAlerts: true,
      aiDefectMatching: true,
      predictiveAnalytics: true,
      intelligentAlertManagement: true,
      knowledgeBase: true,
      releaseIntelligence: true,
      businessIntelligence: true,
      crossBranchIntelligence: true,
      multiTenantManagement: true,
      advancedAIModels: true,
      customIntegrations: true,
      whiteLabeling: true,
      dedicatedSupport: true
    },
    limitations: {
      services: "Unlimited",
      users: "Unlimited",
      historicalData: "5 years",
      support: "24/7 phone + dedicated success manager"
    },
    roi: "~$255K annually"
  },

  trial: {
    id: 'trial',
    name: "Full Platform Trial",
    shortName: "Trial (All)",
    price: "Free for 30 days",
    target: "All 3 intelligence layers for evaluation",
    layers: ['L1', 'L2', 'L3'],
    features: {
      serviceHealthMonitoring: true,
      basicIncidentManagement: true,
      simpleReporting: true,
      basicAlerts: true,
      aiDefectMatching: true,
      predictiveAnalytics: true,
      intelligentAlertManagement: true,
      knowledgeBase: true,
      releaseIntelligence: true,
      businessIntelligence: true,
      crossBranchIntelligence: true,
      multiTenantManagement: false,
      advancedAIModels: false,
      customIntegrations: false,
      whiteLabeling: false,
      dedicatedSupport: false
    },
    limitations: {
      services: "50 max",
      users: "10 max",
      historicalData: "1 month",
      support: "Community support only",
      trialExpiry: "30 days"
    },
    roi: "Evaluation period"
  }
};

interface LicenseStore {
  currentLicense: LicenseType;
  licenseExpiry: Date | null;
  changeLicense: (license: LicenseType | string) => void;
  hasFeatureAccess: (feature: keyof LicenseFeatures) => boolean;
  getCurrentLicense: () => LicenseTier;
  getLicenseExpiryDays: () => number | null;
  getLayerAccess: () => {
    deliveryIntelligence: boolean;
    operationsIntelligence: boolean;
    enterpriseIntelligence: boolean;
  };
}

function resolveLicenseType(license: string): LicenseType {
  if (license in legacyLicenseMapping) {
    return legacyLicenseMapping[license];
  }
  if (license in licenseFeatures) {
    return license as LicenseType;
  }
  return 'enterprise';
}

const useLicenseStore = create<LicenseStore>((set, get) => ({
  currentLicense: 'delivery', // Default to Delivery for demo focus
  licenseExpiry: null,

  changeLicense: (license: LicenseType | string) => {
    const resolved = resolveLicenseType(license as string);
    let expiry = null;

    if (resolved === 'trial') {
      expiry = new Date();
      expiry.setDate(expiry.getDate() + 30);
    }

    set({
      currentLicense: resolved,
      licenseExpiry: expiry
    });

    console.log(`License changed to ${resolved.toUpperCase()}`);
  },

  hasFeatureAccess: (feature: keyof LicenseFeatures) => {
    const { currentLicense } = get();
    return licenseFeatures[currentLicense].features[feature] || false;
  },

  getCurrentLicense: () => {
    const { currentLicense } = get();
    return licenseFeatures[currentLicense];
  },

  getLicenseExpiryDays: () => {
    const { licenseExpiry } = get();
    if (!licenseExpiry) return null;

    const now = new Date();
    const diffTime = licenseExpiry.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  },

  getLayerAccess: () => {
    const { currentLicense } = get();
    const tier = licenseFeatures[currentLicense];
    return {
      deliveryIntelligence: true, // All tiers include L1
      operationsIntelligence: tier.features.serviceHealthMonitoring && tier.features.intelligentAlertManagement,
      enterpriseIntelligence: tier.features.businessIntelligence,
    };
  }
}));

export default useLicenseStore;
