import { Suspense } from 'react';
import PaymentSuccessClient from './PaymentSuccessClient';

// Confirming the payment and emailing the PDFs happens in a request made from
// this page, and the attachments are large, so allow it more time than usual.
export const maxDuration = 60;

export default function MagazinePaymentSuccessPage() {
  return (
    <div className="relative min-h-screen bg-background-dark text-slate-100 font-sans pt-20 overflow-x-hidden">
      <Suspense
        fallback={
          <div className="min-h-[60vh] flex items-center justify-center">
            <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        }
      >
        <PaymentSuccessClient />
      </Suspense>
    </div>
  );
}
