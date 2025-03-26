/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'aikira': {
          primary: '#c2a3ff',      // Pastel lavender
          'primary-dark': '#a98acf', // Darker lavender
          accent: '#ffb6e1',       // Pastel pink
          'accent-dark': '#f598cc', // Darker pink
          'blue-pastel': '#a3e4e4', // Pastel turquoise
          'blue-dark': '#8ad1d1',   // Slightly darker pastel turquoise
          'neon-green': '#a6ffb5',  // Neon green for circuit effects
          'neon-blue': '#98e8e8',   // Pastel bright turquoise
          bg: '#f5f0ff',          // Soft lavender background
          'bg-secondary': '#f0e6ff', // Slightly darker background
          text: '#6c5b7b',         // Soft purple text
          'text-secondary': '#8a7a99', // Lighter text
          success: '#b5ecd7',      // Pastel mint
          error: '#ffb6b9',        // Pastel coral
        }
      },
      fontFamily: {
        body: ['Poppins', 'sans-serif'],
        heading: ['Inter', 'sans-serif'],
        mono: ['Space Mono', 'monospace'],
      },
      boxShadow: {
        'pastel-sm': '0 2px 5px rgba(0, 0, 0, 0.05)',
        'pastel-md': '0 5px 15px rgba(0, 0, 0, 0.05)',
        'pastel-lg': '0 15px 30px rgba(0, 0, 0, 0.1)',
        'pastel-inset': 'inset 0 2px 5px rgba(0, 0, 0, 0.05)',
        'pastel-glow': '0 0 10px rgba(194, 163, 255, 0.3), 0 0 20px rgba(255, 182, 225, 0.2)', 
        'pastel-neon': '0 0 5px rgba(166, 255, 181, 0.7), 0 0 10px rgba(152, 232, 232, 0.5)'
      },
      borderRadius: {
        'pastel-sm': '4px',
        'pastel-md': '8px',
        'pastel-lg': '12px',
        'pastel-xl': '20px',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(90deg, #c2a3ff, #a3e4e4)',
        'gradient-accent': 'linear-gradient(90deg, #ffb6e1, #f598cc)',
        'gradient-mix': 'linear-gradient(90deg, #c2a3ff, #ffb6e1)',
        'gradient-neon': 'linear-gradient(90deg, #a6ffb5, #98e8e8)',
        'grid-pattern': 'linear-gradient(to right, rgba(194, 163, 255, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(194, 163, 255, 0.1) 1px, transparent 1px)'
      },
      animation: {
        'pulse-pastel': 'pulse-pastel 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'gradient-move': 'gradient-move 4s ease infinite',
        'float': 'float 6s ease-in-out infinite',
        'spin': 'spin 2s linear infinite',
        'spin-slow': 'spin 4s linear infinite reverse',
        'fade-in': 'fade-in 0.8s ease-out',
      },
      transitionProperty: {
        'fast': 'all 0.2s ease',
        'normal': 'all 0.3s ease',
        'slow': 'all 0.5s ease',
      }
    },
  },
  plugins: [],
}