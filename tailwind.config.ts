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
      minHeight: {
        "120": "30rem",

        "160": "40rem",
      },
      keyframes: {
        rotate: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      animation: {
        rotate: "rotate 1s infinite linear",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "border-pattern":
          "url(\"data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='%23333' stroke-width='3' stroke-dasharray='8' stroke-dashoffset='20' stroke-linecap='square'/%3e%3c/svg%3e\")",
        "hover-border-pattern":
          "url(\"data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='%238D8A8AFF' stroke-width='3' stroke-dasharray='8' stroke-dashoffset='20' stroke-linecap='square'/%3e%3c/svg%3e\")",
      },
      padding: {
        "22": "5.5rem",
        "24": "6rem",
        "26": "6.5rem",
        "28": "7rem",
        "30": "7.5rem",
        "34": "8.5rem",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
export default config;
