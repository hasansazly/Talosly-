import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#0A0A0F",
        surface: "#12101A",
        surface2: "#1C1828",
        plum: "#2A0B3D",
        accent: "#C9B3FF",
        "accent-dim": "#7B5EA7",
        ink: "#F0EAF8",
        muted: "#8A7FA0",
        border: "#2C2340",
        success: "#7FCFAE",
      },
      fontFamily: {
        serif: ["Lora", "Georgia", "serif"],
        sans: ["DM Sans", "sans-serif"],
      },
      boxShadow: {
        glow: "0 18px 48px rgba(201, 179, 255, 0.18)",
      },
      backgroundImage: {
        "radial-noise":
          "radial-gradient(circle at top, rgba(201, 179, 255, 0.12), transparent 35%), radial-gradient(circle at bottom, rgba(123, 94, 167, 0.16), transparent 28%)",
      },
    },
  },
  plugins: [],
};

export default config;
