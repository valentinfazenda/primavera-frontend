/** @type {import('tailwindcss').Config} */
const config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    borderRadius: {
      none: "0",
      sm: "4px",
      DEFAULT: "8px",
      md: "12px",
      lg: "16px",
      xl: "24px",
      full: "9999px",
    },
    extend: {
      spacing: {
        "1": "4px",
        "2": "12px",
        "3": "20px",
        "4": "28px",
        "5": "36px",
        "6": "44px",
        "7": "52px",
      },
      colors: {
        primary: "var(--primary-color)",
        secondary: "var(--secondary-color)",
        title: "var(--title-color)",
        desc: "var(--desc-color)",
        body: "var(--body-color)",
        border: "var(--border-color)",
        white: "var(--white-color)",
        bg: "var(--bg-color)",
        bg100: "var(--bg100-color)",
        warning: "var(--warning-color)",
      },
      fontSize: {
        h1: "var(--h1-font-size)",
        h2: "var(--h2-font-size)",
        h3: "var(--h3-font-size)",
        h4: "var(--h4-font-size)",
        base: "var(--normal-font-size)",
        sm: "var(--small-font-size)",
      },
    },
  },
  plugins: [],
};

export default config;