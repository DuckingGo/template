/**
 * Global Type Definitions
 * Define globally available types across the application
 */

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "development" | "production" | "test";
      NEXT_PUBLIC_APP_URL: string;
      NEXT_PUBLIC_API_URL: string;
      DATABASE_URL?: string;
      JWT_SECRET?: string;
      REDIS_URL?: string;
      [key: string]: string | undefined;
    }
  }

  // Extend Window interface for client-side globals
  interface Window {
    __APP_CONFIG__?: Record<string, unknown>;
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }

  // Custom utility types
  type Prettify<T> = {
    [K in keyof T]: T[K];
  } & {};

  type DeepPartial<T> = {
    [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
  };

  type NonEmptyArray<T> = [T, ...T[]];

  type ValueOf<T> = T[keyof T];

  type Awaited<T> = T extends Promise<infer U> ? U : T;

  // API Response types
  type ApiResponse<T = unknown> = {
    data: T;
    message: string;
    success: boolean;
    timestamp: string;
  };

  type ApiError = {
    error: string;
    message: string;
    statusCode: number;
    timestamp: string;
  };

  // Common entity fields
  type BaseEntity = {
    id: string;
    createdAt: string;
    updatedAt: string;
  };

  // Form and validation types
  type FormFieldError = {
    field: string;
    message: string;
  };

  type ValidationResult<T> = {
    success: boolean;
    data?: T;
    errors?: FormFieldError[];
  };

  // Environment-specific types
  type Environment = "development" | "production" | "test";

  type FeatureFlag = {
    name: string;
    enabled: boolean;
    description?: string;
  };
}

export {};
