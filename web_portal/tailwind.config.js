/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#FFF3E0',
          100: '#FFE0B2',
          200: '#FFCC80',
          300: '#FFB74D',
          400: '#FFA726',
          500: '#FF7A1A', // Naranja ServiCarga (Official)
          600: '#F57C00',
          700: '#E65100',
          800: '#BF360C',
          900: '#8D3A00',
        },
        secondary: {
          50: '#E1E8EB',   // Gris Navy muy claro (Ideal para fondos light)
          100: '#B5C5CD',
          200: '#839FAD',
          300: '#51798D',
          400: '#2C5C76',
          500: '#0B2B3F',
          600: '#0A2639',
          700: '#081F31',
          800: '#061929', // Navy Oscuro para Cards (Dark Mode)
          900: '#061426', // Navy Fondo de Pantalla (Dark Mode)
        },
        light: {
          bg: '#F8FAFC',    // background de la app android
          surface: '#FFFFFF',
          border: '#E2E8F0'
        }
      }
    },
  },
  plugins: [],
}
