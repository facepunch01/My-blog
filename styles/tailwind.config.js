module.exports = {
  content: ['_site/**/*.html'],
  safelist: [],
  theme: {
    fontFamily: {
      'sans': ['Montserrat', 'sans-serif']
    },
    extend: {
      colors: {
        change: 'black',
      },
    },
  },
  plugins: [require('@tailwindcss/typography'), require("daisyui")],
}
