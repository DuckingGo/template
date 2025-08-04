import { NextResponse } from 'next/server'

/**
 * @swagger
 * /api/env:
 *   get:
 *     tags:
 *       - Environment
 *     summary: Get public environment variables
 *     description: Returns public environment variables (NEXT_PUBLIC_* only) for security
 *     responses:
 *       200:
 *         description: Environment variables retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 public_variables:
 *                   type: object
 *                   additionalProperties:
 *                     type: string
 *                   description: Public environment variables
 *                 node_env:
 *                   type: string
 *                   description: Node environment
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *                 count:
 *                   type: number
 *                   description: Number of public variables
 *       500:
 *         description: Failed to retrieve environment variables
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
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
