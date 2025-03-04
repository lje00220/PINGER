/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'my-main': '#FFB96E',
        'my-gray': '#B2B2B2',
        'my-bg': '#F8F8F8',
        black: '#121212',
        'my-hover': '#D17B1E',
      },
    },
  },
  plugins: [],
};
