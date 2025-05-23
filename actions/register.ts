'use server'

import { prisma } from "@/prisma/prisma"
// import bcrypt from "bcryptjs"
import { IUser } from "@/interfaces/userInterface"
// import { NextResponse } from "next/server"
import { Role } from "@/interfaces/userInterface"
// import { AuthError } from "next-auth"
import bcrypt from "bcryptjs"
import { PrismaClientKnownRequestError } from "@/lib/generated/prisma/runtime/library"

type RegistrationResult = {
  success: boolean;
  user?: {
    id: string;
    name: string;
    email: string;
    role: Role
  },
  error?: string;
}

export const registerUser = async (user: Omit<IUser, 'id'>): Promise<RegistrationResult> => {
    const { name, email, password, role } = user

    if (!email || !password) {
      return { success: false, error: 'Email and password are required' };
    }

    if (password.length < 6) {
      return { success: false, error: 'Password must be at least 6 characters long' };
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return { success: false, error: 'Invalid email format' };
    }

    var userRole: Role  = role || Role.SUPPORT
       
    // Check if user exists
  const existingUser = await prisma.user.findUnique({
    where: { email }
  });

  if (existingUser) {
    return { success: false, error: 'User with this email already exists' };
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await prisma.user.create({
      data: {
          name,
          email,
          password: hashedPassword,
          role: userRole, 
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
  });

  return { success: true, user: { ...newUser, role: newUser.role as Role } };
  } catch (error) {
    console.error("Registration Error:", error); // Log the full error for server-side debugging

    if (error instanceof PrismaClientKnownRequestError) {
      // This specific code should ideally not be reached if the `findUnique` check works,
      // but it's a good safeguard for other potential unique constraint violations.
      if (error.code === 'P2002') {
        // error.meta.target can be an array of field names
        const target = (error.meta?.target as string[])?.join(', ') || 'details';
        return { success: false, error: `An account with these ${target} already exists.` };
      }
      // Handle other specific Prisma errors if needed
      return { success: false, error: "A database error occurred during registration." };
    }
    
    // For unexpected errors
    return { success: false, error: 'Registration failed due to an unexpected error. Please try again.' };
  }

}