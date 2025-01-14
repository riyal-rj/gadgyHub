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
    },
  },
  plugins: [],
}
