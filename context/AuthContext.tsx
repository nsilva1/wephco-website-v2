'use client';

import {
	createContext,
	useContext,
	useEffect,
	useState,
	type ReactNode,
} from 'react';
import type { IUserInfo } from '../interfaces/userInterface';
import { 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword, 
    signOut as firebaseSignOut, 
    onAuthStateChanged, 
    sendPasswordResetEmail,
    GoogleAuthProvider,
    signInWithPopup
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '@/firebase/firebaseClient';
import { Role } from '@/interfaces/userInterface';

export interface User {
  uid: string;
  email: string | null;
  emailVerified: boolean;
  displayName: string | null;
  photoURL: string | null;
}

interface AuthContextType {
	currentUser: User | null;
	loading: boolean;
	role: string | null;
	isAuthenticated: boolean;
	userInfo: IUserInfo | null;
	signup: (email: string, password: string, additionalData?: any) => Promise<any>;
	login: (email: string, password: string) => Promise<any>;
	logout: () => Promise<void>;
	resetPassword: (email: string) => Promise<void>;
	loginWithGoogle: () => Promise<any>;
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
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
				setIsAuthenticated(true);
                setCurrentUser({
                    uid: firebaseUser.uid,
                    email: firebaseUser.email,
                    emailVerified: firebaseUser.emailVerified,
                    displayName: firebaseUser.displayName,
                    photoURL: firebaseUser.photoURL
                });

                try {
                    const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
                    if (userDoc.exists()) {
                        const data = userDoc.data();
                        setRole(data.role || null);
                        setUserInfo({
                            ...data,
                            id: userDoc.id,
                            createdAt: data.createdAt?.toDate?.()?.toISOString() || data.createdAt || '',
                        } as IUserInfo);
                    } else {
                        setRole(null);
                        setUserInfo(null);
                    }
                } catch (error) {
                    console.error("Error fetching user data:", error);
                }
            } else {
                setCurrentUser(null);
                setRole(null);
                setUserInfo(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
	}, []);

	const signup = async (email: string, password: string, additionalData?: any) => {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        const roleToSet = additionalData?.role || Role.SUPPORT;

        const userData = {
            email,
            firstName: additionalData?.firstName || '',
            lastName: additionalData?.lastName || '',
            phone: additionalData?.phone || '',
            role: roleToSet,
            createdAt: new Date().toISOString(),
            status: 'ACTIVE'
        };

        await setDoc(doc(db, 'users', user.uid), userData);
        
        return { role: roleToSet, uid: user.uid };
	};

	const login = async (email: string, password: string) => {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        
        // Wait for the doc to return the role for the AuthForm redirection
        const userDoc = await getDoc(doc(db, 'users', userCredential.user.uid));
        const userRole = userDoc.exists() ? userDoc.data().role : null;
        
        return { role: userRole, uid: userCredential.user.uid };
	};

	const logout = async () => {
        await firebaseSignOut(auth);
	};

	const resetPassword = async (email: string) => {
        await sendPasswordResetEmail(auth, email);
	};

	const loginWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        const userCredential = await signInWithPopup(auth, provider);
        
        const userDoc = await getDoc(doc(db, 'users', userCredential.user.uid));
        let userRole = null;

        if (!userDoc.exists()) {
            // New user via Google
            userRole = Role.AFFILIATE; // Default role
            const userData = {
                email: userCredential.user.email,
                firstName: userCredential.user.displayName?.split(' ')[0] || '',
                lastName: userCredential.user.displayName?.split(' ').slice(1).join(' ') || '',
                phone: '',
                role: userRole,
                createdAt: new Date().toISOString(),
                status: 'ACTIVE'
            };
            await setDoc(doc(db, 'users', userCredential.user.uid), userData);
        } else {
            userRole = userDoc.data().role;
        }

        return { role: userRole, uid: userCredential.user.uid };
    };

	const value: AuthContextType = {
		currentUser,
		loading,
		role,
		isAuthenticated,
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
