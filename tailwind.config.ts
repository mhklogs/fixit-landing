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
          // and brand text on white also passes AA — the previous red failed
          // the latter.
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
      },
      fontFamily: {
        sans: ['ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 2px rgba(28, 25, 23, 0.04), 0 6px 20px rgba(154, 52, 18, 0.07)',
        'card-hover': '0 2px 4px rgba(28, 25, 23, 0.05), 0 14px 34px rgba(154, 52, 18, 0.12)',
        glow: '0 18px 40px rgba(194, 65, 12, 0.22)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
    },
  },
  plugins: [],
};

export default config;