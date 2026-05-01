"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { resolveTicket, reopenTicket } from "@/actions/support-tickets"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useAuth } from "@/context/AuthContext"
import { CheckCircle2, RotateCcw } from "lucide-react"

interface TicketControlsProps {
  ticketId: string
  status: string
}

export default function TicketControls({ ticketId, status }: TicketControlsProps) {
  const router = useRouter()
  const { currentUser: user } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [responseNotes, setResponseNotes] = useState("")
  const [isResolveModalOpen, setIsResolveModalOpen] = useState(false)

  const handleResolve = async () => {
    if (!user) return
    if (!responseNotes.trim()) {
      alert("Please provide response notes")
      return
    }
    setIsLoading(true)
    try {
      await resolveTicket(ticketId, user.uid, responseNotes)
      setIsResolveModalOpen(false)
      setResponseNotes("")
      router.refresh()
    } catch (error) {
      console.error(error)
      alert("Failed to resolve ticket")
    } finally {
      setIsLoading(false)
    }
  }

  const handleReopen = async () => {
    setIsLoading(true)
    try {
      await reopenTicket(ticketId)
      router.refresh()
    } catch (error) {
      console.error(error)
      alert("Failed to reopen ticket")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex items-center gap-3 flex-wrap">
      {status === 'open' && (
        <Dialog open={isResolveModalOpen} onOpenChange={setIsResolveModalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-green-600 hover:bg-green-700 text-white">
              <CheckCircle2 className="mr-2 h-4 w-4" />
              Resolve Ticket
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Resolve Support Ticket</DialogTitle>
              <DialogDescription>
                Provide your response notes or resolution details. This will be saved with the ticket and the status will be set to resolved.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="responseNotes">Response Notes</Label>
                <Textarea
                  id="responseNotes"
                  value={responseNotes}
                  onChange={(e) => setResponseNotes(e.target.value)}
                  placeholder="e.g., Issue has been resolved. The agent's wallet was credited manually..."
                  rows={4}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsResolveModalOpen(false)}>Cancel</Button>
              <Button className="bg-green-600 hover:bg-green-700 text-white" onClick={handleResolve} disabled={isLoading || !responseNotes.trim()}>
                {isLoading ? "Resolving..." : "Confirm Resolution"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {status === 'resolved' && (
        <Button variant="outline" onClick={handleReopen} disabled={isLoading}>
          <RotateCcw className="mr-2 h-4 w-4" />
          Reopen Ticket
        </Button>
      )}
    </div>
  )
}
