const package = require('./package.json');
const colors = require('tailwindcss/colors')

module.exports = {
  corePlugins: {
    preflight: false,
  },
  prefix: `${package.wrapperClass}-`,
  purge: {
    enabled: true,
    content: ['./out/**/*.html']
  },
  theme: {
    extend: {
      colors: {
        'light-blue': colors.lightBlue,
        cyan: colors.cyan,
      },
    },
  },
  darkMode: false,
  plugins: [],
}
