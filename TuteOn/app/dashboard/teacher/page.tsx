import { db } from "@/lib/db"
import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default async function TeacherDashboard() {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) return <div className="p-10">Please log in.</div>

    const teacher = await db.user.findUnique({
        where: { email: session.user.email },
        include: {
            teacherProfile: {
                include: {
                    unlockedContacts: {
                        include: { user: true, studentRequest: true }
                    }
                }
            }
        }
    })

    if (!teacher?.teacherProfile) return <div className="p-10">Teacher profile not found.</div>

    return (
        <div className="container py-10">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Teacher Dashboard</h1>
                <Card className="w-fit">
                    <CardContent className="py-4 flex items-center gap-4">
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Available Coins</p>
                            <p className="text-2xl font-bold">{teacher.teacherProfile.coins}</p>
                        </div>
                        <Badge variant="secondary" className="bg-yellow-500/10 text-yellow-600 hover:bg-yellow-500/20">Buy More</Badge>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Unlocked Student Contacts</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Student Name</TableHead>
                                <TableHead>Request Subject</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Unlocked On</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {teacher.teacherProfile.unlockedContacts.map((contact) => (
                                <TableRow key={contact.id}>
                                    <TableCell className="font-medium">{contact.user.name}</TableCell>
                                    <TableCell>{contact.studentRequest?.subject || "Direct Unlock"}</TableCell>
                                    <TableCell>{contact.user.email}</TableCell>
                                    <TableCell>{contact.createdAt.toLocaleDateString()}</TableCell>
                                </TableRow>
                            ))}
                            {teacher.teacherProfile.unlockedContacts.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={4} className="text-center py-6 text-muted-foreground">
                                        You haven't unlocked any contacts yet.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}
