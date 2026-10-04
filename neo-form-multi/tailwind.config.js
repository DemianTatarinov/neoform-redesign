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
          muted: '#a1a1aa',
          line: '#2a2a2a',
          accent: '#c9b896',
        },
      },
    },
  },
  plugins: [],
}
