import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: "#0f1e2e",       // dark footer/section background, matches confirmed screenshots
        teal: "#14b8a6",
        brandBlue: "#2563eb",
      },
      backgroundImage: {
        "brand-gradient": "linear-gradient(to right, #2563eb, #14b8a6)",
      },
    },
  },
  plugins: [],
};
export default config;
