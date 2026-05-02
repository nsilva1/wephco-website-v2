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
  ArrowRight
} from 'lucide-react';
import Link from 'next/link';

export const revalidate = 0;

const ACTIVITY_ICONS: Record<string, any> = {
  lead: <Users className="h-4 w-4 text-blue-500" />,
  transaction: <DollarSign className="h-4 w-4 text-green-500" />,
  property: <Home className="h-4 w-4 text-purple-500" />,
  user: <User className="h-4 w-4 text-orange-500" />,
  notification: <Bell className="h-4 w-4 text-[#cfb53b]" />,
  consultation: <FileText className="h-4 w-4 text-cyan-500" />,
  contact: <MessageSquare className="h-4 w-4 text-slate-500" />,
  support: <HelpCircle className="h-4 w-4 text-red-500" />,
  enquiry: <Database className="h-4 w-4 text-indigo-500" />,
};

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
          <h2 className="text-3xl font-bold tracking-tight">Database Activity Logs</h2>
          <p className="text-muted-foreground mt-1">Real-time overview of all operations across Firestore collections</p>
        </div>
      </div>

      <Card className="shadow-sm border-gray-100">
        <CardHeader className="pb-3 border-b border-gray-50">
          <CardTitle className="text-lg font-bold flex items-center gap-2">
            <Clock className="h-5 w-5 text-[#cfb53b]" />
            Recent Updates
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {activities.length > 0 ? (
            <div className="divide-y divide-gray-100">
              {activities.map((activity) => (
                <div key={activity.id} className="p-4 hover:bg-gray-50/50 transition-colors flex items-start gap-4">
                  <div className="mt-1 p-2 bg-white rounded-lg border border-gray-100 shadow-sm">
                    {ACTIVITY_ICONS[activity.type] || <Database className="h-4 w-4" />}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-800 text-sm">{activity.title}</span>
                        <Badge variant="outline" className="text-[10px] uppercase font-bold px-1.5 py-0 h-4">
                          {activity.type}
                        </Badge>
                        {activity.status && (
                          <span className={`text-[10px] uppercase font-bold px-1.5 py-0.5 rounded-full ${STATUS_COLORS[activity.status.toLowerCase()] || 'bg-gray-100 text-gray-600'}`}>
                            {activity.status}
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-gray-400 whitespace-nowrap">
                        {activity.timestamp ? format(new Date(activity.timestamp), 'PP p') : 'Recent'}
                      </span>
                    </div>
                    
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {activity.description}
                    </p>
                    
                    {activity.link && (
                      <Link 
                        href={activity.link} 
                        className="inline-flex items-center gap-1 text-[12px] font-semibold text-[#cfb53b] hover:underline mt-2"
                      >
                        View Details <ArrowRight className="h-3 w-3" />
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <Database className="h-12 w-12 text-gray-200 mx-auto mb-4" />
              <p className="text-gray-500 font-medium">No activity records found</p>
              <p className="text-sm text-gray-400 mt-1">Updates will appear here as the database is modified</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
