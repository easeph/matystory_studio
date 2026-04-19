import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: "hsl(var(--card))",
        "card-foreground": "hsl(var(--card-foreground))",
        primary: "hsl(var(--primary))",
        "primary-foreground": "hsl(var(--primary-foreground))",
        secondary: "hsl(var(--secondary))",
        "secondary-foreground": "hsl(var(--secondary-foreground))",
        accent: "hsl(var(--accent))",
        "accent-foreground": "hsl(var(--accent-foreground))",
        muted: "hsl(var(--muted))",
        "muted-foreground": "hsl(var(--muted-foreground))",
        border: "hsl(var(--border))",
        ring: "hsl(var(--ring))"
      },
      fontFamily: {
        sans: ["'Noto Serif SC'", "'Source Han Serif SC'", "serif"],
        display: ["'LXGW WenKai TC'", "'KaiTi'", "serif"]
      },
      backgroundImage: {
        "math-grid":
          "radial-gradient(circle at 1px 1px, rgba(212,175,55,0.15) 1px, transparent 0)"
      },
      boxShadow: {
        glow: "0 0 30px rgba(212, 175, 55, 0.18)"
      }
    }
  },
  plugins: []
};

export default config;
