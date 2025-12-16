import { Button } from "@/components/ui/button"
import { CheckCircle2, Globe2, Users2, Zap } from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
    return (
        <div className="container py-20">
            {/* Hero Section */}
            <section className="text-center max-w-3xl mx-auto mb-20 animate-in fade-in slide-in-from-bottom-4 duration-1000">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
                    Reimagining Education for the AI Era
                </h1>
                <p className="text-xl text-muted-foreground mb-8">
                    TuteOn connects ambitious students with world-class educators through a transparent, secure, and AI-powered platform.
                </p>
                <div className="flex justify-center gap-4">
                    <Button size="lg" className="bg-gradient-to-r from-blue-600 to-violet-600" asChild>
                        <Link href="/api/auth/signin">Join Our Mission</Link>
                    </Button>
                    <Button size="lg" variant="outline" asChild>
                        <Link href="/browse">Browse Tutors</Link>
                    </Button>
                </div>
            </section>

            {/* Stats / Features */}
            <div className="grid md:grid-cols-3 gap-8 mb-20">
                <div className="p-6 rounded-2xl bg-card border shadow-sm hover:shadow-md transition-all">
                    <Globe2 className="h-10 w-10 text-blue-500 mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Global Access</h3>
                    <p className="text-muted-foreground">Learn from experts anywhere in the world without geographical barriers.</p>
                </div>
                <div className="p-6 rounded-2xl bg-card border shadow-sm hover:shadow-md transition-all">
                    <Zap className="h-10 w-10 text-violet-500 mb-4" />
                    <h3 className="text-xl font-semibold mb-2">AI-Powered Matches</h3>
                    <p className="text-muted-foreground">Our smart algorithms ensure you find the perfect mentor for your learning style.</p>
                </div>
                <div className="p-6 rounded-2xl bg-card border shadow-sm hover:shadow-md transition-all">
                    <Users2 className="h-10 w-10 text-emerald-500 mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Community First</h3>
                    <p className="text-muted-foreground">Join a thriving community of lifelong learners and passionate educators.</p>
                </div>
            </div>

            {/* Mission Statement */}
            <div className="bg-slate-50 dark:bg-slate-900/50 p-10 rounded-3xl border text-center">
                <h2 className="text-3xl font-bold mb-6">Our Promise</h2>
                <ul className="text-left max-w-lg mx-auto space-y-4">
                    <li className="flex items-center gap-3">
                        <CheckCircle2 className="text-green-500 h-6 w-6" />
                        <span className="text-lg">Zero hidden fees for students</span>
                    </li>
                    <li className="flex items-center gap-3">
                        <CheckCircle2 className="text-green-500 h-6 w-6" />
                        <span className="text-lg">Verified tutor profiles</span>
                    </li>
                    <li className="flex items-center gap-3">
                        <CheckCircle2 className="text-green-500 h-6 w-6" />
                        <span className="text-lg">Secure coin-based contact system</span>
                    </li>
                </ul>
            </div>
        </div>
    )
}
