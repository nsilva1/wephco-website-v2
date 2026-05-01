import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number, currency: string = 'NGN'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency === 'NGN' ? 'NGN' : 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
}

// lib/utils/serialize.ts
export function serializeDoc(data: Record<string, any>): Record<string, any> {
  const result: Record<string, any> = {};

  for (const [key, value] of Object.entries(data)) {
    if (value === null || value === undefined) {
      result[key] = value;
    } else if (typeof value._seconds === 'number' && typeof value._nanoseconds === 'number') {
      // ✅ Convert Firestore Timestamp to ISO string
      result[key] = new Date(value._seconds * 1000).toISOString();
    } else if (Array.isArray(value)) {
      result[key] = value.map((item) =>
        typeof item === 'object' ? serializeDoc(item) : item
      );
    } else if (typeof value === 'object') {
      result[key] = serializeDoc(value); // recurse for nested objects like wallet, bankInfo
    } else {
      result[key] = value;
    }
  }

  return result;
}


