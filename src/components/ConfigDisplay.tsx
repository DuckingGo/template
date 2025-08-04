'use client'

import { config, isFeatureEnabled } from '../../config'
import { logger } from '../lib/logger'

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
      <h2 className="mb-4 text-2xl font-bold">Environment Configuration</h2>

      <div className="grid gap-4">
        <div className="rounded-lg border p-4">
          <h3 className="mb-2 text-lg font-semibold">Application</h3>
          <ul className="space-y-1 text-sm">
            <li>
              <strong>Name:</strong> {config.app.name}
            </li>
            <li>
              <strong>Version:</strong> {config.app.version}
            </li>
            <li>
              <strong>Environment:</strong> {config.app.environment}
            </li>
            <li>
              <strong>URL:</strong> {config.app.url}
            </li>
          </ul>
        </div>

        <div className="rounded-lg border p-4">
          <h3 className="mb-2 text-lg font-semibold">API</h3>
          <ul className="space-y-1 text-sm">
            <li>
              <strong>Base URL:</strong> {config.api.baseUrl}
            </li>
            <li>
              <strong>Timeout:</strong> {config.api.timeout}ms
            </li>
          </ul>
        </div>

        <div className="rounded-lg border p-4">
          <h3 className="mb-2 text-lg font-semibold">Features</h3>
          <ul className="space-y-1 text-sm">
            {Object.entries(config.features).map(([key, value]) => (
              <li key={key}>
                <strong>{key}:</strong>
                <span className={value ? 'text-green-600' : 'text-red-600'}>
                  {' ' + String(value)}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-lg border p-4">
          <h3 className="mb-2 text-lg font-semibold">Analytics</h3>
          <ul className="space-y-1 text-sm">
            <li>
              <strong>Enabled:</strong> {String(config.analytics.enabled)}
            </li>
            {config.analytics.trackingId && (
              <li>
                <strong>Tracking ID:</strong> {config.analytics.trackingId}
              </li>
            )}
          </ul>
        </div>

        <div className="rounded-lg border p-4">
          <h3 className="mb-2 text-lg font-semibold">Feature Flags</h3>
          <ul className="space-y-1 text-sm">
            <li>
              <strong>New UI:</strong> {String(isFeatureEnabled('newUI'))}
            </li>
            <li>
              <strong>Beta Features:</strong> {String(isFeatureEnabled('betaFeatures'))}
            </li>
            <li>
              <strong>Debug Mode:</strong> {String(isFeatureEnabled('debugMode'))}
            </li>
          </ul>
        </div>

        <div className="rounded-lg border p-4">
          <h3 className="mb-2 text-lg font-semibold">Development Tools</h3>
          <button
            onClick={handleTestLog}
            className="rounded bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600"
          >
            Test Logger
          </button>
          <p className="mt-2 text-xs text-gray-600">Check browser console for log output</p>
        </div>
      </div>
    </div>
  )
}

export default ConfigDisplay
