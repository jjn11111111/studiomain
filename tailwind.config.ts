import type { Config } from 'tailwindcss';

HEAD
const config: Config = {
  darkMode: ['class', '[data-mode="dark"]'], // Fixed: Add the second element

export default {
  darkMode: ['class', '[data-mode="dark"]'], // Changed this line
1b059b56008cddfe9e6c38327570dedabf7f5904
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};
export default config;
