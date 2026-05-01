import React from 'react';
import { db } from '@/firebase/firebaseConfig';
import { Users, Briefcase, TrendingUp, DollarSign, Clock, Activity, CheckCircle } from 'lucide-react';
import { IUserInfo, ITransaction } from '@/interfaces/userInterface';

export const revalidate = 0; // ensure it's dynamic

const formatDate = (date: any) => {
  if (!date) return 'Recent';
  if (typeof date === 'string' || typeof date === 'number') return new Date(date).toLocaleDateString();
  if (date.toDate) return date.toDate().toLocaleDateString(); // Firestore Timestamp
  return 'Recent';
};

const page = async () => {
  

  // Fetch users for Agents count and active leads / deals closed
  const usersSnapshot = await db.collection('users').get();
  const users = usersSnapshot.docs.map(doc => doc.data() as IUserInfo);

  // Calculate metrics
  const totalAgents = users.filter(u => u.role === 'Agent' || u.role === 'AFFILIATE').length;
  const activeLeads = users.reduce((sum, u) => sum + (u.activeLeads || 0), 0);
  const totalDealsClosed = users.reduce((sum, u) => sum + (u.dealsClosed || 0), 0);

  // Fetch transactions for commissions, withdrawals, and recent activity
  const transactionsSnapshot = await db.collection('transactions').orderBy('createdAt', 'desc').limit(50).get();
  const allTransactions = transactionsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as ITransaction));

  // Commission paid out: Withdrawal completed
  const totalCommissionPaid = allTransactions
    .filter(t => t.type === 'Withdrawal' && t.status === 'Completed')
    .reduce((sum, t) => sum + (t.amount || 0), 0);

  // Pending withdrawals
  const pendingWithdrawals = allTransactions
    .filter(t => t.type === 'Withdrawal' && t.status === 'Pending')
    .reduce((sum, t) => sum + (t.amount || 0), 0);

  // Recent activity
  const recentActivity = allTransactions.slice(0, 5);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h3 className="text-3xl font-bold text-slate-800">Dashboard Overview</h3>
        <p className="text-gray-500">Welcome to your dashboard. Here's what's happening today.</p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Metric 1: Total Agents */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="bg-[#cfb53b]/10 p-4 rounded-lg text-[#cfb53b]">
            <Users size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Total Agents</p>
            <h4 className="text-2xl font-bold text-slate-800">{totalAgents}</h4>
          </div>
        </div>

        {/* Metric 2: Active Leads */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="bg-blue-100 p-4 rounded-lg text-blue-600">
            <Activity size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Active Leads</p>
            <h4 className="text-2xl font-bold text-slate-800">{activeLeads}</h4>
          </div>
        </div>

        {/* Metric 3: Total Deals Closed */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="bg-green-100 p-4 rounded-lg text-green-600">
            <CheckCircle size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Total Deals Closed</p>
            <h4 className="text-2xl font-bold text-slate-800">{totalDealsClosed}</h4>
          </div>
        </div>

        {/* Metric 4: Total Commission Paid */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="bg-purple-100 p-4 rounded-lg text-purple-600">
            <TrendingUp size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Total Commission Paid</p>
            <h4 className="text-2xl font-bold text-slate-800">${totalCommissionPaid.toLocaleString()}</h4>
          </div>
        </div>

        {/* Metric 5: Pending Withdrawals */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="bg-orange-100 p-4 rounded-lg text-orange-600">
            <Clock size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Pending Withdrawals</p>
            <h4 className="text-2xl font-bold text-slate-800">${pendingWithdrawals.toLocaleString()}</h4>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h4 className="text-lg font-bold text-slate-800">Recent Activity</h4>
        </div>
        <div className="p-0">
          {recentActivity.length > 0 ? (
            <ul className="divide-y divide-gray-100">
              {recentActivity.map((activity, idx) => (
                <li key={idx} className="p-6 hover:bg-gray-50 transition-colors flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-full ${
                      activity.type === 'Withdrawal' ? 'bg-orange-100 text-orange-600' :
                      activity.type === 'Income' ? 'bg-green-100 text-green-600' :
                      'bg-blue-100 text-blue-600'
                    }`}>
                      {activity.type === 'Withdrawal' ? <DollarSign size={20} /> : <Briefcase size={20} />}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-800">{activity.description || `${activity.type} Request`}</p>
                      <p className="text-xs text-gray-500">
                        {formatDate(activity.createdAt)}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm font-bold ${activity.transactionType === 'Credit' ? 'text-green-600' : 'text-slate-800'}`}>
                      {activity.transactionType === 'Credit' ? '+' : '-'}${activity.amount?.toLocaleString() || 0}
                    </p>
                    <span className={`text-[10px] uppercase font-bold px-2 py-1 rounded-full ${
                      activity.status === 'Completed' ? 'bg-green-100 text-green-700' :
                      activity.status === 'Pending' ? 'bg-orange-100 text-orange-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {activity.status}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-8 text-center text-gray-500">
              <Activity size={40} className="mx-auto text-gray-300 mb-3" />
              <p>No recent activity found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default page;
