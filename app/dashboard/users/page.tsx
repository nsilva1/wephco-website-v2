import { getUsers } from "@/actions/user-management"
import { columns } from "./columns"
import { DataTable } from "./data-table"

export const revalidate = 0;

export default async function UsersPage() {
  const users = await getUsers()

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h3 className="text-3xl font-bold text-slate-800">User Management</h3>
        <p className="text-gray-500">Manage all agents.</p>
      </div>
      
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <DataTable columns={columns} data={users} />
      </div>
    </div>
  )
}
