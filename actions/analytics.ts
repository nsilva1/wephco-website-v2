'use server';

import { db } from '@/firebase/firebaseConfig';
import { IUserInfo, ITransaction } from '@/interfaces/userInterface';
import { ILead } from '@/interfaces/leadInterface';
import { serializeDoc } from '@/lib/utils';

// ---- Types for chart data ----

export interface LeadsByStatusOverTime {
  month: string; // e.g. "Jan 2025"
  new: number;
  contacted: number;
  qualified: number;
  negotiation: number;
  won: number;
  lost: number;
}

export interface TopAgent {
  name: string;
  dealsClosed: number;
  activeLeads: number;
}

export interface WithdrawalVolume {
  month: string;
  completed: number;
  pending: number;
  failed: number;
}

export interface AnalyticsSummary {
  totalLeads: number;
  conversionRate: number; // percentage of "won" leads
  totalWithdrawals: number;
  avgDealSize: number;
}

export interface AnalyticsData {
  leadsByStatus: LeadsByStatusOverTime[];
  topAgents: TopAgent[];
  withdrawalVolume: WithdrawalVolume[];
  summary: AnalyticsSummary;
}

// ---- Helpers ----

function getMonthKey(dateInput: any): string {
  let date: Date;
  if (!dateInput) return 'Unknown';
  if (typeof dateInput === 'string' || typeof dateInput === 'number') {
    date = new Date(dateInput);
  } else if (dateInput._seconds !== undefined) {
    date = new Date(dateInput._seconds * 1000);
  } else if (dateInput.toDate) {
    date = dateInput.toDate();
  } else {
    return 'Unknown';
  }
  if (isNaN(date.getTime())) return 'Unknown';
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${months[date.getMonth()]} ${date.getFullYear()}`;
}

function getMonthSortKey(monthStr: string): number {
  const months: Record<string, number> = {
    Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
    Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11,
  };
  const parts = monthStr.split(' ');
  if (parts.length !== 2) return 0;
  const monthNum = months[parts[0]] ?? 0;
  const year = parseInt(parts[1], 10) || 2025;
  return year * 12 + monthNum;
}

// ---- Main fetch function ----

export async function getAnalyticsData(): Promise<AnalyticsData> {
  // Fetch leads
  const leadsSnapshot = await db.collection('leads').get();
  const leads = leadsSnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  })) as (ILead & { id: string })[];

  // Fetch users (agents)
  const usersSnapshot = await db.collection('users').get();
  const users = usersSnapshot.docs.map(doc => ({
    id: doc.id,
    ...serializeDoc(doc.data()!),
  })) as IUserInfo[];

  // Fetch transactions
  const transactionsSnapshot = await db.collection('transactions').get();
  const transactions = transactionsSnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  })) as (ITransaction & { id: string })[];

  // ------------------------------------------
  // 1. Leads by Status Over Time
  // ------------------------------------------
  const leadsByMonth: Record<string, Record<string, number>> = {};
  const statuses = ['new', 'contacted', 'qualified', 'negotiation', 'won', 'lost'];

  for (const lead of leads) {
    const month = getMonthKey(lead.createdAt);
    if (month === 'Unknown') continue;

    if (!leadsByMonth[month]) {
      leadsByMonth[month] = {};
      for (const s of statuses) leadsByMonth[month][s] = 0;
    }
    const status = (lead.status || 'new').toLowerCase();
    if (statuses.includes(status)) {
      leadsByMonth[month][status]++;
    } else {
      leadsByMonth[month]['new']++;
    }
  }

  const leadsByStatus: LeadsByStatusOverTime[] = Object.entries(leadsByMonth)
    .sort(([a], [b]) => getMonthSortKey(a) - getMonthSortKey(b))
    .map(([month, counts]) => ({
      month,
      new: counts['new'] || 0,
      contacted: counts['contacted'] || 0,
      qualified: counts['qualified'] || 0,
      negotiation: counts['negotiation'] || 0,
      won: counts['won'] || 0,
      lost: counts['lost'] || 0,
    }));

  // ------------------------------------------
  // 2. Top Performing Agents by Deals Closed
  // ------------------------------------------
  const agents = users.filter(u => u.role === 'Agent' || u.role === 'AFFILIATE');
  const topAgents: TopAgent[] = agents
    .sort((a, b) => (b.dealsClosed || 0) - (a.dealsClosed || 0))
    .slice(0, 10)
    .map(a => ({
      name: a.name || 'Unknown',
      dealsClosed: a.dealsClosed || 0,
      activeLeads: a.activeLeads || 0,
    }));

  // ------------------------------------------
  // 3. Withdrawal Volume Over Time
  // ------------------------------------------
  const withdrawalsByMonth: Record<string, { completed: number; pending: number; failed: number }> = {};
  const withdrawals = transactions.filter(t => t.type === 'Withdrawal');

  for (const tx of withdrawals) {
    const month = getMonthKey(tx.createdAt);
    if (month === 'Unknown') continue;

    if (!withdrawalsByMonth[month]) {
      withdrawalsByMonth[month] = { completed: 0, pending: 0, failed: 0 };
    }

    const status = (tx.status || '').toLowerCase();
    if (status === 'completed') {
      withdrawalsByMonth[month].completed += tx.amount || 0;
    } else if (status === 'pending') {
      withdrawalsByMonth[month].pending += tx.amount || 0;
    } else if (status === 'failed') {
      withdrawalsByMonth[month].failed += tx.amount || 0;
    }
  }

  const withdrawalVolume: WithdrawalVolume[] = Object.entries(withdrawalsByMonth)
    .sort(([a], [b]) => getMonthSortKey(a) - getMonthSortKey(b))
    .map(([month, amounts]) => ({
      month,
      ...amounts,
    }));

  // ------------------------------------------
  // 4. Summary Metrics
  // ------------------------------------------
  const wonLeads = leads.filter(l => (l.status || '').toLowerCase() === 'won');
  const totalLeads = leads.length;
  const conversionRate = totalLeads > 0 ? Math.round((wonLeads.length / totalLeads) * 100) : 0;
  const totalWithdrawals = withdrawals.reduce((sum, t) => sum + (t.amount || 0), 0);
  const avgDealSize = wonLeads.length > 0
    ? Math.round(wonLeads.reduce((sum, l) => sum + (l.budget || 0), 0) / wonLeads.length)
    : 0;

  return {
    leadsByStatus,
    topAgents,
    withdrawalVolume,
    summary: {
      totalLeads,
      conversionRate,
      totalWithdrawals,
      avgDealSize,
    },
  };
}
