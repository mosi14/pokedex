/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    `./src/**/**/*.{js,jsx,ts,tsx}`,
    `./src/components/**/*.{js,jsx,ts,tsx}`,
    "./gatsby-node.js",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Montserrat", "Arial", "sans-serif"], 
      },
      animation: {
        fadeIn: "fadeIn 0.5s ease-in-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
      },
    },
  },
  plugins: [],
};
