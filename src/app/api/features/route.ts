import { NextResponse } from 'next/server'
import { config, isFeatureEnabled } from '../../../../config'

export async function GET() {
  try {
    const featureData = {
      features: config.features,
      evaluated_flags: {
        newUI: isFeatureEnabled('newUI'),
        betaFeatures: isFeatureEnabled('betaFeatures'),
        debugMode: isFeatureEnabled('debugMode'),
      },
      environment: config.app.environment,
      timestamp: new Date().toISOString(),
    }

    return NextResponse.json(featureData)
  } catch (error) {
    console.error('Error fetching feature flags:', error)
    return NextResponse.json({ error: 'Failed to fetch feature flags' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { feature, enabled } = body

    if (!feature || typeof enabled !== 'boolean') {
      return NextResponse.json(
        { error: 'Invalid request body. Expected { feature: string, enabled: boolean }' },
        { status: 400 }
      )
    }

    // In a real app, you would update the feature flag in your database
    // For demo purposes, we'll just return the requested change
    const updatedFeature = {
      feature,
      enabled,
      updated_at: new Date().toISOString(),
      message: `Feature '${feature}' ${enabled ? 'enabled' : 'disabled'} (demo mode)`,
    }

    return NextResponse.json(updatedFeature)
  } catch (error) {
    console.error('Error updating feature flag:', error)
    return NextResponse.json({ error: 'Failed to update feature flag' }, { status: 500 })
  }
}
