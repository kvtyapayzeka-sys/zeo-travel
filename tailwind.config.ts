import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // Primary - Derin okyanus mavisi
        'zeo-primary': {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#b9e1fe',
          300: '#7cc5f7',
          400: '#36a5ee',
          500: '#0d86d9',
          600: '#0668b8',
          700: '#094f95',
          800: '#0b427a',
          900: '#0f3866',
          950: '#0a2342',
        },
        // Secondary - Terracotta
        'zeo-accent': {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
          950: '#431407',
        },
        // Neutral
        'zeo-neutral': {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
          950: '#0a0a0a',
        },
        // Semantic colors
        'zeo-success': '#10b981',
        'zeo-warning': '#f59e0b',
        'zeo-error': '#ef4444',
        'zeo-info': '#3b82f6',

        // Kinetic Expedition brand palette
        'zeo-ink': '#0a1420',
        'zeo-coral': '#ff5a3d',
        'zeo-lime': '#cbe85b',
        'zeo-sand': '#f6f1e6',
        
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      fontSize: {
        // Display
        'display-2xl': ['4.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
        'display-xl': ['3.75rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
        'display-lg': ['3rem', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '700' }],
        // Headings
        'h1': ['2.25rem', { lineHeight: '1.25', letterSpacing: '-0.01em', fontWeight: '700' }],
        'h2': ['1.875rem', { lineHeight: '1.3', letterSpacing: '-0.005em', fontWeight: '600' }],
        'h3': ['1.5rem', { lineHeight: '1.35', fontWeight: '600' }],
        'h4': ['1.25rem', { lineHeight: '1.4', fontWeight: '600' }],
        // Body
        'body-lg': ['1.125rem', { lineHeight: '1.75', fontWeight: '400' }],
        'body': ['1rem', { lineHeight: '1.625', fontWeight: '400' }],
        'body-sm': ['0.875rem', { lineHeight: '1.5', fontWeight: '400' }],
        // UI
        'button-lg': ['1rem', { lineHeight: '1.5', fontWeight: '600', letterSpacing: '0.01em' }],
        'button': ['0.875rem', { lineHeight: '1.5', fontWeight: '600', letterSpacing: '0.01em' }],
        'caption': ['0.75rem', { lineHeight: '1.5', fontWeight: '500', letterSpacing: '0.02em' }],
      },
      fontFamily: {
        'manrope': ['var(--font-manrope)', 'sans-serif'],
        'bricolage': ['var(--font-bricolage)', 'sans-serif'],
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, #0d86d9 0%, #0668b8 50%, #094f95 100%)',
        'sunset-gradient': 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
        'subtle-gradient': 'linear-gradient(180deg, #fafafa 0%, #f5f5f5 100%)',
        'dark-gradient': 'linear-gradient(135deg, #0a2342 0%, #0f3866 100%)',
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-slide-up": {
          from: {
            opacity: "0",
            transform: "translateY(20px)",
          },
          to: {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        "shimmer": {
          "0%": { backgroundPosition: "-1000px 0" },
          "100%": { backgroundPosition: "1000px 0" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-slide-up": "fade-slide-up 0.6s ease-out forwards",
        "shimmer": "shimmer 2s infinite linear",
        "float": "float 3s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}

export default config
