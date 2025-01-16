import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{html,js,ts,jsx,tsx,mdx}',
    './components/**/*.{html,js,ts,jsx,tsx,mdx}',
    './app/**/*.{html,js,ts,jsx,tsx,mdx}',
  ],
  theme: {},
  plugins: [],
};
export default config;
