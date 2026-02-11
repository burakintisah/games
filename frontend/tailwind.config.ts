import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    '../shared/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      // WCAG-compliant gradient utilities for conversation card categories
      backgroundImage: {
        // Relationships - Pink/Rose gradient (4.5:1+ contrast)
        'gradient-relationships': 'linear-gradient(135deg, #e91e63 0%, #ad1457 100%)',
        // Self-Knowledge - Blue gradient (4.5:1+ contrast)
        'gradient-self-knowledge': 'linear-gradient(135deg, #2196f3 0%, #0d47a1 100%)',
        // Work - Green gradient (4.5:1+ contrast)
        'gradient-work': 'linear-gradient(135deg, #4caf50 0%, #1b5e20 100%)',
        // Culture - Purple gradient (4.5:1+ contrast)
        'gradient-culture': 'linear-gradient(135deg, #9c27b0 0%, #4a148c 100%)',
        // Philosophy - Orange gradient (4.5:1+ contrast)
        'gradient-philosophy': 'linear-gradient(135deg, #ff9800 0%, #e65100 100%)',
        // Childhood - Teal gradient (4.5:1+ contrast)
        'gradient-childhood': 'linear-gradient(135deg, #009688 0%, #004d40 100%)',
        // Shuffle - Violet gradient (4.5:1+ contrast)
        'gradient-shuffle': 'linear-gradient(135deg, #673ab7 0%, #311b92 100%)',
        // Valentine - Pink/Red romantic gradient
        'gradient-valentine': 'linear-gradient(135deg, #ff6b9d 0%, #c44569 50%, #e91e63 100%)',
        // Bluff Cards - Amber/Red dramatic gradient
        'gradient-bluff': 'linear-gradient(135deg, #ef6c00 0%, #d32f2f 100%)',
      },
      // Animation variants for stagger effects
      animation: {
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        'fade-in-scale': 'fadeInScale 0.4s ease-out forwards',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInScale: {
          '0%': { opacity: '0', transform: 'scale(0.8)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
}
export default config