/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          900: '#0a1628',
          800: '#0f2040',
          700: '#1a3a6b',
        },
        crew: {
          blue: '#1e6bc4',
          teal: '#0ea5e9',
          orange: '#f97316',
        }
      }
    },
  },
  plugins: [],
}
