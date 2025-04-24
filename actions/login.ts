'use server'

import { prisma } from "@/prisma/prisma"
import { IUser } from "@/interfaces/userInterface"
import { NextResponse } from "next/server"
import { toast } from "react-toastify"
import { signIn } from "@/lib/auth/auth"

export const loginUser = async (user: IUser) => {
    const { email, password } = user

    // Find the user in the database
    const existingUser = await prisma.user.findUnique({
        where: {
            email,
        },
    })

    // Check if the user exists and if the password is correct
    if (!existingUser) {
        toast.error("Invalid email or password")
        return NextResponse.json({ error: "Invalid email or password" }, { status: 401 })
    }

    // Sign in the user (you can use a session or JWT here)
    const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
    })

    if (result?.error) {
        toast.error(result.error)
        return NextResponse.json({ error: result.error }, { status: 401 })
    }

    return NextResponse.json(existingUser)
}