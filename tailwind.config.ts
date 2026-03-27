import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        mono: ['Cascadia Code', 'Fira Code', 'monospace'],
      },
    },
  },
  plugins: [],
} satisfies Config
