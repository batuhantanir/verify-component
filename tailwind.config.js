/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'royal-purple': 'hsl(330, 100%, 50%)',
        'vivid-orange': 'hsl(48, 100%, 50%)',
        'deep-slate-blue': 'hsl(270, 100%, 29.75%)',
        coral: 'hsl(0, 89.87%, 60.5%)',
        black: 'hsl(0, 0%, 0%)',
        white: 'hsl(0, 0%, 100%)',
      },
    },
  },
  plugins: [],
};
