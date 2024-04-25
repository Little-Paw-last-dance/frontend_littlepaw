/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#F7D783",
        secondary: "#E0B46C"
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
        sans: ['Roboto', 'sans-serif'],
        anybody: ['Anybody', 'sans-serif']
      }
    },
  },
  plugins: [],
}

