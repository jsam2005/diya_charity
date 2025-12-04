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
          DEFAULT: '#1C3F75',
          50: '#e8ecf4',
          100: '#d1d9e9',
          200: '#a3b3d3',
          300: '#758dbd',
          400: '#4767a7',
          500: '#1C3F75',
          600: '#16325e',
          700: '#112647',
          800: '#0b1930',
          900: '#050d19',
        },
        secondary: {
          DEFAULT: '#00A389',
          50: '#e6f5f3',
          100: '#ccebe7',
          200: '#99d7cf',
          300: '#66c3b7',
          400: '#33af9f',
          500: '#00A389',
          600: '#00826e',
          700: '#006252',
          800: '#004137',
          900: '#00211b',
        },
        accent: {
          DEFAULT: '#FF8C42',
          50: '#fff5ed',
          100: '#ffebdb',
          200: '#ffd7b7',
          300: '#ffc393',
          400: '#ffaf6f',
          500: '#FF8C42',
          600: '#cc7035',
          700: '#995428',
          800: '#66381a',
          900: '#331c0d',
        },
        text: {
          primary: '#333333',
          secondary: '#666666',
        },
        bg: {
          white: '#FFFFFF',
          subtle: '#F9F9F9',
        },
      },
      fontFamily: {
        'serif': ['EB Garamond', 'serif'],
        'sans': ['EB Garamond', 'serif'],
        'elegant': ['EB Garamond', 'serif'],
        'modern': ['EB Garamond', 'serif'],
        'classic': ['EB Garamond', 'serif'],
        'sophisticated': ['EB Garamond', 'serif'],
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
