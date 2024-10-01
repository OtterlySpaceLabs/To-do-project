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
        accentGradient:'#E3BDFF', // Lilac or Soft Lavender
        warning:'#F24E1E', // Red
        warningGradient:'#FF7262',     
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        bigger: {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.1)' },
        },
      },
      animation: {
        float: 'float 3s ease-in-out infinite',
        bigger: 'bigger 0.3s ease-in-out forwards',
      },
    },
  },
  plugins: [],
} satisfies Config;
