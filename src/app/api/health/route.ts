import { NextResponse } from 'next/server'
import { config } from '../../../../config'

/**
 * @swagger
 * /api/health:
 *   get:
 *     tags:
 *       - Health
 *     summary: Health check endpoint
 *     description: Returns the health status of the application including uptime, memory usage, and service checks
 *     responses:
 *       200:
 *         description: Health check successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Health'
 *       500:
 *         description: Health check failed
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
export async function GET() {
  try {
    const healthData = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      environment: config.app.environment,
      version: config.app.version,
      uptime: process.uptime(),
      memory: process.memoryUsage(),
      node_version: process.version,
      checks: {
        database: 'ok', // Would be actual DB check in real app
        redis: 'ok', // Would be actual Redis check in real app
        external_apis: 'ok',
      },
    }

    return NextResponse.json(healthData)
  } catch (error) {
    console.error('Health check failed:', error)
    return NextResponse.json(
      {
        status: 'unhealthy',
        error: 'Health check failed',
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    )
  }
}
