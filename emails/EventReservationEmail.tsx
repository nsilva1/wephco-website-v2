import * as React from 'react';
import {
  Body,
  Head,
  Html,
  Link,
  Preview,
  Tailwind,
} from '@react-email/components';

/**
 * Internal notification sent to an event's notification address(es) each time
 * someone reserves a seat. It goes to Wephco staff, not to the attendee.
 */
export interface EventReservationEmailProps {
  eventId?: string;
  eventTitle?: string;
  eventDate?: string;
  eventTime?: string;
  eventLocation?: string;
  attendeeName?: string;
  attendeeEmail?: string;
  attendeePhone?: string;
  seatsReserved?: number;
  /** Seats left after this reservation. Null when the event has no seat limit. */
  seatsRemaining?: number | null;
  investmentTier?: string;
  preferences?: string;
  companyName?: string;
  companyWebsite?: string;
}

const labelClass =
  'text-[10px] font-bold tracking-[1.5px] text-[#64748b] uppercase';

export const EventReservationEmail = ({
  eventId,
  eventTitle = 'Dubai Marina Luxury Roadshow',
  eventDate = 'August 12, 2026',
  eventTime = '11:00 AM GMT+4',
  eventLocation = 'The Ritz-Carlton, Dubai Marina',
  attendeeName = 'Alexander Sterling',
  attendeeEmail = 'alexander@example.com',
  attendeePhone = '+234 800 000 0000',
  seatsReserved = 2,
  seatsRemaining = 4,
  investmentTier = '$2M - $5M',
  preferences = 'Airport transfer required. Vegetarian meal.',
  companyName = 'WEPHCO',
  companyWebsite = 'https://wephco.com',
}: EventReservationEmailProps) => {
  const currentYear = new Date().getFullYear();
  const seatWord = seatsReserved === 1 ? 'seat' : 'seats';
  const previewText = `${attendeeName} reserved ${seatsReserved} ${seatWord} for ${eventTitle}`;

  const hasSeatLimit = seatsRemaining !== null && seatsRemaining !== undefined;
  const isFull = hasSeatLimit && seatsRemaining <= 0;
  const when = [eventDate, eventTime].filter(Boolean).join(' · ');
  const dashboardUrl = eventId
    ? `${companyWebsite}/dashboard/events/${eventId}/edit`
    : `${companyWebsite}/dashboard/events`;

  return (
    <Html lang="en">
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Head></Head>
        <Body className="bg-[#050b08] font-sans my-0 mx-0 p-0 text-slate-100">
          <div className="w-full bg-[#050b08] py-[40px] px-0">
            <table
              role="presentation"
              className="max-w-[600px] w-full bg-[#0c1813] mx-auto my-0 p-0 border-collapse rounded-[20px] overflow-hidden border border-solid border-[#4a4220]"
              align="center"
              cellPadding="0"
              cellSpacing="0"
            >
              <tbody>
                <tr>
                  <td>
                    {/* Header */}
                    <div className="bg-[#011a11] p-[32px_32px_26px_32px] border-b border-solid border-[#3a3519]">
                      <span className="text-[#d4af35] text-[10px] font-bold tracking-[2.5px] uppercase block">
                        Event Notification
                      </span>
                      <div className="font-serif text-[30px] font-light leading-[1.2] text-white mt-[10px]">
                        New Seat{' '}
                        <span className="text-[#d4af35] font-bold italic">
                          Reservation
                        </span>
                      </div>
                      <p className="text-[#94a3b8] text-[14px] leading-[1.6] mt-[10px] mb-0 font-light">
                        <strong className="text-white font-semibold">
                          {attendeeName}
                        </strong>{' '}
                        has reserved {seatsReserved} {seatWord} for the event
                        below.
                      </p>
                    </div>

                    <div className="p-[28px_32px_32px_32px]">
                      {/* Event */}
                      <div className="bg-[#08120e] border border-solid border-[#5a4f22] rounded-[16px] p-[22px]">
                        <div className={labelClass}>Event</div>
                        <div className="text-[20px] font-bold text-white leading-[1.25] mt-[6px]">
                          {eventTitle}
                        </div>
                        {when && (
                          <div className="text-[#cbd5e1] text-[13px] mt-[8px]">
                            {when}
                          </div>
                        )}
                        {eventLocation && (
                          <div className="text-[#94a3b8] text-[13px] mt-[4px]">
                            {eventLocation}
                          </div>
                        )}
                      </div>

                      {/* Seat counts */}
                      <table
                        role="presentation"
                        className="w-full border-collapse mt-[14px]"
                        cellPadding="0"
                        cellSpacing="0"
                      >
                        <tbody>
                          <tr>
                            <td className="w-1/2 align-top pr-[7px]">
                              <div className="bg-[#07130f] border border-solid border-[#3a3519] p-[16px] rounded-[14px]">
                                <div className={labelClass}>Seats reserved</div>
                                <div className="text-[22px] font-extrabold text-[#d4af35] mt-[4px]">
                                  {seatsReserved}
                                </div>
                              </div>
                            </td>
                            <td className="w-1/2 align-top pl-[7px]">
                              <div className="bg-[#07130f] border border-solid border-[#3a3519] p-[16px] rounded-[14px]">
                                <div className={labelClass}>Seats remaining</div>
                                <div
                                  className={`text-[22px] font-extrabold mt-[4px] ${
                                    isFull ? 'text-[#f87171]' : 'text-white'
                                  }`}
                                >
                                  {!hasSeatLimit
                                    ? 'No limit'
                                    : isFull
                                      ? 'Fully reserved'
                                      : seatsRemaining}
                                </div>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>

                      {/* Attendee */}
                      <div className="text-[12px] font-bold tracking-[2px] text-[#d4af35] uppercase mt-[28px] mb-[12px]">
                        Attendee details
                      </div>
                      <table
                        role="presentation"
                        className="w-full border-collapse"
                        cellPadding="0"
                        cellSpacing="0"
                      >
                        <tbody>
                          <tr>
                            <td className="w-1/2 align-top pr-[12px] pb-[16px]">
                              <div className={labelClass}>Name</div>
                              <div className="text-[15px] font-bold text-white mt-[4px]">
                                {attendeeName}
                              </div>
                            </td>
                            <td className="w-1/2 align-top pl-[12px] pb-[16px]">
                              <div className={labelClass}>Phone</div>
                              <div className="text-[15px] font-semibold mt-[4px]">
                                <Link
                                  href={`tel:${attendeePhone.replace(/[^\d+]/g, '')}`}
                                  className="text-white no-underline"
                                >
                                  {attendeePhone}
                                </Link>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td className="w-1/2 align-top pr-[12px]">
                              <div className={labelClass}>Email</div>
                              <div className="text-[14px] font-semibold mt-[4px]">
                                <Link
                                  href={`mailto:${attendeeEmail}`}
                                  className="text-[#d4af35] no-underline"
                                >
                                  {attendeeEmail}
                                </Link>
                              </div>
                            </td>
                            <td className="w-1/2 align-top pl-[12px]">
                              <div className={labelClass}>Target portfolio</div>
                              <div className="text-[14px] font-semibold text-slate-200 mt-[4px]">
                                {investmentTier || 'Not specified'}
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>

                      {/* Preferences */}
                      {preferences && (
                        <div className="bg-[#061811] border border-solid border-[#3a3519] rounded-[14px] p-[18px] mt-[22px]">
                          <div className={labelClass}>Special preferences</div>
                          <p className="text-[13px] leading-[1.7] text-[#cbd5e1] mt-[6px] mb-0 font-light whitespace-pre-line">
                            {preferences}
                          </p>
                        </div>
                      )}

                      {/* Actions */}
                      <div className="text-center mt-[30px]">
                        <Link
                          href={`mailto:${attendeeEmail}?subject=${encodeURIComponent(
                            `Your reservation for ${eventTitle}`
                          )}`}
                          className="bg-[#d4af35] text-[#011a11] text-[12px] font-extrabold tracking-[1.5px] uppercase px-[28px] py-[14px] rounded-[10px] inline-block no-underline"
                        >
                          Reply to attendee
                        </Link>
                      </div>
                      <div className="text-center mt-[14px]">
                        <Link
                          href={dashboardUrl}
                          className="text-[#d4af35] text-[12px] font-bold tracking-[1px] uppercase no-underline"
                        >
                          Open event in dashboard →
                        </Link>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="bg-[#030906] p-[24px_32px] text-center border-t border-solid border-[#3a3519]">
                      <div className="font-serif tracking-[4px] font-bold text-[#d4af35] text-[16px] uppercase">
                        {companyName}
                      </div>
                      <div className="text-[11px] leading-[1.6] text-[#64748b] mt-[12px]">
                        You are receiving this because this address is set as
                        the notification email for this event in the{' '}
                        {companyName} dashboard. To stop these emails, remove
                        it from the event.
                        <br />
                        <br />© {currentYear} {companyName} Group. All rights
                        reserved.
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default EventReservationEmail;
