// components/PaystackCheckout.tsx
'use client';

import { usePaystackPayment } from 'react-paystack';

interface PaystackCheckoutProps {
  email: string;
  amountInNaira: number;
  onPaymentSuccess?: (reference: string) => void;
}

export const PaystackCheckoutButton = ({ email, amountInNaira, onPaymentSuccess }: PaystackCheckoutProps) => {
  const config = {
    reference: `ref_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    email,
    // Paystack expects amount in smallest currency unit (e.g., Kobo for NGN)
    amount: amountInNaira * 100, 
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || '',
  };

  const initializePayment = usePaystackPayment(config);

  const onSuccess = (reference: any) => {
    // Note: UI confirmation only. Do NOT grant value/digital products here alone!
    if (onPaymentSuccess) {
      onPaymentSuccess(reference.reference);
    }
  };

  const onClose = () => {
    console.log('Payment modal closed by user.');
  };

  return (
    <button
      onClick={() => initializePayment({ onSuccess, onClose })}
      className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md transition"
    >
      Pay ₦{amountInNaira.toLocaleString()}
    </button>
  );
}