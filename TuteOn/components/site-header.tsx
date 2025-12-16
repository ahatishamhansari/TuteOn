"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { GraduationCap } from "lucide-react"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

export function SiteHeader() {
    const pathname = usePathname()
    // Don't show header on dashboard or auth pages if desired, but for now show everywhere except maybe dashboard if it has its own shell. 
    // Actually, simple is better: show everywhere.

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
            <div className="container flex h-16 items-center justify-between">
                <Link href="/" className="flex items-center gap-2">
                    <GraduationCap className="h-6 w-6 text-blue-500" />
                    <span className="text-xl font-bold tracking-tight">TuteOn</span>
                </Link>
                <nav className="hidden md:flex gap-6 text-sm font-medium text-muted-foreground">
                    <Link href="/browse" className={cn("hover:text-primary transition-colors", pathname === "/browse" && "text-primary")}>
                        Find Students
                    </Link>
                    <Link href="/find-tutors" className={cn("hover:text-primary transition-colors", pathname === "/find-tutors" && "text-primary")}>
                        Find Teachers
                    </Link>
                    <Link href="/about" className={cn("hover:text-primary transition-colors", pathname === "/about" && "text-primary")}>
                        About
                    </Link>
                </nav>
                <div className="flex items-center gap-4">
                    <Link href="/login">
                        <Button variant="ghost" size="sm">Log in</Button>
                    </Link>
                    <Link href="/signup">
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/20">
                            Get Started
                        </Button>
                    </Link>
                </div>
            </div>
        </header>
    )
}
