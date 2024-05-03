/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  corePlugins: {
    preflight: false,
  },
  important: "#root",
  theme: {
    extend: {
      colors: {
        primary: "#F7E6C9",
        secondary: "#D29A39",
        third: "#DFA43C",
        fourth: "#B08130",
        fifth: "#8E6826",
        sixth: "#6C4F1D",
      },
      fontSize: {
        title: '3rem',
        subtitle: '2rem',
      },
      fontWeight: {
        light: 300,
        normal: 400,
        bold: 700
      },
      fontFamily: {
        sans: ['Helvetica Now', 'sans-serif'],
        anybody: ['Anybody', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif']
      },
      boxShadow: {
        '3xl': '0 35px 60px -15px rgba(0, 0, 0, 0.3)'
      }
    },
  },
  plugins: [],
}

