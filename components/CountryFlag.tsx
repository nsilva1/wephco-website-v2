import React from 'react';
import * as Flags from 'country-flag-icons/react/3x2';
import countries from 'i18n-iso-countries';
import enLocale from 'i18n-iso-countries/langs/en.json';

countries.registerLocale(enLocale)

const CountryFlag = ({ countryName }: { countryName: string }) => {

    // Convert full name (e.g., "Germany") to 2-letter ISO code (e.g., "DE")
  const countryCode = countries.getAlpha2Code(countryName, 'en');

  // Safely index into the Flags module using the ISO code key
  const FlagComponent = countryCode 
    ? (Flags as Record<string, React.ComponentType<{ title?: string; className?: string; style?: React.CSSProperties }>>)[countryCode]
    : null;

  if (!FlagComponent) {
    return <div></div>;
  }

  return (
    <div className='flex items-center gap-2'>
      <FlagComponent 
        title={countryName} 
        style={{ width: '20px', height: '20px' }} 
      />
    </div>
  )
}

export { CountryFlag }