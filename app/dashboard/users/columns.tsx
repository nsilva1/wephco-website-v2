"use client"

import { ColumnDef } from "@tanstack/react-table"
import { IUserInfo } from "@/interfaces/userInterface"
import { MoreHorizontal, ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"

export const columns: ColumnDef<IUserInfo>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => {
      return <Badge variant="outline">{row.getValue("role")}</Badge>
    }
  },
  {
    id: "kyc",
    header: "Verification (NIN/BVN)",
    cell: ({ row }) => {
      const user = row.original;
      const hasNin = !!user.bankInfo?.nin;
      const hasBvn = !!user.bankInfo?.bvn;
      
      return (
        <div className="flex flex-col gap-1">
          <Badge variant={hasNin ? "secondary" : "destructive"} className={`w-fit ${hasNin ? "bg-green-500 hover:bg-green-600 text-white" : ""}`}>
            NIN: {hasNin ? "Verified" : "Missing"}
          </Badge>
          <Badge variant={hasBvn ? "secondary" : "destructive"} className={`w-fit ${hasBvn ? "bg-green-500 hover:bg-green-600 text-white" : ""}`}>
            BVN: {hasBvn ? "Verified" : "Missing"}
          </Badge>
        </div>
      )
    }
  },
  {
    id: "walletBalance",
    header: "Wallet Balance",
    cell: ({ row }) => {
      const balance = row.original.wallet?.availableBalance || 0;
      return <div className="font-medium">${balance.toLocaleString()}</div>
    }
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status || "Active";
      return (
        <Badge variant={status === "Active" ? "secondary" : "destructive"}>
          {status}
        </Badge>
      )
    }
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original
 
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(user.id)}
            >
              Copy User ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href={`/dashboard/users/${user.id}`}>View Details</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
