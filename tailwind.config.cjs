/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "slate-blue": "#865DFF",
        "base": "#1D242B",
      },
    },
  },
  plugins: [],
};
