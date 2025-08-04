#!/usr/bin/env node

/**
 * Environment Validation Script
 * Validates environment variables before starting the application
 */

import { config } from '../config/index.js'

function validateEnvironment() {
  console.log('🔍 Validating environment configuration...')
  
  try {
    // Test config loading
    console.log(`📋 Environment: ${config.app.environment}`)
    console.log(`🚀 App: ${config.app.name} v${config.app.version}`)
    console.log(`🌐 URL: ${config.app.url}`)
    console.log(`🔗 API: ${config.api.baseUrl}`)
    
    // Check required environment variables for production
    if (config.app.environment === 'production') {
      const requiredProdVars = [
        'NEXT_PUBLIC_APP_URL',
        'NEXT_PUBLIC_API_URL',
      ]
      
      const missing = requiredProdVars.filter(
        varName => !process.env[varName]
      )
      
      if (missing.length > 0) {
        throw new Error(
          `Missing required production environment variables: ${missing.join(', ')}`
        )
      }
    }
    
    // Validate URLs
    try {
      new URL(config.app.url)
      new URL(config.api.baseUrl)
    } catch (error) {
      throw new Error('Invalid URL format in environment variables')
    }
    
    console.log('✅ Environment validation passed!')
    process.exit(0)
    
  } catch (error) {
    console.error('❌ Environment validation failed:')
    console.error(error instanceof Error ? error.message : String(error))
    process.exit(1)
  }
}

// Run validation
validateEnvironment()
