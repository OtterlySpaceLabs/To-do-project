import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";
import forms from "@tailwindcss/forms";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...fontFamily.sans],
      },
      colors: {
        primary: "#7360f1", // Electric Lavender
        primaryGradient: "#8271F3",
        secondary: "#2D7AF5", // Ocean Blue
        secondaryGradient: "#0062FF",
        tertiary: "#81ECFF", // Azure
        tertiaryGradient: "#B6F4FF",
        accent: "#D297FF", // Lilac or Soft Lavender
        accentGradient: "#E3BDFF",
        warning: "#F24E1E", // Red
        warningGradient: "#FF7262",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        bigger: {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(1.1)" },
        },
      },
      animation: {
        float: "float 3s ease-in-out infinite",
        bigger: "bigger 0.3s ease-in-out forwards",
      },
    },
  },
  plugins: [forms],
} satisfies Config;
