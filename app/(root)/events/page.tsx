import React from 'react';
import { getEvents } from '@/actions/events';
import EventsClient from './EventsClient';

export const revalidate = 0;

export default async function EventsPage() {
  const events = await getEvents();

  return <EventsClient events={events} />;
}
