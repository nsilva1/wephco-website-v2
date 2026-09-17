'use server';

import {
  createDocument,
  getDocument,
  getAllDocuments,
  updateDocument,
  deleteDocument,
} from '@/firebase/firebaseConfig';
import { sendWaitlistEmail } from '@/actions/email';
import { serializeDoc } from '@/lib/utils';
import { FIRESTORE_COLLECTIONS } from '@/lib/constants';
import { IProjectWaitlistConfig, IWaitlistEntry, DEFAULT_PROJECT_WAITLIST_CONFIG } from '@/interfaces/waitlist'


const CONFIG_COLLECTION =
  FIRESTORE_COLLECTIONS.PROJECT_WAITLIST_CONFIG || 'project_waitlist_config';
const WAITLIST_COLLECTION =
  FIRESTORE_COLLECTIONS.PROJECT_WAITLIST || 'project_waitlist';

export async function joinWaitlist(entry: IWaitlistEntry) {
  try {
    if (!entry.name || !entry.email || !entry.phoneNumber) {
      throw new Error('Name, email, and phone number are required.');
    }

    const config = await getProjectWaitlistConfig();
    const projectName = entry.projectName || config.projectName || 'The Canopies at Yas Point';
    const unitType = entry.unitType || (config.unitCategories?.[0] || '1-2 Bedroom Luxury Suite');
    const referenceId = `WPH-WTL-${Math.floor(10000 + Math.random() * 90000)}`;

    const data = {
      name: entry.name,
      email: entry.email,
      phoneNumber: entry.phoneNumber,
      unitType,
      projectName,
      status: 'pending_vip_access',
      createdAt: new Date(),
    };

    const docId = await createDocument(WAITLIST_COLLECTION, data);

    // Send styled React email using WaitlistConfirmationEmail component
    try {
      await sendWaitlistEmail({
        toEmail: entry.email,
        props: {
          customerName: entry.name,
          customerEmail: entry.email,
          projectName,
          projectLocation: config.locationBadge || 'Yas Island, Abu Dhabi',
          unitType,
          targetYield: config.targetYield || '9.8% p.a.',
          estimatedHandover: config.handover || 'Q4 2027',
          referenceId: docId,
        },
      });
    } catch (emailErr) {
      console.warn('Failed to send waitlist confirmation email:', emailErr);
    }

    return { success: true, docId, referenceId };
  } catch (error: any) {
    console.error('Error joining waitlist:', error);
    return { success: false, error: error.message || 'Failed to join waitlist.' };
  }
}

export async function getProjectWaitlistConfig(): Promise<IProjectWaitlistConfig> {
  try {
    const doc = await getDocument(CONFIG_COLLECTION, 'active');
    if (doc) {
      const data = serializeDoc(doc);
      return {
        ...DEFAULT_PROJECT_WAITLIST_CONFIG,
        ...data,
      } as IProjectWaitlistConfig;
    }
    return DEFAULT_PROJECT_WAITLIST_CONFIG;
  } catch (error) {
    console.error('Error fetching project waitlist config:', error);
    return DEFAULT_PROJECT_WAITLIST_CONFIG;
  }
}

export async function updateProjectWaitlistConfig(
  config: Partial<IProjectWaitlistConfig>
) {
  try {
    const payload = {
      ...config,
      updatedAt: new Date(),
    };
    await createDocument(CONFIG_COLLECTION, payload, 'active');
    return { success: true };
  } catch (error: any) {
    console.error('Error updating project waitlist config:', error);
    return { success: false, error: error.message || 'Failed to update configuration.' };
  }
}

export async function getWaitlistSubmissions(): Promise<IWaitlistEntry[]> {
  try {
    const docs = await getAllDocuments(WAITLIST_COLLECTION);
    const submissions = docs.map((doc) => ({
      id: doc.id,
      ...serializeDoc(doc),
    })) as IWaitlistEntry[];

    return submissions.sort((a, b) => {
      const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return dateB - dateA;
    });
  } catch (error) {
    console.error('Error fetching waitlist submissions:', error);
    return [];
  }
}

export async function updateWaitlistSubmissionStatus(docId: string, status: string) {
  try {
    await updateDocument(WAITLIST_COLLECTION, docId, {
      status,
      updatedAt: new Date(),
    });
    return { success: true };
  } catch (error: any) {
    console.error('Error updating waitlist status:', error);
    return { success: false, error: error.message || 'Failed to update status.' };
  }
}

export async function deleteWaitlistSubmission(docId: string) {
  try {
    await deleteDocument(WAITLIST_COLLECTION, docId);
    return { success: true };
  } catch (error: any) {
    console.error('Error deleting waitlist submission:', error);
    return { success: false, error: error.message || 'Failed to delete submission.' };
  }
}
