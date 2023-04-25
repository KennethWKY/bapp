/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./_app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/flowbite-react/**/*.js",
    "./public/**/*.html",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("flowbite/plugin")],
};
