/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#c8622a",
          dark: "#9c4a1e",
          light: "#f4e3d8",
        },
      },
    },
  },
  plugins: [],
};
