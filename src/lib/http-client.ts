/**
 * HTTP client utilities with error handling
 */

import { config } from '../../config'
import { logger } from './logger'
import { AppError, logError } from './errors'

// HTTP client configuration
const DEFAULT_TIMEOUT = config.api.timeout
const BASE_URL = config.api.baseUrl

// Request configuration
interface RequestConfig {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
  headers?: Record<string, string>
  body?: unknown
  timeout?: number
  retries?: number
}

// Response wrapper
interface ApiResponse<T = unknown> {
  data: T
  message: string
  success: boolean
  timestamp: string
}

// HTTP client class
class HttpClient {
  private baseURL: string
  private defaultHeaders: Record<string, string>

  constructor(baseURL: string) {
    this.baseURL = baseURL
    this.defaultHeaders = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    }
  }

  // Set authorization header
  setAuthToken(token: string) {
    this.defaultHeaders['Authorization'] = `Bearer ${token}`
  }

  // Remove authorization header
  clearAuthToken() {
    delete this.defaultHeaders['Authorization']
  }

  // Build full URL
  private buildUrl(endpoint: string): string {
    const url = endpoint.startsWith('http')
      ? endpoint
      : `${this.baseURL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`

    return url
  }

  // Make HTTP request
  private async request<T>(endpoint: string, config: RequestConfig = {}): Promise<T> {
    const { method = 'GET', headers = {}, body, timeout = DEFAULT_TIMEOUT } = config

    const url = this.buildUrl(endpoint)
    const requestId = Math.random().toString(36).substring(7)

    logger.debug('HTTP Request', {
      requestId,
      method,
      url,
      headers: { ...this.defaultHeaders, ...headers },
    })

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), timeout)

    try {
      const fetchOptions: RequestInit = {
        method,
        headers: {
          ...this.defaultHeaders,
          ...headers,
        },
        signal: controller.signal,
      }

      if (body) {
        fetchOptions.body = JSON.stringify(body)
      }

      const response = await fetch(url, fetchOptions)

      clearTimeout(timeoutId)

      const responseData = await response.json()

      logger.debug('HTTP Response', {
        requestId,
        status: response.status,
        statusText: response.statusText,
      })

      if (!response.ok) {
        throw new AppError(
          responseData.message || response.statusText,
          response.status,
          responseData.error || 'HTTP_ERROR'
        )
      }

      return responseData as T
    } catch (error) {
      clearTimeout(timeoutId)

      if (error instanceof AppError) {
        throw error
      }

      // Handle fetch errors
      const errorMessage = error instanceof Error ? error.message : 'Network error'
      const appError = new AppError(errorMessage, 500, 'NETWORK_ERROR')

      logError(appError)
      throw appError
    }
  }

  // HTTP methods
  async get<T>(endpoint: string, config?: Omit<RequestConfig, 'method' | 'body'>): Promise<T> {
    return this.request<T>(endpoint, { ...config, method: 'GET' })
  }

  async post<T>(
    endpoint: string,
    data?: unknown,
    config?: Omit<RequestConfig, 'method'>
  ): Promise<T> {
    return this.request<T>(endpoint, { ...config, method: 'POST', body: data })
  }

  async put<T>(
    endpoint: string,
    data?: unknown,
    config?: Omit<RequestConfig, 'method'>
  ): Promise<T> {
    return this.request<T>(endpoint, { ...config, method: 'PUT', body: data })
  }

  async patch<T>(
    endpoint: string,
    data?: unknown,
    config?: Omit<RequestConfig, 'method'>
  ): Promise<T> {
    return this.request<T>(endpoint, { ...config, method: 'PATCH', body: data })
  }

  async delete<T>(endpoint: string, config?: Omit<RequestConfig, 'method' | 'body'>): Promise<T> {
    return this.request<T>(endpoint, { ...config, method: 'DELETE' })
  }
}

// Create HTTP client instance
export const httpClient = new HttpClient(BASE_URL)

// API utilities
export const api = {
  get: <T>(endpoint: string) => httpClient.get<ApiResponse<T>>(endpoint),
  post: <T>(endpoint: string, data?: unknown) => httpClient.post<ApiResponse<T>>(endpoint, data),
  put: <T>(endpoint: string, data?: unknown) => httpClient.put<ApiResponse<T>>(endpoint, data),
  patch: <T>(endpoint: string, data?: unknown) => httpClient.patch<ApiResponse<T>>(endpoint, data),
  delete: <T>(endpoint: string) => httpClient.delete<ApiResponse<T>>(endpoint),
}

// Export HTTP client for advanced usage
export { HttpClient }
export default httpClient
