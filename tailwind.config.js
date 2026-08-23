/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html", "./**/*.html", "./js/**/*.js"],
  theme: {
    extend: {
      colors: { brand: { navy: "#0F2A3A", white: "#FFFFFF", green: "#8BC34A" } },
      fontFamily: { sans: ["Inter", "system-ui", "sans-serif"] },
      letterSpacing: { wordmark: "0.25em" }
    }
  },
  plugins: []
};
