/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary: '#030014',
        secondary: '#151312',
        accent: '#AB8BFF',
        light:{
          100: '#D6c6ff',
          200: '#A8B5DB',
          300: '#9CA4AB'
        },
        dark:{
          100: '#221F3D',
          200: '#0F0D23'
        }

      }
    },
  },
  plugins: [],
}
