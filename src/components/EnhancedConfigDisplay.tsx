'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ThemeToggle } from '@/components/theme-toggle'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { useToast } from '@/hooks'
import { RefreshCw, Server, Settings, Activity, Code } from 'lucide-react'

interface ConfigData {
  app: {
    name: string
    version: string
    environment: string
    url: string
  }
  api: {
    baseUrl: string
    timeout: number
  }
  features: Record<string, boolean>
  analytics: {
    enabled: boolean
    trackingId?: string
  }
  featureFlags: Record<string, boolean>
}

interface SystemInfo {
  platform: string
  arch: string
  node_version: string
  cpus: number
  total_memory: string
  free_memory: string
}

interface HealthData {
  status: string
  environment: string
  version: string
  uptime: number
  checks: Record<string, string>
}

export function EnhancedConfigDisplay({ className }: { className?: string }) {
  const [config, setConfig] = useState<ConfigData | null>(null)
  const [systemInfo, setSystemInfo] = useState<SystemInfo | null>(null)
  const [healthData, setHealthData] = useState<HealthData | null>(null)
  const [loading, setLoading] = useState(false)
  const { success, error } = useToast()

  const fetchData = async () => {
    setLoading(true)
    try {
      const [configRes, systemRes, healthRes] = await Promise.all([
        fetch('/api/config'),
        fetch('/api/system'),
        fetch('/api/health'),
      ])

      if (configRes.ok) {
        const configData = await configRes.json()
        setConfig(configData)
      }

      if (systemRes.ok) {
        const systemData = await systemRes.json()
        setSystemInfo(systemData)
      }

      if (healthRes.ok) {
        const healthResponse = await healthRes.json()
        setHealthData(healthResponse)
      }

      success('Configuration data refreshed successfully')
    } catch (err) {
      error('Failed to fetch configuration data')
      console.error('Error fetching data:', err)
    } finally {
      setLoading(false)
    }
  }

  const testLogger = async () => {
    try {
      const response = await fetch('/api/logs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          level: 'info',
          message: 'Test log from Enhanced ConfigDisplay component',
          metadata: {
            component: 'EnhancedConfigDisplay',
            timestamp: new Date().toISOString(),
            user_action: 'test_logger_button',
          },
        }),
      })

      if (response.ok) {
        success('Test log sent successfully! Check the logs tab.')
      } else {
        error('Failed to send test log')
      }
    } catch (err) {
      error('Error sending test log')
      console.error('Logger error:', err)
    }
  }

  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      try {
        const [configRes, systemRes, healthRes] = await Promise.all([
          fetch('/api/config'),
          fetch('/api/system'),
          fetch('/api/health'),
        ])

        if (configRes.ok) {
          const configData = await configRes.json()
          setConfig(configData)
        }

        if (systemRes.ok) {
          const systemData = await systemRes.json()
          setSystemInfo(systemData)
        }

        if (healthRes.ok) {
          const healthResponse = await healthRes.json()
          setHealthData(healthResponse)
        }
      } catch (err) {
        console.error('Error fetching data:', err)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  return (
    <div className={className}>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">System Dashboard</h2>
          <p className="text-muted-foreground">Real-time configuration and system monitoring</p>
        </div>
        <div className="flex items-center space-x-2">
          <Link href="/api-docs">
            <Button variant="outline" size="sm">
              API Docs
            </Button>
          </Link>
          <Link href="/swagger">
            <Button variant="outline" size="sm">
              Swagger UI
            </Button>
          </Link>
          <Button variant="outline" size="sm" onClick={fetchData} disabled={loading}>
            <RefreshCw className={`mr-2 h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <ThemeToggle />
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="config">Configuration</TabsTrigger>
          <TabsTrigger value="system">System Info</TabsTrigger>
          <TabsTrigger value="health">Health Check</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Status</CardTitle>
                <Activity className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {healthData?.status === 'healthy' ? 'Healthy' : 'Unknown'}
                </div>
                <p className="text-muted-foreground text-xs">System is running normally</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Environment</CardTitle>
                <Settings className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold capitalize">
                  {config?.app?.environment || 'Loading...'}
                </div>
                <p className="text-muted-foreground text-xs">Current runtime environment</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Version</CardTitle>
                <Code className="h-4 w-4 text-purple-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{config?.app?.version || 'Loading...'}</div>
                <p className="text-muted-foreground text-xs">Application version</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Platform</CardTitle>
                <Server className="h-4 w-4 text-orange-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{systemInfo?.platform || 'Loading...'}</div>
                <p className="text-muted-foreground text-xs">{systemInfo?.arch} architecture</p>
              </CardContent>
            </Card>
          </div>

          {healthData?.status !== 'healthy' && (
            <Alert>
              <AlertDescription>
                System health check indicates potential issues. Check the Health tab for details.
              </AlertDescription>
            </Alert>
          )}
        </TabsContent>

        <TabsContent value="config" className="space-y-6">
          {config && (
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
                    <Badge
                      variant={config.app.environment === 'production' ? 'default' : 'secondary'}
                    >
                      {config.app.environment}
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Feature Flags</CardTitle>
                  <CardDescription>Dynamic feature toggles</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  {Object.entries(config.featureFlags).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between">
                      <span className="text-sm font-medium">{key}:</span>
                      <Badge variant={value ? 'default' : 'secondary'}>{String(value)}</Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Development Tools</CardTitle>
                  <CardDescription>Testing and debugging utilities</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button onClick={testLogger} className="w-full">
                    Test Logger API
                  </Button>
                  <p className="text-muted-foreground mt-2 text-xs">
                    Sends a test log via API endpoint
                  </p>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>

        <TabsContent value="system" className="space-y-6">
          {systemInfo && (
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Runtime Information</CardTitle>
                  <CardDescription>Node.js and system details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Platform:</span>
                    <Badge variant="outline">{systemInfo.platform}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Architecture:</span>
                    <Badge variant="outline">{systemInfo.arch}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Node Version:</span>
                    <Badge variant="secondary">{systemInfo.node_version}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">CPU Cores:</span>
                    <Badge variant="outline">{systemInfo.cpus}</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Memory Usage</CardTitle>
                  <CardDescription>System memory information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Total Memory:</span>
                    <Badge variant="outline">{systemInfo.total_memory}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Free Memory:</span>
                    <Badge variant="secondary">{systemInfo.free_memory}</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>

        <TabsContent value="health" className="space-y-6">
          {healthData && (
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Health Status</CardTitle>
                  <CardDescription>System health monitoring</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Status:</span>
                    <Badge variant={healthData.status === 'healthy' ? 'default' : 'destructive'}>
                      {healthData.status}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Uptime:</span>
                    <Badge variant="outline">{Math.round(healthData.uptime)} seconds</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Service Checks</CardTitle>
                  <CardDescription>External service connectivity</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  {Object.entries(healthData.checks).map(([service, status]) => (
                    <div key={service} className="flex items-center justify-between">
                      <span className="text-sm font-medium capitalize">{service}:</span>
                      <Badge variant={status === 'ok' ? 'default' : 'destructive'}>
                        {String(status)}
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default EnhancedConfigDisplay
