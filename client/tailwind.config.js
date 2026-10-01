/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#a33900', // Terracotta Warm Epicurean
          hover: '#cc4900',
          light: '#ffdbce',
          container: '#ffefe9'
        },
        secondary: {
          DEFAULT: '#855300', // Saffron amber
          light: '#fea619',
          container: '#fff8eb'
        },
        sage: {
          DEFAULT: '#00685f', // Sage green
          light: '#89f5e7',
          container: '#f0fdf9'
        },
        surface: {
          DEFAULT: '#fcfbf9', // Warm Fresh Cream base
          card: '#ffffff',
          subtle: '#f5f2eb',
          border: '#e8e4dc'
        },
        charcoal: {
          DEFAULT: '#111c2d', // Deep slate for typography
          muted: '#5a4138',
          subtle: '#8e7166'
        }
      },
      fontFamily: {
        display: ['Epilogue', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      boxShadow: {
        'warm': '0 4px 20px -2px rgba(30, 41, 59, 0.04), 0 2px 6px -1px rgba(234, 88, 12, 0.03)',
        'warm-lg': '0 16px 32px -4px rgba(30, 41, 59, 0.08), 0 4px 12px -2px rgba(234, 88, 12, 0.04)',
      }
    },
  },
  plugins: [],
}
