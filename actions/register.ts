'use server'

import { prisma } from "@/prisma/prisma"
import { IUser } from "@/interfaces/userInterface"
import { Role } from "@/interfaces/userInterface"
import bcrypt from "bcryptjs"
import { PrismaClientKnownRequestError } from "@/lib/generated/prisma/runtime/library"
import {
	createUserWithEmailAndPassword,
	updateProfile,
} from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../firebase/firebaseConfig';
import type { INewUser, IUserInfo } from '../interfaces/userInterface';

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
          role: userRole as import("@/lib/generated/prisma").$Enums.Role, 
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

export const registerBrokerageUser = async (userData: INewUser) => {
	const { email, password, firstName, lastName, role } = userData;

	try {
		// 1. Basic Validation
		if (!email || !password) {
			throw new Error('Email and password are required');
		}

		// 2. Create User in Firebase Auth
		const userCredential = await createUserWithEmailAndPassword(
			auth,
			email,
			password
		);
		const user = userCredential.user;

		const name = `${firstName} ${lastName}`.trim();

		// 3. Update the User's Display Name (optional but recommended)
		if (name) {
			await updateProfile(user, { displayName: name });
		}

		// 4. Create Firestore Document in the "users" collection
		const userData: IUserInfo = {
			id: user.uid,
			email: email,
			name: name ?? '',
			role: role ?? 'Agent', // Default to 'Agent' if no role provided
			commision: 0,
			activeLeads: 0,
			dealsClosed: 0,
			wallet: {
				availableBalance: 0,
				escrowBalance: 0,
				totalEarnings: 0,
				currency: 'USD',
			},
			transactions: [],
		};
		// We use setDoc + doc() to ensure the Firestore ID matches the Auth UID
		await setDoc(doc(db, 'users', user.uid), {
			...userData,
			createdAt: serverTimestamp(),
		});

		return { uid: user.uid, success: true };
	} catch (error: any) {
		console.error('Registration Error:', error.code, error.message);
		throw error; // Re-throw to handle in the UI (e.g., showing an alert)
	}
};