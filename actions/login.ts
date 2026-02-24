'use server'

// import { AuthError } from "next-auth"
import { signIn } from "@/lib/auth/auth"
import {
	signInWithEmailAndPassword,
} from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';


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

export const loginBrokerageUser = async (email: string, password: string) => {
	try {
		// 1. Sign in using the SDK
		const userCredential = await signInWithEmailAndPassword(
			auth,
			email,
			password
		);

		// 2. The user is now logged in!
		// The SDK automatically stores the token in the browser.
		const user = userCredential.user;

		console.log('Login successful:', user.uid);

		return {
			uid: user.uid,
			email: user.email,
			name: user.displayName,
		};
	} catch (error: any) {
		// Firebase returns specific error codes (e.g., 'auth/invalid-credential')
		console.error('Login Error:', error.code, error.message);
		throw new Error('Invalid Email or Password');
	}
}