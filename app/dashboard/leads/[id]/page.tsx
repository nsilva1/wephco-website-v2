import { notFound } from "next/navigation"
import { getLeadById } from "@/actions/leads"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"
import { ArrowLeft, User as UserIcon, Building2, DollarSign, Phone, Mail, FileText } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { formatCurrency } from "@/lib/utils"

export const revalidate = 0;

export default async function LeadDetailPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  const lead = await getLeadById(id)

  if (!lead) return notFound()

  const statusStyles: Record<string, string> = {
    new: 'bg-blue-500 hover:bg-blue-600 text-white',
    contacted: 'bg-amber-500 hover:bg-amber-600 text-white',
    qualified: 'bg-purple-500 hover:bg-purple-600 text-white',
    negotiation: 'bg-orange-500 hover:bg-orange-600 text-white',
    won: 'bg-green-500 hover:bg-green-600 text-white',
    lost: 'bg-slate-500 hover:bg-slate-600 text-white',
  }

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/leads">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h2 className="text-3xl font-bold tracking-tight">Lead Details</h2>
        <Badge
          variant="secondary"
          className={`capitalize ${statusStyles[lead.status?.toLowerCase()] || 'bg-gray-400 text-white'}`}
        >
          {lead.status || 'New'}
        </Badge>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Lead Info */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserIcon className="h-5 w-5 text-muted-foreground" />
              Lead Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between border-b pb-2">
              <span className="text-muted-foreground">Name</span>
              <span className="font-semibold">{lead.name}</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="text-muted-foreground flex items-center gap-1"><Mail className="h-4 w-4" /> Email</span>
              <span className="font-medium">{lead.email}</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="text-muted-foreground flex items-center gap-1"><Phone className="h-4 w-4" /> Phone</span>
              <span className="font-medium">{lead.phone}</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="text-muted-foreground flex items-center gap-1"><DollarSign className="h-4 w-4" /> Budget</span>
              <span className="font-bold text-[#cfb53b]">{formatCurrency(lead.budget, lead.currency)}</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="text-muted-foreground">Source</span>
              <Badge variant="outline" className="capitalize">{lead.source || 'N/A'}</Badge>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="text-muted-foreground">Created</span>
              <span className="text-sm">{lead.createdAt ? format(new Date(lead.createdAt), 'PPpp') : 'N/A'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Last Updated</span>
              <span className="text-sm">{lead.updatedAt ? format(new Date(lead.updatedAt), 'PPpp') : 'N/A'}</span>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          {/* Agent */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserIcon className="h-5 w-5 text-muted-foreground" />
                Assigned Agent
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {lead.agent ? (
                <>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-muted-foreground">Name</span>
                    <span className="font-medium">{lead.agent.name}</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-muted-foreground">Email</span>
                    <span className="font-medium">{lead.agent.email}</span>
                  </div>
                  <Link href={`/dashboard/users/${lead.agent.id}`}>
                    <Button variant="outline" size="sm" className="w-full mt-2">
                      View Agent Profile
                    </Button>
                  </Link>
                </>
              ) : (
                <p className="text-sm text-muted-foreground">Agent information not available.</p>
              )}
            </CardContent>
          </Card>

          {/* Property */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5 text-muted-foreground" />
                Associated Property
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {lead.property ? (
                <>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-muted-foreground">Title</span>
                    <span className="font-medium">{lead.property.title}</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-muted-foreground">Location</span>
                    <span className="font-medium">{lead.property.location}</span>
                  </div>
                  <Link href={`/dashboard/properties/${lead.property.id}`}>
                    <Button variant="outline" size="sm" className="w-full mt-2">
                      View Property
                    </Button>
                  </Link>
                </>
              ) : (
                <p className="text-sm text-muted-foreground">No property associated.</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Notes */}
      {lead.notes && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-muted-foreground" />
              Notes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-muted p-4 rounded-md text-sm whitespace-pre-wrap">
              {lead.notes}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
