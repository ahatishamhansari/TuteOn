"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Lock, Unlock, Phone, Loader2 } from "lucide-react"
import { unlockContact, getUnlockedContact } from "@/app/actions"
import { toast } from "sonner" // Assuming Sonner is installed, if not we will fix

interface RequestProps {
    request: {
        id: string
        subject: string
        grade: string | null
        description: string | null
        createdAt: Date
        user: { name: string | null }
        status: string
        unlockCount: number
        maxUnlocks: number
    }
}

export function RequestCard({ request }: RequestProps) {
    const [loading, setLoading] = useState(false)
    const [contact, setContact] = useState<{ email: string | null, name: string | null } | null>(null)

    const handleUnlock = async () => {
        setLoading(true)
        try {
            // 1. Attempt unlock
            const result = await unlockContact(request.id)

            if (result.error) {
                alert("Error: " + result.error) // Simple alert for MVP
                // In real app: toast.error(result.error)
                return
            }

            // 2. Fetch contact details
            const details = await getUnlockedContact(request.id)
            setContact(details)

        } catch (e) {
            console.error(e)
            alert("Something went wrong")
        } finally {
            setLoading(false)
        }
    }

    return (
        <Card className="flex flex-col h-full hover:shadow-md transition-shadow">
            <CardHeader>
                <div className="flex justify-between items-start">
                    <CardTitle className="text-xl">{request.subject}</CardTitle>
                    <Badge variant={request.grade ? "default" : "secondary"}>
                        {request.grade || "General"}
                    </Badge>
                </div>
                <p className="text-sm text-muted-foreground">Posted by Student: {request.user.name?.charAt(0)}***</p>
            </CardHeader>
            <CardContent className="flex-1">
                <p className="text-sm">{request.description || "No description provided."}</p>

                {contact && (
                    <div className="mt-4 p-3 bg-green-500/10 border border-green-500/20 rounded-md">
                        <h4 className="font-semibold text-green-700 dark:text-green-400 flex items-center gap-2">
                            <Unlock className="h-4 w-4" /> Contact Revealed
                        </h4>
                        <p className="text-sm mt-1">Email: {contact.email}</p>
                    </div>
                )}
            </CardContent>
            <CardFooter className="flex-col gap-2">
                <div className="w-full flex justify-between text-xs text-muted-foreground mb-2">
                    <span>Teacher Responses: {request.unlockCount}/{request.maxUnlocks}</span>
                    {request.status === 'CLOSED' && <span className="text-red-500 font-medium">Hired/Closed</span>}
                </div>

                {!contact ? (
                    <Button
                        className="w-full"
                        onClick={handleUnlock}
                        disabled={loading || request.status === 'CLOSED' || request.unlockCount >= request.maxUnlocks}
                        variant={request.status === 'CLOSED' ? "ghost" : "default"}
                    >
                        {loading ? (
                            <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Unlocking...</>
                        ) : request.status === 'CLOSED' ? (
                            "Request Closed"
                        ) : request.unlockCount >= request.maxUnlocks ? (
                            "Maximum Responses Reached"
                        ) : (
                            <><Lock className="mr-2 h-4 w-4" /> Unlock Contact (50 Coins)</>
                        )}
                    </Button>
                ) : (
                    <Button className="w-full" variant="secondary" disabled>
                        <Phone className="mr-2 h-4 w-4" /> Contact Unlocked
                    </Button>
                )}
            </CardFooter>
        </Card>
    )
}
