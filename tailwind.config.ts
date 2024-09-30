import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...fontFamily.sans],
      },
      colors: {
        primary: '#7360f1',    // Electric Lavender
        secondary: '#2D7AF5',  // Ocean Blue
        tertiary: '#81ECFF',   // Azure
        accent: '#D297FF',
        warning:'#F24E1E',     // Lilac or Soft Lavender
      }
    },
  },
  plugins: [],
} satisfies Config;
