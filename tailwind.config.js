/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Inter", "ui-sans-serif", "system-ui"],
      manrope: "Manrope",
    },
    extend: {
      colors: {
        teal: {
          primary: "#009688",
          secondary: "#4DB6AC",
          accent: "#00796B",
          "accent-dark": "#004D40",
          background: "#E0F2F1",
          text: "#00352F",
          "light-accent": "#B2DFDB",
          "header-text": "#FFFFFF",
        },
        "gray-palette": {
          lightest: "#8DA4AC",
          lighter: "#8095A7",
          light: "#7B859F",
          accent: "#7D7392",
          dark: "#81617E",
          darkest: "#824F63",
        },
      },
    },
  },
  plugins: [],
};
