"use client"
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { Paintbrush, Users, Zap, Globe } from "lucide-react"
import DashboardHeader from '@/components/dashboard/dashboardHeader'
import { Metadata } from 'next'

const metadata: Metadata = {
  title: 'Homepage | Real-Time Paint App',
  description: 'Manage your projects and view recent activities in our real-time paint application.',
}

export default function HomePage() {

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <DashboardHeader />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Paintbrush className="h-16 w-16 text-primary" />
              </motion.div>
              <motion.h1
                className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                Welcome to PaintApp
              </motion.h1>
              <motion.p
                className="mx-auto max-w-[700px] text-muted-foreground md:text-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                Collaborate and create stunning artwork in real-time with our innovative digital painting platform.
              </motion.p>
              <motion.div
                className="space-x-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <Button asChild size="lg">
                  <Link href="/signup">Get Started</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/login">Log In</Link>
                </Button>
              </motion.div>
            </div>
          </div>
        </section>
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">Features</h2>
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              <motion.div
                className="flex flex-col items-center text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <Users className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-2">Real-Time Collaboration</h3>
                <p className="text-muted-foreground">
                  Work together with your team in real-time, seeing changes as they happen.
                </p>
              </motion.div>
              <motion.div
                className="flex flex-col items-center text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <Zap className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-2">Advanced Tools</h3>
                <p className="text-muted-foreground">
                  Access a wide range of professional-grade digital painting tools and brushes.
                </p>
              </motion.div>
              <motion.div
                className="flex flex-col items-center text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <Globe className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-2">Cloud Storage</h3>
                <p className="text-muted-foreground">
                  Store and access your projects from anywhere with our secure cloud storage.
                </p>
              </motion.div>
            </div>
          </div>
        </section>
        <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">
              What Our Users Say
            </h2>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  name: "Alex Johnson",
                  role: "Graphic Designer",
                  quote:
                    "PaintApp has revolutionized my workflow. The real-time collaboration feature is a game-changer!",
                },
                {
                  name: "Sarah Lee",
                  role: "Illustrator",
                  quote:
                    "The advanced tools in PaintApp are incredible. It's like having a full art studio at my fingertips.",
                },
                {
                  name: "Michael Chen",
                  role: "Art Director",
                  quote: "Cloud storage means I can work from anywhere. PaintApp has made my job so much easier.",
                },
              ].map((testimonial, index) => (
                <motion.div
                  key={index}
                  className="flex flex-col items-center text-center p-6 bg-muted rounded-lg"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  <p className="text-muted-foreground mb-4">"{testimonial.quote}"</p>
                  <h3 className="font-bold">{testimonial.name}</h3>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">© 2023 PaintApp. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}

