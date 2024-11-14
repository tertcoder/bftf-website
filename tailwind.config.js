/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4CAF50',
        secondary: '#FF7043',
        background: '#FDF5E6',
        text: '#37474F',
      },
    },
    container: {
      center: true,
      padding: '1rem',
    },
  },
  plugins: [],
}