import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',

  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    colors: {
      dark: '#000000',
    },
  },
  plugins: [],
};
export default config;
