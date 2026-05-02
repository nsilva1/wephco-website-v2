'use client';

import React, { useState, useEffect } from 'react';
import { Bell } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getGlobalActivities } from '@/actions/activities';

export const NotificationBell = () => {
  const [hasNew, setHasNew] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const checkActivities = async () => {
      try {
        const activities = await getGlobalActivities(1);
        if (activities.length > 0) {
          const latest = activities[0].timestamp;
          const lastSeen = localStorage.getItem('lastCheckedActivities');
          
          if (!lastSeen || new Date(latest).getTime() > new Date(lastSeen).getTime()) {
            setHasNew(true);
          }
        }
      } catch (error) {
        console.error('Error checking activities:', error);
      }
    };

    // Check on mount and every 30 seconds
    checkActivities();
    const interval = setInterval(checkActivities, 30000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // If user is on the activities page, mark as read
    if (pathname === '/dashboard/notifications/view') {
      localStorage.setItem('lastCheckedActivities', new Date().toISOString());
      setHasNew(false);
    }
  }, [pathname]);

  return (
    <Link href="/dashboard/notifications/view">
      <button className="p-2.5 bg-white rounded-full shadow-sm relative hover:bg-gray-200 transition-colors text-gray-600 group">
        <Bell size={18} className="group-hover:rotate-12 transition-transform" />
        {hasNew && (
          <span className="absolute top-2.5 right-2.5 h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-white animate-pulse"></span>
        )}
      </button>
    </Link>
  );
};
