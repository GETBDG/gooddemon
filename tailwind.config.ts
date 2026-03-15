import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        abyss: "#050505",
        bone: "#ede7db",
        ash: "#8d877f",
        ember: "#7d1010",
        blood: "#a31212",
        "blood-soft": "#4a0d0d",
        silver: "#aeb4be",
        charcoal: "#151515",
        veil: "#101010"
      },
      boxShadow: {
        halo: "0 0 0 1px rgba(237, 231, 219, 0.08), 0 16px 40px rgba(0, 0, 0, 0.35)"
      },
      backgroundImage: {
        "noise-grid":
          "linear-gradient(rgba(237, 231, 219, 0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(237, 231, 219, 0.04) 1px, transparent 1px)"
      },
      letterSpacing: {
        brutal: "0.18em"
      }
    }
  },
  plugins: []
};

export default config;
