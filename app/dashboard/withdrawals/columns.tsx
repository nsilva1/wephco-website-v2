"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ITransaction } from "@/interfaces/userInterface"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowUpDown, MoreHorizontal, ExternalLink } from "lucide-react"
import { format } from "date-fns"
import Link from "next/link"

export const columns: ColumnDef<ITransaction>[] = [
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date Submitted
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const dateStr = row.getValue("createdAt") as string
      if (!dateStr) return "N/A"
      try {
        return format(new Date(dateStr), "MMM dd, yyyy")
      } catch (e) {
        return dateStr
      }
    }
  },
  {
    id: "agentName",
    header: "Agent Name",
    cell: ({ row }) => {
      const user = row.original.user;
      return <div className="font-medium">{user ? user.name : "Unknown"}</div>
    }
  },
  {
    accessorKey: "amount",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Amount
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"))
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount)
 
      return <div className="font-bold text-[#cfb53b]">{formatted}</div>
    },
  },
  {
    id: "bankDetails",
    header: "Bank Details",
    cell: ({ row }) => {
      const user = row.original.user;
      if (!user?.bankInfo) return <span className="text-muted-foreground text-sm">Not provided</span>;
      
      return (
        <div className="flex flex-col text-sm">
          <span>{user.bankInfo.bankName}</span>
          <span className="text-muted-foreground">{user.bankInfo.bankAccountNumber}</span>
        </div>
      )
    }
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      
      let variant: "default" | "secondary" | "destructive" | "outline" = "outline";
      if (status === "Completed") variant = "default";
      if (status === "Pending") variant = "secondary";
      if (status === "Failed") variant = "destructive";

      return <Badge variant={variant} className={status === "Completed" ? "bg-green-500 hover:bg-green-600 text-white" : status === "Pending" ? "bg-amber-500 hover:bg-amber-600 text-white" : ""}>{status}</Badge>
    }
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const transaction = row.original
 
      return (
        <Link href={`/dashboard/withdrawals/${transaction.id}`}>
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            View Details <ExternalLink className="h-4 w-4" />
          </Button>
        </Link>
      )
    },
  },
]
