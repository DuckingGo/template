import { NextResponse } from 'next/server'
import { swaggerSpec } from '@/lib/swagger/config'

export async function GET() {
  return NextResponse.json(swaggerSpec)
}
