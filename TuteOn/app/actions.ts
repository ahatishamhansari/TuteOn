"use server"

import { db } from "@/lib/db"
import { Prisma } from "@prisma/client"
import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth"
import { revalidatePath } from "next/cache"

export async function getStudentRequests() {
    const session = await getServerSession(authOptions)

    // In a real app, filters would go here
    const requests = await db.studentRequest.findMany({
        where: {
            status: "OPEN"
        },
        include: {
            user: {
                select: {
                    name: true,
                    // Email/Phone should NOT be selected here for anonymous browse
                }
            }
        },
        orderBy: {
            createdAt: 'desc'
        }
    })

    return requests
}

export async function unlockContact(requestId: string) {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
        return { error: "Unauthorized" }
    }

    const teacherUser = await db.user.findUnique({
        where: { email: session.user.email },
        include: { teacherProfile: true }
    })

    if (!teacherUser?.teacherProfile) {
        return { error: "Teacher profile not found" }
    }

    const COST_TO_UNLOCK = 50

    if (teacherUser.teacherProfile.coins < COST_TO_UNLOCK) {
        return { error: "Insufficient coins" }
    }

    const teacherProfileId = teacherUser.teacherProfile.id


    // Transaction: Deduct coins & Grant Access
    try {
        const result = await db.$transaction(async (tx: Prisma.TransactionClient) => {
            // 0. CHECK LIMITS & STATUS (The "Fair-Play" Check)
            const requestCheck = await tx.studentRequest.findUnique({
                where: { id: requestId }
            })

            if (!requestCheck) throw new Error("Request not found")

            if (requestCheck.status === "CLOSED" || requestCheck.status === "RESOLVED") {
                throw new Error("This request is already closed/hired.")
            }

            if (requestCheck.unlockCount >= requestCheck.maxUnlocks) {
                throw new Error("Maximum teacher responses reached for this request.")
            }

            // 1. Deduct coins
            await tx.teacherProfile.update({
                where: { id: teacherProfileId },
                data: { coins: { decrement: COST_TO_UNLOCK } }
            })

            // 2. Create Transaction Record
            await tx.transaction.create({
                data: {
                    userId: teacherUser.id,
                    amount: -COST_TO_UNLOCK,
                    type: "SPEND",
                    description: `Unlocked contact for request ${requestId}`
                }
            })

            // 3. Create Access Record & Increment Unlock Count
            // We increment unlockCount here to atomically reserve the spot
            await tx.studentRequest.update({
                where: { id: requestId },
                data: { unlockCount: { increment: 1 } }
            })

            const access = await tx.contactAccess.create({
                data: {
                    teacherId: teacherProfileId,
                    studentRequestId: requestId,
                    studentId: requestCheck.userId
                }
            })

            return access
        })

        revalidatePath('/browse')
        revalidatePath('/dashboard/teacher')
        return { success: true, accessId: result.id }

    } catch (error: any) {
        console.error("Unlock failed:", error)
        // Return clear error message to UI
        return { error: error.message || "Transaction failed" }
    }
}

export async function getUnlockedContact(requestId: string) {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) return null

    const teacher = await db.user.findUnique({
        where: { email: session.user.email },
        include: { teacherProfile: true }
    })

    if (!teacher?.teacherProfile) return null

    const access = await db.contactAccess.findUnique({
        where: {
            teacherId_studentRequestId: {
                teacherId: teacher.teacherProfile.id,
                studentRequestId: requestId
            }
        },
        include: {
            user: { // The Student User
                select: {
                    name: true,
                    email: true,
                    // In real app, phone number would be here
                }
            }
        }
    })

    return access?.user || null
}

export async function closeRequest(requestId: string) {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) return { error: "Unauthorized" }

    const user = await db.user.findUnique({
        where: { email: session.user.email }
    })

    if (!user) return { error: "User not found" }

    // Verify ownership
    const request = await db.studentRequest.findUnique({
        where: { id: requestId }
    })

    if (!request || request.userId !== user.id) {
        return { error: "You cannot close this request" }
    }

    await db.studentRequest.update({
        where: { id: requestId },
        data: { status: "CLOSED" }
    })

    revalidatePath('/browse')
    return { success: true }
}

export async function getTeacherProfiles() {
    const teachers = await db.teacherProfile.findMany({
        include: {
            user: {
                select: {
                    name: true,
                    image: true,
                    // No email/phone for public directory
                }
            }
        },
        orderBy: {
            coins: 'desc' // Promoted teachers first (concept)
        }
    })
    return teachers
}
