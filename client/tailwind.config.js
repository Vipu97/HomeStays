/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        pink:'#F5385D',
      },
      screens:{
        'xs': '500px',
      }
    },
  },
  plugins: [],
}

