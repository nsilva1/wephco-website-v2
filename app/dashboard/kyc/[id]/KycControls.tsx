"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { updateKycStatus } from "@/actions/user-management"
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
import { CheckCircle2, Flag, RotateCcw } from "lucide-react"

interface KycControlsProps {
  userId: string
  currentStatus?: string
}

export default function KycControls({ userId, currentStatus }: KycControlsProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [flagReason, setFlagReason] = useState("")
  const [isFlagModalOpen, setIsFlagModalOpen] = useState(false)

  const handleVerify = async () => {
    setIsLoading(true)
    try {
      await updateKycStatus(userId, 'verified')
      router.refresh()
    } catch (error) {
      console.error(error)
      alert("Failed to verify user KYC")
    } finally {
      setIsLoading(false)
    }
  }

  const handleFlag = async () => {
    if (!flagReason.trim()) {
      alert("Please provide a reason for flagging")
      return
    }
    setIsLoading(true)
    try {
      await updateKycStatus(userId, 'flagged', flagReason)
      setIsFlagModalOpen(false)
      setFlagReason("")
      router.refresh()
    } catch (error) {
      console.error(error)
      alert("Failed to flag user KYC")
    } finally {
      setIsLoading(false)
    }
  }

  const handleResetToPending = async () => {
    setIsLoading(true)
    try {
      await updateKycStatus(userId, 'pending')
      router.refresh()
    } catch (error) {
      console.error(error)
      alert("Failed to reset KYC status")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex items-center gap-3 flex-wrap">
      {currentStatus !== 'verified' && (
        <Button
          className="bg-green-600 hover:bg-green-700 text-white"
          onClick={handleVerify}
          disabled={isLoading}
        >
          <CheckCircle2 className="mr-2 h-4 w-4" />
          {isLoading ? "Verifying..." : "Mark as Verified"}
        </Button>
      )}

      {currentStatus !== 'flagged' && (
        <Dialog open={isFlagModalOpen} onOpenChange={setIsFlagModalOpen}>
          <DialogTrigger asChild>
            <Button variant="destructive" disabled={isLoading}>
              <Flag className="mr-2 h-4 w-4" />
              Flag Issue
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Flag Verification Issue</DialogTitle>
              <DialogDescription>
                Describe the issue found with this user's KYC documents. The user will not be able to withdraw until the issue is resolved.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="flagReason">Reason</Label>
                <Textarea
                  id="flagReason"
                  value={flagReason}
                  onChange={(e) => setFlagReason(e.target.value)}
                  placeholder="e.g., NIN does not match the provided name"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsFlagModalOpen(false)}>Cancel</Button>
              <Button variant="destructive" onClick={handleFlag} disabled={isLoading || !flagReason.trim()}>
                {isLoading ? "Flagging..." : "Confirm Flag"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {(currentStatus === 'verified' || currentStatus === 'flagged') && (
        <Button variant="outline" onClick={handleResetToPending} disabled={isLoading}>
          <RotateCcw className="mr-2 h-4 w-4" />
          Reset to Pending
        </Button>
      )}
    </div>
  )
}
