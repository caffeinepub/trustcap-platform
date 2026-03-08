import typography from "@tailwindcss/typography";
import containerQueries from "@tailwindcss/container-queries";
import animate from "tailwindcss-animate";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["index.html", "src/**/*.{js,ts,jsx,tsx,html,css}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        display: ["Bricolage Grotesque", "Cabinet Grotesk", "sans-serif"],
        body: ["Plus Jakarta Sans", "Cabinet Grotesk", "sans-serif"],
        sans: ["Plus Jakarta Sans", "Cabinet Grotesk", "sans-serif"],
      },
      colors: {
        border: "oklch(var(--border))",
        input: "oklch(var(--input))",
        ring: "oklch(var(--ring) / <alpha-value>)",
        background: "oklch(var(--background))",
        foreground: "oklch(var(--foreground))",
        primary: {
          DEFAULT: "oklch(var(--primary) / <alpha-value>)",
          foreground: "oklch(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "oklch(var(--secondary) / <alpha-value>)",
          foreground: "oklch(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "oklch(var(--destructive) / <alpha-value>)",
          foreground: "oklch(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "oklch(var(--muted) / <alpha-value>)",
          foreground: "oklch(var(--muted-foreground) / <alpha-value>)",
        },
        accent: {
          DEFAULT: "oklch(var(--accent) / <alpha-value>)",
          foreground: "oklch(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "oklch(var(--popover))",
          foreground: "oklch(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "oklch(var(--card))",
          foreground: "oklch(var(--card-foreground))",
        },
        chart: {
          1: "oklch(var(--chart-1))",
          2: "oklch(var(--chart-2))",
          3: "oklch(var(--chart-3))",
          4: "oklch(var(--chart-4))",
          5: "oklch(var(--chart-5))",
        },
        sidebar: {
          DEFAULT: "oklch(var(--sidebar))",
          foreground: "oklch(var(--sidebar-foreground))",
          primary: "oklch(var(--sidebar-primary))",
          "primary-foreground": "oklch(var(--sidebar-primary-foreground))",
          accent: "oklch(var(--sidebar-accent))",
          "accent-foreground": "oklch(var(--sidebar-accent-foreground))",
          border: "oklch(var(--sidebar-border))",
          ring: "oklch(var(--sidebar-ring))",
        },
        trustblue: {
          50: "#eef2fc",
          100: "#d5e0f7",
          200: "#abc1ef",
          300: "#7fa2e8",
          400: "#527de0",
          500: "#2b5cd9",
          600: "#1e47c2",
          700: "#1a3c9e",
          800: "#1a3670",
          900: "#152d58",
          DEFAULT: "#1a3670",
        },
        trustgreen: {
          50: "#ebf8f1",
          100: "#cceee0",
          200: "#97ddbf",
          300: "#5ac89b",
          400: "#2eaf7a",
          500: "#1d9265",
          600: "#177552",
          700: "#155f42",
          800: "#124d36",
          900: "#0e3e2c",
          DEFAULT: "#1d9265",
        },
        trustbeige: {
          50: "#fdfaf5",
          100: "#f8f3e8",
          200: "#f0e7d0",
          300: "#e8dab8",
          400: "#dccba0",
          500: "#cdb988",
          600: "#b89a62",
          700: "#9a7c48",
          800: "#7d6138",
          900: "#614b2b",
          DEFAULT: "#f0e7d0",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xl: "calc(var(--radius) + 4px)",
        "2xl": "calc(var(--radius) + 8px)",
      },
      boxShadow: {
        xs: "0 1px 2px 0 rgba(0,0,0,0.05)",
        card: "0 2px 12px 0 rgba(26, 54, 112, 0.08), 0 1px 3px 0 rgba(26, 54, 112, 0.06)",
        "card-hover": "0 8px 24px 0 rgba(26, 54, 112, 0.14), 0 2px 6px 0 rgba(26, 54, 112, 0.08)",
        marquee: "0 4px 16px 0 rgba(26, 54, 112, 0.3)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          from: { opacity: "0", transform: "translateY(10px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "slide-up": {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.5s ease-out",
        "slide-up": "slide-up 0.6s ease-out",
      },
    },
  },
  plugins: [typography, containerQueries, animate],
};
