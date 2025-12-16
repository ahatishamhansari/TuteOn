import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { Github } from "lucide-react"

export default function LoginPage() {
    return (
        <div className="container flex items-center justify-center min-h-[calc(100vh-200px)] py-10">
            <Card className="w-full max-w-md border-primary/10 shadow-lg">
                <CardHeader className="space-y-1 text-center">
                    <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
                    <p className="text-sm text-muted-foreground">Enter your email to sign in to your account</p>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" placeholder="m@example.com" type="email" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" type="password" />
                    </div>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">Sign In</Button>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                        </div>
                    </div>

                    <Button variant="outline" className="w-full" asChild>
                        <Link href="/api/auth/signin">
                            <Github className="mr-2 h-4 w-4" /> Github (Demo Only)
                        </Link>
                    </Button>
                </CardContent>
                <CardFooter className="flex flex-col gap-2">
                    <p className="text-xs text-center text-muted-foreground">
                        <Link href="/signup" className="underline hover:text-primary">
                            Don&apos;t have an account? Sign Up
                        </Link>
                    </p>
                </CardFooter>
            </Card>
        </div>
    )
}
