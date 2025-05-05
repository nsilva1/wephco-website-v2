'use server'

import { prisma } from "@/prisma/prisma"
// import bcrypt from "bcryptjs"
import { IUser } from "@/interfaces/userInterface"
import { NextResponse } from "next/server"
import { Role } from "@/interfaces/userInterface"
import { AuthError } from "next-auth"
import bcrypt from "bcryptjs"

type RegistrationResult = {
  success?: boolean;
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

    var userRole: Role | undefined
    if (role) {
        userRole = role
    } else {
      userRole = undefined
    }
    

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
          role: userRole as Role, 
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
    return { success: false, error: 'Registration failed. Please try again' };
  }

}