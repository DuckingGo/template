import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ThemeToggle } from '@/components/theme-toggle'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, Settings, Palette } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen p-8">
      <div className="mx-auto max-w-6xl">
        <header className="mb-12 text-center">
          <div className="mb-8 flex items-start justify-between">
            <div className="flex-1" />
            <ThemeToggle />
          </div>
          <h1 className="mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-5xl font-bold text-transparent">
            🚀 Next.js Template
          </h1>
          <p className="text-muted-foreground mx-auto max-w-2xl text-xl">
            Production-ready template dengan Shadcn/ui dan Radix primitives untuk pengembangan
            aplikasi web modern
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            <Badge variant="secondary">Next.js 15</Badge>
            <Badge variant="secondary">React 19</Badge>
            <Badge variant="secondary">TypeScript</Badge>
            <Badge variant="secondary">Tailwind CSS</Badge>
            <Badge variant="secondary">Shadcn/ui</Badge>
            <Badge variant="secondary">Radix UI</Badge>
          </div>
        </header>

        <div className="mb-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="group transition-shadow hover:shadow-lg">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Settings className="h-5 w-5 text-blue-500" />
                <CardTitle>Configuration</CardTitle>
              </div>
              <CardDescription>
                Lihat konfigurasi environment dan pengaturan aplikasi
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/test">
                <Button className="w-full transition-transform group-hover:translate-x-1">
                  View Config
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="group transition-shadow hover:shadow-lg">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Palette className="h-5 w-5 text-purple-500" />
                <CardTitle>UI Components</CardTitle>
              </div>
              <CardDescription>Showcase komponen Shadcn/ui dan Radix primitives</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/components">
                <Button
                  variant="outline"
                  className="w-full transition-transform group-hover:translate-x-1"
                >
                  Explore Components
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="group transition-shadow hover:shadow-lg md:col-span-2 lg:col-span-1">
            <CardHeader>
              <CardTitle>Quick Start</CardTitle>
              <CardDescription>Mulai membangun aplikasi Anda dengan template ini</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <p>
                  <code className="bg-muted rounded px-2 py-1">pnpm dev</code> - Start development
                </p>
                <p>
                  <code className="bg-muted rounded px-2 py-1">pnpm ui:add [component]</code> - Add
                  UI components
                </p>
                <p>
                  <code className="bg-muted rounded px-2 py-1">pnpm build</code> - Build for
                  production
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <footer className="text-muted-foreground border-t pt-8 text-center text-sm">
          <p>
            Built with Next.js, TypeScript, Shadcn/ui, dan Radix primitives untuk aplikasi
            production-ready.
          </p>
        </footer>
      </div>
    </div>
  )
}
