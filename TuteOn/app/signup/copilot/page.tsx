"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bot, User, Send, Loader2, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { registerUser } from "@/app/actions/auth"
import { toast } from "sonner"

type Message = {
    role: "assistant" | "user"
    content: string
}

export default function CopilotSignupPage() {
    const [messages, setMessages] = useState<Message[]>([
        { role: "assistant", content: "Hi! I'm TuteOn's AI Copilot. I'll help you create your account. First, what is your full name?" }
    ])
    const [input, setInput] = useState("")
    const [step, setStep] = useState(0) // 0: Name, 1: Role, 2: Email, 3: Password
    const [formData, setFormData] = useState({ name: "", role: "STUDENT", email: "", password: "" })
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const scrollRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: "smooth" })
        }
    }, [messages])

    const handleSend = async () => {
        if (!input.trim()) return

        const userMsg = input
        setMessages(prev => [...prev, { role: "user", content: userMsg }])
        setInput("")
        setLoading(true)

        // Simulate AI delay
        setTimeout(async () => {
            let aiResponse = ""

            if (step === 0) {
                setFormData(prev => ({ ...prev, name: userMsg }))
                aiResponse = `Nice to meet you, ${userMsg}! Appreciate that. Are you joining as a STUDENT or a TEACHER?`
                setStep(1)
            } else if (step === 1) {
                const role = userMsg.toLowerCase().includes("teacher") ? "TEACHER" : "STUDENT"
                setFormData(prev => ({ ...prev, role }))
                aiResponse = `Got it, a ${role}. What's your email address?`
                setStep(2)
            } else if (step === 2) {
                setFormData(prev => ({ ...prev, email: userMsg }))
                aiResponse = "Perfect. Lastly, please choose a secure password for your account."
                setStep(3)
            } else if (step === 3) {
                setFormData(prev => ({ ...prev, password: userMsg }))
                aiResponse = "Creating your account now..."
                setMessages(prev => [...prev, { role: "assistant", content: aiResponse }])

                // Submit Form
                const data = new FormData()
                data.append("name", formData.name)
                data.append("role", formData.role)
                data.append("email", formData.email)
                data.append("password", userMsg) // Use the current input

                const res = await registerUser(data)

                if (res.error) {
                    setMessages(prev => [...prev, { role: "assistant", content: `Error: ${res.error}. Please try again or use manual signup.` }])
                } else {
                    toast.success("Account created successfully!")
                    setMessages(prev => [...prev, { role: "assistant", content: "Success! Redirecting you to login..." }])
                    setTimeout(() => router.push("/login"), 2000)
                }
                setLoading(false)
                return
            }

            setMessages(prev => [...prev, { role: "assistant", content: aiResponse }])
            setLoading(false)
        }, 1000)
    }

    return (
        <div className="container flex items-center justify-center min-h-[calc(100vh-100px)] py-4">
            <Card className="w-full max-w-lg h-[600px] flex flex-col border-primary/20 shadow-xl">
                <CardHeader className="border-b bg-muted/50">
                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" asChild className="-ml-2">
                            <Link href="/signup"><ArrowLeft className="h-4 w-4" /></Link>
                        </Button>
                        <CardTitle className="flex items-center gap-2">
                            <Bot className="h-5 w-5 text-violet-600" />
                            AI Registration Copilot
                        </CardTitle>
                    </div>
                </CardHeader>
                <CardContent className="flex-1 p-4 overflow-hidden">
                    <ScrollArea className="h-full pr-4">
                        <div className="space-y-4">
                            {messages.map((m, i) => (
                                <div key={i} className={`flex gap-3 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
                                    <Avatar className={m.role === 'assistant' ? "bg-violet-100" : "bg-blue-100"}>
                                        <AvatarFallback>
                                            {m.role === 'assistant' ? <Bot className="h-4 w-4 text-violet-600" /> : <User className="h-4 w-4 text-blue-600" />}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className={`rounded-lg p-3 text-sm max-w-[80%] ${m.role === 'user'
                                            ? 'bg-primary text-primary-foreground'
                                            : 'bg-muted'
                                        }`}>
                                        {m.content}
                                    </div>
                                </div>
                            ))}
                            {loading && (
                                <div className="flex gap-3">
                                    <Avatar className="bg-violet-100">
                                        <AvatarFallback><Bot className="h-4 w-4 text-violet-600" /></AvatarFallback>
                                    </Avatar>
                                    <div className="bg-muted rounded-lg p-3 flex items-center">
                                        <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                                    </div>
                                </div>
                            )}
                            <div ref={scrollRef} />
                        </div>
                    </ScrollArea>
                </CardContent>
                <CardFooter className="p-4 border-t bg-background">
                    <form
                        onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                        className="flex w-full gap-2"
                    >
                        <Input
                            placeholder={step === 3 ? "Enter password..." : "Type your answer..."}
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            type={step === 3 ? "password" : "text"}
                            autoFocus
                            disabled={loading}
                        />
                        <Button type="submit" size="icon" disabled={loading || !input.trim()}>
                            <Send className="h-4 w-4" />
                        </Button>
                    </form>
                </CardFooter>
            </Card>
        </div>
    )
}
