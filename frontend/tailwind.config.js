/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#10B981",
        "primary-dark": "#0F9C73",
        secondary: "#1F2937",
        "text-light": "#D1D5DB",
        "text-muted": "#9CA3AF",
        icon: "#6B7280",
      },
      keyframes: {
        glow: {
          '0%, 100%': { textShadow: '0 0 8px rgba(255,215,0,0.9), 0 0 16px rgba(255,215,0,0.7)' },
          // '50%': { textShadow: '0 0 12px rgba(255,215,0,1), 0 0 24px rgba(255,215,0,0.9)' },
        },
      },
      animation: {
        glow: 'glow 1.5s ease-in-out infinite',
      },  
    },
    
  },
  plugins: [],
}
