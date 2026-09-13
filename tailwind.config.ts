import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navy:    '#0F172A',
          blue:    '#1E40AF',
          green:   '#16A34A',
          emerald: '#15803D',
          orange:  '#EA580C',
          saffron: '#D97706',
          light:   '#F1F5F9',
          muted:   '#64748B',
        },
        gov: {
          bg:     '#F8FAFC',
          card:   '#FFFFFF',
          border: '#E2E8F0',
          text:   '#1E293B',
          green:  '#16A34A',
          'green-light': '#F0FDF4',
          'green-border': '#BBF7D0',
        },
      },
      fontFamily: {
        sans: ['Arial', 'Helvetica', 'Noto Sans', 'sans-serif'],
        arial: ['Arial', 'Helvetica', 'sans-serif'],
      },
      borderRadius: {
        xl: '0.75rem',
        '2xl': '1rem',
        lg: '0.5rem',
        md: '0.375rem',
        sm: '0.25rem',
      },
      boxShadow: {
        card: '0 1px 3px 0 rgba(0,0,0,0.06), 0 1px 2px 0 rgba(0,0,0,0.04)',
        panel: '0 4px 12px -2px rgba(0,0,0,0.08), 0 2px 6px -1px rgba(0,0,0,0.04)',
        hover: '0 10px 20px -3px rgba(0,0,0,0.08), 0 4px 6px -2px rgba(0,0,0,0.04)',
      },
    },
  },
  plugins: [],
}

export default config
