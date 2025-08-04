import { NextResponse } from 'next/server'
import { config } from '../../../../config'

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
