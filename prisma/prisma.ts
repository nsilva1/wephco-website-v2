import { PrismaClient } from "@/lib/generated/prisma";

declare global {
    var prisma: PrismaClient | undefined;
}

// const globalForPrisma = global as unknown as { prisma: PrismaClient }

const prisma = global.prisma || new PrismaClient()

if (process.env.NODE_ENV !== 'production') global.prisma = prisma

export { prisma }