"use server"

import { db } from "@/lib/db"
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
        const result = await db.$transaction(async (tx) => {
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

            // 3. Find Request to get Student ID
            const request = await tx.studentRequest.findUnique({
                where: { id: requestId }
            })

            if (!request) throw new Error("Request not found")

            // 4. Create Access Record
            const access = await tx.contactAccess.create({
                data: {
                    teacherId: teacherProfileId,
                    studentRequestId: requestId,
                    studentId: request.userId
                }
            })

            return access
        })

        revalidatePath('/browse')
        return { success: true, accessId: result.id }

    } catch (error) {
        console.error("Unlock failed:", error)
        return { error: "Transaction failed" }
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
