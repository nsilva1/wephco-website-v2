import {
  getAgentsForNotifications,
  getNotificationHistory,
} from '@/actions/notifications';
import ComposeNotification from './ComposeNotification';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { History, Send, Users, UserCheck } from 'lucide-react';

export const revalidate = 0;

export default async function NotificationsPage() {
  const [agents, history] = await Promise.all([
    getAgentsForNotifications(),
    getNotificationHistory(),
  ]);

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Notifications</h2>
        <p className="text-muted-foreground mt-1">
          Send push notifications to agents via FCM
        </p>
      </div>

      {/* Compose Section */}
      <ComposeNotification agents={agents} />

      {/* History Section */}
      <Card className="bg-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-slate-800 font-bold">
            <History className="h-5 w-5 text-slate-500" />
            Notification History
          </CardTitle>
        </CardHeader>
        <CardContent>
          {history.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-slate-50 [&_th]:text-slate-700 [&_th]:font-semibold">
                    <th className="p-3 text-left">Date</th>
                    <th className="p-3 text-left">Title</th>
                    <th className="p-3 text-left">Message</th>
                    <th className="p-3 text-left">Target</th>
                    <th className="p-3 text-left">Delivered</th>
                    <th className="p-3 text-left">Failed</th>
                  </tr>
                </thead>
                <tbody>
                  {history.map((entry) => (
                    <tr key={entry.id} className="border-b hover:bg-muted/30">
                      <td className="p-3 whitespace-nowrap text-muted-foreground">
                        {entry.sentAt
                          ? format(new Date(entry.sentAt), 'PP p')
                          : 'N/A'}
                      </td>
                      <td className="p-3 font-medium max-w-[180px] truncate">
                        {entry.title}
                      </td>
                      <td className="p-3 text-muted-foreground max-w-[250px] truncate">
                        {entry.body}
                      </td>
                      <td className="p-3">
                        <Badge variant="outline" className="capitalize">
                          {entry.targetType === 'all' ? (
                            <span className="flex items-center gap-1">
                              <Users className="h-3 w-3" /> All Agents
                            </span>
                          ) : (
                            <span className="flex items-center gap-1">
                              <UserCheck className="h-3 w-3" />{' '}
                              {entry.targetUserIds.length} selected
                            </span>
                          )}
                        </Badge>
                      </td>
                      <td className="p-3">
                        <Badge className="bg-green-500 hover:bg-green-600 text-white">
                          {entry.successCount}
                        </Badge>
                      </td>
                      <td className="p-3">
                        {entry.failureCount > 0 ? (
                          <Badge variant="destructive">
                            {entry.failureCount}
                          </Badge>
                        ) : (
                          <span className="text-muted-foreground">0</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              No notifications have been sent yet.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
