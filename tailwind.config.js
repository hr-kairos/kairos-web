/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          cyan: '#06b6d4',
          green: '#22c55e',
          dark: '#030712'
        }
      }
    },
  },
  plugins: [],
}