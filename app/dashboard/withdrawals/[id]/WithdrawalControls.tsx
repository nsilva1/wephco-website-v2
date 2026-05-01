"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { approveWithdrawal, rejectWithdrawal } from "@/actions/transactions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
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

interface WithdrawalControlsProps {
  transactionId: string
  amount: number
  status: string
}

export default function WithdrawalControls({ transactionId, amount, status }: WithdrawalControlsProps) {
  const router = useRouter()
  const { user } = useAuth()
  const [isApproving, setIsApproving] = useState(false)
  const [isRejecting, setIsRejecting] = useState(false)
  const [rejectReason, setRejectReason] = useState("")
  const [isApproveModalOpen, setIsApproveModalOpen] = useState(false)
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false)

  if (status !== 'Pending') {
    return null; // Don't show controls if not pending
  }

  const handleApprove = async () => {
    if (!user) return;
    setIsApproving(true)
    try {
      await approveWithdrawal(transactionId, user.uid)
      setIsApproveModalOpen(false)
      router.refresh()
    } catch (error) {
      console.error(error)
      alert("Failed to approve withdrawal")
    } finally {
      setIsApproving(false)
    }
  }

  const handleReject = async () => {
    if (!user) return;
    if (!rejectReason.trim()) {
      alert("Please provide a reason for rejection")
      return
    }
    setIsRejecting(true)
    try {
      await rejectWithdrawal(transactionId, user.uid, rejectReason)
      setIsRejectModalOpen(false)
      router.refresh()
    } catch (error) {
      console.error(error)
      alert("Failed to reject withdrawal")
    } finally {
      setIsRejecting(false)
    }
  }

  const formattedAmount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount)

  return (
    <div className="flex items-center gap-4 mt-6">
      <Dialog open={isApproveModalOpen} onOpenChange={setIsApproveModalOpen}>
        <DialogTrigger asChild>
          <Button className="bg-green-600 hover:bg-green-700 text-white">Approve Payout</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Approve Withdrawal</DialogTitle>
            <DialogDescription>
              Are you sure you want to approve this withdrawal request for {formattedAmount}? This will mark the transaction as completed and finalize the escrow deduction.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsApproveModalOpen(false)}>Cancel</Button>
            <Button className="bg-green-600 hover:bg-green-700 text-white" onClick={handleApprove} disabled={isApproving}>
              {isApproving ? "Approving..." : "Confirm Approval"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isRejectModalOpen} onOpenChange={setIsRejectModalOpen}>
        <DialogTrigger asChild>
          <Button variant="destructive">Reject Request</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Withdrawal</DialogTitle>
            <DialogDescription>
              Please provide a reason for rejecting this withdrawal. The {formattedAmount} will be refunded from escrow back to the agent's available balance.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="reason">Reason for Rejection</Label>
              <Textarea
                id="reason"
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                placeholder="e.g. Invalid bank details"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsRejectModalOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleReject} disabled={isRejecting || !rejectReason.trim()}>
              {isRejecting ? "Rejecting..." : "Confirm Rejection"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
