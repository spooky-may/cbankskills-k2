import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary:        "#2E8B57",
        "primary-dark": "#1f6b40",
        "primary-light":"#e8f5ee",
        surface:        "#ffffff",
        "surface-alt":  "#f9f7f4",
        border:         "#e2e8f0",
        text:           "#0f172a",
        "text-muted":   "#64748b",
        "text-subtle":  "#94a3b8",
        "accent-gold":  "#b5922a",
        success:        "#16a34a",
        danger:         "#dc2626",
      },
    },
  },
  plugins: [],
};
export default config;
