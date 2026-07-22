/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          500: '#FF6D00', // El naranja de Ruta-Go
          600: '#E65100',
        },
        secondary: {
          900: '#001D3D', // El azul marino de Ruta-Go
        }
      }
    },
  },
  plugins: [],
}
