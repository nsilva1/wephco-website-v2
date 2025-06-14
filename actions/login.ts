'use server'

// import { AuthError } from "next-auth"
import { signIn } from "@/lib/auth/auth"



// Basic email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Handles user login using NextAuth.js credentials provider.
 * @param email - User's email address.
 * @param password - User's password.
 * @returns A promise that resolves to an object containing success status, message, or error.
 */
export const loginUser = async (
  email: string,
  password: string
) => {
  // 1. Input validation
  if (!email || typeof email !== 'string' || email.trim() === "") {
    return { error: "Email is required." };
  }
  if (!EMAIL_REGEX.test(email.trim())) {
    return { error: "Invalid email format." };
  }
  if (!password || typeof password !== 'string' || password.trim() === "") {
    return { error: "Password is required." };
  }

  await signIn('credentials', {
      email: email.trim(),
      password,
      redirectTo: '/dashboard'
    })

}