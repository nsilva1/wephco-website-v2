'use server';

import { db } from '@/firebase/firebaseConfig';
import { ITransaction, IUserInfo } from '@/interfaces/userInterface';
import { serializeDoc } from '@/lib/utils';
import { getUserById } from './user-management';
import admin from 'firebase-admin';

export async function getWithdrawals() {
  const transactionsSnapshot = await db.collection('transactions').get();

  const withdrawals = transactionsSnapshot.docs.map(doc => ({
    id: doc.id,
    ...serializeDoc(doc.data()!)
  })) as ITransaction[];

  // Fetch associated users
  const withdrawalsWithUsers = await Promise.all(withdrawals.map(async (transaction) => {
    const userData = await getUserById(transaction.userId);
    return {
      ...transaction,
      user: userData?.user || undefined
    };
  }));

  return withdrawalsWithUsers;
}

export async function getWithdrawalById(id: string) {
  const docRef = await db.collection('transactions').doc(id).get();
  if (!docRef.exists) return null;

  const transaction = {
    id: docRef.id,
    ...serializeDoc(docRef.data()!)
  } as ITransaction;


  return transaction;
}

export async function approveWithdrawal(transactionId: string, adminId: string) {
  const transactionRef = db.collection('transactions').doc(transactionId);
  const transactionDoc = await transactionRef.get();

  if (!transactionDoc.exists) {
    throw new Error('Transaction not found');
  }

  const transactionData = transactionDoc.data() as ITransaction;

  if (transactionData.status !== 'Pending') {
    throw new Error(`Transaction is already ${transactionData.status}`);
  }

  const userRef = db.collection('users').doc(transactionData.userId);
  const userDoc = await userRef.get();

  if (!userDoc.exists) {
    throw new Error('User not found');
  }

  const userData = userDoc.data() as IUserInfo;
  const currentEscrow = userData.wallet?.escrowBalance || 0;

  if (currentEscrow < transactionData.amount) {
    throw new Error('Insufficient escrow balance to approve this withdrawal');
  }

  // Update transaction and user wallet within a batch to ensure consistency
  const batch = db.batch();

  batch.update(transactionRef, {
    status: 'Completed',
    approvedAt: new Date().toISOString(),
    approvedBy: adminId,
  });

  batch.update(userRef, {
    'wallet.escrowBalance': currentEscrow - transactionData.amount
  });

  await batch.commit();

  return { success: true };
}

export async function rejectWithdrawal(transactionId: string, adminId: string, reason: string) {
  const transactionRef = db.collection('transactions').doc(transactionId);
  const transactionDoc = await transactionRef.get();

  if (!transactionDoc.exists) {
    throw new Error('Transaction not found');
  }

  const transactionData = transactionDoc.data() as ITransaction;

  if (transactionData.status !== 'Pending') {
    throw new Error(`Transaction is already ${transactionData.status}`);
  }

  const userRef = db.collection('users').doc(transactionData.userId);
  const userDoc = await userRef.get();

  if (!userDoc.exists) {
    throw new Error('User not found');
  }

  const userData = userDoc.data() as IUserInfo;
  const currentEscrow = userData.wallet?.escrowBalance || 0;
  const currentAvailable = userData.wallet?.availableBalance || 0;

  if (currentEscrow < transactionData.amount) {
    throw new Error('Insufficient escrow balance to refund this withdrawal');
  }

  const batch = db.batch();

  batch.update(transactionRef, {
    status: 'Failed',
    rejectedReason: reason,
    approvedAt: new Date().toISOString(), // track when it was reviewed
    approvedBy: adminId,
  });

  // Refund logic: deduct from escrow, add back to available
  batch.update(userRef, {
    'wallet.escrowBalance': currentEscrow - transactionData.amount,
    'wallet.availableBalance': currentAvailable + transactionData.amount
  });

  await batch.commit();

  return { success: true };
}
