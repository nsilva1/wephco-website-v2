"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ICommissionEntry } from "@/actions/commission"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowUpDown } from "lucide-react"
import Link from "next/link"
import { format } from "date-fns"

export const columns: ColumnDef<ICommissionEntry>[] = [
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        Date
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const date = row.getValue("createdAt") as string;
      return <span className="text-sm">{date ? format(new Date(date), 'PP') : 'N/A'}</span>;
    },
  },
  {
    id: "agentName",
    header: "Agent",
    accessorFn: (row) => row.agent?.name || 'Unknown',
    cell: ({ row }) => {
      const agent = row.original.agent;
      return agent ? (
        <Link href={`/dashboard/users/${agent.id}`} className="text-blue-600 hover:underline font-medium">
          {agent.name}
        </Link>
      ) : (
        <span className="text-muted-foreground">Unknown</span>
      );
    },
    filterFn: (row, id, value) => {
      if (!value || value === 'all') return true;
      return row.original.userId === value;
    },
  },
  {
    accessorKey: "amount",
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        Amount
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <span className="font-bold text-green-600">+${(row.getValue("amount") as number)?.toLocaleString()}</span>
    ),
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => (
      <span className="text-sm max-w-[250px] truncate block">{row.getValue("description")}</span>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return (
        <Badge
          variant="secondary"
          className={
            status === 'Completed' ? 'bg-green-500 hover:bg-green-600 text-white' :
            status === 'Pending' ? 'bg-amber-500 hover:bg-amber-600 text-white' :
            'bg-slate-500 text-white'
          }
        >
          {status}
        </Badge>
      );
    },
    filterFn: (row, id, value) => {
      if (!value || value === 'all') return true;
      return row.getValue(id) === value;
    },
  },
]
