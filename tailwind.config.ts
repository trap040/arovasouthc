import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        lion: "#AA8453",
        "lion-dark": "#937248",
        "eerie-black": "#222222",
        coyote: "#80633E",
        platinum: "#E0E0E0",
        nero: "#202020",
        "nero-dark": "#1E1E1E",
        "light-gray": "#e9e9e9",
      },
      fontFamily: {
        barlow: ["Barlow", "sans-serif"],
        gilda: ["Gilda Display", "serif"],
        mont: ["Montserrat", "sans-serif"],
        "barlow-cond": ["Barlow Condensed", "sans-serif"],
      },
      backgroundImage: {
        "header-image":
          "linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url('/images/header-image.png')",
        "banner-image":
          "linear-gradient(0deg, rgba(16, 16, 16, 0.5), rgba(16, 16, 16, 0.5)), url('/images/banner-image.png')",
        "booking-image":
          "linear-gradient(rgba(16, 16, 16, 0.5), rgba(16, 16, 16, 0.5)), url('/images/booking-image.png')",
      },
      gridTemplateColumns: {
        footer: "3fr repeat(3, 2fr)",
      },
    },
  },
  plugins: [],
} satisfies Config;
