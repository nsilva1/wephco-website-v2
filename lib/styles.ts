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
