/**
 * Application-specific type definitions
 */

export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  role: 'admin' | 'user' | 'moderator'
  createdAt: string
  updatedAt: string
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
}

export interface AppConfig {
  app: {
    name: string
    version: string
    environment: Environment
    url: string
  }
  api: {
    baseUrl: string
    timeout: number
  }
  features: {
    [key: string]: boolean
  }
  analytics: {
    enabled: boolean
    trackingId?: string
  }
}

export interface DatabaseConfig {
  url: string
  ssl: boolean
  pool: {
    min: number
    max: number
  }
}

export interface RedisConfig {
  url: string
  maxRetriesPerRequest: number
  retryDelayMs: number
}

// Component prop types
export interface BaseComponentProps {
  className?: string
  children?: React.ReactNode
}

export interface ButtonProps extends BaseComponentProps {
  variant?: 'primary' | 'secondary' | 'ghost' | 'destructive'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  loading?: boolean
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
}

export interface ModalProps extends BaseComponentProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

// API types
export interface PaginationParams {
  page: number
  limit: number
  sort?: string
  order?: 'asc' | 'desc'
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
    hasNext: boolean
    hasPrev: boolean
  }
}

// Error types
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

export class ValidationError extends AppError {
  constructor(
    message: string,
    public fields: FormFieldError[]
  ) {
    super(message, 400, 'VALIDATION_ERROR')
    this.name = 'ValidationError'
  }
}

// Testing types
export interface TestUser {
  id: string
  email: string
  name: string
  password: string
}

export interface MockApiResponse<T = unknown> {
  data: T
  status: number
  headers: Record<string, string>
}
