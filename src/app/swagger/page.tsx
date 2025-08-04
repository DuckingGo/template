'use client'

import { useState, useEffect } from 'react'
import SwaggerUI from 'swagger-ui-react'
import 'swagger-ui-react/swagger-ui.css'
import './swagger.css'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft, FileText } from 'lucide-react'

export default function SwaggerPage() {
  const [swaggerSpec, setSwaggerSpec] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchSwaggerSpec = async () => {
      try {
        const response = await fetch('/api/swagger')
        if (response.ok) {
          const spec = await response.json()
          setSwaggerSpec(spec)
        } else {
          setError('Failed to load API specification')
        }
      } catch (err) {
        setError('Error loading API specification')
        console.error('Swagger spec error:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchSwaggerSpec()
  }, [])

  return (
    <div className="bg-background min-h-screen">
      <div className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/test">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Dashboard
                </Button>
              </Link>
              <div className="flex items-center space-x-2">
                <FileText className="h-6 w-6 text-blue-500" />
                <div>
                  <h1 className="text-2xl font-bold">API Documentation</h1>
                  <p className="text-muted-foreground text-sm">
                    Interactive API documentation powered by Swagger
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {loading && (
          <Card>
            <CardHeader>
              <CardTitle>Loading...</CardTitle>
              <CardDescription>Fetching API specification</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center py-8">
                <div className="border-primary h-8 w-8 animate-spin rounded-full border-b-2"></div>
              </div>
            </CardContent>
          </Card>
        )}

        {error && (
          <Card>
            <CardHeader>
              <CardTitle className="text-red-600">Error</CardTitle>
              <CardDescription>{error}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm">
                Please ensure the API server is running and accessible.
              </p>
            </CardContent>
          </Card>
        )}

        {swaggerSpec && (
          <div className="swagger-container">
            <SwaggerUI
              spec={swaggerSpec}
              deepLinking={true}
              displayOperationId={false}
              defaultModelsExpandDepth={1}
              defaultModelExpandDepth={1}
              defaultModelRendering="example"
              displayRequestDuration={true}
              docExpansion="list"
              filter={true}
              showExtensions={true}
              showCommonExtensions={true}
              tryItOutEnabled={true}
            />
          </div>
        )}
      </div>
    </div>
  )
}
