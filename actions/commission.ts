'use server';

import { db } from '@/firebase/firebaseConfig';
import { IUserInfo, ITransaction } from '@/interfaces/userInterface';
import { serializeDoc } from '@/lib/utils';

// =============================================
// Commission Rate Management
// =============================================

export async function getGlobalCommissionRate(): Promise<number> {
  const doc = await db.collection('settings').doc('commission').get();
  if (!doc.exists) return 0;
  return doc.data()?.globalRate || 0;
}

export async function setGlobalCommissionRate(rate: number) {
  await db.collection('settings').doc('commission').set(
    { globalRate: rate, updatedAt: new Date().toISOString() },
    { merge: true }
  );
  return { success: true };
}

export async function setAgentCommissionRate(userId: string, rate: number) {
  await db.collection('users').doc(userId).update({
    commision: rate,
  });
  return { success: true };
}

// =============================================
// Commission History (Income transactions)
// =============================================

export interface ICommissionEntry {
  id: string;
  userId: string;
  amount: number;
  description: string;
  status: string;
  createdAt: string;
  agent?: { id: string; name: string; email: string; commissionRate: number };
}

export async function getCommissionHistory(): Promise<ICommissionEntry[]> {
  // Get all transactions
  const txSnapshot = await db.collection('transactions').get();

  // Filter for Income / commission-type transactions
  const commissionTxs = txSnapshot.docs
    .map(doc => ({ id: doc.id, ...serializeDoc(doc.data()!) }))
    .filter((tx: any) => tx.type === 'Income' && tx.transactionType === 'Credit') as any[];

  // Batch-fetch agents
  const userIds = [...new Set(commissionTxs.map((tx: any) => tx.userId).filter(Boolean))];
  const usersMap = new Map<string, { id: string; name: string; email: string; commissionRate: number }>();

  await Promise.all(userIds.map(async (uid) => {
    try {
      const doc = await db.collection('users').doc(uid).get();
      if (doc.exists) {
        const data = doc.data()!;
        usersMap.set(uid, {
          id: doc.id,
          name: data.name || '',
          email: data.email || '',
          commissionRate: data.commision || 0,
        });
      }
    } catch {}
  }));

  return commissionTxs.map((tx: any) => ({
    id: tx.id,
    userId: tx.userId,
    amount: tx.amount,
    description: tx.description || '',
    status: tx.status || 'Completed',
    createdAt: tx.createdAt || '',
    agent: tx.userId ? usersMap.get(tx.userId) : undefined,
  }));
}

// =============================================
// Agent list with rates
// =============================================

export interface IAgentWithRate {
  id: string;
  name: string;
  email: string;
  commissionRate: number;
  totalEarnings: number;
  dealsClosed: number;
}

export async function getAgentsWithRates(): Promise<IAgentWithRate[]> {
  const usersSnapshot = await db.collection('users').get();

  return usersSnapshot.docs
    .filter(doc => {
      const role = doc.data().role;
      return role === 'Agent' || role === 'AFFILIATE';
    })
    .map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        name: data.name || '',
        email: data.email || '',
        commissionRate: data.commision || 0,
        totalEarnings: data.wallet?.totalEarnings || 0,
        dealsClosed: data.dealsClosed || 0,
      };
    });
}

// =============================================
// Log commission for a closed deal
// =============================================

export async function logCommission(
  userId: string,
  amount: number,
  description: string,
  adminId: string
) {
  const userRef = db.collection('users').doc(userId);
  const transactionRef = db.collection('transactions').doc();

  await db.runTransaction(async (t) => {
    const userDoc = await t.get(userRef);
    if (!userDoc.exists) throw new Error('User not found');

    const userData = userDoc.data() as IUserInfo;
    const currentBalance = userData.wallet?.availableBalance || 0;
    const currentEarnings = userData.wallet?.totalEarnings || 0;

    // Update wallet
    t.update(userRef, {
      'wallet.availableBalance': currentBalance + amount,
      'wallet.totalEarnings': currentEarnings + amount,
    });

    // Create transaction record
    t.set(transactionRef, {
      userId,
      type: 'Income',
      transactionType: 'Credit',
      amount,
      status: 'Completed',
      description: description || 'Commission Credit',
      createdAt: new Date().toISOString(),
      approvedBy: adminId,
    });
  });

  return { success: true };
}
