import { NextResponse } from 'next/server'
import { config, isFeatureEnabled } from '../../../../config'

/**
 * @swagger
 * /api/config:
 *   get:
 *     tags:
 *       - Configuration
 *     summary: Get application configuration
 *     description: Returns the current application configuration including app settings, API config, features, and analytics
 *     responses:
 *       200:
 *         description: Configuration data retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Config'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
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
