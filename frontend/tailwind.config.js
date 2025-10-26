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
          50: '#fef7ed',
          100: '#fdedd3',
          200: '#fbd7a5',
          300: '#f8b86d',
          400: '#f59e0b',
          500: '#d97706',
          600: '#b45309',
          700: '#92400e',
          800: '#78350f',
          900: '#451a03',
        },
        secondary: {
          50: '#f6f7f6',
          100: '#e8ebe8',
          200: '#d1d7d1',
          300: '#a9b7a0',
          400: '#4A6050',
          500: '#3d4f42',
          600: '#344038',
          700: '#2d352f',
          800: '#262d28',
          900: '#212622',
        },
        cream: {
          50: '#fefdfb',
          100: '#fdfaf5',
          200: '#fbf8f2',
          300: '#f7f3e8',
          400: '#f2ecdc',
          500: '#ede4d0',
        },
        warm: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
        }
      },
      fontFamily: {
        'serif': ['Playfair Display', 'serif'],
        'sans': ['Open Sans', 'sans-serif'],
        'elegant': ['Cormorant Garamond', 'serif'],
        'modern': ['Inter', 'sans-serif'],
        'classic': ['Merriweather', 'serif'],
        'sophisticated': ['Libre Baskerville', 'serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'bounce-slow': 'bounce 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(50px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      backgroundImage: {
        'forest-gradient': 'linear-gradient(135deg, #228B22, #32CD32, #006400)',
        'hero-overlay': 'linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4))',
      },
    },
  },
  plugins: [],
}
