/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          800: '#1E293B',
          900: '#111827',
          950: '#0B0F19',
        },
        emerald: {
          500: '#10B981',
          600: '#059669',
          700: '#047857',
        },
        brandBlue: {
          500: '#2563EB',
          600: '#1D4ED8',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      backgroundImage: {
        'grid-pattern': "radial-gradient(circle, rgba(16, 185, 129, 0.08) 1px, transparent 1px)",
        'dark-grid': "radial-gradient(circle, rgba(255, 255, 255, 0.07) 1px, transparent 1px)",
        'emerald-gradient': "linear-gradient(135deg, #10B981 0%, #059669 100%)",
        'glow-gradient': "radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0.15), transparent 70%)",
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out 3s infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
};
