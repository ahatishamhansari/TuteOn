"use server"

import { db } from "@/lib/db"
import { hash } from "bcryptjs"
import { redirect } from "next/navigation"

export async function registerUser(formData: FormData) {
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const password = formData.get("password") as string
    const role = (formData.get("role") as string) || "STUDENT"

    if (!email || !password || !name) {
        return { error: "Missing fields" }
    }

    // Check if user exists
    const existingUser = await db.user.findUnique({
        where: { email }
    })

    if (existingUser) {
        return { error: "User already exists with this email." }
    }

    // Hash password
    const hashedPassword = await hash(password, 10)

    // Create user and associated profile if Teacher
    const newUser = await db.user.create({
        data: {
            name,
            email,
            role, // "STUDENT" or "TEACHER"
            password: hashedPassword,
        }
    })

    // If Teacher, create their profile immediately so they can receive coins
    if (role === "TEACHER") {
        await db.teacherProfile.create({
            data: {
                userId: newUser.id,
                bio: "Bio not set yet.",
                subjects: "",
                coins: 0
            }
        })
    }

    return { success: true }
}
