import { NextResponse } from 'next/server'
import { config, isFeatureEnabled } from '../../../../config'

export async function GET() {
  try {
    const configData = {
      app: config.app,
      api: config.api,
      features: config.features,
      analytics: config.analytics,
      featureFlags: {
        newUI: isFeatureEnabled('newUI'),
        betaFeatures: isFeatureEnabled('betaFeatures'),
        debugMode: isFeatureEnabled('debugMode'),
      },
      timestamp: new Date().toISOString(),
    }

    return NextResponse.json(configData)
  } catch (error) {
    console.error('Error fetching config:', error)
    return NextResponse.json({ error: 'Failed to fetch configuration' }, { status: 500 })
  }
}
