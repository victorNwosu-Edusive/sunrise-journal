/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily:{
      global:['Poppins'],
    },
    extend: {
      backgroundImage: {
        'hero-pattern': "url('../src/assets/images/journaling-examples.jpg')",
      }
    },
  },
  plugins: [],
}

