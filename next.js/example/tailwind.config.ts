import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
        infiniteSlide: {
          "0%": { transform: "translateX(0%)" },
          "50%": { transform: "translateX(-100%)" },
          "50.1%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0%)" },
        },
        afterInfiniteSlide: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-200%)" },
        },
      },
      animation: {
        infiniteSlide: "infiniteSlide 20s linear infinite",
        afterInfiniteSlide: "afterInfiniteSlide 20s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;
