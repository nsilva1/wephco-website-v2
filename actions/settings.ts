'use server';

import { db } from '@/firebase/firebaseConfig';
import { IUserInfo, IBankInfo } from '@/interfaces/userInterface';
import admin from 'firebase-admin';
import { serializeDoc } from '@/lib/utils';

/**
 * Update user profile information
 */
export async function updateProfile(userId: string, data: Partial<IUserInfo>) {
  try {
    const userRef = db.collection('users').doc(userId);
    const updateData: any = {
      name: data.name,
      updatedAt: new Date().toISOString(),
    };

    // Filter out undefined values
    Object.keys(updateData).forEach(key => updateData[key] === undefined && delete updateData[key]);

    await userRef.update(updateData);

    // Also update Firebase Auth display name if possible
    try {
      const auth = admin.auth();
      await auth.updateUser(userId, {
        displayName: data.name,
      });
    } catch (authError) {
      console.error("Auth update error:", authError);
    }

    return { success: true, message: 'Profile updated successfully' };
  } catch (error: any) {
    console.error('Update profile error:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Update user bank information
 */
export async function updateBankInfo(userId: string, bankInfo: IBankInfo) {
  try {
    const userRef = db.collection('users').doc(userId);
    
    await userRef.update({
      bankInfo: bankInfo,
      updatedAt: new Date().toISOString(),
    });

    return { success: true, message: 'Bank information updated successfully' };
  } catch (error: any) {
    console.error('Update bank info error:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Get global app settings
 */
export async function getGlobalSettings() {
  try {
    const settingsDoc = await db.collection('settings').doc('global').get();
    if (!settingsDoc.exists) {
      // Default settings
      return {
        maintenanceMode: false,
        allowRegistration: true,
        defaultCommission: 5,
        currency: 'NGN',
        contactEmail: 'support@wephco.com',
      };
    }
    return serializeDoc(settingsDoc.data()!);
  } catch (error) {
    console.error('Get global settings error:', error);
    return null;
  }
}

/**
 * Update global app settings
 */
export async function updateGlobalSettings(data: any) {
  try {
    await db.collection('settings').doc('global').set(data, { merge: true });
    return { success: true, message: 'Settings updated successfully' };
  } catch (error: any) {
    console.error('Update global settings error:', error);
    return { success: false, error: error.message };
  }
}
