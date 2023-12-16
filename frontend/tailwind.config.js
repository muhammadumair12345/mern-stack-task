/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#10007B",
        secondary: "#52B788",
        accent: "#edf2f4",
        dark: "#222222",
        light: "#edf2f4",
      },
    },
  },
  plugins: [],
};
