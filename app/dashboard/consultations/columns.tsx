import React, { useState } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { IConsultation } from '@/interfaces/userInterface';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import {
  MoreHorizontal,
  Mail,
  Phone,
  Copy,
  Calendar,
  MapPin,
  Building,
  Info,
  MessageSquare,
  ArrowUpDown,
  NotebookPen,
} from 'lucide-react';
import { toast } from 'react-toastify';
import { updateConsultation } from '@/actions/consultation';

export const columns: ColumnDef<IConsultation>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        className="p-0 hover:bg-transparent text-slate-700 font-semibold">
        Contact Name
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="font-bold text-slate-800 whitespace-nowrap">
        {row.getValue('name')}
      </div>
    ),
  },
  {
    accessorKey: 'service',
    header: 'Service',
    cell: ({ row }) => (
      <Badge
        variant="secondary"
        className="bg-[#cfb53b]/10 text-[#cfb53b] hover:bg-[#cfb53b]/20 whitespace-nowrap">
        {row.getValue('service')}
      </Badge>
    ),
  },
  {
    accessorKey: 'meetingDate',
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        className="p-0 hover:bg-transparent text-slate-700 font-semibold">
        Meeting Date
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const date = row.getValue('meetingDate') as string;
      return (
        <div className="flex items-center gap-1.5 whitespace-nowrap text-slate-800">
          <Calendar className="h-4 w-4 text-slate-400" />
          <span>{date ? new Date(date).toDateString() : 'N/A'}</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'preferredModeOfContact',
    header: 'Preferred Contact',
    cell: ({ row }) => (
      <Badge
        variant="default"
        className="capitalize flex items-center gap-1 w-fit whitespace-nowrap">
        <MessageSquare className="h-3 w-3 text-slate-500" />
        {row.getValue('preferredModeOfContact')}
      </Badge>
    ),
  },
  {
    accessorKey: 'phoneNumber',
    header: 'Phone',
    cell: ({ row }) => (
      <div className="flex items-center gap-1.5 whitespace-nowrap text-slate-800">
        <Phone className="h-4 w-4 text-slate-400" />
        <span>{row.getValue('phoneNumber')}</span>
      </div>
    ),
  },
  {
    accessorKey: 'email',
    header: 'Email',
    cell: ({ row }) => (
      <div className="flex items-center gap-1.5 whitespace-nowrap text-slate-800">
        <Mail className="h-4 w-4 text-slate-400" />
        <span className="font-medium text-[#cfb53b]">
          {row.getValue('email')}
        </span>
      </div>
    ),
  },
  {
    accessorKey: 'organizationName',
    header: 'Organisation',
    cell: ({ row }) => {
      const org = row.getValue('organizationName') as string;
      return org ? (
        <div className="flex items-center gap-1.5 whitespace-nowrap text-slate-700">
          <Building className="h-4 w-4 text-slate-400" />
          <span>{org}</span>
        </div>
      ) : (
        <span className="text-slate-400 italic">None</span>
      );
    },
  },
  {
    accessorKey: 'meetingLocation',
    header: 'Location',
    cell: ({ row }) => {
      const loc = row.getValue('meetingLocation') as string;
      return loc ? (
        <div className="flex items-center gap-1.5 text-slate-700 max-w-[200px] truncate">
          <MapPin className="h-4 w-4 text-slate-400 shrink-0" />
          <span className="truncate" title={loc}>
            {loc}
          </span>
        </div>
      ) : (
        <span className="text-slate-400 italic">None</span>
      );
    },
  },
  {
    accessorKey: 'details',
    header: 'Details',
    cell: ({ row }) => {
      const details = row.getValue('details') as string;
      return details ? (
        <div className="flex items-center gap-1.5 text-slate-600 max-w-[250px] truncate">
          <Info className="h-4 w-4 text-slate-400 shrink-0" />
          <span className="truncate" title={details}>
            {details}
          </span>
        </div>
      ) : (
        <span className="text-slate-400 italic">No details</span>
      );
    },
  },
  {
    accessorKey: 'notes',
    header: 'Admin Notes',
    cell: ({ row }) => {
      const notes = row.getValue('notes') as string[];
      if (!notes || notes.length === 0) {
        return <span className="text-slate-450 italic text-xs">No notes</span>;
      }
      const latestNote = notes[notes.length - 1];
      return (
        <div className="flex items-center gap-2 max-w-[250px] truncate">
          <Badge
            variant="outline"
            className="px-1.5 py-0 h-5 shrink-0 bg-slate-50 font-bold text-slate-600 border-slate-200">
            {notes.length}
          </Badge>
          <span
            className="truncate font-medium text-slate-800"
            title={notes.join('\n\n')}>
            {latestNote}
          </span>
        </div>
      );
    },
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => {
      const consultation = row.original;
      const [isDialogOpen, setIsDialogOpen] = useState(false);
      const [newNote, setNewNote] = useState('');
      const [isSaving, setIsSaving] = useState(false);

      const handleCopyEmail = () => {
        navigator.clipboard.writeText(consultation.email);
        toast.success('Email copied to clipboard!');
      };

      const handleCopyPhone = () => {
        navigator.clipboard.writeText(consultation.phoneNumber);
        toast.success('Phone number copied to clipboard!');
      };

      const handleSaveNotes = async () => {
        if (!consultation.id) return;
        if (!newNote.trim()) {
          toast.warning('Please enter a note to save.');
          return;
        }

        setIsSaving(true);
        try {
          const currentNotes = consultation.notes || [];
          const updatedNotes = [...currentNotes, newNote.trim()];
          await updateConsultation(consultation.id, { notes: updatedNotes });
          toast.success('Note added successfully!');
          setNewNote('');
          setIsDialogOpen(false);
          window.location.reload();
        } catch (error) {
          toast.error('Failed to add note');
        } finally {
          setIsSaving(false);
        }
      };

      return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="h-8 w-8 p-0 hover:bg-slate-100">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4 text-slate-700" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="bg-white border border-slate-100 shadow-md">
              <DropdownMenuLabel className="text-slate-700">
                Actions
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-slate-100" />
              <DropdownMenuItem
                onClick={handleCopyEmail}
                className="cursor-pointer hover:bg-slate-50 text-slate-700">
                <Copy className="mr-2 h-4 w-4 text-slate-500" /> Copy Email
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={handleCopyPhone}
                className="cursor-pointer hover:bg-slate-50 text-slate-700">
                <Copy className="mr-2 h-4 w-4 text-slate-500" /> Copy Phone
                Number
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-slate-100" />

              <DialogTrigger asChild>
                <DropdownMenuItem className="cursor-pointer hover:bg-slate-50 text-slate-700">
                  <NotebookPen className="mr-2 h-4 w-4 text-slate-500" />{' '}
                  Add/View Notes
                </DropdownMenuItem>
              </DialogTrigger>

              <DropdownMenuSeparator className="bg-slate-100" />
              <DropdownMenuItem
                asChild
                className="hover:bg-slate-50 text-slate-700">
                <a
                  href={`mailto:${consultation.email}`}
                  className="cursor-pointer flex items-center w-full">
                  <Mail className="mr-2 h-4 w-4 text-slate-500" /> Send Email
                </a>
              </DropdownMenuItem>
              {consultation.phoneNumber && (
                <DropdownMenuItem
                  asChild
                  className="hover:bg-slate-50 text-slate-700">
                  <a
                    href={`tel:${consultation.phoneNumber}`}
                    className="cursor-pointer flex items-center w-full">
                    <Phone className="mr-2 h-4 w-4 text-slate-500" /> Call
                    Client
                  </a>
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          <DialogContent className="bg-white max-w-md border border-slate-100">
            <DialogHeader>
              <DialogTitle className="text-slate-800 font-bold">
                Consultation Notes
              </DialogTitle>
              <DialogDescription>
                View previous notes or add a new one for {consultation.name}.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4 space-y-4">
              {/* Previous Notes List */}
              {consultation.notes && consultation.notes.length > 0 && (
                <div className="space-y-2 max-h-48 overflow-y-auto border border-slate-100 rounded-md p-3 bg-slate-50">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Notes History
                  </span>
                  <div className="divide-y divide-slate-100">
                    {consultation.notes.map((note, idx) => (
                      <p
                        key={idx}
                        className="py-2 text-xs text-slate-700 leading-relaxed wrap-break-word">
                        • {note}
                      </p>
                    ))}
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-700">
                  Add New Note
                </label>
                <Textarea
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  placeholder="e.g. Sent brochure, follow up in 2 days."
                  rows={4}
                  className="w-full text-slate-800 border-slate-200 focus:border-[#cfb53b] focus:ring-[#cfb53b]"
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
                disabled={isSaving}>
                Cancel
              </Button>
              <Button
                onClick={handleSaveNotes}
                disabled={isSaving || !newNote.trim()}
                className="bg-[#cfb53b] hover:bg-[#b89e2f] text-white">
                {isSaving ? 'Saving...' : 'Add Note'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      );
    },
  },
];
