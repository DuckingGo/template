import type { AppConfig } from '../../types'

/**
 * Production Environment Configuration
 */
export const productionConfig: AppConfig = {
  app: {
    name: 'Template App',
    version: '1.0.0',
    environment: 'production',
    url: process.env.NEXT_PUBLIC_APP_URL!,
  },
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_URL!,
    timeout: 10000,
  },
  features: {
    debugMode: false,
    hotReload: false,
    devTools: false,
    mockData: false,
    verboseLogging: false,
    newUI: process.env.FEATURE_FLAG_NEW_UI === 'true',
    betaFeatures: false, // Always false in production
  },
  analytics: {
    enabled: process.env.NEXT_PUBLIC_ANALYTICS_ENABLED === 'true',
    ...(process.env.NEXT_PUBLIC_GA_TRACKING_ID && {
      trackingId: process.env.NEXT_PUBLIC_GA_TRACKING_ID,
    }),
  },
}

export default productionConfig
