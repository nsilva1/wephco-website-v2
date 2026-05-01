import { notFound } from "next/navigation"
import { getUserById } from "@/actions/user-management"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, User as UserIcon, ShieldCheck, FileWarning, Info } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import KycControls from "./KycControls"

export const revalidate = 0;

export default async function KycDetailPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  const data = await getUserById(id)

  if (!data) return notFound()

  const { user } = data

  const hasNin = !!user.bankInfo?.nin;
  const hasBvn = !!user.bankInfo?.bvn;
  const kycStatus = user.kycStatus || (hasNin && hasBvn ? 'pending' : 'pending');

  const statusColors: Record<string, string> = {
    verified: 'bg-green-500 hover:bg-green-600 text-white',
    flagged: 'bg-red-600 hover:bg-red-700 text-white',
    pending: 'bg-amber-500 hover:bg-amber-600 text-white',
  }

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/kyc">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h2 className="text-3xl font-bold tracking-tight">KYC Review</h2>
        <Badge variant="secondary" className={`ml-2 text-sm capitalize ${statusColors[kycStatus] || ''}`}>
          {kycStatus}
        </Badge>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Agent Info */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserIcon className="h-5 w-5 text-muted-foreground" />
              Agent Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between border-b pb-2">
              <span className="text-muted-foreground">Name</span>
              <span className="font-medium">{user.name}</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="text-muted-foreground">Email</span>
              <span className="font-medium">{user.email}</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="text-muted-foreground">Role</span>
              <span className="font-medium">{user.role}</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="text-muted-foreground">Account Status</span>
              <Badge variant={user.status === 'Suspended' ? 'destructive' : 'secondary'}>
                {user.status || 'Active'}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* KYC Documents */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-muted-foreground" />
              Verification Documents
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center border-b pb-3">
              <div>
                <span className="text-muted-foreground text-sm block">NIN (National ID Number)</span>
                <span className="font-mono font-medium text-lg">
                  {user.bankInfo?.nin || '—'}
                </span>
              </div>
              {hasNin ? (
                <Badge className="bg-green-500 hover:bg-green-600 text-white">Submitted</Badge>
              ) : (
                <Badge variant="destructive">Missing</Badge>
              )}
            </div>
            <div className="flex justify-between items-center border-b pb-3">
              <div>
                <span className="text-muted-foreground text-sm block">BVN (Bank Verification Number)</span>
                <span className="font-mono font-medium text-lg">
                  {user.bankInfo?.bvn || '—'}
                </span>
              </div>
              {hasBvn ? (
                <Badge className="bg-green-500 hover:bg-green-600 text-white">Submitted</Badge>
              ) : (
                <Badge variant="destructive">Missing</Badge>
              )}
            </div>

            {user.bankInfo && (
              <div className="pt-2">
                <span className="text-muted-foreground text-sm block mb-2">Bank Details</span>
                <div className="bg-muted p-4 rounded-md space-y-2 text-sm">
                  <div className="grid grid-cols-3">
                    <span className="text-muted-foreground">Bank:</span>
                    <span className="col-span-2 font-medium">{user.bankInfo.bankName}</span>
                  </div>
                  <div className="grid grid-cols-3">
                    <span className="text-muted-foreground">Acct Name:</span>
                    <span className="col-span-2 font-medium">{user.bankInfo.bankAccountName}</span>
                  </div>
                  <div className="grid grid-cols-3">
                    <span className="text-muted-foreground">Acct No:</span>
                    <span className="col-span-2 font-mono font-medium">{user.bankInfo.bankAccountNumber}</span>
                  </div>
                </div>
              </div>
            )}

            {kycStatus === 'flagged' && user.kycFlagReason && (
              <div className="mt-4 bg-destructive/10 p-3 rounded-md border border-destructive/20">
                <span className="text-destructive font-semibold text-sm flex items-center gap-1 mb-1">
                  <FileWarning className="h-4 w-4" /> Flag Reason
                </span>
                <p className="text-sm text-destructive/90">{user.kycFlagReason}</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <KycControls userId={user.id} currentStatus={kycStatus} />
        </CardContent>
      </Card>
    </div>
  )
}
