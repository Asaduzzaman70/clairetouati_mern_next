import localFont from "next/font/local";

/**
 * Inclusive Sans - Local Font Definition
 * Includes both static weight files and variable font mapping.
 */
export const inclusiveSans = localFont({
  src: [
    {
      path: "../public/fonts/InclusiveSans-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/InclusiveSans-LightItalic.ttf",
      weight: "300",
      style: "italic",
    },
    {
      path: "../public/fonts/InclusiveSans-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/InclusiveSans-Italic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../public/fonts/InclusiveSans-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/InclusiveSans-MediumItalic.ttf",
      weight: "500",
      style: "italic",
    },
    {
      path: "../public/fonts/InclusiveSans-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/InclusiveSans-SemiBoldItalic.ttf",
      weight: "600",
      style: "italic",
    },
    {
      path: "../public/fonts/InclusiveSans-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/InclusiveSans-BoldItalic.ttf",
      weight: "700",
      style: "italic",
    },
  ],
  variable: "--font-inclusive-sans",
  display: "swap",
});

/**
 * Inclusive Sans Variable Font
 */
export const inclusiveSansVariable = localFont({
  src: [
    {
      path: "../public/fonts/InclusiveSans-VariableFont_wght.ttf",
      style: "normal",
    },
    {
      path: "../public/fonts/InclusiveSans-Italic-VariableFont_wght.ttf",
      style: "italic",
    },
  ],
  variable: "--font-inclusive-variable",
  display: "swap",
});

/**
 * Mirrut - Local Decorative/Display Font Definition
 */
export const mirrut = localFont({
  src: "../public/fonts/Mirrut.otf",
  variable: "--font-mirrut",
  display: "swap",
});

/**
 * Three.js Typeface JSON paths for 3D typography
 */
export const THREE_FONTS = {
  helvetikerRegular: "/fonts/helvetiker_regular.typeface.json",
  helvetikerBold: "/fonts/helvetiker_bold.typeface.json",
} as const;
