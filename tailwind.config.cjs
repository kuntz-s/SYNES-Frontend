/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [ "./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      colors:{
        'primary':'#0f172a',
        'secondary':'#06655E',
        'gray':'#848687'
      },
      fontFamily: {
        'roboto': ['Roboto', 'sans-serif'],
        'montserrat':['Montserrat','sans-serif']
      },
      backgroundImage: {
        homeBackground: "url('/src/assets/img/accueil.png')"
      }
    },
  },
  plugins: [],
}

