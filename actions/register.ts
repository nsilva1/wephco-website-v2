'use server';

import bcrypt from "bcryptjs";
import { auth, db } from '../firebase/firebaseConfig';
import type { IUserInfo } from '../interfaces/userInterface';

interface INewUser {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role?: string;
}

export const registerBrokerageUser = async (userData: INewUser) => {
	const { email, password, firstName, lastName, role } = userData;

	try {
		// 1. Basic Validation
		if (!email || !password) {
			throw new Error('Email and password are required');
		}

		const name = `${firstName} ${lastName}`.trim();

		// 2. Create User in Firebase Auth using Firebase Admin SDK
		const userRecord = await auth.createUser({
			email,
			password,
			displayName: name,
		});
		const uid = userRecord.uid;

		// 3. Create Firestore Document in the "users" collection
		const userDocData: IUserInfo = {
			id: uid,
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
			phone: '',
		};

		// Use Admin SDK to set the document in Firestore
		await db.collection('users').doc(uid).set({
			...userDocData,
			createdAt: new Date(),
		});

		return { uid: uid, success: true };
	} catch (error: any) {
		console.error('Registration Error:', error.code, error.message);
		throw error; // Re-throw to handle in the UI
	}
};