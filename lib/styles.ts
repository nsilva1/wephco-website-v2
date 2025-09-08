// ======================
// 1. Base Colors
// ======================
const textBase = "text-black dark:text-white";
// const textDim = "text-gray-600 dark:text-[#36454F]"; // or dark:text-charcoal if configured
const textDim = "text-gray-600 dark:text-gray-400"; // Adjusted for better contrast
const bg = "bg-white dark:bg-black";

// ======================
// 2. Utilities
// ======================
export const spacing = {
  paddingX: "px-16",
  paddingY: "py-16",
  padding: 'px-16 py-16',
};

export const utilities = {
  flexCenter: "flex justify-center items-center",
  themeTransition: "transition-colors duration-300", // For smooth dark/light switching
};

// ======================
// 3. Typography
// ======================
export const typography = {
  title: `${textBase} font-outfit font-bold text-6xl lg:text-7xl leading-[80px] lg:leading-[100px] tracking-tight`,
  heading1: `${textBase} font-outfit font-bold text-5xl lg:text-6xl leading-[72px] lg:leading-[84px]`,
  heading2: `${textBase} font-outfit font-semibold text-4xl lg:text-5xl leading-[66.8px] lg:leading-[76.8px]`,
  heading3: `${textBase} font-outfit font-medium text-2xl lg:text-3xl leading-[36px] lg:leading-[42px]`,
  subtitle: `${textDim} font-outfit font-normal text-lg lg:text-xl leading-[28px] lg:leading-[32px] tracking-wide`,
  paragraph: `${textDim} font-outfit font-normal text-base lg:text-lg leading-[28px] lg:leading-[30.8px]`,
  smallParagraph: `${textDim} font-outfit font-normal text-sm lg:text-base leading-[24px] lg:leading-[26px]`,
};

// ======================
// 4. Layout
// ======================
export const layout = {
  boxWidth: "xl:max-w-[1280px] w-full",
  section: `flex md:flex-row flex-col ${spacing.padding} ${bg}`,
  columnSection: `flex flex-col ${spacing.padding} ${bg}`,
};

// ======================
// 5. Buttons
// ======================
export const button = {
  primary: `bg-blue-600 text-white font-outfit font-semibold py-2 px-4 rounded-md shadow-md hover:bg-blue-700 transition duration-200`,
  secondary: `bg-gray-200 text-gray-800 font-outfit font-semibold py-2 px-4 rounded-md shadow-md hover:bg-gray-300 transition duration-200`,
};


// light theme
export const lightSelectStyles = {
  control: (provided: any) => ({
    ...provided,
    backgroundColor: '#ffffff',
    borderColor: '#d1d5db',
    boxShadow: 'none',
    '&:hover': {
      borderColor: '#9ca3af',
    },
  }),
  menu: (provided: any) => ({
    ...provided,
    backgroundColor: '#ffffff',
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? '#3b82f6' // blue selected
      : state.isFocused
      ? '#f3f4f6' // light hover
      : '#ffffff',
    color: state.isSelected ? '#ffffff' : '#111827',
    padding: 12,
  }),
  singleValue: (provided: any) => ({
    ...provided,
    color: '#111827',
  }),
  placeholder: (provided: any) => ({
    ...provided,
    color: '#6b7280',
  }),
};

// dark theme
export const darkSelectStyles = {
  control: (provided: any) => ({
    ...provided,
    backgroundColor: '#1f2937',
    borderColor: '#4b5563',
    boxShadow: 'none',
    '&:hover': {
      borderColor: '#6b7280',
    },
  }),
  menu: (provided: any) => ({
    ...provided,
    backgroundColor: '#1f2937',
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? '#2563eb' // blue selected
      : state.isFocused
      ? '#374151' // dark hover
      : '#1f2937',
    color: state.isSelected ? '#ffffff' : '#e5e7eb',
    padding: 12,
  }),
  singleValue: (provided: any) => ({
    ...provided,
    color: '#e5e7eb',
  }),
  placeholder: (provided: any) => ({
    ...provided,
    color: '#9ca3af',
  }),
};
