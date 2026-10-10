import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        canvas: '#FFFFFF',
        surface: '#FFFFFF',
        // Warm off-white used to separate alternating sections without
        // introducing a second colour into a white + orange palette.
        tint: '#FFFAF3',
        brand: {
          // Deep orange. Chosen so white text on it passes WCAG AA (5.2:1)
          // and brand text on white also passes AA.
          DEFAULT: '#C2410C',
          soft: '#FFF1E0',
          dark: '#9A3412',
          light: '#FB923C',
          vivid: '#F97316',
        },
        pro: {
          DEFAULT: '#14337A',
          soft: '#E7EDFA',
          dark: '#0C2255',
          light: '#3F6FD6',
        },
        ink: {
          DEFAULT: '#1C1917',
          muted: '#57534E',
        },
        line: '#F5EFE7',
        // Near-black canvas for the dark "night" landing page.
        night: {
          950: '#050507',
          900: '#0B0B10',
          850: '#101017',
          800: '#16161F',
          700: '#1F1F2A',
        },
        // Warm gold "ember" accent for the dark theme (Nexxy CRM style).
        ember: {
          DEFAULT: '#E9C46A',
          soft: '#F8EBC3',
          light: '#F2D48F',
          mid: '#D4AF37',
          deep: '#B08D23',
          dark: '#8A6F12',
          ink: '#4A3A0A',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        // Neutral, weightless shadows — the HomeFix OS editorial system style.
        card: '0 1px 2px rgba(28, 25, 23, 0.04), 0 8px 24px rgba(28, 25, 23, 0.05)',
        'card-hover': '0 2px 4px rgba(28, 25, 23, 0.05), 0 20px 42px rgba(28, 25, 23, 0.11)',
        glow: '0 18px 40px rgba(194, 65, 12, 0.22)',
        // Dark "ember" system shadows.
        'ember-soft': '0 12px 30px -12px rgba(233, 196, 106, 0.28)',
        'ember-glow': '0 0 0 1px rgba(233, 196, 106, 0.35), 0 18px 60px -12px rgba(233, 196, 106, 0.35)',
        'night-card': 'inset 0 1px 0 rgba(255, 255, 255, 0.04), 0 20px 50px -20px rgba(0, 0, 0, 0.8)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.55' },
          '50%': { opacity: '1' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'float-slow': 'float 9s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;