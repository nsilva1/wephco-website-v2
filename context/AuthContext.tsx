'use client'

import {
	createContext,
	useContext,
	useEffect,
	useState,
	type ReactNode,
} from 'react';
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	sendPasswordResetEmail,
	sendEmailVerification,
	GoogleAuthProvider,
	signInWithPopup,
	onAuthStateChanged,
	type User,
	type UserCredential,
} from 'firebase/auth';
import { auth, db } from '../firebase/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import type { IUserInfo } from '../interfaces/userInterface';

interface AuthContextType {
	currentUser: User | null;
	loading: boolean;
	role: string | null;
	userInfo: IUserInfo | null;
	signup: (email: string, password: string) => Promise<UserCredential>;
	login: (email: string, password: string) => Promise<UserCredential>;
	logout: () => Promise<void>;
	resetPassword: (email: string) => Promise<void>;
	loginWithGoogle: () => Promise<UserCredential>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error('useAuth must be used within an AuthProvider');
	}
	return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [currentUser, setCurrentUser] = useState<User | null>(null);
	const [role, setRole] = useState<string | null>(null);
	const [loading, setLoading] = useState(true);
	const [userInfo, setUserInfo] = useState<IUserInfo | null>(null);

	const signup = async (email: string, password: string) => {
		const res = await createUserWithEmailAndPassword(auth, email, password);
		await sendEmailVerification(res.user);
		return res;
	};

	const login = (email: string, password: string) =>
		signInWithEmailAndPassword(auth, email, password);

	const loginWithGoogle = () => signInWithPopup(auth, new GoogleAuthProvider());

	const logout = () => signOut(auth);

	const resetPassword = async (email: string) =>
		sendPasswordResetEmail(auth, email);

	useEffect(() => {
		const unsub = onAuthStateChanged(auth, async (currentUser) => {
			setCurrentUser(currentUser);

			if (currentUser) {
				const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
				if (userDoc.exists()) {
					setRole(userDoc.data().role);
					setUserInfo({
						...userDoc.data(),
						id: userDoc.id,
						createdAt: userDoc.data().createdAt?.toDate?.().toISOString() || '',
					} as IUserInfo);
				}
			} else {
				setRole(null);
				setUserInfo(null);
			}

			setLoading(false);
		});
		return () => unsub();
	}, []);

	const value: AuthContextType = {
		currentUser,
		loading,
		role,
		userInfo,
		signup,
		login,
		logout,
		resetPassword,
		loginWithGoogle,
	};

	return (
		<AuthContext.Provider value={value}>
			{!loading && children}
		</AuthContext.Provider>
	);
};
