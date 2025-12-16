import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { ArrowRight, CheckCircle, Shield, Zap, GraduationCap, Users } from "lucide-react"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground selection:bg-primary/20">
      {/* Navbar */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-6 w-6 text-blue-500" />
            <span className="text-xl font-bold tracking-tight">TuteOn</span>
          </div>
          <nav className="hidden md:flex gap-6 text-sm font-medium text-muted-foreground">
            <Link href="#features" className="hover:text-primary transition-colors">Features</Link>
            <Link href="#how-it-works" className="hover:text-primary transition-colors">How it Works</Link>
            <Link href="/browse" className="hover:text-primary transition-colors">Find Students</Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost" size="sm">Log in</Button>
            </Link>
            <Link href="/signup">
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/20">Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-24 pb-32 md:pt-32">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-background to-background"></div>
          <div className="container flex flex-col items-center text-center">
            <div className="mb-6 rounded-full bg-blue-500/10 px-3 py-1 text-sm font-medium text-blue-500 ring-1 ring-inset ring-blue-500/20">
              Transforming Tutoring Connections
            </div>
            <h1 className="max-w-4xl text-5xl font-extrabold tracking-tight sm:text-7xl bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70">
              Connect with Students. <br />
              <span className="text-blue-500">Securely & Instantly.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
              The premium platform for teachers to find students. Use our AI Copilot to build your profile, secure your contacts with our token system, and start teaching today.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link href="/browse">
                <Button size="lg" className="h-12 px-8 text-base bg-blue-600 hover:bg-blue-700 shadow-xl shadow-blue-500/20 transition-all hover:scale-105">
                  Find Students Now <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/about">
                <Button variant="outline" size="lg" className="h-12 px-8 text-base backdrop-blur-sm">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section id="features" className="py-24 bg-muted/30">
          <div className="container">
            <div className="mb-16 text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Why Choose TuteOn?</h2>
              <p className="mt-4 text-muted-foreground">Built for professional educators and serious students.</p>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              <Card className="bg-background/60 backdrop-blur-sm border-muted/50 hover:shadow-lg transition-all hover:border-blue-500/50">
                <CardContent className="pt-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-500/10 text-blue-500">
                    <Shield className="h-6 w-6" />
                  </div>
                  <h3 className="mb-2 text-xl font-bold">Secure Contact Exchange</h3>
                  <p className="text-muted-foreground">
                    Phone numbers are protected. Unlock student contacts only when you're ready to connect using our secure token system.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-background/60 backdrop-blur-sm border-muted/50 hover:shadow-lg transition-all hover:border-purple-500/50">
                <CardContent className="pt-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-500/10 text-purple-500">
                    <Zap className="h-6 w-6" />
                  </div>
                  <h3 className="mb-2 text-xl font-bold">AI Copilot</h3>
                  <p className="text-muted-foreground">
                    Our AI assists you in creating the perfect profile and finding the most relevant student requests automatically.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-background/60 backdrop-blur-sm border-muted/50 hover:shadow-lg transition-all hover:border-green-500/50">
                <CardContent className="pt-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-green-500/10 text-green-500">
                    <Users className="h-6 w-6" />
                  </div>
                  <h3 className="mb-2 text-xl font-bold">Verified Community</h3>
                  <p className="text-muted-foreground">
                    Join a community of verified teachers and students. Quality connections, zero spam.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="border-t py-12 bg-muted/20">
        <div className="container flex flex-col md:flex-row justify-between gap-8 text-sm text-muted-foreground">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <GraduationCap className="h-5 w-5" />
              <span className="font-bold text-foreground">TuteOn</span>
            </div>
            <p>© 2024 TuteOn Inc. All rights reserved.</p>
          </div>
          <div className="flex gap-8">
            <Link href="/terms" className="hover:text-foreground">Terms</Link>
            <Link href="/privacy" className="hover:text-foreground">Privacy</Link>
            <Link href="/contact" className="hover:text-foreground">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
