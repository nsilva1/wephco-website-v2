import { getGlobalCommissionRate, getCommissionHistory, getAgentsWithRates } from "@/actions/commission";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import CommissionControls from "./CommissionControls";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, TrendingUp, Users } from "lucide-react";

export const revalidate = 0;

export default async function CommissionPage() {
  const [globalRate, history, agents] = await Promise.all([
    getGlobalCommissionRate(),
    getCommissionHistory(),
    getAgentsWithRates(),
  ]);

  // Summary stats
  const totalCommissionPaid = history.reduce((sum, h) => sum + (h.amount || 0), 0);
  const totalRecords = history.length;
  const uniqueAgents = new Set(history.map(h => h.userId)).size;

  // Agent list for filter dropdowns
  const agentFilterList = agents.map(a => ({ id: a.id, name: a.name }));

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Commission Management</h2>
        <p className="text-muted-foreground mt-1">Set rates, log commissions, and track credit history</p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Commissions Paid</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-[#cfb53b]">${totalCommissionPaid.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">{totalRecords} transactions</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Global Commission Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{globalRate}%</p>
            <p className="text-xs text-muted-foreground">Default for all agents</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Agents Earning</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{uniqueAgents}</p>
            <p className="text-xs text-muted-foreground">Out of {agents.length} total agents</p>
          </CardContent>
        </Card>
      </div>

      {/* Controls: Global rate, Per-agent rates, Log commission */}
      <CommissionControls globalRate={globalRate} agents={agents} />

      {/* Commission History */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Commission History</h3>
        <DataTable columns={columns} data={history} agents={agentFilterList} />
      </div>
    </div>
  );
}
