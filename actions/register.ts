'use server'

import { prisma } from "@/prisma/prisma"
import bcrypt from "bcryptjs"
import { IUser } from "@/interfaces/userInterface"
import { NextResponse } from "next/server"
import { Role } from "@/interfaces/userInterface"
import { toast } from "react-toastify"

export const registerUser = async (user: IUser) => {
    const { name, email, password } = user

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create the user in the database
    const newUser = await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
            role: Role.AGENT,
        },
    })

    // Check if the user was created successfully
    if (!newUser) {
        toast.error("User registration failed")
        return NextResponse.json({ error: "User registration failed" }, { status: 500 })
    }

    return NextResponse.json(newUser)
}