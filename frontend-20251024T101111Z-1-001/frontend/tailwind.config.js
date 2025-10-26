/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        mono: ['Monaco', 'Courier New', 'monospace'],
      },
      colors: {
        'purple-primary': '#667eea',
        'purple-dark': '#764ba2',
        'purple-darker': '#5a67d8',
      },
      backgroundImage: {
        'gradient-purple': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'gradient-pink': 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        'gradient-blue': 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        'gradient-teal': 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
        'gradient-orange': 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
        'gradient-rose': 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
        'gradient-lightblue': 'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)',
        'gradient-purple-yellow': 'linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)',
        'gradient-pink-yellow': 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
        'gradient-panel': 'linear-gradient(135deg, rgba(102, 126, 234, 0.95) 0%, rgba(118, 75, 162, 0.95) 100%)',
      },
    },
  },
  plugins: [],
}

