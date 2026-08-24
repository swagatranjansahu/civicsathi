/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Primary — deep indigo-teal, the "ledger ink" of the product
        civic: {
          50: '#EEF4F4',
          100: '#D6E4E4',
          200: '#AFC9CA',
          300: '#82A9AB',
          400: '#4F7E81',
          500: '#2C5C60',
          600: '#1F4A4E',
          700: '#1A3E42',
          800: '#153236',
          900: '#0F2427',
          950: '#0A1A1C',
        },
        // Accent — marigold, used sparingly for calls to action & priority
        marigold: {
          50: '#FDF3E7',
          100: '#FBE4C4',
          300: '#F0B36A',
          400: '#E89A3F',
          500: '#DD8623',
          600: '#B96C18',
          700: '#8F5313',
        },
        // Status colors
        brick: {
          50: '#FBEBE8',
          400: '#CB6455',
          500: '#B94A3B',
          600: '#963A2E',
        },
        forest: {
          50: '#E9F4EC',
          400: '#4C9A6C',
          500: '#2E7D4F',
          600: '#23623E',
        },
        gold: {
          400: '#D9AE3E',
          500: '#BC9226',
        },
        // Neutral "paper" background family
        paper: {
          50: '#FBFAF7',
          100: '#F3F2ED',
          200: '#E8E6DD',
          300: '#D8D5C8',
          400: '#B3AFA0',
          500: '#8A8677',
          600: '#645F52',
          700: '#454136',
          800: '#2B2823',
          900: '#191712',
        },
        ink: '#132025',
      },
      fontFamily: {
        display: ['"IBM Plex Serif"', 'Georgia', 'serif'],
        sans: ['"IBM Plex Sans"', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        card: '0 1px 2px rgba(19,32,37,0.06), 0 1px 1px rgba(19,32,37,0.04)',
        lift: '0 8px 24px rgba(19,32,37,0.12)',
        stamp: '0 0 0 1.5px currentColor inset',
      },
      borderRadius: {
        card: '10px',
      },
      keyframes: {
        'pulse-dot': {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.35 },
        },
        'rise-in': {
          '0%': { opacity: 0, transform: 'translateY(10px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        'tick': {
          '0%': { transform: 'translateY(4px)', opacity: 0.4 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
      },
      animation: {
        'pulse-dot': 'pulse-dot 1.6s ease-in-out infinite',
        'rise-in': 'rise-in 0.5s ease-out both',
        'tick': 'tick 0.3s ease-out',
      },
    },
  },
  plugins: [],
}
