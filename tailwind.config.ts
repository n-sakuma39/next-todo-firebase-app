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
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      spinner: {
        none: {
          "-webkit-appearance": "none",
          "-moz-appearance": "textfield",
          "-webkit-inner-spin-button": "none",
          "-webkit-outer-spin-button": "none",
          "margin": "0",
        },
      },
    },
  },
  plugins: [],
};
export default config;