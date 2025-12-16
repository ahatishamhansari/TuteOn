"use server"

import { db } from "@/lib/db"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { revalidatePath } from "next/cache"

export async function purchaseCoins(amount: number, cost: number, paymentId: string) {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
        return { error: "Unauthorized" }
    }

    const start = Date.now()

    // 1. Verify User
    const user = await db.user.findUnique({
        where: { email: session.user.email },
        include: { teacherProfile: true }
    })

    if (!user || user.role !== "TEACHER" || !user.teacherProfile) {
        return { error: "Only teachers can purchase coins." }
    }

    // 2. Validate Payment (Mock)
    // In a real app, we would verify 'paymentId' with Stripe/Razorpay API here.
    // For now, we simulate a successful verification.
    if (!paymentId.startsWith("pay_")) {
        return { error: "Invalid payment ID" }
    }

    try {
        // 3. Perform Transaction (Atomic)
        await db.$transaction([
            // Add Coins
            db.teacherProfile.update({
                where: { id: user.teacherProfile.id },
                data: { coins: { increment: amount } }
            }),
            // Record Transaction
            db.transaction.create({
                data: {
                    userId: user.id,
                    amount: cost, // Positive or negative? Typically store revenue as positive, spending as negative.
                    // Let's store COST as positive REVENUE for platform. 
                    // Or simpler: Amount of coins purchased.
                    // Let's store description.
                    type: "DEPOSIT",
                    description: `Purchased ${amount} Coins for $${cost}`
                }
            })
        ])

        revalidatePath("/dashboard/teacher")
        revalidatePath("/credits")

        return { success: true, newBalance: user.teacherProfile.coins + amount }

    } catch (error) {
        console.error("Purchase failed:", error)
        return { error: "Transaction failed. Please contact support." }
    }
}
