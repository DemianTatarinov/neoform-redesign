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
          bg: 'rgb(var(--neo-bg) / <alpha-value>)',
          surface: 'rgb(var(--neo-surface) / <alpha-value>)',
          text: 'rgb(var(--neo-text) / <alpha-value>)',
          heading: 'rgb(var(--neo-heading) / <alpha-value>)',
          accent: 'rgb(var(--neo-accent) / <alpha-value>)',
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
