/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#ff8a7a",
        "background-light": "#f8f6f5",
        "background-dark": "#23110f",
        "background-dark-2": "#2b1d1c",
        "background-dark-footer": "rgb(27 14 16 / var(--tw-bg-opacity, 1))",
      },
      fontFamily: {
        display: ["Inter", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "0.25rem",
        lg: "0.5rem",
        xl: "0.75rem",
        full: "9999px",
      },
    },
  },
  plugins: [],
};
