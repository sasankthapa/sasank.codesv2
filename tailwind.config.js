const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      keyframes: {
        moveRight: {
          '0%, 100%': { transform: 'translateX(0%)' },
          '50%': { transform: 'translateX(25%)' },
        },
        moveLeft: {
          '0%, 100%': { transform: 'translateX(0%)' },
          '50%': { transform: 'translateX(-25%)' },
        },
      },
      animation: {
        moveRight: 'moveRight 50s linear infinite',
        moveLeft: 'moveLeft 50s linear infinite',
      },
      fontFamily: {
        'inter': ['"Inter"', ...defaultTheme.fontFamily.sans]
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
