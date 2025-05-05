'use server'

import { prisma } from "@/prisma/prisma"
import { AuthError } from "next-auth"
import { signIn } from "@/lib/auth/auth"

type LoginResult = {
  success?: boolean;
  message?: string;
  error?: string;
}

export const loginUser = async (
  email: string,
  password: string
): Promise<LoginResult> => {
  // 1. Input validation
  if (!email || !password) {
    return { error: "Email and password are required" }
  }

  try {
    // 2. Attempt to sign in
    await signIn('credentials', {
      email,
      password,
      redirectTo: '/dashboard'
    })

    // 3. If successful, return redirect path
    return { 
      success: true,
      message: "Login successful. Redirecting to dashboard..."
    }
  } catch (error) {
    // 4. Improved error handling
    
      if (error instanceof AuthError) {
        if (error.message.includes("CredentialsSignin")) {
          return { error: "Invalid email or password" }
        } else if (error.message.includes("CallbackRouteError")) {
          return { error: "Account not verified. Please check your email." }
        } else if (error.message.includes("AccessDenied")) {
          return { error: "Access denied. Contact support for assistance." }
        } else {
          return { error: "Login failed. Please try again." }
        }
    }
    
    // For unexpected errors
    console.error("Login error:", error)
    return { error: "An unexpected error occurred. Please try again." }
  }
}