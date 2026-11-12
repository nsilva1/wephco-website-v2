// Date and time handling for events.
//
// An event stores one exact start instant (`startsAt`, an ISO string in UTC)
// plus the IANA timezone of the place it is held in (`timezone`). From those
// two values the time can be shown both at the venue and for the viewer.
// Events saved before this existed only have the free-text `date` and `time`
// fields, which are shown as they are.

export interface EventTiming {
  date?: string;
  time?: string;
  startsAt?: string | null;
  timezone?: string | null;
  isPast?: boolean;
}

export const DEFAULT_EVENT_TIMEZONE = 'Africa/Lagos';

export const EVENT_TIMEZONES: { value: string; label: string }[] = [
  { value: 'Africa/Lagos', label: 'Lagos / Abuja (WAT)' },
  { value: 'Africa/Accra', label: 'Accra (GMT)' },
  { value: 'Africa/Johannesburg', label: 'Johannesburg (SAST)' },
  { value: 'Africa/Nairobi', label: 'Nairobi (EAT)' },
  { value: 'Africa/Cairo', label: 'Cairo' },
  { value: 'Europe/London', label: 'London' },
  { value: 'Europe/Paris', label: 'Paris / Berlin / Madrid' },
  { value: 'Europe/Istanbul', label: 'Istanbul' },
  { value: 'Asia/Dubai', label: 'Dubai / Abu Dhabi (GST)' },
  { value: 'Asia/Riyadh', label: 'Riyadh / Doha' },
  { value: 'Asia/Kolkata', label: 'Mumbai / Delhi (IST)' },
  { value: 'Asia/Singapore', label: 'Singapore' },
  { value: 'America/New_York', label: 'New York / Toronto (Eastern)' },
  { value: 'America/Chicago', label: 'Chicago / Houston (Central)' },
  { value: 'America/Los_Angeles', label: 'Los Angeles (Pacific)' },
  { value: 'UTC', label: 'UTC / GMT' },
];

const LOCALE = 'en-US';

const pad = (value: number) => String(value).padStart(2, '0');

const toDate = (iso?: string | null): Date | null => {
  if (!iso) return null;
  const date = new Date(iso);
  return Number.isNaN(date.getTime()) ? null : date;
};

/** The wall-clock fields of an instant in a timezone. Null for an unknown timezone. */
const zonedParts = (date: Date, timeZone: string) => {
  try {
    const parts = new Intl.DateTimeFormat('en-US', {
      timeZone,
      hourCycle: 'h23',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    }).formatToParts(date);

    const get = (type: string) => Number(parts.find((part) => part.type === type)?.value);
    return {
      year: get('year'),
      month: get('month'),
      day: get('day'),
      hour: get('hour'),
      minute: get('minute'),
      second: get('second'),
    };
  } catch {
    return null;
  }
};

/** Minutes the timezone is ahead of UTC at the given instant. */
const offsetMinutes = (date: Date, timeZone: string): number | null => {
  const parts = zonedParts(date, timeZone);
  if (!parts) return null;

  const asUtc = Date.UTC(parts.year, parts.month - 1, parts.day, parts.hour, parts.minute, parts.second);
  return Math.round((asUtc - Math.floor(date.getTime() / 1000) * 1000) / 60000);
};

/**
 * Turns a wall-clock date ("2026-07-18") and time ("18:00") in a timezone into
 * the exact instant, as an ISO string. Null when the input is not valid.
 */
export const zonedDateTimeToIso = (date: string, time: string, timeZone: string): string | null => {
  const dateMatch = /^(\d{4})-(\d{2})-(\d{2})$/.exec(date);
  const timeMatch = /^(\d{2}):(\d{2})/.exec(time);
  if (!dateMatch || !timeMatch) return null;

  const wallClock = Date.UTC(
    Number(dateMatch[1]),
    Number(dateMatch[2]) - 1,
    Number(dateMatch[3]),
    Number(timeMatch[1]),
    Number(timeMatch[2])
  );

  const firstOffset = offsetMinutes(new Date(wallClock), timeZone);
  if (firstOffset === null) return null;

  // The offset can differ on the other side of a daylight-saving change, so
  // look it up again at the instant the first guess produced.
  let instant = wallClock - firstOffset * 60000;
  const secondOffset = offsetMinutes(new Date(instant), timeZone);
  if (secondOffset !== null && secondOffset !== firstOffset) {
    instant = wallClock - secondOffset * 60000;
  }

  return new Date(instant).toISOString();
};

/** The reverse of `zonedDateTimeToIso`: values for date and time inputs. */
export const isoToZonedInputs = (
  iso: string | null | undefined,
  timeZone: string
): { date: string; time: string } | null => {
  const date = toDate(iso);
  const parts = date && zonedParts(date, timeZone);
  if (!parts) return null;

  return {
    date: `${parts.year}-${pad(parts.month)}-${pad(parts.day)}`,
    time: `${pad(parts.hour)}:${pad(parts.minute)}`,
  };
};

const format = (date: Date, options: Intl.DateTimeFormatOptions): string | null => {
  try {
    return new Intl.DateTimeFormat(LOCALE, options).format(date);
  } catch {
    return null;
  }
};

