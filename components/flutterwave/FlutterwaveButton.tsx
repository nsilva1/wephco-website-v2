'use client'

import React, { forwardRef } from 'react'
import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';

export interface FlutterwaveButtonProps {
    amount: number;
    email: string;
    name: string;
    currency: string;
    phoneNumber: string;
    className?: string;
    redirectUrl?: string;
    txRef?: string;
    description?: string;
}

const FlutterwaveButton = forwardRef<HTMLButtonElement, FlutterwaveButtonProps>(
  ({ amount, email, name, currency, phoneNumber, className, redirectUrl, txRef, description }, ref) => {
    const defaultTxRef = txRef || `wephco-${Date.now()}`;

    const getFullRedirectUrl = () => {
      if (!redirectUrl) return 'https://wephco.com/magazine/payment-success';
      if (redirectUrl.startsWith('http://') || redirectUrl.startsWith('https://')) {
        return redirectUrl;
      }
      if (typeof window !== 'undefined') {
        return `${window.location.origin}${redirectUrl.startsWith('/') ? '' : '/'}${redirectUrl}`;
      }
      return `https://wephco.com${redirectUrl.startsWith('/') ? '' : '/'}${redirectUrl}`;
    };

    const flutterwaveConfig = {
        public_key: process.env.NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY || process.env.FLUTTERWAVE_PUBLIC_KEY || '',
        tx_ref: defaultTxRef,
        amount: amount,
        payment_options: 'card,mobilemoney,ussd',
        customer: {
            email: email,
            name: name,
            phone_number: phoneNumber
        },
        currency: currency,
        redirect_url: getFullRedirectUrl(),
        customizations: {
            title: 'WEPHCO',
            description: description || 'Payment for WEPHCO services',
            logo: '',
        }
    }

    const handlePayment = useFlutterwave(flutterwaveConfig)

    return (
        <div>
            <button
                type="button"
                ref={ref}
                className={className}
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handlePayment({
                        callback: (response) => {
                            console.log('Flutterwave response:', response);
                            closePaymentModal();
                            if (typeof window !== 'undefined') {
                                const targetPath = redirectUrl || '/magazine/payment-success';
                                const query = new URLSearchParams({
                                    status: response.status || 'successful',
                                    tx_ref: response.tx_ref || defaultTxRef,
                                    transaction_id: response.transaction_id ? String(response.transaction_id) : '',
                                    amount: String(amount),
                                    currency: currency,
                                    email: email,
                                    name: name,
                                }).toString();
                                window.location.href = `${targetPath}?${query}`;
                            }
                        },
                        onClose: () => {
                            console.log('Payment modal closed');
                        }
                    });
                }}
            >
                Pay {amount}
            </button>
        </div>
    )
  }
);

FlutterwaveButton.displayName = 'FlutterwaveButton';

export { FlutterwaveButton }