import type { AppConfig } from '../../types'

/**
 * Development Environment Configuration
 */
export const developmentConfig: AppConfig = {
  app: {
    name: 'Template App (Dev)',
    version: '1.0.0-dev',
    environment: 'development',
    url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  },
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
    timeout: 30000,
  },
  features: {
    debugMode: true,
    hotReload: true,
    devTools: true,
    mockData: true,
    verboseLogging: true,
    newUI: process.env.FEATURE_FLAG_NEW_UI === 'true',
    betaFeatures: process.env.FEATURE_FLAG_BETA_FEATURES === 'true',
  },
  analytics: {
    enabled: false,
  },
}

export default developmentConfig
