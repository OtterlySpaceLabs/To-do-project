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
        primary: '#7360f1',
        primaryGradient:'#8271F3',    // Electric Lavender
        secondary: '#2D7AF5',
        secondaryGradient:'#0062FF',  // Ocean Blue
        tertiary: '#81ECFF',
        tertiaryGradient:'#B6F4FF',   // Azure
        accent: '#D297FF',
        accentGradient:'#E3BDFF',
        warning:'#F24E1E',     // Lilac or Soft Lavender
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
      },
      animation: {
        float: 'float 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
} satisfies Config;
