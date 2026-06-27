import { notFound } from 'next/navigation';
import { getEvent } from '@/actions/events';
import EventForm from '../../EventForm';

export const revalidate = 0;

interface EditEventPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditEventPage({ params }: EditEventPageProps) {
  const { id } = await params;
  const event = await getEvent(id);

  if (!event) return notFound();

  return <EventForm mode="edit" event={event} />;
}
