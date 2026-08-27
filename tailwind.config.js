export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: { display: ['Space Grotesk', 'sans-serif'], mono: ['IBM Plex Mono', 'monospace'] },
      colors: { ink: '#11110f', paper: '#e8e7df', acid: '#d8ff48', violet: '#8b5cf6' },
      boxShadow: { acid: '7px 7px 0 #d8ff48', violet: '7px 7px 0 #8b5cf6' }
    }
  },
  plugins: []
};