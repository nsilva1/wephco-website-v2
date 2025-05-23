'use server'

import { AuthError } from "next-auth"
import { signIn } from "@/lib/auth/auth"

type LoginResult = {
  success?: boolean;
  message?: string;
  error?: string;
}

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
): Promise<LoginResult> => {
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

  try {
    // 2. Attempt to sign in
    await signIn('credentials', {
      email: email.trim(),
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
      switch (error.name) {
        case 'CredentialsSignin':
          // This is the most common error for invalid email/password
          return { error: "Invalid email or password. Please try again." };
        case 'CallbackRouteError':
          // This can happen if there's an error in your `authorize` function
          // or if the user's account has issues (e.g., not verified, locked)
          // that your `authorize` function detects and throws.
          // error.cause?.err?.message might contain more details if you threw a specific error
          console.error("CallbackRouteError details:", error.cause);
          return { error: "Login failed. There might be an issue with your account (e.g., not verified) or our system." };
        case 'AccessDenied':
          return { error: "Access denied. You do not have permission to log in or your account is restricted." };
        case 'Verification': // For email verification flows if you use them
            return { error: "Email verification required. Please check your inbox."};
        // Add other specific AuthError types if you handle them:
        // https://authjs.dev/reference/core/errors
        default:
          console.error("Unhandled AuthError type:", error.name, error);
          return { error: "An authentication error occurred. Please try again." };
      }
    }

    // For unexpected errors not caught as AuthError
    console.error("Login error (Non-AuthError):", error); // Log the full error for server-side debugging
    return { error: "An unexpected server error occurred. Please try again." };
  }
}