'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { EventItem } from '@/app/(root)/events/_components/EventCard';
import { deleteEvent } from '@/actions/events';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Calendar,
  Clock,
  MapPin,
  Plus,
  Edit2,
  Trash2,
  Search,
  Users,
} from 'lucide-react';
import { toast } from 'sonner';

interface EventsListClientProps {
  initialEvents: EventItem[];
}

export default function EventsListClient({
  initialEvents,
}: EventsListClientProps) {
  const router = useRouter();
  const [events, setEvents] = useState<EventItem[]>(initialEvents);
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');
  const [searchQuery, setSearchQuery] = useState('');
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    if (
      !confirm(
        'Are you sure you want to delete this event? This action cannot be undone.'
      )
    ) {
      return;
    }

    setIsDeleting(id);
    const toastId = toast.loading('Deleting event...');
    try {
      await deleteEvent(id);
      setEvents((prev) => prev.filter((e) => e.id !== id));
      toast.success('Event deleted successfully', { id: toastId });
      router.refresh();
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || 'Failed to delete event', { id: toastId });
    } finally {
      setIsDeleting(null);
    }
  };

  // Filter logic
  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase());

    // An event is past if isPast is true, or hasPassed logic (optional fallback)
    const isEventPast = event.isPast === true;

    if (activeTab === 'upcoming') {
      return matchesSearch && !isEventPast;
    } else {
      return matchesSearch && isEventPast;
    }
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h2 className="text-3xl font-bold tracking-tight">Events</h2>
          <p className="text-sm text-muted-foreground">
            Manage your local and international events, workshops, and seminars.
          </p>
        </div>
        <Link href="/dashboard/events/new">
          <Button className="bg-[#cfb53b] hover:bg-[#b89e2f] text-white">
            <Plus className="mr-2 h-4 w-4" />
            Add Event
          </Button>
        </Link>
      </div>

      {/* Tabs and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between border-b pb-4">
        <div className="flex bg-slate-100 p-1 rounded-lg self-start">
          <button
            onClick={() => setActiveTab('upcoming')}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
              activeTab === 'upcoming'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-500 hover:text-slate-900'
            }`}>
            Upcoming Events
          </button>
          <button
            onClick={() => setActiveTab('past')}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
              activeTab === 'past'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-500 hover:text-slate-900'
            }`}>
            Past Events
          </button>
        </div>

        <div className="relative w-full sm:w-80">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search events..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Events Grid */}
      {filteredEvents.length === 0 ? (
        <Card className="p-8 text-center border-dashed">
          <p className="text-muted-foreground">
            No events found matching your criteria.
          </p>
        </Card>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredEvents.map((event) => (
            <Card
              key={event.id}
              className="overflow-hidden flex flex-col h-full hover:shadow-md transition-shadow bg-white">
              {/* Cover Image */}
              <div className="relative aspect-video w-full">
                <Image
                  src={event.image || '/images/placeholder.jpg'}
                  alt={event.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 300px"
                />
                <div className="absolute top-2 left-2 flex gap-1">
                  <Badge
                    variant="secondary"
                    className="bg-slate-900/80 text-white border-0">
                    {event.scope}
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="bg-[#cfb53b]/90 text-white border-0">
                    {event.format}
                  </Badge>
                </div>
              </div>

              {/* Card Body */}
              <CardContent className="p-5 flex-1 flex flex-col justify-between">
                <div className="space-y-3">
                  <h3 className="font-bold text-lg text-slate-900 line-clamp-1">
                    {event.title}
                  </h3>
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {event.description}
                  </p>

                  <div className="space-y-1.5 text-xs text-slate-700 pt-2 border-t">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-3.5 w-3.5 text-[#cfb53b]" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-3.5 w-3.5 text-[#cfb53b]" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-3.5 w-3.5 text-[#cfb53b]" />
                      <span className="line-clamp-1">{event.location}</span>
                    </div>
                    {event.seatsRemaining !== undefined &&
                      event.seatsRemaining !== null && (
                        <div className="flex items-center gap-2">
                          <Users className="h-3.5 w-3.5 text-[#cfb53b]" />
                          <span>{event.seatsRemaining} seats left</span>
                        </div>
                      )}
                  </div>
                </div>

                {/* Card Actions */}
                <div className="flex gap-2 mt-5 pt-3 border-t">
                  <Link
                    href={`/dashboard/events/${event.id}/edit`}
                    className="flex-1">
                    <Button
                      variant="default"
                      size="sm"
                      className="w-full text-black hover:text-black/80 cursor-pointer">
                      <Edit2 className="h-3.5 w-3.5 mr-1.5" />
                      Edit Details
                    </Button>
                  </Link>

                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-destructive hover:bg-destructive/10"
                    onClick={() => event.id && handleDelete(event.id)}
                    disabled={isDeleting === event.id}>
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
