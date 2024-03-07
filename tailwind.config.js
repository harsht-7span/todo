/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./dist/*.{html,js}"],
  theme: {
    extend: {
      screens: {
        xxs: "380px",
        xs: "576px",
        sm: "768px",
        md: "992px",
        lg: "1200px",
        xl: "1400px",
        xxl: "1600px",
      },
      container: {
        center: true,
        padding: "1rem",
        screens: {
          xs: "540px",
          sm: "720px",
          md: "960px",
          lg: "1140px",
          xl: "1200px",
        },
      },
      colors: {
        offBlack: "#0d0d0d",
      },
    },
  },
  plugins: [],
};
