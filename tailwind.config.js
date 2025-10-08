/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily:{
      global:['Instrument_Serif_Italic'],
    },
    extend: {
      backgroundImage: {
        'hero-pattern': "url('../src/assets/images/hero-image.png')",
      }
    },
  },
  plugins: [],
}

