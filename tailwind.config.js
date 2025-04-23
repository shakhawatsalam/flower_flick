export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
        lora: ["Lora", "serif"],
        playfair: ['"Playfair Display"', "serif"],
      },
    },
  },
  plugins: [
    // Only add if you actually need animations
    // require('tw-animate-css')
  ],
};
