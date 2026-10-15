/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        jarvis: {
          bg: '#050505',
          surface: '#0A0A0A',
          card: '#0C0C0C',
          border: '#252525',
          'border-light': '#383838',
          text: '#F5F5F5',
          muted: '#A3A3A3',
          faint: '#666666'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Menlo', 'Monaco', 'Courier New', 'monospace']
      },
      letterSpacing: {
        tightest: '-0.04em',
        widestx: '0.2em'
      }
    }
  },
  plugins: []
}
