"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Sparkles, Send, User } from "lucide-react"

export default function CopilotPage() {
    const [messages, setMessages] = useState<{ role: 'user' | 'ai', content: string }[]>([
        { role: 'ai', content: "Hi! I'm your TuteOn Copilot. I can help you create a professional teaching profile. Let's start with your name and what you teach." }
    ])
    const [input, setInput] = useState("")

    const handleSend = () => {
        if (!input.trim()) return

        // Add user message
        const newMessages: typeof messages = [...messages, { role: 'user', content: input }]
        setMessages(newMessages)
        setInput("")

        // Simulated AI Response (stub)
        setTimeout(() => {
            setMessages(prev => [...prev, {
                role: 'ai',
                content: "That's great! I've drafted a bio for you: 'Experienced tutor specialized in " + input + "'. Would you like to add any certifications?"
            }])
        }, 1000)
    }

    return (
        <div className="container max-w-2xl py-10 h-[calc(100vh-4rem)] flex flex-col">
            <div className="mb-8 text-center space-y-2">
                <div className="inline-flex items-center justify-center p-3 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400">
                    <Sparkles className="h-6 w-6" />
                </div>
                <h1 className="text-3xl font-bold">Profile Copilot</h1>
                <p className="text-muted-foreground">Build your perfect teacher profile with AI assistance.</p>
            </div>

            <Card className="flex-1 flex flex-col shadow-lg border-purple-200 dark:border-purple-800/50">
                <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.map((m, i) => (
                        <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[80%] rounded-lg p-3 ${m.role === 'user'
                                    ? 'bg-blue-600 text-white rounded-br-none'
                                    : 'bg-muted rounded-bl-none'
                                }`}>
                                {m.content}
                            </div>
                        </div>
                    ))}
                </CardContent>
                <div className="p-4 border-t bg-muted/20">
                    <form className="flex gap-2" onSubmit={(e) => { e.preventDefault(); handleSend() }}>
                        <Input
                            placeholder="Type your answer..."
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            className="flex-1"
                        />
                        <Button type="submit" size="icon">
                            <Send className="h-4 w-4" />
                        </Button>
                    </form>
                </div>
            </Card>
        </div>
    )
}
