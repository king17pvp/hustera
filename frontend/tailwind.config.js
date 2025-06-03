/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
      extend: {
        fontFamily: {
          "avant-CE": ["AvantGardeBook", "sans-serif"], // Normal
          "avant-bold": ["AvantGardeBold", "sans-serif"], // Bold
          "avant-demi": ["AvantGardeDemi", "sans-serif"], // Demi
          "avant-medium": ["AvantGardeMedium", "sans-serif"], // Medium
        },
      },
    },
    plugins: [],
  };
  