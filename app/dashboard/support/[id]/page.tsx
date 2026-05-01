import { notFound } from "next/navigation"
import { getSupportTicketById } from "@/actions/support-tickets"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"
import { ArrowLeft, User as UserIcon, MessageSquare, CheckCircle2, Info } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import TicketControls from "./TicketControls"

export const revalidate = 0;

export default async function TicketDetailPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  const ticket = await getSupportTicketById(id)

  if (!ticket) return notFound()

  const { user } = ticket

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/support">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h2 className="text-3xl font-bold tracking-tight">Ticket Details</h2>
        <Badge
          variant={ticket.status === "resolved" ? "secondary" : "default"}
          className={`ml-2 text-sm ${ticket.status === "resolved"
            ? "bg-green-500 hover:bg-green-600 text-white"
            : "bg-amber-500 hover:bg-amber-600 text-white"
          }`}
        >
          {ticket.status === "resolved" ? "Resolved" : "Open"}
        </Badge>
        <Badge variant="outline" className="capitalize">{ticket.category}</Badge>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Ticket Content */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-muted-foreground" />
              Ticket
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <span className="text-muted-foreground text-sm block mb-1">Subject</span>
              <p className="font-semibold text-lg">{ticket.subject}</p>
            </div>
            <div>
              <span className="text-muted-foreground text-sm block mb-1">Message</span>
              <div className="bg-muted p-4 rounded-md text-sm whitespace-pre-wrap">
                {ticket.message}
              </div>
            </div>
            <div className="flex justify-between border-t pt-3">
              <span className="text-muted-foreground text-sm">Submitted</span>
              <span className="text-sm font-medium">
                {ticket.createdAt ? format(new Date(ticket.createdAt), 'PPpp') : 'N/A'}
              </span>
            </div>
            <div className="flex justify-between border-t pt-3">
              <span className="text-muted-foreground text-sm">Ticket ID</span>
              <span className="font-mono text-xs">{ticket.id}</span>
            </div>
          </CardContent>
        </Card>

        {/* User Info & Resolution */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserIcon className="h-5 w-5 text-muted-foreground" />
                Submitted By
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {user ? (
                <>
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
                  <div className="pt-1">
                    <Link href={`/dashboard/users/${user.id}`}>
                      <Button variant="outline" size="sm" className="w-full">
                        View Full Profile
                      </Button>
                    </Link>
                  </div>
                </>
              ) : (
                <p className="text-sm text-muted-foreground">User information could not be loaded.</p>
              )}
            </CardContent>
          </Card>

          {ticket.status === 'resolved' && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                  Resolution
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {ticket.responseNotes && (
                  <div>
                    <span className="text-muted-foreground text-sm block mb-1">Response Notes</span>
                    <div className="bg-green-50 border border-green-200 p-3 rounded-md text-sm whitespace-pre-wrap">
                      {ticket.responseNotes}
                    </div>
                  </div>
                )}
                {ticket.resolvedAt && (
                  <div className="flex justify-between border-t pt-2">
                    <span className="text-muted-foreground text-sm">Resolved On</span>
                    <span className="text-sm font-medium">{format(new Date(ticket.resolvedAt), 'PPpp')}</span>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <TicketControls ticketId={ticket.id!} status={ticket.status} />
        </CardContent>
      </Card>
    </div>
  )
}
