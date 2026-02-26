import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        coal: "#0f1113",
        graphite: "#15181b",
        sand: "#f4f2ec",
        bronze: "#c7a46a",
        "bronze-deep": "#a68553",
        panel: "#1b1f23",
        ink: "#f3f2ef",
        "ink-soft": "#b9b4aa",
        ash: "#7f8c94"
      },
      boxShadow: {
        card: "0 18px 40px rgba(0, 0, 0, .38)",
        soft: "0 12px 30px rgba(15, 17, 19, .16)"
      },
      borderRadius: {
        xl2: "1rem"
      },
      backgroundImage: {
        grain:
          "radial-gradient(circle at 82% 15%, rgba(199,164,106,.18), transparent 32%), radial-gradient(circle at 20% 20%, rgba(36,41,46,.72), transparent 45%)"
      }
    }
  },
  plugins: []
};

export default config;
