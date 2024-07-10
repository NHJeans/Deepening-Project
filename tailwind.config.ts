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
      backgroundImage: {
        "border-pattern":
          "url(\"data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='%23333' stroke-width='3' stroke-dasharray='8' stroke-dashoffset='20' stroke-linecap='square'/%3e%3c/svg%3e\")",
        "hover-border-pattern":
          "url(\"data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='%238D8A8AFF' stroke-width='3' stroke-dasharray='8' stroke-dashoffset='20' stroke-linecap='square'/%3e%3c/svg%3e\")",
      },
    },
  },
  plugins: [],
};
export default config;
