/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,jsx}", 
    "./components/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: { primary: '#0891b2', secondary: '#10b981', dark: '#0f172a', light: '#f8fafc' }
      }
    },
  },
  plugins: [],
}
