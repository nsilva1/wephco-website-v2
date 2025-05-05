import type { DefaultSession, User as DefaultUser } from "next-auth";
import type { JWT as DefaultJWT } from "next-auth/jwt";
import type { Role } from "@/interfaces/userInterface";

declare module "next-auth" {
    interface Session extends DefaultSession {
        user: {
            id: string;
            role: Role | undefined;
        } & DefaultSession["user"];
    }

    interface User extends DefaultUser {
        id: string;
        role: Role | undefined;
    }
}

declare module "next-auth/jwt" {
    interface JWT extends DefaultJWT {
        id: string;
        role: Role | undefined;
    }
}