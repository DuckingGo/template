import { z } from 'zod'

/**
 * Environment Schema - Type-safe environment validation using Zod
 */

const EnvSchema = z.object({
  // App Configuration
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  NEXT_PUBLIC_APP_NAME: z.string().default('Template App'),
  NEXT_PUBLIC_APP_VERSION: z.string().default('1.0.0'),
  NEXT_PUBLIC_APP_URL: z.string().url(),

  // API Configuration
  NEXT_PUBLIC_API_URL: z.string().url(),
  API_TIMEOUT: z.string().transform(Number).pipe(z.number().positive()).default('30000'),

  // Database Configuration
  DATABASE_URL: z.string().url().optional(),
  DATABASE_SSL: z
    .string()
    .transform((val: string) => val === 'true')
    .pipe(z.boolean())
    .default('false'),
  DATABASE_POOL_MIN: z.string().transform(Number).pipe(z.number().nonnegative()).default('2'),
  DATABASE_POOL_MAX: z.string().transform(Number).pipe(z.number().positive()).default('10'),

  // Redis Configuration
  REDIS_URL: z.string().url().optional(),
  REDIS_MAX_RETRIES: z.string().transform(Number).pipe(z.number().nonnegative()).default('3'),
  REDIS_RETRY_DELAY: z.string().transform(Number).pipe(z.number().positive()).default('1000'),

  // Authentication
  JWT_SECRET: z.string().min(32).optional(),
  JWT_EXPIRES_IN: z.string().default('7d'),

  // Analytics
  NEXT_PUBLIC_GA_TRACKING_ID: z.string().optional(),
  NEXT_PUBLIC_ANALYTICS_ENABLED: z
    .string()
    .transform((val: string) => val === 'true')
    .pipe(z.boolean())
    .default('false'),

  // Feature Flags
  FEATURE_FLAG_NEW_UI: z
    .string()
    .transform((val: string) => val === 'true')
    .pipe(z.boolean())
    .default('false'),
  FEATURE_FLAG_BETA_FEATURES: z
    .string()
    .transform((val: string) => val === 'true')
    .pipe(z.boolean())
    .default('false'),

  // Security
  CORS_ORIGIN: z.string().default('*'),
  RATE_LIMIT_MAX: z.string().transform(Number).pipe(z.number().positive()).default('100'),
  RATE_LIMIT_WINDOW: z.string().transform(Number).pipe(z.number().positive()).default('900000'), // 15 minutes

  // Monitoring
  LOG_LEVEL: z.enum(['debug', 'info', 'warn', 'error']).default('info'),
  ENABLE_METRICS: z
    .string()
    .transform((val: string) => val === 'true')
    .pipe(z.boolean())
    .default('false'),
})

// Type inference from schema
export type Env = z.infer<typeof EnvSchema>

// Validate environment variables
function validateEnv(): Env {
  try {
    return EnvSchema.parse(process.env)
  } catch (error) {
    if (error instanceof z.ZodError) {
      const missingVars = error.errors
        .map((err: z.ZodIssue) => `${err.path.join('.')}: ${err.message}`)
        .join('\n')

      throw new Error(`Environment validation failed:\n${missingVars}`)
    }
    throw error
  }
}

// Export validated environment
export const env = validateEnv()

// Type-safe environment getter
export function getEnv<K extends keyof Env>(key: K): Env[K] {
  return env[key]
}

// Check if we're in a specific environment
export const isDevelopment = env.NODE_ENV === 'development'
export const isProduction = env.NODE_ENV === 'production'
export const isTest = env.NODE_ENV === 'test'

// Server-side only environment variables
export const serverEnv = {
  DATABASE_URL: env.DATABASE_URL,
  JWT_SECRET: env.JWT_SECRET,
  REDIS_URL: env.REDIS_URL,
} as const

// Client-safe environment variables (prefixed with NEXT_PUBLIC_)
export const clientEnv = {
  APP_NAME: env.NEXT_PUBLIC_APP_NAME,
  APP_VERSION: env.NEXT_PUBLIC_APP_VERSION,
  APP_URL: env.NEXT_PUBLIC_APP_URL,
  API_URL: env.NEXT_PUBLIC_API_URL,
  GA_TRACKING_ID: env.NEXT_PUBLIC_GA_TRACKING_ID,
  ANALYTICS_ENABLED: env.NEXT_PUBLIC_ANALYTICS_ENABLED,
} as const
