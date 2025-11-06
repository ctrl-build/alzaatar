import localFont from "next/font/local";

export const canela = localFont({
  src: [
    {
      path: "../public/assets/fonts/Canela-Thin.otf",
      weight: "100",
      style: "normal",
    },
    {
      path: "../public/assets/fonts/Canela-ThinItalic.otf",
      weight: "100",
      style: "italic",
    },
    {
      path: "../public/assets/fonts/Canela-Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/assets/fonts/Canela-LightItalic.otf",
      weight: "300",
      style: "italic",
    },
    {
      path: "../public/assets/fonts/Canela-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/assets/fonts/Canela-RegularItalic.otf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../public/assets/fonts/Canela-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/assets/fonts/Canela-MediumItalic.otf",
      weight: "500",
      style: "italic",
    },
    {
      path: "../public/assets/fonts/Canela-Bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/assets/fonts/Canela-BoldItalic.otf",
      weight: "700",
      style: "italic",
    },
    {
      path: "../public/assets/fonts/Canela-Black.otf",
      weight: "900",
      style: "normal",
    },
    {
      path: "../public/assets/fonts/Canela-BlackItalic.otf",
      weight: "900",
      style: "italic",
    },
  ],
  variable: "--font-canela",
  display: "swap",
});

