import { NextResponse } from 'next/server'

// In-memory log storage for demo (use real logging service in production)
const logs: Array<{
  id: string
  timestamp: string
  level: string
  message: string
  metadata?: Record<string, unknown>
}> = []

/**
 * @swagger
 * /api/logs:
 *   get:
 *     tags:
 *       - Logs
 *     summary: Get application logs
 *     description: Retrieves application logs with optional filtering by level and limit
 *     parameters:
 *       - in: query
 *         name: level
 *         schema:
 *           type: string
 *           enum: [debug, info, warn, error]
 *         description: Filter logs by level
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 50
 *           minimum: 1
 *           maximum: 1000
 *         description: Maximum number of logs to return
 *     responses:
 *       200:
 *         description: Logs retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 logs:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/LogEntry'
 *                 total:
 *                   type: number
 *                   description: Total number of logs matching filter
 *                 filtered_by:
 *                   type: object
 *                   nullable: true
 *                   description: Applied filters
 *                 limit:
 *                   type: number
 *                   description: Applied limit
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *       500:
 *         description: Failed to retrieve logs
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *   post:
 *     tags:
 *       - Logs
 *     summary: Create log entry
 *     description: Creates a new log entry in the application
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - level
 *               - message
 *             properties:
 *               level:
 *                 type: string
 *                 enum: [debug, info, warn, error]
 *                 description: Log level
 *               message:
 *                 type: string
 *                 description: Log message
 *               metadata:
 *                 type: object
 *                 additionalProperties: true
 *                 description: Additional metadata
 *     responses:
 *       200:
 *         description: Log entry created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LogEntry'
 *       400:
 *         description: Invalid request body
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Failed to create log entry
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
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
