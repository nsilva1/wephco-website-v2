import * as React from 'react';
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Column,
  Section,
  Text,
  Tailwind,
} from '@react-email/components';

export interface BookingConfirmationEmailProps {
  customerName?: string;
  customerEmail?: string;
  bookingId?: string;
  serviceName?: string;
  bookingDate?: string;
  bookingTime?: string;
  meetingLocation?: string;
  meetingLink?: string;
  consultantName?: string;
  consultantRole?: string;
  notes?: string;
  companyName?: string;
  supportEmail?: string;
  companyWebsite?: string;
  logoUrl?: string;
}

export const BookingConfirmationEmail = ({
  customerName = 'Sarah Jenkins',
  customerEmail = 'sarah.jenkins@example.com',
  bookingId = 'WPH-BK-89420',
  serviceName = 'Real Estate Investment Advisory',
  bookingDate = 'Friday, August 14, 2026',
  bookingTime = '02:00 PM EST',
  meetingLocation = 'Virtual Meeting (Google Meet)',
  meetingLink = 'https://meet.google.com/abc-defg-hij',
  consultantName = 'David Miller',
  consultantRole = 'Senior Portfolio Manager',
  notes = 'Please have your current investment portfolio and target location preferences ready for discussion.',
  companyName = 'WEPHCO',
  supportEmail = 'support@wephco.com',
  companyWebsite = 'https://wephco.com',
  logoUrl = 'https://wephco.com/images/logo.png',
}: BookingConfirmationEmailProps) => {
  const previewText = `Your booking for ${serviceName} on ${bookingDate} is confirmed (${bookingId})`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind
        config={{
          theme: {
            extend: {
              colors: {
                brand: '#013220',
                'brand-dark': '#011a11',
                gold: '#d4af35',
                'gold-dark': '#cfb53b',
                surface: '#f8f7f6',
              },
            },
          },
        }}
      >
        <Body className="bg-[#f4f5f7] font-sans my-auto mx-auto font-normal text-slate-700">
          <Container className="border border-solid border-[#e5e7eb] rounded-xl my-[40px] mx-auto p-[0px] max-w-[600px] bg-white overflow-hidden shadow-sm">
            {/* Top Brand Header */}
            <Section className="bg-[#013220] p-6 text-center border-b-4 border-solid border-[#d4af35]">
              <Row>
                <Column align="center">
                    <Img
                     src={logoUrl}
                     alt={companyName}
                     width={100}
                     height={100}
                     className="rounded-full"
                    />
                  <Heading className="text-white text-2xl font-bold tracking-tight m-0 uppercase">
                    {companyName}
                  </Heading>
                  <Text className="text-[#d4af35] text-xs font-semibold tracking-widest uppercase m-0 mt-1">
                    Premium Real Estate Solutions
                  </Text>
                </Column>
              </Row>
            </Section>

            {/* Confirmation Header Badge */}
            <Section className="p-8 pb-4 text-center">
              <div className="inline-block bg-emerald-50 text-emerald-700 px-4 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase mb-3 border border-emerald-200">
                ✓ Booking Confirmed
              </div>
              <Heading className="text-2xl font-extrabold text-slate-900 m-0 tracking-tight">
                Appointment Confirmation
              </Heading>
              <Text className="text-slate-500 text-sm mt-2 mb-0">
                Booking Reference:{' '}
                <span className="font-mono font-bold text-slate-800">
                  {bookingId}
                </span>
              </Text>
            </Section>

            {/* Personalized Greeting */}
            <Section className="px-8 py-2">
              <Text className="text-slate-700 text-base leading-relaxed m-0">
                Hi <span className="font-semibold text-slate-900">{customerName}</span>,
              </Text>
              <Text className="text-slate-600 text-sm leading-relaxed mt-2">
                Thank you for scheduling a consultation with {companyName}. Your session has been successfully booked. Below are the full details for your upcoming appointment:
              </Text>
            </Section>

            {/* Booking Details Card */}
            <Section className="px-8 py-4">
              <div className="bg-[#f8f9fa] rounded-xl border border-solid border-slate-200 p-6">
                <Text className="text-xs font-bold uppercase tracking-wider text-slate-400 m-0 mb-4">
                  Reservation Details
                </Text>

                {/* Service */}
                <Row className="mb-3">
                  <Column className="w-1/3">
                    <Text className="text-xs font-semibold text-slate-500 m-0 uppercase">
                      Service
                    </Text>
                  </Column>
                  <Column className="w-2/3">
                    <Text className="text-sm font-bold text-slate-900 m-0">
                      {serviceName}
                    </Text>
                  </Column>
                </Row>

                {/* Date & Time */}
                <Row className="mb-3">
                  <Column className="w-1/3">
                    <Text className="text-xs font-semibold text-slate-500 m-0 uppercase">
                      Date & Time
                    </Text>
                  </Column>
                  <Column className="w-2/3">
                    <Text className="text-sm font-semibold text-slate-800 m-0">
                      {bookingDate}
                    </Text>
                    <Text className="text-xs text-slate-600 font-medium m-0">
                      {bookingTime}
                    </Text>
                  </Column>
                </Row>

                {/* Location / Meeting */}
                <Row className="mb-3">
                  <Column className="w-1/3">
                    <Text className="text-xs font-semibold text-slate-500 m-0 uppercase">
                      Location
                    </Text>
                  </Column>
                  <Column className="w-2/3">
                    <Text className="text-sm font-medium text-slate-800 m-0">
                      {meetingLocation}
                    </Text>
                  </Column>
                </Row>

                {/* Advisor / Host */}
                {consultantName && (
                  <Row className="mb-3">
                    <Column className="w-1/3">
                      <Text className="text-xs font-semibold text-slate-500 m-0 uppercase">
                        Advisor
                      </Text>
                    </Column>
                    <Column className="w-2/3">
                      <Text className="text-sm font-semibold text-slate-800 m-0">
                        {consultantName}
                      </Text>
                      {consultantRole && (
                        <Text className="text-xs text-slate-500 m-0">
                          {consultantRole}
                        </Text>
                      )}
                    </Column>
                  </Row>
                )}

                {/* Notes */}
                {notes && (
                  <Row className="pt-2 border-t border-solid border-slate-200 mt-3">
                    <Column className="w-full">
                      <Text className="text-xs font-semibold text-slate-500 m-0 uppercase mb-1">
                        Additional Notes
                      </Text>
                      <Text className="text-xs text-slate-600 bg-white p-3 rounded-lg border border-slate-200 m-0 italic">
                        "{notes}"
                      </Text>
                    </Column>
                  </Row>
                )}
              </div>
            </Section>

            {/* Action CTA Button */}
            {meetingLink && (
              <Section className="px-8 py-4 text-center">
                <Button
                  className="bg-[#013220] hover:bg-[#012417] text-[#d4af35] font-bold text-sm px-6 py-3.5 rounded-lg text-center block w-full shadow-md"
                  href={meetingLink}
                >
                  Join Meeting / View Appointment
                </Button>
              </Section>
            )}

            {/* Next Steps / Preparation Tips */}
            <Section className="px-8 py-4">
              <div className="border-l-4 border-solid border-[#d4af35] bg-amber-50/50 p-4 rounded-r-lg">
                <Text className="text-xs font-bold text-amber-900 uppercase tracking-wide m-0 mb-1">
                  Important Reminders
                </Text>
                <Text className="text-xs text-amber-800 m-0 leading-relaxed">
                  • Please join or arrive 5 minutes prior to your scheduled time.<br />
                  • If you need to reschedule or cancel, please notify us at least 24 hours in advance.
                </Text>
              </div>
            </Section>

            <Hr className="border-slate-200 my-6 mx-8" />

            {/* Footer */}
            <Section className="px-8 pb-8 text-center">
              <Text className="text-xs text-slate-500 leading-relaxed m-0">
                Have questions or need assistance with your booking?
              </Text>
              <Text className="text-xs text-slate-500 m-0 mt-1">
                Contact our support team at{' '}
                <Link
                  href={`mailto:${supportEmail}`}
                  className="text-[#013220] font-semibold underline"
                >
                  {supportEmail}
                </Link>{' '}
                or visit{' '}
                <Link
                  href={companyWebsite}
                  className="text-[#013220] font-semibold underline"
                >
                  {companyWebsite.replace(/^https?:\/\//, '')}
                </Link>
              </Text>

              <Text className="text-[11px] text-slate-400 mt-6 m-0">
                © {new Date().getFullYear()} {companyName}. All rights reserved.<br />
                This email was sent to {customerEmail} regarding your booking confirmation.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default BookingConfirmationEmail;
