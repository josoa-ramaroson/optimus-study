// tailwind.config.js (à la racine)
module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}',       // pages App Router
    './src/pages/**/*.{js,ts,jsx,tsx}',     // si vous avez encore des pages
    './src/components/**/*.{js,ts,jsx,tsx}',// tous vos composants
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
