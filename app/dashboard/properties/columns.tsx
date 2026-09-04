'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ColumnDef } from '@tanstack/react-table';
import { IProperty } from '@/interfaces/propertyInterface';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowUpDown, ExternalLink, Star } from 'lucide-react';
import Link from 'next/link';
import { formatCurrency } from '@/lib/utils';
import Image from 'next/image';
import { updatePropertyFeatured } from '@/actions/property-management';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { toast } from 'react-toastify';

function FeaturedCell({ property }: { property: IProperty }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const isFeatured = !!property.featured;

  const handleConfirm = async () => {
    setLoading(true);
    try {
      const res = await updatePropertyFeatured(property.id!, !isFeatured);
      if (res.success) {
        toast.success(
          !isFeatured
            ? `"${property.title}" has been set as featured!`
            : `"${property.title}" has been removed from featured.`
        );
        setOpen(false);
        router.refresh();
      } else {
        toast.error(res.error || 'Failed to update featured status.');
      }
    } catch (err: any) {
      toast.error(err.message || 'An error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        variant={isFeatured ? 'default' : 'outline'}
        size="sm"
        onClick={() => setOpen(true)}
        className={`flex items-center gap-1.5 cursor-pointer text-xs ${
          isFeatured
            ? 'bg-[#cfb53b] hover:bg-[#b89e2f] text-white font-bold'
            : 'border-slate-300 text-slate-700 hover:bg-slate-100'
        }`}
      >
        <Star className={`w-3.5 h-3.5 ${isFeatured ? 'fill-white text-white' : 'text-slate-500'}`} />
        <span>{isFeatured ? 'Featured' : 'Feature'}</span>
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {isFeatured ? 'Remove from Featured Properties?' : 'Set as Featured Property?'}
            </DialogTitle>
            <DialogDescription>
              {isFeatured
                ? `Are you sure you want to remove "${property.title}" from the homepage featured section?`
                : `Are you sure you want to set "${property.title}" as a featured property? This property will appear in the Featured Properties section on the homepage. (Maximum 3 properties allowed).`}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-0 mt-4">
            <Button variant="outline" onClick={() => setOpen(false)} disabled={loading}>
              Cancel
            </Button>
            <Button
              className="bg-[#cfb53b] hover:bg-[#b89e2f] text-white font-bold"
              onClick={handleConfirm}
              disabled={loading}
            >
              {loading
                ? 'Updating...'
                : isFeatured
                ? 'Confirm Remove'
                : 'Confirm Set as Featured'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export const columns: ColumnDef<IProperty>[] = [
  {
    id: 'image',
    header: '',
    cell: ({ row }) => {
      const images = row.original.images;
      const image = images && images.length > 0 ? images[0] : null;
      return image ? (
        <div className="w-16 h-12 rounded overflow-hidden relative bg-muted">
          <Image
            src={image}
            alt={row.original.title}
            fill
            className="object-cover"
            sizes="64px"
          />
        </div>
      ) : (
        <div className="w-16 h-12 rounded bg-muted flex items-center justify-center text-xs text-muted-foreground">
          No img
        </div>
      );
    },
  },
  {
    accessorKey: 'title',
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        Title
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="font-semibold max-w-50 truncate">
        {row.getValue('title')}
      </div>
    ),
  },
  {
    accessorKey: 'location',
    header: 'Location',
  },
  {
    accessorKey: 'featured',
    header: 'Featured',
    cell: ({ row }) => <FeaturedCell property={row.original} />,
  },
  {
    accessorKey: 'verified',
    header: 'Verified',
    cell: ({ row }) => {
      const verified = row.getValue('verified') as boolean;
      return (
        <Badge
          variant="secondary"
          className={
            verified
              ? 'bg-green-500 hover:bg-green-600 text-white'
              : 'bg-red-500 hover:bg-red-600 text-white'
          }>
          {verified ? 'verified' : 'not verified'}
        </Badge>
      );
    },
    filterFn: (row, id, value) => {
      if (!value || value === 'all') return true;
      return row.getValue(id) === value;
    },
  },
  {
    accessorKey: 'price',
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        Price
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      return (
        <div className="font-bold text-[#cfb53b]">
          {formatCurrency(row.original.price, row.original.currency)}
        </div>
      );
    },
  },
  {
    accessorKey: 'tag',
    header: 'Tag',
    cell: ({ row }) => {
      const tag = row.getValue('tag') as string;
      return (
        <Badge
          variant="secondary"
          className={
            tag === 'verified'
              ? 'bg-green-500 hover:bg-green-600 text-white'
              : 'bg-amber-500 hover:bg-amber-600 text-white'
          }>
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
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.getValue('status') as string;
      const styles: Record<string, string> = {
        available: 'bg-green-500 hover:bg-green-600 text-white',
        'under offer': 'bg-blue-500 hover:bg-blue-600 text-white',
        sold: 'bg-slate-600 hover:bg-slate-700 text-white',
      };
      return (
        <Badge
          variant="secondary"
          className={`capitalize ${styles[status] || ''}`}>
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
    id: 'actions',
    cell: ({ row }) => {
      return (
        <Link href={`/dashboard/properties/${row.original.id}`}>
          <Button
            variant="default"
            size="sm"
            className="flex items-center gap-2 cursor-pointer">
            Manage <ExternalLink className="h-4 w-4" />
          </Button>
        </Link>
      );
    },
  },
];
