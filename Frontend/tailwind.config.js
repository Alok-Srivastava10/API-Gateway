/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#F0FDFA',
          100: '#CCFBF1',
          200: '#99F6E4',
          300: '#5EEAD4',
          400: '#2DD4BF',
          500: '#14B8A6',
          600: '#0D9488',
          700: '#0F766E', // Primary Teal
          800: '#115E59',
          900: '#134E4A',
          950: '#042F2E',
        },
        coral: {
          50: '#FFF7ED',
          100: '#FFEDD5',
          200: '#FED7AA',
          300: '#FDBA74',
          400: '#FB923C',
          500: '#F97316', // Primary Accent Coral
          600: '#EA580C',
          700: '#C2410C',
          800: '#9A3412',
          900: '#7C2D12',
        },
        sand: {
          50: '#FDFCFB',
          100: '#F9F6F0',
          200: '#F2ECE1',
          300: '#E5DAC6',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(15, 23, 42, 0.06)',
        'card': '0 10px 30px -4px rgba(15, 23, 42, 0.08)',
        'card-hover': '0 20px 40px -6px rgba(15, 23, 42, 0.12)',
      }
    },
  },
  plugins: [],
}
