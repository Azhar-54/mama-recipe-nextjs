module.exports = {
  mode: "jit",
  content: ["./src/**/**/*.{js,ts,jsx,tsx,html,mdx}", "./src/**/*.{js,ts,jsx,tsx,html,mdx}"],
  darkMode: "class",
  theme: {
    screens: { md: { max: "1050px" }, sm: { max: "550px" } },
    extend: {
      colors: {
        gray: {
          100: "#f5f5f5",
          300: "#e6e6e6",
          400: "#c4c4c4",
          500: "#999999",
          600: "#696f79",
          700: "#6f6a40",
          800: "#494949",
          "600_01": "#707070",
          "800_01": "#3e3939",
        },
        blue_gray: { 400: "#8591a5" },
        amber: { 400: "#efc81a" },
        yellow: { 50: "#fff5ec" },
        green: { 600: "#31a24c" },
        black: { 900: "#000000", "900_1c": "#0000001c" },
        indigo: { 900: "#2e266f", "900_99": "#2e266f99" },
        white: { A700: "#ffffff" },
      },
      boxShadow: { xs: "0px 4px 10px 3px #0000001c" },
      fontFamily: { inter: "Inter", airbnbcerealapp: "Airbnb Cereal App", poppins: "Poppins" },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
