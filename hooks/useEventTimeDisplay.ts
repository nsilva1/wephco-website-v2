import { useEffect, useState } from 'react';
import { EventTiming, getEventTimeDisplay } from '@/lib/eventTime';

/**
 * Date and time to show for an event, including the viewer's local time.
 *
 * The viewer's timezone is only known in the browser, so it is read after
 * mount: the first render matches the server (venue time only) and the local
 * time appears straight after.
 */
export const useEventTimeDisplay = (event: EventTiming) => {
  const [viewerTimeZone, setViewerTimeZone] = useState<string | null>(null);

  useEffect(() => {
    try {
      setViewerTimeZone(Intl.DateTimeFormat().resolvedOptions().timeZone || null);
    } catch {
      setViewerTimeZone(null);
    }
  }, []);

  return getEventTimeDisplay(event, viewerTimeZone);
};
