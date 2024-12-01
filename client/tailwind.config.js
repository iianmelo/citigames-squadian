/** @type {import('tailwindcss').Config} */

module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    extend: {
      backgroundImage: {
        "citi-logo": 'url("/src/assets/Logo.png")',
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        cardShadow: "0px 1px 3px 1px rgba(0, 0, 0, 0.15), 0px 1px 2px 0px rgba(0, 0, 0, 0.3)",
        custom: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
      },
      fontFamily: {
        barlow: ["Barlow", "sans-serif"],
      },
      colors: {
        inputBg: "hsl(var(--inputBg))",
        inputBgBorder: "hsl(var(--inputBgBorder))",
        loginPlaceholder: "hsl(var(--loginPlaceholder))",
        loginInputBorder: "hsl(var(--loginInputBorder))",
        loginBg: "hsl(var(--loginBg))",
        textCardColor: "hsl(var(--textCardColor))",
        cardPurple: "hsl(var(--cardPurple))",
        cardPurpleHover: "hsl(var(--cardPurpleHover))",
        cardBlue: "hsl(var(--cardBlue))",
        cardBlueHover: "hsl(var(--cardBlueHover))",
        cardGray: "hsl(var(--cardGray))",
        cardGreen: "hsl(var(--cardGreen))",
        cardGreenHover: "hsl(var(--cardGreenHover))",
        redButton: "hsl(var(--redButton))",
        redButtonHover: "hsl(var(--redButtonHover))",
        grayButton: "hsl(var(--grayButton))",
        grayButtonHover: "hsl(var(--grayButtonHover))",
        green: "hsl(var(--green))",
        greenHover: "hsl(var(--greenHover))",
        gray84: "#d6d6d6",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
