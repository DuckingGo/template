import { NextResponse } from 'next/server'
import { config, isFeatureEnabled } from '../../../../config'

/**
 * @swagger
 * /api/features:
 *   get:
 *     tags:
 *       - Features
 *     summary: Get feature flags
 *     description: Returns current feature flags status and evaluated flags
 *     responses:
 *       200:
 *         description: Feature flags retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 features:
 *                   type: object
 *                   additionalProperties:
 *                     type: boolean
 *                   description: Raw feature flags
 *                 evaluated_flags:
 *                   type: object
 *                   additionalProperties:
 *                     type: boolean
 *                   description: Evaluated feature flags
 *                 environment:
 *                   type: string
 *                   description: Current environment
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *       500:
 *         description: Failed to retrieve feature flags
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *   post:
 *     tags:
 *       - Features
 *     summary: Update feature flag (Demo)
 *     description: Updates a feature flag (demo mode - doesn't persist)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - feature
 *               - enabled
 *             properties:
 *               feature:
 *                 type: string
 *                 description: Feature flag name
 *               enabled:
 *                 type: boolean
 *                 description: Whether the feature should be enabled
 *     responses:
 *       200:
 *         description: Feature flag updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 feature:
 *                   type: string
 *                 enabled:
 *                   type: boolean
 *                 updated_at:
 *                   type: string
 *                   format: date-time
 *                 message:
 *                   type: string
 *       400:
 *         description: Invalid request body
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Failed to update feature flag
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
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
