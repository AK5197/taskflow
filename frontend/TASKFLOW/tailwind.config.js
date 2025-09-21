/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#3B82F6",
          light: "#93C5FD",
          dark: "#1E3A8A",
        },
        secondary: {
          DEFAULT: "#F97316",
          light: "#FDBA74",
          dark: "#C2410C",
        },
        accent: {
          DEFAULT: "#10B981",
          light: "#6EE7B7",
          dark: "#065F46",
        },
      },
    },
  },
  plugins: [],
};