"use client"

import { ColumnDef } from "@tanstack/react-table"
import { IUserInfo } from "@/interfaces/userInterface"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowUpDown, ExternalLink } from "lucide-react"
import Link from "next/link"

function getKycLabel(user: IUserInfo) {
  const hasNin = !!user.bankInfo?.nin;
  const hasBvn = !!user.bankInfo?.bvn;
  if (user.kycStatus === 'flagged') return 'Flagged';
  if (user.kycStatus === 'verified') return 'Verified';
  if (hasNin && hasBvn) return 'Submitted';
  if (hasNin || hasBvn) return 'Incomplete';
  return 'Missing';
}

export const columns: ColumnDef<IUserInfo>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        Agent Name
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    id: "nin",
    header: "NIN",
    cell: ({ row }) => {
      const nin = row.original.bankInfo?.nin;
      return nin ? (
        <Badge className="bg-green-500 hover:bg-green-600 text-white">Submitted</Badge>
      ) : (
        <Badge variant="destructive">Missing</Badge>
      );
    }
  },
  {
    id: "bvn",
    header: "BVN",
    cell: ({ row }) => {
      const bvn = row.original.bankInfo?.bvn;
      return bvn ? (
        <Badge className="bg-green-500 hover:bg-green-600 text-white">Submitted</Badge>
      ) : (
        <Badge variant="destructive">Missing</Badge>
      );
    }
  },
  {
    id: "kycStatus",
    header: "KYC Status",
    cell: ({ row }) => {
      const user = row.original;
      const label = getKycLabel(user);

      const styles: Record<string, string> = {
        Verified: 'bg-green-500 hover:bg-green-600 text-white',
        Submitted: 'bg-blue-500 hover:bg-blue-600 text-white',
        Incomplete: 'bg-amber-500 hover:bg-amber-600 text-white',
        Missing: '',
        Flagged: 'bg-red-600 hover:bg-red-700 text-white',
      };

      return (
        <Badge variant={label === 'Missing' ? 'destructive' : label === 'Flagged' ? 'destructive' : 'secondary'} className={styles[label] || ''}>
          {label}
        </Badge>
      );
    },
    filterFn: (row, id, value) => {
      if (value === 'all') return true;
      const user = row.original;
      const label = getKycLabel(user);
      return label === value;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original;
      return (
        <Link href={`/dashboard/kyc/${user.id}`}>
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            Review <ExternalLink className="h-4 w-4" />
          </Button>
        </Link>
      );
    },
  },
]
