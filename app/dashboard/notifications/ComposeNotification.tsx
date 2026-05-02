"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { sendPushNotification, IAgentForNotification } from "@/actions/notifications"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { useAuth } from "@/context/AuthContext"
import { Send, Users, UserCheck, Bell } from "lucide-react"

interface ComposeNotificationProps {
  agents: IAgentForNotification[]
}

export default function ComposeNotification({ agents }: ComposeNotificationProps) {
  const router = useRouter()
  const { currentUser } = useAuth()

  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")
  const [targetType, setTargetType] = useState<'all' | 'specific'>('all')
  const [selectedAgentIds, setSelectedAgentIds] = useState<string[]>([])
  const [isSending, setIsSending] = useState(false)
  const [result, setResult] = useState<{ successCount: number; failureCount: number; totalTokens: number } | null>(null)

  const agentsWithToken = agents.filter(a => a.hasFcmToken)

  const handleToggleAgent = (agentId: string) => {
    setSelectedAgentIds(prev =>
      prev.includes(agentId)
        ? prev.filter(id => id !== agentId)
        : [...prev, agentId]
    )
  }

  const handleSelectAll = () => {
    if (selectedAgentIds.length === agentsWithToken.length) {
      setSelectedAgentIds([])
    } else {
      setSelectedAgentIds(agentsWithToken.map(a => a.id))
    }
  }

  const handleSend = async () => {
    if (!currentUser) return
    if (!title.trim() || !body.trim()) {
      alert("Please enter both a title and message body")
      return
    }
    if (targetType === 'specific' && selectedAgentIds.length === 0) {
      alert("Please select at least one agent")
      return
    }

    setIsSending(true)
    setResult(null)
    try {
      const res = await sendPushNotification(
        title,
        body,
        targetType,
        targetType === 'specific' ? selectedAgentIds : [],
        currentUser.uid
      )
      setResult({ successCount: res.successCount, failureCount: res.failureCount, totalTokens: res.totalTokens })
      router.refresh()
    } catch (error) {
      console.error(error)
      alert("Failed to send notification")
    } finally {
      setIsSending(false)
    }
  }

  const handleReset = () => {
    setTitle("")
    setBody("")
    setTargetType('all')
    setSelectedAgentIds([])
    setResult(null)
  }

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {/* Compose Form */}
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-muted-foreground" />
            Compose Notification
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="e.g. New Property Listed!"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="body">Message *</Label>
            <Textarea
              id="body"
              value={body}
              onChange={e => setBody(e.target.value)}
              placeholder="e.g. A new premium property has been added. Check it out in the app!"
              rows={4}
            />
          </div>

          {/* Target Selection */}
          <div className="grid gap-3">
            <Label>Recipients</Label>
            <div className="flex gap-3">
              <Button
                type="button"
                variant={targetType === 'all' ? 'default' : 'outline'}
                onClick={() => setTargetType('all')}
                className={targetType === 'all' ? 'bg-[#cfb53b] hover:bg-[#b89e2f] text-white' : ''}
              >
                <Users className="mr-2 h-4 w-4" />
                All Agents ({agentsWithToken.length})
              </Button>
              <Button
                type="button"
                variant={targetType === 'specific' ? 'default' : 'outline'}
                onClick={() => setTargetType('specific')}
                className={targetType === 'specific' ? 'bg-[#cfb53b] hover:bg-[#b89e2f] text-white' : ''}
              >
                <UserCheck className="mr-2 h-4 w-4" />
                Specific Agents
              </Button>
            </div>
          </div>

          {/* Agent Selection (when specific) */}
          {targetType === 'specific' && (
            <div className="border rounded-lg p-4 max-h-60 overflow-y-auto space-y-2">
              <div className="flex items-center justify-between pb-2 border-b">
                <span className="text-sm font-medium">Select agents</span>
                <Button variant="ghost" size="sm" onClick={handleSelectAll}>
                  {selectedAgentIds.length === agentsWithToken.length ? 'Deselect All' : 'Select All'}
                </Button>
              </div>
              {agentsWithToken.length > 0 ? (
                agentsWithToken.map(agent => (
                  <label key={agent.id} className="flex items-center gap-3 py-1.5 px-2 rounded hover:bg-muted cursor-pointer">
                    <Checkbox
                      checked={selectedAgentIds.includes(agent.id)}
                      onCheckedChange={() => handleToggleAgent(agent.id)}
                    />
                    <div className="flex-1">
                      <span className="text-sm font-medium">{agent.name}</span>
                      <span className="text-xs text-muted-foreground ml-2">{agent.email}</span>
                    </div>
                  </label>
                ))
              ) : (
                <p className="text-sm text-muted-foreground py-2">No agents with push tokens available.</p>
              )}
            </div>
          )}

          {/* Result Banner */}
          {result && (
            <div className={`p-4 rounded-lg border ${result.failureCount === 0 ? 'bg-green-50 border-green-200' : 'bg-amber-50 border-amber-200'}`}>
              <p className="text-sm font-medium">
                Notification sent! ✅ {result.successCount} delivered, {result.failureCount} failed out of {result.totalTokens} recipients.
              </p>
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <Button
              onClick={handleSend}
              disabled={isSending || !title.trim() || !body.trim()}
              className="bg-[#cfb53b] hover:bg-[#b89e2f] text-white flex-1"
            >
              <Send className="mr-2 h-4 w-4" />
              {isSending ? "Sending..." : "Send Notification"}
            </Button>
            {result && (
              <Button variant="outline" onClick={handleReset}>
                Compose Another
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Stats Sidebar */}
      <div className="space-y-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Agents</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{agents.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">With Push Token</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-green-600">{agentsWithToken.length}</p>
            <p className="text-xs text-muted-foreground">Can receive notifications</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Without Push Token</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-muted-foreground">{agents.length - agentsWithToken.length}</p>
            <p className="text-xs text-muted-foreground">Haven&apos;t opened the app</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
