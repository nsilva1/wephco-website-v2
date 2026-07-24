import { notFound } from 'next/navigation';
import { getLeadById } from '@/actions/leads';
import { format } from 'date-fns';
import {
  ArrowLeft,
  User as UserIcon,
  Building2,
  DollarSign,
  Phone,
  Mail,
  FileText,
} from 'lucide-react';
import Link from 'next/link';
import { formatCurrency } from '@/lib/utils';

export const revalidate = 0;

export default async function LeadDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const lead = await getLeadById(id);

  if (!lead) return notFound();

  const statusStyles: Record<string, string> = {
    new: 'bg-blue-500 hover:bg-blue-600 text-white',
    contacted: 'bg-amber-500 hover:bg-amber-600 text-white',
    qualified: 'bg-purple-500 hover:bg-purple-600 text-white',
    negotiation: 'bg-orange-500 hover:bg-orange-600 text-white',
    won: 'bg-green-500 hover:bg-green-600 text-white',
    lost: 'bg-slate-500 hover:bg-slate-600 text-white',
  };

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/leads">
          <button className="flex items-center justify-center h-10 w-10 rounded-md bg-transparent hover:bg-slate-100 hover:text-slate-900 transition-colors">
            <ArrowLeft className="h-4 w-4" />
          </button>
        </Link>
        <h2 className="text-3xl font-bold tracking-tight">Lead Details</h2>
        <span
          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors capitalize ${statusStyles[lead.status?.toLowerCase()] || 'bg-gray-400 text-white'}`}>
          {lead.status || 'New'}
        </span>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Lead Info */}
        <div className="rounded-xl border bg-white text-card-foreground shadow-sm">
          <div className="flex flex-col space-y-1.5 p-6">
            <h3 className="font-semibold leading-none tracking-tight flex items-center gap-2 text-muted-foreground">
              <UserIcon className="h-5 w-5 text-muted-foreground" />
              Lead Information
            </h3>
          </div>
          <div className="p-6 pt-0 space-y-3">
            <div className="flex justify-between border-b pb-2">
              <span className="text-muted-foreground">Name</span>
              <span className="font-semibold text-primary">{lead.name}</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="text-muted-foreground flex items-center gap-1">
                <Mail className="h-4 w-4" /> Email
              </span>
              <span className="font-medium text-primary">{lead.email}</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="text-muted-foreground flex items-center gap-1">
                <Phone className="h-4 w-4" /> Phone
              </span>
              <span className="font-medium text-primary">{lead.phone}</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="text-muted-foreground flex items-center gap-1">
                <DollarSign className="h-4 w-4" /> Budget
              </span>
              <span className="font-bold text-[#cfb53b]">
                {formatCurrency(lead.budget, lead.currency)}
              </span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="text-muted-foreground">Source</span>
              <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold bg-slate-900 text-white capitalize">
                {lead.source || 'N/A'}
              </span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="text-muted-foreground">Created</span>
              <span className="text-sm text-primary">
                {lead.createdAt
                  ? format(new Date(lead.createdAt), 'PPpp')
                  : 'N/A'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Last Updated</span>
              <span className="text-sm text-primary">
                {lead.updatedAt
                  ? format(new Date(lead.updatedAt), 'PPpp')
                  : 'N/A'}
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Agent */}
          <div className="rounded-xl border bg-white text-card-foreground shadow-sm">
            <div className="flex flex-col space-y-1.5 p-6">
              <h3 className="font-semibold leading-none tracking-tight flex items-center gap-2 text-muted-foreground">
                <UserIcon className="h-5 w-5 text-muted-foreground" />
                Assigned Agent
              </h3>
            </div>
            <div className="p-6 pt-0 space-y-3">
              {lead.agent ? (
                <>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-muted-foreground">Name</span>
                    <span className="font-medium text-primary">
                      {lead.agent.name}
                    </span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-muted-foreground">Email</span>
                    <span className="font-medium text-primary">
                      {lead.agent.email}
                    </span>
                  </div>
                  <Link href={`/dashboard/users/${lead.agent.id}`}>
                    <button className="w-full mt-2 border border-slate-200 bg-white hover:bg-slate-100 h-9 rounded-md px-3 text-xs inline-flex items-center justify-center font-medium transition-colors">
                      View Agent Profile
                    </button>
                  </Link>
                </>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Agent information not available.
                </p>
              )}
            </div>
          </div>

          {/* Property */}
          <div className="rounded-xl border bg-white text-card-foreground shadow-sm">
            <div className="flex flex-col space-y-1.5 p-6">
              <h3 className="font-semibold leading-none tracking-tight flex items-center gap-2 text-muted-foreground">
                <Building2 className="h-5 w-5 text-muted-foreground" />
                Associated Property
              </h3>
            </div>
            <div className="p-6 pt-0 space-y-3">
              {lead.property ? (
                <>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-muted-foreground">Title</span>
                    <span className="font-medium text-primary">
                      {lead.property.title}
                    </span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-muted-foreground">Location</span>
                    <span className="font-medium text-primary">
                      {lead.property.location}
                    </span>
                  </div>
                  <Link href={`/dashboard/properties/${lead.property.id}`}>
                    <button className="w-full mt-2 border border-slate-200 bg-white hover:bg-slate-100 h-9 rounded-md px-3 text-xs inline-flex items-center justify-center font-medium transition-colors">
                      View Property
                    </button>
                  </Link>
                </>
              ) : (
                <p className="text-sm text-muted-foreground">
                  No property associated.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Notes */}
      {lead.notes && (
        <div className="rounded-xl border bg-white text-card-foreground shadow-sm">
          <div className="flex flex-col space-y-1.5 p-6">
            <h3 className="font-semibold leading-none tracking-tight flex items-center gap-2 text-muted-foreground">
              <FileText className="h-5 w-5 text-muted-foreground" />
              Notes
            </h3>
          </div>
          <div className="p-6 pt-0">
            <div className="p-4 rounded-md text-sm whitespace-pre-wrap text-slate-800">
              {lead.notes}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
