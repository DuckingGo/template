import { env, isDevelopment, isProduction, isTest } from './env'
import developmentConfig from './development'
import productionConfig from './production'
import testingConfig from './testing'
import type { AppConfig } from '../types'

/**
 * Main Configuration Manager
 * Automatically loads the appropriate config based on NODE_ENV
 */

function getConfig(): AppConfig {
  if (isDevelopment) {
    return developmentConfig
  }
  
  if (isProduction) {
    return productionConfig
  }
  
  if (isTest) {
    return testingConfig
  }
  
  // Fallback to development
  return developmentConfig
}

// Export the active configuration
export const config = getConfig()

// Export environment utilities
export { env, isDevelopment, isProduction, isTest }

// Export specific configs for testing purposes
export { developmentConfig, productionConfig, testingConfig }

/**
 * Feature flag checker
 */
export function isFeatureEnabled(feature: keyof typeof config.features): boolean {
  return config.features[feature] ?? false
}

/**
 * Get database configuration
 */
export function getDatabaseConfig() {
  return {
    url: env.DATABASE_URL,
    ssl: env.DATABASE_SSL,
    pool: {
      min: env.DATABASE_POOL_MIN,
      max: env.DATABASE_POOL_MAX,
    },
  }
}

/**
 * Get Redis configuration
 */
export function getRedisConfig() {
  return {
    url: env.REDIS_URL,
    maxRetriesPerRequest: env.REDIS_MAX_RETRIES,
    retryDelayMs: env.REDIS_RETRY_DELAY,
  }
}

/**
 * Get authentication configuration
 */
export function getAuthConfig() {
  return {
    jwtSecret: env.JWT_SECRET,
    jwtExpiresIn: env.JWT_EXPIRES_IN,
  }
}

/**
 * Get rate limiting configuration
 */
export function getRateLimitConfig() {
  return {
    max: env.RATE_LIMIT_MAX,
    windowMs: env.RATE_LIMIT_WINDOW,
  }
}

/**
 * Get CORS configuration
 */
export function getCorsConfig() {
  return {
    origin: env.CORS_ORIGIN === '*' ? true : env.CORS_ORIGIN.split(','),
    credentials: true,
  }
}

export default config
