/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Satoshi', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        codex: {
          primary: 'rgb(13, 15, 23)',
          surface: 'rgb(26, 28, 40)',
          text: 'rgb(234, 239, 253)',
          'text-secondary': 'rgb(156, 163, 175)',
        },
        anima: {
          cyan: 'rgb(125, 249, 255)',
          magenta: 'rgb(244, 114, 182)',
        },
      },
      backgroundImage: {
        'anima-gradient': 'linear-gradient(135deg, rgb(125, 249, 255), rgb(244, 114, 182))',
      },
      animation: {
        'anima-flow': 'anima-flow 3s ease-in-out infinite',
        'typewriter': 'typewriter 2s steps(20) 1s forwards',
        'blink': 'blink 1s infinite',
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};