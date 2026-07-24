import { getUserById } from '@/actions/user-management';
import { notFound } from 'next/navigation';
import { UserManagementControls } from './UserManagementControls';
import { ITransaction } from '@/interfaces/userInterface';
import { ArrowLeft, User, Wallet, ShieldCheck, Activity } from 'lucide-react';
import Link from 'next/link';

export const revalidate = 0;

export default async function UserDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = await getUserById(id);
  if (!data) return notFound();

  const { user, transactions } = data;
  const hasNin = !!user.bankInfo?.nin;
  const hasBvn = !!user.bankInfo?.bvn;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/dashboard/users"
            className="p-2 bg-white rounded-full shadow-sm hover:bg-gray-50 border border-gray-100">
            <ArrowLeft size={20} className="text-gray-500" />
          </Link>
          <div>
            <h3 className="text-2xl font-bold text-slate-800">{user.name}</h3>
            <p className="text-gray-500">{user.email}</p>
          </div>
        </div>
        <UserManagementControls user={user} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="rounded-xl border bg-white text-card-foreground shadow-sm">
          <div className="flex flex-col space-y-1.5 p-6 pb-3">
            <h3 className="font-semibold leading-none tracking-tight text-lg flex items-center gap-2 text-blue-500">
              <User size={18} className="text-blue-500" /> Profile Overview
            </h3>
          </div>
          <div className="p-6 pt-0 space-y-4">
            <div>
              <p className="text-sm text-gray-500">Role</p>
              <span className="inline-flex items-center rounded-full bg-slate-100 text-slate-900 border-transparent px-2.5 py-0.5 text-xs font-semibold">{user.role}</span>
            </div>
            <div>
              <p className="text-sm text-gray-500">Status</p>
              <span
                className={`inline-flex items-center rounded-full border-transparent px-2.5 py-0.5 text-xs font-semibold ${
                  user.status === 'Suspended' ? 'bg-red-500 text-white' : 'bg-slate-100 text-slate-950'
                }`}>
                {user.status || 'Active'}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div>
                <p className="text-sm text-gray-500">Deals Closed</p>
                <p className="font-semibold text-lg text-primary">
                  {user.dealsClosed || 0}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Active Leads</p>
                <p className="font-semibold text-lg text-primary">
                  {user.activeLeads || 0}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Verification Card */}
        <div className="rounded-xl border bg-white text-card-foreground shadow-sm">
          <div className="flex flex-col space-y-1.5 p-6 pb-3">
            <h3 className="font-semibold leading-none tracking-tight text-lg flex items-center gap-2 text-green-500">
              <ShieldCheck size={18} className="text-green-500" /> Verification
              Status
            </h3>
          </div>
          <div className="p-6 pt-0 space-y-4">
            <div className="flex justify-between items-center p-3 bg-gray-200 rounded-lg">
              <span className="font-medium text-slate-700">NIN Status</span>
              <span className={`inline-flex items-center rounded-full border-transparent px-2.5 py-0.5 text-xs font-semibold ${hasNin ? 'bg-slate-900 text-white' : 'bg-red-500 text-white'}`}>
                {hasNin ? 'Verified' : 'Missing'}
              </span>
            </div>
            {hasNin && (
              <p className="text-sm text-gray-600 px-1">
                NIN: <span className="font-mono">{user.bankInfo?.nin}</span>
              </p>
            )}

            <div className="flex justify-between items-center p-3 bg-gray-200 rounded-lg">
              <span className="font-medium text-slate-700">BVN Status</span>
              <span className={`inline-flex items-center rounded-full border-transparent px-2.5 py-0.5 text-xs font-semibold ${hasBvn ? 'bg-slate-900 text-white' : 'bg-red-500 text-white'}`}>
                {hasBvn ? 'Verified' : 'Missing'}
              </span>
            </div>
            {hasBvn && (
              <p className="text-sm text-gray-600 px-1">
                BVN: <span className="font-mono">{user.bankInfo?.bvn}</span>
              </p>
            )}
          </div>
        </div>

        {/* Bank & Wallet Card */}
        <div className="rounded-xl border bg-white text-card-foreground shadow-sm">
          <div className="flex flex-col space-y-1.5 p-6 pb-3">
            <h3 className="font-semibold leading-none tracking-tight text-lg flex items-center gap-2 text-primary">
              <Wallet size={18} className="text-primary" /> Financials
            </h3>
          </div>
          <div className="p-6 pt-0 space-y-4">
            <div className="bg-[#cfb53b]/10 p-4 rounded-lg">
              <p className="text-sm text-[#b09a32] font-medium">
                Available Balance
              </p>
              <p className="text-2xl font-bold text-[#cfb53b]">
                ${user.wallet?.availableBalance?.toLocaleString() || 0}
              </p>
            </div>

            <div className="space-y-2 pt-2 border-t border-gray-100">
              <p className="text-sm font-semibold text-slate-800">
                Bank Information
              </p>
              {user.bankInfo ? (
                <div className="space-y-1 text-sm text-gray-600">
                  <p>
                    <span className="text-gray-400">Bank:</span>{' '}
                    {user.bankInfo.bankName}
                  </p>
                  <p>
                    <span className="text-gray-400">Account Name:</span>{' '}
                    {user.bankInfo.bankAccountName}
                  </p>
                  <p>
                    <span className="text-gray-400">Account No:</span>{' '}
                    {user.bankInfo.bankAccountNumber}
                  </p>
                </div>
              ) : (
                <p className="text-sm text-gray-400 italic">
                  No bank information provided.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Transaction History */}
      <div className="rounded-xl border bg-white text-card-foreground shadow-sm">
        <div className="flex flex-col space-y-1.5 p-6">
          <h3 className="font-semibold leading-none tracking-tight flex items-center gap-2 text-slate-500">
            <Activity size={18} className="text-slate-500" /> Transaction
            History
          </h3>
          <p className="text-sm text-muted-foreground">
            Recent financial activity for this user.
          </p>
        </div>
        <div className="p-6 pt-0">
          {transactions.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                  <tr>
                    <th className="px-4 py-3">Date</th>
                    <th className="px-4 py-3">Type</th>
                    <th className="px-4 py-3">Description</th>
                    <th className="px-4 py-3">Amount</th>
                    <th className="px-4 py-3 text-right">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((t: ITransaction) => (
                    <tr
                      key={t.id}
                      className="bg-white border-b hover:bg-gray-50">
                      <td className="px-4 py-3 whitespace-nowrap">
                        {t.createdAt
                          ? new Date(t.createdAt).toLocaleDateString()
                          : 'N/A'}
                      </td>
                      <td className="px-4 py-3 font-medium text-gray-900">
                        {t.type}
                      </td>
                      <td className="px-4 py-3">{t.description}</td>
                      <td
                        className={`px-4 py-3 font-bold ${t.transactionType === 'Credit' ? 'text-green-600' : 'text-slate-800'}`}>
                        {t.transactionType === 'Credit' ? '+' : '-'}$
                        {t.amount?.toLocaleString()}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                            t.status === 'Completed'
                              ? 'bg-slate-100 text-slate-900'
                              : t.status === 'Pending'
                                ? 'border border-slate-300 text-slate-700'
                                : 'bg-red-500 text-white'
                          }`}>
                          {t.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              No transactions found for this user.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
