'use server';

import { db, messaging } from '@/firebase/firebaseConfig';
import { serializeDoc } from '@/lib/utils';

// =============================================
// Types
// =============================================

export interface INotificationLog {
  id?: string;
  title: string;
  body: string;
  targetType: 'all' | 'specific';
  targetUserIds: string[];
  sentBy: string;
  sentAt: string;
  successCount: number;
  failureCount: number;
}

export interface IAgentForNotification {
  id: string;
  name: string;
  email: string;
  hasFcmToken: boolean;
}

// =============================================
// Get agents list with FCM token status
// =============================================

export async function getAgentsForNotifications(): Promise<IAgentForNotification[]> {
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
        hasFcmToken: !!data.fcmToken,
      };
    });
}

// =============================================
// Send push notification
// =============================================

export async function sendPushNotification(
  title: string,
  body: string,
  targetType: 'all' | 'specific',
  targetUserIds: string[],
  sentBy: string
) {
  // 1. Determine which users to notify
  let userDocs;
  if (targetType === 'all') {
    const snapshot = await db.collection('users').get();
    userDocs = snapshot.docs.filter(doc => {
      const role = doc.data().role;
      return (role === 'Agent' || role === 'AFFILIATE') && doc.data().fcmToken;
    });
  } else {
    const snapshots = await Promise.all(
      targetUserIds.map(uid => db.collection('users').doc(uid).get())
    );
    userDocs = snapshots.filter(doc => doc.exists && doc.data()?.fcmToken);
  }

  // 2. Extract FCM tokens
  const tokens = userDocs.map(doc => doc.data()!.fcmToken as string).filter(Boolean);

  let successCount = 0;
  let failureCount = 0;

  if (tokens.length > 0) {
    // 3. Send via FCM (batch with sendEachForMulticast for up to 500 tokens)
    try {
      const response = await messaging.sendEachForMulticast({
        tokens,
        notification: {
          title,
          body,
        },
        data: {
          type: 'admin_notification',
          title,
          body,
        },
      });

      successCount = response.successCount;
      failureCount = response.failureCount;

      // Optionally clean up invalid tokens
      response.responses.forEach((resp, idx) => {
        if (!resp.success && resp.error) {
          const errorCode = resp.error.code;
          if (
            errorCode === 'messaging/invalid-registration-token' ||
            errorCode === 'messaging/registration-token-not-registered'
          ) {
            // Remove stale token from user document
            const userId = userDocs[idx].id;
            db.collection('users').doc(userId).update({ fcmToken: '' }).catch(() => {});
          }
        }
      });
    } catch (error) {
      console.error('FCM send error:', error);
      failureCount = tokens.length;
    }
  }

  // 4. Log the notification
  const logEntry: Omit<INotificationLog, 'id'> = {
    title,
    body,
    targetType,
    targetUserIds: targetType === 'all' ? [] : targetUserIds,
    sentBy,
    sentAt: new Date().toISOString(),
    successCount,
    failureCount,
  };

  await db.collection('notification_logs').add(logEntry);

  return {
    success: true,
    successCount,
    failureCount,
    totalTokens: tokens.length,
  };
}

// =============================================
// Get notification history
// =============================================

export async function getNotificationHistory(): Promise<INotificationLog[]> {
  const snapshot = await db.collection('notification_logs')
    .orderBy('sentAt', 'desc')
    .limit(100)
    .get();

  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...serializeDoc(doc.data()!),
  })) as INotificationLog[];
}
