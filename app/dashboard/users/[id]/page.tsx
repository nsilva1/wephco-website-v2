import { getUserById } from "@/actions/user-management"
import { notFound } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { UserManagementControls } from "./UserManagementControls"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ITransaction } from "@/interfaces/userInterface"
import { ArrowLeft, User, Wallet, ShieldCheck, Activity } from "lucide-react"
import Link from "next/link"

export const revalidate = 0;

export default async function UserDetailsPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  const data = await getUserById(id)
  if (!data) return notFound()

  const { user, transactions } = data
  const hasNin = !!user.bankInfo?.nin;
  const hasBvn = !!user.bankInfo?.bvn;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/users" className="p-2 bg-white rounded-full shadow-sm hover:bg-gray-50 border border-gray-100">
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
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <User size={18} className="text-blue-500" /> Profile Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">Role</p>
              <Badge variant="outline">{user.role}</Badge>
            </div>
            <div>
              <p className="text-sm text-gray-500">Status</p>
              <Badge variant={user.status === 'Suspended' ? 'destructive' : 'secondary'}>
                {user.status || 'Active'}
              </Badge>
            </div>
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div>
                <p className="text-sm text-gray-500">Deals Closed</p>
                <p className="font-semibold text-lg">{user.dealsClosed || 0}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Active Leads</p>
                <p className="font-semibold text-lg">{user.activeLeads || 0}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Verification Card */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <ShieldCheck size={18} className="text-green-500" /> Verification Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="font-medium text-slate-700">NIN Status</span>
              <Badge variant={hasNin ? "default" : "destructive"}>
                {hasNin ? "Verified" : "Missing"}
              </Badge>
            </div>
            {hasNin && (
              <p className="text-sm text-gray-600 px-1">NIN: <span className="font-mono">{user.bankInfo?.nin}</span></p>
            )}

            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="font-medium text-slate-700">BVN Status</span>
              <Badge variant={hasBvn ? "default" : "destructive"}>
                {hasBvn ? "Verified" : "Missing"}
              </Badge>
            </div>
            {hasBvn && (
              <p className="text-sm text-gray-600 px-1">BVN: <span className="font-mono">{user.bankInfo?.bvn}</span></p>
            )}
          </CardContent>
        </Card>

        {/* Bank & Wallet Card */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Wallet size={18} className="text-[#cfb53b]" /> Financials
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-[#cfb53b]/10 p-4 rounded-lg">
              <p className="text-sm text-[#b09a32] font-medium">Available Balance</p>
              <p className="text-2xl font-bold text-[#cfb53b]">${user.wallet?.availableBalance?.toLocaleString() || 0}</p>
            </div>
            
            <div className="space-y-2 pt-2 border-t border-gray-100">
              <p className="text-sm font-semibold text-slate-800">Bank Information</p>
              {user.bankInfo ? (
                <div className="space-y-1 text-sm text-gray-600">
                  <p><span className="text-gray-400">Bank:</span> {user.bankInfo.bankName}</p>
                  <p><span className="text-gray-400">Account Name:</span> {user.bankInfo.bankAccountName}</p>
                  <p><span className="text-gray-400">Account No:</span> {user.bankInfo.bankAccountNumber}</p>
                </div>
              ) : (
                <p className="text-sm text-gray-400 italic">No bank information provided.</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Transaction History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity size={18} className="text-slate-500" /> Transaction History
          </CardTitle>
          <CardDescription>Recent financial activity for this user.</CardDescription>
        </CardHeader>
        <CardContent>
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
                    <tr key={t.id} className="bg-white border-b hover:bg-gray-50">
                      <td className="px-4 py-3 whitespace-nowrap">
                        {t.createdAt ? new Date(t.createdAt).toLocaleDateString() : 'N/A'}
                      </td>
                      <td className="px-4 py-3 font-medium text-gray-900">
                        {t.type}
                      </td>
                      <td className="px-4 py-3">{t.description}</td>
                      <td className={`px-4 py-3 font-bold ${t.transactionType === 'Credit' ? 'text-green-600' : 'text-slate-800'}`}>
                        {t.transactionType === 'Credit' ? '+' : '-'}${t.amount?.toLocaleString()}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <Badge variant={
                          t.status === 'Completed' ? 'secondary' : 
                          t.status === 'Pending' ? 'outline' : 'destructive'
                        }>
                          {t.status}
                        </Badge>
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
        </CardContent>
      </Card>
    </div>
  )
}
