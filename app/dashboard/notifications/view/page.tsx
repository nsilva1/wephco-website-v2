import React from 'react';
import { getGlobalActivities } from '@/actions/activities';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import {
  Database,
  User,
  DollarSign,
  MessageSquare,
  Home,
  Users,
  Bell,
  HelpCircle,
  FileText,
  Clock,
  ArrowRight,
  Briefcase,
  Share2,
  Calendar,
  ShieldCheck,
  TrendingUp,
  ArrowDownToLine,
} from 'lucide-react';
import Link from 'next/link';
import { FIRESTORE_COLLECTIONS } from '@/lib/constants';

export const revalidate = 0;

// Base icons mapping for known collection types
const BASE_ICONS: Record<string, { icon: React.ReactNode }> = {
  properties: { icon: <Home className="h-4 w-4 text-purple-500" /> },
  property: { icon: <Home className="h-4 w-4 text-purple-500" /> },
  consultations: { icon: <FileText className="h-4 w-4 text-cyan-500" /> },
  consultation: { icon: <FileText className="h-4 w-4 text-cyan-500" /> },
  users: { icon: <User className="h-4 w-4 text-orange-500" /> },
  user: { icon: <User className="h-4 w-4 text-orange-500" /> },
  leads: { icon: <Users className="h-4 w-4 text-blue-500" /> },
  lead: { icon: <Users className="h-4 w-4 text-blue-500" /> },
  commissions: { icon: <DollarSign className="h-4 w-4 text-green-500" /> },
  commission: { icon: <DollarSign className="h-4 w-4 text-green-500" /> },
  withdrawals: { icon: <ArrowDownToLine className="h-4 w-4 text-red-500" /> },
  withdrawal: { icon: <ArrowDownToLine className="h-4 w-4 text-red-500" /> },
  notifications: { icon: <Bell className="h-4 w-4 text-[#cfb53b]" /> },
  notification: { icon: <Bell className="h-4 w-4 text-[#cfb53b]" /> },
  analytics: { icon: <TrendingUp className="h-4 w-4 text-indigo-500" /> },
  kyc: { icon: <ShieldCheck className="h-4 w-4 text-emerald-500" /> },
  inquiry: { icon: <HelpCircle className="h-4 w-4 text-slate-500" /> },
  enquiry: { icon: <HelpCircle className="h-4 w-4 text-slate-500" /> },
  job_applications: { icon: <Briefcase className="h-4 w-4 text-violet-500" /> },
  job_application: { icon: <Briefcase className="h-4 w-4 text-violet-500" /> },
  affiliates: { icon: <Share2 className="h-4 w-4 text-pink-500" /> },
  affiliate: { icon: <Share2 className="h-4 w-4 text-pink-500" /> },
  events: { icon: <Calendar className="h-4 w-4 text-amber-500" /> },
  event: { icon: <Calendar className="h-4 w-4 text-amber-500" /> },
  transaction: { icon: <DollarSign className="h-4 w-4 text-green-500" /> },
  contact: { icon: <MessageSquare className="h-4 w-4 text-slate-500" /> },
  support: { icon: <HelpCircle className="h-4 w-4 text-red-500" /> },
};

// Dynamically construct ACTIVITY_ICONS to cover all values in FIRESTORE_COLLECTIONS
const ACTIVITY_ICONS: Record<string, React.ReactNode> = {
  ...Object.fromEntries(
    Object.entries(BASE_ICONS).map(([key, value]) => [key, value.icon])
  ),
};

const fallbackIcon = <Database className="h-4 w-4 text-slate-500" />;

Object.values(FIRESTORE_COLLECTIONS).forEach((collectionVal) => {
  if (!ACTIVITY_ICONS[collectionVal]) {
    // Generate singular version of the name if plural
    let singular = collectionVal;
    if (collectionVal.endsWith('ies')) {
      singular = collectionVal.slice(0, -3) + 'y';
    } else if (collectionVal.endsWith('s')) {
      singular = collectionVal.slice(0, -1);
    }

    ACTIVITY_ICONS[collectionVal] =
      BASE_ICONS[collectionVal]?.icon ||
      BASE_ICONS[singular]?.icon ||
      fallbackIcon;

    if (!ACTIVITY_ICONS[singular]) {
      ACTIVITY_ICONS[singular] = ACTIVITY_ICONS[collectionVal];
    }
  }
});

const STATUS_COLORS: Record<string, string> = {
  pending: 'bg-orange-100 text-orange-700',
  completed: 'bg-green-100 text-green-700',
  failed: 'bg-red-100 text-red-700',
  active: 'bg-blue-100 text-blue-700',
  new: 'bg-blue-100 text-blue-700',
  won: 'bg-green-100 text-green-700',
  lost: 'bg-slate-100 text-slate-700',
};

export default async function ActivityLogPage() {
  const activities = await getGlobalActivities(100);

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-800">
            Database Activity Logs
          </h2>
          <p className="text-slate-600 mt-1">
            Real-time overview of all operations across Firestore collections
          </p>
        </div>
      </div>

      <Card className="bg-white shadow-sm border-gray-100">
        <CardHeader className="pb-3 border-b border-gray-50">
          <CardTitle className="text-lg font-bold flex items-center gap-2 text-slate-800">
            <Clock className="h-5 w-5 text-[#cfb53b]" />
            Recent Updates
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {activities.length > 0 ? (
            <div className="divide-y divide-gray-100">
              {activities.map((activity) => (
                <div
                  key={activity.id}
                  className="p-4 hover:bg-gray-50/50 transition-colors flex items-start gap-4">
                  <div className="mt-1 p-2 bg-white rounded-lg border border-gray-100 shadow-sm">
                    {ACTIVITY_ICONS[activity.type] || (
                      <Database className="h-4 w-4" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-800 text-sm">
                          {activity.title}
                        </span>
                        <Badge
                          variant="secondary"
                          className="text-[10px] uppercase font-bold px-1.5 py-0 h-4">
                          {activity.type}
                        </Badge>
                        {activity.status && (
                          <span
                            className={`text-[10px] uppercase font-bold px-1.5 py-0.5 rounded-full ${STATUS_COLORS[activity.status.toLowerCase()] || 'bg-gray-100 text-gray-600'}`}>
                            {activity.status}
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-slate-500 whitespace-nowrap">
                        {activity.timestamp
                          ? format(new Date(activity.timestamp), 'PP p')
                          : 'Recent'}
                      </span>
                    </div>

                    <p className="text-sm text-slate-700 line-clamp-2">
                      {activity.description}
                    </p>

                    {activity.link && (
                      <Link
                        href={activity.link}
                        className="inline-flex items-center gap-1 text-[12px] font-semibold text-[#cfb53b] hover:underline mt-2">
                        View Details <ArrowRight className="h-3 w-3" />
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <Database className="h-12 w-12 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-700 font-medium">
                No activity records found
              </p>
              <p className="text-sm text-slate-500 mt-1">
                Updates will appear here as the database is modified
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
