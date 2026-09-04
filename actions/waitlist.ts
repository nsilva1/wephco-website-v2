'use server';

import { createDocument } from '@/firebase/firebaseConfig';
import { sendWaitlistEmail } from '@/actions/email';

export interface IWaitlistEntry {
  id?: string;
  name: string;
  email: string;
  phoneNumber: string;
  unitType?: string;
  projectName?: string;
  createdAt?: Date;
  status?: string;
}

export async function joinWaitlist(entry: IWaitlistEntry) {
  try {
    if (!entry.name || !entry.email || !entry.phoneNumber) {
      throw new Error('Name, email, and phone number are required.');
    }

    const projectName = entry.projectName || 'The Canopies at Yas Point';
    const unitType = entry.unitType || '1-2 Bedroom Luxury Suite';
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

    const docId = await createDocument('project_waitlist', data);

    // Send styled React email using WaitlistConfirmationEmail component
    try {
      await sendWaitlistEmail({
        toEmail: entry.email,
        props: {
          customerName: entry.name,
          customerEmail: entry.email,
          projectName,
          projectLocation: 'Yas Island, Abu Dhabi',
          unitType,
          targetYield: '9.8% p.a.',
          estimatedHandover: 'Q4 2027',
          referenceId: docId
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
