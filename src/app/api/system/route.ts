import { NextResponse } from 'next/server'
import os from 'os'

export async function GET() {
  try {
    const systemInfo = {
      platform: os.platform(),
      arch: os.arch(),
      release: os.release(),
      hostname: os.hostname(),
      cpus: os.cpus().length,
      total_memory: Math.round(os.totalmem() / 1024 / 1024 / 1024) + ' GB',
      free_memory: Math.round(os.freemem() / 1024 / 1024 / 1024) + ' GB',
      uptime: Math.round(os.uptime() / 3600) + ' hours',
      load_average: os.loadavg(),
      node_version: process.version,
      npm_version: process.env.npm_version || 'unknown',
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      timestamp: new Date().toISOString(),
    }

    return NextResponse.json(systemInfo)
  } catch (error) {
    console.error('Error fetching system info:', error)
    return NextResponse.json({ error: 'Failed to fetch system information' }, { status: 500 })
  }
}
