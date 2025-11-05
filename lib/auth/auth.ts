import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/prisma/prisma";
import authConfig from "./auth.config";

export const { auth, handlers, signIn } = NextAuth({
    ...authConfig,
    adapter: PrismaAdapter(prisma as any) as any,
    session: { strategy: "jwt" },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/auth/login",
        newUser: "/auth/register",
    },
    callbacks: {
        jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.role = (user as any).role;
                token.email = user.email;
                token.name = user.name;
            }
            return token;
        },
        session({ session, token }) {
            if (token && session.user) {
                session.user.id = token.id;
                session.user.email = token.email as string;
                session.user.name = token.name as string;
                session.user.role = token.role;
            }
            return session;
        },
    },
})