module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        evara: {
          sky: '#5FA8FF',      // Primary
          lavender: '#B9A8FF', // Secondary
          cloud: '#F9FAFC',    // Background
          slate: '#0F172A',    // Text Primary
          muted: '#64748B',    // Text Secondary
          success: '#4ADE80',
          danger: '#F87171',
        }
      },
      backgroundImage: {
        'evara-gradient': 'linear-gradient(135deg, #5FA8FF 0%, #B9A8FF 100%)',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
      },
      boxShadow: {
        'evara-soft': '0 4px 12px rgba(0, 0, 0, 0.05)',
      },
      keyframes: {
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
      },
      animation: {
        "caret-blink": "caret-blink 1.25s ease-out infinite",
      },
    },
  },
  plugins: [],
}