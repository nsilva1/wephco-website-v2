"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ISupportTicket } from "@/interfaces/userInterface"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowUpDown, ExternalLink } from "lucide-react"
import { format } from "date-fns"
import Link from "next/link"

export const columns: ColumnDef<ISupportTicket>[] = [
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        Date
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const dateStr = row.getValue("createdAt") as string
      if (!dateStr) return "N/A"
      try {
        return format(new Date(dateStr), "MMM dd, yyyy")
      } catch {
        return dateStr
      }
    }
  },
  {
    id: "userName",
    header: "Submitted By",
    cell: ({ row }) => {
      const user = row.original.user
      return <div className="font-medium">{user?.name || "Unknown"}</div>
    }
  },
  {
    accessorKey: "subject",
    header: "Subject",
    cell: ({ row }) => {
      return <div className="max-w-[250px] truncate font-medium">{row.getValue("subject")}</div>
    }
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => {
      return <Badge variant="outline" className="capitalize">{row.getValue("category")}</Badge>
    },
    filterFn: (row, id, value) => {
      if (!value || value === 'all') return true
      return row.getValue(id) === value
    }
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      return (
        <Badge
          variant={status === "resolved" ? "secondary" : "default"}
          className={status === "resolved"
            ? "bg-green-500 hover:bg-green-600 text-white"
            : "bg-amber-500 hover:bg-amber-600 text-white"
          }
        >
          {status === "resolved" ? "Resolved" : "Open"}
        </Badge>
      )
    },
    filterFn: (row, id, value) => {
      if (!value || value === 'all') return true
      return row.getValue(id) === value
    }
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const ticket = row.original
      return (
        <Link href={`/dashboard/support/${ticket.id}`}>
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            View <ExternalLink className="h-4 w-4" />
          </Button>
        </Link>
      )
    },
  },
]
