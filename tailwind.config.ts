import type { Config } from 'tailwindcss';

import preset from '@lynx-js/tailwind-preset';

const config: Config = {
  content: ['./src/**/*.{vue,js,ts}'],
  presets: [preset],
  darkMode: ['class', '.theme-dark'],
  theme: {
    extend: {
      sans: ['"Helvetica Neue"', '"Segoe UI"', 'Arial', 'sans-serif'],
      colors: {
        background: 'var(--color-background)',
        foreground: 'var(--color-foreground)',
        ripple: 'var(--color-ripple)',
        inputborder: 'var(--color-border-input)',
        card: {
          DEFAULT: 'var(--color-card)',
          foreground: 'var(--color-card-foreground)',
        },
        primary: {
          DEFAULT: 'var(--color-primary)',
          foreground: 'var(--color-primary-foreground)',
          ripple: 'var(--color-primary-ripple)',
          50: '#eef6ff',
          100: '#d9eaff',
          200: '#bcdbff',
          300: '#8ec5ff',
          400: '#59a6ff',
          500: '#2b7fff',
          600: '#1b63f5',
          700: '#144de1',
          800: '#173fb6',
          900: '#193a8f',
          950: '#142457'
        },
        secondary: {
          DEFAULT: 'var(--color-secondary)',
          foreground: 'var(--color-secondary-foreground)',
        },
        destructive: {
          DEFAULT: 'var(--color-destructive)',
          foreground: 'var(--color-destructive-foreground)',
        },
        success: {
          DEFAULT: 'var(--color-success)',
          foreground: 'var(--color-success-foreground)',
        },
        muted: {
          DEFAULT: 'var(--color-muted)',
          foreground: 'var(--color-muted-foreground)',
        },
        border: 'var(--color-border)',
        ring: 'var(--color-ring)',
      },
    },
  },
};

export default config;
