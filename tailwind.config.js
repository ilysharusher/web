/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./**/*.{html,js}'],
  theme: {
    extend: {
      fontFamily: {
        'sans-serif': 'Roboto',
      },
      container: {
        center: true,
      },
      colors: {
        'blue-6': '#1890FF',
        gray: {
          banner: '#302C34',
          2: '#FAFAFA',
          5: '#D9D9D9',
          7: '#8C8C8C',
          8: '#595959',
          9: '#262626',
        },
        yellow: {
          rating: '#FFC107',
        },
      },
    },
  },
  plugins: [],
}
