/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        visited: {
          "0%": {
            transform: "scale(0.3)",
            backgroundColor: "#9333ea", // purple-600
          },
          "50%": {
            transform: "scale(1.2)",
            backgroundColor: "#a855f7", // purple-500
          },
          "100%": {
            transform: "scale(1.0)",
            backgroundColor: "#3b82f6", // blue-500
          },
        },
      },
      animation: {
        visited: "visited 0.5s ease-out forwards",
      },
    },
  },
  plugins: [],
};
