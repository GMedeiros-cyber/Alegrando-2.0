/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './index.tsx',
    './App.tsx',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Montserrat', 'sans-serif'],
        fun: ['"Bebas Neue"', 'cursive'],
        expressive: ['"Playfair Display"', 'serif'],
      },
      colors: {
        brand: {
          orange: '#FF6B35',
          dark: '#0F172A',
        },
      },
    },
  },
  plugins: [],
};
