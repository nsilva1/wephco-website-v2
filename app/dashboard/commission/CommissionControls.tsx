"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { setGlobalCommissionRate, setAgentCommissionRate, logCommission, IAgentWithRate } from "@/actions/commission"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useAuth } from "@/context/AuthContext"
import { Settings, Percent, DollarSign, PenLine } from "lucide-react"

interface CommissionControlsProps {
  globalRate: number
  agents: IAgentWithRate[]
}

export default function CommissionControls({ globalRate, agents }: CommissionControlsProps) {
  const router = useRouter()
  const { currentUser } = useAuth()

  // Global rate state
  const [newGlobalRate, setNewGlobalRate] = useState(globalRate.toString())
  const [isSavingGlobal, setIsSavingGlobal] = useState(false)

  // Agent rate state
  const [editingAgentId, setEditingAgentId] = useState<string | null>(null)
  const [agentRate, setAgentRate] = useState("")
  const [isSavingAgent, setIsSavingAgent] = useState(false)

  // Log commission state
  const [isLogDialogOpen, setIsLogDialogOpen] = useState(false)
  const [logAgentId, setLogAgentId] = useState("")
  const [logAmount, setLogAmount] = useState("")
  const [logDescription, setLogDescription] = useState("")
  const [isLogging, setIsLogging] = useState(false)

  const handleSaveGlobalRate = async () => {
    const rate = parseFloat(newGlobalRate)
    if (isNaN(rate) || rate < 0 || rate > 100) {
      alert("Please enter a valid rate between 0 and 100")
      return
    }
    setIsSavingGlobal(true)
    try {
      await setGlobalCommissionRate(rate)
      router.refresh()
    } catch (error) {
      console.error(error)
      alert("Failed to update global rate")
    } finally {
      setIsSavingGlobal(false)
    }
  }

  const handleSaveAgentRate = async (agentId: string) => {
    const rate = parseFloat(agentRate)
    if (isNaN(rate) || rate < 0 || rate > 100) {
      alert("Please enter a valid rate between 0 and 100")
      return
    }
    setIsSavingAgent(true)
    try {
      await setAgentCommissionRate(agentId, rate)
      setEditingAgentId(null)
      setAgentRate("")
      router.refresh()
    } catch (error) {
      console.error(error)
      alert("Failed to update agent rate")
    } finally {
      setIsSavingAgent(false)
    }
  }

  const handleLogCommission = async () => {
    if (!currentUser) return
    if (!logAgentId) { alert("Please select an agent"); return }
    const amount = parseFloat(logAmount)
    if (isNaN(amount) || amount <= 0) { alert("Please enter a valid amount"); return }

    setIsLogging(true)
    try {
      await logCommission(logAgentId, amount, logDescription, currentUser.uid)
      setIsLogDialogOpen(false)
      setLogAgentId("")
      setLogAmount("")
      setLogDescription("")
      router.refresh()
    } catch (error) {
      console.error(error)
      alert("Failed to log commission")
    } finally {
      setIsLogging(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        {/* Global Rate Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5 text-muted-foreground" />
              Global Commission Rate
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              This rate applies to all agents unless overridden individually.
            </p>
            <div className="flex items-center gap-3">
              <div className="relative flex-1">
                <Input
                  type="number"
                  step="0.1"
                  min="0"
                  max="100"
                  value={newGlobalRate}
                  onChange={e => setNewGlobalRate(e.target.value)}
                  className="pr-8"
                />
                <Percent className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              </div>
              <Button
                onClick={handleSaveGlobalRate}
                disabled={isSavingGlobal}
                className="bg-[#cfb53b] hover:bg-[#b89e2f] text-white"
              >
                {isSavingGlobal ? "Saving..." : "Save"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Log Commission Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-muted-foreground" />
              Log Commission
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Manually credit commission to an agent for a closed deal.
            </p>
            <Dialog open={isLogDialogOpen} onOpenChange={setIsLogDialogOpen}>
              <DialogTrigger asChild>
                <Button className="w-full bg-[#cfb53b] hover:bg-[#b89e2f] text-white">
                  <DollarSign className="mr-2 h-4 w-4" />
                  Log New Commission
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Log Commission</DialogTitle>
                  <DialogDescription>
                    Credit commission to an agent&apos;s wallet. This creates a transaction record.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label>Agent</Label>
                    <Select value={logAgentId} onValueChange={setLogAgentId}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select an agent" />
                      </SelectTrigger>
                      <SelectContent>
                        {agents.map(agent => (
                          <SelectItem key={agent.id} value={agent.id}>
                            {agent.name} ({agent.email})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label>Amount ($)</Label>
                    <Input
                      type="number"
                      step="0.01"
                      value={logAmount}
                      onChange={e => setLogAmount(e.target.value)}
                      placeholder="e.g. 500"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label>Description</Label>
                    <Textarea
                      value={logDescription}
                      onChange={e => setLogDescription(e.target.value)}
                      placeholder="e.g. Commission for 3-bed apartment deal at Lekki"
                      rows={3}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsLogDialogOpen(false)}>Cancel</Button>
                  <Button
                    onClick={handleLogCommission}
                    disabled={isLogging || !logAgentId || !logAmount}
                    className="bg-[#cfb53b] hover:bg-[#b89e2f] text-white"
                  >
                    {isLogging ? "Processing..." : "Confirm Credit"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
      </div>

      {/* Per-Agent Rates Table */}
      <Card>
        <CardHeader>
          <CardTitle>Agent Commission Rates</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="p-3 text-left font-medium">Agent</th>
                  <th className="p-3 text-left font-medium">Email</th>
                  <th className="p-3 text-left font-medium">Commission Rate</th>
                  <th className="p-3 text-left font-medium">Total Earnings</th>
                  <th className="p-3 text-left font-medium">Deals Closed</th>
                  <th className="p-3 text-left font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {agents.map(agent => (
                  <tr key={agent.id} className="border-b hover:bg-muted/30">
                    <td className="p-3 font-medium">{agent.name}</td>
                    <td className="p-3 text-muted-foreground">{agent.email}</td>
                    <td className="p-3">
                      {editingAgentId === agent.id ? (
                        <div className="flex items-center gap-2">
                          <Input
                            type="number"
                            step="0.1"
                            value={agentRate}
                            onChange={e => setAgentRate(e.target.value)}
                            className="w-20 h-8"
                          />
                          <span className="text-xs text-muted-foreground">%</span>
                          <Button
                            size="sm"
                            onClick={() => handleSaveAgentRate(agent.id)}
                            disabled={isSavingAgent}
                            className="h-8 bg-[#cfb53b] hover:bg-[#b89e2f] text-white"
                          >
                            Save
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => { setEditingAgentId(null); setAgentRate("") }}
                            className="h-8"
                          >
                            Cancel
                          </Button>
                        </div>
                      ) : (
                        <Badge variant="outline" className="font-mono">
                          {agent.commissionRate > 0 ? `${agent.commissionRate}%` : `${globalRate}% (global)`}
                        </Badge>
                      )}
                    </td>
                    <td className="p-3 font-bold text-[#cfb53b]">
                      ${agent.totalEarnings.toLocaleString()}
                    </td>
                    <td className="p-3">{agent.dealsClosed}</td>
                    <td className="p-3">
                      {editingAgentId !== agent.id && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setEditingAgentId(agent.id)
                            setAgentRate(agent.commissionRate.toString())
                          }}
                        >
                          <PenLine className="h-4 w-4" />
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
                {agents.length === 0 && (
                  <tr>
                    <td colSpan={6} className="text-center py-8 text-muted-foreground">No agents found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