/** e.g. "July 18, 2026" */
export const formatZonedDate = (iso: string, timeZone: string, month: 'long' | 'short' = 'long') => {
  const date = toDate(iso);
  return date && format(date, { timeZone, month, day: 'numeric', year: 'numeric' });
};

/** e.g. "6:00 PM GMT+1", or "6:00 PM" without the zone name */
export const formatZonedTime = (iso: string, timeZone: string, withZoneName = true) => {
  const date = toDate(iso);
  return (
    date &&
    format(date, {
      timeZone,
      hour: 'numeric',
      minute: '2-digit',
      ...(withZoneName ? { timeZoneName: 'short' as const } : {}),
    })
  );
};

export interface EventTimeDisplay {
  /** Date at the venue, or the legacy free-text date */
  date: string;
  /** Time at the venue with its zone, or the legacy free-text time */
  time: string;
  /** The same instant for the viewer. Null when unknown or no different from the venue time. */
  local: { date: string; time: string; dateDiffers: boolean } | null;
}

/**
 * What to show for an event. Pass the viewer's timezone to also get their
 * local time; leave it out (for example while rendering on the server) to get
 * the venue time alone.
 */
export const getEventTimeDisplay = (event: EventTiming, viewerTimeZone?: string | null): EventTimeDisplay => {
  const legacy: EventTimeDisplay = { date: event.date || '', time: event.time || '', local: null };

  const start = toDate(event.startsAt);
  if (!start || !event.startsAt || !event.timezone) return legacy;

  const date = formatZonedDate(event.startsAt, event.timezone);
  const time = formatZonedTime(event.startsAt, event.timezone);
  if (!date || !time) return legacy;

  const display: EventTimeDisplay = { date, time, local: null };
  if (!viewerTimeZone) return display;

  // Compare offsets, not names: two differently named zones can share a clock.
  const eventOffset = offsetMinutes(start, event.timezone);
  const viewerOffset = offsetMinutes(start, viewerTimeZone);
  if (eventOffset === null || viewerOffset === null || eventOffset === viewerOffset) {
    return display;
  }

  const localDate = formatZonedDate(event.startsAt, viewerTimeZone, 'short');
  const localTime = formatZonedTime(event.startsAt, viewerTimeZone, false);
  if (!localDate || !localTime) return display;

  return {
    ...display,
    local: {
      date: localDate,
      time: localTime,
      dateDiffers: localDate !== formatZonedDate(event.startsAt, event.timezone, 'short'),
    },
  };
};

/**
 * An event is past when it was marked so by hand, or when its day has ended
 * in the timezone it is held in.
 */
export const isEventPast = (event: EventTiming, now: Date = new Date()): boolean => {
  if (event.isPast === true) return true;
  if (!event.startsAt || !event.timezone) return false;

  const eventDay = isoToZonedInputs(event.startsAt, event.timezone)?.date;
  const today = isoToZonedInputs(now.toISOString(), event.timezone)?.date;

  return Boolean(eventDay && today && today > eventDay);
};

const LEGACY_ZONE_NAMES: Record<string, string> = {
  WAT: 'Africa/Lagos',
  GST: 'Asia/Dubai',
  GMT: 'UTC',
  UTC: 'UTC',
  BST: 'Europe/London',
  CET: 'Europe/Paris',
  CEST: 'Europe/Paris',
  SAST: 'Africa/Johannesburg',
  EAT: 'Africa/Nairobi',
  EST: 'America/New_York',
  EDT: 'America/New_York',
  PST: 'America/Los_Angeles',
  PDT: 'America/Los_Angeles',
};

/**
 * Best-effort reading of the old free-text fields ("July 18, 2026",
 * "6:00 PM WAT") so the edit form can start pre-filled. Anything it cannot
 * read is returned empty for the admin to fill in.
 */
export const parseLegacyEventTime = (
  date?: string,
  time?: string
): { date: string; time: string; timezone: string } => {
  const result = { date: '', time: '', timezone: DEFAULT_EVENT_TIMEZONE };

  const isoDate = /^(\d{4}-\d{2}-\d{2})/.exec(date?.trim() || '');
  if (isoDate) {
    result.date = isoDate[1];
  } else if (date) {
    const parsed = new Date(date);
    if (!Number.isNaN(parsed.getTime())) {
      result.date = `${parsed.getFullYear()}-${pad(parsed.getMonth() + 1)}-${pad(parsed.getDate())}`;
    }
  }

  const timeMatch = /(\d{1,2})(?::(\d{2}))?\s*(AM|PM)?(?:\s+([A-Za-z]{2,5}))?/i.exec(time?.trim() || '');
  if (timeMatch) {
    let hour = Number(timeMatch[1]);
    const minute = Number(timeMatch[2] || 0);
    const meridiem = timeMatch[3]?.toUpperCase();

    if (meridiem === 'PM' && hour < 12) hour += 12;
    if (meridiem === 'AM' && hour === 12) hour = 0;

    if (hour < 24 && minute < 60) {
      result.time = `${pad(hour)}:${pad(minute)}`;
    }

    const zone = timeMatch[4] && LEGACY_ZONE_NAMES[timeMatch[4].toUpperCase()];
    if (zone) result.timezone = zone;
  }

  return result;
};
