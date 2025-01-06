module.exports = {
  darkMode: 'class', // Enables 'class' based dark mode
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  plugins: [require('daisyui')],
  daisyui: {
    themes: ['light', 'dark'], // DaisyUI provides built-in light and dark themes
  },
};
