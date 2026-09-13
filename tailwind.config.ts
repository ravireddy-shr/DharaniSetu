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
        primary: {
          DEFAULT: '#1D0A69',
          hover: '#160854',
          light: '#F3F0FC',
          dark: '#14064B',
        },
        secondary: {
          DEFAULT: '#115E59',
          hover: '#0D4845',
          light: '#F0FDFA',
          border: '#99F6E4',
          dark: '#0A3836',
        },
        accent: {
          DEFAULT: '#D97706',
          hover: '#B45309',
          light: '#FEF3C7',
          dark: '#92400E',
        },
        background: '#F8FAFC',
        surface: '#FFFFFF',
        charcoal: '#0F172A',
        'input-border': '#94A3B8',
        success: '#16A34A',
        warning: '#EA580C',
        error: '#DC2626',
        danger: '#DC2626',

        brand: {
          navy:      '#1D0A69',
          primary:   '#1D0A69',
          secondary: '#115E59',
          teal:      '#115E59',
          forest:    '#115E59',
          accent:    '#D97706',
          mustard:   '#D97706',
          saffron:   '#D97706',
          orange:    '#EA580C',
          light:     '#F8FAFC',
          surface:   '#FFFFFF',
          charcoal:  '#0F172A',
          input:     '#94A3B8',
          success:   '#16A34A',
          warning:   '#EA580C',
          danger:    '#DC2626',
          error:     '#DC2626',
          muted:     '#64748B',
        },
        gov: {
          bg:             '#F8FAFC',
          card:           '#FFFFFF',
          border:         '#E2E8F0',
          'border-input': '#94A3B8',
          text:           '#0F172A',
          primary:        '#1D0A69',
          secondary:      '#115E59',
          accent:         '#D97706',
          green:          '#115E59',
          'green-light':  '#F0FDFA',
          'green-border': '#99F6E4',
        },

        // Overriding emerald to Forest Teal shades eliminates bright/neon greens across the entire application
        emerald: {
          50: '#F0FDFA',
          100: '#CCFBF1',
          200: '#99F6E4',
          300: '#5EEAD4',
          400: '#2DD4BF',
          500: '#14B8A6',
          600: '#115E59', // Secondary Forest Teal #115E59
          700: '#0F4E4A',
          800: '#134E48',
          900: '#042F2E',
          950: '#021E1C',
        },

        // Semantic status colors
        green: {
          50: '#F0FDF4',
          100: '#DCFCE7',
          200: '#BBF7D0',
          300: '#86EFAC',
          400: '#4ADE80',
          500: '#22C55E',
          600: '#16A34A', // Success / Approved: #16A34A
          700: '#15803D',
          800: '#166534',
          900: '#14532D',
          950: '#052E16',
        },
      },
      fontFamily: {
        sans: ['Inter', 'Roboto', 'Noto Sans', 'Noto Sans Telugu', 'Noto Sans Tamil', 'Noto Sans Devanagari', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
        noto: ['Noto Sans', 'sans-serif'],
      },
      fontSize: {
        'h1': ['32px', { lineHeight: '40px', fontWeight: '700' }],
        'h2': ['24px', { lineHeight: '32px', fontWeight: '600' }],
        'h3': ['20px', { lineHeight: '28px', fontWeight: '600' }],
        'body': ['16px', { lineHeight: '24px', fontWeight: '400' }],
        'table': ['14px', { lineHeight: '20px', fontWeight: '500' }],
      },
      borderRadius: {
        xl: '0.75rem',
        '2xl': '1rem',
        lg: '0.5rem',
        md: '0.375rem',
        sm: '0.25rem',
      },
      boxShadow: {
        xs: '0 1px 2px 0 rgba(15, 23, 42, 0.05)',
        card: '0 1px 3px 0 rgba(15, 23, 42, 0.06), 0 1px 2px 0 rgba(15, 23, 42, 0.04)',
        panel: '0 4px 12px -2px rgba(15, 23, 42, 0.08), 0 2px 6px -1px rgba(15, 23, 42, 0.04)',
        hover: '0 10px 20px -3px rgba(15, 23, 42, 0.08), 0 4px 6px -2px rgba(15, 23, 42, 0.04)',
      },
    },
  },
  plugins: [],
}

export default config
