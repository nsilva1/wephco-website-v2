import { getEvents } from '@/actions/events';
import EventsListClient from './EventsListClient';

export const revalidate = 0;

export default async function DashboardEventsPage() {
  const events = await getEvents();

  return <EventsListClient initialEvents={events} />;
}
