import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getStudentRequests, getUnlockedContact, unlockContact } from "../actions"
import { Lock, Unlock, Phone } from "lucide-react"
import { RequestCard } from "@/components/request-card" // Client component for interactivity

export default async function BrowsePage() {
    const requests = await getStudentRequests()

    return (
        <div className="container py-10">
            <h1 className="text-3xl font-bold mb-8">Student Requests</h1>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {requests.map((req) => (
                    <RequestCard key={req.id} request={req} />
                ))}
                {requests.length === 0 && (
                    <p className="text-muted-foreground col-span-full">No active requests found. Check back later!</p>
                )}
            </div>
        </div>
    )
}
