/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: '576px',   // Bootstrap small
      md: '768px',   // Bootstrap medium
      lg: '992px',   // Bootstrap large
      xl: '1200px',  // Bootstrap extra large
      '2xl': '1400px', // Bootstrap extra extra large
    },
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        accent: "var(--accent)",
        highlight: "var(--highlight)",
        danger: "var(--danger)"
      },
    },
  },
  plugins: [],
};
