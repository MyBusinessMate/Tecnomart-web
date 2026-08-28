import tailwindcssAnimate from 'tailwindcss-animate';

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: {
        "2xl": "1380px",
      },
    },
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', '-apple-system', 'sans-serif'],
        heading: ['var(--font-heading)', 'var(--font-sans)', 'sans-serif'],
        outfit: ['var(--font-heading)', 'sans-serif'],
        jakarta: ['var(--font-sans)', 'sans-serif'],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#F5B800",
          foreground: "#000000",
        },
        amber: {
          50: '#FFFBEB',
          100: '#FEF8DB',
          200: '#FDF0B5',
          300: '#FCE580',
          400: '#F9D540',
          500: '#F5B800',
          600: '#D9A100',
          700: '#A87D00',
          800: '#785900',
          900: '#483500',
          950: '#2A1F00',
        },
        gold: {
          DEFAULT: '#F5B800',
          light: '#F9D540',
          dark: '#D9A100',
        },
        'tecno-dark': '#1A1A1A',
        'tecno-darker': '#161616',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
    },
  },
  plugins: [tailwindcssAnimate],
}
