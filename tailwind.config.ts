import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        glow: "0 0 40px rgba(56, 189, 248, 0.35)",
      },
      colors: {
        night: "#070b14",
        panel: "#101827",
        accent: "#7dd3fc",
        violet: "#a78bfa",
      },
    },
  },
  plugins: [],
};

export default config;
