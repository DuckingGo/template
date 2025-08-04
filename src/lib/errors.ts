/**
 * Simple error handling utilities
 */

import { logger } from './logger'

export class AppError extends Error {
  constructor(
    message: string,
    public statusCode: number = 500,
    public code?: string
  ) {
    super(message)
    this.name = 'AppError'
  }
}

export function logError(error: unknown, context?: Record<string, unknown>) {
  const errorMessage = error instanceof Error ? error.message : String(error)

  if (error instanceof Error) {
    logger.error(errorMessage, error, context)
  } else {
    logger.error(errorMessage, undefined, context)
  }
}
