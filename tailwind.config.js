/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        custom: {
          text: '#121212',
          dark: {
            bg: 'rgb(18 18 18)',
            surface: 'rgb(30 30 30)',
            border: 'rgb(45 45 45)',
            text: 'rgb(250 250 250)',
            'text-secondary': 'rgb(200 200 200)',
          },
        },
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.2s ease-out',
      },
    },
  },
  plugins: [],
};