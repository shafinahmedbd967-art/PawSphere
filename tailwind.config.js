/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FF8C42',
          50: '#FFF4ED',
          100: '#FFE6D3',
          200: '#FFC9A3',
          300: '#FFA86D',
          400: '#FF8C42',
          500: '#F96D15',
          600: '#EA540B',
          700: '#C23E0B',
          800: '#9A3211',
          900: '#7C2C12',
        },
        secondary: {
          DEFAULT: '#2EC4B6',
          50: '#EDFAF9',
          100: '#D0F4F2',
          200: '#A4EAE6',
          300: '#6DDCD6',
          400: '#2EC4B6',
          500: '#1DADA0',
          600: '#178D82',
          700: '#157169',
          800: '#155A54',
          900: '#154B47',
        },
        dark: {
          DEFAULT: '#0F1117',
          card: '#1A1D27',
          border: '#2A2D3A',
          muted: '#3A3D4A',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'serif'],
        body: ['var(--font-body)', 'sans-serif'],
        bangla: ['var(--font-bangla)', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'glass': 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))',
      },
      boxShadow: {
        'glass': '0 8px 32px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.1)',
        'neu': '8px 8px 16px #d1d9e6, -8px -8px 16px #ffffff',
        'neu-dark': '8px 8px 16px rgba(0,0,0,0.4), -8px -8px 16px rgba(255,255,255,0.03)',
        'glow-primary': '0 0 20px rgba(255,140,66,0.4)',
        'glow-secondary': '0 0 20px rgba(46,196,182,0.4)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'slide-up': 'slideUp 0.5s ease-out',
        'fade-in': 'fadeIn 0.4s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};
