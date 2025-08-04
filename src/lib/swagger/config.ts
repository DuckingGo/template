import swaggerJSDoc from 'swagger-jsdoc'

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Template API',
    version: '1.0.0',
    description: 'API documentation for Next.js Template with Shadcn/ui',
    contact: {
      name: 'Template API Support',
      email: 'kuliah.informatika01@gmail.com',
    },
    license: {
      name: 'MIT',
      url: 'https://opensource.org/licenses/MIT',
    },
  },
  servers: [
    {
      url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3001',
      description: 'Development server',
    },
  ],
  components: {
    schemas: {
      Error: {
        type: 'object',
        properties: {
          error: {
            type: 'string',
            description: 'Error message',
          },
          timestamp: {
            type: 'string',
            format: 'date-time',
            description: 'Error timestamp',
          },
        },
      },
      Config: {
        type: 'object',
        properties: {
          app: {
            type: 'object',
            properties: {
              name: { type: 'string' },
              version: { type: 'string' },
              environment: { type: 'string' },
              url: { type: 'string' },
            },
          },
          api: {
            type: 'object',
            properties: {
              baseUrl: { type: 'string' },
              timeout: { type: 'number' },
            },
          },
          features: {
            type: 'object',
            additionalProperties: { type: 'boolean' },
          },
          analytics: {
            type: 'object',
            properties: {
              enabled: { type: 'boolean' },
              trackingId: { type: 'string' },
            },
          },
          featureFlags: {
            type: 'object',
            additionalProperties: { type: 'boolean' },
          },
        },
      },
      Health: {
        type: 'object',
        properties: {
          status: {
            type: 'string',
            enum: ['healthy', 'unhealthy'],
          },
          timestamp: {
            type: 'string',
            format: 'date-time',
          },
          environment: { type: 'string' },
          version: { type: 'string' },
          uptime: { type: 'number' },
          memory: {
            type: 'object',
            properties: {
              rss: { type: 'number' },
              heapTotal: { type: 'number' },
              heapUsed: { type: 'number' },
              external: { type: 'number' },
            },
          },
          checks: {
            type: 'object',
            additionalProperties: { type: 'string' },
          },
        },
      },
      SystemInfo: {
        type: 'object',
        properties: {
          platform: { type: 'string' },
          arch: { type: 'string' },
          release: { type: 'string' },
          hostname: { type: 'string' },
          cpus: { type: 'number' },
          total_memory: { type: 'string' },
          free_memory: { type: 'string' },
          uptime: { type: 'string' },
          load_average: {
            type: 'array',
            items: { type: 'number' },
          },
          node_version: { type: 'string' },
          npm_version: { type: 'string' },
          timezone: { type: 'string' },
        },
      },
      LogEntry: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          timestamp: {
            type: 'string',
            format: 'date-time',
          },
          level: {
            type: 'string',
            enum: ['debug', 'info', 'warn', 'error'],
          },
          message: { type: 'string' },
          metadata: {
            type: 'object',
            additionalProperties: true,
          },
        },
      },
    },
  },
}

const options = {
  definition: swaggerDefinition,
  apis: ['./src/app/api/**/*.ts'], // Path to the API files
}

export const swaggerSpec = swaggerJSDoc(options)
