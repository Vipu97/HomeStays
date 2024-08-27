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
        'xxs' : '400px',
        '2xl' : '1730px'
      },
      scale: {
        '102': '1.02',
      },
    },
  },
  plugins: [],
}

