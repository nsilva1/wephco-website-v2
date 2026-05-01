import { getSupportTickets } from "@/actions/support-tickets";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export const revalidate = 0;

export default async function SupportTicketsPage() {
  const tickets = await getSupportTickets();

  // Extract unique categories for the filter dropdown
  const categories = [...new Set(tickets.map(t => t.category).filter(Boolean))];

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Support Tickets</h2>
      </div>
      <div className="flex-1">
        <DataTable columns={columns} data={tickets} categories={categories} />
      </div>
    </div>
  );
}
