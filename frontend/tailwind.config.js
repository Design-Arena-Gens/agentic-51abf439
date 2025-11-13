/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#2F5233',
        secondary: '#A6905D',
        accent: '#D9C9A9',
        clay: '#8C5C3A',
        sand: '#F3E9D2',
        forest: '#1D3B2A',
      },
      fontFamily: {
        heading: ['"Playfair Display"', 'serif'],
        body: ['"Inter"', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 20px 40px rgba(0, 0, 0, 0.08)',
      },
    },
  },
  plugins: [],
};

