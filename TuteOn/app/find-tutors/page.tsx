import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { getTeacherProfiles } from "../actions"
import { Coins, GraduationCap, Star } from "lucide-react"

export default async function FindTutorsPage() {
    const teachers = await getTeacherProfiles()

    return (
        <div className="container py-10">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
                    Find Your Perfect Tutor
                </h1>
                <p className="text-muted-foreground text-lg">
                    Browse top-rated educators ready to help you excel.
                </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {teachers.map((profile) => (
                    <Card key={profile.id} className="hover:shadow-lg transition-shadow border-primary/10">
                        <CardHeader className="flex flex-row items-center gap-4">
                            <Avatar className="h-14 w-14 border-2 border-primary/20">
                                <AvatarImage src={profile.user.image || ""} />
                                <AvatarFallback>{profile.user.name?.charAt(0) || "T"}</AvatarFallback>
                            </Avatar>
                            <div>
                                <CardTitle>{profile.user.name}</CardTitle>
                                <p className="text-sm text-muted-foreground flex items-center gap-1">
                                    <GraduationCap className="h-3 w-3" /> Expert Tutor
                                </p>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <p className="text-sm font-medium mb-1 text-muted-foreground">Subjects</p>
                                <div className="flex flex-wrap gap-2">
                                    {profile.subjects?.split(',').map(s => (
                                        <Badge key={s} variant="secondary">{s.trim()}</Badge>
                                    )) || <span className="text-sm text-muted-foreground">General</span>}
                                </div>
                            </div>

                            <div className="line-clamp-3 text-sm text-muted-foreground">
                                {profile.bio || "No bio available."}
                            </div>

                            <div className="flex items-center justify-between pt-2 border-t">
                                <div className="flex items-center gap-1 text-yellow-500">
                                    <Star className="fill-current h-4 w-4" />
                                    <span className="text-sm font-medium">New</span>
                                </div>
                                <div className="text-sm font-semibold">
                                    ${profile.pricePerHour || 25}/hr
                                </div>
                            </div>

                            <Button className="w-full bg-gradient-to-r from-blue-600 to-violet-600">
                                View Profile
                            </Button>
                        </CardContent>
                    </Card>
                ))}

                {teachers.length === 0 && (
                    <div className="col-span-full text-center py-20">
                        <p className="text-muted-foreground">No teachers found yet. Be the first to join!</p>
                        <Button className="mt-4" variant="outline" asChild>
                            <a href="/api/auth/signin">Join as Teacher</a>
                        </Button>
                    </div>
                )}
            </div>
        </div>
    )
}
