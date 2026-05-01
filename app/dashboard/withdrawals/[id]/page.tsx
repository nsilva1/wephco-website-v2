import { notFound } from "next/navigation"
import { getWithdrawalById } from "@/actions/transactions"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"
import { ArrowLeft, User as UserIcon, Building2, Banknote, Calendar, Info } from "lucide-react"
import Link from "next/link"
import WithdrawalControls from "./WithdrawalControls"
import { Button } from "@/components/ui/button"
import { getUserById } from "@/actions/user-management"

export const revalidate = 0;

export default async function WithdrawalDetailsPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  const transaction = await getWithdrawalById(id)

  if (!transaction) {
    return notFound()
  }

  const { userId } = transaction
  const user = await getUserById(userId)

  const statusVariant = 
    transaction.status === 'Completed' ? 'default' : 
    transaction.status === 'Pending' ? 'secondary' : 'destructive';

  const formattedAmount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(transaction.amount)

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/withdrawals">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h2 className="text-3xl font-bold tracking-tight">Withdrawal Details</h2>
        <Badge variant={statusVariant} className={`ml-2 text-sm ${transaction.status === 'Completed' ? 'bg-green-500 hover:bg-green-600 text-white' : transaction.status === 'Pending' ? 'bg-amber-500 hover:bg-amber-600 text-white' : ''}`}>
          {transaction.status}
        </Badge>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Banknote className="h-5 w-5 text-muted-foreground" />
              Request Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between border-b pb-2">
              <span className="text-muted-foreground">Amount</span>
              <span className="font-bold text-lg text-[#cfb53b]">{formattedAmount}</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="text-muted-foreground">Date Submitted</span>
              <span className="font-medium">
                {transaction.createdAt ? format(new Date(transaction.createdAt), 'PPpp') : 'N/A'}
              </span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="text-muted-foreground">Transaction ID</span>
              <span className="font-mono text-sm">{transaction.id}</span>
            </div>
            {transaction.description && (
              <div className="pt-2">
                <span className="text-muted-foreground text-sm block mb-1">Description</span>
                <p className="text-sm">{transaction.description}</p>
              </div>
            )}
            
            {transaction.status === 'Failed' && transaction.rejectedReason && (
              <div className="pt-2 mt-4 bg-destructive/10 p-3 rounded-md border border-destructive/20">
                <span className="text-destructive font-semibold text-sm flex items-center gap-1 mb-1">
                  <Info className="h-4 w-4" /> Rejection Reason
                </span>
                <p className="text-sm text-destructive/90">{transaction.rejectedReason}</p>
              </div>
            )}

            {transaction.status === 'Completed' && transaction.approvedAt && (
              <div className="pt-2">
                <span className="text-muted-foreground text-sm block mb-1">Approved On</span>
                <p className="text-sm">{format(new Date(transaction.approvedAt), 'PPpp')}</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserIcon className="h-5 w-5 text-muted-foreground" />
              Agent Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {user ? (
              <>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-muted-foreground">Name</span>
                  <span className="font-medium">{user.user.name}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-muted-foreground">Email</span>
                  <span className="font-medium">{user.user.email}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-muted-foreground">Role</span>
                  <span className="font-medium">{user.user.role}</span>
                </div>
                
                <div className="pt-4">
                  <h4 className="font-semibold flex items-center gap-2 mb-3">
                    <Building2 className="h-4 w-4 text-muted-foreground" />
                    Bank Information
                  </h4>
                  {user.user.bankInfo ? (
                    <div className="bg-muted p-4 rounded-md space-y-2 text-sm">
                      <div className="grid grid-cols-3">
                        <span className="text-muted-foreground">Bank:</span>
                        <span className="col-span-2 font-medium">{user.user.bankInfo.bankName}</span>
                      </div>
                      <div className="grid grid-cols-3">
                        <span className="text-muted-foreground">Acct Name:</span>
                        <span className="col-span-2 font-medium">{user. user.bankInfo.bankAccountName}</span>
                      </div>
                      <div className="grid grid-cols-3">
                        <span className="text-muted-foreground">Acct No:</span>
                        <span className="col-span-2 font-mono font-medium">{user.user.bankInfo.bankAccountNumber}</span>
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm text-destructive">No bank information provided by this user.</p>
                  )}
                </div>
              </>
            ) : (
              <p className="text-sm text-muted-foreground">User information could not be loaded.</p>
            )}
          </CardContent>
        </Card>
      </div>

      <WithdrawalControls 
        transactionId={transaction.id!} 
        amount={transaction.amount} 
        status={transaction.status} 
      />
    </div>
  )
}
