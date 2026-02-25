import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        coal: "#0f1318",
        graphite: "#182028",
        sand: "#f2ede4",
        bronze: "#be9b68",
        ash: "#9ca6af"
      },
      boxShadow: {
        card: "0 16px 45px rgba(0,0,0,.24)",
        soft: "0 12px 30px rgba(9, 13, 17, .12)"
      },
      borderRadius: {
        xl2: "1.25rem"
      },
      backgroundImage: {
        grain: "radial-gradient(circle at 20% 15%, rgba(190,155,104,.20), transparent 30%), radial-gradient(circle at 85% 5%, rgba(255,255,255,.08), transparent 25%)"
      }
    }
  },
  plugins: []
};

export default config;
