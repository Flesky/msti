import primeui from 'tailwindcss-primeui'

export default {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fef6ee',
          100: '#fcead8',
          200: '#f8d1b0',
          300: '#f2b07f',
          400: '#ec854b',
          500: '#e86527',
          600: '#d94c1d',
          700: '#b4391a',
          800: '#902f1c',
          900: '#74291a',
          950: '#3e130c',
        },
        secondary: {
          50: '#ebf7ff',
          100: '#d1efff',
          200: '#aee3ff',
          300: '#76d4ff',
          400: '#35baff',
          500: '#0793ff',
          600: '#006dff',
          700: '#0054ff',
          800: '#0045d7',
          900: '#003893',
          950: '#062865',
        },
      },
    },
  },
  plugins: [primeui],
}
