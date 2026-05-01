'use server';

import { db } from '@/firebase/firebaseConfig';
import { IUserInfo, ITransaction } from '@/interfaces/userInterface';
import admin from 'firebase-admin';
import { serializeDoc } from '@/lib/utils';

export async function getUsers() {
  const usersSnapshot = await db.collection('users').get();
  return usersSnapshot.docs.map(doc => ({
    id: doc.id,
    ...serializeDoc(doc.data())
  })) as IUserInfo[];
}

export async function getUserById(id: string) {
  const userDoc = await db.collection('users').doc(id).get();
  if (!userDoc.exists) return null;
  
  const user = { id: userDoc.id, ...userDoc.data() } as IUserInfo;
  
  // Also fetch user's transactions
  const transactionsSnapshot = await db.collection('transactions')
    .where('userId', '==', id)
    .orderBy('createdAt', 'desc')
    .get();
    
  const transactions = transactionsSnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as ITransaction[];

  return { user, transactions };
}

export async function creditUserWallet(userId: string, amount: number) {
  const userRef = db.collection('users').doc(userId);
  const transactionRef = db.collection('transactions').doc();

  await db.runTransaction(async (t) => {
    const userDoc = await t.get(userRef);
    if (!userDoc.exists) throw new Error("User not found");

    const userData = userDoc.data() as IUserInfo;
    const currentBalance = userData.wallet?.availableBalance || 0;
    const currentEarnings = userData.wallet?.totalEarnings || 0;

    // Update wallet
    t.update(userRef, {
      'wallet.availableBalance': currentBalance + amount,
      'wallet.totalEarnings': currentEarnings + amount,
    });

    // Create transaction
    const newTransaction: ITransaction = {
      userId,
      type: 'Income',
      transactionType: 'Credit',
      amount,
      status: 'Completed',
      description: 'Manual Commission Credit',
      createdAt: new Date().toISOString()
    };

    t.set(transactionRef, newTransaction);
  });

  return { success: true };
}

export async function toggleUserSuspension(userId: string, isSuspended: boolean) {
  const userRef = db.collection('users').doc(userId);
  const status = isSuspended ? 'Suspended' : 'Active';
  
  await userRef.update({
    status: status
  });
  
  // Attempt to disable in Firebase Auth
  try {
     const auth = admin.auth();
     await auth.updateUser(userId, { disabled: isSuspended });
  } catch (error) {
     console.error("Failed to update Firebase Auth status", error);
  }

  return { success: true, status };
}
