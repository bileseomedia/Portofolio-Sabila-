/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        warmwhite: "#FFFCF8",
        babyblue: "#D9EDFA",
        pastelpink: "#F9DFE8",
        lavender: "#E8DFFA",
        butter: "#FFF1CC",
        mint: "#DDF1E5",
        peach: "#FBE5D6",
        charcoal: "#2E2B33",
        warmgray: "#6B6570",
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "float-slow": "float 9s ease-in-out infinite",
        blob: "blob 12s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-18px)" },
        },
        blob: {
          "0%, 100%": { borderRadius: "60% 40% 55% 45% / 45% 55% 45% 55%" },
          "50%": { borderRadius: "45% 55% 40% 60% / 55% 45% 60% 40%" },
        },
      },
    },
  },
  plugins: [],
};
