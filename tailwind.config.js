/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors:{
        primaries:{
          100:"#017785"
        }
      },
      boxShadow: {
        'custom-shadow': '0px 3px 6px 0px #1C487029',
      },
    },
  },
  plugins: [],
}

