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
      opacity: {
        // prettier-ignore
        '30': '0.3',
      },
      customForms: (theme) => {
        return {
          default: {
            input: {
              '&:focus': {
                boxShadow: theme('boxShadow.outline-orange'),
                borderColor: theme('colors.orange.600'),
              },
            },
          },
        }
      },
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
  variants: {
    opacity: ['responsive', 'hover', 'focus', 'disabled'],
  },
  plugins: [require('@tailwindcss/ui')],
}
