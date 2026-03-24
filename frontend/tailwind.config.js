/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["'Syne'", "sans-serif"],
        body: ["'DM Sans'", "sans-serif"],
      },
      colors: {
        ink: "#0A0A0F",
        "ink-soft": "#1C1C28",
        "ink-muted": "#3A3A52",
        surface: "#F7F6F2",
        "surface-2": "#EEECEA",
        "surface-3": "#E4E1DC",
        accent: "#FF4F1F",
        "accent-soft": "#FF6B3D",
        "accent-pale": "#FFF0EB",
        teal: "#00C2A8",
        "teal-pale": "#E6FAF8",
        gold: "#F5A623",
        "gold-pale": "#FFF8EB",
      },
      borderRadius: {
        xl: "20px",
        "2xl": "28px",
      },
      animation: {
        "fade-up": "fadeUp 0.5s ease forwards",
        "pulse-dot": "pulseDot 1.2s ease infinite",
      },
      keyframes: {
        fadeUp: {
          from: { opacity: 0, transform: "translateY(20px)" },
          to: { opacity: 1, transform: "translateY(0)" },
        },
        pulseDot: {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0.3 },
        },
      },
    },
  },
  plugins: [],
};
