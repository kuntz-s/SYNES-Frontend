/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [ "./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      colors:{
        'primary':'#000000',
        'secondary':'#06655E',
      },
      fontFamily: {
        'roboto': ['Roboto', 'sans-serif'],
        'montserrat':['Montserrat','sans-serif']
      },
      backgroundImage: {
        homeBackground: "url('/src/assets/accueil.png')"
      }
    },
  },
  plugins: [],
}

