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
        primary: "#4738A8", // Indigo
        primaryGradient: "#7765E3",
        secondary: "#0A58D6", // Cobalt Blue
        secondaryGradient: "#2D7AF5",
        tertiary: "#00D0F5", // Bright Cyan
        tertiaryGradient: "#81ECFF",
        accent: "#A733FF", // Electric Violet
        accentGradient: "#D297FF",
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
