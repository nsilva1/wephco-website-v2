import { getLeads } from "@/actions/leads";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export const revalidate = 0;

export default async function LeadsPage() {
  const leads = await getLeads();

  // Extract unique agents for the filter dropdown
  const agentsMap = new Map<string, { id: string; name: string }>();
  leads.forEach(lead => {
    if (lead.agent && !agentsMap.has(lead.agent.id)) {
      agentsMap.set(lead.agent.id, { id: lead.agent.id, name: lead.agent.name });
    }
  });
  const agents = Array.from(agentsMap.values());

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Leads Overview</h2>
          <p className="text-muted-foreground mt-1">Read-only view of all leads across agents</p>
        </div>
      </div>
      <div className="flex-1">
        <DataTable columns={columns} data={leads} agents={agents} />
      </div>
    </div>
  );
}
