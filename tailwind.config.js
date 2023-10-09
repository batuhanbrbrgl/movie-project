/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {


      colors: {
        "main-green": "#00A3E0",
        "light-green": "#64CCC9",
        beige: "#EAEFF6",
        gray: "#7A869C",
        "light-gray": "#DBDDDF",
        "gray-background": "#E0E5EC",
        "white-background": "#F3F5F7",
        background: "#FAFAFA",
        border: "#F3F5F7",
        "dark-border": "#D7DAE4",
        danger: "#EB284B",
        "danger-dark": "#D02544",
        "dark-green": "#4E5364",
        "darker-green": "#2A4648",
        "dark-gray": "#6B6F81",
        "input-gray": "#A8ADBF",
        successs: "#4CAF50",
      },

  },
  plugins: [],
}
}

