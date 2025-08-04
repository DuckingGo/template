import { NextResponse } from 'next/server'

// In-memory log storage for demo (use real logging service in production)
const logs: Array<{
  id: string
  timestamp: string
  level: string
  message: string
  metadata?: any
}> = []

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const level = searchParams.get('level')
    const limit = parseInt(searchParams.get('limit') || '50')

    let filteredLogs = logs
    if (level) {
      filteredLogs = logs.filter(log => log.level === level)
    }

    // Sort by timestamp desc and limit
    const recentLogs = filteredLogs
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, limit)

    return NextResponse.json({
      logs: recentLogs,
      total: filteredLogs.length,
      filtered_by: level ? { level } : null,
      limit,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error('Error fetching logs:', error)
    return NextResponse.json({ error: 'Failed to fetch logs' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { level, message, metadata } = body

    if (!level || !message) {
      return NextResponse.json(
        {
          error:
            'Invalid request body. Expected { level: string, message: string, metadata?: any }',
        },
        { status: 400 }
      )
    }

    const logEntry = {
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
      level,
      message,
      metadata,
    }

    // Add to in-memory storage (limit to 1000 entries)
    logs.unshift(logEntry)
    if (logs.length > 1000) {
      logs.splice(1000)
    }

    console.log(`[${level.toUpperCase()}] ${message}`, metadata || '')

    return NextResponse.json(logEntry)
  } catch (error) {
    console.error('Error creating log:', error)
    return NextResponse.json({ error: 'Failed to create log entry' }, { status: 500 })
  }
}
