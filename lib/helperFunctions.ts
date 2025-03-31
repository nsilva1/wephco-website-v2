export const formatCurrency = (number: number, currencyCode = 'USD', locale = 'en-US'): string => {
    try {
      return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currencyCode,
      }).format(number);
    } catch (error) {
      console.error('Error formatting currency:', error);
      return number.toLocaleString(locale, { maximumFractionDigits: 2 }); // Fallback to basic number formatting
    }
  }