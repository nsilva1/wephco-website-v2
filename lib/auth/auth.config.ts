import Credentials from "next-auth/providers/credentials";
import { prisma } from "@/prisma/prisma";
import bcrypt from "bcryptjs";
import type { NextAuthConfig }  from "next-auth";

export default {
    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {

                if (!credentials?.email || !credentials.password) {
                    throw new Error('Email and password are required')
                }
                
                try {
                    const user = await prisma.user.findUnique({
                        where: { email: credentials.email as string },
                    });

                    if (!user) {
                        throw new Error('No user found.')
                    }

                    const isPasswordValid = await bcrypt.compare(credentials.password as string, user.password)

                    if (!isPasswordValid) {
                        throw new Error('Password/Email not valid')
                    }

                    return user
                } catch (error) {
                    throw new Error('Error authorizing user')
                }
            },
        }),

    ]
} satisfies NextAuthConfig