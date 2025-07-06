/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./view/**/*.{js,jsx,ts,tsx}"],
  plugins: [require("@tailwindcss/forms")],
};
