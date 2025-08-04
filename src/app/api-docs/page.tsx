import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Database, Activity, Server, Code2 } from 'lucide-react'

export default function APIDocumentation() {
  const apiEndpoints = [
    {
      method: 'GET',
      path: '/api/config',
      description: 'Get application configuration',
      icon: <Code2 className="h-4 w-4" />,
      example: 'curl http://localhost:3001/api/config',
    },
    {
      method: 'GET',
      path: '/api/health',
      description: 'System health check',
      icon: <Activity className="h-4 w-4" />,
      example: 'curl http://localhost:3001/api/health',
    },
    {
      method: 'GET',
      path: '/api/system',
      description: 'System information',
      icon: <Server className="h-4 w-4" />,
      example: 'curl http://localhost:3001/api/system',
    },
    {
      method: 'GET',
      path: '/api/env',
      description: 'Environment variables (public only)',
      icon: <Database className="h-4 w-4" />,
      example: 'curl http://localhost:3001/api/env',
    },
    {
      method: 'GET',
      path: '/api/features',
      description: 'Feature flags status',
      icon: <Code2 className="h-4 w-4" />,
      example: 'curl http://localhost:3001/api/features',
    },
    {
      method: 'POST',
      path: '/api/features',
      description: 'Update feature flag (demo)',
      icon: <Code2 className="h-4 w-4" />,
      example:
        'curl -X POST -H "Content-Type: application/json" -d \'{"feature":"newUI","enabled":true}\' http://localhost:3001/api/features',
    },
    {
      method: 'GET',
      path: '/api/logs',
      description: 'Get application logs',
      icon: <Database className="h-4 w-4" />,
      example: 'curl http://localhost:3001/api/logs?level=info&limit=10',
    },
    {
      method: 'POST',
      path: '/api/logs',
      description: 'Create log entry',
      icon: <Database className="h-4 w-4" />,
      example:
        'curl -X POST -H "Content-Type: application/json" -d \'{"level":"info","message":"Test log"}\' http://localhost:3001/api/logs',
    },
  ]

  return (
    <div className="min-h-screen p-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex items-center space-x-4">
          <Link href="/test">
            <Button variant="outline" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">API Documentation</h1>
            <p className="text-muted-foreground">Available API endpoints for the template</p>
          </div>
        </div>

        <div className="grid gap-4">
          {apiEndpoints.map((endpoint, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {endpoint.icon}
                    <CardTitle className="text-lg">{endpoint.path}</CardTitle>
                  </div>
                  <Badge variant={endpoint.method === 'GET' ? 'default' : 'secondary'}>
                    {endpoint.method}
                  </Badge>
                </div>
                <CardDescription>{endpoint.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-muted rounded p-3">
                  <code className="text-sm">{endpoint.example}</code>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Testing the APIs</CardTitle>
              <CardDescription>
                You can test these APIs using curl, Postman, or any HTTP client
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="mb-2 font-medium">Quick Test Commands:</h4>
                <div className="space-y-2">
                  <div className="bg-muted rounded p-2">
                    <pre className="overflow-x-auto text-sm">
                      {`# Test all GET endpoints
curl http://localhost:3001/api/config | jq
curl http://localhost:3001/api/health | jq
curl http://localhost:3001/api/system | jq`}
                    </pre>
                  </div>
                  <div className="bg-muted rounded p-2">
                    <pre className="overflow-x-auto text-sm">
                      {`# Create a test log
curl -X POST -H "Content-Type: application/json" \\
  -d '{"level":"info","message":"API test log"}' \\
  http://localhost:3001/api/logs | jq`}
                    </pre>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
