import React from 'react';
import * as Flags from 'country-flag-icons/react/3x2';
import countries from 'i18n-iso-countries';
import enLocale from 'i18n-iso-countries/langs/en.json';

countries.registerLocale(enLocale);

// Dynamically generate alias map for ALL world countries from i18n-iso-countries
const buildAllCountriesAliasMap = (): Record<string, string> => {
  const map: Record<string, string> = {
    // Common acronyms & popular shorthands
    'UAE': 'AE',
    'UNITED ARAB EMIRATES': 'AE',
    'EMIRATES': 'AE',
    'UK': 'GB',
    'UNITED KINGDOM': 'GB',
    'ENGLAND': 'GB',
    'GREAT BRITAIN': 'GB',
    'BRITAIN': 'GB',
    'USA': 'US',
    'UNITED STATES': 'US',
    'UNITED STATES OF AMERICA': 'US',
    'AMERICA': 'US',
    'TURKEY': 'TR',
    'TÜRKIYE': 'TR',
    'RUSSIA': 'RU',
    'RUSSIAN FEDERATION': 'RU',
    'SOUTH KOREA': 'KR',
    'KOREA': 'KR',
    'REPUBLIC OF KOREA': 'KR',
    'NORTH KOREA': 'KP',
    'VIETNAM': 'VN',
    'VIET NAM': 'VN',
    'IVORY COAST': 'CI',
    "COTE D'IVOIRE": 'CI',
    'CZECH REPUBLIC': 'CZ',
    'CZECHIA': 'CZ',
    'DR CONGO': 'CD',
    'DEMOCRATIC REPUBLIC OF THE CONGO': 'CD',
    'CONGO-KINSHASA': 'CD',
    'REPUBLIC OF THE CONGO': 'CG',
    'CONGO-BRAZZAVILLE': 'CG',
    'SWAZILAND': 'SZ',
    'ESWATINI': 'SZ',
    'BURMA': 'MM',
    'MYANMAR': 'MM',
    'MACEDONIA': 'MK',
    'NORTH MACEDONIA': 'MK',
    'CAPE VERDE': 'CV',
    'CABO VERDE': 'CV',
    'HOLLAND': 'NL',
    'THE NETHERLANDS': 'NL',
    'LAOS': 'LA',
    'SYRIA': 'SY',
    'VATICAN': 'VA',
    'VATICAN CITY': 'VA',
    'PALESTINE': 'PS',
    'BOLIVIA': 'BO',
    'VENEZUELA': 'VE',
    'IRAN': 'IR',
    'MOLDOVA': 'MD',
    'TANZANIA': 'TZ',
    'BRUNEI': 'BN',
    'CUBA': 'CU',
    'GAMBIA': 'GM',
    'THE GAMBIA': 'GM',
    'BAHAMAS': 'BS',
    'THE BAHAMAS': 'BS',
  };

  const allCountriesObj = countries.getNames('en');
  for (const [code, name] of Object.entries(allCountriesObj)) {
    const uppercaseCode = code.toUpperCase();
    map[uppercaseCode] = uppercaseCode;

    const names = Array.isArray(name) ? name : [name];
    for (const n of names) {
      if (n) {
        map[n.toUpperCase()] = uppercaseCode;
        // Strip common prefixes/suffixes like "Republic of", "Kingdom of", etc.
        const cleanName = n.replace(/^(the|republic of|kingdom of|state of|federation of)\s+/i, '').trim();
        if (cleanName) {
          map[cleanName.toUpperCase()] = uppercaseCode;
        }
      }
    }
  }

  return map;
};

const ALL_COUNTRIES_ALIAS_MAP = buildAllCountriesAliasMap();

const getIsoCode = (rawInput: string): string | undefined => {
  if (!rawInput) return undefined;
  const input = rawInput.trim();

  // 1. Check if direct input matches alias map
  const upper = input.toUpperCase();
  if (ALL_COUNTRIES_ALIAS_MAP[upper]) {
    return ALL_COUNTRIES_ALIAS_MAP[upper];
  }

  // 2. Try i18n-iso-countries on full string
  let iso = countries.getAlpha2Code(input, 'en');
  if (iso) return iso.toUpperCase();

  // 3. If input has a comma (e.g. "Dubai, United Arab Emirates" or "London, United Kingdom"), extract after comma
  if (input.includes(',')) {
    const afterComma = input.split(',').pop()?.trim() || '';
    const upperAfter = afterComma.toUpperCase();
    if (ALL_COUNTRIES_ALIAS_MAP[upperAfter]) return ALL_COUNTRIES_ALIAS_MAP[upperAfter];
    iso = countries.getAlpha2Code(afterComma, 'en');
    if (iso) return iso.toUpperCase();
  }

  // 4. Try multi-word sub-combinations from words
  const words = input.split(/[\s,]+/);
  for (let i = 0; i < words.length; i++) {
    const phrase = words.slice(i).join(' ');
    const phraseUpper = phrase.toUpperCase();
    if (ALL_COUNTRIES_ALIAS_MAP[phraseUpper]) return ALL_COUNTRIES_ALIAS_MAP[phraseUpper];
    const phraseIso = countries.getAlpha2Code(phrase, 'en');
    if (phraseIso) return phraseIso.toUpperCase();
  }

  // 5. Check individual words from last to first
  for (let i = words.length - 1; i >= 0; i--) {
    const wordUpper = words[i].toUpperCase();
    if (ALL_COUNTRIES_ALIAS_MAP[wordUpper]) return ALL_COUNTRIES_ALIAS_MAP[wordUpper];
    const wordIso = countries.getAlpha2Code(words[i], 'en');
    if (wordIso) return wordIso.toUpperCase();
  }

  return undefined;
};

const CountryFlag = ({ countryName }: { countryName: string }) => {
  const countryCode = getIsoCode(countryName);

  const FlagComponent = countryCode
    ? (Flags as Record<string, React.ComponentType<{ title?: string; className?: string; style?: React.CSSProperties }>>)[countryCode]
    : null;

  if (!FlagComponent) {
    return null;
  }

  return (
    <div className='flex items-center gap-2 align-middle'>
      <FlagComponent 
        title={countryName} 
        style={{ width: '20px', height: '20px' }} 
      />
    </div>
  );
};

export { CountryFlag };