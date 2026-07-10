/** @type {import("tailwindcss").Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#f5f3ff",
          100: "#ede9fe",
          400: "#a78bfa",
          500: "#8b5cf6",
          600: "#7c3aed",
          700: "#6d28d9",
        },
        accent: {
          50: "#ecfeff",
          100: "#cffafe",
          400: "#22d3ee",
          500: "#06b6d4",
          600: "#0891b2",
        },
      },
      fontFamily: {
        sans: ["Poppins", "Cairo", "system-ui", "sans-serif"],
        display: ["Cairo", "Poppins", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 40px rgba(139, 92, 246, 0.35)",
        soft: "0 10px 30px -12px rgba(124, 58, 237, 0.25)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        blobMove: {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "33%": { transform: "translate(30px, -40px) scale(1.1)" },
          "66%": { transform: "translate(-20px, 20px) scale(0.95)" },
        },
        glowPulse: {
          "0%, 100%": { opacity: 0.35, transform: "scale(1)" },
          "50%": { opacity: 0, transform: "scale(1.4)" },
        },
        bounceIn: {
          "0%": { opacity: 0, transform: "scale(.85) translateY(10px)" },
          "60%": { opacity: 1, transform: "scale(1.03) translateY(-2px)" },
          "100%": { opacity: 1, transform: "scale(1) translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-500px 0" },
          "100%": { backgroundPosition: "500px 0" },
        },
      },
      animation: {
        float: "float 4s ease-in-out infinite",
        blob: "blobMove 12s ease-in-out infinite",
        "glow-pulse": "glowPulse 2.4s ease-in-out infinite",
        "bounce-in": "bounceIn .5s ease-out",
        shimmer: "shimmer 2.5s infinite linear",
      },
    },
  },
  plugins: [],
}
