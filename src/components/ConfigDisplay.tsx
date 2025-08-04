'use client'

import { config, isFeatureEnabled } from '../../config'
import { logger } from '../lib/logger'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ThemeToggle } from '@/components/theme-toggle'

interface ConfigDisplayProps {
  className?: string
}

export function ConfigDisplay({ className }: ConfigDisplayProps) {
  const handleTestLog = () => {
    logger.info('Test log from ConfigDisplay component', {
      component: 'ConfigDisplay',
      timestamp: new Date().toISOString(),
    })
  }

  return (
    <div className={className}>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Environment Configuration</h2>
          <p className="text-muted-foreground">View your application configuration and settings</p>
        </div>
        <ThemeToggle />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Application</CardTitle>
            <CardDescription>Core application settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Name:</span>
              <Badge variant="secondary">{config.app.name}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Version:</span>
              <Badge variant="outline">{config.app.version}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Environment:</span>
              <Badge variant={config.app.environment === 'production' ? 'default' : 'secondary'}>
                {config.app.environment}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">URL:</span>
              <span className="text-muted-foreground text-sm">{config.app.url}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>API Configuration</CardTitle>
            <CardDescription>API endpoint and settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Base URL:</span>
              <span className="text-muted-foreground text-sm">{config.api.baseUrl}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Timeout:</span>
              <Badge variant="outline">{config.api.timeout}ms</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Features</CardTitle>
            <CardDescription>Application feature toggles</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {Object.entries(config.features).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between">
                <span className="text-sm font-medium">{key}:</span>
                <Badge variant={value ? 'default' : 'destructive'}>{String(value)}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Analytics</CardTitle>
            <CardDescription>Analytics and tracking configuration</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Enabled:</span>
              <Badge variant={config.analytics.enabled ? 'default' : 'secondary'}>
                {String(config.analytics.enabled)}
              </Badge>
            </div>
            {config.analytics.trackingId && (
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Tracking ID:</span>
                <span className="text-muted-foreground text-sm">{config.analytics.trackingId}</span>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Feature Flags</CardTitle>
            <CardDescription>Dynamic feature enablement</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">New UI:</span>
              <Badge variant={isFeatureEnabled('newUI') ? 'default' : 'secondary'}>
                {String(isFeatureEnabled('newUI'))}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Beta Features:</span>
              <Badge variant={isFeatureEnabled('betaFeatures') ? 'default' : 'secondary'}>
                {String(isFeatureEnabled('betaFeatures'))}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Debug Mode:</span>
              <Badge variant={isFeatureEnabled('debugMode') ? 'default' : 'secondary'}>
                {String(isFeatureEnabled('debugMode'))}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Development Tools</CardTitle>
            <CardDescription>Testing and debugging utilities</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={handleTestLog} className="w-full">
              Test Logger
            </Button>
            <p className="text-muted-foreground mt-2 text-xs">
              Check browser console for log output
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default ConfigDisplay
