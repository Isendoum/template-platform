/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }
    },

    extend: {
      colors: {
        primary: "#FFFFFF",
        secondary: "#000670",
      },
      backgroundColor: {
        primary: "rgb(10, 20, 40)",
        "primary-hover": "rgb(60, 60, 90)",
      },
      animation: {
        spin: "spin 1s linear infinite",
        "fade-in": "fadeIn 2s ease-in-out",
      },
      keyframes: {
        spin: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        fadeIn: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontSize: {
        hover: "1.2rem",
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        ".hover-grow": {
          display: "inline-block",
          transform: "scale(1)",
          transition: "transform 0.3s ease-in-out",
        },
        ".hover-grow:hover": {
          transform: "scale(1.2)",
        },
      };
      addUtilities(newUtilities, ["responsive", "hover"]);
    },
  ],
};
