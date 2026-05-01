import { getWithdrawals } from "@/actions/transactions";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export const revalidate = 0;

export default async function WithdrawalsPage() {
  const data = await getWithdrawals();

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Withdrawal Requests</h2>
      </div>
      <div className="flex-1">
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
}
