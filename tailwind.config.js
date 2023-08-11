/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      width: {
        '200': '200px',
        '300': '300px',
      },

      height: {
        '40': '152px',
        '100':'52.5rem',
        '110':'53.5rem',
      },

      spacing: {
        'custom': '0.5px',
        'custom2': '-25px',
      },

      duration: {
        '400': '400ms',
      },

      fontSize: {
        sm: '0.8rem',
        base: '1rem',
        xl: '1.45rem',
        '2xl': '1.563rem',
        '3xl': '1.953rem',
        '4xl': '2.441rem',
        '5xl': '3.052rem',
      },

      colors: {
        'logo': '#3C3C3B',
        'colorl': '#404040',
        'grisclaro': '#443B3A',
        'grisclaro2': '#2B2B2A',
        gris: {
          100: '#DCDCDC',
          200: "#B3B1B2",
          300: "#918F90",
          400: "#878586",
          500: "#706E6F",
          600: "#646464",
          700: "#585858",
          800: "#4F4F4F",
          900: "#3C3C3C",
        },
      }
    },
  },
  plugins: [],
  corePlugins: {
    // Agregar la directiva `@layer utilities` para habilitar las clases de duración personalizadas.
    // Esto debe estar en una versión de Tailwind CSS >= 2.2.0
    '@layer utilities': ['duration'],
  },
}

