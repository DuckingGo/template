/**
 * Logger utility with environment-aware configuration
 */

import { config } from '../../config'

type LogLevel = 'debug' | 'info' | 'warn' | 'error'

interface LogEntry {
  level: LogLevel
  message: string
  timestamp: string
  context?: Record<string, unknown>
  error?: Error
}

class Logger {
  private isDevelopment = config.app.environment === 'development'
  private isTest = config.app.environment === 'test'

  private shouldLog(level: LogLevel): boolean {
    if (this.isTest) return false

    const levels: Record<LogLevel, number> = {
      debug: 0,
      info: 1,
      warn: 2,
      error: 3,
    }

    const currentLevel = (process.env.LOG_LEVEL as LogLevel) || 'info'
    return levels[level] >= levels[currentLevel]
  }

  private formatMessage(entry: LogEntry): string {
    const { level, message, timestamp, context, error } = entry

    if (this.isDevelopment) {
      let formatted = `[${timestamp}] ${level.toUpperCase()}: ${message}`

      if (context) {
        formatted += `\nContext: ${JSON.stringify(context, null, 2)}`
      }

      if (error) {
        formatted += `\nError: ${error.stack || error.message}`
      }

      return formatted
    }

    // Production format (structured logging)
    return JSON.stringify({
      timestamp,
      level,
      message,
      ...(context && { context }),
      ...(error && { error: error.message, stack: error.stack }),
    })
  }

  private log(level: LogLevel, message: string, context?: Record<string, unknown>, error?: Error) {
    if (!this.shouldLog(level)) return

    const entry: LogEntry = {
      level,
      message,
      timestamp: new Date().toISOString(),
      ...(context && { context }),
      ...(error && { error }),
    }

    const formatted = this.formatMessage(entry)

    switch (level) {
      case 'debug':
        console.debug(formatted)
        break
      case 'info':
        console.info(formatted)
        break
      case 'warn':
        console.warn(formatted)
        break
      case 'error':
        console.error(formatted)
        break
    }
  }

  debug(message: string, context?: Record<string, unknown>) {
    this.log('debug', message, context)
  }

  info(message: string, context?: Record<string, unknown>) {
    this.log('info', message, context)
  }

  warn(message: string, context?: Record<string, unknown>) {
    this.log('warn', message, context)
  }

  error(message: string, error?: Error, context?: Record<string, unknown>) {
    this.log('error', message, context, error)
  }

  // Create child logger with context
  child(context: Record<string, unknown>) {
    return {
      debug: (message: string, additionalContext?: Record<string, unknown>) =>
        this.debug(message, { ...context, ...additionalContext }),
      info: (message: string, additionalContext?: Record<string, unknown>) =>
        this.info(message, { ...context, ...additionalContext }),
      warn: (message: string, additionalContext?: Record<string, unknown>) =>
        this.warn(message, { ...context, ...additionalContext }),
      error: (message: string, error?: Error, additionalContext?: Record<string, unknown>) =>
        this.error(message, error, { ...context, ...additionalContext }),
    }
  }
}

export const logger = new Logger()
export default logger
