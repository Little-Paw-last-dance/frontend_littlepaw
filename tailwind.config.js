/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#F7C677",
        secondary: "#D6A24D",
        thrird: "#47361A",
        
      },
      fontSize: {
        title: '3rem'
      },
      fontWeight: {
        light: 300,
        normal: 400,
        bold: 700
      },
      fontFamily: {
        sans: ['Helvetica Now', 'sans-serif'],
        anybody: ['Anybody', 'sans-serif']
      }
    },
  },
  plugins: [],
}

