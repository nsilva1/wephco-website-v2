'use server';

import { db } from '@/firebase/firebaseConfig';
import { serializeDoc } from '@/lib/utils';

export interface IActivityLog {
  id: string;
  type: 'lead' | 'transaction' | 'property' | 'user' | 'notification' | 'consultation' | 'contact' | 'support' | 'enquiry';
  action: string;
  title: string;
  description: string;
  timestamp: string;
  link?: string;
  status?: string;
}

export async function getGlobalActivities(limit: number = 50): Promise<IActivityLog[]> {
  const activities: IActivityLog[] = [];

  // Fetch from multiple collections in parallel
  const [
    leads,
    transactions,
    properties,
    users,
    notifications,
    consultations,
    contacts,
    support,
    propertyEnquiries,
    sellEnquiries
  ] = await Promise.all([
    db.collection('leads').orderBy('createdAt', 'desc').limit(limit).get(),
    db.collection('transactions').orderBy('createdAt', 'desc').limit(limit).get(),
    db.collection('properties').orderBy('createdAt', 'desc').limit(limit).get(),
    db.collection('users').orderBy('createdAt', 'desc').limit(limit).get(),
    db.collection('notification_logs').orderBy('sentAt', 'desc').limit(limit).get(),
    db.collection('consultations').orderBy('createdAt', 'desc').limit(limit).get(),
    db.collection('contact_us').orderBy('createdAt', 'desc').limit(limit).get(),
    db.collection('support_tickets').orderBy('createdAt', 'desc').limit(limit).get(),
    db.collection('property_enquiries').orderBy('createdAt', 'desc').limit(limit).get(),
    db.collection('sell_enquiries').orderBy('createdAt', 'desc').limit(limit).get(),
  ]);

  // Process Leads
  leads.docs.forEach(doc => {
    const data = doc.data();
    activities.push({
      id: `lead-${doc.id}`,
      type: 'lead',
      action: 'created',
      title: 'New Lead Added',
      description: `Lead "${data.name}" was added from ${data.source || 'Unknown source'}`,
      timestamp: serializeDoc(data!).createdAt || new Date().toISOString(),
      link: `/dashboard/leads/${doc.id}`,
      status: data.status
    });
  });

  // Process Transactions
  transactions.docs.forEach(doc => {
    const data = doc.data();
    activities.push({
      id: `tx-${doc.id}`,
      type: 'transaction',
      action: data.type.toLowerCase(),
      title: `${data.type} Request`,
      description: `${data.type} of ${data.amount} ${data.currency || 'NGN'} by user`,
      timestamp: serializeDoc(data!).createdAt || new Date().toISOString(),
      link: `/dashboard/withdrawals/${doc.id}`,
      status: data.status
    });
  });

  // Process Properties
  properties.docs.forEach(doc => {
    const data = doc.data();
    activities.push({
      id: `prop-${doc.id}`,
      type: 'property',
      action: 'created',
      title: 'New Property Listed',
      description: `Property "${data.title}" was added to the listings`,
      timestamp: serializeDoc(data!).createdAt || new Date().toISOString(),
      link: `/dashboard/properties/${doc.id}`,
    });
  });

  // Process Users
  users.docs.forEach(doc => {
    const data = doc.data();
    activities.push({
      id: `user-${doc.id}`,
      type: 'user',
      action: 'registered',
      title: 'New User Registered',
      description: `User "${data.name}" (${data.role}) created an account`,
      timestamp: serializeDoc(data!).createdAt || new Date().toISOString(),
      link: `/dashboard/users/${doc.id}`,
    });
  });

  // Process Notifications
  notifications.docs.forEach(doc => {
    const data = doc.data();
    activities.push({
      id: `notif-${doc.id}`,
      type: 'notification',
      action: 'sent',
      title: 'Push Notification Sent',
      description: `"${data.title}" sent to ${data.targetType === 'all' ? 'all agents' : 'selected users'}`,
      timestamp: serializeDoc(data).sentAt || new Date().toISOString(),
      link: `/dashboard/notifications`,
    });
  });

  // Process Consultations
  consultations.docs.forEach(doc => {
    const data = doc.data();
    activities.push({
      id: `cons-${doc.id}`,
      type: 'consultation',
      action: 'requested',
      title: 'New Consultation Request',
      description: `${data.service} request from ${data.name}`,
      timestamp: serializeDoc(data!).createdAt || new Date().toISOString(),
      link: `/dashboard/consultations`,
      status: data.status ? 'Completed' : 'Pending'
    });
  });

  // Process Contact Us
  contacts.docs.forEach(doc => {
    const data = doc.data();
    activities.push({
      id: `contact-${doc.id}`,
      type: 'contact',
      action: 'message',
      title: 'New Contact Message',
      description: `Message from ${data.name}: ${data.message?.substring(0, 50)}...`,
      timestamp: serializeDoc(data!).createdAt || new Date().toISOString(),
      link: `/dashboard/support`,
    });
  });

  // Process Support Tickets
  support.docs.forEach(doc => {
    const data = doc.data();
    activities.push({
      id: `ticket-${doc.id}`,
      type: 'support',
      action: 'opened',
      title: 'New Support Ticket',
      description: `[${data.category}] ${data.subject}`,
      timestamp: serializeDoc(data!).createdAt || new Date().toISOString(),
      link: `/dashboard/support`,
      status: data.status
    });
  });

  // Process Property Enquiries
  propertyEnquiries.docs.forEach(doc => {
    const data = doc.data();
    activities.push({
      id: `penq-${doc.id}`,
      type: 'enquiry',
      action: 'property',
      title: 'New Property Enquiry',
      description: `${data.name} enquired about a property`,
      timestamp: serializeDoc(data!).createdAt || new Date().toISOString(),
      link: `/dashboard/property-enquiry`,
    });
  });

  // Process Sell Enquiries
  sellEnquiries.docs.forEach(doc => {
    const data = doc.data();
    activities.push({
      id: `senq-${doc.id}`,
      type: 'enquiry',
      action: 'sell',
      title: 'New Sell Enquiry',
      description: `Sell request for property at ${data.address} from ${data.name}`,
      timestamp: serializeDoc(data).createdAt || new Date().toISOString(),
      link: `/dashboard/requests`,
    });
  });

  // Sort by timestamp descending
  return activities
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, limit);
}
