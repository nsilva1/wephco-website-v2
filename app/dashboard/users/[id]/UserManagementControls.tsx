"use client"

import { useState } from "react"
import { IUserInfo } from "@/interfaces/userInterface"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { creditUserWallet, toggleUserSuspension } from "@/actions/user-management"
import { useRouter } from "next/navigation"

export function UserManagementControls({ user }: { user: IUserInfo }) {
  const [amount, setAmount] = useState("")
  const [isCrediting, setIsCrediting] = useState(false)
  const [isTogglingStatus, setIsTogglingStatus] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const router = useRouter()

  const handleCredit = async (e: React.FormEvent) => {
    e.preventDefault()
    const numAmount = parseFloat(amount)
    if (isNaN(numAmount) || numAmount <= 0) return

    setIsCrediting(true)
    try {
      await creditUserWallet(user.id, numAmount)
      setIsDialogOpen(false)
      setAmount("")
      alert("Commission credited successfully")
      router.refresh()
    } catch (error) {
      console.error(error)
      alert("Failed to credit commission")
    } finally {
      setIsCrediting(false)
    }
  }

  const handleToggleStatus = async () => {
    setIsTogglingStatus(true)
    const isCurrentlySuspended = user.status === 'Suspended'
    try {
      await toggleUserSuspension(user.id, !isCurrentlySuspended)
      alert(`User account ${isCurrentlySuspended ? 'activated' : 'suspended'} successfully`)
      router.refresh()
    } catch (error) {
      console.error(error)
      alert("Failed to update account status")
    } finally {
      setIsTogglingStatus(false)
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-4">
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="default" className="bg-[#cfb53b] hover:bg-[#b09a32] text-white">
            Credit Commission
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <form onSubmit={handleCredit}>
            <DialogHeader>
              <DialogTitle>Credit Commission</DialogTitle>
              <DialogDescription>
                Manually add commission to this user's wallet. This action will create a transaction record.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="amount" className="text-right">
                  Amount ($)
                </Label>
                <Input
                  id="amount"
                  type="number"
                  step="0.01"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="col-span-3"
                  placeholder="e.g. 500"
                  required
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={isCrediting}>
                {isCrediting ? "Crediting..." : "Confirm Credit"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Button 
        variant={user.status === 'Suspended' ? "outline" : "destructive"}
        onClick={handleToggleStatus}
        disabled={isTogglingStatus}
      >
        {isTogglingStatus ? "Updating..." : user.status === 'Suspended' ? "Reactivate Account" : "Suspend Account"}
      </Button>
    </div>
  )
}
