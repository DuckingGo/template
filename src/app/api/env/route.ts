import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Only expose public environment variables
    const publicEnv = Object.entries(process.env)
      .filter(([key]) => key.startsWith('NEXT_PUBLIC_'))
      .reduce(
        (acc, [key, value]) => ({
          ...acc,
          [key]: value,
        }),
        {}
      )

    const envData = {
      public_variables: publicEnv,
      node_env: process.env.NODE_ENV,
      timestamp: new Date().toISOString(),
      count: Object.keys(publicEnv).length,
    }

    return NextResponse.json(envData)
  } catch (error) {
    console.error('Error fetching environment variables:', error)
    return NextResponse.json({ error: 'Failed to fetch environment variables' }, { status: 500 })
  }
}
