'use server';

import { auth, db, storage } from '@/firebase/firebaseConfig';
import { IAdminUser } from '@/interfaces/userInterface';

export async function updateUserProfile(userId: string, formData: FormData) {
  try {
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const avatarFile = formData.get('avatar') as File | null;
    const existingPhotoURL = formData.get('existingPhotoURL') as string || '';

    let photoURL = existingPhotoURL;

    // Handle avatar upload if provided
    if (avatarFile && avatarFile.size > 0) {
      const bucket = storage.bucket(process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET);
      const fileName = `avatars/${userId}_${Date.now()}_${avatarFile.name}`;
      const file = bucket.file(fileName);
      
      const buffer = Buffer.from(await avatarFile.arrayBuffer());
      
      await file.save(buffer, {
        contentType: avatarFile.type,
        metadata: { firebaseStorageDownloadTokens: Date.now().toString() },
      });
      
      await file.makePublic();
      photoURL = `https://storage.googleapis.com/${bucket.name}/${fileName}`;
    }

    // Prepare update data for Firebase Auth
    const authUpdateData: any = {};
    if (name) authUpdateData.displayName = name;
    if (email) authUpdateData.email = email;
    if (photoURL) authUpdateData.photoURL = photoURL;

    // Update Firebase Auth user
    if (Object.keys(authUpdateData).length > 0) {
      await auth.updateUser(userId, authUpdateData);
    }

    // Update Firestore User Document
    const firestoreUpdateData: Partial<IAdminUser> = {
      firstName: name.split(' ')[0],
      lastName: name.split(' ')[1],
      email,
      photoURL,
      updatedAt: new Date().toISOString(),
    };

    await db.collection('users').doc(userId).update(firestoreUpdateData);

    return { success: true, photoURL };
  } catch (error: any) {
    console.error('Failed to update user profile:', error);
    return { success: false, message: error.message || 'Failed to update user profile' };
  }
}
