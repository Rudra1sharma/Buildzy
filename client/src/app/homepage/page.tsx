import Link from 'next/link'
import { Paintbrush } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/dashboard/themeToggle'

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link className="flex items-center justify-center" href="/">
          <Paintbrush className="h-6 w-6 text-primary" />
          <span className="ml-2 text-lg font-bold text-primary">PaintApp</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="/login">
            Log In
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="/signup">
            Sign Up
          </Link>
          <ThemeToggle />
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Welcome to PaintApp
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Collaborate and create stunning artwork in real-time with our innovative digital painting platform.
                </p>
              </div>
              <div className="space-x-4">
                <Button asChild>
                  <Link href="/signup">Get Started</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-secondary">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Real-Time Collaboration</h3>
                <p className="text-muted-foreground">
                  Work together with your team in real-time, seeing changes as they happen.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Advanced Tools</h3>
                <p className="text-muted-foreground">
                  Access a wide range of professional-grade digital painting tools and brushes.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Cloud Storage</h3>
                <p className="text-muted-foreground">
                  Store and access your projects from anywhere with our secure cloud storage.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">© 2023 PaintApp. All rights reserved.</p>
        
      </footer>
    </div>
  )
}

