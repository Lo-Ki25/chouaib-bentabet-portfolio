import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./context/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        base: {
          DEFAULT: "#05070D",
          50: "#F5F7FF",
          100: "#E7EBFC",
          900: "#05070D",
          950: "#020306",
        },
        surface: {
          DEFAULT: "#0B0F1E",
          light: "#111830",
          border: "rgba(255,255,255,0.08)",
        },
        accent: {
          DEFAULT: "#3B6BFF",
          50: "#EEF2FF",
          100: "#DCE4FF",
          200: "#B7C6FF",
          300: "#8FA4FF",
          400: "#6483FF",
          500: "#3B6BFF",
          600: "#2450E0",
          700: "#1A3CB8",
          800: "#152F8F",
          900: "#101F5C",
        },
        violet: {
          DEFAULT: "#8B5CF6",
        },
        cyan: {
          DEFAULT: "#22D3EE",
        },
        muted: "#A8B8CC",
      },
      fontFamily: {
        display: ["var(--font-sora)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      backgroundImage: {
        "grid-pattern":
          "linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)",
        "radial-fade":
          "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(59,107,255,0.25), transparent)",
      },
      backgroundSize: {
        grid: "44px 44px",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        blob: {
          "0%, 100%": { transform: "translate(0px, 0px) scale(1)" },
          "33%": { transform: "translate(30px, -40px) scale(1.08)" },
          "66%": { transform: "translate(-20px, 25px) scale(0.94)" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "spin-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
      },
      animation: {
        marquee: "marquee 28s linear infinite",
        blob: "blob 14s infinite ease-in-out",
        "fade-in-up": "fade-in-up 0.8s ease forwards",
        "spin-slow": "spin-slow 18s linear infinite",
        shimmer: "shimmer 2.5s linear infinite",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
      },
      boxShadow: {
        glow: "0 0 60px -12px rgba(59,107,255,0.45)",
        "glow-sm": "0 0 24px -8px rgba(59,107,255,0.55)",
        card: "0 8px 40px -12px rgba(0,0,0,0.5)",
      },
    },
  },
  plugins: [],
};

export default config;
