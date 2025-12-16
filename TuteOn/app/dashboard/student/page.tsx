
import { db } from "@/lib/db"
import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CloseRequestButton } from "@/components/close-request-button"

export default async function StudentDashboard() {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
        return <div className="p-10">Please log in.</div>
    }

    // Fetch student requests and see who unlocked them
    const myRequests = await db.studentRequest.findMany({
        where: {
            user: { email: session.user.email }
        },
        include: {
            accesses: {
                include: {
                    teacher: {
                        include: {
                            user: true
                        }
                    }
                }
            }
        }
    })

    return (
        <div className="container py-10">
            <h1 className="text-3xl font-bold mb-8">My Dashboard</h1>

            <div className="space-y-8">
                <section>
                    <h2 className="text-xl font-semibold mb-4">Posted Requests</h2>
                    <div className="grid gap-4">
                        {myRequests.map(req => (
                            <Card key={req.id}>
                                <CardHeader>
                                    <CardTitle className="flex justify-between items-center">
                                        <div className="flex items-center gap-2">
                                            <span>{req.subject}</span>
                                            <Badge variant={req.status === 'OPEN' ? 'default' : 'secondary'}>{req.status}</Badge>
                                        </div>
                                        {req.status === 'OPEN' && <CloseRequestButton requestId={req.id} />}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground mb-4">{req.description}</p>

                                    <h3 className="font-medium mb-2">Teachers who contacted you:</h3>
                                    {req.accesses.length === 0 ? (
                                        <p className="text-sm text-muted-foreground">No teachers have unlocked your contact yet.</p>
                                    ) : (
                                        <div className="space-y-2">
                                            {req.accesses.map(access => (
                                                <div key={access.id} className="flex items-center gap-3 p-3 rounded-lg border bg-card/50">
                                                    <Avatar>
                                                        <AvatarFallback>{access.teacher.user.name?.charAt(0) || "T"}</AvatarFallback>
                                                    </Avatar>
                                                    <div>
                                                        <p className="font-medium">{access.teacher.user.name}</p>
                                                        <p className="text-xs text-muted-foreground">{access.teacher.bio?.substring(0, 50)}...</p>
                                                    </div>
                                                    <div className="ml-auto">
                                                        <Button size="sm" variant="outline">View Profile</Button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        ))}
                        {myRequests.length === 0 && <p>You haven't posted any requests yet.</p>}
                    </div>
                </section>
            </div>
        </div>
    )
}
