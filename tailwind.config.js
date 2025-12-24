/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'warm-orange': '#E85D04',
        'golden-amber': '#F48C06',
        'soft-coral': '#FFBA8C',
        'deep-charcoal': '#1A1A2E',
        'cream-white': '#FDF8F3',
        'smoke-gray': '#6B7280',
        'alert-red': '#DC2626',
        'success-green': '#16A34A',
        'warning-yellow': '#FBBF24',
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'mono': ['JetBrains Mono', 'Consolas', 'monospace'],
      },
      animation: {
        'pulse-alert': 'pulse-alert 1s ease-in-out infinite',
        'shake': 'shake 0.5s ease-in-out infinite',
        'attention': 'attention 0.5s ease-in-out infinite alternate',
      },
      keyframes: {
        'pulse-alert': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        'shake': {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-4px)' },
          '75%': { transform: 'translateX(4px)' },
        },
        'attention': {
          'from': { transform: 'scale(1)' },
          'to': { transform: 'scale(1.02)' },
        },
      },
    },
  },
  plugins: [],
}
