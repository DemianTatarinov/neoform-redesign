/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './*.html', './src/**/*.{js,css}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        ultra: '0.35em',
      },
      colors: {
        neo: {
          bg: 'var(--neo-bg)',
          surface: 'var(--neo-surface)',
          text: 'var(--neo-text)',
          heading: 'var(--neo-heading)',
          accent: 'var(--neo-accent)',
        },
      },
    },
  },
  safelist: [
    {
      pattern:
        /^(bg|text|border|from|to|via)-(neo-(bg|surface|text|heading|accent)|black)(\/\d+)?$/,
    },
  ],
  plugins: [],
}
