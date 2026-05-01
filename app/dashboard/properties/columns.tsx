"use client"

import { ColumnDef } from "@tanstack/react-table"
import { IProperty } from "@/interfaces/propertyInterface"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowUpDown, ExternalLink } from "lucide-react"
import Link from "next/link"
import { formatCurrency } from "@/lib/utils"
import Image from "next/image"

export const columns: ColumnDef<IProperty>[] = [
  {
    id: "image",
    header: "",
    cell: ({ row }) => {
      const image = row.original.image;
      return image ? (
        <div className="w-16 h-12 rounded overflow-hidden relative bg-muted">
          <Image src={image} alt={row.original.title} fill className="object-cover" sizes="64px" />
        </div>
      ) : (
        <div className="w-16 h-12 rounded bg-muted flex items-center justify-center text-xs text-muted-foreground">
          No img
        </div>
      );
    },
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        Title
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <div className="font-semibold max-w-[200px] truncate">{row.getValue("title")}</div>,
  },
  {
    accessorKey: "location",
    header: "Location",
  },
  {
    accessorKey: "price",
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        Price
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      return <div className="font-bold text-[#cfb53b]">{formatCurrency(row.original.price, row.original.currency)}</div>
    },
  },
  {
    accessorKey: "tag",
    header: "Tag",
    cell: ({ row }) => {
      const tag = row.getValue("tag") as string;
      return (
        <Badge
          variant="secondary"
          className={tag === 'verified'
            ? 'bg-green-500 hover:bg-green-600 text-white'
            : 'bg-amber-500 hover:bg-amber-600 text-white'}
        >
          {tag || 'pending'}
        </Badge>
      );
    },
    filterFn: (row, id, value) => {
      if (!value || value === 'all') return true;
      return row.getValue(id) === value;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      const styles: Record<string, string> = {
        available: 'bg-green-500 hover:bg-green-600 text-white',
        'under offer': 'bg-blue-500 hover:bg-blue-600 text-white',
        sold: 'bg-slate-600 hover:bg-slate-700 text-white',
      };
      return (
        <Badge variant="secondary" className={`capitalize ${styles[status] || ''}`}>
          {status || 'available'}
        </Badge>
      );
    },
    filterFn: (row, id, value) => {
      if (!value || value === 'all') return true;
      return row.getValue(id) === value;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <Link href={`/dashboard/properties/${row.original.id}`}>
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            Manage <ExternalLink className="h-4 w-4" />
          </Button>
        </Link>
      );
    },
  },
]
