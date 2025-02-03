// tailwind.config.js
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          primary: "#1DA1F2", // Add a custom color
        },
        fontFamily: {
          sans: ["Inter", "sans-serif"], // Add a custom font
        },
      },
    },
    plugins: [],
    mode: "jit",
purge: [],
  };