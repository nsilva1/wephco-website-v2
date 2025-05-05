import Credentials from "next-auth/providers/credentials";
import { prisma } from "@/prisma/prisma";
import { compare } from "bcryptjs";
import type { NextAuthConfig, User }  from "next-auth";
import { Role } from "@/interfaces/userInterface";

export default {
    providers: [
        Credentials({
            name: "Credentials",
            id: "credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {

                if (!credentials?.email || !credentials?.password) {
                    throw new Error('Email and password are required')
                }
                
                try {
                    const user = await prisma.user.findUnique({
                        where: { email: credentials.email as string },
                    });

                    if (!user) {
                        throw new Error('No user found.')
                    }

                    const isPasswordValid = await compare(credentials.password as string, user.password)

                    if (!isPasswordValid) {
                        throw new Error('Password/Email not valid')
                    }

                    return {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        role: user.role as Role, // Ensure role matches the expected type
                    } as User; // Explicitly cast the return object to User
                } catch (error) {
                    throw new Error('Error authorizing user')
                }
            },
        }),

    ]
} satisfies NextAuthConfig