"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ILeadWithRelations } from "@/actions/leads"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowUpDown, ExternalLink } from "lucide-react"
import Link from "next/link"
import { formatCurrency } from "@/lib/utils"
import { format } from "date-fns"

export const columns: ColumnDef<ILeadWithRelations>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        Lead Name
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <div className="font-semibold">{row.getValue("name")}</div>,
  },
  {
    id: "agentName",
    header: "Agent",
    accessorFn: (row) => row.agent?.name || 'Unknown',
    cell: ({ row }) => {
      const agent = row.original.agent;
      return agent ? (
        <Link href={`/dashboard/users/${agent.id}`} className="text-blue-600 hover:underline text-sm">
          {agent.name}
        </Link>
      ) : (
        <span className="text-muted-foreground text-sm">Unknown</span>
      );
    },
    filterFn: (row, id, value) => {
      if (!value || value === 'all') return true;
      return row.original.userId === value;
    },
  },
  {
    id: "propertyTitle",
    header: "Property",
    accessorFn: (row) => row.property?.title || 'N/A',
    cell: ({ row }) => {
      const property = row.original.property;
      return property ? (
        <Link href={`/dashboard/properties/${property.id}`} className="text-blue-600 hover:underline text-sm max-w-[180px] truncate block">
          {property.title}
        </Link>
      ) : (
        <span className="text-muted-foreground text-sm">N/A</span>
      );
    },
  },
  {
    accessorKey: "budget",
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        Budget
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="font-bold text-[#cfb53b]">
        {formatCurrency(row.original.budget, row.original.currency)}
      </div>
    ),
  },
  {
    accessorKey: "source",
    header: "Source",
    cell: ({ row }) => (
      <Badge variant="outline" className="capitalize">{row.getValue("source") || 'N/A'}</Badge>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      const styles: Record<string, string> = {
        new: 'bg-blue-500 hover:bg-blue-600 text-white',
        contacted: 'bg-amber-500 hover:bg-amber-600 text-white',
        qualified: 'bg-purple-500 hover:bg-purple-600 text-white',
        negotiation: 'bg-orange-500 hover:bg-orange-600 text-white',
        won: 'bg-green-500 hover:bg-green-600 text-white',
        lost: 'bg-slate-500 hover:bg-slate-600 text-white',
      };
      return (
        <Badge variant="secondary" className={`capitalize ${styles[status?.toLowerCase()] || 'bg-gray-400 text-white'}`}>
          {status || 'New'}
        </Badge>
      );
    },
    filterFn: (row, id, value) => {
      if (!value || value === 'all') return true;
      return (row.getValue(id) as string)?.toLowerCase() === value.toLowerCase();
    },
  },
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
    id: "actions",
    cell: ({ row }) => (
      <Link href={`/dashboard/leads/${row.original.id}`}>
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          View <ExternalLink className="h-4 w-4" />
        </Button>
      </Link>
    ),
  },
]
