import type { AppConfig } from '../../types'

/**
 * Testing Environment Configuration
 */
export const testingConfig: AppConfig = {
  app: {
    name: 'Template App (Test)',
    version: '1.0.0-test',
    environment: 'test',
    url: 'http://localhost:3000',
  },
  api: {
    baseUrl: 'http://localhost:3000/api',
    timeout: 5000,
  },
  features: {
    debugMode: true,
    hotReload: false,
    devTools: true,
    mockData: true,
    verboseLogging: false,
    newUI: false,
    betaFeatures: false,
  },
  analytics: {
    enabled: false,
  },
}

export default testingConfig
