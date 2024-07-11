import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        customYellow: "#FEFFD7",
        customGreen: "#95EB42",
      },
      maxWidth: {
        custom: "420px",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
export default config;
