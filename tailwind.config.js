/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'satoshi': ['Satoshi', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace'],
      },
      colors: {
        'bg-primary': 'rgb(13, 15, 23)',
        'bg-surface': 'rgb(26, 28, 40)',
        'text-primary': 'rgb(234, 239, 253)',
        'text-secondary': 'rgb(156, 163, 175)',
        'anima-cyan': 'rgb(125, 249, 255)',
        'anima-magenta': 'rgb(244, 114, 182)',
      },
      backgroundImage: {
        'anima-gradient': 'linear-gradient(135deg, rgb(125, 249, 255), rgb(244, 114, 182))',
      },
      animation: {
        'gradient-shift': 'gradientShift 3s ease-in-out infinite',
        'typewriter': 'typewriter 2s steps(40, end)',
        'blink': 'blink 1s step-end infinite',
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};