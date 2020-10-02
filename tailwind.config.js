const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: {
    content: [
      './src/components/**/*.{js,ts,jsx,tsx}',
      './src/pages/**/*.{js,ts,jsx,tsx}',
    ],
  },
  theme: {
    extend: {
      typography: (theme) => {
        return {
          default: {
            css: {
              a: {
                color: theme('colors.orange.600'),
              },
            },
          },
        }
      },
      colors: {
        'accent-1': 'cyan',
      },
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  variants: {},
  plugins: [require('@tailwindcss/ui')],
}
